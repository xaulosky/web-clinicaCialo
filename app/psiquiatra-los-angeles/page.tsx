import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Psiquiatra en Los Ángeles | Dra. Analith Cuba | Clínica CIALO' },
    description: 'Psiquiatra de adultos en Los Ángeles, Biobío. Consulta psiquiátrica para depresión, ansiedad, trastorno bipolar, insomnio, TDAH y deterioro cognitivo. Atención confidencial con agenda online en Clínica CIALO.',
    keywords: 'psiquiatra Los Ángeles, psiquiatra en Los Ángeles, consulta psiquiátrica Los Ángeles, salud mental Biobío, depresión, ansiedad, trastorno bipolar, TDAH adultos, psiquiatra particular Chile',
    openGraph: {
        title: 'Psiquiatra en Los Ángeles - Dra. Analith Cuba | Clínica CIALO',
        description: 'Consulta psiquiátrica de adultos en Los Ángeles: depresión, ansiedad, insomnio, TDAH y deterioro cognitivo. Bulnes 220, Of. 509.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/psiquiatra-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/psiquiatra-los-angeles',
    },
};

const servicios = [
    {
        titulo: 'Consulta Psiquiátrica de Ingreso',
        descripcion: 'Primera consulta de 60 minutos: historia clínica completa, evaluación diagnóstica y definición del plan de tratamiento.',
        precio: '$85.000',
    },
    {
        titulo: 'Controles de Seguimiento',
        descripcion: 'Sesiones de control para evaluar la respuesta al tratamiento, ajustar indicaciones y acompañar el proceso.',
        precio: 'Según indicación',
    },
    {
        titulo: 'Tratamiento Farmacológico',
        descripcion: 'Indicación y seguimiento de psicofármacos cuando corresponde, con formación específica en psicofarmacología.',
        precio: 'Incluido en el control',
    },
    {
        titulo: 'Neuropsiquiatría y Demencias',
        descripcion: 'Evaluación del deterioro cognitivo y manejo de los síntomas neuropsiquiátricos asociados, con formación en Harvard Medical School.',
        precio: 'Según indicación',
    },
    {
        titulo: 'Evaluación Integral',
        descripcion: 'Enfoque que considera los aspectos biológicos, psicológicos y contextuales de cada paciente, con tratamientos basados en evidencia.',
        precio: 'Incluida en la consulta',
    },
    {
        titulo: 'Trabajo con Psicología',
        descripcion: 'Cuando corresponde, el tratamiento se complementa con psicoterapia junto al equipo de psicología de la clínica.',
        precio: 'Coordinado en consulta',
    },
];

const condiciones = [
    'Depresión',
    'Ansiedad',
    'Crisis de pánico',
    'Trastorno bipolar',
    'Insomnio',
    'TDAH en adultos',
    'Estrés laboral',
    'Duelo',
    'Deterioro cognitivo',
    'Consumo y adicciones',
    'Esquizofrenia',
    'Salud mental general',
];

const faqs = [
    {
        pregunta: '¿Cuánto cuesta una consulta con psiquiatra en Los Ángeles?',
        respuesta: 'La consulta psiquiátrica de ingreso en Clínica CIALO tiene un valor de $85.000 y dura 60 minutos. Puedes reservarla online y pagarla con Webpay al momento de agendar, sin pagos adicionales en la clínica.',
    },
    {
        pregunta: '¿Quién atiende psiquiatría en Clínica CIALO?',
        respuesta: 'La Dra. Analith Cuba Zenzano, Médica especialista en Psiquiatría de Adultos por la Universidad Mayor y Magíster en Salud Pública con mención en Gestión, con formación en Neuropsiquiatría y Demencias en Harvard Medical School.',
    },
    {
        pregunta: '¿Necesito derivación para ver a un psiquiatra?',
        respuesta: 'No. Puedes agendar directamente tu consulta particular, sin necesidad de una derivación previa. Si vienes derivado o ya estás en tratamiento, trae los informes y recetas que tengas.',
    },
    {
        pregunta: '¿Qué diferencia hay entre psiquiatra y psicólogo?',
        respuesta: 'El psiquiatra es médico: puede diagnosticar, indicar y ajustar tratamiento farmacológico. El psicólogo realiza psicoterapia. Muchas veces ambos trabajos se complementan, y en Clínica CIALO también contamos con atención de psicología.',
    },
    {
        pregunta: '¿Qué pasa en la primera consulta?',
        respuesta: 'Es una sesión de 60 minutos en la que se realiza la historia clínica completa, se conversan los motivos de consulta y los antecedentes, y se llega a una impresión diagnóstica con un plan de tratamiento individualizado.',
    },
    {
        pregunta: '¿Siempre se indican medicamentos?',
        respuesta: 'No. La indicación depende del diagnóstico y de cada caso. El tratamiento puede incluir psicofármacos, psicoterapia, medidas de estilo de vida o una combinación, siempre conversada contigo.',
    },
    {
        pregunta: '¿La atención es confidencial?',
        respuesta: 'Sí. La consulta se realiza en un box privado y toda la información clínica está protegida por el secreto profesional, como en cualquier atención médica.',
    },
    {
        pregunta: '¿Atiende adultos mayores y problemas de memoria?',
        respuesta: 'Sí. La Dra. Cuba tiene formación y experiencia en neuropsiquiatría y demencias, incluyendo atención en un centro especializado, por lo que evalúa deterioro cognitivo y los síntomas neuropsiquiátricos asociados.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'MedicalBusiness',
            '@id': 'https://cialo.cl/#organization',
            name: 'Clínica CIALO - Psiquiatría Los Ángeles',
            description: 'Consulta psiquiátrica de adultos en Los Ángeles, Chile: depresión, ansiedad, trastorno bipolar, insomnio, TDAH y deterioro cognitivo.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/psiquiatra-los-angeles',
            telephone: '+56 9 8202 8473',
            openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
            medicalSpecialty: ['Psychiatry'],
        },
        {
            '@type': 'Physician',
            name: 'Dra. Analith Cuba Zenzano',
            description: 'Médica especialista en Psiquiatría de Adultos, Magíster en Salud Pública',
            medicalSpecialty: 'Psychiatry',
            url: 'https://cialo.cl/profesionales/analith-cuba',
            image: 'https://cialo.cl/profesionales/clinica-cialo_Analith_Cuba.webp',
            worksFor: { '@id': 'https://cialo.cl/#organization' },
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
                { '@type': 'ListItem', position: 2, name: 'Psiquiatra en Los Ángeles', item: 'https://cialo.cl/psiquiatra-los-angeles' },
            ],
        },
    ],
};

