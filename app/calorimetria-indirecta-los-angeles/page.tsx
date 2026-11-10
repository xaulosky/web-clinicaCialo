import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Calorimetría Indirecta en Los Ángeles Chile | Clínica Cialo" },
    description: "Examen de calorimetría indirecta en Los Ángeles, Biobío. Mide con precisión científica tu metabolismo basal y cuántas calorías quema tu cuerpo en reposo. Ideal para nutrición personalizada, pérdida de peso y rendimiento deportivo. $50.000.",
    keywords: "calorimetría indirecta, examen calorimetría, metabolismo basal, gasto calórico reposo, calorimetría Los Ángeles, examen metabólico Chile, tasa metabólica basal, bioimpedancia, nutrición personalizada",
    openGraph: {
        title: "Calorimetría Indirecta en Los Ángeles | Examen Metabolismo | Clínica Cialo",
        description: "Conoce exactamente cuántas calorías quema tu cuerpo. Examen preciso y rápido para planes nutricionales personalizados.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/calorimetria-indirecta-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/calorimetria-indirecta-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Calorimetría Indirecta en Los Ángeles Chile', item: 'https://cialo.cl/calorimetria-indirecta-los-angeles' },
            ],
        },
        {
            "@type": "MedicalTest",
            name: "Calorimetría Indirecta",
            description: "Examen metabólico que mide con precisión científica el gasto calórico en reposo mediante análisis de gases respiratorios",
            usesDevice: {
                "@type": "MedicalDevice",
                name: "Calorímetro Indirecto",
            },
            provider: {
                "@type": "MedicalBusiness",
                name: "Clínica Cialo",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Bulnes 220, Of. 509",
                    addressLocality: "Los Ángeles",
                    addressRegion: "Biobío",
                    addressCountry: "CL",
                },
                telephone: "+56982028473",
                priceRange: "$50.000",
            },
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "¿Qué es la calorimetría indirecta?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Es un examen que mide con precisión científica cuántas calorías gasta tu cuerpo en reposo, analizando el oxígeno consumido y el CO2 producido al respirar.",
                    },
                },
                {
                    "@type": "Question",
                    name: "¿Cuánto dura el examen de calorimetría?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "El examen dura aproximadamente 15-20 minutos. Se requiere descansar 10-15 minutos antes para estabilizar la respiración.",
                    },
                },
                {
                    "@type": "Question",
                    name: "¿Qué preparación necesito para la calorimetría?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Requiere ayuno de 12 horas, evitar ejercicio 24 horas antes, no consumir café, té o bebidas energéticas 12 horas antes, y llegar 15 minutos antes para descansar.",
                    },
                },
            ],
        },
    ],
};

const queSeObtiene = [
    { nombre: "Metabolismo Basal Real (TMB)", desc: "Calorías exactas que quema tu cuerpo en reposo absoluto, no estimaciones", icon: "🔥" },
    { nombre: "Cociente Respiratorio (RQ)", desc: "Indica si quemas más grasa o carbohidratos como principal fuente de energía", icon: "💨" },
    { nombre: "Consumo de Oxígeno (VO2)", desc: "Mide tu eficiencia metabólica y capacidad oxidativa", icon: "🫁" },
    { nombre: "Producción de CO2 (VCO2)", desc: "Indicador del tipo de sustrato energético que está utilizando tu cuerpo", icon: "💫" },
];

const porQueImporta = [
    {
        titulo: "Dietas Realmente Personalizadas",
        desc: "Define exactamente cuántas calorías necesitas diariamente. Sin estimaciones genéricas que pueden tener hasta 30% de error.",
        icon: "🥗"
    },
    {
        titulo: "Detecta Metabolismo Lento",
        desc: "Descubre si tu metabolismo está adaptado a la baja y por qué no pierdes peso a pesar de hacer dieta.",
        icon: "⚡"
    },
    {
        titulo: "Optimiza Rendimiento Deportivo",
        desc: "Ajusta tu ingesta calórica con precisión para ganar músculo, perder grasa o mejorar tu rendimiento.",
        icon: "💪"
    },
    {
        titulo: "Identifica Problemas Metabólicos",
        desc: "Detecta resistencia a la insulina, uso ineficiente de energía o adaptaciones metabólicas por dietas restrictivas.",
        icon: "🔍"
    },
];

