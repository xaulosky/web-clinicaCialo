import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Cistoscopia en Los Ángeles | Clínica Cialo" },
    description: "Cistoscopia diagnóstica en Los Ángeles. Visualización endoscópica de vejiga y uretra para diagnóstico preciso. Dr. Frank Ulloa, urólogo especialista.",
    keywords: "cistoscopia Los Ángeles, cistoscopia diagnóstica, urólogo Los Ángeles, vejiga diagnóstico, endoscopia urológica",
    openGraph: {
        title: "Cistoscopia Diagnóstica | Urólogo Los Ángeles | Clínica Cialo",
        description: "Visualización endoscópica de vejiga y uretra. Diagnóstico preciso de patologías urológicas.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/cistoscopia-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/cistoscopia-los-angeles",
    },
};

const faqs = [
    {
        pregunta: "¿Qué es una cistoscopia?",
        respuesta: "Es un procedimiento endoscópico que introduce un cistoscopio (tubo delgado con cámara) por la uretra para visualizar el interior de la vejiga urinaria y detectar anomalías."
    },
    {
        pregunta: "¿Es dolorosa?",
        respuesta: "Se realiza con anestesia local en gel. Puede causar molestia leve o sensación de ardor al orinar durante 24-48 horas posteriores."
    },
    {
        pregunta: "¿Necesito preparación especial?",
        respuesta: "Generalmente se solicita orina limpia antes del procedimiento. En algunos casos se administra antibiótico profiláctico. No es necesario ayuno."
    },
    {
        pregunta: "¿Cuánto dura?",
        respuesta: "El procedimiento dura entre 15-30 minutos dependiendo de lo que se necesite evaluar."
    },
    {
        pregunta: "¿Cuándo sé los resultados?",
        respuesta: "El médico puede dar un diagnóstico inicial inmediato. Si se toman biopsias, los resultados de laboratorio están listos en 5-7 días hábiles."
    },
    {
        pregunta: "¿Puedo conducir después?",
        respuesta: "Sí, generalmente puedes retomar tus actividades normales inmediatamente. Solo se recomienda aumentar la ingesta de líquidos."
    }
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Cistoscopia en Los Ángeles', item: 'https://cialo.cl/cistoscopia-los-angeles' },
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
            name: "Cistoscopia Diagnóstica",
            alternateName: ["Endoscopia Urológica", "Cistouretroscopia"],
            description: "Procedimiento endoscópico que permite visualizar el interior de la vejiga urinaria y la uretra para diagnóstico de patologías.",
            procedureType: "Diagnostic",
            bodyLocation: "Vejiga urinaria, Uretra",
            howPerformed: "Se introduce un cistoscopio (tubo delgado con cámara) por la uretra para visualizar el interior de la vejiga.",
            preparation: "Evaluación urológica previa. Se solicita orina limpia antes del procedimiento.",
            followup: "Control post-procedimiento. Resultados inmediatos.",
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
        titulo: "Diagnóstico Preciso",
        descripcion: "Visualización directa del tracto urinario inferior para diagnóstico certero.",
        icono: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Procedimiento Rápido",
        descripcion: "Solo 15-30 minutos. Ambulatorio, sin necesidad de hospitalización.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Resultados Inmediatos",
        descripcion: "El médico puede observar y diagnosticar durante el mismo procedimiento.",
        icono: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    },
    {
        titulo: "Mínimamente Invasivo",
        descripcion: "Técnica endoscópica que no requiere cirugía abierta.",
        icono: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    }
];

const queTratamos = [
    { problema: "Infecciones urinarias recurrentes", descripcion: "Diagnóstico de causas subyacentes de infecciones repetidas" },
    { problema: "Sangrado en la orina", descripcion: "Identificación de origen de hematuria" },
    { problema: "Dolor al orinar", descripcion: "Evaluación de uretra y vejiga en casos de disuria" },
    { problema: "Micción frecuente", descripcion: "Descarte de tumores, cálculos o malformaciones" }
];

const proceso = [
    { paso: "1", titulo: "Preparación", descripcion: "Orina limpia previa. Evaluación urológica y explicación del procedimiento." },
    { paso: "2", titulo: "Procedimiento", descripcion: "Anestesia local en gel e introducción del cistoscopio por la uretra." },
    { paso: "3", titulo: "Evaluación", descripcion: "Visualización directa de vejiga y uretra. Detección de anomalías." },
    { paso: "4", titulo: "Resultados", descripcion: "Diagnóstico inmediato. Si se toman biopsias, resultados en 5-7 días." }
];


export default function CistoscopiaPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Cistoscopia</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-teal-500/20 text-teal-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                                    </svg>
                                    Diagnóstico Urológico
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Cistoscopia <span className="text-[#b8935f]">Diagnóstica</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Visualización endoscópica</strong> de vejiga y uretra para diagnóstico preciso
                                    de infecciones, sangrado, tumores y alteraciones de la micción.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Procedimiento ambulatorio &nbsp; ✓ Resultados inmediatos &nbsp; ✓ Mínimamente invasivo
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Duración</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">15-30 minutos</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://reservas.clinios.cl/cialo/reservar/frank-ulloa"
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
                                        href="/profesionales/frank-ulloa"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Especialista
                                    </Link>
                                </div>
                            </div>

                            {/* Qué Tratamos */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué Diagnostica?</h2>
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
                                Ventajas de la Cistoscopia
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
                        <div className="bg-teal-50 rounded-lg p-8 flex flex-col md:flex-row gap-6 items-center">
                            <div className="flex-1">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Tu Especialista</h2>
                                <h3 className="font-semibold text-[#1b1a18] text-lg mb-2">Dr. Frank Ulloa</h3>
                                <p className="text-[#6f6a5c] mb-4">
                                    Urólogo con amplia experiencia en diagnóstico y tratamiento de patologías del tracto urinario.
                                    Especialista en procedimientos endoscópicos y cirugía urológica mínimamente invasiva.
                                </p>
                                <Link
                                    href="/profesionales/frank-ulloa"
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
                            Diagnóstico Urológico Preciso
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu consulta con el Dr. Frank Ulloa y resuelve tus dudas sobre salud urológica.
                        </p>
                        <a
                            href="https://reservas.clinios.cl/cialo/reservar/frank-ulloa"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Consulta
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
