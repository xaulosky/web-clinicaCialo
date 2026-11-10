'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryPhoto {
    src: string;
    alt?: string;
    caption?: string;
}

interface PhotoGalleryProps {
    photos: GalleryPhoto[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1);
        }
    };

    const goToNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex(selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
    };

    return (
        <>
            {/* Masonry Gallery - Optimized for performance */}
            <div className="columns-2 md:columns-3 gap-4">
                {photos.map((foto, index) => {
                    // Automatically determine thumbnail path
                    // e.g. /blog/folder/image.webp -> /blog/folder/thumbs/image.webp
                    const pathParts = foto.src.split('/');
                    const filename = pathParts.pop();
                    const thumbPath = [...pathParts, 'thumbs', filename].join('/');
                    
                    return (
                        <div
                            key={index}
                            className="group relative break-inside-avoid mb-4 cursor-pointer"
                            onClick={() => openLightbox(index)}
                        >
                            <div className="relative overflow-hidden rounded-sm bg-gray-200">
                                <Image
                                    src={thumbPath}
                                    alt={foto.alt || `Foto ${index + 1}`}
                                    width={800} // Increased for better quality in thumbnails
                                    height={1200}
                                    quality={70}
                                    loading={index < 6 ? "eager" : "lazy"}
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                    <svg
                                        className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                </div>
                            </div>
                            {foto.caption && (
                                <p className="mt-2 text-sm text-[#6f6a5c] text-center">
                                    {foto.caption}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white/70 hover:text-white p-2 z-10"
                        aria-label="Cerrar"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 text-white/70 text-sm">
                        {selectedIndex + 1} / {photos.length}
                    </div>

                    {/* Previous button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
                        aria-label="Anterior"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Next button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 z-10"
                        aria-label="Siguiente"
                    >
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Image */}
                    <div
                        className="relative max-w-[90vw] max-h-[90vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={photos[selectedIndex].src}
                            alt={photos[selectedIndex].alt || `Foto ${selectedIndex + 1}`}
                            width={1920}
                            height={2880}
                            quality={90}
                            priority
                            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
                        />
                        {photos[selectedIndex].caption && (
                            <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-3 px-4 text-sm">
                                {photos[selectedIndex].caption}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
