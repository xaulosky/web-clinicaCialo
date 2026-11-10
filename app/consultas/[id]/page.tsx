import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ConsultaAddToCart from "../../components/ConsultaAddToCart";
import { consultasData, getConsultaById } from "@/data/consultas";
import { urlReservaProfesional } from "@/lib/reservaClinios";
import ReservaClinios from "../../components/ReservaClinios";

interface PageProps {
    params: Promise<{ id: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return consultasData.map((consulta) => ({
        id: consulta.id,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const consulta = getConsultaById(id);

    if (!consulta) {
        return {
            title: "Consulta no encontrada | Clínica Cialo",
        };
    }

    const title = consulta.seo?.metaTitle;
    const description = consulta.seo?.metaDescription || consulta.descripcion;

    return {
        // metaTitle ya trae la marca: absoluto para que la plantilla no la repita.
        title: title ? { absolute: title } : `${consulta.nombre} en Los Ángeles`,
        description,
        keywords: consulta.seo?.keywords,
        alternates: {
            canonical: `/consultas/${id}/`,
        },
        openGraph: {
            title: title || `${consulta.nombre} | Clínica Cialo`,
            description,
            url: `https://cialo.cl/consultas/${id}/`,
            type: "website",
            locale: "es_CL",
        },
    };
}

export default async function ConsultaPage({ params }: PageProps) {
    const { id } = await params;
    const consulta = getConsultaById(id);

    if (!consulta) {
        notFound();
    }

    const isGratuita = consulta.valor === null;

    const url = `https://cialo.cl/consultas/${consulta.id}/`;
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        name: consulta.nombre,
        description: consulta.seo?.metaDescription || consulta.descripcion,
        url,
        procedureType: "https://schema.org/NoninvasiveProcedure",
        ...(consulta.profesionales[0] && {
            performer: { "@type": "Person", name: consulta.profesionales[0].nombre, jobTitle: consulta.profesionales[0].especialidad },
        }),
        offers: {
            "@type": "Offer",
            price: consulta.valor ?? 0,
            priceCurrency: "CLP",
            availability: "https://schema.org/InStock",
            url,
        },
        provider: {
            "@type": "MedicalClinic",
            "@id": "https://cialo.cl/#clinic",
            name: "Clínica CIALO",
            telephone: "+56 9 8202 8473",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Bulnes 220, Of. 509",
                addressLocality: "Los Ángeles",
                addressRegion: "Región del Biobío",
                addressCountry: "CL",
            },
        },
    };
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
            { "@type": "ListItem", position: 2, name: "Consultas", item: "https://cialo.cl/consultas/" },
            { "@type": "ListItem", position: 3, name: consulta.nombre, item: url },
        ],
    };

