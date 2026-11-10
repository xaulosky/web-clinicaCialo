<?php
/**
 * Controlador de Cupones
 */

namespace App\Controllers;

use App\Response;
use App\Validator;
use App\Auth;

class CouponsController
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
     * GET /coupons - Listar todos los cupones
     */
    public function index(): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->query("
            SELECT c.*, 
                   a.nombre as afiliado_nombre,
                   a.codigo_afiliado
            FROM coupons c
            LEFT JOIN affiliates a ON c.afiliado_id = a.id
            ORDER BY c.created_at DESC
        ");
        
        $coupons = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
        Response::success($coupons);
    }

    /**
     * GET /coupons/{id} - Obtener cupón por ID
     */
    public function show(string $id): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->prepare("
            SELECT c.*, 
                   a.nombre as afiliado_nombre,
                   a.codigo_afiliado
            FROM coupons c
            LEFT JOIN affiliates a ON c.afiliado_id = a.id
            WHERE c.id = ?
        ");
        $stmt->execute([$id]);
        $coupon = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$coupon) {
            Response::error('Cupón no encontrado', 404);
        }

        Response::success($coupon);
    }

    /**
     * POST /coupons - Crear nuevo cupón
     */
    public function store(): void
    {
        Auth::requireAdmin();

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $validator = new Validator($data);
        $validator
            ->required('code')
            ->required('tipo')
            ->required('valor')
            ->validate();

        // Verificar que el código no exista
        $stmt = $this->pdo->prepare("SELECT id FROM coupons WHERE code = ?");
        $stmt->execute([strtoupper($data['code'])]);
        if ($stmt->fetch()) {
            Response::error('El código de cupón ya existe', 400);
        }

        $id = $this->generateUUID();
        
        $stmt = $this->pdo->prepare("
            INSERT INTO coupons (id, code, categoria, tipo, valor, descripcion, min_compra, max_usos, usos_actuales, fecha_inicio, fecha_fin, afiliado_id, comision_porcentaje, activo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)
        ");

        $stmt->execute([
            $id,
            strtoupper($data['code']),
            $data['categoria'] ?? 'descuento',
            $data['tipo'],
            $data['valor'],
            $data['descripcion'] ?? null,
            $data['min_compra'] ?? null,
            $data['max_usos'] ?? null,
            $data['fecha_inicio'] ?? null,
            $data['fecha_fin'] ?? null,
            $data['afiliado_id'] ?? null,
            $data['comision_porcentaje'] ?? null,
            $data['activo'] ?? 1
        ]);

        Response::success(['id' => $id], 'Cupón creado exitosamente', 201);
    }

    /**
     * PUT /coupons/{id} - Actualizar cupón
     */
    public function update(string $id): void
    {
        Auth::requireAdmin();

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        // Verificar que existe
        $stmt = $this->pdo->prepare("SELECT id FROM coupons WHERE id = ?");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            Response::error('Cupón no encontrado', 404);
        }

        // Verificar código único si se está cambiando
        if (!empty($data['code'])) {
            $stmt = $this->pdo->prepare("SELECT id FROM coupons WHERE code = ? AND id != ?");
            $stmt->execute([strtoupper($data['code']), $id]);
            if ($stmt->fetch()) {
                Response::error('El código de cupón ya existe', 400);
            }
        }

        $fields = [];
        $values = [];

        $allowedFields = ['code', 'categoria', 'tipo', 'valor', 'descripcion', 'min_compra', 'max_usos', 'fecha_inicio', 'fecha_fin', 'afiliado_id', 'comision_porcentaje', 'activo'];

        foreach ($allowedFields as $field) {
            if (array_key_exists($field, $data)) {
                $fields[] = "$field = ?";
                $value = $data[$field];
                if ($field === 'code') $value = strtoupper($value);
                $values[] = $value;
            }
        }

        if (empty($fields)) {
            Response::error('No hay datos para actualizar', 400);
        }

        $values[] = $id;
        $sql = "UPDATE coupons SET " . implode(', ', $fields) . " WHERE id = ?";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($values);

        Response::success(null, 'Cupón actualizado exitosamente');
    }

    /**
     * DELETE /coupons/{id} - Eliminar cupón
     */
    public function destroy(string $id): void
    {
        Auth::requireAdmin();

        $stmt = $this->pdo->prepare("SELECT id FROM coupons WHERE id = ?");
        $stmt->execute([$id]);
        if (!$stmt->fetch()) {
            Response::error('Cupón no encontrado', 404);
        }

        $stmt = $this->pdo->prepare("DELETE FROM coupons WHERE id = ?");
        $stmt->execute([$id]);

        Response::success(null, 'Cupón eliminado exitosamente');
    }

    /**
     * GET /coupons/validate/{code} - Validar cupón (público)
     */
    public function validate(string $code): void
    {
        $stmt = $this->pdo->prepare("
            SELECT * FROM coupons 
            WHERE code = ? 
            AND activo = 1
            AND (fecha_inicio IS NULL OR fecha_inicio <= CURDATE())
            AND (fecha_fin IS NULL OR fecha_fin >= CURDATE())
            AND (max_usos IS NULL OR usos_actuales < max_usos)
        ");
        $stmt->execute([strtoupper($code)]);
        $coupon = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$coupon) {
            Response::error('Cupón inválido o expirado', 400);
        }

        Response::success([
            'id' => $coupon['id'],
            'code' => $coupon['code'],
            'tipo' => $coupon['tipo'],
            'valor' => $coupon['valor'],
            'min_compra' => $coupon['min_compra'],
            'descripcion' => $coupon['descripcion']
        ]);
    }

    /**
     * POST /coupons/use/{id} - Registrar uso de cupón
     */
    public function use(string $id): void
    {
        $stmt = $this->pdo->prepare("UPDATE coupons SET usos_actuales = usos_actuales + 1 WHERE id = ?");
        $stmt->execute([$id]);
        
        Response::success(null, 'Uso registrado');
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
