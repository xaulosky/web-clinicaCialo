import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Vasectomía sin Bisturí en Los Ángeles | Clínica Cialo" },
    description: "Vasectomía sin bisturí en Los Ángeles. $490.000 con BONO PAD FONASA o $890.000 particular. Método sin aguja ni bisturí. Procedimiento seguro, rápido y definitivo.",
    keywords: "vasectomía Los Ángeles, vasectomía sin bisturí, vasectomía FONASA, planificación familiar Los Ángeles, vasectomía BONO PAD",
    openGraph: {
        title: "Vasectomía sin Bisturí | BONO PAD FONASA | Clínica Cialo",
        description: "$490.000 con FONASA o $890.000 particular. Método sin aguja ni bisturí con recuperación inmediata.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/vasectomia-sin-bisturi-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/vasectomia-sin-bisturi-los-angeles",
    },
};

const faqs = [
    {
        pregunta: "¿Qué es la vasectomía sin bisturí?",
        respuesta: "Es una técnica moderna que no requiere incisiones quirúrgicas. Se accede al conducto deferente a través de una pequeña punción que se cierra sin puntos."
    },
    {
        pregunta: "¿Cuánto cuesta la vasectomía?",
        respuesta: "El valor con BONO PAD FONASA es $490.000. Si no tienes FONASA, el valor particular es $890.000. Incluye consulta preoperatoria, procedimiento y control postoperatorio."
    },
    {
        pregunta: "¿Cuánto dura la recuperación?",
        respuesta: "La recuperación es inmediata. La mayoría de pacientes retorna a sus actividades normales en 24-48 horas. Se recomienda evitar esfuerzos físicos intensos por 1 semana."
    },
    {
        pregunta: "¿Es efectiva de inmediato?",
        respuesta: "No. Se requieren al menos 20 eyaculaciones o 3 meses para confirmar la ausencia de espermatozoides mediante un espermograma. Debes usar otro método anticonceptivo durante este período."
    },
    {
        pregunta: "¿Es reversible?",
        respuesta: "La vasectomía debe considerarse un método definitivo. Aunque existe la vasovasostomía (reversión), su éxito no está garantizado y es un procedimiento más complejo."
    },
    {
        pregunta: "¿Duele el procedimiento?",
        respuesta: "Se realiza con anestesia local. Puedes sentir presión o tirantez leve, pero no dolor significativo durante el procedimiento."
    }
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Vasectomía sin Bisturí en Los Ángeles', item: 'https://cialo.cl/vasectomia-sin-bisturi-los-angeles' },
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
            name: "Vasectomía sin Bisturí",
            alternateName: ["Vasectomía sin Aguja", "Vasectomía No Escalpélica"],
            description: "Método anticonceptivo definitivo sin aguja ni bisturí. Procedimiento rápido, seguro y con recuperación inmediata.",
            procedureType: "Surgical",
            bodyLocation: "Escroto",
            howPerformed: "Se accede a los conductos deferentes mediante una pequeña punción sin bisturí, seccionándolos para impedir el paso de espermatozoides.",
            preparation: "Consulta urológica previa. Evaluación médica y firma de consentimiento informado.",
            followup: "Control postoperatorio a los 7 días. Espermograma a los 3 meses.",
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
        titulo: "Sin Aguja ni Bisturí",
        descripcion: "Técnica moderna que no requiere incisiones quirúrgicas ni puntos de sutura.",
        icono: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "BONO PAD FONASA",
        descripcion: "Valor con FONASA $490.000. También disponible particular $890.000.",
        icono: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    },
    {
        titulo: "Recuperación Inmediata",
        descripcion: "Retorna a tus actividades normales en 24-48 horas post-procedimiento.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Efectividad Definitiva",
        descripcion: "Método anticonceptivo permanente con más del 99% de efectividad.",
        icono: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    }
];

const queTratamos = [
    { problema: "Planificación familiar definitiva", descripcion: "Método anticonceptivo permanente para quienes no desean más hijos" },
    { problema: "Anticoncepción permanente", descripcion: "Alternativa definitiva a métodos hormonales o barrera" },
    { problema: "Evita métodos hormonales", descripcion: "Opción sin efectos secundarios hormonales para la pareja" },
    { problema: "Rápido y ambulatorio", descripcion: "Procedimiento de 20-30 minutos, sin hospitalización" }
];

const proceso = [
    { paso: "1", titulo: "Consulta", descripcion: "Evaluación urológica, explicación del procedimiento y firma de consentimiento informado." },
    { paso: "2", titulo: "Procedimiento", descripcion: "Anestesia local y punción sin bisturí para acceder y seccionar los conductos deferentes." },
    { paso: "3", titulo: "Recuperación", descripcion: "Regreso a casa el mismo día. Reposo relativo de 24-48 horas." },
    { paso: "4", titulo: "Control", descripcion: "Espermograma a los 3 meses para confirmar ausencia de espermatozoides." }
];


export default function VasectomiaPage() {
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
                            <span className="text-[#b8935f]">Vasectomía</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    Urología
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Vasectomía sin <span className="text-[#b8935f]">Bisturí</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Método anticonceptivo definitivo</strong> sin aguja ni bisturí.
                                    Procedimiento seguro, rápido y con recuperación inmediata.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Sin bisturí &nbsp; ✓ BONO PAD FONASA &nbsp; ✓ Recuperación inmediata
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-green-500/10 backdrop-blur-sm rounded-lg p-4 border border-green-500/20">
                                        <span className="text-green-300 text-sm block mb-1">Con FONASA</span>
                                        <p className="text-2xl font-bold text-green-400">$490.000</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                                        <span className="text-[#cbcfd1] text-sm block mb-1">Particular</span>
                                        <p className="text-2xl font-bold text-[#b8935f]">$890.000</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://reservas.clinios.cl/cialo/reservar/guillermo-contreras"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Agendar Consulta Urológica
                                    </a>
                                    <Link
                                        href="/profesionales/guillermo-contreras"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Especialista
                                    </Link>
                                </div>
                            </div>

                            {/* Qué Tratamos */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué Resuelve?</h2>
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
                                ¿Cómo se Realiza?
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
                                Ventajas de la Vasectomía sin Bisturí
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
                                <h3 className="font-semibold text-[#1b1a18] text-lg mb-2">Dr. Guillermo Contreras / Dr. Frank Ulloa</h3>
                                <p className="text-[#6f6a5c] mb-4">
                                    Urólogos con amplia experiencia en cirugía mínimamente invasiva y procedimientos 
                                    urológicos de alta complejidad. Especialistas en vasectomía sin bisturí.
                                </p>
                                <Link
                                    href="/profesionales/guillermo-contreras"
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
                            Planificación Familiar Definitiva
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu consulta urológica y conoce más sobre la vasectomía sin bisturí.
                            Valor con FONASA $490.000 o particular $890.000.
                        </p>
                        <a
                            href="https://reservas.clinios.cl/cialo/reservar/guillermo-contreras"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Consulta Urológica
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
