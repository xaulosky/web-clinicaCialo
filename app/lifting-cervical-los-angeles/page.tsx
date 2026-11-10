import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Lifting Cervical en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Lifting cervical en Los Ángeles. Tensado de cuello y tratamiento de bandas platisma para rejuvenecer el área cervical. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "lifting cervical Los Ángeles, cirugía cuello Chile, rejuvenecimiento cuello, flacidez cervical, bandas platisma",
    openGraph: {
        title: "Lifting Cervical en Los Ángeles | Clínica Cialo",
        description:
            "Tratamiento quirúrgico de flacidez y bandas del cuello. Resultados naturales con seguimiento postoperatorio.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/lifting-cervical-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/lifting-cervical-los-angeles",
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
                { "@type": "ListItem", position: 3, name: "Lifting Cervical", item: "https://cialo.cl/lifting-cervical-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Lifting Cervical",
            description:
                "Cirugía que tensa la piel del cuello y trata las bandas del platisma para rejuvenecer el área cervical.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Neck",
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
    titulo: "Lifting Cervical",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Procedimiento quirúrgico indicado para tratar la flacidez de cuello, exceso de piel y bandas del platisma. Buscamos un rejuvenecimiento natural del área cervical en casos seleccionados.",
    bulletPoints: [
        "Tensado de piel del cuello",
        "Tratamiento de bandas platisma",
        "Anestesia general",
        "Evaluación con Cirujano Maxilofacial",
    ],
    duracion: "2 - 3 horas",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Análisis del grado de flacidez, grasa cervical y estado del platisma. Fotos y plan quirúrgico." },
            { numero: "02", titulo: "Planificación", descripcion: "Diseño de incisiones detrás de la oreja y bajo el mentón si es necesario." },
            { numero: "03", titulo: "Cirugía", descripcion: "Reposicionamiento de tejidos, tratamiento del músculo platisma y retiro de exceso cutáneo." },
            { numero: "04", titulo: "Control", descripcion: "Seguimiento postoperatorio estrecho durante las primeras semanas." },
        ],
    },
    beneficios: [
        {
            titulo: "Cuello rejuvenecido",
            descripcion: "Mejora la flacidez y redefine el ángulo entre mentón y cuello.",
            icono: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
            titulo: "Bandas platisma suavizadas",
            descripcion: "Trata las bandas verticales del cuello que envejecen la zona.",
            icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Resultado natural",
            descripcion: "Evitamos el aspecto tirante; priorizamos la armonía con el rostro.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
        {
            titulo: "Duradero",
            descripcion: "El envejecimiento continúa, pero el resultado se mantiene por años.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>flacidez moderada a severa</strong> de cuello." },
        { texto: "Pacientes con <strong>bandas del platisma</strong> visibles." },
        { texto: "Adultos con <strong>buena salud general</strong> y piel con cierta elasticidad." },
        { texto: "Quienes buscan <strong>mejorar el perfil cervical</strong> sin cambios extremos." },
    ],
    contraindicaciones: [
        { texto: "Enfermedades crónicas descompensadas." },
        { texto: "Trastornos de coagulación no controlados." },
        { texto: "Tabaquismo activo no suspendido." },
        { texto: "Expectativas irreales o enfermedades que afecten la cicatrización." },
    ],
    efectosSecundarios: [
        "Hinchazón y equimosis en cuello y mandíbula durante 2-3 semanas.",
        "Sensibilidad alterada en la zona, generalmente transitoria.",
        "Uso de vendaje compresivo y drenajes según indicación.",
    ],
    cuidadosPosteriores: [
        "Mantener la cabeza elevada durante el descanso.",
        "Usar faja o vendaje compresivo según indicación médica.",
        "Evitar giros bruscos del cuello y ejercicio intenso durante 3-4 semanas.",
        "Asistir a controles para retiro de puntos y curaciones.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿El lifting cervical deja cicatriz visible?",
            respuesta: "Las incisiones se realizan detrás de la oreja y/o bajo el mentón, en sitios estratégicos. Con el tiempo son discretas.",
        },
        {
            pregunta: "¿Se puede combinar con lipoaspiración cervical?",
            respuesta: "Sí, es frecuente asociarlo para tratar grasa localizada y flacidez al mismo tiempo.",
        },
        {
            pregunta: "¿Cuánto dura la recuperación?",
            respuesta: "La mayoría retoma actividades sociales entre 10 y 20 días. El resultado final madura entre 2 y 3 meses.",
        },
        {
            pregunta: "¿El resultado es permanente?",
            respuesta: "El resultado es muy duradero, aunque el envejecimiento natural continúa. El cuidado de la piel y el estilo de vida influyen en la duración.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Lifting Cervical",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y evalúa si el lifting cervical es la mejor opción para ti.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Lifting Cervical.",
};

export default function LiftingCervicalPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Lifting Cervical"
            jsonLd={jsonLd}
        />
    );
}
