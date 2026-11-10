'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import TreatmentCard from './TreatmentCard';
import TreatmentAddToCart from './TreatmentAddToCart';
import ReservaClinios from './ReservaClinios';
import { Tratamiento, formatPrice, tratamientoRequiereEvaluacion, getConsultaEvaluacion } from '@/data/tratamientos';

interface AlternateTreatmentLayoutV5Props {
    tratamiento: Tratamiento;
    relacionados: Tratamiento[];
}

export default function AlternateTreatmentLayoutV5({ tratamiento, relacionados }: AlternateTreatmentLayoutV5Props) {
    const requiresEvaluation = tratamientoRequiereEvaluacion(tratamiento);
    const evaluationConsulta = getConsultaEvaluacion(tratamiento);

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 text-gray-800 font-sans selection:bg-cialo-gold/30">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Modern Breadcrumb */}
                    <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 mb-8 tracking-widest uppercase">
                        <Link href="/" className="hover:text-cialo-gold transition-colors">Inicio</Link>
                        <span>—</span>
                        <Link href="/tratamientos" className="hover:text-cialo-gold transition-colors">Catálogo</Link>
                        <span>—</span>
                        <span className="text-gray-900">{tratamiento.nombre}</span>
                    </nav>

                    {/* V5 Hero: Direct Agenda Embed Base Side-by-Side */}
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                        {/* Left: Instant Impact Information */}
                        <div className="lg:w-5/12 flex flex-col justify-start pt-4">

                            <div className="inline-flex items-center gap-2 bg-white border border-stone-200 text-stone-600 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 self-start shadow-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-cialo-gold" />
                                {tratamiento.categoria}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] leading-[1.15] text-gray-900 mb-6">
                                {tratamiento.nombre}
                            </h1>

                            <p className="text-lg text-gray-500 leading-relaxed font-light mb-8">
                                {tratamiento.descripcion}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <div className="bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-sm">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Inversión Desde</span>
                                    <span className="text-2xl font-semibold text-gray-900">{formatPrice(tratamiento.valorDesde, tratamiento.valorHasta)}</span>
                                </div>
                                <div className="bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-center">
                                    <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Duración Media</span>
                                    <span className="text-lg font-medium text-gray-900 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-cialo-gold/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {tratamiento.duracion}
                                    </span>
                                </div>
                            </div>

                            {/* Secondary Actions (if not using agenda, or alternative to agenda) */}
                            {!tratamiento.agendaUrl && (
                                <div className="w-full bg-white p-6 rounded-2xl border border-stone-200 shadow-sm mb-10">
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
                                    <p className="text-center text-xs text-gray-400 mt-4">Añade al carrito para pagar tu sesión online.</p>
                                </div>
                            )}

                            {tratamiento.beneficios && tratamiento.beneficios.length > 0 && (
                                <div className="hidden lg:block space-y-4">
                                    <h3 className="text-sm font-bold tracking-widest uppercase text-gray-900 mb-4 border-b border-stone-200 pb-2">Destacados</h3>
                                    {tratamiento.beneficios.slice(0, 3).map((beneficio, idx) => (
                                        <div key={idx} className="flex gap-3 items-start">
                                            <svg className="w-5 h-5 text-cialo-gold flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span className="text-sm text-gray-600 leading-snug">{beneficio}</span>
                                        </div>
                                    ))}
                                    <a href="#mas-detalles" className="inline-block mt-4 text-xs font-bold uppercase tracking-widest text-cialo-gold hover:text-yellow-600 transition-colors">
                                        Ver todos los detalles ↓
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Right: The Agenda (Immediate interaction) */}
                        <div className="lg:w-7/12 flex flex-col">
                            {tratamiento.agendaUrl ? (
                                <div className="bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-200 overflow-hidden flex flex-col h-[700px] relative">
                                    {/* Prominent header for the agenda block */}
                                    <div className="bg-gray-900 text-white p-6 lg:p-8 flex justify-between items-center z-10 relative">
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cialo-gold via-yellow-400 to-cialo-gold" />
                                        <div>
                                            <h2 className="text-2xl font-[family-name:var(--font-italiana)] mb-1">Agenda tu Sesión</h2>
                                            <p className="text-gray-400 text-xs font-medium tracking-wide uppercase">Disponibilidad en Tiempo Real</p>
                                        </div>
                                        <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/10 rounded-full">
                                            <svg className="w-6 h-6 text-cialo-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    </div>
                                    <div className="flex-grow w-full relative">
                                        <ReservaClinios agendaUrl={tratamiento.agendaUrl} title={`Agendar ${tratamiento.nombre}`} treatmentName={tratamiento.nombre} loadDirectly={true} />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-stone-200 animate-pulse rounded-[2rem] h-[600px] flex items-center justify-center">
                                    <p className="text-stone-400 text-sm font-semibold uppercase tracking-widest text-center">Configura la Agenda<br />para activar este bloque</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* V5 Secondary Details (Below the fold) */}
                    <div id="mas-detalles" className="mt-24 pt-16 border-t border-stone-200 grid lg:grid-cols-12 gap-12">

                        {/* Media Context */}
                        <div className="lg:col-span-5">
                            {tratamiento.imagenExplicativa && (
                                <div className="rounded-3xl overflow-hidden mb-8 border border-stone-200 lg:sticky top-24">
                                    <img
                                        src={tratamiento.imagenExplicativa}
                                        alt={tratamiento.nombre}
                                        className="w-full object-cover aspect-square hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="p-6 bg-white border-t border-stone-200">
                                        <h4 className="font-[family-name:var(--font-italiana)] text-xl text-gray-900 mb-2">Resultados Esperados</h4>
                                        <p className="text-sm text-gray-500 font-light">Efectos visibles y duraderos adaptados a tu estructura facial/corporal.</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Text Details & FAQs */}
                        <div className="lg:col-span-7 space-y-16">

                            {tratamiento.beneficios && tratamiento.beneficios.length > 0 && (
                                <div>
                                    <h3 className="text-3xl font-[family-name:var(--font-italiana)] mb-8 text-gray-900">Por qué elegir este tratamiento</h3>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {tratamiento.beneficios.map((beneficio, index) => (
                                            <div key={index} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex flex-col gap-3 hover:border-cialo-gold/30 transition-colors">
                                                <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E1D5] flex items-center justify-center mt-1">
                                                    <span className="text-cialo-gold font-bold text-xs">{index + 1}</span>
                                                </div>
                                                <p className="text-gray-600 text-sm leading-relaxed">{beneficio}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tratamiento.faqs && tratamiento.faqs.length > 0 && (
                                <div>
                                    <h3 className="text-3xl font-[family-name:var(--font-italiana)] mb-8 text-gray-900">Dudas Frecuentes</h3>
                                    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden divide-y divide-stone-100">
                                        {tratamiento.faqs.map((faq, index) => (
                                            <details key={index} className="group p-6 [&_summary::-webkit-details-marker]:hidden bg-white hover:bg-stone-50 transition-colors">
                                                <summary className="flex justify-between items-center font-medium cursor-pointer text-gray-900">
                                                    {faq.pregunta}
                                                    <span className="text-gray-400 transition-transform duration-300 group-open:rotate-180">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                    </span>
                                                </summary>
                                                <div className="mt-4 text-gray-500 font-light leading-relaxed text-sm">
                                                    {faq.respuesta}
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {tratamiento.contraindicaciones && tratamiento.contraindicaciones.length > 0 && (
                                <div className="flex gap-4 p-6 bg-rose-50 border border-rose-100 rounded-2xl">
                                    <svg className="w-6 h-6 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <div>
                                        <h4 className="text-sm font-bold text-rose-900 mb-2">Importante: Contraindicaciones</h4>
                                        <ul className="list-disc list-inside text-rose-700/80 text-sm space-y-1">
                                            {tratamiento.contraindicaciones.map((contra, idx) => (
                                                <li key={idx}>{contra}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Related Treatments Light Layout */}
                {relacionados.length > 0 && (
                    <section className="mt-24 pt-20 border-t border-stone-200 bg-white">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 mb-12">
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-gray-900">Sinergia Recomendada</h2>
                                <Link href="/tratamientos" className="text-sm font-bold tracking-widest uppercase text-cialo-gold hover:text-gray-900 transition-colors">
                                    Ver Catálogo Completo →
                                </Link>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {relacionados.map((t) => (
                                    <div key={t.id} className="transform transition-transform duration-300 hover:-translate-y-2">
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
