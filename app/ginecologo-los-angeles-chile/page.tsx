import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Ginecólogo en Los Ángeles Chile | Clínica CIALO' },
    description: 'Ginecóloga especialista CONACEM en Los Ángeles, Biobío. Consultas ginecológicas, PAP, ecografías, inserción de DIU, ginecoestética láser. Dra. Maria Laura Villarroel. Agenda tu hora.',
    keywords: 'ginecólogo Los Ángeles, ginecología Chile, consulta ginecológica Biobío, PAP Los Ángeles, DIU Mirena, ginecoestética, labioplastia Los Ángeles, láser CO2 íntimo',
    openGraph: {
        title: 'Ginecólogo Los Ángeles - Dra. Maria Laura Villarroel | Clínica CIALO',
        description: 'Ginecóloga Obstetra certificada CONACEM. Consultas, PAP, ecografías, DIU, ginecoestética. Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/ginecologo-los-angeles-chile',
    },
    alternates: {
        canonical: 'https://cialo.cl/ginecologo-los-angeles-chile',
    },
};

const faqs = [
    {
        pregunta: '¿Cada cuánto debo ir al ginecólogo?',
        respuesta: 'Se recomienda una consulta ginecológica anual para mujeres adultas. Esto incluye examen físico, PAP cada 3 años (si es normal) y evaluación de salud reproductiva.',
    },
    {
        pregunta: '¿Qué debo llevar a mi primera consulta?',
        respuesta: 'Lleva tu cédula de identidad, listado de medicamentos que tomas, fecha de tu última menstruación y, si tienes, exámenes anteriores (PAP, ecografías, mamografías).',
    },
    {
        pregunta: '¿El DIU Mirena duele al colocarlo?',
        respuesta: 'Puede haber molestias leves durante la inserción, similares a cólicos menstruales. El procedimiento dura pocos minutos y la protección anticonceptiva es inmediata.',
    },
    {
        pregunta: '¿Qué es la ginecoestética?',
        respuesta: 'Es el área de la ginecología enfocada en tratamientos estéticos de la zona íntima femenina, incluyendo rejuvenecimiento vaginal con láser, labioplastia y tratamientos de despigmentación.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Ginecólogo en Los Ángeles Chile', item: 'https://cialo.cl/ginecologo-los-angeles-chile' },
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
            name: 'Clínica CIALO - Ginecología Los Ángeles',
            description: 'Centro especializado en ginecología y obstetricia en Los Ángeles, Chile',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/ginecologo-los-angeles-chile',
            telephone: '+56 9 8202 8473',
            openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
            medicalSpecialty: ['Gynecology', 'Obstetrics'],
        },
        {
            '@type': 'Physician',
            name: 'Dra. Maria Laura Villarroel Reyes',
            description: 'Ginecóloga y Obstetra - Especialista CONACEM',
            medicalSpecialty: 'Gynecology',
            worksFor: { '@id': 'https://cialo.cl/#organization' },
        },
    ],
};

const servicios = [
    {
        titulo: 'Consulta Ginecológica',
        descripcion: 'Evaluación completa de salud femenina, antecedentes y examen ginecológico.',
        precio: '$45.000',
    },
    {
        titulo: 'PAP y Exámenes',
        descripcion: 'Papanicolau, colposcopía y toma de muestras para detección temprana.',
        precio: 'Incluido',
    },
    {
        titulo: 'Ecografía Ginecológica',
        descripcion: 'Ultrasonido transvaginal y abdominal para evaluación pélvica.',
        precio: '$30.000',
    },
    {
        titulo: 'Inserción DIU',
        descripcion: 'Colocación de dispositivos Mirena, Kyleena o Asertia.',
        precio: 'Desde $80.000',
    },
    {
        titulo: 'Láser CO2 Íntimo',
        descripcion: 'Rejuvenecimiento vaginal, tratamiento de incontinencia y sequedad.',
        precio: 'Desde $150.000',
    },
    {
        titulo: 'Labioplastia',
        descripcion: 'Cirugía estética de labios menores con técnica segura.',
        precio: 'Consultar',
    },
];

const condiciones = [
    'Control ginecológico anual',
    'Irregularidades menstruales',
    'Síndrome premenstrual',
    'Menopausia y climaterio',
    'Infecciones vaginales',
    'Anticoncepción',
    'Dolor pélvico',
    'Incontinencia urinaria',
];


export default function GinecologoPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar transparent />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block text-[#b8935f] uppercase tracking-[0.3em] text-xs font-semibold mb-6">
                                Especialista en Ginecología
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Ginecólogo en Los Ángeles, Chile
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Atención ginecológica integral con <strong className="text-white">certificación CONACEM</strong>. Consultas, PAP, ecografías, inserción de DIU y tratamientos de <strong className="text-white">ginecoestética láser</strong>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/consultas/consulta-ginecologia"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Agendar Consulta
                                </Link>
                                <Link
                                    href="/profesionales/maria-laura-villarroel"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Ver Perfil Profesional
                                </Link>
                            </div>
                        </div>

                        {/* Doctor Card */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <div className="flex items-start gap-6">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#b8935f]">
                                    <Image
                                        src="/profesionales/clinica-cialo_Maria_Laura_Villarroel.webp"
                                        alt="Dra. Maria Laura Villarroel - Ginecóloga"
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-[10px] font-bold px-2 py-1 mb-2 uppercase">Principal</span>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">
                                        Dra. Maria Laura Villarroel
                                    </h2>
                                    <p className="text-[#b8935f] text-sm mb-3">
                                        Ginecóloga y Obstetra
                                    </p>
                                    <ul className="text-[#cbcfd1] text-sm space-y-1">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Certificada CONACEM
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Especialista en Ginecoestética
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Cirugía Mínimamente Invasiva
                                        </li>
                                    </ul>
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
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Atención Ginecológica Integral</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicios.map((servicio, index) => (
                            <div key={index} className="bg-[#faf6ef] p-8 rounded-sm hover:shadow-lg transition-all">
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">{servicio.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">{servicio.descripcion}</p>
                                <span className="text-[#b8935f] font-semibold">{servicio.precio}</span>
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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {condiciones.map((condicion, index) => (
                            <div key={index} className="bg-white p-4 rounded-sm text-center">
                                <p className="text-[#1b1a18] font-medium">{condicion}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-sm text-[#6f6a5c] mt-10 max-w-2xl mx-auto">
                        ¿Buscas un control preventivo, PAP o anticoncepción? También puedes atenderte con nuestra{' '}
                        <Link href="/matrona-los-angeles-chile" className="text-[#b8935f] font-semibold hover:underline">matrona en Los Ángeles</Link>.
                    </p>
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

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu Consulta Ginecológica</h2>
                    <p className="text-[#cbcfd1] mb-8">Atención profesional y personalizada en Los Ángeles, Chile. Tu salud femenina en las mejores manos.</p>
                    <Link
                        href="/consultas/consulta-ginecologia"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Agendar Consulta Online
                    </Link>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile | Lun-Vie 08:30-20:00, Sáb 09:00-15:00</p>
                </div>
            </section >

            <Footer />
        </div>
    );
}
