"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TreatmentCard from "../components/TreatmentCard";
import TreatmentFilters from "../components/TreatmentFilters";
import { tratamientosData, Tratamiento } from "@/data/tratamientos";
import { trackSearch } from "@/lib/fbpixel";
import { trackSearch as trackSearchOwn } from "@/lib/analytics";

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

    return queryWords.every((word) =>
        normalizedNombre.includes(word) ||
        normalizedProfesional.includes(word) ||
        normalizedTags.some((tag) => tag.includes(word)) ||
        normalizedProblematicas.some((p) => p.includes(word)) ||
        normalizedSubcategoria.includes(word)
    );
}

type SortKey = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: "relevancia", label: "Relevancia" },
    { value: "precio-asc", label: "Menor precio" },
    { value: "precio-desc", label: "Mayor precio" },
    { value: "nombre", label: "Nombre (A-Z)" },
];

function formatPriceShort(value: number): string {
    if (value >= 5000000) return "$5.000.000+";
    return "$" + value.toLocaleString("es-CL");
}

function TratamientosContent() {
    const searchParams = useSearchParams();
    const categoryFromUrl = searchParams.get("categoria");
    const searchParam = searchParams.get("search");

    // Mapa de corrección para URLs (sin tildes -> con tildes/nombre real en data)
    const categoryMapping: Record<string, string> = {
        "Nutricion": "Nutrición",
        "Ginecologico": "Ginecoestética",
        "Urologico": "Urología",
    };

    const initialCategory = categoryFromUrl
        ? (categoryMapping[categoryFromUrl] || categoryFromUrl)
        : null;

    const [selectedCategories, setSelectedCategories] = useState<string[]>(
        initialCategory ? [initialCategory] : []
    );
    const [maxPrice, setMaxPrice] = useState(5000000);
    const [searchQuery, setSearchQuery] = useState(searchParam || "");
    const [filteredTreatments, setFilteredTreatments] =
        useState<Tratamiento[]>(tratamientosData);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [sortBy, setSortBy] = useState<SortKey>("relevancia");


    const [selectedProfessional, setSelectedProfessional] = useState("");
    const [selectedProblems, setSelectedProblems] = useState<string[]>([]);

    // Obtener lista única de profesionales
    const professionals = [
        ...new Set(
            tratamientosData.flatMap((t) =>
                t.profesional.split(" / ").map((p) => p.trim())
            )
        ),
    ].sort();

    // Obtener lista única de problemáticas
    const availableProblems = [
        ...new Set(
            tratamientosData.flatMap((t) => t.problematicas || [])
        ),
    ].sort();

    // Actualizar filtro cuando cambia la categoría en la URL
    useEffect(() => {
        if (categoryFromUrl) {
            const mapped = categoryMapping[categoryFromUrl] || categoryFromUrl;
            setSelectedCategories([mapped]);
        }
    }, [categoryFromUrl]);

    useEffect(() => {
        const filtered = tratamientosData.filter((item) => {
            const matchCat =
                selectedCategories.length === 0 ||
                selectedCategories.includes(item.categoria);

            const itemPrice = item.valorDesde || 0;
            const matchPrice = itemPrice <= maxPrice;

            const matchSearch = matchesSearch(item, searchQuery);

            const matchProfessional =
                selectedProfessional === "" ||
                item.profesional.includes(selectedProfessional);

            const matchProblem =
                selectedProblems.length === 0 ||
                (item.problematicas && item.problematicas.some((p) => selectedProblems.includes(p)));

            return matchCat && matchPrice && matchSearch && matchProfessional && matchProblem;
        });

        setFilteredTreatments(filtered);
    }, [selectedCategories, maxPrice, searchQuery, selectedProfessional, selectedProblems]);

    // Meta Pixel: evento Search (con debounce para no disparar por cada tecla)
    useEffect(() => {
        const q = searchQuery.trim();
        if (q.length < 2) return;
        const timer = setTimeout(() => {
            trackSearch(q);
            // Analítica propia: término + nº de resultados (0 = demanda no cubierta)
            trackSearchOwn(q, filteredTreatments.length);
        }, 800);
        return () => clearTimeout(timer);
    }, [searchQuery, filteredTreatments.length]);

    const resetFilters = () => {
        setSelectedCategories([]);
        setMaxPrice(5000000);
        setSearchQuery("");
        setSelectedProfessional("");
        setSelectedProblems([]);
    };

    // Ordenamiento de los resultados ya filtrados
    const sortedTreatments = useMemo(() => {
        const list = [...filteredTreatments];
        switch (sortBy) {
            case "precio-asc":
                return list.sort((a, b) => (a.valorDesde ?? Infinity) - (b.valorDesde ?? Infinity));
            case "precio-desc":
                return list.sort((a, b) => (b.valorDesde ?? -Infinity) - (a.valorDesde ?? -Infinity));
            case "nombre":
                return list.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
            default:
                return list;
        }
    }, [filteredTreatments, sortBy]);

    // Chips de filtros activos
    const activeChips: { label: string; onRemove: () => void }[] = [
        ...selectedCategories.map((c) => ({
            label: c,
            onRemove: () => setSelectedCategories((prev) => prev.filter((x) => x !== c)),
        })),
        ...(selectedProfessional
            ? [{ label: selectedProfessional, onRemove: () => setSelectedProfessional("") }]
            : []),
        ...selectedProblems.map((p) => ({
            label: p,
            onRemove: () => setSelectedProblems((prev) => prev.filter((x) => x !== p)),
        })),
        ...(searchQuery.trim()
            ? [{ label: `"${searchQuery.trim()}"`, onRemove: () => setSearchQuery("") }]
            : []),
        ...(maxPrice < 5000000
            ? [{ label: `Hasta ${formatPriceShort(maxPrice)}`, onRemove: () => setMaxPrice(5000000) }]
            : []),
    ];

    const filtersEl = (
        <TreatmentFilters
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onReset={resetFilters}
            professionals={professionals}
            selectedProfessional={selectedProfessional}
            onProfessionalChange={setSelectedProfessional}
            availableProblems={availableProblems}
            selectedProblems={selectedProblems}
            onProblemChange={setSelectedProblems}
        />
    );

    return (
        <div className="flex flex-col min-h-screen bg-cream">
            <Navbar transparent />

            {/* Header */}
            <header className="relative overflow-hidden bg-ink text-white pt-28 pb-20">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
                <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-gold/[0.06] blur-3xl" />
                <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 text-center">
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-5 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
                        <Link href="/" className="transition-colors hover:text-gold">Inicio</Link>
                        <span aria-hidden="true">/</span>
                        <span className="text-gold/80">Tratamientos</span>
                    </nav>
                    <span className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.3em] text-xs font-semibold">
                        <span className="h-px w-6 bg-gold/40" aria-hidden="true" />
                        Catálogo exclusivo
                        <span className="h-px w-6 bg-gold/40" aria-hidden="true" />
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] mt-4 mb-5 leading-tight">
                        Nuestros tratamientos
                    </h1>
                    <p className="text-white/70 font-light text-lg max-w-2xl mx-auto leading-relaxed">
                        Explora nuestra gama completa de procedimientos diseñados para tu
                        bienestar.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 flex-grow w-full">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar (Desktop) */}
                    <aside className="hidden lg:block w-full lg:w-72 xl:w-80 flex-shrink-0">
                        <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto custom-scrollbar lg:pr-2 pb-4">
                            <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm">
                                <h2 className="mb-5 font-[family-name:var(--font-italiana)] text-xl text-ink">
                                    Filtrar tratamientos
                                </h2>
                                {filtersEl}
                            </div>
                        </div>
                    </aside>

                    {/* Treatments Grid */}
                    <main className="flex-1 min-w-0">
                        {/* Toolbar: contador + ordenar + filtros mobile */}
                        <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
                            <p className="text-sm text-olive">
                                Mostrando{" "}
                                <span className="font-semibold text-ink">
                                    {sortedTreatments.length}
                                </span>{" "}
                                {sortedTreatments.length === 1 ? "tratamiento" : "tratamientos"}
                            </p>
                            <div className="flex items-center gap-2">
                                {/* Ordenar por */}
                                <div className="flex items-center gap-2">
                                    <label htmlFor="sort" className="text-xs text-olive hidden sm:block">
                                        Ordenar:
                                    </label>
                                    <select
                                        id="sort"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value as SortKey)}
                                        className="text-sm border border-ink/10 rounded-full py-2 pl-4 pr-8 bg-white text-olive focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 cursor-pointer transition-all"
                                    >
                                        {SORT_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Botón filtros (mobile) */}
                                <button
                                    onClick={() => setShowMobileFilters(true)}
                                    aria-label="Abrir filtros"
                                    className="lg:hidden flex items-center gap-2 text-sm font-medium text-ink bg-white px-4 py-2 rounded-full shadow-sm border border-ink/10 hover:border-gold transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                    </svg>
                                    Filtros
                                    {activeChips.length > 0 && (
                                        <span className="bg-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                            {activeChips.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Chips de filtros activos */}
                        {activeChips.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                {activeChips.map((chip, i) => (
                                    <button
                                        key={`${chip.label}-${i}`}
                                        onClick={chip.onRemove}
                                        aria-label={`Quitar filtro ${chip.label}`}
                                        className="group flex items-center gap-1.5 text-xs bg-gold/10 text-ink border border-gold/30 pl-3 pr-2 py-1.5 rounded-full hover:bg-gold/20 hover:border-gold/50 transition-all"
                                    >
                                        {chip.label}
                                        <svg className="w-3.5 h-3.5 text-olive group-hover:text-ink transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                ))}
                                <button
                                    onClick={resetFilters}
                                    className="text-xs text-olive hover:text-gold underline underline-offset-2 ml-1 transition-colors"
                                >
                                    Limpiar todo
                                </button>
                            </div>
                        )}

                        {/* Grid */}
                        {sortedTreatments.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                                {sortedTreatments.map((treatment, i) => (
                                    // Prioriza la carga de las primeras tarjetas (above-the-fold) para mejorar el LCP.
                                    <TreatmentCard key={treatment.id} treatment={treatment} priority={i < 3} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 rounded-2xl border border-ink/10 bg-white">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-5 text-gold">
                                    <svg
                                        className="w-8 h-8"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.8}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-2">
                                    No se encontraron resultados
                                </h3>
                                <p className="text-olive text-sm">
                                    Intenta ajustar tus filtros o búsqueda.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gold text-white px-6 py-2.5 text-sm font-semibold hover:bg-ink transition-colors"
                                >
                                    Ver todos los tratamientos
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Drawer de filtros (mobile) */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowMobileFilters(false)}
                        aria-hidden="true"
                    />
                    {/* Panel */}
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Filtros de tratamientos"
                        className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-cream shadow-2xl overflow-y-auto animate-[slideIn_0.25s_ease-out]"
                    >
                        <div className="sticky top-0 z-10 flex justify-between items-center bg-ink text-white px-5 py-4">
                            <h3 className="font-[family-name:var(--font-italiana)] text-xl">Filtros</h3>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                aria-label="Cerrar filtros"
                                className="p-1 hover:text-gold transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-5">
                            {filtersEl}
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="w-full mt-6 bg-gold text-white font-semibold uppercase tracking-wider text-sm py-3 rounded-full hover:bg-ink transition-colors"
                            >
                                Ver {sortedTreatments.length} tratamientos
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default function TratamientosPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen bg-cream">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
                </div>
            }
        >
            <TratamientosContent />
        </Suspense>
    );
}
