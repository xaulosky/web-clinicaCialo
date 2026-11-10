import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import InscripcionTaller from "./InscripcionTaller";

export const metadata: Metadata = {
    title: { absolute: "Taller de Cirugía Bariátrica | Clínica CIALO" },
    description:
        "Taller interdisciplinario para quienes se han sometido o se someterán a cirugía bariátrica. Psicología, nutrición y movimiento para una transformación sostenible. Los Ángeles, Biobío.",
    keywords:
        "taller cirugía bariátrica, bariatrica los angeles, psicología bariátrica, nutrición bariátrica, kinesiología metabólica, acompañamiento bariátrico, clínica cialo",
    openGraph: {
        title: "Cirugía Bariátrica: Más allá de la cirugía | Taller CIALO",
        description:
            "Prepara tu cuerpo, tu mente y tus hábitos para una transformación sostenible. Taller interdisciplinario de 3 horas.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/taller-cirugia-bariatrica",
    },
    alternates: {
        canonical: "https://cialo.cl/taller-cirugia-bariatrica",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: "Cirugía Bariátrica: Más allá de la cirugía",
    description:
        "Taller interdisciplinario para personas que se han sometido o se someterán a cirugía bariátrica. Psicología bariátrica, nutrición y kinesiología metabólica.",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    startDate: "2026-07-08T17:30:00-04:00",
    endDate: "2026-07-08T20:30:00-04:00",
    offers: {
        "@type": "Offer",
        price: "40000",
        priceCurrency: "CLP",
        availability: "https://schema.org/LimitedAvailability",
        url: "https://cialo.cl/taller-cirugia-bariatrica",
    },
    organizer: {
        "@type": "MedicalBusiness",
        name: "Clínica CIALO",
        url: "https://cialo.cl",
    },
    location: {
        "@type": "Place",
        name: "Clínica CIALO",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Bulnes 220, Of. 509",
            addressLocality: "Los Ángeles",
            addressRegion: "Biobío",
            addressCountry: "CL",
        },
    },
};

const profesionales = [
    {
        nombre: "Rosella Zaffiri",
        rol: "Nutricionista",
        especialidad: "Especialista en cirugía bariátrica y nutrición deportiva.",
        icon: "🥗",
    },
    {
        nombre: "Sandra Navarrete",
        rol: "Kinesióloga",
        especialidad: "Kinesióloga metabólica.",
        icon: "💪",
    },
    {
        nombre: "Fanny Cea",
        rol: "Psicóloga",
        especialidad: "Especialista en conducta alimentaria, obesidad y cirugía bariátrica.",
        icon: "🧠",
    },
];

const bloques = [
    {
        bloque: "Bloque 1 · Psicología Bariátrica",
        titulo: "La mente también necesita prepararse",
        duracion: "45 min",
        color: "#9b8bb4",
        puntos: [
            "¿Por qué la cirugía cambia mucho más que el peso?",
            "Lo que la cirugía sí cambia: saciedad y capacidad gástrica.",
            "Lo que la cirugía NO cambia: estrés, ansiedad, autoestima, imagen corporal.",
            "Riesgos psicológicos: alimentación emocional, pensamiento “todo o nada”, recuperación de peso.",
            "Reflexión guiada: «¿Qué espero que la cirugía resuelva en mi vida?»",
        ],
    },
    {
        bloque: "Bloque 2 · Nutrición Bariátrica",
        titulo: "Construyendo hábitos que duren",
        duracion: "45 min",
        color: "#7fa886",
        puntos: [
            "El nuevo estómago requiere nuevos hábitos: proteína, hidratación y suplementación.",
            "Errores frecuentes: saltarse comidas, poca proteína, líquidos con la comida.",
            "Reconocer señales corporales: hambre, saciedad y tolerancia alimentaria.",
            "Mitos: «la cirugía hace todo el trabajo», «si recupero peso, fracasé».",
            "Actividad: caso clínico interactivo — «¿Qué harías en esta situación?»",
        ],
    },
    {
        bloque: "Bloque 3 · Kinesiología Metabólica",
        titulo: "Movimiento: el gran aliado olvidado",
        duracion: "45 min",
        color: "#c9a36b",
        puntos: [
            "¿Por qué moverse importa? Masa muscular, metabolismo y salud cardiovascular.",
            "El ejercicio no es castigo: cambio de paradigma hacia el movimiento para la salud.",
            "Qué hacer antes y después de la cirugía: caminar, fuerza y progresión segura.",
            "Mitos: «tengo que hacer cardio todos los días», «si no sudo no sirve».",
            "Actividad: diseño de una meta de movimiento realista.",
        ],
    },
    {
        bloque: "Bloque 4 · Conversatorio final",
        titulo: "Integrando cuerpo, mente y hábitos",
        duracion: "30 min",
        color: "#b08968",
        puntos: [
            "¿Por qué algunas personas mantienen los resultados y otras no?",
            "Psicología: regulación emocional, autoeficacia y flexibilidad.",
            "Nutrición: consistencia, planificación y hábitos sostenibles.",
            "Movimiento: adherencia, disfrute y funcionalidad.",
        ],
    },
];

