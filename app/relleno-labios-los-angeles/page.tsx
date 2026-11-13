import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GuiaTratamiento, { SeccionGuia, TratamientoRelacionado } from "@/app/components/GuiaTratamiento";

export const metadata: Metadata = {
    title: { absolute: "Relleno de Labios en Los Ángeles Chile | Clínica Cialo" },
    description: "Relleno de labios con ácido hialurónico en Los Ángeles. Volumen natural, definición del contorno y corrección de asimetrías. Resultados inmediatos que duran 6-12 meses. Sin cirugía.",
    keywords: "relleno labios Los Ángeles, ácido hialurónico labios Chile, aumento labios natural, perfilado labios Biobío, russian lips, labios naturales",
    openGraph: {
        title: "Relleno de Labios | Ácido Hialurónico Natural | Clínica Cialo Los Ángeles",
        description: "Labios más definidos, hidratados y con volumen natural. Resultados inmediatos. Duración 6-12 meses.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/relleno-labios-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/relleno-labios-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Relleno de Labios en Los Ángeles Chile', item: 'https://cialo.cl/relleno-labios-los-angeles' },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Relleno de Labios con Ácido Hialurónico",
            alternateName: ["Aumento de Labios", "Lip Filler", "Perfilado Labial"],
            description: "Tratamiento estético que utiliza ácido hialurónico para aportar volumen, definición e hidratación a los labios de forma natural y reversible.",
            procedureType: "Cosmetic",
            bodyLocation: "Labios",
            howPerformed: "Microinyecciones de ácido hialurónico en distintas zonas del labio según técnica elegida (lineal, Russian Lips, volumización).",
            preparation: "Evaluación previa. Evitar anticoagulantes 48h antes.",
            followup: "Resultados inmediatos. Duración de 6-12 meses según metabolismo.",
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

const quePodemosLograr = [
    { titulo: "Volumen Natural", descripcion: "Labios más carnosos manteniendo proporciones armónicas con tu rostro" },
    { titulo: "Definición del Contorno", descripcion: "Perfilado del arco de Cupido y borde labial para una sonrisa más definida" },
    { titulo: "Corrección de Asimetrías", descripcion: "Equilibrio entre labio superior e inferior o corrección de irregularidades" },
    { titulo: "Hidratación Profunda", descripcion: "El ácido hialurónico atrae agua, mejorando la hidratación y color natural" },
    { titulo: "Elevación de Comisuras", descripcion: "Corrección de comisuras caídas para una expresión más positiva" },
    { titulo: "Rejuvenecimiento", descripcion: "Recuperación del volumen perdido por el envejecimiento" }
];

const tecnicas = [
    {
        nombre: "Perfilado Clásico",
        descripcion: "Definición sutil del borde labial y arco de Cupido. Ideal para quienes buscan resultados discretos y naturales.",
        ideal: "Labios bien proporcionados que solo necesitan definición"
    },
    {
        nombre: "Volumización Natural",
        descripcion: "Aumento moderado del volumen manteniendo las proporciones naturales del labio.",
        ideal: "Labios finos que desean más proyección"
    },
    {
        nombre: "Russian Lips (Modificada)",
        descripcion: "Técnica que eleva el arco de Cupido y proyecta hacia arriba. Aplicada suavemente para un look definido pero natural.",
        ideal: "Labios que buscan definición sin exceso de volumen"
    },
    {
        nombre: "Hidratación Labial",
        descripcion: "Ácido hialurónico de baja densidad para hidratar y mejorar la textura sin cambiar el volumen.",
        ideal: "Labios deshidratados, con líneas finas o código de barras"
    }
];

const faqs = [
    {
        pregunta: "¿Cuánto dura el relleno de labios?",
        respuesta: "El efecto dura entre 6 y 12 meses, dependiendo del producto utilizado, la técnica de aplicación y tu metabolismo individual. Los labios son una zona de mucho movimiento (hablar, comer, besar), lo que acelera la reabsorción del ácido hialurónico."
    },
    {
        pregunta: "¿El procedimiento duele?",
        respuesta: "Aplicamos crema anestésica tópica 15-20 minutos antes del procedimiento. Además, los productos de ácido hialurónico que utilizamos contienen lidocaína. La mayoría de pacientes describe una molestia leve y tolerable."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Los resultados son inmediatos, aunque puede haber algo de hinchazón los primeros 2-3 días. El resultado definitivo se aprecia a los 7-10 días, cuando la inflamación ha cedido completamente."
    },
    {
        pregunta: "¿Puedo lograr labios naturales?",
        respuesta: "Absolutamente. En Clínica Cialo priorizamos los resultados naturales. Trabajamos respetando tus proporciones faciales y preferimos un enfoque progresivo: es mejor quedarse algo corto que excederse. Siempre puedes agregar más producto."
    },
    {
        pregunta: "¿Qué pasa si no me gusta el resultado?",
        respuesta: "Una gran ventaja del ácido hialurónico es que es reversible. Existe una enzima llamada hialuronidasa que puede disolver el producto si el resultado no es satisfactorio. Sin embargo, esto rara vez es necesario."
    },
    {
        pregunta: "¿Cuánto producto necesito?",
        respuesta: "Depende de tu anatomía y objetivos. Para un aumento sutil, 0.5-1 ml suele ser suficiente. Para mayor volumen o correcciones significativas, pueden necesitarse 1-2 ml. Evaluamos en consulta y planificamos según tus expectativas."
    },
    {
        pregunta: "¿Hay efectos secundarios?",
        respuesta: "Los efectos secundarios son generalmente leves y temporales: hinchazón, enrojecimiento y posibles pequeños hematomas que desaparecen en 3-7 días. Evita alcohol, ejercicio intenso y exposición solar excesiva las primeras 48 horas."
    },
    {
        pregunta: "¿Quién realiza el procedimiento?",
        respuesta: "El relleno de labios en Clínica Cialo es realizado por el Dr. Nicolás Laucirica, médico cirujano especializado en medicina estética facial con formación en anatomía facial en Harvard University."
    },
    {
        pregunta: "¿Cuánto cuesta el relleno de labios en Los Ángeles?",
        respuesta: "En Clínica Cialo el relleno de labios con ácido hialurónico tiene un valor entre $180.000 y $240.000, según la cantidad de producto y la técnica. El valor exacto se define en la evaluación y puedes pagar en hasta 12 cuotas."
    },
    {
        pregunta: "¿Cada cuánto hay que retocar el relleno?",
        respuesta: "Como el ácido hialurónico se reabsorbe de forma gradual, la mayoría de las pacientes hace un retoque cada 8 a 12 meses. Al mantenerlo en el tiempo, muchas veces se necesita menos producto en cada sesión."
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
        titulo: "¿Cuánto cuesta el relleno de labios con ácido hialurónico?",
        parrafos: [
            "En Clínica Cialo el valor está entre $180.000 y $240.000. La diferencia depende principalmente de la cantidad de ácido hialurónico (media jeringa o una jeringa completa) y de la técnica que se usa según tu objetivo: perfilado, volumen o hidratación.",
            "En la evaluación médica recibes el presupuesto exacto antes de decidir, y puedes pagar en hasta 12 cuotas.",
        ],
    },
    {
        titulo: "¿Cuánto ácido hialurónico se necesita? Media jeringa o 1 ml",
        parrafos: [
            "Para una primera vez con un objetivo sutil, entre 0,5 y 1 ml suele ser suficiente. Labios muy finos o que buscan un cambio más notorio pueden necesitar más producto, idealmente repartido en dos sesiones para que los tejidos se adapten y el resultado sea natural.",
            "Más producto no significa mejor resultado. Un buen relleno respeta la proporción entre el labio superior y el inferior y la armonía con el resto del rostro.",
        ],
    },
    {
        titulo: "Cuidados antes y después del relleno de labios",
        parrafos: [
            "La hinchazón de los primeros días es normal y no representa el resultado final. Estas indicaciones ayudan a que el producto se asiente bien y a reducir los hematomas.",
        ],
        lista: [
            "Evita alcohol, aspirina y antiinflamatorios dos días antes, salvo indicación médica.",
            "Si tienes herpes labial recurrente, avísale al médico: puede indicarte un tratamiento preventivo.",
            "Las primeras 24 horas no presiones ni masajees los labios y evita el maquillaje en la zona.",
            "No hagas ejercicio intenso, sauna ni exposición al sol fuerte por 48 horas.",
            "Puedes aplicar frío envuelto en un paño si hay hinchazón.",
        ],
    },
    {
        titulo: "¿Quién no debería hacerse un relleno de labios?",
        parrafos: [
            "El tratamiento no se recomienda durante el embarazo o la lactancia, con infecciones activas o herpes en la zona, ni en personas con alergia conocida a alguno de los componentes. Las enfermedades autoinmunes o el uso de anticoagulantes no siempre lo impiden, pero requieren una evaluación más cuidadosa.",
        ],
    },
    {
        titulo: "Cómo lograr labios naturales y evitar el exceso",
        parrafos: [
            "Los resultados poco naturales suelen deberse a demasiado producto en una sola sesión o a técnicas que no consideran la anatomía. En Clínica Cialo trabajamos de forma progresiva: es preferible quedarse algo corto en la primera sesión y completar en el control que sobrecorregir.",
            "Y si el resultado no te gusta, el ácido hialurónico es reversible: se puede disolver con una enzima llamada hialuronidasa.",
        ],
    },
];

const relacionados: TratamientoRelacionado[] = [
    { titulo: "Toxina botulínica", href: "/toxina-botulinica-tercio-superior-los-angeles/", descripcion: "Suaviza arrugas de frente, entrecejo y patas de gallo." },
    { titulo: "Relleno de ojeras", href: "/relleno-ojeras-los-angeles/", descripcion: "Ácido hialurónico para el surco y la mirada cansada." },
    { titulo: "Rinomodelación", href: "/rinomodelacion-los-angeles/", descripcion: "Corrige el perfil de la nariz sin cirugía." },
    { titulo: "Estética facial", href: "/estetica-facial-en-los-angeles/", descripcion: "Todos los tratamientos faciales de la clínica." },
];

export default function RellenoLabiosPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Relleno de Labios</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-pink-500/20 text-pink-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    Ácido Hialurónico Premium
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Relleno de <span className="text-[#b8935f]">Labios</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    Labios más <strong className="text-white">definidos, hidratados y con volumen natural</strong>.
                                    Ácido hialurónico de alta calidad para resultados armónicos que respetan tu belleza única.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Resultados inmediatos &nbsp; ✓ Reversible &nbsp; ✓ Duración 6-12 meses
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Procedimiento</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">15-30 minutos</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20relleno%20de%20labios"
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

                            {/* Qué Podemos Lograr */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué Podemos Lograr?</h2>
                                <div className="grid gap-4">
                                    {quePodemosLograr.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-pink-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <h4 className="text-white font-medium text-sm">{item.titulo}</h4>
                                                <p className="text-xs text-[#cbcfd1]">{item.descripcion}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Técnicas */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Personalización
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Técnicas Adaptadas a Ti
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                No existe una técnica única. Elegimos el enfoque según la forma de tu labio,
                                tus proporciones faciales y el resultado que deseas.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {tecnicas.map((t, i) => (
                                <div key={i} className="bg-[#faf6ef] p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-[#1b1a18] mb-2">{t.nombre}</h3>
                                    <p className="text-[#6f6a5c] mb-4">{t.descripcion}</p>
                                    <p className="text-sm text-pink-600 font-medium">Ideal para: {t.ideal}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Nuestro Enfoque */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Nuestra Filosofía
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    Resultados Naturales, Siempre
                                </h2>
                                <p className="text-[#6f6a5c] mb-4 leading-relaxed">
                                    En Clínica Cialo creemos que los mejores labios son aquellos que lucen <strong>como tuyos, solo mejorados</strong>.
                                    Evitamos el aspecto artificial o excesivo que ha dado mala fama a este tratamiento.
                                </p>
                                <p className="text-[#6f6a5c] mb-6 leading-relaxed">
                                    Nuestro enfoque es progresivo: preferimos resultados sutiles que puedes ir aumentando con el tiempo,
                                    en lugar de cambios drásticos en una sola sesión.
                                </p>
                                <div className="bg-pink-50 p-4 rounded-lg">
                                    <p className="text-[#1b1a18] text-sm">
                                        <strong>El Dr. Nicolás Laucirica</strong> cuenta con formación especializada en anatomía facial
                                        de Harvard University, lo que garantiza resultados seguros y armónicos.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-lg shadow-sm">
                                <h3 className="font-semibold text-[#1b1a18] mb-4">Nuestros Principios:</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        <span className="text-[#6f6a5c]">Respetamos tus proporciones naturales</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        <span className="text-[#6f6a5c]">Menos es más: enfoque progresivo</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        <span className="text-[#6f6a5c]">Solo productos premium certificados</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        <span className="text-[#6f6a5c]">Reversible si no estás satisfecha</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Guía de contenido largo */}
                <GuiaTratamiento
                    titulo="Guía del relleno de labios en Los Ángeles"
                    intro="Precio, cantidad de producto, cuidados y cómo lograr un resultado natural."
                    secciones={guia}
                    relacionados={relacionados}
                />

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
                            Labios que Realzan Tu Sonrisa
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación y conversemos sobre tus expectativas. Juntos diseñaremos el look perfecto para ti.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20relleno%20de%20labios"
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
