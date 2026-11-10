import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Depilación Láser en Los Ángeles | Clínica Cialo' },
    description: 'La mejor Depilación Láser en Los Ángeles, Chile. Tratamientos definitivos con tecnología Soprano Titanium para todas las zonas. Agenda tu primera evaluación gratis en Clínica Cialo.',
    keywords: 'depilacion laser los angeles, depilacion laser en los angeles, clinica estetica los angeles, clinica cialo los angeles, depilación definitiva Los Ángeles Chile, rebaje láser, depilación láser Biobío',
    openGraph: {
        title: 'Depilación Láser en Los Ángeles | Centro CIALO',
        description: 'Elimina el vello de forma permanente con tecnología láser de última generación. Tratamientos seguros y efectivos en Los Ángeles, Chile.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/depilacion-laser-los-angeles',
        images: [
            {
                url: '/og-depilacion-laser.jpg',
                width: 1200,
                height: 630,
                alt: 'Depilación Láser Profesional en Los Ángeles',
            },
        ],
    },
    alternates: {
        canonical: 'https://cialo.cl/depilacion-laser-los-angeles',
    },
};

// Datos estructurados JSON-LD para SEO
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'CIALO - Centro de Depilación Láser Los Ángeles',
    description: 'Centro especializado en depilación láser definitiva en Los Ángeles, Chile',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle Principal 123',
        addressLocality: 'Los Ángeles',
        addressRegion: 'Biobío',
        addressCountry: 'CL',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: -37.4693,
        longitude: -72.3544,
    },
    url: 'https://cialo.cl/depilacion-laser-los-angeles',
    telephone: '+56982028473',
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-19:00, Sa 09:00-14:00',
    medicalSpecialty: 'Dermatology',
};

const zonas = [
    { nombre: 'Rebaje', descripcion: 'Línea del bikini completa', precio: 'Desde $35.000' },
    { nombre: 'Axilas', descripcion: 'Eliminación total del vello axilar', precio: 'Desde $25.000' },
    { nombre: 'Piernas Completas', descripcion: 'Desde el tobillo hasta la ingle', precio: 'Desde $85.000' },
    { nombre: 'Bikini Brasileño', descripcion: 'Depilación integral zona íntima', precio: 'Desde $45.000' },
    { nombre: 'Rostro', descripcion: 'Bozo, mentón y patillas', precio: 'Desde $20.000' },
    { nombre: 'Espalda', descripcion: 'Espalda completa (hombres y mujeres)', precio: 'Desde $65.000' },
];

const beneficios = [
    {
        titulo: 'Resultados Permanentes',
        descripcion: 'El láser destruye el folículo piloso de forma definitiva, eliminando el vello para siempre.',
        icono: 'fa-solid fa-wand-magic-sparkles',
    },
    {
        titulo: 'Sin Dolor',
        descripcion: 'Tecnología con sistema de enfriamiento que hace el tratamiento prácticamente indoloro.',
        icono: 'fa-regular fa-snowflake',
    },
    {
        titulo: 'Sesiones Rápidas',
        descripcion: 'Las axilas toman 10 minutos, las piernas completas solo 45 minutos.',
        icono: 'fa-solid fa-bolt',
    },
    {
        titulo: 'Piel Suave',
        descripcion: 'Olvídate de la irritación, vellos encarnados y manchas de la depilación tradicional.',
        icono: 'fa-solid fa-spa',
    },
];

