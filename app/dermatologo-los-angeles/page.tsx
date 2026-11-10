import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Dermatólogo en Los Ángeles | Dra. Sorangel Lugo | Clínica CIALO' },
    description: 'Dermatóloga en Los Ángeles, Biobío. Atención de adultos y niños desde recién nacidos: acné, rosácea, manchas, melasma, lunares, dermatitis y caída del cabello. Agenda online en Clínica CIALO.',
    keywords: 'dermatologo Los Ángeles, dermatóloga Los Ángeles, dermatología Biobío, consulta dermatológica Los Ángeles, acné, melasma, manchas en la piel, lunares, dermatoscopía, dermatólogo infantil, dermatóloga niños, tricología Los Ángeles',
    openGraph: {
        title: 'Dermatólogo en Los Ángeles - Dra. Sorangel Lugo | Clínica CIALO',
        description: 'Dermatología de adultos y niños en Los Ángeles. Acné, rosácea, manchas, lunares y salud capilar. Bulnes 220, Of. 509.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/dermatologo-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/dermatologo-los-angeles',
    },
};

const servicios = [
    {
        titulo: 'Consulta Dermatológica',
        descripcion: 'Evaluación clínica completa de la piel, el cabello y las uñas, con diagnóstico y plan de tratamiento personalizado.',
        precio: '$60.000',
    },
    {
        titulo: 'Terapia Láser',
        descripcion: 'Tratamiento con láser de manchas, lesiones vasculares y otras indicaciones dermatológicas, definido según el diagnóstico.',
        precio: 'Según indicación',
    },
    {
        titulo: 'Acné y Cicatrices',
        descripcion: 'Manejo médico del acné activo en adolescentes y adultos, y planificación del tratamiento de las cicatrices que deja.',
        precio: 'Según indicación',
    },
    {
        titulo: 'Manchas y Melasma',
        descripcion: 'Estudio del origen de la hiperpigmentación y definición del tratamiento: fotoprotección, despigmentantes y láser.',
        precio: 'Según indicación',
    },
    {
        titulo: 'Tricología y Alopecias',
        descripcion: 'Diagnóstico de la caída del cabello con tricoscopía: densidad, miniaturización y estado del cuero cabelludo.',
        precio: 'Según indicación',
    },
    {
        titulo: 'Dermatología Infantil',
        descripcion: 'Atención de la piel desde recién nacidos: dermatitis del pañal, costra láctea, dermatitis atópica, lesiones y lunares.',
        precio: 'Según indicación',
    },
];

const condiciones = [
    'Acné',
    'Rosácea',
    'Melasma y manchas',
    'Dermatitis atópica',
    'Piel del recién nacido',
    'Psoriasis',
    'Lunares y nevos',
    'Caída del cabello',
    'Alopecia',
    'Uñas y onicomicosis',
    'Piel sensible',
    'Verrugas y lesiones',
    'Control de la piel',
];

