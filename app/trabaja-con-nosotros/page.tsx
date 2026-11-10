import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import TrabajaForm from "./TrabajaForm";

export const metadata: Metadata = {
    title: { absolute: "Trabaja con Nosotros | Clínica CIALO Los Ángeles" },
    description:
        "Postula a Clínica CIALO en Los Ángeles, Biobío. Buscamos profesionales de la salud y la estética. Envía tus datos y tu CV para futuras búsquedas.",
    alternates: { canonical: "https://cialo.cl/trabaja-con-nosotros" },
    openGraph: {
        title: "Trabaja con Nosotros | Clínica CIALO",
        description: "Únete al equipo de Clínica CIALO. Envía tu postulación y tu CV.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/trabaja-con-nosotros",
    },
};

const PILARES = [
    {
        titulo: "Equipo de excelencia",
        texto: "Trabaja junto a médicos y especialistas de referencia en medicina estética del Biobío.",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    },
    {
        titulo: "Tecnología de vanguardia",
        texto: "Equipamiento e infraestructura de primer nivel para que desarrolles tu especialidad.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
        titulo: "Crecimiento continuo",
        texto: "Formación, capacitación y un entorno que impulsa tu desarrollo profesional.",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    },
];

export default function TrabajaConNosotrosPage() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <Navbar transparent />

            {/* ── HERO ── */}
            <header className="relative overflow-hidden bg-ink pb-36 pt-28 text-white sm:pb-44 sm:pt-36">
                <div className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-gold/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-8">
                    <nav className="mb-8 flex items-center justify-center gap-2 text-xs text-cream/40" aria-label="Breadcrumb">
                        <Link href="/" className="transition-colors hover:text-gold">Inicio</Link>
                        <span>/</span>
                        <span className="text-gold">Trabaja con Nosotros</span>
                    </nav>

                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                        Únete al equipo
                    </span>

                    <h1 className="font-[family-name:var(--font-italiana)] text-5xl leading-tight sm:text-6xl lg:text-7xl">
                        Trabaja con Nosotros
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
                        En Clínica CIALO buscamos personas que comparten nuestra pasión por la excelencia
                        y el trato cercano. Déjanos tus datos y tu CV — los guardamos para nuestras próximas búsquedas.
                    </p>
                </div>
            </header>

            {/* ── FORM (superpuesto al hero) ── */}
            <div className="relative z-20 mx-auto -mt-24 w-full max-w-2xl px-5 sm:-mt-28 lg:px-0">
                <TrabajaForm />
            </div>

            {/* ── PILARES ── */}
            <section className="mx-auto w-full max-w-5xl px-5 py-16 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-3">
                    {PILARES.map((p) => (
                        <div key={p.titulo} className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                                </svg>
                            </div>
                            <h3 className="font-[family-name:var(--font-italiana)] text-lg text-ink">{p.titulo}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-olive">{p.texto}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
