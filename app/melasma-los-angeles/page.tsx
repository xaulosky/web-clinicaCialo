import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Melasma y Manchas en Los Ángeles | Clínica CIALO' },
    description: 'Tratamiento del melasma y las manchas en la piel en Los Ángeles, Biobío. Evaluación dermatológica, fotoprotección, despigmentantes y láser con la Dra. Sorangel Lugo. Agenda online.',
    keywords: 'melasma Los Ángeles, manchas en la cara, tratamiento melasma Chile, hiperpigmentación, paño en la cara, manchas por el sol, dermatóloga Los Ángeles, despigmentante',
    openGraph: {
        title: 'Melasma y Manchas en Los Ángeles | Clínica CIALO',
        description: 'Evaluación dermatológica y tratamiento del melasma en Los Ángeles: fotoprotección, despigmentantes y láser. Bulnes 220, Of. 509.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/melasma-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/melasma-los-angeles',
    },
};

const faqs = [
    {
        pregunta: '¿Qué es el melasma?',
        respuesta: 'Es una hiperpigmentación de la piel que aparece como manchas de color café o grisáceo, habitualmente en las mejillas, la frente, el labio superior y el mentón. En Chile también se le conoce como paño. Es más frecuente en mujeres y se asocia a factores hormonales, a la exposición solar y a la predisposición genética.',
    },
    {
        pregunta: '¿Cuánto cuesta tratar el melasma en Los Ángeles?',
        respuesta: 'Todo parte por la consulta dermatológica, que tiene un valor de $60.000 y dura 30 minutos. Ahí se define el diagnóstico y el plan de tratamiento: el costo posterior depende de lo que se indique, porque no todos los casos requieren lo mismo.',
    },
    {
        pregunta: '¿El melasma tiene cura definitiva?',
        respuesta: 'El melasma es una condición crónica que tiende a reaparecer, sobre todo con la exposición solar y los cambios hormonales. Con un tratamiento adecuado se puede aclarar de forma importante y mantener controlado, pero requiere constancia y fotoprotección permanente.',
    },
    {
        pregunta: '¿Por qué me salieron manchas en la cara?',
        respuesta: 'Las causas más frecuentes son la exposición solar acumulada, los cambios hormonales (embarazo, anticonceptivos), la inflamación posterior a lesiones como el acné, y ciertos medicamentos o cosméticos que sensibilizan la piel al sol. El primer paso es identificar el tipo de mancha, porque el tratamiento no es el mismo para todas.',
    },
    {
        pregunta: '¿Qué tratamientos existen para el melasma?',
        respuesta: 'El manejo combina fotoprotección estricta, despigmentantes tópicos indicados por la médica y, en casos seleccionados, procedimientos como peelings o láser. La combinación se define en la consulta según el tipo de melasma, el fototipo de piel y los tratamientos previos.',
    },
    {
        pregunta: '¿El láser sirve para las manchas?',
        respuesta: 'Puede ser parte del tratamiento, pero no es el primer paso ni sirve para todos los casos: mal indicado, el láser puede empeorar un melasma. Por eso siempre debe partir por una evaluación dermatológica que determine el tipo de mancha y su profundidad.',
    },
    {
        pregunta: '¿Puedo tratarme el melasma en verano?',
        respuesta: 'Sí, pero el tratamiento se ajusta a la época del año. En verano se prioriza el control y la fotoprotección, y algunos procedimientos se prefieren para los meses de menor radiación. Esto se conversa en la consulta.',
    },
    {
        pregunta: '¿Quién trata el melasma en Clínica CIALO?',
        respuesta: 'La Dra. Sorangel Lugo Mosquera, especialista en Dermatología de adultos y niños, con formación en Láser por CILAD. La evaluación incluye el examen de la piel con dermatoscopía cuando corresponde.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'MedicalCondition',
            name: 'Melasma',
            alternateName: ['Paño', 'Hiperpigmentación facial', 'Manchas en la cara'],
            description: 'Hiperpigmentación adquirida que se manifiesta como manchas de color café o grisáceo en el rostro, asociada a factores hormonales, exposición solar y predisposición genética.',
            possibleTreatment: {
                '@type': 'MedicalTherapy',
                name: 'Tratamiento del melasma',
                description: 'Fotoprotección, despigmentantes tópicos y, en casos seleccionados, peelings o láser, indicados tras una evaluación dermatológica.',
            },
        },
        {
            '@type': 'MedicalBusiness',
            '@id': 'https://cialo.cl/#organization',
            name: 'Clínica CIALO - Tratamiento de Melasma Los Ángeles',
            description: 'Evaluación y tratamiento del melasma y las manchas en la piel en Los Ángeles, Chile.',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/melasma-los-angeles',
            telephone: '+56 9 8202 8473',
            openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
            medicalSpecialty: ['Dermatology'],
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
                { '@type': 'ListItem', position: 2, name: 'Melasma y Manchas en Los Ángeles', item: 'https://cialo.cl/melasma-los-angeles' },
            ],
        },
    ],
};

