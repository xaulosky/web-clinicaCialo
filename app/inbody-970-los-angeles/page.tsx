import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Examen InBody 970 en Los Ángeles | Clínica Cialo" },
    description: "Análisis de composición corporal con InBody 970 en Los Ángeles, Chile. Mide grasa, músculo, agua corporal y metabolismo basal con precisión médica. Agenda tu evaluación.",
    keywords: "InBody 970 Los Ángeles, análisis composición corporal Chile, examen grasa corporal, medición masa muscular, bioimpedancia, evaluación nutricional",
    openGraph: {
        title: "Examen InBody 970 en Los Ángeles | Clínica Cialo",
        description: "Análisis de composición corporal profesional con tecnología InBody 970. Conoce tu porcentaje de grasa, masa muscular y agua corporal.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/inbody-970-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/inbody-970-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTest",
    name: "Examen InBody 970",
    description: "Análisis de composición corporal mediante bioimpedancia de grado médico",
    usesDevice: {
        "@type": "MedicalDevice",
        name: "InBody 970",
        manufacturer: "InBody Co., Ltd."
    },
    provider: {
        "@type": "MedicalBusiness",
        name: "Clínica Cialo",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Bulnes 220, Of. 509",
            addressLocality: "Los Ángeles",
            addressRegion: "Biobío",
            addressCountry: "CL",
        },
        telephone: "+56982028473",
    },
};

const queSeAnaliza = [
    { nombre: "Masa Grasa", desc: "Cantidad total y porcentaje de grasa corporal", icon: "📊" },
    { nombre: "Masa Muscular Esquelética", desc: "Músculo en brazos, piernas y tronco", icon: "💪" },
    { nombre: "Agua Corporal Total", desc: "Hidratación intra y extracelular", icon: "💧" },
    { nombre: "Grasa Visceral", desc: "Grasa alrededor de órganos internos", icon: "🎯" },
    { nombre: "Metabolismo Basal", desc: "Calorías que quema tu cuerpo en reposo", icon: "🔥" },
    { nombre: "Análisis Segmental", desc: "Composición por cada zona del cuerpo", icon: "🧬" },
];

const beneficios = [
    "Precisión de grado médico (±2% de error)",
    "Resultados en menos de 60 segundos",
    "Sin dolor, no invasivo, sin preparación",
    "Seguimiento de progreso con historial",
    "Ideal para dietas, fitness y control de salud",
    "Reporte impreso inmediato con gráficos",
];

const paraQuienEs = [
    { titulo: "Deportistas", desc: "Optimiza tu composición corporal para mejor rendimiento" },
    { titulo: "Personas en dieta", desc: "Verifica que pierdes grasa, no músculo" },
    { titulo: "Control de peso", desc: "Monitorea tu progreso de forma objetiva" },
    { titulo: "Salud general", desc: "Detecta riesgos metabólicos y de hidratación" },
];

export default function InBody970Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar transparent />

            <main className="bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] pt-28 pb-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block bg-[#b8935f]/20 text-[#b8935f] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                            📍 Los Ángeles, Biobío
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                            Examen <span className="text-[#b8935f]">InBody 970</span>
                        </h1>
                        <p className="text-xl text-[#cbcfd1] mb-4 max-w-3xl mx-auto leading-relaxed">
                            Análisis de composición corporal de <strong className="text-white">grado médico</strong>.
                            Conoce tu porcentaje de grasa, masa muscular, agua corporal y metabolismo basal con la mayor precisión disponible.
                        </p>
                        <p className="text-[#b8935f] text-lg mb-8">
                            Resultados en 60 segundos • Sin dolor • Reporte inmediato
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20agendar%20un%20examen%20InBody%20970"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Examen
                        </a>
                    </div>
                </section>

                {/* Qué se analiza */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Análisis Completo
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Qué Mide el InBody 970?
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                El InBody 970 es el equipo de bioimpedancia más avanzado del mercado, utilizado en hospitales y centros de alto rendimiento.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {queSeAnaliza.map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-sm shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                                    <span className="text-3xl mb-4 block">{item.icon}</span>
                                    <h3 className="font-semibold text-[#1b1a18] mb-2">{item.nombre}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* YouTube Shorts */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Videos
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Mira el InBody 970 en Acción
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                Conoce cómo funciona el examen y qué puedes esperar durante tu evaluación.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                            {/* Video 1 */}
                            <div className="w-full max-w-[320px]">
                                <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        src="https://www.youtube.com/embed/bt8ydr64YO8"
                                        title="InBody 970 - Video 1"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Video 2 */}
                            <div className="w-full max-w-[320px]">
                                <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        src="https://www.youtube.com/embed/CFiRMnzVXy4"
                                        title="InBody 970 - Video 2"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Ventajas
                                </span>
                                <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    ¿Por Qué Elegir InBody 970?
                                </h2>
                                <p className="text-[#6f6a5c] mb-8 leading-relaxed">
                                    A diferencia de básculas convencionales o mediciones con cinta métrica, el InBody 970 ofrece datos precisos y científicamente validados de tu composición corporal real.
                                </p>
                                <ul className="space-y-3">
                                    {beneficios.map((b, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[#6f6a5c]">
                                            <span className="text-[#b8935f]">✓</span>
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-[#1b1a18] p-10 rounded-sm">
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">
                                    Incluye tu Reporte
                                </h3>
                                <ul className="space-y-4 text-[#cbcfd1]">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#b8935f] mt-1">📄</span>
                                        <span>Hoja de resultados impresa con todos tus valores</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#b8935f] mt-1">📊</span>
                                        <span>Gráficos comparativos vs. rangos saludables</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#b8935f] mt-1">📈</span>
                                        <span>Historial de seguimiento en controles futuros</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#b8935f] mt-1">💡</span>
                                        <span>Explicación personalizada de tus resultados</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Para quién es */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Indicaciones
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                ¿Para Quién es Este Examen?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {paraQuienEs.map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                                    <h3 className="font-semibold text-[#1b1a18] mb-2 text-lg">{item.titulo}</h3>
                                    <p className="text-[#6f6a5c]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-[#b8935f] to-[#c4b190]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Agenda tu Examen InBody 970
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Conoce tu cuerpo con precisión científica. El primer paso para una transformación real es medir donde estás hoy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20un%20examen%20InBody%20970"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Examen
                            </a>
                            <Link
                                href="/tratamientos?categoria=Nutricion"
                                className="inline-flex items-center justify-center gap-2 border-2 border-[#1b1a18] text-[#1b1a18] px-10 py-5 font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-colors"
                            >
                                Ver Servicios de Nutrición
                            </Link>
                        </div>
                        <p className="mt-8 text-[#1b1a18]/60 text-sm">
                            📍 Bulnes 220, Of. 509 — Edificio Puerto Mayor II, Los Ángeles, Biobío • +56 9 8202 8473
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
