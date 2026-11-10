<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AffiliateController extends Controller
{
    public function index(Request $request)
    {
        $query = Affiliate::with(['coupons', 'commissions'])->orderBy('created_at', 'desc');

        if (!$request->has('all') || $request->all !== 'true') {
            $query->where('activo', true);
        }

        $affiliates = $query->get();

        foreach ($affiliates as $affiliate) {
            $affiliate->total_ordenes = $affiliate->commissions()->count();
            $affiliate->comisiones_pendientes = $affiliate->total_comisiones - $affiliate->comisiones_pagadas;
        }

        return response()->json([
            'success' => true,
            'data' => $affiliates,
            'message' => 'Afiliados obtenidos',
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'email' => 'required|email',
            'telefono' => 'nullable|string|max:20',
            'rut' => 'nullable|string|max:20',
            'banco' => 'nullable|string|max:50',
            'tipo_cuenta' => 'nullable|string|in:corriente,vista,ahorro',
            'numero_cuenta' => 'nullable|string|max:50',
            'comision_default' => 'nullable|numeric',
            'descuento' => 'nullable|numeric',
            'user_id' => 'nullable|string',
            'activo' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
            ], 422);
        }

        $codigo = $this->generateCode($request->nombre);

        $affiliate = Affiliate::create([
            'user_id' => $request->user_id,
            'codigo_afiliado' => $codigo,
            'nombre' => $request->nombre,
            'email' => $request->email,
            'telefono' => $request->telefono,
            'rut' => $request->rut,
            'banco' => $request->banco,
            'tipo_cuenta' => $request->tipo_cuenta,
            'numero_cuenta' => $request->numero_cuenta,
            'comision_default' => $request->comision_default ?? 10.00,
            'activo' => $request->activo ?? true,
        ]);

        // Crear cupón automático para el afiliado
        Coupon::create([
            'code' => $codigo,
            'categoria' => 'afiliado',
            'tipo' => 'porcentaje',
            'valor' => $request->descuento ?? 10,
            'descripcion' => ($request->descuento ?? 10) . '% de descuento',
            'afiliado_id' => $affiliate->id,
            'comision_porcentaje' => $request->comision_default ?? 10,
            'activo' => true,
        ]);

        return response()->json([
            'success' => true,
            'data' => $affiliate,
            'message' => 'Afiliado creado exitosamente. Código: ' . $affiliate->codigo_afiliado,
        ], 201);
    }

    public function show($id)
    {
        $affiliate = Affiliate::with(['coupons', 'commissions.order'])->find($id);

        if (!$affiliate) {
            return response()->json([
                'success' => false,
                'message' => 'Afiliado no encontrado',
            ], 404);
        }

        $affiliate->comisiones_resumen = [
            'pendientes_count' => $affiliate->commissions->where('estado->value', 'pendiente')->count(),
            'pendientes_monto' => $affiliate->commissions->where('estado->value', 'pendiente')->sum('monto_comision'),
            'aprobadas_count' => $affiliate->commissions->where('estado->value', 'aprobada')->count(),
            'aprobadas_monto' => $affiliate->commissions->where('estado->value', 'aprobada')->sum('monto_comision'),
            'pagadas_count' => $affiliate->commissions->where('estado->value', 'pagada')->count(),
            'pagadas_monto' => $affiliate->commissions->where('estado->value', 'pagada')->sum('monto_comision'),
        ];

        $affiliate->stats_mes = [
            'ventas_mes' => $affiliate->commissions()
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
            'total_ventas_mes' => $affiliate->commissions()
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->sum('monto_venta'),
            'comisiones_mes' => $affiliate->commissions()
                ->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->sum('monto_comision'),
        ];

        return response()->json([
            'success' => true,
            'data' => $affiliate,
            'message' => 'Afiliado obtenido',
        ]);
    }

    public function update(Request $request, $id)
    {
        $affiliate = Affiliate::find($id);

        if (!$affiliate) {
            return response()->json([
                'success' => false,
                'message' => 'Afiliado no encontrado',
            ], 404);
        }

        $allowedFields = ['nombre', 'email', 'telefono', 'rut', 'banco', 'tipo_cuenta', 'numero_cuenta', 'comision_default', 'activo'];
        $updateData = [];

        foreach ($allowedFields as $field) {
            if ($request->has($field)) {
                $updateData[$field] = $request->input($field);
            }
        }

        $affiliate->update($updateData);

        return response()->json([
            'success' => true,
            'data' => $affiliate,
            'message' => 'Afiliado actualizado',
        ]);
    }

    public function destroy($id)
    {
        $affiliate = Affiliate::find($id);

        if (!$affiliate) {
            return response()->json([
                'success' => false,
                'message' => 'Afiliado no encontrado',
            ], 404);
        }

        $affiliate->delete();

        return response()->json([
            'success' => true,
            'data' => null,
            'message' => 'Afiliado eliminado',
        ]);
    }

    public function stats()
    {
        $affiliates = Affiliate::with('commissions')->get();

        $totalAfiliados = $affiliates->count();
        $totalVentas = $affiliates->sum('total_ventas');
        $totalComisiones = $affiliates->sum('total_comisiones');
        $comisionesPendientes = $affiliates->sum(fn($a) => $a->total_comisiones - $a->comisiones_pagadas);

        return response()->json([
            'success' => true,
            'data' => [
                'total_afiliados' => $totalAfiliados,
                'total_ventas' => $totalVentas,
                'total_comisiones' => $totalComisiones,
                'comisiones_pendientes' => $comisionesPendientes,
                'top_afiliados' => $affiliates->sortByDesc('total_ventas')->take(5)->values(),
            ],
            'message' => 'Estadísticas obtenidas',
        ]);
    }

    private function generateCode(string $nombre): string
    {
        $prefix = strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $nombre), 0, 4));
        if (strlen($prefix) < 2) {
            $prefix = strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $nombre . 'CIAL'), 0, 4));
        }
        $suffix = rand(100, 999);
        $code = $prefix . $suffix;

        if (Affiliate::where('codigo_afiliado', $code)->exists()) {
            return $this->generateCode($nombre . rand(0, 9));
        }

        return $code;
    }
}
