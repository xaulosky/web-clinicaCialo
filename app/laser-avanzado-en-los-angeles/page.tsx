import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Láser Avanzado en Los Ángeles Chile | Clínica Cialo" },
    description: "Tratamientos láser avanzados en Los Ángeles, Chile. Manchas, rosácea, cicatrices, melasma, rejuvenecimiento con M22 Lumenis, Spectra XT y CO₂ TetraPro CoolPeel. Evaluación profesional.",
    keywords: "láser avanzado Los Ángeles, M22 Lumenis Chile, Spectra XT melasma, CoolPeel CO2, tratamiento manchas láser, rosácea láser, cicatrices acné láser, IPL Los Ángeles",
    openGraph: {
        title: "Láser Avanzado en Los Ángeles | Clínica Cialo",
        description: "Abordamos manchas, rosácea, textura, poros, cicatrices, melasma y envejecimiento con plataformas líderes: M22 Lumenis, Spectra XT y CO₂ TetraPro.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/laser-avanzado-en-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/laser-avanzado-en-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Láser Avanzado",
    description: "Tratamientos láser avanzados para manchas, rosácea, cicatrices, melasma y rejuvenecimiento facial",
    procedureType: "Cosmetic",
    bodyLocation: "Face",
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
    },
};

const tratamientos = [
    { icon: "🎯", titulo: "Manchas y tono", desc: "Lentigos solares, daño actínico, melasma (enfoque progresivo)" },
    { icon: "🌹", titulo: "Rojeces y vasos", desc: "Rosácea, telangiectasias faciales, angiomas simples" },
    { icon: "✨", titulo: "Textura y poros", desc: "Aspereza, poros dilatados, irregularidades finas" },
    { icon: "💫", titulo: "Cicatrices", desc: "Acné y quirúrgicas (suavizado progresivo)" },
    { icon: "🌟", titulo: "Rejuvenecimiento", desc: "Arrugas finas/medias, fotoenvejecimiento, piel apagada" },
    { icon: "🔬", titulo: "Otros", desc: "Tatuajes, microblading, lesiones benignas según evaluación" },
];

const faqs = [
    {
        pregunta: "¿Cuántas sesiones necesito?",
        respuesta: "Depende de la indicación y la tecnología. En promedio: 3–4 (IPL), 3–5 (ResurFX®), 1–3 (CO₂), 6–10+ (melasma con Spectra Toning)."
    },
    {
        pregunta: "¿Duele?",
        respuesta: "Usamos parámetros graduales y anestesia tópica si corresponde. La molestia es transitoria y manejable."
    },
    {
        pregunta: "¿Hay reposo?",
        respuesta: "De bajo a moderado según técnica. CoolPeel y ResurFX® tienen recuperación corta; el CO₂ fraccionado profundo requiere más días."
    },
    {
        pregunta: "¿Resultados permanentes?",
        respuesta: "El envejecimiento y la exposición UV continúan. Se recomiendan planes de mantenimiento."
    },
];

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.pregunta,
        acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
    })),
};

