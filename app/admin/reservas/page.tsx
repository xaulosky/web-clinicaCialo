'use client';

// Panel de reservas de hora (agendamiento online con abono por Webpay).
//
// Hasta ahora estos cobros existían solo en la base de datos: no había ninguna
// pantalla donde verlos. Lo más importante de esta página es la bandeja
// "Pagadas sin cita": dinero cobrado a un paciente cuya hora no llegó a crearse
// en reservo.cl. Cada fila ahí es una persona esperando una atención que el
// sistema no agendó.

import { useCallback, useEffect, useMemo, useState } from 'react';
import { reservasApi, type ReservaHora, type ReservasResumen, type ReservaStatus } from '@/lib/api';
import { profesionalesData } from '@/data/profesionales';
import { Badge, Button, Card, EmptyState, Icon, Initials, PageHeader, Spinner, StatCard } from '../components/ui';

/** id de reservo -> nombre legible; "91912" no le dice nada a nadie. */
const NOMBRE_PROFESIONAL: Record<string, string> = Object.fromEntries(
    profesionalesData
        .filter((p) => p.reservoId)
        .map((p) => [p.reservoId as string, `${p.titulo} ${p.nombre} ${p.apellido}`.trim()])
);

const ESTADOS: { valor: ReservaStatus | 'TODOS' | 'SIN_CITA'; etiqueta: string }[] = [
    { valor: 'SIN_CITA', etiqueta: 'Pagadas sin cita' },
    { valor: 'TODOS', etiqueta: 'Todas' },
    { valor: 'PAGADO', etiqueta: 'Confirmadas' },
    { valor: 'RECHAZADO', etiqueta: 'Rechazadas' },
    { valor: 'CANCELADO', etiqueta: 'Canceladas' },
    { valor: 'PENDIENTE', etiqueta: 'En curso' },
    { valor: 'ABANDONADO', etiqueta: 'Abandonadas' },
    { valor: 'ERROR', etiqueta: 'Con error' },
];

const TONO: Record<string, 'green' | 'red' | 'amber' | 'neutral'> = {
    PAGADO: 'green',
    PAGADO_SIN_CITA: 'red',
    PENDIENTE: 'amber',
    RECHAZADO: 'neutral',
    CANCELADO: 'neutral',
    ABANDONADO: 'neutral',
    ERROR: 'neutral',
};

const ETIQUETA: Record<string, string> = {
    PAGADO: 'Confirmada',
    PAGADO_SIN_CITA: 'Cobrada SIN cita',
    PENDIENTE: 'Pago en curso',
    RECHAZADO: 'Pago rechazado',
    CANCELADO: 'Cancelada',
    ABANDONADO: 'Abandonada',
    ERROR: 'Error (sin cargo)',
};

function clp(n: number | null | undefined): string {
    return '$' + (n ?? 0).toLocaleString('es-CL');
}

/** "2026-10-02" -> "jue 2 oct". Se parsea a mano para no correr el día por zona horaria. */
function fechaCorta(ymd: string): string {
    const [y, m, d] = (ymd || '').split('-').map(Number);
    if (!y || !m || !d) return ymd || '—';
    return new Date(y, m - 1, d).toLocaleDateString('es-CL', { weekday: 'short', day: 'numeric', month: 'short' });
}

