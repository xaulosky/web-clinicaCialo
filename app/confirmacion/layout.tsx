import type { Metadata } from "next";

// Resultado de un pago: fuera de los buscadores (la página es cliente y no puede exportar metadata).
export const metadata: Metadata = {
    title: { absolute: "Confirmación de compra | Clínica Cialo" },
    robots: { index: false, follow: false },
};

export default function ConfirmacionLayout({ children }: { children: React.ReactNode }) {
    return children;
}
