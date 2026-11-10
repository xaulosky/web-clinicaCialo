'use client';

import { useEffect } from 'react';

const DESTINO = 'https://g.page/r/CZIiwvhaf3MDEBM/review';

export default function ReviewRedirect() {
  useEffect(() => {
    // Redirección inmediata a la página de reseñas de Google
    window.location.replace(DESTINO);
  }, []);

  return (
    <>
      {/* Fallback sin JavaScript (React 19 lo eleva al <head>) */}
      <meta httpEquiv="refresh" content={`0; url=${DESTINO}`} />

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          color: '#1b1a18',
          background: '#faf6ef',
        }}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '3px solid #b8935f',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'cialo-spin 0.8s linear infinite',
          }}
        />
        <p style={{ fontSize: '1rem' }}>Te estamos redirigiendo a Google para dejar tu reseña…</p>
        <a
          href={DESTINO}
          style={{
            color: '#b8976a',
            fontWeight: 600,
            textDecoration: 'underline',
          }}
        >
          Haz clic aquí si no eres redirigido automáticamente
        </a>
        <style>{`@keyframes cialo-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );
}
