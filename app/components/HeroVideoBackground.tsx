"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroVideoBackgroundProps {
    videoId: string;
    fallbackImage: string;
    fallbackAlt: string;
}

export default function HeroVideoBackground({ videoId, fallbackImage, fallbackAlt }: HeroVideoBackgroundProps) {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Give YouTube iframe time to start playing
        const timer = setTimeout(() => {
            setVideoLoaded(true);
        }, 2000); // 2 seconds delay for video to buffer

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="absolute inset-0 bg-[#1b1a18]">
            {/* Fallback Image - always rendered, fades out when video loads */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                    src={fallbackImage}
                    alt={fallbackAlt}
                    fill
                    className={`object-cover transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    priority
                    sizes="100vw"
                    quality={90}
                    onLoad={() => setImageLoaded(true)}
                />
            </div>

            {/* YouTube Video Background - Desktop only */}
            <div className={`absolute inset-0 hidden md:block overflow-hidden transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&vq=hd1080`}
                    title="Video de fondo"
                    allow="autoplay; encrypted-media"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                        border: 'none',
                        width: 'max(100vw, 177.78vh)',
                        height: 'max(100vh, 56.25vw)'
                    }}
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1b1a18]/85 via-[#1b1a18]/70 to-[#1b1a18]/75"></div>
        </div>
    );
}
