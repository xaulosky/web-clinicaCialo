'use client';

// Novedades del hero (columna derecha): tarjeta prominente que rota entre las
// promos activas (src/data/promociones.ts). Imagen + etiqueta + título + CTA,
// con barra de progreso que avanza sola y puntos para saltar. Se pausa al pasar
// el mouse. Si no hay promos activas, no renderiza nada.

import Link from 'next/link';
import { useState } from 'react';
import { getPromocionesActivas, TipoPromocion } from '@/data/promociones';

const ROTATE_MS = 5000;
const FALLBACK_IMG = '/clinica/clinica-cialo_recepcionclinica.webp';

const ICONS: Record<TipoPromocion, string> = {
    promo: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    nuevo: 'M13 10V3L4 14h7v7l9-11h-7z',
    agenda: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    info: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
};

export default function HeroPromos() {
    const promos = getPromocionesActivas();
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    if (promos.length === 0) return null;

    const safe = idx % promos.length;
    const promo = promos[safe];
    const icon = ICONS[promo.tipo ?? 'promo'] ?? ICONS.promo;
    const external = !!promo.href && /^https?:/.test(promo.href);
    const cta = promo.cta || 'Ver más';
    const multiple = promos.length > 1;
    const next = () => setIdx((p) => (p + 1) % promos.length);

    const inner = (
        <>
            {/* Imagen */}
            <div className="relative h-44 w-full overflow-hidden sm:h-48">
                <img
                    key={promo.id}
                    src={promo.imagen || FALLBACK_IMG}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => {
                        if (e.currentTarget.src.indexOf(FALLBACK_IMG) === -1) e.currentTarget.src = FALLBACK_IMG;
                    }}
                    className="h-full w-full animate-fade-in object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                    </svg>
                    {promo.etiqueta}
                </span>
            </div>

            {/* Contenido */}
            <div key={`${promo.id}-c`} className="animate-fade-in p-6 text-left">
                <h3 className="font-[family-name:var(--font-italiana)] text-2xl leading-tight text-white">{promo.texto}</h3>
                {promo.subtexto && <p className="mt-2.5 text-sm leading-relaxed text-white/75">{promo.subtexto}</p>}
                {promo.href && (
                    <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                        {cta}
                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </span>
                )}
            </div>
        </>
    );

    return (
        <div
            className="mx-auto w-full max-w-md"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label="Novedades y promociones"
        >
            <span className="mb-3 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold lg:justify-start">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                Novedades
            </span>

            <div className="group overflow-hidden rounded-2xl border border-white/15 bg-ink/50 shadow-2xl shadow-ink/40 backdrop-blur-md">
                {promo.href ? (
                    external ? (
                        <a href={promo.href} target="_blank" rel="noopener noreferrer" className="block">
                            {inner}
                        </a>
                    ) : (
                        <Link href={promo.href} className="block">
                            {inner}
                        </Link>
                    )
                ) : (
                    <div>{inner}</div>
                )}

                {/* Barra de progreso (dispara el avance al terminar) */}
                {multiple && (
                    <span className="block h-[3px] w-full bg-white/10" aria-hidden="true">
                        <span
                            key={`bar-${safe}`}
                            className="promo-progress-bar block h-full bg-gold"
                            style={
                                {
                                    animationPlayState: paused ? 'paused' : 'running',
                                    ['--promo-dur' as string]: `${ROTATE_MS}ms`,
                                } as React.CSSProperties
                            }
                            onAnimationEnd={next}
                        />
                    </span>
                )}
            </div>

            {/* Puntos */}
            {multiple && (
                <div className="mt-3 flex items-center justify-center gap-1.5 lg:justify-start">
                    {promos.map((p, n) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => setIdx(n)}
                            aria-label={`Ver novedad ${n + 1}`}
                            aria-current={n === safe}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                n === safe ? 'w-6 bg-gold' : 'w-1.5 bg-white/30 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
