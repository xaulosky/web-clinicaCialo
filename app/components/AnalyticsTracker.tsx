'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * Dispara una page view de analytics first-party en cada cambio de ruta.
 *
 * Usa usePathname() para detectar la navegación del App Router y llama a
 * trackPageView con la ruta actual. No renderiza nada.
 *
 * Es seguro en SSR / export estático: trackPageView no hace nada cuando no
 * hay window, y el useEffect sólo corre en el cliente.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
