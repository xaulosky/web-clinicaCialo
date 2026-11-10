"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { tratamientosData } from "@/data/tratamientos";
import { categoriasData } from "@/data/categorias";

export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState("");

    // Combine searchable items
    const searchableItems = useMemo(() => {
        const items: { name: string; href: string; type: string; description?: string }[] = [];

        // Add categories
        categoriasData.forEach((cat) => {
            items.push({
                name: cat.titulo,
                href: `/tratamientos/categoria/${cat.slug}`,
                type: "Categoría",
                description: cat.descripcion.slice(0, 80) + "..."
            });
        });

        // Add treatments
        tratamientosData.forEach((t) => {
            items.push({
                name: t.nombre,
                href: `/tratamientos/${t.id}`,
                type: t.categoria,
                description: t.descripcion.slice(0, 80) + "..."
            });
        });

        // Add static pages
        const staticPages = [
            { name: "Inicio", href: "/", type: "Página" },
            { name: "Nosotros", href: "/nosotros", type: "Página" },
            { name: "Contacto", href: "/contacto", type: "Página" },
            { name: "Blog", href: "/blog", type: "Página" },
            { name: "Productos", href: "/productos", type: "Página" },
            { name: "Profesionales", href: "/profesionales", type: "Página" },
            { name: "Depilación Láser Los Ángeles", href: "/depilacion-laser-los-angeles", type: "Página" },
        ];
        items.push(...staticPages);

        return items;
    }, []);

    // Filter results based on search query
    const filteredResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return searchableItems
            .filter((item) =>
                item.name.toLowerCase().includes(query) ||
                item.type.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query)
            )
            .slice(0, 8);
    }, [searchQuery, searchableItems]);

    const popularLinks = [
        { name: "Tratamientos Faciales", href: "/tratamientos/categoria/facial" },
        { name: "Depilación Láser", href: "/tratamientos/depilacion-laser" },
        { name: "Botox", href: "/tratamientos/toxina-tercio-superior" },
        { name: "Profesionales", href: "/profesionales" },
        { name: "Contacto", href: "/contacto" },
    ];

    return (
        <div className="min-h-screen bg-[#1b1a18] flex flex-col">
            {/* Header */}
            <header className="py-6 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link href="/">
                        <Image
                            src="/logo-cialo.png"
                            alt="Clínica Cialo"
                            width={174}
                            height={40}
                            style={{ height: "2.5rem", width: "auto" }}
                            className="h-10 w-auto brightness-0 invert"
                        />
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full text-center">
                    {/* 404 Illustration */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#b8935f]/10 mb-6">
                            <span className="text-6xl font-[family-name:var(--font-italiana)] text-[#b8935f]">404</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-white mb-4">
                            Página No Encontrada
                        </h1>
                        <p className="text-[#cbcfd1] text-lg mb-8">
                            Lo sentimos, la página que buscas no existe o ha sido movida.
                        </p>
                    </div>

                    {/* Search Box */}
                    <div className="relative mb-8">
                        <div className="relative">
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#888]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar tratamientos, páginas..."
                                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm text-white placeholder-[#888] focus:outline-none focus:ring-2 focus:ring-[#b8935f] focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Search Results Dropdown */}
                        {filteredResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-2xl overflow-hidden z-10">
                                {filteredResults.map((result, index) => (
                                    <Link
                                        key={index}
                                        href={result.href}
                                        className="flex items-start gap-3 p-4 hover:bg-[#faf6ef] transition-colors border-b border-gray-100 last:border-0"
                                    >
                                        <span className="text-xs font-semibold uppercase text-[#b8935f] bg-[#b8935f]/10 px-2 py-1 rounded">
                                            {result.type}
                                        </span>
                                        <div className="flex-1 text-left">
                                            <span className="block text-[#1b1a18] font-medium">{result.name}</span>
                                            {result.description && (
                                                <span className="block text-sm text-[#666] mt-1">{result.description}</span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* No Results Message */}
                        {searchQuery.trim() && filteredResults.length === 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-sm shadow-2xl p-6 text-center">
                                <p className="text-[#666]">No se encontraron resultados para &quot;{searchQuery}&quot;</p>
                            </div>
                        )}
                    </div>

                    {/* Popular Links */}
                    <div className="mb-10">
                        <p className="text-[#888] text-sm mb-4">O visita nuestras páginas populares:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {popularLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 bg-white/5 border border-white/10 text-white/80 text-sm rounded-sm hover:bg-[#b8935f] hover:text-[#1b1a18] hover:border-[#b8935f] transition-all duration-300"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Back to Home CTA */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Volver al Inicio
                    </Link>

                    {/* Contact Info */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <p className="text-[#888] text-sm mb-3">¿Necesitas ayuda?</p>
                        <a
                            href="https://wa.me/56982028473"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#25d366] hover:underline"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Escríbenos por WhatsApp
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center text-[#888] text-sm">
                    © {new Date().getFullYear()} Clínica Cialo — Medicina Estética en Los Ángeles, Chile
                </div>
            </footer>
        </div>
    );
}
