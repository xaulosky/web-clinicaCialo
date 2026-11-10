import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import PhotoGallery from "../../components/PhotoGallery";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: "Artículo no encontrado",
        };
    }

    return {
        title: `${post.titulo}`,
        description: post.extracto,
        alternates: {
            canonical: `/blog/${slug}/`,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Get related posts (same category, excluding current)
    const relatedPosts = blogPosts
        .filter((p) => p.categoria === post.categoria && p.id !== post.id)
        .slice(0, 3);

    // If not enough related posts, fill with recent ones
    const recentPosts = relatedPosts.length < 3
        ? blogPosts.filter((p) => p.id !== post.id && !relatedPosts.includes(p)).slice(0, 3 - relatedPosts.length)
        : [];

    const suggestedPosts = [...relatedPosts, ...recentPosts];

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Convert markdown-like content to JSX
    const renderContent = (content: string) => {
        const lines = content.trim().split('\n');
        const elements: React.ReactElement[] = [];
        let currentList: string[] = [];
        let listType: 'ul' | 'ol' | null = null;
        let tableRows: string[][] = [];
        let inTable = false;
        let key = 0;

        const flushList = () => {
            if (currentList.length > 0) {
                if (listType === 'ul') {
                    elements.push(
                        <ul key={key++} className="list-disc list-inside space-y-2 text-[#6f6a5c] mb-6 pl-4">
                            {currentList.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline">$1</a>') }} />)}
                        </ul>
                    );
                } else {
                    elements.push(
                        <ol key={key++} className="list-decimal list-inside space-y-2 text-[#6f6a5c] mb-6 pl-4">
                            {currentList.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline">$1</a>') }} />)}
                        </ol>
                    );
                }
                currentList = [];
                listType = null;
            }
        };

        const flushTable = () => {
            if (tableRows.length > 0) {
                const headerRow = tableRows[0];
                const bodyRows = tableRows.slice(1);
                elements.push(
                    <div key={key++} className="overflow-x-auto my-8 -mx-4 px-4">
                        <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#1b1a18] to-[#2a2a2a]">
                                    {headerRow.map((cell, i) => (
                                        <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-white border-b border-[#3a3a3a]" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline">$1</a>') }} />
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {bodyRows.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-100 hover:bg-[#faf9f7] transition-colors">
                                        {row.map((cell, j) => (
                                            <td key={j} className="px-4 py-3 text-sm text-[#6f6a5c]" dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#1b1a18]">$1</strong>').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline">$1</a>') }} />
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                tableRows = [];
                inTable = false;
            }
        };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            if (!trimmed) {
                flushList();
                flushTable();
                continue;
            }

            // Table row detection
            if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
                // Skip separator row (|---|---|)
                if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
                    continue;
                }
                flushList();
                inTable = true;
                const cells = trimmed.split('|').slice(1, -1).map(cell => cell.trim());
                tableRows.push(cells);
                continue;
            } else if (inTable) {
                flushTable();
            }

            // Horizontal rule
            if (trimmed === '---') {
                flushList();
                elements.push(<hr key={key++} className="my-8 border-t border-gray-200" />);
                continue;
            }

            // H2
            if (trimmed.startsWith('## ')) {
                flushList();
                const headingText = trimmed.replace('## ', '').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline">$1</a>');
                elements.push(
                    <h2 key={key++} className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mt-10 mb-4" dangerouslySetInnerHTML={{ __html: headingText }} />
                );
                continue;
            }

            // H3
            if (trimmed.startsWith('### ')) {
                flushList();
                const headingText = trimmed.replace('### ', '').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline">$1</a>');
                elements.push(
                    <h3 key={key++} className="text-xl font-semibold text-[#1b1a18] mt-8 mb-3" dangerouslySetInnerHTML={{ __html: headingText }} />
                );
                continue;
            }

            // H4
            if (trimmed.startsWith('#### ')) {
                flushList();
                const headingText = trimmed.replace('#### ', '').replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline">$1</a>');
                elements.push(
                    <h4 key={key++} className="text-lg font-semibold text-[#1b1a18] mt-6 mb-2" dangerouslySetInnerHTML={{ __html: headingText }} />
                );
                continue;
            }

            // Checkmark list items (✓ or ✗)
            if (trimmed.startsWith('✓ ') || trimmed.startsWith('✗ ')) {
                flushList();
                const isCheck = trimmed.startsWith('✓');
                const text = trimmed.substring(2);
                elements.push(
                    <p key={key++} className={`flex items-start gap-2 mb-2 ${isCheck ? 'text-green-700' : 'text-red-600'}`}>
                        <span className="mt-1">{isCheck ? '✓' : '✗'}</span>
                        <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </p>
                );
                continue;
            }

            // Unordered list
            if (trimmed.startsWith('- ')) {
                if (listType !== 'ul') {
                    flushList();
                    listType = 'ul';
                }
                currentList.push(trimmed.replace('- ', ''));
                continue;
            }

            // Ordered list (1. 2. etc)
            if (/^\d+\.\s/.test(trimmed)) {
                if (listType !== 'ol') {
                    flushList();
                    listType = 'ol';
                }
                currentList.push(trimmed.replace(/^\d+\.\s/, ''));
                continue;
            }

            // Bold text handling
            if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
                flushList();
                elements.push(
                    <p key={key++} className="font-semibold text-[#1b1a18] mb-2">
                        {trimmed.replace(/\*\*/g, '')}
                    </p>
                );
                continue;
            }

            // Regular paragraph with markdown link and bold support
            flushList();
            const processedLine = trimmed
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#b8935f] hover:underline font-medium">$1</a>');
            elements.push(
                <p
                    key={key++}
                    className="text-[#6f6a5c] leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: processedLine }}
                />
            );
        }

        flushList();
        flushTable();
        return elements;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar transparent />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-8">
                        <Link href="/" className="hover:text-[#b8935f] transition-colors">Inicio</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-[#b8935f] transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-[#b8935f]">{post.categoria}</span>
                    </nav>

                    <span className="inline-block bg-[#b8935f] text-[#1b1a18] text-xs font-semibold px-3 py-1 rounded-sm mb-6">
                        {post.categoria}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                        {post.titulo}
                    </h1>
                    <p className="text-lg text-[#cbcfd1] mb-8 font-light">
                        {post.extracto}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-[#b8935f] flex items-center justify-center text-white font-semibold">
                                {post.autor.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </div>
                            <div>
                                <span className="block text-white font-medium">{post.autor}</span>
                                <span className="block text-[#cbcfd1] text-xs">Clínica Cialo</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-[#cbcfd1]">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {formatDate(post.fechaPublicacion)}
                            </span>
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {post.tiempoLectura} de lectura
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="relative -mt-8 z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative aspect-[21/9] rounded-sm overflow-hidden shadow-2xl">
                        <Image
                            src={post.imagen}
                            alt={post.titulo}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <article className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-lg max-w-none">
                        {renderContent(post.contenido)}
                    </div>

                    {/* Embedded Video */}
                    {post.videoId && (
                        <div className="mt-12 bg-[#1b1a18] rounded-sm p-6 md:p-8">
                            <h3 className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                                Video Explicativo
                            </h3>
                            <div className={`${post.isShort ? 'max-w-[320px] mx-auto' : 'max-w-3xl mx-auto'}`}>
                                <div className={`${post.isShort ? 'aspect-[9/16]' : 'aspect-video'} rounded-sm overflow-hidden shadow-lg`}>
                                    <iframe
                                        src={`https://www.youtube.com/embed/${post.videoId}?rel=0`}
                                        title={post.titulo}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                            <p className="text-[#cbcfd1] text-sm text-center mt-4">
                                Mira el video donde te explicamos todo sobre este tratamiento
                            </p>
                        </div>
                    )}

                    {/* Photo Gallery - Masonry Style with Lightbox */}
                    {post.galeria && post.galeria.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                Galería de Fotos
                            </h3>
                            <PhotoGallery photos={post.galeria} />
                        </div>
                    )}

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <span className="text-sm font-semibold text-[#1b1a18] mb-4 block">Etiquetas:</span>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-[#faf6ef] text-[#6f6a5c] px-3 py-1 text-sm rounded-sm hover:bg-[#b8935f] hover:text-white transition-colors cursor-pointer"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Share */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <span className="text-sm font-semibold text-[#1b1a18] mb-4 block">Compartir:</span>
                        <div className="flex gap-3">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=https://cialo.cl/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.titulo)}&url=https://cialo.cl/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(post.titulo + ' - https://cialo.cl/blog/' + post.slug)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-[#25d366] flex items-center justify-center text-white hover:opacity-80 transition-opacity"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </article>

            {/* CTA Section */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-[#1b1a18] to-[#2a2622] rounded-sm p-8 md:p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8935f] rounded-full blur-3xl"></div>
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">
                                ¿Te Interesa Este Tratamiento?
                            </h2>
                            <p className="text-[#cbcfd1] mb-8 max-w-xl mx-auto">
                                Agenda una evaluación personalizada con nuestros especialistas y descubre
                                el tratamiento ideal para ti.
                            </p>
                            <a
                                href="https://wa.me/56982028473"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-[#b8935f] text-[#1b1a18] px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-white transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Consulta
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {suggestedPosts.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-10">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-2 block">
                                Sigue Leyendo
                            </span>
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                Artículos Relacionados
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {suggestedPosts.map((relatedPost) => (
                                <article
                                    key={relatedPost.id}
                                    className="group bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <Link href={`/blog/${relatedPost.slug}`}>
                                        <div className="relative aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={relatedPost.imagen}
                                                alt={relatedPost.titulo}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-[#b8935f] text-xs font-semibold uppercase tracking-wider mb-2 block">
                                                {relatedPost.categoria}
                                            </span>
                                            <h3 className="text-lg font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2 group-hover:text-[#b8935f] transition-colors line-clamp-2">
                                                {relatedPost.titulo}
                                            </h3>
                                            <span className="text-xs text-[#6f6a5c]">{relatedPost.tiempoLectura}</span>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-[#1b1a18] font-semibold hover:text-[#b8935f] transition-colors group"
                            >
                                Ver todos los artículos
                                <svg
                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </div>
    );
}
