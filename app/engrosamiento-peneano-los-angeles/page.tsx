import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Engrosamiento Peneano en Los Ángeles Chile | Clínica Cialo" },
    description: "Engrosamiento peneano con ácido hialurónico en Los Ángeles. Aumento del grosor de forma segura y natural. Sin cirugía, resultados inmediatos. Procedimiento de 30-60 minutos. Duración 12-18 meses.",
    keywords: "engrosamiento peneano Los Ángeles, aumento grosor pene Chile, ácido hialurónico masculino, medicina estética masculina Biobío, salud sexual hombre",
    openGraph: {
        title: "Engrosamiento Peneano | Ácido Hialurónico | Clínica Cialo Los Ángeles",
        description: "Aumento del grosor de forma segura y sin cirugía. Resultados inmediatos y naturales. Duración 12-18 meses.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/engrosamiento-peneano-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/engrosamiento-peneano-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Engrosamiento Peneano en Los Ángeles Chile', item: 'https://cialo.cl/engrosamiento-peneano-los-angeles' },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Engrosamiento Peneano con Ácido Hialurónico",
            alternateName: ["Aumento de Grosor Peneano", "Penile Girth Enhancement"],
            description: "Procedimiento mínimamente invasivo que utiliza ácido hialurónico para aumentar el grosor del pene de forma natural y reversible.",
            procedureType: "Cosmetic",
            bodyLocation: "Pene",
            howPerformed: "Inyección de gel de ácido hialurónico en las capas profundas de la piel del pene bajo anestesia local.",
            preparation: "Evaluación médica previa. Sin preparación especial.",
            followup: "Resultados inmediatos. Duración de 12-18 meses.",
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
                    name: "¿Cuánto dura el efecto del engrosamiento peneano?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "El efecto del ácido hialurónico dura entre 12 y 18 meses en promedio. El producto es gradualmente reabsorbido por el cuerpo, y se pueden realizar retoques para mantener el resultado."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿El procedimiento afecta la sensibilidad?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "No. El ácido hialurónico se inyecta en capas superficiales que no afectan las terminaciones nerviosas responsables de la sensibilidad. La función sexual permanece intacta."
                    }
                }
            ]
        }
    ]
};

const beneficios = [
    {
        titulo: "Sin Cirugía",
        descripcion: "Procedimiento mínimamente invasivo con inyecciones. Sin cortes, sin puntos, sin hospitalización.",
        icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
        titulo: "Resultados Inmediatos",
        descripcion: "El aumento de grosor es visible desde el momento del procedimiento. Resultado natural al tacto.",
        icono: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    },
    {
        titulo: "Seguro y Reversible",
        descripcion: "El ácido hialurónico es biocompatible y biodegradable. Si no estás satisfecho, el efecto disminuye naturalmente.",
        icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
        titulo: "Confidencialidad Total",
        descripcion: "Atención discreta y confidencial. Tu privacidad es nuestra prioridad absoluta.",
        icono: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    }
];

const resultados = [
    { dato: "20-30%", descripcion: "Aumento de circunferencia promedio" },
    { dato: "2-3 cm", descripcion: "Incremento de grosor aprox." },
    { dato: "30-60 min", descripcion: "Duración del procedimiento" },
    { dato: "12-18 meses", descripcion: "Duración de los resultados" }
];

const faqs = [
    {
        pregunta: "¿En qué consiste el engrosamiento peneano?",
        respuesta: "Es un procedimiento estético que utiliza ácido hialurónico para aumentar el grosor del pene. Se inyecta el gel en las capas profundas de la piel bajo anestesia local, logrando un aumento natural y uniforme de la circunferencia."
    },
    {
        pregunta: "¿El procedimiento duele?",
        respuesta: "Se realiza bajo anestesia local, por lo que no sentirás dolor durante el procedimiento. Después puede haber molestias leves que se controlan con analgésicos comunes. La mayoría de pacientes describe la experiencia como muy tolerable."
    },
    {
        pregunta: "¿Cuánto aumento puedo esperar?",
        respuesta: "Los resultados varían según cada persona, pero en promedio se logra un aumento del 20-30% en la circunferencia, equivalente a aproximadamente 2-3 cm de grosor adicional. El aumento es más evidente en estado de flacidez."
    },
    {
        pregunta: "¿Cuánto duran los resultados?",
        respuesta: "El ácido hialurónico es gradualmente reabsorbido por el cuerpo. Los efectos duran entre 12 y 18 meses en promedio. Se pueden realizar sesiones de retoque para mantener el volumen deseado."
    },
    {
        pregunta: "¿Afecta la sensibilidad o función sexual?",
        respuesta: "No. El ácido hialurónico se inyecta en capas superficiales que no afectan las terminaciones nerviosas ni la función eréctil. La sensibilidad y la capacidad sexual permanecen completamente intactas."
    },
    {
        pregunta: "¿Cuándo puedo retomar la actividad sexual?",
        respuesta: "Recomendamos esperar entre 5 y 7 días antes de retomar las relaciones sexuales. Esto permite que el producto se estabilice y se reduzca cualquier inflamación residual."
    },
    {
        pregunta: "¿Hay efectos secundarios?",
        respuesta: "Los efectos secundarios son generalmente leves y temporales: hinchazón, enrojecimiento y sensibilidad que desaparecen en pocos días. Es un procedimiento con excelente perfil de seguridad cuando lo realiza un profesional calificado."
    },
    {
        pregunta: "¿Quién realiza el procedimiento?",
        respuesta: "El procedimiento es realizado por el Dr. Nicolás Laucirica, médico cirujano con especialización en medicina estética y formación en anatomía en Harvard University, garantizando seguridad y resultados óptimos."
    }
];

export default function EngrosamientoPeneanoPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-slate-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Engrosamiento Peneano</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-slate-500/20 text-slate-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                    Medicina Estética Masculina
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Engrosamiento <span className="text-[#b8935f]">Peneano</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Aumento del grosor</strong> de forma segura con ácido hialurónico.
                                    Sin cirugía, resultados inmediatos y naturales.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-4">
                                    ✓ Sin hospitalización &nbsp; ✓ Resultados inmediatos &nbsp; ✓ Confidencial
                                </p>
                                <p className="text-3xl font-bold text-white mb-8">
                                    Desde <span className="text-[#b8935f]">$800.000</span>
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20información%20sobre%20engrosamiento%20peneano"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Consulta Confidencial
                                    </a>
                                </div>
                            </div>

                            {/* Resultados */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">Lo Que Puedes Esperar</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {resultados.map((r, i) => (
                                        <div key={i} className="bg-[#1b1a18] p-4 rounded-lg text-center">
                                            <p className="text-2xl font-bold text-[#b8935f] mb-1">{r.dato}</p>
                                            <p className="text-xs text-[#cbcfd1]">{r.descripcion}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Ventajas
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Por Qué Elegir Este Procedimiento?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {beneficios.map((b, i) => (
                                <div key={i} className="bg-[#faf6ef] p-6 rounded-lg">
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
                <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2a2a]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">
                            Consulta Confidencial
                        </h2>
                        <p className="text-[#cbcfd1] text-lg mb-10 max-w-2xl mx-auto">
                            Tu privacidad es nuestra prioridad. Agenda una consulta privada para resolver todas tus dudas.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quisiera%20agendar%20una%20consulta%20privada%20sobre%20engrosamiento%20peneano"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-10 py-5 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Consulta Privada
                        </a>
                        <p className="mt-8 text-[#cbcfd1]/60 text-sm">
                            📍 Bulnes 220, Of. 509 — Los Ángeles, Biobío • +56 9 8202 8473
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
