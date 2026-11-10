import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Cirujano Vascular en Los Ángeles Chile | Clínica CIALO' },
    description: 'Especialista en Cirugía Vascular en Los Ángeles, Biobío. Tratamiento de várices, arañitas vasculares, escleroterapia y cirugía endovascular. Dra. Francisca González - U. de Chile. Agenda tu consulta.',
    keywords: 'cirujano vascular Los Ángeles, várices tratamiento Chile, escleroterapia Biobío, arañitas vasculares Los Ángeles, cirugía vascular Chile, flebólogo Los Ángeles, venas varicosas tratamiento',
    openGraph: {
        title: 'Cirujano Vascular Los Ángeles - Dra. Francisca González | Clínica CIALO',
        description: 'Especialista en Cirugía Vascular y Endovascular. Tratamiento de várices y arañitas. Bulnes 220, Los Ángeles.',
        type: 'website',
        locale: 'es_CL',
        url: 'https://cialo.cl/cirujano-vascular-los-angeles',
    },
    alternates: {
        canonical: 'https://cialo.cl/cirujano-vascular-los-angeles',
    },
};

const faqs = [
    {
        pregunta: '¿Cuándo debo consultar a un cirujano vascular?',
        respuesta: 'Debes consultar si presentas várices visibles, hinchazón en las piernas, dolor o pesadez al estar de pie, arañitas vasculares, cambios en la coloración de la piel de las piernas, o antecedentes familiares de enfermedades vasculares.',
    },
    {
        pregunta: '¿Las várices pueden desaparecer sin tratamiento?',
        respuesta: 'No, las várices son una condición progresiva. Sin tratamiento, tienden a empeorar con el tiempo. El tratamiento temprano evita complicaciones como úlceras, trombosis y cambios en la piel.',
    },
    {
        pregunta: '¿Cuántas sesiones de escleroterapia necesito?',
        respuesta: 'El número de sesiones varía según la cantidad y tamaño de las venas a tratar. Generalmente se requieren entre 2 a 6 sesiones, espaciadas cada 3-4 semanas.',
    },
    {
        pregunta: '¿La cirugía de várices requiere hospitalización?',
        respuesta: 'La mayoría de los procedimientos actuales son ambulatorios. Técnicas modernas como el láser endovenoso o la radiofrecuencia permiten tratar várices sin necesidad de hospitalización.',
    },
    {
        pregunta: '¿Cuál es la experiencia de la Dra. González?',
        respuesta: 'La Dra. Francisca González es Cirujana Vascular y Endovascular formada en la Universidad de Chile, con experiencia en el Hospital Salvador de Santiago y formación internacional en Dartmouth-Hitchcock Medical Center (EEUU). Fue reconocida como Mejor Egresado del Programa de Cirugía General 2013-2016.',
    },
];

const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://cialo.cl' },
                { '@type': 'ListItem', position: 2, name: 'Cirujano Vascular en Los Ángeles Chile', item: 'https://cialo.cl/cirujano-vascular-los-angeles' },
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
            name: 'Clínica CIALO - Cirugía Vascular Los Ángeles',
            description: 'Centro especializado en cirugía vascular y tratamiento de várices en Los Ángeles, Chile',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bulnes 220, Of. 509',
                addressLocality: 'Los Ángeles',
                addressRegion: 'Biobío',
                addressCountry: 'CL',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: -37.4693,
                longitude: -72.3544,
            },
            url: 'https://cialo.cl/cirujano-vascular-los-angeles',
            telephone: '+56982028473',
            priceRange: '$50.000 - $150.000',
            openingHours: 'Mo-Fr 09:00-19:00, Sa 09:00-14:00',
            medicalSpecialty: ['VascularSurgery', 'Phlebology'],
        },
        {
            '@type': 'Physician',
            name: 'Dra. Francisca Andrea González Saldivia',
            description: 'Cirujana Vascular y Endovascular - Especialista U. de Chile',
            medicalSpecialty: 'VascularSurgery',
            worksFor: { '@id': 'https://cialo.cl/#organization' },
            alumniOf: [
                { '@type': 'CollegeOrUniversity', name: 'Universidad de Chile' },
                { '@type': 'CollegeOrUniversity', name: 'Universidad Austral de Chile' },
            ],
        },
    ],
};

const servicios = [
    {
        titulo: 'Consulta Vascular',
        descripcion: 'Evaluación completa de la salud vascular con ecografía Doppler para diagnóstico preciso.',
        precio: '$50.000',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
    },
    {
        titulo: 'Escleroterapia',
        descripcion: 'Tratamiento de arañitas vasculares y várices pequeñas mediante microinyecciones.',
        precio: 'Desde $80.000',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
    },
    {
        titulo: 'Cirugía de Várices',
        descripcion: 'Procedimientos quirúrgicos mínimamente invasivos para várices de mayor calibre.',
        precio: 'Consultar',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h3l3-9 3 18 3-9h3" />
            </svg>
        ),
    },
    {
        titulo: 'Cirugía Endovascular',
        descripcion: 'Tratamientos mínimamente invasivos guiados por imagen para patología vascular compleja.',
        precio: 'Consultar',
        icono: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
    },
];

const condiciones = [
    { nombre: 'Várices', descripcion: 'Venas dilatadas y tortuosas en las piernas' },
    { nombre: 'Arañitas Vasculares', descripcion: 'Pequeñas venas visibles en la piel' },
    { nombre: 'Telangiectasias', descripcion: 'Dilatación de capilares superficiales' },
    { nombre: 'Insuficiencia Venosa', descripcion: 'Problema en el retorno de sangre al corazón' },
    { nombre: 'Trombosis Venosa', descripcion: 'Formación de coágulos en las venas' },
    { nombre: 'Úlceras Venosas', descripcion: 'Heridas en la piel por mala circulación' },
];