const etapas = [
    {
        titulo: '1. Evaluación dermatológica',
        descripcion: 'Se determina el tipo de mancha y su profundidad, y se revisan los antecedentes hormonales, los medicamentos y los productos en uso, con dermatoscopía cuando corresponde.',
    },
    {
        titulo: '2. Fotoprotección',
        descripcion: 'Es la base del tratamiento y sin ella ningún otro paso funciona: protector solar de amplio espectro, reaplicación durante el día y medidas físicas.',
    },
    {
        titulo: '3. Despigmentantes',
        descripcion: 'Fórmulas indicadas por la médica según el tipo de piel y la tolerancia, con controles para ajustar la potencia y evitar irritación.',
    },
    {
        titulo: '4. Procedimientos',
        descripcion: 'En casos seleccionados se suman peelings o láser, siempre después de estabilizar la piel: mal indicados pueden oscurecer aún más el melasma.',
    },
];

const senales = [
    'Manchas café en mejillas',
    'Manchas sobre el labio',
    'Manchas en la frente',
    'Paño del embarazo',
    'Manchas por anticonceptivos',
    'Manchas por el sol',
    'Manchas tras el acné',
    'Piel despareja',
];

export default function MelasmaLosAngelesPage() {
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
                                Dermatología
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Melasma y manchas en Los Ángeles
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                El melasma —lo que muchas conocen como <strong className="text-white">paño</strong>— se trata, pero no con la misma receta para todas. Todo parte por identificar <strong className="text-white">qué tipo de mancha es</strong> y por qué apareció.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/profesionales/sorangel-lugo#agendar"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Agendar Evaluación
                                </Link>
                                <Link
                                    href="/dermatologo-los-angeles"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Ver Dermatología
                                </Link>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <div className="flex items-start gap-6">
                                <div className="relative w-28 h-28 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#b8935f]">
                                    <Image
                                        src="/profesionales/clinica-cialo_Sorangel_Lugo.webp"
                                        alt="Dra. Sorangel Lugo, dermatóloga en Los Ángeles"
                                        fill
                                        sizes="112px"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-1">
                                        Dra. Sorangel Lugo
                                    </h2>
                                    <p className="text-[#b8935f] text-sm mb-3">Dermatología de Adultos y Niños</p>
                                    <p className="text-[#cbcfd1] text-sm leading-relaxed">
                                        Evaluación de la mancha con dermatoscopía y plan de tratamiento personalizado, con formación en Láser por CILAD.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Señales */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Te reconoces?</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Cuándo consultar</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {senales.map((s) => (
                            <div key={s} className="bg-[#faf6ef] p-4 rounded-sm text-center">
                                <p className="text-[#1b1a18] font-medium">{s}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cómo se trata */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">El tratamiento</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Cómo se trata el melasma</h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">No hay un tratamiento único: el plan se arma por etapas y se ajusta en los controles.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {etapas.map((e) => (
                            <div key={e.titulo} className="bg-white p-8 rounded-sm border-l-4 border-[#b8935f]">
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">{e.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c] leading-relaxed">{e.descripcion}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-[#6f6a5c] mt-10 max-w-2xl mx-auto">
                        La evaluación se realiza en la{' '}
                        <Link href="/consultas/consulta-dermatologia" className="text-[#b8935f] font-semibold hover:underline">consulta dermatológica</Link>.
                        Si tus manchas son secuela de acné, revisa también{' '}
                        <Link href="/cicatrices-acne-los-angeles" className="text-[#b8935f] font-semibold hover:underline">cicatrices de acné</Link>.
                    </p>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Preguntas Frecuentes</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Melasma en Los Ángeles</h2>
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
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu evaluación</h2>
                    <p className="text-[#cbcfd1] mb-8">Antes de tratar una mancha hay que saber qué mancha es. Reserva tu consulta dermatológica en línea.</p>
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
