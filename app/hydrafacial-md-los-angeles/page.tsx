import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "HydraFacial MD en Los Ángeles Chile | Clínica Cialo" },
    description: "HydraFacial MD en Los Ángeles. Limpieza facial profunda con tecnología Vortex-Fusion. Exfoliación, extracción e hidratación en una sesión de 30 minutos. Resultados inmediatos. Apto para todo tipo de piel.",
    keywords: "HydraFacial Los Ángeles, limpieza facial profunda Chile, hidratación facial Biobío, tratamiento poros, exfoliación profesional, facial sin tiempo de recuperación",
    openGraph: {
        title: "HydraFacial MD | Limpieza + Hidratación Profunda | Clínica Cialo Los Ángeles",
        description: "Limpieza, exfoliación, extracción e hidratación en 30 minutos. Piel radiante inmediatamente.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/hydrafacial-md-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/hydrafacial-md-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'HydraFacial MD en Los Ángeles Chile', item: 'https://cialo.cl/hydrafacial-md-los-angeles' },
            ],
        },
        {
            "@type": "MedicalDevice",
            name: "HydraFacial MD",
            manufacturer: {
                "@type": "Organization",
                name: "The HydraFacial Company (BeautyHealth)",
                address: { "@type": "PostalAddress", addressCountry: "US" }
            },
            description: "Sistema de resurfacing facial no invasivo con tecnología Vortex-Fusion para limpieza, exfoliación, extracción e hidratación."
        },
        {
            "@type": "MedicalProcedure",
            name: "Tratamiento HydraFacial MD",
            alternateName: ["Limpieza Facial Profunda", "Hidrafacial", "Facial con Vortex"],
            description: "Procedimiento de resurfacing facial que combina limpieza profunda, exfoliación suave, extracción indolora e hidratación intensiva en una sola sesión.",
            procedureType: "Cosmetic",
            bodyLocation: "Rostro, Cuello, Escote",
            howPerformed: "La tecnología Vortex-Fusion crea un efecto espiral que limpia profundamente mientras infusiona sueros con ingredientes activos.",
            preparation: "Sin preparación especial. Llegar con rostro limpio de maquillaje.",
            followup: "Resultados inmediatos. Piel radiante desde la primera sesión.",
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
                    name: "¿Qué es HydraFacial?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "HydraFacial MD es un tratamiento de resurfacing facial que utiliza tecnología Vortex-Fusion para limpiar, exfoliar, extraer impurezas e hidratar la piel en una sola sesión de 30 minutos."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿HydraFacial es apto para todo tipo de piel?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sí. HydraFacial es seguro y efectivo para todos los tipos de piel, incluyendo piel sensible, grasa, seca, mixta, envejecida y con tendencia acneica."
                    }
                }
            ]
        }
    ]
};

const pasos = [
    {
        numero: "1",
        titulo: "Limpieza + Exfoliación",
        descripcion: "Se limpia y exfolia suavemente la piel, removiendo células muertas y preparando los poros para la extracción.",
        color: "bg-blue-500"
    },
    {
        numero: "2",
        titulo: "Extracción Indolora",
        descripcion: "La succión por vórtice extrae impurezas, puntos negros y exceso de sebo sin apretar ni causar enrojecimiento.",
        color: "bg-purple-500"
    },
    {
        numero: "3",
        titulo: "Hidratación + Protección",
        descripcion: "Se infusionan sueros con ácido hialurónico, péptidos y antioxidantes para nutrir, rejuvenecer y proteger la piel.",
        color: "bg-green-500"
    }
];

const beneficios = [
    {
        titulo: "Resultados Inmediatos",
        descripcion: "Desde el primer momento, la piel luce más luminosa, suave e hidratada. Sin tiempo de recuperación.",
        icono: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    },
    {
        titulo: "Apto para Todos",
        descripcion: "Seguro para todo tipo de piel: sensible, grasa, seca, mixta, envejecida o con acné.",
        icono: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
        titulo: "30 Minutos",
        descripcion: "Un tratamiento completo en solo 30 minutos. Ideal para una pausa de lunch o antes de un evento.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Personalizable",
        descripcion: "Los sueros se adaptan a tus necesidades específicas: hidratación, luminosidad, anti-edad o control de grasa.",
        icono: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    }
];

const queTrata = [
    "Poros dilatados y obstruidos",
    "Puntos negros y comedones",
    "Piel opaca y sin luminosidad",
    "Textura irregular",
    "Líneas finas y arrugas",
    "Deshidratación",
    "Manchas y tono desigual",
    "Exceso de grasa"
];

