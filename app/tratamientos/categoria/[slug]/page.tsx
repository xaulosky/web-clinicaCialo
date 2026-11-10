import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import TreatmentCard from "../../../components/TreatmentCard";
import {
    categoriasData,
    getCategoriaBySlug,
    getTratamientosByCategoria,
    getSubcategoriasByCategoria,
} from "@/data/categorias";

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Generar páginas estáticas para cada categoría
export async function generateStaticParams() {
    return categoriasData.map((categoria) => ({
        slug: categoria.slug,
    }));
}

// Generar metadata SEO dinámica
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const categoria = getCategoriaBySlug(slug);

    if (!categoria) {
        return {
            title: "Categoría no encontrada | Clínica Cialo",
        };
    }

    const tratamientos = getTratamientosByCategoria(categoria.nombre);

    return {
        title: `${categoria.titulo} en Los Ángeles, Chile | Clínica Cialo`,
        description: categoria.metaDescription,
        keywords: categoria.keywords,
        openGraph: {
            title: `${categoria.titulo} | Clínica Cialo - Medicina Estética`,
            description: categoria.metaDescription,
            type: "website",
            locale: "es_CL",
            siteName: "Clínica Cialo",
            images: [
                {
                    url: categoria.imagen,
                    width: 1200,
                    height: 630,
                    alt: `${categoria.titulo} - Clínica Cialo`,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `${categoria.titulo} | Clínica Cialo`,
            description: categoria.metaDescription,
            images: [categoria.imagen],
        },
        alternates: {
            canonical: `https://cialo.cl/tratamientos/categoria/${slug}/`,
        },
        other: {
            "og:price:amount": tratamientos.length > 0 && tratamientos[0].valorDesde
                ? tratamientos[0].valorDesde.toString()
                : "",
            "og:price:currency": "CLP",
        },
    };
}

// JSON-LD Schema para SEO
function generateJsonLd(categoria: NonNullable<ReturnType<typeof getCategoriaBySlug>>, tratamientos: ReturnType<typeof getTratamientosByCategoria>) {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "MedicalBusiness",
                "@id": "https://cialo.cl/#organization",
                name: "Clínica Cialo",
                description: "Clínica de medicina estética en Los Ángeles, Chile",
                url: "https://cialo.cl",
                telephone: "+56982028473",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Bulnes 220, Of. 509, Edificio Puerto Mayor II",
                    addressLocality: "Los Ángeles",
                    addressRegion: "Biobío",
                    addressCountry: "CL",
                },
                geo: {
                    "@type": "GeoCoordinates",
                    latitude: -37.4695,
                    longitude: -72.3535,
                },
                openingHoursSpecification: {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    opens: "08:00",
                    closes: "20:00",
                },
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "284",
                    bestRating: "5",
                    worstRating: "1",
                },
            },
            {
                "@type": "CollectionPage",
                "@id": `https://cialo.cl/tratamientos/categoria/${categoria.slug}`,
                name: categoria.titulo,
                description: categoria.descripcion,
                url: `https://cialo.cl/tratamientos/categoria/${categoria.slug}`,
                isPartOf: {
                    "@id": "https://cialo.cl/#website",
                },
                breadcrumb: {
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Inicio",
                            item: "https://cialo.cl",
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Tratamientos",
                            item: "https://cialo.cl/tratamientos",
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: categoria.titulo,
                            item: `https://cialo.cl/tratamientos/categoria/${categoria.slug}`,
                        },
                    ],
                },
            },
            {
                "@type": "ItemList",
                name: `${categoria.titulo} disponibles en Clínica Cialo`,
                numberOfItems: tratamientos.length,
                itemListElement: tratamientos.slice(0, 10).map((t, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                        "@type": "MedicalProcedure",
                        name: t.nombre,
                        description: t.descripcion,
                        url: `https://cialo.cl/tratamientos/${t.id}`,
                        ...(t.valorDesde
                            ? {
                                  offers: {
                                      "@type": "Offer",
                                      priceCurrency: "CLP",
                                      price: t.valorDesde.toString(),
                                      availability: "https://schema.org/InStock",
                                      url: `https://cialo.cl/tratamientos/${t.id}/`,
                                  },
                              }
                            : {}),
                    },
                })),
            },
        ],
    };
}

