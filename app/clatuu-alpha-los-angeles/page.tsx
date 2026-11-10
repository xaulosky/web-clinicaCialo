import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Criolipólisis Clatuu Alpha en Los Ángeles Chile | Clínica Cialo" },
    description: "Criolipólisis con Clatuu Alpha en Los Ángeles. Tecnología 360° de enfriamiento para eliminar grasa localizada sin cirugía. Reduce hasta 30% por sesión. Desde $180.000. Sin tiempo de recuperación.",
    keywords: "criolipólisis Los Ángeles, Clatuu Alpha Chile, eliminar grasa sin cirugía, criolipólisis precio, alternativa liposucción Biobío, congelar grasa localizada",
    openGraph: {
        title: "Clatuu Alpha | Criolipólisis Avanzada | Clínica Cialo Los Ángeles",
        description: "Elimina grasa localizada congelándola a -9°C. Tecnología 360° más efectiva que CoolSculpting. Desde $180.000.",
        images: ["/tecnologias/clatuu/clatuu-alpha-cialo.webp"],
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/clatuu-alpha-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/clatuu-alpha-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Criolipólisis Clatuu Alpha en Los Ángeles Chile', item: 'https://cialo.cl/clatuu-alpha-los-angeles' },
            ],
        },
        {
            "@type": "MedicalDevice",
            name: "Clatuu Alpha",
            manufacturer: {
                "@type": "Organization",
                name: "Classys Inc.",
                address: { "@type": "PostalAddress", addressCountry: "KR" }
            },
            description: "Sistema de criolipólisis con tecnología de enfriamiento 360° para eliminación no invasiva de grasa localizada."
        },
        {
            "@type": "MedicalProcedure",
            name: "Criolipólisis con Clatuu Alpha",
            alternateName: ["Criolipólisis", "Congelación de Grasa", "Fat Freezing"],
            description: "Procedimiento no invasivo que congela y elimina las células grasas de forma permanente mediante enfriamiento controlado.",
            procedureType: "Cosmetic",
            bodyLocation: "Abdomen, Flancos, Brazos, Muslos, Papada",
            howPerformed: "Aplicación de frío controlado a -9°C durante 40-60 minutos para destruir adipocitos por apoptosis.",
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
                telephone: "+56 9 8202 8473",
                priceRange: "Desde $180.000 CLP"
            }
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "¿Cuánta grasa se elimina con criolipólisis?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Cada sesión de criolipólisis con Clatuu Alpha puede reducir hasta un 30% de la grasa en la zona tratada. Los resultados son permanentes ya que las células grasas eliminadas no se regeneran."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿La criolipólisis duele?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "El procedimiento es prácticamente indoloro. Se siente una succión inicial y frío intenso los primeros minutos, pero la zona se adormece rápidamente. Puedes relajarte, leer o usar tu celular durante el tratamiento."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿Cuál es la diferencia entre Clatuu Alpha y CoolSculpting?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Clatuu Alpha utiliza tecnología de enfriamiento 360° que es un 18% más eficiente que el enfriamiento en paralelo de CoolSculpting. Además, permite tratar dos zonas simultáneamente, reduciendo el tiempo total del tratamiento."
                    }
                }
            ]
        }
    ]
};

