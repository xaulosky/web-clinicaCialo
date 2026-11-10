import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import YouTubeVideo from "@/app/components/YouTubeVideo";

export const metadata: Metadata = {
    title: { absolute: "Rinomodelación en Los Ángeles Chile | Clínica Cialo" },
    description: "Rinomodelación con ácido hialurónico en Los Ángeles, Chile. Corrige imperfecciones nasales sin cirugía. Resultados inmediatos, sin tiempo de recuperación. Desde $240.000. Dr. Nicolás Laucirica especialista.",
    keywords: "rinomodelación Los Ángeles, nariz sin cirugía Chile, ácido hialurónico nariz, rinomodelación precio, rinoplastia no quirúrgica Biobío, corrección nariz sin bisturí",
    openGraph: {
        title: "Rinomodelación sin Cirugía | Clínica Cialo Los Ángeles",
        description: "Corrige el perfil de tu nariz sin cirugía. Resultados inmediatos con ácido hialurónico. Desde $240.000.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/rinomodelacion-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/rinomodelacion-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Rinomodelación en Los Ángeles Chile', item: 'https://cialo.cl/rinomodelacion-los-angeles' },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Rinomodelación con Ácido Hialurónico",
            alternateName: ["Rinoplastia sin Cirugía", "Nariz sin Bisturí", "Perfilado Nasal no Quirúrgico"],
            description: "Procedimiento estético no quirúrgico que utiliza ácido hialurónico para corregir imperfecciones del perfil nasal.",
            procedureType: "Cosmetic",
            bodyLocation: "Nose",
            howPerformed: "Inyección de ácido hialurónico en puntos estratégicos de la nariz para camuflar irregularidades y mejorar el perfil.",
            preparation: "Evaluación facial previa. Evitar anticoagulantes 7 días antes.",
            followup: "Resultados visibles inmediatamente. Control opcional a los 15 días.",
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
                priceRange: "$240.000 CLP"
            }
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "¿Cuánto dura la rinomodelación?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Los resultados de la rinomodelación con ácido hialurónico duran entre 12 a 18 meses, dependiendo del metabolismo de cada persona y el producto utilizado."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿Cuál es la diferencia entre rinomodelación y rinoplastia?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "La rinomodelación es un procedimiento no quirúrgico con ácido hialurónico que ofrece resultados temporales y no puede reducir el tamaño de la nariz. La rinoplastia es una cirugía que modifica la estructura ósea y cartilaginosa para resultados permanentes."
                    }
                },
                {
                    "@type": "Question",
                    name: "¿La rinomodelación duele?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "El procedimiento es mínimamente doloroso. Se aplica anestesia tópica antes de las inyecciones, y la mayoría de pacientes describe solo una leve presión durante el tratamiento."
                    }
                }
            ]
        }
    ]
};

const queSeCorrige = [
    {
        titulo: "Caballete o Giba Dorsal",
        descripcion: "Camuflamos la prominencia del puente nasal rellenando por encima y debajo para crear un perfil recto y armonioso.",
        icono: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
    },
    {
        titulo: "Punta Nasal Caída",
        descripcion: "Elevamos la punta de la nariz creando mayor definición y proyección sin necesidad de cirugía.",
        icono: "M5 10l7-7m0 0l7 7m-7-7v18"
    },
    {
        titulo: "Desviaciones y Asimetrías",
        descripcion: "Corregimos irregularidades visuales del tabique y asimetrías que afectan la armonía facial.",
        icono: "M4 6h16M4 12h8m-8 6h16"
    },
    {
        titulo: "Nariz Post-Rinoplastia",
        descripcion: "Refinamos resultados de cirugías previas, corrigiendo pequeñas imperfecciones residuales.",
        icono: "M4.5 12.75l6 6 9-13.5"
    }
];

const ventajasDesventajas = {
    rinomodelacion: {
        titulo: "Rinomodelación",
        subtitulo: "Sin Cirugía",
        ventajas: [
            "Sin cirugía ni anestesia general",
            "Resultados inmediatos",
            "Sin tiempo de recuperación",
            "Reversible (se puede disolver)",
            "Procedimiento de 30-45 minutos",
            "Precio más accesible"
        ],
        desventajas: [
            "Resultados temporales (12-18 meses)",
            "No reduce el tamaño de la nariz",
            "No corrige problemas funcionales",
            "Requiere retoques periódicos"
        ]
    },
    rinoplastia: {
        titulo: "Rinoplastia",
        subtitulo: "Quirúrgica",
        ventajas: [
            "Resultados permanentes",
            "Puede reducir el tamaño",
            "Corrige problemas funcionales",
            "Cambios estructurales profundos"
        ],
        desventajas: [
            "Requiere cirugía y anestesia",
            "Recuperación de 2-4 semanas",
            "Mayor riesgo de complicaciones",
            "Costo significativamente mayor",
            "Resultados finales en 6-12 meses",
            "Irreversible"
        ]
    }
};

