import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ClubGolfContent from "./ClubGolfContent";

export const metadata: Metadata = {
    title: "Convenio Clínica Cialo & Club de Golf 7 Ríos | Beneficios Exclusivos",
    description: "Alianza estratégica entre Clínica Cialo y Club de Golf 7 Ríos Los Ángeles. 15% de descuento en tratamientos para socios y sus familias.",
    keywords: "convenio club de golf 7 rios, clinica cialo los angeles, descuentos medicina estetica los angeles, beneficios socios club de golf",
    alternates: { canonical: "/convenios/club-golf-7-rios/" },
};

export default function ClubGolfPage() {
    return (
        <>
            <Navbar transparent />
            <Suspense fallback={<div className="min-h-screen bg-black" />}>
                <ClubGolfContent />
            </Suspense>
            <Footer />
        </>
    );
}