export default function LaserAvanzadoPage() {
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

            <main className="bg-white">
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
                                    Láser <span className="text-[#b8935f]">Avanzado</span> en Los Ángeles
                                </h1>
                                <p className="text-xl text-[#cbcfd1] mb-6 leading-relaxed">
                                    Abordamos <strong className="text-white">manchas, rosácea, textura, poros, cicatrices, melasma y envejecimiento</strong> con plataformas líderes: M22 Lumenis, Spectra XT y CO₂ TetraPro (CoolPeel).
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-[#cbcfd1] mb-8">
                                    <span className="flex items-center gap-2">✓ Protocolos de bioseguridad</span>
                                    <span className="flex items-center gap-2">✓ Evaluación profesional</span>
                                    <span className="flex items-center gap-2">✓ Equipos de clase mundial</span>
                                    <span className="flex items-center gap-2">✓ Planes combinados</span>
                                </div>
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20una%20evaluación%20para%20tratamiento%20láser"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Agendar Evaluación
                                </a>
                            </div>
                            <div className="relative hidden lg:block">
                                <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000"
                                        alt="Tratamiento láser avanzado en Los Ángeles"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ¿Qué podemos tratar? */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Indicaciones
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                ¿Qué Podemos Tratar con Láser?
                            </h2>
                            <p className="text-[#6f6a5c] max-w-3xl mx-auto">
                                Para cada caso seleccionamos la plataforma adecuada, la longitud de onda y los parámetros según tu fototipo, diagnóstico y estilo de vida, priorizando eficacia con el menor downtime posible.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tratamientos.map((t, i) => (
                                <div key={i} className="bg-white p-6 rounded-sm border border-gray-100 hover:shadow-lg hover:border-[#b8935f]/30 transition-all">
                                    <span className="text-3xl mb-4 block">{t.icon}</span>
                                    <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">{t.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c]">{t.desc}</p>
                                </div>
                            ))}
                        </div>

                        <p className="text-center text-sm text-[#888] mt-10 italic max-w-2xl mx-auto">
                            «La indicación y el plan de sesiones se definen tras evaluación clínica individual; los resultados pueden variar entre personas.»
                        </p>
                    </div>
                </section>

                {/* Tecnología M22 */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Tecnología Premium
                                </span>
                                <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    M22 Lumenis
                                </h2>
                                <p className="text-[#6f6a5c] mb-6">
                                    Plataforma modular con <strong>IPL, ResurFX® (fraccional no ablativo) y Nd:YAG vascular</strong>.
                                </p>

                                <div className="space-y-6">
                                    <div className="border-l-4 border-[#b8935f] pl-4">
                                        <h4 className="font-semibold text-[#1b1a18]">IPL (Luz Pulsada Intensa)</h4>
                                        <p className="text-sm text-[#6f6a5c]">Manchas, fotoenvejecimiento, rojeces difusas, rosácea. 3–4 sesiones cada 4–6 semanas.</p>
                                    </div>
                                    <div className="border-l-4 border-[#b8935f] pl-4">
                                        <h4 className="font-semibold text-[#1b1a18]">ResurFX® (Fraccional No Ablativo)</h4>
                                        <p className="text-sm text-[#6f6a5c]">Textura, poros, cicatrices finas. 3–5 sesiones; enrojecimiento 24–48h.</p>
                                    </div>
                                    <div className="border-l-4 border-[#b8935f] pl-4">
                                        <h4 className="font-semibold text-[#1b1a18]">Láser Vascular (Nd:YAG)</h4>
                                        <p className="text-sm text-[#6f6a5c]">Telangiectasias, angiomas, vasos pequeños. 1–3 sesiones.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-[#1b1a18] to-[#2a2a2a] rounded-sm p-8 text-white">
                                <div className="text-6xl mb-6 opacity-20">M22</div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-4">Beneficios Clave</h3>
                                <ul className="space-y-3 text-[#cbcfd1]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#b8935f]">✓</span>
                                        Mejora de tono y luminosidad
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#b8935f]">✓</span>
                                        Atenuación de manchas y eritema
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#b8935f]">✓</span>
                                        Remodelación de colágeno
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#b8935f]">✓</span>
                                        Recuperación corta
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Spectra XT */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 bg-gradient-to-br from-[#b8935f] to-[#c4b190] rounded-sm p-8 text-[#1b1a18]">
                                <div className="text-6xl mb-6 opacity-20">XT</div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-4">Aplicaciones</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-2">
                                        <span>🎯</span>
                                        Melasma (Spectra Toning)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>✨</span>
                                        Hollywood Peel (efecto porcelana)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>💫</span>
                                        Manchas y acné activo
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>🎨</span>
                                        Tatuajes y microblading
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span>🌸</span>
                                        Despigmentación axilar/íntima
                                    </li>
                                </ul>
                            </div>
                            <div className="order-1 lg:order-2">
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Q-Switched Nd:YAG
                                </span>
                                <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                    Spectra XT
                                </h2>
                                <p className="text-[#6f6a5c] mb-6">
                                    Módulos 1064/532 nm con <strong>Dual Toning para melasma, Hollywood Peel y Q-Switch</strong> para pigmentos.
                                </p>

                                <div className="space-y-4">
                                    <div className="bg-white p-4 rounded-sm border border-gray-100">
                                        <h4 className="font-semibold text-[#1b1a18]">Melasma (Dual Toning)</h4>
                                        <p className="text-sm text-[#6f6a5c]">6–10+ sesiones espaciadas. Enfoque gradual para minimizar rebotes.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-sm border border-gray-100">
                                        <h4 className="font-semibold text-[#1b1a18]">Hollywood Spectra</h4>
                                        <p className="text-sm text-[#6f6a5c]">1–3 sesiones. Luminosidad inmediata, retorno social inmediato.</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-sm border border-gray-100">
                                        <h4 className="font-semibold text-[#1b1a18]">Tatuajes</h4>
                                        <p className="text-sm text-[#6f6a5c]">4–10+ sesiones según tinta y profundidad.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CO2 CoolPeel */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Resurfacing
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                CO₂ TetraPro CoolPeel®
                            </h2>
                            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                                Modos CoolPeel® (resurfacing superficial) y fraccionado ablativo para mayor profundidad.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-[#faf6ef] p-8 rounded-sm text-center hover:shadow-lg transition-all">
                                <div className="w-16 h-16 bg-[#b8935f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">❄️</span>
                                </div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">CoolPeel®</h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">Líneas finas, poros, tono apagado. Recuperación 1–3 días.</p>
                                <span className="text-xs text-[#b8935f] font-semibold">1–3 SESIONES</span>
                            </div>
                            <div className="bg-[#faf6ef] p-8 rounded-sm text-center hover:shadow-lg transition-all">
                                <div className="w-16 h-16 bg-[#b8935f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">🔥</span>
                                </div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">Fraccionado Clásico</h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">Arrugas marcadas, cicatrices de acné, fotodaño. Recuperación 3–7+ días.</p>
                                <span className="text-xs text-[#b8935f] font-semibold">1–3 SESIONES</span>
                            </div>
                            <div className="bg-[#faf6ef] p-8 rounded-sm text-center hover:shadow-lg transition-all">
                                <div className="w-16 h-16 bg-[#b8935f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl">✂️</span>
                                </div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">Lesiones Benignas</h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">Verrugas, acrocordones. Remoción precisa en consulta.</p>
                                <span className="text-xs text-[#b8935f] font-semibold">SEGÚN DIAGNÓSTICO</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Dudas Frecuentes
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                Preguntas Frecuentes
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <details key={i} className="group bg-white rounded-sm border border-gray-100 overflow-hidden">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#1b1a18] hover:bg-[#faf6ef] transition-colors list-none">
                                        {faq.pregunta}
                                        <svg className="w-5 h-5 text-[#b8935f] group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-6 pb-6 text-[#6f6a5c]">
                                        {faq.respuesta}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2a2a]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Da el Primer Paso
                        </span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">
                            Reserva tu Evaluación Láser
                        </h2>
                        <p className="text-[#cbcfd1] text-lg mb-10 max-w-2xl mx-auto">
                            En Clínica Cialo planificamos tu tratamiento láser con precisión y una mirada integral de la piel. Agenda tu evaluación para definir la tecnología correcta y un plan seguro para tus objetivos.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20láser"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-10 py-5 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Evaluación
                            </a>
                            <Link
                                href="/tratamientos"
                                className="inline-flex items-center justify-center gap-2 border border-[#cbcfd1] text-white px-10 py-5 font-semibold uppercase tracking-wider hover:bg-white hover:text-[#1b1a18] transition-colors"
                            >
                                Ver Tratamientos
                            </Link>
                        </div>
                        <p className="mt-8 text-[#888] text-sm">
                            📍 Bulnes 220, Of. 509 — Edificio Puerto Mayor II, Los Ángeles, Biobío
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
