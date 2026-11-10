import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Nutricionista en Los Ángeles Chile | Clínica CIALO' },
    description: 'Nutricionista deportiva en Los Ángeles, Biobío. Evaluación nutricional con InBody 970I, calorimetría indirecta, planes personalizados para recomposición corporal. Agenda tu consulta.',
    keywords: 'nutricionista Los Ángeles, nutrición deportiva Chile, nutricionista Biobío, evaluación nutricional, InBody Los Ángeles, calorimetría indirecta, bajar de peso Los Ángeles',
    openGraph: {
        title: 'Nutricionista Los Ángeles - Valentina Verdejo | Clínica CIALO',
        description: 'Nutricionista deportiva con tecnología InBody 970 y calorimetría indirecta. Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/nutricionista-los-angeles-chile',
    },
    alternates: {
        canonical: 'https://cialo.cl/nutricionista-los-angeles-chile',
    },
};

const faqs = [
    {
        pregunta: '¿Qué es el InBody 970?',
        respuesta: 'Es el analizador de composición corporal más preciso del mercado. Mide tu masa muscular segmentada, porcentaje de grasa, agua corporal, grasa visceral y más en solo 60 segundos.',
    },
    {
        pregunta: '¿Para qué sirve la calorimetría indirecta?',
        respuesta: 'Mide exactamente cuántas calorías quema tu cuerpo en reposo. Esto permite crear planes nutricionales precisos, evitando dietas genéricas que no funcionan.',
    },
    {
        pregunta: '¿Cuántas consultas necesito?',
        respuesta: 'Depende de tus objetivos. Generalmente se recomienda un control mensual para ajustar el plan. Los primeros 3 meses son clave para establecer hábitos.',
    },
    {
        pregunta: '¿Trabajan con deportistas?',
        respuesta: 'Sí. Nuestros especialistas en nutrición deportiva trabajan con atletas de diferentes disciplinas para optimizar el rendimiento y composición corporal.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Nutricionista en Los Ángeles Chile', item: 'https://cialo.cl/nutricionista-los-angeles-chile' },
            ],
        },
        {
            '@type': 'MedicalBusiness',
            name: 'Clínica CIALO - Nutrición Los Ángeles',
            description: 'Centro especializado en nutrición clínica y deportiva en Los Ángeles, Chile. Atención experta con InBody 970 y Calorimetría Indirecta.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/nutricionista-los-angeles-chile',
            telephone: '+56 9 8202 8473',
            openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
        },
        {
            '@type': 'Person',
            name: 'Valentina Andrea Verdejo Merino',
            jobTitle: 'Nutricionista Dietista',
            description: 'Licenciada en Nutrición - Especialista en Nutrición Deportiva',
        },
        {
             '@type': 'Person',
             name: 'Rosella Zaffiri Gutiérrez',
             jobTitle: 'Nutricionista',
             description: 'Nutricionista especialista en Cirugía Bariátrica',
        },
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.pregunta,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.respuesta
                }
            }))
        }
    ],
};

const servicios = [
    {
        titulo: 'Evaluación Nutricional',
        descripcion: 'Consulta completa con análisis de hábitos, historial y objetivos personalizados.',
        precio: '$40.000',
    },
    {
        titulo: 'InBody 970',
        descripcion: 'Análisis de composición corporal de grado médico. A diferencia de las básculas tradicionales, nuestra tecnología avanzada en Clínica Cialo nos permite brindarte precisión exacta sobre tu masa muscular segmentada, porcentaje de grasa y agua corporal, siendo de los pocos centros en Los Ángeles con este nivel tecnológico.',
        precio: '$15.000',
        link: '/inbody-970-los-angeles',
    },
    {
        titulo: 'Calorimetría Indirecta',
        descripcion: 'Medición exacta de tu metabolismo basal. Ideal para planes de pérdida de peso.',
        precio: '$50.000',
        link: '/calorimetria-indirecta-los-angeles',
    },
    {
        titulo: 'Plan Nutricional',
        descripcion: 'Dieta personalizada según tus objetivos: recomposición, deportivo, clínico.',
        precio: 'Incluido',
    },
];

const objetivos = [
    { titulo: 'Pérdida de Peso', descripcion: 'Planes efectivos y sostenibles para reducir grasa corporal' },
    { titulo: 'Aumento de Masa Muscular', descripcion: 'Nutrición fitness para deportistas y atletas' },
    { titulo: 'Recomposición Corporal', descripcion: 'Perder grasa y ganar músculo simultáneamente' },
    { titulo: 'Nutricionista Deportivo en Los Ángeles', descripcion: 'Optimiza tu rendimiento deportivo con alimentación y suplementación avanzada, apoyado en métricas precisas.' },
    { titulo: 'Control de Enfermedades', descripcion: 'Diabetes, hipertensión, colesterol, resistencia a insulina' },
    { titulo: 'Cirugía Bariátrica', descripcion: 'Preparación y seguimiento nutricional pre y post quirúrgico con especialistas certificadas.' },
];

