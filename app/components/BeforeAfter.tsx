"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

interface BeforeAfterItem {
  /** Imagen "antes" (opcional: si no hay, se usa un placeholder elegante). */
  beforeSrc?: string;
  /** Imagen "después" (opcional: si no hay, se usa un placeholder elegante). */
  afterSrc?: string;
  /** Texto alternativo del "antes" (descriptivo, con keyword natural). */
  beforeAlt?: string;
  /** Texto alternativo del "después" (descriptivo, con keyword natural). */
  afterAlt?: string;
  /** Etiqueta del caso (ej: "Toxina botulínica · Tercio superior"). */
  label?: string;
}

interface BeforeAfterProps {
  /** Galería de casos. Si se omite, se usan placeholders de demostración. */
  items?: BeforeAfterItem[];
  /** Da prioridad de carga a la primera imagen (above-the-fold). */
  priority?: boolean;
}

const PLACEHOLDER_ITEMS: BeforeAfterItem[] = [
  {
    label: "Rejuvenecimiento facial · Resultado natural",
    beforeAlt: "Antes del tratamiento de rejuvenecimiento facial en Clínica Cialo",
    afterAlt: "Después del tratamiento de rejuvenecimiento facial en Clínica Cialo",
  },
  {
    label: "Contorno corporal · Criolipólisis",
    beforeAlt: "Antes del tratamiento de contorno corporal con criolipólisis",
    afterAlt: "Después del tratamiento de contorno corporal con criolipólisis",
  },
  {
    label: "Piel luminosa · HydraFacial",
    beforeAlt: "Antes del tratamiento HydraFacial para piel luminosa",
    afterAlt: "Después del tratamiento HydraFacial para piel luminosa",
  },
];

/** Placeholder elegante por lado (gradiente sobrio acorde a la paleta Cialo). */
function PlaceholderFace({ side }: { side: "antes" | "despues" }) {
  const gradient =
    side === "antes"
      ? "from-[#cdbfa9] to-[#a99a80]"
      : "from-[#e7d8c1] to-[#cdb893]";
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradient}`}
      role="img"
      aria-label={side === "antes" ? "Imagen de ejemplo: antes" : "Imagen de ejemplo: después"}
    >
      <svg
        className="h-20 w-20 text-white/55"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
        />
      </svg>
    </div>
  );
}

function Comparator({ item, priority = false }: { item: BeforeAfterItem; priority?: boolean }) {
  const [pos, setPos] = useState(50); // % visible del "después"
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 4));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 4));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPos(100);
    }
  };

  return (
    <figure className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          setDragging(true);
          updateFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging) updateFromClientX(e.clientX);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        {/* DESPUÉS (capa base) */}
        <div className="absolute inset-0">
          {item.afterSrc ? (
            <Image
              src={item.afterSrc}
              alt={item.afterAlt || "Resultado después del tratamiento estético en Clínica Cialo"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              quality={85}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover"
              draggable={false}
            />
          ) : (
            <PlaceholderFace side="despues" />
          )}
          <span className="absolute right-3 top-3 rounded-full bg-ink/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-sm">
            Después
          </span>
        </div>

        {/* ANTES (capa recortada por el slider) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          {item.beforeSrc ? (
            <Image
              src={item.beforeSrc}
              alt={item.beforeAlt || "Antes del tratamiento estético en Clínica Cialo"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              quality={85}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover"
              draggable={false}
            />
          ) : (
            <PlaceholderFace side="antes" />
          )}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm backdrop-blur-sm">
            Antes
          </span>
        </div>

        {/* Línea + tirador (rol slider, accesible por teclado) */}
        <div
          className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
          style={{ left: `${pos}%` }}
          aria-hidden="true"
        />
        <button
          type="button"
          role="slider"
          aria-label={`Comparador antes y después${item.label ? ` — ${item.label}` : ""}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% antes visible`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-ink/10 bg-white text-ink shadow-lg transition-transform duration-150 hover:scale-105 focus-visible:scale-105"
          style={{ left: `${pos}%` }}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
          </svg>
        </button>
      </div>

      {item.label && (
        <figcaption className="border-t border-sand px-4 py-3 text-center text-sm font-medium text-ink">
          {item.label}
        </figcaption>
      )}
    </figure>
  );
}

export default function BeforeAfter({ items, priority = false }: BeforeAfterProps) {
  const data = items && items.length > 0 ? items : PLACEHOLDER_ITEMS;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((item, i) => (
        <Comparator key={item.label ?? i} item={item} priority={priority && i === 0} />
      ))}
    </div>
  );
}
