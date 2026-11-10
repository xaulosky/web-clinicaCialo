import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Sculptra en Los Ángeles Chile | Clínica Cialo" },
    description: "Sculptra en Los Ángeles. Bioestimulador de colágeno con ácido poliláctico para rejuvenecimiento facial natural y duradero. Resultados hasta 2 años. Estimula tu propio colágeno.",
    keywords: "Sculptra Los Ángeles, bioestimulador colágeno Chile, ácido poliláctico, rejuvenecimiento facial natural, lifting sin cirugía Biobío, PLLA",
    openGraph: {
        title: "Sculptra | Bioestimulador de Colágeno | Clínica Cialo Los Ángeles",
        description: "Estimula tu propio colágeno para un rejuvenecimiento natural. Resultados progresivos que duran hasta 2 años.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/sculptra-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/sculptra-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Sculptra en Los Ángeles Chile', item: 'https://cialo.cl/sculptra-los-angeles' },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Tratamiento con Sculptra",
            alternateName: ["Bioestimulador de Colágeno", "Ácido Poliláctico", "PLLA Facial"],
            description: "Tratamiento con ácido poli-L-láctico que estimula la producción natural de colágeno tipo 1 para rejuvenecimiento facial progresivo y duradero.",
            procedureType: "Cosmetic",
            bodyLocation: "Pómulos, Mejillas, Línea Mandibular, Sienes, Mentón",
            howPerformed: "Inyección de ácido poliláctico en dermis profunda que activa la producción natural de colágeno durante meses.",
            preparation: "Evaluación facial. Evitar anticoagulantes 48h antes.",
            followup: "Resultados progresivos desde la 3ra semana, óptimos a los 3-6 meses. Duración 18-24 meses.",
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
                    name: "¿Cuánto dura el efecto de Sculptra?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Los efectos de Sculptra duran entre 18 y 24 meses, y en algunos casos hasta 2-3 años. Es uno de los tratamientos con mayor duración en medicina estética facial."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿Cuántas sesiones de Sculptra necesito?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Generalmente se recomiendan 2-3 sesiones espaciadas cada 4-6 semanas para obtener resultados óptimos. El número exacto depende de la edad y el grado de flacidez."
                    }
                }
            ]
        }
    ]
};

const beneficios = [
    {
        titulo: "Estimula Tu Propio Colágeno",
        descripcion: "No es un relleno: activa tus fibroblastos para producir colágeno tipo 1 de forma natural.",
        icono: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    },
    {
        titulo: "Resultados Progresivos",
        descripcion: "Cambios graduales que evitan un look artificial. Nadie notará que te hiciste algo, solo que luces más joven.",
        icono: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    },
    {
        titulo: "Duración Excepcional",
        descripcion: "Hasta 2 años de efecto, mucho más que rellenos tradicionales. Menos sesiones a largo plazo.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    {
        titulo: "Rejuvenecimiento Global",
        descripcion: "Mejora firmeza, elasticidad y estructura facial. No solo rellena, transforma la calidad de tu piel.",
        icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    }
];

const zonasTratamiento = [
    "Pómulos y mejillas",
    "Línea mandibular (jawline)",
    "Sienes hundidas",
    "Mentón y pre-jowl",
    "Pliegues nasolabiales",
    "Líneas de marioneta"
];

const comoFunciona = [
    { paso: "1", titulo: "Inyección", descripcion: "Se inyecta el ácido poliláctico en la dermis profunda de las zonas a tratar." },
    { paso: "2", titulo: "Activación Celular", descripcion: "El PLLA activa los fibroblastos, las células responsables de producir colágeno." },
    { paso: "3", titulo: "Producción de Colágeno", descripcion: "Durante meses, tu piel produce nuevo colágeno tipo 1, el más estructural." },
    { paso: "4", titulo: "Resultado Natural", descripcion: "Notas una piel más firme, tersa y rejuvenecida de forma progresiva." }
];

