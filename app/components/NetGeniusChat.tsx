'use client';

// Burbuja flotante de WebChat de NetGenius. Reemplaza al widget anterior (Vambe).
// Se carga en todas las páginas públicas, no en el panel de admin.

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const SRC = 'https://app.netgenius.cl/widget-loader.js';
const ORG_ID = 'b092a8ff-31de-48d7-a7c2-6fddf5682177';

export default function NetGeniusChat() {
    const pathname = usePathname();
    const isAdminRoute = pathname?.startsWith('/admin');

    useEffect(() => {
        if (isAdminRoute) return;
        // Evitar cargar el script dos veces (navegación cliente / re-render)
        if (document.querySelector(`script[data-org-id="${ORG_ID}"]`)) return;

        const script = document.createElement('script');
        script.src = SRC;
        script.async = true;
        script.setAttribute('data-org-id', ORG_ID);
        document.body.appendChild(script);
    }, [isAdminRoute]);

    return null;
}
