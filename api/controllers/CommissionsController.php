<?php
/**
 * Controlador de Comisiones
 */

namespace App\Controllers;

use App\Response;
use App\Auth;

class CommissionsController
{
    private \PDO $pdo;

    public function __construct()
    {
        $config = require __DIR__ . '/../config/config.php';
        $this->pdo = new \PDO(
            "mysql:host={$config['db']['host']};dbname={$config['db']['name']};charset={$config['db']['charset']}",
            $config['db']['user'],
            $config['db']['pass'],
            [\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION]
        );
    }

    /**
     * GET /commissions - Listar todas las comisiones
     */
    public function index(): void
    {
        Auth::requireAdmin();

        $estado = $_GET['estado'] ?? null;
        $affiliateId = $_GET['affiliate_id'] ?? null;

        $sql = "
            SELECT c.*, 
                   a.nombre as afiliado_nombre,
                   a.codigo_afiliado,
                   a.email as afiliado_email,
                   o.order_number,
                   cp.code as coupon_code
            FROM commissions c
            LEFT JOIN affiliates a ON c.affiliate_id = a.id
            LEFT JOIN orders o ON c.order_id = o.id
            LEFT JOIN coupons cp ON c.coupon_id = cp.id
            WHERE 1=1
        ";
        $params = [];

        if ($estado) {
            $sql .= " AND c.estado = ?";
            $params[] = $estado;
        }

        if ($affiliateId) {
            $sql .= " AND c.affiliate_id = ?";
            $params[] = $affiliateId;
        }

        $sql .= " ORDER BY c.created_at DESC";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);
        
