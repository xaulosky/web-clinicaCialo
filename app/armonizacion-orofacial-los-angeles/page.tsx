import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Armonización Orofacial Los Ángeles Chile | Clínica CIALO' },
    description: 'Armonización facial en Los Ángeles, Biobío. Botox, ácido hialurónico, rinomodelación, bichectomía. Dra. Mariane Kiss - Cirujano Dentista especialista en estética facial.',
    keywords: 'armonización facial Los Ángeles, botox Los Ángeles Chile, ácido hialurónico Biobío, rinomodelación sin cirugía, bichectomía, rellenos faciales, estética facial Los Ángeles',
    openGraph: {
        title: 'Armonización Orofacial Los Ángeles - Botox y Rellenos | Clínica CIALO',
        description: 'Botox, ácido hialurónico, rinomodelación. Resultados naturales. Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/armonizacion-orofacial-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/armonizacion-orofacial-los-angeles',
    },
};

const faqs = [
    {
        pregunta: '¿Qué es la armonización orofacial?',
        respuesta: 'Es un conjunto de procedimientos estéticos no quirúrgicos que buscan equilibrar y realzar los rasgos faciales. Combina toxina botulínica, ácido hialurónico y otros tratamientos para lograr un rostro más armónico y juvenil.',
    },
    {
        pregunta: '¿Por qué un cirujano dentista realiza estos procedimientos?',
        respuesta: 'Los cirujanos dentistas tienen un profundo conocimiento de la anatomía facial, estructuras óseas, músculos y nervios de la cara. Esta formación los hace especialmente calificados para procedimientos de armonización orofacial.',
    },
    {
        pregunta: '¿Cuánto dura el efecto del botox?',
        respuesta: 'El efecto del botox dura entre 4 a 6 meses. Con aplicaciones regulares, el efecto puede extenderse. Se recomienda mantener un tratamiento de mantenimiento 2-3 veces al año.',
    },
    {
        pregunta: '¿El ácido hialurónico es seguro?',
        respuesta: 'Sí, el ácido hialurónico es una sustancia que existe naturalmente en nuestro cuerpo. Es biocompatible, no produce alergias y es reversible. Usamos productos de marcas certificadas internacionalmente.',
    },
    {
        pregunta: '¿Duele el procedimiento?',
        respuesta: 'Las molestias son mínimas. Usamos anestesia tópica y los productos contienen lidocaína. La mayoría de los pacientes describen la sensación como un pequeño pinchazo.',
    },
    {
        pregunta: '¿Puedo maquillarme después del tratamiento?',
        respuesta: 'Se recomienda esperar 24 horas antes de maquillarse. Puedes retomar tus actividades normales inmediatamente, solo evitando ejercicio intenso y exposición solar extrema por 48 horas.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Armonización Orofacial Los Ángeles Chile', item: 'https://cialo.cl/armonizacion-orofacial-los-angeles' },
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
            name: 'Clínica CIALO - Armonización Orofacial Los Ángeles',
            description: 'Centro especializado en armonización facial y tratamientos estéticos en Los Ángeles, Chile',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/armonizacion-orofacial-los-angeles',
            telephone: '+56982028473',
            priceRange: '$150.000 - $500.000',
            medicalSpecialty: 'Dentistry',
        },
        {
            '@type': 'Dentist',
            name: 'Dra. Mariane Kiss Molina',
            jobTitle: 'Cirujano Dentista - Especialista en Armonización Orofacial',
            description: 'Especialista en estética facial integrada',
            worksFor: { '@id': 'https://cialo.cl/#organization' },
        },
    ],
};

const tratamientos = [
    {
        titulo: 'Toxina Botulínica (Botox)',
        descripcion: 'Tratamiento de arrugas dinámicas: frente, entrecejo, patas de gallo. Resultados naturales y seguros.',
        precio: 'Desde $150.000',
        zonas: ['Frente', 'Entrecejo', 'Patas de gallo', 'Sonrisa gingival'],
    },
    {
        titulo: 'Ácido Hialurónico',
        descripcion: 'Rellenos faciales para volumen, definición y corrección de asimetrías. Labios, surcos, pómulos.',
        precio: 'Desde $250.000',
        zonas: ['Labios', 'Surcos nasogenianos', 'Pómulos', 'Mentón'],
    },
    {
        titulo: 'Rinomodelación',
        descripcion: 'Corrección del perfil nasal sin cirugía mediante ácido hialurónico. Resultados inmediatos.',
        precio: 'Desde $350.000',
        zonas: ['Dorso nasal', 'Punta nasal', 'Corrección de asimetrías'],
    },
    {
        titulo: 'Tratamiento Bruxismo',
        descripcion: 'Aplicación de toxina botulínica en maseteros para aliviar bruxismo y estilizar el rostro.',
        precio: '$200.000',
        zonas: ['Maseteros', 'Alivio tensional', 'Contorno facial'],
    },
];

