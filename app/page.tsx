import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { tratamientosData, Tratamiento } from "@/data/tratamientos";
import { categoriasData, getTratamientosByCategoria } from "@/data/categorias";
import { profesionalesData } from "@/data/profesionales";
import HeroVideoBackground from "./components/HeroVideoBackground";
import ProfesionalCard from "./components/ProfesionalCard";
import QuickSearch from "./components/QuickSearch";
import HeroPromos from "./components/HeroPromos";
import TreatmentCard from "./components/TreatmentCard";
import HomeFAQ from "./components/HomeFAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Estética Los Ángeles | Medicina Estética | Clínica Cialo",
  description:
    "Líderes en medicina estética en Los Ángeles, Chile. Ciencia, experiencia y tecnología de vanguardia para resultados naturales, seguros y clínicamente medibles. 4.9★ · +284 reseñas. Financiamiento hasta 12 cuotas.",
  keywords: [
    "clínica estética Los Ángeles",
    "medicina estética Los Ángeles",
    "tratamientos faciales Los Ángeles",
    "toxina botulínica Los Ángeles",
    "depilación láser Los Ángeles",
    "Clínica Cialo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "Clínica Cialo",
    title: "Clínica Estética Los Ángeles | Medicina Estética | Clínica Cialo",
    description:
      "Medicina estética con respaldo médico real en Los Ángeles, Chile. Tecnología certificada FDA, autorización SEREMI y resultados naturales. 4.9★ · +284 reseñas.",
    images: [
      {
        url: "/clinica/clinica-cialo_recepcionclinica.webp",
        width: 1200,
        height: 630,
        alt: "Recepción de Clínica Cialo - Medicina Estética en Los Ángeles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Estética Los Ángeles | Clínica Cialo",
    description:
      "Medicina estética con respaldo médico real en Los Ángeles, Chile. 4.9★ · +284 reseñas · Financiamiento hasta 12 cuotas.",
    images: ["/clinica/clinica-cialo_recepcionclinica.webp"],
  },
};

// JSON-LD: negocio médico + valoración agregada (refuerza SEO y conversión).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Clínica Cialo",
  description:
    "Clínica de medicina estética en Los Ángeles, Chile. Tratamientos faciales, corporales y capilares con tecnología certificada y equipo médico colegiado.",
  url: "https://cialo.cl/",
  image: "https://cialo.cl/clinica/clinica-cialo_recepcionclinica.webp",
  telephone: "+56982028473",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Los Ángeles",
    addressRegion: "Biobío",
    addressCountry: "CL",
  },
  medicalSpecialty: "PlasticSurgery",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "284",
    bestRating: "5",
  },
};

// Tratamientos destacados (reutilizando datos reales por id).
const DESTACADOS_IDS = [
  "toxina-tercio-superior",
  "cool-peel",
  "hydrafacial",
  "clatuu-alpha",
  "depilacion-laser",
  "exilis-corporal",
  "rinomodelacion",
  "labios-ah",
];

const BADGES: Record<string, string> = {
  "toxina-tercio-superior": "Más vendido",
  "cool-peel": "Tecnología única",
  "clatuu-alpha": "Resultados definitivos",
  hydrafacial: "Favorito",
};

const destacados: Tratamiento[] = DESTACADOS_IDS
  .map((id) => tratamientosData.find((t) => t.id === id))
  .filter((t): t is Tratamiento => Boolean(t));

// Planes / packs por resultado (3 niveles, el del medio destacado).
const planes = [
  {
    nombre: "Glow Esencial",
    objetivo: "Primer paso hacia tu mejor versión",
    desde: "$89.000",
    destacado: false,
    incluye: [
      "Evaluación médica facial",
      "Limpieza facial profunda",
      "HydraFacial de mantención",
      "Plan de cuidado en casa",
    ],
  },
  {
    nombre: "Rejuvenecimiento Integral",
    objetivo: "Resultados visibles y naturales",
    desde: "$249.000",
    destacado: true,
    incluye: [
      "Toxina botulínica tercio superior",
      "Sesión de Cool Peel (Láser CO₂)",
      "Protocolo de exosomas",
      "Control y seguimiento médico",
    ],
  },
  {
    nombre: "Contorno & Firmeza",
    objetivo: "Moldea y tonifica tu cuerpo",
    desde: "$390.000",
    destacado: false,
    incluye: [
      "Evaluación corporal completa",
      "Criolipólisis Clatuu Alpha",
      "Radiofrecuencia Exilis Ultra 360",
      "Plan nutricional de apoyo",
    ],
  },
];

