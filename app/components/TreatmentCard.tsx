import Link from "next/link";
import Image from "next/image";
import { Tratamiento, formatPrice } from "@/data/tratamientos";
import { getCategoryVisual } from "@/lib/categoryVisuals";

interface TreatmentCardProps {
  treatment: Tratamiento;
  /** Optional badge text (e.g. "Más vendido"). */
  badge?: string;
  /** Prioritize image loading (above-the-fold cards). */
  priority?: boolean;
}

export default function TreatmentCard({ treatment, badge, priority = false }: TreatmentCardProps) {
  const precio = formatPrice(treatment.valorDesde, treatment.valorHasta);
  const visual = getCategoryVisual(treatment.categoria);
  const detalleUrl = `/tratamientos/${treatment.id}`;
  // Portada: imagen hero dedicada si existe; si no, la primera foto de la galería
  // (tratamientos con casos/resultados); si no hay ninguna, el fallback por categoría.
  // NO se usa imagenExplicativa (gráfico comparativo) como portada — esa queda solo
  // en la página de detalle, no se ve bien como cover del card.
  const imagen = treatment.imagenHero || treatment.galeria?.[0];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl">
      {/* Imagen / cabecera visual */}
      <Link href={detalleUrl} className="relative block h-44 overflow-hidden" aria-label={`Ver ${treatment.nombre}`}>
        {imagen ? (
          <Image
            src={imagen}
            alt={`${treatment.nombre} — tratamiento de ${treatment.categoria.toLowerCase()} en Clínica Cialo, Los Ángeles`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            quality={85}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          // Fallback elegante por categoría: gradiente + ícono
          <div
            className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${visual.gradient}`}
            role="img"
            aria-label={`${treatment.nombre} — ${treatment.categoria}`}
          >
            <svg
              className="absolute -right-5 -bottom-5 h-32 w-32 text-white/25"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={visual.iconPath} />
            </svg>
            <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-sm">
              <svg
                className="h-8 w-8"
                style={{ color: visual.accent }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={visual.iconPath} />
              </svg>
            </span>
          </div>
        )}

        {/* Overlay gradiente para legibilidad de badges */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10" />

        {/* Badge superior */}
        {badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold shadow-sm">
            {badge}
          </span>
        )}

        {/* Categoría */}
        <span className="absolute bottom-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm backdrop-blur-sm">
          {treatment.categoria}
        </span>

        {/* Duración */}
        {treatment.duracion && (
          <span className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-ink/80 shadow-sm backdrop-blur-sm">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {treatment.duracion}
          </span>
        )}
      </Link>

      {/* Cuerpo */}
      <div className="flex flex-grow flex-col p-5">
        <h3 className="mb-1.5 font-[family-name:var(--font-italiana)] text-xl leading-snug text-ink">
          <Link href={detalleUrl} className="transition-colors hover:text-gold">
            {treatment.nombre}
          </Link>
        </h3>

        {/* Descripción */}
        <div
          className="mb-4 line-clamp-2 flex-grow text-sm leading-relaxed text-olive [&>strong]:font-semibold [&>strong]:text-ink"
          dangerouslySetInnerHTML={{ __html: treatment.descripcion }}
        />

        {/* Precio "desde" */}
        <div className="mb-4 border-t border-sand pt-4">
          <span className="block text-[11px] uppercase tracking-wider text-olive/70">Valor desde</span>
          <span className="text-lg font-bold text-ink">{precio}</span>
        </div>

        {/* Doble CTA */}
        <div className="mt-auto grid grid-cols-2 gap-2">
          <Link
            href="/agendar"
            className="flex items-center justify-center rounded-full bg-ink px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-gold"
          >
            Agendar
          </Link>
          <Link
            href={detalleUrl}
            className="group/ver flex items-center justify-center gap-1 rounded-full border border-gold px-3 py-2.5 text-xs font-semibold uppercase tracking-wider text-ink transition-colors duration-300 hover:bg-gold hover:text-white"
          >
            Ver
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/ver:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
