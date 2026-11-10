'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function BlackFridayPopup() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    // No mostrar en rutas de admin ni en la propia landing page de ofertas
    const isExcludedRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/cyber');

    useEffect(() => {
        setMounted(true);
        const deadline = new Date('2026-06-04T00:00:00-04:00');
        if (new Date() >= deadline) {
            setIsExpired(true);
        }
    }, []);

    if (!mounted || isExcludedRoute || isExpired) return null;

    return (
        <div className="fixed bottom-6 left-6 z-[9999] animate-bounce-slow">
            <Link 
                href="/cyber"
                className="group relative flex items-center bg-black border-2 border-yellow-500 rounded-full p-1 pr-6 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300 transform hover:scale-105"
            >
                {/* Icon/Badge part */}
                <div className="bg-yellow-500 text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mr-3 shadow-lg group-hover:rotate-12 transition-transform">
                    %
                </div>
                
                {/* Text part */}
                <div className="flex flex-col">
                    <span className="text-[10px] text-yellow-500 font-bold uppercase tracking-widest leading-none">
                        Cyber Cialo
                    </span>
                    <span className="text-white font-black text-sm uppercase leading-tight tracking-tight">
                        Hasta 45% OFF
                    </span>
                </div>

                {/* Shimmer Effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                    <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] animate-shimmer" />
                </div>
            </Link>

            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 200%; }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                .animate-shimmer {
                    animation: shimmer 2.5s infinite;
                }
            `}</style>
        </div>
    );
}