const CREDENCIALES = [
    'Psiquiatra de Adultos (U. Mayor)',
    'Magíster en Salud Pública',
    'Neuropsiquiatría y Demencias (Harvard)',
];

export default function PsiquiatraLosAngelesPage() {
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
                                Especialista en Psiquiatría
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Psiquiatra en Los Ángeles
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Consulta psiquiátrica de adultos en Los Ángeles, Biobío. <strong className="text-white">Atención confidencial</strong>, evaluación integral y tratamientos <strong className="text-white">basados en evidencia</strong> para depresión, ansiedad, insomnio y más.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/consultas/consulta-psiquiatria"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Agendar Consulta
                                </Link>
                                <Link
                                    href="/profesionales/analith-cuba"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Ver Perfil Profesional
                                </Link>
                            </div>
                        </div>

                        {/* Ficha de la especialista */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <div className="flex items-start gap-6">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#b8935f]">
                                    <Image
                                        src="/profesionales/clinica-cialo_Analith_Cuba.webp"
                                        alt="Dra. Analith Cuba, psiquiatra en Los Ángeles"
                                        fill
                                        sizes="128px"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-[10px] font-bold px-2 py-1 mb-2 uppercase">Psiquiatría</span>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">
                                        Dra. Analith Cuba
                                    </h2>
                                    <p className="text-[#b8935f] text-sm mb-3">
                                        Psiquiatra de Adultos
                                    </p>
                                    <ul className="text-[#cbcfd1] text-sm space-y-1">
                                        {CREDENCIALES.map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-[#b8935f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
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
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Atención Psiquiátrica de Adultos</h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">Evaluación integral e individualizada, considerando los aspectos biológicos, psicológicos y contextuales de cada paciente.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicios.map((servicio) => (
                            <div key={servicio.titulo} className="bg-[#faf6ef] p-8 rounded-sm hover:shadow-lg transition-all">
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
                        {condiciones.map((condicion) => (
                            <div key={condicion} className="bg-white p-4 rounded-sm text-center">
                                <p className="text-[#1b1a18] font-medium">{condicion}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-sm text-[#6f6a5c] mt-10 max-w-2xl mx-auto">
                        El tratamiento psiquiátrico se complementa muchas veces con psicoterapia: conoce también nuestra{' '}
                        <Link href="/consultas/consulta-psicologia" className="text-[#b8935f] font-semibold hover:underline">consulta psicológica</Link>.
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Preguntas Frecuentes</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Psiquiatría en Los Ángeles</h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq) => (
                            <details key={faq.pregunta} className="group bg-[#faf6ef] rounded-sm overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-[#f0ede8] transition-colors">
                                    <h3 className="font-semibold text-[#1b1a18] pr-4">{faq.pregunta}</h3>
                                    <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6">
                                    <p className="text-[#6f6a5c] leading-relaxed">{faq.respuesta}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu Consulta Psiquiátrica</h2>
                    <p className="text-[#cbcfd1] mb-8">Dar el primer paso también es parte del tratamiento. Elige el día y la hora disponibles y reserva en línea.</p>
                    <Link
                        href="/consultas/consulta-psiquiatria"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Agendar Consulta Online
                    </Link>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile | Lun-Vie 08:30-20:00, Sáb 09:00-15:00</p>
                    <p className="text-[#cbcfd1]/50 text-xs mt-4 max-w-xl mx-auto">Si estás atravesando una crisis o tienes pensamientos de hacerte daño, llama al <strong className="text-[#cbcfd1]">*4141</strong> (Salud Responde, 24 horas) o acude al servicio de urgencia más cercano.</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
