import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Matrona en Los Ángeles | Stefania Kuncar | Clínica CIALO' },
    description: 'Matrona especialista en Los Ángeles, Biobío. Control ginecológico, PAP, inserción de DIU Mirena, láser íntimo CO2, educación sexual. Stefania Kuncar - atención cercana y profesional.',
    keywords: 'matrona Los Ángeles, matrona Chile, control ginecológico Biobío, PAP Los Ángeles, DIU Mirena matrona, láser íntimo, salud femenina, matrona consulta',
    openGraph: {
        title: 'Matrona Los Ángeles - Stefania Kuncar | Control Ginecológico',
        description: 'Matrona especialista. Control ginecológico, PAP, DIU, láser íntimo. Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/matrona-los-angeles-chile',
    },
    alternates: {
        canonical: 'https://cialo.cl/matrona-los-angeles-chile',
    },
};

const faqs = [
    {
        pregunta: '¿Cuánto cuesta una consulta con matrona en Los Ángeles?',
        respuesta: 'El control ginecológico con matrona en Clínica CIALO tiene un valor de $30.000 y dura entre 30 y 40 minutos. Puedes reservarlo online y pagarlo con Webpay al momento de agendar, sin pagos adicionales en la clínica.',
    },
    {
        pregunta: '¿Qué hace una matrona en la consulta?',
        respuesta: 'Atiende la salud sexual y reproductiva con enfoque preventivo y educativo: control ginecológico, toma de PAP, orientación y control de métodos anticonceptivos, inserción y retiro de DIU e implantes, evaluación de síntomas como flujo o dolor, y educación en salud sexual.',
    },
    {
        pregunta: '¿Necesito orden médica o derivación?',
        respuesta: 'No. Puedes agendar directamente tu hora particular con la matrona, sin orden ni derivación previa. Si tienes exámenes o informes anteriores, tráelos a la consulta.',
    },
    {
        pregunta: '¿Desde qué edad puedo atenderme con matrona?',
        respuesta: 'Desde el inicio de la vida sexual o cuando aparezcan dudas sobre el ciclo menstrual, la anticoncepción o la salud íntima. La consulta con matrona es un buen primer paso en adolescentes y adultas, con un enfoque educativo y sin juicios.',
    },
    {
        pregunta: '¿Cuál es la diferencia entre matrona y ginecólogo?',
        respuesta: 'La matrona se especializa en salud femenina integral y control preventivo. Para cirugías, patologías complejas o embarazos de alto riesgo, trabajamos en conjunto con los ginecólogos de la clínica. Muchas mujeres prefieren la atención de matrona por su enfoque más cercano y educativo.',
    },
    {
        pregunta: '¿Cada cuánto debo hacerme el PAP?',
        respuesta: 'Si tus PAP anteriores son normales, se recomienda cada 3 años entre los 25 y 64 años. En caso de resultados alterados o factores de riesgo, el médico indicará una frecuencia mayor.',
    },
    {
        pregunta: '¿Duele la inserción del DIU?',
        respuesta: 'Puede haber molestias similares a cólicos menstruales durante y después del procedimiento. Recomendamos tomar un analgésico 30 minutos antes. La mayoría de las pacientes toleran muy bien el procedimiento.',
    },
    {
        pregunta: '¿El láser íntimo es seguro?',
        respuesta: 'Sí, el láser CO2 fraccionado es un procedimiento seguro y aprobado para uso ginecológico. No requiere anestesia, es ambulatorio y tiene mínimo tiempo de recuperación. Los resultados son progresivos y duraderos.',
    },
    {
        pregunta: '¿Dónde atienden y cómo agendo?',
        respuesta: 'En Bulnes 220, Oficina 509, Edificio Puerto Mayor II, Los Ángeles, Región del Biobío. Puedes reservar online: la web muestra los días y horas realmente disponibles en su agenda y confirmas al instante.',
    },
    {
        pregunta: '¿Puedo atenderme si estoy embarazada?',
        respuesta: 'Para controles de embarazo trabajamos en conjunto con los gineco-obstetras de la clínica. Para otros procedimientos, evaluamos caso a caso según la etapa del embarazo.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'MedicalBusiness',
            '@id': 'https://cialo.cl/#organization',
            name: 'Clínica CIALO - Matrona Los Ángeles',
            description: 'Atención de matrona especializada en salud femenina en Los Ángeles, Chile',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: -37.4693,
                longitude: -72.3544,
            },
            url: 'https://cialo.cl/matrona-los-angeles-chile',
            telephone: '+56982028473',
            priceRange: '$25.000 - $150.000',
            openingHours: 'Mo-Fr 09:00-19:00, Sa 09:00-14:00',
            medicalSpecialty: ['Midwifery', 'Gynecology'],
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
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Matrona en Los Ángeles', item: 'https://cialo.cl/matrona-los-angeles-chile' },
            ],
        },
        {
            '@type': 'Person',
            name: 'Stefania Victoria Kuncar Núñez',
            jobTitle: 'Matrona',
            description: 'Matrona con especialización en Láser CO2 Íntimo y educación sexual',
            worksFor: { '@id': 'https://cialo.cl/#organization' },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Universidad Andrés Bello',
            },
        },
    ],
};

