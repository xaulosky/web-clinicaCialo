import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CasosClinicosClient from "./CasosClinicosClient";

export const metadata: Metadata = {
    title: { absolute: "Casos Clínicos | Resultados Reales | Clínica CIALO Los Ángeles" },
    description:
        "Galería de casos clínicos reales de Clínica CIALO, Los Ángeles. Resultados antes y después de rellenos, borrado de tatuajes, rejuvenecimiento facial y más. Identidades protegidas.",
    alternates: { canonical: "https://cialo.cl/casos-clinicos" },
    openGraph: {
        title: "Casos Clínicos | Resultados Reales | Clínica CIALO",
        description: "Galería de resultados reales de nuestros tratamientos estéticos en Los Ángeles, Biobío.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/casos-clinicos",
    },
};

export default function CasosClinicosPage() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
                            { "@type": "ListItem", position: 2, name: "Casos Clínicos", item: "https://cialo.cl/casos-clinicos" },
                        ],
                    }),
                }}
            />
            <Navbar transparent />

            {/* ── HERO ── */}
            <header className="relative overflow-hidden bg-ink pb-16 pt-28 text-white sm:pb-20 sm:pt-36">
                <div className="pointer-events-none absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-gold/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-gold/5 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-4xl px-5 text-center lg:px-8">
                    <nav className="mb-8 flex items-center justify-center gap-2 text-xs text-cream/40" aria-label="Breadcrumb">
                        <Link href="/" className="transition-colors hover:text-gold">Inicio</Link>
                        <span>/</span>
                        <span className="text-gold">Casos Clínicos</span>
                    </nav>

                    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-gold">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                        Resultados reales
                    </span>

                    <h1 className="font-[family-name:var(--font-italiana)] text-5xl leading-tight sm:text-6xl lg:text-7xl">
                        Casos Clínicos
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-cream/70 sm:text-lg">
                        Resultados antes y después de pacientes reales tratados en Clínica CIALO.
                        Cada caso refleja nuestro compromiso con la excelencia y la naturalidad.
                    </p>
                </div>
            </header>

            {/* ── CONTENIDO INTERACTIVO (filtro + galería) ── */}
            <CasosClinicosClient />

            <Footer />
        </div>
    );
}