    return (
        <div className="flex flex-col min-h-screen bg-white relative overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <Navbar transparent />

            {/* Hero section - Standard Dark/Gold Premium */}
            <header className="relative py-10 md:py-16 bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] pt-[112px] overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8 font-light">
                        <Link href="/" className="hover:text-[#b8935f] transition-colors">Inicio</Link>
                        <span>/</span>
                        <Link href="/consultas" className="hover:text-[#b8935f] transition-colors">Consultas</Link>
                        <span>/</span>
                        <span className="text-[#b8935f] truncate max-w-[200px]">{consulta.nombre}</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">
                        <div className="flex-1 max-w-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 shadow-xl">
                                    <svg className="w-7 h-7 text-[#b8935f]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={consulta.iconPath} />
                                    </svg>
                                </div>
                                <span className="text-[#b8935f] uppercase tracking-[0.4em] text-xs font-semibold">
                                    {consulta.categoria}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-[family-name:var(--font-italiana)] text-white mb-8 leading-[1.1]">
                                {consulta.nombre}
                            </h1>
                            <p className="text-lg text-[#cbcfd1] font-light leading-relaxed mb-8 italic">
                                {consulta.descripcion}
                            </p>
                        </div>

                        {/* Booking Card - Redirect to Agenda */}
                        <div className="lg:w-[400px] bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8935f]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                            
                            <div className="relative z-10">
                                <div className="text-center mb-6">
                                    <p className="text-[#cbcfd1] text-xs uppercase tracking-[0.3em] font-bold mb-3">Inversión en Bienestar</p>
                                    <p className={`text-4xl font-bold ${isGratuita ? 'text-green-400' : 'text-[#b8935f]'}`}>
                                        {consulta.valorTexto}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-300 text-sm">Duración Estimada</span>
                                        </div>
                                        <span className="text-white font-bold text-sm">{consulta.duracion}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span className="text-gray-300 text-sm">Especialistas</span>
                                        </div>
                                        <span className="text-white font-bold text-sm">{consulta.profesionales.length}</span>
                                    </div>
                                </div>

                                {/* Booking Button */}
                                {isGratuita ? (
                                    <a
                                        href={`https://wa.me/56982028473?text=Hola,%20me%20gustaría%20agendar%20una%20${encodeURIComponent(consulta.nombre)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-3 w-full bg-[#b8935f] hover:bg-white text-[#1b1a18] font-bold py-5 px-8 rounded-xl transition-all duration-500 shadow-xl uppercase tracking-widest text-xs"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Solicitar Agenda
                                    </a>
                                ) : (
                                    <a
                                        href="#agenda"
                                        className="flex items-center justify-center gap-3 w-full bg-[#b8935f] hover:bg-white text-[#1b1a18] font-bold py-5 px-8 rounded-xl transition-all duration-500 shadow-xl uppercase tracking-widest text-xs"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Ver Disponibilidad
                                    </a>
                                )}

                                <div className="flex items-center justify-center gap-2 mt-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                                        {isGratuita ? "Respuesta inmediata" : "Agendamiento seguro vía AgendaPro"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="flex-grow py-16 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Info Principal */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Profesionales - Redesigned Cards */}
                            <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                        Especialistas a Cargo
                                    </h2>
                                    <div className="h-px flex-grow bg-gray-100 ml-4"></div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {consulta.profesionales.map((prof, index) => (
                                        <div key={index} className="flex flex-col p-6 bg-[#faf6ef] rounded-xl border border-gray-100 hover:border-[#b8935f] transition-all duration-500 group">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-14 h-14 rounded-full bg-[#1b1a18] group-hover:bg-[#b8935f] transition-colors flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 shadow-lg">
                                                    {prof.nombre.split(" ").slice(0, 2).map(n => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-[#1b1a18] group-hover:text-[#b8935f] transition-colors">{prof.nombre}</h3>
                                                    <p className="text-xs text-[#b8935f] uppercase tracking-widest font-bold">{prof.especialidad}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-3 pt-4 border-t border-gray-200/50">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="font-medium text-gray-700">{prof.disponibilidad}</span>
                                                </div>
                                                {prof.condicionGratuidad && (
                                                    <div className="flex items-center gap-2 text-[10px] text-green-600 font-bold uppercase tracking-widest bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {prof.condicionGratuidad}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Tratamientos Asociados - Refined */}
                            {consulta.tratamientosAsociados.length > 0 && (
                                <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                            Procedimientos Relacionados
                                        </h2>
                                        <div className="h-px flex-grow bg-gray-100 ml-4"></div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-8 font-light italic">
                                        Esta consulta es el diagnóstico base para acceder a procedimientos de alta complejidad como:
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {consulta.tratamientosAsociados.map((tratamiento, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-2 bg-[#faf6ef] text-[#1b1a18] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border border-gray-100 hover:border-[#b8935f] transition-colors shadow-sm"
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#b8935f]"></div>
                                                {tratamiento}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Reserva online propia (cae sola al iframe si la agenda no está habilitada) */}
                            {(consulta.agendaUrl?.includes("clinios.cl") || consulta.id === "evaluacion-estetica-facial") && (
                                <section id="agenda" className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 scroll-mt-32 overflow-hidden">
                                    <div className="p-6 pb-2">
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                                Agenda tu Cita
                                            </h2>
                                            <div className="px-4 py-1.5 bg-[#b8935f]/10 rounded-full">
                                                <span className="text-[10px] font-bold text-[#b8935f] uppercase tracking-widest">Reserva Segura</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2 font-light leading-relaxed">
                                            Elige el día y la hora disponibles en la agenda real. La confirmación es inmediata
                                            y te contactaremos el día previo para confirmar tu asistencia.
                                        </p>
                                    </div>
                                    <ReservaClinios
                                        agendaUrl={consulta.id === "evaluacion-estetica-facial" ? urlReservaProfesional("nicolas-laucirica") : consulta.agendaUrl}
                                        title={`Agendar ${consulta.nombre}`}
                                    />
                                </section>
                            )}
                        </div>

                        {/* Sidebar - Standardized */}
                        <div className="space-y-8">
                            {/* Requisitos */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-[#b8935f]/5 -mr-8 -mt-8 rounded-full"></div>
                                <h3 className="font-bold text-[#1b1a18] uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#faf6ef] flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    Reparación Previa
                                </h3>
                                <p className="text-sm text-gray-600 font-light leading-relaxed italic">{consulta.requisitos}</p>
                            </div>

                            {/* Política de cancelación */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-[#1b1a18] uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#faf6ef] flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    Asistencia y Puntualidad
                                </h3>
                                <p className="text-sm text-gray-600 font-light leading-relaxed italic">{consulta.politicaCancelacion}</p>
                            </div>

                            {/* Ubicación */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-[#1b1a18] uppercase tracking-widest text-xs mb-6 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#faf6ef] flex items-center justify-center">
                                        <svg className="w-5 h-5 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                    </div>
                                    Dirección Clínica
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                                        Bulnes 220, Of. 509<br />
                                        Edificio Puerto Mayor II<br />
                                        <strong>Los Ángeles, Biobío</strong>
                                    </p>
                                    <a 
                                        href="https://maps.app.goo.gl/YourMapLink" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-[10px] uppercase tracking-widest font-bold text-[#b8935f] hover:text-[#1b1a18] transition-colors"
                                    >
                                        Cómo llegar
                                    </a>
                                </div>
                            </div>

                            {/* Contacto Premium */}
                            <div className="bg-gradient-to-br from-[#1b1a18] to-[#2a2a2a] text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-[#b8935f]/10 rounded-full blur-2xl"></div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] mb-4">¿Preguntas sobre <br /> tu cita?</h3>
                                <p className="text-sm text-gray-400 mb-8 font-light leading-relaxed">
                                    Nuestro equipo de Concierge está disponible para asistirte en cada paso.
                                </p>
                                <a
                                    href="https://wa.me/56982028473"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-[#b8935f] text-[#1b1a18] px-6 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-white transition-all duration-500 shadow-lg w-full justify-center"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Asistencia WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