const beneficios = [
    { titulo: 'Sin Cirugía', descripcion: 'Procedimientos ambulatorios con mínimo tiempo de recuperación.' },
    { titulo: 'Resultados Naturales', descripcion: 'Realzamos tu belleza natural sin cambiar tu expresión.' },
    { titulo: 'Conocimiento Anatómico', descripcion: 'Cirujano dentista con dominio profundo de la anatomía facial.' },
    { titulo: 'Productos Premium', descripcion: 'Ácido hialurónico y toxina botulínica de marcas certificadas.' },
    { titulo: 'Personalizado', descripcion: 'Cada tratamiento se adapta a tus rasgos y objetivos únicos.' },
    { titulo: 'Seguro', descripcion: 'Procedimientos reversibles con materiales biocompatibles.' },
];

const zonasTratamiento = [
    { zona: 'Tercio Superior', descripcion: 'Frente, entrecejo, cejas, patas de gallo', tratamiento: 'Botox' },
    { zona: 'Tercio Medio', descripcion: 'Pómulos, ojeras, nariz, surcos', tratamiento: 'Ácido Hialurónico' },
    { zona: 'Tercio Inferior', descripcion: 'Labios, mentón, líneas de marioneta', tratamiento: 'Ácido Hialurónico' },
    { zona: 'Contorno Facial', descripcion: 'Maseteros, ángulo mandibular', tratamiento: 'Botox + Rellenos' },
];


export default function ArmonizacionOrofacialPage() {
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
                                Armonización<br />Orofacial
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Realza tu belleza natural con <strong className="text-white">botox y ácido hialurónico</strong>. Tratamientos personalizados para un rostro más armónico, juvenil y expresivo. <strong className="text-white">Resultados naturales sin cirugía</strong>.
                            </p>

                            {/* Precio Box */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#cbcfd1]">Evaluación de Armonización</p>
                                        <p className="text-3xl font-[family-name:var(--font-italiana)] text-[#b8935f]">Consulta Gratuita*</p>
                                        <p className="text-xs text-[#cbcfd1]">*Con procedimiento</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-[#cbcfd1]">Especialista</p>
                                        <p className="font-semibold text-white">Dra. Mariane Kiss</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20de%20armonización%20facial"
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
                                    href="/profesionales/mariane-kiss"
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
                                    Sin cirugía
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Resultados inmediatos
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Tratamiento reversible
                                </span>
                            </div>
                        </div>

                        {/* Professional Card */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
                            <div className="relative h-80">
                                <Image
                                    src="/profesionales/clinica-cialo_Mariane_Kiss.webp"
                                    alt="Dra. Mariane Kiss - Especialista en Armonización Orofacial"
                                    fill
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18] via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-1">Dra. Mariane Kiss</h2>
                                    <p className="text-[#b8935f] text-sm">Cirujano Dentista | Armonización Orofacial</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Especialista en Armonización Facial
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Certificada en Toxina Botulínica
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#cbcfd1]">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Certificada en Rellenos Faciales
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
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Procedimientos de Armonización</h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">Cada tratamiento se personaliza según tus rasgos y objetivos para lograr resultados naturales.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {tratamientos.map((t, index) => (
                            <div key={index} className="bg-[#faf6ef] p-8 rounded-sm hover:shadow-lg transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">{t.titulo}</h3>
                                    <span className="text-[#b8935f] font-semibold whitespace-nowrap ml-4">{t.precio}</span>
                                </div>
                                <p className="text-sm text-[#6f6a5c] mb-4">{t.descripcion}</p>
                                <div className="flex flex-wrap gap-2">
                                    {t.zonas.map((zona, i) => (
                                        <span key={i} className="bg-[#b8935f]/10 text-[#1b1a18] px-3 py-1 text-xs rounded-full">{zona}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Zonas de Tratamiento */}
            <section className="py-20 bg-[#1b1a18] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Zonas</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)]">Áreas de Tratamiento</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {zonasTratamiento.map((z, index) => (
                            <div key={index} className="bg-white/5 p-6 rounded-sm border border-white/10">
                                <h3 className="font-semibold text-[#b8935f] mb-2">{z.zona}</h3>
                                <p className="text-sm text-[#cbcfd1] mb-3">{z.descripcion}</p>
                                <span className="text-xs bg-[#b8935f]/20 text-[#b8935f] px-2 py-1 rounded">{z.tratamiento}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beneficios */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Ventajas</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">¿Por qué Elegirnos?</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {beneficios.map((b, index) => (
                            <div key={index} className="bg-[#faf6ef] p-6 rounded-sm hover:shadow-lg transition-all">
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
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Realza tu Belleza</span>
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu Evaluación de Armonización</h2>
                    <p className="text-[#cbcfd1] mb-8 max-w-2xl mx-auto">Evaluación personalizada para diseñar el tratamiento ideal según tus rasgos y objetivos. Resultados naturales garantizados.</p>
                    <a
                        href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20de%20armonización%20facial"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                    >
                        Agendar Evaluación Gratuita
                    </a>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile</p>
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
