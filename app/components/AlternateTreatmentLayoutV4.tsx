'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from './Navbar';
import Footer from './Footer';
import TreatmentCard from './TreatmentCard';
import TreatmentAddToCart from './TreatmentAddToCart';
import ReservaClinios from './ReservaClinios';
import { Tratamiento, formatPrice, tratamientoRequiereEvaluacion, getConsultaEvaluacion } from '@/data/tratamientos';

interface AlternateTreatmentLayoutV4Props {
    tratamiento: Tratamiento;
    relacionados: Tratamiento[];
}

export default function AlternateTreatmentLayoutV4({ tratamiento, relacionados }: AlternateTreatmentLayoutV4Props) {
    const [activeTab, setActiveTab] = useState('informacion');

    const requiresEvaluation = tratamientoRequiereEvaluacion(tratamiento);
    const evaluationConsulta = getConsultaEvaluacion(tratamiento);

    return (
        <div className="flex flex-col min-h-screen bg-[#FDFCFB] text-gray-800 font-sans selection:bg-cialo-gold/30">
            <Navbar />

            <main className="flex-grow pt-24 pb-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Minimalist Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 tracking-wider uppercase">
                        <Link href="/" className="hover:text-cialo-gold transition-colors">Inicio</Link>
                        <span>—</span>
                        <Link href="/tratamientos" className="hover:text-cialo-gold transition-colors">Catálogo</Link>
                        <span>—</span>
                        <span className="text-gray-900 font-medium">{tratamiento.nombre}</span>
                    </nav>

                    {/* V4 Hero: Side-by-side clear presentation */}
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">

                        {/* Left: Essential Info */}
                        <div className="order-2 lg:order-1 flex flex-col justify-center">
                            <div className="inline-block bg-stone-100 text-stone-600 px-3 py-1 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase mb-6 self-start">
                                {tratamiento.categoria}
                            </div>

                            <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-italiana)] leading-tight text-gray-900 mb-6">
                                {tratamiento.nombre}
                            </h1>

                            <p className="text-lg text-gray-500 leading-relaxed font-light mb-10 w-11/12">
                                {tratamiento.descripcion}
                            </p>

                            <div className="grid grid-cols-2 gap-8 mb-10 border-y border-stone-200 py-6">
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Duración</span>
                                    <span className="text-lg font-medium text-gray-900">{tratamiento.duracion}</span>
                                </div>
                                <div>
                                    <span className="block text-xs uppercase tracking-widest text-gray-400 mb-1">Especialista</span>
                                    <span className="text-lg font-medium text-gray-900">{tratamiento.profesional}</span>
                                </div>
                            </div>

                            {/* Prominent Direct Booking Info & Action */}
                            <div className="bg-white border border-stone-200 p-8 rounded-2xl shadow-sm">
                                <div className="flex items-end justify-between mb-8">
                                    <div>
                                        <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Valor Base</span>
                                        <div className="text-4xl font-light text-gray-900 tracking-tight">
                                            {formatPrice(tratamiento.valorDesde, tratamiento.valorHasta)}
                                        </div>
                                    </div>
                                    {tratamiento.valorHasta && (
                                        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-500 rounded">
                                            Variables según evaluación
                                        </span>
                                    )}
                                </div>

                                {/* Clean Full-Width Buttons */}
                                <div className="space-y-3 [&_button]:w-full [&_button]:py-4 [&_button]:rounded-xl [&_button]:font-medium [&_button]:bg-gray-900 [&_button]:text-white hover:[&_button]:bg-black [&_button]:transition-colors">

                                    {/* Scroll to Agenda or Use Cart */}
                                    {tratamiento.agendaUrl ? (
                                        <a
                                            href="#agenda-directa"
                                            className="flex items-center justify-center w-full py-4 rounded-xl font-medium bg-gray-900 text-white hover:bg-black transition-colors"
                                        >
                                            Agendar Evaluación Ahora
                                        </a>
                                    ) : (
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
                                    )}

                                    <a
                                        href={`https://wa.me/56982028473?text=Hola,%20tengo%20dudas%20sobre%20${encodeURIComponent(tratamiento.nombre)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-white text-gray-900 hover:bg-stone-50 border border-stone-200 font-medium py-3.5 px-6 rounded-xl transition-colors"
                                    >
                                        Hacer una pregunta
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Clean Media Display */}
                        <div className="order-1 lg:order-2">
                            {tratamiento.imagenExplicativa ? (
                                <div className="w-full aspect-[4/5] md:aspect-square bg-stone-100 rounded-3xl overflow-hidden shadow-lg border border-stone-100/50">
                                    <img
                                        src={tratamiento.imagenExplicativa}
                                        alt={tratamiento.nombre}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-full aspect-[4/5] md:aspect-square bg-[#F7F5F0] rounded-3xl border border-[#EBE6E0] flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                                        <span className="text-2xl">✨</span>
                                    </div>
                                    <span className="font-[family-name:var(--font-italiana)] text-4xl text-[#D4C1A0] mb-4">Clínica Cialo</span>
                                    <p className="text-stone-500 font-light max-w-xs text-sm">Tratamiento exclusivo realizado con productos de la más alta calidad.</p>
                                </div>
                            )}
                        </div>

                    </div>

                    {/* Minimalist Tabs for Details vs Booking */}
                    {tratamiento.agendaUrl && (
                        <div className="mt-24 pt-10 border-t border-stone-200" id="agenda-directa">
                            <div className="flex border-b border-stone-200 mb-10 overflow-x-auto scrollbar-none">
                                <button
                                    onClick={() => setActiveTab('informacion')}
                                    className={`pb-4 px-6 text-sm font-semibold tracking-widest uppercase whitespace-nowrap transition-colors ${activeTab === 'informacion' ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    Detalles & Dudas
                                </button>
                                <button
                                    onClick={() => setActiveTab('agendar')}
                                    className={`pb-4 px-6 text-sm font-semibold tracking-widest uppercase whitespace-nowrap transition-colors ${activeTab === 'agendar' ? 'text-cialo-gold border-b-2 border-cialo-gold' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    Seleccionar Horario
                                </button>
                            </div>

                            {/* Tab Content: Información */}
                            {activeTab === 'informacion' && (
                                <div className="grid md:grid-cols-2 gap-16 animate-fade-in">

                                    {/* Beneficios */}
                                    <div>
                                        <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-6 text-gray-900">Lo que debes saber</h3>

                                        {tratamiento.beneficios && tratamiento.beneficios.length > 0 && (
                                            <ul className="space-y-4 mb-10">
                                                {tratamiento.beneficios.map((beneficio, index) => (
                                                    <li key={index} className="flex gap-4">
                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cialo-gold flex-shrink-0" />
                                                        <span className="text-gray-600 font-light leading-relaxed">{beneficio}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {tratamiento.contraindicaciones && tratamiento.contraindicaciones.length > 0 && (
                                            <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100">
                                                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4">Contraindicaciones</h4>
                                                <ul className="space-y-2">
                                                    {tratamiento.contraindicaciones.map((contra, idx) => (
                                                        <li key={idx} className="flex items-start gap-2 text-gray-500 text-sm">
                                                            <span>•</span>
                                                            <span>{contra}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* FAQs */}
                                    <div>
                                        <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-6 text-gray-900">Preguntas Frecuentes</h3>
                                        {tratamiento.faqs && tratamiento.faqs.length > 0 ? (
                                            <div className="space-y-2">
                                                {tratamiento.faqs.map((faq, index) => (
                                                    <details key={index} className="group border-b border-stone-200 [&_summary::-webkit-details-marker]:hidden">
                                                        <summary className="flex justify-between items-center font-medium cursor-pointer py-5 text-gray-900">
                                                            {faq.pregunta}
                                                            <span className="text-cialo-gold transition-transform duration-300 group-open:rotate-45">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                                            </span>
                                                        </summary>
                                                        <div className="pb-6 text-gray-500 font-light leading-relaxed px-2">
                                                            {faq.respuesta}
                                                        </div>
                                                    </details>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 font-light">Contacta con nosotros si tienes alguna consulta específica.</p>
                                        )}
                                    </div>

                                </div>
                            )}

                            {/* Tab Content: Agendamiento Integrado */}
                            {activeTab === 'agendar' && (
                                <div className="animate-fade-in w-full max-w-4xl mx-auto">
                                    <div className="text-center mb-8">
                                        <h3 className="text-3xl font-[family-name:var(--font-italiana)] text-gray-900 mb-2">Agenda tu Evaluación</h3>
                                        <p className="text-gray-500 font-light">Elige la fecha y nosotros nos encargamos del resto.</p>
                                    </div>
                                    <div className="bg-white p-2 md:p-6 rounded-3xl shadow-sm border border-stone-200 min-h-[600px] w-full">
                                        <ReservaClinios agendaUrl={tratamiento.agendaUrl} title={`Agendar ${tratamiento.nombre}`} treatmentName={tratamiento.nombre} loadDirectly={true} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Fallback layout if no agenda URL */}
                    {!tratamiento.agendaUrl && (
                        <div className="mt-20 pt-16 border-t border-stone-200 grid md:grid-cols-2 gap-16">
                            <div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-6 text-gray-900">Lo que debes saber</h3>
                                {tratamiento.beneficios && (
                                    <ul className="space-y-4 mb-10">
                                        {tratamiento.beneficios.map((beneficio, index) => (
                                            <li key={index} className="flex gap-4">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cialo-gold flex-shrink-0" />
                                                <span className="text-gray-600 font-light leading-relaxed">{beneficio}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] mb-6 text-gray-900">Preguntas Frecuentes</h3>
                                {tratamiento.faqs && (
                                    <div className="space-y-2">
                                        {tratamiento.faqs.map((faq, index) => (
                                            <details key={index} className="group border-b border-stone-200 [&_summary::-webkit-details-marker]:hidden">
                                                <summary className="flex justify-between items-center font-medium cursor-pointer py-5 text-gray-900">
                                                    {faq.pregunta}
                                                </summary>
                                                <div className="pb-6 text-gray-500 font-light leading-relaxed px-2">
                                                    {faq.respuesta}
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </main>

            <Footer />
        </div>
    );
}
