import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Escleroterapia y Consulta Vascular | Clínica CIALO' },
    description: 'Tratamiento de arañitas vasculares y várices con escleroterapia en Los Ángeles, Biobío. Evaluación vascular profesional por Dra. Francisca González. Agenda tu consulta en Bulnes 220.',
    keywords: 'escleroterapia Los Ángeles, arañitas vasculares Los Ángeles, várices tratamiento Biobío, consulta vascular Los Ángeles Chile, esclerosis venas, telangiectasias tratamiento',
    openGraph: {
        title: 'Escleroterapia - Tratamiento de Arañitas Vasculares | Clínica CIALO',
        description: 'Elimina las arañitas vasculares y várices con escleroterapia. Evaluación profesional en Clínica CIALO, Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/escleroterapia-consulta-vascular-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/escleroterapia-consulta-vascular-los-angeles',
    },
};

// Datos estructurados JSON-LD para SEO
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'Clínica CIALO - Escleroterapia Los Ángeles',
    description: 'Centro especializado en escleroterapia y tratamiento de arañitas vasculares en Los Ángeles, Chile',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bulnes 220',
        addressLocality: 'Los Ángeles',
        addressRegion: 'Biobío',
        addressCountry: 'CL',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: -37.4693,
        longitude: -72.3544,
    },
    url: 'https://cialo.cl/escleroterapia-consulta-vascular-los-angeles',
    telephone: '+56 9 8202 8473',
    priceRange: '$50.000',
    openingHours: 'Mo-Fr 08:30-20:00, Sa 09:00-15:00',
    medicalSpecialty: 'Phlebology',
};

const beneficios = [
    {
        titulo: 'Mínimamente Invasivo',
        descripcion: 'Sin cirugía, sin cortes. Solo micro inyecciones que no dejan cicatrices.',
        icono: 'fa-solid fa-syringe',
    },
    {
        titulo: 'Resultados Visibles',
        descripcion: 'Las arañitas comienzan a desvanecerse desde la primera sesión.',
        icono: 'fa-solid fa-eye',
    },
    {
        titulo: 'Sesiones Rápidas',
        descripcion: 'Cada sesión dura entre 20 a 45 minutos. Sin tiempo de recuperación.',
        icono: 'fa-solid fa-clock',
    },
    {
        titulo: 'Procedimiento Seguro',
        descripcion: 'Técnica avalada internacionalmente con más de 80 años de uso.',
        icono: 'fa-solid fa-shield-heart',
    },
];

const condiciones = [
    {
        nombre: 'Arañitas Vasculares',
        descripcion: 'Pequeñas venas rojas, azules o moradas visibles en la piel',
        icono: 'fa-solid fa-spider',
    },
    {
        nombre: 'Telangiectasias',
        descripcion: 'Dilatación de capilares superficiales de la piel',
        icono: 'fa-solid fa-bezier-curve',
    },
    {
        nombre: 'Várices Pequeñas',
        descripcion: 'Venas varicosas de pequeño calibre (reticulares)',
        icono: 'fa-solid fa-wave-square',
    },
    {
        nombre: 'Venas Reticulares',
        descripcion: 'Venas azuladas-verdosas de 1-3mm bajo la piel',
        icono: 'fa-solid fa-code-branch',
    },
];

