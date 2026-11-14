import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GuiaTratamiento, { SeccionGuia, TratamientoRelacionado } from "@/app/components/GuiaTratamiento";

export const metadata: Metadata = {
    title: { absolute: "Scizer HIFU en Los Ángeles Chile | Clínica Cialo" },
    description: "Scizer HIFU en Los Ángeles. Ultrasonido focalizado de alta intensidad para eliminar grasa localizada sin cirugía. Tecnología Classys. Resultados desde la primera sesión. Sin tiempo de recuperación.",
    keywords: "Scizer HIFU Los Ángeles, ultrasonido focalizado Chile, reducción grasa sin cirugía, HIFU corporal Biobío, Classys Scizer, eliminar grasa abdomen",
    openGraph: {
        title: "Scizer HIFU | Elimina Grasa con Ultrasonido | Clínica Cialo Los Ángeles",
        description: "Destruye células grasas con ultrasonido focalizado. Sin cirugía, sin agujas, sin recuperación.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/scizer-hifu-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/scizer-hifu-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Scizer HIFU en Los Ángeles Chile', item: 'https://cialo.cl/scizer-hifu-los-angeles' },
            ],
        },
        {
            "@type": "MedicalDevice",
            name: "Scizer HIFU",
            manufacturer: {
                "@type": "Organization",
                name: "Classys Inc.",
                address: { "@type": "PostalAddress", addressCountry: "KR" }
            },
            description: "Sistema de ultrasonido macrofocalizado de escaneo (MFSU) para reducción no quirúrgica de grasa corporal."
        },
        {
            "@type": "MedicalProcedure",
            name: "Tratamiento Scizer HIFU",
            alternateName: ["HIFU Corporal", "Ultrasonido Focalizado para Grasa", "Liposucción sin Cirugía"],
            description: "Procedimiento no invasivo que utiliza ultrasonido focalizado de alta intensidad para destruir células grasas de forma permanente.",
            procedureType: "Cosmetic",
            bodyLocation: "Abdomen, Flancos, Espalda, Muslos, Brazos",
            howPerformed: "El ultrasonido focalizado calienta las células grasas a 75°C causando su destrucción. El cuerpo las elimina naturalmente en 8-12 semanas.",
            preparation: "Sin preparación especial. Evaluación corporal previa.",
            followup: "Resultados visibles desde la 3ra semana, óptimos a los 2-3 meses.",
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
        titulo: "Destrucción Permanente",
        descripcion: "Las células grasas calentadas a 75°C mueren y son eliminadas por el cuerpo. Una vez destruidas, no regresan.",
        icono: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    },
    {
        titulo: "Gran Área de Cobertura",
        descripcion: "El cabezal de escaneo cubre 46x46mm por disparo, permitiendo tratar zonas amplias de forma rápida y uniforme.",
        icono: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
    },
    {
        titulo: "Sistema de Enfriamiento",
        descripcion: "Contact Cooling Control protege la piel durante el tratamiento, minimizando molestias y asegurando comodidad.",
        icono: "M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025"
    },
    {
        titulo: "Sin Tiempo de Recuperación",
        descripcion: "Vuelves a tus actividades normales inmediatamente después del tratamiento. Sin cirugía, sin agujas.",
        icono: "M13 10V3L4 14h7v7l9-11h-7z"
    }
];

const zonasTratamiento = [
    { nombre: "Abdomen Superior", descripcion: "Grasa sobre el ombligo" },
    { nombre: "Abdomen Inferior", descripcion: "Grasa bajo el ombligo" },
    { nombre: "Flancos", descripcion: "Rollitos laterales" },
    { nombre: "Espalda Alta", descripcion: "Grasa del sujetador" },
    { nombre: "Espalda Baja", descripcion: "Michelines" },
    { nombre: "Muslos Externos", descripcion: "Cartucheras" },
    { nombre: "Muslos Internos", descripcion: "Cara interna" },
    { nombre: "Brazos", descripcion: "Zona posterior" }
];

const comoFunciona = [
    { paso: "1", titulo: "Focalización", descripcion: "El ultrasonido se concentra en la capa de grasa subcutánea a profundidades de 9mm o 13mm." },
    { paso: "2", titulo: "Calentamiento", descripcion: "Las células grasas se calientan a 75°C, provocando necrosis coagulativa (muerte celular)." },
    { paso: "3", titulo: "Eliminación Natural", descripcion: "El cuerpo elimina las células destruidas a través del sistema linfático en 8-12 semanas." },
    { paso: "4", titulo: "Resultado Permanente", descripcion: "Las células grasas eliminadas no se regeneran. La reducción es definitiva." }
];

