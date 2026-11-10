import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Láser CO2 Vaginal en Los Ángeles | Clínica CIALO" },
    description:
        "Láser CO2 vaginal en Los Ángeles, Biobío. Tratamiento no invasivo para sequedad vaginal, atrofia, síndrome genitourinario de la menopausia e incontinencia urinaria leve. Realizado por Dra. María Laura Villarroel y Matrona Stefania Kuncar.",
    keywords:
        "láser CO2 vaginal Los Ángeles, rejuvenecimiento vaginal Chile, sequedad vaginal menopausia, atrofia vaginal tratamiento, ginecoestética Biobío",
    openGraph: {
        title: "Láser CO2 Vaginal | Rejuvenecimiento Íntimo | Clínica CIALO Los Ángeles",
        description:
            "Tratamiento no invasivo para sequedad, atrofia y síndrome genitourinario de la menopausia. Resultados desde la primera sesión.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/laser-co2-vaginal-los-angeles",
    },
    alternates: { canonical: "https://cialo.cl/laser-co2-vaginal-los-angeles" },
};

const WHATSAPP = "56982028473";
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "MedicalProcedure",
            name: "Láser CO2 Vaginal",
            alternateName: ["Rejuvenecimiento Vaginal", "Láser Ginecológico", "Tratamiento Atrofia Vaginal"],
            description:
                "Procedimiento no invasivo que utiliza láser CO2 fraccionado para estimular la regeneración del colágeno en los tejidos vaginales, mejorando la elasticidad, hidratación y firmeza.",
            procedureType: "PercutaneousProcedure",
            bodyLocation: "Vagina, Vulva",
            howPerformed:
                "La sonda del láser CO2 emite energía fraccionada que estimula la producción de colágeno y elastina en las paredes vaginales.",
            preparation: "Evaluación ginecológica previa. No requiere preparación especial.",
            followup: "Mejoras visibles desde la 3ª semana. Resultados óptimos tras 2–3 sesiones.",
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
                    name: "Láser CO2 Vaginal",
                    item: "https://cialo.cl/laser-co2-vaginal-los-angeles",
                },
            ],
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "¿El láser CO2 vaginal duele?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "El procedimiento es generalmente bien tolerado. Se puede aplicar anestesia tópica en la vulva para mayor comodidad. La mayoría de pacientes describe una sensación de calor tolerable.",
                    },
                },
                {
                    "@type": "Question",
                    name: "¿Cuántas sesiones necesito?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Generalmente se recomiendan 2–3 sesiones iniciales, espaciadas cada 4–6 semanas. Luego, una sesión anual de mantenimiento para preservar los resultados.",
                    },
                },
            ],
        },
    ],
};

const indicaciones = [
    { titulo: "Sequedad Vaginal", desc: "Falta de lubricación natural que causa molestias e incomodidad." },
    { titulo: "Atrofia Vaginal", desc: "Adelgazamiento e inflamación de las paredes vaginales." },
    {
        titulo: "Síndrome Genitourinario",
        desc: "Conjunto de síntomas urogenitales por déficit de estrógenos en la menopausia.",
    },
    {
        titulo: "Incontinencia Urinaria Leve",
        desc: "Pérdida involuntaria de orina al toser, reír o hacer ejercicio.",
    },
    { titulo: "Relajación Vaginal", desc: "Pérdida de tono y firmeza tras partos o por envejecimiento." },
    { titulo: "Dispareunia", desc: "Dolor durante las relaciones sexuales." },
];

const beneficios = [
    {
        titulo: "Sin cirugía ni hospitalización",
        desc: "Procedimiento ambulatorio de 20–30 minutos. Vuelves a casa el mismo día.",
        icono: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    },
    {
        titulo: "Estimula colágeno natural",
        desc: "El láser activa los fibroblastos para producir nuevo colágeno y elastina.",
        icono: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    },
    {
        titulo: "Resultados progresivos",
        desc: "Mejoras visibles desde la 3ª semana. Resultados duraderos hasta 24 meses.",
        icono: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    },
    {
        titulo: "Mínima recuperación",
        desc: "Retomas actividades normales el mismo día. Solo abstinencia sexual 5–7 días.",
        icono: "M13 10V3L4 14h7v7l9-11h-7z",
    },
];

const proceso = [
    { paso: "1", titulo: "Evaluación", desc: "Consulta ginecológica para evaluar tu caso y definir el protocolo." },
    { paso: "2", titulo: "Preparación", desc: "Se aplica anestesia tópica si es necesario. Posición ginecológica." },
    { paso: "3", titulo: "Tratamiento", desc: "Aplicación del láser durante 20–30 minutos. Sin dolor significativo." },
    { paso: "4", titulo: "Seguimiento", desc: "Control para evaluar resultados y programar próximas sesiones." },
];

