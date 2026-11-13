import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Comfortaa } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CartSlider from "./components/CartSlider";
// import ValentineFloatingHeart from "./components/ValentineFloatingHeart";
// import ValentinePromoModal from "./components/ValentinePromoModal";
// import MothersDayPromoModal from "./components/MothersDayPromoModal";
// import MothersDayFloatingButton from "./components/MothersDayFloatingButton";
import CyberPromoModal from "./components/CyberPromoModal";
import NetGeniusChat from "./components/NetGeniusChat";
import PixelInteractionTracker from "./components/PixelInteractionTracker";
import AnalyticsTracker from "./components/AnalyticsTracker";
import { ToastProvider } from "./components/Toast";
import BlackFridayPopup from "./components/BlackFridayPopup";
import GiftCardPopup from "./components/GiftCardPopup";

// v2: Cormorant Garamond para TODOS los títulos del sitio.
// Mantenemos la variable `--font-italiana` para no editar los 100+ componentes
// que ya la usan; solo cambia la fuente subyacente.
const italiana = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-italiana",
  subsets: ["latin"],
  display: "swap",
});

// v2: Inter como fuente de cuerpo. Se mapea a `--font-poppins` (la variable de
// cuerpo existente) para mantener compatibilidad con el resto del sitio.
const poppins = Inter({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
});

const comfortaa = Comfortaa({
  weight: ["300", "400", "700"],
  variable: "--font-comfortaa",
  subsets: ["latin"],
  display: "swap",
});

// ===== SEO: JSON-LD structured data (@graph) =====
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalClinic", "MedicalBusiness"],
      "@id": "https://cialo.cl/#clinic",
      name: "Clínica CIALO",
      description:
        "Clínica de medicina estética en Los Ángeles, Biobío. Combinamos ciencia, experiencia y tecnología para resultados naturales, seguros y clínicamente medibles.",
      url: "https://cialo.cl",
      telephone: "+56 9 8202 8473",
      image: "https://cialo.cl/logo-cialo.png",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bulnes 220, Of. 509",
        addressLocality: "Los Ángeles",
        addressRegion: "Región del Biobío",
        addressCountry: "CL",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -37.4697,
        longitude: -72.3536,
      },
      areaServed: "Los Ángeles, Biobío",
      openingHours: "Mo-Sa",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 284,
      },
      medicalSpecialty: ["Dermatology", "PlasticSurgery"],
    },
    {
      "@type": "Organization",
      "@id": "https://cialo.cl/#organization",
      name: "Clínica CIALO",
      url: "https://cialo.cl",
      logo: "https://cialo.cl/logo-cialo.png",
      sameAs: ["https://www.instagram.com/clinicacialo/"],
    },
    {
      "@type": "WebSite",
      "@id": "https://cialo.cl/#website",
      url: "https://cialo.cl",
      name: "Clínica CIALO",
      publisher: { "@id": "https://cialo.cl/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://cialo.cl/tratamientos?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://cialo.cl'),
  title: {
    default: "Clínica Estética Los Ángeles | Medicina Estética | Clínica Cialo",
    template: "%s | Clínica Cialo"
  },
  description:
    "En Clínica Cialo combinamos ciencia, experiencia y tecnología para lograr resultados naturales, seguros y clínicamente medibles. Líderes en medicina estética en Los Ángeles, Biobío.",
  keywords: [
    "clinica estetica los angeles",
    "clínica estética los angeles",
    "medicina estética Los Ángeles",
    "clinica cialo",
    "clinica cialo los angeles",
    "botox los angeles",
    "ácido hialurónico los angeles",
    "tratamientos faciales",
    "depilacion laser los angeles",
    "injerto capilar",
    "ginecoestética",
    "urología estética",
  ],
  authors: [{ name: "Clínica Cialo" }],
  // Sin canonical aquí: lo heredarían todas las páginas y apuntarían a la portada.
  // Cada página declara el suyo en `alternates.canonical`.
  other: {
    'facebook-domain-verification': '1j3dhdqxajoxwftmpteegi4484t4xm',
  },
  openGraph: {
    title: "Clínica Cialo | Líderes en Medicina Estética en Los Ángeles",
    description:
      "Combinamos ciencia, experiencia y tecnología para resultados naturales y seguros. Autorizados por SEREMI de Salud.",
    type: "website",
    locale: "es_CL",
    url: 'https://cialo.cl',
    siteName: 'Clínica Cialo',
    images: [
      {
        url: '/logo-cialo.png',
        width: 1200,
        height: 630,
        alt: 'Clínica Cialo | Medicina Estética en Los Ángeles',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${italiana.variable} ${poppins.variable} ${comfortaa.variable} antialiased`}
      >
        {/* SEO: JSON-LD structured data (MedicalClinic, Organization, WebSite) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5HV0M1TN00"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5HV0M1TN00');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "v1xmcvrwy0");
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '37311405751791578');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=37311405751791578&ev=PageView&noscript=1"
          />
        </noscript>

        {/* FontAwesome CDN */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

        <ToastProvider>
          {children}
          {/* <ValentineFloatingHeart /> */}
          {/* <ValentinePromoModal /> */}
          {/* <MothersDayPromoModal />
          <MothersDayFloatingButton /> */}
          <CyberPromoModal />
          <BlackFridayPopup />
          <GiftCardPopup />
          <CartSlider />
        </ToastProvider>

        {/* Meta Pixel: tracker global de Lead (clics WhatsApp) */}
        <PixelInteractionTracker />

        {/* Analítica propia (first-party): page views por ruta */}
        <AnalyticsTracker />

        {/* NetGenius WebChat - Solo en páginas públicas */}
        <NetGeniusChat />
      </body>
    </html>
  );
}

