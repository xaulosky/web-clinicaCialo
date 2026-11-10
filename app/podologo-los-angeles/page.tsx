import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Podólogo en Los Ángeles | Podología Clínica | Clínica CIALO' },
    description: 'Podóloga clínica en Los Ángeles, Biobío: quiropodia, uña encarnada con y sin anestesia, tratamiento definitivo, pie diabético, onicomicosis, papiloma plantar y reconstrucción ungueal. Valores desde $15.000.',
    keywords: 'podólogo Los Ángeles, podóloga Los Ángeles, podología Los Ángeles, uña encarnada Los Ángeles, uña incarnada, pie diabético, quiropodia, onicomicosis, papiloma plantar, verruga plantar, reconstrucción ungueal',
    openGraph: {
        title: 'Podólogo en Los Ángeles - Podología Clínica | Clínica CIALO',
        description: 'Quiropodia, uña encarnada, pie diabético, onicomicosis y papiloma plantar en Los Ángeles. Bulnes 220, Of. 509.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/podologo-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/podologo-los-angeles',
    },
};

const WHATSAPP_URL = `https://wa.me/56982028473?text=${encodeURIComponent('Hola, quiero agendar una hora de podología con Claudia Tello en Clínica CIALO, Los Ángeles.')}`;

const servicios = [
    {
        titulo: 'Quiropodia',
        descripcion: 'Corte y limado de uñas, eliminación de durezas, callosidades y helomas con material estéril. Ideal como control periódico.',
        precio: '$23.000',
        href: '/tratamientos/quiropodia',
    },
    {
        titulo: 'Tratamiento Onicomicosis',
        descripcion: 'Tratamiento podológico de hongos en las uñas: desbridamiento de la lámina afectada y antifúngicos, con seguimiento.',
        precio: '$25.000',
        href: '/tratamientos/tratamiento-onicomicosis-podologia',
    },
    {
        titulo: 'Curaciones',
        descripcion: 'Curación de heridas y lesiones del pie en condiciones de esterilidad, incluidas las de pacientes con pie diabético.',
        precio: '$15.000',
        href: '/tratamientos/curaciones-podologia',
    },
    {
        titulo: 'Uña Encarnada sin Anestesia',
        descripcion: 'Retiro de la espícula de la uña encarnada (onicocriptosis) en casos leves, sin necesidad de anestesia.',
        precio: '$30.000',
        href: '/tratamientos/una-incarnada-sin-anestesia',
    },
    {
        titulo: 'Uña Encarnada con Anestesia',
        descripcion: 'Tratamiento con anestesia local para uñas encarnadas dolorosas o inflamadas.',
        precio: '$60.000 por borde',
        href: '/tratamientos/una-incarnada-con-anestesia',
    },
    {
        titulo: 'Tratamiento Definitivo Uña Encarnada',
        descripcion: 'Matricectomía química con técnica fenol alcohol para evitar que la uña vuelva a encarnarse.',
        precio: '$200.000 por surco',
        href: '/tratamientos/una-incarnada-definitivo',
    },
    {
        titulo: 'Extracción Papiloma Plantar',
        descripcion: 'Extracción de verruga plantar (papiloma por VPH) en la planta del pie, con anestesia y material estéril.',
        precio: '$80.000',
        href: '/tratamientos/extraccion-papiloma-plantar',
    },
    {
        titulo: 'Reconstrucción Ungueal',
        descripcion: 'Reconstrucción parcial de la uña para proteger el lecho ungueal y guiar su crecimiento.',
        precio: '$20.000 por surco',
        href: '/tratamientos/reconstruccion-ungueal-surco',
    },
    {
        titulo: 'Reconstrucción Ungueal Completa',
        descripcion: 'Reconstrucción completa de la uña dañada o ausente, con resultado estético y funcional.',
        precio: '$28.000',
        href: '/tratamientos/reconstruccion-ungueal-completa',
    },
];

const condiciones = [
    'Uña encarnada',
    'Pie diabético',
    'Hongos en las uñas',
    'Verruga plantar',
    'Callos y durezas',
    'Helomas (ojo de gallo)',
    'Uñas engrosadas',
    'Uñas dañadas o caídas',
    'Grietas en talones',
    'Pie de atleta',
    'Heridas en el pie',
    'Cuidado preventivo',
];

