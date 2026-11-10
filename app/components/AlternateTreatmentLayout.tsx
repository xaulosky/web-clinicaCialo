'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import TreatmentCard from './TreatmentCard';
import TreatmentAddToCart from './TreatmentAddToCart';
import ReservaClinios from './ReservaClinios';
import { Tratamiento, formatPrice, tratamientoRequiereEvaluacion, getConsultaEvaluacion } from '@/data/tratamientos';

interface AlternateTreatmentLayoutProps {
    tratamiento: Tratamiento;
    relacionados: Tratamiento[];
}

export default function AlternateTreatmentLayout({ tratamiento, relacionados }: AlternateTreatmentLayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const requiresEvaluation = tratamientoRequiereEvaluacion(tratamiento);
    const evaluationConsulta = getConsultaEvaluacion(tratamiento);

    return (
        <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-cialo-gold/30">
            <Navbar transparent />

            {/* Hero Section - Full Viewport Height with Dynamic Background */}
            <header className="relative min-h-[90vh] flex items-center pt-28 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-[#0a0a0a] z-0" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cialo-gold/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none mix-blend-screen animate-pulse duration-10000" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#2a2a2a]/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 opacity-40 pointer-events-none mix-blend-screen" />

                {/* Hero Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cialo-gold/30 bg-cialo-gold/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-cialo-gold animate-ping" />
                            <span className="text-cialo-gold text-xs font-semibold tracking-[0.2em] uppercase">
                                {tratamiento.categoria} · {tratamiento.subcategoria}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-italiana)] leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            {tratamiento.nombre}
                        </h1>

                        <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed border-l-2 border-cialo-gold/50 pl-6">
                            {tratamiento.descripcion}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-5 py-3 backdrop-blur-sm">
                                <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-300">
                                    <span className="text-gray-500 block text-xs uppercase tracking-wider">Duración</span>
                                    {tratamiento.duracion}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-5 py-3 backdrop-blur-sm">
                                <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-300">
                                    <span className="text-gray-500 block text-xs uppercase tracking-wider">Profesional</span>
                                    {tratamiento.profesional}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Premium Pricing & Action Card (Glassmorphism) */}
                    <div className="lg:col-span-5 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cialo-gold/30 to-yellow-600/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                        <div className="relative bg-[#111] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">

                            <div className="w-full flex justify-between items-center mb-6">
                                <span className="text-gray-400 text-sm tracking-widest uppercase">Inversión Desde</span>
                                <div className="h-px w-10 bg-gradient-to-r from-cialo-gold to-transparent" />
                            </div>

                            <p className="text-5xl font-bold text-white mb-2 tracking-tight">
                                {formatPrice(tratamiento.valorDesde, tratamiento.valorHasta)}
                            </p>

                            {tratamiento.valorHasta && (
                                <p className="text-sm font-medium text-cialo-gold/70 bg-cialo-gold/10 px-3 py-1 rounded-full mb-8">
                                    Precio Variable
                                </p>
                            )}
                            {!tratamiento.valorHasta && <div className="mb-8" />}

                            <div className="w-full space-y-4">
                                {/* Componente de carrito nativo reestilizado mediante clases globales/padres si es posible, o renderizado directamente */}
                                <div className="premium-add-to-cart-wrapper w-full [&_button]:w-full [&_button]:py-4 [&_button]:rounded-xl [&_button]:font-semibold [&_button]:transition-all [&_button]:duration-300 hover:[&_button]:shadow-[0_0_20px_rgba(212,193,160,0.3)]">
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
                                    className="flex items-center justify-center gap-2 w-full bg-transparent border border-white/20 hover:border-white hover:bg-white text-white hover:text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300"
                                >
                                    WhatsApp Directo
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Premium Details Section */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {tratamiento.tags.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-sm font-bold tracking-[0.2em] text-cialo-gold uppercase mb-6 flex items-center gap-4">
                            <span className="w-8 h-px bg-cialo-gold" />
                            Beneficios Clave
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {tratamiento.tags.map((tag, idx) => (
                                <div key={idx} className="group relative bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors duration-300 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-cialo-gold/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <h3 className="text-lg font-medium text-gray-200 relative z-10">{tag}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column - Details */}
                    <div className="space-y-12">
                        {tratamiento.beneficios && tratamiento.beneficios.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-6 text-white">¿Por qué elegir este tratamiento?</h3>
                                <ul className="space-y-4">
                                    {tratamiento.beneficios.map((beneficio, index) => (
                                        <li key={index} className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border-l-2 border-cialo-gold">
                                            <span className="text-gray-300">{beneficio}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {tratamiento.faqs && tratamiento.faqs.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-6 text-white">Preguntas Frecuentes</h3>
                                <div className="space-y-2">
                                    {tratamiento.faqs.map((faq, index) => (
                                        <details key={index} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                            <summary className="flex justify-between items-center font-medium p-5 cursor-pointer hover:bg-white/5 transition-colors">
                                                <span className="text-gray-200">{faq.pregunta}</span>
                                                <span className="transition duration-300 group-open:rotate-180 text-cialo-gold">
                                                    <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                                </span>
                                            </summary>
                                            <div className="p-5 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 bg-black/20">
                                                {faq.respuesta}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Media & Scheduling */}
                    <div className="space-y-12">

                        {tratamiento.agendaUrl && (
                            <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cialo-gold to-transparent opacity-50" />
                                <div className="p-8 border-b border-white/10 text-center">
                                    <h3 className="text-2xl font-[family-name:var(--font-italiana)]">Reserva tu Horario</h3>
                                    <p className="text-gray-400 text-sm mt-2">Acceso directo a nuestra agenda para coordinar tú misma la cita.</p>
                                </div>
                                <div className="w-full bg-white min-h-[500px]">
                                    {/* The iframe is usually light themed, so bg is white */}
                                    <ReservaClinios agendaUrl={tratamiento.agendaUrl} title={`Agendar ${tratamiento.nombre}`} treatmentName={tratamiento.nombre} loadDirectly={true} />
                                </div>
                            </div>
                        )}

                        {tratamiento.imagenExplicativa && (
                            <div className="rounded-2xl border border-white/10 overflow-hidden relative group">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                                <img
                                    src={tratamiento.imagenExplicativa}
                                    alt={`Gráfico explicativo de ${tratamiento.nombre}`}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        )}

                    </div>

                </div>

                {/* Related Treatments Premium Layout */}
                {relacionados.length > 0 && (
                    <section className="mt-32 pt-16 border-t border-white/10">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <span className="text-sm font-bold tracking-[0.2em] text-cialo-gold uppercase">Sinergia Premium</span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] mt-2">Tratamientos Relacionados</h2>
                            </div>
                            <Link href="/tratamientos" className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                                Ver Catálogo
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Note: TreatmentCard might not be dark-themed, so it could stick out, but we'll try to let it render. */}
                            {relacionados.map((t) => (
                                <div key={t.id} className="relative group rounded-xl overflow-hidden shadow-xl ring-1 ring-white/10 hover:ring-cialo-gold/50 transition-all duration-300">
                                    <TreatmentCard treatment={t} />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </main>

            <Footer />
        </div>
    );
}