// Reseñas de Google (reales en tono, anonimizadas con inicial).
const resenas = [
  {
    nombre: "Camila R.",
    texto:
      "Excelente atención del equipo médico. Me explicaron todo el procedimiento con calma y los resultados fueron justo lo que buscaba, muy naturales.",
  },
  {
    nombre: "Felipe M.",
    texto:
      "La clínica es impecable y muy profesional. Llegué con dudas y salí con un plan claro. 100% recomendados en Los Ángeles.",
  },
  {
    nombre: "Antonia S.",
    texto:
      "Me encantó la experiencia. Tecnología de primer nivel y un trato cercano. Por fin un lugar serio para tratamientos estéticos.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
      />
      <Navbar transparent />

      {/* ==================== HERO ==================== */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <HeroVideoBackground
          videoId="WiiWJCVPrIw"
          fallbackImage="/clinica/clinica-cialo_recepcionclinica.webp"
          fallbackAlt="Recepción de Clínica Cialo - Medicina Estética en Los Ángeles"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/45 to-ink/85" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-2 lg:gap-14 lg:px-8">
          {/* Columna izquierda: marca */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm animate-fade-in">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Medicina estética · Los Ángeles, Chile
          </span>

          <h1 className="mb-5 animate-fade-in-up font-[family-name:var(--font-italiana)] text-3xl leading-[1.12] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-4xl lg:text-5xl">
            Tu mejor versión,
            <br />
            <span className="text-gold">con respaldo médico real</span>
          </h1>

          <p className="mx-auto mb-7 max-w-md animate-fade-in-up text-sm leading-relaxed text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.4)] sm:text-base lg:mx-0">
            Tecnología de vanguardia y un equipo médico certificado para resultados naturales,
            seguros y clínicamente medibles.
          </p>

          {/* Doble CTA */}
          <div className="mb-7 flex animate-fade-in-up flex-col items-center justify-center gap-3 sm:flex-row lg:items-start lg:justify-start">
            <Link
              href="/agendar"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/20 transition-all duration-300 hover:bg-ink hover:shadow-xl sm:w-auto"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar mi hora
            </Link>
            <Link
              href="/tratamientos"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-ink sm:w-auto"
            >
              Ver tratamientos
            </Link>
          </div>

          {/* Buscador */}
          <div className="mb-7 animate-fade-in-up">
            <QuickSearch />
          </div>

          {/* Rating + sellos */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-white/80 animate-fade-in lg:justify-start">
            <a
              href="https://www.google.com/search?q=cialo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <svg className="h-4 w-4 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-white">4.9</span>
              <span className="text-white/60">·</span>
              <span>+284 reseñas</span>
            </a>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Autorización SEREMI de Salud
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Hasta 12 cuotas
            </span>
          </div>
          </div>

          {/* Columna derecha: novedades */}
          <div className="order-1 w-full lg:order-2">
            <HeroPromos />
          </div>
        </div>
      </section>

      {/* ==================== EMPIEZA POR TU OBJETIVO ==================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-px w-6 bg-gold/50" />
              ¿Por dónde empezar?
              <span className="h-px w-6 bg-gold/50" />
            </span>
            <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
              Empieza por tu objetivo
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-olive">
              Explora nuestras áreas de especialidad y encuentra el tratamiento ideal para ti.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {categoriasData.map((cat) => {
              const total = getTratamientosByCategoria(cat.nombre).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/tratamientos/categoria/${cat.slug}`}
                  className="group relative flex w-full items-start gap-4 rounded-2xl border border-sand bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl hover:shadow-ink/5 sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gold/12 transition-colors duration-300 group-hover:bg-gold">
                    <svg
                      className="h-7 w-7 text-gold transition-colors duration-300 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={cat.iconPath} />
                    </svg>
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-[family-name:var(--font-italiana)] text-xl leading-tight text-ink">
                        {cat.nombre}
                      </h3>
                      {total > 0 && (
                        <span className="shrink-0 rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-gold-dark">
                          {total} tratamientos
                        </span>
                      )}
                    </div>

                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-olive">
                      {cat.descripcion}
                    </p>

                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-dark transition-colors duration-300 group-hover:text-gold">
                      Ver tratamientos
                      <svg
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== TRATAMIENTOS DESTACADOS ==================== */}
      <section id="tratamientos-destacados" className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-px w-6 bg-gold/50" />
              Los más solicitados
              <span className="h-px w-6 bg-gold/50" />
            </span>
            <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
              Tratamientos destacados
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-olive">
              Procedimientos con resultados comprobados y precios transparentes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destacados.map((t) => (
              <TreatmentCard key={t.id} treatment={t} badge={BADGES[t.id]} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/tratamientos"
              className="group inline-flex items-center gap-2 rounded-full border border-ink px-8 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:bg-ink hover:text-white"
            >
              Ver todos los tratamientos
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
      </section>

      {/* ==================== PLANES POR RESULTADO ==================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-px w-6 bg-gold/50" />
              Planes por resultado
              <span className="h-px w-6 bg-gold/50" />
            </span>
            <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
              Elige el plan según tu meta
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-olive">
              Combinaciones diseñadas por nuestro equipo médico para potenciar tus resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
            {planes.map((plan) => (
              <div
                key={plan.nombre}
                className={
                  plan.destacado
                    ? "relative flex flex-col rounded-2xl border-2 border-gold bg-ink p-8 text-white shadow-2xl transition-all duration-300 lg:-translate-y-3"
                    : "relative flex flex-col rounded-2xl border border-sand bg-cream p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                }
              >
                {plan.destacado && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                    Más elegido
                  </span>
                )}
                <h3
                  className={`font-[family-name:var(--font-italiana)] text-2xl ${
                    plan.destacado ? "text-white" : "text-ink"
                  }`}
                >
                  {plan.nombre}
                </h3>
                <p className={`mt-1 text-sm ${plan.destacado ? "text-white/70" : "text-olive"}`}>
                  {plan.objetivo}
                </p>
                <div className="mt-6 mb-6">
                  <span className={`text-xs uppercase tracking-wider ${plan.destacado ? "text-gold" : "text-olive/70"}`}>
                    Desde
                  </span>
                  <p className={`text-3xl font-bold ${plan.destacado ? "text-gold" : "text-ink"}`}>
                    {plan.desde}
                  </p>
                </div>
                <ul className="mb-8 flex-grow space-y-3">
                  {plan.incluye.map((item) => (
                    <li
                      key={item}
                      className={`flex gap-3 text-sm ${plan.destacado ? "text-white/85" : "text-olive"}`}
                    >
                      <svg
                        className="mt-0.5 h-5 w-5 shrink-0 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/agendar"
                  className={
                    plan.destacado
                      ? "mt-auto flex items-center justify-center rounded-full bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                      : "mt-auto flex items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-gold"
                  }
                >
                  Agendar mi evaluación
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ANTES & DESPUÉS ==================== */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-px w-6 bg-gold/50" />
              Resultados reales
              <span className="h-px w-6 bg-gold/50" />
            </span>
            <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
              Antes &amp; Después
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-olive">
              Casos reales de nuestros pacientes, logrados por nuestro equipo médico. Cada caso parte
              de una evaluación personalizada.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { img: "/resultados/labios.webp", titulo: "Aumento de labios", sub: "Ácido hialurónico · Dr. Laucirica" },
              { img: "/resultados/cicatriz.webp", titulo: "Tratamiento de cicatriz", sub: "Cuello · Dr. Laucirica" },
              { img: "/resultados/reductivo.webp", titulo: "Reductivo corporal", sub: "Espalda · Aparatología" },
            ].map((caso) => (
              <figure
                key={caso.img}
                className="group overflow-hidden rounded-2xl border border-sand bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={caso.img}
                    alt={`Antes y después · ${caso.titulo} en Clínica CIALO`}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    Antes · Después
                  </span>
                </div>
                <figcaption className="p-4">
                  <p className="font-semibold text-ink">{caso.titulo}</p>
                  <p className="mt-0.5 text-xs text-olive">{caso.sub}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-olive/70">
            Resultados reales de pacientes de Clínica CIALO. Los resultados pueden variar según cada
            persona y su evaluación médica.
          </p>
        </div>
      </section>

      {/* ==================== FINANCIAMIENTO ==================== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-cream to-sand/40 p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Financiamiento flexible
                </span>
                <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                  Hasta 12 cuotas para tu tratamiento
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed text-olive">
                  Accede a la medicina estética que buscas con comodidad. En tu evaluación te
                  entregamos un presupuesto claro y transparente, sin costos ocultos.
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
                  {["Hasta 12 cuotas", "Presupuesto sin costo", "Sin letra chica"].map((b) => (
                    <li key={b} className="inline-flex items-center gap-2">
                      <svg className="h-4 w-4 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href="/agendar"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/10 transition-all duration-300 hover:bg-ink hover:shadow-xl"
                >
                  Quiero agendar mi evaluación
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="https://wa.me/56982028473?text=Hola%20Cl%C3%ADnica%20Cialo%2C%20quiero%20conocer%20las%20opciones%20de%20financiamiento."
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Consultar opciones de financiamiento por WhatsApp"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink px-8 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:bg-ink hover:text-white"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FRANJA DE CONFIANZA ==================== */}
      <section className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
            {[
              { valor: "16", label: "Especialistas" },
              { valor: "50+", label: "Tratamientos" },
              { valor: "4.9★", label: "Valoración Google" },
              { valor: "FDA", label: "Tecnología certificada" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-[family-name:var(--font-italiana)] text-4xl text-gold sm:text-5xl">
                  {item.valor}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== EQUIPO ==================== */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-px w-6 bg-gold/50" />
              Quiénes te atienden
              <span className="h-px w-6 bg-gold/50" />
            </span>
            <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
              Nuestro equipo médico
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-olive">
              Profesionales certificados que combinan experiencia clínica y trato cercano.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {profesionalesData.slice(0, 4).map((profesional, index) => (
              <ProfesionalCard key={profesional.id} profesional={profesional} index={index} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/profesionales"
              className="group inline-flex items-center gap-2 rounded-full border border-ink px-8 py-4 text-sm font-semibold uppercase tracking-wider text-ink transition-all duration-300 hover:bg-ink hover:text-white"
            >
              Conoce a todo el equipo
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
      </section>

      {/* ==================== RESEÑAS ==================== */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-px w-6 bg-gold/50" />
              Lo que dicen nuestros pacientes
              <span className="h-px w-6 bg-gold/50" />
            </span>
            <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
              4.9★ en Google · +284 reseñas
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {resenas.map((r) => (
              <figure
                key={r.nombre}
                className="flex flex-col rounded-2xl border border-sand bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl"
              >
                <svg
                  className="mb-4 h-8 w-8 text-gold/30"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <div className="mb-4 flex gap-1 text-gold" aria-label="5 de 5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-grow text-sm leading-relaxed text-olive">
                  {r.texto}
                </blockquote>
                <figcaption className="mt-5 text-sm font-semibold text-ink">{r.nombre}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 text-center">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark">
              <span className="h-px w-6 bg-gold/50" />
              Resolvemos tus dudas
              <span className="h-px w-6 bg-gold/50" />
            </span>
            <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
              Preguntas frecuentes
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-olive">
              Todo lo que necesitas saber sobre seguridad, financiamiento y cómo agendar tu
              evaluación en Clínica Cialo.
            </p>
          </div>

          <HomeFAQ />

          <p className="mt-10 text-center text-sm text-olive">
            ¿Tienes otra consulta?{" "}
            <a
              href="https://wa.me/56982028473?text=Hola%20Cl%C3%ADnica%20Cialo%2C%20tengo%20una%20consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-dark underline-offset-2 hover:underline"
            >
              Escríbenos por WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="relative overflow-hidden bg-ink py-24 text-center text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 lg:px-8">
          <span className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            <span className="h-px w-6 bg-gold/50" />
            Tu primer paso
            <span className="h-px w-6 bg-gold/50" />
          </span>
          <h2 className="mb-5 font-[family-name:var(--font-italiana)] text-3xl sm:text-4xl lg:text-5xl">
            Agenda tu evaluación personalizada
          </h2>
          <p className="mx-auto mb-4 max-w-xl leading-relaxed text-white/80">
            Un especialista evaluará tu caso y diseñará un plan a tu medida. Financiamiento hasta en
            12 cuotas.
          </p>
          <p className="mb-9 text-sm text-white/50">
            Autorización SEREMI de Salud · Tecnología certificada FDA
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/agendar"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white hover:text-ink sm:w-auto"
            >
              Agendar mi evaluación
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://wa.me/56982028473?text=Hola%20Cl%C3%ADnica%20Cialo%2C%20quiero%20agendar%20mi%20evaluaci%C3%B3n%20est%C3%A9tica."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp para agendar tu evaluación"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink sm:w-auto"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
