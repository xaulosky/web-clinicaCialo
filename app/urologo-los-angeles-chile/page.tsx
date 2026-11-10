import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Urólogo en Los Ángeles Chile | Clínica CIALO' },
    description: 'Urólogos certificados en Los Ángeles, Biobío. Consultas urológicas, estética íntima masculina, engrosamiento peneano, cistoscopía. Dr. Frank Ulloa y Dr. Guillermo Contreras. Agenda tu hora.',
    keywords: 'urólogo Los Ángeles, urología Chile, consulta urológica Biobío, engrosamiento peneano, estética masculina, cistoscopía Los Ángeles, bioplastía, dr frank ulloa, dr guillermo contreras',
    openGraph: {
        title: 'Urólogos Los Ángeles - Dr. Frank Ulloa y Dr. Guillermo Contreras | Clínica CIALO',
        description: 'Urólogos certificados EUNACOM y CONACEM. Consultas urológicas y estética íntima masculina. Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/urologo-los-angeles-chile',
    },
    alternates: {
        canonical: 'https://cialo.cl/urologo-los-angeles-chile',
    },
};

const faqs = [
    {
        pregunta: '¿Cuándo debo consultar a un urólogo?',
        respuesta: 'Debes consultar si presentas problemas al orinar, dolor en zona genital o lumbar, sangre en orina, disfunción eréctil, o si tienes más de 45 años para chequeo prostático.',
    },
    {
        pregunta: '¿En qué consiste el engrosamiento peneano?',
        respuesta: 'Es un procedimiento estético que aumenta el grosor del pene mediante inyección de ácido hialurónico. Es ambulatorio, con anestesia local, y los resultados son inmediatos.',
    },
    {
        pregunta: '¿El tratamiento es seguro?',
        respuesta: 'Sí. El ácido hialurónico es un material biocompatible que se usa en medicina estética desde hace décadas. El procedimiento es realizado por urólogos certificados.',
    },
    {
        pregunta: '¿Cuántos urólogos atienden en Clínica Cialo?',
        respuesta: 'Contamos con dos urólogos especialistas: Dr. Frank Ulloa y Dr. Guillermo Contreras. Ambos están certificados por EUNACOM y cuentan con amplia experiencia en urología y estética masculina.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Urólogo en Los Ángeles Chile', item: 'https://cialo.cl/urologo-los-angeles-chile' },
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
            name: 'Clínica CIALO - Urología Los Ángeles',
            description: 'Centro especializado en urología y estética masculina en Los Ángeles, Chile',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            url: 'https://cialo.cl/urologo-los-angeles-chile',
            telephone: '+56 9 8202 8473',
            openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
            medicalSpecialty: 'Urology',
        },
        {
            '@type': 'Physician',
            name: 'Dr. Frank Ulloa Carrasco',
            description: 'Urólogo - Especialista en Cirugía Urológica y Estética Masculina',
            medicalSpecialty: 'Urology',
        },
        {
            '@type': 'Physician',
            name: 'Dr. Guillermo Contreras Rodríguez',
            description: 'Urólogo - Especialista en Estética Íntima Masculina',
            medicalSpecialty: 'Urology',
        },
    ],
};

const servicios = [
    {
        titulo: 'Consulta Urológica',
        descripcion: 'Evaluación completa de salud urológica masculina y femenina.',
        precio: '$50.000',
    },
    {
        titulo: 'Engrosamiento Peneano',
        descripcion: 'Aumento de grosor con ácido hialurónico. Resultados inmediatos y naturales.',
        precio: 'Desde $800.000',
    },
    {
        titulo: 'Cistoscopía Diagnóstica',
        descripcion: 'Evaluación endoscópica del tracto urinario para diagnóstico preciso.',
        precio: 'Consultar',
    },
    {
        titulo: 'Circuncisión',
        descripcion: 'Procedimiento quirúrgico ambulatorio con técnica precisa.',
        precio: 'Consultar',
    },
];

const condiciones = [
    'Problemas de próstata',
    'Infecciones urinarias',
    'Disfunción eréctil',
    'Cálculos renales',
    'Incontinencia urinaria',
    'Fimosis',
    'Varicocele',
    'Estética íntima',
];


