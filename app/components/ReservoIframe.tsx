'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ReservoIframeProps {
    agendaUrl: string;
    title?: string;
    loadDirectly?: boolean;
}

export default function ReservoIframe({ agendaUrl, title = 'Agenda de Reservas', loadDirectly = false }: ReservoIframeProps) {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [shouldLoad, setShouldLoad] = useState(loadDirectly);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Capturamos los mensajes enviados por las funciones JS de Reservo
            if (event.data?.type === "reservo") {
                console.log("Reservo - Paso actual:", event.data.step);

                // Si el mensaje incluye datos (como código de reserva, tratamiento, etc.)
                if (event.data.data) {
                    console.log("Reservo - Datos de cita capturados:", event.data.data);
                }

                // Si la cita terminó con éxito (step 'done'), redirigimos pasándole los datos
                if (event.data.step === 'done') {
                    const data = event.data.data || {};
                    const params = new URLSearchParams({
                        id: data.codigo || '',
                        fecha: data.fecha || '',
                        hora: data.hora || '',
                        tratamiento: data.tratamiento || '',
                        profesional: data.profesional || ''
                    });

                    // Pequeño retraso para que el usuario vea que terminó antes de saltar
                    setTimeout(() => {
                        router.push(`/confirmacion-cita?${params.toString()}`);
                    }, 800);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [router]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node || shouldLoad) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [shouldLoad]);

    if (!agendaUrl) return null;

    return (
        <div ref={containerRef} className="w-full">
            <div className="relative w-full overflow-hidden bg-white">
                {shouldLoad ? (
                    <iframe
                        src={agendaUrl}
                        title={title}
                        width="100%"
                        height="700"
                        frameBorder="0"
                        style={{
                            overflow: 'hidden',
                            marginBottom: '-10px'
                        }}
                        className="w-full"
                    />
                ) : (
                    <button
                        type="button"
                        onClick={() => setShouldLoad(true)}
                        className="flex min-h-[700px] w-full items-center justify-center bg-[#faf6ef] px-6 py-12 text-center transition-colors hover:bg-[#f3f3f3]"
                        aria-label={`Cargar agenda de reservas de ${title}`}
                    >
                        <div className="max-w-md">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-3 block">
                                Reserva online
                            </span>
                            <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">
                                {title}
                            </h3>
                            <p className="text-sm text-[#6f6a5c] leading-relaxed mb-6">
                                El calendario se carga solo cuando decides agendar, para reducir el peso inicial de la página.
                            </p>
                            <span className="inline-flex items-center justify-center rounded-sm bg-[#1b1a18] px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-transform hover:scale-[1.02]">
                                Cargar agenda
                            </span>
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}