const faqs = [
    {
        pregunta: "¿Qué es Sculptra y en qué se diferencia de los rellenos?",
        respuesta: "Sculptra es un bioestimulador de colágeno a base de ácido poli-L-láctico (PLLA). A diferencia de los rellenos de ácido hialurónico que aportan volumen inmediato, Sculptra estimula tu cuerpo para producir su propio colágeno. Los resultados son más graduales pero también más naturales y duraderos."
    },
    {
        pregunta: "¿Cuánto duran los resultados?",
        respuesta: "Sculptra es uno de los tratamientos más duraderos disponibles: entre 18-24 meses, y en muchos casos hasta 2-3 años. Esto se debe a que el colágeno que produces es tuyo y se degrada más lentamente que los rellenos sintéticos."
    },
    {
        pregunta: "¿Cuántas sesiones necesito?",
        respuesta: "El protocolo estándar incluye 2-3 sesiones espaciadas cada 4-6 semanas. El número exacto depende de tu edad, el grado de pérdida de volumen y tus objetivos. Después del protocolo inicial, las sesiones de mantenimiento se realizan cada 18-24 meses."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Los primeros cambios se notan a partir de la tercera semana. Sin embargo, los resultados óptimos aparecen entre los 3-6 meses, cuando la producción de colágeno alcanza su máximo. Esta evolución gradual es lo que hace que los resultados luzcan tan naturales."
    },
    {
        pregunta: "¿El procedimiento duele?",
        respuesta: "Aplicamos crema anestésica tópica antes del procedimiento. Además, el Sculptra se prepara con lidocaína para mayor comodidad. Las molestias son leves y temporales."
    },
    {
        pregunta: "¿Qué cuidados debo tener después?",
        respuesta: "Es fundamental realizar masajes suaves en la zona tratada durante 5 días (regla 5-5-5: 5 minutos, 5 veces al día, 5 días). Esto asegura una distribución uniforme del producto y previene la formación de nódulos."
    },
    {
        pregunta: "¿Quién es candidato ideal para Sculptra?",
        respuesta: "Sculptra es ideal para personas con pérdida de volumen facial por envejecimiento, flacidez moderada, o quienes buscan prevención activa. Es especialmente bueno para sienes hundidas, pómulos planos y pérdida de definición en la línea mandibular."
    },
    {
        pregunta: "¿En qué zonas NO se puede aplicar Sculptra?",
        respuesta: "Sculptra no se aplica en labios, nariz, frente ni en el área periocular muy cercana al ojo. Para esas zonas hay opciones más adecuadas como ácido hialurónico específico."
    }
];

export default function SculptraPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Sculptra</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Bioestimulador de Colágeno
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    <span className="text-[#b8935f]">Sculptra</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Estimula tu propio colágeno</strong> para un rejuvenecimiento natural y duradero.
                                    No es un relleno: es activar la capacidad de tu piel para regenerarse.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Resultados naturales &nbsp; ✓ Duración 18-24 meses &nbsp; ✓ Producción de colágeno
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Duración del efecto</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">Hasta 2 años</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20tratamiento%20Sculptra"
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
                                        href="/estetica-facial-en-los-angeles"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Otros Faciales
                                    </Link>
                                </div>
                            </div>

                            {/* Zonas */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">Zonas de Tratamiento</h2>
                                <div className="grid gap-3">
                                    {zonasTratamiento.map((zona, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-[#1b1a18] p-4 rounded-lg">
                                            <svg className="w-5 h-5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[#cbcfd1]">{zona}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cómo Funciona */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                La Ciencia
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Cómo Funciona Sculptra?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {comoFunciona.map((c, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1b1a18] font-bold text-xl">{c.paso}</div>
                                    <h3 className="font-semibold text-[#1b1a18] mb-2">{c.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{c.descripcion}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-amber-50 p-6 rounded-lg text-center">
                            <p className="text-[#1b1a18]">
                                <strong>¿Por qué es diferente?</strong> El ácido poliláctico es biocompatible y biodegradable.
                                Tu cuerpo lo absorbe gradualmente mientras sigue produciendo colágeno nuevo.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Por Qué Elegir Sculptra?
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
                            Rejuvenece Desde Adentro
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación y descubre cómo Sculptra puede ayudarte a recuperar la firmeza y volumen de forma natural.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20Sculptra"
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