const indicaciones = [
    { texto: "Ayuno de 12 horas de líquidos y sólidos", importante: true },
    { texto: "Evitar ejercicio o actividad física 24 horas antes", importante: true },
    { texto: "No consumir café, té, bebidas energéticas o tabaco 12 horas antes", importante: true },
    { texto: "Llegar 15 minutos antes para descansar en sala de espera", importante: false },
    { texto: "Usar ropa cómoda", importante: false },
];

const contraindicaciones = [
    "Embarazo",
    "Fiebre activa",
    "Obstrucción nasal o bronquial",
    "Enfermedades respiratorias agudas",
];

const comoFunciona = [
    { paso: "01", titulo: "Preparación", desc: "Ayuno de 12 horas y evitar ejercicio intenso 24 hrs antes del examen" },
    { paso: "02", titulo: "Reposo Previo", desc: "Te recuestas cómodamente durante 10-15 minutos para estabilizar tu respiración" },
    { paso: "03", titulo: "Medición", desc: "Respiras normalmente a través de una boquilla durante 15-20 minutos mientras el equipo mide oxígeno y CO2" },
    { paso: "04", titulo: "Resultados", desc: "Recibes tu reporte con metabolismo basal real, cociente respiratorio y recomendaciones nutricionales" },
];

const vsFormulas = [
    { formula: "Fórmulas Harris-Benedict, Mifflin", valor: "±30% error", color: "text-red-500", desc: "Estimaciones basadas en peso, altura y edad" },
    { formula: "Calorimetría Indirecta", valor: "±5% error", color: "text-green-500", desc: "Medición directa de tu metabolismo real" },
];

const paraquien = [
    "Personas con sobrepeso que no logran bajar de peso",
    "Deportistas que buscan optimizar su rendimiento",
    "Pacientes con resistencia a la insulina o diabetes",
    "Personas que han hecho múltiples dietas sin éxito",
    "Pacientes pre y post cirugía bariátrica",
    "Cualquier persona que quiera un plan nutricional basado en datos reales",
];

const faqs = [
    {
        pregunta: "¿Qué es la calorimetría indirecta?",
        respuesta: "Es un examen metabólico que permite determinar con precisión científica cuántas calorías gasta tu cuerpo diariamente en estado de reposo (metabolismo basal). Funciona analizando el oxígeno que consumes y el CO2 que produces al respirar. Es el gold standard para conocer tu gasto energético real.",
    },
    {
        pregunta: "¿Cómo se realiza el examen?",
        respuesta: "El paciente se recuesta cómodamente y respira a través de una boquilla durante 15-20 minutos. El equipo mide el consumo de oxígeno y la producción de CO2. Según estos datos, se calcula con precisión tu metabolismo basal. Es completamente indoloro y no invasivo.",
    },
    {
        pregunta: "¿Cuál es la diferencia con la bioimpedanciometría (InBody)?",
        respuesta: "Son exámenes complementarios. El InBody (bioimpedanciometría) mide tu composición corporal: masa muscular, grasa, agua. La calorimetría mide cuántas calorías quemas. Juntos, te dan un panorama completo: qué tienes y cómo funciona tu metabolismo.",
    },
    {
        pregunta: "¿Por qué las fórmulas de internet no son precisas?",
        respuesta: "Las fórmulas como Harris-Benedict o Mifflin estiman tu metabolismo basándose en promedios de población según peso, altura, edad y sexo. Pueden tener hasta 30% de error porque no consideran tu composición corporal ni adaptaciones metabólicas individuales.",
    },
    {
        pregunta: "¿Qué significa tener metabolismo lento?",
        respuesta: "Un metabolismo lento significa que tu cuerpo gasta menos calorías de lo esperado para tu peso y composición corporal. Puede deberse a dietas muy restrictivas previas, pérdida de masa muscular, problemas hormonales o adaptaciones metabólicas. La calorimetría lo detecta con precisión.",
    },
    {
        pregunta: "¿Duele el examen de calorimetría?",
        respuesta: "No, es completamente indoloro. Solo debes respirar normalmente a través de una boquilla mientras estás recostado. Muchos pacientes lo encuentran relajante.",
    },
    {
        pregunta: "¿Cuánto cuesta el examen?",
        respuesta: "El examen de calorimetría indirecta tiene un valor de $50.000. Puedes complementarlo con el InBody 970 para un análisis completo de composición corporal y metabolismo.",
    },
];

