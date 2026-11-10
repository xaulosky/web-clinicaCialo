import { Metadata } from "next";
import ProductosClient from "./ProductosClient";

export const metadata: Metadata = {
    title: "Productos Dermocosméticos Premium",
    description: "Selección exclusiva de productos dermatológicos de alta gama para el cuidado de tu piel. Disponible en Clínica Cialo, Los Ángeles.",
    alternates: {
        canonical: '/productos/',
    },
};

export default function ProductosPage() {
    return <ProductosClient />;
}
