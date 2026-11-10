import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Exilis Ultra 360 en Los Ángeles Chile | Clínica Cialo" },
    description: "Exilis Ultra 360 en Los Ángeles. Tratamiento de radiofrecuencia y ultrasonido para tensar piel, reducir grasa y estimular colágeno. Sin cirugía, sin dolor. Aprobado FDA. Facial y corporal.",
    keywords: "Exilis Ultra 360 Los Ángeles, radiofrecuencia ultrasonido Chile, tensado piel sin cirugía, BTL Exilis, reducción grasa Biobío, lifting no quirúrgico",
    openGraph: {
        title: "Exilis Ultra 360 | RF + Ultrasonido | Clínica Cialo Los Ángeles",
        description: "Tensa la piel y reduce grasa con RF monopolar + ultrasonido. Aprobado FDA. Sin dolor ni recuperación.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/exilis-ultra-360-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/exilis-ultra-360-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Exilis Ultra 360 en Los Ángeles Chile', item: 'https://cialo.cl/exilis-ultra-360-los-angeles' },
            ],
        },
        {
            "@type": "MedicalDevice",
            name: "Exilis Ultra 360",
            manufacturer: {
                "@type": "Organization",
                name: "BTL Industries",
                address: { "@type": "PostalAddress", addressCountry: "US" }
            },
            description: "Sistema de radiofrecuencia monopolar y ultrasonido para tratamientos estéticos faciales y corporales, aprobado por la FDA."
        },
        {
            "@type": "MedicalProcedure",
            name: "Tratamiento Exilis Ultra 360",
            alternateName: ["Radiofrecuencia BTL", "Tensado de Piel No Quirúrgico", "RF + Ultrasonido"],
            description: "Procedimiento no invasivo que combina radiofrecuencia monopolar y ultrasonido para tensar la piel, reducir grasa localizada y estimular la producción de colágeno.",
            procedureType: "Cosmetic",
            bodyLocation: "Rostro, Cuello, Abdomen, Brazos, Muslos, Glúteos",
            howPerformed: "Aplicación de energía de radiofrecuencia y ultrasonido mediante un aplicador que calienta las capas profundas de la piel de forma controlada.",
            preparation: "Sin preparación especial requerida.",
            followup: "Resultados progresivos. Se recomiendan 4-6 sesiones cada 1-2 semanas.",
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
                    name: "¿Qué es Exilis Ultra 360?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Exilis Ultra 360 es un dispositivo aprobado por la FDA que combina radiofrecuencia monopolar y ultrasonido para tensar la piel, reducir grasa localizada y estimular la producción de colágeno sin cirugía."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿Cuántas sesiones de Exilis se necesitan?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Generalmente se recomiendan 4-6 sesiones espaciadas cada 1-2 semanas para resultados óptimos. Cada sesión dura aproximadamente 30 minutos."
                    }
                }
            ]
        }
    ]
};

