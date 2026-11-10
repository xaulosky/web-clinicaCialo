<?php
/**
 * Affiliate Model - Gestión de afiliados y comisiones
 */

namespace App\Models;

use App\Database;

class Affiliate
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Crear afiliado
     */
    public function create(array $data): array
    {
        $id = Database::uuid();
        $codigo = $this->generateCode($data['nombre']);

        $this->db->query(
            "INSERT INTO affiliates (id, user_id, codigo_afiliado, nombre, email, telefono, rut, banco, tipo_cuenta, numero_cuenta, comision_default, activo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $id,
                $data['user_id'] ?? null,
                $codigo,
                $data['nombre'],
                $data['email'],
                $data['telefono'] ?? null,
                $data['rut'] ?? null,
                $data['banco'] ?? null,
                $data['tipo_cuenta'] ?? null,
                $data['numero_cuenta'] ?? null,
                $data['comision_default'] ?? 10.00,
                $data['activo'] ?? 1
            ]
        );

        // Crear cupón automático para el afiliado
        $coupon = new Coupon();
        $coupon->createAffiliateCoupon(
            $id,
            $codigo,
            $data['descuento'] ?? 10, // Descuento que ofrece el cupón
            $data['comision_default'] ?? 10 // Comisión que gana el afiliado
        );

        return $this->findById($id);
    }

    /**
     * Generar código único de afiliado
     */
    private function generateCode(string $nombre): string
    {
        // Usar primeras letras del nombre + números aleatorios
        $prefix = strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $nombre), 0, 4));
        $suffix = rand(100, 999);
        $code = $prefix . $suffix;

        // Verificar que no exista
        $exists = $this->db->fetch(
            "SELECT id FROM affiliates WHERE codigo_afiliado = ?",
            [$code]
        );

        if ($exists) {
            return $this->generateCode($nombre . rand(0, 9));
        }

        return $code;
    }

    /**
     * Buscar por ID
     */
    public function findById(string $id): ?array
    {
        $affiliate = $this->db->fetch(
            "SELECT a.*, 
                    (SELECT COUNT(*) FROM commissions WHERE affiliate_id = a.id) as total_ordenes,
                    (a.total_comisiones - a.comisiones_pagadas) as comisiones_pendientes
             FROM affiliates a 
             WHERE a.id = ?",
            [$id]
        );

        if ($affiliate) {
            // Obtener cupones del afiliado
            $coupon = new Coupon();
            $affiliate['cupones'] = $coupon->getByAffiliate($id);
        }

        return $affiliate;
    }

    /**
     * Buscar por user_id
     */
    public function findByUserId(string $userId): ?array
    {
        $affiliate = $this->db->fetch(
            "SELECT a.*, 
                    (SELECT COUNT(*) FROM commissions WHERE affiliate_id = a.id) as total_ordenes,
                    (a.total_comisiones - a.comisiones_pagadas) as comisiones_pendientes
             FROM affiliates a 
             WHERE a.user_id = ?",
            [$userId]
        );

        if ($affiliate) {
            $coupon = new Coupon();
            $affiliate['cupones'] = $coupon->getByAffiliate($affiliate['id']);
        }

        return $affiliate;
    }

    /**
     * Buscar por código de afiliado
     */
    public function findByCode(string $code): ?array
    {
        return $this->db->fetch(
            "SELECT * FROM affiliates WHERE codigo_afiliado = ? AND activo = 1",
            [strtoupper($code)]
        );
    }

    /**
     * Listar todos los afiliados
     */
    public function getAll(bool $includeInactive = false): array
    {
        $sql = "SELECT a.*, 
                       (SELECT COUNT(*) FROM commissions WHERE affiliate_id = a.id) as total_ordenes,
                       (a.total_comisiones - a.comisiones_pagadas) as comisiones_pendientes
                FROM affiliates a";
        
        if (!$includeInactive) {
            $sql .= " WHERE a.activo = 1";
        }
        
        $sql .= " ORDER BY a.created_at DESC";

        return $this->db->fetchAll($sql);
    }

    /**
     * Actualizar afiliado
     */
    public function update(string $id, array $data): ?array
    {
        $fields = [];
        $values = [];

        $allowedFields = ['nombre', 'email', 'telefono', 'rut', 'banco', 'tipo_cuenta', 
                          'numero_cuenta', 'comision_default', 'activo'];

        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $values[] = $data[$field];
            }
        }

        if (empty($fields)) {
            return $this->findById($id);
        }

        $values[] = $id;
        $this->db->query(
            "UPDATE affiliates SET " . implode(', ', $fields) . " WHERE id = ?",
            $values
        );

        return $this->findById($id);
    }

    /**
     * Registrar comisión por venta
     */
    public function registerCommission(string $affiliateId, string $orderId, string $couponId, float $montoVenta, float $porcentajeComision): array
    {
        $id = Database::uuid();
        $montoComision = round($montoVenta * ($porcentajeComision / 100), 2);

        $this->db->query(
            "INSERT INTO commissions (id, affiliate_id, order_id, coupon_id, monto_venta, porcentaje_comision, monto_comision, estado)
             VALUES (?, ?, ?, ?, ?, ?, ?, 'pendiente')",
            [$id, $affiliateId, $orderId, $couponId, $montoVenta, $porcentajeComision, $montoComision]
        );

        // Actualizar totales del afiliado
        $this->db->query(
            "UPDATE affiliates 
             SET total_ventas = total_ventas + ?, 
                 total_comisiones = total_comisiones + ?
             WHERE id = ?",
            [$montoVenta, $montoComision, $affiliateId]
        );

        return [
            'id' => $id,
            'monto_comision' => $montoComision,
            'porcentaje' => $porcentajeComision
        ];
    }

    /**
     * Obtener comisiones de un afiliado
     */
    public function getCommissions(string $affiliateId, ?string $estado = null): array
    {
        $sql = "SELECT c.*, o.order_number, cp.code as coupon_code
                FROM commissions c
                LEFT JOIN orders o ON c.order_id = o.id
                LEFT JOIN coupons cp ON c.coupon_id = cp.id
                WHERE c.affiliate_id = ?";
        $params = [$affiliateId];

        if ($estado) {
            $sql .= " AND c.estado = ?";
            $params[] = $estado;
        }

        $sql .= " ORDER BY c.created_at DESC";

        return $this->db->fetchAll($sql, $params);
    }

    /**
     * Marcar comisiones como pagadas
     */
    public function payCommissions(string $affiliateId, array $commissionIds): array
    {
        if (empty($commissionIds)) {
            return ['error' => 'No hay comisiones seleccionadas'];
        }

        $placeholders = implode(',', array_fill(0, count($commissionIds), '?'));
        
        // Calcular total a pagar
        $total = $this->db->fetch(
            "SELECT SUM(monto_comision) as total FROM commissions 
             WHERE id IN ($placeholders) AND affiliate_id = ? AND estado = 'aprobada'",
            array_merge($commissionIds, [$affiliateId])
        );

        if (!$total || $total['total'] == 0) {
            return ['error' => 'No hay comisiones aprobadas para pagar'];
        }

        // Actualizar estado
        $this->db->query(
            "UPDATE commissions 
             SET estado = 'pagada', fecha_pago = NOW() 
             WHERE id IN ($placeholders) AND affiliate_id = ?",
            array_merge($commissionIds, [$affiliateId])
        );

        // Actualizar comisiones pagadas del afiliado
        $this->db->query(
            "UPDATE affiliates SET comisiones_pagadas = comisiones_pagadas + ? WHERE id = ?",
            [$total['total'], $affiliateId]
        );

        return [
            'success' => true,
            'total_pagado' => $total['total'],
            'comisiones_pagadas' => count($commissionIds)
        ];
    }

    /**
     * Aprobar comisiones pendientes
     */
    public function approveCommissions(array $commissionIds): bool
    {
        if (empty($commissionIds)) {
            return false;
        }

        $placeholders = implode(',', array_fill(0, count($commissionIds), '?'));
        $this->db->query(
            "UPDATE commissions SET estado = 'aprobada' WHERE id IN ($placeholders) AND estado = 'pendiente'",
            $commissionIds
        );

        return true;
    }

    /**
     * Cancelar comisión (por ejemplo, si se cancela la orden)
     */
    public function cancelCommission(string $orderId): bool
    {
        $commission = $this->db->fetch(
            "SELECT * FROM commissions WHERE order_id = ? AND estado IN ('pendiente', 'aprobada')",
            [$orderId]
        );

        if (!$commission) {
            return false;
        }

        // Revertir totales del afiliado
        $this->db->query(
            "UPDATE affiliates 
             SET total_ventas = total_ventas - ?, 
                 total_comisiones = total_comisiones - ?
             WHERE id = ?",
            [$commission['monto_venta'], $commission['monto_comision'], $commission['affiliate_id']]
        );

        // Marcar como cancelada
        $this->db->query(
            "UPDATE commissions SET estado = 'cancelada' WHERE order_id = ?",
            [$orderId]
        );

        return true;
    }

    /**
     * Resumen de comisiones para dashboard
     */
    public function getCommissionsSummary(string $affiliateId): array
    {
        return $this->db->fetch(
            "SELECT 
                COUNT(CASE WHEN estado = 'pendiente' THEN 1 END) as pendientes_count,
                COALESCE(SUM(CASE WHEN estado = 'pendiente' THEN monto_comision END), 0) as pendientes_monto,
                COUNT(CASE WHEN estado = 'aprobada' THEN 1 END) as aprobadas_count,
                COALESCE(SUM(CASE WHEN estado = 'aprobada' THEN monto_comision END), 0) as aprobadas_monto,
                COUNT(CASE WHEN estado = 'pagada' THEN 1 END) as pagadas_count,
                COALESCE(SUM(CASE WHEN estado = 'pagada' THEN monto_comision END), 0) as pagadas_monto,
                COUNT(*) as total_count,
                COALESCE(SUM(monto_comision), 0) as total_monto
             FROM commissions 
             WHERE affiliate_id = ?",
            [$affiliateId]
        ) ?? [];
    }

    /**
     * Estadísticas del mes actual
     */
    public function getMonthlyStats(string $affiliateId): array
    {
        return $this->db->fetch(
            "SELECT 
                COUNT(*) as ventas_mes,
                COALESCE(SUM(monto_venta), 0) as total_ventas_mes,
                COALESCE(SUM(monto_comision), 0) as comisiones_mes
             FROM commissions 
             WHERE affiliate_id = ? 
             AND MONTH(created_at) = MONTH(CURRENT_DATE())
             AND YEAR(created_at) = YEAR(CURRENT_DATE())",
            [$affiliateId]
        ) ?? [];
    }
}
