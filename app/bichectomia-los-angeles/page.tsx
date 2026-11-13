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
    guia: {
        titulo: "Todo lo que debes saber sobre la bichectomía",
        intro:
            "La bichectomía es una de las cirugías faciales más consultadas, pero no es para todos los rostros. Aquí te explicamos qué es, quién es buen candidato, cómo es la recuperación y qué resultado puedes esperar.",
        secciones: [
            {
                titulo: "¿Qué es la bichectomía y qué son las bolsas de Bichat?",
                parrafos: [
                    "Las bolsas de Bichat son dos acúmulos de grasa que se ubican en la zona media de las mejillas, por debajo del pómulo. Su tamaño depende de la genética y no cambia mucho al bajar de peso, por eso hay personas delgadas que mantienen un rostro redondeado.",
                    "La bichectomía es una cirugía menor que retira parcialmente esa grasa a través de una pequeña incisión dentro de la boca. El objetivo no es adelgazar la cara, sino afinar el tercio medio y dar más definición a los pómulos y a la línea de la mandíbula.",
                ],
            },
            {
                titulo: "¿Quién es buen candidato para una bichectomía?",
                parrafos: [
                    "El mejor resultado se logra en personas jóvenes o adultas con mejillas voluminosas por grasa (no por músculo ni por estructura ósea) y con buena elasticidad de la piel. Por eso la evaluación con el cirujano maxilofacial es indispensable antes de decidir.",
                    "En la consulta se analiza la proporción del rostro, el grosor de los tejidos, la mordida y la musculatura masticatoria. Si el volumen se debe a un músculo masetero aumentado o a la forma del hueso, la bichectomía no es la solución y se proponen otras alternativas.",
                ],
                lista: [
                    "Mejillas redondeadas que no cambian con la baja de peso.",
                    "Piel firme, sin flacidez marcada.",
                    "Expectativa de un cambio sutil y armónico.",
                    "Buena salud general y bucal.",
                ],
            },
            {
                titulo: "¿Cómo es la cirugía paso a paso?",
                parrafos: [
                    "Es un procedimiento ambulatorio que dura entre 30 y 45 minutos. Se realiza con anestesia local y, si corresponde, sedación, por lo que no se siente dolor durante la intervención y el paciente vuelve a su casa el mismo día.",
                    "El cirujano hace una incisión de alrededor de un centímetro en la mucosa interna de cada mejilla, extrae la cantidad de grasa planificada y cierra con puntos reabsorbibles. Como la incisión queda dentro de la boca, no hay cicatrices visibles en la cara.",
                ],
            },
            {
                titulo: "Recuperación después de la bichectomía",
                parrafos: [
                    "Los primeros tres a cinco días son los de mayor hinchazón y molestia al abrir la boca o masticar. La mayoría de las personas vuelve a trabajar o estudiar entre el quinto y el séptimo día, dependiendo de su actividad.",
                    "Durante la recuperación se indica dieta blanda, enjuagues bucales, analgésicos y evitar el ejercicio intenso por una semana. La inflamación baja de forma notoria entre la segunda y la cuarta semana, y el resultado definitivo se aprecia entre los dos y tres meses.",
                ],
            },
            {
                titulo: "Riesgos y por qué el criterio conservador es clave",
                parrafos: [
                    "Como toda cirugía, puede tener complicaciones poco frecuentes: hematoma, infección o asimetría. El riesgo más relevante a largo plazo es retirar demasiada grasa, porque con la edad el rostro pierde volumen de forma natural y una extracción excesiva puede dar un aspecto hundido o envejecido.",
                    "Por eso en Clínica Cialo la planificación es conservadora: se retira solo la porción necesaria para afinar el tercio medio y mantener un resultado natural en el tiempo.",
                ],
            },
            {
                titulo: "¿Cuánto cuesta una bichectomía en Los Ángeles?",
                parrafos: [
                    "El valor se define en la evaluación con el Dr. Luis Pérez Lagos, porque depende de si la bichectomía se realiza sola o combinada con otro procedimiento, del tipo de anestesia y de los controles incluidos. En la consulta recibes un presupuesto cerrado y puedes pagar en hasta 12 cuotas.",
                ],
            },
        ],
    },
    relacionados: [
        { titulo: "Mentoplastía", href: "/mentoplastia-los-angeles/", descripcion: "Proyecta el mentón y equilibra el perfil; se combina a menudo con bichectomía." },
        { titulo: "Lipoaspiración facial y cervical", href: "/lipoaspiracion-facial-cervical-los-angeles/", descripcion: "Define la papada y el ángulo de la mandíbula." },
        { titulo: "Armonización orofacial", href: "/armonizacion-orofacial-los-angeles/", descripcion: "Mejora proporciones con procedimientos sin cirugía." },
        { titulo: "Cirugía estética facial", href: "/cirugia-estetica-en-los-angeles/", descripcion: "Todas las cirugías faciales ambulatorias de la clínica." },
    ],
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
        {
            pregunta: "¿La bichectomía duele?",
            respuesta: "Durante la cirugía no, porque se realiza con anestesia local y sedación si corresponde. Después hay molestia moderada al masticar y abrir la boca los primeros días, que se controla con analgésicos.",
        },
        {
            pregunta: "¿Cuántos días de reposo necesito?",
            respuesta: "La mayoría de los pacientes retoma el trabajo o los estudios entre el quinto y el séptimo día. El ejercicio intenso se reanuda después de una semana, según la indicación del cirujano.",
        },
        {
            pregunta: "¿Deja cicatriz?",
            respuesta: "No hay cicatrices visibles: la incisión se hace dentro de la boca y se cierra con puntos reabsorbibles.",
        },
        {
            pregunta: "¿Desde qué edad se puede hacer?",
            respuesta: "Se recomienda en adultos, cuando el crecimiento facial ya terminó. La decisión depende más de la anatomía y de las expectativas que de la edad, y se define en la evaluación.",
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
