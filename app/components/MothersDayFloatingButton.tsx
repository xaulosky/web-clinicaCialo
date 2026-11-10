'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MothersDayFloatingButton() {
    const pathname = usePathname();
    
    // No mostrar en la página del día de la madre ni en admin
    if (pathname?.startsWith('/dia-de-la-madre') || pathname?.startsWith('/admin')) {
        return null;
    }

    return (
        <Link
            href="/dia-de-la-madre"
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-gradient-to-r from-[#9B6B7D] to-[#7A3B4C] text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 animate-bounce"
            style={{
                animation: 'bounce 2s infinite',
            }}
        >
            <span className="text-xl">🌸</span>
            <span className="font-medium text-sm hidden sm:inline">Día de la Madre</span>
            
            {/* Pulse effect */}
            <span className="absolute inset-0 rounded-full bg-[#9B6B7D] animate-ping opacity-20"></span>
        </Link>
    );
}