export default async function CategoriaPage({ params }: PageProps) {
    const { slug } = await params;
    const categoria = getCategoriaBySlug(slug);

    if (!categoria) {
        notFound();
    }

    const tratamientos = getTratamientosByCategoria(categoria.nombre);
    const subcategorias = getSubcategoriasByCategoria(categoria.nombre);
    const jsonLd = generateJsonLd(categoria, tratamientos);

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="flex flex-col min-h-screen bg-cream">
                <Navbar transparent />

                {/* Hero Section */}
                <header className="relative bg-ink text-white pt-32 pb-24 overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={categoria.imagen}
                            alt={categoria.titulo}
                            fill
                            className="object-cover opacity-30"
                            priority
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/70" />
                        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8">
                        <div className="max-w-3xl">
                            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45 font-medium">
                                <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
                                <span aria-hidden="true" className="text-white/25">/</span>
                                <Link href="/tratamientos" className="hover:text-gold transition-colors">Tratamientos</Link>
                                <span aria-hidden="true" className="text-white/25">/</span>
                                <span className="text-gold" aria-current="page">{categoria.titulo}</span>
                            </nav>
                            <span className="inline-flex items-center gap-3 text-gold uppercase tracking-[0.25em] text-xs font-semibold mb-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={categoria.iconPath} />
                                </svg>
                                {tratamientos.length} tratamientos disponibles
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] mb-6 leading-tight">
                                {categoria.titulo}
                            </h1>
                            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed mb-8">
                                {categoria.descripcion}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/agendar"
                                    className="inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-ink transition-all duration-300 shadow-lg"
                                >
                                    Agendar mi evaluación
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                                <a
                                    href="https://wa.me/56982028473"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-ink transition-all duration-300"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Consultar WhatsApp
                                </a>
                            </div>

                            {/* Señales de confianza cerca del CTA */}
                            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/70">
                                <li className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.539 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.343 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" /></svg>
                                    <span><strong className="text-white font-semibold">4.9</strong>/284 reseñas</span>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                    <span>Autorización SEREMI de Salud</span>
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                    <span>Financiamiento hasta 12 cuotas</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>

                {/* Subcategorías */}
                {subcategorias.length > 1 && (
                    <section className="bg-white border-b border-sand py-6">
                        <div className="max-w-7xl mx-auto px-5 lg:px-8">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-sm text-olive font-medium">Subcategorías:</span>
                                {subcategorias.map((sub) => (
                                    <span
                                        key={sub}
                                        className="inline-block px-4 py-1.5 bg-cream text-ink text-sm rounded-full border border-sand hover:border-gold hover:bg-gold/10 transition-colors cursor-default"
                                    >
                                        {sub}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Tratamientos Grid */}
                <main className="flex-grow py-12">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-ink">
                                Todos los {categoria.titulo}
                            </h2>
                            <span className="text-sm text-olive">
                                {tratamientos.length} {tratamientos.length === 1 ? "tratamiento" : "tratamientos"}
                            </span>
                        </div>

                        {tratamientos.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                                {tratamientos.map((treatment, i) => (
                                    <TreatmentCard key={treatment.id} treatment={treatment} priority={i < 3} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-olive">No hay tratamientos disponibles en esta categoría.</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* CTA Section */}
                <section className="bg-ink text-white py-20">
                    <div className="max-w-4xl mx-auto px-5 text-center">
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                            ¿Necesitas más información?
                        </span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] mb-6">
                            Agenda tu evaluación personalizada
                        </h2>
                        <p className="text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Nuestro equipo de especialistas evaluará tu caso y te recomendará el tratamiento más adecuado para ti.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/agendar"
                                className="inline-flex items-center justify-center gap-2 bg-gold text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-ink transition-colors"
                            >
                                Agendar mi evaluación
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/tratamientos"
                                className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-ink transition-colors"
                            >
                                Ver todos los tratamientos
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Otras Categorías */}
                <section className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-5 lg:px-8">
                        <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-ink text-center mb-10">
                            Explora otras categorías
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {categoriasData
                                .filter((c) => c.slug !== slug)
                                .map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        href={`/tratamientos/categoria/${cat.slug}`}
                                        className="group flex flex-col items-center p-4 rounded-2xl border border-ink/10 hover:border-gold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-2 group-hover:bg-gold transition-colors">
                                            <svg className="w-6 h-6 text-gold group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d={cat.iconPath} />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-ink group-hover:text-gold transition-colors text-center">
                                            {cat.nombre}
                                        </span>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