const faqs = [
    {
        pregunta: '¿Qué es la escleroterapia?',
        respuesta: 'La escleroterapia es un procedimiento médico que consiste en inyectar una solución especial (esclerosante) directamente en las venas afectadas. Esta solución irrita el revestimiento interno de la vena, causando que se cierre y eventualmente sea reabsorbida por el cuerpo.',
    },
    {
        pregunta: '¿Duele el tratamiento de escleroterapia?',
        respuesta: 'El procedimiento causa mínimas molestias. Se utiliza una aguja muy fina y la mayoría de los pacientes solo sienten un pequeño pinchazo. Algunos pueden experimentar una leve sensación de ardor que desaparece rápidamente.',
    },
    {
        pregunta: '¿Cuántas sesiones necesito?',
        respuesta: 'El número de sesiones varía según la cantidad y tamaño de las venas a tratar. Generalmente se requieren entre 2 a 6 sesiones, espaciadas cada 4-6 semanas. En tu evaluación inicial determinaremos un plan personalizado.',
    },
    {
        pregunta: '¿Hay efectos secundarios?',
        respuesta: 'Los efectos secundarios son generalmente leves: enrojecimiento temporal, pequeños moretones o sensibilidad en la zona tratada. Estos desaparecen en pocos días. Es importante seguir las indicaciones post-tratamiento.',
    },
    {
        pregunta: '¿Puedo hacer vida normal después del tratamiento?',
        respuesta: 'Sí, puedes retomar tus actividades normales inmediatamente. Se recomienda evitar ejercicio intenso por 48-72 horas y usar medias de compresión según indicación médica.',
    },
    {
        pregunta: '¿Cuánto tiempo tardan en desaparecer las arañitas?',
        respuesta: 'Las venas más pequeñas pueden desvanecerse en 3-6 semanas. Las venas más grandes pueden tardar 3-4 meses en desaparecer completamente. Los resultados son progresivos y duraderos.',
    },
];

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.pregunta,
        acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
    })),
};

