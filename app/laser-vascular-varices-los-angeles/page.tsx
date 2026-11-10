import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Láser Vascular para Várices Los Ángeles | Clínica Cialo" },
    description: "Tratamiento láser vascular único en Los Ángeles para eliminar várices y arañas vasculares sin cirugía. Tecnología avanzada, sin cicatrices ni tiempo de recuperación. Dra. Francisca González.",
    keywords: "láser vascular Los Ángeles, tratamiento várices Los Ángeles, eliminar várices sin cirugía, arañas vasculares tratamiento, láser para várices Biobío",
    openGraph: {
        title: "Láser Vascular para Várices | Único en Los Ángeles | Clínica Cialo",
        description: "Elimina várices y arañas vasculares sin cirugía. Tecnología láser única en la zona.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/laser-vascular-varices-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/laser-vascular-varices-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Láser Vascular para Várices Los Ángeles', item: 'https://cialo.cl/laser-vascular-varices-los-angeles' },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Láser Vascular para Várices",
            alternateName: ["Tratamiento Láser Vascular", "Eliminación de Várices con Láser"],
            description: "Tratamiento láser no invasivo que elimina várices y arañas vasculares sin cirugía, sin cicatrices y con recuperación inmediata.",
            procedureType: "Cosmetic",
            bodyLocation: "Piernas, Muslos, Pantorrillas",
            howPerformed: "El láser emite luz específica absorbida por la hemoglobina de la vena, calentando y sellando la pared vascular. La vena se reabsorbe gradualmente.",
            preparation: "Evaluación vascular previa. No requiere preparación especial.",
            followup: "Resultados progresivos. Sesiones cada 4-6 semanas.",
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
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "¿Cómo funciona el láser vascular?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "El láser emite una luz específica que es absorbida por la hemoglobina de la vena, calentando y sellando la pared vascular. La vena tratada se reabsorbe gradualmente por el cuerpo en las semanas siguientes."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿Cuántas sesiones necesito?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Depende del tamaño y cantidad de várices. Generalmente se requieren entre 1 y 3 sesiones espaciadas cada 4-6 semanas para obtener resultados óptimos."
                    }
                }
            ]
        }
    ]
};

const beneficios = [
    {
        titulo: "Sin Cirugía",
        descripcion: "Elimina várices sin bisturí, sin cicatrices y sin tiempo de hospitalización.",
        icono: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Recuperación Inmediata",
        descripcion: "Retoma tus actividades normales el mismo día del tratamiento.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Resultados Visibles",
        descripcion: "Mejoras notables desde la primera sesión, con progresión continua.",
        icono: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
        titulo: "Único en Los Ángeles",
        descripcion: "Tecnología láser vascular exclusiva en la zona del Biobío.",
        icono: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    }
];

const queTratamos = [
    { problema: "Várices pequeñas y medianas", descripcion: "Venas reticulares y dilataciones de hasta 4mm de diámetro" },
    { problema: "Arañas vasculares", descripcion: "Telangiectasias de color rojo, azul o púrpura en piernas y muslos" },
    { problema: "Venitas visibles", descripcion: "Venas superficiales que se notan a través de la piel" },
    { problema: "Insuficiencia venosa leve", descripcion: "Primeros signos de mala circulación venosa sin complicaciones" }
];

const proceso = [
    { paso: "1", titulo: "Evaluación", descripcion: "Examen vascular con la Dra. Francisca González para determinar el tipo y grado de várices." },
    { paso: "2", titulo: "Aplicación", descripcion: "El láser emite pulsos de luz que sellan la vena dilatada de forma controlada y precisa." },
    { paso: "3", titulo: "Reabsorción", descripcion: "En las semanas siguientes, tu cuerpo reabsorbe naturalmente la vena cerrada." },
    { paso: "4", titulo: "Seguimiento", descripcion: "Control periódico para evaluar la evolución y planificar sesiones adicionales si es necesario." }
];

const faqs = [
    {
        pregunta: "¿Cómo funciona el láser vascular?",
        respuesta: "El láser emite una luz específica que es absorbida por la hemoglobina de la vena, calentando y sellando la pared vascular. La vena tratada se reabsorbe gradualmente por el cuerpo en las semanas siguientes."
    },
    {
        pregunta: "¿Cuántas sesiones necesito?",
        respuesta: "Depende del tamaño y cantidad de várices. Generalmente se requieren entre 1 y 3 sesiones espaciadas cada 4-6 semanas para obtener resultados óptimos."
    },
    {
        pregunta: "¿Es doloroso?",
        respuesta: "No. El tratamiento es bien tolerado. Se siente una ligera sensación de calor o pinchazo. Aplicamos gel refrigerante para mayor confort."
    },
    {
        pregunta: "¿Hay alguna contraindicación?",
        respuesta: "No se recomienda en embarazo, lactancia, insuficiencia venosa severa, trastornos de coagulación o infecciones activas en la zona a tratar."
    },
    {
        pregunta: "¿Cuánto dura el tratamiento?",
        respuesta: "Cada sesión dura entre 45-60 minutos dependiendo de la extensión de las várices a tratar."
    },
    {
        pregunta: "¿Los resultados son permanentes?",
        respuesta: "Las várices tratadas no vuelven, pero pueden aparecer nuevas várices si no se controlan los factores de riesgo como el sobrepeso o la sedentariedad."
    }
];

export default function LaserVascularPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Láser Vascular</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-red-500/20 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                    </svg>
                                    Único en Los Ángeles
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Láser Vascular para <span className="text-[#b8935f]">Várices</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Elimina várices y arañas vasculares</strong> sin cirugía, sin cicatrices y con recuperación inmediata.
                                    Tecnología láser única en Los Ángeles.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Sin cirugía &nbsp; ✓ Sin cicatrices &nbsp; ✓ Recuperación inmediata
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Duración sesión</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">45-60 minutos</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://reservas.clinios.cl/cialo/reservar/francisca-gonzalez"
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
                                        href="/profesionales/dra-francisca-gonzalez"
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
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">El Procedimiento</span>
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
                                Ventajas del Láser Vascular
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
                        <div className="bg-red-50 rounded-lg p-8 flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Tu Especialista</h2>
                                <h3 className="font-semibold text-[#1b1a18] text-lg mb-2">Dra. Francisca González</h3>
                                <p className="text-[#6f6a5c] mb-4">
                                    Cirujana Vascular y Endovascular con subespecialidad por la Universidad de Chile. 
                                    Reconocida como Mejor Egresada del Programa de Cirugía General. Amplia experiencia 
                                    en tratamiento de várices con tecnología láser y técnicas mínimamente invasivas.
                                </p>
                                <Link
                                    href="/profesionales/dra-francisca-gonzalez"
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
                            Elimina tus Várices sin Cirugía
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación con la Dra. Francisca González y descubre si el láser vascular es la solución para ti.
                        </p>
                        <a
                            href="https://reservas.clinios.cl/cialo/reservar/francisca-gonzalez"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Evaluación Vascular
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
