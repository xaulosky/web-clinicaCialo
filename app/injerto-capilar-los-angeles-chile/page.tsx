import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Injerto Capilar en Los Ángeles Chile | Clínica CIALO' },
    description: 'Trasplante capilar con técnica FUE en Los Ángeles, Biobío. Injerto de pelo definitivo para alopecia. Dra. Javiera Araya especialista en estética capilar. Resultados naturales garantizados.',
    keywords: 'injerto capilar Los Ángeles, trasplante pelo Chile, técnica FUE Biobío, alopecia tratamiento, calvicie solución, implante capilar Los Ángeles, PRP capilar, pelo artificial',
    openGraph: {
        title: 'Injerto Capilar Los Ángeles - Técnica FUE | Clínica CIALO',
        description: 'Trasplante capilar definitivo con técnica FUE. Resultados naturales. Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/injerto-capilar-los-angeles-chile',
    },
    alternates: {
        canonical: 'https://cialo.cl/injerto-capilar-los-angeles-chile',
    },
};

const faqs = [
    {
        pregunta: '¿Qué es la técnica FUE?',
        respuesta: 'FUE (Follicular Unit Extraction) es la técnica más avanzada de trasplante capilar. Consiste en extraer los folículos uno a uno de la zona donante y trasplantarlos a la zona receptora. No deja cicatriz lineal y permite resultados muy naturales.',
    },
    {
        pregunta: '¿Cuántos folículos necesito?',
        respuesta: 'Depende del grado de alopecia y el área a cubrir. En promedio, un trasplante de entradas requiere 1.500-2.000 folículos. Una coronilla puede necesitar 2.000-3.000. En la consulta evaluamos tu caso específico.',
    },
    {
        pregunta: '¿Cuánto dura el procedimiento?',
        respuesta: 'Dependiendo del número de folículos, entre 4 a 8 horas. Es un procedimiento ambulatorio que se realiza en una sola sesión.',
    },
    {
        pregunta: '¿Cuándo veré los resultados?',
        respuesta: 'El pelo trasplantado cae a las 2-4 semanas (es normal). El nuevo crecimiento comienza a los 3-4 meses. Resultados definitivos a los 12-18 meses.',
    },
    {
        pregunta: '¿Es doloroso?',
        respuesta: 'No. Se realiza con anestesia local. Durante el procedimiento puedes ver películas, escuchar música o descansar. Las molestias post-operatorias son mínimas.',
    },
    {
        pregunta: '¿A qué edad puedo hacerme un injerto?',
        respuesta: 'Se recomienda a partir de los 25 años, cuando el patrón de calvicie está más definido. Sin embargo, cada caso se evalúa individualmente.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Injerto Capilar en Los Ángeles Chile', item: 'https://cialo.cl/injerto-capilar-los-angeles-chile' },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.pregunta,
                acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
            })),
        },
        {
            '@type': 'MedicalBusiness',
            '@id': 'https://cialo.cl/#organization',
            name: 'Clínica CIALO - Injerto Capilar Los Ángeles',
            description: 'Centro especializado en trasplante capilar y tratamientos para la alopecia en Los Ángeles, Chile',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/injerto-capilar-los-angeles-chile',
            telephone: '+56982028473',
            priceRange: '$1.500.000 - $4.000.000',
            medicalSpecialty: 'Dermatology',
        },
        {
            '@type': 'Physician',
            name: 'Dra. Javiera Araya',
            jobTitle: 'Médico Cirujano - Especialista en Estética Capilar',
            description: 'Especialista en injerto capilar con técnica FUE',
            worksFor: { '@id': 'https://cialo.cl/#organization' },
        },
    ],
};

const tratamientos = [
    {
        titulo: 'Injerto FUE',
        descripcion: 'Extracción y trasplante folículo a folículo. Sin cicatrices visibles, resultados naturales y definitivos.',
        precio: 'Desde $1.500.000',
        destacado: true,
    },
    {
        titulo: 'Consulta Capilar',
        descripcion: 'Evaluación completa del cuero cabelludo, diagnóstico de alopecia y plan de tratamiento personalizado.',
        precio: '$50.000',
        destacado: false,
    },
    {
        titulo: 'PRP Capilar',
        descripcion: 'Plasma rico en plaquetas para estimular el crecimiento y fortalecer el cabello existente.',
        precio: '$150.000',
        destacado: false,
    },
    {
        titulo: 'Mesoterapia Capilar',
        descripcion: 'Microinyecciones de vitaminas y minerales para nutrir el folículo piloso.',
        precio: '$110.000',
        destacado: false,
    },
];

const beneficiosFUE = [
    { titulo: 'Sin Cicatrices', descripcion: 'No deja cicatriz lineal visible. Puedes usar el pelo corto sin problemas.' },
    { titulo: 'Resultados Naturales', descripcion: 'Implantación folículo a folículo respetando la dirección natural del pelo.' },
    { titulo: 'Definitivo', descripcion: 'Los folículos trasplantados crecen de por vida. No requieren mantenimiento.' },
    { titulo: 'Recuperación Rápida', descripcion: 'Vuelve a tus actividades en 3-5 días. Sin hospitalización.' },
    { titulo: 'Anestesia Local', descripcion: 'Procedimiento ambulatorio con anestesia local. Sin dolor.' },
    { titulo: 'Alta Supervivencia', descripcion: '+95% de los folículos trasplantados sobreviven y crecen normalmente.' },
];

