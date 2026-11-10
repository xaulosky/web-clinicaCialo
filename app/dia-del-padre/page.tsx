import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Día del Padre | Promociones para Él | Clínica CIALO" },
    description:
        "Promociones de Día del Padre en Clínica CIALO, Los Ángeles: rostro, capilar, rejuvenecimiento masculino, depilación, reductivos y relajación. Regálale bienestar. Cupos limitados.",
    alternates: { canonical: "/dia-del-padre" },
    openGraph: {
        title: "Día del Padre | Promociones para Él | Clínica CIALO",
        description:
            "Regálale bienestar este Día del Padre: rostro, capilar, rejuvenecimiento masculino, depilación, reductivos y relajación. Cupos limitados.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/dia-del-padre",
    },
};

const WHATSAPP = "56982028473";
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

type Item = { texto: string; precio?: string; sesiones?: string };
type Promo = { num: string; titulo: string; subtitulo?: string; tipo: keyof typeof ICONS; items: Item[]; precio?: string; destacado?: boolean };

const ICONS = {
    facial: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    capilar: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
    urologia: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    corporal: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    reductivo: "M13 10V3L4 14h7v7l9-11h-7z",
    relajacion: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
} as const;

const promos: Promo[] = [
    {
        num: "01",
        titulo: "Rostro",
        tipo: "facial",
        items: [
            { texto: "Toxina botulínica 3 zonas" },
            { texto: "Depilación láser barba o limpieza facial simple", sesiones: "1 sesión" },
            { texto: "Láser CoolPeel o CO₂", sesiones: "1 sesión" },
        ],
        precio: "399.000",
        destacado: true,
    },
    {
        num: "02",
        titulo: "Capilar",
        tipo: "capilar",
        items: [
            { texto: "Hasta 10% de descuento en tratamientos capilares" },
            { texto: "Hasta 15% de descuento en injerto capilar" },
        ],
    },
    {
        num: "03",
        titulo: "Rejuvenecimiento masculino",
        tipo: "urologia",
        items: [
            { texto: "Agrandamiento", precio: "750.000" },
            { texto: "20% de descuento en consulta urológica" },
            { texto: "Vasectomía", precio: "490.000" },
        ],
    },
    {
        num: "04",
        titulo: "Corporal",
        subtitulo: "Depilación láser masculina",
        tipo: "corporal",
        items: [
            { texto: "Espalda completa + hombros", precio: "150.000", sesiones: "6 sesiones" },
            { texto: "Pecho + abdomen", precio: "160.000", sesiones: "6 sesiones" },
            { texto: "Perfilado de barba + cuello", precio: "99.000", sesiones: "8 sesiones" },
            { texto: "Barba completa + orejas", precio: "119.000" },
        ],
    },
    {
        num: "05",
        titulo: "Reductivos",
        tipo: "reductivo",
        items: [
            { texto: "Reductor de pectoral", precio: "399.990", sesiones: "8 sesiones" },
            { texto: "Tonificación de abdomen — Embody + Exilis", precio: "563.300", sesiones: "8 sesiones c/u" },
            { texto: "Full reductivo — 3 Scizer + 5 Exilis + 8 Embody", precio: "949.990" },
        ],
    },
    {
        num: "06",
        titulo: "Relajación",
        tipo: "relajacion",
        items: [
            { texto: "Limpieza facial profunda + masaje de relajación facial", precio: "59.990" },
            { texto: "Limpieza HydraFacial + masaje de relajación facial", precio: "99.000" },
        ],
    },
];

const condiciones = [
    "Promociones válidas por el Día del Padre, por tiempo limitado.",
    "Cupos limitados.",
    "Valores no acumulables con otras promociones.",
    "Sujeto a evaluación según el tratamiento.",
];

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
        { "@type": "ListItem", position: 2, name: "Día del Padre", item: "https://cialo.cl/dia-del-padre" },
    ],
};

