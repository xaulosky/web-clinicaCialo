'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ValentineFloatingHeart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed left-6 bottom-6 z-50 flex flex-col items-center gap-2 group">
            {/* Floating Hearts Container */}
            <Link href="/san-valentin" className="relative group cursor-pointer block">
                {/* Main Heart with glow */}
                <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-gradient-to-br from-[#8b2942] to-[#c44569] rounded-full shadow-lg border-2 border-white/30 cursor-pointer animate-heartbeat hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl md:text-4xl filter drop-shadow-md">💝</span>
                </div>

                {/* Ring pulsing effect */}
                <div className="absolute inset-0 bg-[#8b2942] rounded-full animate-ping opacity-20 -z-10"></div>
                <div className="absolute inset-[-4px] bg-[#c44569] rounded-full animate-pulse opacity-30 -z-20 blur-sm"></div>

                {/* Satellite Hearts */}
                <div className="absolute -top-4 -right-2 text-xl animate-float-slow transition-opacity opacity-0 group-hover:opacity-100 duration-500 delay-75">
                    💕
                </div>
                <div className="absolute -bottom-2 -left-2 text-xl animate-float-delayed transition-opacity opacity-0 group-hover:opacity-100 duration-500 delay-150">
                    💖
                </div>
                <div className="absolute top-1/2 -right-6 text-sm animate-float-fast transition-opacity opacity-0 group-hover:opacity-100 duration-500 delay-200">
                    ❤️
                </div>

                {/* Tooltip Label */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-white/90 backdrop-blur-sm text-[#8b2942] px-3 py-1.5 rounded-r-lg shadow-md font-medium text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 border border-[#8b2942]/10 pointer-events-none">
                    San Valentín 30% OFF
                </div>
            </Link>

            <style jsx>{`
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    14% { transform: scale(1.1); }
                    28% { transform: scale(1); }
                    42% { transform: scale(1.1); }
                    70% { transform: scale(1); }
                }
                .animate-heartbeat {
                    animation: heartbeat 3s infinite ease-in-out;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(10deg); }
                }
                .animate-float-slow {
                    animation: float-slow 4s ease-in-out infinite;
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(-10deg); }
                }
                .animate-float-delayed {
                    animation: float-delayed 5s ease-in-out infinite 1s;
                }
                 @keyframes float-fast {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-12px) rotate(5deg); }
                }
                .animate-float-fast {
                    animation: float-fast 3s ease-in-out infinite 0.5s;
                }
             `}</style>
        </div>
    );
}
