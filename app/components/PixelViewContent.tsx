'use client';

import { useEffect, useRef } from 'react';
import { trackViewContent } from '@/lib/fbpixel';
import { trackViewTreatment } from '@/lib/analytics';

interface PixelViewContentProps {
  id: string | number;
  name: string;
  value?: number;
  category?: string;
}

/**
 * Dispara el evento ViewContent del Meta Pixel al montar.
 * Pensado para insertarse en páginas de detalle (server components),
 * que en static export se hidratan en el cliente.
 */
export default function PixelViewContent({
  id,
  name,
  value,
  category,
}: PixelViewContentProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackViewContent({ id, name, value, category });
    // Analítica propia (first-party): tratamiento visto
    trackViewTreatment({ id, category: category || 'sin-categoria', name, value });
  }, [id, name, value, category]);

  return null;
}
