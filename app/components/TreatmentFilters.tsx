"use client";

import { useState, ReactNode, useId } from "react";
import { getCategorias, tratamientosData } from "@/data/tratamientos";

/** Sección colapsable (acordeón) del panel de filtros */
function FilterSection({
    title,
    badge,
    children,
    defaultOpen = true,
}: {
    title: string;
    badge?: number;
    children: ReactNode;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen);
    const panelId = useId();
    return (
        <div className="border-b border-sand last:border-b-0 py-4 first:pt-0">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={panelId}
                className="w-full flex justify-between items-center group"
            >
                <span className="text-xs font-bold text-olive uppercase tracking-[0.15em] flex items-center gap-2">
                    {title}
                    {badge ? (
                        <span className="text-[10px] font-bold text-white bg-gold w-4 h-4 rounded-full flex items-center justify-center normal-case tracking-normal">
                            {badge}
                        </span>
                    ) : null}
                </span>
                <svg
                    className={`w-4 h-4 text-olive/50 group-hover:text-gold transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && <div id={panelId} className="mt-4">{children}</div>}
        </div>
    );
}

interface TreatmentFiltersProps {
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    maxPrice: number;
    onMaxPriceChange: (price: number) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onReset: () => void;
    professionals: string[];
    selectedProfessional: string;
    onProfessionalChange: (professional: string) => void;
    availableProblems: string[];
    selectedProblems: string[];
    onProblemChange: (problems: string[]) => void;
}

export default function TreatmentFilters({
    selectedCategories,
    onCategoryChange,
    maxPrice,
    onMaxPriceChange,
    searchQuery,
    onSearchChange,
    onReset,
    professionals,
    selectedProfessional,
    onProfessionalChange,
    availableProblems,
    selectedProblems,
    onProblemChange,
}: TreatmentFiltersProps) {
    const categories = getCategorias();

    const handleCategoryToggle = (category: string) => {
        if (selectedCategories.includes(category)) {
            onCategoryChange(selectedCategories.filter((c) => c !== category));
        } else {
            onCategoryChange([...selectedCategories, category]);
        }
    };

    const handleProblemToggle = (problem: string) => {
        if (selectedProblems.includes(problem)) {
            onProblemChange(selectedProblems.filter((p) => p !== problem));
        } else {
            onProblemChange([...selectedProblems, problem]);
        }
    };

    const formatPriceLabel = (value: number) => {
        if (value >= 5000000) return "$5.000.000+";
        return "$" + value.toLocaleString("es-CL");
    };

    const getCategoryCount = (category: string) => {
        return tratamientosData.filter((t) => t.categoria === category).length;
    };

    return (
        <div className="space-y-5">
            {/* Search */}
            <div className="relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar tratamiento..."
                    aria-label="Buscar tratamiento"
                    className="w-full pl-10 pr-4 py-3 border border-ink/10 rounded-full focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 text-sm bg-cream/60 transition-all"
                />
                <svg
                    className="w-4 h-4 text-olive/50 absolute left-3.5 top-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            {/* Filters group */}
            <div>
                <div className="flex justify-end mb-1">
                    <button
                        onClick={onReset}
                        className="text-xs text-gold-dark hover:text-ink underline underline-offset-2 transition-colors"
                    >
                        Limpiar todo
                    </button>
                </div>

                {/* Categories */}
                <FilterSection title="Categoría" badge={selectedCategories.length}>
                    <div className="space-y-2.5">
                        {categories.map((category) => (
                            <label
                                key={category}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryToggle(category)}
                                    className="w-4 h-4 rounded border-ink/20 accent-gold focus:ring-gold cursor-pointer"
                                />
                                <span className="text-sm text-olive group-hover:text-ink transition-colors">
                                    {category}
                                </span>
                                <span className="ml-auto text-[11px] text-olive/70 bg-sand/60 px-2 py-0.5 rounded-full">
                                    {getCategoryCount(category)}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Problems Filter */}
                <FilterSection title="¿Qué te preocupa?" badge={selectedProblems.length}>
                    <div className="space-y-2.5">
                        {availableProblems.map((problem) => (
                            <label
                                key={problem}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedProblems.includes(problem)}
                                    onChange={() => handleProblemToggle(problem)}
                                    className="w-4 h-4 rounded border-ink/20 accent-gold focus:ring-gold cursor-pointer"
                                />
                                <span className="text-sm text-olive group-hover:text-ink transition-colors">
                                    {problem}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                {/* Professional Filter */}
                <FilterSection title="Profesional" badge={selectedProfessional ? 1 : 0} defaultOpen={false}>
                    <select
                        value={selectedProfessional}
                        onChange={(e) => onProfessionalChange(e.target.value)}
                        aria-label="Filtrar por profesional"
                        className="w-full px-3 py-2.5 border border-ink/10 rounded-xl text-sm text-olive focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 bg-white transition-all cursor-pointer"
                    >
                        <option value="">Todos los profesionales</option>
                        {professionals.map((prof) => (
                            <option key={prof} value={prof}>
                                {prof}
                            </option>
                        ))}
                    </select>
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Precio máximo">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {[
                            { label: "Hasta $100k", value: 100000 },
                            { label: "Hasta $300k", value: 300000 },
                            { label: "Hasta $500k", value: 500000 },
                        ].map((preset) => (
                            <button
                                key={preset.value}
                                type="button"
                                onClick={() => onMaxPriceChange(preset.value)}
                                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${maxPrice === preset.value
                                    ? "bg-gold text-white border-gold"
                                    : "bg-white text-olive border-ink/10 hover:border-gold hover:text-ink"
                                    }`}
                            >
                                {preset.label}
                            </button>
                        ))}
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={5000000}
                        step={50000}
                        value={maxPrice}
                        onChange={(e) => onMaxPriceChange(parseInt(e.target.value))}
                        aria-label="Precio máximo"
                        className="w-full cursor-pointer accent-gold"
                    />
                    <div className="flex justify-between text-xs text-olive mt-2">
                        <span>$0</span>
                        <span className="font-semibold text-ink">
                            {formatPriceLabel(maxPrice)}
                        </span>
                    </div>
                </FilterSection>
            </div>

            {/* Promo Card */}
            <div className="bg-gold/10 p-6 rounded-2xl border border-gold/20 text-center">
                <h4 className="font-[family-name:var(--font-italiana)] text-ink text-xl mb-2">
                    ¿Tienes dudas?
                </h4>
                <p className="text-xs text-olive leading-relaxed mb-4">
                    Agenda una evaluación para que nuestros especialistas te
                    guíen.
                </p>
                <a
                    href="https://wa.me/56982028473"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gold text-white px-5 py-2.5 text-xs font-semibold hover:bg-ink transition-colors"
                >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Contactar por WhatsApp
                </a>
            </div>
        </div>
    );
}
