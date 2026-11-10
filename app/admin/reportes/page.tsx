'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatPrice } from '@/lib/cart-store';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

// ---------- Tipos ----------

interface Overview {
    total_ventas: number;
    n_ordenes: number;
    ticket_promedio: number;
    total_descuentos: number;
    abonos_reservo: number;
    abonos_sin_cita: number;
    comisiones_pendientes: number;
    periodo?: string;
}

interface SalesPoint {
    periodo: string;
    total: number;
    n_ordenes: number;
    ticket_promedio: number;
    descuentos: number;
}

interface TopTreatment {
    name: string;
    type: string;
    unidades: number;
    ingresos: number;
}

interface StatusCount {
    status: string;
    n: number;
}

/** El embudo de Reservo separa las reservas cobradas de las gratuitas. */
interface ReservoStatusCount extends StatusCount {
    tipo?: 'con_pago' | 'gratis';
}

interface Conversion {
    creadas: number;
    pagadas: number;
    tasa_conversion: number;
    por_status: StatusCount[];
    reservo: ReservoStatusCount[];
}

interface ChannelRow {
    canal: string;
    ingresos: number;
    n_ordenes: number;
}

type GroupBy = 'day' | 'week' | 'month';
type TypeFilter = 'todos' | 'producto' | 'tratamiento' | 'consulta';

// ---------- Helpers ----------

function pad(n: number): string {
    return n < 10 ? `0${n}` : `${n}`;
}

