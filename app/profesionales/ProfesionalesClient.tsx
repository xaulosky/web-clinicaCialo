"use client";

import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { profesionalesData } from "@/data/profesionales";
import ProfesionalCard from "../components/ProfesionalCard";

// Todos los videos de los profesionales
const allVideos = profesionalesData
    .filter((p) => p.videos && p.videos.length > 0)
    .flatMap((p) => p.videos!.map((v) => ({
        ...v,
        profesionalId: p.id,
        profesionalNombre: `${p.titulo} ${p.nombre} ${p.apellido}`.trim()
    })));

// Categorías únicas
const categories = ["Todas", ...Array.from(new Set(profesionalesData.map(p => p.categoria)))];

const stats = [
    { value: `${profesionalesData.length}+`, label: "Profesionales" },
    { value: "100K+", label: "Procedimientos" },
    { value: "10+", label: "Años de experiencia" },
    { value: `${categories.length - 1}`, label: "Especialidades" },
];

export default function ProfesionalesPage() {
    const [activeFilter, setActiveFilter] = useState("Todas");

    const filteredProfesionales = useMemo(() => {
        if (activeFilter === "Todas") return profesionalesData;
        return profesionalesData.filter(p => p.categoria === activeFilter);
    }, [activeFilter]);

    return (
        <div className="flex flex-col min-h-screen bg-cream">
            <Navbar transparent />

            {/* Hero con estadísticas */}
            <header className="relative bg-gradient-to-br from-ink via-[#2a2622] to-ink text-white py-20 pt-[128px] overflow-hidden">
                {/* Halo dorado decorativo */}
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center relative z-10 w-full">
                    <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-5 block">
                        Nuestro equipo
                    </span>
                    <h1 className="text-5xl md:text-6xl font-[family-name:var(--font-italiana)] leading-tight mb-6">
                        Profesionales
                    </h1>
                    <p className="text-cream/70 font-light max-w-2xl mx-auto text-lg leading-relaxed mb-14">
                        Expertos dedicados a realzar tu belleza natural con los más altos
                        estándares de excelencia médica.
                    </p>

                    {/* Estadísticas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-10 border-t border-white/10 max-w-4xl mx-auto">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <span className="block text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-gold">
                                    {stat.value}
                                </span>
                                <p className="text-cream/60 text-sm mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* Filtros */}
            <div className="bg-cream/80 backdrop-blur-md border-b border-sand sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4">
                    <div className="flex flex-wrap justify-center gap-2.5">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                aria-pressed={activeFilter === cat}
                                className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 ${activeFilter === cat
                                    ? "bg-ink text-white border-ink shadow-md"
                                    : "bg-transparent text-olive border-sand hover:border-gold hover:text-gold"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de profesionales */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-24 flex-grow w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {filteredProfesionales.map((profesional, index) => (
                        <ProfesionalCard key={profesional.id} profesional={profesional} index={index} />
                    ))}
                </div>

                {/* Sección de videos */}
                {allVideos.length > 0 && (
                    <section className="mt-24">
                        <div className="text-center mb-14">
                            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                                Contenido educativo
                            </span>
                            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-ink mb-4 leading-tight">
                                Videos de nuestros profesionales
                            </h2>
                            <p className="text-olive max-w-2xl mx-auto leading-relaxed">
                                Conoce más sobre los tratamientos y procedimientos explicados directamente por nuestros especialistas.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {allVideos.map((video) => (
                                <div key={video.id} className="bg-white rounded-2xl overflow-hidden border border-ink/10 shadow-sm hover:shadow-xl transition-all duration-300">
                                    <div className="aspect-video relative bg-ink">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                                            title={video.titulo}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="w-full h-full"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <Link
                                            href={`/profesionales/${video.profesionalId}`}
                                            className="text-gold text-xs font-semibold uppercase tracking-wider hover:text-ink transition-colors mb-2 inline-block"
                                        >
                                            {video.profesionalNombre}
                                        </Link>
                                        <h3 className="font-semibold text-ink mb-2 line-clamp-2 leading-snug">
                                            {video.titulo}
                                        </h3>
                                        {video.descripcion && (
                                            <p className="text-sm text-olive line-clamp-2 leading-relaxed">
                                                {video.descripcion}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Sección CTA */}
                <div className="mt-24">
                    <div className="bg-white p-12 lg:p-16 rounded-2xl border border-ink/10 shadow-sm max-w-3xl mx-auto text-center">
                        <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                            Únete a CIALO
                        </span>
                        <h3 className="font-[family-name:var(--font-italiana)] text-3xl md:text-4xl text-ink mb-4 leading-tight">
                            ¿Quieres unirte a nuestro equipo?
                        </h3>
                        <p className="text-olive mb-8 max-w-xl mx-auto leading-relaxed">
                            Si eres un profesional de la salud con experiencia en medicina
                            estética, nos encantaría conocerte.
                        </p>
                        <a
                            href="mailto:contacto@cialo.cl"
                            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider rounded-full hover:bg-ink transition-colors duration-300"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            Contáctanos
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
