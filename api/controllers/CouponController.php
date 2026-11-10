<?php
/**
 * Coupon Controller - Con soporte para afiliados
 */

namespace App\Controllers;

use App\Response;
use App\Validator;
use App\Models\Coupon;

class CouponController
{
    private Coupon $couponModel;

    public function __construct()
    {
        $this->couponModel = new Coupon();
    }

    /**
     * POST /api/coupons/validate - Validar cupón
     */
    public function validate(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $validator = new Validator($data);
        $validator
            ->required('code', 'El código del cupón es requerido')
            ->required('subtotal', 'El subtotal es requerido')
            ->validate();
        
        $result = $this->couponModel->validate($data['code'], floatval($data['subtotal']));
        
        if ($result['valid']) {
            Response::success($result);
        } else {
            Response::error($result['error'], 400);
        }
    }

    /**
     * GET /api/coupons - Listar cupones (admin)
     */
    public function getAll(): void
    {
        $categoria = $_GET['categoria'] ?? null;
        
        if ($categoria) {
            $coupons = $this->couponModel->getByCategoria($categoria);
        } else {
            $coupons = $this->couponModel->getAll();
        }
        
        Response::success($coupons);
    }

    /**
     * GET /api/coupons/:id - Obtener cupón por ID
     */
    public function getById(string $id): void
    {
        $coupon = $this->couponModel->findById($id);
        
        if (!$coupon) {
            Response::error('Cupón no encontrado', 404);
            return;
        }
        
        Response::success($coupon);
    }

    /**
     * POST /api/coupons - Crear cupón (admin)
     */
    public function create(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $validator = new Validator($data);
        $validator
            ->required('code', 'El código es requerido')
            ->required('valor', 'El valor es requerido')
            ->validate();
        
        $coupon = $this->couponModel->create($data);
        
        Response::success($coupon, 'Cupón creado exitosamente', 201);
    }

    /**
     * PUT /api/coupons/:id - Actualizar cupón
     */
    public function update(string $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $coupon = $this->couponModel->update($id, $data);
        
        if (!$coupon) {
            Response::error('Cupón no encontrado', 404);
            return;
        }
        
        Response::success($coupon, 'Cupón actualizado');
    }

    /**
     * DELETE /api/coupons/:id - Eliminar cupón
     */
    public function delete(string $id): void
    {
        $coupon = $this->couponModel->findById($id);
        
        if (!$coupon) {
            Response::error('Cupón no encontrado', 404);
            return;
        }
        
        $this->couponModel->delete($id);
        
        Response::success(null, 'Cupón eliminado');
    }
}
