import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Escleroterapia en Los Ángeles Chile | Clínica Cialo" },
    description: "Escleroterapia en Los Ángeles. Tratamiento para eliminar arañitas vasculares y várices pequeñas. Sin cirugía, sin hospitalización. Resultados visibles en 3-6 semanas. Dra. Francisca González, cirujano vascular.",
    keywords: "escleroterapia Los Ángeles, arañitas vasculares Chile, várices tratamiento, telangiectasias Biobío, venas piernas, cirujano vascular",
    openGraph: {
        title: "Escleroterapia | Eliminar Várices y Arañitas | Clínica Cialo Los Ángeles",
        description: "Elimina arañitas vasculares y pequeñas várices con microinyecciones. Sin cirugía. Resultados desde las primeras semanas.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/escleroterapia-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/escleroterapia-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Escleroterapia en Los Ángeles Chile', item: 'https://cialo.cl/escleroterapia-los-angeles' },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Escleroterapia",
            alternateName: ["Tratamiento de Arañitas Vasculares", "Inyección de Várices", "Esclerosis Venosa"],
            description: "Procedimiento mínimamente invasivo que consiste en inyectar una sustancia esclerosante en las venas afectadas para cerrarlas y eliminar várices y arañitas vasculares.",
            procedureType: "PercutaneousProcedure",
            bodyLocation: "Piernas, Muslos, Tobillos",
            howPerformed: "Se inyecta directamente en la vena afectada una solución esclerosante con aguja fina. La vena se irrita, se cierra y el cuerpo la reabsorbe.",
            preparation: "Evitar depilación y cremas 24h antes. No tomar antiinflamatorios.",
            followup: "Uso de medias de compresión 48-72h. Resultados visibles en 3-6 semanas.",
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
                    name: "¿Cuántas sesiones de escleroterapia necesito?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "La mayoría de pacientes requiere entre 1 y 3 sesiones, espaciadas cada 4-6 semanas. Cada sesión puede eliminar entre el 50% y 80% de las venas tratadas."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿La escleroterapia duele?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Las molestias son mínimas. Se utiliza una aguja muy fina y la mayoría de pacientes describe una leve sensación de pinchazo y un poco de ardor momentáneo."
                    }
                }
            ]
        }
    ]
};

const beneficios = [
    {
        titulo: "Sin Cirugía ni Hospitalización",
        descripcion: "Procedimiento ambulatorio de 15-30 minutos. Vuelves a tu casa caminando el mismo día.",
        icono: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    },
    {
        titulo: "Efectividad Comprobada",
        descripcion: "Hasta 80% de éxito en eliminación de arañitas vasculares y várices pequeñas.",
        icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
        titulo: "Resultados Visibles",
        descripcion: "Las arañitas comienzan a desaparecer en 3-6 semanas. Várices mayores en 3-4 meses.",
        icono: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    },
    {
        titulo: "Mínima Recuperación",
        descripcion: "Puedes retomar actividades normales inmediatamente. Solo evitar ejercicio intenso 48h.",
        icono: "M13 10V3L4 14h7v7l9-11h-7z"
    }
];

const queTratamos = [
    { problema: "Arañitas Vasculares", descripcion: "Pequeñas venas rojas o azuladas visibles bajo la piel" },
    { problema: "Telangiectasias", descripcion: "Dilatación de pequeños vasos sanguíneos superficiales" },
    { problema: "Várices Reticulares", descripcion: "Venas azul-verdosas de 1-3mm de diámetro" },
    { problema: "Várices Pequeñas", descripcion: "Venas dilatadas menores a 4mm sin reflujo significativo" }
];

const proceso = [
    { paso: "1", titulo: "Evaluación", descripcion: "Examinamos las venas a tratar y descartamos patología venosa mayor." },
    { paso: "2", titulo: "Inyección", descripcion: "Con aguja fina inyectamos la solución esclerosante en cada vena." },
    { paso: "3", titulo: "Compresión", descripcion: "Aplicamos compresión inmediata con vendaje o medias elásticas." },
    { paso: "4", titulo: "Seguimiento", descripcion: "Control a las 4-6 semanas para evaluar resultados y planificar siguiente sesión." }
];

