import type { Metadata } from "next";
import Link from "next/link";
import TratamientoLandingTemplate from "@/app/components/TratamientoLandingTemplate";

export const metadata: Metadata = {
    title: { absolute: "Cirugía Estética Facial en Los Ángeles Chile | Clínica Cialo" },
    description:
        "Cirugía estética facial en Los Ángeles, Chile. Bichectomía, blefaroplastía, lipoaspiración facial y cervical, otoplastía, lifting cervical, liplift, mentoplastía y más. Evaluación con Dr. Luis Pérez Lagos.",
    keywords:
        "cirugía estética Los Ángeles, bichectomía Chile, blefaroplastía, lipoaspiración facial, otoplastía, lifting cuello, liplift, mentoplastía, cirugía facial, lobuloplastia",
    openGraph: {
        title: "Cirugía Estética Facial en Los Ángeles | Clínica Cialo",
        description:
            "Bichectomía, blefaroplastía, lipo facial y cervical, lifting de cuello, otoplastía, browlift, liplift y mentoplastía. Resultados naturales con enfoque seguro.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/cirugia-estetica-en-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/cirugia-estetica-en-los-angeles",
    },
};

const WHATSAPP = "56982028473";
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

interface Procedimiento {
    id: string;
    nombre: string;
    slug?: string;
    desc: string;
    duracion?: string;
    recuperacion?: string;
    msg: string;
}

