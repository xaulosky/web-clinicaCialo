import { Profesional, getIniciales } from "@/data/profesionales";
import Image from "next/image";
import ReservaClinios from "./ReservaClinios";
import { urlReservaProfesional } from "@/lib/reservaClinios";
import { tratamientosData } from "@/data/tratamientos";
import TreatmentCard from "./TreatmentCard";

interface ProfesionalProfileProps {
    profesional: Profesional;
}

// Encabezado de sección reutilizable (eyebrow con línea dorada)
function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-xs text-olive mb-8 uppercase tracking-[0.2em] font-bold flex items-center">
            <span className="w-8 h-px bg-gold mr-4" />
            {children}
        </h2>
    );
}

export default function ProfesionalProfile({
    profesional,
}: ProfesionalProfileProps) {
    const tratamientosProfesional = tratamientosData.filter((t) =>
        t.profesional.includes(profesional.nombre)
    );

    return (
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
            {/* Hero / Ficha principal */}
            <div className="bg-white rounded-2xl border border-ink/10 shadow-sm overflow-hidden mb-10">
                <div className="flex flex-col lg:flex-row">
                    {/* Columna de imagen */}
                    <div className="lg:w-2/5 relative">
                        <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full bg-gradient-to-br from-ink to-[#2a2622] relative">
                            {profesional.imagen ? (
                                <Image
                                    src={profesional.imagen}
                                    alt={`${profesional.titulo} ${profesional.nombre} ${profesional.apellido}, ${profesional.subtitulo.split("|")[0].trim()} en Clínica CIALO, Los Ángeles`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover object-top view-transition-img"
                                    priority
                                    style={{ '--prof-id': `prof-img-${profesional.id}` } as React.CSSProperties}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                                    <span className="font-[family-name:var(--font-italiana)] text-8xl lg:text-9xl text-gold/70">{getIniciales(profesional)}</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent lg:hidden" />
                        </div>
                    </div>

                    {/* Columna de información */}
                    <div className="lg:w-3/5 p-7 lg:p-9 flex flex-col justify-center">
                        <span className="text-gold-dark text-xs font-bold uppercase tracking-[0.2em] mb-3">
                            {profesional.certificaciones[0]?.nombre || "Especialista"}
                        </span>

                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl lg:text-4xl text-ink leading-tight mb-3">
                            {profesional.titulo} {profesional.nombre}{" "}
                            <span className="text-olive">{profesional.apellido}</span>
                        </h2>

                        <p className="text-base text-gold-dark font-medium mb-4 tracking-wide">
                            {profesional.subtitulo}
                        </p>

                        <p className="text-olive leading-relaxed mb-5 text-base line-clamp-3">
                            {profesional.perfil}
                        </p>

                        {/* Habilidades (chips) */}
                        <div className="flex flex-wrap gap-2 mb-7">
                            {profesional.habilidades.slice(0, 5).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="border border-gold/40 text-ink bg-gold/5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        {/* CTA agendar directo en el hero */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                            <a
                                href={profesional.agendaUrl && profesional.agendaUrl.includes("clinios.cl") ? "#agendar" : `https://wa.me/56982028473`}
                                className="inline-flex items-center justify-center gap-2 self-start bg-gold text-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-ink transition-colors duration-300 shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Agendar con {profesional.nombre}
                            </a>
                            {profesional.agendaUrl && profesional.agendaUrl.includes("clinios.cl") && (
                                <span className="inline-flex items-center gap-1.5 text-xs text-olive/80">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Agenda en línea disponible
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grilla de contenido */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Contenido principal - 2 columnas */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Integración Reservo - PRIORIZADO */}
                    {profesional.agendaUrl && profesional.agendaUrl.includes("clinios.cl") && (
                        <section id="agendar" className="scroll-mt-24 bg-white rounded-2xl border border-ink/10 shadow-sm overflow-hidden">
                            <div className="p-8 lg:p-10 pb-0">
                                <SectionHeading>Agendar cita</SectionHeading>
                                <p className="text-sm text-olive mb-6 leading-relaxed">
                                    Reserva directamente con {profesional.titulo} {profesional.nombre}: elige el día y la hora disponibles en su agenda real.
                                </p>
                            </div>
                            <ReservaClinios
                                agendaUrl={urlReservaProfesional(profesional.id)}
                                title={`Agenda de ${profesional.titulo} ${profesional.nombre}`}
                            />
                        </section>
                    )}

                    {/* Trayectoria */}
                    {profesional.trayectoria.length > 0 && (
                    <section className="bg-white p-8 lg:p-10 rounded-2xl border border-ink/10 shadow-sm">
                        <SectionHeading>Trayectoria clínica</SectionHeading>

                        <div className="space-y-8">
                            {profesional.trayectoria.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="relative pl-8 border-l-2 border-sand hover:border-gold transition-colors duration-300"
                                >
                                    <div className="absolute left-[-9px] top-0 w-4 h-4 bg-white border-2 border-gold rounded-full" />
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                                        <h3 className="font-bold text-ink text-lg leading-snug">
                                            {item.lugar}
                                        </h3>
                                        <span className="text-sm text-gold-dark font-semibold mt-1 sm:mt-0 shrink-0 sm:ml-4">
                                            {item.periodo}
                                        </span>
                                    </div>
                                    <p className="text-olive leading-relaxed">
                                        {item.descripcion}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                    )}

                    {/* Formación académica */}
                    {profesional.formacion.length > 0 && (
                    <section className="bg-white p-8 lg:p-10 rounded-2xl border border-ink/10 shadow-sm">
                        <SectionHeading>Formación académica</SectionHeading>

                        <div className="space-y-5">
                            {profesional.formacion.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 bg-cream rounded-xl border-l-4 border-gold"
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                                        <h3 className="font-bold text-ink">
                                            {item.titulo}
                                        </h3>
                                        {item.badge && (
                                            <span className="bg-gold text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mt-2 sm:mt-0 shrink-0 sm:ml-4">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-olive text-sm leading-relaxed">{item.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                    )}

                    {/* Especialización avanzada */}
                    {profesional.especializaciones.length > 0 && (
                    <section className="bg-white p-8 lg:p-10 rounded-2xl border border-ink/10 shadow-sm">
                        <SectionHeading>Especialización avanzada</SectionHeading>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {profesional.especializaciones.map((spec, idx) => (
                                <div
                                    key={idx}
                                    className="group p-6 bg-cream hover:bg-ink transition-colors duration-300 rounded-xl"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gold/20 group-hover:bg-gold flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                                            <svg
                                                className="w-5 h-5 text-gold group-hover:text-ink transition-colors duration-300"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-ink group-hover:text-white mb-2 transition-colors duration-300">
                                                {spec.titulo}
                                            </h3>
                                            <p className="text-sm text-olive group-hover:text-cream/70 transition-colors duration-300 leading-relaxed">
                                                {spec.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    )}

                    {/* Tratamientos que realiza */}
                    {tratamientosProfesional.length > 0 && (
                        <section className="bg-white p-8 lg:p-10 rounded-2xl border border-ink/10 shadow-sm">
                            <SectionHeading>Tratamientos que realiza</SectionHeading>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {tratamientosProfesional.map((treatment) => (
                                    <TreatmentCard key={treatment.id} treatment={treatment} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Videos explicativos */}
                    {profesional.videos && profesional.videos.length > 0 && (
                        <section className="bg-white p-8 lg:p-10 rounded-2xl border border-ink/10 shadow-sm">
                            <SectionHeading>Videos explicativos</SectionHeading>
                            <div className={`grid gap-6 ${profesional.videos.length === 1 ? 'max-w-2xl' : profesional.videos.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                                {profesional.videos.map((video) => (
                                    <div key={video.id} className="relative w-full">
                                        <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-ink">
                                            <iframe
                                                src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                                                title={video.titulo}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <div className="mt-3">
                                            <h3 className="font-semibold text-ink line-clamp-2 leading-snug">
                                                {video.titulo}
                                            </h3>
                                            {video.descripcion && (
                                                <p className="text-sm text-olive mt-1 line-clamp-2 leading-relaxed">
                                                    {video.descripcion}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Barra lateral - 1 columna */}
                <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-24 lg:self-start">

                    {/* CTA principal: agendar online (siempre accesible) */}
                    <div className="bg-ink rounded-2xl p-8 text-center shadow-sm">
                        <h3 className="font-[family-name:var(--font-italiana)] text-2xl text-white mb-2 leading-tight">
                            Agenda tu hora
                        </h3>
                        <p className="text-sm text-cream/70 mb-5 leading-relaxed">
                            Reserva online con {profesional.titulo} {profesional.nombre}. La reserva no tiene costo.
                        </p>
                        <a
                            href={profesional.agendaUrl && profesional.agendaUrl.includes("clinios.cl") ? "#agendar" : `https://wa.me/56982028473?text=${encodeURIComponent(`Hola, quiero agendar con ${profesional.titulo} ${profesional.nombre} ${profesional.apellido} en Clínica CIALO.`)}`}
                            className="inline-flex w-full items-center justify-center gap-2 bg-gold text-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-ink transition-colors duration-300"
                            aria-label={`Agendar con ${profesional.titulo} ${profesional.nombre}`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Agendar hora
                        </a>
                        {/* Señales de confianza */}
                        <ul className="mt-6 space-y-2.5 text-left">
                            <li className="flex items-center gap-2.5 text-xs text-cream/80">
                                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span><strong className="font-semibold text-white">4.9</strong> · +284 reseñas en Google</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-xs text-cream/80">
                                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Autorización SEREMI de Salud · Tecnología FDA</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-xs text-cream/80">
                                <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                <span>Financiamiento hasta 12 cuotas</span>
                            </li>
                        </ul>
                    </div>

                    {/* Certificaciones */}
                    {profesional.certificaciones.length > 0 && (
                    <section className="bg-white p-6 lg:p-8 rounded-2xl border border-ink/10 shadow-sm">
                        <h3 className="text-xs text-olive mb-6 uppercase tracking-[0.2em] font-bold flex items-center">
                            <span className="w-6 h-px bg-gold mr-3" />
                            Certificaciones
                        </h3>
                        <div className="space-y-4">
                            {profesional.certificaciones.map((cert, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-start gap-3 p-4 bg-cream rounded-xl"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-4 h-4 text-gold"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-ink text-sm leading-snug">
                                            {cert.nombre}
                                        </h4>
                                        <p className="text-xs text-olive mt-0.5">{cert.descripcion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    )}

                    {/* Idiomas */}
                    {profesional.idiomas.length > 0 && (
                    <section className="bg-white p-6 lg:p-8 rounded-2xl border border-ink/10 shadow-sm">
                        <h3 className="text-xs text-olive mb-6 uppercase tracking-[0.2em] font-bold flex items-center">
                            <span className="w-6 h-px bg-gold mr-3" />
                            Idiomas
                        </h3>
                        <div className="space-y-3">
                            {profesional.idiomas.map((idioma, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 px-4 bg-cream rounded-xl"
                                >
                                    <span className="font-semibold text-ink text-sm">
                                        {idioma.idioma}
                                    </span>
                                    <span className="text-xs text-olive bg-white border border-sand px-3 py-1 rounded-full">
                                        {idioma.nivel}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>
                    )}

                    {/* CTA de contacto */}
                    <div className="bg-gradient-to-br from-gold to-goldlt p-8 rounded-2xl text-center shadow-sm">
                        <h3 className="font-[family-name:var(--font-italiana)] text-2xl text-ink mb-3 leading-tight">
                            ¿Tienes dudas?
                        </h3>
                        <p className="text-sm text-ink/80 mb-6 leading-relaxed">
                            Escríbenos por WhatsApp y te ayudamos a elegir el tratamiento ideal antes de agendar.
                        </p>
                        <a
                            href={`https://wa.me/56982028473?text=${encodeURIComponent(`Hola, tengo una consulta sobre ${profesional.titulo} ${profesional.nombre} ${profesional.apellido} en Clínica CIALO.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 text-sm font-semibold rounded-full hover:bg-[#25D366] transition-colors duration-300"
                            aria-label={`Consultar por WhatsApp sobre ${profesional.titulo} ${profesional.nombre}`}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </a>
                    </div>

                    {/* Enlace interno al equipo completo */}
                    <a
                        href="/profesionales"
                        className="group flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-gold-dark hover:text-ink transition-colors"
                    >
                        Conoce a todo el equipo
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
