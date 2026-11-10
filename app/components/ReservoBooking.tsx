'use client';

// Agendamiento simplificado.
//
// Antes este componente tenía un flujo propio contra la API (api.cialo.cl):
// cargaba slots, datos del cliente y cobraba un abono por Webpay. Ese flujo se
// ELIMINÓ por completo. Ahora:
//   - Si hay una agenda real de reservo.cl  -> se muestra embebida (iframe).
//   - Si no hay agenda de reservo           -> no renderiza nada; el contenedor
//                                              de cada página muestra WhatsApp.

import ReservoIframe from './ReservoIframe';

interface Props {
    agendaUrl?: string | null;
    title?: string;
    /** Compat con llamadas existentes (ya no se usa: era para el flujo propio). */
    treatmentName?: string;
    loadDirectly?: boolean;
    /** Compat (ya no se usa). */
    bare?: boolean;
    /** Compat (ya no se usa: era la regla de evaluación del flujo propio). */
    evalRule?: boolean;
}

export default function ReservoBooking({ agendaUrl, title = 'Agenda de Reservas', loadDirectly = false }: Props) {
    // Solo agendas reales de reservo.cl. Cualquier otra cosa (wa.me, vacío) → nada.
    if (!agendaUrl || !agendaUrl.includes('reservo.cl')) return null;
    return <ReservoIframe agendaUrl={agendaUrl} title={title} loadDirectly={loadDirectly} />;
}
