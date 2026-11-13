import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GuiaTratamiento, { SeccionGuia, TratamientoRelacionado } from "@/app/components/GuiaTratamiento";

export const metadata: Metadata = {
    title: { absolute: "Morpheus8 en Los Ángeles Chile | Clínica Cialo" },
    description: "Morpheus8 en Los Ángeles, Chile. Tratamiento de radiofrecuencia fraccionada con microagujas para rejuvenecimiento facial y corporal. Estimula colágeno, tensa la piel y remodela grasa. Resultados visibles desde la primera sesión.",
    keywords: "Morpheus8 Los Ángeles, radiofrecuencia fraccionada Chile, microagujas radiofrecuencia, rejuvenecimiento facial Biobío, lifting sin cirugía, InMode Chile",
    openGraph: {
        title: "Morpheus8 | Radiofrecuencia + Microagujas | Clínica Cialo Los Ángeles",
        description: "Rejuvenecimiento profundo con radiofrecuencia fraccionada. Hasta 8mm de penetración. Facial y corporal.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/morpheus8-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/morpheus8-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Morpheus8 en Los Ángeles Chile', item: 'https://cialo.cl/morpheus8-los-angeles' },
            ],
        },
        {
            "@type": "MedicalDevice",
            name: "Morpheus8",
            manufacturer: {
                "@type": "Organization",
                name: "InMode",
                address: { "@type": "PostalAddress", addressCountry: "IL" }
            },
            description: "Sistema de radiofrecuencia fraccionada con microagujas para rejuvenecimiento dérmico y subdérmico profundo."
        },
        {
            "@type": "MedicalProcedure",
            name: "Tratamiento Morpheus8",
            alternateName: ["RF Fraccionada con Microagujas", "Microneedling RF", "Lifting sin Cirugía"],
            description: "Procedimiento mínimamente invasivo que combina microagujas con radiofrecuencia bipolar para estimular colágeno, tensar la piel y remodelar grasa.",
            procedureType: "Cosmetic",
            bodyLocation: "Rostro, Cuello, Abdomen, Brazos, Muslos",
            howPerformed: "Microagujas penetran la piel hasta 8mm, liberando energía de radiofrecuencia en capas profundas para estimular la producción de colágeno y elastina.",
            preparation: "Crema anestésica 30-45 min antes. Evitar retinoides 3 días antes.",
            followup: "Resultados progresivos desde la 2da semana. Óptimos a los 3 meses.",
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
        titulo: "Estimula Colágeno y Elastina",
        descripcion: "La radiofrecuencia genera calor controlado que activa la producción natural de colágeno y elastina en capas profundas.",
        icono: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
    },
    {
        titulo: "Penetración Hasta 8mm",
        descripcion: "Las microagujas alcanzan capas que otros tratamientos no pueden, tratando desde la epidermis hasta la grasa subdérmica.",
        icono: "M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
    },
    {
        titulo: "Remodela Grasa Localizada",
        descripcion: "A profundidades mayores a 4mm, la RF coagula el tejido adiposo, ayudando a reducir la papada y otras zonas de grasa facial.",
        icono: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
    },
    {
        titulo: "Mínimo Tiempo de Recuperación",
        descripcion: "Enrojecimiento de 1-3 días. Puedes retomar actividades normales rápidamente, a diferencia de procedimientos quirúrgicos.",
        icono: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    }
];

const zonasTratar = [
    { zona: "Rostro completo", indicacion: "Flacidez, arrugas, textura" },
    { zona: "Párpados y ojeras", indicacion: "Piel fina, bolsas leves" },
    { zona: "Cuello", indicacion: "Bandas, flacidez" },
    { zona: "Papada", indicacion: "Grasa localizada, doble mentón" },
    { zona: "Escote", indicacion: "Arrugas, daño solar" },
    { zona: "Abdomen", indicacion: "Flacidez post-parto" },
    { zona: "Brazos", indicacion: "Flacidez, textura" },
    { zona: "Muslos", indicacion: "Celulitis, flacidez" }
];

const queTrata = [
    "Arrugas finas y profundas",
    "Flacidez facial y corporal",
    "Cicatrices de acné",
    "Poros dilatados",
    "Estrías",
    "Papada y grasa facial",
    "Textura irregular de la piel",
    "Líneas de expresión"
];

