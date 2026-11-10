'use client';

import { useEffect, useState, useCallback } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

// ===== Tipos =====
interface SeriePunto {
    dia: string;
    visitas: number;
    eventos: number;
}

interface Overview {
    visitas: number;
    pageviews: number;
    serie: SeriePunto[];
}

interface TopPage {
    path: string;
    vistas: number;
    visitantes: number;
}

interface TopTreatment {
    treatment_id: string;
    treatment_category: string;
    vistas: number;
    visitantes: number;
}

interface FunnelStep {
    etapa: string;
    eventos: number;
    visitantes: number;
}

interface Source {
    fuente: string;
    visitantes: number;
    eventos: number;
}

interface SearchRow {
    search_term: string;
    veces: number;
    min_resultados: number;
}

// ===== Helpers de fechas =====
function toISODate(d: Date): string {
    return d.toISOString().slice(0, 10);
}

function defaultRange(): { from: string; to: string } {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - 29); // ÚLTIMOS 30 DÍAS (hoy + 29 atrás)
    return { from: toISODate(from), to: toISODate(to) };
}

// ===== Etiquetas legibles del embudo =====
const FUNNEL_LABELS: Record<string, string> = {
    page_view: 'Vio el sitio',
    view_treatment: 'Vio tratamiento',
    add_to_cart: 'Agregó al carro',
    begin_checkout: 'Inició checkout',
    purchase: 'Compró',
};

const FUNNEL_ORDER = ['page_view', 'view_treatment', 'add_to_cart', 'begin_checkout', 'purchase'];

function labelEtapa(etapa: string): string {
    return FUNNEL_LABELS[etapa] || etapa;
}