export default function NutricionistaPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar transparent />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18] pt-28">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 text-center">
                    <div>
                        <span className="inline-block text-[#b8935f] uppercase tracking-[0.3em] text-xs font-semibold mb-6">
                            Expertos en Nutrición Clínica y Deportiva
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-5xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                            La Mejor Nutricionista en Los Ángeles, Chile
                        </h1>
                        <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed max-w-3xl mx-auto">
                            Si buscas una evaluación completa en la región del Biobío, en <strong className="text-white">Clínica Cialo (Bulnes 220)</strong> contamos con la atención experta de Pía Ramírez, Valentina Verdejo y Rosella Zaffiri. Destacamos por integrar tecnología de grado médico avanzada como el InBody 970 y Calorimetría Indirecta para diseñar un plan 100% adaptado a tus metas. <em>Atención particular (boleta reembolsable en Isapres y Fonasa según plan).</em>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/consultas/evaluacion-nutricional"
                                className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Agendar Evaluación
                            </Link>
                            <Link
                                href="#equipo"
                                className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                            >
                                Conocer al Equipo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Conoce a tu Nutricionista (Biography Section) */}
            <section id="equipo" className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#faf6ef]/50 -z-10 transform skew-x-12 translate-x-1/2"></div>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Experiencia y Confianza</span>
                        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Conoce a tu Nutricionista en Los Ángeles</h2>
                        <p className="text-[#6f6a5c] mt-4 max-w-2xl mx-auto">Profesionales altamente capacitadas, especializadas en llevar tu salud y rendimiento al máximo nivel utilizando herramientas clínicas avanzadas.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-16 item-center">
                         {/* Valentina */}
                        <div className="flex flex-col md:flex-row gap-8 items-start hover:shadow-xl p-8 rounded-sm transition-shadow duration-300 border border-gray-100 bg-white">
                            <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden border-2 border-[#b8935f] relative">
                                <Image
                                    src="/profesionales/clinica-cialo_Valentina_Verdejo.webp"
                                    alt="Nutricionista Valentina Verdejo en Los Ángeles"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-1">Valentina Verdejo</h3>
                                <p className="text-[#b8935f] font-semibold text-sm uppercase tracking-wide mb-4">Nutrición Deportiva & Clínica</p>
                                <p className="text-[#6f6a5c] mb-6 text-sm leading-relaxed">
                                    Licenciada en Nutrición y Dietética por la <strong>Universidad del Desarrollo (UDD)</strong>, especializada en recomposición corporal y rendimiento deportivo. Experta en evaluación avanzada utilizando calorimetría indirecta y bioimpedanciometría grado médico (InBody 970), lo que garantiza precisión absoluta en el diseño dietoterapéutico.
                                </p>
                                <Link href="/profesionales/valentina-verdejo" className="text-sm font-semibold text-[#1b1a18] hover:text-[#b8935f] transition-colors border-b border-[#1b1a18] hover:border-[#b8935f] pb-1">Ver perfil completo →</Link>
                            </div>
                        </div>

                        {/* Rosella */}
                        <div className="flex flex-col md:flex-row gap-8 items-start hover:shadow-xl p-8 rounded-sm transition-shadow duration-300 border border-gray-100 bg-white">
                            <div className="w-40 h-40 shrink-0 rounded-full overflow-hidden border-2 border-[#b8935f] relative">
                                <Image
                                    src="/profesionales/clinica-cialo_Rosella_Zaffiri.webp"
                                    alt="Nutricionista Rosella Zaffiri Especialista en Cirugía Bariátrica"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-1">Rosella Zaffiri</h3>
                                <p className="text-[#b8935f] font-semibold text-sm uppercase tracking-wide mb-4">Nutrición & Cirugía Bariátrica</p>
                                <p className="text-[#6f6a5c] mb-6 text-sm leading-relaxed">
                                    Nutricionista egresada de la <strong>Universidad Viña del Mar</strong> con Certificación Internacional del <strong>Instituto Vive Sano Brasil</strong> especializada en el manejo nutricional pre y post Cirugía Bariátrica. Su enfoque dieto terapéutico busca no solo la adaptación física del paciente, sino instaurar hábitos saludables perdurables a lo largo del ciclo vital.
                                </p>
                                <Link href="/profesionales/rosella-zaffiri" className="text-sm font-semibold text-[#1b1a18] hover:text-[#b8935f] transition-colors border-b border-[#1b1a18] hover:border-[#b8935f] pb-1">Ver perfil completo →</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Servicios</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Evaluación con Tecnología de Vanguardia</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicios.map((servicio, index) => (
                            <div key={index} className="bg-[#faf6ef] p-8 rounded-sm hover:shadow-lg transition-all group">
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">{servicio.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">{servicio.descripcion}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[#b8935f] font-semibold">{servicio.precio}</span>
                                    {servicio.link && (
                                        <Link href={servicio.link} className="text-sm text-[#6f6a5c] hover:text-[#b8935f]">
                                            Más info →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Objetivos */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Qué Objetivo Tienes?</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Planes para Cada Meta</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {objetivos.map((obj, index) => (
                            <div key={index} className="bg-white p-6 rounded-sm hover:shadow-lg transition-all">
                                <h3 className="font-semibold text-[#1b1a18] mb-2">{obj.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c]">{obj.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Preguntas Frecuentes</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Resolvemos tus Dudas</h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq: { pregunta: string; respuesta: string }, index: number) => (
                            <details key={index} className="group bg-[#faf6ef] rounded-sm overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#f0ede8] transition-colors">
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

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Comienza tu Transformación</h2>
                    <p className="text-[#cbcfd1] mb-8">Evaluación nutricional completa con tecnología de vanguardia. Planes personalizados que sí funcionan.</p>
                    <Link
                        href="/consultas/evaluacion-nutricional"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Agendar Evaluación Online
                    </Link>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile | Lun-Vie 08:30-20:00, Sáb 09:00-15:00</p>
                </div>
            </section >

            <Footer />
        </div>
    );
}