const faqs = [
    {
        pregunta: "¿Cuánto dura el resultado de la rinomodelación?",
        respuesta: "Los resultados duran entre 12 a 18 meses, dependiendo de tu metabolismo, el tipo de ácido hialurónico utilizado y la zona tratada. Con el tiempo, el producto se reabsorbe naturalmente. Muchos pacientes optan por sesiones de mantenimiento anuales para conservar el resultado."
    },
    {
        pregunta: "¿Es segura la rinomodelación?",
        respuesta: "Sí, cuando es realizada por un médico experimentado con conocimiento anatómico profundo. La nariz es una zona de alto riesgo vascular, por lo que es fundamental que el profesional conozca la anatomía para evitar complicaciones como necrosis tisular. En Clínica Cialo, el Dr. Laucirica cuenta con formación internacional en anatomía facial de Harvard."
    },
    {
        pregunta: "¿Qué diferencia hay entre rinomodelación y rinoplastia?",
        respuesta: "La rinomodelación es un procedimiento no quirúrgico que usa rellenos para camuflar imperfecciones, con resultados temporales. La rinoplastia es una cirugía que modifica la estructura ósea y cartilaginosa para resultados permanentes. La rinomodelación no puede reducir el tamaño de la nariz ni corregir problemas de respiración."
    },
    {
        pregunta: "¿Puedo hacerme rinomodelación si ya tuve rinoplastia?",
        respuesta: "Sí, es una excelente opción para refinar pequeñas imperfecciones post-quirúrgicas sin volver al quirófano. Sin embargo, es importante esperar al menos 12 meses después de la cirugía y que el médico evalúe la anatomía modificada."
    },
    {
        pregunta: "¿Qué pasa si no me gusta el resultado?",
        respuesta: "Una de las grandes ventajas del ácido hialurónico es que es reversible. Si no estás conforme con el resultado, se puede disolver con una enzima llamada hialuronidasa, volviendo tu nariz a su estado original en pocas horas."
    },
    {
        pregunta: "¿Cuáles son los riesgos de la rinomodelación?",
        respuesta: "Los efectos secundarios más comunes son leves: inflamación temporal, enrojecimiento y pequeños hematomas que desaparecen en días. Los riesgos más serios (muy raros con un médico experimentado) incluyen necrosis tisular por compresión vascular, infección o nódulos. Por eso es crucial elegir un profesional calificado."
    },
    {
        pregunta: "¿Cómo es el procedimiento?",
        respuesta: "Primero se realiza una evaluación facial y se definen los puntos a tratar. Se aplica crema anestésica durante 15-20 minutos. Luego, el médico inyecta pequeñas cantidades de ácido hialurónico con una aguja fina en los puntos precisos, moldeando la nariz. El procedimiento completo dura unos 30-45 minutos."
    },
    {
        pregunta: "¿Quién NO es candidato para rinomodelación?",
        respuesta: "No recomendamos la rinomodelación si: tienes una nariz muy grande y quieres reducirla (necesitas rinoplastia), tienes problemas de respiración o tabique desviado funcional, estás embarazada o en lactancia, tienes antecedentes de reacciones alérgicas al ácido hialurónico, o tomas anticoagulantes sin poder suspenderlos."
    }
];

