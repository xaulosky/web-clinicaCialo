import { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
    title: "Contacto y Ubicación",
    description: "Contáctanos para agendar tu evaluación o resolver dudas. Estamos ubicados en el centro de Los Ángeles, Chile.",
    alternates: {
        canonical: '/contacto/',
    },
};

export default function ContactoPage() {
    return <ContactoClient />;
}
