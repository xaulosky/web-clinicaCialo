import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import CotizacionPabellon from './CotizacionPabellon';

export const metadata: Metadata = {
    title: { absolute: 'Arriendo de Pabellón en Los Ángeles | Clínica CIALO' },
    description:
        'Arrienda pabellón de cirugía menor en Los Ángeles, Chile. Pabellón equipado y autorizado, con insumos y coordinación de agenda. Apoyo de personal TENS y enfermería como servicio adicional. Modalidad por hora, media jornada o convenio mensual para médicos y especialistas.',
    keywords:
        'arriendo pabellón los ángeles, pabellón cirugía menor los ángeles, arriendo pabellón quirúrgico biobío, pabellón procedimientos los ángeles chile, arriendo box procedimientos, pabellón ambulatorio los ángeles',
    openGraph: {
        title: 'Arriendo de Pabellón de Cirugía Menor | Los Ángeles, Biobío',
        description:
            'Pabellón de cirugía menor equipado y autorizado en pleno centro de Los Ángeles. Por hora, jornada o convenio mensual. Para médicos, cirujanos y especialistas.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/arriendo-pabellon-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/arriendo-pabellon-los-angeles',
    },
};

const faqs = [
    {
        pregunta: '¿Qué tipo de procedimientos se pueden realizar en el pabellón?',
        respuesta:
            'El pabellón está habilitado para cirugía menor y procedimientos ambulatorios con anestesia local o sedación superficial: cirugía dermatológica, blefaroplastia, cirugía oral y maxilofacial, procedimientos estéticos avanzados, biopsias, entre otros. Si tienes dudas sobre un procedimiento específico, conversemos tu caso.',
    },
    {
        pregunta: '¿El recinto cuenta con autorización sanitaria?',
        respuesta:
            'Sí. Las instalaciones de Clínica CIALO están autorizadas por la SEREMI de Salud para la realización de procedimientos ambulatorios. Podemos mostrarte la documentación durante tu visita.',
    },
    {
        pregunta: '¿El arriendo incluye insumos y personal de apoyo?',
        respuesta:
            'El arriendo incluye la sala equipada, el pack de insumos de pabellón y la esterilización. El apoyo de personal TENS y el servicio de enfermería son servicios adicionales: se solicitan según tu procedimiento y se cotizan y cobran por separado.',
    },
    {
        pregunta: '¿Cómo se coordinan los horarios?',
        respuesta:
            'Trabajamos con bloques de agenda. Puedes reservar por hora, media jornada o jornada completa, y con un convenio mensual tienes prioridad para fijar tus días de manera estable.',
    },
    {
        pregunta: '¿Puedo atender pacientes propios en el pabellón?',
        respuesta:
            'Sí, ese es el objetivo. Tú atiendes a tus propios pacientes con tu equipo; nosotros aportamos la infraestructura, coordinación y apoyo clínico para que solo te preocupes de operar.',
    },
    {
        pregunta: '¿En qué parte de Los Ángeles está ubicado?',
        respuesta:
            'En Bulnes 220, oficina 509, Edificio Puerto Mayor II, en pleno centro de Los Ángeles, Región del Biobío — de fácil acceso y con estacionamientos cercanos para tus pacientes.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Arriendo de Pabellón de Cirugía Menor en Los Ángeles, Biobío', item: 'https://cialo.cl/arriendo-pabellon-los-angeles' },
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
            name: 'Clínica CIALO - Arriendo de Pabellón de Cirugía Menor en Los Ángeles',
            description:
                'Arriendo de pabellón de cirugía menor equipado para médicos y especialistas en Los Ángeles, Región del Biobío.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/arriendo-pabellon-los-angeles',
            telephone: '+56982028473',
        },
        {
            '@type': 'Service',
            name: 'Arriendo de Pabellón de Cirugía Menor',
            serviceType: 'Arriendo de infraestructura clínica',
            areaServed: 'Los Ángeles, Biobío, Chile',
            provider: { '@id': 'https://cialo.cl/#organization' },
        },
    ],
};

