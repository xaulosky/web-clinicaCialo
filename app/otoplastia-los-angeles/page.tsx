import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Otoplastía en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Otoplastía en Los Ángeles. Corrección de orejas prominentes para niños y adultos. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "otoplastía Los Ángeles, orejas prominentes, cirugía orejas Chile, orejas de soplillo, otoplastia adultos",
    openGraph: {
        title: "Otoplastía en Los Ángeles | Clínica Cialo",
        description:
            "Corrige orejas prominentes o asimétricas con resultado natural y proporciones armónicas.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/otoplastia-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/otoplastia-los-angeles",
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
                { "@type": "ListItem", position: 3, name: "Otoplastía", item: "https://cialo.cl/otoplastia-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Otoplastía",
            description:
                "Cirugía correctiva de orejas prominentes o asimétricas mediante remodelación del cartílago.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Ear",
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
    titulo: "Otoplastía",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Cirugía que corrige orejas prominentes, asimétricas o de soplillo. Remodela el cartílago para lograr proporciones naturales y armoniosas con el rostro.",
    bulletPoints: [
        "Para niños y adultos",
        "Anestesia local o general según edad",
        "Incisión discreta detrás de la oreja",
        "Recuperación de 7 a 10 días",
    ],
    duracion: "1 - 1.5 horas",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Análisis de la forma, tamaño y posición de las orejas. Planificación de la corrección." },
            { numero: "02", titulo: "Diseño", descripcion: "Marcación de la incisión posterior y definición del nuevo plegamiento cartilaginoso." },
            { numero: "03", titulo: "Cirugía", descripcion: "Remodelación del cartílago y fijación de la oreja en su nueva posición." },
            { numero: "04", titulo: "Control", descripcion: "Retiro de vendaje y puntos, con seguimiento de la posición y cicatrización." },
        ],
    },
    beneficios: [
        {
            titulo: "Mayor armonía",
            descripcion: "Las orejas quedan más cercanas al cráneo y en proporción con el rostro.",
            icono: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
            titulo: "Resultado permanente",
            descripcion: "El cartílago modelado conserva su nueva forma de forma duradera.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Cicatriz oculta",
            descripcion: "La incisión queda en el pliegue posterior de la oreja, prácticamente imperceptible.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
        {
            titulo: "Mejora la confianza",
            descripcion: "Especialmente en niños y adolescentes, reduce el impacto psicosocial de las orejas prominentes.",
            icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        },
    ],
    candidatos: [
        { texto: "Niños a partir de los <strong>6 años</strong> con desarrollo auricular completo." },
        { texto: "Adultos con <strong>orejas prominentes</strong>, asimétricas o malformadas leves." },
        { texto: "Pacientes con <strong>buena salud</strong> y expectativas realistas." },
        { texto: "Quienes buscan un <strong>resultado natural</strong> sin apariencia operada." },
    ],
    contraindicaciones: [
        { texto: "Infecciones activas de oído o piel." },
        { texto: "Trastornos de coagulación no controlados." },
        { texto: "Anomalías cartilaginosas complejas que requieran abordaje especializado." },
        { texto: "Expectativas irreales sobre el cambio." },
    ],
    efectosSecundarios: [
        "Hinchazón y sensibilidad de las orejas durante la primera semana.",
        "Uso de vendaje o diadema compresiva según indicación.",
        "Enrojecimiento temporal de la piel.",
    ],
    cuidadosPosteriores: [
        "Usar la diadema o vendaje indicado, especialmente al dormir.",
        "Evitar presionar o doblar las orejas durante las primeras semanas.",
        "No realizar actividad física de contacto durante 3-4 semanas.",
        "Asistir a controles para retiro de puntos y evaluación.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿A qué edad se puede operar una otoplastía?",
            respuesta: "Se recomienda a partir de los 6 años, cuando el cartílago auricular ha alcanzado el 90% de su desarrollo. También es efectiva en adultos.",
        },
        {
            pregunta: "¿Las orejas vuelven a salir?",
            respuesta: "Si el cartílago se remodela y fija correctamente, el resultado es permanente. Recurrencias son raras si se siguen las indicaciones.",
        },
        {
            pregunta: "¿Se notan las cicatrices?",
            respuesta: "La incisión se realiza por detrás de la oreja, en un pliegue natural. Con el tiempo la cicatriz es muy poco visible.",
        },
        {
            pregunta: "¿Cuánto tiempo se necesita de reposo?",
            respuesta: "La mayoría retorna a clases o trabajo en una semana. Se recomienda evitar deportes de contacto durante 3-4 semanas.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Otoplastía",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y evalúa la mejor opción para corregir orejas prominentes.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Otoplastía.",
};

export default function OtoplastiaPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Otoplastía"
            jsonLd={jsonLd}
        />
    );
}