const procedimientos: Procedimiento[] = [
    {
        id: "blefaroplastia",
        nombre: "Blefaroplastía",
        slug: "/blefaroplastia-los-angeles",
        desc: "Retiro de exceso de piel y/o bolsas en párpados superiores e inferiores para una mirada más descansada y abierta.",
        duracion: "1 - 2 horas",
        recuperacion: "7 - 14 días",
        msg: "Hola, quiero agendar una evaluación para Blefaroplastía.",
    },
    {
        id: "lipo-facial-cervical",
        nombre: "Lipoaspiración Facial y Cervical",
        slug: "/lipoaspiracion-facial-cervical-los-angeles",
        desc: "Define la mandíbula y el ángulo cérvico-mentoniano. Ideal para papada, mejillas con exceso de grasa y contorno facial.",
        duracion: "1 - 2 horas",
        recuperacion: "7 - 14 días",
        msg: "Hola, quiero agendar una evaluación para Lipoaspiración Facial y Cervical.",
    },
    {
        id: "otoplastia",
        nombre: "Otoplastía",
        slug: "/otoplastia-los-angeles",
        desc: "Corrección de orejas prominentes o asimétricas. Se buscan proporciones naturales y armónicas con el rostro.",
        duracion: "1 - 1.5 horas",
        recuperacion: "7 - 10 días",
        msg: "Hola, quiero agendar una evaluación para Otoplastía.",
    },
    {
        id: "bichectomia",
        nombre: "Bichectomía",
        slug: "/bichectomia-los-angeles",
        desc: "Afinamiento sutil del tercio medio del rostro mediante la reducción de las bolsas de Bichat. Para candidatos seleccionados.",
        duracion: "30 - 45 min",
        recuperacion: "5 - 10 días",
        msg: "Hola, quiero agendar una evaluación para Bichectomía.",
    },
    {
        id: "lifting-cervical",
        nombre: "Lifting Cervical",
        slug: "/lifting-cervical-los-angeles",
        desc: "Tensado de la piel del cuello y tratamiento de las bandas platisma en casos seleccionados de flacidez.",
        duracion: "2 - 3 horas",
        recuperacion: "10 - 20 días",
        msg: "Hola, quiero agendar una evaluación para Lifting Cervical.",
    },
    {
        id: "liplift",
        nombre: "Liplift (Labio Superior)",
        slug: "/liplift-los-angeles",
        desc: "Acorta el filtrum y aumenta la exposición del labio superior, realzando el arco de Cupido de forma natural.",
        duracion: "45 - 60 min",
        recuperacion: "7 - 10 días",
        msg: "Hola, quiero agendar una evaluación para Liplift.",
    },
    {
        id: "cirugia-plastica-facial",
        nombre: "Cirugía Plástica Facial",
        desc: "Diagnóstico completo del envejecimiento facial y asimetrías para definir la técnica quirúrgica más adecuada.",
        duracion: "Evaluación",
        recuperacion: "Según plan",
        msg: "Hola, quiero agendar una evaluación de Cirugía Plástica Facial.",
    },
    {
        id: "browlift",
        nombre: "Browlift (Elevación de Cejas)",
        desc: "Elevación sutil de la cola de la ceja para lograr una mirada más fresca y descansada sin perder expresión.",
        duracion: "1 hora",
        recuperacion: "7 - 10 días",
        msg: "Hola, quiero agendar una evaluación para Browlift.",
    },
    {
        id: "mentoplastia",
        nombre: "Mentoplastía",
        slug: "/mentoplastia-los-angeles",
        desc: "Aumento o reducción del mentón para equilibrar el perfil facial y mejorar la armonía del rostro.",
        duracion: "1 hora",
        recuperacion: "7 - 10 días",
        msg: "Hola, quiero agendar una evaluación para Mentoplastía.",
    },
    {
        id: "lobuloplastia",
        nombre: "Lobuloplastia",
        slug: "/lobuloplastia-los-angeles",
        desc: "Reparación de lóbulos rasgados o agrandados, cierre de dilataciones y remodelación del lóbulo de la oreja.",
        duracion: "30 - 45 min",
        recuperacion: "5 - 7 días",
        msg: "Hola, quiero agendar una evaluación para Lobuloplastia.",
    },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
                { "@type": "ListItem", position: 2, name: "Cirugía Estética Facial", item: "https://cialo.cl/cirugia-estetica-en-los-angeles" },
            ],
        },
        {
            "@type": "MedicalProcedure",
            name: "Cirugía Estética Facial",
            description:
                "Cirugía estética facial: bichectomía, blefaroplastía, lipoaspiración facial y cervical, otoplastía, lifting cervical, liplift, mentoplastía y lobuloplastia.",
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
    titulo: "Cirugía Estética Facial",
    subtitulo: "en Los Ángeles",
    descripcion:
        "Bichectomía, blefaroplastía, lipoaspiración facial y cervical, lifting de cuello, otoplastía, browlift, liplift, mentoplastía y lobuloplastia. Resultados naturales con enfoque seguro y evaluación previa obligatoria.",
    bulletPoints: [
        "Evaluación con Cirujano Maxilofacial",
        "Cirugía ambulatoria con anestesia adecuada",
        "Seguimiento postoperatorio incluido",
        "Protocolos de bioseguridad certificados",
    ],
    proceso: {
        titulo: "Así es nuestro proceso contigo",
        pasos: [
            { numero: "01", titulo: "Evaluación y Diagnóstico", descripcion: "Historia clínica, fotos estandarizadas y definición de objetivos realistas con el cirujano." },
            { numero: "02", titulo: "Plan Quirúrgico", descripcion: "Elección de técnica, indicaciones preoperatorias, análisis y consentimiento informado." },
            { numero: "03", titulo: "Cirugía Ambulatoria", descripcion: "Procedimiento en pabellón con anestesia adecuada y protocolos de bioseguridad." },
            { numero: "04", titulo: "Controles y Recuperación", descripcion: "Seguimiento a 7, 14 días y control final con indicaciones claras para el alta." },
        ],
    },
    beneficios: [
        {
            titulo: "Planificación Clínica",
            descripcion: "Fotografías estandarizadas, mediciones faciales y diseño del plan quirúrgico con expectativas realistas.",
            icono: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6 4h3M9 7h.01",
        },
        {
            titulo: "Seguridad Certificada",
            descripcion: "Anestesia adecuada, trazabilidad del material estéril y equipo entrenado en cirugía ambulatoria.",
            icono: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        },
        {
            titulo: "Recuperación Acompañada",
            descripcion: "Indicaciones claras, analgesia guiada y controles programados para una recuperación tranquila.",
            icono: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        },
        {
            titulo: "Resultados Naturales",
            descripcion: "Priorizamos la armonía facial: la mejor cirugía es la que mejora sin cambiar quién eres.",
            icono: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        },
    ],
    candidatos: [
        { texto: "Personas con <strong>expectativas realistas</strong> y buen estado de salud general." },
        { texto: "Quienes buscan <strong>armonizar su rostro</strong> o corregir signos de envejecimiento facial." },
        { texto: "Pacientes con <strong>flacidez de cuello, papada o exceso de piel</strong> en párpados." },
        { texto: "Candidatos dispuestos a <strong>seguir las indicaciones postoperatorias</strong> y asistir a controles." },
    ],
    contraindicaciones: [
        { texto: "Embarazo o periodo de lactancia." },
        { texto: "Trastornos de coagulación no controlados." },
        { texto: "Enfermedades crónicas descompensadas (se evalúan caso a caso)." },
        { texto: "Infecciones activas en la zona a tratar." },
    ],
    efectosSecundarios: [
        "Hinchazón y posibles equimosis (moretones) durante los primeros días.",
        "Sensibilidad alterada en la zona operada, generalmente transitoria.",
        "Molestia leve a moderada controlada con analgesia indicada.",
    ],
    cuidadosPosteriores: [
        "Asistir a todos los controles postoperatorios programados.",
        "Aplicar frío local las primeras 48 horas según indicación médica.",
        "Evitar ejercicio intenso, calor excesivo y exposición solar directa durante el período indicado.",
        "Seguir al pie de la letra la medicación y curaciones indicadas.",
    ],
    especialista: {
        nombre: "Dr. Luis Pérez Lagos",
        especialidad: "Cirujano Maxilofacial",
        link: "/consultas/evaluacion-maxilofacial",
    },
    faqs: [
        {
            pregunta: "¿La cirugía se realiza con anestesia general o local?",
            respuesta:
                "Depende del procedimiento. Cirugías menores como bichectomía, liplift o lobuloplastia suelen realizarse con anestesia local y sedación. Procedimientos mayores pueden requerir anestesia general. Se define en la evaluación previa.",
        },
        {
            pregunta: "¿Cuánto dura la recuperación?",
            respuesta:
                "Varía según la cirugía. Entre 5 y 14 días la mayoría de los pacientes retorna a actividades normales. El resultado final se aprecia progresivamente entre 1 y 3 meses.",
        },
        {
            pregunta: "¿Las cicatrices se notan mucho?",
            respuesta:
                "Las incisiones se planifican en sitios estratégicos (pliegues naturales, mucosa, detrás de la oreja) para minimizar la visibilidad. El cuidado postoperatorio influye directamente en el resultado de la cicatriz.",
        },
        {
            pregunta: "¿Desde qué edad se puede operar?",
            respuesta:
                "La mayoría de los procedimientos se realizan en mayores de 18 años. Otoplastía puede considerarse desde los 6 años una vez finalizado el desarrollo auricular.",
        },
        {
            pregunta: "¿Necesito evaluación previa obligatoria?",
            respuesta:
                "Sí. Toda cirugía estética requiere una evaluación presencial con el cirujano para confirmar que eres candidato/a, definir la técnica y entregar un plan seguro.",
        },
    ],
    ctaTitulo: "Agenda tu evaluación de cirugía facial",
    ctaDescripcion:
        "Reserva tu hora con el Dr. Luis Pérez Lagos. Evaluamos tu caso, respondemos tus dudas y diseñamos el plan quirúrgico más adecuado para ti.",
    whatsappMessage: "Hola, quiero agendar una evaluación de Cirugía Estética Facial.",
};