const servicios = [
    {
        titulo: 'Control Ginecológico',
        descripcion: 'Evaluación integral de salud femenina con enfoque preventivo y educativo.',
        precio: '$30.000',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        titulo: 'PAP (Papanicolau)',
        descripcion: 'Toma de muestra cervical para detección temprana de cáncer.',
        precio: 'Incluido en control',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    },
    {
        titulo: 'Inserción de DIU',
        descripcion: 'Colocación profesional de DIU Mirena, Kyleena o dispositivo de cobre.',
        precio: 'Desde $80.000',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        ),
    },
    {
        titulo: 'Láser CO2 Íntimo',
        descripcion: 'Rejuvenecimiento vaginal, tratamiento de incontinencia leve y sequedad.',
        precio: 'Desde $150.000',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
];

const beneficios = [
    {
        titulo: 'Atención Cercana',
        descripcion: 'Ambiente cálido y confidencial. Sin prisas, con tiempo para resolver todas tus dudas.',
    },
    {
        titulo: 'Enfoque Preventivo',
        descripcion: 'Detección temprana de patologías. Educación en autocuidado y salud sexual.',
    },
    {
        titulo: 'Tecnología Avanzada',
        descripcion: 'Láser CO2 de última generación para tratamientos íntimos efectivos y seguros.',
    },
    {
        titulo: 'Derivación Oportuna',
        descripcion: 'Trabajo en equipo con ginecólogos de la clínica para casos que requieran especialista.',
    },
];

const condiciones = [
    { nombre: 'Control anual', descripcion: 'Chequeo preventivo de rutina' },
    { nombre: 'Irregularidades menstruales', descripcion: 'Alteraciones del ciclo' },
    { nombre: 'Anticoncepción', descripcion: 'Asesoría y métodos' },
    { nombre: 'Infecciones vaginales', descripcion: 'Diagnóstico y tratamiento' },
    { nombre: 'Sequedad vaginal', descripcion: 'Menopausia y otros' },
    { nombre: 'Incontinencia leve', descripcion: 'Pérdidas de orina' },
];

const proceso = [
    { paso: '01', titulo: 'Reserva tu Hora', descripcion: 'Agenda online o por WhatsApp. Elige el horario que más te acomode.' },
    { paso: '02', titulo: 'Consulta Inicial', descripcion: 'Conversación tranquila sobre tu historial, síntomas y preocupaciones.' },
    { paso: '03', titulo: 'Examen y Evaluación', descripcion: 'Examen ginecológico completo, PAP si corresponde, y evaluación integral.' },
    { paso: '04', titulo: 'Plan de Cuidado', descripcion: 'Indicaciones personalizadas, tratamientos si es necesario, y seguimiento.' },
];


