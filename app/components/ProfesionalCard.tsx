"use client";

import Link from "next/link";
import Image from "next/image";
import { Profesional, getIniciales } from "@/data/profesionales";

interface ProfesionalCardProps {
    profesional: Profesional;
    index: number;
}

export default function ProfesionalCard({ profesional, index }: ProfesionalCardProps) {
    const nombreCompleto = `${profesional.titulo} ${profesional.nombre} ${profesional.apellido}`.trim();
    const waText = `Hola, me interesa agendar una hora con ${nombreCompleto} en Clínica CIALO, Los Ángeles.`;

    return (
        <article className="relative rounded-2xl overflow-hidden group h-[440px] border border-ink/10 shadow-sm hover:shadow-xl hover:border-gold/40 transition-all duration-500 bg-sand">
            {/* Imagen de fondo (sin foto → iniciales) */}
            {profesional.imagen ? (
                <Image
                    src={profesional.imagen}
                    alt={`${nombreCompleto}, ${profesional.subtitulo.split("|")[0].trim()} en Clínica CIALO, Los Ángeles`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={index < 4}
                    loading={index < 4 ? undefined : "lazy"}
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105 view-transition-img will-change-transform"
                    quality={85}
                    style={{ "--prof-id": `prof-img-${profesional.id}` } as React.CSSProperties}
                />
            ) : (
                <div className="absolute inset-0 flex items-start justify-center pt-24 bg-gradient-to-br from-ink to-[#2a2622]" aria-hidden="true">
                    <span className="font-[family-name:var(--font-italiana)] text-8xl text-gold/70">{getIniciales(profesional)}</span>
                </div>
            )}

            {/* Overlay gradiente (más suave: deja ver más al profesional) */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-500" />

            {/* Línea dorada superior que crece en hover */}
            <div className="absolute top-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-gold to-goldlt transition-all duration-700 z-10" />

            {/* Badges fijos arriba (siempre visibles, sobre la foto) */}
            {(profesional.isPrincipal || (profesional.videos && profesional.videos.length > 0)) && (
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 pointer-events-none">
                    {profesional.isPrincipal && (
                        <span className="bg-gold text-ink px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                            Director
                        </span>
                    )}
                    {profesional.videos && profesional.videos.length > 0 && (
                        <span className="bg-ink/45 backdrop-blur-sm text-white border border-white/20 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                            <svg className="w-2.5 h-2.5 text-gold" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                {profesional.videos.length} {profesional.videos.length === 1 ? "Clip" : "Clips"}
                            </span>
                        </span>
                    )}
                </div>
            )}

            {/* Link principal de navegación (cubre toda la card) */}
            <Link
                href={`/profesionales/${profesional.id}`}
                className="absolute inset-0 z-10"
                aria-label={`Ver perfil de ${nombreCompleto}`}
            />

            {/* Contenido (pointer-events-none para dejar pasar el clic al Link) */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end pointer-events-none z-0">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-1">
                    {/* Categoría */}
                    <span className="inline-flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-widest mb-1.5">
                        <span className="w-4 h-px bg-gold/70" />
                        {profesional.categoria}
                    </span>

                    {/* Nombre */}
                    <h2 className="font-[family-name:var(--font-italiana)] text-[24px] text-white mb-1 leading-[1.15]">
                        {nombreCompleto}
                    </h2>

                    {/* Subtítulo */}
                    <p className="text-cream/80 text-xs font-light mb-3.5 line-clamp-2 max-w-[260px] leading-relaxed">
                        {profesional.subtitulo}
                    </p>

                    {/* Habilidades (aparecen en hover) */}
                    <div className="flex flex-wrap gap-2 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 mb-4 overflow-hidden">
                        {profesional.habilidades.slice(0, 2).map((skill, idx) => (
                            <span
                                key={idx}
                                className="bg-white/10 backdrop-blur-sm text-cream px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide border border-white/15"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* CTA agendar online: aparece al hacer hover */}
                    <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-16 group-hover:opacity-100 mb-2.5">
                        <Link
                            href={`/agendar?profesional=${profesional.id}`}
                            className="pointer-events-auto inline-flex items-center justify-center gap-2 w-full bg-gold text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-ink transition-colors duration-300"
                            aria-label={`Agendar online con ${nombreCompleto}`}
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Agendar online
                        </Link>
                    </div>

                    {/* Indicador "Ver perfil" */}
                    <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold uppercase tracking-widest text-gold">
                            Ver perfil
                        </span>
                        <span className="w-7 h-7 rounded-full bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-500">
                            <svg className="w-3.5 h-3.5 text-gold group-hover:text-ink transition-colors duration-500 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>

            {/* Botón flotante de WhatsApp */}
            <a
                href={`https://wa.me/56982028473?text=${encodeURIComponent(waText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-xl z-20 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 pointer-events-auto"
                aria-label={`Agendar con ${nombreCompleto} por WhatsApp`}
                title="Agendar por WhatsApp"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(e.currentTarget.href, "_blank");
                }}
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </a>
        </article>
    );
}
