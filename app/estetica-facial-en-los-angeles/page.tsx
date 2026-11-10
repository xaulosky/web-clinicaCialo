import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Estética Facial en Los Ángeles | Clínica Cialo" },
    description: "Tratamientos de estética facial en Los Ángeles, Chile. Toxina botulínica, ácido hialurónico, Sculptra, láser CO2, armonización facial. Dr. Nicolás Laucirica y Dra. Mariane Kiss.",
    keywords: "estética facial Los Ángeles, armonización facial Chile, botox, ácido hialurónico, rinomodelación, labios, Sculptra, Radiesse, Morpheus8, láser facial",
    openGraph: {
        title: "Estética Facial en Los Ángeles | Clínica Cialo",
        description: "Combinamos equipamiento de última generación, protocolos seguros y un enfoque estético minimalista para realzar tu rostro sin perder tu expresión.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/estetica-facial-en-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/estetica-facial-en-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Estética Facial",
    description: "Tratamientos de estética facial: toxina botulínica, ácido hialurónico, bioestimuladores, láser y armonización facial",
    procedureType: "Cosmetic",
    bodyLocation: "Face",
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

const porQueElegirnos = [
    "Planes 100% personalizados: adaptados a tu morfología facial, necesidades y objetivos.",
    "Múltiples tecnologías a nuestro alcance: láser CO₂, IPL, láser Q-Switched, Morpheus8, Exilis Ultra 360, Ultraformer III, y más.",
    "Análisis facial con inteligencia artificial: para un diagnóstico preciso y objetivos medibles.",
    "Asesoría en rutina cosmética: seleccionamos los productos adecuados para tu piel y estilo de vida.",
    "Resultados armónicos y naturales: sin excesos ni aspecto artificial.",
    "Seguimiento personalizado: evaluación inicial y controles para garantizar la evolución de cada tratamiento.",
];

const tratamientosFaciales = [
    { nombre: "Toxina Botulínica Tercio Superior", desc: "Maneja tus arrugas y líneas de expresión" },
    { nombre: "Toxina Botulínica Bruxismo", desc: "Relaja maseteros, reduce tensión y suaviza el ángulo mandibular" },
    { nombre: "Toxina Botulínica Sonrisa Gingival", desc: "Modula la elevación labial para una sonrisa más armónica" },
    { nombre: "Rinomodelación", desc: "Mejora tu perfil sin cirugía" },
    { nombre: "Labios con Ácido Hialurónico", desc: "Volumen, proyección, perfilado e hidratación" },
    { nombre: "Mentón con Ácido Hialurónico", desc: "Proyección y equilibrio del perfil" },
    { nombre: "Pómulos con Ácido Hialurónico", desc: "Soporte y efecto lifting del tercio medio" },
    { nombre: "Reposición del Tercio Medio", desc: "Armonización global sutil" },
    { nombre: "Ojeras / Surco Lagrimal", desc: "Mejora el hundimiento y el aspecto cansado" },
    { nombre: "Surco Nasogeniano", desc: "Suaviza surcos marcados" },
    { nombre: "Definición Mandibular", desc: "Contorno más definido" },
    { nombre: "Relleno Fosa Temporal", desc: "Relleno compensatorio de vaciamiento temporal" },
    { nombre: "Toxina Botulínica Full Face", desc: "Mejora el tercio superior e inferior del rostro" },
    { nombre: "Sculptra®", desc: "Mejora calidad y densidad dérmica a mediano plazo" },
    { nombre: "Radiesse®", desc: "Efecto tensor y biorrevitalización" },
    { nombre: "Ellansé®", desc: "Bioestímulo con duración extendida" },
    { nombre: "Armonización Facial", desc: "Mejora globalmente el aspecto de tu rostro" },
    { nombre: "ADN de Salmón", desc: "Mejora hidratación, luminosidad y firmeza de la piel" },
    { nombre: "Hilos Tensores y Revitalizantes", desc: "Reafirman la piel y estimula la producción de colágeno" },
    { nombre: "Exosomas", desc: "Regenera la piel, mejora textura e ilumina el rostro" },
];

const tratamientosLaser = [
    { nombre: "Melasma y Pigmentaciones", desc: "Protocolos especializados para manchas hormonales" },
    { nombre: "Cicatrices y Poros", desc: "Mejora cicatrices de acné y refina la textura de la piel" },
    { nombre: "Arrugas y Líneas Marcadas", desc: "Reducción de arrugas finas y profundas con alta precisión" },
    { nombre: "Flacidez y Redefinición", desc: "Tensado de piel y efecto lifting sin cirugía" },
    { nombre: "Blefaroplastía Láser", desc: "Rejuvenecimiento de párpados con resultados naturales" },
    { nombre: "Lesiones Benignas", desc: "Eliminación de acrocordones, verrugas y lesiones superficiales" },
    { nombre: "Cicatrices Traumáticas", desc: "Mejora de marcas por accidentes y quemaduras" },
    { nombre: "Borrado de Tatuajes", desc: "Eliminación progresiva y segura de tatuajes no deseados" },
    { nombre: "Borrado de Micropigmentación", desc: "Corrección de cejas y delineados con resultados precisos" },
    { nombre: "Estrías", desc: "Atenuación de estrías recientes y antiguas" },
    { nombre: "Acné Activo", desc: "Disminuye inflamación y mejora lesiones en fase activa" },
    { nombre: "Hollywood Peel", desc: "Piel más luminosa, uniforme y con efecto glow" },
    { nombre: "HydraFacial® MD", desc: "Limpieza profunda, extracción e hidratación con sueros activos" },
    { nombre: "Limpieza Facial Convencional", desc: "Limpieza profunda, extracción e hidratación" },
];

export default function EsteticaFacialPage() {
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
                            Estética <span className="text-[#b8935f]">Facial</span> en Los Ángeles
                        </h1>
                        <p className="text-xl text-[#cbcfd1] mb-8 max-w-3xl mx-auto leading-relaxed">
                            Combinamos equipamiento de última generación, protocolos seguros y un enfoque estético minimalista para realzar tu rostro sin perder tu expresión.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20una%20evaluación%20facial"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Evaluación
                        </a>
                    </div>
                </section>

                {/* Por qué elegirnos */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Nuestra Experiencia
                                </span>
                                <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    ¿Por Qué Elegir Clínica Cialo?
                                </h2>
                                <p className="text-[#6f6a5c] mb-6 leading-relaxed">
                                    En Cialo reunimos a los dos especialistas con mayor experiencia y trayectoria en medicina estética facial de la ciudad: <strong>Dr. Nicolás Laucirica</strong> y <strong>Dra. Mariane Kiss</strong>.
                                </p>
                                <p className="text-[#6f6a5c] mb-8 leading-relaxed">
                                    Ambos han perfeccionado su formación en reconocidas instituciones internacionales y suman más de <strong>100.000 tratamientos realizados</strong>, lo que los posiciona como referentes en el área.
                                </p>
                                <Link
                                    href="/profesionales"
                                    className="inline-flex items-center gap-2 text-[#b8935f] font-semibold hover:text-[#1b1a18] transition-colors"
                                >
                                    Conoce a nuestro equipo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {porQueElegirnos.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-sm border border-gray-100">
                                        <span className="text-[#b8935f] text-lg">✓</span>
                                        <p className="text-[#6f6a5c] text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tratamientos Faciales */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Inyectables & Bioestimuladores
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                Tratamientos Faciales
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {tratamientosFaciales.map((t, i) => (
                                <div key={i} className="bg-[#faf6ef] p-5 rounded-sm hover:shadow-lg hover:bg-white transition-all group border border-transparent hover:border-[#b8935f]/20">
                                    <h3 className="font-semibold text-[#1b1a18] mb-2 group-hover:text-[#b8935f] transition-colors text-sm">
                                        {t.nombre}
                                    </h3>
                                    <p className="text-xs text-[#6f6a5c] mb-3">{t.desc}</p>
                                    <a href="https://wa.me/56982028473" className="text-xs text-[#b8935f] font-semibold hover:underline">
                                        Agendar →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tratamientos Láser */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Tecnología Avanzada
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white">
                                Tratamientos Láser
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {tratamientosLaser.map((t, i) => (
                                <div key={i} className="bg-[#2a2a2a] p-5 rounded-sm hover:shadow-lg transition-all group border border-transparent hover:border-[#b8935f]/30">
                                    <h3 className="font-semibold text-white mb-2 group-hover:text-[#b8935f] transition-colors text-sm">
                                        {t.nombre}
                                    </h3>
                                    <p className="text-xs text-[#cbcfd1] mb-3">{t.desc}</p>
                                    <a href="https://wa.me/56982028473" className="text-xs text-[#b8935f] font-semibold hover:underline">
                                        Agendar →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Equipos */}
                <section className="py-16 bg-[#faf6ef]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Tecnología de Clase Mundial
                        </span>
                        <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Equipos y Plataformas
                        </h2>
                        <p className="text-[#6f6a5c] text-sm leading-relaxed mb-8">
                            <strong>M22 Lumenis</strong> (IPL, ResurFX, Nd:YAG) • <strong>Spectra XT</strong> • <strong>CO₂ TetraPro</strong> (CoolPeel) • <strong>Morpheus8</strong> • <strong>Ultraformer MPT</strong> (HIFU) • <strong>Exilis Ultra 360</strong> • <strong>HydraFacial MD</strong>
                        </p>
                        <p className="text-[#888] text-xs">
                            Apoyos de evaluación: análisis facial asistido por IA (EveLab) y registro fotográfico estandarizado para seguimiento objetivo.
                        </p>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-[#b8935f] to-[#c4b190]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Agendar Evaluación Facial
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            En Clínica Cialo te acompañamos con un plan facial a tu medida. Agenda tu evaluación y comencemos tu proceso de armonización con tecnología de clase mundial.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20facial"
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
                                href="/tratamientos/categoria/facial"
                                className="inline-flex items-center justify-center gap-2 border-2 border-[#1b1a18] text-[#1b1a18] px-10 py-5 font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-colors"
                            >
                                Ver Precios
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
