import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import GuiaTratamiento, { SeccionGuia, TratamientoRelacionado } from "@/app/components/GuiaTratamiento";

export const metadata: Metadata = {
    title: { absolute: "Relleno de Ojeras en Los Ángeles | Clínica CIALO" },
    description:
        "Relleno de ojeras con ácido hialurónico en Los Ángeles, Biobío. Elimina las ojeras hundidas y el cansancio del rostro. Resultados inmediatos y naturales. Duración 12–18 meses.",
    keywords:
        "relleno ojeras Los Ángeles, ácido hialurónico ojeras Chile, tear trough filler Biobío, ojeras hundidas tratamiento, relleno periocular",
    alternates: { canonical: "https://cialo.cl/relleno-ojeras-los-angeles" },
    openGraph: {
        title: "Relleno de Ojeras | Ácido Hialurónico | Clínica CIALO Los Ángeles",
        description:
            "Elimina las ojeras hundidas con ácido hialurónico. Resultados inmediatos, aspecto natural y duración de hasta 18 meses.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/relleno-ojeras-los-angeles",
    },
};

const WHATSAPP = "56982028473";
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const AGENDA = "https://reservas.clinios.cl/cialo/reservar/elga-viviana-pena";

const faqs = [
    {
        q: "¿Cuánto tiempo dura el procedimiento?",
        a: "Entre 30 y 45 minutos, incluyendo la anestesia tópica. Es ambulatorio y puedes volver a tus actividades el mismo día.",
    },
    {
        q: "¿Duele el relleno de ojeras?",
        a: "La zona periocular es sensible, por eso se aplica crema anestésica previa. La mayoría de pacientes lo describe como una molestia leve y tolerable.",
    },
    {
        q: "¿Cuánto duran los resultados?",
        a: "Entre 12 y 18 meses, dependiendo del producto utilizado y del metabolismo individual. Una sesión de mantenimiento anual permite mantener el resultado.",
    },
    {
        q: "¿Es reversible?",
        a: "Sí. El ácido hialurónico puede disolverse con hialuronidasa en caso necesario, lo que hace que sea un tratamiento completamente seguro.",
    },
    {
        q: "¿Hay riesgo de efecto Tyndall (color azulado)?",
        a: "Con la técnica y el producto adecuados, el riesgo es mínimo. En Clínica CIALO utilizamos productos especialmente formulados para la zona periocular y técnica de cánula para mayor seguridad.",
    },
    {
        q: "¿Cuándo puedo maquillarme?",
        a: "Se recomienda esperar 24 horas antes de maquillarse. También se sugiere evitar actividad física intensa y calor directo (sauna, sol) por 48 horas.",
    },
    {
        q: "¿El relleno de ojeras sirve para las bolsas?",
        a: "Solo en casos leves, donde el relleno disimula el desnivel entre la bolsa y la mejilla. Si las bolsas son grandes, el relleno puede empeorarlas y lo indicado es una blefaroplastia.",
    },
    {
        q: "¿Sirve para las ojeras oscuras?",
        a: "Depende del origen. Si lo oscuro es la sombra del surco hundido, sí mejora. Si es pigmento en la piel, el relleno no lo corrige y se tratan con despigmentantes, peelings o láser.",
    },
];

