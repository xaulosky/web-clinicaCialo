import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TreatmentCard from "../../components/TreatmentCard";
import DepilacionSelector from "../../components/DepilacionSelector";
import ReservaClinios from "../../components/ReservaClinios";
import PixelViewContent from "../../components/PixelViewContent";
import AlternateTreatmentLayoutV5 from "../../components/AlternateTreatmentLayoutV5";
import {
    tratamientosData,
    getTratamientoById,
    getTratamientosRelacionados,
    formatPrice,
    tratamientoRequiereEvaluacion,
    getConsultaEvaluacion,
    getAgendaUrl,
} from "@/data/tratamientos";
import { categoriasData } from "@/data/categorias";
import { profesionalesData } from "@/data/profesionales";

const SITE_URL = "https://cialo.cl";

// Confianza / reputación global de la clínica (Google Business).
const RATING_VALUE = "4.9";
const RATING_COUNT = "284";

// Devuelve el slug de categoría a partir del nombre (ej: "Facial" -> "facial").
function getCategoriaSlug(nombre: string): string | undefined {
    return categoriasData.find((c) => c.nombre === nombre)?.slug;
}

// Normaliza un texto (minúsculas, sin tildes) para comparar nombres.
function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .trim();
}

/**
 * Intenta resolver el primer profesional del tratamiento a una ficha de equipo.
 * `tratamiento.profesional` es un string tipo "Dr. Nicolás Laucirica / Dra. Elga Viviana Peña".
 * Devuelve { id, nombre } del primero que tenga ficha, o undefined.
 */
function getProfesionalDestacado(
    profesionalStr: string
): { id: string; nombre: string } | undefined {
    if (!profesionalStr) return undefined;
    const segmentos = profesionalStr.split("/").map((s) => s.trim());
    for (const seg of segmentos) {
        const segNorm = normalize(seg);
        const match = profesionalesData.find((p) => {
            const nombre1 = normalize(p.nombre).split(/\s+/)[0];
            const apellido1 = normalize(p.apellido).split(/\s+/)[0];
            return (
                nombre1.length > 0 &&
                apellido1.length > 0 &&
                segNorm.includes(nombre1) &&
                segNorm.includes(apellido1)
            );
        });
        if (match) {
            return {
                id: match.id,
                nombre: `${match.titulo} ${match.nombre} ${match.apellido}`.trim(),
            };
        }
    }
    return undefined;
}

interface PageProps {
    params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return tratamientosData.map((t) => ({
        id: t.id,
    }));
}

// Genera una descripción concisa (~160 chars) a partir de la del tratamiento.
function buildDescription(t: ReturnType<typeof getTratamientoById>): string {
    if (!t) return "";
    if (t.seo?.metaDescription) return t.seo.metaDescription;
    // Quitar posibles etiquetas HTML y recortar a la primera/segunda frase.
    const plain = t.descripcion.replace(/<[^>]+>/g, "").trim();
    if (plain.length <= 160) return plain;
    return plain.slice(0, 157).trimEnd() + "…";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const tratamiento = getTratamientoById(id);

    if (!tratamiento) {
        return {
            title: "Tratamiento no encontrado | Clínica Cialo",
        };
    }

    const title =
        tratamiento.seo?.metaTitle ||
        `${tratamiento.nombre} en Los Ángeles | Clínica Cialo`;
    const description = buildDescription(tratamiento);
    const keywords =
        tratamiento.seo?.keywords && tratamiento.seo.keywords.length > 0
            ? tratamiento.seo.keywords
            : [
                  `${tratamiento.nombre} los ángeles`.toLowerCase(),
                  `${tratamiento.categoria} los ángeles`.toLowerCase(),
                  ...tratamiento.tags.map((t) => t.toLowerCase()),
                  "medicina estética los ángeles",
                  "clínica cialo",
              ];
    const canonical = `/tratamientos/${id}/`;
    const ogImage = tratamiento.imagenHero || tratamiento.imagenExplicativa;

    return {
        // Ambas variantes ya traen la marca: absoluto para que la plantilla
        // del layout ("%s | Clínica Cialo") no la duplique.
        title: { absolute: title },
        description,
        keywords,
        alternates: {
            canonical,
        },
        openGraph: {
            title,
            description,
            type: "website",
            locale: "es_CL",
            siteName: "Clínica Cialo",
            url: `${SITE_URL}${canonical}`,
            ...(ogImage && {
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: tratamiento.nombre,
                    },
                ],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(ogImage && { images: [ogImage] }),
        },
    };
}

