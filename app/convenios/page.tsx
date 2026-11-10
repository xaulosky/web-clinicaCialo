import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import InstitutionalCodeAccess from "./InstitutionalCodeAccess";

export const metadata: Metadata = {
    title: { absolute: "Convenios y Alianzas Estratégicas | Clínica Cialo Los Ángeles" },
    description: "Conoce nuestros convenios institucionales y alianzas estratégicas. Obtén beneficios exclusivos en medicina estética, tratamientos corporales y más.",
    keywords: "convenios clínica cialo, alianzas comerciales los angeles, beneficios socios club de golf, convenios medicina estetica",
};

const convenios = [
    {
        id: "club-golf-7-rios",
        nombre: "Club de Golf 7 Ríos",
        beneficioDestacado: "15% DSCTO",
        descripcion: "Beneficios exclusivos para socios y su grupo familiar en tratamientos faciales, corporales y depilación láser de última generación.",
        logo: "/logos/club-golf-7-rios.png",
        link: "/convenios/club-golf-7-rios",
        imagenFondo: "/tratamientos/valentin_body_shaping.png",
        tags: ["Salud", "Bienestar", "Exclusivo"]
    },
    {
        id: "bienestar-los-angeles",
        nombre: "Bienestar Los Ángeles",
        beneficioDestacado: "20% DSCTO",
        descripcion: "Beneficios exclusivos para funcionarios municipales y su grupo familiar en tratamientos faciales, corporales y depilación láser de última generación.",
        logo: "",
        link: "/convenios/bienestar-los-angeles",
        imagenFondo: "/tratamientos/valentin_body_shaping.png",
        tags: ["Municipal", "Salud", "Bienestar"]
    },
];

const beneficiosGenerales = [
    {
        title: "Atención Preferencial",
        desc: "Acceso prioritario a agenda y evaluaciones personalizadas.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "Condiciones Especiales",
        desc: "Tarifas diferenciadas en tratamientos seleccionados para miembros.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    },
    {
        title: "Tecnología de Punta",
        desc: "Acceso a diagnóstico avanzado con tecnología Evelab e InBody.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        )
    }
];

export default function ConveniosPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white relative overflow-x-hidden">
            <Navbar transparent />
            
            <main className="flex-grow">
                {/* Hero section */}
                <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-[#b8935f]/10 rounded-full blur-[120px]"></div>
                        <div className="absolute bottom-10 left-[-10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full pt-28 pb-16">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center justify-center gap-2 text-sm text-[#cbcfd1]/80 mb-8 font-light tracking-widest animate-fade-in">
                            <Link href="/" className="hover:text-[#b8935f] transition-colors">INICIO</Link>
                            <span className="opacity-30">/</span>
                            <span className="text-[#b8935f]">CONVENIOS</span>
                        </nav>

                        <div className="animate-fade-in-up">
                            <span className="inline-block text-[#b8935f] uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-4 border-b border-[#b8935f]/30 pb-2">
                                Alianzas Estratégicas y Corporativas
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-[1.1] tracking-tight">
                                Convenios <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8935f] via-[#e5d5b7] to-[#b8935f]">Institucionales</span>
                            </h1>
                             <p className="text-[#cbcfd1] text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light mb-8">
                                Colaboramos con instituciones prestigiosas para ofrecer condiciones preferenciales y bienestar exclusivo a sus comunidades.
                            </p>
                            
                            <InstitutionalCodeAccess />
                        </div>
                    </div>
                </section>

                {/* Lista de Convenios */}
                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="inline-block text-[#b8935f] uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
                                Nuestras Alianzas
                            </span>
                            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] tracking-wide">
                                Instituciones Asociadas
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {convenios.map((convenio) => (
                                <Link 
                                    key={convenio.id}
                                    href={convenio.link}
                                    className="group relative block bg-[#faf6ef] rounded-2xl overflow-hidden border border-gray-100 hover:border-[#b8935f] transition-all duration-500 hover:shadow-xl"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={convenio.imagenFondo}
                                            alt={convenio.nombre}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            unoptimized
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18]/80 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex gap-2 mb-2">
                                                {convenio.tags.map((tag) => (
                                                    <span key={tag} className="text-[9px] uppercase tracking-widest bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-[#1b1a18] uppercase tracking-widest mb-1">
                                                    {convenio.nombre}
                                                </h3>
                                                <p className="text-[#6f6a5c] text-sm font-light italic">
                                                    {convenio.descripcion}
                                                </p>
                                            </div>
                                            <span className="text-[#b8935f] font-[family-name:var(--font-italiana)] text-3xl ml-4 shrink-0">
                                                {convenio.beneficioDestacado}
                                            </span>
                                        </div>
                                        <span className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-bold text-[#b8935f] group-hover:text-[#1b1a18] transition-colors">
                                            Ver Convenio
                                            <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Beneficios Generales */}
                <section className="py-24 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="inline-block text-[#b8935f] uppercase tracking-[0.4em] text-[10px] font-bold mb-4">
                                Ventajas Exclusivas
                            </span>
                            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] tracking-wide">
                                Beneficios para Nuestros Aliados
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {beneficiosGenerales.map((b, i) => (
                                <div key={i} className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center group hover:border-[#b8935f] hover:shadow-xl transition-all duration-500">
                                    <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center text-[#b8935f] bg-[#faf6ef] rounded-full group-hover:bg-[#b8935f] group-hover:text-white transition-all duration-500">
                                        {b.icon}
                                    </div>
                                    <h3 className="text-base font-bold text-[#1b1a18] uppercase tracking-widest mb-3">{b.title}</h3>
                                    <p className="text-[#6f6a5c] font-light text-xs italic leading-relaxed">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
