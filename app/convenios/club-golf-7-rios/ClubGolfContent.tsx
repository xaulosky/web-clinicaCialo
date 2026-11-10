"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import ConvenioPromociones from "../components/ConvenioPromociones";
import MiercolesDepilacion from "../components/MiercolesDepilacion";

export default function ClubGolfContent() {
    const searchParams = useSearchParams();
    const [accessCode, setAccessCode] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (searchParams.get("unlocked") === "true") {
            setIsUnlocked(true);
        }
    }, [searchParams]);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (accessCode.toUpperCase() === "GOLF7RIOS") {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <main className="bg-white min-h-screen relative overflow-x-hidden">
            {/* Hero section - Standard Dark/Gold Premium */}
            <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 text-center">
                    {/* Breadcrumb */}
                    <nav className="flex items-center justify-center gap-2 text-sm text-[#cbcfd1] mb-8 font-light tracking-widest animate-fade-in">
                        <Link href="/" className="hover:text-[#b8935f] transition-colors">INICIO</Link>
                        <span className="opacity-30">/</span>
                        <Link href="/convenios" className="hover:text-[#b8935f] transition-colors">CONVENIOS</Link>
                        <span className="opacity-30">/</span>
                        <span className="text-[#b8935f]">CLUB DE GOLF 7 RÍOS</span>
                    </nav>

                    <div className="animate-fade-in-up">
                        <span className="text-[#b8935f] uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold mb-4 block">
                            Alianza Corporativa Exclusiva
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-[1.1] mb-6 tracking-tight">
                            Clínica Cialo <br />
                            <span className="text-[#b8935f]">& Club de Golf 7 Ríos</span>
                        </h1>
                        <p className="text-base md:text-lg text-[#cbcfd1] mb-10 leading-relaxed font-light italic max-w-2xl mx-auto">
                            Una colaboración diseñada para llevar la excelencia en medicina estética y bienestar a la comunidad del Club de Golf 7 Ríos.
                        </p>

                        {!isUnlocked ? (
                            <div className="max-w-md mx-auto bg-white/5 backdrop-blur-xl p-8 md:p-12 border border-white/10 rounded-2xl shadow-2xl overflow-hidden relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#b8935f]/5 to-transparent pointer-events-none"></div>
                                <p className="text-[#b8935f] mb-8 font-bold uppercase tracking-[0.25em] text-[10px]">Acceso Protegido</p>
                                <form onSubmit={handleUnlock} className="flex flex-col gap-5 relative z-10">
                                    <input 
                                        type="text" 
                                        placeholder="CÓDIGO INSTITUCIONAL"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value)}
                                        className={`bg-white/10 border ${error ? 'border-red-400' : 'border-white/20'} text-white px-6 py-5 focus:outline-none focus:border-[#b8935f] transition-all text-xs tracking-[0.3em] rounded-lg placeholder-white/30 text-center uppercase`}
                                    />
                                    <button 
                                        type="submit"
                                        className="bg-[#b8935f] text-[#1b1a18] px-10 py-5 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white transition-all duration-500 shadow-xl rounded-lg transform active:scale-95"
                                    >
                                        Validar Acceso
                                    </button>
                                </form>
                                {error && <p className="text-red-400 text-[10px] uppercase tracking-widest mt-6 animate-pulse font-medium">Código incorrecto. Intente nuevamente.</p>}
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20soy%20socio%20del%20Club%20de%20Golf%207%20Ríos%20y%20me%20interesa%20el%20convenio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center bg-[#b8935f] text-[#1b1a18] px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-500 shadow-xl rounded-lg"
                                >
                                    Agendar con Beneficio
                                </a>
                                <Link
                                    href="#beneficios"
                                    className="inline-flex items-center justify-center border border-white/20 text-white px-12 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all duration-500 rounded-lg"
                                >
                                    Ver Bases del Convenio
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {isUnlocked ? (
                <div className="animate-in fade-in duration-1000">
                    {/* Propósito - Standard Site Alignment */}
                    <section className="py-20 bg-white">
                        <div className="max-w-4xl mx-auto px-4 text-center">
                            <div className="inline-block bg-[#faf6ef] px-6 py-2 rounded-full mb-6">
                                <span className="text-[#b8935f] font-bold text-[10px] uppercase tracking-[0.4em]">Alianza de Bienestar</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-8 tracking-wide leading-tight">Excelencia y Cuidado</h2>
                            <p className="text-base text-[#6f6a5c] leading-relaxed font-light italic max-w-3xl mx-auto">
                                "Esta colaboración busca otorgar condiciones preferenciales a los socios vigentes, fortaleciendo el vínculo institucional mediante el intercambio de beneficios de alta calidad en medicina estética."
                            </p>
                            <div className="w-12 h-px bg-[#b8935f] mx-auto mt-12"></div>
                        </div>
                    </section>

                    {/* Beneficios - Structured cards like home page */}
                    <section id="beneficios" className="py-20 bg-[#faf6ef]">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid lg:grid-cols-3 gap-8">
                                {[
                                    { pct: "15%", title: "Tratamientos Estéticos", desc: "Descuento preferencial en faciales, corporales y depilación láser seleccionada." },
                                    { pct: "10%", title: "Inyectables Médicos", desc: "Beneficio exclusivo en Toxina Botulínica, Ácido Hialurónico y Bioestimuladores." },
                                    { pct: "Gratis*", title: "Evaluación Facial", desc: "*Al realizar el tratamiento, el valor de la evaluación se descuenta del total. Diagnóstico con tecnología Evelab Insight para tu plan ideal." }
                                ].map((b, i) => (
                                    <div key={i} className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 group hover:border-[#b8935f] hover:shadow-xl transition-all duration-500">
                                        <span className="text-[#b8935f] font-bold text-4xl mb-4 block">{b.pct}</span>
                                        <h3 className="text-base font-bold text-[#1b1a18] uppercase tracking-widest mb-3">{b.title}</h3>
                                        <p className="text-[#6f6a5c] font-light text-xs italic leading-relaxed">{b.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <MiercolesDepilacion className="mt-8" />
                        </div>
                    </section>

                    <ConvenioPromociones
                        titulo="Promociones Club de Golf 7 Ríos"
                        subtitulo="Beneficios adicionales exclusivos para socios del club"
                    />

                    {/* Información Importante - Refined Layout */}
                    <section className="py-20 bg-white">
                        <div className="max-w-5xl mx-auto px-4">
                            <div className="grid md:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-10 tracking-wide">Bases del Convenio</h3>
                                    <ul className="space-y-10">
                                        {[
                                            { label: "Alcance", val: "Socios vigentes, cónyuges e hijos directos con acreditación." },
                                            { label: "Validación", val: "Presentar credencial de socio física o digital al momento de la evaluación." },
                                            { label: "Condiciones", val: "No acumulable con otras promociones o cupones de descuento." }
                                        ].map((item, i) => (
                                            <li key={i} className="group">
                                                <p className="text-[#b8935f] text-[10px] uppercase tracking-[0.4em] font-bold mb-2">{item.label}</p>
                                                <p className="text-[#6f6a5c] text-lg font-light italic group-hover:text-[#1b1a18] transition-colors">{item.val}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-[#faf6ef] p-12 flex flex-col justify-center border border-gray-100 rounded-2xl">
                                    <h4 className="text-2xl font-[family-name:var(--font-italiana)] mb-8 text-[#1b1a18]">Especialidades Incluidas</h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {["Armonización Facial", "Contorno Corporal", "Depilación Láser 3D", "Ginecoestética", "Nutrición Médica"].map((area, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm text-[#6f6a5c] font-light py-2 border-b border-gray-200 last:border-0">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#b8935f]"></div>
                                                    {area}
                                                </div>
                                                <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-12 text-[10px] text-gray-400 italic text-center uppercase tracking-widest">
                                        * Sujeto a evaluación médica previa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Final - Standard Dark Style */}
                    <section className="py-24 bg-gradient-to-br from-[#1b1a18] to-[#2a2a2a] text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8935f] rounded-full blur-3xl"></div>
                        </div>
                        <div className="max-w-3xl mx-auto px-4 relative z-10">
                            <span className="text-[#b8935f] uppercase tracking-[0.4em] text-[10px] font-semibold mb-6 block">Atención Preferencial</span>
                            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-white mb-10 leading-tight tracking-wide">¿Deseas agendar <br /> tu evaluación hoy?</h2>
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20soy%20socio%20del%20Club%20de%20Golf%207%20Ríos%20y%20quiero%20agendar%20una%20evaluación"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#b8935f] text-[#1b1a18] px-16 py-6 font-bold uppercase tracking-[0.3em] text-xs hover:bg-white transition-all duration-500 shadow-2xl rounded-lg"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar vía WhatsApp
                            </a>
                        </div>
                    </section>
                </div>
            ) : (
                <section className="py-24 bg-white">
                    <div className="max-w-2xl mx-auto px-4 text-center">
                        <div className="w-12 h-px bg-[#b8935f] mx-auto mb-12"></div>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 tracking-wide">Contenido Protegido</h2>
                        <p className="text-[#6f6a5c] font-light italic text-lg lg:px-20 mb-12">Por favor ingrese el código institucional para visualizar las bases del convenio y sus beneficios exclusivos.</p>
                        <div className="flex justify-center">
                            <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}
