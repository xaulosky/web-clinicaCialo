<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commission;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Commission::with(['affiliate', 'order', 'coupon'])->orderBy('created_at', 'desc');

        if ($request->has('estado')) {
            $query->where('estado', $request->estado);
        }

        if ($request->has('affiliate_id')) {
            $query->where('affiliate_id', $request->affiliate_id);
        }

        $commissions = $query->get();

        return response()->json([
            'success' => true,
            'data' => $commissions,
            'message' => 'Comisiones obtenidas',
        ]);
    }

    public function show($id)
    {
        $commission = Commission::with(['affiliate', 'order', 'coupon'])->find($id);

        if (!$commission) {
            return response()->json([
                'success' => false,
                'message' => 'Comisión no encontrada',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $commission,
            'message' => 'Comisión obtenida',
        ]);
    }

    public function approve($id)
    {
        $commission = Commission::find($id);

        if (!$commission) {
            return response()->json([
                'success' => false,
                'message' => 'Comisión no encontrada',
            ], 404);
        }

        if ($commission->estado->value !== 'pendiente') {
            return response()->json([
                'success' => false,
                'message' => 'Solo se pueden aprobar comisiones pendientes',
            ], 400);
        }

        $commission->estado = 'aprobada';
        $commission->save();

        return response()->json([
            'success' => true,
            'data' => $commission,
            'message' => 'Comisión aprobada',
        ]);
    }

    public function pay(Request $request, $id)
    {
        $commission = Commission::find($id);

        if (!$commission) {
            return response()->json([
                'success' => false,
                'message' => 'Comisión no encontrada',
            ], 404);
        }

        if (!in_array($commission->estado->value, ['pendiente', 'aprobada'])) {
            return response()->json([
                'success' => false,
                'message' => 'Solo se pueden pagar comisiones pendientes o aprobadas',
            ], 400);
        }

        $nota = '';
        if ($request->has('notas')) {
            $nota = "\n[Pago] " . $request->notas;
        }

        $commission->estado = 'pagada';
        $commission->fecha_pago = now();
        $commission->notas = ($commission->notas ?? '') . $nota;
        $commission->save();

        // Actualizar totales del afiliado
        $affiliate = Affiliate::find($commission->affiliate_id);
        if ($affiliate) {
            $affiliate->comisiones_pagadas += $commission->monto_comision;
            $affiliate->save();
        }

        return response()->json([
            'success' => true,
            'data' => $commission,
            'message' => 'Comisión marcada como pagada',
        ]);
    }

    public function cancel(Request $request, $id)
    {
        $commission = Commission::find($id);

        if (!$commission) {
            return response()->json([
                'success' => false,
                'message' => 'Comisión no encontrada',
            ], 404);
        }

        if ($commission->estado->value === 'pagada') {
            return response()->json([
                'success' => false,
                'message' => 'No se puede cancelar una comisión ya pagada',
            ], 400);
        }

        $nota = $request->has('motivo') ? "\n[Cancelada] " . $request->motivo : "\n[Cancelada]";
        $commission->estado = 'cancelada';
        $commission->notas = ($commission->notas ?? '') . $nota;
        $commission->save();

        // Revertir totales del afiliado
        $affiliate = Affiliate::find($commission->affiliate_id);
        if ($affiliate) {
            $affiliate->total_ventas -= $commission->monto_venta;
            $affiliate->total_comisiones -= $commission->monto_comision;
            $affiliate->save();
        }

        return response()->json([
            'success' => true,
            'data' => $commission,
            'message' => 'Comisión cancelada',
        ]);
    }

    public function bulkPay(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Se requiere un array de IDs',
            ], 400);
        }

        $commissions = Commission::whereIn('id', $request->ids)
            ->whereIn('estado', ['pendiente', 'aprobada'])
            ->get();

        if ($commissions->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No hay comisiones válidas para pagar',
            ], 400);
        }

        foreach ($commissions as $commission) {
            $commission->estado = 'pagada';
            $commission->fecha_pago = now();
            $commission->save();
        }

        // Actualizar totales por afiliado
        $totalesPorAfiliado = [];
        foreach ($commissions as $c) {
            if (!isset($totalesPorAfiliado[$c->affiliate_id])) {
                $totalesPorAfiliado[$c->affiliate_id] = 0;
            }
            $totalesPorAfiliado[$c->affiliate_id] += $c->monto_comision;
        }

        foreach ($totalesPorAfiliado as $affiliateId => $total) {
            $affiliate = Affiliate::find($affiliateId);
            if ($affiliate) {
                $affiliate->comisiones_pagadas += $total;
                $affiliate->save();
            }
        }

        return response()->json([
            'success' => true,
            'data' => [
                'pagadas' => $commissions->count(),
                'total' => $commissions->sum('monto_comision'),
            ],
            'message' => 'Comisiones pagadas exitosamente',
        ]);
    }

    public function stats()
    {
        $porEstado = Commission::selectRaw('estado, COUNT(*) as cantidad, COALESCE(SUM(monto_comision), 0) as total')
            ->groupBy('estado')
            ->get();

        $totalPendiente = Commission::whereIn('estado', ['pendiente', 'aprobada'])
            ->sum('monto_comision');

        $esteMes = Commission::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->selectRaw('COUNT(*) as cantidad, COALESCE(SUM(monto_comision), 0) as total, COALESCE(SUM(monto_venta), 0) as ventas')
            ->first();

        $ultimosMeses = Commission::where('created_at', '>=', now()->subMonths(6))
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as mes, COUNT(*) as cantidad, COALESCE(SUM(monto_comision), 0) as comisiones, COALESCE(SUM(monto_venta), 0) as ventas")
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->orderBy('mes', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'por_estado' => $porEstado,
                'total_pendiente' => $totalPendiente,
                'este_mes' => $esteMes,
                'ultimos_meses' => $ultimosMeses,
            ],
            'message' => 'Estadísticas obtenidas',
        ]);
    }
}
