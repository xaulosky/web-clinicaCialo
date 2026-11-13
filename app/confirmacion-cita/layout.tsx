import type { Metadata } from "next";

// Resultado de una reserva: fuera de los buscadores (la página es cliente y no puede exportar metadata).
export const metadata: Metadata = {
    title: { absolute: "Confirmación de cita | Clínica Cialo" },
    robots: { index: false, follow: false },
};

export default function ConfirmacionCitaLayout({ children }: { children: React.ReactNode }) {
    return children;
}
