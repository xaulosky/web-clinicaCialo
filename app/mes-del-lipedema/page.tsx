import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReservaClinios from "../components/ReservaClinios";

export const metadata: Metadata = {
    title: { absolute: "Mes del Lipedema | Clínica CIALO" },
    description:
        "Mes del Lipedema en Clínica CIALO, Los Ángeles. Programa integral con kinesióloga especialista: aparatología, drenaje linfático y 10 sesiones. Evaluación previa sin costo. Cupos limitados.",
    alternates: { canonical: "/mes-del-lipedema" },
    openGraph: {
        title: "Mes del Lipedema | Programa Integral de Tratamiento | Clínica CIALO",
        description:
            "Programa integral de tratamiento de lipedema: aparatología, drenaje linfático especializado y 10 sesiones. Evaluación previa sin costo. Cupos limitados.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/mes-del-lipedema",
    },
};

const WHATSAPP = "56982028473";
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

// Agenda real de Reservo de la Klga. Keren Matus (evaluación gratuita de lipedema).
const AGENDA_KEREN = "https://reservas.clinios.cl/cialo/reservar";

const incluye = [
    "Evaluación con Kinesióloga especialista (sin costo)",
    "2 tecnologías de aparatología por sesión",
    "Drenaje linfático especializado",
    "10 sesiones",
];

const opciones = [
    {
        id: 1,
        titulo: "Opción 1",
        zona: "Brazos",
        zonas: "2 zonas",
        detalle: null,
        antes: "729.000",
        ahora: "583.200",
        descuento: "-20%",
        destacado: false,
    },
    {
        id: 2,
        titulo: "Opción 2",
        zona: "Piernas",
        zonas: "1 zona",
        detalle: "Muslo anterior • Muslo posterior • Muslo interno o Muslo lateral",
        antes: "970.000",
        ahora: "776.000",
        descuento: "-20%",
        destacado: true,
    },
    {
        id: 3,
        titulo: "Opción 3",
        zona: "Piernas",
        zonas: "3 zonas",
        detalle: "Muslo anterior + Muslo interno/lateral + Muslo posterior",
        antes: "2.328.000",
        ahora: "1.980.000",
        descuento: "-15%",
        destacado: false,
    },
];

const condiciones = [
    "Promoción válida durante el Mes del Lipedema.",
    "Cupos limitados.",
    "Evaluación previa obligatoria para determinar indicación clínica.",
    "Valores válidos para nuevos ingresos al programa.",
];

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
        { "@type": "ListItem", position: 2, name: "Mes del Lipedema", item: "https://cialo.cl/mes-del-lipedema" },
    ],
};

