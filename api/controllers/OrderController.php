<?php
/**
 * Order Controller
 */

namespace App\Controllers;

use App\Response;
use App\Validator;
use App\Models\Order;

class OrderController
{
    private Order $orderModel;

    public function __construct()
    {
        $this->orderModel = new Order();
    }

    /**
     * POST /api/orders - Crear orden
     */
    public function create(): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $validator = new Validator($data);
        $validator
            ->required('customer')
            ->arrayNotEmpty('items')
            ->required('subtotal')
            ->required('total');
        
        // Validar customer
        if (isset($data['customer'])) {
            $customerValidator = new Validator($data['customer']);
            $customerValidator
                ->required('nombre', 'El nombre es requerido')
                ->required('apellido', 'El apellido es requerido')
                ->required('email', 'El email es requerido')
                ->email('email', 'El email no es válido')
                ->required('telefono', 'El teléfono es requerido');
        }
        
        $validator->validate();
        if (isset($customerValidator)) {
            $customerValidator->validate();
        }
        
        $order = $this->orderModel->create($data);

        Response::success($order, 'Orden creada exitosamente', 201);
    }

    /**
     * GET /api/orders/{id} - Obtener orden por ID
     */
    public function getById(string $id): void
    {
        $order = $this->orderModel->findById($id);
        
        if (!$order) {
            Response::notFound('Orden no encontrada');
        }
        
        Response::success($order);
    }

    /**
     * GET /api/orders/number/{number} - Obtener por número
     */
    public function getByNumber(string $number): void
    {
        $order = $this->orderModel->findByNumber($number);
        
        if (!$order) {
            Response::notFound('Orden no encontrada');
        }
        
        Response::success($order);
    }

    /**
     * GET /api/orders/retiro/{code} - Obtener por código de retiro
     */
    public function getByRetiroCode(string $code): void
    {
        $order = $this->orderModel->findByRetiroCode($code);
        
        if (!$order) {
            Response::notFound('Orden no encontrada');
        }
        
        Response::success($order);
    }

    /**
     * GET /api/orders/email/{email} - Obtener órdenes por email
     */
    public function getByEmail(string $email): void
    {
        $orders = $this->orderModel->findByEmail($email);
        Response::success($orders);
    }

    /**
     * GET /api/orders - Listar todas las órdenes
     */
    public function getAll(): void
    {
        $orders = $this->orderModel->getAll();
        Response::success($orders);
    }

    /**
     * PUT /api/orders/{id} - Actualizar orden
     */
    public function update(string $id): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];
        
        $order = $this->orderModel->findById($id);
        
        if (!$order) {
            Response::notFound('Orden no encontrada');
        }
        
        $updatedOrder = $this->orderModel->update($id, $data);
        
        Response::success($updatedOrder, 'Orden actualizada');
    }
}
