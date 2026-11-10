import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AgendarBooking from "./AgendarBooking";

export const metadata: Metadata = {
    title: { absolute: "Agenda tu hora online | Clínica CIALO" },
    description:
        "Agenda tu hora online en Clínica CIALO, Los Ángeles. Elige tu tratamiento, profesional, fecha y hora en pocos pasos. Reserva sin llamar y sin crear una cuenta.",
    alternates: {
        canonical: "/agendar",
    },
    openGraph: {
        title: "Agenda tu hora online | Clínica CIALO",
        description:
            "Reserva tu hora en Clínica CIALO en pocos pasos: tratamiento, profesional, fecha y hora. Los Ángeles, Biobío.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/agendar",
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
        { "@type": "ListItem", position: 2, name: "Agendar hora online", item: "https://cialo.cl/agendar" },
    ],
};

export default function AgendarPage() {
    return (
        <div className="flex flex-col min-h-screen bg-cream">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Navbar transparent />

            {/* Header */}
            <header className="relative overflow-hidden bg-ink text-white pt-32 pb-20 sm:pt-36 sm:pb-24">
                {/* Acentos sutiles de fondo */}
                <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-[#26241f]" aria-hidden="true" />
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
                <div className="absolute -bottom-32 -left-20 w-72 h-72 rounded-full bg-goldlt/5 blur-3xl" aria-hidden="true" />

                <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 text-center w-full">
                    <span className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-5">
                        <span className="w-8 h-px bg-gold/60" aria-hidden="true" />
                        Reserva online
                        <span className="w-8 h-px bg-gold/60" aria-hidden="true" />
                    </span>
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] mb-4 leading-tight">
                        Quiero agendar mi hora
                    </h1>
                    <p className="text-cream/70 font-light text-lg max-w-xl mx-auto leading-relaxed">
                        Elijo mi tratamiento, profesional, fecha y hora. Reservar no tiene costo. Me toma menos de un minuto.
                    </p>

                    {/* Señales de confianza */}
                    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 mt-7 text-xs text-cream/70">
                        <li className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <strong className="font-semibold text-white">4.9</strong> · +284 reseñas
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Autorización SEREMI de Salud
                        </li>
                        <li className="inline-flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Hasta 12 cuotas
                        </li>
                    </ul>
                </div>
            </header>

            <main className="flex-grow w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 -mt-10 relative z-20">
                <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(27,26,24,0.08)] border border-ink/10 overflow-hidden">
                    <Suspense fallback={<div className="flex items-center justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" /></div>}>
                        <AgendarBooking />
                    </Suspense>
                </div>
            </main>

            <Footer />
        </div>
    );
}