const incluye = [
    { titulo: 'Pabellón equipado', descripcion: 'Sala de procedimientos para cirugía menor con electrobisturí, mobiliario clínico y campo estéril.' },
    { titulo: 'Insumos y esterilización', descripcion: 'Pack de pabellón, ropa estéril, instrumental y gestión de insumos según tu procedimiento.' },
    { titulo: 'Aseo y preparación de sala', descripcion: 'Limpieza, descontaminación y preparación del pabellón antes y después de cada procedimiento.' },
    { titulo: 'Recinto autorizado', descripcion: 'Instalaciones de Clínica CIALO autorizadas por la SEREMI de Salud para procedimientos ambulatorios.' },
    { titulo: 'Coordinación y agenda', descripcion: 'Coordinamos horarios, preparación de la sala y recepción de tus pacientes.' },
    { titulo: 'Ubicación céntrica', descripcion: 'Edificio Puerto Mayor II, pleno centro de Los Ángeles, con fácil acceso para tus pacientes.' },
];

const adicionales = [
    { titulo: 'Personal TENS', descripcion: 'Técnico en enfermería de nivel superior (TENS) de apoyo durante el procedimiento. Disponible bajo solicitud y cotizado aparte.' },
    { titulo: 'Servicio de enfermería', descripcion: 'Enfermera/o para preparación, asistencia durante el procedimiento y cuidados del paciente. Se agrega y cobra por separado.' },
];

const procedimientos = [
    'Cirugía menor dermatológica (lunares, quistes, lipomas)',
    'Blefaroplastia y procedimientos peribulares',
    'Cirugía menor maxilofacial y oral',
    'Procedimientos de medicina estética avanzada',
    'Biopsias y extracción de lesiones',
    'Liposucción de zonas pequeñas / lipo de papada',
    'Implante capilar y procedimientos tricológicos',
    'Procedimientos urológicos y ginecológicos ambulatorios',
];

const modalidades = [
    {
        titulo: 'Por hora',
        descripcion: 'Ideal para procedimientos puntuales. Reserva el pabellón solo por el tiempo que necesitas.',
        destacado: false,
    },
    {
        titulo: 'Media jornada / jornada',
        descripcion: 'Para tandas de procedimientos. Agrupa tus pacientes en un solo día y optimiza tu tiempo.',
        destacado: true,
    },
    {
        titulo: 'Convenio mensual',
        descripcion: 'Frecuencia fija (semanal o quincenal) con tarifa preferente y prioridad de agenda.',
        destacado: false,
    },
];

const pasos = [
    { n: '1', titulo: 'Conversemos', descripcion: 'Cuéntanos tu especialidad, procedimientos y frecuencia estimada.' },
    { n: '2', titulo: 'Visita el pabellón', descripcion: 'Coordina una visita para conocer las instalaciones y el equipamiento.' },
    { n: '3', titulo: 'Cotización a medida', descripcion: 'Te enviamos una propuesta según modalidad, insumos y apoyo requerido.' },
    { n: '4', titulo: 'Agenda y opera', descripcion: 'Reservas tus bloques y nosotros dejamos todo preparado para ti.' },
];


