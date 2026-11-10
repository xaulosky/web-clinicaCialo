import { Metadata } from "next";
import ProfesionalesClient from "./ProfesionalesClient";

export function generateMetadata(): Metadata {
    return {
        title: "Equipo médico | Clínica CIALO Los Ángeles",
        description:
            "Conoce al equipo médico de Clínica CIALO en Los Ángeles, Chile: especialistas en medicina estética, ginecología, urología, nutrición, estética capilar, corporal, facial y cirugía vascular. Agenda tu evaluación.",
        alternates: {
            canonical: "/profesionales",
        },
        openGraph: {
            title: "Equipo médico | Clínica CIALO Los Ángeles",
            description:
                "Especialistas en medicina estética, ginecología, urología, nutrición y más. Conoce al equipo médico de Clínica CIALO en Los Ángeles, Biobío.",
            type: "website",
            locale: "es_CL",
            url: "https://cialo.cl/profesionales",
        },
    };
}

export default function ProfesionalesPage() {
    return <ProfesionalesClient />;
}
