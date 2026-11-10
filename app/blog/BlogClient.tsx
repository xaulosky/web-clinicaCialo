'use client';

import { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, blogCategorias } from "@/data/blog";

export default function BlogPage() {
    const [categoriaActiva, setCategoriaActiva] = useState("Todos");

    const postsFiltrados = (categoriaActiva === "Todos"
        ? [...blogPosts]
        : blogPosts.filter(post => post.categoria === categoriaActiva)
    ).sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime());

    const featuredPosts = postsFiltrados.filter(post => post.destacado);
    const allPosts = postsFiltrados;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar transparent />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622] overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#d3c8ba] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block text-[#b8935f] uppercase tracking-[0.3em] text-xs font-semibold mb-6">
                        Conocimiento y Bienestar
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-[family-name:var(--font-italiana)] text-white mb-6">
                        Blog
                    </h1>
                    <p className="text-lg text-[#cbcfd1] max-w-2xl mx-auto font-light leading-relaxed">
                        Descubre artículos, consejos y novedades sobre medicina estética,
                        cuidado de la piel y bienestar integral.
                    </p>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-8 bg-[#faf6ef] border-y border-gray-100 sticky top-20 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {blogCategorias.map((categoria) => (
                            <button
                                key={categoria}
                                onClick={() => setCategoriaActiva(categoria)}
                                className={`px-4 py-2 text-sm font-medium whitespace-nowrap rounded-sm transition-all ${categoria === categoriaActiva
                                    ? "bg-[#1b1a18] text-white"
                                    : "bg-white text-[#6f6a5c] hover:bg-[#1b1a18] hover:text-white border border-gray-200"
                                    }`}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && categoriaActiva === "Todos" && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-2 block">
                                    Destacados
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                    Artículos Principales
                                </h2>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Main Featured Post */}
                            <Link
                                href={`/blog/${featuredPosts[0].slug}`}
                                className="group relative overflow-hidden rounded-sm aspect-[4/3] lg:aspect-auto lg:row-span-2 shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={featuredPosts[0].imagen}
                                    alt={featuredPosts[0].titulo}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18] via-[#1b1a18]/50 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-xs font-semibold px-3 py-1 rounded-sm mb-4">
                                        {featuredPosts[0].categoria}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-white mb-3 group-hover:text-[#b8935f] transition-colors">
                                        {featuredPosts[0].titulo}
                                    </h3>
                                    <p className="text-[#cbcfd1] text-sm mb-4 line-clamp-2">
                                        {featuredPosts[0].extracto}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-[#cbcfd1]">
                                        <span>{featuredPosts[0].autor}</span>
                                        <span>•</span>
                                        <span>{featuredPosts[0].tiempoLectura} de lectura</span>
                                    </div>
                                </div>
                            </Link>

                            {/* Secondary Featured Posts */}
                            {featuredPosts.slice(1, 3).map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-[#faf6ef] rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex flex-col sm:flex-row h-full">
                                        <div className="relative w-full sm:w-2/5 aspect-video sm:aspect-auto">
                                            <Image
                                                src={post.imagen}
                                                alt={post.titulo}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 640px) 100vw, 20vw"
                                            />
                                        </div>
                                        <div className="flex-1 p-6 flex flex-col justify-center">
                                            <span className="text-[#b8935f] text-xs font-semibold uppercase tracking-wider mb-2">
                                                {post.categoria}
                                            </span>
                                            <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2 group-hover:text-[#b8935f] transition-colors line-clamp-2">
                                                {post.titulo}
                                            </h3>
                                            <p className="text-sm text-[#6f6a5c] line-clamp-2 mb-3">
                                                {post.extracto}
                                            </p>
                                            <div className="flex items-center gap-3 text-xs text-[#6f6a5c]">
                                                <span>{post.tiempoLectura}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Posts Grid */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-2 block">
                                {categoriaActiva === "Todos" ? "Explorar" : categoriaActiva}
                            </span>
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                {categoriaActiva === "Todos" ? "Todos los Artículos" : `Artículos de ${categoriaActiva}`}
                            </h2>
                        </div>
                        <span className="text-sm text-[#6f6a5c]">
                            {allPosts.length} artículo{allPosts.length !== 1 ? 's' : ''}
                        </span>
                    </div>

                    {allPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-[#6f6a5c] text-lg">No hay artículos en esta categoría todavía.</p>
                            <button
                                onClick={() => setCategoriaActiva("Todos")}
                                className="mt-4 text-[#b8935f] hover:underline"
                            >
                                Ver todos los artículos
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={post.imagen}
                                                alt={post.titulo}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#1b1a18] text-xs font-semibold px-3 py-1 rounded-sm">
                                                    {post.categoria}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3 group-hover:text-[#b8935f] transition-colors line-clamp-2">
                                                {post.titulo}
                                            </h3>
                                            <p className="text-sm text-[#6f6a5c] line-clamp-3 mb-4">
                                                {post.extracto}
                                            </p>
                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-[#b8935f] flex items-center justify-center text-white text-xs font-semibold">
                                                        {post.autor.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                                    </div>
                                                    <span className="text-xs text-[#6f6a5c]">{post.autor}</span>
                                                </div>
                                                <span className="text-xs text-[#6f6a5c]">{post.tiempoLectura}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                        Mantente Informada
                    </span>
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-white mb-4">
                        Suscríbete a Nuestro Newsletter
                    </h2>
                    <p className="text-[#cbcfd1] mb-8">
                        Recibe consejos de belleza, promociones exclusivas y las últimas novedades
                        en medicina estética directamente en tu correo.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Tu correo electrónico"
                            className="flex-1 px-4 py-3 rounded-sm bg-white/10 border border-white/20 text-white placeholder-[#cbcfd1] focus:outline-none focus:border-[#b8935f] transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#b8935f] text-[#1b1a18] font-semibold rounded-sm hover:bg-white transition-colors"
                        >
                            Suscribirse
                        </button>
                    </form>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                        ¿Lista para tu Transformación?
                    </h2>
                    <p className="text-[#6f6a5c] mb-8">
                        Nuestros especialistas están listos para crear un plan personalizado para ti.
                    </p>
                    <a
                        href="https://wa.me/56982028473"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-[#b8935f] text-[#1b1a18] px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-all duration-300 shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Agendar Evaluación
                    </a>
                </div>
            </section>

            <Footer />
        </div>
    );
}
