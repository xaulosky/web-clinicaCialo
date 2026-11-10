'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

type Estado = 'success' | 'rejected' | 'cancelled' | 'paid_pending' | 'error' | 'expired';

// Config visual para los estados que NO son éxito.
const NO_EXITO: Record<Exclude<Estado, 'success'>, { titulo: string; color: string; ring: string; icon: string; mensaje: string }> = {
    // Página abierta sin datos (p.ej. refresco después de limpiar la URL): NO es
    // un error — si la reserva se hizo, sigue registrada.
    expired: {
        titulo: 'Esta página ya no tiene los datos',
        color: 'text-[#b8935f]', ring: 'bg-[#b8935f]/15',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        mensaje: 'Por privacidad, los detalles de tu reserva solo se muestran una vez. Si acabas de agendar, tu cita quedó registrada correctamente. Cualquier duda, escríbenos por WhatsApp.',
    },
    rejected: {
        titulo: 'Pago rechazado',
        color: 'text-red-500', ring: 'bg-red-100',
        icon: 'M6 18L18 6M6 6l12 12',
        mensaje: 'Tu pago fue rechazado por el medio de pago, así que no se generó ningún cargo ni se agendó tu cita. Puedes intentarlo nuevamente o escribirnos por WhatsApp.',
    },
    cancelled: {
        titulo: 'Reserva cancelada',
        color: 'text-[#b8935f]', ring: 'bg-[#b8935f]/15',
        icon: 'M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z',
        mensaje: 'Cancelaste el pago o el tiempo expiró. No se realizó ningún cargo. Puedes volver a intentar tu reserva cuando quieras.',
    },
    paid_pending: {
        titulo: 'Pago recibido — cita por confirmar',
        color: 'text-[#b8935f]', ring: 'bg-[#b8935f]/15',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        mensaje: 'Recibimos tu pago correctamente, pero no pudimos agendar tu cita de forma automática. Nuestro equipo te contactará a la brevedad para confirmarla. Guarda tu número de orden.',
    },
    error: {
        titulo: 'Ocurrió un problema',
        color: 'text-red-500', ring: 'bg-red-100',
        icon: 'M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z',
        mensaje: 'No pudimos completar tu reserva. No te preocupes: intenta nuevamente o escríbenos por WhatsApp y te ayudamos a agendar.',
    },
};

