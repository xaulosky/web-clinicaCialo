import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
    title: { absolute: 'Gift Card: Sesión de Depilación Láser | Clínica Cialo' },
    description: 'Condiciones de tu Gift Card de Regalo para Depilación Láser en zona pequeña en Clínica Cialo, Los Ángeles.',
    robots: 'noindex, follow',
};

export default function GiftCardDepilacionPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar />
            
            <main className="flex-grow pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Hero Card */}
                    <div className="bg-gradient-to-br from-[#1b1a18] to-[#3a3a3a] rounded-2xl overflow-hidden shadow-2xl mb-12 relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="text-[120px] leading-none">🎁</span>
                        </div>
                        
                        <div className="p-8 md:p-12 relative z-10">
                            <span className="inline-block bg-[#b8935f] text-[#1b1a18] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                                Gift Card de Regalo
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6">
                                Sesión de Depilación Láser
                            </h1>
                            <p className="text-[#b8935f] text-xl md:text-2xl font-light mb-8 italic">
                                Zona Pequeña a Elección
                            </p>
                            
                            <div className="flex flex-wrap gap-4">
                                <a 
                                    href="https://wa.me/56982028473?text=Hola,%20tengo%20una%20Gift%20Card%20de%20Regalo%20para%20Depilación%20Láser%20y%20quiero%20agendar%20mi%20evaluación"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-[#1b1a18] px-8 py-4 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-[#b8935f] transition-colors shadow-lg"
                                >
                                    Agendar Evaluación Gratis
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Conditions Content */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-16 mt-4">
                        {/* Condiciones de tu Gift Card */}
                        <section>
                            <h2 className="text-3xl font-bold text-center text-[#1b1a18] mb-12">Condiciones de tu Gift Card</h2>
                            <div className="grid md:grid-cols-2 gap-x-8 gap-y-10">
                                <div className="flex gap-4">
                                    <div className="text-[#b8935f] flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1b1a18] mb-1 text-lg">Intransferible</h3>
                                        <p className="text-[#75757a]">Beneficio y regalo exclusivo para clientes de Clínica Cialo.</p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-4">
                                    <div className="text-[#b8935f] flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1b1a18] mb-1 text-lg">Vigencia</h3>
                                        <p className="text-[#75757a]">Tienes hasta 30 días para cobrar y agendar tu sesión.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="text-[#b8935f] flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1b1a18] mb-1 text-lg">Restricciones Médicas</h3>
                                        <p className="text-[#75757a]">No apto si estás embarazada o con la piel bronceada recientemente.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="text-[#b8935f] flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1b1a18] mb-1 text-lg">Tatuajes</h3>
                                        <p className="text-[#75757a]">No se pueden depilar zonas que tengan tatuajes.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 md:col-span-2 mt-4 md:mt-0">
                                    <div className="text-[#b8935f] flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4H5.5a2.5 2.5 0 000 5H19M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1b1a18] mb-1 text-lg">Canje</h3>
                                        <p className="text-[#75757a]">Debes presentar y entregar esta Gift Card en recepción para hacerla válida al momento de tu atención.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className="w-full h-px bg-[#f5f2eb]"></div>

                        {/* Zonas a elección */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1b1a18] mb-2">Zonas a elección</h2>
                            <p className="text-[#75757a] mb-8">Elige <strong className="text-[#1b1a18] font-semibold">una</strong> de las siguientes zonas pequeñas para tu sesión:</p>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Rostro */}
                                <div className="bg-[#fcfcfc] rounded-2xl p-8 border border-[#f0f0f0]">
                                    <h3 className="text-lg font-bold text-[#c7af85] mb-5 pb-4 border-b border-[#f0f0f0]">Rostro</h3>
                                    <ul className="space-y-4">
                                        {['Bozo', 'Mentón', 'Patillas', 'Entrecejo', 'Frente', 'Pómulos', 'Nariz', 'Orejas'].map((zona, i) => (
                                            <li key={i} className="flex items-center gap-3 text-[#5e5e5e]">
                                                <svg className="w-4 h-4 text-[#e0e0e0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {zona}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cuerpo */}
                                <div className="bg-[#fcfcfc] rounded-2xl p-8 border border-[#f0f0f0]">
                                    <h3 className="text-lg font-bold text-[#c7af85] mb-5 pb-4 border-b border-[#f0f0f0]">Cuerpo</h3>
                                    <ul className="space-y-4">
                                        {['Axilas', 'Areolas', 'Línea Alba', 'Manos y dedos', 'Pies y dedos', 'Cuello anterior', 'Cuello posterior'].map((zona, i) => (
                                            <li key={i} className="flex items-center gap-3 text-[#5e5e5e]">
                                                <svg className="w-4 h-4 text-[#e0e0e0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {zona}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="w-full h-px bg-[#f5f2eb]"></div>

                        {/* Indicaciones Previas */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-[#fdfaf5] rounded-full flex items-center justify-center text-[#b8935f] flex-shrink-0">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-[#1b1a18]">Indicaciones Previas</h2>
                            </div>
                            
                            <p className="text-[#75757a] mb-6">Para asegurar la efectividad y seguridad de tu sesión, por favor llega preparada:</p>
                            
                            <div className="space-y-4">
                                <div className="bg-white border border-[#f0f0f0] rounded-xl p-5 flex items-start gap-4">
                                    <div className="text-[#b8935f] mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[#5e5e5e]">Llegar <strong className="text-[#1b1a18] font-semibold">rasurada al ras</strong> en la zona a tratar (hacerlo la noche anterior o el mismo día).</p>
                                </div>

                                <div className="bg-white border border-[#f0f0f0] rounded-xl p-5 flex items-start gap-4">
                                    <div className="text-[#b8935f] mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[#5e5e5e]">Acudir con la piel limpia, <strong className="text-[#1b1a18] font-semibold">sin cremas, desodorantes, lociones ni maquillaje</strong> en la zona.</p>
                                </div>

                                <div className="bg-white border border-[#f0f0f0] rounded-xl p-5 flex items-start gap-4">
                                    <div className="text-[#b8935f] mt-0.5 flex-shrink-0">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-[#5e5e5e]">No haber arrancado el vello de raíz (con cera, pinzas o máquina depiladora) en las últimas 3 semanas.</p>
                                </div>
                            </div>
                        </section>

                        <div className="mt-4 pt-10 border-t border-[#f5f2eb]">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#fdfcf9] p-6 rounded-xl border border-[#f5f2eb]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#b8935f]/10 rounded-full flex items-center justify-center text-[#b8935f]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#1b1a18]">¿Dónde estamos?</p>
                                        <p className="text-xs text-[#5e5e5e]">Bulnes 220, Of. 509, Edificio Puerto Mayor II, Los Ángeles.</p>
                                    </div>
                                </div>
                                <div className="text-center md:text-right">
                                    <p className="text-sm font-bold text-[#1b1a18]">Contáctanos</p>
                                    <p className="text-xs text-[#5e5e5e]">+56 9 8202 8473</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