export default function ArriendoPabellonPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar transparent />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="relative min-h-[55vh] flex items-center justify-center bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-14 w-full text-center">
                    <span className="inline-flex items-center gap-2 bg-[#b8935f]/20 text-[#b8935f] px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Bulnes 220, Of. 509 · Los Ángeles, Biobío
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                        Arriendo de Pabellón<br />de Cirugía Menor
                    </h1>
                    <p className="text-lg md:text-xl text-[#cbcfd1] mb-8 leading-relaxed max-w-3xl mx-auto">
                        Opera a tus pacientes en un <strong className="text-white">pabellón equipado y autorizado</strong> en
                        pleno centro de Los Ángeles. Por hora, jornada o convenio mensual — con insumos y coordinación
                        de agenda incluidos, y apoyo clínico opcional según tu necesidad.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20soy%20profesional%20de%20la%20salud%20y%20me%20interesa%20el%20arriendo%20de%20pabell%C3%B3n%20de%20cirug%C3%ADa%20menor"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Consultar disponibilidad
                        </a>
                        <a
                            href="#cotizacion"
                            className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                        >
                            Solicitar cotización
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center text-sm text-[#cbcfd1]">
                        {['Recinto autorizado SEREMI', 'Insumos incluidos', 'Agenda flexible'].map((t) => (
                            <span key={t} className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Para quién */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Para quién?</span>
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                        Para médicos y especialistas que necesitan un pabellón sin invertir en uno
                    </h2>
                    <p className="text-[#6f6a5c] leading-relaxed max-w-2xl mx-auto">
                        Si eres <strong>cirujano, dermatólogo, maxilofacial, urólogo, ginecólogo, médico estético u
                        odontólogo</strong> y atiendes en Los Ángeles o la provincia de Biobío, te ofrecemos la
                        infraestructura para realizar tus procedimientos ambulatorios con tus propios pacientes, sin los
                        costos fijos de implementar y mantener un pabellón propio.
                    </p>
                </div>
            </section>

            {/* Qué incluye */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">El pabellón</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">¿Qué incluye el arriendo?</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {incluye.map((b, index) => (
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

                    {/* Servicios adicionales */}
                    <div className="mt-12 max-w-4xl mx-auto">
                        <div className="bg-white border border-[#b8935f]/40 rounded-sm p-8">
                            <div className="text-center mb-8">
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-3 block">Servicios adicionales</span>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">¿Necesitas apoyo clínico? Lo sumamos a tu cotización</h3>
                                <p className="text-sm text-[#6f6a5c] mt-3">Servicios opcionales que se cotizan y cobran por separado, según tu procedimiento.</p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {adicionales.map((a, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-[#b8935f]/15 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-[#1b1a18] mb-1">{a.titulo}</h4>
                                            <p className="text-sm text-[#6f6a5c]">{a.descripcion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Procedimientos */}
            <section className="py-20 bg-[#1b1a18] text-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Usos frecuentes</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)]">Procedimientos que puedes realizar</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {procedimientos.map((p, i) => (
                            <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-sm p-4">
                                <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-[#cbcfd1]">{p}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-[#cbcfd1]/60 text-sm mt-8">
                        * Procedimientos ambulatorios de cirugía menor con anestesia local o sedación superficial.
                    </p>
                </div>
            </section>

            {/* Modalidades */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Modalidades</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Arrienda como te acomode</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {modalidades.map((m, i) => (
                            <div
                                key={i}
                                className={`p-8 rounded-sm text-center border-2 transition-all ${m.destacado
                                    ? 'border-[#b8935f] bg-[#b8935f]/5 shadow-lg'
                                    : 'border-gray-100 bg-[#faf6ef] hover:shadow-lg'
                                    }`}
                            >
                                {m.destacado && (
                                    <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                                        Más elegida
                                    </span>
                                )}
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">{m.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c]">{m.descripcion}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-[#6f6a5c] text-sm mt-8">
                        Las tarifas dependen de duración, insumos y apoyo clínico requerido. Solicita tu cotización personalizada.
                    </p>
                </div>
            </section>

            {/* Cómo funciona */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Proceso simple</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">¿Cómo funciona?</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pasos.map((p) => (
                            <div key={p.n} className="bg-white p-6 rounded-sm text-center hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-[#1b1a18] text-[#b8935f] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-[family-name:var(--font-italiana)]">
                                    {p.n}
                                </div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">{p.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c]">{p.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cotización */}
            <section id="cotizacion" className="py-20 bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Cotiza sin compromiso</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-white mb-4">
                            Solicita tu cotización
                        </h2>
                        <p className="text-[#cbcfd1] max-w-md mx-auto">
                            Cuéntanos qué procedimientos realizas y te enviaremos una propuesta a tu medida, además de
                            coordinar una visita al pabellón.
                        </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/10">
                        <CotizacionPabellon />
                    </div>
                    <p className="text-center text-[#cbcfd1]/60 text-sm mt-8">
                        📍 Clínica CIALO · Bulnes 220, Of. 509, Edificio Puerto Mayor II, Los Ángeles
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Preguntas frecuentes</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Resolvemos tus dudas</h2>
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

            {/* Ubicación */}
            <section className="py-16 bg-white">
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
                                <strong>Horario:</strong><br />
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
                                title="Ubicación Pabellón Clínica CIALO Los Ángeles"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA final */}
            <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Tu pabellón en Los Ángeles</span>
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">
                        Dedícate a operar, nosotros nos encargamos del resto
                    </h2>
                    <p className="text-[#cbcfd1] mb-8 max-w-2xl mx-auto">
                        Agenda una visita al pabellón y conversemos sobre cómo podemos apoyar tu práctica clínica en Los Ángeles.
                    </p>
                    <a
                        href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20visita%20al%20pabell%C3%B3n%20de%20cirug%C3%ADa%20menor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                    >
                        Agendar visita por WhatsApp
                    </a>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">
                        También puedes escribirnos a <Link href="/contacto" className="text-[#b8935f] hover:underline">contacto@cialo.cl</Link>
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
