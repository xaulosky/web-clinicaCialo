import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Mentoplastía en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Mentoplastía en Los Ángeles. Aumento o reducción del mentón para equilibrar el perfil facial. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "mentoplastía Los Ángeles, cirugía mentón Chile, aumento mentón, reducción mentón, perfil facial",
    openGraph: {
        title: "Mentoplastía en Los Ángeles | Clínica Cialo",
        description:
            "Equilibra el perfil facial con aumento o reducción de mentón. Resultados naturales y seguimiento.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/mentoplastia-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/mentoplastia-los-angeles",
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
                { "@type": "ListItem", position: 3, name: "Mentoplastía", item: "https://cialo.cl/mentoplastia-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Mentoplastía",
            description:
                "Cirugía de aumento o reducción del mentón para mejorar el equilibrio del perfil facial.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Chin",
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
    titulo: "Mentoplastía",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Cirugía que modifica el tamaño y proyección del mentón para armonizar el perfil facial. Puede realizarse mediante aumento con implante o reducción ósea, según la evaluación.",
    bulletPoints: [
        "Aumento o reducción de mentón",
        "Mejora el equilibrio del perfil",
        "Anestesia local o general",
        "Recuperación de 7 a 10 días",
    ],
    duracion: "1 hora",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Análisis del perfil facial, proyección del mentón y relación con nariz y mandíbula." },
            { numero: "02", titulo: "Planificación", descripcion: "Definición de aumento con implante o reducción ósea según la estructura facial." },
            { numero: "03", titulo: "Cirugía", descripcion: "Colocación del implante por vía intraoral o remodelación ósea con técnicas precisas." },
            { numero: "04", titulo: "Control", descripcion: "Seguimiento de la cicatrización, posición y resultado estético." },
        ],
    },
    beneficios: [
        {
            titulo: "Perfil equilibrado",
            descripcion: "Mejora la relación entre mentón, labios y nariz para un rostro más armónico.",
            icono: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
            titulo: "Resultado natural",
            descripcion: "Seleccionamos tamaño y proyección acordes a la anatomía de cada paciente.",
            icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Sin cicatriz visible",
            descripcion: "Cuando es posible, el abordaje es intraoral para evitar marcas externas.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
        {
            titulo: "Duradero",
            descripcion: "El implante o la remodelación ósea mantienen el resultado a largo plazo.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>mentón retraído o poco proyectado</strong>." },
        { texto: "Quienes presentan <strong>mentón prominente</strong> y buscan reducirlo." },
        { texto: "Pacientes con <strong>perfil facial desarmónico</strong>." },
        { texto: "Adultos con <strong>buena salud</strong> y expectativas realistas." },
    ],
    contraindicaciones: [
        { texto: "Infecciones bucales activas no tratadas." },
        { texto: "Trastornos de coagulación no controlados." },
        { texto: "Enfermedades que afecten los huesos o tejidos blandos." },
        { texto: "Expectativas irreales." },
    ],
    efectosSecundarios: [
        "Hinchazón y sensibilidad en mentón y labio inferior durante la primera semana.",
        "Entumecimiento transitorio del labio inferior.",
        "Molestia al masticar o hablar los primeros días.",
    ],
    cuidadosPosteriores: [
        "Mantener dieta blanda los primeros días.",
        "Realizar higiene bucal con enjuagues indicados.",
        "Evitar golpes en la zona del mentón.",
        "Asistir a controles postoperatorios programados.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿La mentoplastía se hace con implante o con hueso propio?",
            respuesta: "El aumento suele realizarse con implante de silicona médica o relleno óseo. La reducción implica remodelación del hueso propio.",
        },
        {
            pregunta: "¿La cicatriz queda visible?",
            respuesta: "El abordaje más frecuente es intraoral, por lo que no hay cicatriz externa visible.",
        },
        {
            pregunta: "¿Cuándo se ve el resultado final?",
            respuesta: "La hinchazón disminuye en 2-3 semanas. El resultado definitivo se aprecia entre 2 y 3 meses.",
        },
        {
            pregunta: "¿Se puede combinar con otra cirugía facial?",
            respuesta: "Sí, es frecuente combinarla con rinoplastia, lipoaspiración cervical o bichectomía para armonizar el perfil.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Mentoplastía",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y evalúa si la mentoplastía mejora tu perfil facial.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Mentoplastía.",
};

export default function MentoplastiaPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Mentoplastía"
            jsonLd={jsonLd}
        />
    );
}
