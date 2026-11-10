<?php
/**
 * Controlador de Afiliados
 */

namespace App\Controllers;

use App\Response;
use App\Validator;
use App\Auth;

class AffiliatesController
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
     * GET /affiliates - Listar todos los afiliados
     */
    public function index(): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->query("
            SELECT a.*,
                   (SELECT COUNT(*) FROM commissions c WHERE c.affiliate_id = a.id) as total_ordenes,
                   (SELECT COUNT(*) FROM coupons cp WHERE cp.afiliado_id = a.id) as total_cupones
            FROM affiliates a
            ORDER BY a.created_at DESC
        ");
        
        $affiliates = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        Response::success($affiliates);
    }

    /**
     * GET /affiliates/{id} - Obtener afiliado por ID con estadísticas
     */
    public function show(string $id): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->prepare("SELECT * FROM affiliates WHERE id = ?");
        $stmt->execute([$id]);
        $affiliate = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$affiliate) {
            Response::error('Afiliado no encontrado', 404);
        }

        // Obtener cupones del afiliado
        $stmt = $this->pdo->prepare("SELECT * FROM coupons WHERE afiliado_id = ?");
        $stmt->execute([$id]);
        $affiliate['cupones'] = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Obtener comisiones del afiliado
        $stmt = $this->pdo->prepare("
            SELECT c.*, o.order_number 
            FROM commissions c
            LEFT JOIN orders o ON c.order_id = o.id
            WHERE c.affiliate_id = ?
            ORDER BY c.created_at DESC
            LIMIT 50
        ");
        $stmt->execute([$id]);
        $affiliate['comisiones'] = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // Estadísticas
        $stmt = $this->pdo->prepare("
            SELECT 
                COUNT(*) as total_ordenes,
                COALESCE(SUM(monto_venta), 0) as ventas_totales,
                COALESCE(SUM(monto_comision), 0) as comisiones_totales,
                COALESCE(SUM(CASE WHEN estado = 'pagada' THEN monto_comision ELSE 0 END), 0) as comisiones_pagadas,
                COALESCE(SUM(CASE WHEN estado = 'pendiente' THEN monto_comision ELSE 0 END), 0) as comisiones_pendientes
            FROM commissions 
            WHERE affiliate_id = ?
        ");
        $stmt->execute([$id]);
        $affiliate['estadisticas'] = $stmt->fetch(\PDO::FETCH_ASSOC);

        Response::success($affiliate);
    }

    /**
     * POST /affiliates - Crear nuevo afiliado
     */
    public function store(): void
    {
        Auth::requireAdmin();

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $validator = new Validator($data);
        $validator
            ->required('nombre')
            ->required('email')
            ->email('email')
            ->required('codigo_afiliado')
            ->validate();

        // Verificar que el código no exista
        $stmt = $this->pdo->prepare("SELECT id FROM affiliates WHERE codigo_afiliado = ?");
        $stmt->execute([strtoupper($data['codigo_afiliado'])]);
        if ($stmt->fetch()) {
            Response::error('El código de afiliado ya existe', 400);
        }

        // Verificar email único
        $stmt = $this->pdo->prepare("SELECT id FROM affiliates WHERE email = ?");
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            Response::error('El email ya está registrado como afiliado', 400);
        }

        $id = $this->generateUUID();
        
        $stmt = $this->pdo->prepare("
            INSERT INTO affiliates (id, user_id, codigo_afiliado, nombre, email, telefono, rut, banco, tipo_cuenta, numero_cuenta, comision_default, activo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $id,
            $data['user_id'] ?? $id, // Si no hay user_id, usar el mismo id
            strtoupper($data['codigo_afiliado']),
            $data['nombre'],
            $data['email'],
            $data['telefono'] ?? null,
            $data['rut'] ?? null,
            $data['banco'] ?? null,
            $data['tipo_cuenta'] ?? null,
            $data['numero_cuenta'] ?? null,
            $data['comision_default'] ?? 10.00,
            $data['activo'] ?? 1
        ]);

        // Crear cupón automático para el afiliado
        $couponId = $this->generateUUID();
        $couponCode = strtoupper($data['codigo_afiliado']);
        
        $stmt = $this->pdo->prepare("
            INSERT INTO coupons (id, code, categoria, tipo, valor, descripcion, afiliado_id, comision_porcentaje, activo)
            VALUES (?, ?, 'afiliado', 'porcentaje', ?, ?, ?, ?, 1)
        ");
        
        $descuentoCliente = $data['descuento_cliente'] ?? 10;
        $comisionAfiliado = $data['comision_default'] ?? 10;
        
        $stmt->execute([
            $couponId,
            $couponCode,
            $descuentoCliente,
            "Cupón de afiliado: {$data['nombre']}",
            $id,
            $comisionAfiliado
        ]);

        Response::success([
            'id' => $id,
            'coupon_id' => $couponId,
            'coupon_code' => $couponCode
        ], 'Afiliado creado exitosamente con cupón ' . $couponCode, 201);
    }

    /**
     * PUT /affiliates/{id} - Actualizar afiliado
     */
    public function update(string $id): void
    {
        Auth::requireAdmin();

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        // Verificar que existe
        $stmt = $this->pdo->prepare("SELECT id FROM affiliates WHERE id = ?");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            Response::error('Afiliado no encontrado', 404);
        }

        $fields = [];
        $values = [];

        $allowedFields = ['nombre', 'email', 'telefono', 'rut', 'banco', 'tipo_cuenta', 'numero_cuenta', 'comision_default', 'activo'];

        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $values[] = $data[$field];
            }
        }

        if (empty($fields)) {
            Response::error('No hay datos para actualizar', 400);
        }

        $values[] = $id;
        $sql = "UPDATE affiliates SET " . implode(', ', $fields) . " WHERE id = ?";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($values);

        Response::success(null, 'Afiliado actualizado exitosamente');
    }

    /**
     * DELETE /affiliates/{id} - Eliminar afiliado
     */
    public function destroy(string $id): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->prepare("SELECT id FROM affiliates WHERE id = ?");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            Response::error('Afiliado no encontrado', 404);
        }

        // Desactivar cupones del afiliado
        $stmt = $this->pdo->prepare("UPDATE coupons SET activo = 0 WHERE afiliado_id = ?");
        $stmt->execute([$id]);

        // Eliminar afiliado
        $stmt = $this->pdo->prepare("DELETE FROM affiliates WHERE id = ?");
        $stmt->execute([$id]);

        Response::success(null, 'Afiliado eliminado exitosamente');
    }

    /**
     * GET /affiliates/stats - Estadísticas generales de afiliados
     */
    public function stats(): void
    {
        Auth::requireAdmin();

        $stats = [];

        // Total afiliados activos
        $stmt = $this->pdo->query("SELECT COUNT(*) as total FROM affiliates WHERE activo = 1");
        $stats['total_afiliados'] = $stmt->fetch(\PDO::FETCH_ASSOC)['total'];

        // Ventas totales por afiliados
        $stmt = $this->pdo->query("SELECT COALESCE(SUM(monto_venta), 0) as total FROM commissions");
        $stats['ventas_totales'] = $stmt->fetch(\PDO::FETCH_ASSOC)['total'];

        // Comisiones pendientes
        $stmt = $this->pdo->query("SELECT COALESCE(SUM(monto_comision), 0) as total FROM commissions WHERE estado = 'pendiente'");
        $stats['comisiones_pendientes'] = $stmt->fetch(\PDO::FETCH_ASSOC)['total'];

        // Comisiones pagadas este mes
        $stmt = $this->pdo->query("
            SELECT COALESCE(SUM(monto_comision), 0) as total 
            FROM commissions 
            WHERE estado = 'pagada' 
            AND MONTH(fecha_pago) = MONTH(CURRENT_DATE())
            AND YEAR(fecha_pago) = YEAR(CURRENT_DATE())
        ");
        $stats['comisiones_pagadas_mes'] = $stmt->fetch(\PDO::FETCH_ASSOC)['total'];

        // Top 5 afiliados por ventas
        $stmt = $this->pdo->query("
            SELECT a.id, a.nombre, a.codigo_afiliado,
                   COALESCE(SUM(c.monto_venta), 0) as total_ventas,
                   COUNT(c.id) as total_ordenes
            FROM affiliates a
            LEFT JOIN commissions c ON a.id = c.affiliate_id
            GROUP BY a.id
            ORDER BY total_ventas DESC
            LIMIT 5
        ");
        $stats['top_afiliados'] = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        Response::success($stats);
    }

    private function generateUUID(): string
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
}
