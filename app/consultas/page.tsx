import { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { consultasData, getCategoriasConsultas } from "@/data/consultas";

export const metadata: Metadata = {
    title: "Consultas y Evaluaciones Médicas",
    description: "Agenda tu consulta médica en Clínica Cialo. Evaluaciones especializadas en urología, tricología, ginecología, nutrición, cirugía maxilofacial y más. Los Ángeles, Chile.",
    keywords: ["consulta médica Los Ángeles", "evaluación estética", "consulta urología", "consulta nutricionista", "evaluación facial"],
    alternates: {
        canonical: '/consultas/',
    },
};

export default function ConsultasPage() {
    const categorias = getCategoriasConsultas();

    return (
        <div className="flex flex-col min-h-screen bg-white relative overflow-x-hidden">
            <Navbar transparent />

            {/* Hero section - Standard Dark/Gold Premium & Reduced Height */}
            <section className="relative py-24 md:py-32 flex items-center bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] pt-[112px] overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center justify-center gap-2 text-sm text-[#cbcfd1] mb-8 font-light">
                        <Link href="/" className="hover:text-[#b8935f] transition-colors">Inicio</Link>
                        <span>/</span>
                        <span className="text-[#b8935f]">Consultas</span>
                    </nav>

                    <span className="text-[#b8935f] uppercase tracking-[0.4em] text-xs font-semibold mb-4 block">
                        Primeras Visitas y Diagnósticos
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                        Consultas y <br />
                        <span className="text-[#b8935f]">Evaluaciones</span>
                    </h1>
                    <p className="text-[#cbcfd1] text-lg max-w-2xl mx-auto leading-relaxed font-light">
                        Agenda tu primera cita con nuestros especialistas. El primer paso estratégico hacia tu transformación y bienestar integral.
                    </p>
                </div>
            </section>

            {/* Consultas Grid */}
            <main className="flex-grow py-16 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Info Banner - Refined */}
                    <div className="bg-white border-l-4 border-[#b8935f] rounded-r-xl shadow-sm p-8 mb-12 max-w-4xl mx-auto">
                        <div className="flex items-start gap-6">
                            <div className="w-12 h-12 bg-[#b8935f]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">¿Cómo agendar tu consulta?</h3>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    Selecciona el área de tu interés, revisa la disponibilidad y reserva directamente. 
                                    Las evaluaciones pagadas te otorgan acceso prioritario y se descuentan del valor de tu futuro tratamiento.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Grid de consultas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {consultasData.map((consulta) => (
                            <Link
                                key={consulta.id}
                                href={`/consultas/${consulta.id}`}
                                className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group h-full"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-8">
                                    <div className="w-14 h-14 bg-[#faf6ef] rounded-xl flex items-center justify-center group-hover:bg-[#b8935f] transition-all duration-500 shadow-sm">
                                        <svg className="w-7 h-7 text-[#b8935f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={consulta.iconPath} />
                                        </svg>
                                    </div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full ${consulta.valor === null
                                            ? 'bg-green-50 text-green-600 ring-1 ring-green-100'
                                            : 'bg-[#1b1a18] text-white shadow-lg'
                                        }`}>
                                        {consulta.valorTexto}
                                    </span>
                                </div>

                                {/* Category */}
                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8935f] mb-3">
                                    {consulta.categoria}
                                </span>

                                {/* Title */}
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4 group-hover:text-[#b8935f] transition-colors">
                                    {consulta.nombre}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-gray-500 mb-6 font-light leading-relaxed flex-grow">
                                    {consulta.descripcion}
                                </p>

                                {/* Meta info */}
                                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-gray-400 mb-8 pt-6 border-t border-gray-50">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {consulta.duracion}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {consulta.profesionales.length} especialista{consulta.profesionales.length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center justify-between group/cta">
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#b8935f] border-b border-transparent group-hover/cta:border-[#b8935f] transition-all duration-300">
                                        {consulta.valor === null ? 'Agendar gratis' : 'Ver disponibilidad'}
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-[#faf6ef] flex items-center justify-center group-hover:bg-[#b8935f] transition-all duration-500 shadow-sm">
                                        <svg className="w-4 h-4 text-[#b8935f] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            {/* CTA Section - Standard Site Style */}
            <section className="bg-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="inline-block bg-[#faf6ef] px-6 py-2 rounded-full mb-6">
                        <span className="text-[#b8935f] font-bold text-xs uppercase tracking-[0.4em]">Asistencia Personalizada</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 leading-tight">¿No estás seguro qué <br /> consulta necesitas?</h2>
                    <p className="text-[#6f6a5c] mb-8 font-light text-xl max-w-2xl mx-auto leading-relaxed">
                        Nuestro equipo de atención al paciente te orientará sobre la consulta o evaluación más adecuada según tus objetivos de salud y estética.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="https://wa.me/56982028473"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all duration-500 shadow-xl"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Conversar con Clínica Cialo
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