const beneficios = [
    {
        titulo: "Doble Tecnología",
        descripcion: "Combina radiofrecuencia monopolar con ultrasonido para tratar tanto la piel como la grasa subcutánea en un solo procedimiento.",
        icono: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    },
    {
        titulo: "Sin Dolor ni Recuperación",
        descripcion: "El tratamiento se siente como un masaje caliente. Puedes retomar tus actividades inmediatamente después.",
        icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    },
    {
        titulo: "Aprobado FDA",
        descripcion: "Certificado por la FDA de Estados Unidos para tratamientos de tensado de piel y reducción de grasa.",
        icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    },
    {
        titulo: "Resultados Duraderos",
        descripcion: "Estimula la producción de nuevo colágeno y elastina. Los resultados mejoran progresivamente y duran meses.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    }
];

const zonasTratamiento = [
    { nombre: "Rostro", indicacion: "Flacidez, arrugas, contorno" },
    { nombre: "Párpados", indicacion: "Piel flácida, bolsas" },
    { nombre: "Cuello", indicacion: "Bandas, flacidez" },
    { nombre: "Papada", indicacion: "Doble mentón" },
    { nombre: "Brazos", indicacion: "Flacidez, grasa" },
    { nombre: "Abdomen", indicacion: "Grasa localizada, flacidez" },
    { nombre: "Muslos", indicacion: "Grasa, celulitis" },
    { nombre: "Glúteos", indicacion: "Flacidez, textura" }
];

const queEsperar = [
    { paso: "1", titulo: "Consulta Inicial", descripcion: "Evaluamos tus objetivos y diseñamos un plan personalizado." },
    { paso: "2", titulo: "Sesión de Tratamiento", descripcion: "30 minutos de calor agradable similar a un masaje." },
    { paso: "3", titulo: "Sin Recuperación", descripcion: "Vuelves a tus actividades normales inmediatamente." },
    { paso: "4", titulo: "Resultados Progresivos", descripcion: "Notas mejoras desde la 2da sesión, óptimas a los 3 meses." }
];

const faqs = [
    {
        pregunta: "¿Qué es Exilis Ultra 360 y cómo funciona?",
        respuesta: "Exilis Ultra 360 es un dispositivo aprobado por la FDA que combina radiofrecuencia monopolar (4-6 MHz) con ultrasonido (40 KHz). La RF calienta las capas profundas de la piel para estimular colágeno, mientras el ultrasonido ayuda a descomponer células grasas. El resultado es piel más firme y reducción de grasa localizada."
    },
    {
        pregunta: "¿El tratamiento duele?",
        respuesta: "No. La mayoría de pacientes describe la sensación como un masaje con piedras calientes. El dispositivo tiene un sistema de control de temperatura que mantiene una sensación confortable durante todo el tratamiento."
    },
    {
        pregunta: "¿Cuántas sesiones necesito?",
        respuesta: "El protocolo estándar es de 4-6 sesiones espaciadas cada 1-2 semanas. Cada sesión dura aproximadamente 30 minutos. El número exacto depende de la zona tratada y tus objetivos específicos."
    },
    {
        pregunta: "¿Cuándo veo los resultados?",
        respuesta: "Algunos pacientes notan cambios desde la primera sesión. Sin embargo, los resultados óptimos se ven 2-3 meses después de completar el protocolo, cuando el cuerpo ha producido nuevo colágeno. Los resultados continúan mejorando hasta 6 meses después."
    },
    {
        pregunta: "¿Exilis sirve para reducir grasa?",
        respuesta: "Sí. El ultrasonido de Exilis Ultra 360 ayuda a descomponer las células grasas, especialmente en zonas como papada, abdomen y flancos. No es un tratamiento para obesidad, sino para grasa localizada en personas cercanas a su peso ideal."
    },
    {
        pregunta: "¿Cuál es la diferencia con otras tecnologías?",
        respuesta: "Exilis Ultra 360 es único porque combina RF monopolar + ultrasonido en el mismo tratamiento. La RF tensa la piel estimulando colágeno, mientras el ultrasonido trata la grasa. Otros equipos suelen hacer solo una de estas funciones."
    },
    {
        pregunta: "¿Hay tiempo de recuperación?",
        respuesta: "No. Puedes volver a tus actividades normales inmediatamente después del tratamiento. Puede haber un leve enrojecimiento temporal que desaparece en pocas horas. No hay hematomas ni inflamación significativa."
    },
    {
        pregunta: "¿Quién NO debe hacerse Exilis?",
        respuesta: "No recomendamos el tratamiento si estás embarazada, tienes marcapasos o dispositivos metálicos en la zona a tratar, sufres de enfermedades autoinmunes activas, o tienes infecciones cutáneas en la zona de tratamiento."
    }
];

export default function ExilisUltra360Page() {
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
                        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Exilis Ultra 360</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-orange-500/20 text-orange-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Aprobado FDA
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Exilis Ultra <span className="text-[#b8935f]">360</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    <strong className="text-white">Radiofrecuencia + Ultrasonido</strong> para tensar la piel, reducir grasa y estimular colágeno.
                                    Sin cirugía, sin dolor, sin tiempo de recuperación.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Facial y corporal &nbsp; ✓ 30 min por sesión &nbsp; ✓ Resultados duraderos
                                </p>

                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Protocolo recomendado</span>
                                    <p className="text-2xl font-bold text-[#b8935f]">4-6 sesiones</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20tratamiento%20Exilis%20Ultra%20360"
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
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">Zonas de Tratamiento</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {zonasTratamiento.map((z, i) => (
                                        <div key={i} className="bg-[#1b1a18] p-4 rounded-lg">
                                            <h4 className="text-white font-medium text-sm">{z.nombre}</h4>
                                            <p className="text-xs text-[#cbcfd1]">{z.indicacion}</p>
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
                                La Tecnología
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Cómo Funciona Exilis Ultra 360?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-orange-600 font-bold">RF</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#1b1a18] mb-1">Radiofrecuencia Monopolar</h3>
                                            <p className="text-sm text-[#6f6a5c]">Calienta las capas profundas de la piel (dermis), provocando la contracción inmediata de las fibras de colágeno y estimulando la producción de nuevo colágeno.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-blue-600 font-bold">US</span>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-[#1b1a18] mb-1">Ultrasonido (40 KHz)</h3>
                                            <p className="text-sm text-[#6f6a5c]">Las ondas ultrasónicas focalizadas disrumpen las membranas de las células grasas, permitiendo que el cuerpo las elimine naturalmente.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-blue-50 p-8 rounded-lg">
                                <h3 className="font-semibold text-[#1b1a18] mb-4">Resultado de la Combinación:</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2 text-[#6f6a5c]">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Piel más firme y tersa
                                    </li>
                                    <li className="flex items-start gap-2 text-[#6f6a5c]">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Reducción de grasa localizada
                                    </li>
                                    <li className="flex items-start gap-2 text-[#6f6a5c]">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Mejora de arrugas y líneas
                                    </li>
                                    <li className="flex items-start gap-2 text-[#6f6a5c]">
                                        <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Contorno facial más definido
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Por Qué Elegir Exilis Ultra 360?
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

                {/* Qué Esperar */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">
                                ¿Qué Esperar del Tratamiento?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {queEsperar.map((q, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-14 h-14 bg-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-[#1b1a18] font-bold text-xl">{q.paso}</div>
                                    <h3 className="text-white font-semibold mb-2">{q.titulo}</h3>
                                    <p className="text-sm text-[#cbcfd1]">{q.descripcion}</p>
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
                                        Grasa localizada resistente a dieta y ejercicio
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Quienes buscan mantenimiento post-cirugía
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Personas que prefieren tratamientos no invasivos
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
                                        Marcapasos o dispositivos electrónicos
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Implantes metálicos en la zona
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Enfermedades autoinmunes activas
                                    </li>
                                </ul>
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
                            Tensa Tu Piel y Define Tu Silueta
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación y descubre cómo Exilis Ultra 360 puede ayudarte a lograr una piel más firme y un contorno más definido.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20Exilis%20Ultra%20360"
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