function fechaHora(iso: string | null): string {
    if (!iso) return '—';
    const d = new Date(iso.replace(' ', 'T'));
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString('es-CL', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}

export default function ReservasPage() {
    const [reservas, setReservas] = useState<ReservaHora[]>([]);
    const [resumen, setResumen] = useState<ReservasResumen | null>(null);
    const [filtro, setFiltro] = useState<ReservaStatus | 'TODOS' | 'SIN_CITA'>('SIN_CITA');
    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [accionando, setAccionando] = useState<string | null>(null);
    const [aviso, setAviso] = useState('');

    const cargar = useCallback(async () => {
        setCargando(true);
        setError('');
        const status = filtro === 'TODOS' ? undefined : filtro === 'SIN_CITA' ? 'PAGADO_SIN_CITA' : filtro;
        const [lista, res] = await Promise.all([
            reservasApi.getAll({ status }),
            reservasApi.getResumen(),
        ]);
        if (lista.success && lista.data) setReservas(lista.data);
        else setError(lista.message || 'No se pudo cargar el listado de reservas.');
        if (res.success && res.data) setResumen(res.data);
        setCargando(false);
    }, [filtro]);

    // Carga inicial y al cambiar de filtro. El spinner se enciende de forma
    // sincrónica a propósito: es el estado de carga de este propio fetch.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- carga de datos, no sincronización de estado derivado
    useEffect(() => { cargar(); }, [cargar]);

    const visibles = useMemo(() => {
        const q = busqueda.trim().toLowerCase();
        if (!q) return reservas;
        return reservas.filter((r) =>
            [r.customer_name, r.customer_email, r.customer_rut, r.buy_order, r.cita_id, r.tratamiento_nombre]
                .some((c) => (c || '').toLowerCase().includes(q))
        );
    }, [reservas, busqueda]);

    const reintentar = async (r: ReservaHora) => {
        setAccionando(r.id);
        setAviso('');
        const res = await reservasApi.reintentar(r.id);
        setAccionando(null);
        if (res.success) {
            setAviso(`Cita creada para ${r.customer_name}. Se le envió el correo de confirmación.`);
            cargar();
        } else {
            setAviso(res.message || 'No se pudo crear la cita. Revisa reservo.cl e inténtalo de nuevo.');
        }
    };

    const resolver = async (r: ReservaHora) => {
        const nota = window.prompt(
            `¿Qué se hizo con el cobro de ${r.customer_name} (${clp(r.amount_paid ?? r.amount)})?\n\nEj: "Agendada por teléfono para el 3/9", "Se devolvió el dinero".`
        );
        if (!nota || !nota.trim()) return;
        setAccionando(r.id);
        setAviso('');
        const res = await reservasApi.resolver(r.id, nota.trim());
        setAccionando(null);
        if (res.success) {
            setAviso('Reserva marcada como gestionada.');
            cargar();
        } else {
            setAviso(res.message || 'No se pudo actualizar la reserva.');
        }
    };

    const sinCita = resumen?.pagadas_sin_cita ?? 0;

    return (
        <div>
            <PageHeader
                title="Reservas de hora"
                description="Agendamiento online y abonos pagados por Webpay."
                actions={
                    <Button onClick={cargar} disabled={cargando}>
                        <Icon name="refresh" className={`h-4 w-4 ${cargando ? 'animate-spin' : ''}`} /> Actualizar
                    </Button>
                }
            />

            {/* Lo urgente primero: plata cobrada sin cita creada. */}
            {sinCita > 0 && (
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <Icon name="alert" className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-red-900">
                            {sinCita} {sinCita === 1 ? 'paciente pagó' : 'pacientes pagaron'} y no {sinCita === 1 ? 'tiene' : 'tienen'} hora agendada
                        </p>
                        <p className="mt-0.5 text-sm text-red-800/90">
                            Suman {clp(resumen?.monto_sin_cita)} cobrados. Usa <strong>Crear cita</strong> para reintentarlo automáticamente, o
                            <strong> Marcar gestionada</strong> si ya lo resolviste por teléfono o devolviste el dinero.
                        </p>
                    </div>
                    {filtro !== 'SIN_CITA' && (
                        <Button size="sm" onClick={() => setFiltro('SIN_CITA')} className="border-red-200 text-red-700 hover:border-red-300 hover:text-red-800">
                            Ver
                        </Button>
                    )}
                </div>
            )}

            {/* Tarjetas de resumen */}
            {resumen && (
                <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard label="Cobrado" value={clp(resumen.cobrado)} hint="Abonos y pagos totales" icon="wallet" tone="gold" />
                    <StatCard label="Confirmadas" value={String(resumen.por_estado?.PAGADO?.n ?? 0)} hint="Con cita en reservo" icon="check" tone="green" />
                    <StatCard label="Cobradas sin cita" value={String(sinCita)} hint={clp(resumen.monto_sin_cita)} icon="alert" alert={sinCita > 0} />
                    <StatCard label="Rechazadas" value={String(resumen.por_estado?.RECHAZADO?.n ?? 0)} hint="Sin cargo" icon="x" />
                </div>
            )}

            {aviso && (
                <div className="mb-4 flex items-start justify-between gap-3 rounded-lg border border-[#e8e3da] bg-white px-4 py-3 text-sm text-ink">
                    <span>{aviso}</span>
                    <button onClick={() => setAviso('')} aria-label="Cerrar aviso" className="text-olive hover:text-ink">
                        <Icon name="x" />
                    </button>
                </div>
            )}

            <Card>
                {/* Filtros */}
                <div className="flex flex-col gap-3 border-b border-[#efeae2] p-3 2xl:flex-row 2xl:items-center">
                    <div className="admin-tabs -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Filtrar por estado">
                        {ESTADOS.map((e) => {
                            const activo = filtro === e.valor;
                            return (
                                <button
                                    key={e.valor}
                                    role="tab"
                                    aria-selected={activo}
                                    onClick={() => setFiltro(e.valor)}
                                    className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium transition-colors ${activo
                                        ? 'bg-ink text-white'
                                        : 'text-olive hover:bg-black/[0.04] hover:text-ink'
                                        }`}
                                >
                                    {e.etiqueta}
                                    {e.valor === 'SIN_CITA' && sinCita > 0 && (
                                        <span className={`rounded-full px-1.5 text-[11px] font-semibold ${activo ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'}`}>{sinCita}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <label className="relative 2xl:ml-auto 2xl:w-72">
                        <span className="sr-only">Buscar</span>
                        <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-olive" />
                        <input
                            type="text"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            placeholder="Nombre, RUT, email, orden o cita…"
                            className="h-9 w-full rounded-lg border pl-9 pr-3 text-sm"
                        />
                    </label>
                </div>

                {error && (
                    <div className="m-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
                )}

                {cargando ? (
                    <Spinner label="Cargando reservas…" />
                ) : visibles.length === 0 ? (
                    /* Sin este matiz, un fallo de carga se leía como "todo en orden",
                       que es justo la conclusión contraria a la que hay que sacar. */
                    error ? (
                        <EmptyState icon="alert" title="No se pudieron cargar las reservas" description="Revisa la conexión y vuelve a intentar." />
                    ) : filtro === 'SIN_CITA' && !busqueda ? (
                        <EmptyState icon="check" title="Todo en orden" description="Ningún cobro quedó sin cita." />
                    ) : (
                        <EmptyState title="Sin resultados" description="No hay reservas para este filtro o búsqueda." />
                    )
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left uppercase">
                                    <th className="px-4 py-2.5">Paciente</th>
                                    <th className="px-4 py-2.5">Hora pedida</th>
                                    <th className="px-4 py-2.5">Servicio</th>
                                    <th className="px-4 py-2.5 text-right">Monto</th>
                                    <th className="px-4 py-2.5">Estado</th>
                                    <th className="px-4 py-2.5">Cita</th>
                                    <th className="px-4 py-2.5"><span className="sr-only">Acciones</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {visibles.map((r) => (
                                    <tr key={r.id} className={r.status === 'PAGADO_SIN_CITA' && !r.resuelto_at ? 'bg-red-50/50' : ''}>
                                        <td className="px-4 py-3">
                                            <div className="flex items-start gap-3">
                                                <Initials name={r.customer_name} />
                                                <div className="min-w-0">
                                                    <div className="font-medium text-ink">{r.customer_name}</div>
                                                    <div className="whitespace-nowrap text-xs text-olive">{r.customer_rut || '—'} · {r.customer_phone || 'sin teléfono'}</div>
                                                    <div className="text-xs text-[#a39d8f]">{r.customer_email || 'sin email'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            <div className="font-medium text-ink">{fechaCorta(r.fecha)}</div>
                                            <div className="text-xs text-olive">{r.hora_inicio?.slice(0, 5)}–{r.hora_fin?.slice(0, 5)}</div>
                                            {r.profesional && (
                                                <div className="text-xs text-[#a39d8f]">
                                                    {NOMBRE_PROFESIONAL[r.profesional] || `Prof. ${r.profesional}`}
                                                </div>
                                            )}
                                        </td>
                                        <td className="max-w-[220px] px-4 py-3">
                                            <div className="truncate text-ink" title={r.tratamiento_nombre || ''}>{r.tratamiento_nombre || '—'}</div>
                                            <div className="font-mono text-[11px] text-[#a39d8f]">{r.buy_order}</div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            <div className="font-medium text-ink">{clp(r.amount_paid ?? r.amount)}</div>
                                            {r.paid_at && <div className="text-xs text-olive">{fechaHora(r.paid_at)}</div>}
                                            {r.card_number && <div className="text-xs text-[#a39d8f]">•••• {r.card_number}</div>}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge tone={TONO[r.status] ?? 'neutral'}>{ETIQUETA[r.status] || r.status}</Badge>
                                            {r.resuelto_at && (
                                                <div className="mt-1 text-xs text-emerald-700" title={r.resuelto_nota || ''}>✓ Gestionada</div>
                                            )}
                                            {r.last_error && !r.resuelto_at && (
                                                <div className="mt-1 max-w-[200px] truncate text-xs text-red-600" title={r.last_error}>{r.last_error}</div>
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3">
                                            {r.cita_id
                                                ? <span className="font-mono text-xs text-ink">#{r.cita_id}</span>
                                                : <span className="text-[#a39d8f]">—</span>}
                                            {r.authorization_code && <div className="text-xs text-[#a39d8f]">Aut. {r.authorization_code}</div>}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                {r.status === 'PAGADO_SIN_CITA' && !r.cita_id && (
                                                    <Button size="sm" variant="primary" onClick={() => reintentar(r)} disabled={accionando === r.id}>
                                                        {accionando === r.id ? 'Creando…' : 'Crear cita'}
                                                    </Button>
                                                )}
                                                {r.status === 'PAGADO_SIN_CITA' && !r.resuelto_at && (
                                                    <Button size="sm" onClick={() => resolver(r)} disabled={accionando === r.id}>
                                                        Marcar gestionada
                                                    </Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!cargando && visibles.length > 0 && (
                    <div className="border-t border-[#efeae2] px-4 py-2.5 text-xs text-olive">
                        {visibles.length} {visibles.length === 1 ? 'reserva' : 'reservas'}
                    </div>
                )}
            </Card>
        </div>
    );
}
