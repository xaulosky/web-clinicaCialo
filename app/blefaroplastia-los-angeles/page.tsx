import type { Metadata } from "next";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Blefaroplastía en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Blefaroplastía superior e inferior en Los Ángeles. Retiro de exceso de piel y bolsas para una mirada descansada. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "blefaroplastía Los Ángeles, cirugía párpados Chile, blefaroplastía superior, blefaroplastía inferior, ojeras bolsas, párpados caídos",
    openGraph: {
        title: "Blefaroplastía en Los Ángeles | Clínica Cialo",
        description:
            "Corrige párpados caídos y bolsas. Cirugía de párpados con evaluación especializada y seguimiento postoperatorio.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/blefaroplastia-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/blefaroplastia-los-angeles",
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
                { "@type": "ListItem", position: 3, name: "Blefaroplastía", item: "https://cialo.cl/blefaroplastia-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Blefaroplastía",
            description:
                "Cirugía de párpados superior e inferior que elimina exceso de piel y bolsas para rejuvenecer la mirada.",
            procedureType: "SurgicalProcedure",
            bodyLocation: "Eyelid",
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
    titulo: "Blefaroplastía",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Cirugía de párpados superior e inferior que elimina el exceso de piel y las bolsas de grasa. Ideal para quienes buscan una mirada más descansada, abierta y rejuvenecida.",
    bulletPoints: [
        "Párpados superiores e inferiores",
        "Cirugía ambulatoria con anestesia local",
        "Recuperación entre 7 y 14 días",
        "Evaluación con Cirujano Maxilofacial",
    ],
    duracion: "1 - 2 horas",
    heroImagen: "/tratamientos/blefaroplastia/2.webp",
    proceso: {
        titulo: "Cómo es el procedimiento",
        pasos: [
            { numero: "01", titulo: "Evaluación", descripcion: "Análisis de párpados, piel sobrante, bolsas y posición de la ceja. Fotos estandarizadas y plan quirúrgico." },
            { numero: "02", titulo: "Diseño", descripcion: "Marcación del exceso cutáneo y definición de la incisión camuflada en el pliegue natural." },
            { numero: "03", titulo: "Cirugía", descripcion: "Retiro de piel y grasa, reposicionamiento de tejidos y cierre fino con suturas." },
            { numero: "04", titulo: "Control", descripcion: "Retiro de puntos a los 5-7 días y seguimiento hasta el alta." },
        ],
    },
    beneficios: [
        {
            titulo: "Mirada rejuvenecida",
            descripcion: "Reduce la apariencia de cansancio y envejecimiento en la zona periocular.",
            icono: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
        },
        {
            titulo: "Mejor campo visual",
            descripcion: "En párpados superiores caídos puede aliviar la pesadez y mejorar la visión superior.",
            icono: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.96c.3.922-.755 1.688-1.539 1.118l-3.37-2.447a1 1 0 00-1.175 0l-3.37 2.447c-.783.57-1.838-.196-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.343 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z",
        },
        {
            titulo: "Cicatriz discreta",
            descripcion: "Las incisiones se ocultan en pliegues naturales para un resultado imperceptible a largo plazo.",
            icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
        {
            titulo: "Resultados duraderos",
            descripcion: "El envejecimiento continúa, pero el exceso de piel eliminado no vuelve a aparecer.",
            icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>párpados superiores caídos</strong> o exceso de piel que dificulta la mirada." },
        { texto: "Quienes presentan <strong>bolsas</strong> en párpados inferiores o surcos marcados." },
        { texto: "Pacientes con <strong>buena salud general</strong> y expectativas realistas." },
        { texto: "Adultos que buscan un <strong>resultado natural</strong> sin cambiar la expresión." },
    ],
    contraindicaciones: [
        { texto: "Enfermedades oculares activas no tratadas." },
        { texto: "Trastornos de coagulación no controlados." },
        { texto: "Enfermedades autoinmunes o cicatrización anormal." },
        { texto: "Expectativas irreales sobre el resultado." },
    ],
    efectosSecundarios: [
        "Hinchazón y equimosis (moretones) durante la primera semana.",
        "Lagrimeo, sensibilidad a la luz o sequedad ocular transitoria.",
        "Sensibilidad alterada en el párpado, generalmente temporal.",
    ],
    cuidadosPosteriores: [
        "Aplicar frío local las primeras 48 horas.",
        "Dormir con la cabeza elevada durante 3-5 días.",
        "Evitar maquillaje en la zona durante la primera semana.",
        "Usar protector solar y gafas de sol al salir.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    galeria: {
        subtitulo: "En pabellón",
        titulo: "El procedimiento en Clínica CIALO",
        imagenes: [
            "/tratamientos/blefaroplastia/1.webp",
            "/tratamientos/blefaroplastia/2.webp",
            "/tratamientos/blefaroplastia/3.webp",
        ],
    },
    faqs: [
        {
            pregunta: "¿Se opera párpado superior e inferior al mismo tiempo?",
            respuesta: "Sí, es frecuente realizar ambos en una misma sesión. La decisión depende de la evaluación clínica y los objetivos de cada paciente.",
        },
        {
            pregunta: "¿Cuándo se retiran los puntos?",
            respuesta: "Generalmente entre el quinto y séptimo día postoperatorio, según la evolución de la cicatriz.",
        },
        {
            pregunta: "¿La blefaroplastía corrige las ojeras oscuras?",
            respuesta: "Mejora las bolsas y el surco, pero no el pigmento oscuro de la piel. Si hay componente pigmentario se evalúan tratamientos complementarios.",
        },
        {
            pregunta: "¿Cuánto dura el resultado?",
            respuesta: "El resultado es muy duradero. El envejecimiento continúa, pero el exceso de piel eliminado no regresa.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación para Blefaroplastía",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos y descubre si eres candidato/a para cirugía de párpados.",
    whatsappMessage: "Hola, quiero agendar una evaluación para Blefaroplastía.",
};

export default function BlefaroplastiaPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Blefaroplastía"
            jsonLd={jsonLd}
        />
    );
}
