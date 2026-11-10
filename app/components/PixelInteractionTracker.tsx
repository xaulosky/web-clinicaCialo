'use client';

import { useEffect } from 'react';
import { trackLead } from '@/lib/fbpixel';

/**
 * Tracker global de interacciones de alta intención para el Meta Pixel.
 * Monta un único listener delegado en el documento que detecta clics en
 * cualquier enlace de WhatsApp (wa.me / api.whatsapp.com) en todo el sitio
 * y dispara el evento Lead. Así cubrimos todos los CTAs sin tocar cada
 * archivo individualmente.
 */
export default function PixelInteractionTracker() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const isWhatsApp =
        href.includes('wa.me') ||
        href.includes('api.whatsapp.com') ||
        href.includes('whatsapp.com/send');

      if (isWhatsApp) {
        trackLead({ source: 'whatsapp', content_name: 'Clic WhatsApp' });
      }
    };

    // Captura en fase de captura para registrar antes de cualquier navegación.
    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return null;
}