const faqs = [
    {
        pregunta: '¿Cuánto cuesta una consulta con dermatólogo en Los Ángeles?',
        respuesta: 'La consulta dermatológica en Clínica CIALO tiene un valor de $60.000 y dura aproximadamente 30 minutos. Puedes reservarla online y pagarla con Webpay al momento de agendar, sin pagos adicionales en la clínica.',
    },
    {
        pregunta: '¿Quién atiende dermatología en Clínica CIALO?',
        respuesta: 'La Dra. Sorangel Lugo Mosquera, especialista en Dermatología de adultos y niños. Cuenta además con la especialidad en Pediatría y con formación en Tricología y Láser por CILAD, y en Medicina Estética por SOCHIMCE y la Universidad de Chile.',
    },
    {
        pregunta: '¿Qué incluye la consulta dermatológica?',
        respuesta: 'Incluye la entrevista clínica, el examen de la piel, el cabello y las uñas, y la evaluación con dermatoscopía cuando corresponde. Al final recibes un diagnóstico y un plan de tratamiento personalizado.',
    },
    {
        pregunta: '¿Cuándo debo revisarme los lunares?',
        respuesta: 'Conviene consultar si un lunar cambia de tamaño, forma o color, si sangra o pica, o si aparece uno nuevo en la adultez. También si tienes antecedentes familiares de cáncer de piel o muchos lunares, en cuyo caso se recomienda un control periódico con dermatoscopía.',
    },
    {
        pregunta: '¿Desde qué edad atiende a niños?',
        respuesta: 'Desde recién nacidos. En Chile la dermatología suele atender a pacientes desde los 13 o 15 años, pero la Dra. Lugo cuenta además con la especialidad en Pediatría y Puericultura, por lo que ve la piel de bebés, niñas, niños, adolescentes y adultos.',
    },
    {
        pregunta: '¿Qué debo llevar a mi primera consulta?',
        respuesta: 'Tu cédula de identidad, el listado de los medicamentos y productos que estás usando en la piel, y los exámenes o informes previos si los tienes. Idealmente asiste sin maquillaje, y sin esmalte si la consulta es por las uñas.',
    },
    {
        pregunta: '¿Atiende problemas de caída del cabello?',
        respuesta: 'Sí. La tricología es una de sus áreas: se estudia el cuero cabelludo con tricoscopía para diagnosticar el tipo de alopecia y definir el tratamiento, que puede ser médico o derivar a procedimientos capilares.',
    },
    {
        pregunta: '¿Dónde atienden y qué días?',
        respuesta: 'En Bulnes 220, Oficina 509, Edificio Puerto Mayor II, Los Ángeles, Región del Biobío. Los días y horas disponibles se muestran en tiempo real al agendar online; si no encuentras cupo, puedes escribirnos por WhatsApp.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'MedicalBusiness',
            '@id': 'https://cialo.cl/#organization',
            name: 'Clínica CIALO - Dermatología Los Ángeles',
            description: 'Dermatología de adultos y niños en Los Ángeles, Chile: acné, rosácea, manchas, lunares, dermatitis y salud capilar. Atención desde recién nacidos.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/dermatologo-los-angeles',
            telephone: '+56 9 8202 8473',
            openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
            medicalSpecialty: ['Dermatology'],
        },
        {
            '@type': 'Physician',
            name: 'Dra. Sorangel Lugo Mosquera',
            description: 'Especialista en Dermatología de adultos y niños, y en Tricología',
            medicalSpecialty: 'Dermatology',
            url: 'https://cialo.cl/profesionales/sorangel-lugo',
            image: 'https://cialo.cl/profesionales/clinica-cialo_Sorangel_Lugo.webp',
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
                { '@type': 'ListItem', position: 2, name: 'Dermatólogo en Los Ángeles', item: 'https://cialo.cl/dermatologo-los-angeles' },
            ],
        },
    ],
};

const CREDENCIALES = [
    'Especialidad en Dermatología General',
    'Especialidad en Pediatría: atiende desde recién nacidos',
    'Diplomaturas en Tricología y Láser (CILAD)',
];

export default function DermatologoLosAngelesPage() {
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
                                Especialista en Dermatología
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Dermatólogo en Los Ángeles
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Dermatología de <strong className="text-white">adultos y niños</strong> en Los Ángeles, Biobío —atención de la piel <strong className="text-white">desde recién nacidos</strong>—. Acné, rosácea, manchas, lunares, dermatitis y salud capilar, con diagnóstico y plan de tratamiento personalizado.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/profesionales/sorangel-lugo#agendar"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Agendar Consulta
                                </Link>
                                <Link
                                    href="/profesionales/sorangel-lugo"
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
                                        src="/profesionales/clinica-cialo_Sorangel_Lugo.webp"
                                        alt="Dra. Sorangel Lugo, dermatóloga en Los Ángeles"
                                        fill
                                        sizes="128px"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-[10px] font-bold px-2 py-1 mb-2 uppercase">Dermatología</span>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">
                                        Dra. Sorangel Lugo
                                    </h2>
                                    <p className="text-[#b8935f] text-sm mb-3">
                                        Dermatología de Adultos y Niños
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
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Atención Dermatológica Integral</h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">Diagnóstico y tratamiento de las enfermedades de la piel, el cabello y las uñas en todas las edades, con apoyo de dermatoscopía y protocolos basados en evidencia científica.</p>
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
                        Revisa el detalle, los requisitos y el valor en la ficha de la{' '}
                        <Link href="/consultas/consulta-dermatologia" className="text-[#b8935f] font-semibold hover:underline">consulta dermatológica</Link>.
                        ¿Tu consulta es por la caída del cabello? Revisa también la{' '}
                        <Link href="/consultas/consulta-tricologia" className="text-[#b8935f] font-semibold hover:underline">consulta de tricología</Link>{' '}
                        y el <Link href="/injerto-capilar-los-angeles-chile" className="text-[#b8935f] font-semibold hover:underline">injerto capilar</Link>.
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Preguntas Frecuentes</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Dermatología en Los Ángeles</h2>
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
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu Consulta Dermatológica</h2>
                    <p className="text-[#cbcfd1] mb-8">Elige el día y la hora disponibles en la agenda real de la Dra. Sorangel Lugo y confirma tu reserva en línea.</p>
                    <Link
                        href="/profesionales/sorangel-lugo#agendar"
                        className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Agendar Consulta Online
                    </Link>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile | Lun-Vie 08:30-20:00, Sáb 09:00-15:00</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
