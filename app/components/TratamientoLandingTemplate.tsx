import Link from "next/link";
import { ReactNode } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Tipos para el componente
interface FAQ {
    pregunta: string;
    respuesta: string;
}

interface Beneficio {
    titulo: string;
    descripcion: string;
    icono: string; // SVG path
}

interface Paso {
    numero: string;
    titulo: string;
    descripcion: string;
}

interface Candidato {
    texto: string;
}

interface Contraindicacion {
    texto: string;
}

interface Especialista {
    nombre: string;
    especialidad: string;
    link?: string;
}

interface TratamientoData {
    // Hero
    categoria: string;
    categoriaColor?: string; // Tailwind class ej: "blue-500"
    titulo: string;
    subtitulo?: string;
    descripcion: string;
    bulletPoints?: string[];
    precio?: { desde: string; incluye?: string[] };
    duracion?: string;
    heroImagen?: string; // Imagen destacada del hero (llena la columna derecha)

    // Contenido
    queEs?: { titulo: string; parrafos: string[] };
    proceso?: { titulo: string; pasos: Paso[] };
    beneficios?: Beneficio[];
    candidatos?: Candidato[];
    contraindicaciones?: Contraindicacion[];
    efectosSecundarios?: string[];
    cuidadosPosteriores?: string[];
    especialista?: Especialista;
    galeria?: { titulo?: string; subtitulo?: string; imagenes: string[] };
    faqs?: FAQ[];

    // CTA
    ctaTitulo?: string;
    ctaDescripcion?: string;
    whatsappMessage: string;
}

interface TratamientoLandingTemplateProps {
    data: TratamientoData;
    breadcrumbLabel: string;
    jsonLd?: object;
    heroAfter?: ReactNode;
}

