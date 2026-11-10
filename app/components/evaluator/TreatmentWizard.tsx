"use client";

import ReservaClinios from "../ReservaClinios";
import { useState, useRef } from 'react';
import { STEPS, getRecommendedTreatments, getRecommendedConsultation, ConsultaRecomendada } from '@/lib/recommendationLogic';
import { Tratamiento, formatPrice } from '@/data/tratamientos';
import Link from 'next/link';

export default function TreatmentWizard() {
    const [history, setHistory] = useState<string[]>(['start']); // Stack de pasos visitados
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [recommendations, setRecommendations] = useState<Tratamiento[]>([]);
    const [recommendedConsultation, setRecommendedConsultation] = useState<ConsultaRecomendada | null>(null);
    const [showResults, setShowResults] = useState(false);
    const topRef = useRef<HTMLDivElement>(null);

    const currentStepId = history[history.length - 1];

    const handleOptionSelect = (value: string, nextStep?: string) => {
        const stepDef = STEPS[currentStepId];
        const newAnswers = { ...answers, [stepDef.id]: value };

        setAnswers(newAnswers);

        // Scroll suave al contenedor si es necesario
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        if (nextStep === 'results' || !nextStep) {
            const results = getRecommendedTreatments(newAnswers);
            const consultation = getRecommendedConsultation(newAnswers);
            setRecommendations(results);
            setRecommendedConsultation(consultation);
            setShowResults(true);
        } else {
            setHistory([...history, nextStep]);
        }
    };

    const goBack = () => {
        if (history.length > 1) {
            const newHistory = [...history];
            newHistory.pop();
            setHistory(newHistory);
            setShowResults(false);
        }
    };

    const resetWizard = () => {
        setHistory(['start']);
        setAnswers({});
        setShowResults(false);
        setRecommendations([]);
        setRecommendedConsultation(null);
    };

    if (showResults) {
        return (
            <div ref={topRef} className="animate-fade-in max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-bold mb-2 block">Evaluación Completada</span>
                    <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                        Tu Plan Personalizado
                    </h2>
                </div>

                {/* Tratamientos recomendados - versión compacta */}
                {recommendations.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
                        <h3 className="text-lg font-bold text-[#1b1a18] mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Tratamientos Recomendados
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {recommendations.slice(0, 6).map(treatment => (
                                <Link
                                    key={treatment.id}
                                    href={treatment.slug ? `/${treatment.slug}` : `/tratamientos/${treatment.id}`}
                                    className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-[#b8935f] hover:bg-[#faf7f2] transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#f5f5f5] group-hover:bg-[#b8935f]/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-gray-400 group-hover:text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-[#1b1a18] group-hover:text-[#b8935f] truncate">{treatment.nombre}</p>
                                        <p className="text-xs text-gray-400">{formatPrice(treatment.valorDesde, null)}</p>
                                    </div>
                                    <svg className="w-4 h-4 text-gray-300 group-hover:text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Sección de Agendamiento - PRINCIPAL */}
                {recommendedConsultation && (
                    <div className="bg-gradient-to-br from-[#1b1a18] to-[#2a2622] rounded-lg shadow-2xl overflow-hidden">
                        <div className="p-6 md:p-8 text-center border-b border-white/10">
                            <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                                Tu Siguiente Paso
                            </span>
                            <h3 className="text-xl md:text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">
                                {recommendedConsultation.nombre}
                            </h3>
                            <p className="text-white/70 text-sm max-w-lg mx-auto">
                                {recommendedConsultation.descripcion}
                            </p>
                        </div>

                        <div className="bg-white">
                            <ReservaClinios agendaUrl={recommendedConsultation.agendaUrl} title={`Agendar ${recommendedConsultation.nombre}`} />
                        </div>
                    </div>
                )}

                {/* Botones de navegación */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={goBack}
                        className="text-gray-400 text-sm hover:text-gray-600 underline"
                    >
                        Volver atrás
                    </button>
                    <button
                        onClick={resetWizard}
                        className="text-[#b8935f] text-sm font-medium hover:underline flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        Empezar de nuevo
                    </button>
                </div>
            </div>
        );
    }

    const currentStep = STEPS[currentStepId];

    // Progress Calculation based on fixed max-depth assumption implies 3-4 steps max usually
    const currentStepIndex = history.length;
    const maxStepsEstimate = 4;
    const progressPercentage = Math.min((currentStepIndex / maxStepsEstimate) * 100, 100);

    return (
        <div className="bg-white p-5 md:p-12 rounded-lg shadow-2xl max-w-3xl mx-auto min-h-[450px] flex flex-col relative overflow-hidden transition-all">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
                <div
                    className="h-full bg-gradient-to-r from-[#b8935f] to-[#eaddcf] transition-all duration-700 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            <div className="mb-2 flex justify-between items-center text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-widest mt-2">
                <span>Paso {currentStepIndex}</span>
                {currentStepIndex > 1 && (
                    <button onClick={goBack} className="hover:text-[#1b1a18] transition-colors flex items-center gap-1">
                        ← Volver
                    </button>
                )}
            </div>

            <div key={currentStep.id} className="animate-slide-up flex-grow flex flex-col justify-center py-2 md:py-4">
                <h2 className="text-xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 md:mb-10 text-center leading-snug">
                    {currentStep.question}
                </h2>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {currentStep.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleOptionSelect(option.value, option.nextStep)}
                            className="w-full text-left p-3 md:p-6 border border-gray-200 rounded-xl hover:border-[#b8935f] hover:bg-[#faf7f2] hover:shadow-lg transition-all group flex flex-col items-center justify-center gap-2 md:gap-4 text-center h-full min-h-[120px] md:min-h-[160px] relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            {option.icon && (
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:scale-110 group-hover:border-[#b8935f]/30 transition-all duration-300 relative z-10">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d={option.icon} />
                                    </svg>
                                </div>
                            )}
                            <span className="font-medium text-sm md:text-lg text-[#6f6a5c] group-hover:text-[#1b1a18] relative z-10 leading-tight">{option.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