const faqs = [
    {
        pregunta: '¿Cuánto cuesta una atención de podología en Los Ángeles?',
        respuesta: 'En Clínica CIALO la quiropodia tiene un valor de $23.000, las curaciones $15.000 y el tratamiento de onicomicosis $25.000. La uña encarnada sin anestesia cuesta $30.000 y con anestesia $60.000 por borde.',
    },
    {
        pregunta: '¿Quién atiende podología en Clínica CIALO?',
        respuesta: 'Claudia Tello Ibarra, Técnico de Nivel Superior en Podología Clínica (CFT Santo Tomás, aprobada con distinción), inscrita en el Registro Nacional de Prestadores Individuales de Salud (N° 477014) y con más de 9 años de experiencia.',
    },
    {
        pregunta: '¿Cómo se trata una uña encarnada?',
        respuesta: 'En casos leves se retira la espícula sin anestesia. Si la uña está muy dolorosa o inflamada se trabaja con anestesia local. Cuando la uña se encarna una y otra vez, existe el tratamiento definitivo con técnica fenol alcohol, que evita que vuelva a crecer hacia el surco.',
    },
    {
        pregunta: '¿Qué significa "por borde" o "por surco"?',
        respuesta: 'Cada uña tiene dos bordes laterales (surcos). Si la uña está encarnada en un solo lado se cobra un borde; si lo está en ambos lados, se cobran los dos.',
    },
    {
        pregunta: '¿Atienden pacientes con pie diabético?',
        respuesta: 'Sí. La atención de pie diabético requiere especial cuidado: se trabaja con material estéril, se revisa la piel y las uñas en cada control y se educa al paciente para prevenir lesiones.',
    },
    {
        pregunta: '¿Cada cuánto debo hacerme una quiropodia?',
        respuesta: 'Como referencia, cada 4 a 8 semanas. Las personas con pie diabético, uñas engrosadas o tendencia a callosidades suelen necesitar controles más frecuentes.',
    },
    {
        pregunta: '¿La extracción de papiloma plantar duele?',
        respuesta: 'Se realiza con anestesia local, por lo que el procedimiento en sí no duele. Después se indican cuidados y curaciones para una buena cicatrización.',
    },
    {
        pregunta: '¿Cómo agendo una hora?',
        respuesta: 'Escríbenos por WhatsApp al +56 9 8202 8473 y te ayudamos a coordinar el día y la hora de tu atención podológica.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'MedicalBusiness',
            '@id': 'https://cialo.cl/#organization',
            name: 'Clínica CIALO - Podología Los Ángeles',
            description: 'Podología clínica en Los Ángeles, Chile: quiropodia, uña encarnada, pie diabético, onicomicosis, papiloma plantar y reconstrucción ungueal.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/podologo-los-angeles',
            telephone: '+56 9 8202 8473',
            openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
            medicalSpecialty: ['Podiatric'],
        },
        {
            '@type': 'Person',
            name: 'Claudia Tello Ibarra',
            jobTitle: 'Podóloga Clínica',
            url: 'https://cialo.cl/profesionales/claudia-tello',
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
                { '@type': 'ListItem', position: 2, name: 'Podólogo en Los Ángeles', item: 'https://cialo.cl/podologo-los-angeles' },
            ],
        },
    ],
};

const CREDENCIALES = [
    'Podología Clínica (CFT Santo Tomás)',
    'Registro de Prestadores N° 477014',
    'Más de 9 años de experiencia',
];

export default function PodologoLosAngelesPage() {
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
                                Podología Clínica
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Podólogo en Los Ángeles
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Atención podológica en Los Ángeles, Biobío: <strong className="text-white">uña encarnada</strong>, <strong className="text-white">pie diabético</strong>, hongos, papiloma plantar y quiropodia. Trabajo con material estéril y pacientes de todas las edades.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Agendar por WhatsApp
                                </a>
                                <Link
                                    href="/profesionales/claudia-tello"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Ver Perfil Profesional
                                </Link>
                            </div>
                        </div>

                        {/* Ficha de la especialista */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <div className="flex items-start gap-6">
                                <div className="w-32 h-32 rounded-full flex-shrink-0 border-2 border-[#b8935f] bg-gradient-to-br from-[#1b1a18] to-[#2a2622] flex items-center justify-center" aria-hidden="true">
                                    <span className="font-[family-name:var(--font-italiana)] text-5xl text-[#b8935f]">CT</span>
                                </div>
                                <div>
                                    <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-[10px] font-bold px-2 py-1 mb-2 uppercase">Podología</span>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">
                                        Claudia Tello Ibarra
                                    </h2>
                                    <p className="text-[#b8935f] text-sm mb-3">
                                        Podóloga Clínica
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
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Tabla de Valores</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Servicios de Podología</h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">Diagnóstico, tratamiento y seguimiento personalizado de las patologías del pie, con material estéril en cada atención.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicios.map((servicio) => (
                            <Link key={servicio.titulo} href={servicio.href} className="block bg-[#faf6ef] p-8 rounded-sm hover:shadow-lg transition-all">
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">{servicio.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">{servicio.descripcion}</p>
                                <span className="text-[#b8935f] font-semibold">{servicio.precio}</span>
                            </Link>
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
                        Para hongos en las uñas también contamos con{' '}
                        <Link href="/tratamientos/onicomicosis-laser-co2" className="text-[#b8935f] font-semibold hover:underline">tratamiento de onicomicosis con láser CO2</Link>.
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Preguntas Frecuentes</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Podología en Los Ángeles</h2>
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
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu Hora de Podología</h2>
                    <p className="text-[#cbcfd1] mb-8">Escríbenos por WhatsApp y coordinamos el día y la hora de tu atención.</p>
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Agendar por WhatsApp
                    </a>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile | Lun-Vie 08:30-20:00, Sáb 09:00-15:00</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