        $commissions = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        Response::success($commissions);
    }

    /**
     * GET /commissions/{id} - Obtener comisión por ID
     */
    public function show(string $id): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->prepare("
            SELECT c.*, 
                   a.nombre as afiliado_nombre,
                   a.codigo_afiliado,
                   a.email as afiliado_email,
                   a.banco,
                   a.tipo_cuenta,
                   a.numero_cuenta,
                   o.order_number,
                   cp.code as coupon_code
            FROM commissions c
            LEFT JOIN affiliates a ON c.affiliate_id = a.id
            LEFT JOIN orders o ON c.order_id = o.id
            LEFT JOIN coupons cp ON c.coupon_id = cp.id
            WHERE c.id = ?
        ");
        $stmt->execute([$id]);
        $commission = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$commission) {
            Response::error('Comisión no encontrada', 404);
        }

        Response::success($commission);
    }

    /**
     * POST /commissions/{id}/approve - Aprobar comisión
     */
    public function approve(string $id): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->prepare("SELECT * FROM commissions WHERE id = ?");
        $stmt->execute([$id]);
        $commission = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$commission) {
            Response::error('Comisión no encontrada', 404);
        }

        if ($commission['estado'] !== 'pendiente') {
            Response::error('Solo se pueden aprobar comisiones pendientes', 400);
        }

        $stmt = $this->pdo->prepare("UPDATE commissions SET estado = 'aprobada' WHERE id = ?");
        $stmt->execute([$id]);

        Response::success(null, 'Comisión aprobada');
    }

    /**
     * POST /commissions/{id}/pay - Marcar comisión como pagada
     */
    public function pay(string $id): void
    {
        Auth::requireAdmin();

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $stmt = $this->pdo->prepare("SELECT * FROM commissions WHERE id = ?");
        $stmt->execute([$id]);
        $commission = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$commission) {
            Response::error('Comisión no encontrada', 404);
        }

        if (!in_array($commission['estado'], ['pendiente', 'aprobada'])) {
            Response::error('Solo se pueden pagar comisiones pendientes o aprobadas', 400);
        }

        $stmt = $this->pdo->prepare("
            UPDATE commissions 
            SET estado = 'pagada', 
                fecha_pago = NOW(),
                notas = CONCAT(COALESCE(notas, ''), ?)
            WHERE id = ?
        ");
        $nota = !empty($data['notas']) ? "\n[Pago] " . $data['notas'] : '';
        $stmt->execute([$nota, $id]);

        // Actualizar totales del afiliado
        $stmt = $this->pdo->prepare("
            UPDATE affiliates 
            SET comisiones_pagadas = comisiones_pagadas + ?
            WHERE id = ?
        ");
        $stmt->execute([$commission['monto_comision'], $commission['affiliate_id']]);

        Response::success(null, 'Comisión marcada como pagada');
    }

    /**
     * POST /commissions/{id}/cancel - Cancelar comisión
     */
    public function cancel(string $id): void
    {
        Auth::requireAdmin();

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $stmt = $this->pdo->prepare("SELECT * FROM commissions WHERE id = ?");
        $stmt->execute([$id]);
        $commission = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$commission) {
            Response::error('Comisión no encontrada', 404);
        }

        if ($commission['estado'] === 'pagada') {
            Response::error('No se puede cancelar una comisión ya pagada', 400);
        }

        $stmt = $this->pdo->prepare("
            UPDATE commissions 
            SET estado = 'cancelada',
                notas = CONCAT(COALESCE(notas, ''), ?)
            WHERE id = ?
        ");
        $nota = !empty($data['motivo']) ? "\n[Cancelada] " . $data['motivo'] : "\n[Cancelada]";
        $stmt->execute([$nota, $id]);

        Response::success(null, 'Comisión cancelada');
    }

    /**
     * POST /commissions/bulk-pay - Pagar múltiples comisiones
     */
    public function bulkPay(): void
    {
        Auth::requireAdmin();

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($data['ids']) || !is_array($data['ids'])) {
            Response::error('Se requiere un array de IDs', 400);
        }

        $placeholders = str_repeat('?,', count($data['ids']) - 1) . '?';
        
        // Obtener comisiones a pagar
        $stmt = $this->pdo->prepare("
            SELECT id, affiliate_id, monto_comision 
            FROM commissions 
            WHERE id IN ($placeholders) AND estado IN ('pendiente', 'aprobada')
        ");
        $stmt->execute($data['ids']);
        $commissions = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        if (empty($commissions)) {
            Response::error('No hay comisiones válidas para pagar', 400);
        }

        // Actualizar comisiones
        $stmt = $this->pdo->prepare("
            UPDATE commissions 
            SET estado = 'pagada', fecha_pago = NOW() 
            WHERE id IN ($placeholders) AND estado IN ('pendiente', 'aprobada')
        ");
        $stmt->execute($data['ids']);

        // Actualizar totales por afiliado
        $totalesPorAfiliado = [];
        foreach ($commissions as $c) {
            if (!isset($totalesPorAfiliado[$c['affiliate_id']])) {
                $totalesPorAfiliado[$c['affiliate_id']] = 0;
            }
            $totalesPorAfiliado[$c['affiliate_id']] += $c['monto_comision'];
        }

        foreach ($totalesPorAfiliado as $affiliateId => $total) {
            $stmt = $this->pdo->prepare("
                UPDATE affiliates 
                SET comisiones_pagadas = comisiones_pagadas + ?
                WHERE id = ?
            ");
            $stmt->execute([$total, $affiliateId]);
        }

        Response::success([
            'pagadas' => count($commissions),
            'total' => array_sum(array_column($commissions, 'monto_comision'))
        ], 'Comisiones pagadas exitosamente');
    }

    /**
     * GET /commissions/stats - Estadísticas de comisiones
     */
    public function stats(): void
    {
        Auth::requireAdmin();

        $stats = [];

        // Totales por estado
        $stmt = $this->pdo->query("
            SELECT estado, COUNT(*) as cantidad, COALESCE(SUM(monto_comision), 0) as total
            FROM commissions
            GROUP BY estado
        ");
        $stats['por_estado'] = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Total pendiente de pago
        $stmt = $this->pdo->query("
            SELECT COALESCE(SUM(monto_comision), 0) as total
            FROM commissions
            WHERE estado IN ('pendiente', 'aprobada')
        ");
        $stats['total_pendiente'] = $stmt->fetch(\PDO::FETCH_ASSOC)['total'];

        // Comisiones este mes
        $stmt = $this->pdo->query("
            SELECT 
                COUNT(*) as cantidad,
                COALESCE(SUM(monto_comision), 0) as total,
                COALESCE(SUM(monto_venta), 0) as ventas
            FROM commissions
            WHERE MONTH(created_at) = MONTH(CURRENT_DATE())
            AND YEAR(created_at) = YEAR(CURRENT_DATE())
        ");
        $stats['este_mes'] = $stmt->fetch(\PDO::FETCH_ASSOC);

        // Evolución últimos 6 meses
        $stmt = $this->pdo->query("
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as mes,
                COUNT(*) as cantidad,
                COALESCE(SUM(monto_comision), 0) as comisiones,
                COALESCE(SUM(monto_venta), 0) as ventas
            FROM commissions
            WHERE created_at >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY mes DESC
        ");
        $stats['ultimos_meses'] = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        Response::success($stats);
    }

    /**
     * Crear comisión cuando se usa un cupón de afiliado
     * (Llamado internamente desde el proceso de pago)
     */
    public static function createFromOrder(\PDO $pdo, string $orderId, string $couponId, float $orderTotal): ?string
    {
        // Obtener cupón y verificar si es de afiliado
        $stmt = $pdo->prepare("SELECT * FROM coupons WHERE id = ? AND categoria = 'afiliado' AND afiliado_id IS NOT NULL");
        $stmt->execute([$couponId]);
        $coupon = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$coupon) {
            return null; // No es cupón de afiliado
        }

        $comisionPorcentaje = $coupon['comision_porcentaje'] ?? 10;
        $comisionMonto = $orderTotal * ($comisionPorcentaje / 100);

        $id = sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );

        $stmt = $pdo->prepare("
            INSERT INTO commissions (id, affiliate_id, order_id, coupon_id, monto_venta, porcentaje_comision, monto_comision, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente')
        ");

        $stmt->execute([
            $id,
            $coupon['afiliado_id'],
            $orderId,
            $couponId,
            $orderTotal,
            $comisionPorcentaje,
            $comisionMonto
        ]);

        // Actualizar totales del afiliado
        $stmt = $pdo->prepare("
            UPDATE affiliates 
            SET total_ventas = total_ventas + ?,
                total_comisiones = total_comisiones + ?
            WHERE id = ?
        ");
        $stmt->execute([$orderTotal, $comisionMonto, $coupon['afiliado_id']]);

        return $id;
    }
}
