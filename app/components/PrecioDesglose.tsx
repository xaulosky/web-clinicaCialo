'use client';

import { useState } from 'react';

interface FactorPrecio {
    factor: string;
    descripcion: string;
    impacto: 'bajo' | 'medio' | 'alto';
}

interface EjemploPrecio {
    descripcion: string;
    precio: string;
}

interface PrecioDesgloseProps {
    precioDesde: string;
    precioHasta?: string;
    factores: FactorPrecio[];
    ejemplos?: EjemploPrecio[];
    nota?: string;
}

export default function PrecioDesglose({
    precioDesde,
    precioHasta,
    factores,
    ejemplos,
    nota
}: PrecioDesgloseProps) {
    const [expanded, setExpanded] = useState(false);

    const getImpactoColor = (impacto: FactorPrecio['impacto']) => {
        switch (impacto) {
            case 'bajo': return 'bg-green-100 text-green-700';
            case 'medio': return 'bg-yellow-100 text-yellow-700';
            case 'alto': return 'bg-orange-100 text-orange-700';
        }
    };

    const getImpactoLabel = (impacto: FactorPrecio['impacto']) => {
        switch (impacto) {
            case 'bajo': return 'Impacto menor';
            case 'medio': return 'Impacto moderado';
            case 'alto': return 'Mayor impacto';
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Header con precio */}
            <div className="p-6 bg-gradient-to-r from-[#1b1a18] to-[#2a2a2a]">
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl md:text-4xl font-bold text-[#b8935f]">
                        {precioDesde}
                    </span>
                    {precioHasta && (
                        <>
                            <span className="text-white/60">—</span>
                            <span className="text-2xl md:text-3xl font-bold text-white">
                                {precioHasta}
                            </span>
                        </>
                    )}
                </div>
                <p className="text-sm text-white/70">
                    {precioHasta ? 'Rango de precios según caso' : 'Precio desde'}
                </p>
            </div>

            {/* Botón para expandir */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
            >
                <span className="font-medium text-[#1b1a18] flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    ¿Por qué varía el precio?
                </span>
                <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Contenido expandible */}
            {expanded && (
                <div className="p-6 space-y-6">
                    {/* Factores */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                            Factores que afectan el precio
                        </h4>
                        <div className="space-y-3">
                            {factores.map((factor, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-[#1b1a18]">{factor.factor}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${getImpactoColor(factor.impacto)}`}>
                                                {getImpactoLabel(factor.impacto)}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">{factor.descripcion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ejemplos */}
                    {ejemplos && ejemplos.length > 0 && (
                        <div>
                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                Ejemplos de precios
                            </h4>
                            <div className="grid gap-2">
                                {ejemplos.map((ejemplo, index) => (
                                    <div key={index} className="flex justify-between items-center p-3 bg-[#faf6ef] rounded-lg">
                                        <span className="text-sm text-gray-700">{ejemplo.descripcion}</span>
                                        <span className="font-semibold text-[#1b1a18]">{ejemplo.precio}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Nota */}
                    {nota && (
                        <div className="flex gap-3 p-4 bg-blue-50 rounded-lg">
                            <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <p className="text-sm text-blue-800">{nota}</p>
                        </div>
                    )}

                    {/* CTA Evaluación */}
                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-3">
                            El precio exacto se determina en tu evaluación personalizada gratuita.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20evaluación%20para%20conocer%20el%20precio%20de%20mi%20tratamiento"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#b8935f] font-medium hover:underline"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agenda tu evaluación gratuita
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
