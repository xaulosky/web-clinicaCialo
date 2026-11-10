import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Injerto Capilar FUE en Los Ángeles Chile | Clínica Cialo" },
    description: "Injerto capilar FUE en Los Ángeles. Técnica de extracción folicular individual para resultados naturales y permanentes. Sin cicatrices visibles, sin puntos. Recupera tu cabello.",
    keywords: "injerto capilar FUE Los Ángeles, trasplante cabello Chile, calvicie solución, implante folicular Biobío, alopecia tratamiento, cabello natural",
    openGraph: {
        title: "Injerto Capilar FUE | Trasplante de Cabello Natural | Clínica Cialo Los Ángeles",
        description: "Técnica FUE: extracción individual de folículos. Sin cicatrices lineales. Resultados permanentes y naturales.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/injerto-capilar-fue-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/injerto-capilar-fue-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Injerto Capilar FUE en Los Ángeles Chile', item: 'https://cialo.cl/injerto-capilar-fue-los-angeles' },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Injerto Capilar FUE",
            alternateName: ["Trasplante Capilar FUE", "Follicular Unit Extraction", "Implante Capilar"],
            description: "Procedimiento quirúrgico mínimamente invasivo para restauración del cabello mediante extracción e implantación individual de unidades foliculares.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Cuero cabelludo",
            howPerformed: "Extracción individual de unidades foliculares de la zona donante con punches de 0.8-1mm e implantación en zonas receptoras con angulación natural.",
            preparation: "Evaluación capilar previa. Evitar alcohol y tabaco 2 semanas antes.",
            followup: "Crecimiento inicial a los 3 meses. Resultados definitivos a los 12 meses.",
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
                    name: "¿El injerto capilar FUE deja cicatrices?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "La técnica FUE deja únicamente microoscicatrices puntiformes de menos de 1mm que son prácticamente invisibles, incluso con el cabello muy corto. No deja la cicatriz lineal de la técnica tradicional."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿Cuánto dura el resultado del injerto capilar?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "El resultado es permanente. Los folículos trasplantados provienen de zonas resistentes a la calvicie y mantienen esa característica genética de por vida."
                    }
                }
            ]
        }
    ]
};

const proceso = [
    { paso: "1", titulo: "Evaluación", descripcion: "Analizamos tu patrón de calvicie, densidad donante y diseñamos la línea de implantación natural." },
    { paso: "2", titulo: "Extracción FUE", descripcion: "Con punches de 0.8-1mm extraemos individualmente las unidades foliculares de la zona donante." },
    { paso: "3", titulo: "Selección", descripcion: "Clasificamos los folículos bajo microscopio según cantidad de cabellos (1-4 pelos por unidad)." },
    { paso: "4", titulo: "Implantación", descripcion: "Insertamos cada folículo respetando angulación, dirección y profundidad para crecimiento natural." }
];

const beneficios = [
    {
        titulo: "Sin Cicatriz Lineal",
        descripcion: "Solo microoscicatrices puntiformes imperceptibles. Puedes llevar el pelo muy corto sin que se note.",
        icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
        titulo: "Resultados Permanentes",
        descripcion: "Los folículos trasplantados son genéticamente resistentes a la calvicie. El resultado dura toda la vida.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Aspecto 100% Natural",
        descripcion: "Implantación folículo a folículo respetando la dirección natural de crecimiento. Nadie notará la diferencia.",
        icono: "M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
    },
    {
        titulo: "Mínima Recuperación",
        descripcion: "Sin puntos ni suturas. Puedes retomar actividades normales en pocos días. Mínimo dolor postoperatorio.",
        icono: "M13 10V3L4 14h7v7l9-11h-7z"
    }
];

const cronologia = [
    { tiempo: "Día 1-7", descripcion: "Hinchazón y pequeñas costras. Lavado suave con champú especial." },
    { tiempo: "Semana 2-4", descripcion: "Caída del cabello trasplantado (normal). Los folículos permanecen." },
    { tiempo: "Mes 3", descripcion: "Comienza el crecimiento del nuevo cabello. Primeros resultados visibles." },
    { tiempo: "Mes 6", descripcion: "Crecimiento significativo. Cabello más largo y grueso." },
    { tiempo: "Mes 12", descripcion: "Resultado definitivo. Densidad y aspecto final completado." }
];

