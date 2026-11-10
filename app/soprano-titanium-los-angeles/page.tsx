import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Soprano Titanium en Los Ángeles | Clínica Cialo" },
    description: "Depilación láser definitiva con Soprano Titanium en Los Ángeles. Tecnología 3D con triple longitud de onda (755nm, 810nm, 1064nm). Indolora, segura para todo tipo de piel. ICE Plus cooling. Desde $14.400 por sesión.",
    keywords: "soprano titanium Los Ángeles, depilación láser indolora, laser diodo Chile, depilación definitiva Biobío, soprano ice, alma lasers Chile, depilación 3D, laser alexandrita diodo ndyag",
    openGraph: {
        title: "Soprano Titanium | Depilación Láser Premium | Clínica Cialo Los Ángeles",
        description: "La tecnología de depilación láser más avanzada del mundo. Triple longitud de onda, sistema de enfriamiento ICE Plus, apta para todo tipo de piel.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/soprano-titanium-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/soprano-titanium-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Depilación Láser Soprano Titanium en Los Ángeles Chile', item: 'https://cialo.cl/soprano-titanium-los-angeles' },
            ],
        },
        {
            "@type": "MedicalDevice",
            name: "Soprano Titanium",
            manufacturer: {
                "@type": "Organization",
                name: "Alma Lasers",
            },
            description: "Sistema de depilación láser con tecnología 3D que combina tres longitudes de onda (755nm, 810nm, 1064nm) para tratamiento efectivo en todo tipo de piel.",
        },
        {
            "@type": "MedicalBusiness",
            name: "Clínica Cialo - Depilación Láser Soprano Titanium",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Bulnes 220, Of. 509",
                addressLocality: "Los Ángeles",
                addressRegion: "Biobío",
                addressCountry: "CL",
            },
            telephone: "+56982028473",
            priceRange: "Desde $14.400",
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "¿Por qué Soprano Titanium es indolora?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Soprano Titanium utiliza la tecnología ICE Plus que mantiene la piel fría durante todo el tratamiento, junto con el sistema In-Motion que aplica pulsos graduales de baja energía, eliminando el dolor típico de otros láseres.",
                    },
                },
                {
                    "@type": "Question",
                    name: "¿Soprano Titanium funciona en piel morena?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Sí. Gracias a su triple longitud de onda y especialmente el láser Nd:YAG de 1064nm, Soprano Titanium es seguro y efectivo para fototipos I a VI, incluyendo pieles morenas y oscuras.",
                    },
                },
                {
                    "@type": "Question",
                    name: "¿Cuántas sesiones necesito con Soprano Titanium?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Generalmente se recomiendan 6-8 sesiones espaciadas cada 4-6 semanas. El número exacto depende de la zona, el color del vello y las características individuales de cada paciente.",
                    },
                },
            ],
        },
    ],
};

const longitudesOnda = [
    {
        nm: "755nm",
        nombre: "Alexandrita",
        color: "bg-purple-500",
        caracteristica: "Vello fino y claro",
        descripcion: "Máxima absorción de melanina. Ideal para vello claro y fino. Penetra el bulge del folículo.",
    },
    {
        nm: "810nm",
        nombre: "Diodo",
        color: "bg-red-500",
        caracteristica: "Estándar de oro",
        descripcion: "Penetración profunda con absorción moderada. El clásico de la depilación láser. Trata bulge y bulbo.",
    },
    {
        nm: "1064nm",
        nombre: "Nd:YAG",
        color: "bg-orange-600",
        caracteristica: "Pieles oscuras",
        descripcion: "Menor absorción de melanina, máxima penetración. Seguro para pieles morenas. Alcanza bulbo y papila.",
    },
];

const ventajasVsCompetencia = [
    {
        caracteristica: "Longitudes de onda",
        soprano: "3 simultáneas (755, 810, 1064nm)",
        otros: "1 sola longitud de onda",
    },
    {
        caracteristica: "Sistema de enfriamiento",
        soprano: "ICE Plus continuo durante todo el pulso",
        otros: "Enfriamiento básico o spray criogénico",
    },
    {
        caracteristica: "Método de aplicación",
        soprano: "In-Motion (deslizamiento continuo)",
        otros: "Disparo por disparo (stamping)",
    },
    {
        caracteristica: "Dolor durante el tratamiento",
        soprano: "Prácticamente indoloro",
        otros: "Moderado a intenso",
    },
    {
        caracteristica: "Tipos de piel",
        soprano: "Fototipos I a VI (todas las pieles)",
        otros: "Limitado a fototipos claros",
    },
    {
        caracteristica: "Velocidad de tratamiento",
        soprano: "Hasta 3x más rápido",
        otros: "Tratamiento estándar",
    },
];