const profesionales = [
    {
        nombre: "Dra. María Laura Villarroel",
        subtitulo: "Ginecóloga Obstetra",
        bio: "Médico especialista en Ginecología y Obstetricia con doble certificación. Experta en ginecoestética láser avanzada y manejo de la salud femenina integral.",
        href: "/profesionales/maria-laura-villarroel",
        imagen: "/profesionales/clinica-cialo_Maria_Laura_Villarroel.webp",
    },
    {
        nombre: "Stefania Kuncar",
        subtitulo: "Matrona & Licenciada en Obstetricia",
        bio: "Matrona egresada con distinción Magna Cum Laude de la UNAB. Especialista en salud sexual y reproductiva con formación avanzada en ginecoestética.",
        href: "/profesionales/stefania-kuncar",
        imagen: "/profesionales/clinica-cialo_Stefania_Kuncar.webp",
    },
];

const faqs = [
    {
        q: "¿Qué es el láser CO2 vaginal y cómo funciona?",
        a: "Es un tratamiento que utiliza láser CO2 fraccionado para estimular la regeneración del colágeno en los tejidos vaginales. La energía láser crea microcanales controlados que activan los fibroblastos, promoviendo la producción de nuevo colágeno y elastina. Esto mejora el grosor, elasticidad e hidratación de las paredes vaginales.",
    },
    {
        q: "¿El procedimiento duele?",
        a: "El tratamiento es generalmente bien tolerado. Se puede aplicar anestesia tópica en crema en la vulva y el introito vaginal para mayor comodidad. La mayoría de pacientes describe una sensación de calor tolerable durante el procedimiento.",
    },
    {
        q: "¿Cuántas sesiones necesito?",
        a: "El protocolo estándar incluye 2–3 sesiones iniciales, espaciadas cada 4–6 semanas. Luego, se recomienda una sesión anual de mantenimiento para preservar los resultados a largo plazo.",
    },
    {
        q: "¿Cuándo veo los resultados?",
        a: "Las mejoras comienzan a notarse desde la tercera semana postratamiento. Los resultados son progresivos y alcanzan su máximo potencial después de completar las sesiones recomendadas. Los efectos pueden mantenerse hasta 24 meses.",
    },
    {
        q: "¿Quién es candidata para este tratamiento?",
        a: "Es ideal para mujeres con sequedad vaginal, atrofia (especialmente en menopausia o postparto), síndrome genitourinario, incontinencia urinaria leve de esfuerzo, laxitud vaginal o dolor durante las relaciones sexuales.",
    },
    {
        q: "¿Hay contraindicaciones?",
        a: "No se recomienda durante el embarazo, en presencia de infección vaginal activa, cáncer ginecológico, sangrado vaginal sin diagnóstico, o enfermedades autoinmunes activas. Es fundamental una evaluación previa.",
    },
    {
        q: "¿Qué cuidados debo tener después?",
        a: "Se recomienda abstinencia sexual por 5–7 días. Evitar piscinas, bañeras y ejercicio intenso por unos días. Puedes retomar actividades normales inmediatamente. Es normal una leve sensación de calor o hinchazón temporal.",
    },
    {
        q: "¿Quiénes realizan el procedimiento?",
        a: "El tratamiento es realizado por la Dra. María Laura Villarroel, ginecóloga obstetra con especialización en ginecoestética láser, y por la Matrona Stefania Kuncar, especialista en salud sexual y reproductiva.",
    },
];

