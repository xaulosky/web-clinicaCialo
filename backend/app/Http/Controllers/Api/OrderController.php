<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Coupon;
use App\Models\Affiliate;
use App\Models\Commission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('items')->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Órdenes obtenidas',
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer' => 'required|array',
            'customer.nombre' => 'required|string',
            'customer.apellido' => 'required|string',
            'customer.email' => 'required|email',
            'customer.telefono' => 'required|string',
            'customer.rut' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.image' => 'nullable|string',
            'items.*.type' => 'nullable|string|in:producto,tratamiento,consulta',
            'items.*.agendaUrl' => 'nullable|string',
            'subtotal' => 'required|numeric',
            'total' => 'required|numeric',
            'user_id' => 'nullable|string',
            'coupon_id' => 'nullable|string',
            'coupon_code' => 'nullable|string',
            'discount' => 'nullable|numeric',
            'affiliate_id' => 'nullable|string',
            'comision_porcentaje' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $orderNumber = $this->generateOrderNumber();
        $retiroCode = $this->generateRetiroCode();

        $customer = $request->customer;

        $order = Order::create([
            'order_number' => $orderNumber,
            'retiro_code' => $retiroCode,
            'status' => 'PENDIENTE',
            'subtotal' => $request->subtotal,
            'total' => $request->total,
            'coupon_id' => $request->coupon_id,
            'coupon_code' => $request->coupon_code,
            'descuento' => $request->discount ?? 0,
            'customer_name' => $customer['nombre'] . ' ' . $customer['apellido'],
            'customer_email' => $customer['email'],
            'customer_phone' => $customer['telefono'],
            'customer_rut' => $customer['rut'] ?? null,
            'delivery_method' => 'retiro',
            'user_id' => $request->user_id,
        ]);

        foreach ($request->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'image' => $item['image'] ?? null,
                'type' => $item['type'] ?? 'producto',
                'agenda_url' => $item['agendaUrl'] ?? null,
            ]);
        }

        // Si hay cupón de afiliado, registrar comisión
        if ($request->coupon_id && $request->affiliate_id && $request->comision_porcentaje) {
            $montoComision = round($request->total * ($request->comision_porcentaje / 100), 2);
            Commission::create([
                'affiliate_id' => $request->affiliate_id,
                'order_id' => $order->id,
                'coupon_id' => $request->coupon_id,
                'monto_venta' => $request->total,
                'porcentaje_comision' => $request->comision_porcentaje,
                'monto_comision' => $montoComision,
                'estado' => 'pendiente',
            ]);

            // Actualizar totales del afiliado
            $affiliate = Affiliate::find($request->affiliate_id);
            if ($affiliate) {
                $affiliate->total_ventas += $request->total;
                $affiliate->total_comisiones += $montoComision;
                $affiliate->save();
            }
        }

        // Incrementar uso del cupón
        if ($request->coupon_code) {
            $coupon = Coupon::where('code', strtoupper(trim($request->coupon_code)))->first();
            if ($coupon) {
                $coupon->usos_actuales += 1;
                $coupon->save();
            }
        }

        $order->load('items');

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Orden creada exitosamente',
        ], 201);
    }

    public function show($id)
    {
        $order = Order::with('items')->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Orden no encontrada',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Orden obtenida',
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Orden no encontrada',
            ], 404);
        }

        $allowedFields = ['status', 'transaction_id', 'paid_at', 'authorization_code', 'card_number', 'retiro_code'];
        $updateData = [];

        foreach ($allowedFields as $field) {
            if ($request->has($field)) {
                $updateData[$field] = $request->input($field);
            }
        }

        $order->update($updateData);
        $order->load('items');

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Orden actualizada',
        ]);
    }

    public function getByEmail($email)
    {
        $orders = Order::with('items')
            ->where('customer_email', strtolower($email))
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Órdenes obtenidas',
        ]);
    }

    public function showByNumber($number)
    {
        $order = Order::with('items')
            ->where('order_number', $number)
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Orden no encontrada',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Orden obtenida',
        ]);
    }

    public function showByRetiroCode($code)
    {
        $order = Order::with('items')
            ->where('retiro_code', strtoupper($code))
            ->first();

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Orden no encontrada',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Orden obtenida',
        ]);
    }

    private function generateOrderNumber(): string
    {
        $year = date('Y');
        $prefix = "CIALO-{$year}-";

        $lastOrder = Order::where('order_number', 'like', "{$prefix}%")
            ->orderBy('order_number', 'desc')
            ->first();

        $nextNum = 1;
        if ($lastOrder) {
            $numPart = (int) str_replace($prefix, '', $lastOrder->order_number);
            $nextNum = $numPart + 1;
        }

        return $prefix . str_pad($nextNum, 4, '0', STR_PAD_LEFT);
    }

    private function generateRetiroCode(): string
    {
        $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

        for ($attempt = 0; $attempt < 5; $attempt++) {
            $code = '';
            for ($i = 0; $i < 6; $i++) {
                $code .= $chars[random_int(0, strlen($chars) - 1)];
            }

            if (!Order::where('retiro_code', $code)->exists()) {
                return $code;
            }
        }

        return strtoupper(substr(Str::uuid()->toString(), -6));
    }
}
