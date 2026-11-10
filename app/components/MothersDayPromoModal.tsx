'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MothersDayPromoModal() {
    const pathname = usePathname();

    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    // No mostrar en rutas de admin
    const isAdminRoute = pathname?.startsWith('/admin');

    useEffect(() => {
        const raf = requestAnimationFrame(() => setMounted(true));

        // No mostrar en admin
        if (isAdminRoute) {
            return () => cancelAnimationFrame(raf);
        }

        // Check if already dismissed in this session
        const dismissed = sessionStorage.getItem('mothersday-promo-dismissed');
        if (dismissed) {
            return () => cancelAnimationFrame(raf);
        }

        // Show after 3 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, [isAdminRoute]);

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem('mothersday-promo-dismissed', 'true');
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
            aria-label="Promoción Día de la Madre"
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

            <div className="bg-gradient-to-br from-[#7A3B4C] to-[#9B6B7D] rounded-lg shadow-2xl overflow-hidden border border-white/20 relative">
                {/* Close button */}
                <button
                    onClick={handleDismiss}
                    className="absolute top-2 right-2 text-white/70 hover:text-white p-1 z-10"
                    aria-label="Cerrar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-5">
                    {/* Flower decoration */}
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl animate-pulse">🌸</span>
                        <span className="text-white/80 text-xs uppercase tracking-wider font-medium">
                            Ofertas Especiales
                        </span>
                    </div>

                    <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white mb-2">
                        Día de la Madre en CIALO
                    </h3>

                    <p className="text-white/80 text-sm mb-4">
                        Hasta <strong className="text-white">26% OFF</strong> en tratamientos. Celebra a mamá con el regalo de belleza que se merece.
                    </p>

                    <Link
                        href="/dia-de-la-madre"
                        onClick={handleDismiss}
                        className="block w-full text-center bg-white text-[#7A3B4C] py-3 px-4 font-semibold uppercase text-sm tracking-wider hover:bg-[#b8935f] hover:text-white transition-all rounded-sm"
                    >
                        Ver Ofertas 🌷
                    </Link>

                    <button
                        onClick={handleDismiss}
                        className="w-full text-center text-white/60 text-xs mt-3 hover:text-white/80 transition-colors"
                    >
                        No, gracias
                    </button>
                </div>
            </div>
        </div>
    );
}
