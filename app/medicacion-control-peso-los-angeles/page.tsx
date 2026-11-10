import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
    title: { absolute: "Ozempic y Mounjaro en Los Ángeles | Clínica Cialo" },
    description: "Medicación médica y asesoría para el control de peso en Los Ángeles, Chile. Ozempic, Mounjaro y tratamientos personalizados con seguimiento profesional en Clínica Cialo.",
    keywords: "Ozempic Los Ángeles, Mounjaro Los Ángeles, control de peso Los Ángeles, medicación para bajar de peso, semaglutida Los Ángeles, tirzepatida Chile, clínica control peso Biobío",
    openGraph: {
        title: "Ozempic y Mounjaro en Los Ángeles | Clínica Cialo",
        description: "Medicación médica y asesoría profesional para el control de peso con seguimiento personalizado en Los Ángeles, Chile.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/medicacion-control-peso-los-angeles",
    },
    alternates: {
        canonical: "https://cialo.cl/medicacion-control-peso-los-angeles",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Clínica Cialo - Control de Peso",
    description: "Medicación médica y asesoría para el control de peso con Ozempic y Mounjaro",
    url: "https://cialo.cl/medicacion-control-peso-los-angeles",
    address: {
        "@type": "PostalAddress",
        streetAddress: "Bulnes 220, Of. 509",
        addressLocality: "Los Ángeles",
        addressRegion: "Biobío",
        addressCountry: "CL",
    },
    telephone: "+56982028473",
};

const porQueElegirnos = [
    "Evaluación médica completa: análisis de tu historial, hábitos y objetivos antes de cualquier indicación.",
    "Seguimiento personalizado: controles periódicos para ajustar dosis y evaluar progreso.",
    "Enfoque integral: combinamos medicación con asesoría nutricional y hábitos saludables.",
    "Profesionales certificados: atención médica especializada con experiencia en control metabólico.",
    "Protocolos seguros: uso de medicamentos aprobados con monitoreo continuo de efectos.",
    "Resultados sostenibles: trabajamos cambios de estilo de vida para mantener el peso a largo plazo.",
];

const beneficiosOzempic = [
    "Reduce el apetito y la sensación de hambre",
    "Mejora el control glucémico",
    "Favorece la pérdida de peso progresiva",
    "Una inyección semanal fácil de aplicar",
    "Respaldado por estudios clínicos",
];

const beneficiosMounjaro = [
    "Doble mecanismo de acción (GLP-1 y GIP)",
    "Mayor potencia en reducción de peso",
    "Mejora la sensibilidad a la insulina",
    "Reduce el consumo calórico naturalmente",
    "Inyección semanal con seguimiento médico",
];

const comoFunciona = [
    {
        paso: "1",
        titulo: "Consulta Inicial",
        desc: "Evaluación médica completa de tu estado de salud, historial y objetivos de peso.",
    },
    {
        paso: "2",
        titulo: "Plan Personalizado",
        desc: "Definimos la medicación adecuada (Ozempic, Mounjaro u otra) según tu perfil.",
    },
    {
        paso: "3",
        titulo: "Seguimiento Mensual",
        desc: "Controles regulares para ajustar dosis, evaluar progreso y resolver dudas.",
    },
    {
        paso: "4",
        titulo: "Resultados Duraderos",
        desc: "Acompañamiento continuo para consolidar hábitos y mantener tu peso ideal.",
    },
];