const faqs = [
    {
        pregunta: "¿Por qué Soprano Titanium es considerado indoloro?",
        respuesta: "Soprano Titanium combina tres tecnologías para eliminar el dolor: (1) ICE Plus, un sistema de enfriamiento que mantiene la punta del aplicador a 0°C durante todo el tratamiento; (2) In-Motion, que aplica múltiples pulsos de baja energía en movimiento continuo en lugar de disparos únicos de alta energía; y (3) la tecnología 3D que distribuye la energía en diferentes profundidades. El resultado es un tratamiento que la mayoría de pacientes describe como un masaje tibio.",
    },
    {
        pregunta: "¿Es seguro para mi tipo de piel?",
        respuesta: "Soprano Titanium es el único láser aprobado para tratar todos los fototipos de piel, desde la más clara (I) hasta la más oscura (VI). Esto es posible gracias a su longitud de onda Nd:YAG de 1064nm, que tiene menor absorción de melanina epidérmica, reduciendo el riesgo de quemaduras o hiperpigmentación en pieles morenas.",
    },
    {
        pregunta: "¿Cuántas sesiones necesito para ver resultados permanentes?",
        respuesta: "El protocolo estándar es de 6-8 sesiones espaciadas cada 4-6 semanas. Después de la primera sesión ya notarás una reducción del 20-30% del vello. La cantidad exacta depende de la zona (el rostro puede requerir más sesiones que las piernas), el color y grosor del vello, y factores hormonales individuales.",
    },
    {
        pregunta: "¿Puedo depilarme con Soprano si tengo vello claro o rubio?",
        respuesta: "El vello rubio, rojo o blanco tiene menos melanina, lo que dificulta su tratamiento con cualquier láser. Sin embargo, la longitud de onda Alexandrita (755nm) del Soprano Titanium tiene la mayor absorción de melanina del mercado, lo que permite tratar vellos más claros que otros sistemas. En la evaluación inicial determinamos si eres candidata.",
    },
    {
        pregunta: "¿Qué diferencia hay entre Soprano Titanium y otros láseres como Alexandrita o Diodo?",
        respuesta: "Los láseres tradicionales usan una sola longitud de onda (solo Alexandrita O solo Diodo). Soprano Titanium combina las tres principales longitudes de onda (Alexandrita 755nm, Diodo 810nm y Nd:YAG 1064nm) simultáneamente, atacando el folículo piloso en todas sus profundidades. Además, su sistema ICE Plus lo hace significativamente menos doloroso que los láseres convencionales.",
    },
    {
        pregunta: "¿Cuánto dura cada sesión?",
        respuesta: "Gracias a la tecnología In-Motion que permite deslizar el aplicador continuamente, los tratamientos son muy rápidos: axilas en 5-10 minutos, piernas completas en 30-45 minutos, y un cuerpo completo en aproximadamente 60-90 minutos.",
    },
    {
        pregunta: "¿Qué cuidados debo tener antes y después de la sesión?",
        respuesta: "Antes: No exponerse al sol ni usar autobronceadores 2 semanas antes. No depilarse con cera ni pinzas (solo rasurar). El día de la sesión, venir con la zona rasurada y sin cremas. Después: Evitar el sol directo por 1-2 semanas. No usar productos irritantes por 48 horas. Aplicar hidratante si hay sequedad.",
    },
];

const zonasYprecios = [
    { zona: "Axilas", precio: "$17.600", pack: "$78.000 (6 sesiones)" },
    { zona: "Rebaje Bikini", precio: "$17.600", pack: "$84.000 (6 sesiones)" },
    { zona: "Rebaje Completo + Interglúteo", precio: "$24.000", pack: "$144.000 (6 sesiones)" },
    { zona: "Piernas Completas", precio: "$60.000", pack: "$300.000 (6 sesiones)" },
    { zona: "Bozo", precio: "$14.400", pack: "$72.000 (8 sesiones)" },
    { zona: "Cuerpo Completo Full", precio: "$130.000", pack: "$624.000 (6 sesiones)" },
];

