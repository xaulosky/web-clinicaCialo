import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProfesionalProfile from "../../components/ProfesionalProfile";
import { profesionalesData, getProfesionalById, type Profesional } from "@/data/profesionales";

const SITE_URL = "https://cialo.cl";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return profesionalesData.map((p) => ({
        id: p.id,
    }));
}

function nombreCompleto(profesional: Profesional) {
    return `${profesional.titulo} ${profesional.nombre} ${profesional.apellido}`.trim();
}

function imagenAbsoluta(imagen: string) {
    if (!imagen) return undefined; // profesional sin foto
    return imagen.startsWith("http") ? imagen : `${SITE_URL}${imagen}`;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const profesional = getProfesionalById(id);

    if (!profesional) {
        return {
            title: "Profesional no encontrado | Clínica CIALO",
        };
    }

    const nombre = nombreCompleto(profesional);
    const title =
        profesional.seo?.metaTitle ||
        `${nombre} | ${profesional.subtitulo.split("|")[0].trim()} en Los Ángeles | Clínica CIALO`;
    const description =
        profesional.seo?.metaDescription ||
        `${nombre}, ${profesional.subtitulo} en Los Ángeles, Chile. ${profesional.perfil.slice(0, 130).replace(/\s+/g, " ").trim()}…`;
    const imagen = imagenAbsoluta(profesional.imagen);
    const url = `${SITE_URL}/profesionales/${profesional.id}`;

    return {
        title,
        description,
        keywords: profesional.seo?.keywords,
        alternates: {
            canonical: `/profesionales/${profesional.id}`,
        },
        openGraph: {
            title,
            description,
            type: "profile",
            locale: "es_CL",
            url,
            images: imagen ? [{ url: imagen, alt: nombre }] : undefined,
        },
    };
}

export default async function ProfesionalPage({ params }: PageProps) {
    const { id } = await params;
    const profesional = getProfesionalById(id);

    if (!profesional) {
        notFound();
    }

    const nombre = nombreCompleto(profesional);
    const url = `${SITE_URL}/profesionales/${profesional.id}`;
    const imagen = imagenAbsoluta(profesional.imagen);
    const waText = `Hola, me interesa agendar una hora con ${nombre} en Clínica CIALO.`;

    const physicianJsonLd = {
        "@context": "https://schema.org",
        "@type": "Physician",
        name: nombre,
        jobTitle: profesional.subtitulo,
        medicalSpecialty: profesional.categoria,
        image: imagen,
        url,
        knowsLanguage: profesional.idiomas.map((i) => i.idioma),
        worksFor: {
            "@type": "MedicalClinic",
            name: "Clínica CIALO",
            url: SITE_URL,
            address: {
                "@type": "PostalAddress",
                streetAddress: "Bulnes 220, Of. 509",
                addressLocality: "Los Ángeles",
                addressRegion: "Biobío",
                addressCountry: "CL",
            },
        },
        areaServed: {
            "@type": "City",
            name: "Los Ángeles, Biobío",
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Equipo", item: `${SITE_URL}/profesionales` },
            { "@type": "ListItem", position: 3, name: nombre, item: url },
        ],
    };

    return (
        <div className="flex flex-col min-h-screen bg-cream overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            <Navbar transparent />

            {/* Header */}
            <header className="relative bg-gradient-to-br from-ink via-[#2a2622] to-ink text-white py-14 pt-[120px] overflow-hidden">
                {/* Halo dorado decorativo */}
                <div className="absolute -top-40 right-0 w-[520px] h-[520px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10 w-full">
                    {/* Breadcrumbs (visibles) */}
                    <nav aria-label="Migas de pan" className="mb-7">
                        <ol className="flex flex-wrap items-center gap-2.5 text-xs text-cream/60">
                            <li>
                                <Link href="/" className="hover:text-gold transition-colors">
                                    Inicio
                                </Link>
                            </li>
                            <li aria-hidden className="text-gold/40">/</li>
                            <li>
                                <Link href="/profesionales" className="hover:text-gold transition-colors">
                                    Equipo
                                </Link>
                            </li>
                            <li aria-hidden className="text-gold/40">/</li>
                            <li className="text-gold font-medium" aria-current="page">
                                {nombre}
                            </li>
                        </ol>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">
                                Perfil profesional
                            </span>
                            <h1 className="font-[family-name:var(--font-italiana)] text-3xl md:text-4xl mt-3 leading-tight">
                                {nombre}
                            </h1>
                            <p className="text-cream/70 text-sm mt-2 max-w-xl leading-relaxed">{profesional.subtitulo}</p>
                        </div>

                        {/* CTAs rápidos */}
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={profesional.agendaUrl && profesional.agendaUrl.includes("clinios.cl") ? "#agendar" : `https://wa.me/56982028473?text=${encodeURIComponent(waText)}`}
                                className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-ink transition-colors duration-300"
                                aria-label={`Agendar con ${nombre}`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Agendar mi hora
                            </a>
                            <a
                                href={`https://wa.me/56982028473?text=${encodeURIComponent(waText)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-[#128C7E] transition-colors"
                                aria-label={`Escribir por WhatsApp para agendar con ${nombre}`}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Señales de confianza */}
                    <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5 mt-8 text-xs text-cream/70">
                        <li className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <strong className="font-semibold text-white">4.9</strong> · +284 reseñas
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Autorización SEREMI de Salud
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Tecnología certificada FDA
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Hasta 12 cuotas
                        </li>
                    </ul>
                </div>
            </header>

            {/* Profile */}
            <div className="py-10 flex-grow">
                <ProfesionalProfile profesional={profesional} />
            </div>

            <Footer />
        </div>
    );
}
