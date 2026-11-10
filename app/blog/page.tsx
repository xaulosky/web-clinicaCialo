import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
    title: "Blog de Salud y Estética",
    description: "Artículos, consejos y novedades sobre medicina estética, cuidado de la piel y bienestar integral en el Blog de Clínica Cialo.",
    alternates: {
        canonical: '/blog/',
    },
};

export default function BlogPage() {
    return <BlogClient />;
}