const faqs = [
    {
        pregunta: "¿Qué es Morpheus8 y cómo funciona?",
        respuesta: "Morpheus8 es un dispositivo que combina microagujas con radiofrecuencia bipolar fraccionada. Las microagujas penetran la piel hasta 8mm de profundidad, liberando energía de RF que genera calor controlado. Este calor estimula la producción de colágeno y elastina, tensa los tejidos y puede coagular pequeñas bolsas de grasa."
    },
    {
        pregunta: "¿Morpheus8 duele?",
        respuesta: "Antes del tratamiento aplicamos crema anestésica tópica durante 30-45 minutos, lo que minimiza significativamente las molestias. Durante el procedimiento sentirás una sensación de calor y leve presión. La mayoría de pacientes tolera muy bien el tratamiento."
    },
    {
        pregunta: "¿Cuántas sesiones necesito?",
        respuesta: "Dependiendo de tu objetivo, generalmente se recomiendan 1-3 sesiones espaciadas cada 4-6 semanas. Para rejuvenecimiento general, muchos pacientes ven resultados satisfactorios con 2-3 sesiones. Para cicatrices de acné o flacidez severa pueden necesitarse más."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Los primeros cambios son visibles desde la segunda semana. Sin embargo, los resultados óptimos aparecen entre 3-6 meses después, ya que el cuerpo necesita tiempo para producir nuevo colágeno. Los resultados continúan mejorando hasta un año después."
    },
    {
        pregunta: "¿Cuánto dura la recuperación?",
        respuesta: "Puedes esperar enrojecimiento e hinchazón leve por 1-3 días. Pequeños puntos (micro-costras) pueden aparecer y desaparecen en 3-7 días. Puedes maquillarte desde el día siguiente y retomar actividades normales de inmediato, evitando sol directo por 1-2 semanas."
    },
    {
        pregunta: "¿Morpheus8 sirve para la papada?",
        respuesta: "Sí, Morpheus8 es excelente para la papada. A profundidades de 4mm o más, la radiofrecuencia coagula la grasa localizada mientras tensa la piel. Es una excelente alternativa no quirúrgica para definir el contorno mandibular."
    },
    {
        pregunta: "¿Cómo se compara con otros tratamientos?",
        respuesta: "A diferencia de láseres superficiales o HIFU, Morpheus8 penetra más profundo y estimula colágeno en múltiples capas. Comparado con cirugía, ofrece resultados naturales sin tiempo de inactividad significativo. Es ideal como tratamiento único o complemento de otros procedimientos."
    },
    {
        pregunta: "¿Quién NO es candidato para Morpheus8?",
        respuesta: "No recomendamos Morpheus8 si estás embarazada, tienes infecciones activas en la piel, usas isotretinoína (debes suspender 6 meses antes), tienes marcapasos o dispositivos electrónicos implantados, o trastornos de cicatrización como queloides activos."
    },
    {
        pregunta: "¿Cuánto cuesta Morpheus8 en Los Ángeles?",
        respuesta: "En Clínica Cialo una sesión de Morpheus8 facial tiene un valor entre $300.000 y $600.000, según las zonas a tratar. También existe un plan de 4 sesiones por $700.000. El valor exacto se define en la evaluación y puedes pagar en hasta 12 cuotas."
    },
    {
        pregunta: "¿Morpheus8 sirve para el cuerpo?",
        respuesta: "Sí. Con puntas de mayor profundidad se trata flacidez y textura en abdomen, brazos, muslos y rodillas, además de estrías y celulitis. El número de sesiones suele ser mayor que en el rostro."
    }
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.pregunta,
        acceptedAnswer: { "@type": "Answer", text: faq.respuesta },
    })),
};

const guia: SeccionGuia[] = [
    {
        titulo: "¿Cuánto cuesta Morpheus8 en Los Ángeles?",
        parrafos: [
            "En Clínica Cialo una sesión de Morpheus8 facial tiene un valor entre $300.000 y $600.000. La diferencia depende de las zonas que se tratan en la misma sesión: solo rostro, rostro y cuello, o rostro, cuello y papada.",
            "Como los mejores resultados se logran con varias sesiones, existe un plan de 4 sesiones por $700.000, que reduce bastante el valor de cada una. En la evaluación te indicamos cuántas sesiones necesitas y puedes pagar en hasta 12 cuotas.",
        ],
    },
    {
        titulo: "Morpheus8 vs HIFU: ¿cuál me conviene?",
        parrafos: [
            "Ambos estimulan colágeno sin cirugía, pero de forma distinta. El HIFU es ultrasonido focalizado: actúa en profundidad sin tocar la superficie de la piel, así que no hay recuperación visible y es ideal para tensar y mantener.",
            "Morpheus8 combina microagujas con radiofrecuencia y trabaja tanto la profundidad como la superficie. Por eso, además de tensar, mejora la textura, los poros y las cicatrices de acné. A cambio, tiene uno a tres días de enrojecimiento. Muchas veces se combinan en un mismo plan.",
        ],
    },
    {
        titulo: "Morpheus8 para cicatrices de acné y textura",
        parrafos: [
            "Las cicatrices de acné son una de las indicaciones donde Morpheus8 da mejores resultados. Las microagujas rompen la fibrosis que hunde la cicatriz y la radiofrecuencia estimula colágeno nuevo que rellena el fondo de la marca de forma gradual.",
            "Para cicatrices se suelen necesitar tres sesiones o más, separadas por cuatro a seis semanas. El resultado mejora durante varios meses después de la última sesión.",
        ],
    },
    {
        titulo: "Cuidados antes y después de Morpheus8",
        parrafos: [
            "Una buena preparación y los cuidados posteriores reducen la inflamación y protegen el resultado.",
        ],
        lista: [
            "Suspende retinoides y exfoliantes cinco días antes de la sesión.",
            "No tomes sol ni uses autobronceante las dos semanas previas.",
            "Las primeras 24 horas no te maquilles y lava el rostro solo con agua y un limpiador suave.",
            "Usa protector solar todos los días y evita el sol directo por una a dos semanas.",
            "Las micro-costras desaparecen solas en pocos días: no las remuevas.",
        ],
    },
    {
        titulo: "¿Quién realiza Morpheus8 en Clínica Cialo?",
        parrafos: [
            "Morpheus8 es un tratamiento médico. En Clínica Cialo lo indican y realizan el Dr. Nicolás Laucirica, la Dra. Elga Viviana Peña y la Dra. Mauriluz Atencio, que en la evaluación definen las zonas, la profundidad de las agujas y la energía según tu piel.",
        ],
    },
];