export default function MatronaPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar transparent />

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
                                Matrona en<br />Los Ángeles, Chile
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Atención ginecológica <strong className="text-white">cercana y profesional</strong>. Control preventivo, PAP, inserción de DIU y tratamientos con <strong className="text-white">láser íntimo CO2</strong>. Tu salud femenina en un ambiente de confianza.
                            </p>

                            {/* Precio Box */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#cbcfd1]">Control Ginecológico</p>
                                        <p className="text-3xl font-[family-name:var(--font-italiana)] text-[#b8935f]">$30.000</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-[#cbcfd1]">Profesional</p>
                                        <p className="font-semibold text-white">Stefania Kuncar</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <Link
                                    href="/consultas/consulta-matrona"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Reservar Consulta
                                </Link>
                                <Link
                                    href="/profesionales/stefania-kuncar"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Ver Perfil Completo
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-[#cbcfd1]">
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Atención personalizada
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Ambiente de confianza
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Tecnología láser
                                </span>
                            </div>
                        </div>

                        {/* Professional Card */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
                            <div className="relative h-80">
                                <Image
                                    src="/profesionales/clinica-cialo_Stefania_Kuncar.webp"
                                    alt="Stefania Kuncar - Matrona especializada"
                                    fill
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18] via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-1">
                                        Stefania Kuncar
                                    </h2>
                                    <p className="text-[#b8935f] text-sm">
                                        Matrona | Universidad Andrés Bello
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Especialista en Láser CO2 Íntimo
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Diplomado en Educación Sexual
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Certificada en DIU y anticoncepción
                                </div>
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
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Atención Integral de Matrona</h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">Cuidado completo de tu salud femenina con enfoque preventivo y tecnología de vanguardia.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicios.map((servicio, index) => (
                            <div key={index} className="bg-[#faf6ef] p-8 rounded-sm hover:shadow-lg transition-all duration-300 group">
                                <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6 text-[#b8935f] group-hover:bg-[#b8935f] group-hover:text-white transition-all">
                                    {servicio.icono}
                                </div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">{servicio.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">{servicio.descripcion}</p>
                                <span className="text-[#b8935f] font-semibold">{servicio.precio}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beneficios */}
            <section className="py-20 bg-[#1b1a18] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Por qué elegirnos?</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] mb-4">Una Atención Diferente</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {beneficios.map((beneficio, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-[family-name:var(--font-italiana)] text-[#b8935f]">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="font-semibold mb-2">{beneficio.titulo}</h3>
                                <p className="text-sm text-[#cbcfd1]">{beneficio.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proceso */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Cómo funciona?</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Tu Primera Consulta</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {proceso.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="text-6xl font-[family-name:var(--font-italiana)] text-[#b8935f]/20 mb-4">{item.paso}</div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">{item.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c]">{item.descripcion}</p>
                                {index < proceso.length - 1 && (
                                    <div className="hidden md:block absolute top-8 right-0 w-full h-0.5 bg-[#b8935f]/20 -z-10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Condiciones */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Cuándo Consultar?</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Motivos de Consulta</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {condiciones.map((condicion, index) => (
                            <div key={index} className="bg-white p-6 rounded-sm text-center hover:shadow-lg transition-all">
                                <h3 className="font-semibold text-[#1b1a18] mb-1">{condicion.nombre}</h3>
                                <p className="text-xs text-[#6f6a5c]">{condicion.descripcion}</p>
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
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Matrona en Los Ángeles</h2>
                        <p className="text-[#6f6a5c] mt-4 max-w-2xl mx-auto text-sm">
                            Revisa el detalle y los requisitos en la ficha del{' '}
                            <Link href="/consultas/consulta-matrona" className="text-[#b8935f] font-semibold hover:underline">control ginecológico con matrona</Link>,
                            o consulta con nuestra{' '}
                            <Link href="/ginecologo-los-angeles-chile" className="text-[#b8935f] font-semibold hover:underline">ginecóloga</Link> si necesitas atención médica especializada.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
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

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Agenda tu Hora</span>
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Tu Salud Femenina en las Mejores Manos</h2>
                    <p className="text-[#cbcfd1] mb-8 max-w-2xl mx-auto">Atención de matrona profesional y cercana en Los Ángeles. Control ginecológico, PAP, DIU y tratamientos con láser íntimo.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/consultas/consulta-matrona"
                            className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Agendar Consulta Online
                        </Link>
                    </div>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile | Lunes a Viernes 8:30-20:00</p>
                </div>
            </section>

            {/* Ubicación */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Ubicación</h2>
                            <p className="text-[#6f6a5c] mb-4">
                                <strong>Clínica CIALO</strong><br />
                                Bulnes 220, Of. 509<br />
                                Edificio Puerto Mayor II<br />
                                Los Ángeles, Biobío, Chile
                            </p>
                            <p className="text-[#6f6a5c] mb-4">
                                <strong>Horario de Atención:</strong><br />
                                Lunes a Viernes: 08:30 - 20:00<br />
                                Sábado: 09:00 - 15:00
                            </p>
                            <a href="https://maps.google.com/?q=Bulnes+220+Los+Angeles+Chile" target="_blank" rel="noopener noreferrer" className="text-[#b8935f] font-semibold hover:underline">
                                Ver en Google Maps →
                            </a>
                        </div>
                        <div className="h-64 lg:h-80 rounded-sm overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.7!2d-72.355!3d-37.470!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBulnes%20220%2C%20Los%20%C3%81ngeles!5e0!3m2!1ses!2scl!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Clínica CIALO"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
