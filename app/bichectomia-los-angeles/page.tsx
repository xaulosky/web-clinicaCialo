import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Bichectomía en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Bichectomía en Los Ángeles. Reducción de bolsas de Bichat para afinar el tercio medio del rostro. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "bichectomía Los Ángeles, reducción bolsas de Bichat, rostro más fino, cirugía facial Chile, bichectomía Chile",
    openGraph: {
        title: "Bichectomía en Los Ángeles | Clínica Cialo",
        description:
            "Afinamiento facial sutil y natural mediante bichectomía. Evaluación especializada con Cirujano Maxilofacial.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/bichectomia-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/bichectomia-los-angeles",
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
                { "@type": "ListItem", position: 3, name: "Bichectomía", item: "https://cialo.cl/bichectomia-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Bichectomía",
            description:
                "Procedimiento quirúrgico que reduce las bolsas de Bichat para afinar el tercio medio del rostro.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Face",
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
    titulo: "Bichectomía",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Procedimiento ambulatorio que reduce las bolsas de Bichat para afinar el tercio medio del rostro. Buscamos un resultado armónico y natural, siempre en candidatos seleccionados.",
    bulletPoints: [
        "Afinamiento del tercio medio",
        "Anestesia local y sedación",
        "Incisión intraoral sin cicatriz visible",
        "Recuperación de 5 a 10 días",
    ],
    duracion: "30 - 45 min",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Análisis de la estructura facial, grosor de las bolsas de Bichat y proporciones del rostro." },
            { numero: "02", titulo: "Planificación", descripcion: "Definición de la cantidad de grasa a retirar para mantener expresión natural." },
            { numero: "03", titulo: "Cirugía", descripcion: "Extracción por vía intraoral con anestesia local y sedación." },
            { numero: "04", titulo: "Control", descripcion: "Seguimiento postoperatorio para verificar la evolución y resultados." },
        ],
    },
    beneficios: [
        {
            titulo: "Rostro más definido",
            descripcion: "Suaviza las mejillas voluminosas y resalta los pómulos y mandíbula.",
            icono: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
            titulo: "Resultado natural",
            descripcion: "La grasa se retira de forma conservadora para evitar hundimientos o envejecimiento prematuro.",
            icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Sin cicatriz visible",
            descripcion: "La incisión queda en el interior de la boca, por lo que no deja marca externa.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
        {
            titulo: "Recuperación rápida",
            descripcion: "La mayoría de los pacientes retoma sus actividades en una semana.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>mejillas redondeadas</strong> que desean más definición facial." },
        { texto: "Pacientes con <strong>buena salud general</strong> y piel elástica." },
        { texto: "Quienes buscan un <strong>resultado sutil</strong>, no extremo." },
        { texto: "Candidatos evaluados previamente para descartar asimetrías o estructura ósea marcada." },
    ],
    contraindicaciones: [
        { texto: "Rostros con flacidez marcada o piel sin elasticidad." },
        { texto: "Asimetrías importantes de origen óseo." },
        { texto: "Infecciones bucales activas." },
        { texto: "Expectativas irreales o buscar cambios extremos." },
    ],
    efectosSecundarios: [
        "Hinchazón de las mejillas durante los primeros días.",
        "Molestia leve al masticar o hablar los primeros 3-5 días.",
        "Equimosis leve en la zona interna de la boca.",
    ],
    cuidadosPosteriores: [
        "Realizar enjuagues bucales con solución indicada.",
        "Mantener dieta blanda los primeros días.",
        "Evitar ejercicio intenso durante una semana.",
        "Asistir a los controles programados.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿La bichectomía adelgaza el rostro?",
            respuesta: "Afinan el tercio medio, pero el resultado depende de la estructura ósea, la piel y la cantidad de grasa. No es un procedimiento para perder peso.",
        },
        {
            pregunta: "¿Es una cirugía reversible?",
            respuesta: "No. La grasa retirada no vuelve a crecer, por eso la planificación y conservadurismo son clave.",
        },
        {
            pregunta: "¿Se puede combinar con otra cirugía?",
            respuesta: "Sí, es común combinarla con mentoplastía, lipoaspiración cervical o rinoplastia según los objetivos.",
        },
        {
            pregunta: "¿Cuándo se ve el resultado final?",
            respuesta: "La hinchazón disminuye notablemente a las 2-4 semanas, pero el resultado definitivo se aprecia entre 2 y 3 meses.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Bichectomía",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y descubre si la bichectomía es adecuada para tu tipo de rostro.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Bichectomía.",
};

export default function BichectomiaPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Bichectomía"
            jsonLd={jsonLd}
        />
    );
}