const faqs = [
    {
        pregunta: "¿Qué es Scizer HIFU y cómo funciona?",
        respuesta: "Scizer es un dispositivo de ultrasonido focalizado de alta intensidad (HIFU) desarrollado por Classys (Corea del Sur). Emite ondas ultrasónicas que se focalizan en la capa de grasa subcutánea, calentando las células grasas a aproximadamente 75°C. Este calor destruye permanentemente los adipocitos sin dañar la piel ni los tejidos circundantes."
    },
    {
        pregunta: "¿El tratamiento duele?",
        respuesta: "Scizer cuenta con un sistema de enfriamiento por contacto que protege la piel y minimiza las molestias. Durante el tratamiento puedes sentir calor y una sensación de hormigueo. La mayoría de pacientes lo describe como tolerable y no requiere anestesia."
    },
    {
        pregunta: "¿Cuántas sesiones necesito?",
        respuesta: "La mayoría de pacientes obtiene resultados satisfactorios con 1-2 sesiones por zona. Si el volumen de grasa es mayor, pueden recomendarse sesiones adicionales espaciadas cada 8-12 semanas para permitir que el cuerpo elimine las células tratadas."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Los primeros cambios son visibles a partir de la tercera semana. Los resultados óptimos se aprecian entre 2-3 meses después del tratamiento, que es el tiempo que el cuerpo tarda en eliminar completamente las células grasas destruidas."
    },
    {
        pregunta: "¿Cuántos centímetros puedo perder?",
        respuesta: "Los estudios muestran una reducción promedio de 2-4 cm de circunferencia en la zona tratada después de una sesión. Los resultados varían según el volumen inicial de grasa y la respuesta individual de cada paciente."
    },
    {
        pregunta: "¿Cuál es la diferencia entre Scizer y criolipólisis?",
        respuesta: "Scizer usa ultrasonido focalizado que calienta las células grasas a 75°C, mientras la criolipólisis las congela a -9°C. Ambos destruyen las células permanentemente. Scizer tiene mayor área de cobertura por disparo y puede ser más rápido para zonas amplias. La elección depende de la zona y preferencias."
    },
    {
        pregunta: "¿Hay efectos secundarios?",
        respuesta: "Los efectos secundarios son leves y temporales: enrojecimiento, sensibilidad y posible hinchazón en la zona tratada que desaparecen en días. No hay hematomas ni tiempo de recuperación significativo."
    },
    {
        pregunta: "¿Quién NO es candidato para Scizer?",
        respuesta: "No recomendamos Scizer si estás embarazada, tienes hernias en la zona a tratar, sufres de enfermedades hepáticas o renales severas, tienes implantes metálicos en la zona, o buscas tratar obesidad (es para grasa localizada)."
    },
    {
        pregunta: "¿Cuánto cuesta Scizer HIFU en Los Ángeles?",
        respuesta: "En Clínica Cialo el tratamiento con Scizer HIFU parte desde $200.000. El valor final depende de la zona y del número de sesiones, y se define en la evaluación. Puedes pagar en hasta 12 cuotas.",
    },
    {
        pregunta: "¿Sirve para bajar de peso?",
        respuesta: "No. Scizer moldea zonas con grasa localizada que no responde a la dieta ni al ejercicio. Para bajar de peso lo indicado es un plan nutricional, que también ofrecemos en la clínica.",
    },
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
        titulo: "¿Cuánto cuesta Scizer HIFU en Los Ángeles?",
        parrafos: [
            "En Clínica Cialo el tratamiento con Scizer HIFU parte desde $200.000. El valor final depende de la zona y de su tamaño: no es lo mismo tratar el abdomen completo que los flancos o la cara interna de los brazos.",
            "En la evaluación revisamos tus zonas y te entregamos un plan con el número de sesiones y el valor total, que puedes pagar en hasta 12 cuotas.",
        ],
    },
    {
        titulo: "¿Cuántas sesiones necesito y cuándo veo resultados?",
        parrafos: [
            "Muchas personas notan cambios con una sesión por zona, pero para un resultado más marcado se suelen indicar entre dos y tres sesiones, separadas por algunas semanas.",
            "El resultado no es inmediato: el cuerpo elimina las células grasas destruidas de forma gradual, por lo que la reducción se aprecia entre las 8 y 12 semanas posteriores a cada sesión.",
        ],
    },
    {
        titulo: "Scizer HIFU vs criolipólisis vs liposucción",
        parrafos: [
            "Scizer y la criolipólisis eliminan grasa localizada sin cirugía: Scizer lo hace con calor de ultrasonido focalizado y la criolipólisis con frío. Ambos son buenas alternativas para quienes no quieren pasar por un quirófano; la elección depende de la zona y del tipo de grasa.",
            "La liposucción permite retirar más grasa en una sola intervención, pero requiere cirugía, anestesia y recuperación. Para acumulaciones puntuales en personas cerca de su peso ideal, los tratamientos no invasivos suelen ser suficientes.",
        ],
    },
    {
        titulo: "Scizer no es un tratamiento para bajar de peso",
        parrafos: [
            "Scizer está pensado para moldear zonas puntuales que no responden a la dieta ni al ejercicio, no para bajar kilos. Las células eliminadas no vuelven, pero si se sube de peso las células que quedan pueden crecer.",
            "Por eso los mejores resultados se dan cuando el tratamiento se acompaña de alimentación equilibrada, actividad física y buena hidratación. Si tu objetivo es bajar de peso, te podemos orientar con nuestro equipo de nutrición.",
        ],
    },
    {
        titulo: "¿Quién realiza Scizer HIFU en Clínica Cialo?",
        parrafos: [
            "El tratamiento lo realizan profesionales de la salud capacitadas en el equipo: las kinesiólogas Keren Matus y Katalina Neumann y la enfermera María Jesús Contreras, que en la evaluación definen las zonas y la profundidad de trabajo.",
        ],
    },
];

