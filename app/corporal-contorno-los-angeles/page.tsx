import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Contorno Corporal en Los Ángeles | Clínica Cialo" },
    description: "Tratamientos corporales en Los Ángeles, Chile. Criolipólisis Clatuu, Scizer HIFU, Exilis Ultra 360, EmBody, Morpheus8 Body, depilación láser Soprano Titanium. Grasa localizada, flacidez, celulitis.",
    keywords: "tratamientos corporales Los Ángeles, criolipólisis Chile, Clatuu Alpha, reducción grasa, flacidez corporal, celulitis tratamiento, Morpheus8 Body, depilación láser Soprano, EmBody",
    openGraph: {
        title: "Tratamientos Corporales y Contorno | Clínica Cialo Los Ángeles",
        description: "Diseñamos protocolos a medida para grasa localizada, flacidez, celulitis, estrías, depilación láser y definición muscular con tecnologías líderes.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/corporal-contorno-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/corporal-contorno-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Tratamientos Corporales y Contorno",
    description: "Protocolos para grasa localizada, flacidez, celulitis, estrías, depilación láser y definición muscular",
    procedureType: "Cosmetic",
    bodyLocation: "Body",
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

const quePodemosTratar = [
    { icon: "🎯", titulo: "Grasa localizada", desc: "Abdomen, flancos, espalda, brazos, muslos internos/externos, rodillas, submentón." },
    { icon: "✨", titulo: "Flacidez cutánea", desc: "Abdomen postparto, brazos, cara interna de muslos, glúteos." },
    { icon: "🍊", titulo: "Celulitis o Piel de Naranja", desc: "Muslos, glúteos y abdomen." },
    { icon: "💪", titulo: "Definición y tono muscular", desc: "Abdomen, glúteos." },
    { icon: "🌟", titulo: "Estrías y cicatrices", desc: "Estrías, cicatrices de acné/quirúrgicas en zonas corporales seleccionadas." },
    { icon: "✂️", titulo: "Depilación Láser", desc: "Con la tecnología más avanzada del mercado Soprano Titanium." },
];

const programas = [
    { titulo: "Reducción de grasa localizada", tech: "Criolipólisis Clatuu Alpha, Scizer (HIFU), Exilis Ultra 360" },
    { titulo: "Firmeza y calidad de piel", tech: "Morpheus8 Body y Exilis Ultra 360" },
    { titulo: "Celulitis y tejido conectivo", tech: "Exilis Ultra 360 y Morpheus8" },
    { titulo: "Definición muscular", tech: "EmBody + pauta nutricional" },
    { titulo: "Textura, cicatrices y estrías", tech: "CO₂ TetraPro, Láser CO₂RE, Resurfx y Morpheus8 Body" },
];

const tecnologias = [
    {
        nombre: "Clatuu Alpha",
        subtitulo: "La Criolipólisis más Avanzada del Mundo",
        indicaciones: "Grasa localizada en abdomen, flancos, espalda, brazos, muslos, submentón.",
        beneficios: "Apoptosis adipocitaria controlada sin cirugía.",
        sesiones: "1–3 zonas por sesión; molestia transitoria, sin reposo.",
        color: "from-blue-500 to-cyan-500"
    },
    {
        nombre: "Scizer HIFU",
        subtitulo: "Lipolítico Focalizado",
        indicaciones: "Grasa localizada en abdomen, flancos, espalda, brazos, muslos, submentón.",
        beneficios: "Destrucción de adipocitos mediante ultrasonido focalizado de alta intensidad.",
        sesiones: "1–3 zonas por sesión; molestia transitoria, sin reposo.",
        color: "from-purple-500 to-pink-500"
    },
    {
        nombre: "Exilis Ultra 360",
        subtitulo: "Radiofrecuencia + Ultrasonido",
        indicaciones: "Flacidez facial y corporal leve-moderada, celulitis, mejora de calidad de piel.",
        beneficios: "Colagenogénesis y tensado cutáneo progresivo.",
        sesiones: "4–6 sesiones; sin reposo.",
        color: "from-amber-500 to-orange-500"
    },
    {
        nombre: "EmBody",
        subtitulo: "Estimulación Muscular de Alta Intensidad",
        indicaciones: "Definición de abdomen y glúteos (hipertrofia e hiperplasia muscular).",
        beneficios: "Contracciones supramáximas. Más de 20.000 contracciones por sesión.",
        sesiones: "4–8 sesiones; sin reposo.",
        color: "from-green-500 to-emerald-500"
    },
    {
        nombre: "Morpheus8 Body",
        subtitulo: "RF Fraccionada más Prestigiosa del Mercado",
        indicaciones: "Flacidez, irregularidades de textura, estrías y cicatrices.",
        beneficios: "Remodela colágeno en profundidad. Única capaz de trabajar en tejido subdérmico.",
        sesiones: "1–3+ sesiones; eritema/edema leve 1–3 días.",
        color: "from-rose-500 to-red-500"
    },
    {
        nombre: "CO₂ TetraPro",
        subtitulo: "Mejor Plataforma Láser 2024",
        indicaciones: "Estrías recientes/blancas, cicatrices corporales.",
        beneficios: "Renovación dérmica y estímulo de colágeno.",
        sesiones: "1–3+ sesiones; 3–7 días según intensidad.",
        color: "from-indigo-500 to-violet-500"
    },
    {
        nombre: "Soprano Titanium",
        subtitulo: "La Mejor Depilación Láser",
        indicaciones: "Vello no deseado en cuerpo y rostro, pieles claras u oscuras.",
        beneficios: "Depilación progresiva, segura e indolora con enfriamiento avanzado.",
        sesiones: "6–10 sesiones en promedio; sin tiempo de recuperación.",
        color: "from-teal-500 to-cyan-500"
    },
];

export default function CorporalConornoPage() {
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

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-[#b8935f]/20 text-[#b8935f] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                                    📍 Los Ángeles, Biobío
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Tratamientos <span className="text-[#b8935f]">Corporales</span> y Contorno
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-6 leading-relaxed">
                                    Diseñamos protocolos a medida para <strong className="text-white">grasa localizada, flacidez, celulitis, estrías, depilación láser</strong> y definición muscular con tecnologías líderes aprobadas por la FDA.
                                </p>
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20una%20evaluación%20corporal"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Reservar Evaluación
                                </a>
                            </div>
                            <div className="relative hidden lg:block">
                                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000"
                                        alt="Tratamientos corporales en Los Ángeles"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ¿Qué podemos tratar? */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Áreas de Tratamiento
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Qué Podemos Tratar a Nivel Corporal?
                            </h2>
                            <p className="text-[#6f6a5c] max-w-3xl mx-auto">
                                Diseñamos planes corporales a medida que combinan tecnología y hábitos para transformar tu figura de forma segura y progresiva.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {quePodemosTratar.map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-sm border border-gray-100 hover:shadow-lg hover:border-[#b8935f]/30 transition-all group">
                                    <span className="text-3xl mb-4 block">{item.icon}</span>
                                    <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2 group-hover:text-[#b8935f] transition-colors">{item.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c] mb-4">{item.desc}</p>
                                    <a
                                        href="https://wa.me/56982028473"
                                        className="text-sm text-[#b8935f] font-semibold hover:underline"
                                    >
                                        Reservar evaluación →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Programas por Objetivo */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Rutas Terapéuticas
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Programas por Objetivo
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                Según tu diagnóstico y biotipo definimos la secuencia ideal, combinando tecnologías para maximizar eficacia con el menor downtime posible.
                            </p>
                        </div>

                        <div className="space-y-4 max-w-4xl mx-auto">
                            {programas.map((prog, i) => (
                                <div key={i} className="flex items-start gap-4 bg-[#faf6ef] p-6 rounded-sm hover:shadow-md transition-all">
                                    <div className="w-10 h-10 bg-[#b8935f] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1b1a18] mb-1">{prog.titulo}</h3>
                                        <p className="text-sm text-[#6f6a5c]">{prog.tech}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tecnologías */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Equipamiento Premium
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-4">
                                Nuestras Tecnologías
                            </h2>
                            <p className="text-[#cbcfd1] max-w-2xl mx-auto">
                                Equipos de clase mundial, aprobados por la FDA y respaldados por estudios clínicos.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tecnologias.map((tech, i) => (
                                <div key={i} className="bg-[#2a2a2a] rounded-sm overflow-hidden hover:shadow-2xl transition-all group">
                                    <div className={`h-2 bg-gradient-to-r ${tech.color}`}></div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white mb-1 group-hover:text-[#b8935f] transition-colors">
                                            {tech.nombre}
                                        </h3>
                                        <p className="text-xs text-[#b8935f] uppercase tracking-wider mb-4">{tech.subtitulo}</p>

                                        <div className="space-y-3 text-sm">
                                            <div>
                                                <span className="text-[#888] block text-xs uppercase">Indicaciones</span>
                                                <p className="text-[#cbcfd1]">{tech.indicaciones}</p>
                                            </div>
                                            <div>
                                                <span className="text-[#888] block text-xs uppercase">Beneficios</span>
                                                <p className="text-[#cbcfd1]">{tech.beneficios}</p>
                                            </div>
                                            <div>
                                                <span className="text-[#888] block text-xs uppercase">Sesiones</span>
                                                <p className="text-[#cbcfd1]">{tech.sesiones}</p>
                                            </div>
                                        </div>

                                        <a
                                            href="https://wa.me/56982028473"
                                            className="inline-flex items-center gap-2 mt-6 text-sm text-[#b8935f] font-semibold hover:text-white transition-colors"
                                        >
                                            Agendar evaluación
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Equipo Profesional */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Profesionales Certificados
                        </span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Equipo Profesional
                        </h2>
                        <p className="text-[#6f6a5c] text-lg leading-relaxed">
                            Contamos con un equipo interdisciplinario certificado en tecnologías corporales, con formación continua en criolipólisis, HIFU lipolítico, radiofrecuencia, ultrasonido, RF fraccionada y estimulación muscular. Seleccionamos parámetros por biotipo y objetivos, priorizando seguridad, comodidad y resultados naturales.
                        </p>
                        <Link
                            href="/profesionales"
                            className="inline-flex items-center gap-2 mt-8 text-[#b8935f] font-semibold hover:text-[#1b1a18] transition-colors"
                        >
                            Conoce a nuestro equipo
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-[#b8935f] to-[#c4b190]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Reserva tu Evaluación Corporal
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            En Clínica Cialo te acompañamos con un plan corporal a tu medida. Agenda tu evaluación y comencemos tu proceso de transformación con tecnología de clase mundial.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20corporal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Evaluación
                            </a>
                            <Link
                                href="/tratamientos/categoria/corporal"
                                className="inline-flex items-center justify-center gap-2 border-2 border-[#1b1a18] text-[#1b1a18] px-10 py-5 font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-colors"
                            >
                                Ver Tratamientos
                            </Link>
                        </div>
                        <p className="mt-8 text-[#1b1a18]/60 text-sm">
                            📍 Bulnes 220, Of. 509 — Edificio Puerto Mayor II, Los Ángeles, Biobío
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
