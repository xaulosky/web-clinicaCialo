import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
    title: { absolute: "Toxina Botulínica en Tercio Superior Los Ángeles | Clínica Cialo" },
    description: "Tratamiento médico de rejuvenecimiento facial con toxina botulínica en Los Ángeles, Biobío. Atenúa arrugas de frente, entrecejo y patas de gallo con resultados naturales y seguros. Agenda tu evaluación con especialistas.",
    keywords: "toxina botulínica los ángeles, botox frente biobío, rejuvenecimiento facial médico, patas de gallo tratamiento, clínica estética los ángeles, dr nicolas laucirica, medicina estética segura",
    alternates: {
        canonical: 'https://cialo.cl/toxina-botulinica-tercio-superior-los-angeles',
    },
    openGraph: {
        title: "Toxina Botulínica Tercio Superior | Clínica Médica Cialo Los Ángeles",
        description: "Rejuvenecimiento facial médico seguro. Expertos en anatomía facial en Los Ángeles, Biobío.",
        type: "website",
        locale: "es_CL",
        url: "https://cialo.cl/toxina-botulinica-tercio-superior-los-angeles",
        siteName: "Clínica Cialo",
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "name": "Aplicación de Toxina Botulínica en Tercio Superior",
    "description": "Tratamiento médico estético no quirúrgico para atenuar arrugas dinámicas en frente, entrecejo y patas de gallo mediante la aplicación de toxina botulínica tipo A.",
    "procedureType": "NonSurgicalProcedure",
    "bodyLocation": ["Forehead", "Glabella", "Lateral Canthal Lines"],
    "status": "http://schema.org/Active",
    "relevantSpecialty": {
        "@type": "MedicalSpecialty",
        "name": "Aesthetic Medicine"
    },
    "location": {
        "@type": "MedicalClinic",
        "name": "Clínica Cialo",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bulnes 220, Oficina 509",
            "addressLocality": "Los Ángeles",
            "addressRegion": "Biobío",
            "postalCode": "4440000",
            "addressCountry": "CL"
        },
        "telephone": "+56 9 8202 8473",
        "priceRange": "$$"
    },
    "performer": {
        "@type": "Physician",
        "name": "Dr. Nicolás Laucirica",
        "jobTitle": "Cirujano Dentista Especialista en Armonización Orofacial",
        "affiliation": {
            "@type": "MedicalOrganization",
            "name": "Clínica Cialo"
        }
    },
    "offers": {
        "@type": "Offer",
        "priceCurrency": "CLP",
        "price": "210000",
        "priceValidUntil": "2026-12-31",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "url": "https://cialo.cl/toxina-botulinica-tercio-superior-los-angeles"
    }
};

const jsonLdFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "¿Cómo actúa la Toxina Botulínica en el rostro?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "La toxina botulínica bloquea temporalmente las señales nerviosas que provocan la contracción muscular. Al relajar músculos específicos como el frontal o los corrugadores, la piel se alisa y las arrugas dinámicas desaparecen, previniendo que se marquen permanentemente."
            }
        },
        {
            "@type": "Question",
            "name": "¿Cuánto dura el efecto del tratamiento?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Los resultados son óptimos entre 3 a 6 meses, dependiendo del metabolismo de cada paciente y la fuerza de su musculatura. Recomendamos controles periódicos en nuestra clínica en Los Ángeles para mantener el efecto rejuvenecedor."
            }
        },
        {
            "@type": "Question",
            "name": "¿El procedimiento es doloroso?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Es mínimamente invasivo y prácticamente indoloro. Utilizamos agujas ultra finas y técnicas precisas para asegurar el confort del paciente. La sesión dura aproximadamente 20 minutos."
            }
        },
        {
            "@type": "Question",
            "name": "¿Quedaré con la cara sin expresión?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Nuestro enfoque médico busca resultados naturales. Atenuamos las arrugas preservando la capacidad de expresión facial, evitando el efecto de 'cara congelada'."
            }
        },
        {
            "@type": "Question",
            "name": "¿Qué cuidados debo tener después de la aplicación?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Evitar acostarse o agachar la cabeza durante las primeras 4 horas, no realizar ejercicio intenso por 24 horas y no masajear la zona tratada. También se recomienda evitar saunas o calor extremo el primer día."
            }
        }
    ]
};

export default function ToxinaTercioSuperiorPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
            />
            <Navbar transparent />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 bg-[#1b1a18] overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b8935f] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2a2622] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm text-[#cbcfd1] mb-10">
                        <Link href="/" className="hover:text-[#b8935f] transition-colors">Inicio</Link>
                        <span>/</span>
                        <Link href="/tratamientos" className="hover:text-[#b8935f] transition-colors">Tratamientos</Link>
                        <span>/</span>
                        <span className="text-[#b8935f]">Toxina Botulínica Tercio Superior</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="inline-block px-4 py-1 border border-[#b8935f] rounded-full text-[#b8935f] text-xs font-bold uppercase tracking-widest mb-6">
                                Rejuvenecimiento Médico Facial
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-[1.1]">
                                Toxina Botulínica en <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8935f] to-[#f0e6d2]">
                                    Tercio Superior
                                </span>
                            </h1>
                            <p className="text-lg text-[#cbcfd1] mb-8 leading-relaxed max-w-xl">
                                Rejuvenecimiento facial médico en <strong>Los Ángeles</strong>. Suaviza arrugas de frente, entrecejo y patas de gallo con precisión anatómica y resultados naturales garantizados.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="https://wa.me/56982028473?text=Hola,%20me%20interesa%20agendar%20una%20evaluación%20para%20Toxina%20Botulínica"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 bg-[#b8935f] text-[#1b1a18] px-8 py-4 font-bold uppercase tracking-wider hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-[#b8935f]/20"
                                >
                                    Agendar Evaluación
                                </a>
                                <Link
                                    href="#sc-scientific"
                                    className="inline-flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                                >
                                    Cómo Funciona
                                </Link>
                            </div>

                            <div className="mt-8 flex items-center gap-6 text-sm text-[#cbcfd1]/80">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Certificado ISP</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5 text-[#b8935f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    <span>Médicos Especialistas</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Element / Price Card */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#b8935f] to-[#8a7a5f] rounded-2xl opacity-20 blur-xl"></div>
                            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transform hover:scale-[1.02] transition-transform duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-[#b8935f] text-sm uppercase tracking-wider font-semibold mb-1">Valor Tratamiento</p>
                                        <h3 className="text-3xl font-[family-name:var(--font-italiana)] text-white">Tercio Superior Completo</h3>
                                    </div>
                                    <div className="bg-[#b8935f]/10 p-3 rounded-full">
                                        <span className="text-2xl">✨</span>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                                        <span className="text-[#cbcfd1]">Valor</span>
                                        <span className="text-3xl font-bold text-white">$210.000</span>
                                    </div>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3 text-[#cbcfd1] text-sm">
                                            <svg className="w-5 h-5 text-[#b8935f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Incluye evaluación médica inicial
                                        </li>
                                        <li className="flex items-start gap-3 text-[#cbcfd1] text-sm">
                                            <svg className="w-5 h-5 text-[#b8935f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Control posterior a los 15 días
                                        </li>
                                        <li className="flex items-start gap-3 text-[#cbcfd1] text-sm">
                                            <svg className="w-5 h-5 text-[#b8935f] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Insumos certificados y sellados
                                        </li>
                                    </ul>
                                </div>

                                <p className="text-xs text-[#cbcfd1]/60 italic text-center">
                                    *Precio sujeto a evaluación médica individual.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scientific Mechanism Section */}
            <section id="sc-scientific" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                ¿Cómo actúa la Toxina Botulínica en el Rejuvenecimiento Facial?
                            </h2>
                            <div className="w-20 h-1 bg-[#b8935f] mb-8"></div>

                            <div className="prose prose-lg text-[#6f6a5c]">
                                <p className="mb-6">
                                    La <strong>toxina botulínica</strong> (conocida comercialmente como Botox®, Dysport® o Xeomin®) es una proteína purificada que actúa como un modulador neuromuscular. Su función principal es relajar temporalmente la musculatura facial hiperactiva.
                                </p>
                                <p className="mb-6">
                                    Al inyectarse en dosis terapéuticas precisas, bloquea la liberación de acetilcolina en la unión neuromuscular, impidiendo que el músculo se contraiga con fuerza excesiva. Esto suaviza las <strong>arrugas dinámicas</strong> —aquellas que se forman al gesticular— y previene que se conviertan en surcos profundos permanentes.
                                </p>
                                <p>
                                    En Clínica Cialo, utilizamos marcas líderes con **registro ISP al día**, garantizando trazabilidad y seguridad en cada aplicación. Entendemos y respetamos la anatomía facial para lograr un rostro descansado, no congelado.
                                </p>
                            </div>
                        </div>

                        <div className="bg-[#faf6ef] p-10 rounded-2xl border border-gray-100">
                            <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6 border-b border-gray-200 pb-4">
                                Zonas de Tratamiento (Tercio Superior)
                            </h3>
                            <div className="space-y-8">
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-[#1b1a18] text-[#b8935f] rounded-full flex items-center justify-center text-xl font-bold shrink-0">1</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#1b1a18] mb-2">Complejo Glabelar (Entrecejo)</h4>
                                        <p className="text-sm text-[#6f6a5c] leading-relaxed">
                                            Tratamos los músculos corrugadores y el prócer para suavizar las líneas verticales de "preocupación" o "enojo", abriendo la mirada de forma inmediata.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-[#1b1a18] text-[#b8935f] rounded-full flex items-center justify-center text-xl font-bold shrink-0">2</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#1b1a18] mb-2">Músculo Frontal (Frente)</h4>
                                        <p className="text-sm text-[#6f6a5c] leading-relaxed">
                                            Relajamos las fibras horizontales responsables de las líneas de asombro. Aplicamos técnicas conservadoras para mantener la posición natural de las cejas.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-12 h-12 bg-[#1b1a18] text-[#b8935f] rounded-full flex items-center justify-center text-xl font-bold shrink-0">3</div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#1b1a18] mb-2">Orbicular de los Ojos (Patas de Gallo)</h4>
                                        <p className="text-sm text-[#6f6a5c] leading-relaxed">
                                            Suavizamos las líneas laterales que aparecen al sonreír, rejuveneciendo la expresión de los ojos sin perder la calidez de la sonrisa genuina.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-24 bg-[#1b1a18] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-[#b8935f] uppercase tracking-[0.2em] text-sm font-semibold">Resultados</span>
                        <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] mt-3 mb-6">
                            Beneficios Clínicos y Estéticos
                        </h2>
                        <p className="text-[#cbcfd1]">
                            Más allá de la estética, es un procedimiento que mejora la calidad de la piel y previene el envejecimiento prematuro.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                            <div className="text-[#b8935f] text-4xl mb-6">✨</div>
                            <h3 className="text-xl font-semibold mb-4">Mirada Descansada</h3>
                            <p className="text-[#cbcfd1] text-sm leading-relaxed">
                                Elimina el aspecto de cansancio o enojo permanente, devolviendo frescura y jovialidad al rostro de manera sutil.
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                            <div className="text-[#b8935f] text-4xl mb-6">🛡️</div>
                            <h3 className="text-xl font-semibold mb-4">Acción Preventiva</h3>
                            <p className="text-[#cbcfd1] text-sm leading-relaxed">
                                Al relajar la musculatura, evita que la piel se fracture repetidamente, previniendo la formación de surcos profundos futuros.
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                            <div className="text-[#b8935f] text-4xl mb-6">⏱️</div>
                            <h3 className="text-xl font-semibold mb-4">Rápido y Seguro</h3>
                            <p className="text-[#cbcfd1] text-sm leading-relaxed">
                                Procedimiento de 20 minutos, ambulatorio y sin tiempos de inactividad. Puedes retomar tu rutina en Los Ángeles inmediatamente.
                            </p>
                        </div>
                        <div className="bg-white/5 p-8 rounded-lg hover:bg-white/10 transition-colors border border-white/5">
                            <div className="text-[#b8935f] text-4xl mb-6">💎</div>
                            <h3 className="text-xl font-semibold mb-4">Piel Más Lisa</h3>
                            <p className="text-[#cbcfd1] text-sm leading-relaxed">
                                Mejora visiblemente la textura de la piel en la frente y el contorno de ojos, aportando un efecto "glow" o luminosidad.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety & Contraindications - Trust Building */}
            <section className="py-24 bg-[#f4f1ea]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                Protocolo de Seguridad y Contraindicaciones
                            </h2>
                            <p className="text-[#6f6a5c] mb-8">
                                En Clínica Cialo, tu seguridad es nuestra prioridad. Realizamos una evaluación médica exhaustiva antes de cualquier procedimiento para asegurar que seas un candidato idóneo.
                            </p>

                            <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-[#b8935f]">
                                <h3 className="text-lg font-bold text-[#1b1a18] mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    Contraindicaciones Absolutas
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span className="text-[#6f6a5c] text-sm">Embarazo o periodo de lactancia.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span className="text-[#6f6a5c] text-sm">Infección activa o inflamación en la zona de aplicación.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span className="text-[#6f6a5c] text-sm">Enfermedades neuromusculares (ej: Miastenia Gravis, ELA).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-red-500 mt-1">•</span>
                                        <span className="text-[#6f6a5c] text-sm">Alergia conocida a la albúmina o a la toxina botulínica.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-8">
                                Conoce a Nuestro Equipo Especialista
                            </h2>
                            <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                                {/* Placeholder for Doctor Image - using a div for now */}
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex-shrink-0 flex items-center justify-center text-2xl">👨‍⚕️</div>

                                <div>
                                    <h3 className="text-xl font-bold text-[#1b1a18]">Dr. Nicolás Laucirica</h3>
                                    <p className="text-[#b8935f] font-medium text-sm mb-3">Cirujano Dentista • Especialista en Armonización Orofacial</p>
                                    <p className="text-[#6f6a5c] text-sm mb-4">
                                        Certificado en técnicas avanzadas de inyección facial. Enfocado en la seguridad del paciente y resultados naturales. Miembro activo de la comunidad médica estética en Biobío.
                                    </p>
                                    <Link href="/profesionales/nicolas-laucirica" className="text-[#1b1a18] font-bold text-sm underline hover:text-[#b8935f] transition-colors">
                                        Ver Perfil Completo y Credenciales →
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <span className="block text-2xl font-bold text-[#1b1a18] mb-1">+1000</span>
                                    <span className="text-xs text-[#6f6a5c] uppercase tracking-wide">Pacientes Felices</span>
                                </div>
                                <div className="bg-white p-4 rounded-lg text-center">
                                    <span className="block text-2xl font-bold text-[#1b1a18] mb-1">5.0</span>
                                    <span className="text-xs text-[#6f6a5c] uppercase tracking-wide">Estrellas en Google</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] text-center mb-12">
                        Preguntas Frecuentes
                    </h2>
                    <div className="space-y-4">
                        <details className="group bg-gray-50 p-6 rounded-lg cursor-pointer">
                            <summary className="flex justify-between items-center font-medium text-[#1b1a18] list-none">
                                ¿Cuánto dura el efecto de la toxina botulínica?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-[#6f6a5c] mt-4 text-sm leading-relaxed">
                                Los resultados son visibles entre 3 a 6 meses. La duración exacta depende del metabolismo de cada paciente, la gesticulación y la fuerza muscular. En Clínica Cialo realizamos un seguimiento para optimizar tus tiempos de retoque y mantener el resultado.
                            </p>
                        </details>

                        <details className="group bg-gray-50 p-6 rounded-lg cursor-pointer">
                            <summary className="flex justify-between items-center font-medium text-[#1b1a18] list-none">
                                ¿Es seguro el tratamiento con Botox?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-[#6f6a5c] mt-4 text-sm leading-relaxed">
                                Sí, es uno de los procedimientos estéticos más seguros del mundo cuando es realizado por profesionales médicos capacitados. Utilizamos productos certificados por el ISP y seguimos protocolos estrictos de asepsia y anatomía.
                            </p>
                        </details>

                        <details className="group bg-gray-50 p-6 rounded-lg cursor-pointer">
                            <summary className="flex justify-between items-center font-medium text-[#1b1a18] list-none">
                                ¿Cuándo veré los resultados?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-[#6f6a5c] mt-4 text-sm leading-relaxed">
                                El efecto comienza a notarse sutilmente a los 3-4 días, pero el resultado final se aprecia a los 14 días. Por eso citamos a un control a las 2 semanas, para verificar la simetría y realizar ajustes si fuese necesario.
                            </p>
                        </details>

                        <details className="group bg-gray-50 p-6 rounded-lg cursor-pointer">
                            <summary className="flex justify-between items-center font-medium text-[#1b1a18] list-none">
                                ¿A qué edad se recomienda empezar?
                                <span className="transition group-open:rotate-180">
                                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                </span>
                            </summary>
                            <p className="text-[#6f6a5c] mt-4 text-sm leading-relaxed">
                                No hay una edad fija, pero el "Baby Botox" o tratamiento preventivo puede iniciarse desde los 25-30 años, cuando comienzan a marcarse las primeras líneas de expresión dinámicas, evitando que se conviertan en arrugas estáticas permanentes.
                            </p>
                        </details>
                    </div>
                </div>
            </section>

            {/* Final CTA / Location */}
            <section className="py-24 bg-[#1b1a18] text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-italiana)] text-white mb-8">
                        Agenda tu Evaluación en Los Ángeles
                    </h2>
                    <p className="text-[#cbcfd1] mb-10 text-lg">
                        Descubre cómo podemos realzar tu belleza natural. Estamos ubicados en el corazón de la ciudad.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20agendar%20mi%20hora%20para%20Toxina%20Botulínica"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-[#b8935f] text-[#1b1a18] px-10 py-5 font-bold uppercase tracking-wider hover:bg-white transition-all text-lg"
                        >
                            Agendar por WhatsApp
                        </a>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-[#cbcfd1] text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#b8935f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Bulnes 220, Of. 509, Los Ángeles
                        </div>
                        <div className="h-4 w-px bg-white/20 hidden md:block"></div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-[#b8935f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Lun-Vie 08:30-20:00 | Sáb 09:00-15:00
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
