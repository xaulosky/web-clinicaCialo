import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Tratamiento Cicatrices de Acné Los Ángeles | Clínica Cialo" },
    description: "Tratamiento especializado para cicatrices de acné en Los Ángeles. Tecnología láser, bioestimulación y peelings médicos. Mejora la textura de tu piel. Dr. Nicolás Laucirica / Dra. Elga Viviana Peña.",
    keywords: "cicatrices acné Los Ángeles, tratamiento hoyos cara, eliminar marcas acné, láser cicatrices Los Ángeles, rejuvenecimiento facial",
    openGraph: {
        title: "Tratamiento Cicatrices de Acné | Elimina Hoyos | Clínica Cialo",
        description: "Tecnología láser, bioestimulación y peelings médicos para mejorar la textura de tu piel.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/cicatrices-acne-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/cicatrices-acne-los-angeles",
    },
};

const faqs = [
    {
        pregunta: "¿Qué tipos de cicatrices se pueden tratar?",
        respuesta: "Tratamos cicatrices en hundimiento (atróficas), elevadas (hipertróficas), de caja, onduladas y marcas post-inflamatorias. Cada tipo requiere un protocolo específico."
    },
    {
        pregunta: "¿Cuántas sesiones se necesitan?",
        respuesta: "Depende de la severidad. Generalmente 4-6 sesiones espaciadas cada 4-6 semanas para resultados significativos. Cicatrices severas pueden requerir más sesiones."
    },
    {
        pregunta: "¿Hay tiempo de recuperación?",
        respuesta: "Depende del tratamiento. Láser puede tener 2-5 días de enrojecimiento leve. Bioestimulación y peelings tienen recuperación inmediata o 24-48 horas."
    },
    {
        pregunta: "¿Los resultados son permanentes?",
        respuesta: "Las mejoras en las cicatrices son permanentes. Sin embargo, el envejecimiento natural continúa, por lo que se recomienda mantenimiento periódico."
    },
    {
        pregunta: "¿Puedo tratarme si aún tengo acné activo?",
        respuesta: "Idealmente el acné debe estar controlado antes de tratar cicatrices. Sin embargo, podemos trabajar en áreas específicas mientras controlamos el acné activo."
    },
    {
        pregunta: "¿Qué tecnologías utilizan?",
        respuesta: "Combinamos láser CO2 fraccionado, bioestimuladores (Sculptra, Radiesse), PRP, peelings médicos y microneedling según el tipo de cicatriz."
    }
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Tratamiento Cicatrices de Acné Los Ángeles', item: 'https://cialo.cl/cicatrices-acne-los-angeles' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.pregunta,
                acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
            })),
        },
        {
            "@type": "MedicalProcedure",
            name: "Tratamiento para Cicatrices de Acné",
            alternateName: ["Eliminación de Hoyos", "Tratamiento Marcas Acné"],
            description: "Tratamiento médico que mejora la textura de la piel, reduce hoyos y marcas con tecnología láser, bioestimulación y peelings médicos.",
            procedureType: "Cosmetic",
            bodyLocation: "Rostro, Mejillas, Frente, Barbilla",
            howPerformed: "Combinación de láser resurfacing, bioestimulación con inductores de colágeno y peelings médicos según tipo de cicatriz.",
            preparation: "Evaluación dermatológica previa. Suspender retinoides 1 semana antes.",
            followup: "Sesiones cada 4-6 semanas. Mantenimiento cada 3 meses.",
            status: "Available",
            provider: {
                "@type": "MedicalClinic",
                name: "Clínica Cialo",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Bulnes 220, Oficina 509",
                    addressLocality: "Los Ángeles",
                    addressRegion: "Biobío",
                    addressCountry: "CL"
                },
                telephone: "+56 9 8202 8473"
            }
        }
    ]
};

const beneficios = [
    {
        titulo: "Reduce Hoyos",
        descripcion: "Disminuye la profundidad de cicatrices hundidas y poros dilatados.",
        icono: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
        titulo: "Mejora Textura",
        descripcion: "Piel más suave, uniforme y con mejor calidad superficial.",
        icono: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    },
    {
        titulo: "Estimula Colágeno",
        descripcion: "Induce la producción natural de colágeno para relleno desde adentro.",
        icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
        titulo: "Resultados Duraderos",
        descripcion: "Mejoras progresivas que se mantienen en el tiempo con mantenimiento.",
        icono: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    }
];