function ConfirmacionCitaContent() {
    const sp = useSearchParams();
    // Capturamos los params UNA vez (antes de limpiar la URL).
    const [data] = useState(() => ({
        status: sp.get('status'),
        id: sp.get('id'),
        fecha: sp.get('fecha'),
        hora: sp.get('hora'),
        tratamiento: sp.get('tratamiento'),
        profesional: sp.get('profesional'),
        orden: sp.get('orden'),
    }));
    const [tratamiento, setTratamiento] = useState<string | null>(data.tratamiento);
    const [profesional, setProfesional] = useState<string | null>(data.profesional);
    // Un pago cobrado cuya cita no se creó es lo último que puede desaparecer al
    // recargar: sin esto la página pasaba a "expired" y le decía al paciente que
    // su cita había quedado registrada — justo lo contrario de lo ocurrido — y
    // además perdía el número de orden, que es lo único que permite rastrear el
    // cobro. Se conserva aparte y NO se borra al leerlo.
    const [pendiente, setPendiente] = useState<{ orden: string } | null>(null);

    useEffect(() => {
        // Se lee/escribe después de hidratar: sessionStorage no existe durante el
        // prerender estático, así que no puede resolverse al construir el estado.
        try {
            if (data.status === 'paid_pending') {
                const reg = { orden: data.orden || '', ts: Date.now() };
                sessionStorage.setItem('cialo_pago_sin_cita', JSON.stringify(reg));
                // eslint-disable-next-line react-hooks/set-state-in-effect -- dato de navegador, solo disponible tras hidratar
                setPendiente({ orden: reg.orden });
            } else if (!data.status) {
                const raw = sessionStorage.getItem('cialo_pago_sin_cita');
                if (raw) {
                    const reg = JSON.parse(raw);
                    // Solo dentro de la misma gestión (24 h), para no revivirlo
                    // en una visita posterior sin relación.
                    if (reg?.ts && Date.now() - reg.ts < 86400000) {
                        setPendiente({ orden: reg.orden || '' });
                    } else {
                        sessionStorage.removeItem('cialo_pago_sin_cita');
                    }
                }
            }
        } catch { /* noop */ }
    }, [data.status, data.orden]);

    useEffect(() => {
        // El servicio (dato de salud) y el profesional llegan por sessionStorage
        // en el flujo propio — nunca por la URL (el Meta Pixel la envía a Meta).
        try {
            const raw = sessionStorage.getItem('cialo_reserva');
            if (raw) {
                const d = JSON.parse(raw);
                if (!data.tratamiento && d?.tratamiento) setTratamiento(d.tratamiento);
                if (!data.profesional && d?.profesional) setProfesional(d.profesional);
            }
            sessionStorage.removeItem('cialo_reserva');
        } catch { /* noop */ }
        // Limpiamos el query string de la URL (historial y PageViews posteriores).
        if (typeof window !== 'undefined' && window.location.search) {
            window.history.replaceState(null, '', window.location.pathname);
        }
    }, [data.tratamiento, data.profesional]);

    const rawStatus = data.status ?? (pendiente ? 'paid_pending' : null);
    const orden = data.orden ?? pendiente?.orden ?? null;
    const appointment = {
        id: data.id,
        fecha: data.fecha,
        hora: data.hora,
        tratamiento,
        profesional,
    };
    const hasData = !!(appointment.id || appointment.tratamiento || appointment.fecha);

    // Estado efectivo: sin status pero con datos de cita → éxito (compatibilidad);
    // sin status NI datos (p.ej. refresco) → estado neutro, no error.
    const estado: Estado = (rawStatus as Estado) || (hasData ? 'success' : 'expired');

    // ─── NO ÉXITO (rechazado / cancelado / pago-sin-cita / error) ───
    if (estado !== 'success') {
        const cfg = NO_EXITO[estado] ?? NO_EXITO.error;
        return (
            <main className="flex-grow pt-40 pb-20">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <div className={`w-24 h-24 ${cfg.ring} rounded-full flex items-center justify-center mx-auto mb-8`}>
                        <svg className={`w-12 h-12 ${cfg.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cfg.icon} />
                        </svg>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">{cfg.titulo}</h1>
                    <p className="text-lg text-[#6f6a5c] mb-8 leading-relaxed">{cfg.mensaje}</p>

                    {estado === 'paid_pending' && orden && (
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#b8935f]/10 px-5 py-2.5 mb-8">
                            <span className="text-xs uppercase tracking-wider text-[#6f6a5c]">N° de orden</span>
                            <span className="text-sm font-bold text-[#1b1a18]">{orden}</span>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {estado === 'paid_pending' ? (
                            <a href="https://wa.me/56982028473?text=Hola%2C%20pagu%C3%A9%20mi%20reserva%20pero%20la%20cita%20qued%C3%B3%20pendiente." target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] transition-all">
                                Contactar por WhatsApp
                            </a>
                        ) : estado === 'expired' ? (
                            <Link href="/" className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] transition-all">
                                Volver al Inicio
                            </Link>
                        ) : (
                            <Link href="/agendar" className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] transition-all">
                                Intentar de nuevo
                            </Link>
                        )}
                        <a href="https://wa.me/56982028473" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-white transition-all">
                            ¿Tienes dudas? Escríbenos
                        </a>
                    </div>
                </div>
            </main>
        );
    }

    // ─── ÉXITO ───
    return (
        <main className="flex-grow pt-40 pb-20">
            <div className="max-w-2xl mx-auto px-4 text-center">
                <div className="w-24 h-24 bg-[#b8935f]/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-fade-in">
                    <svg className="w-12 h-12 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                    ¡Cita Confirmada!
                </h1>

                <p className="text-lg text-[#6f6a5c] mb-10 leading-relaxed">
                    Tu reserva ha sido procesada con éxito. <strong>Guarda estos datos</strong> (toma una captura de pantalla): por privacidad, esta página se muestra una sola vez.
                </p>

                {hasData && (
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-[#b8935f]/30 mb-10 text-left animate-fade-in-up">
                        <h2 className="font-[family-name:var(--font-italiana)] text-2xl text-[#1b1a18] mb-4 border-b border-gray-100 pb-2">
                            Detalles de tu Cita
                        </h2>
                        <div className="space-y-3">
                            {appointment.id && (
                                <div className="flex justify-between border-b border-gray-50 py-2">
                                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Código</span>
                                    <span className="text-sm font-bold text-[#1b1a18]">{appointment.id}</span>
                                </div>
                            )}
                            {appointment.tratamiento && (
                                <div className="flex justify-between border-b border-gray-50 py-2">
                                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Motivo</span>
                                    <span className="text-sm text-[#1b1a18]">{appointment.tratamiento}</span>
                                </div>
                            )}
                            {appointment.profesional && (
                                <div className="flex justify-between border-b border-gray-50 py-2">
                                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Profesional</span>
                                    <span className="text-sm text-[#1b1a18]">{appointment.profesional}</span>
                                </div>
                            )}
                            {(appointment.fecha || appointment.hora) && (
                                <div className="flex justify-between border-b border-gray-50 py-2">
                                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Fecha y Hora</span>
                                    <span className="text-sm text-[#1b1a18]">{appointment.fecha} a las {appointment.hora}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 mb-10 text-left">
                    <h2 className="font-[family-name:var(--font-italiana)] text-2xl text-[#1b1a18] mb-4 border-b border-gray-100 pb-2">
                        Próximos Pasos
                    </h2>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-6 h-6 bg-[#b8935f] text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">1</div>
                            <p className="text-sm text-[#6f6a5c]">Te contactaremos por <strong>WhatsApp o llamada el día previo</strong> para confirmar tu asistencia.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 bg-[#b8935f] text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">2</div>
                            <p className="text-sm text-[#6f6a5c]">Llega <strong>10 minutos antes</strong> y trae tu <strong>cédula de identidad</strong>. Si pagaste un abono, se descuenta del valor de tu tratamiento.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-6 h-6 bg-[#b8935f] text-white rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold">3</div>
                            <p className="text-sm text-[#6f6a5c]">Te esperamos en <strong>Bulnes 220, Of. 509, Los Ángeles</strong>.</p>
                        </li>
                    </ul>
                </div>

                <div className="bg-amber-50 border-l-4 border-[#b8935f] p-5 rounded-sm mb-10 text-left">
                    <p className="text-[#1b1a18] font-semibold mb-1 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Confirmación de tu cita
                    </p>
                    <p className="text-sm text-[#6f6a5c] leading-relaxed">
                        Te contactaremos al menos el <strong>día previo a tu atención</strong> —por WhatsApp y/o llamado telefónico— para confirmar tu asistencia. Por favor responde a la confirmación: si no logramos confirmarla, el cupo podría ser <strong>liberado para otro paciente</strong>. Puedes cancelar o reagendar sin costo con al menos 24 horas de anticipación.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] transition-all">
                        Volver al Inicio
                    </Link>
                    <a href="https://wa.me/56982028473" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-white transition-all">
                        ¿Tienes dudas? Escríbenos
                    </a>
                </div>
            </div>
        </main>
    );
}

export default function ConfirmacionCitaPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar />
            <Suspense fallback={<div className="flex-grow pt-40 text-center text-gray-400">Cargando...</div>}>
                <ConfirmacionCitaContent />
            </Suspense>
            <Footer />
        </div>
    );
}
