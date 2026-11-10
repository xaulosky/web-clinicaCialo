import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Lobuloplastia en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Lobuloplastia en Los Ángeles. Reparación de lóbulos rasgados, agrandados o con dilataciones. Cirugía menor ambulatoria con Dr. Luis Pérez Lagos.",
    keywords:
        "lobuloplastia Los Ángeles, reparación lóbulos rasgados, cierre dilataciones orejas, cirugía menor lóbulo Chile",
    openGraph: {
        title: "Lobuloplastia en Los Ángeles | Clínica Cialo",
        description:
            "Repara lóbulos rasgados, agrandados o dilatados de forma ambulatoria y con cicatriz discreta.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/lobuloplastia-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/lobuloplastia-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
                { "@type": "ListItem", position: 2, name: "Cirugía Estética Facial", item: "https://cialo.cl/cirugia-estetica-en-los-angeles" },
                { "@type": "ListItem", position: 3, name: "Lobuloplastia", item: "https://cialo.cl/lobuloplastia-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Lobuloplastia",
            description:
                "Reparación quirúrgica de lóbulos rasgados, agrandados o con dilataciones en el lóbulo de la oreja.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Earlobe",
            provider: {
                "@type": "MedicalBusiness",
                name: "Clínica Cialo",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Bulnes 220, Of. 509",
                    addressLocality: "Los Ángeles",
                    addressRegion: "Biobío",
                    addressCountry: "CL",
                },
                telephone: "+56982028473",
            },
        },
    ],
};

const data = {
    categoria: "Cirugía Estética Facial",
    titulo: "Lobuloplastia",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Procedimiento ambulatorio que repara lóbulos rasgados, agrandados o con dilataciones. Se realiza con anestesia local y recuperación rápida, dejando una cicatriz discreta.",
    bulletPoints: [
        "Repara lóbulos rasgados o dilatados",
        "Anestesia local",
        "Cirugía menor ambulatoria",
        "Recuperación de 5 a 7 días",
    ],
    duracion: "30 - 45 min",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Análisis del daño del lóbulo: rasgadura, dilatación o deformidad." },
            { numero: "02", titulo: "Diseño", descripcion: "Planificación del cierre o remodelación para recuperar la forma natural del lóbulo." },
            { numero: "03", titulo: "Cirugía", descripcion: "Resección del tejido dañado y sutura fina con anestesia local." },
            { numero: "04", titulo: "Control", descripcion: "Retiro de puntos y valoración de la cicatrización." },
        ],
    },
    beneficios: [
        {
            titulo: "Lóbulo restaurado",
            descripcion: "Recupera la forma y función del lóbulo para usar aretes nuevamente.",
            icono: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
            titulo: "Cicatriz discreta",
            descripcion: "La sutura se realiza siguiendo el contorno del lóbulo para una mejor evolución estética.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
        {
            titulo: "Procedimiento rápido",
            descripcion: "Se realiza en consulta con anestesia local y el paciente se retira el mismo día.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Recuperación sencilla",
            descripcion: "La mayoría retoma sus actividades en pocos días con mínimas molestias.",
            icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>lóbulos rasgados</strong> por uso de aretes pesados." },
        { texto: "Quienes tienen <strong>dilataciones</strong> que desean cerrar." },
        { texto: "Pacientes con <strong>lóbulos agrandados</strong> o deformados." },
        { texto: "Adultos con <strong>buena salud</strong> y expectativas realistas." },
    ],
    contraindicaciones: [
        { texto: "Infecciones activas en el lóbulo." },
        { texto: "Trastornos de coagulación no controlados." },
        { texto: "Cicatrización patológica previa." },
        { texto: "Expectativas irreales." },
    ],
    efectosSecundarios: [
        "Ligera hinchazón y enrojecimiento del lóbulo.",
        "Molestia leve controlada con analgesia.",
        "Cicatriz temporal mientras evoluciona la sutura.",
    ],
    cuidadosPosteriores: [
        "No usar aretes hasta autorización médica.",
        "Mantener la zona limpia y seca.",
        "Evitar tirones o fricción en el lóbulo.",
        "Asistir al control para retiro de puntos.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿Se puede volver a usar aretes después?",
            respuesta: "Sí, una vez completada la cicatrización y con autorización del cirujano, se puede perforar el lóbulo nuevamente en una zona sana.",
        },
        {
            pregunta: "¿La lobuloplastia duele?",
            respuesta: "Se realiza con anestesia local, por lo que el procedimiento es indoloro. Puede haber molestia leve durante el primer día.",
        },
        {
            pregunta: "¿Cuánto tarda en sanar?",
            respuesta: "Los puntos se retiran a los 5-7 días. La cicatriz sigue mejorando durante los siguientes meses.",
        },
        {
            pregunta: "¿Funciona para cerrar dilataciones grandes?",
            respuesta: "Sí, pero el resultado depende del tamaño de la dilatación y la elasticidad del tejido. Se evalúa caso a caso.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Lobuloplastia",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y repara tus lóbulos de forma segura y discreta.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Lobuloplastia.",
};

export default function LobuloplastiaPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Lobuloplastia"
            jsonLd={jsonLd}
        />
    );
}