function ProcedimientosGrid() {
    return (
        <section className="py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
                        Qué hacemos
                    </span>
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink mb-4">
                        Nuestros procedimientos estrella
                    </h2>
                    <p className="text-olive max-w-2xl mx-auto">
                        Técnicas seguras y planificadas para armonizar rostro y cuello con resultados naturales.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {procedimientos.map((p) => (
                        <div
                            key={p.id}
                            className="group bg-white rounded-2xl border border-ink/10 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            <h3 className="text-lg font-semibold text-ink mb-2 group-hover:text-gold-dark transition-colors">
                                {p.nombre}
                            </h3>
                            <p className="text-sm text-olive leading-relaxed mb-4 flex-grow">{p.desc}</p>

                            <div className="flex flex-wrap gap-2 mb-5">
                                {p.duracion && (
                                    <span className="inline-flex items-center gap-1 text-xs bg-sand/60 text-ink px-2.5 py-1 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {p.duracion}
                                    </span>
                                )}
                                {p.recuperacion && (
                                    <span className="inline-flex items-center gap-1 text-xs bg-sand/60 text-ink px-2.5 py-1 rounded-full">
                                        <svg className="w-3.5 h-3.5 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        {p.recuperacion}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                {p.slug && (
                                    <Link
                                        href={p.slug}
                                        className="inline-flex items-center justify-center gap-2 w-full border border-ink/20 text-ink px-5 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-ink hover:text-white transition-colors"
                                    >
                                        Ver más
                                    </Link>
                                )}
                                <a
                                    href={waLink(p.msg)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full bg-ink text-white px-5 py-3 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-gold transition-colors"
                                >
                                    Agendar evaluación
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function CirugiaEsteticaPage() {
    return (
        <TratamientoLandingTemplate
            data={data}
            breadcrumbLabel="Cirugía Estética Facial"
            jsonLd={jsonLd}
            heroAfter={<ProcedimientosGrid />}
        />
    );
}
