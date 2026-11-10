import { Metadata } from "next";
import TratamientosClient from "./TratamientosClient";

export const metadata: Metadata = {
    title: "Tratamientos de Medicina Estética",
    description: "Explora nuestra amplia gama de tratamientos faciales, corporales, capilares y más. Tecnología de vanguardia para resultados naturales en Los Ángeles.",
    alternates: {
        canonical: '/tratamientos/',
    },
};

export default function TratamientosPage() {
    return <TratamientosClient />;
}
