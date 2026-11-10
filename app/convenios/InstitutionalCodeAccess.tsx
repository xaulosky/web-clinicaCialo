"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InstitutionalCodeAccess() {
    const [code, setCode] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleAccess = (e: React.FormEvent) => {
        e.preventDefault();
        const upperCode = code.toUpperCase();
        
        if (upperCode === "GOLF7RIOS") {
            router.push("/convenios/club-golf-7-rios?unlocked=true");
        } else if (upperCode === "BIENESTARLA") {
            router.push("/convenios/bienestar-los-angeles?unlocked=true");
        } else {
            setError(true);
            setTimeout(() => setError(false), 3000);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 border border-white/10 rounded-2xl shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#b8935f]/5 to-transparent pointer-events-none"></div>
                
                <h2 className="text-[#b8935f] text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Acceso Institucional</h2>
                
                <form onSubmit={handleAccess} className="flex flex-col gap-4 relative z-10">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="INGRESE SU CÓDIGO"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className={`w-full bg-white/10 border ${error ? 'border-red-400' : 'border-white/20'} text-white px-6 py-4 focus:outline-none focus:border-[#b8935f] transition-all text-xs tracking-[0.2em] rounded-lg placeholder-white/30 text-center uppercase font-medium`}
                        />
                        {error && (
                            <p className="absolute -bottom-6 inset-x-0 text-red-400 text-[9px] uppercase tracking-widest animate-pulse">
                                Código no reconocido
                            </p>
                        )}
                    </div>
                    <button 
                        type="submit"
                        className="bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-white transition-all duration-500 shadow-xl rounded-lg transform active:scale-95 mt-2"
                    >
                        Acceder a Beneficios
                    </button>
                </form>
            </div>
            <p className="text-[#cbcfd1]/40 text-[9px] uppercase tracking-[0.2em] mt-8">
                ¿Su institución no aparece? <a href="https://wa.me/56982028473" className="text-[#b8935f] hover:underline transition-all">Consulte aquí</a>
            </p>
        </div>
    );
}
