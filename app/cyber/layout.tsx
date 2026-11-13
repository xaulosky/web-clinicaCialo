import type { Metadata } from "next";

// La página es cliente y no puede exportar metadata; sin esto heredaba título y datos de la portada.
export const metadata: Metadata = {
    title: { absolute: "Cyber CIALO | Promociones en Medicina Estética | Clínica Cialo" },
    description: "Promociones Cyber de Clínica CIALO en Los Ángeles: tratamientos faciales, corporales y depilación láser con precio especial pagando online.",
    alternates: { canonical: "/cyber/" },
};

export default function CyberLayout({ children }: { children: React.ReactNode }) {
    return children;
}
