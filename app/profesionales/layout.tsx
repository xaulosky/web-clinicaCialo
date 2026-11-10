import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profesionales | Clínica Cialo - Expertos en Medicina Estética Los Ángeles",
    description:
        "Conoce a nuestro equipo de +9 profesionales expertos en medicina estética. Ginecología, urología, nutrición, estética capilar, corporal y facial. +100.000 procedimientos realizados.",
    keywords: "profesionales medicina estética, médicos Los Ángeles Chile, ginecóloga, urólogo, nutricionista, estética capilar, cirugía vascular, medicina estética facial",
    openGraph: {
        title: "Profesionales | Clínica Cialo",
        description: "Equipo de expertos en medicina estética con +100.000 procedimientos realizados. Agenda tu evaluación.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/profesionales",
    },
    alternates: {
        canonical: "https://cialo.cl/profesionales",
    },
};

export default function ProfesionalesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "MedicalOrganization",
                        name: "Clínica Cialo",
                        description: "Centro de medicina estética avanzada en Los Ángeles, Chile",
                        url: "https://cialo.cl",
                        telephone: "+56982028473",
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: "Bulnes 220, Of. 509",
                            addressLocality: "Los Ángeles",
                            addressRegion: "Biobío",
                            addressCountry: "CL",
                        },
                        medicalSpecialty: [
                            "Ginecología",
                            "Urología",
                            "Nutrición",
                            "Estética Capilar",
                            "Estética Corporal",
                            "Estética Facial",
                            "Cirugía Vascular"
                        ],
                    }),
                }}
            />
            {children}
        </>
    );
}
