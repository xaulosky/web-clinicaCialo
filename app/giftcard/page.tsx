import type { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GiftCardDesigner from "./GiftCardDesigner";

export const metadata: Metadata = {
    title: { absolute: "Gift Card | Regala bienestar | Clínica CIALO" },
    description:
        "Crea y regala una Gift Card de Clínica Cialo. Elige un monto o un tratamiento, personalízala y envíala. Medicina estética en Los Ángeles, Biobío.",
    keywords:
        "gift card clinica cialo, tarjeta de regalo estetica, regalar tratamiento, giftcard los angeles",
    openGraph: {
        title: "Gift Card Clínica Cialo — Regala bienestar",
        description: "Personaliza tu Gift Card: monto o tratamiento, diseño elegante y envío inmediato.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/giftcard",
    },
    alternates: { canonical: "https://cialo.cl/giftcard" },
};

export default function GiftCardPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar transparent />

            {/* Hero */}
            <section className="relative pt-32 pb-12 bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <span className="inline-block text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4">
                        Regala bienestar
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-4">
                        Gift Card Clínica Cialo
                    </h1>
                    <p className="text-lg text-[#cbcfd1] max-w-2xl mx-auto">
                        Crea tu Gift Card en segundos: elige un <strong className="text-white">monto</strong> o un{" "}
                        <strong className="text-white">tratamiento</strong>, personalízala con un diseño elegante y regálala.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4">
                    <GiftCardDesigner />
                </div>
            </section>

            <Footer />
        </div>
    );
}