const proceso = [
    { paso: '01', titulo: 'Evaluación', descripcion: 'Análisis del cuero cabelludo, densidad donante, y diseño de línea frontal personalizada.' },
    { paso: '02', titulo: 'Extracción FUE', descripcion: 'Extracción individual de folículos de la zona donante (nuca) con micropunch.' },
    { paso: '03', titulo: 'Preparación', descripcion: 'Clasificación y preparación de los folículos en solución nutritiva.' },
    { paso: '04', titulo: 'Implantación', descripcion: 'Colocación precisa de cada folículo siguiendo la dirección natural del cabello.' },
];

const candidato = [
    'Alopecia androgenética (calvicie común)',
    'Entradas pronunciadas',
    'Coronilla despoblada',
    'Cicatrices en cuero cabelludo',
    'Cejas o barba despobladas',
    'Alopecia por tracción',
];


export default function InjertoCapilarPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar transparent />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-flex items-center gap-2 bg-[#b8935f]/20 text-[#b8935f] px-4 py-2 rounded-full text-sm font-medium mb-6">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Bulnes 220, Los Ángeles
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Injerto Capilar<br />Técnica FUE
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Recupera tu cabello de forma <strong className="text-white">natural y definitiva</strong>. Trasplante capilar con técnica FUE (Follicular Unit Extraction), el método más avanzado <strong className="text-white">sin cicatrices visibles</strong>.
                            </p>

                            {/* Precio Box */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#cbcfd1]">Injerto Capilar FUE</p>
                                        <p className="text-3xl font-[family-name:var(--font-italiana)] text-[#b8935f]">Desde $1.500.000</p>
                                        <p className="text-xs text-[#cbcfd1]">Consulta de evaluación: $50.000</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-[#cbcfd1]">Especialista</p>
                                        <p className="font-semibold text-white">Dra. Javiera Araya</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20consulta%20de%20injerto%20capilar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Agendar Evaluación
                                </a>
                                <Link
                                    href="/profesionales/javiera-araya"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Ver Perfil Profesional
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-[#cbcfd1]">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Sin cicatrices
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Resultados definitivos
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Anestesia local
                                </span>
                            </div>
                        </div>

                        {/* Professional Card */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
                            <div className="relative h-80">
                                <Image
                                    src="/profesionales/clinica-cialo_Javiera_Araya.webp"
                                    alt="Dra. Javiera Araya - Especialista en Injerto Capilar"
                                    fill
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18] via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-1">Dra. Javiera Araya</h2>
                                    <p className="text-[#b8935f] text-sm">Médico Cirujano | Especialista en Estética Capilar</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Certificada en Técnica FUE
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Universidad San Sebastián
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    +500 procedimientos realizados
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tratamientos */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Tratamientos</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Soluciones para la Alopecia</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tratamientos.map((t, index) => (
                            <div key={index} className={`p-8 rounded-sm transition-all duration-300 ${t.destacado ? 'bg-[#1b1a18] text-white' : 'bg-[#faf6ef] hover:shadow-lg'}`}>
                                {t.destacado && <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-xs font-bold px-2 py-1 mb-4 uppercase">Más solicitado</span>}
                                <h3 className={`text-xl font-[family-name:var(--font-italiana)] mb-3 ${t.destacado ? 'text-white' : 'text-[#1b1a18]'}`}>{t.titulo}</h3>
                                <p className={`text-sm mb-4 ${t.destacado ? 'text-[#cbcfd1]' : 'text-[#6f6a5c]'}`}>{t.descripcion}</p>
                                <span className={`font-semibold ${t.destacado ? 'text-[#b8935f]' : 'text-[#b8935f]'}`}>{t.precio}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beneficios FUE */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Ventajas</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">¿Por qué Elegir Técnica FUE?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {beneficiosFUE.map((b, index) => (
                            <div key={index} className="bg-white p-6 rounded-sm hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">{b.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c]">{b.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proceso */}
            <section className="py-20 bg-[#1b1a18] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">El Procedimiento</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)]">Cómo Funciona el Injerto FUE</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {proceso.map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="text-6xl font-[family-name:var(--font-italiana)] text-[#b8935f]/30 mb-4">{item.paso}</div>
                                <h3 className="font-semibold mb-2">{item.titulo}</h3>
                                <p className="text-sm text-[#cbcfd1]">{item.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Candidatos */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Es para mí?</span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">Candidatos Ideales</h2>
                            <p className="text-[#6f6a5c] mb-6">El injerto capilar FUE es efectivo para hombres y mujeres que presentan:</p>
                            <ul className="space-y-3">
                                {candidato.map((c, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[#6f6a5c]">{c}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative aspect-video rounded-sm overflow-hidden">
                            <Image
                                src="/clinica/clinica-cialo_boxprocedimientos.webp"
                                alt="Procedimiento de injerto capilar en Clínica CIALO"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Preguntas Frecuentes</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Resolvemos tus Dudas</h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <details key={index} className="group bg-white rounded-sm overflow-hidden">
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

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Recupera tu Cabello</span>
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu Evaluación Capilar</h2>
                    <p className="text-[#cbcfd1] mb-8 max-w-2xl mx-auto">Evaluación completa de tu cuero cabelludo y diseño personalizado de tu nuevo cabello. Resultados naturales y definitivos.</p>
                    <a
                        href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20consulta%20de%20injerto%20capilar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                    >
                        Agendar Evaluación - $50.000
                    </a>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