const zonasTratables = [
    { nombre: "Abdomen", descripcion: "Grasa abdominal superior e inferior", tiempo: "50 min", icono: "M4 6h16M4 12h8m-8 6h16" },
    { nombre: "Flancos (Rollitos)", descripcion: "Acumulación lateral del abdomen", tiempo: "40 min", icono: "M12 6v6m0 0v6m0-6h6m-6 0H6" },
    { nombre: "Brazos", descripcion: "Grasa en la parte posterior del brazo", tiempo: "40 min", icono: "M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" },
    { nombre: "Muslos Internos", descripcion: "Cara interna de los muslos", tiempo: "40 min", icono: "M19 14l-7 7m0 0l-7-7m7 7V3" },
    { nombre: "Espalda", descripcion: "Grasa del sujetador o espalda baja", tiempo: "50 min", icono: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" },
    { nombre: "Papada", descripcion: "Doble mentón y cuello", tiempo: "30 min", icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
];

const ventajasClatuu = [
    {
        titulo: "Enfriamiento 360°",
        descripcion: "A diferencia de otros equipos que enfrían solo dos lados, Clatuu Alpha enfría toda la superficie del aplicador, siendo un 18% más eficiente.",
        icono: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    },
    {
        titulo: "Temperatura -9°C",
        descripcion: "Alcanza la temperatura objetivo más rápido, induciendo la apoptosis (muerte programada) de las células grasas sin dañar tejidos.",
        icono: "M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025"
    },
    {
        titulo: "Aplicadores Duales",
        descripcion: "Permite tratar dos zonas al mismo tiempo, reduciendo la duración total de la sesión a la mitad.",
        icono: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    },
    {
        titulo: "Resultados Permanentes",
        descripcion: "Las células grasas eliminadas no regresan. Una vez destruidas por el frío, el cuerpo las elimina naturalmente.",
        icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    }
];

const comparativa = [
    { caracteristica: "Tecnología de Enfriamiento", clatuu: "360° envolvente", otro: "Paralelo (2 lados)" },
    { caracteristica: "Eficiencia", clatuu: "+18% vs competencia", otro: "Estándar" },
    { caracteristica: "Tratamiento Simultáneo", clatuu: "2 zonas a la vez", otro: "1 zona por vez" },
    { caracteristica: "Reducción por Sesión", clatuu: "Hasta 30%", otro: "20-25%" },
    { caracteristica: "Tiempo de Tratamiento", clatuu: "40-60 min", otro: "60-90 min" },
    { caracteristica: "Aplicadores Ergonómicos", clatuu: "6+ tamaños específicos", otro: "Limitados" }
];

const faqs = [
    {
        pregunta: "¿Cuánta grasa puedo perder con criolipólisis?",
        respuesta: "Cada sesión de Clatuu Alpha puede reducir entre un 20-30% de la grasa en la zona tratada. El número de sesiones depende del volumen inicial y tus objetivos. La mayoría de pacientes ve resultados significativos con 1-3 sesiones por zona."
    },
    {
        pregunta: "¿Los resultados son permanentes?",
        respuesta: "Sí. La criolipólisis destruye las células grasas (adipocitos) de forma permanente mediante un proceso llamado apoptosis. Estas células son eliminadas naturalmente por el cuerpo y no se regeneran. Sin embargo, si subes de peso, las células restantes pueden aumentar de tamaño."
    },
    {
        pregunta: "¿El procedimiento duele?",
        respuesta: "La criolipólisis es prácticamente indolora. Sentirás una succión inicial cuando el aplicador se adhiere a la zona, seguida de un frío intenso los primeros 5-10 minutos. Luego la zona se adormece y puedes relajarte. Después del tratamiento puede haber sensibilidad temporal."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Los primeros cambios se notan a partir de la tercera semana. Los resultados óptimos se ven entre 2-3 meses después del tratamiento, que es el tiempo que tarda el cuerpo en eliminar las células grasas destruidas a través del sistema linfático."
    },
    {
        pregunta: "¿Qué diferencia hay entre Clatuu Alpha y CoolSculpting?",
        respuesta: "Ambos usan criolipólisis, pero Clatuu Alpha tiene tecnología de enfriamiento 360° (más uniforme y eficiente), permite tratar dos zonas simultáneamente, y alcanza un 18% más de efectividad. CoolSculpting fue pionero, pero Clatuu Alpha representa la evolución de esta tecnología."
    },
    {
        pregunta: "¿La criolipólisis es una alternativa a la liposucción?",
        respuesta: "Sí, pero para casos distintos. La criolipólisis es ideal para eliminar grasa localizada en personas con peso cercano al ideal. La liposucción permite extraer mayores volúmenes y es mejor para remodelaciones más extensas. Evaluamos cada caso para recomendar la opción más adecuada."
    },
    {
        pregunta: "¿Tiene efectos secundarios?",
        respuesta: "Los efectos secundarios son leves y temporales: enrojecimiento, hinchazón, sensibilidad y posibles hematomas en la zona tratada que desaparecen en días a semanas. No hay tiempo de recuperación: puedes volver a tus actividades normales inmediatamente."
    },
    {
        pregunta: "¿Quién NO es candidato para criolipólisis?",
        respuesta: "No recomendamos criolipólisis si tienes criopatías (urticaria por frío, crioglobulinemia), hernias en la zona a tratar, estás embarazada, tienes dispositivos electrónicos implantados en la zona, o buscas perder peso significativo (es para grasa localizada, no obesidad)."
    }
];

const precios = [
    { zona: "1 Aplicador (zona pequeña)", precio: "$180.000" },
    { zona: "2 Aplicadores (abdomen completo)", precio: "$320.000" },
    { zona: "Pack 4 Aplicadores", precio: "$580.000" },
    { zona: "Pack 6 Aplicadores", precio: "$800.000" },
    { zona: "Pack 10 Aplicadores", precio: "$1.200.000" }
];

export default function ClatuuAlphaPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Clatuu Alpha</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Tecnología 360° de Última Generación
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Clatuu <span className="text-[#b8935f]">Alpha</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    La <strong className="text-white">criolipólisis más avanzada</strong> para eliminar grasa localizada.
                                    Congela y destruye las células grasas a <strong className="text-white">-9°C</strong> sin cirugía, sin dolor y sin tiempo de recuperación.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Hasta 30% menos grasa por sesión &nbsp; ✓ Resultados permanentes &nbsp; ✓ Sin bisturí
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Desde</span>
                                    <p className="text-3xl font-bold text-[#b8935f]">$180.000 <span className="text-lg font-normal">por aplicador</span></p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20la%20criolipólisis%20con%20Clatuu%20Alpha"
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

                            {/* Zonas Tratables */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">Zonas que Tratamos</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {zonasTratables.map((zona, i) => (
                                        <div key={i} className="bg-[#1b1a18] p-4 rounded-lg">
                                            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mb-3">
                                                <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={zona.icono} />
                                                </svg>
                                            </div>
                                            <h4 className="text-white font-medium text-sm">{zona.nombre}</h4>
                                            <p className="text-xs text-[#cbcfd1]">{zona.tiempo}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video y Equipo Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Video */}
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Conoce la Tecnología
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    Clatuu Alpha en Acción
                                </h2>
                                <p className="text-[#6f6a5c] mb-6 leading-relaxed">
                                    Descubre cómo funciona la criolipólisis con Clatuu Alpha y por qué es la tecnología más avanzada para eliminar grasa localizada.
                                </p>
                                <div className="relative w-full rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src="https://www.youtube.com/embed/KYAOSg9EoaY?rel=0"
                                        title="Clatuu Alpha - Criolipólisis en Clínica Cialo"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                            {/* Imagen del Equipo */}
                            <div className="text-center">
                                <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-[#faf6ef] to-white p-8">
                                    <Image
                                        src="/tecnologias/clatuu/clatuu-alpha-cialo.webp"
                                        alt="Clatuu Alpha - Equipo de criolipólisis en Clínica Cialo"
                                        width={400}
                                        height={500}
                                        className="mx-auto object-contain"
                                    />
                                    <div className="mt-6">
                                        <p className="text-[#1b1a18] font-semibold">Clatuu Alpha</p>
                                        <p className="text-sm text-[#6f6a5c]">Classys Inc. • Corea del Sur</p>
                                    </div>
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
                                ¿Cómo Funciona la Criolipólisis?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1b1a18] font-bold text-xl">1</div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">Succión</h3>
                                <p className="text-sm text-[#6f6a5c]">El aplicador succiona el pliegue graso hacia la copa de tratamiento</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1b1a18] font-bold text-xl">2</div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">Enfriamiento 360°</h3>
                                <p className="text-sm text-[#6f6a5c]">Se enfría a -9°C, congelando las células grasas sin dañar piel ni tejidos</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1b1a18] font-bold text-xl">3</div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">Apoptosis</h3>
                                <p className="text-sm text-[#6f6a5c]">Las células grasas mueren de forma programada y natural</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1b1a18] font-bold text-xl">4</div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">Eliminación</h3>
                                <p className="text-sm text-[#6f6a5c]">El cuerpo elimina las células muertas a través del sistema linfático</p>
                            </div>
                        </div>

                        <div className="mt-12 bg-blue-50 p-6 rounded-lg text-center">
                            <p className="text-[#1b1a18]">
                                <strong>¿Por qué es efectivo?</strong> Las células grasas son más sensibles al frío que otros tejidos.
                                A -9°C, los adipocitos cristalizan y mueren, mientras la piel y músculos permanecen intactos.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Resultados Reales */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Evidencia Clínica
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Resultados Reales
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                Pacientes reales tratados con Clatuu Alpha. Los resultados pueden variar según cada paciente.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Caso 1: Espalda */}
                            <div className="group">
                                <div className="relative aspect-[4/3] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/2 relative border-r border-white/20">
                                            <Image
                                                src="/tecnologias/clatuu/espalda-antes.png"
                                                alt="Antes del tratamiento de criolipólisis en espalda"
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Antes</div>
                                        </div>
                                        <div className="w-1/2 relative">
                                            <Image
                                                src="/tecnologias/clatuu/espalda-despues.png"
                                                alt="Después del tratamiento de criolipólisis en espalda"
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute bottom-2 left-2 bg-[#b8935f] text-[#1b1a18] text-xs px-2 py-1 rounded font-bold">Después</div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-[#1b1a18] text-center">Reducción de Plieges de Espalda</h3>
                                <p className="text-sm text-[#6f6a5c] text-center">Notoria disminución del tejido adiposo en zona dorsal.</p>
                            </div>

                            {/* Caso 2: Abdomen */}
                            <div className="group">
                                <div className="relative aspect-[4/3] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/2 relative border-r border-white/20">
                                            <Image
                                                src="/tecnologias/clatuu/abdomen-antes.png"
                                                alt="Antes del tratamiento de criolipólisis en abdomen"
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Antes</div>
                                        </div>
                                        <div className="w-1/2 relative">
                                            <Image
                                                src="/tecnologias/clatuu/abdomen-despues.png"
                                                alt="Después del tratamiento de criolipólisis en abdomen"
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute bottom-2 left-2 bg-[#b8935f] text-[#1b1a18] text-xs px-2 py-1 rounded font-bold">Después</div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-[#1b1a18] text-center">Modelado Abdominal</h3>
                                <p className="text-sm text-[#6f6a5c] text-center">Reducción significativa del volumen y flacidez abdominal.</p>
                            </div>

                            {/* Caso 3: Papada (Antes/Después) */}
                            <div className="group">
                                <div className="relative aspect-[4/3] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 flex">
                                        <div className="w-1/2 relative border-r border-white/20">
                                            <Image
                                                src="/tecnologias/clatuu/papada-antes.png"
                                                alt="Antes del tratamiento de criolipólisis en papada"
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Antes</div>
                                        </div>
                                        <div className="w-1/2 relative">
                                            <Image
                                                src="/tecnologias/clatuu/papada-despues.png"
                                                alt="Después del tratamiento de criolipólisis en papada"
                                                fill
                                                className="object-contain"
                                            />
                                            <div className="absolute bottom-2 left-2 bg-[#b8935f] text-[#1b1a18] text-xs px-2 py-1 rounded font-bold">Después</div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-[#1b1a18] text-center">Definición de Mentón</h3>
                                <p className="text-sm text-[#6f6a5c] text-center">Reducción visible de grasa submentoniana y perfilado.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ventajas Clatuu Alpha */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Tecnología Superior
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Por Qué Elegir Clatuu Alpha?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {ventajasClatuu.map((v, i) => (
                                <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                                    <div className="w-14 h-14 bg-[#b8935f] rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-7 h-7 text-[#1b1a18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={v.icono} />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1b1a18] mb-2">{v.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{v.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparativa */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">
                                Clatuu Alpha vs Otros Sistemas
                            </h2>
                            <p className="text-[#cbcfd1]">Comparativa técnica objetiva</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="text-left py-4 px-4 text-[#cbcfd1] font-medium">Característica</th>
                                        <th className="text-center py-4 px-4 text-[#b8935f] font-bold">Clatuu Alpha</th>
                                        <th className="text-center py-4 px-4 text-[#cbcfd1] font-medium">Otros Equipos</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparativa.map((row, i) => (
                                        <tr key={i} className="border-b border-white/10">
                                            <td className="py-4 px-4 text-[#cbcfd1]">{row.caracteristica}</td>
                                            <td className="py-4 px-4 text-center text-white bg-white/5">{row.clatuu}</td>
                                            <td className="py-4 px-4 text-center text-[#888]">{row.otro}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Precios */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Inversión
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Precios Criolipólisis
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {precios.map((p, i) => (
                                <div key={i} className="bg-[#faf6ef] p-6 rounded-lg text-center">
                                    <h3 className="font-semibold text-[#1b1a18] mb-2">{p.zona}</h3>
                                    <p className="text-2xl font-bold text-[#b8935f]">{p.precio}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-sm text-[#6f6a5c] mt-8">
                            * Los aplicadores se adaptan a cada zona. En la evaluación determinamos cuántos necesitas según tus objetivos.
                        </p>
                    </div>
                </section>

                {/* Candidatos y Contraindicaciones */}
                <section className="py-20 bg-[#faf6ef]">
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
                                        Personas con grasa localizada resistente a dieta y ejercicio
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Peso cercano al ideal pero con acumulaciones puntuales
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Quienes buscan alternativas no quirúrgicas a la liposucción
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Personas sin tiempo para recuperación post-quirúrgica
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
                                        Criopatías (urticaria por frío, crioglobulinemia)
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Hernias en la zona a tratar
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Embarazo o lactancia
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Obesidad (no es un tratamiento para bajar de peso)
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Efectos y Cuidados (Información de Consentimiento) */}
                        <div className="grid md:grid-cols-2 gap-12 border-t border-gray-200 pt-16 mt-8">
                            <div>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Posibles Efectos Secundarios
                                </h2>
                                <p className="text-sm text-[#6f6a5c] mb-4">La criolipólisis es segura, pero puede presentar efectos transitorios que es importante conocer:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-blue-500 mt-1">●</span>
                                        <span className="text-sm"><strong>Durante la sesión:</strong> Sensación de tirón, presión, pinzamiento, hormigueo, ardor o calambres (estas sensaciones disminuyen rápidamente cuando la zona se adormece por el frío).</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-blue-500 mt-1">●</span>
                                        <span className="text-sm"><strong>Después del tratamiento:</strong> Enrojecimiento, palidez temporal, hinchazón, moretones (hematomas), sensibilidad al tacto, dolor leve, entumecimiento o picazón moderada.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-blue-500 mt-1">●</span>
                                        <span className="text-sm"><strong>Efectos muy raros:</strong> Hiperplasia adiposa paradójica (que podría requerir cirugía), dolor tardío o espasmos musculares.</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                    Indicaciones y Cuidados Posteriores
                                </h2>
                                <p className="text-sm text-[#6f6a5c] mb-4">Para asegurar el mejor resultado clínico, deberás seguir estas indicaciones:</p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-indigo-500 mt-1">✓</span>
                                        <span className="text-sm"><strong>Faja Compresiva:</strong> Uso obligatorio de por lo menos 6 horas diarias durante 45 días pos-sesión.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-indigo-500 mt-1">✓</span>
                                        <span className="text-sm"><strong>Actividad Física:</strong> Realizar actividad moderada (ej. caminar o trotar 30 min) dentro de las primeras 24 a 48 horas.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-indigo-500 mt-1">✓</span>
                                        <span className="text-sm"><strong>Precauciones:</strong> Evitar golpes, calor excesivo o masajes no indicados médicamente en la zona durante 48 horas.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-indigo-500 mt-1">✓</span>
                                        <span className="text-sm"><strong>Suplementos Clínicos Recomendados:</strong> Omega 3 (2000-3000 mg/día) para regular la inflamación, Berberina (1500 mg/día) como preventivo y Coenzima Q10 (200 mg).</span>
                                    </li>
                                </ul>
                            </div>
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
                            Despídete de la Grasa Rebelde
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación corporal gratuita y descubre cuántas sesiones necesitas para alcanzar tus objetivos.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20criolipólisis%20Clatuu%20Alpha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Evaluación — Desde $180.000
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
