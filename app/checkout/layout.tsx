import type { Metadata } from "next";

// Página de pago: fuera de los buscadores (la página es cliente y no puede exportar metadata).
export const metadata: Metadata = {
    title: { absolute: "Finalizar compra | Clínica Cialo" },
    robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return children;
}