const guia: SeccionGuia[] = [
    {
        titulo: "¿Qué tipo de ojera tienes?",
        parrafos: [
            "Antes de tratar una ojera hay que saber de dónde viene, porque cada tipo responde a un tratamiento distinto. Muchas personas tienen una mezcla de varias.",
        ],
        lista: [
            "Ojera hundida o surco: una depresión entre el párpado inferior y la mejilla que proyecta sombra. Es la que mejor responde al relleno con ácido hialurónico.",
            "Ojera pigmentada: un tono café u oscuro en la piel. No se corrige con relleno, sino con despigmentantes, peelings o láser.",
            "Ojera vascular: un tono violáceo por vasos que se transparentan bajo una piel fina. Mejora con bioestimuladores que engrosan la piel.",
            "Bolsas: grasa que protruye bajo el ojo. El relleno puede disimularlas en casos leves, pero cuando son marcadas la solución es la blefaroplastia.",
        ],
    },
    {
        titulo: "Ácido hialurónico o Juvelook: ¿cuál me conviene?",
        parrafos: [
            "El ácido hialurónico rellena el surco de forma inmediata: al salir de la consulta la sombra ya se ve atenuada. Es la opción indicada cuando el problema principal es el hundimiento.",
            "Juvelook es un bioestimulador pensado para la zona de la ojera. No rellena de inmediato, sino que estimula colágeno y engrosa la piel de a poco, por lo que es útil en ojeras con piel muy fina o con tono violáceo. En la evaluación se define si conviene uno, el otro o una combinación.",
        ],
    },
    {
        titulo: "¿Quién es buen candidato para el relleno de ojeras?",
        parrafos: [
            "El mejor resultado se da en personas con un surco marcado, piel de buena calidad y sin bolsas grandes. La evaluación médica es indispensable, porque un relleno en el lugar o la cantidad equivocada puede empeorar el aspecto de la zona.",
            "No se recomienda durante el embarazo o la lactancia, con infecciones activas en la zona, ni cuando las bolsas son el problema principal. En esos casos se proponen otras alternativas.",
        ],
    },
    {
        titulo: "Cuidados antes y después del relleno de ojeras",
        parrafos: [
            "La zona bajo los ojos es delicada y tiende a inflamarse. Estas indicaciones ayudan a que el resultado se asiente bien.",
        ],
        lista: [
            "Evita alcohol, aspirina y antiinflamatorios dos días antes, salvo indicación médica.",
            "Las primeras 24 horas no te maquilles ni presiones la zona.",
            "Duerme con la cabeza algo elevada la primera noche para reducir la hinchazón.",
            "Evita ejercicio intenso, sauna y sol directo por 48 horas.",
            "Un pequeño moretón es posible y desaparece en pocos días.",
        ],
    },
    {
        titulo: "¿Cuánto cuesta el relleno de ojeras?",
        parrafos: [
            "El valor se define en la evaluación, porque depende de la cantidad de producto que necesita tu surco y de si conviene combinarlo con un bioestimulador. Recibes el presupuesto antes de decidir y puedes pagar en hasta 12 cuotas.",
        ],
    },
];

const relacionados: TratamientoRelacionado[] = [
    { titulo: "Juvelook", href: "/tratamientos/juvelook/", descripcion: "Bioestimulador para ojeras con piel fina o tono violáceo." },
    { titulo: "Blefaroplastia", href: "/blefaroplastia-los-angeles/", descripcion: "Cirugía de párpados para bolsas y exceso de piel." },
    { titulo: "Toxina botulínica", href: "/toxina-botulinica-tercio-superior-los-angeles/", descripcion: "Suaviza las patas de gallo y las líneas de la frente." },
    { titulo: "Relleno de labios", href: "/relleno-labios-los-angeles/", descripcion: "Ácido hialurónico para volumen y definición natural." },
];


const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
        },
        {
            "@type": "MedicalProcedure",
            name: "Relleno de Ojeras con Ácido Hialurónico",
            alternateName: ["Tear Trough Filler", "Relleno Periocular", "Relleno Surco Nasoyugal"],
            description:
                "Procedimiento mínimamente invasivo que utiliza ácido hialurónico para corregir el surco nasoyugal (ojeras hundidas), restaurando volumen y luminosidad en el área periocular.",
            procedureType: "PercutaneousProcedure",
            bodyLocation: "Región periocular, surco nasoyugal",
            status: "Available",
            provider: {
                "@type": "MedicalClinic",
                name: "Clínica CIALO",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Bulnes 220, Oficina 509",
                    addressLocality: "Los Ángeles",
                    addressRegion: "Biobío",
                    addressCountry: "CL",
                },
                telephone: "+56 9 8202 8473",
            },
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Inicio", item: "https://cialo.cl/" },
                { "@type": "ListItem", position: 2, name: "Tratamientos", item: "https://cialo.cl/tratamientos" },
                {
                    "@type": "ListItem",
                    position: 3,
                    name: "Relleno de Ojeras",
                    item: "https://cialo.cl/relleno-ojeras-los-angeles",
                },
            ],
        },
    ],
};