export default async function TratamientoPage({ params }: PageProps) {
    const { id } = await params;
    const tratamiento = getTratamientoById(id);

    if (!tratamiento) {
        notFound();
    }

    const relacionados = getTratamientosRelacionados(tratamiento, 3);
    // Agenda de Reservo: la propia del tratamiento o la de su área.
    const agendaUrl = getAgendaUrl(tratamiento);
    // Consulta/evaluación con la que se entra a este tratamiento cuando no
    // tiene agenda propia (se reserva online, a diferencia de WhatsApp).
    const consultaEvaluacion = getConsultaEvaluacion(tratamiento);

    // Dynamic premium layout route for test treatment
    if (tratamiento.id === 'test-mercado-pago') {
        return <AlternateTreatmentLayoutV5 tratamiento={tratamiento} relacionados={relacionados} />;
    }

    // Schema FAQ (if applicable)
    const faqJsonLd = tratamiento.faqs ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": tratamiento.faqs.map(f => ({
            "@type": "Question",
            "name": f.pregunta,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.respuesta
            }
        }))
    } : null;

    const categoriaSlug = getCategoriaSlug(tratamiento.categoria);
    const profesionalDestacado = getProfesionalDestacado(tratamiento.profesional);
    const procedimientoUrl = `${SITE_URL}/tratamientos/${tratamiento.id}/`;
    const descripcionPlana = tratamiento.descripcion.replace(/<[^>]+>/g, "").trim();
    const precioDesdeLabel = tratamiento.valorDesde
        ? "$" + tratamiento.valorDesde.toLocaleString("es-CL")
        : null;

    // Clínica (provider) reutilizable como referencia.
    const clinicaProvider = {
        "@type": "MedicalClinic",
        "@id": `${SITE_URL}/#organization`,
        "name": "Clínica Cialo",
        "url": SITE_URL,
        "telephone": "+56 9 8202 8473",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bulnes 220, Oficina 509, Edificio Puerto Mayor II",
            "addressLocality": "Los Ángeles",
            "addressRegion": "Biobío",
            "postalCode": "4440000",
            "addressCountry": "CL"
        }
    };

    // Schema MedicalProcedure (con provider y areaServed)
    const medicalProcedureJsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": tratamiento.nombre,
        "description": descripcionPlana,
        "procedureType": "NonSurgicalProcedure",
        "category": tratamiento.categoria,
        "url": procedimientoUrl,
        "provider": clinicaProvider,
        "areaServed": {
            "@type": "City",
            "name": "Los Ángeles, Biobío"
        },
        "performer": {
            "@type": "Physician",
            "name": tratamiento.profesional || "Equipo Clínica Cialo",
            ...(profesionalDestacado
                ? { "url": `${SITE_URL}/profesionales/${profesionalDestacado.id}/` }
                : {}),
            "affiliation": {
                "@type": "MedicalOrganization",
                "name": "Clínica Cialo"
            }
        },
        // Reputación agregada de la clínica (aporta rich results con estrellas).
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": RATING_VALUE,
            "reviewCount": RATING_COUNT,
            "bestRating": "5",
            "worstRating": "1"
        },
        // Offer con priceCurrency CLP. Solo se emite cuando hay un precio "desde".
        ...(tratamiento.valorDesde
            ? {
                  "offers": {
                      "@type": "Offer",
                      "priceCurrency": "CLP",
                      "price": tratamiento.valorDesde.toString(),
                      "availability": "https://schema.org/InStock",
                      "url": procedimientoUrl,
                      "seller": clinicaProvider,
                  },
              }
            : {})
    };

    // Schema BreadcrumbList (Inicio › Tratamientos › Categoría › Nombre)
    const breadcrumbItems = [
        { name: "Inicio", item: `${SITE_URL}/` },
        { name: "Tratamientos", item: `${SITE_URL}/tratamientos/` },
        ...(categoriaSlug
            ? [{ name: tratamiento.categoria, item: `${SITE_URL}/tratamientos/categoria/${categoriaSlug}/` }]
            : []),
        { name: tratamiento.nombre, item: procedimientoUrl },
    ];
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((b, i) => ({
            "@type": "ListItem",
            "position": i + 1,
            "name": b.name,
            "item": b.item,
        })),
    };

    return (
        <div className="flex flex-col min-h-screen bg-cream pb-[72px] lg:pb-0">
            <PixelViewContent
                id={tratamiento.id}
                name={tratamiento.nombre}
                value={tratamiento.valorDesde ?? undefined}
                category={tratamiento.categoria}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalProcedureJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <Navbar transparent />

            {/* Hero del Tratamiento - Rediseño Premium v2 (Compact & Minimalist) */}
            <header className="relative min-h-[35vh] flex items-center overflow-hidden bg-ink">
                {/* Multi-layered Background Architecture */}
                <div className="absolute inset-0 z-0">
                    {/* Primary Image with heavy treatment */}
                    {tratamiento.imagenHero ? (
                        <div className="absolute inset-0">
                            <Image
                                src={tratamiento.imagenHero}
                                alt={`${tratamiento.nombre} en Clínica Cialo, Los Ángeles`}
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover opacity-30 mix-blend-luminosity scale-105"
                            />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-gold/[0.05] to-transparent"></div>
                        </div>
                    ) : (
                        <div className="w-full h-full bg-ink">
                             <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-gold/[0.06] via-transparent to-transparent"></div>
                        </div>
                    )}

                    {/* Dynamic Gradients for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"></div>
                    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/10 blur-3xl"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 w-full">
                    <div className="flex flex-col gap-10">
                        {/* Upper Section: Breadcrumbs & Category */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/50 font-medium">
                                <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
                                <span className="text-white/25" aria-hidden="true">/</span>
                                <Link href="/tratamientos" className="hover:text-gold transition-colors">Tratamientos</Link>
                                {categoriaSlug && (
                                    <>
                                        <span className="text-white/25" aria-hidden="true">/</span>
                                        <Link
                                            href={`/tratamientos/categoria/${categoriaSlug}`}
                                            className="hover:text-gold transition-colors"
                                        >
                                            {tratamiento.categoria}
                                        </Link>
                                    </>
                                )}
                                <span className="text-white/25" aria-hidden="true">/</span>
                                <span className="text-gold" aria-current="page">{tratamiento.nombre}</span>
                            </nav>

                            <div className="flex items-center gap-4">
                                <div className="h-px w-8 bg-gold/30 hidden md:block"></div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold/80">
                                    {tratamiento.categoria} · {tratamiento.subcategoria}
                                </span>
                            </div>
                        </div>

                        {/* Main Content: Title & Brief Description */}
                        <div className="max-w-4xl">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-[1.1] tracking-wide">
                                {tratamiento.nombre}
                            </h1>
                            <div
                                className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl border-l-2 border-gold/40 pl-6 py-1"
                                dangerouslySetInnerHTML={{ __html: tratamiento.descripcion.split('.')[0] + '.' }}
                            />
                        </div>

                        {/* Lower Section: Horizontal Quick Info Bar (Glassy) */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-1 p-1 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {/* Price Block */}
                            <div className="bg-white/[0.02] p-5 flex flex-col justify-center">
                                <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold mb-2">Valor estimado</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-[10px] text-gold font-bold">CLP</span>
                                    <p className="text-2xl font-semibold text-white tracking-tight">
                                        {formatPrice(tratamiento.valorDesde, tratamiento.valorHasta).replace('$', '')}
                                    </p>
                                </div>
                            </div>

                            {/* Info 1: Duration */}
                            <div className="bg-white/[0.02] p-5 flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/10 group-hover:bg-gold/20 transition-colors">
                                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold mb-0.5">Sesión</p>
                                    <p className="text-sm text-white font-medium">{tratamiento.duracion}</p>
                                </div>
                            </div>

                            {/* Info 2: Specialists */}
                            <div className="bg-white/[0.02] p-5 flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/10 group-hover:bg-gold/20 transition-colors">
                                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold mb-0.5">Referente</p>
                                    {profesionalDestacado ? (
                                        <Link
                                            href={`/profesionales/${profesionalDestacado.id}`}
                                            className="block text-sm text-white font-medium leading-snug hover:text-gold transition-colors"
                                            title={`Ver perfil de ${profesionalDestacado.nombre}`}
                                        >
                                            {tratamiento.profesional}
                                        </Link>
                                    ) : (
                                        <p className="text-sm text-white font-medium leading-snug">{tratamiento.profesional}</p>
                                    )}
                                </div>
                            </div>

                            {/* Action Block - Refined for Evaluation needed */}
                            {tratamientoRequiereEvaluacion(tratamiento) ? (
                                <div className="bg-gold/10 p-4 flex flex-col justify-center gap-3 border-l md:border-l-0 border-white/10">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                                            <span className="text-[9px] uppercase tracking-wider text-gold font-bold">Requiere evaluación previa</span>
                                        </div>
                                        <p className="text-[10px] text-white/60 leading-tight">Un médico debe evaluar tu caso para determinar el plan adecuado.</p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <a
                                            href="#booking-section"
                                            className="bg-gold hover:bg-white text-ink text-[11px] font-bold uppercase tracking-widest py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            Agendar cita
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </a>
                                        <div className="flex items-center justify-between px-1">
                                            <span className="text-[9px] text-white/40 uppercase font-bold tracking-tighter">Valor consulta: ${getConsultaEvaluacion(tratamiento).precio.toLocaleString('es-CL')}</span>
                                            <a
                                                href={`https://wa.me/56982028473?text=Hola,%20me%20interesa%20evaluación%20para%20${encodeURIComponent(tratamiento.nombre)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[9px] text-gold hover:text-white transition-colors flex items-center gap-1 font-bold tracking-tighter"
                                            >
                                                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                                Consultar WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white/[0.05] p-5 flex flex-col justify-center gap-4 border-l md:border-l-0 border-white/10 group">
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gold"></div>
                                            <span className="text-[9px] uppercase tracking-wider text-gold font-bold">Compra y agenda online</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <p className="text-[10px] text-white/80 font-medium">✓ Hora garantizada al pagar</p>
                                            <p className="text-[10px] text-white/60">✓ Sin esperas ni trámites previos</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <a
                                            href="#booking-section"
                                            className="bg-gold hover:bg-white text-ink text-[11px] font-bold uppercase tracking-widest py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            Ver agenda online
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </a>
                                        <a
                                            href={`https://wa.me/56982028473?text=Hola,%20me%20interesa%20agendar%20${encodeURIComponent(tratamiento.nombre)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[9px] text-gold/70 hover:text-white transition-colors flex items-center justify-center gap-1.5 font-bold uppercase tracking-tighter mt-1"
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            Consultar WhatsApp
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Info Principal */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Tags */}
                            {tratamiento.tags.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-4">
                                        Beneficios destacados
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {tratamiento.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center gap-1.5 bg-gold/10 text-ink px-4 py-2 rounded-full text-sm font-medium"
                                            >
                                                <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ¿Es para ti? (problemáticas que resuelve) */}
                            {tratamiento.problematicas && tratamiento.problematicas.length > 0 && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-ink/10">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-1.5">
                                        ¿Es para ti?
                                    </h2>
                                    <p className="text-olive text-sm mb-5">
                                        Este tratamiento está especialmente indicado si te preocupa:
                                    </p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {tratamiento.problematicas.map((p) => (
                                            <span
                                                key={p}
                                                className="inline-flex items-center gap-2 bg-cream border border-sand rounded-full px-4 py-2 text-sm text-ink"
                                            >
                                                <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Imagen Explicativa (Gráfico comparativo) */}
                            {tratamiento.imagenExplicativa && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/10">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-4">
                                        Entendiendo tu tratamiento
                                    </h2>
                                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-cream border border-sand">
                                        <Image
                                            src={tratamiento.imagenExplicativa}
                                            alt={`Gráfico explicativo del tratamiento ${tratamiento.nombre} en Clínica Cialo`}
                                            fill
                                            loading="lazy"
                                            sizes="(max-width: 1024px) 100vw, 66vw"
                                            className="object-contain p-4"
                                        />
                                    </div>
                                    <p className="text-sm text-olive mt-3 text-center italic">
                                        Gráfico referencial sobre la evolución y duración de los resultados.
                                    </p>
                                </div>
                            )}

                            {/* Galería del tratamiento */}
                            {tratamiento.galeria && tratamiento.galeria.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/10">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-4">
                                        Galería
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {tratamiento.galeria.map((src, i) => (
                                            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border border-sand">
                                                <Image
                                                    src={src}
                                                    alt={`${tratamiento.nombre} en Clínica Cialo — imagen ${i + 1}`}
                                                    fill
                                                    loading="lazy"
                                                    sizes="(max-width: 1024px) 50vw, 22vw"
                                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Sinergias (Tratamientos Combinados) */}
                            {tratamiento.sinergias && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gold/30 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Potencia tus resultados
                                    </h2>
                                    <div className="space-y-4 relative z-10">
                                        {tratamiento.sinergias.map((sinergia, idx) => (
                                            <div key={idx} className="bg-cream p-5 rounded-xl border border-sand hover:border-gold/40 hover:shadow-md transition-all">
                                                <h3 className="font-medium text-ink mb-1">
                                                    Combínalo con <span className="text-gold-dark font-semibold">{sinergia.nombre}</span>
                                                </h3>
                                                <p className="text-sm text-olive mb-3 leading-relaxed">
                                                    {sinergia.descripcion}
                                                </p>
                                                {sinergia.url && (
                                                    <Link
                                                        href={sinergia.url}
                                                        className="text-xs font-semibold uppercase tracking-wider text-gold-dark hover:text-ink transition-colors flex items-center gap-1"
                                                    >
                                                        Ver tratamiento
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Descripción Extendida */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-ink/10">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-4">
                                    Sobre el tratamiento
                                </h2>
                                <div className="prose max-w-none">
                                    <div
                                        className="text-olive leading-relaxed [&>strong]:text-ink [&>strong]:font-semibold"
                                        dangerouslySetInnerHTML={{ __html: tratamiento.descripcion }}
                                    />
                                    <p className="text-olive leading-relaxed mt-4">
                                        En Clínica Cialo contamos con tecnología de última generación y profesionales
                                        altamente capacitados para brindarte los mejores resultados. Todos nuestros
                                        tratamientos son realizados con productos certificados y aprobados por la FDA.
                                    </p>
                                </div>
                            </div>

                            {/* Cómo es la experiencia (proceso) */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-ink/10">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-6">
                                    Cómo es la experiencia
                                </h2>
                                <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                                    {[
                                        {
                                            n: 1,
                                            t: tratamientoRequiereEvaluacion(tratamiento) ? "Evaluación médica" : "Evaluación inicial",
                                            d: "Un especialista revisa tu caso y diseña un plan a tu medida.",
                                        },
                                        {
                                            n: 2,
                                            t: "El procedimiento",
                                            d: `Realizamos ${tratamiento.nombre} con tecnología certificada, en un entorno seguro y cómodo.`,
                                        },
                                        {
                                            n: 3,
                                            t: "Resultados",
                                            d: "Notarás mejoras progresivas, naturales y clínicamente medibles.",
                                        },
                                        {
                                            n: 4,
                                            t: "Seguimiento",
                                            d: "Te acompañamos con indicaciones y controles para cuidar tu resultado.",
                                        },
                                    ].map((s) => (
                                        <li key={s.n} className="flex gap-4">
                                            <span className="shrink-0 w-10 h-10 rounded-full bg-gold/10 text-gold-dark font-semibold flex items-center justify-center">
                                                {s.n}
                                            </span>
                                            <div>
                                                <h3 className="font-semibold text-ink mb-1">{s.t}</h3>
                                                <p className="text-sm text-olive leading-relaxed">{s.d}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            {/* Related Links */}
                            {tratamiento.relatedLinks && tratamiento.relatedLinks.length > 0 && (
                                <div className="space-y-3">
                                    {tratamiento.relatedLinks.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className="flex items-center justify-between p-4 bg-white border border-gold/30 rounded-xl hover:bg-gold/5 hover:border-gold/60 transition-all group"
                                        >
                                            <span className="font-medium text-ink group-hover:text-gold transition-colors">
                                                {link.text}
                                            </span>
                                            <svg className="w-5 h-5 text-gold transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    ))}
                                </div>
                            )}



                            {/* Beneficios */}
                            {tratamiento.beneficios && tratamiento.beneficios.length > 0 && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-ink/10">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-6">
                                        Beneficios principales
                                    </h2>
                                    <ul className="space-y-3">
                                        {tratamiento.beneficios.map((beneficio, index) => (
                                            <li key={index} className="flex gap-3 text-olive">
                                                <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span>{beneficio}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Contraindicaciones */}
                            {tratamiento.contraindicaciones && tratamiento.contraindicaciones.length > 0 && (
                                <div className="bg-sand/40 p-8 rounded-2xl border border-sand">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        Consideraciones importantes
                                    </h2>
                                    <p className="text-olive mb-4 text-sm">
                                        Por su seguridad, este tratamiento puede no ser apto si presenta:
                                    </p>
                                    <ul className="space-y-2">
                                        {tratamiento.contraindicaciones.map((item, index) => (
                                            <li key={index} className="flex gap-3 text-olive text-sm">
                                                <span className="text-gold font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Efectos Secundarios */}
                            {tratamiento.efectosSecundarios && tratamiento.efectosSecundarios.length > 0 && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-ink/10">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        Posibles efectos secundarios
                                    </h2>
                                    <ul className="space-y-3">
                                        {tratamiento.efectosSecundarios.map((item, index) => (
                                            <li key={index} className="flex gap-3 text-olive">
                                                <span className="text-gold font-bold">•</span>
                                                <span className="text-sm" dangerouslySetInnerHTML={{ __html: item }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Cuidados Posteriores */}
                            {tratamiento.cuidadosPosteriores && tratamiento.cuidadosPosteriores.length > 0 && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-ink/10">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-6 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                        Indicaciones y cuidados posteriores
                                    </h2>
                                    <ul className="space-y-3">
                                        {tratamiento.cuidadosPosteriores.map((item, index) => (
                                            <li key={index} className="flex gap-3 text-olive">
                                                <svg className="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm" dangerouslySetInnerHTML={{ __html: item }} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Selector de Zonas (para depilación láser) */}
                            {tratamiento.zonas && tratamiento.zonas.length > 0 && (
                                <DepilacionSelector zonas={tratamiento.zonas} />
                            )}



                            {/* Info Adicional */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-ink">Seguridad garantizada</h3>
                                    </div>
                                    <p className="text-olive text-sm">
                                        Procedimientos realizados bajo estrictos protocolos de seguridad y
                                        autorización SEREMI de Salud.
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/10">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                        </div>
                                        <h3 className="font-semibold text-ink">Facilidades de pago</h3>
                                    </div>
                                    <p className="text-olive text-sm">
                                        Aceptamos múltiples medios de pago. Consulta por opciones de
                                        financiamiento disponibles.
                                    </p>
                                </div>
                            </div>

                            {/* Contacto / Horario / Ubicación */}
                            <div className="grid sm:grid-cols-3 gap-6">
                                {/* CTA Contacto */}
                                <div className="bg-ink text-white p-6 rounded-2xl">
                                    <h3 className="text-lg font-[family-name:var(--font-italiana)] mb-3">
                                        ¿Tienes dudas?
                                    </h3>
                                    <p className="text-white/60 text-sm mb-4">
                                        Nuestro equipo está disponible para responder todas tus consultas.
                                    </p>
                                    <div className="space-y-3">
                                        <a
                                            href="https://wa.me/56982028473"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm hover:text-gold transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-gold shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            +56 9 8202 8473
                                        </a>
                                        <a
                                            href="mailto:contacto@cialo.cl"
                                            className="flex items-center gap-2 text-sm hover:text-gold transition-colors"
                                        >
                                            <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            contacto@cialo.cl
                                        </a>
                                    </div>
                                </div>

                                {/* Horario */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/10">
                                    <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Horario de atención
                                    </h3>
                                    <p className="text-olive text-sm">
                                        Lunes a viernes 08:30 - 20:00<br />
                                        Sábados 09:00 - 15:00
                                    </p>
                                </div>

                                {/* Ubicación */}
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-ink/10">
                                    <h3 className="font-semibold text-ink mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Ubicación
                                    </h3>
                                    <p className="text-olive text-sm">
                                        Bulnes 220, Of. 509<br />
                                        Edificio Puerto Mayor II<br />
                                        <strong className="text-ink">Los Ángeles, Biobío</strong>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Reserva en línea (agenda propia) - sticky para agendar fácil */}
                            <div id="booking-section" className="lg:sticky lg:top-24 scroll-mt-24 space-y-5">
                                {agendaUrl ? (
                                    <div className="bg-white rounded-2xl overflow-hidden border border-gold/40 shadow-md">
                                        <div className="p-5 bg-ink text-white">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                                                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Reserva online</span>
                                            </div>
                                            <h2 className="text-xl font-[family-name:var(--font-italiana)] leading-tight">
                                                Agenda mi {tratamientoRequiereEvaluacion(tratamiento) ? 'evaluación' : 'hora'}
                                            </h2>
                                            <p className="text-xs text-white/60 mt-1">Elige fecha y hora en la agenda real.</p>
                                            {precioDesdeLabel && (
                                                <p className="mt-2 text-sm text-white">
                                                    <span className="text-white/50 text-xs">Desde </span>
                                                    <span className="font-semibold text-gold">{precioDesdeLabel}</span>
                                                </p>
                                            )}
                                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px]">
                                                <span className="inline-flex items-center gap-1.5 text-white/80">
                                                    <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    Hora garantizada
                                                </span>
                                                <span className="inline-flex items-center gap-1.5 text-white/80">
                                                    <svg className="w-3.5 h-3.5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                    Reserva en línea
                                                </span>
                                            </div>
                                        </div>
                                        <div className="w-full p-4">
                                            <ReservaClinios agendaUrl={agendaUrl} title={`Agendar ${tratamiento.nombre}`} treatmentName={tratamiento.nombre} loadDirectly={true} bare />
                                        </div>
                                    </div>
                                ) : (
                                    /* Sin agenda propia: tarjeta de agendamiento por evaluación / WhatsApp */
                                    <div className="bg-ink text-white rounded-2xl overflow-hidden border border-gold/40 shadow-md p-6">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                                            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">Agenda tu hora</span>
                                        </div>
                                        <h2 className="text-xl font-[family-name:var(--font-italiana)] leading-tight">
                                            Agenda mi {tratamientoRequiereEvaluacion(tratamiento) ? 'evaluación' : 'hora'}
                                        </h2>
                                        {precioDesdeLabel && (
                                            <p className="mt-2 text-sm">
                                                <span className="text-white/50 text-xs">Desde </span>
                                                <span className="font-semibold text-gold">{precioDesdeLabel}</span>
                                            </p>
                                        )}
                                        {/* La evaluación previa SÍ se reserva online: es la acción
                                            principal. WhatsApp queda como alternativa. */}
                                        <Link
                                            href={consultaEvaluacion.url}
                                            className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-gold text-white px-5 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-ink transition-colors"
                                        >
                                            Agendar evaluación online
                                        </Link>
                                        <p className="mt-2 text-center text-[11px] text-white/60">
                                            {consultaEvaluacion.precio === 0
                                                ? `${consultaEvaluacion.nombre} · sin costo en horarios seleccionados`
                                                : `${consultaEvaluacion.nombre} · ${formatPrice(consultaEvaluacion.precio, null)}`}
                                        </p>
                                        <a
                                            href={`https://wa.me/56982028473?text=${encodeURIComponent(`Hola, quiero agendar mi hora para ${tratamiento.nombre}`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-white/25 text-white px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-white hover:text-ink transition-colors"
                                        >
                                            Prefiero WhatsApp
                                        </a>
                                    </div>
                                )}

                                {/* Confianza + financiamiento + enlaces internos cerca del CTA */}
                                <div className="bg-white rounded-2xl border border-ink/10 shadow-sm p-5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-0.5 text-gold" aria-hidden="true">
                                            {[0, 1, 2, 3, 4].map((i) => (
                                                <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.539 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.343 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" /></svg>
                                            ))}
                                        </div>
                                        <p className="text-sm text-ink font-semibold">
                                            {RATING_VALUE}/5
                                            <span className="font-normal text-olive"> · {RATING_COUNT} reseñas</span>
                                        </p>
                                    </div>
                                    <ul className="space-y-2 text-xs text-olive">
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                            Autorización <strong className="text-ink font-semibold">SEREMI de Salud</strong>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Insumos certificados <strong className="text-ink font-semibold">FDA</strong>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                            Financiamiento <strong className="text-ink font-semibold">hasta 12 cuotas</strong>
                                        </li>
                                    </ul>

                                    {/* Enlaces internos relevantes */}
                                    <div className="border-t border-sand pt-3 space-y-1.5">
                                        {categoriaSlug && (
                                            <Link
                                                href={`/tratamientos/categoria/${categoriaSlug}`}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-gold-dark hover:text-ink transition-colors"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                Ver más de {tratamiento.categoria}
                                            </Link>
                                        )}
                                        {profesionalDestacado && (
                                            <Link
                                                href={`/profesionales/${profesionalDestacado.id}`}
                                                className="flex items-center gap-1.5 text-xs font-semibold text-gold-dark hover:text-ink transition-colors"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                                Conoce a {profesionalDestacado.nombre}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQs */}
                {tratamiento.faqs && tratamiento.faqs.length > 0 && (
                    <section className="bg-cream py-20 border-t border-sand">
                        <div className="max-w-3xl mx-auto px-5 lg:px-8">
                            <div className="text-center mb-10">
                                <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold">
                                    Resolvemos tus dudas
                                </span>
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink mt-2">
                                    Preguntas frecuentes
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {tratamiento.faqs.map((faq, index) => (
                                    <details key={index} className="group bg-white rounded-2xl shadow-sm border border-ink/10 transition-all open:shadow-md open:border-gold/40">
                                        <summary className="flex justify-between items-center gap-4 p-6 font-medium text-ink list-none cursor-pointer">
                                            {faq.pregunta}
                                            <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-gold/10 text-gold transition-all group-open:rotate-180 group-open:bg-gold group-open:text-white">
                                                <svg fill="none" height="18" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18"><path d="M6 9l6 6 6-6"></path></svg>
                                            </span>
                                        </summary>
                                        <p className="text-olive px-6 pb-6 text-sm leading-relaxed">
                                            {faq.respuesta}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Tratamientos Relacionados */}
                {relacionados.length > 0 && (
                    <section className="bg-white border-t border-sand py-20">
                        <div className="max-w-7xl mx-auto px-5 lg:px-8">
                            <div className="text-center mb-10">
                                <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold">
                                    Te puede interesar
                                </span>
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink mt-2">
                                    Tratamientos relacionados
                                </h2>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {relacionados.map((t) => (
                                    <TreatmentCard key={t.id} treatment={t} />
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <Link
                                    href={`/tratamientos?categoria=${tratamiento.categoria}`}
                                    className="inline-flex items-center gap-2 rounded-full border border-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold hover:text-white transition-all"
                                >
                                    Ver todos los tratamientos de {tratamiento.categoria}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Video Section - Movido al final por solicitud */}
                {tratamiento.videoUrls && tratamiento.videoUrls.length > 0 && (
                    <section className="bg-cream border-t border-sand py-20">
                        <div className="max-w-7xl mx-auto px-5 lg:px-8">
                            <div className="text-center mb-10">
                                <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold">
                                    Experiencia Cialo
                                </span>
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink mt-2">
                                    Mira el procedimiento
                                </h2>
                            </div>
                            <div className={`grid gap-12 justify-center ${tratamiento.videoUrls.length > 1 ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
                                {tratamiento.videoUrls.map((url, index) => (
                                    <div key={index} className="relative w-full max-w-[320px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden bg-black border-[8px] border-white shadow-2xl">
                                        <iframe
                                            src={url}
                                            title={`Video del procedimiento ${tratamiento.nombre} en Clínica Cialo`}
                                            className="absolute inset-0 w-full h-full"
                                            frameBorder="0"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Footer />

            {/* CTA sticky (solo móvil): precio "desde" + confianza + agendar */}
            <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-gold/30 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                        {precioDesdeLabel ? (
                            <p className="text-sm font-bold text-ink leading-none">
                                <span className="text-[10px] font-medium uppercase tracking-wider text-olive">Desde </span>
                                {precioDesdeLabel}
                            </p>
                        ) : (
                            <p className="text-sm font-bold text-ink leading-none">Evaluación previa</p>
                        )}
                        <p className="mt-1 flex items-center gap-1 text-[11px] text-olive">
                            <svg className="w-3 h-3 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.539 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.343 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" /></svg>
                            <strong className="text-ink font-semibold">{RATING_VALUE}</strong>/{RATING_COUNT} · SEREMI
                        </p>
                    </div>
                    <a
                        href="#booking-section"
                        className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg hover:bg-ink transition-colors"
                    >
                        Agendar mi hora
                    </a>
                </div>
            </div>
        </div>
    );
}
