import type { Metadata } from "next";
import MiCuentaShell from "./MiCuentaShell";

// Área privada del paciente: fuera de los buscadores.
export const metadata: Metadata = {
    title: { absolute: "Mi cuenta | Clínica Cialo" },
    robots: { index: false, follow: false },
};

export default function MiCuentaLayout({ children }: { children: React.ReactNode }) {
    return <MiCuentaShell>{children}</MiCuentaShell>;
}