const beneficios = [
    {
        titulo: "Resultado inmediato",
        desc: "La corrección es visible desde el momento de la aplicación. El rostro luce descansado y luminoso al salir de la consulta.",
        icono: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
        titulo: "Aspecto 100% natural",
        desc: "El ácido hialurónico es una sustancia propia del organismo. Rellena con suavidad sin alterar la expresión.",
        icono: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    },
    {
        titulo: "Sin cirugía ni recuperación",
        desc: "Procedimiento ambulatorio de 30–45 minutos. Puedes retomar tu vida normal el mismo día.",
        icono: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
        titulo: "Duración 12–18 meses",
        desc: "Los resultados se mantienen entre 12 y 18 meses según el producto y el metabolismo de cada paciente.",
        icono: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
];

const proceso = [
    { paso: "1", titulo: "Evaluación", desc: "El médico evalúa el tipo de ojera, la piel y el volumen necesario para definir el protocolo." },
    { paso: "2", titulo: "Anestesia tópica", desc: "Se aplica crema anestésica para minimizar la molestia. El procedimiento es bien tolerado." },
    { paso: "3", titulo: "Aplicación del AH", desc: "Se inyecta el ácido hialurónico en el surco nasoyugal con técnica de cánula o aguja fina." },
    { paso: "4", titulo: "Moldeado y alta", desc: "Se modela el producto para asegurar un resultado uniforme. Alta el mismo día." },
];

const casos = [
    { src: "/resultados/relleno-ojeras/1.webp", alt: "Caso clínico relleno ojeras — antes y después" },
    { src: "/resultados/relleno-ojeras/2.webp", alt: "Caso clínico relleno ojeras — resultado frontal" },
    { src: "/resultados/relleno-ojeras/3.webp", alt: "Caso clínico relleno ojeras — vista lateral" },
    { src: "/resultados/relleno-ojeras/4.webp", alt: "Caso clínico relleno ojeras — resultado perfil" },
    { src: "/resultados/relleno-ojeras/5.webp", alt: "Caso clínico relleno ojeras — antes y después femenino" },
    { src: "/resultados/relleno-ojeras/6.webp", alt: "Caso clínico relleno ojeras — resultado lateral" },
];


function Check() {
    return (
        <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function RellenoOjerasPage() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar transparent />

            {/* ── HERO ── */}
            <header className="relative overflow-hidden bg-ink pt-28 pb-20 text-white sm:pt-36 sm:pb-24">
                <div className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-gold/8 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-rose-500/5 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
                    <nav className="mb-8 flex items-center gap-2 text-xs text-cream/50" aria-label="Breadcrumb">
                        <Link href="/" className="transition-colors hover:text-gold">Inicio</Link>
                        <span>/</span>
                        <Link href="/tratamientos" className="transition-colors hover:text-gold">Tratamientos</Link>
                        <span>/</span>
                        <span className="text-gold">Relleno de Ojeras</span>
                    </nav>

                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-gold">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                                Rellenos Faciales
                            </span>
                            <h1 className="font-[family-name:var(--font-italiana)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                Relleno de <span className="text-gold">Ojeras</span>
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
                                Corrige las ojeras hundidas con ácido hialurónico y recupera la luminosidad natural de tu mirada.
                                Resultados inmediatos, aspecto completamente natural.
                            </p>
                            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
                                {["Sin cirugía", "30–45 minutos", "Alta el mismo día", "Duración 12–18 meses"].map((f) => (
                                    <li key={f} className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-9 flex flex-wrap gap-4">
                                <a
                                    href={waLink("Hola, me interesa información sobre el relleno de ojeras.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/30 transition-colors duration-300 hover:bg-white hover:text-ink"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Consultar por WhatsApp
                                </a>
                                <a
                                    href={AGENDA}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white/85 transition-colors duration-300 hover:border-gold hover:text-gold"
                                >
                                    Agendar hora
                                </a>
                            </div>
                        </div>

                        {/* Stats card */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { valor: "30 min", label: "Duración promedio" },
                                { valor: "12–18", label: "Meses de duración" },
                                { valor: "100%", label: "Ambulatorio" },
                                { valor: "6+", label: "Casos realizados" },
                            ].map((s) => (
                                <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm">
                                    <p className="font-[family-name:var(--font-italiana)] text-3xl text-gold">{s.valor}</p>
                                    <p className="mt-1 text-xs text-cream/60">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            {/* ── BENEFICIOS ── */}
            <section className="bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            Por qué elegirlo
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            Beneficios del Relleno de Ojeras
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {beneficios.map((b) => (
                            <div key={b.titulo} className="rounded-2xl border border-sand bg-cream p-7 transition-shadow duration-300 hover:shadow-lg">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                                    <svg className="h-6 w-6 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={b.icono} />
                                    </svg>
                                </div>
                                <h3 className="mb-2 font-semibold text-ink">{b.titulo}</h3>
                                <p className="text-sm leading-relaxed text-olive">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASOS CLÍNICOS ── */}
            <section className="bg-cream py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            Resultados reales
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            Casos Clínicos
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-olive">
                            Antes y después reales de pacientes tratados en Clínica CIALO.
                            Identidades protegidas con autorización de los pacientes.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {casos.map((c, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-2xl border border-sand bg-white shadow-sm">
                                <div className="absolute left-3 top-3 z-10">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-ink/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-sm">
                                        Antes · Después
                                    </span>
                                </div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={c.src}
                                    alt={c.alt}
                                    loading="lazy"
                                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-center text-xs text-olive/60">
                        Imágenes publicadas con consentimiento informado de los pacientes. Resultados individuales pueden variar.
                    </p>
                </div>
            </section>

            {/* ── PROCESO ── */}
            <section className="bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-5xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            El procedimiento
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            ¿Cómo es el proceso?
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {proceso.map((p, i) => (
                            <div key={p.paso} className="relative rounded-2xl border border-sand bg-cream p-7 text-center shadow-sm">
                                {i < proceso.length - 1 && (
                                    <span className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-gold/30 lg:block" aria-hidden="true">→</span>
                                )}
                                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                                    {p.paso}
                                </div>
                                <h3 className="mb-2 font-semibold text-ink">{p.titulo}</h3>
                                <p className="text-sm leading-relaxed text-olive">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guía de contenido largo */}
            <GuiaTratamiento
                titulo="Guía del relleno de ojeras en Los Ángeles"
                intro="No todas las ojeras se tratan igual. Te explicamos cuál es la tuya, qué tratamiento le corresponde y qué esperar del relleno."
                secciones={guia}
                relacionados={relacionados}
            />

            {/* ── FAQs ── */}
            <section className="bg-cream py-20 sm:py-24">
                <div className="mx-auto max-w-3xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            Preguntas frecuentes
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            Todo lo que debes saber
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq) => (
                            <details key={faq.q} className="group overflow-hidden rounded-2xl border border-sand bg-white shadow-sm">
                                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 transition-colors hover:bg-cream/50">
                                    <h3 className="font-semibold text-ink">{faq.q}</h3>
                                    <svg className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <div className="px-6 pb-6">
                                    <p className="text-sm leading-relaxed text-olive">{faq.a}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-ink to-[#26231e] py-20 text-white">
                <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
                <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
                    <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                        <span className="h-px w-6 bg-gold/50" />
                        Agenda tu evaluación
                        <span className="h-px w-6 bg-gold/50" />
                    </span>
                    <h2 className="font-[family-name:var(--font-italiana)] text-3xl sm:text-4xl">
                        Recupera la luminosidad de tu mirada
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/75">
                        Agenda una evaluación y descubre si el relleno de ojeras es la solución ideal para ti.
                        Sin compromiso, con atención personalizada.
                    </p>
                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <a
                            href={AGENDA}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/30 transition-colors duration-300 hover:bg-white hover:text-ink"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Agendar hora online
                        </a>
                        <a
                            href={waLink("Hola, quisiera agendar una evaluación para relleno de ojeras.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white/85 transition-colors duration-300 hover:border-gold hover:text-gold"
                        >
                            Consultar por WhatsApp
                        </a>
                    </div>
                    <p className="mt-7 text-sm text-cream/50">
                        📍 Bulnes 220, Of. 509 — Los Ángeles, Biobío · +56 9 8202 8473
                    </p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