export default function UrologoPage() {
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
                                Especialista en Urología
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Urólogo en Los Ángeles, Chile
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Atención urológica integral con <strong className="text-white">certificación CONACEM</strong>. Especialista en <strong className="text-white">estética íntima masculina</strong> y cirugía urológica mínimamente invasiva.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/consultas/consulta-urologia"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Agendar Consulta
                                </Link>
                                <Link
                                    href="/profesionales/frank-ulloa"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Ver Urólogos
                                </Link>
                            </div>
                        </div>

                        {/* Doctors Cards */}
                        <div className="space-y-6">
                            {/* Dr. Frank Ulloa - First */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                <div className="flex items-start gap-5">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#b8935f]">
                                        <Image
                                            src="/profesionales/clinica-cialo_Frank_Ulloa.webp"
                                            alt="Dr. Frank Ulloa - Urólogo"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div>
                                        <span className="inline-block bg-green-600 text-white text-[10px] font-bold px-2 py-1 mb-2 uppercase">Destacado</span>
                                        <h2 className="text-xl font-[family-name:var(--font-italiana)] text-white mb-1">
                                            Dr. Frank Ulloa
                                        </h2>
                                        <p className="text-[#b8935f] text-sm mb-2">Urólogo</p>
                                        <ul className="text-[#cbcfd1] text-xs space-y-1">
                                            <li className="flex items-center gap-2">
                                                <svg className="w-3 h-3 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                EUNACOM Certificado
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-3 h-3 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Cistoscopía Diagnóstica
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Dr. Guillermo Contreras */}
                            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                                <div className="flex items-start gap-5">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#b8935f]">
                                        <Image
                                            src="/profesionales/clinica-cialo_Guillermo_Contreras.webp"
                                            alt="Dr. Guillermo Contreras - Urólogo"
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div>
                                        <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-[10px] font-bold px-2 py-1 mb-2 uppercase">CONACEM</span>
                                        <h2 className="text-xl font-[family-name:var(--font-italiana)] text-white mb-1">
                                            Dr. Guillermo Contreras
                                        </h2>
                                        <p className="text-[#b8935f] text-sm mb-2">Urólogo</p>
                                        <ul className="text-[#cbcfd1] text-xs space-y-1">
                                            <li className="flex items-center gap-2">
                                                <svg className="w-3 h-3 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Estética Íntima Masculina
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-3 h-3 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                Cirugía Mínima Invasión
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <article className="prose prose-lg max-w-none">
                        <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Atención Urológica de Excelencia en Los Ángeles, Chile
                        </h2>
                        <p className="text-[#6f6a5c] leading-relaxed mb-4">
                            En <strong>Clínica Cialo</strong> ofrecemos atención urológica integral con dos especialistas certificados: el <Link href="/profesionales/frank-ulloa" className="text-[#b8935f] hover:underline font-semibold">Dr. Frank Ulloa</Link> y el <Link href="/profesionales/guillermo-contreras" className="text-[#b8935f] hover:underline font-semibold">Dr. Guillermo Contreras</Link>. Nuestro equipo combina años de experiencia en urología clínica con formación avanzada en estética íntima masculina, brindando soluciones completas para la salud del hombre.
                        </p>
                        <p className="text-[#6f6a5c] leading-relaxed mb-4">
                            Somos el único centro en la <strong>Región del Biobío</strong> que ofrece tanto consultas urológicas tradicionales como procedimientos de <strong>estética masculina</strong> realizados por urólogos certificados. Esto garantiza que cada tratamiento se realice con el conocimiento anatómico y la precisión que solo un especialista puede ofrecer.
                        </p>
                        <p className="text-[#6f6a5c] leading-relaxed mb-4">
                            Nuestros servicios incluyen <strong>consulta urológica</strong> para problemas de próstata, infecciones urinarias, disfunción eréctil y cálculos renales; <strong>cistoscopía diagnóstica</strong> para evaluación precisa del tracto urinario; y procedimientos de <strong>estética íntima</strong> como <Link href="/engrosamiento-peneano-los-angeles" className="text-[#b8935f] hover:underline font-semibold">engrosamiento peneano con ácido hialurónico</Link>, realizado con técnicas seguras y resultados naturales.
                        </p>
                        <p className="text-[#6f6a5c] leading-relaxed mb-6">
                            Ubicados en <strong>Bulnes 220, Of. 509</strong> en Los Ángeles, atendemos pacientes de toda la región, incluyendo Concepción, Temuco, Chillán y ciudades cercanas. Nuestro ambiente es confidencial, cómodo y diseñado para que te sientas en confianza desde el primer momento.
                        </p>

                        {/* Related Links */}
                        <div className="bg-[#faf6ef] p-6 rounded-sm mt-8">
                            <h3 className="text-lg font-semibold text-[#1b1a18] mb-4">Páginas Relacionadas</h3>
                            <div className="grid md:grid-cols-2 gap-3">
                                <Link href="/engrosamiento-peneano-los-angeles" className="flex items-center gap-2 text-[#6f6a5c] hover:text-[#b8935f] transition-colors">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Engrosamiento Peneano en Los Ángeles
                                </Link>
                                <Link href="/profesionales/frank-ulloa" className="flex items-center gap-2 text-[#6f6a5c] hover:text-[#b8935f] transition-colors">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Dr. Frank Ulloa - Perfil Completo
                                </Link>
                                <Link href="/profesionales/guillermo-contreras" className="flex items-center gap-2 text-[#6f6a5c] hover:text-[#b8935f] transition-colors">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Dr. Guillermo Contreras - Perfil Completo
                                </Link>
                                <Link href="/tratamientos/categoria/corporal" className="flex items-center gap-2 text-[#6f6a5c] hover:text-[#b8935f] transition-colors">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Todos los Tratamientos Corporales
                                </Link>
                                <Link href="/profesionales" className="flex items-center gap-2 text-[#6f6a5c] hover:text-[#b8935f] transition-colors">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Ver Todos los Profesionales
                                </Link>
                                <Link href="/contacto" className="flex items-center gap-2 text-[#6f6a5c] hover:text-[#b8935f] transition-colors">
                                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Contacto y Ubicación
                                </Link>
                            </div>
                        </div>
                    </article>
                </div>
            </section>

            {/* Servicios */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Servicios</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Atención Urológica Integral</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">¿Qué Tratamos?</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Motivos de Consulta</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {condiciones.map((condicion, index) => (
                            <div key={index} className="bg-white p-4 rounded-sm text-center">
                                <p className="text-[#1b1a18] font-medium">{condicion}</p>
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
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">Agenda tu Consulta Urológica</h2>
                    <p className="text-[#cbcfd1] mb-8">Atención profesional y confidencial en Los Ángeles, Chile. Tu salud masculina en las mejores manos.</p>
                    <Link
                        href="/consultas/consulta-urologia"
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