const relacionados: TratamientoRelacionado[] = [
    { titulo: "Scizer HIFU", href: "/scizer-hifu-los-angeles/", descripcion: "Ultrasonido focalizado para tensar sin recuperación visible." },
    { titulo: "Cicatrices de acné", href: "/cicatrices-acne-los-angeles/", descripcion: "Planes combinados para mejorar marcas y textura." },
    { titulo: "Sculptra", href: "/sculptra-los-angeles/", descripcion: "Bioestimulador de colágeno para recuperar firmeza y volumen." },
    { titulo: "Hydrafacial", href: "/hydrafacial-md-los-angeles/", descripcion: "Limpieza e hidratación profunda para mantener la piel." },
];

export default function Morpheus8Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Navbar transparent />

            <main className="bg-white relative overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] pt-28 pb-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Morpheus8</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-purple-500/20 text-purple-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Radiofrecuencia + Microagujas
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Morpheus<span className="text-[#b8935f]">8</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Rejuvenecimiento profundo</strong> que estimula tu propio colágeno.
                                    Microagujas + radiofrecuencia bipolar para tensar, suavizar arrugas y remodelar grasa sin cirugía.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Hasta 8mm de profundidad &nbsp; ✓ Facial y corporal &nbsp; ✓ Resultados duraderos
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Consultar precio</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">Evaluación personalizada</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20tratamiento%20Morpheus8"
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

                            {/* Qué Trata */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué Podemos Tratar?</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {queTrata.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

                {/* Cómo Funciona */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                La Ciencia
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Cómo Funciona Morpheus8?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">1. Microagujas Penetran</h3>
                                <p className="text-sm text-[#6f6a5c]">Las agujas recubiertas en oro penetran la piel hasta la profundidad programada (hasta 8mm)</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">2. RF Calienta las Capas</h3>
                                <p className="text-sm text-[#6f6a5c]">La radiofrecuencia bipolar genera calor controlado en dermis y subdermis</p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">3. Colágeno se Regenera</h3>
                                <p className="text-sm text-[#6f6a5c]">El cuerpo responde produciendo nuevo colágeno y elastina de forma natural</p>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg text-center">
                            <p className="text-[#1b1a18]">
                                <strong>Resultado:</strong> Piel más firme, suave y rejuvenecida que mejora progresivamente durante 3-6 meses.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Ventajas
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Por Qué Elegir Morpheus8?
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

                {/* Zonas de Tratamiento */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">
                                Zonas de Tratamiento
                            </h2>
                            <p className="text-[#cbcfd1]">Morpheus8 se adapta a múltiples zonas faciales y corporales</p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                            {zonasTratar.map((z, i) => (
                                <div key={i} className="bg-white/5 p-5 rounded-lg border border-white/10">
                                    <h3 className="text-white font-medium mb-1">{z.zona}</h3>
                                    <p className="text-sm text-[#cbcfd1]">{z.indicacion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Candidatos y Contraindicaciones */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    Candidatos Ideales
                                </h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Personas con flacidez leve a moderada
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Quienes buscan mejorar textura y arrugas finas
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Cicatrices de acné o quirúrgicas
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Papada o grasa facial localizada
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Quienes prefieren alternativas no quirúrgicas
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    Contraindicaciones
                                </h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Embarazo o lactancia
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Infecciones activas en la piel
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Uso de isotretinoína en últimos 6 meses
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Marcapasos o dispositivos electrónicos
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Queloides activos o trastornos de cicatrización
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Guía de contenido largo */}
                <GuiaTratamiento
                    titulo="Guía de Morpheus8 en Los Ángeles"
                    intro="Precio, comparación con HIFU, cicatrices de acné y cuidados: lo que necesitas saber antes de tu primera sesión."
                    secciones={guia}
                    relacionados={relacionados}
                />

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
                            Rejuvenece Tu Piel Desde Adentro
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación y descubre cómo Morpheus8 puede transformar tu piel estimulando tu propio colágeno.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20Morpheus8"
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
