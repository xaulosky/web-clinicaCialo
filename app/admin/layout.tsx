import type { Metadata } from "next";
import AdminShell from "./AdminShell";

// Panel privado: fuera de los buscadores. La guarda de acceso vive en AdminShell (cliente).
export const metadata: Metadata = {
    title: { absolute: "Administración | Clínica Cialo" },
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminShell>{children}</AdminShell>;
}
