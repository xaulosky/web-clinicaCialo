import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Liplift en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Liplift o lifting del labio superior en Los Ángeles. Acorta el filtrum y expone más el labio superior para realzar el arco de Cupido. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "liplift Los Ángeles, lifting labio superior, acortar filtrum, arco de Cupido, labio más expuesto Chile",
    openGraph: {
        title: "Liplift en Los Ángeles | Clínica Cialo",
        description:
            "Realza el labio superior de forma natural sin aumento de volumen. Indicado para labios largos o filtrum extendido.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/liplift-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/liplift-los-angeles",
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
                { "@type": "ListItem", position: 3, name: "Liplift", item: "https://cialo.cl/liplift-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Liplift",
            description:
                "Procedimiento quirúrgico que acorta el filtrum y aumenta la exposición del labio superior realzando su forma.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Lip",
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
    titulo: "Liplift",
    subtitulo: "(Labio Superior) en Los Ángeles",
    descripcion:
        "Procedimiento quirúrgico que acorta el espacio entre la nariz y el labio superior, aumentando la exposición del labio y realzando el arco de Cupido. Ideal para quienes buscan un resultado permanente sin rellenos.",
    bulletPoints: [
        "Aumenta exposición del labio superior",
        "Realza el arco de Cupido",
        "Anestesia local",
        "Recuperación de 7 a 10 días",
    ],
    duracion: "45 - 60 min",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Medición del filtrum, relación nariz-labio y forma del labio superior." },
            { numero: "02", titulo: "Diseño", descripcion: "Marcación del exceso de piel a retirar bajo la base de la nariz." },
            { numero: "03", titulo: "Cirugía", descripcion: "Resección de piel en forma de cuña y sutura fina siguiendo el contorno del arco de Cupido." },
            { numero: "04", titulo: "Control", descripcion: "Retiro de puntos y seguimiento de la cicatriz." },
        ],
    },
    beneficios: [
        {
            titulo: "Labio más expuesto",
            descripcion: "El labio superior queda más visible sin necesidad de aumento con relleno.",
            icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Arco de Cupido definido",
            descripcion: "Resalta la curvatura natural del labio superior para un aspecto más armónico.",
            icono: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
            titulo: "Resultado permanente",
            descripcion: "A diferencia de los rellenos, el liplift no requiere mantenimiento periódico.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Cicatriz discreta",
            descripcion: "La incisión se oculte en el pliegue bajo la nariz, con buena evolución estética.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>filtrum largo</strong> y labio superior poco expuesto." },
        { texto: "Quienes buscan un <strong>resultado permanente</strong> sin depender de rellenos." },
        { texto: "Pacientes con <strong>buena salud</strong> y expectativas realistas." },
        { texto: "Adultos que desean <strong>resaltar el arco de Cupido</strong>." },
    ],
    contraindicaciones: [
        { texto: "Labios ya muy cortos o exposición dental excesiva." },
        { texto: "Cicatrización anormal o queloides." },
        { texto: "Infecciones activas en la zona." },
        { texto: "Expectativas irreales." },
    ],
    efectosSecundarios: [
        "Hinchazón y sensibilidad del labio superior durante la primera semana.",
        "Cicatriz rojiza bajo la nariz que evoluciona con el tiempo.",
        "Ligeras molestias al hablar o sonreír los primeros días.",
    ],
    cuidadosPosteriores: [
        "Mantener la zona limpia y aplicar cicatrizante según indicación.",
        "Evitar movimientos exagerados de la boca los primeros días.",
        "No usar maquillaje sobre la cicatriz hasta autorización.",
        "Proteger la zona del sol con protector solar.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿El liplift aumenta el volumen de los labios?",
            respuesta: "No aumenta el volumen. Expone más el labio superior y mejora su forma. Si se desea volumen, puede complementarse con ácido hialurónico.",
        },
        {
            pregunta: "¿La cicatriz se nota?",
            respuesta: "Se ubica en el pliegue bajo la nariz. Con el cuidado adecuado y el tiempo suele ser muy discreta.",
        },
        {
            pregunta: "¿Puedo comer normalmente después?",
            respuesta: "Se recomienda dieta blanda y evitar movimientos exagerados de la boca durante los primeros 3-5 días.",
        },
        {
            pregunta: "¿Cuándo se ve el resultado?",
            respuesta: "La hinchazón mejora notablemente a las 2-3 semanas. El resultado definitivo se aprecia entre 2 y 3 meses.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Liplift",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y descubre si el liplift es adecuado para tu perfil facial.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Liplift.",
};

export default function LipliftPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Liplift"
            jsonLd={jsonLd}
        />
    );
}