function Check() {
    return (
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function MesDelLipedemaPage() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <Navbar transparent />

            {/* ============ HERO ============ */}
            <header className="relative overflow-hidden bg-ink pt-32 pb-20 text-white sm:pt-36 sm:pb-24">
                {/* Foto de fondo con overlay para legibilidad */}
                <img
                    src="/promociones/mes-lipedema-hero.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-ink/92 via-ink/80 to-ink/92" />
                <div className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-gold/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-goldlt/5 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-8">
                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-gold">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                        Mes del Lipedema
                    </span>
                    <h1 className="font-[family-name:var(--font-italiana)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
                        Programa Integral de Tratamiento
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
                        Un abordaje kinésico y tecnológico del lipedema: aparatología avanzada, drenaje linfático
                        especializado y acompañamiento profesional durante 10 sesiones. Evaluación previa sin costo.
                    </p>

                    <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-cream/75 sm:text-sm">
                        <li className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Kinesióloga especialista
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Hasta 20% de descuento
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Cupos limitados
                        </li>
                    </ul>

                    <div className="mt-9">
                        <a
                            href="#agendar"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/30 transition-colors duration-300 hover:bg-white hover:text-ink"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Agendar evaluación gratuita
                        </a>
                    </div>
                </div>
            </header>

            {/* ============ OPCIONES / PRECIOS ============ */}
            <section className="bg-cream py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            Elige tu programa
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            3 opciones según tu zona
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-olive">
                            Todos los programas incluyen evaluación previa sin costo para determinar la indicación clínica.
                        </p>
                    </div>

                    <div className="grid items-stretch gap-6 lg:grid-cols-3">
                        {opciones.map((o) => (
                            <div
                                key={o.id}
                                className={`relative flex flex-col rounded-2xl p-7 transition-all duration-300 ${
                                    o.destacado
                                        ? "border-2 border-gold bg-ink text-white shadow-2xl lg:-translate-y-3"
                                        : "border border-sand bg-white shadow-sm hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl"
                                }`}
                            >
                                {o.destacado && (
                                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                                        Más elegida
                                    </span>
                                )}

                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <span className={`text-xs font-bold uppercase tracking-[0.18em] ${o.destacado ? "text-gold" : "text-gold-dark"}`}>
                                            {o.titulo}
                                        </span>
                                        <h3 className={`mt-1.5 font-[family-name:var(--font-italiana)] text-2xl leading-tight ${o.destacado ? "text-white" : "text-ink"}`}>
                                            {o.zona} <span className={o.destacado ? "text-cream/70" : "text-olive"}>({o.zonas})</span>
                                        </h3>
                                    </div>
                                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${o.destacado ? "bg-gold text-white" : "bg-gold/10 text-gold-dark"}`}>
                                        {o.descuento}
                                    </span>
                                </div>

                                {o.detalle && (
                                    <p className={`mt-2 text-xs leading-relaxed ${o.destacado ? "text-cream/65" : "text-olive/90"}`}>
                                        {o.detalle}
                                    </p>
                                )}

                                <ul className="mt-5 space-y-2.5">
                                    {incluye.map((item) => (
                                        <li key={item} className={`flex items-start gap-2.5 text-sm ${o.destacado ? "text-cream/85" : "text-ink/85"}`}>
                                            <Check />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 border-t border-dashed pt-5" style={{ borderColor: o.destacado ? "rgba(255,255,255,0.15)" : "rgba(27,26,24,0.12)" }}>
                                    <p className={`text-sm line-through ${o.destacado ? "text-cream/50" : "text-olive/60"}`}>
                                        Antes: ${o.antes}
                                    </p>
                                    <p className={`mt-1 font-[family-name:var(--font-italiana)] text-4xl ${o.destacado ? "text-gold" : "text-ink"}`}>
                                        ${o.ahora}
                                    </p>
                                </div>

                                <a
                                    href="#agendar"
                                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-300 ${
                                        o.destacado
                                            ? "bg-gold text-white hover:bg-white hover:text-ink"
                                            : "bg-ink text-white hover:bg-gold"
                                    }`}
                                >
                                    Agendar evaluación
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ CONDICIONES ============ */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-3xl px-5 lg:px-8">
                    <h2 className="mb-6 text-center font-[family-name:var(--font-italiana)] text-2xl text-ink sm:text-3xl">
                        Condiciones
                    </h2>
                    <ul className="space-y-3 rounded-2xl border border-sand bg-cream p-7">
                        {condiciones.map((c) => (
                            <li key={c} className="flex items-start gap-3 text-sm leading-relaxed text-ink/85">
                                <Check />
                                {c}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ============ AGENDA: EVALUACIÓN GRATUITA (Klga. Keren Matus) ============ */}
            <section id="agendar" className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-ink to-[#26231e] py-16 text-white">
                <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
                <div className="relative z-10 mx-auto max-w-3xl px-5 lg:px-8">
                    <div className="mb-8 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                            <span className="h-px w-6 bg-gold/50" />
                            Evaluación gratuita
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl sm:text-4xl">
                            Agenda tu evaluación con la kinesióloga
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-cream/80">
                            Elige el día y la hora directamente. La evaluación no tiene costo y define el programa indicado para ti.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl shadow-ink/40">
                        <ReservaClinios agendaUrl={AGENDA_KEREN} title="Evaluación gratuita — Lipedema" loadDirectly bare />
                    </div>

                    <p className="mt-5 text-center text-sm text-cream/70">
                        ¿Prefieres coordinar por WhatsApp?{" "}
                        <a
                            href={waLink("Hola, quiero agendar mi evaluación gratuita para el Programa Mes del Lipedema.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-gold underline underline-offset-2 hover:text-white"
                        >
                            Escríbenos aquí
                        </a>
                        .
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
