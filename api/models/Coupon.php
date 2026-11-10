<?php
/**
 * Coupon Model - Con soporte para afiliados y comisiones
 */

namespace App\Models;

use App\Database;

class Coupon
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Validar cupón y retornar detalles
     */
    public function validate(string $code, float $subtotal): ?array
    {
        $coupon = $this->db->fetch(
            "SELECT c.*, a.nombre as afiliado_nombre, a.id as affiliate_id 
             FROM coupons c 
             LEFT JOIN affiliates a ON c.afiliado_id = a.id
             WHERE c.code = ? AND c.activo = 1 LIMIT 1",
            [strtoupper(trim($code))]
        );

        if (!$coupon) {
            return ['valid' => false, 'error' => 'Cupón no válido'];
        }

        // Verificar fechas
        $now = new \DateTime();
        
        if ($coupon['fecha_inicio'] && new \DateTime($coupon['fecha_inicio']) > $now) {
            return ['valid' => false, 'error' => 'Este cupón aún no está activo'];
        }
        
        if ($coupon['fecha_fin'] && new \DateTime($coupon['fecha_fin']) < $now) {
            return ['valid' => false, 'error' => 'Este cupón ha expirado'];
        }

        // Verificar usos máximos
        if ($coupon['usos_maximos'] && $coupon['usos_actuales'] >= $coupon['usos_maximos']) {
            return ['valid' => false, 'error' => 'Este cupón ha alcanzado su límite de usos'];
        }

        // Verificar monto mínimo
        if ($coupon['monto_minimo'] && $subtotal < $coupon['monto_minimo']) {
            return [
                'valid' => false, 
                'error' => 'Compra mínima de $' . number_format($coupon['monto_minimo'], 0, ',', '.') . ' requerida'
            ];
        }

        // Calcular descuento
        $discount = 0;
        if ($coupon['tipo'] === 'porcentaje') {
            $discount = $subtotal * ($coupon['valor'] / 100);
            // Limitar si hay máximo
            if ($coupon['descuento_maximo'] && $discount > $coupon['descuento_maximo']) {
                $discount = $coupon['descuento_maximo'];
            }
        } else {
            // Monto fijo
            $discount = min($coupon['valor'], $subtotal);
        }

        return [
            'valid' => true,
            'id' => $coupon['id'],
            'code' => $coupon['code'],
            'categoria' => $coupon['categoria'] ?? 'descuento',
            'tipo' => $coupon['tipo'],
            'valor' => $coupon['valor'],
            'descuento' => round($discount),
            'descripcion' => $coupon['descripcion'] ?? ($coupon['tipo'] === 'porcentaje' 
                ? $coupon['valor'] . '% de descuento' 
                : '$' . number_format($coupon['valor'], 0, ',', '.') . ' de descuento'),
            // Datos de afiliado (si aplica)
            'es_afiliado' => $coupon['categoria'] === 'afiliado',
            'affiliate_id' => $coupon['affiliate_id'] ?? null,
            'afiliado_nombre' => $coupon['afiliado_nombre'] ?? null,
            'comision_porcentaje' => $coupon['comision_porcentaje'] ?? null,
        ];
    }

    /**
     * Incrementar usos del cupón
     */
    public function incrementUso(string $code): bool
    {
        $this->db->query(
            "UPDATE coupons SET usos_actuales = usos_actuales + 1 WHERE code = ?",
            [strtoupper(trim($code))]
        );
        return true;
    }

    /**
     * Obtener cupón por código
     */
    public function getByCode(string $code): ?array
    {
        return $this->db->fetch(
            "SELECT * FROM coupons WHERE code = ? LIMIT 1",
            [strtoupper(trim($code))]
        );
    }

    /**
     * Crear cupón (para admin)
     */
    public function create(array $data): array
    {
        $id = Database::uuid();
        
        $this->db->query(
            "INSERT INTO coupons (id, code, categoria, tipo, valor, descripcion, monto_minimo, descuento_maximo, usos_maximos, fecha_inicio, fecha_fin, afiliado_id, comision_porcentaje, activo)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
                $id,
                strtoupper(trim($data['code'])),
                $data['categoria'] ?? 'descuento',
                $data['tipo'] ?? 'porcentaje',
                $data['valor'],
                $data['descripcion'] ?? null,
                $data['monto_minimo'] ?? null,
                $data['descuento_maximo'] ?? null,
                $data['usos_maximos'] ?? null,
                $data['fecha_inicio'] ?? null,
                $data['fecha_fin'] ?? null,
                $data['afiliado_id'] ?? null,
                $data['comision_porcentaje'] ?? null,
                $data['activo'] ?? 1
            ]
        );
        
        return $this->findById($id);
    }

    /**
     * Crear cupón de afiliado automáticamente
     */
    public function createAffiliateCoupon(string $affiliateId, string $code, float $descuento, float $comision): array
    {
        return $this->create([
            'code' => $code,
            'categoria' => 'afiliado',
            'tipo' => 'porcentaje',
            'valor' => $descuento,
            'descripcion' => "$descuento% de descuento",
            'afiliado_id' => $affiliateId,
            'comision_porcentaje' => $comision,
            'activo' => 1
        ]);
    }

    /**
     * Buscar por ID
     */
    public function findById(string $id): ?array
    {
        return $this->db->fetch("SELECT * FROM coupons WHERE id = ?", [$id]);
    }

    /**
     * Listar todos
     */
    public function getAll(): array
    {
        return $this->db->fetchAll(
            "SELECT c.*, a.nombre as afiliado_nombre 
             FROM coupons c 
             LEFT JOIN affiliates a ON c.afiliado_id = a.id
             ORDER BY c.created_at DESC"
        );
    }

    /**
     * Listar por categoría
     */
    public function getByCategoria(string $categoria): array
    {
        return $this->db->fetchAll(
            "SELECT c.*, a.nombre as afiliado_nombre 
             FROM coupons c 
             LEFT JOIN affiliates a ON c.afiliado_id = a.id
             WHERE c.categoria = ?
             ORDER BY c.created_at DESC",
            [$categoria]
        );
    }

    /**
     * Obtener cupones de un afiliado
     */
    public function getByAffiliate(string $affiliateId): array
    {
        return $this->db->fetchAll(
            "SELECT * FROM coupons WHERE afiliado_id = ? ORDER BY created_at DESC",
            [$affiliateId]
        );
    }

    /**
     * Actualizar cupón
     */
    public function update(string $id, array $data): ?array
    {
        $fields = [];
        $values = [];

        $allowedFields = ['code', 'categoria', 'tipo', 'valor', 'descripcion', 'monto_minimo', 
                          'descuento_maximo', 'usos_maximos', 'fecha_inicio', 'fecha_fin', 
                          'afiliado_id', 'comision_porcentaje', 'activo'];

        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $values[] = $field === 'code' ? strtoupper(trim($data[$field])) : $data[$field];
            }
        }

        if (empty($fields)) {
            return $this->findById($id);
        }

        $values[] = $id;
        $this->db->query(
            "UPDATE coupons SET " . implode(', ', $fields) . " WHERE id = ?",
            $values
        );

        return $this->findById($id);
    }

    /**
     * Eliminar cupón
     */
    public function delete(string $id): bool
    {
        $this->db->query("DELETE FROM coupons WHERE id = ?", [$id]);
        return true;
    }
}