const faqs = [
    {
        pregunta: '¿Cuántas sesiones necesito para la depilación láser?',
        respuesta: 'Generalmente se necesitan entre 6 a 8 sesiones para obtener resultados permanentes. El número exacto depende del tipo de piel, color del vello y la zona a tratar. En tu evaluación gratuita determinaremos el plan ideal para ti.',
    },
    {
        pregunta: '¿La depilación láser duele?',
        respuesta: 'Gracias a nuestro sistema de enfriamiento integrado, la mayoría de los pacientes describen la sensación como un pequeño "pellizco". Es mucho menos doloroso que la cera tradicional.',
    },
    {
        pregunta: '¿Es segura la depilación láser?',
        respuesta: 'Sí, la depilación láser es un procedimiento seguro cuando es realizado por profesionales certificados con equipos de calidad. En CIALO contamos con tecnología de última generación y personal altamente capacitado.',
    },
    {
        pregunta: '¿Qué cuidados debo tener antes y después del tratamiento?',
        respuesta: 'Antes: No exponerse al sol 2 semanas antes, no depilarse con cera ni pinzas. Después: Usar protector solar, evitar el sol directo y no usar productos irritantes por 48 horas.',
    },
    {
        pregunta: '¿Qué zonas del cuerpo se pueden tratar?',
        respuesta: 'Prácticamente cualquier zona: rostro, axilas, brazos, espalda, pecho, abdomen, rebaje, bikini completo, piernas y más. Consulta por paquetes especiales.',
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

export default function DepilacionLaserPage() {
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
                <section className="relative bg-gradient-to-br from-cialo-light via-[#f5f2eb] to-white pt-28 pb-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block bg-cialo-gold/10 text-cialo-dark px-4 py-1 rounded-full text-sm font-medium mb-4 font-body">
                                    📍 Los Ángeles, Biobío
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-cialo-dark leading-tight mb-6">
                                    Depilación Láser <span className="text-cialo-gold">Definitiva</span> en Los Ángeles
                                </h1>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed font-body">
                                    Olvídate del rasurado y la cera para siempre. Elimina el vello de <strong>rebaje, axilas, piernas y más</strong> con tecnología láser de última generación. Resultados visibles desde la primera sesión.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mb-8 font-body">
                                    <Link
                                        href="/agendar"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-cialo-gold text-white font-bold rounded-xl hover:bg-[#c4b190] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        <i className="fa-regular fa-calendar-check"></i> Agenda tu Evaluación Gratis
                                    </Link>
                                    <a
                                        href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20la%20depilación%20láser"
                                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-cialo-gold font-bold rounded-xl border-2 border-cialo-gold/30 hover:border-cialo-gold hover:bg-cialo-light transition-all"
                                    >
                                        <i className="fa-brands fa-whatsapp text-xl"></i> WhatsApp
                                    </a>
                                </div>
                                <div className="flex items-center gap-6 text-sm text-gray-500 font-body">
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-check text-cialo-gold"></i> Sin dolor
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-check text-cialo-gold"></i> Resultados permanentes
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-check text-cialo-gold"></i> Evaluación gratis
                                    </span>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000"
                                        alt="Depilación láser profesional en Los Ángeles Chile"
                                        width={600}
                                        height={500}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-cialo-gold/10 rounded-full flex items-center justify-center text-xl text-cialo-gold">
                                            <i className="fa-solid fa-star"></i>
                                        </div>
                                        <div>
                                            <p className="font-bold text-cialo-dark font-body">+500 clientas</p>
                                            <p className="text-sm text-gray-500 font-body">satisfechas en Los Ángeles</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Video Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-cialo-dark mb-4">
                                Conoce Nuestro Tratamiento
                            </h2>
                            <p className="text-xl text-gray-600 font-body">
                                Te explicamos todo sobre la depilación láser en CIALO
                            </p>
                        </div>
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/1MH4EoIrMWs"
                                title="Depilación Láser en CIALO - Todo lo que necesitas saber"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                        </div>
                    </div>
                </section>

                {/* Tecnología Section */}
                <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2a2a]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Nuestra Tecnología
                                </span>
                                <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">
                                    Soprano Titanium <span className="text-[#b8935f]">3D</span>
                                </h2>
                                <p className="text-[#cbcfd1] mb-6 leading-relaxed">
                                    Utilizamos el <strong className="text-white">Soprano Titanium de Alma Lasers</strong>,
                                    el sistema de depilación láser más avanzado del mundo. Su exclusiva tecnología 3D combina
                                    tres longitudes de onda (755nm, 810nm y 1064nm) para tratar todos los tipos de piel y vello.
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-white/10 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-[#b8935f]">3 en 1</div>
                                        <div className="text-sm text-[#cbcfd1]">Longitudes de onda simultáneas</div>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-[#b8935f]">ICE™</div>
                                        <div className="text-sm text-[#cbcfd1]">Sistema de enfriamiento indoloro</div>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-[#b8935f]">Fototipos I-VI</div>
                                        <div className="text-sm text-[#cbcfd1]">Apto para toda piel</div>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-lg">
                                        <div className="text-2xl font-bold text-[#b8935f]">4 cm²</div>
                                        <div className="text-sm text-[#cbcfd1]">Mayor área por disparo</div>
                                    </div>
                                </div>

                                <Link
                                    href="/soprano-titanium-los-angeles"
                                    className="inline-flex items-center gap-2 text-[#b8935f] font-semibold hover:text-white transition-colors"
                                >
                                    Conoce más sobre Soprano Titanium
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>

                            <div className="relative">
                                <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-8">
                                    <h3 className="text-xl font-semibold text-white mb-4">¿Por qué Soprano Titanium?</h3>
                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-[#b8935f] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[#cbcfd1]"><strong className="text-white">Tratamiento indoloro</strong> gracias al sistema ICE™ que enfría la piel constantemente</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-[#b8935f] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[#cbcfd1]"><strong className="text-white">Sesiones más rápidas</strong> por su cabezal de mayor tamaño y velocidad de disparo</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-[#b8935f] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[#cbcfd1]"><strong className="text-white">Mayor efectividad</strong> al combinar 3 longitudes de onda que atacan el folículo a diferentes profundidades</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <svg className="w-5 h-5 text-[#b8935f] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-[#cbcfd1]"><strong className="text-white">Seguro para piel bronceada</strong> y todos los fototipos, incluyendo pieles oscuras</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Zonas de Tratamiento */}
                <section className="py-20 bg-cialo-light">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-cialo-dark mb-4">
                                Zonas de Depilación Láser
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                                Tratamos todas las zonas del cuerpo con los mejores resultados
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {zonas.map((zona) => (
                                <div
                                    key={zona.nombre}
                                    className="bg-white rounded-2xl p-6 border border-cialo-gold/20 hover:shadow-lg transition-all hover:border-cialo-gold"
                                >
                                    <h3 className="text-xl font-bold font-heading text-cialo-dark mb-2">{zona.nombre}</h3>
                                    <p className="text-gray-600 mb-4 font-body">{zona.descripcion}</p>
                                    <p className="text-cialo-gold font-bold font-body">{zona.precio}</p>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-10 font-body">
                            <Link
                                href="/tratamientos"
                                className="text-cialo-gold font-semibold hover:text-[#c4b190] transition-colors"
                            >
                                Ver todos los tratamientos →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Beneficios */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-cialo-dark mb-4">
                                ¿Por Qué Elegir Depilación Láser?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-body">
                                Ventajas frente a métodos tradicionales como cera, rasurado o cremas
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
                                    <h3 className="text-lg font-bold font-heading text-cialo-dark mb-2">{beneficio.titulo}</h3>
                                    <p className="text-gray-600 text-sm font-body">{beneficio.descripcion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Proceso */}
                <section className="py-20 bg-cialo-light">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-cialo-dark mb-4">
                                ¿Cómo Funciona el Tratamiento?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                { paso: '1', titulo: 'Evaluación Gratuita', desc: 'Analizamos tu tipo de piel y vello para crear un plan personalizado.' },
                                { paso: '2', titulo: 'Primera Sesión', desc: 'Aplicamos el láser en la zona elegida. Es rápido y casi indoloro.' },
                                { paso: '3', titulo: 'Sesiones Siguientes', desc: 'Cada 4-6 semanas para captar todos los ciclos de crecimiento.' },
                                { paso: '4', titulo: 'Resultados Permanentes', desc: 'Después de 6-8 sesiones, disfruta de piel suave para siempre.' },
                            ].map((item) => (
                                <div key={item.paso} className="text-center">
                                    <div className="w-16 h-16 bg-cialo-gold text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg shadow-cialo-gold/20">
                                        {item.paso}
                                    </div>
                                    <h3 className="font-bold font-heading text-cialo-dark mb-2">{item.titulo}</h3>
                                    <p className="text-gray-600 text-sm font-body">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-heading text-cialo-dark mb-4">
                                Preguntas Frecuentes
                            </h2>
                            <p className="text-xl text-gray-600 font-body">
                                Todo lo que necesitas saber sobre la depilación láser
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
                            Agenda tu Evaluación Gratuita Hoy
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto font-body">
                            Visítanos en Los Ángeles y descubre por qué somos el centro de depilación láser preferido de la región del Biobío.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center font-body">
                            <Link
                                href="/tratamientos/depilacion-laser"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-cialo-gold font-bold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
                            >
                                <i className="fa-regular fa-calendar-check"></i> Reservar Evaluación Gratis
                            </Link>
                            <a
                                href="tel:+56982028473"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white/10 transition-all"
                            >
                                <i className="fa-solid fa-phone"></i> Llamar Ahora
                            </a>
                        </div>
                        <p className="mt-8 text-white/80 text-sm font-body">
                            📍 Centro CIALO, Los Ángeles, Biobío, Chile
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
