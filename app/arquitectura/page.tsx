import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Arquitectura",
    description:
        "Descubre la visión arquitectónica de Clínica Cialo. Un espacio donde la luz, el diseño y la función médica convergen para crear una experiencia única.",
    alternates: {
        canonical: '/arquitectura/',
    },
};

export default function ArquitecturaPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar transparent />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-[#1b1a18] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d3c8ba] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="inline-block text-[#b8935f] uppercase tracking-[0.3em] text-xs font-semibold mb-6">
                            Experiencia Cialo
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-italiana)] text-white mb-6">
                            Arquitectura y Luz
                        </h1>
                        <p className="text-lg md:text-xl text-[#cbcfd1] max-w-3xl mx-auto font-light leading-relaxed">
                            Donde la estética se encuentra con la función médica. Un recorrido por
                            nuestra visión espacial de la mano del arquitecto Edmundo Villouta.
                        </p>
                    </div>
                </div>
            </section>

            {/* Section 1: Vision & Lighting */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                La Visión
                            </span>
                            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                Atmósfera y Sensaciones
                            </h2>
                            <div className="space-y-6 text-[#6f6a5c] leading-relaxed">
                                <p>
                                    Nuestra clínica fue concebida como un espacio arquitectónico que
                                    trasciende la función médica. Desde el inicio, cada elemento fue
                                    diseñado para generar sensaciones: calma, confianza y un aire de
                                    innovación que se refleja en cada rincón.
                                </p>
                                <p>
                                    La iluminación se convirtió en el hilo conductor que integra todos
                                    estos conceptos. No hablamos solo de lámparas o focos, sino de una
                                    estrategia lumínica que dialoga con la arquitectura. Combinamos
                                    temperaturas cálidas y frías de manera precisa, logrando resaltar
                                    la nobleza de la piedra, la fuerza de las texturas naturales y el
                                    carácter minimalista de los volúmenes.
                                </p>
                                <p>
                                    Cada espacio fue estudiado para que la iluminación acompañe al
                                    paciente en su recorrido: al entrar, transmite acogida y amplitud;
                                    en las salas de espera, invita a la tranquilidad; en los box
                                    clínicos, otorga seguridad y precisión.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="w-full max-w-[350px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl relative border-4 border-[#1b1a18]">
                                <iframe
                                    src="https://www.instagram.com/reel/DO3o1CVDvqn/embed"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Technical Excellence (Dark Theme) */}
            <section className="py-24 bg-[#1b1a18]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="flex justify-center">
                            <div className="w-full max-w-[350px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl relative border-4 border-[#2a2622]">
                                <iframe
                                    src="https://www.instagram.com/reel/DMdtXydhLdk/embed"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                        <div>
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Excelencia Técnica
                            </span>
                            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-white mb-6">
                                Seguridad Certificada
                            </h2>
                            <div className="space-y-6 text-[#cbcfd1] leading-relaxed">
                                <p>
                                    Descubre la arquitectura de nuestro pabellón, diseñado bajo la más
                                    estricta normativa internacional. Cada detalle ha sido pensado
                                    para garantizar la máxima seguridad y esterilidad.
                                </p>
                                <ul className="space-y-4 my-6">
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#b8935f] mt-1">✦</span>
                                        <span>
                                            Sistemas de ventilación avanzados para un aire puro y seguro.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#b8935f] mt-1">✦</span>
                                        <span>
                                            Materiales y mobiliario clínico de grado hospitalario.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-[#b8935f] mt-1">✦</span>
                                        <span>
                                            Detalles constructivos como guardapolvos sanitarios para una
                                            limpieza total y prevención de bacterias.
                                        </span>
                                    </li>
                                </ul>
                                <p>
                                    En Clínica Cialo, la calidad y la seguridad de nuestro pabellón
                                    están certificadas para tu total tranquilidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Design & Materials */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                                Materialidad
                            </span>
                            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                                Neolith y Volúmenes
                            </h2>
                            <div className="space-y-6 text-[#6f6a5c] leading-relaxed">
                                <p>
                                    Nos apasiona llevar la arquitectura al límite. De la mano de
                                    nuestro arquitecto, hemos incorporado las impresionantes placas de
                                    piedra sintetizada <strong>Neolith</strong> en nuestros espacios,
                                    aportando una elegancia atemporal y una durabilidad excepcional.
                                </p>
                                <p>
                                    Cada elemento está cuidadosamente diseñado, superponiendo y
                                    articulando volúmenes con un acabado impecable que resalta la
                                    belleza natural de la piedra.
                                </p>
                                <p>
                                    Esta elección de materiales no es casual: busca crear un entorno
                                    sólido, higiénico y visualmente impactante que eleva la
                                    experiencia de cada visita.
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href="/contacto"
                                        className="inline-flex items-center gap-2 text-[#1b1a18] font-semibold hover:text-[#b8935f] transition-colors group border-b border-[#1b1a18] pb-1 hover:border-[#b8935f]"
                                    >
                                        Ven a conocer nuestros espacios
                                        <svg
                                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 flex justify-center">
                            <div className="w-full max-w-[350px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-2xl relative border-4 border-[#1b1a18]">
                                <iframe
                                    src="https://www.instagram.com/reel/DMVlBVBOszV/embed"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-24 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                            Galería
                        </span>
                        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                            Nuestros Espacios
                        </h2>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">
                            Un recorrido visual por las instalaciones de Clínica Cialo.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                src: "/clinica/clinica-cialo_recepcionclinica.webp",
                                alt: "Recepción Clínica Cialo",
                                title: "Recepción",
                            },
                            {
                                src: "/clinica/clinica-cialo_pabellonclinico.webp",
                                alt: "Pabellón Clínico",
                                title: "Pabellón Certificado",
                            },
                            {
                                src: "/clinica/clinica-cialo_boxprocedimientos.webp",
                                alt: "Box de Procedimientos",
                                title: "Sala de Procedimientos",
                            },
                            {
                                src: "/clinica/clinica-cialo_boxdrnicolaslaucirica.webp",
                                alt: "Box Dr. Nicolás Laucirica",
                                title: "Consultorio Médico",
                            },
                            {
                                src: "/clinica/clinica-cialo_boxdeatencionginecologica.webp",
                                alt: "Box Ginecológico",
                                title: "Ginecoestética",
                            },
                            {
                                src: "/clinica/clinica-cialo_boxdeatencionfacial.webp",
                                alt: "Box Facial",
                                title: "Estética Facial",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-sm aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
