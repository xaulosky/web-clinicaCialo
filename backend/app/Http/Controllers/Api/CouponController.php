<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        $query = Coupon::with('affiliate')->orderBy('created_at', 'desc');

        if ($request->has('categoria')) {
            $query->where('categoria', $request->categoria);
        }

        $coupons = $query->get();

        return response()->json([
            'success' => true,
            'data' => $coupons,
            'message' => 'Cupones obtenidos',
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|unique:coupons,code',
            'categoria' => 'nullable|string|in:descuento,personal,afiliado',
            'tipo' => 'nullable|string|in:porcentaje,monto',
            'valor' => 'required|numeric',
            'descripcion' => 'nullable|string',
            'monto_minimo' => 'nullable|numeric',
            'descuento_maximo' => 'nullable|numeric',
            'usos_maximos' => 'nullable|integer',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date',
            'afiliado_id' => 'nullable|string',
            'comision_porcentaje' => 'nullable|numeric',
            'activo' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $coupon = Coupon::create([
            'code' => strtoupper(trim($request->code)),
            'categoria' => $request->categoria ?? 'descuento',
            'tipo' => $request->tipo ?? 'porcentaje',
            'valor' => $request->valor,
            'descripcion' => $request->descripcion,
            'monto_minimo' => $request->monto_minimo,
            'descuento_maximo' => $request->descuento_maximo,
            'usos_maximos' => $request->usos_maximos,
            'fecha_inicio' => $request->fecha_inicio,
            'fecha_fin' => $request->fecha_fin,
            'afiliado_id' => $request->afiliado_id,
            'comision_porcentaje' => $request->comision_porcentaje,
            'activo' => $request->activo ?? true,
        ]);

        return response()->json([
            'success' => true,
            'data' => $coupon,
            'message' => 'Cupón creado exitosamente',
        ], 201);
    }

    public function show($id)
    {
        $coupon = Coupon::with('affiliate')->find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Cupón no encontrado',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $coupon,
            'message' => 'Cupón obtenido',
        ]);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Cupón no encontrado',
            ], 404);
        }

        $allowedFields = ['code', 'categoria', 'tipo', 'valor', 'descripcion', 'monto_minimo', 'descuento_maximo', 'usos_maximos', 'fecha_inicio', 'fecha_fin', 'afiliado_id', 'comision_porcentaje', 'activo'];
        $updateData = [];

        foreach ($allowedFields as $field) {
            if ($request->has($field)) {
                $updateData[$field] = $field === 'code' ? strtoupper(trim($request->input($field))) : $request->input($field);
            }
        }

        $coupon->update($updateData);

        return response()->json([
            'success' => true,
            'data' => $coupon,
            'message' => 'Cupón actualizado',
        ]);
    }

    public function destroy($id)
    {
        $coupon = Coupon::find($id);

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Cupón no encontrado',
            ], 404);
        }

        $coupon->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Cupón eliminado',
        ]);
    }

    public function validate(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string',
            'subtotal' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $coupon = Coupon::with('affiliate')
            ->where('code', strtoupper(trim($request->code)))
            ->where('activo', true)
            ->first();

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Cupón no válido',
                'data' => ['valid' => false, 'error' => 'Cupón no válido'],
            ], 400);
        }

        $now = now();

        if ($coupon->fecha_inicio && $coupon->fecha_inicio > $now) {
            return response()->json([
                'success' => false,
                'message' => 'Este cupón aún no está activo',
                'data' => ['valid' => false, 'error' => 'Este cupón aún no está activo'],
            ], 400);
        }

        if ($coupon->fecha_fin && $coupon->fecha_fin < $now) {
            return response()->json([
                'success' => false,
                'message' => 'Este cupón ha expirado',
                'data' => ['valid' => false, 'error' => 'Este cupón ha expirado'],
            ], 400);
        }

        if ($coupon->usos_maximos && $coupon->usos_actuales >= $coupon->usos_maximos) {
            return response()->json([
                'success' => false,
                'message' => 'Este cupón ha alcanzado su límite de usos',
                'data' => ['valid' => false, 'error' => 'Este cupón ha alcanzado su límite de usos'],
            ], 400);
        }

        if ($coupon->monto_minimo && $request->subtotal < $coupon->monto_minimo) {
            return response()->json([
                'success' => false,
                'message' => 'Compra mínima de $' . number_format($coupon->monto_minimo, 0, ',', '.') . ' requerida',
                'data' => [
                    'valid' => false,
                    'error' => 'Compra mínima de $' . number_format($coupon->monto_minimo, 0, ',', '.') . ' requerida',
                ],
            ], 400);
        }

        $subtotal = (float) $request->subtotal;
        $discount = 0;

        if ($coupon->tipo->value === 'porcentaje') {
            $discount = $subtotal * ($coupon->valor / 100);
            if ($coupon->descuento_maximo && $discount > $coupon->descuento_maximo) {
                $discount = $coupon->descuento_maximo;
            }
        } else {
            $discount = min($coupon->valor, $subtotal);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'valid' => true,
                'id' => $coupon->id,
                'code' => $coupon->code,
                'categoria' => $coupon->categoria->value,
                'tipo' => $coupon->tipo->value,
                'valor' => $coupon->valor,
                'descuento' => round($discount),
                'descripcion' => $coupon->descripcion ?? ($coupon->tipo->value === 'porcentaje'
                    ? $coupon->valor . '% de descuento'
                    : '$' . number_format($coupon->valor, 0, ',', '.') . ' de descuento'),
                'es_afiliado' => $coupon->categoria->value === 'afiliado',
                'affiliate_id' => $coupon->afiliado_id,
                'afiliado_nombre' => $coupon->affiliate ? $coupon->affiliate->nombre : null,
                'comision_porcentaje' => $coupon->comision_porcentaje,
            ],
            'message' => 'Cupón válido',
        ]);
    }

    public function use(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
            ], 422);
        }

        $coupon = Coupon::where('code', strtoupper(trim($request->code)))->first();

        if (!$coupon) {
            return response()->json([
                'success' => false,
                'message' => 'Cupón no encontrado',
            ], 404);
        }

        $coupon->usos_actuales += 1;
        $coupon->save();

        return response()->json([
            'success' => true,
            'data' => $coupon,
            'message' => 'Uso registrado',
        ]);
    }
}