function Check() {
    return (
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function DiaDelPadrePage() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <Navbar transparent />

            {/* ============ HERO ============ */}
            <header className="relative overflow-hidden bg-gradient-to-br from-ink via-[#26231e] to-ink pt-28 pb-16 text-white sm:pt-32 sm:pb-20">
                <div className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-gold/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-goldlt/5 blur-3xl" />

                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:gap-14 lg:px-8">
                    {/* Texto */}
                    <div className="text-center lg:text-left">
                        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-gold">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                            Día del Padre
                        </span>
                        <h1 className="font-[family-name:var(--font-italiana)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
                            Regálale bienestar
                        </h1>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg lg:mx-0">
                            6 promociones pensadas para él: rostro, capilar, rejuvenecimiento masculino,
                            depilación, reductivos y relajación.
                        </p>

                        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-cream/75 lg:justify-start">
                            <li className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Especialistas certificados
                            </li>
                            <li className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Hasta 20% de descuento
                            </li>
                            <li className="inline-flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Cupos limitados
                            </li>
                        </ul>

                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                            <a
                                href="#promos"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/30 transition-colors duration-300 hover:bg-white hover:text-ink sm:w-auto"
                            >
                                Ver promociones
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                            <a
                                href={waLink("Hola, quiero información sobre las promociones de Día del Padre.")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink sm:w-auto"
                            >
                                Consultar
                            </a>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-ink/50">
                            <img
                                src="/promociones/dia-del-padre.webp"
                                alt="Hombre recibiendo un tratamiento estético en Clínica CIALO, Los Ángeles"
                                className="aspect-[4/3] w-full object-cover"
                            />
                        </div>
                        <span className="absolute -bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-ink shadow-xl lg:-left-4">
                            Hasta 20% OFF
                        </span>
                    </div>
                </div>
            </header>

            {/* ============ PROMOS ============ */}
            <section id="promos" className="scroll-mt-24 bg-cream py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            6 promociones
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            Elige su regalo ideal
                        </h2>
                    </div>

                    <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {promos.map((p) => (
                            <div
                                key={p.num}
                                className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink/[0.06] ${
                                    p.destacado ? "ring-2 ring-gold" : "ring-1 ring-ink/[0.08]"
                                }`}
                            >
                                {p.destacado && (
                                    <span className="absolute right-4 top-4 z-10 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                                        Más regalada
                                    </span>
                                )}

                                {/* Cabecera */}
                                <div className="flex items-center gap-4 bg-gradient-to-br from-cream to-white px-7 pb-5 pt-7">
                                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gold/25 transition-all duration-300 group-hover:bg-gold group-hover:ring-gold">
                                        <svg className="h-7 w-7 text-gold transition-colors duration-300 group-hover:text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={ICONS[p.tipo]} />
                                        </svg>
                                    </span>
                                    <div className="min-w-0">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">Promoción {p.num}</span>
                                        <h3 className="font-[family-name:var(--font-italiana)] text-2xl leading-tight text-ink">{p.titulo}</h3>
                                        {p.subtitulo && <p className="text-[11px] uppercase tracking-wider text-olive/80">{p.subtitulo}</p>}
                                    </div>
                                </div>

                                {/* Cuerpo */}
                                <div className="flex flex-1 flex-col px-7 pb-7 pt-5">
                                    <ul className="space-y-3">
                                        {p.items.map((it, i) => (
                                            <li key={i} className="flex items-start justify-between gap-3 text-sm">
                                                <span className="flex items-start gap-2.5 text-ink/85">
                                                    <Check />
                                                    <span className="leading-snug">
                                                        {it.texto}
                                                        {it.sesiones && <span className="text-xs text-olive/60"> · {it.sesiones}</span>}
                                                    </span>
                                                </span>
                                                {it.precio && <span className="shrink-0 font-semibold text-ink">${it.precio}</span>}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-auto pt-6">
                                        {p.precio && (
                                            <div className="mb-4 flex items-center justify-between rounded-2xl bg-cream px-5 py-3.5">
                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-olive">Pack completo</span>
                                                <span className="font-[family-name:var(--font-italiana)] text-3xl leading-none text-gold-dark">${p.precio}</span>
                                            </div>
                                        )}

                                        <a
                                            href={waLink(`Hola, me interesa la promo de Día del Padre: ${p.titulo}.`)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-gold"
                                        >
                                            Consultar / Agendar
                                            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
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

            {/* ============ CTA FINAL ============ */}
            <section className="relative overflow-hidden bg-gradient-to-br from-ink to-[#26231e] py-16 text-center text-white">
                <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
                <div className="relative z-10 mx-auto max-w-2xl px-5 lg:px-8">
                    <h2 className="font-[family-name:var(--font-italiana)] text-3xl sm:text-4xl">Sorpréndelo este Día del Padre</h2>
                    <p className="mx-auto mt-3 max-w-xl text-cream/80">
                        Escríbenos y te ayudamos a elegir la promoción ideal y a agendar su hora.
                    </p>
                    <a
                        href={waLink("Hola, quiero información sobre las promociones de Día del Padre.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/30 transition-colors duration-300 hover:bg-white hover:text-ink"
                    >
                        Consultar por WhatsApp
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
