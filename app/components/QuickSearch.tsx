"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { tratamientosData, Tratamiento } from "@/data/tratamientos";
import { trackSearch } from "@/lib/fbpixel";

/**
 * Normaliza un texto para búsqueda:
 * - Convierte a minúsculas
 * - Elimina tildes y diacríticos
 * - Elimina caracteres especiales que no sean alfanuméricos ni espacios
 */
function normalizeText(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "");
}

/**
 * Verifica si todas las palabras del query están presentes en al menos uno de los campos proporcionados.
 */
function matchesSearch(item: Tratamiento, rawQuery: string): boolean {
    if (!rawQuery.trim()) return true;

    const queryWords = normalizeText(rawQuery).split(/\s+/).filter(Boolean);
    if (queryWords.length === 0) return true;

    const normalizedNombre = normalizeText(item.nombre);
    const normalizedProfesional = normalizeText(item.profesional);
    const normalizedTags = item.tags.map((tag) => normalizeText(tag));
    const normalizedProblematicas = (item.problematicas || []).map((p) => normalizeText(p));
    const normalizedSubcategoria = normalizeText(item.subcategoria);
    const normalizedDescripcion = normalizeText(item.descripcion);
    const normalizedCategoria = normalizeText(item.categoria);

    return queryWords.every((word) =>
        normalizedNombre.includes(word) ||
        normalizedProfesional.includes(word) ||
        normalizedTags.some((tag) => tag.includes(word)) ||
        normalizedProblematicas.some((p) => p.includes(word)) ||
        normalizedSubcategoria.includes(word) ||
        normalizedDescripcion.includes(word) ||
        normalizedCategoria.includes(word)
    );
}

// Categorías con iconos
const categoryIcons: Record<string, string> = {
    "Facial": "M12 6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V8c0-1.1-.9-2-2-2z",
    "Corporal": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    "Capilar": "M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z",
    "Urologia": "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    "Ginecoestetica": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    "Nutricion": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z",
    "default": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
};