const faqs = [
    {
        pregunta: "¿Qué es HydraFacial y cómo funciona?",
        respuesta: "HydraFacial MD es un tratamiento de resurfacing facial que utiliza tecnología patentada Vortex-Fusion. Una pieza de mano con punta especializada crea un efecto de vórtice que limpia profundamente los poros mientras infusiona sueros con ingredientes activos. Combina limpieza, exfoliación, extracción e hidratación en un solo procedimiento."
    },
    {
        pregunta: "¿El tratamiento duele?",
        respuesta: "No, es completamente indoloro. La mayoría de pacientes lo describen como un masaje facial refrescante. La extracción se realiza mediante succión suave, no mediante presión manual, por lo que no hay molestias ni marcas."
    },
    {
        pregunta: "¿Cuánto dura una sesión?",
        respuesta: "Una sesión estándar de HydraFacial dura aproximadamente 30 minutos. Si se añaden boosters o tratamientos complementarios como luz LED o dermaplaning, puede extenderse a 45-60 minutos."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Los resultados son inmediatos. Desde el momento en que sales de la clínica, tu piel lucirá más luminosa, hidratada y suave. No hay enrojecimiento significativo ni tiempo de recuperación."
    },
    {
        pregunta: "¿Con qué frecuencia debo hacerme HydraFacial?",
        respuesta: "Para mantener resultados óptimos, recomendamos una sesión cada 4-6 semanas. Esto coincide con el ciclo natural de renovación de la piel. Algunos pacientes optan por sesiones mensuales de mantenimiento."
    },
    {
        pregunta: "¿Es seguro para todo tipo de piel?",
        respuesta: "Sí. HydraFacial es uno de los pocos tratamientos faciales adecuados para todos los tipos de piel, incluyendo piel sensible, grasa, seca, mixta, envejecida, étnica y con tendencia acneica. Los sueros se personalizan según tus necesidades."
    },
    {
        pregunta: "¿Puedo maquillarme después del tratamiento?",
        respuesta: "Sí. No hay tiempo de recuperación, por lo que puedes aplicar maquillaje inmediatamente después si lo deseas. De hecho, muchas personas se hacen HydraFacial antes de eventos importantes para lucir piel radiante."
    },
    {
        pregunta: "¿Cómo se compara con una limpieza facial tradicional?",
        respuesta: "A diferencia de las limpiezas faciales tradicionales que pueden ser invasivas y dejar la piel enrojecida, HydraFacial utiliza tecnología Vortex para una extracción suave y sin dolor. Además, infusiona activos mientras limpia, logrando resultados más profundos y duraderos."
    }
];

export default function HydraFacialMDPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">HydraFacial MD</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Tecnología Vortex-Fusion
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    HydraFacial <span className="text-[#b8935f]">MD</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Limpieza, exfoliación, extracción e hidratación</strong> en una sola sesión.
                                    Piel radiante en 30 minutos, sin dolor ni tiempo de recuperación.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Resultados inmediatos &nbsp; ✓ Apto para toda piel &nbsp; ✓ Sin downtime
                                </p>

                                <div className="flex gap-4 mb-8">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
                                        <span className="text-[#cbcfd1] text-sm">Sesión completa</span>
                                        <p className="text-2xl font-bold text-[#b8935f]">30-45 min</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
                                        <span className="text-[#cbcfd1] text-sm">Inversión sesión</span>
                                        <p className="text-2xl font-bold text-[#b8935f]">$80.000</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://reservas.clinios.cl/cialo/reservar/limpieza-hydrafacial"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Agendar Cita
                                    </a>
                                    <Link
                                        href="/estetica-facial-en-los-angeles"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Otros Faciales
                                    </Link>
                                </div>
                            </div>

                            {/* Qué Trata */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué Problemas Resuelve?</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {queTrata.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[#cbcfd1] text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Los 3 Pasos */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                El Proceso
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                3 Pasos, 30 Minutos, Resultados Inmediatos
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {pasos.map((p, i) => (
                                <div key={i} className="text-center">
                                    <div className={`w-20 h-20 ${p.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl`}>
                                        {p.numero}
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1b1a18] mb-3">{p.titulo}</h3>
                                    <p className="text-[#6f6a5c]">{p.descripcion}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-cyan-50 p-6 rounded-lg text-center">
                            <p className="text-[#1b1a18]">
                                <strong>Tecnología Vortex-Fusion:</strong> El secreto de HydraFacial es su efecto de vórtice que simultáneamente
                                succiona impurezas mientras infusiona activos, logrando una limpieza y nutrición profunda imposible con faciales tradicionales.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Por Qué Elegir HydraFacial?
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

                {/* FAQs */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">FAQ</span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Preguntas Frecuentes</h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-[#faf6ef] rounded-sm overflow-hidden shadow-sm">
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
                            Tu Piel Radiante en 30 Minutos
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu sesión de HydraFacial y descubre por qué es el tratamiento facial más popular del mundo.
                        </p>
                        <a
                            href="https://reservas.clinios.cl/cialo/reservar/limpieza-hydrafacial"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar HydraFacial
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
