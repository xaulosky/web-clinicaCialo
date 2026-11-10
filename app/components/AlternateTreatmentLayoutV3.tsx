'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import TreatmentCard from './TreatmentCard';
import TreatmentAddToCart from './TreatmentAddToCart';
import ReservaClinios from './ReservaClinios';
import { Tratamiento, formatPrice, tratamientoRequiereEvaluacion, getConsultaEvaluacion } from '@/data/tratamientos';

interface AlternateTreatmentLayoutV3Props {
    tratamiento: Tratamiento;
    relacionados: Tratamiento[];
}

export default function AlternateTreatmentLayoutV3({ tratamiento, relacionados }: AlternateTreatmentLayoutV3Props) {
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['overview', 'benefits', 'faq', 'agenda'];
            let current = 'overview';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Consider it active if it's in the top half of the screen
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= 100) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const requiresEvaluation = tratamientoRequiereEvaluacion(tratamiento);
    const evaluationConsulta = getConsultaEvaluacion(tratamiento);

    // Smooth scroll helper
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element) {
            // Offset for visual padding 
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-900 selection:bg-cialo-gold/30">
            <Navbar />

            {/* V3 Split Layout: Left Fixed Media / Right Scrolling Content */}
            <main className="flex-grow pt-20">
                <div className="flex flex-col lg:flex-row relative">

                    {/* Left Sticky Column - Media & Navigation */}
                    <div className="lg:w-[45%] lg:h-[calc(100vh-80px)] lg:sticky top-20 flex flex-col bg-white border-r border-[#E8E1D5] z-10">
                        {/* Immersive Image Header */}
                        <div className="relative flex-grow min-h-[40vh] bg-stone-100 overflow-hidden group">
                            {tratamiento.imagenExplicativa ? (
                                <>
                                    <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-700" />
                                    <img
                                        src={tratamiento.imagenExplicativa}
                                        alt={tratamiento.nombre}
                                        className="absolute inset-0 w-full h-full object-cover filter contrast-[0.95] transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                                    />
                                </>
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-[#D4C1A0]/20 to-transparent flex items-center justify-center p-12">
                                    <h1 className="text-6xl md:text-8xl font-[family-name:var(--font-italiana)] text-stone-300 opacity-60 text-center leading-none">
                                        Cialo<br />Premium
                                    </h1>
                                </div>
                            )}

                            {/* Floating Back Button */}
                            <Link href="/tratamientos" className="absolute top-6 left-6 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-colors border border-[#E8E1D5]/50 shadow-sm">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            </Link>

                            {/* Floating Fast Facts */}
                            <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                <span className="flex-shrink-0 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase text-gray-900 shadow-sm">
                                    {tratamiento.duracion}
                                </span>
                                <span className="flex-shrink-0 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase text-gray-900 shadow-sm truncate max-w-[200px]">
                                    {tratamiento.profesional}
                                </span>
                            </div>
                        </div>

                        {/* In-Page Navigation (Visible mainly on Desktop inside the sticky panel) */}
                        <div className="hidden lg:block border-t border-[#E8E1D5] bg-[#FAF8F5] p-8">
                            <h3 className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase mb-6">Índice del Tratamiento</h3>
                            <nav className="flex flex-col space-y-4">
                                <a
                                    href="#overview"
                                    onClick={(e) => scrollToSection(e, 'overview')}
                                    className={`flex items-center gap-3 text-sm font-medium transition-all ${activeSection === 'overview' ? 'text-cialo-gold translate-x-2' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    <span className={`w-6 h-px ${activeSection === 'overview' ? 'bg-cialo-gold' : 'bg-transparent'}`} />
                                    01. Resumen & Precios
                                </a>
                                {tratamiento.beneficios && tratamiento.beneficios.length > 0 && (
                                    <a
                                        href="#benefits"
                                        onClick={(e) => scrollToSection(e, 'benefits')}
                                        className={`flex items-center gap-3 text-sm font-medium transition-all ${activeSection === 'benefits' ? 'text-cialo-gold translate-x-2' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        <span className={`w-6 h-px ${activeSection === 'benefits' ? 'bg-cialo-gold' : 'bg-transparent'}`} />
                                        02. Beneficios
                                    </a>
                                )}
                                {tratamiento.faqs && tratamiento.faqs.length > 0 && (
                                    <a
                                        href="#faq"
                                        onClick={(e) => scrollToSection(e, 'faq')}
                                        className={`flex items-center gap-3 text-sm font-medium transition-all ${activeSection === 'faq' ? 'text-cialo-gold translate-x-2' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        <span className={`w-6 h-px ${activeSection === 'faq' ? 'bg-cialo-gold' : 'bg-transparent'}`} />
                                        03. Preguntas Frecuentes
                                    </a>
                                )}
                                {tratamiento.agendaUrl && (
                                    <a
                                        href="#agenda"
                                        onClick={(e) => scrollToSection(e, 'agenda')}
                                        className={`flex items-center gap-3 text-sm font-medium transition-all ${activeSection === 'agenda' ? 'text-cialo-gold translate-x-2' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        <span className={`w-6 h-px ${activeSection === 'agenda' ? 'bg-cialo-gold' : 'bg-transparent'}`} />
                                        04. Agendamiento Online
                                    </a>
                                )}
                            </nav>
                        </div>
                    </div>

                    {/* Right Scrolling Column - Content & Copy */}
                    <div className="lg:w-[55%] flex flex-col bg-[#FDFBF7]">

                        {/* 01. Overview Section */}
                        <section id="overview" className="px-6 py-16 md:px-16 md:py-24 border-b border-[#E8E1D5]">
                            <div className="max-w-xl">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500">
                                        {tratamiento.categoria}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-cialo-gold" />
                                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-cialo-gold">
                                        {tratamiento.subcategoria}
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-italiana)] leading-[1.1] text-gray-900 mb-8">
                                    {tratamiento.nombre}
                                </h1>

                                <p className="text-lg text-gray-600 leading-relaxed font-light font-sans mb-12">
                                    {tratamiento.descripcion}
                                </p>

                                {/* Tags */}
                                {tratamiento.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-12">
                                        {tratamiento.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white border border-[#E8E1D5] rounded-tl-lg rounded-br-lg rounded-tr-sm rounded-bl-sm text-xs font-medium text-gray-600">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Sticky-like Action Block */}
                                <div className="bg-white p-6 md:p-8 border border-[#D4C1A0]/40 shadow-[0_10px_40px_-15px_rgba(212,193,160,0.3)] rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cialo-gold/10 to-transparent rounded-bl-full pointer-events-none" />

                                    <div className="flex items-baseline gap-3 mb-6 relative z-10">
                                        <span className="text-4xl font-light tracking-tight text-gray-900">
                                            {formatPrice(tratamiento.valorDesde, tratamiento.valorHasta)}
                                        </span>
                                        {tratamiento.valorHasta && (
                                            <span className="text-sm font-medium text-gray-400">valor referencial</span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="space-y-3 relative z-10">
                                        {/* Styled Add To Cart */}
                                        <div className="[&_button]:w-full [&_button]:py-3.5 [&_button]:rounded-xl [&_button]:font-medium [&_button]:bg-[#1A1A1A] [&_button]:text-white hover:[&_button]:bg-[#333] [&_button]:transition-colors">
                                            <TreatmentAddToCart
                                                tratamiento={{
                                                    id: tratamiento.id,
                                                    name: tratamiento.nombre,
                                                    price: tratamiento.valorDesde || 0,
                                                    category: tratamiento.categoria,
                                                }}
                                                hasVariablePrice={tratamiento.valorHasta !== null}
                                                requiereEvaluacion={requiresEvaluation}
                                                consultaEvaluacion={evaluationConsulta}
                                            />
                                        </div>

                                        <a
                                            href={`https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20tratamiento%20${encodeURIComponent(tratamiento.nombre)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full bg-[#FAF8F5] text-gray-800 hover:bg-[#F0EBE1] border border-[#E8E1D5] font-medium py-3.5 px-6 rounded-xl transition-colors"
                                        >
                                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                                            </svg>
                                            Conversar por WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 02. Benefits Section */}
                        {tratamiento.beneficios && tratamiento.beneficios.length > 0 && (
                            <section id="benefits" className="px-6 py-16 md:px-16 md:py-24 border-b border-[#E8E1D5] bg-white">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] mb-10 text-gray-900">
                                        Beneficios Destacados
                                    </h2>
                                    <div className="space-y-6">
                                        {tratamiento.beneficios.map((beneficio, index) => (
                                            <div key={index} className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-center mt-1">
                                                    <span className="text-cialo-gold font-medium text-sm">{index + 1}</span>
                                                </div>
                                                <p className="text-gray-600 leading-relaxed pt-1.5">{beneficio}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Contraindicaciones Integradas (Si existen) */}
                                    {tratamiento.contraindicaciones && tratamiento.contraindicaciones.length > 0 && (
                                        <div className="mt-12 p-6 bg-red-50/50 border border-red-100 rounded-2xl">
                                            <h4 className="text-sm font-bold tracking-widest text-red-800 uppercase mb-4">A tener en cuenta</h4>
                                            <ul className="space-y-2">
                                                {tratamiento.contraindicaciones.map((contra, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-red-700/80 text-sm">
                                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                        <span>{contra}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* 03. FAQs Section */}
                        {tratamiento.faqs && tratamiento.faqs.length > 0 && (
                            <section id="faq" className="px-6 py-16 md:px-16 md:py-24 border-b border-[#E8E1D5]">
                                <div className="max-w-xl">
                                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] mb-10 text-gray-900">
                                        Preguntas Comunes
                                    </h2>
                                    <div className="divide-y divide-[#E8E1D5]">
                                        {tratamiento.faqs.map((faq, index) => (
                                            <details key={index} className="group py-6 [&_summary::-webkit-details-marker]:hidden">
                                                <summary className="flex justify-between items-center font-medium cursor-pointer text-lg text-gray-800 hover:text-cialo-gold transition-colors pr-2">
                                                    {faq.pregunta}
                                                    <span className="relative flex-shrink-0 ml-4 w-5 h-5 flex items-center justify-center">
                                                        <span className="absolute bg-gray-400 w-full h-0.5 rounded-full transition-transform duration-300 group-open:rotate-180 group-open:bg-cialo-gold" />
                                                        <span className="absolute bg-gray-400 w-0.5 h-full rounded-full transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                                                    </span>
                                                </summary>
                                                <div className="pt-4 pr-8 text-gray-500 font-light leading-relaxed">
                                                    {faq.respuesta}
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* 04. Agenda Section */}
                        {tratamiento.agendaUrl && (
                            <section id="agenda" className="px-6 py-16 md:px-16 md:py-24 bg-white">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#FAF8F5] border border-[#D4C1A0]/30 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-gray-900">Agenda tu Hora</h2>
                                            <p className="text-sm text-gray-500 mt-1">Reserva online la fecha y horario disponible de tu preferencia.</p>
                                        </div>
                                    </div>

                                    <div className="bg-[#FAF8F5] p-2 border border-[#E8E1D5] rounded-3xl shadow-inner min-h-[600px] w-full">
                                        <ReservaClinios agendaUrl={tratamiento.agendaUrl} title={`Agendar ${tratamiento.nombre}`} treatmentName={tratamiento.nombre} loadDirectly={true} />
                                    </div>
                                </div>
                            </section>
                        )}

                    </div>
                </div>

                {/* Bottom Full-Width Section: Related Treatments */}
                {relacionados.length > 0 && (
                    <section className="bg-white py-24 border-t border-[#E8E1D5]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <span className="text-xs font-semibold tracking-[0.2em] text-cialo-gold uppercase">Combinaciones Extra</span>
                                <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-gray-900 mt-3">Tratamientos Relacionados</h2>
                                <div className="w-12 h-px bg-cialo-gold mx-auto mt-6" />
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relacionados.map((t) => (
                                    <div key={t.id} className="transform transition-transform duration-300 hover:-translate-y-1">
                                        <TreatmentCard treatment={t} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

            </main>

            <Footer />
        </div>
    );
}