export default function EscleroterapiaPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <Navbar />

            <main className="bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-cialo-light via-[#e8f0f5] to-white pt-28 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-cialo-gold/10 text-cialo-dark px-4 py-1 rounded-full text-sm font-medium mb-4 font-body">
                                    📍 Bulnes 220, Los Ángeles
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 leading-tight mb-6">
                                    Escleroterapia y <span className="text-cialo-gold">Consulta Vascular</span> en Los Ángeles
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed font-body">
                                    Elimina las <strong>arañitas vasculares</strong> y venas varicosas de forma segura y efectiva.
                                    Evaluación profesional con <strong>Francisca González</strong> en Clínica CIALO.
                                </p>

                                {/* Precio destacado */}
                                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-cialo-gold/10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500 font-body">Consulta de Evaluación Vascular</p>
                                            <p className="text-3xl font-bold text-cialo-gold font-heading">$50.000</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 font-body">Profesional</p>
                                            <p className="font-semibold text-gray-900 font-body">Francisca González</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mb-8 font-body">
                                    <Link
                                        href="/consultas/consulta-flebologia"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cialo-gold text-white font-bold rounded-xl hover:bg-[#c4b190] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        <i className="fa-regular fa-calendar-check"></i> Reservar Consulta - $50.000
                                    </Link>
                                    <Link
                                        href="/consultas/consulta-flebologia"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25d366] text-white font-bold rounded-xl hover:bg-[#20b858] transition-all"
                                    >
                                        <i className="fa-brands fa-whatsapp text-xl"></i> WhatsApp
                                    </Link>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-500 font-body">
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-check text-cialo-gold"></i> Sin cirugía
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-check text-cialo-gold"></i> Resultados visibles
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-check text-cialo-gold"></i> Sin tiempo de reposo
                                    </span>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000"
                                        alt="Tratamiento de escleroterapia para arañitas vasculares en Clínica CIALO Los Ángeles"
                                        width={600}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-cialo-gold/10 rounded-full flex items-center justify-center text-xl text-cialo-gold">
                                            <i className="fa-solid fa-user-doctor"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 font-body">Francisca González</p>
                                            <p className="text-sm text-gray-500 font-body">Especialista Vascular</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Qué tratamos */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                                ¿Qué Condiciones Tratamos?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                                La escleroterapia es efectiva para diversas condiciones vasculares
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {condiciones.map((condicion) => (
                                <div
                                    key={condicion.nombre}
                                    className="bg-gradient-to-br from-cialo-light to-white rounded-2xl p-6 border border-cialo-gold/10 hover:shadow-lg transition-all hover:border-cialo-gold"
                                >
                                    <div className="text-3xl mb-4 text-cialo-gold">
                                        <i className={condicion.icono}></i>
                                    </div>
                                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{condicion.nombre}</h3>
                                    <p className="text-gray-600 text-sm font-body">{condicion.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cómo funciona */}
                <section className="py-20 bg-gradient-to-br from-cialo-light to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                                ¿Cómo Funciona la Escleroterapia?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                                Un procedimiento simple, seguro y con resultados comprobados
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { paso: '1', titulo: 'Evaluación Inicial', desc: 'Francisca González evalúa tus venas y determina el mejor plan de tratamiento.' },
                                { paso: '2', titulo: 'Aplicación', desc: 'Se inyecta una solución esclerosante directamente en las venas afectadas.' },
                                { paso: '3', titulo: 'Reacción', desc: 'La solución irrita la vena, causando que se cierre y colapse.' },
                                { paso: '4', titulo: 'Resultado', desc: 'El cuerpo reabsorbe la vena tratada. Las arañitas desaparecen gradualmente.' },
                            ].map((item) => (
                                <div key={item.paso} className="text-center">
                                    <div className="w-16 h-16 bg-cialo-gold text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-cialo-gold/30">
                                        {item.paso}
                                    </div>
                                    <h3 className="font-bold font-heading text-gray-900 mb-2">{item.titulo}</h3>
                                    <p className="text-gray-600 text-sm font-body">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                                Beneficios de la Escleroterapia
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                                Por qué es el tratamiento preferido para las arañitas vasculares
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {beneficios.map((beneficio) => (
                                <div
                                    key={beneficio.titulo}
                                    className="bg-cialo-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                                >
                                    <div className="text-4xl mb-4 text-cialo-gold">
                                        <i className={beneficio.icono}></i>
                                    </div>
                                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{beneficio.titulo}</h3>
                                    <p className="text-gray-600 text-sm font-body">{beneficio.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ubicación */}
                <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                                    Visítanos en Clínica CIALO
                                </h2>
                                <p className="text-xl text-gray-300 mb-8 font-body">
                                    Estamos ubicados en el centro de Los Ángeles, con fácil acceso y estacionamiento disponible.
                                </p>
                                <div className="space-y-4 font-body">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cialo-gold rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-location-dot text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Dirección</p>
                                            <p className="text-gray-300">Bulnes 220, Los Ángeles, Biobío</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cialo-gold rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-phone text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Teléfono</p>
                                            <p className="text-gray-300">+56 9 8202 8473</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cialo-gold rounded-full flex items-center justify-center">
                                            <i className="fa-solid fa-clock text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Horario</p>
                                            <p className="text-gray-300">Lunes a Viernes 08:30 - 20:00</p>
                                            <p className="text-gray-300">Sábado 09:00 - 15:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden shadow-2xl">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3169.7!2d-72.354!3d-37.469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI4JzA4LjQiUyA3MsKwMjEnMTQuNCJX!5e0!3m2!1ses!2scl!4v1234567890"
                                    width="100%"
                                    height="350"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación Clínica CIALO - Bulnes 220, Los Ángeles"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
                                Preguntas Frecuentes
                            </h2>
                            <p className="text-xl text-gray-600 font-body">
                                Todo lo que necesitas saber sobre la escleroterapia
                            </p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details
                                    key={index}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
                                >
                                    <summary className="p-6 cursor-pointer font-semibold font-heading text-gray-900 hover:bg-cialo-light transition-colors list-none flex justify-between items-center">
                                        {faq.pregunta}
                                        <span className="text-cialo-gold group-open:rotate-180 transition-transform">
                                            <i className="fa-solid fa-chevron-down"></i>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-gray-600 font-body">
                                        {faq.respuesta}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-cialo-gold to-[#c4b190]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
                            Agenda tu Evaluación Vascular
                        </h2>
                        <p className="text-xl text-white/90 mb-4 font-body">
                            Consulta de evaluación: <strong className="text-2xl">$50.000</strong>
                        </p>
                        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto font-body">
                            Francisca González evaluará tu caso y te explicará las opciones de tratamiento más adecuadas para ti.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center font-body">
                            <Link
                                href="/consultas/consulta-flebologia"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-cialo-gold font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                            >
                                <i className="fa-regular fa-calendar-check"></i> Reservar Consulta
                            </Link>
                            <Link
                                href="/consultas/consulta-flebologia"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25d366] text-white font-bold rounded-xl hover:bg-[#20b858] transition-all shadow-lg"
                            >
                                <i className="fa-brands fa-whatsapp text-xl"></i> WhatsApp
                            </Link>
                        </div>
                        <p className="mt-8 text-white/80 text-sm font-body">
                            📍 Clínica CIALO | Bulnes 220, Los Ángeles, Biobío
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