export default function CirujanoVascularPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar transparent />

            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="inline-block text-[#b8935f] uppercase tracking-[0.3em] text-xs font-semibold mb-6">
                                Especialista en Cirugía Vascular
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                                Cirujano Vascular en Los Ángeles, Chile
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed">
                                Tratamiento especializado de <strong className="text-white">várices</strong>, <strong className="text-white">arañitas vasculares</strong> y enfermedades del sistema circulatorio. Diagnóstico con ecografía Doppler y técnicas mínimamente invasivas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20consulta%20vascular"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Agendar Consulta
                                </a>
                                <Link
                                    href="/consultas/consulta-flebologia"
                                    className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                                >
                                    Reservar Online - $50.000
                                </Link>
                            </div>
                        </div>

                        {/* Doctor Card */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
                            <div className="flex items-start gap-6">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#b8935f]">
                                    <Image
                                        src="/profesionales/clinica-cialo_Francisca_Gonzalez.webp"
                                        alt="Dra. Francisca González - Cirujana Vascular"
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">
                                        Dra. Francisca González
                                    </h2>
                                    <p className="text-[#b8935f] text-sm mb-3">
                                        Cirujana Vascular y Endovascular
                                    </p>
                                    <ul className="text-[#cbcfd1] text-sm space-y-1">
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Especialista U. de Chile
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Mejor Egresado Cirugía 2013-2016
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <svg className="w-4 h-4 text-[#b8935f]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Formación en EEUU
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <Link
                                    href="/profesionales/francisca-gonzalez"
                                    className="text-[#b8935f] text-sm hover:underline flex items-center gap-2"
                                >
                                    Ver perfil completo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Nuestros Servicios
                        </span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                            Tratamientos Vasculares
                        </h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                            Soluciones especializadas para cada condición vascular
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicios.map((servicio, index) => (
                            <div
                                key={index}
                                className="bg-[#faf6ef] p-8 rounded-sm hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6 text-[#b8935f] group-hover:bg-[#b8935f] group-hover:text-white transition-all">
                                    {servicio.icono}
                                </div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3">
                                    {servicio.titulo}
                                </h3>
                                <p className="text-sm text-[#6f6a5c] mb-4">
                                    {servicio.descripcion}
                                </p>
                                <span className="text-[#b8935f] font-semibold">
                                    {servicio.precio}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Condiciones que tratamos */}
            <section className="py-20 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            ¿Qué Tratamos?
                        </span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                            Condiciones Vasculares
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {condiciones.map((condicion, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-sm text-center hover:shadow-lg transition-all"
                            >
                                <h3 className="font-semibold text-[#1b1a18] mb-2">{condicion.nombre}</h3>
                                <p className="text-xs text-[#6f6a5c]">{condicion.descripcion}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Por qué elegirnos */}
            <section className="py-20 bg-[#1b1a18] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                ¿Por Qué Elegirnos?
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] mb-6">
                                Experiencia y Tecnología
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-[#b8935f] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h4 className="font-semibold mb-1">Especialista Certificada</h4>
                                        <p className="text-[#cbcfd1] text-sm">Cirujana Vascular formada en U. de Chile con registro en Superintendencia de Salud</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-[#b8935f] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h4 className="font-semibold mb-1">Ecografía Doppler</h4>
                                        <p className="text-[#cbcfd1] text-sm">Diagnóstico preciso del sistema venoso para un tratamiento personalizado</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-[#b8935f] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h4 className="font-semibold mb-1">Técnicas Mínimamente Invasivas</h4>
                                        <p className="text-[#cbcfd1] text-sm">Procedimientos ambulatorios con rápida recuperación</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <svg className="w-6 h-6 text-[#b8935f] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h4 className="font-semibold mb-1">Atención en Los Ángeles</h4>
                                        <p className="text-[#cbcfd1] text-sm">Sin necesidad de viajar a Santiago para atención especializada</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] relative rounded-sm overflow-hidden">
                                <Image
                                    src="/clinica/clinica-cialo_boxprocedimientos.webp"
                                    alt="Sala de procedimientos Clínica CIALO"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Preguntas Frecuentes
                        </span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                            Resolvemos tus Dudas
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <details
                                key={index}
                                className="group bg-[#faf6ef] rounded-sm overflow-hidden"
                            >
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
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                        Agenda Tu Evaluación
                    </span>
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">
                        Consulta Vascular en Los Ángeles
                    </h2>
                    <p className="text-[#cbcfd1] mb-8 max-w-2xl mx-auto">
                        No dejes que las várices afecten tu calidad de vida. Agenda tu evaluación con la Dra. Francisca González y recibe un diagnóstico profesional.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20consulta%20vascular"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar por WhatsApp
                        </a>
                        <Link
                            href="/consultas/consulta-flebologia"
                            className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#b8935f] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all"
                        >
                            Reservar Online - $50.000
                        </Link>
                    </div>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">
                        📍 Bulnes 220, Of. 509, Los Ángeles, Chile
                    </p>
                </div>
            </section>

            {/* Ubicación */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                Ubicación
                            </h2>
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
                            <a
                                href="https://maps.google.com/?q=Bulnes+220+Los+Angeles+Chile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#b8935f] font-semibold hover:underline"
                            >
                                Ver en Google Maps →
                            </a>
                        </div>
                        <div className="h-64 lg:h-80 rounded-sm overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.7123456789!2d-72.3550!3d-37.4700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdf123456789%3A0x123456789abcdef!2sBulnes%20220%2C%20Los%20%C3%81ngeles%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1234567890"
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
