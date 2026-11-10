'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const MODAL_ACTIVO = true;

export default function CyberPromoModal() {
    const pathname = usePathname();

    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    // No mostrar en rutas de admin ni en la propia landing page para no ser redundante
    const isExcludedRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/cyber') || pathname?.startsWith('/checkout');

    useEffect(() => {
        setMounted(true);

        // Interruptor manual: con MODAL_ACTIVO en false el aviso no aparece en ninguna página.
        if (!MODAL_ACTIVO || isExcludedRoute) return;

        // Se apaga sola al cierre del Cyber de octubre (misma fecha que app/cyber/page.tsx)
        const deadline = new Date('2026-10-11T23:59:59-03:00');
        if (new Date() >= deadline) {
            return;
        }

        // Check if already dismissed in this session
        const dismissed = sessionStorage.getItem('cyber-promo-dismissed');
        if (dismissed) {
            return;
        }

        // Show after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, [isExcludedRoute]);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('cyber-promo-dismissed', 'true');
    };

    // Don't render on server
    if (!mounted) return null;

    // Don't show if not visible
    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-28 right-4 z-[9999] max-w-sm transition-all duration-500 ease-out"
            style={{
                animation: 'slideInUp 0.4s ease-out forwards',
            }}
            role="dialog"
            aria-label="Promoción Cyber CIALO"
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}} />

            <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] rounded-lg shadow-2xl overflow-hidden border border-white/20 relative">
                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-2 right-2 text-white/50 hover:text-white p-1 z-10"
                    aria-label="Cerrar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-5">
                    {/* Rocket decoration */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl animate-pulse">🚀</span>
                        <span className="text-cyan-400 text-xs uppercase tracking-wider font-semibold">
                            Especial Cyber CIALO
                        </span>
                    </div>

                    <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white mb-2">
                        ¡Llegó el Cyber CIALO!
                    </h3>

                    <p className="text-white/80 text-sm mb-4">
                        Toxina botulínica, Sculptra, Juvelook, vitaminas y más con precios especiales <strong className="text-cyan-300">hasta el domingo 11 de octubre</strong>.
                    </p>

                    <Link
                        href="/cyber"
                        onClick={handleDismiss}
                        className="block w-full text-center bg-white text-[#1e1b4b] py-3 px-4 font-bold uppercase text-sm tracking-wider hover:bg-cyan-50 hover:text-[#0f172a] transition-all rounded-sm shadow-lg"
                    >
                        Ver Ofertas Cyber ⚡
                    </Link>

                    <button
                        onClick={handleDismiss}
                        className="w-full text-center text-white/40 text-xs mt-3 hover:text-white/70 transition-colors"
                    >
                        Quizás más tarde
                    </button>
                </div>
            </div>
        </div>
    );
}
