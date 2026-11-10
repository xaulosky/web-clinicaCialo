import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import AcademyForm from "./AcademyForm";

export const metadata: Metadata = {
    title: { absolute: "CIALO Academy | Clínica CIALO" },
    description:
        "Regístrate en CIALO Academy y recibe el material de la Masterclass de Láser CO₂ dictada por el Dr. Nicolás Laucirica en Concepción, además de acceso preferente a próximos entrenamientos.",
    alternates: { canonical: "https://cialo.cl/academy" },
    openGraph: {
        title: "CIALO Academy | Masterclass Láser CO₂ — Concepción",
        description:
            "Formación en láser CO₂ para profesionales de la salud estética. Déjanos tus datos y recibe el material de la clase.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/academy",
    },
};

const PILARES = [
    {
        titulo: "Formación clínica real",
        texto: "Protocolos, parámetros y casos reales aplicados en Clínica CIALO, no solo teoría.",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
    },
    {
        titulo: "Tecnología de vanguardia",
        texto: "Experiencia directa con láser CO₂ fraccionado y los protocolos que usamos a diario.",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        titulo: "Comunidad de profesionales",
        texto: "Sé parte de la red CIALO Academy: novedades, próximos cursos y formación continua.",
        icon: (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
    },
];

export default function AcademyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <Navbar transparent />

            {/* ── HERO ── */}
            <header className="relative overflow-hidden bg-ink pb-36 pt-28 text-white sm:pb-44 sm:pt-36">
                <div className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-gold/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-8">
                    <p className="mb-4 font-[family-name:var(--font-italiana)] text-sm uppercase tracking-[0.45em] text-gold">
                        Cialo Academy
                    </p>

                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                        Clase presencial · Concepción
                    </span>

                    <h1 className="font-[family-name:var(--font-italiana)] text-5xl leading-tight sm:text-6xl lg:text-7xl">
                        Masterclass<br />Láser CO₂
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
                        Déjanos tus datos y recibe el material de apoyo de la clase,
                        además de acceso preferente a los próximos entrenamientos de CIALO Academy.
                    </p>

                    {/* Relator */}
                    <div className="mx-auto mt-8 inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 py-2.5 pl-3 pr-7 backdrop-blur-sm">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gold/60">
                            <Image
                                src="/profesionales/thumb/clinica-cialo_Nicolas_Laucirica.webp"
                                alt="Dr. Nicolás Laucirica"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-white">Dr. Nicolás Laucirica</p>
                            <p className="text-[11px] text-gold">Director Clínico · Clínica CIALO</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── FORM (superpuesto al hero) ── */}
            <div className="relative z-20 mx-auto -mt-24 w-full max-w-2xl px-5 sm:-mt-28 lg:px-0">
                <AcademyForm />
            </div>

            {/* ── PILARES ── */}
            <section className="mx-auto w-full max-w-5xl px-5 py-16 lg:px-8">
                <div className="grid gap-4 sm:grid-cols-3">
                    {PILARES.map((p) => (
                        <div key={p.titulo} className="rounded-2xl border border-sand bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold-dark">
                                {p.icon}
                            </div>
                            <h3 className="font-[family-name:var(--font-italiana)] text-lg text-ink">{p.titulo}</h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-olive">{p.texto}</p>
                        </div>
                    ))}
                </div>

                <p className="mt-10 text-center text-xs text-olive/40">
                    Tus datos se usan exclusivamente para enviarte material educativo y novedades de CIALO Academy.
                    No compartimos tu información con terceros.
                </p>
            </section>

            <Footer />
        </div>
    );
}