export default function RinomodelacionPage() {
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
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                            <Link href="/" className="hover:text-[#b8935f]">Inicio</Link>
                            <span>/</span>
                            <Link href="/tratamientos" className="hover:text-[#b8935f]">Tratamientos</Link>
                            <span>/</span>
                            <span className="text-[#b8935f]">Rinomodelación</span>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-[#b8935f]/20 text-[#b8935f] px-4 py-1.5 rounded-full text-sm font-medium mb-6 flex items-center gap-2 w-fit">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Sin Cirugía • Resultados Inmediatos
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    Rinomodelación <span className="text-[#b8935f]">sin Cirugía</span>
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    Corrige el perfil de tu nariz <strong className="text-white">sin bisturí, sin anestesia general y sin tiempo de recuperación</strong>.
                                    Resultados inmediatos con ácido hialurónico de alta gama.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ 30-45 minutos &nbsp; ✓ Sin hospitalización &nbsp; ✓ Reversible
                                </p>

                                {/* Precio destacado */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Desde</span>
                                    <p className="text-3xl font-bold text-[#b8935f]">$240.000</p>
                                    <span className="text-[#cbcfd1] text-sm">Incluye evaluación y retoque</span>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20la%20rinomodelación%20sin%20cirugía"
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
                                        href="/profesionales/nicolas-laucirica"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Conocer al Especialista
                                    </Link>
                                </div>
                            </div>

                            {/* Info Visual */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué Podemos Corregir?</h2>
                                <div className="space-y-4">
                                    {queSeCorrige.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-[#b8935f] rounded-full flex items-center justify-center shrink-0">
                                                <svg className="w-5 h-5 text-[#1b1a18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icono} />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">{item.titulo}</h4>
                                                <p className="text-sm text-[#cbcfd1]">{item.descripcion}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Qué es la Rinomodelación */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    El Procedimiento
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    ¿Qué es la Rinomodelación?
                                </h2>
                                <p className="text-[#6f6a5c] leading-relaxed mb-4">
                                    La rinomodelación es un <strong>procedimiento estético no quirúrgico</strong> que utiliza ácido hialurónico para corregir imperfecciones del perfil nasal. A diferencia de la rinoplastia, no requiere cirugía, anestesia general ni tiempo de recuperación.
                                </p>
                                <p className="text-[#6f6a5c] leading-relaxed mb-4">
                                    El médico inyecta pequeñas cantidades de relleno en puntos estratégicos para <strong>camuflar irregularidades, elevar la punta nasal o suavizar el caballete</strong>, creando un perfil más armonioso y equilibrado.
                                </p>
                                <p className="text-[#6f6a5c] leading-relaxed">
                                    Los resultados son <strong>inmediatos</strong> y el procedimiento dura solo 30-45 minutos. Es ideal para quienes buscan mejorar su perfil sin pasar por el quirófano.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#1b1a18] mb-6">El Paso a Paso</h3>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-[#b8935f] rounded-full flex items-center justify-center text-[#1b1a18] font-bold text-sm shrink-0">1</div>
                                        <div>
                                            <h4 className="font-semibold text-[#1b1a18]">Evaluación Facial</h4>
                                            <p className="text-sm text-[#6f6a5c]">Analizamos tu nariz, perfil y objetivos personales.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-[#b8935f] rounded-full flex items-center justify-center text-[#1b1a18] font-bold text-sm shrink-0">2</div>
                                        <div>
                                            <h4 className="font-semibold text-[#1b1a18]">Anestesia Tópica</h4>
                                            <p className="text-sm text-[#6f6a5c]">Aplicamos crema anestésica para minimizar molestias.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-[#b8935f] rounded-full flex items-center justify-center text-[#1b1a18] font-bold text-sm shrink-0">3</div>
                                        <div>
                                            <h4 className="font-semibold text-[#1b1a18]">Inyección Precisa</h4>
                                            <p className="text-sm text-[#6f6a5c]">Inyectamos ácido hialurónico en puntos estratégicos.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 bg-[#b8935f] rounded-full flex items-center justify-center text-[#1b1a18] font-bold text-sm shrink-0">4</div>
                                        <div>
                                            <h4 className="font-semibold text-[#1b1a18]">Resultado Inmediato</h4>
                                            <p className="text-sm text-[#6f6a5c]">Sales de la clínica con tu nueva nariz.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Comparativa: Rinomodelación vs Rinoplastia */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Comparativa
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Rinomodelación vs Rinoplastia
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                Entiende las diferencias para elegir la opción correcta para ti.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Rinomodelación */}
                            <div className="bg-white rounded-lg p-8 border-2 border-[#b8935f]">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-[#b8935f] rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[#1b1a18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1b1a18]">{ventajasDesventajas.rinomodelacion.titulo}</h3>
                                        <p className="text-sm text-[#b8935f]">{ventajasDesventajas.rinomodelacion.subtitulo}</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Ventajas
                                    </h4>
                                    <ul className="space-y-2">
                                        {ventajasDesventajas.rinomodelacion.ventajas.map((v, i) => (
                                            <li key={i} className="text-sm text-[#6f6a5c] flex items-start gap-2">
                                                <span className="text-green-500 mt-0.5">✓</span>
                                                {v}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-amber-600 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        Limitaciones
                                    </h4>
                                    <ul className="space-y-2">
                                        {ventajasDesventajas.rinomodelacion.desventajas.map((d, i) => (
                                            <li key={i} className="text-sm text-[#6f6a5c] flex items-start gap-2">
                                                <span className="text-amber-500 mt-0.5">!</span>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Rinoplastia */}
                            <div className="bg-white rounded-lg p-8 border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[#6f6a5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#1b1a18]">{ventajasDesventajas.rinoplastia.titulo}</h3>
                                        <p className="text-sm text-[#6f6a5c]">{ventajasDesventajas.rinoplastia.subtitulo}</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Ventajas
                                    </h4>
                                    <ul className="space-y-2">
                                        {ventajasDesventajas.rinoplastia.ventajas.map((v, i) => (
                                            <li key={i} className="text-sm text-[#6f6a5c] flex items-start gap-2">
                                                <span className="text-green-500 mt-0.5">✓</span>
                                                {v}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-amber-600 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                                        Limitaciones
                                    </h4>
                                    <ul className="space-y-2">
                                        {ventajasDesventajas.rinoplastia.desventajas.map((d, i) => (
                                            <li key={i} className="text-sm text-[#6f6a5c] flex items-start gap-2">
                                                <span className="text-amber-500 mt-0.5">!</span>
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
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
                                        Personas que quieren mejorar su perfil sin cirugía
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Quienes tienen pequeñas imperfecciones (caballete, punta caída)
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Pacientes post-rinoplastia con imperfecciones residuales
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Quienes buscan resultados inmediatos sin tiempo de recuperación
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-green-500 mt-1">✓</span>
                                        Personas que prefieren un procedimiento reversible
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
                                        Quienes buscan reducir significativamente el tamaño de la nariz
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Problemas funcionales (tabique desviado, dificultad respiratoria)
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Embarazo o lactancia
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Uso de anticoagulantes sin posibilidad de suspensión
                                    </li>
                                    <li className="flex items-start gap-3 text-[#6f6a5c]">
                                        <span className="text-red-500 mt-1">✕</span>
                                        Alergia conocida al ácido hialurónico
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profesional */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Tu Especialista
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-6">
                                    Dr. Nicolás Laucirica
                                </h2>
                                <p className="text-[#cbcfd1] leading-relaxed mb-6">
                                    Especialista en medicina estética facial con formación en <strong className="text-white">Harvard University</strong> en anatomía y rejuvenecimiento facial.
                                    Su conocimiento profundo de la anatomía nasal y vascular garantiza procedimientos seguros y resultados naturales.
                                </p>
                                <ul className="space-y-2 mb-8">
                                    <li className="text-[#cbcfd1] flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Training in Anatomy, Harvard University
                                    </li>
                                    <li className="text-[#cbcfd1] flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Especialista en Dermocosmética, U. Barcelona
                                    </li>
                                    <li className="text-[#cbcfd1] flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                        Director Clínico, Clínica Cialo
                                    </li>
                                </ul>
                                <Link
                                    href="/profesionales/nicolas-laucirica"
                                    className="inline-flex items-center gap-2 text-[#b8935f] font-semibold hover:underline"
                                >
                                    Ver perfil completo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="bg-[#2a2a2a] rounded-lg p-6 border border-[#3a3a3a]">
                                    <Image
                                        src="/profesionales/clinica-cialo_Nicolas_Laucirica.webp"
                                        alt="Dr. Nicolás Laucirica - Especialista en Rinomodelación"
                                        width={400}
                                        height={500}
                                        className="rounded-lg mx-auto object-cover object-top"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video del Procedimiento */}
                <section className="py-20 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Contenido Texto */}
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    En Acción
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    Mira el Procedimiento
                                </h2>
                                <p className="text-[#6f6a5c] leading-relaxed mb-6">
                                    En este video puedes ver al <strong>Dr. Nicolás Laucirica</strong> realizando una rinomodelación.
                                    Observa la precisión de la técnica y cómo el cambio es inmediato.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#b8935f]/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        </div>
                                        <span className="text-[#6f6a5c]">Procedimiento rápido y ambulatorio</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#b8935f]/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        </div>
                                        <span className="text-[#6f6a5c]">Uso de cánula para máxima seguridad</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#b8935f]/20 flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                        </div>
                                        <span className="text-[#6f6a5c]">Resultados visibles al instante</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Video */}
                            <div className="flex justify-center md:justify-end">
                                <YouTubeVideo
                                    video={{
                                        id: "rinomodelacion-video-1",
                                        titulo: "Rinomodelación en Clínica Cialo",
                                        descripcion: "Dr. Nicolás Laucirica",
                                        youtubeUrl: "https://youtube.com/shorts/jNZCygVEarU",
                                        youtubeId: "jNZCygVEarU"
                                    }}
                                />
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
                            Transforma tu Perfil sin Cirugía
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu evaluación gratuita y descubre cómo la rinomodelación puede armonizar tu rostro de forma segura y sin tiempo de recuperación.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20rinomodelación"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Evaluación — Desde $240.000
                            </a>
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