function toYmd(d: Date): string {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function firstDayOfMonth(): string {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-01`;
}

function today(): string {
    return toYmd(new Date());
}

function daysAgo(n: number): string {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return toYmd(d);
}

async function adminGet<T>(path: string): Promise<T> {
    const token = localStorage.getItem('adminToken');
    const r = await fetch(API + path, {
        headers: { Authorization: 'Bearer ' + token },
    });
    if (r.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminSession');
        window.location.href = '/admin/login';
        throw new Error('Sesión expirada');
    }
    const j = await r.json();
    if (!j.success) throw new Error(j.message || 'Error');
    return j.data as T;
}

async function downloadCsv(path: string, filename: string) {
    const token = localStorage.getItem('adminToken');
    const r = await fetch(API + path, {
        headers: { Authorization: 'Bearer ' + token },
    });
    const blob = await r.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

const TYPE_LABELS: Record<string, string> = {
    producto: 'Producto',
    tratamiento: 'Tratamiento',
    consulta: 'Consulta',
};

function typeBadgeColor(type: string): string {
    switch (type) {
        case 'producto':
            return 'bg-blue-100 text-blue-800';
        case 'tratamiento':
            return 'bg-purple-100 text-purple-800';
        case 'consulta':
            return 'bg-emerald-100 text-emerald-800';
        default:
            return 'bg-gray-100 text-gray-700';
    }
}

function statusBadgeColor(status: string): string {
    const s = status.toLowerCase();
    if (s.includes('pag') || s.includes('paid') || s.includes('complet')) return 'bg-green-100 text-green-800';
    if (s.includes('pend')) return 'bg-yellow-100 text-yellow-800';
    if (s.includes('cancel') || s.includes('rechaz') || s.includes('fail')) return 'bg-red-100 text-red-800';
    if (s.includes('proces') || s.includes('confirm')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-700';
}

// Etiqueta corta del eje X según group_by
function axisLabel(periodo: string, groupBy: GroupBy): string {
    // periodo viene como YYYY-MM-DD, YYYY-Www o YYYY-MM
    if (groupBy === 'month') {
        const parts = periodo.split('-');
        return parts.length >= 2 ? `${parts[1]}/${parts[0].slice(2)}` : periodo;
    }
    if (groupBy === 'week') {
        return periodo;
    }
    const parts = periodo.split('-');
    return parts.length >= 3 ? `${parts[2]}/${parts[1]}` : periodo;
}

// ---------- Página ----------

export default function ReportesPage() {
    const [from, setFrom] = useState<string>(firstDayOfMonth());
    const [to, setTo] = useState<string>(today());
    const [groupBy, setGroupBy] = useState<GroupBy>('day');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('todos');

    const [overview, setOverview] = useState<Overview | null>(null);
    const [sales, setSales] = useState<SalesPoint[]>([]);
    const [topTreatments, setTopTreatments] = useState<TopTreatment[]>([]);
    const [conversion, setConversion] = useState<Conversion | null>(null);
    const [channels, setChannels] = useState<ChannelRow[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const range = `from=${from}&to=${to}`;

    const loadAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [ov, sl, tt, cv, ch] = await Promise.all([
                adminGet<Overview>(`/reports/overview?${range}`),
                adminGet<SalesPoint[]>(`/reports/sales?${range}&group_by=${groupBy}`),
                adminGet<TopTreatment[]>(`/reports/top-treatments?${range}&limit=10`),
                adminGet<Conversion>(`/reports/conversion?${range}`),
                adminGet<ChannelRow[]>(`/reports/sales-by-channel?${range}`),
            ]);
            setOverview(ov);
            setSales(Array.isArray(sl) ? sl : []);
            setTopTreatments(Array.isArray(tt) ? tt : []);
            setConversion(cv);
            setChannels(Array.isArray(ch) ? ch : []);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Error al cargar reportes');
        } finally {
            setLoading(false);
        }
    }, [range, groupBy]);

    useEffect(() => {
        loadAll();
    }, [loadAll]);

    // Recarga solo el gráfico de ventas al cambiar group_by (cubierto por loadAll, pero
    // mantenemos un loader específico para feedback inmediato).
    const [salesLoading, setSalesLoading] = useState(false);
    const reloadSales = useCallback(
        async (gb: GroupBy) => {
            setSalesLoading(true);
            try {
                const sl = await adminGet<SalesPoint[]>(`/reports/sales?${range}&group_by=${gb}`);
                setSales(Array.isArray(sl) ? sl : []);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Error al cargar ventas');
            } finally {
                setSalesLoading(false);
            }
        },
        [range]
    );

    const handleGroupBy = (gb: GroupBy) => {
        setGroupBy(gb);
        reloadSales(gb);
    };

    // Botones rápidos de rango
    const quickRange = (key: 'hoy' | '7' | '30' | 'mes') => {
        if (key === 'hoy') {
            setFrom(today());
            setTo(today());
        } else if (key === '7') {
            setFrom(daysAgo(6));
            setTo(today());
        } else if (key === '30') {
            setFrom(daysAgo(29));
            setTo(today());
        } else {
            setFrom(firstDayOfMonth());
            setTo(today());
        }
    };

    const filteredTreatments =
        typeFilter === 'todos'
            ? topTreatments
            : topTreatments.filter((t) => t.type === typeFilter);

    const maxSales = sales.reduce((m, s) => Math.max(m, s.total), 0) || 1;
    const maxChannel = channels.reduce((m, c) => Math.max(m, c.ingresos), 0) || 1;

    // Mostrar pocas etiquetas en el eje si hay muchas barras
    const labelEvery = sales.length > 14 ? Math.ceil(sales.length / 10) : 1;

    return (
        <div>
            {/* Encabezado */}
            <div className="mb-8">
                <h1 className="text-3xl font-serif text-[#1b1a18] font-bold">Reportes</h1>
                <p className="text-gray-500 mt-1">
                    Resumen de ventas, conversión y desempeño por período
                </p>
            </div>

            {/* Selector de rango */}
            <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 mb-8">
                <div className="flex flex-wrap items-end gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Desde
                        </label>
                        <input
                            type="date"
                            value={from}
                            max={to}
                            onChange={(e) => setFrom(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cialo-gold"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">
                            Hasta
                        </label>
                        <input
                            type="date"
                            value={to}
                            min={from}
                            onChange={(e) => setTo(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cialo-gold"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(
                            [
                                ['hoy', 'Hoy'],
                                ['7', '7 días'],
                                ['30', '30 días'],
                                ['mes', 'Este mes'],
                            ] as const
                        ).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => quickRange(key)}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200 transition-colors"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center justify-between">
                    <span>{error}</span>
                    <button
                        onClick={loadAll}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* Loading global */}
            {loading ? (
                <div className="p-16 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cialo-gold mx-auto"></div>
                    <p className="text-gray-400 mt-4">Cargando reportes…</p>
                </div>
            ) : (
                <>
                    {/* 1) KPIs */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
                        <KpiCard
                            icon="💰"
                            label="Ventas totales"
                            value={formatPrice(overview?.total_ventas || 0)}
                        />
                        <KpiCard
                            icon="🧾"
                            label="Nº pedidos"
                            value={String(overview?.n_ordenes || 0)}
                        />
                        <KpiCard
                            icon="🎯"
                            label="Ticket promedio"
                            value={formatPrice(overview?.ticket_promedio || 0)}
                        />
                        <KpiCard
                            icon="🏷️"
                            label="Descuentos"
                            value={formatPrice(overview?.total_descuentos || 0)}
                        />
                        <KpiCard
                            icon="📅"
                            label="Abonos Reservo"
                            value={formatPrice(overview?.abonos_reservo || 0)}
                        />
                        {/* Parte de los abonos de arriba que se cobró sin que la cita
                            llegara a crearse: hay que agendarla a mano o devolverla. */}
                        {!!overview?.abonos_sin_cita && (
                            <KpiCard
                                icon="⚠️"
                                label="Cobrado sin cita — revisar en Reservas"
                                value={formatPrice(overview.abonos_sin_cita)}
                            />
                        )}
                        <KpiCard
                            icon="⏳"
                            label="Comisiones pendientes"
                            value={formatPrice(overview?.comisiones_pendientes || 0)}
                        />
                    </div>

                    {/* 2) Gráfico de ventas */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-serif text-[#1b1a18] font-bold">
                                    Ventas por período
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Total facturado en el rango seleccionado
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
                                    {(
                                        [
                                            ['day', 'Día'],
                                            ['week', 'Semana'],
                                            ['month', 'Mes'],
                                        ] as const
                                    ).map(([gb, label]) => (
                                        <button
                                            key={gb}
                                            onClick={() => handleGroupBy(gb)}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                                groupBy === gb
                                                    ? 'bg-cialo-gold text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() =>
                                        downloadCsv(
                                            `/reports/sales?${range}&group_by=${groupBy}&format=csv`,
                                            `ventas_${from}_${to}.csv`
                                        )
                                    }
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
                                >
                                    Exportar CSV
                                </button>
                            </div>
                        </div>

                        {salesLoading ? (
                            <div className="h-64 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cialo-gold"></div>
                            </div>
                        ) : sales.length === 0 ? (
                            <div className="h-48 flex items-center justify-center text-gray-400">
                                No hay ventas en el período seleccionado
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <div
                                    className="flex items-end gap-1.5 h-64 min-w-full"
                                    style={{ minWidth: `${Math.max(sales.length * 28, 300)}px` }}
                                >
                                    {sales.map((s, i) => {
                                        const h = Math.max((s.total / maxSales) * 100, s.total > 0 ? 2 : 0);
                                        return (
                                            <div
                                                key={s.periodo + i}
                                                className="flex-1 flex flex-col items-center justify-end h-full group min-w-[16px]"
                                            >
                                                <div className="relative w-full flex justify-center">
                                                    <div className="absolute -top-9 hidden group-hover:block whitespace-nowrap bg-[#1b1a18] text-white text-xs px-2 py-1 rounded-md z-10">
                                                        {formatPrice(s.total)}
                                                        <span className="text-gray-300">
                                                            {' '}
                                                            · {s.n_ordenes} ped.
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="w-full max-w-[28px] bg-cialo-gold/80 group-hover:bg-cialo-gold rounded-t-md transition-all"
                                                    style={{ height: `${h}%` }}
                                                ></div>
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Eje X */}
                                <div
                                    className="flex gap-1.5 mt-2 min-w-full"
                                    style={{ minWidth: `${Math.max(sales.length * 28, 300)}px` }}
                                >
                                    {sales.map((s, i) => (
                                        <div
                                            key={s.periodo + i}
                                            className="flex-1 text-center text-[10px] text-gray-400 min-w-[16px] truncate"
                                        >
                                            {i % labelEvery === 0 ? axisLabel(s.periodo, groupBy) : ''}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 3) Top tratamientos / productos */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-xl font-serif text-[#1b1a18] font-bold">
                                    Top tratamientos y productos
                                </h2>
                                <p className="text-sm text-gray-500">Más vendidos por ingresos</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-200">
                                    {(
                                        [
                                            ['todos', 'Todos'],
                                            ['producto', 'Producto'],
                                            ['tratamiento', 'Tratamiento'],
                                            ['consulta', 'Consulta'],
                                        ] as const
                                    ).map(([t, label]) => (
                                        <button
                                            key={t}
                                            onClick={() => setTypeFilter(t)}
                                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                                                typeFilter === t
                                                    ? 'bg-cialo-gold text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={() =>
                                        downloadCsv(
                                            `/reports/top-treatments?${range}&limit=10&format=csv`,
                                            `top_tratamientos_${from}_${to}.csv`
                                        )
                                    }
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
                                >
                                    Exportar CSV
                                </button>
                            </div>
                        </div>

                        {filteredTreatments.length === 0 ? (
                            <div className="py-10 text-center text-gray-400">
                                No hay datos para el filtro seleccionado
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-gray-100">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                #
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                Nombre
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                                                Tipo
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                                Unidades
                                            </th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                                                Ingresos
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {filteredTreatments.map((t, i) => (
                                            <tr key={t.name + i} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
                                                <td className="px-4 py-3 font-medium text-gray-900">
                                                    {t.name}
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${typeBadgeColor(
                                                            t.type
                                                        )}`}
                                                    >
                                                        {TYPE_LABELS[t.type] || t.type}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-right text-gray-700">
                                                    {t.unidades}
                                                </td>
                                                <td className="px-4 py-3 text-right font-bold text-green-600">
                                                    {formatPrice(t.ingresos)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* 4) Conversión */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 mb-8">
                        <h2 className="text-xl font-serif text-[#1b1a18] font-bold mb-1">Conversión</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Órdenes creadas vs. pagadas en el período
                        </p>

                        {!conversion ? (
                            <div className="py-8 text-center text-gray-400">Sin datos de conversión</div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="text-2xl font-bold text-gray-900">
                                            {conversion.creadas}
                                        </div>
                                        <div className="text-sm text-gray-500">Creadas</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="text-2xl font-bold text-green-600">
                                            {conversion.pagadas}
                                        </div>
                                        <div className="text-sm text-gray-500">Pagadas</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                        <div className="text-2xl font-bold text-cialo-gold">
                                            {(conversion.tasa_conversion ?? 0).toFixed(1)}%
                                        </div>
                                        <div className="text-sm text-gray-500">Tasa de conversión</div>
                                    </div>
                                </div>

                                {/* Barra de progreso de conversión */}
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-6">
                                    <div
                                        className="h-full bg-cialo-gold rounded-full transition-all"
                                        style={{
                                            width: `${Math.min(conversion.tasa_conversion ?? 0, 100)}%`,
                                        }}
                                    ></div>
                                </div>

                                {conversion.por_status?.length > 0 && (
                                    <div className="mb-4">
                                        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                            Por estado (pedidos)
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {conversion.por_status.map((ps) => (
                                                <span
                                                    key={ps.status}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeColor(
                                                        ps.status
                                                    )}`}
                                                >
                                                    {ps.status}: {ps.n}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {conversion.reservo?.length > 0 && (
                                    <div>
                                        <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                            Estado en Reservo
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {conversion.reservo.map((rs) => (
                                                <span
                                                    key={`${rs.status}-${rs.tipo ?? 'x'}`}
                                                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadgeColor(
                                                        rs.status
                                                    )}`}
                                                >
                                                    {rs.status}{rs.tipo === 'gratis' ? ' (gratis)' : ''}: {rs.n}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* 5) Ventas por canal */}
                    <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 mb-8">
                        <h2 className="text-xl font-serif text-[#1b1a18] font-bold mb-1">
                            Ventas por canal
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">Distribución de ingresos por origen</p>

                        {channels.length === 0 ? (
                            <div className="py-8 text-center text-gray-400">Sin datos de canales</div>
                        ) : (
                            <div className="space-y-3">
                                {channels.map((c, i) => (
                                    <div key={c.canal + i}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">
                                                {c.canal}
                                                <span className="text-gray-400 font-normal">
                                                    {' '}
                                                    · {c.n_ordenes} pedidos
                                                </span>
                                            </span>
                                            <span className="text-sm font-bold text-gray-900">
                                                {formatPrice(c.ingresos)}
                                            </span>
                                        </div>
                                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-cialo-gold rounded-full transition-all"
                                                style={{
                                                    width: `${Math.max(
                                                        (c.ingresos / maxChannel) * 100,
                                                        c.ingresos > 0 ? 2 : 0
                                                    )}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

// ---------- Componentes ----------

function KpiCard({ icon, label, value }: { icon: string; label: string; value: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100">
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-xl font-bold text-[#1b1a18] truncate" title={value}>
                {value}
            </div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    );
}