export default function MedicacionControlPesoPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar transparent />

            <main className="bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] pt-28 pb-20 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="inline-block bg-[#b8935f]/20 text-[#b8935f] px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                            Medicación Médica • Los Ángeles, Biobío
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white leading-tight mb-6">
                            Control de Peso con <span className="text-[#b8935f]">Ozempic</span> y <span className="text-[#b8935f]">Mounjaro</span>
                        </h1>
                        <p className="text-xl text-[#cbcfd1] mb-8 max-w-3xl mx-auto leading-relaxed">
                            Medicación médica y asesoría profesional para el control de peso en Los Ángeles. 
                            Tratamientos personalizados con seguimiento médico continuo.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20una%20consulta%20para%20control%20de%20peso"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Agendar Consulta
                        </a>
                    </div>
                </section>

                {/* Intro */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Tratamiento Médico
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                Ozempic y Mounjaro en Los Ángeles
                            </h2>
                            <p className="text-[#6f6a5c] max-w-3xl mx-auto leading-relaxed text-lg">
                                En Clínica Cialo ofrecemos tratamientos médicos avanzados para el control de peso 
                                basados en medicamentos de última generación como <strong>Ozempic (semaglutida)</strong> y 
                                <strong> Mounjaro (tirzepatida)</strong>, bajo estricta supervisión médica.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Ozempic Card */}
                            <div className="bg-white p-8 rounded-sm border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                    Ozempic (Semaglutida)
                                </h3>
                                <p className="text-[#6f6a5c] mb-6 leading-relaxed">
                                    Medicamento inyectable semanal que actúa como análogo del GLP-1, 
                                    reduciendo el apetito y mejorando el control metabólico. Aprobado 
                                    para el tratamiento de la obesidad y sobrepeso.
                                </p>
                                <ul className="space-y-3">
                                    {beneficiosOzempic.map((b, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-[#b8935f] mt-0.5">✓</span>
                                            <span className="text-[#6f6a5c] text-sm">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Mounjaro Card */}
                            <div className="bg-white p-8 rounded-sm border border-gray-100 hover:shadow-lg transition-all">
                                <div className="w-12 h-12 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                                    Mounjaro (Tirzepatida)
                                </h3>
                                <p className="text-[#6f6a5c] mb-6 leading-relaxed">
                                    Innovador medicamento de doble acción (GLP-1 y GIP) que potencia 
                                    la pérdida de peso de manera más efectiva. Ideal para pacientes que 
                                    buscan resultados superiores en el control de peso.
                                </p>
                                <ul className="space-y-3">
                                    {beneficiosMounjaro.map((b, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-[#b8935f] mt-0.5">✓</span>
                                            <span className="text-[#6f6a5c] text-sm">{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cómo Funciona */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Proceso
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                ¿Cómo Funciona el Tratamiento?
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            {comoFunciona.map((item, i) => (
                                <div key={i} className="text-center group">
                                    <div className="w-16 h-16 bg-[#b8935f] text-[#1b1a18] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                                        {item.paso}
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1b1a18] mb-3">{item.titulo}</h3>
                                    <p className="text-sm text-[#6f6a5c] leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Por qué elegirnos */}
                <section className="py-20 bg-[#1b1a18]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                    Nuestra Experiencia
                                </span>
                                <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">
                                    ¿Por Qué Elegir Clínica Cialo?
                                </h2>
                                <p className="text-[#cbcfd1] mb-6 leading-relaxed">
                                    El control de peso no se trata solo de medicación. En Cialo 
                                    combinamos ciencia, experiencia médica y un enfoque humano para 
                                    ayudarte a alcanzar y mantener tu peso ideal de manera saludable.
                                </p>
                                <p className="text-[#cbcfd1] mb-8 leading-relaxed">
                                    Nuestro equipo médico evalúa cada caso de forma individual, 
                                    considerando tu historial clínico, estilo de vida y objetivos 
                                    personales para diseñar el plan más adecuado para ti.
                                </p>
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20consulta%20para%20control%20de%20peso"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Agendar Consulta
                                </a>
                            </div>
                            <div className="space-y-4">
                                {porQueElegirnos.map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-[#2a2a2a] p-4 rounded-sm border border-[#3a3a3a]">
                                        <span className="text-[#b8935f] text-lg">✓</span>
                                        <p className="text-[#cbcfd1] text-sm">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preguntas Frecuentes */}
                <section className="py-20 bg-[#faf6ef]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                FAQ
                            </span>
                            <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
                                Preguntas Frecuentes
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-sm border border-gray-100">
                                <h3 className="font-semibold text-[#1b1a18] mb-2">¿Quién puede tomar Ozempic o Mounjaro?</h3>
                                <p className="text-[#6f6a5c] text-sm leading-relaxed">
                                    Estos medicamentos están indicados para personas con IMC ≥ 30 (obesidad) o ≥ 27 (sobrepeso) 
                                    con comorbilidades asociadas. La indicación siempre debe ser evaluada por un médico.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-sm border border-gray-100">
                                <h3 className="font-semibold text-[#1b1a18] mb-2">¿Cuánto peso se puede perder?</h3>
                                <p className="text-[#6f6a5c] text-sm leading-relaxed">
                                    Los resultados varían según cada persona. En promedio, los estudios clínicos muestran 
                                    una pérdida del 10-15% del peso corporal con Ozempic y hasta 20-22% con Mounjaro.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-sm border border-gray-100">
                                <h3 className="font-semibold text-[#1b1a18] mb-2">¿Tienen efectos secundarios?</h3>
                                <p className="text-[#6f6a5c] text-sm leading-relaxed">
                                    Los efectos más comunes son náuseas leves, vómitos y diarrea, que generalmente 
                                    disminuyen con el tiempo. Nuestro equipo médico monitorea continuamente tu evolución.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-sm border border-gray-100">
                                <h3 className="font-semibold text-[#1b1a18] mb-2">¿Se necesita receta médica?</h3>
                                <p className="text-[#6f6a5c] text-sm leading-relaxed">
                                    Sí, ambos medicamentos requieren prescripción médica. En Clínica Cialo realizamos 
                                    una evaluación completa antes de indicar cualquier tratamiento.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Final */}
                <section className="py-20 bg-gradient-to-br from-[#b8935f] to-[#c4b190]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                            Comienza Tu Proceso de Control de Peso
                        </h2>
                        <p className="text-[#1b1a18]/80 text-lg mb-10 max-w-2xl mx-auto">
                            Agenda tu consulta inicial y descubre cómo podemos ayudarte a alcanzar 
                            tu peso ideal con un plan médico personalizado y seguimiento profesional.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20una%20consulta%20para%20control%20de%20peso"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-[#1b1a18] text-white px-10 py-5 font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors shadow-lg"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Agendar Consulta
                            </a>
                            <Link
                                href="/contacto"
                                className="inline-flex items-center justify-center gap-2 border-2 border-[#1b1a18] text-[#1b1a18] px-10 py-5 font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-colors"
                            >
                                Contactar
                            </Link>
                        </div>
                        <p className="mt-8 text-[#1b1a18]/60 text-sm">
                            📍 Bulnes 220, Of. 509 — Edificio Puerto Mayor II, Los Ángeles, Biobío • +56 9 8202 8473
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