const relacionados: TratamientoRelacionado[] = [
    { titulo: "Clatuu Alpha", href: "/clatuu-alpha-los-angeles/", descripcion: "Criolipólisis 360° para eliminar grasa localizada con frío." },
    { titulo: "Exilis Ultra 360", href: "/exilis-ultra-360-los-angeles/", descripcion: "Radiofrecuencia y ultrasonido para flacidez y grasa." },
    { titulo: "Drenaje linfático", href: "/drenaje-linfatico-los-angeles/", descripcion: "Complementa los tratamientos corporales y reduce la retención." },
    { titulo: "Tratamientos corporales", href: "/corporal-contorno-los-angeles/", descripcion: "Todos los tratamientos de contorno de la clínica." },
];


export default function ScizerHIFUPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Scizer HIFU</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-red-500/20 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Ultrasonido Focalizado de Alta Intensidad
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Scizer <span className="text-[#b8935f]">HIFU</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Destruye grasa localizada</strong> con ultrasonido focalizado.
                                    Calienta las células grasas a 75°C para eliminarlas permanentemente, sin cirugía ni recuperación.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Resultados permanentes &nbsp; ✓ Sin agujas &nbsp; ✓ 30 min por zona
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Reducción promedio</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">2-4 cm por sesión</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20tratamiento%20Scizer%20HIFU"
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
                                        href="/corporal-contorno-los-angeles"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Otros Corporales
                                    </Link>
                                </div>
                            </div>

                            {/* Zonas */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">Zonas que Tratamos</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {zonasTratamiento.map((z, i) => (
                                        <div key={i} className="bg-[#1b1a18] p-4 rounded-lg">
                                            <h4 className="text-white font-medium text-sm">{z.nombre}</h4>
                                            <p className="text-xs text-[#cbcfd1]">{z.descripcion}</p>
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
                                ¿Cómo Funciona Scizer HIFU?
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

                        <div className="mt-12 bg-red-50 p-6 rounded-lg text-center">
                            <p className="text-[#1b1a18]">
                                <strong>¿Por qué HIFU?</strong> El ultrasonido focalizado permite tratar la grasa profunda sin afectar la piel.
                                Es como una lupa que concentra los rayos del sol: la energía se enfoca precisamente en la capa adiposa.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Por Qué Elegir Scizer HIFU?
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
                                        Grasa localizada resistente a dieta y ejercicio
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Peso cercano al ideal con acumulaciones puntuales
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Quienes buscan alternativas a la liposucción
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Personas sin tiempo para recuperación quirúrgica
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
                                        Embarazo
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Hernias en la zona a tratar
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Enfermedades hepáticas o renales severas
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Implantes metálicos en la zona
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Guía de contenido largo */}
                <GuiaTratamiento
                    titulo="Guía de Scizer HIFU en Los Ángeles"
                    intro="Precio, sesiones, resultados y cómo se compara con otros tratamientos para la grasa localizada."
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
                            Elimina la Grasa Rebelde de Forma Permanente
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación corporal y descubre cómo Scizer HIFU puede ayudarte a esculpir tu figura sin cirugía.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20Scizer%20HIFU"
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
