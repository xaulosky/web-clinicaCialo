"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { productosData, getBrands, formatPrice, Producto } from "@/data/productos";

export default function ProductosPage() {
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState(150000);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Producto[]>(productosData);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const brands = getBrands();

    useEffect(() => {
        const filtered = productosData.filter((item) => {
            const matchBrand =
                selectedBrands.length === 0 || selectedBrands.includes(item.brand);
            const matchPrice = item.price <= maxPrice;
            const term = searchQuery.toLowerCase();
            const matchSearch =
                item.name.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term) ||
                item.brand.toLowerCase().includes(term);

            return matchBrand && matchPrice && matchSearch;
        });

        setFilteredProducts(filtered);
    }, [selectedBrands, maxPrice, searchQuery]);

    const handleBrandToggle = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter((b) => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const resetFilters = () => {
        setSelectedBrands([]);
        setMaxPrice(150000);
        setSearchQuery("");
    };

    const getBrandCount = (brand: string) => {
        return productosData.filter((p) => p.brand === brand).length;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar transparent />

            {/* Header */}
            <header className="bg-[#1b1a18] text-white pt-32 pb-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <span className="text-cialo-gold uppercase tracking-widest text-xs font-semibold">
                        Dermocosmética Premium
                    </span>
                    <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] mt-2 mb-4">
                        Nuestros Productos
                    </h1>
                    <p className="text-gray-400 font-light max-w-2xl mx-auto">
                        Selección exclusiva de productos dermatológicos de alta gama para el cuidado de tu piel.
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grow w-full">
                {/* Mobile Filter Toggle */}
                <div className="lg:hidden flex justify-between items-center mb-6">
                    <p className="text-sm text-gray-500">
                        Mostrando{" "}
                        <span className="font-bold text-cialo-gray">
                            {filteredProducts.length}
                        </span>{" "}
                        productos
                    </p>
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="flex items-center gap-2 text-sm font-medium text-cialo-gold bg-white px-4 py-2 rounded-sm shadow-sm border border-gray-100"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtros
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className={`${showMobileFilters ? "block" : "hidden"} lg:block w-full lg:w-72 xl:w-80 shrink-0`}>
                        <div className="lg:sticky lg:top-24 space-y-6">
                            {/* Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar producto..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:border-cialo-gold text-sm bg-white shadow-sm transition-colors"
                                />
                                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            {/* Filters Card */}
                            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-[family-name:var(--font-italiana)] text-cialo-gray">
                                        Filtrar por
                                    </h3>
                                    <button
                                        onClick={resetFilters}
                                        className="text-xs text-cialo-gold hover:underline transition-colors"
                                    >
                                        Limpiar todo
                                    </button>
                                </div>

                                {/* Brands */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-cialo-gray uppercase tracking-wider mb-3">
                                        Marca
                                    </h4>
                                    <div className="space-y-2">
                                        {brands.map((brand) => (
                                            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedBrands.includes(brand)}
                                                    onChange={() => handleBrandToggle(brand)}
                                                    className="w-4 h-4 rounded border-gray-300 text-cialo-gold focus:ring-cialo-gold cursor-pointer"
                                                />
                                                <span className="text-sm text-gray-600 group-hover:text-cialo-gray transition-colors flex-1">
                                                    {brand}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    ({getBrandCount(brand)})
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <h4 className="text-sm font-bold text-cialo-gray uppercase tracking-wider mb-3">
                                        Precio máximo
                                    </h4>
                                    <input
                                        type="range"
                                        min="5000"
                                        max="150000"
                                        step="5000"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cialo-gold"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>$5.000</span>
                                        <span className="font-bold text-cialo-gray">{formatPrice(maxPrice)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="flex-1 min-w-0">
                        {/* Results Counter (Desktop) */}
                        <div className="hidden lg:flex justify-between items-center mb-6">
                            <p className="text-sm text-gray-500">
                                Mostrando{" "}
                                <span className="font-bold text-cialo-gray">
                                    {filteredProducts.length}
                                </span>{" "}
                                productos
                            </p>
                        </div>

                        {/* Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-gray-400">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-cialo-gray mb-2">
                                    No se encontraron productos
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Intenta ajustar tus filtros o búsqueda.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-4 text-cialo-gold font-medium text-sm hover:underline"
                                >
                                    Ver todos los productos
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* CTA Section */}
            <section className="bg-[#1b1a18] py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">
                        ¿Necesitas asesoría personalizada?
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Nuestros especialistas pueden recomendarte los productos ideales para tu tipo de piel y necesidades específicas.
                    </p>
                    <a
                        href="https://wa.me/56982028473?text=Hola,%20me%20gustaría%20recibir%20asesoría%20sobre%20productos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-cialo-gold hover:bg-cialo-gold/90 text-[#1b1a18] font-semibold py-3 px-8 rounded-sm transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Contactar por WhatsApp
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}

// Componente de tarjeta de producto
function ProductCard({ product }: { product: Producto }) {
    // Colores por marca
    const brandColors: Record<string, string> = {
        "Avene": "bg-orange-500",
        "Eucerin": "bg-blue-600",
        "Obagi": "bg-purple-600",
        "ISDIN": "bg-sky-500",
        "Glisodin": "bg-green-600",
    };

    const brandColor = brandColors[product.brand] || "bg-cialo-gold";

    return (
        <Link
            href={`/productos/${product.slug}`}
            className="bg-white rounded-sm border border-gray-100 p-6 hover:shadow-lg hover:border-cialo-gold/30 transition-all duration-300 flex flex-col h-full group"
        >
            {/* Header */}
            <div className="mb-4 flex justify-between items-start">
                <span className={`text-[10px] font-bold uppercase tracking-wider text-white ${brandColor} px-2 py-1 rounded-sm`}>
                    {product.brand}
                </span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    {product.category}
                </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-cialo-gray mb-2 group-hover:text-cialo-gold transition-colors line-clamp-2">
                {product.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-6 grow line-clamp-3">
                {product.description}
            </p>

            {/* Footer */}
            <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-cialo-gray">
                    {formatPrice(product.price)}
                </span>
                <span className="bg-cialo-gray text-white px-4 py-2 rounded-sm text-sm font-medium group-hover:bg-cialo-gold transition-colors flex items-center gap-2">
                    Ver más
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}