export default function CalorimetriaIndirectaPage() {
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
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-[#b8935f]/20 text-[#b8935f] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                                    📍 Los Ángeles, Biobío
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                                    <span className="text-[#b8935f]">Calorimetría</span> Indirecta
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-4 leading-relaxed">
                                    Descubre <strong className="text-white">exactamente cuántas calorías</strong> quema tu cuerpo en reposo.
                                    El único método científico para conocer tu metabolismo basal real y crear planes nutricionales que funcionen.
                                </p>
                                <p className="text-[#b8935f] text-lg mb-8">
                                    ✓ Precisión de ±5% &nbsp; ✓ 20 minutos &nbsp; ✓ Resultado inmediato
                                </p>

                                {/* Precio destacado */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-8 inline-block">
                                    <span className="text-[#cbcfd1] text-sm">Valor del examen</span>
                                    <p className="text-3xl font-bold text-[#b8935f]">$50.000</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20agendar%20un%20examen%20de%20calorimetría%20indirecta"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Agendar Examen
                                    </a>
                                    <Link
                                        href="/inbody-970-los-angeles"
                                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Ver InBody 970
                                    </Link>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="bg-[#2a2a2a] rounded-lg p-8 border border-[#3a3a3a]">
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-6">¿Qué es la calorimetría indirecta?</h2>
                                <p className="text-[#cbcfd1] mb-4 leading-relaxed">
                                    Es un <strong className="text-white">examen metabólico</strong> que permite determinar con precisión científica cuántas calorías gasta tu cuerpo diariamente en estado de reposo.
                                </p>
                                <p className="text-[#cbcfd1] mb-6 leading-relaxed">
                                    Funciona midiendo el <strong className="text-white">consumo de oxígeno</strong> y la <strong className="text-white">producción de CO2</strong> mientras respiras, lo que permite calcular tu metabolismo basal real —no una estimación.
                                </p>
                                <div className="bg-[#1b1a18] p-4 rounded">
                                    <p className="text-[#b8935f] text-sm">
                                        💡 <strong>Dato:</strong> Las fórmulas convencionales pueden tener hasta 30% de error. La calorimetría tiene solo ±5%.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contexto: Sobrepeso en Chile */}
                <section className="py-12 bg-[#faf6ef] border-b border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="text-5xl">⚠️</div>
                            <div>
                                <p className="text-[#1b1a18] text-lg mb-2">
                                    <strong>Más del 74% de los chilenos tiene sobrepeso.</strong>
                                </p>
                                <p className="text-[#6f6a5c]">
                                    En personas con exceso de peso, conocer el gasto energético real es fundamental para crear planes nutricionales efectivos. La calorimetría indirecta y la bioimpedanciometría (InBody) son exámenes complementarios para determinar <strong>qué tienes</strong> y <strong>cómo funciona tu cuerpo</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Para quién es */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Indicaciones</span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">¿Para Quién es este Examen?</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                            {paraquien.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-[#faf6ef] p-4 rounded-sm">
                                    <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-[#6f6a5c] text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Por qué importa */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Beneficios
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Para Qué Sirve la Calorimetría?
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                Conocer tu metabolismo real permite tomar decisiones informadas sobre tu alimentación y estilo de vida.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {porQueImporta.map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-sm shadow-sm hover:shadow-lg transition-shadow border border-gray-100 text-center">
                                    <span className="text-4xl mb-4 block">{item.icon}</span>
                                    <h3 className="font-semibold text-[#1b1a18] mb-2">{item.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparativa */}
                <section className="py-16 bg-[#1b1a18]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-10">
                            Precisión: Fórmulas vs. Calorimetría
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {vsFormulas.map((item, i) => (
                                <div key={i} className="bg-[#2a2a2a] p-8 rounded-sm">
                                    <p className="text-[#cbcfd1] mb-2">{item.formula}</p>
                                    <p className={`text-4xl font-bold mb-2 ${item.color}`}>{item.valor}</p>
                                    <p className="text-[#888] text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-[#888] text-sm mt-8">
                            La calorimetría indirecta es el <strong className="text-white">gold standard</strong> para medir el metabolismo basal según la literatura médica.
                        </p>
                    </div>
                </section>

                {/* Qué se obtiene */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Resultados
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                ¿Qué Obtienes del Examen?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {queSeObtiene.map((item, i) => (
                                <div key={i} className="flex items-start gap-4 bg-[#faf6ef] p-6 rounded-sm">
                                    <span className="text-3xl">{item.icon}</span>
                                    <div>
                                        <h3 className="font-semibold text-[#1b1a18] mb-1">{item.nombre}</h3>
                                        <p className="text-sm text-[#6f6a5c]">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cómo funciona */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Proceso
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                ¿Cómo se Realiza el Examen?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {comoFunciona.map((item, i) => (
                                <div key={i} className="text-center">
                                    <div className="w-16 h-16 mx-auto bg-[#b8935f] text-[#1b1a18] rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                        {item.paso}
                                    </div>
                                    <h3 className="font-semibold text-[#1b1a18] mb-2">{item.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Indicaciones y Contraindicaciones */}
                <section className="py-20 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Indicaciones */}
                            <div>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">📋 Indicaciones para el Examen</h2>
                                <ul className="space-y-3">
                                    {indicaciones.map((item, i) => (
                                        <li key={i} className={`flex items-start gap-3 ${item.importante ? 'font-medium text-[#1b1a18]' : 'text-[#6f6a5c]'}`}>
                                            <span className={`flex-shrink-0 ${item.importante ? 'text-red-500' : 'text-[#b8935f]'}`}>
                                                {item.importante ? '⚠️' : '✓'}
                                            </span>
                                            {item.texto}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Contraindicaciones */}
                            <div>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">🚫 Contraindicaciones</h2>
                                <p className="text-[#6f6a5c] mb-4">La calorimetría indirecta está contraindicada en:</p>
                                <ul className="space-y-2">
                                    {contraindicaciones.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[#6f6a5c]">
                                            <span className="text-red-400">✕</span>
                                            {item}
                                        </li>
                                    ))}
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

                {/* Exámenes Relacionados */}
                <section className="py-16 bg-white border-t border-gray-200">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 text-center">Exámenes Complementarios</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <Link href="/inbody-970-los-angeles" className="bg-[#faf6ef] p-6 rounded-sm hover:shadow-lg transition-shadow group">
                                <h3 className="font-semibold text-[#1b1a18] mb-2 group-hover:text-[#b8935f] transition-colors">InBody 970 (Bioimpedanciometría) →</h3>
                                <p className="text-sm text-[#6f6a5c]">Mide tu composición corporal: masa muscular, grasa, agua corporal, grasa visceral. Complemento perfecto de la calorimetría.</p>
                            </Link>
                            <Link href="/nutricionista-los-angeles-chile" className="bg-[#faf6ef] p-6 rounded-sm hover:shadow-lg transition-shadow group">
                                <h3 className="font-semibold text-[#1b1a18] mb-2 group-hover:text-[#b8935f] transition-colors">Consulta Nutricionista →</h3>
                                <p className="text-sm text-[#6f6a5c]">Interpreta tus resultados con nuestra nutricionista especializada y obtén un plan nutricional personalizado.</p>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-[#b8935f] to-[#c4b190]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Agenda tu Calorimetría Indirecta
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Deja de adivinar cuántas calorías necesitas. Obtén el dato real y construye un plan nutricional que funcione de verdad.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20un%20examen%20de%20calorimetría%20indirecta"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Examen — $50.000
                            </a>
                            <Link
                                href="/inbody-970-los-angeles"
                                className="inline-flex items-center justify-center gap-2 border-2 border-[#1b1a18] text-[#1b1a18] px-10 py-5 font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-colors"
                            >
                                Ver Examen InBody 970
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
