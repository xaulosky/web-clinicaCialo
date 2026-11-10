'use client';

// Lleva a la reserva online de ClíniOS. No va incrustada: su botón de avance
// queda fijo al pie de la pantalla, y dentro de un iframe se perdería en el
// celular; además la pasarela de pago no se abre dentro de un marco.

import { trackLead } from '@/lib/fbpixel';

interface Props {
    agendaUrl?: string | null;
    title?: string;
    /** Compat con llamadas existentes (ya no se usan). */
    treatmentName?: string;
    loadDirectly?: boolean;
    bare?: boolean;
    evalRule?: boolean;
}

export default function ReservaClinios({ agendaUrl, title = 'Agendar mi hora' }: Props) {
    // Cualquier otra cosa (wa.me, vacío) → nada: cada página ya muestra WhatsApp.
    if (!agendaUrl || !agendaUrl.includes('clinios.cl')) return null;
    return (
        <div className="flex flex-col items-center gap-3 p-6 text-center">
            <p className="text-sm leading-relaxed text-gray-600">
                Elige el día y la hora disponibles en la agenda real. Te toma menos de un minuto.
            </p>
            <a
                href={agendaUrl}
                onClick={() => trackLead({ source: 'reserva_online', content_name: title })}
                className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[#b8935f] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#a2804f]"
            >
                Ver horas disponibles
            </a>
        </div>
    );
}
