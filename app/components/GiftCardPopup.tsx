'use client';

// Popup que incentiva la compra de Gift Card. Aparece tras unos segundos,
// una sola vez por visitante cada COOLDOWN_DAYS (localStorage). No se muestra
// en admin, checkout ni en la propia página de gift card.

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const STORAGE_KEY = 'cialo_giftcard_popup_v1';
const SHOW_DELAY_MS = 6000;
const COOLDOWN_DAYS = 7;

const BENEFICIOS = [
    'Monto a tu elección',
    'Diseño personalizado',
    'Válida para tratamientos y productos',
    'Envío digital inmediato',
];

export default function GiftCardPopup() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const excluded =
        pathname?.startsWith('/admin') ||
        pathname?.startsWith('/giftcard') ||
        pathname?.startsWith('/checkout') ||
        pathname?.startsWith('/cyber');

    const dismiss = useCallback(() => {
        setOpen(false);
        try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch {}
    }, []);

    useEffect(() => {
        if (excluded) return;
        let cancelled = false;
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const ts = parseInt(raw, 10);
                if (!Number.isNaN(ts) && Date.now() - ts < COOLDOWN_DAYS * 86400000) return;
            }
        } catch {}
        const t = setTimeout(() => {
            if (!cancelled) setOpen(true);
        }, SHOW_DELAY_MS);
        return () => {
            cancelled = true;
            clearTimeout(t);
        };
    }, [excluded]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') dismiss();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, dismiss]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Gift Card de Clínica CIALO">
            <div className="absolute inset-0 animate-fade-in bg-ink/70 backdrop-blur-sm" onClick={dismiss} />

            <div className="relative z-10 w-full max-w-md animate-fade-in-up overflow-hidden rounded-3xl bg-white shadow-2xl">
                <button
                    type="button"
                    onClick={dismiss}
                    aria-label="Cerrar"
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Cabecera */}
                <div className="relative overflow-hidden bg-gradient-to-br from-ink via-[#26231e] to-ink px-8 pb-9 pt-10 text-center text-white">
                    <div className="pointer-events-none absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
                    <span className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15 ring-1 ring-gold/30">
                        <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V19.5m0-14.625A2.625 2.625 0 1114.625 7.5H12m-8.25 0h16.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-1.5 1.5H3.75a1.5 1.5 0 01-1.5-1.5V9a1.5 1.5 0 011.5-1.5z" />
                        </svg>
                    </span>
                    <span className="relative text-[11px] font-bold uppercase tracking-[0.25em] text-gold">Gift Card CIALO</span>
                    <h3 className="relative mt-2 font-[family-name:var(--font-italiana)] text-3xl leading-tight">Regala bienestar</h3>
                </div>

                {/* Cuerpo */}
                <div className="px-8 pb-8 pt-6 text-center">
                    <p className="text-sm leading-relaxed text-olive">
                        Sorprende a quien quieras con una experiencia en Clínica CIALO. Tú eliges el monto y el diseño; llega lista para regalar.
                    </p>

                    <ul className="mx-auto mt-5 flex max-w-xs flex-col gap-2.5 text-left">
                        {BENEFICIOS.map((b) => (
                            <li key={b} className="flex items-center gap-2.5 text-sm text-ink/85">
                                <svg className="h-4 w-4 shrink-0 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {b}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href="/giftcard"
                        onClick={dismiss}
                        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-ink"
                    >
                        Comprar Gift Card
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                    <button
                        type="button"
                        onClick={dismiss}
                        className="mt-3 text-xs font-medium uppercase tracking-wider text-olive/70 transition-colors hover:text-ink"
                    >
                        Quizás después
                    </button>
                </div>
            </div>
        </div>
    );
}