const faqs = [
    {
        pregunta: "¿Qué es la técnica FUE?",
        respuesta: "FUE (Follicular Unit Extraction) es la técnica más avanzada de trasplante capilar. A diferencia de la técnica tradicional que extrae una tira de cuero cabelludo, FUE extrae cada unidad folicular de forma individual usando micropunches de 0.8-1mm. El resultado: sin cicatriz lineal y recuperación más rápida."
    },
    {
        pregunta: "¿El procedimiento duele?",
        respuesta: "El procedimiento se realiza bajo anestesia local, por lo que no sientes dolor durante la intervención. Las molestias postoperatorias son leves y se controlan con analgésicos comunes. La mayoría de pacientes describe el procedimiento como muy tolerable."
    },
    {
        pregunta: "¿Cuántas unidades foliculares necesito?",
        respuesta: "Depende de la extensión de la zona a cubrir. Para entradas leves pueden bastar 1.000-1.500 UF. Una zona frontal completa puede requerir 2.000-2.500 UF. Para coronilla y zona frontal juntas, 3.000-4.000 UF. En la evaluación definimos el número exacto."
    },
    {
        pregunta: "¿Quedan cicatrices visibles?",
        respuesta: "La técnica FUE deja únicamente microoscicatrices puntiformes de menos de 1mm que son prácticamente invisibles, incluso cortándote el pelo al 1 o 2. No hay cicatriz lineal como en la técnica tradicional (FUT)."
    },
    {
        pregunta: "¿Cuándo veo los resultados definitivos?",
        respuesta: "El proceso completo toma aproximadamente 12 meses. A los 3 meses verás el inicio del crecimiento. A los 6 meses, resultados significativos. A los 12 meses, el resultado final con máxima densidad y longitud."
    },
    {
        pregunta: "¿El cabello trasplantado se cae?",
        respuesta: "No. El cabello trasplantado proviene de la zona occipital (nuca), que es genéticamente resistente a la calvicie. Esta característica se mantiene tras el trasplante, por lo que el resultado es permanente."
    },
    {
        pregunta: "¿Cuánto dura el procedimiento?",
        respuesta: "Una sesión de injerto FUE dura entre 5-7 horas, dependiendo del número de unidades foliculares. El tiempo se divide en extracción (2-3h), preparación de folículos e implantación (3-4h). Se realizan pausas para descanso."
    },
    {
        pregunta: "¿Quién es candidato para injerto capilar?",
        respuesta: "Los mejores candidatos tienen alopecia estabilizada, buena densidad en la zona donante (nuca y laterales), y expectativas realistas. No es ideal para alopecia muy avanzada con zona donante escasa. La evaluación determina tu candidatura."
    }
];

export default function InjertoCapilarFUEPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Injerto Capilar FUE</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-emerald-500/20 text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Resultados Permanentes
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Injerto Capilar <span className="text-[#b8935f]">FUE</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Recupera tu cabello de forma permanente</strong>.
                                    Técnica de extracción folicular individual sin cicatrices lineales. Tu propio pelo, tu resultado natural.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Sin cicatriz visible &nbsp; ✓ Resultado definitivo &nbsp; ✓ 100% natural
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Resultado permanente en</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">12 meses</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20injerto%20capilar%20FUE"
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
                                        href="/profesionales"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Especialistas
                                    </Link>
                                </div>
                            </div>

                            {/* Cronología */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">Cronología de Resultados</h2>
                                <div className="space-y-4">
                                    {cronologia.map((c, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="bg-[#b8935f] text-[#1b1a18] px-3 py-1 rounded text-xs font-bold shrink-0">{c.tiempo}</div>
                                            <p className="text-[#cbcfd1] text-sm">{c.descripcion}</p>
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
                                ¿Cómo Funciona el Injerto FUE?
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
                                Ventajas de la Técnica FUE
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
                            Recupera Tu Cabello Para Siempre
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda una evaluación capilar sin costo y descubre si eres candidato para el injerto FUE.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20injerto%20capilar%20FUE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Evaluación Gratuita
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
