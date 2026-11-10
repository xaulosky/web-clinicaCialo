'use client';

// Hero a pantalla completa con carrusel de slides:
//   - Slide 0 = MARCA (recibe `children`: el contenido actual del hero) sobre el
//     video de fondo.
//   - Slides siguientes = PROMOCIONES activas (src/data/promociones.ts), cada
//     una ocupando TODO el hero con su imagen de fondo, titular y CTA.
// Rota sola (la barra de progreso dispara el avance al terminar), se pausa al
// pasar el mouse y trae flechas + puntos. Si no hay promos, solo muestra marca.

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import HeroVideoBackground from './HeroVideoBackground';
import { getPromocionesActivas, Promocion, TipoPromocion } from '@/data/promociones';

const ROTATE_MS = 6000;
const FALLBACK_IMG = '/clinica/clinica-cialo_recepcionclinica.webp';

const ICONS: Record<TipoPromocion, string> = {
    promo: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    nuevo: 'M13 10V3L4 14h7v7l9-11h-7z',
    agenda: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    info: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
};

function PromoSlide({ promo }: { promo: Promocion }) {
    const external = !!promo.href && /^https?:/.test(promo.href);
    const cta = promo.cta || 'Ver más';
    const icon = ICONS[promo.tipo ?? 'promo'] ?? ICONS.promo;

    return (
        <div className="animate-fade-in-up">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-gold backdrop-blur-sm">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
                {promo.etiqueta}
            </span>

            <h2 className="mx-auto max-w-3xl font-[family-name:var(--font-italiana)] text-4xl leading-[1.1] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
                {promo.texto}
            </h2>

            {promo.subtexto && (
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)] sm:text-lg">
                    {promo.subtexto}
                </p>
            )}

            {promo.href && (
                <div className="mt-9">
                    {external ? (
                        <a
                            href={promo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 text-base font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/20 transition-all duration-300 hover:bg-white hover:text-ink hover:shadow-xl"
                        >
                            {cta}
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    ) : (
                        <Link
                            href={promo.href}
                            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-9 py-4 text-base font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/20 transition-all duration-300 hover:bg-white hover:text-ink hover:shadow-xl"
                        >
                            {cta}
                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default function HeroCarousel({ children }: { children: ReactNode }) {
    const promos = getPromocionesActivas();
    const total = promos.length + 1; // +1 = slide de marca
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    const safe = ((idx % total) + total) % total;
    const isBrand = safe === 0;
    const promo = isBrand ? null : promos[safe - 1];
    const multiple = total > 1;

    const go = (n: number) => setIdx(((n % total) + total) % total);
    const next = () => go(safe + 1);
    const prev = () => go(safe - 1);

    return (
        <section
            className="relative flex min-h-[88vh] items-center justify-center overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-roledescription="carrusel"
            aria-label="Destacados de Clínica CIALO"
        >
            {/* Fondo de marca (video) siempre montado para no recargarlo */}
            <HeroVideoBackground
                videoId="WiiWJCVPrIw"
                fallbackImage={FALLBACK_IMG}
                fallbackAlt="Recepción de Clínica Cialo - Medicina Estética en Los Ángeles"
            />

            {/* Imagen de la promo activa, encima del video */}
            {promo && (
                <img
                    key={promo.id}
                    src={promo.imagen || FALLBACK_IMG}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => {
                        if (e.currentTarget.src.indexOf(FALLBACK_IMG) === -1) e.currentTarget.src = FALLBACK_IMG;
                    }}
                    className="absolute inset-0 h-full w-full animate-fade-in object-cover"
                />
            )}

            {/* Overlay para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/45 to-ink/90" />

            {/* Contenido */}
            <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-20 text-center lg:px-8">
                {isBrand ? <div className="animate-fade-in">{children}</div> : <PromoSlide key={promo!.id} promo={promo!} />}
            </div>

            {/* Controles */}
            {multiple && (
                <>
                    {/* Flechas */}
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Anterior"
                        className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/30 text-white backdrop-blur-sm transition-colors hover:border-gold hover:bg-ink/50 sm:flex lg:left-6"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Siguiente"
                        className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-ink/30 text-white backdrop-blur-sm transition-colors hover:border-gold hover:bg-ink/50 sm:flex lg:right-6"
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Puntos */}
                    <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                        {Array.from({ length: total }).map((_, n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => go(n)}
                                aria-label={n === 0 ? 'Inicio' : `Promoción ${n}`}
                                aria-current={n === safe}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                    n === safe ? 'w-6 bg-gold' : 'w-1.5 bg-white/40 hover:bg-white/70'
                                }`}
                            />
                        ))}
                    </div>

                    {/* Barra de progreso (dispara el avance al terminar) */}
                    <span className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-white/10" aria-hidden="true">
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
                </>
            )}
        </section>
    );
}