const agenda = [
    { hora: "Bienvenida", desc: "Presentación, expectativas y actividad «Mi principal desafío hoy».", min: "15 min" },
    { hora: "Bloque 1", desc: "La mente también necesita prepararse — Psicología.", min: "45 min" },
    { hora: "Bloque 2", desc: "Nutrición bariátrica: hábitos que duran.", min: "45 min" },
    { hora: "Break", desc: "Coffee saludable y espacio para preguntas.", min: "15 min" },
    { hora: "Bloque 3", desc: "Movimiento: el gran aliado olvidado.", min: "45 min" },
    { hora: "Bloque 4", desc: "Conversatorio: integrando cuerpo, mente y hábitos.", min: "30 min" },
    { hora: "Cierre", desc: "Actividad final «Carta para mi futuro yo».", min: "15 min" },
];

const incluye = [
    "Guía PDF de regalo: «10 claves para el éxito después de la cirugía bariátrica».",
    "Señales de hambre y saciedad, y mitos frecuentes.",
    "Recomendaciones nutricionales prácticas.",
    "Beneficios del ejercicio y cómo empezar.",
    "Estrategias psicológicas para los momentos difíciles.",
];

export default function TallerBariatricaPage() {
    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar transparent />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* Hero */}
            <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-12 w-full text-center">
                    <span className="inline-flex items-center gap-2 bg-[#b8935f]/20 text-[#b8935f] px-4 py-2 rounded-full text-sm font-medium mb-6">
                        Taller interdisciplinario · 3 horas
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                        Cirugía Bariátrica:<br />Más allá de la cirugía
                    </h1>
                    <p className="text-lg md:text-xl text-[#cbcfd1] mb-8 leading-relaxed max-w-2xl mx-auto">
                        Claves para preparar tu <strong className="text-white">cuerpo</strong>, tu{" "}
                        <strong className="text-white">mente</strong> y tus{" "}
                        <strong className="text-white">hábitos</strong> para una transformación sostenible.
                    </p>

                    <div className="inline-flex flex-wrap justify-center gap-3 mb-8">
                        <span className="bg-white/10 backdrop-blur-sm text-[#cbcfd1] px-4 py-2 rounded-full text-sm border border-white/10">
                            🧠 Psicología bariátrica
                        </span>
                        <span className="bg-white/10 backdrop-blur-sm text-[#cbcfd1] px-4 py-2 rounded-full text-sm border border-white/10">
                            🥗 Nutrición bariátrica
                        </span>
                        <span className="bg-white/10 backdrop-blur-sm text-[#cbcfd1] px-4 py-2 rounded-full text-sm border border-white/10">
                            💪 Kinesiología metabólica
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#inscripcion"
                            className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all"
                        >
                            Inscríbete
                        </a>
                        <span className="text-[#cbcfd1]/70 text-sm">
                            📅 Miércoles 8 de julio · 17:30–20:30 hrs · 💳 $40.000
                        </span>
                    </div>
                </div>
            </section>

            {/* Datos del taller */}
            <section className="bg-white border-b border-[#b8935f]/15">
                <div className="max-w-5xl mx-auto px-4 py-10">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                        <div className="flex items-start gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b8935f]/12">
                                <svg className="h-5 w-5 text-[#b8935f]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </span>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8935f]">Fecha</span>
                                <p className="font-semibold text-[#1b1a18]">Miércoles 8 de julio</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b8935f]/12">
                                <svg className="h-5 w-5 text-[#b8935f]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8935f]">Horario</span>
                                <p className="font-semibold text-[#1b1a18]">17:30 a 20:30 hrs</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b8935f]/12">
                                <svg className="h-5 w-5 text-[#b8935f]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </span>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8935f]">Lugar</span>
                                <p className="font-semibold text-[#1b1a18] leading-snug">Clínica CIALO — Bulnes 220, Of. 509, Los Ángeles</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#b8935f]/12">
                                <svg className="h-5 w-5 text-[#b8935f]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                            </span>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8935f]">Valor</span>
                                <p className="font-semibold text-[#1b1a18]">$40.000 <span className="text-xs font-normal text-[#6f6a5c]">· Cupos limitados</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Todos tendrán derecho a */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">Incluido para todos</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">Todos los participantes tendrán derecho a</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { emoji: "📊", titulo: "InBody 970", desc: "Evaluación completa de composición corporal." },
                            { emoji: "☕", titulo: "Coffee Break", desc: "Un momento para compartir y disfrutar." },
                            { emoji: "🎁", titulo: "Sorteo de Calorimetría", desc: "Participa y podrás ganar este estudio completo." },
                        ].map((it, i) => (
                            <div key={i} className="bg-white p-8 rounded-sm text-center shadow-sm border border-[#b8935f]/10">
                                <div className="text-4xl mb-4">{it.emoji}</div>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">{it.titulo}</h3>
                                <p className="text-sm text-[#6f6a5c]">{it.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Para quién es */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                        ¿Para quién es?
                    </span>
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                        Para quienes se han sometido o se someterán a cirugía bariátrica
                    </h2>
                    <p className="text-[#6f6a5c] leading-relaxed max-w-2xl mx-auto">
                        El éxito a largo plazo no depende únicamente de la cirugía, sino también de la{" "}
                        <strong>adaptación psicológica, nutricional y física</strong> que acompaña esta transformación.
                        Este taller te entrega una visión integral del proceso para que tomes el control de tus resultados.
                    </p>
                </div>
            </section>

            {/* Profesionales */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Impartido por
                        </span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                            Expertas que te acompañan
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {profesionales.map((p, i) => (
                            <div key={i} className="bg-white p-8 rounded-sm text-center shadow-sm hover:shadow-lg transition-all">
                                <div className="text-4xl mb-4">{p.icon}</div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-[10px] font-bold block mb-1">{p.rol}</span>
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">
                                    {p.nombre}
                                </h3>
                                <p className="text-sm text-[#6f6a5c]">{p.especialidad}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bloques de contenido */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Estructura del taller
                        </span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                            Qué trabajaremos juntos
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {bloques.map((b, i) => (
                            <div key={i} className="bg-[#faf6ef] rounded-sm overflow-hidden border-l-4" style={{ borderColor: b.color }}>
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                        <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: b.color }}>
                                            {b.bloque}
                                        </span>
                                        <span className="text-xs bg-[#1b1a18]/5 text-[#6f6a5c] px-3 py-1 rounded-full">
                                            {b.duracion}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                        {b.titulo}
                                    </h3>
                                    <ul className="space-y-2">
                                        {b.puntos.map((pt, j) => (
                                            <li key={j} className="flex items-start gap-3 text-[#6f6a5c] text-sm">
                                                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: b.color }} fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                {pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Agenda / Timeline */}
            <section className="py-20 bg-[#1b1a18] text-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Programa · 3 horas
                        </span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)]">
                            Cómo se desarrolla la jornada
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {agenda.map((a, i) => (
                            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-sm p-5">
                                <div className="flex-shrink-0 w-24 text-center">
                                    <span className="block text-[#b8935f] font-semibold">{a.hora}</span>
                                    <span className="block text-xs text-[#cbcfd1]/60">{a.min}</span>
                                </div>
                                <div className="w-px h-10 bg-white/10"></div>
                                <p className="text-[#cbcfd1] text-sm">{a.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Material de regalo */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-[#f9f6f0] to-[#f0ebe0] rounded-lg p-8 md:p-12 border border-[#b8935f]/30">
                        <div className="flex flex-col md:flex-row gap-8 items-center">
                            <div className="text-6xl">🎁</div>
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-2 block">
                                    Te llevas de regalo
                                </span>
                                <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                    Guía PDF: «10 claves para el éxito después de la cirugía bariátrica»
                                </h2>
                                <ul className="space-y-2">
                                    {incluye.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-[#6f6a5c] text-sm">
                                            <svg className="w-5 h-5 text-[#b8935f] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inscripción */}
            <section id="inscripcion" className="py-20 bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18]">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Reserva tu cupo
                        </span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-white mb-4">
                            Inscríbete al taller
                        </h2>
                        <p className="text-[#cbcfd1] max-w-md mx-auto">
                            Miércoles 8 de julio, 17:30 a 20:30 hrs · Valor $40.000 · Cupos limitados.
                            Déjanos tus datos y te contactaremos para confirmar tu cupo y coordinar el pago.
                        </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/10">
                        <InscripcionTaller />
                    </div>

                    <p className="text-center text-[#cbcfd1]/60 text-sm mt-8">
                        📍 Clínica CIALO · Bulnes 220, Of. 509, Los Ángeles, Biobío
                    </p>
                </div>
            </section>

            {/* Continuidad / programa */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                        Hoy conocemos los pilares
                    </h2>
                    <p className="text-[#6f6a5c] leading-relaxed mb-6">
                        Este taller es el primer paso. En nuestro{" "}
                        <strong>programa de acompañamiento interdisciplinario</strong> profundizamos y trabajamos cada
                        pilar — mente, nutrición y movimiento — para ayudarte a sostener los cambios en el tiempo.
                    </p>
                    <Link
                        href="/contacto"
                        className="inline-flex items-center justify-center gap-2 border border-[#b8935f] text-[#1b1a18] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] transition-all"
                    >
                        Quiero saber más del programa
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