// ===== Helper genérico de fetch admin =====
async function adminGet<T>(path: string): Promise<T> {
    const token = localStorage.getItem('adminToken');
    const r = await fetch(API + path, { headers: { Authorization: 'Bearer ' + token } });
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

export default function AnaliticaPage() {
    const init = defaultRange();
    const [from, setFrom] = useState<string>(init.from);
    const [to, setTo] = useState<string>(init.to);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [overview, setOverview] = useState<Overview | null>(null);
    const [topPages, setTopPages] = useState<TopPage[]>([]);
    const [topTreatments, setTopTreatments] = useState<TopTreatment[]>([]);
    const [funnel, setFunnel] = useState<FunnelStep[]>([]);
    const [sources, setSources] = useState<Source[]>([]);
    const [searches, setSearches] = useState<SearchRow[]>([]);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const q = `from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
            const [ov, tp, tt, fn, sr, se] = await Promise.all([
                adminGet<Overview>(`/analytics/overview?${q}`),
                adminGet<{ pages: TopPage[] }>(`/analytics/top-pages?${q}&limit=15`),
                adminGet<{ treatments: TopTreatment[] }>(`/analytics/top-treatments?${q}&limit=15`),
                adminGet<{ funnel: FunnelStep[] }>(`/analytics/funnel?${q}`),
                adminGet<{ sources: Source[] }>(`/analytics/sources?${q}`),
                adminGet<{ searches: SearchRow[] }>(`/analytics/searches?${q}`),
            ]);
            setOverview(ov);
            setTopPages(tp?.pages ?? []);
            setTopTreatments(tt?.treatments ?? []);
            setFunnel(fn?.funnel ?? []);
            setSources(sr?.sources ?? []);
            setSearches(se?.searches ?? []);
        } catch (e) {
            const msg = e instanceof Error ? e.message : 'Error al cargar la analítica';
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [from, to]);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ===== Derivados =====
    const serie = overview?.serie ?? [];
    const maxSerie = serie.reduce((m, p) => Math.max(m, p.visitas), 0);
    const promedioDiario =
        serie.length > 0
            ? Math.round(serie.reduce((s, p) => s + p.visitas, 0) / serie.length)
            : 0;

    // Embudo ordenado según el flujo esperado, usando datos del API
    const funnelMap = new Map(funnel.map((f) => [f.etapa, f]));
    const funnelOrdered: FunnelStep[] = FUNNEL_ORDER
        .filter((etapa) => funnelMap.has(etapa))
        .map((etapa) => funnelMap.get(etapa) as FunnelStep);
    // Si el API devuelve etapas fuera de la lista conocida, añadirlas al final
    for (const f of funnel) {
        if (!FUNNEL_ORDER.includes(f.etapa)) funnelOrdered.push(f);
    }
    const funnelBase = funnelOrdered.length > 0 ? funnelOrdered[0].visitantes : 0;

    const hayDatos =
        (overview?.visitas ?? 0) > 0 ||
        (overview?.pageviews ?? 0) > 0 ||
        serie.length > 0 ||
        topPages.length > 0 ||
        topTreatments.length > 0 ||
        funnelOrdered.length > 0 ||
        sources.length > 0 ||
        searches.length > 0;

    const cardClass =
        'bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-100';

    return (
        <div>
            {/* Encabezado */}
            <div className="mb-8">
                <h1 className="text-3xl font-serif text-[#1b1a18] font-bold">Analítica web</h1>
                <p className="text-gray-500 mt-1">
                    Datos propios (first-party) recopilados directamente en cialo.cl. No provienen de
                    Google Analytics ni Meta.
                </p>
            </div>

            {/* Selector de rango */}
            <div className={`${cardClass} mb-8`}>
                <div className="flex flex-wrap items-end gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Desde</label>
                        <input
                            type="date"
                            value={from}
                            max={to}
                            onChange={(e) => setFrom(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold outline-none text-[#1b1a18]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
                        <input
                            type="date"
                            value={to}
                            min={from}
                            onChange={(e) => setTo(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold outline-none text-[#1b1a18]"
                        />
                    </div>
                    <button
                        onClick={loadData}
                        disabled={loading}
                        className="px-6 py-2 bg-cialo-gold text-[#1b1a18] rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        Aplicar
                    </button>
                </div>
            </div>

            {/* Estado: loading */}
            {loading && (
                <div className={`${cardClass} flex items-center justify-center py-16`}>
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold"></div>
                </div>
            )}

            {/* Estado: error */}
            {!loading && error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <p className="font-medium text-red-800">No se pudo cargar la analítica</p>
                        <p className="text-sm text-red-600 mt-1">{error}</p>
                    </div>
                    <button
                        onClick={loadData}
                        className="px-5 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors self-start"
                    >
                        Reintentar
                    </button>
                </div>
            )}

            {/* Estado: vacío */}
            {!loading && !error && !hayDatos && (
                <div className={`${cardClass} text-center py-16`}>
                    <p className="text-gray-500">
                        No hay datos de analítica para el rango seleccionado.
                    </p>
                </div>
            )}

            {/* Contenido */}
            {!loading && !error && hayDatos && (
                <div className="space-y-8">
                    {/* 1) KPIs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className={cardClass}>
                            <div className="text-sm text-gray-500">Visitantes únicos</div>
                            <div className="text-3xl font-serif font-bold text-[#1b1a18] mt-2">
                                {(overview?.visitas ?? 0).toLocaleString('es-CL')}
                            </div>
                        </div>
                        <div className={cardClass}>
                            <div className="text-sm text-gray-500">Páginas vistas</div>
                            <div className="text-3xl font-serif font-bold text-[#1b1a18] mt-2">
                                {(overview?.pageviews ?? 0).toLocaleString('es-CL')}
                            </div>
                        </div>
                        <div className={cardClass}>
                            <div className="text-sm text-gray-500">Promedio diario de visitas</div>
                            <div className="text-3xl font-serif font-bold text-[#1b1a18] mt-2">
                                {serie.length > 0 ? promedioDiario.toLocaleString('es-CL') : '—'}
                            </div>
                        </div>
                    </div>

                    {/* 2) Gráfico de barras de la serie diaria */}
                    <div className={cardClass}>
                        <h2 className="text-xl font-serif font-bold text-[#1b1a18] mb-1">
                            Visitas por día
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Visitantes únicos diarios en el rango seleccionado.
                        </p>
                        {serie.length === 0 ? (
                            <p className="text-gray-400 text-sm">Sin datos en el rango.</p>
                        ) : (
                            <div className="flex items-end gap-1 h-48 w-full">
                                {serie.map((p) => {
                                    const h = maxSerie > 0 ? Math.round((p.visitas / maxSerie) * 100) : 0;
                                    return (
                                        <div
                                            key={p.dia}
                                            className="flex-1 flex flex-col justify-end items-center group min-w-0"
                                            title={`${p.dia}: ${p.visitas} visitas, ${p.eventos} eventos`}
                                        >
                                            <div className="text-[10px] text-gray-500 mb-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {p.visitas}
                                            </div>
                                            <div
                                                className="w-full bg-cialo-gold rounded-t hover:opacity-80 transition-opacity"
                                                style={{ height: `${Math.max(h, 2)}%` }}
                                            ></div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {serie.length > 0 && (
                            <div className="flex justify-between text-[10px] text-gray-400 mt-2">
                                <span>{serie[0].dia}</span>
                                <span>{serie[serie.length - 1].dia}</span>
                            </div>
                        )}
                    </div>

                    {/* 3) Embudo de conversión */}
                    <div className={cardClass}>
                        <h2 className="text-xl font-serif font-bold text-[#1b1a18] mb-1">
                            Embudo de conversión
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Visitantes que avanzan en cada etapa. El porcentaje es respecto a quienes
                            vieron el sitio.
                        </p>
                        {funnelOrdered.length === 0 ? (
                            <p className="text-gray-400 text-sm">Sin datos de embudo.</p>
                        ) : (
                            <div className="space-y-4">
                                {funnelOrdered.map((step, idx) => {
                                    const pctBase =
                                        funnelBase > 0
                                            ? Math.round((step.visitantes / funnelBase) * 100)
                                            : 0;
                                    const prev = idx > 0 ? funnelOrdered[idx - 1].visitantes : null;
                                    const pctPaso =
                                        prev && prev > 0
                                            ? Math.round((step.visitantes / prev) * 100)
                                            : null;
                                    return (
                                        <div key={step.etapa}>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <span className="font-medium text-[#1b1a18]">
                                                    {labelEtapa(step.etapa)}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    {step.visitantes.toLocaleString('es-CL')} visitantes
                                                    {pctPaso !== null && (
                                                        <span className="text-gray-400 ml-2">
                                                            ({pctPaso}% del paso anterior)
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden">
                                                <div
                                                    className="bg-cialo-gold h-6 rounded-full flex items-center justify-end pr-2 transition-all"
                                                    style={{ width: `${Math.max(pctBase, 1)}%` }}
                                                >
                                                    <span className="text-[11px] font-medium text-[#1b1a18]">
                                                        {pctBase}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* 4) Páginas más vistas */}
                    <div className={cardClass}>
                        <h2 className="text-xl font-serif font-bold text-[#1b1a18] mb-4">
                            Páginas más vistas
                        </h2>
                        {topPages.length === 0 ? (
                            <p className="text-gray-400 text-sm">Sin datos.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-100">
                                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase">
                                            <th className="py-3 pr-4">Ruta</th>
                                            <th className="py-3 px-4 text-right">Vistas</th>
                                            <th className="py-3 pl-4 text-right">Visitantes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {topPages.map((p, i) => (
                                            <tr key={`${p.path}-${i}`} className="hover:bg-gray-50">
                                                <td className="py-3 pr-4 font-mono text-[#1b1a18] break-all">
                                                    {p.path}
                                                </td>
                                                <td className="py-3 px-4 text-right text-gray-700">
                                                    {p.vistas.toLocaleString('es-CL')}
                                                </td>
                                                <td className="py-3 pl-4 text-right text-gray-700">
                                                    {p.visitantes.toLocaleString('es-CL')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* 5) Tratamientos más vistos */}
                    <div className={cardClass}>
                        <h2 className="text-xl font-serif font-bold text-[#1b1a18] mb-4">
                            Tratamientos más vistos
                        </h2>
                        {topTreatments.length === 0 ? (
                            <p className="text-gray-400 text-sm">Sin datos.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-100">
                                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase">
                                            <th className="py-3 pr-4">Tratamiento</th>
                                            <th className="py-3 px-4">Categoría</th>
                                            <th className="py-3 px-4 text-right">Vistas</th>
                                            <th className="py-3 pl-4 text-right">Visitantes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {topTreatments.map((t, i) => (
                                            <tr key={`${t.treatment_id}-${i}`} className="hover:bg-gray-50">
                                                <td className="py-3 pr-4 font-mono text-[#1b1a18] break-all">
                                                    {t.treatment_id}
                                                </td>
                                                <td className="py-3 px-4 text-gray-700">
                                                    {t.treatment_category || '—'}
                                                </td>
                                                <td className="py-3 px-4 text-right text-gray-700">
                                                    {t.vistas.toLocaleString('es-CL')}
                                                </td>
                                                <td className="py-3 pl-4 text-right text-gray-700">
                                                    {t.visitantes.toLocaleString('es-CL')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* 6) Fuentes de tráfico */}
                    <div className={cardClass}>
                        <h2 className="text-xl font-serif font-bold text-[#1b1a18] mb-4">
                            Fuentes de tráfico
                        </h2>
                        {sources.length === 0 ? (
                            <p className="text-gray-400 text-sm">Sin datos.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-100">
                                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase">
                                            <th className="py-3 pr-4">Fuente</th>
                                            <th className="py-3 pl-4 text-right">Visitantes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {sources.map((s, i) => (
                                            <tr key={`${s.fuente}-${i}`} className="hover:bg-gray-50">
                                                <td className="py-3 pr-4 text-[#1b1a18]">
                                                    {s.fuente || 'Directo'}
                                                </td>
                                                <td className="py-3 pl-4 text-right text-gray-700">
                                                    {s.visitantes.toLocaleString('es-CL')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    {/* 7) Búsquedas */}
                    <div className={cardClass}>
                        <h2 className="text-xl font-serif font-bold text-[#1b1a18] mb-4">Búsquedas</h2>
                        {searches.length === 0 ? (
                            <p className="text-gray-400 text-sm">Sin datos.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-100">
                                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase">
                                            <th className="py-3 pr-4">Término</th>
                                            <th className="py-3 pl-4 text-right">Veces</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {searches.map((s, i) => {
                                            const sinResultados = s.min_resultados === 0;
                                            return (
                                                <tr
                                                    key={`${s.search_term}-${i}`}
                                                    className={
                                                        sinResultados
                                                            ? 'bg-amber-50 hover:bg-amber-100'
                                                            : 'hover:bg-gray-50'
                                                    }
                                                >
                                                    <td className="py-3 pr-4 text-[#1b1a18]">
                                                        <span className="align-middle">{s.search_term}</span>
                                                        {sinResultados && (
                                                            <span className="ml-2 inline-block px-2 py-0.5 text-[11px] font-medium rounded-full bg-red-100 text-red-700 align-middle">
                                                                Sin resultados
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 pl-4 text-right text-gray-700">
                                                        {s.veces.toLocaleString('es-CL')}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