function Check() {
    return (
        <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

export default function LaserCO2VaginalPage() {
    return (
        <div className="flex min-h-screen flex-col bg-cream">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar transparent />

            {/* ── HERO ── */}
            <header className="relative overflow-hidden bg-ink pt-28 pb-20 text-white sm:pt-36 sm:pb-24">
                <div className="pointer-events-none absolute -top-24 right-0 h-[480px] w-[480px] rounded-full bg-rose-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-gold/8 blur-3xl" />

                <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8 flex items-center gap-2 text-xs text-cream/50" aria-label="Breadcrumb">
                        <Link href="/" className="transition-colors hover:text-gold">Inicio</Link>
                        <span>/</span>
                        <Link href="/tratamientos" className="transition-colors hover:text-gold">Tratamientos</Link>
                        <span>/</span>
                        <span className="text-gold">Láser CO2 Vaginal</span>
                    </nav>

                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        {/* Copy */}
                        <div>
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-rose-300">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" />
                                Ginecoestética
                            </span>
                            <h1 className="font-[family-name:var(--font-italiana)] text-4xl leading-tight sm:text-5xl lg:text-6xl">
                                Láser <span className="text-gold">CO2</span> Vaginal
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
                                Rejuvenecimiento íntimo no invasivo para recuperar la salud, el bienestar y la confianza.
                                Tratamiento de referencia para sequedad, atrofia vaginal y síntomas de la menopausia.
                            </p>

                            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream/70">
                                {["Sin hospitalización", "20–30 minutos", "2–3 sesiones", "Resultados hasta 24 meses"].map((f) => (
                                    <li key={f} className="flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-9 flex flex-wrap gap-4">
                                <a
                                    href={waLink("Hola, me interesa información sobre el láser CO2 vaginal.")}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/30 transition-colors duration-300 hover:bg-white hover:text-ink"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Agendar consulta
                                </a>
                                <a
                                    href="#especialistas"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white/85 transition-colors duration-300 hover:border-gold hover:text-gold"
                                >
                                    Ver especialistas
                                </a>
                            </div>
                        </div>

                        {/* Indicaciones card */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                            <h2 className="mb-5 font-[family-name:var(--font-italiana)] text-2xl text-white">
                                ¿Qué problemas tratamos?
                            </h2>
                            <ul className="space-y-3">
                                {indicaciones.map((item) => (
                                    <li key={item.titulo} className="rounded-xl bg-white/5 p-4">
                                        <p className="text-sm font-semibold text-gold">{item.titulo}</p>
                                        <p className="mt-0.5 text-xs leading-relaxed text-cream/65">{item.desc}</p>
                                    </li>
                                ))}
                            </ul>
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
                            Ventajas del tratamiento
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            Beneficios del Láser CO2 Vaginal
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {beneficios.map((b) => (
                            <div
                                key={b.titulo}
                                className="rounded-2xl border border-sand bg-cream p-7 transition-shadow duration-300 hover:shadow-lg"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                                    <svg
                                        className="h-6 w-6 text-gold-dark"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
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

            {/* ── PROCESO ── */}
            <section className="bg-cream py-20 sm:py-24">
                <div className="mx-auto max-w-5xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            El procedimiento
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            ¿Cómo funciona?
                        </h2>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {proceso.map((p, i) => (
                            <div key={p.paso} className="relative rounded-2xl border border-sand bg-white p-7 text-center shadow-sm">
                                {i < proceso.length - 1 && (
                                    <span
                                        className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-gold/30 lg:block"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
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

            {/* ── ESPECIALISTAS ── */}
            <section id="especialistas" className="scroll-mt-24 bg-white py-20 sm:py-24">
                <div className="mx-auto max-w-5xl px-5 lg:px-8">
                    <div className="mb-12 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
                            <span className="h-px w-6 bg-gold/50" />
                            Quiénes te atienden
                            <span className="h-px w-6 bg-gold/50" />
                        </span>
                        <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink sm:text-4xl">
                            Tus Especialistas
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-olive">
                            El Láser CO2 Vaginal en Clínica CIALO es realizado por un equipo femenino especializado
                            en ginecoestética y salud sexual reproductiva.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {profesionales.map((pro) => (
                            <Link
                                key={pro.nombre}
                                href={pro.href}
                                className="group relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-2xl"
                                style={{ aspectRatio: "3/4" }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={pro.imagen}
                                    alt={pro.nombre}
                                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                                {/* Gold top bar on hover */}
                                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-gold/60 transition-all duration-700 group-hover:w-full" />
                                {/* Text at bottom */}
                                <div className="absolute bottom-0 left-0 right-0 p-7">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                                        {pro.subtitulo}
                                    </p>
                                    <h3 className="mt-1.5 font-[family-name:var(--font-italiana)] text-2xl text-white leading-tight">
                                        {pro.nombre}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-cream/75 line-clamp-3">{pro.bio}</p>
                                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold transition-colors group-hover:text-white">
                                        Ver perfil
                                        <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQS ── */}
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
                            <details
                                key={faq.q}
                                className="group overflow-hidden rounded-2xl border border-sand bg-white shadow-sm"
                            >
                                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 transition-colors hover:bg-cream/50">
                                    <h3 className="font-semibold text-ink">{faq.q}</h3>
                                    <svg
                                        className="h-5 w-5 shrink-0 text-gold transition-transform duration-300 group-open:rotate-180"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
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

            {/* ── CTA FINAL ── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-ink to-[#26231e] py-20 text-white">
                <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
                <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
                    <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                        <span className="h-px w-6 bg-gold/50" />
                        Agenda tu consulta
                        <span className="h-px w-6 bg-gold/50" />
                    </span>
                    <h2 className="font-[family-name:var(--font-italiana)] text-3xl sm:text-4xl">
                        Recupera tu bienestar íntimo
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl leading-relaxed text-cream/75">
                        Agenda una consulta confidencial con nuestras especialistas y descubre cómo podemos ayudarte.
                        Tu salud íntima merece atención profesional.
                    </p>
                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <a
                            href={waLink("Hola, quisiera agendar una consulta sobre el láser CO2 vaginal.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-ink/30 transition-colors duration-300 hover:bg-white hover:text-ink"
                        >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar por WhatsApp
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
