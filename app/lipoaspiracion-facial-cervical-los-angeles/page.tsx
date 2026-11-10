import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Lipoaspiración Facial y Cervical en Los Ángeles | Clínica Cialo" },
    description:
        "Lipoaspiración facial y cervical en Los Ángeles. Define mandíbula, reduce papada y mejora el ángulo cérvico-mentoniano. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "lipoaspiración facial Los Ángeles, lipo papada, lipo cervical, doble mentón, mandíbula definida, lipopapada Chile",
    openGraph: {
        title: "Lipoaspiración Facial y Cervical en Los Ángeles | Clínica Cialo",
        description:
            "Define el contorno mandibular y reduce papada con lipoaspiración facial y cervical. Resultados naturales y seguimiento.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/lipoaspiracion-facial-cervical-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/lipoaspiracion-facial-cervical-los-angeles",
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
                { "@type": "ListItem", position: 3, name: "Lipoaspiración Facial y Cervical", item: "https://cialo.cl/lipoaspiracion-facial-cervical-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Lipoaspiración Facial y Cervical",
            description:
                "Cirugía que extrae grasa localizada de cara y cuello para definir mandíbula y reducir papada.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Face and Neck",
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
    titulo: "Lipoaspiración Facial y Cervical",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Procedimiento quirúrgico que extrae grasa localizada de mejillas, papada y cuello para definir la mandíbula y mejorar el ángulo cérvico-mentoniano. Resultado natural y duradero.",
    bulletPoints: [
        "Reduce papada y doble mentón",
        "Define mandíbula y contorno facial",
        "Cirugía ambulatoria",
        "Evaluación con Cirujano Maxilofacial",
    ],
    duracion: "1 - 2 horas",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Análisis de grasa localizada, calidad de la piel y estructura ósea. Definición de zonas a tratar." },
            { numero: "02", titulo: "Marcación", descripcion: "Diseño de los contornos objetivo y planificación de la aspiración." },
            { numero: "03", titulo: "Lipoaspiración", descripcion: "Extracción de grasa mediante cánulas finas por incisiones mínimas y discretas." },
            { numero: "04", titulo: "Control", descripcion: "Seguimiento postoperatorio con curaciones y valoración del resultado." },
        ],
    },
    beneficios: [
        {
            titulo: "Mandíbula definida",
            descripcion: "Resalta el ángulo mandibular y mejora el perfil facial.",
            icono: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        },
        {
            titulo: "Reduce papada",
            descripcion: "Disminuye el volumen graso bajo el mentón que genera el aspecto de doble mentón.",
            icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Resultado natural",
            descripcion: "La grasa se retira de forma proporcionada para mantener la armonía del rostro.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
        {
            titulo: "Duradero",
            descripcion: "Las células grasas extraídas no vuelven a regenerarse en la zona tratada.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>grasa localizada</strong> en papada, cuello o mejillas." },
        { texto: "Pacientes con <strong>buena elasticidad cutánea</strong> para que la piel retraje bien." },
        { texto: "Quienes buscan <strong>definir el perfil facial</strong> sin cambios extremos." },
        { texto: "Adultos con <strong>salud estable</strong> y expectativas realistas." },
    ],
    contraindicaciones: [
        { texto: "Piel con flacidez severa que requiera lifting asociado." },
        { texto: "Trastornos metabólicos o de coagulación no controlados." },
        { texto: "Obesidad generalizada no tratada." },
        { texto: "Expectativas irreales o búsqueda de pérdida de peso." },
    ],
    efectosSecundarios: [
        "Hinchazón y equimosis en cuello y mandíbula durante 7-14 días.",
        "Sensibilidad alterada en la zona, generalmente transitoria.",
        "Uso de faja o vendaje compresivo el primer tiempo.",
    ],
    cuidadosPosteriores: [
        "Usar faja compresiva según indicación médica.",
        "Dormir con la cabeza elevada durante al menos una semana.",
        "Evitar ejercicio intenso durante 2 semanas.",
        "Mantener controles postoperatorios programados.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿La lipoaspiración facial elimina la papada?",
            respuesta: "Sí, es uno de los procedimientos más efectivos para reducir grasa localizada en papada y cuello cuando hay buena elasticidad de piel.",
        },
        {
            pregunta: "¿Se puede hacer con anestesia local?",
            respuesta: "En zonas pequeñas puede realizarse con anestesia local y sedación. En procedimientos más extensos se prefiere anestesia general.",
        },
        {
            pregunta: "¿Cuánto dura la hinchazón?",
            respuesta: "La mayor parte de la hinchazón baja entre la segunda y tercera semana. El resultado final se aprecia entre 2 y 3 meses.",
        },
        {
            pregunta: "¿La grasa vuelve a salir?",
            respuesta: "Las células grasas aspiradas no vuelven. Si se sube mucho de peso, pueden aumentar de tamaño las células restantes.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Lipoaspiración Facial",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y evalúa si eres candidato/a para definir mandíbula y reducir papada.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Lipoaspiración Facial y Cervical.",
};

export default function LipoaspiracionFacialCervicalPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Lipoaspiración Facial y Cervical"
            jsonLd={jsonLd}
        />
    );
}
