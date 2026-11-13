import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BienestarContent from "./BienestarContent";

export const metadata: Metadata = {
    title: "Convenio Clínica Cialo & Bienestar Los Ángeles | Beneficios Exclusivos",
    description: "Alianza estratégica entre Clínica Cialo y Bienestar Los Ángeles. 20% de descuento en tratamientos para funcionarios y sus familias.",
    keywords: "convenio bienestar los angeles, clinica cialo los angeles, descuentos medicina estetica los angeles, beneficios municipales",
    alternates: { canonical: "/convenios/bienestar-los-angeles/" },
};

export default function BienestarPage() {
    return (
        <>
            <Navbar transparent />
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
                <BienestarContent />
            </Suspense>
            <Footer />
        </>
    );
}