export default function QuickSearch() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Tratamiento[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
                setHighlightedIndex(-1);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    // Debounced search with loading state
    useEffect(() => {
        const trimmed = query.trim();
        if (trimmed.length > 0) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                const filtered = tratamientosData
                    .filter((t) => matchesSearch(t, trimmed))
                    .slice(0, 8);
                setSuggestions(filtered);
                setShowSuggestions(true);
                setHighlightedIndex(-1);
                setIsLoading(false);
            }, 150);
            return () => {
                clearTimeout(timer);
                setIsLoading(false);
            };
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setHighlightedIndex(-1);
            setIsLoading(false);
        }
    }, [query]);

    const handleSearch = useCallback((e?: React.FormEvent) => {
        e?.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            trackSearch(trimmed); // Meta Pixel: evento Search
            setShowSuggestions(false);
            setHighlightedIndex(-1);
            router.push(`/tratamientos?search=${encodeURIComponent(trimmed)}`);
            inputRef.current?.blur();
        }
    }, [query, router]);

    const handleSuggestionClick = useCallback((treatment: Tratamiento) => {
        router.push(`/tratamientos/${treatment.id}`);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
    }, [router]);

    // Keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions || suggestions.length === 0) {
            if (e.key === "Enter") {
                handleSearch();
            }
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : suggestions.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[highlightedIndex]);
                } else {
                    handleSearch();
                }
                break;
            case "Escape":
                setShowSuggestions(false);
                setHighlightedIndex(-1);
                inputRef.current?.blur();
                break;
        }
    }, [showSuggestions, suggestions, highlightedIndex, handleSuggestionClick, handleSearch]);

    const formatPrice = (price: number | null): string => {
        if (!price) return "";
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getCategoryIcon = (category: string): string => {
        return categoryIcons[category] || categoryIcons["default"];
    };

    const popularSearches = [
        { label: "Botox", query: "Botox" },
        { label: "Ácido Hialurónico", query: "Ácido Hialurónico" },
        { label: "Depilación Láser", query: "Depilación" },
        { label: "Rinomodelación", query: "Rinomodelación" },
        { label: "Cool Peel", query: "Cool Peel" },
        { label: "Exilis", query: "Exilis" },
    ];

    return (
        <div ref={wrapperRef} className="w-full max-w-2xl mx-auto relative group animate-fade-in-up delay-100">
            <form onSubmit={handleSearch} className="relative z-20">
                <div className="relative flex items-center">
                    <div className="absolute left-4 text-white/60 group-focus-within:text-gold transition-colors z-10">
                        <svg
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => {
                            if (query.trim().length > 0) setShowSuggestions(true);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Busca tratamientos, problemas o tecnologías..."
                        className={`w-full pl-12 sm:pl-14 pr-24 sm:pr-32 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:border-gold focus:ring-2 focus:ring-gold/30 transition-all duration-300 shadow-lg text-base sm:text-lg ${showSuggestions && suggestions.length > 0 ? 'rounded-t-2xl sm:rounded-t-3xl rounded-b-none' : 'rounded-full'}`}
                    />
                    {/* Loading indicator */}
                    {isLoading && (
                        <div className="absolute right-16 sm:right-24 z-10">
                            <svg className="animate-spin h-5 w-5 text-[#b8935f]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={!query.trim()}
                        className="absolute right-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-gold text-white font-semibold rounded-full hover:bg-white hover:text-ink transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase text-xs sm:text-sm tracking-wider z-10"
                    >
                        Buscar
                    </button>
                </div>
            </form>

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-x border-b border-sand rounded-b-2xl sm:rounded-b-3xl shadow-2xl overflow-hidden z-10 transition-all">
                    <ul className="max-h-80 overflow-y-auto custom-scrollbar">
                        {suggestions.map((treatment, index) => (
                            <li key={treatment.id}>
                                <button
                                    type="button"
                                    onClick={() => handleSuggestionClick(treatment)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    className={`w-full text-left px-4 sm:px-6 py-3 transition-colors flex items-center justify-between group/item cursor-pointer ${
                                        highlightedIndex === index
                                            ? 'bg-gold/15'
                                            : 'hover:bg-gold/10'
                                    }`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="block text-ink font-medium text-sm sm:text-base truncate">
                                                {treatment.nombre}
                                            </span>
                                            {treatment.valorDesde && (
                                                <span className="hidden sm:inline text-xs text-gold font-semibold whitespace-nowrap">
                                                    {formatPrice(treatment.valorDesde)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="text-xs text-olive/70 font-light">
                                                {treatment.categoria}
                                            </span>
                                            {treatment.duracion && (
                                                <>
                                                    <span className="text-olive/40">·</span>
                                                    <span className="text-xs text-olive/70 font-light flex items-center gap-1">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {treatment.duracion}
                                                    </span>
                                                </>
                                            )}
                                            {treatment.valorDesde && (
                                                <span className="sm:hidden text-xs text-gold font-semibold">
                                                    {formatPrice(treatment.valorDesde)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <svg className={`w-4 h-4 text-gold transition-all duration-200 flex-shrink-0 ml-2 ${
                                        highlightedIndex === index
                                            ? 'opacity-100 translate-x-0'
                                            : 'opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0'
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-cream/80 px-4 py-3 text-center border-t border-sand">
                        <button
                            onClick={() => handleSearch()}
                            className="text-sm text-olive hover:text-gold transition-colors font-medium flex items-center justify-center gap-2 w-full"
                        >
                            <span>Ver todos los resultados para "{query}"</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {/* No results state */}
            {showSuggestions && query.trim().length > 0 && suggestions.length === 0 && !isLoading && (
                <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-x border-b border-sand rounded-b-2xl sm:rounded-b-3xl shadow-2xl overflow-hidden z-10 p-6 text-center">
                    <svg className="w-10 h-10 text-olive/30 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-olive text-sm mb-2">No encontramos resultados para "{query}"</p>
                    <button
                        onClick={() => handleSearch()}
                        className="text-gold hover:text-ink text-sm font-medium transition-colors"
                    >
                        Ver todos los tratamientos
                    </button>
                </div>
            )}

            {/* Popular searches suggestions */}
            <div className={`absolute top-full left-0 right-0 pt-3 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs text-white/70 transition-opacity duration-300 z-0 ${showSuggestions && suggestions.length > 0 ? 'opacity-0 pointer-events-none' : 'opacity-0 group-focus-within:opacity-100'}`}>
                <span className="text-white/50">Populares:</span>
                {popularSearches.map((item) => (
                    <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                            setQuery(item.query);
                            setShowSuggestions(true);
                        }}
                        className="hover:text-gold hover:underline transition-colors"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