export default function SopranoTitaniumPage() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Soprano Titanium</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-[#b8935f]/20 text-[#b8935f] px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    Tecnología Premium de Alma Lasers
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Soprano <span className="text-[#b8935f]">Titanium</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    La <strong className="text-white">depilación láser más avanzada del mundo</strong>.
                                    Triple longitud de onda, sistema de enfriamiento ICE Plus y tecnología In-Motion para una experiencia <strong className="text-white">prácticamente indolora</strong>.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ 3 longitudes de onda &nbsp; ✓ Todo tipo de piel &nbsp; ✓ Sin dolor
                                </p>

                                {/* Precio destacado */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Desde</span>
                                    <p className="text-3xl font-bold text-[#b8935f]">$14.400 <span className="text-lg font-normal">por sesión</span></p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20la%20depilación%20láser%20con%20Soprano%20Titanium"
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
                                        href="/depilacion-laser-los-angeles"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver Zonas y Precios
                                    </Link>
                                </div>
                            </div>

                            {/* Info Box - Tecnología 3D */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">Tecnología 3D: Triple Longitud de Onda</h2>
                                <p className="text-[#cbcfd1] mb-6 leading-relaxed">
                                    Soprano Titanium es el único láser que combina <strong className="text-white">tres longitudes de onda simultáneamente</strong>, atacando el folículo piloso en todas sus profundidades para una depilación más efectiva y segura.
                                </p>
                                <div className="space-y-4">
                                    {longitudesOnda.map((lon, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className={`w-12 h-12 ${lon.color} rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                                                {lon.nm}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{lon.nombre}</h4>
                                                <p className="text-sm text-[#cbcfd1]">{lon.caracteristica}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Video */}
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Conoce la Tecnología
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    María Jesús Contreras te Explica el Soprano Titanium
                                </h2>
                                <p className="text-[#6f6a5c] mb-6 leading-relaxed">
                                    Descubre de la mano de nuestra especialista cómo funciona la tecnología Soprano Titanium y por qué es la mejor opción para tu depilación definitiva.
                                </p>
                                <div className="relative w-full rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src="https://www.youtube.com/embed/1MH4EoIrMWs?rel=0"
                                        title="Soprano Titanium - Clínica Cialo"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            </div>
                            {/* Imagen de la Máquina */}
                            <div className="text-center">
                                <div className="relative rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-[#faf6ef] to-white p-8">
                                    <Image
                                        src="/tecnologias/Soprano-Titanium-cialo.png"
                                        alt="Soprano Titanium - Equipo de depilación láser en Clínica Cialo"
                                        width={400}
                                        height={500}
                                        className="mx-auto object-contain"
                                    />
                                    <div className="mt-6">
                                        <p className="text-[#1b1a18] font-semibold">Soprano Titanium</p>
                                        <p className="text-sm text-[#6f6a5c]">Alma Lasers • Israel</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Por qué Soprano Titanium */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                ¿Por Qué Elegirlo?
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Qué Hace Único al Soprano Titanium?
                            </h2>
                            <p className="text-[#6f6a5c] max-w-3xl mx-auto">
                                Desarrollado por Alma Lasers (Israel), Soprano Titanium representa la evolución máxima en tecnología de depilación láser, combinando innovaciones que ningún otro equipo ofrece.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-[#faf6ef] p-8 rounded-sm">
                                <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#1b1a18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-[#1b1a18] mb-3">ICE Plus Cooling</h3>
                                <p className="text-[#6f6a5c]">
                                    Sistema de enfriamiento continuo que mantiene la punta del aplicador a 0°C durante todo el tratamiento. No solo enfría antes del pulso, sino <strong>durante</strong> todo el proceso.
                                </p>
                            </div>
                            <div className="bg-[#faf6ef] p-8 rounded-sm">
                                <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#1b1a18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-[#1b1a18] mb-3">Tecnología In-Motion</h3>
                                <p className="text-[#6f6a5c]">
                                    En lugar de disparos individuales de alta energía ("stamping"), el láser se desliza continuamente sobre la piel aplicando pulsos de baja energía. Resultado: <strong>cero dolor</strong>.
                                </p>
                            </div>
                            <div className="bg-[#faf6ef] p-8 rounded-sm">
                                <div className="w-16 h-16 bg-[#b8935f] rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#1b1a18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-[#1b1a18] mb-3">3 Wavelengths en 1</h3>
                                <p className="text-[#6f6a5c]">
                                    Combina Alexandrita (755nm), Diodo (810nm) y Nd:YAG (1064nm) para tratar <strong>todos los fototipos de piel</strong> y diferentes tipos de vello en una sola sesión.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cómo funciona la tecnología 3D */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Ciencia Detrás del Láser
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                ¿Cómo Funcionan las 3 Longitudes de Onda?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {longitudesOnda.map((lon, i) => (
                                <div key={i} className="bg-white p-8 rounded-sm shadow-sm">
                                    <div className={`w-20 h-20 ${lon.color} rounded-full flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto`}>
                                        {lon.nm}
                                    </div>
                                    <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] text-center mb-2">{lon.nombre}</h3>
                                    <p className="text-[#b8935f] text-center text-sm font-medium mb-4">{lon.caracteristica}</p>
                                    <p className="text-[#6f6a5c] text-center">{lon.descripcion}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-[#1b1a18] p-8 rounded-lg text-center">
                            <p className="text-[#cbcfd1] text-lg">
                                <strong className="text-[#b8935f]">¿El resultado?</strong> Al atacar el folículo piloso en <strong className="text-white">múltiples profundidades simultáneamente</strong>, se logra una destrucción más completa del vello, con menos sesiones y resultados más duraderos que los láseres de una sola longitud de onda.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Comparativa vs Otros Láseres */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">
                                Soprano Titanium vs Otros Láseres
                            </h2>
                            <p className="text-[#cbcfd1]">Comparativa objetiva con tecnologías tradicionales</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="text-left py-4 px-4 text-[#cbcfd1] font-medium">Característica</th>
                                        <th className="text-center py-4 px-4 text-[#b8935f] font-bold">Soprano Titanium</th>
                                        <th className="text-center py-4 px-4 text-[#cbcfd1] font-medium">Láser Tradicional</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ventajasVsCompetencia.map((row, i) => (
                                        <tr key={i} className="border-b border-white/10">
                                            <td className="py-4 px-4 text-[#cbcfd1]">{row.caracteristica}</td>
                                            <td className="py-4 px-4 text-center text-white bg-white/5">{row.soprano}</td>
                                            <td className="py-4 px-4 text-center text-[#888]">{row.otros}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Zonas y Precios Destacados */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Inversión
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Zonas Más Populares
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {zonasYprecios.map((zona, i) => (
                                <div key={i} className="bg-[#faf6ef] p-6 rounded-sm">
                                    <h3 className="font-semibold text-[#1b1a18] mb-2">{zona.zona}</h3>
                                    <p className="text-2xl font-bold text-[#b8935f] mb-1">{zona.precio}</p>
                                    <p className="text-sm text-[#6f6a5c]">Pack: {zona.pack}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-8">
                            <Link
                                href="/depilacion-laser-los-angeles"
                                className="text-[#b8935f] font-semibold hover:underline"
                            >
                                Ver todas las zonas y precios →
                            </Link>
                        </div>
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
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-[#6f6a5c]">Cualquier fototipo de piel (I a VI)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-[#6f6a5c]">Vello oscuro, castaño o negro</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-[#6f6a5c]">Personas que buscan depilación permanente</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-[#6f6a5c]">Quienes han tenido malas experiencias con otros láseres</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-[#6f6a5c]">Personas con piel sensible que buscan un tratamiento indoloro</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                    Contraindicaciones
                                </h2>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">✕</span>
                                        <span className="text-[#6f6a5c]">Embarazo y lactancia</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">✕</span>
                                        <span className="text-[#6f6a5c]">Bronceado reciente (esperar 2 semanas)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">✕</span>
                                        <span className="text-[#6f6a5c]">Vello blanco, rubio claro o pelirrojo (baja melanina)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">✕</span>
                                        <span className="text-[#6f6a5c]">Uso de isotretinoína (Roacutan) en los últimos 6 meses</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">✕</span>
                                        <span className="text-[#6f6a5c]">Herpes activo, infecciones o heridas en la zona</span>
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
                            Experimenta la Depilación Láser sin Dolor
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación gratuita y descubre por qué Soprano Titanium es la elección de quienes exigen lo mejor en depilación definitiva.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20depilación%20láser%20Soprano%20Titanium"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Evaluación Gratis
                            </a>
                            <Link
                                href="/depilacion-laser-los-angeles"
                                className="inline-flex items-center justify-center gap-2 border-2 border-[#1b1a18] text-[#1b1a18] px-10 py-5 font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-colors"
                            >
                                Ver Todas las Zonas
                            </Link>
                        </div>
                        <p className="mt-8 text-[#1b1a18]/60 text-sm">
                            📍 Bulnes 220, Of. 509 — Edificio Puerto Mayor II, Los Ángeles, Biobío • +56 9 8202 8473
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
