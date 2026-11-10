<?php
/**
 * Order Model
 */

namespace App\Models;

use App\Database;

class Order
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Asegurar que existan las columnas extra (paciente / notas).
     * Se ejecuta de forma idempotente: solo agrega las columnas que falten.
     * Esto evita tener que correr una migración manual en producción.
     */
    private function ensureExtraColumns(): void
    {
        static $checked = false;
        if ($checked) {
            return;
        }

        try {
            $columns = $this->db->fetchAll("SHOW COLUMNS FROM orders");
            $existing = array_map(fn($c) => $c['Field'], $columns);

            $needed = [
                'notas'             => "ADD COLUMN notas TEXT NULL",
                'paciente_nombre'   => "ADD COLUMN paciente_nombre VARCHAR(100) NULL",
                'paciente_apellido' => "ADD COLUMN paciente_apellido VARCHAR(100) NULL",
                'paciente_rut'      => "ADD COLUMN paciente_rut VARCHAR(15) NULL",
                'paciente_telefono' => "ADD COLUMN paciente_telefono VARCHAR(20) NULL",
            ];

            $toAdd = [];
            foreach ($needed as $col => $clause) {
                if (!in_array($col, $existing, true)) {
                    $toAdd[] = $clause;
                }
            }

            if (!empty($toAdd)) {
                $this->db->query("ALTER TABLE orders " . implode(', ', $toAdd));
            }
        } catch (\Throwable $e) {
            // No bloquear la creación de la orden si el ALTER falla.
        }

        $checked = true;
    }

    /**
     * Generar número de orden: CIALO-YYYY-XXXX
     */
    private function getNextOrderNumber(): string
    {
        $year = date('Y');
        $prefix = "CIALO-{$year}-";
        
        $result = $this->db->fetch(
            "SELECT order_number FROM orders WHERE order_number LIKE ? ORDER BY order_number DESC LIMIT 1",
            ["{$prefix}%"]
        );
        
        $nextNum = 1;
        if ($result) {
            $numPart = (int) str_replace($prefix, '', $result['order_number']);
            $nextNum = $numPart + 1;
        }
        
        return $prefix . str_pad($nextNum, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Generar código de retiro
     */
    private function generateRetiroCode(): string
    {
        $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $code = '';
            for ($i = 0; $i < 6; $i++) {
                $code .= $chars[random_int(0, strlen($chars) - 1)];
            }
            
            $exists = $this->db->fetch(
                "SELECT id FROM orders WHERE retiro_code = ?",
                [$code]
            );
            
            if (!$exists) {
                return $code;
            }
        }
        
        return strtoupper(substr(uniqid(), -6));
    }

    /**
     * Crear nueva orden
     */
    public function create(array $data): array
    {
        $this->ensureExtraColumns();

        $id = Database::uuid();
        $orderNumber = $this->getNextOrderNumber();
        $retiroCode = $this->generateRetiroCode();

        // Datos del cupón si existe
        $couponId = $data['coupon_id'] ?? null;
        $couponCode = $data['coupon_code'] ?? null;
        $descuento = $data['discount'] ?? 0;

        // Notas y datos del paciente (quien se atiende)
        $notas = $data['notas'] ?? ($data['customer']['notas'] ?? null);
        $paciente = $data['paciente'] ?? null;
        $pacienteNombre = $paciente['nombre'] ?? null;
        $pacienteApellido = $paciente['apellido'] ?? null;
        $pacienteRut = $paciente['rut'] ?? null;
        $pacienteTelefono = $paciente['telefono'] ?? null;

        // Construir INSERT de forma dinámica para incluir solo las columnas que existen
        $columns = [
            'id'              => $id,
            'order_number'    => $orderNumber,
            'retiro_code'     => $retiroCode,
            'status'          => 'PENDIENTE',
            'subtotal'        => $data['subtotal'],
            'total'           => $data['total'],
            'coupon_id'       => $couponId,
            'coupon_code'     => $couponCode,
            'descuento'       => $descuento,
            'customer_name'   => $data['customer']['nombre'] . ' ' . $data['customer']['apellido'],
            'customer_email'  => $data['customer']['email'],
            'customer_phone'  => $data['customer']['telefono'],
            'customer_rut'    => $data['customer']['rut'] ?? null,
            'delivery_method' => 'retiro',
            'user_id'         => $data['user_id'] ?? null,
            // Columnas extra (se ignoran automáticamente si no existen en la tabla)
            'notas'             => $notas,
            'paciente_nombre'   => $pacienteNombre,
            'paciente_apellido' => $pacienteApellido,
            'paciente_rut'      => $pacienteRut,
            'paciente_telefono' => $pacienteTelefono,
        ];

        // Filtrar columnas extra que no existan en la tabla
        $extraCols = ['notas', 'paciente_nombre', 'paciente_apellido', 'paciente_rut', 'paciente_telefono'];
        try {
            $tableCols = array_map(fn($c) => $c['Field'], $this->db->fetchAll("SHOW COLUMNS FROM orders"));
            foreach ($extraCols as $col) {
                if (!in_array($col, $tableCols, true)) {
                    unset($columns[$col]);
                }
            }
        } catch (\Throwable $e) {
            foreach ($extraCols as $col) {
                unset($columns[$col]);
            }
        }

        $colNames = array_keys($columns);
        $placeholders = implode(', ', array_fill(0, count($colNames), '?'));
        $this->db->query(
            "INSERT INTO orders (" . implode(', ', $colNames) . ") VALUES ({$placeholders})",
            array_values($columns)
        );
        
        // Insertar items
        foreach ($data['items'] as $item) {
            $itemId = Database::uuid();
            $this->db->query(
                "INSERT INTO order_items (id, order_id, name, price, quantity, image, type, agenda_url)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                    $itemId,
                    $id,
                    $item['name'],
                    $item['price'],
                    $item['quantity'],
                    $item['image'] ?? null,
                    $item['type'] ?? 'producto',
                    $item['agendaUrl'] ?? null
                ]
            );
        }
        
        // Si hay cupón de afiliado, registrar comisión
        if ($couponId && isset($data['affiliate_id']) && isset($data['comision_porcentaje'])) {
            $affiliate = new Affiliate();
            $affiliate->registerCommission(
                $data['affiliate_id'],
                $id,
                $couponId,
                $data['total'], // Comisión sobre el total final
                $data['comision_porcentaje']
            );
        }
        
        // Incrementar uso del cupón
        if ($couponCode) {
            $coupon = new Coupon();
            $coupon->incrementUso($couponCode);
        }
        
        return $this->findById($id);
    }

    /**
     * Buscar por ID
     */
    public function findById(string $id): ?array
    {
        $order = $this->db->fetch("SELECT * FROM orders WHERE id = ?", [$id]);
        
        if (!$order) {
            return null;
        }
        
        $order['items'] = $this->db->fetchAll(
            "SELECT * FROM order_items WHERE order_id = ?",
            [$id]
        );
        
        return $order;
    }

    /**
     * Buscar por número de orden
     */
    public function findByNumber(string $orderNumber): ?array
    {
        $order = $this->db->fetch(
            "SELECT * FROM orders WHERE order_number = ?",
            [$orderNumber]
        );
        
        if (!$order) {
            return null;
        }
        
        $order['items'] = $this->db->fetchAll(
            "SELECT * FROM order_items WHERE order_id = ?",
            [$order['id']]
        );
        
        return $order;
    }

    /**
     * Buscar por transaction_id (token de Transbank)
     */
    public function findByTransactionId(string $transactionId): ?array
    {
        $order = $this->db->fetch(
            "SELECT * FROM orders WHERE transaction_id = ?",
            [$transactionId]
        );
        
        if (!$order) {
            return null;
        }
        
        $order['items'] = $this->db->fetchAll(
            "SELECT * FROM order_items WHERE order_id = ?",
            [$order['id']]
        );
        
        return $order;
    }

    /**
     * Buscar por código de retiro
     */
    public function findByRetiroCode(string $code): ?array
    {
        $order = $this->db->fetch(
            "SELECT * FROM orders WHERE retiro_code = ?",
            [strtoupper($code)]
        );
        
        if (!$order) {
            return null;
        }
        
        $order['items'] = $this->db->fetchAll(
            "SELECT * FROM order_items WHERE order_id = ?",
            [$order['id']]
        );
        
        return $order;
    }

    /**
     * Buscar por email del cliente
     */
    public function findByEmail(string $email): array
    {
        $orders = $this->db->fetchAll(
            "SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC",
            [strtolower($email)]
        );
        
        foreach ($orders as &$order) {
            $order['items'] = $this->db->fetchAll(
                "SELECT * FROM order_items WHERE order_id = ?",
                [$order['id']]
            );
        }
        
        return $orders;
    }

    /**
     * Obtener todas las órdenes
     */
    public function getAll(): array
    {
        $orders = $this->db->fetchAll("SELECT * FROM orders ORDER BY created_at DESC");
        
        foreach ($orders as &$order) {
            $order['items'] = $this->db->fetchAll(
                "SELECT * FROM order_items WHERE order_id = ?",
                [$order['id']]
            );
        }
        
        return $orders;
    }

    /**
     * Actualizar orden
     */
    public function update(string $id, array $data): ?array
    {
        $fields = [];
        $values = [];
        
        $allowedFields = ['status', 'transaction_id', 'paid_at', 'authorization_code', 'card_number', 'retiro_code'];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $fields[] = "{$field} = ?";
                $values[] = $data[$field];
            }
        }
        
        if (empty($fields)) {
            return $this->findById($id);
        }
        
        $values[] = $id;
        $sql = "UPDATE orders SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
        
        $this->db->query($sql, $values);
        
        return $this->findById($id);
    }
}