const queTratamos = [
    { problema: "Cicatrices hundidas", descripcion: "Marcas deprimidas en la piel por acné severo" },
    { problema: "Cicatrices elevadas", descripcion: "Tejido fibroso que sobresale de la superficie" },
    { problema: "Poros dilatados", descripcion: "Poros agrandados como secuela del acné" },
    { problema: "Marcas post-acné", descripcion: "Manchas oscuras que quedan después de lesiones" }
];

const proceso = [
    { paso: "1", titulo: "Evaluación", descripcion: "Análisis del tipo y profundidad de cicatrices para determinar el mejor protocolo." },
    { paso: "2", titulo: "Protocolo", descripcion: "Combinación personalizada de láser, bioestimulación o peelings según tu caso." },
    { paso: "3", titulo: "Tratamiento", descripcion: "Aplicación de sesiones médicas para regenerar la piel y suavizar cicatrices." },
    { paso: "4", titulo: "Mantenimiento", descripcion: "Controles periódicos y sesiones de mantenimiento para resultados duraderos." }
];


export default function CicatricesAcnePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar transparent />

            <main className="bg-white relative overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] pt-28 pb-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Cicatrices de Acné</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-pink-500/20 text-pink-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                    Dermatología
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Tratamiento Cicatrices de <span className="text-[#b8935f]">Acné</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Mejora la textura de tu piel</strong> con tecnología láser, bioestimulación y peelings médicos.
                                    Reduce hoyos y marcas de forma efectiva.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Reduce hoyos &nbsp; ✓ Mejora textura &nbsp; ✓ Resultados duraderos
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Duración sesión</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">45-60 minutos</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Agendar Evaluación
                                    </a>
                                    <Link
                                        href="/profesionales/nicolas-laucirica"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Especialista
                                    </Link>
                                </div>
                            </div>

                            {/* Qué Tratamos */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué Tratamos?</h2>
                                <div className="space-y-4">
                                    {queTratamos.map((q, i) => (
                                        <div key={i} className="bg-[#1b1a18] p-4 rounded-lg">
                                            <h4 className="text-white font-medium">{q.problema}</h4>
                                            <p className="text-sm text-[#cbcfd1]">{q.descripcion}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Proceso */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">El Tratamiento</span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Cómo Funciona?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {proceso.map((p, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1b1a18] font-bold text-xl">{p.paso}</div>
                                    <h3 className="font-semibold text-[#1b1a18] mb-2">{p.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{p.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Beneficios del Tratamiento
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {beneficios.map((b, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                                    <div className="w-14 h-14 bg-[#b8935f] rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-7 h-7 text-[#1b1a18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={b.icono} />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1b1a18] mb-2">{b.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{b.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Especialista */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-pink-50 rounded-lg p-8 flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Tu Especialista</h2>
                                <h3 className="font-semibold text-[#1b1a18] text-lg mb-2">Dr. Nicolás Laucirica / Dra. Elga Viviana Peña</h3>
                                <p className="text-[#6f6a5c] mb-4">
                                    Especialistas en medicina estética y regeneración cutánea. Expertos en tratamiento 
                                    de cicatrices con tecnología láser y bioestimulación para resultados naturales.
                                </p>
                                <Link
                                    href="/profesionales/nicolas-laucirica"
                                    className="text-[#b8935f] font-medium hover:underline"
                                >
                                    Ver perfil completo →
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">FAQ</span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Preguntas Frecuentes</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-white rounded-sm overflow-hidden shadow-sm">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                                        <h3 className="font-semibold text-[#1b1a18] pr-4">{faq.pregunta}</h3>
                                        <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-6 pb-6">
                                        <p className="text-[#6f6a5c]">{faq.respuesta}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-[#b8935f] to-[#c4b190]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Mejora la Textura de tu Piel
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación dermatológica y descubre el mejor tratamiento para tus cicatrices de acné.
                        </p>
                        <a
                            href="https://reservas.clinios.cl/cialo/reservar/nicolas-laucirica"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Evaluación
                        </a>
                        <p className="mt-8 text-[#1b1a18]/60 text-sm">
                            📍 Bulnes 220, Of. 509 — Los Ángeles, Biobío • +56 9 8202 8473
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