export default function TratamientoLandingTemplate({
    data,
    breadcrumbLabel,
    jsonLd,
    heroAfter
}: TratamientoLandingTemplateProps) {
    return (
        <>
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            <Navbar transparent />

            <main className="bg-white relative overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative bg-ink pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-goldlt rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
                        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/50 mb-8">
                            <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
                            <span className="text-white/25" aria-hidden="true">/</span>
                            <Link href="/tratamientos" className="hover:text-gold transition-colors">Tratamientos</Link>
                            <span className="text-white/25" aria-hidden="true">/</span>
                            <span className="text-gold" aria-current="page">{breadcrumbLabel}</span>
                        </nav>

                        <div className={`grid items-center gap-12 ${data.heroImagen || data.precio ? "lg:grid-cols-2" : "max-w-3xl"}`}>
                            <div>
                                <span className="inline-block bg-gold/15 text-gold px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                                    {data.categoria}
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    {data.titulo}
                                    {data.subtitulo && (
                                        <span className="text-gold"> {data.subtitulo}</span>
                                    )}
                                </h1>
                                <p className="text-xl text-white/70 mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: data.descripcion }} />

                                {data.bulletPoints && (
                                    <p className="text-gold text-lg mb-8">
                                        {data.bulletPoints.map((bp, i) => (
                                            <span key={i}>✓ {bp}{i < data.bulletPoints!.length - 1 ? ' \u00A0 ' : ''}</span>
                                        ))}
                                    </p>
                                )}

                                {data.duracion && (
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-8 inline-block">
                                        <span className="text-white/60 text-sm">Duración</span>
                                        <p className="text-2xl font-bold text-gold">{data.duracion}</p>
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://wa.me/56982028473?text=${encodeURIComponent(data.whatsappMessage)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-ink transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Agendar mi evaluación
                                    </a>
                                </div>

                                {/* Confianza cerca del CTA */}
                                <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60">
                                    <span className="inline-flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.539 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.343 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" /></svg>
                                        <span><strong className="text-white font-semibold">4.9</strong>/284 reseñas</span>
                                    </span>
                                    <span>· Autorización SEREMI de Salud</span>
                                    <span>· Hasta 12 cuotas</span>
                                </p>
                            </div>

                            {/* Visual del hero: imagen destacada o tarjeta de precio */}
                            {data.heroImagen ? (
                                <div className="relative">
                                    <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={data.heroImagen}
                                            alt={`${data.titulo} en Clínica CIALO, Los Ángeles`}
                                            className="aspect-[4/3] w-full object-cover"
                                        />
                                    </div>
                                    {data.precio && (
                                        <div className="absolute -bottom-5 left-5 rounded-2xl bg-white px-5 py-3 shadow-xl">
                                            <span className="text-[11px] uppercase tracking-wider text-olive">Desde</span>
                                            <p className="font-[family-name:var(--font-italiana)] text-2xl leading-none text-gold-dark">{data.precio.desde}</p>
                                        </div>
                                    )}
                                </div>
                            ) : data.precio ? (
                                <div className="bg-white/[0.04] backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                                    <h2 className="text-xl font-semibold text-white mb-4">Inversión</h2>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-4xl font-bold text-gold">{data.precio.desde}</span>
                                        <span className="text-white/60">desde</span>
                                    </div>
                                    {data.precio.incluye && (
                                        <ul className="space-y-2">
                                            {data.precio.incluye.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                                                    <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>

                {heroAfter}

                {/* Proceso / Cómo Funciona */}
                {data.proceso && (
                    <section className="py-24 bg-white">
                        <div className="max-w-5xl mx-auto px-5 lg:px-8">
                            <div className="text-center mb-16">
                                <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                                    El procedimiento
                                </span>
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink mb-4">
                                    {data.proceso.titulo}
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-4 gap-8">
                                {data.proceso.pasos.map((p, i) => (
                                    <div key={i} className="text-center">
                                        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-md">
                                            {p.numero}
                                        </div>
                                        <h3 className="font-semibold text-ink mb-2">{p.titulo}</h3>
                                        <p className="text-sm text-olive leading-relaxed">{p.descripcion}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Beneficios */}
                {data.beneficios && (
                    <section className="py-24 bg-cream">
                        <div className="max-w-7xl mx-auto px-5 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink mb-4">
                                    Beneficios
                                </h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {data.beneficios.map((b, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-ink/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center mb-4">
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icono} />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-ink mb-2">{b.titulo}</h3>
                                        <p className="text-sm text-olive leading-relaxed">{b.descripcion}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Candidatos y Contraindicaciones */}
                {(data.candidatos || data.contraindicaciones) && (
                    <section className="py-24 bg-white">
                        <div className="max-w-5xl mx-auto px-5 lg:px-8">
                            <div className="grid md:grid-cols-2 gap-12">
                                {data.candidatos && (
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-ink mb-6">
                                            ¿Quién es candidato ideal?
                                        </h2>
                                        <ul className="space-y-3">
                                            {data.candidatos.map((c, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-olive" dangerouslySetInnerHTML={{ __html: c.texto }} />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {data.contraindicaciones && (
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-ink mb-6">
                                            Contraindicaciones
                                        </h2>
                                        <div className="bg-sand/40 border border-sand rounded-2xl p-6">
                                            <ul className="space-y-2.5">
                                                {data.contraindicaciones.map((c, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <span className="text-gold font-bold mt-0.5 leading-none">•</span>
                                                        <span className="text-sm text-olive" dangerouslySetInnerHTML={{ __html: c.texto }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Efectos Secundarios y Cuidados Posteriores */}
                            {(data.efectosSecundarios || data.cuidadosPosteriores) && (
                                <div className="grid md:grid-cols-2 gap-12 border-t border-sand pt-16 mt-12">
                                    {data.efectosSecundarios && (
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-ink mb-6 flex items-center gap-2">
                                                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                Efectos secundarios
                                            </h2>
                                            <ul className="space-y-3">
                                                {data.efectosSecundarios.map((e, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-olive">
                                                        <span className="text-gold mt-1">●</span>
                                                        <span className="text-sm" dangerouslySetInnerHTML={{ __html: e }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {data.cuidadosPosteriores && (
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-ink mb-6 flex items-center gap-2">
                                                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                                Indicaciones y cuidados
                                            </h2>
                                            <ul className="space-y-3">
                                                {data.cuidadosPosteriores.map((c, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-olive">
                                                        <svg className="w-4 h-4 text-gold shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                                        <span className="text-sm" dangerouslySetInnerHTML={{ __html: c }} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* Especialista */}
                {data.especialista && (
                    <section className="py-24 bg-cream">
                        <div className="max-w-4xl mx-auto px-5 lg:px-8">
                            <div className="bg-white rounded-2xl p-8 border border-ink/10 shadow-sm">
                                <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-ink mb-4">Tu especialista</h2>
                                <h3 className="font-semibold text-ink text-lg mb-2">{data.especialista.nombre}</h3>
                                <p className="text-olive mb-4">{data.especialista.especialidad}</p>
                                {data.especialista.link && (
                                    <Link href={data.especialista.link} className="inline-flex items-center gap-1 text-gold-dark font-semibold hover:text-ink transition-colors">
                                        Ver perfil completo →
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQs */}
                {data.faqs && (
                    <section className="py-24 bg-white">
                        <div className="max-w-3xl mx-auto px-5 lg:px-8">
                            <div className="text-center mb-12">
                                <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold mb-2 block">Resolvemos tus dudas</span>
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink">Preguntas frecuentes</h2>
                            </div>

                            <div className="space-y-3">
                                {data.faqs.map((faq, index) => (
                                    <details key={index} className="group bg-cream rounded-2xl border border-ink/10 overflow-hidden transition-all open:shadow-md open:border-gold/40">
                                        <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                                            <h3 className="font-medium text-ink pr-2">{faq.pregunta}</h3>
                                            <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold transition-all group-open:rotate-180 group-open:bg-gold group-open:text-white">
                                                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-6 pb-6">
                                            <p className="text-olive leading-relaxed">{faq.respuesta}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Galería */}
                {data.galeria && data.galeria.imagenes.length > 0 && (
                    <section className="py-24 bg-cream">
                        <div className="max-w-5xl mx-auto px-5 lg:px-8">
                            <div className="text-center mb-12">
                                <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold mb-2 block">
                                    {data.galeria.subtitulo || "Galería"}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink">
                                    {data.galeria.titulo || "Imágenes del procedimiento"}
                                </h2>
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {data.galeria.imagenes.map((src, i) => (
                                    <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl border border-ink/10 shadow-sm">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={src}
                                            alt={`${data.titulo} en Clínica CIALO — imagen ${i + 1}`}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Final */}
                <section className="py-24 bg-gradient-to-br from-gold to-goldlt">
                    <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink mb-6">
                            {data.ctaTitulo || "¿Lista para comenzar?"}
                        </h2>
                        <p className="text-ink/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                            {data.ctaDescripcion || "Agenda tu evaluación y descubre cómo podemos ayudarte."}
                        </p>
                        <a
                            href={`https://wa.me/56982028473?text=${encodeURIComponent(data.whatsappMessage)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-ink text-white px-10 py-5 rounded-full font-bold uppercase tracking-wider hover:bg-white hover:text-ink transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar mi evaluación
                        </a>
                        <p className="mt-6 text-ink/70 text-sm font-medium">
                            ★ 4.9/284 reseñas · Autorización SEREMI · Financiamiento hasta 12 cuotas
                        </p>
                        <p className="mt-3 text-ink/60 text-sm">
                            📍 Bulnes 220, Of. 509 — Los Ángeles, Biobío • +56 9 8202 8473
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
