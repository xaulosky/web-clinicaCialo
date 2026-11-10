"use client";

import { useEffect, useRef, useState } from "react";
import { Video } from "@/data/profesionales";

interface YouTubeVideoProps {
    video: Video;
    className?: string;
}

export default function YouTubeVideo({ video, className = "" }: YouTubeVideoProps) {
    // Detectar si es short por URL o flag explícito (asumiendo que agregaremos isShort a la interfaz Video más adelante)
    const isShort = video.youtubeUrl.includes("/shorts/") || (video as any).isShort;
    const [shouldLoad, setShouldLoad] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Ajustar ID si viene de URL de shorts
    const videoId = video.youtubeId || (video.youtubeUrl.includes("/shorts/")
        ? video.youtubeUrl.split("/shorts/")[1].split("?")[0]
        : video.youtubeUrl.split("v=")[1]?.split("&")[0]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node || shouldLoad) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [shouldLoad]);

    return (
        <div ref={containerRef} className={`relative w-full ${className} ${isShort ? 'max-w-[300px] mx-auto' : ''}`}>
            <button
                type="button"
                onClick={() => setShouldLoad(true)}
                className={`group relative w-full ${isShort ? 'aspect-[9/16]' : 'aspect-video'} rounded-sm overflow-hidden shadow-lg bg-[#1b1a18] text-left`}
                aria-label={`Cargar video: ${video.titulo}`}
            >
                {shouldLoad ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                        title={video.titulo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                ) : (
                    <>
                                <img
                                    src={`https://img.youtube.com/vi/${videoId}/${isShort ? 'mqdefault' : 'hqdefault'}.jpg`}
                                    alt={video.titulo}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#1b1a18] shadow-xl transition-transform duration-300 group-hover:scale-110">
                                        <svg className="ml-1 h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                                    Ver video
                                </div>
                            </>
                        )}
            </button>
            <div className="mt-3 text-center md:text-left">
                <h4 className="font-semibold text-[#1b1a18] line-clamp-2">
                    {video.titulo}
                </h4>
                {video.descripcion && (
                    <p className="text-sm text-[#6f6a5c] mt-1 line-clamp-2">
                        {video.descripcion}
                    </p>
                )}
            </div>
        </div>
    );
}

interface VideoGalleryProps {
    videos: Video[];
    title?: string;
    subtitle?: string;
}

export function VideoGallery({ videos, title = "Videos", subtitle }: VideoGalleryProps) {
    if (!videos || videos.length === 0) return null;

    return (
        <section className="py-12">
            <div className="mb-8">
                {subtitle && (
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-2 block">
                        {subtitle}
                    </span>
                )}
                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                    {title}
                </h3>
            </div>

            <div className={`grid gap-6 ${videos.length === 1 ? 'max-w-2xl' : videos.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                {videos.map((video) => (
                    <YouTubeVideo key={video.id} video={video} />
                ))}
            </div>
        </section>
    );
}
