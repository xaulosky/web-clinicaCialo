'use client';

// /agendar, /agendar?profesional=, ?consulta= y ?categoria= llevan a la reserva de ClíniOS. El enlace
// queda visible por si la redirección tarda o el navegador la bloquea.

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { urlReservaDesde } from '@/lib/reservaClinios';

export default function AgendarBooking() {
    const destino = urlReservaDesde(useSearchParams());

    useEffect(() => {
        window.location.replace(destino);
    }, [destino]);

    return (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
            <a href={destino} className="text-sm font-semibold text-ink underline">
                Ir a la agenda
            </a>
        </div>
    );
}