const faqs = [
    {
        pregunta: "¿Qué es la escleroterapia y cómo funciona?",
        respuesta: "La escleroterapia es un procedimiento médico que consiste en inyectar una sustancia esclerosante directamente en las venas afectadas. Esta solución irrita el revestimiento interno de la vena, provocando que se inflame, se cierre y eventualmente sea reabsorbida por el cuerpo. La sangre se redirige automáticamente a venas sanas."
    },
    {
        pregunta: "¿La escleroterapia duele?",
        respuesta: "Las molestias son mínimas. Utilizamos agujas muy finas (similares a las de insulina) y la mayoría de pacientes describe solo una leve sensación de pinchazo y un poco de ardor que dura segundos. No se requiere anestesia."
    },
    {
        pregunta: "¿Cuántas sesiones necesito?",
        respuesta: "Depende de la cantidad y extensión de las arañitas o várices. La mayoría de pacientes necesita entre 1 y 3 sesiones para lograr resultados óptimos. Cada sesión puede eliminar entre el 50% y 80% de las venas inyectadas. Las sesiones se espacian 4-6 semanas."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Para arañitas pequeñas, los resultados son visibles en 3-6 semanas. Para várices más grandes, puede tomar 3-4 meses. La vena tratada gradualmente se oscurece, luego se aclara y finalmente desaparece."
    },
    {
        pregunta: "¿Las venas tratadas pueden volver a aparecer?",
        respuesta: "Las venas tratadas exitosamente no reaparecen. Sin embargo, es posible que surjan nuevas arañitas con el tiempo, ya que la predisposición genética y factores como el embarazo, hormonas o estar mucho tiempo de pie pueden generar nuevas venas. Estas se pueden tratar con sesiones de mantenimiento."
    },
    {
        pregunta: "¿Qué cuidados debo tener después del tratamiento?",
        respuesta: "Debes usar medias de compresión por 48-72 horas (o según indicación). Evita exposición solar directa en la zona por 2 semanas, ejercicio intenso por 48-72 horas, y baños muy calientes. Caminar es recomendable desde el primer día."
    },
    {
        pregunta: "¿Hay efectos secundarios?",
        respuesta: "Los efectos secundarios son generalmente leves: enrojecimiento, pequeños hematomas y sensibilidad en los sitios de inyección que desaparecen en días. En raros casos puede haber hiperpigmentación temporal de la piel sobre la vena tratada."
    },
    {
        pregunta: "¿Quién no puede hacerse escleroterapia?",
        respuesta: "No es recomendable durante el embarazo o lactancia, si tienes historial de trombosis venosa profunda reciente, alergia conocida a esclerosantes, infección activa en la zona, o movilidad muy reducida."
    }
];

export default function EscleroterapiaPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Escleroterapia</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    Cirugía Vascular
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    <span className="text-[#b8935f]">Escleroterapia</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Elimina arañitas vasculares y várices</strong> de forma segura y efectiva.
                                    Microinyecciones que cierran las venas sin cirugía.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Sin hospitalización &nbsp; ✓ 80% efectividad &nbsp; ✓ Resultados en semanas
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Procedimiento de</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">15-30 minutos</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20la%20escleroterapia"
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
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                El Procedimiento
                            </span>
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
                                Ventajas de la Escleroterapia
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
                        <div className="bg-blue-50 rounded-lg p-8 flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Tu Especialista</h2>
                                <h3 className="font-semibold text-[#1b1a18] text-lg mb-2">Dra. Francisca González</h3>
                                <p className="text-[#6f6a5c] mb-4">
                                    Médico cirujano con especialización en cirugía vascular. Cuenta con amplia experiencia en el tratamiento de enfermedades venosas mediante técnicas mínimamente invasivas como la escleroterapia.
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
                            Di Adiós a las Arañitas Vasculares
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda una evaluación con nuestra especialista vascular y recupera la estética de tus piernas.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20escleroterapia"
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
