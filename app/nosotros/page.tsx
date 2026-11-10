import { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce la historia de Clínica Cialo, líderes en medicina estética en Los Ángeles. Unimos ciencia, arte y estética con un equipo multidisciplinario de especialistas.",
  alternates: {
    canonical: '/nosotros/',
  },
};

export default function NosotrosPage() {
  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Confianza",
      description:
        "Nos inspira la confianza de nuestros pacientes. Cada procedimiento se realiza con transparencia y compromiso.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Innovación",
      description:
        "Mantenemos una constante actualización en tecnología y técnicas para ofrecer los mejores resultados.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      title: "Excelencia",
      description:
        "Compromiso con la excelencia médica en cada tratamiento, buscando siempre superar las expectativas.",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Bienestar",
      description:
        "Cada visita es una experiencia de bienestar donde la estética se vive con seguridad y dedicación.",
    },
  ];

  const goals = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: "Ofrecer tratamientos que realcen la belleza y confianza de cada persona.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: "Ampliar nuestros servicios y presencia en la región.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: "Contar siempre con los mejores profesionales en medicina estética y salud.",
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      text: "Mantener precios competitivos sin comprometer calidad ni seguridad.",
    },
  ];

  const specialties = [
    "Estética Facial Avanzada",
    "Estética Corporal y Reductiva",
    "Urología y Estética Íntima Masculina",
    "Ginecología Estética y Rejuvenecimiento Íntimo",
    "Nutrición Clínica y Deportiva",
    "Tricología e Implante Capilar",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1b1a18] via-[#2a2622] to-[#1b1a18] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d3c8ba] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block text-[#b8935f] uppercase tracking-[0.3em] text-xs font-semibold mb-6">
              Conócenos
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-[family-name:var(--font-italiana)] text-white mb-6">
              Sobre Nosotros
            </h1>
            <p className="text-lg md:text-xl text-[#cbcfd1] max-w-3xl mx-auto font-light leading-relaxed">
              En Clínica Cialo unimos ciencia, arte y estética para ofrecer
              tratamientos personalizados, seguros y efectivos que realzan tu
              belleza natural y tu confianza.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                Nuestra Historia
              </span>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                Ciencia, Arte y Estética
              </h2>
              <p className="text-[#6f6a5c] leading-relaxed mb-6">
                En Clínica Cialo trabajamos con un enfoque integral que une
                ciencia, arte y tecnología, para ofrecer tratamientos seguros,
                personalizados y con resultados naturales.
              </p>
              <p className="text-[#6f6a5c] leading-relaxed mb-6">
                Creemos en la confianza, la innovación y la excelencia médica.
                Cada paciente recibe una atención cercana y profesional,
                respaldada por especialistas en medicina estética, ginecología,
                urología, nutrición y tricología capilar.
              </p>
              <p className="text-[#6f6a5c] leading-relaxed mb-8">
                Contamos con un equipo altamente capacitado y tecnología de
                última generación, lo que nos permite posicionarnos como un
                referente en medicina estética en el sur de Chile.
              </p>

              {/* Certifications */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-[#faf6ef] px-4 py-2 rounded-sm">
                  <svg
                    className="w-5 h-5 text-[#b8935f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-[#1b1a18]">
                    Autorizados SEREMI
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-[#faf6ef] px-4 py-2 rounded-sm">
                  <svg
                    className="w-5 h-5 text-[#b8935f]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-[#1b1a18]">
                    Productos FDA
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/clinica/clinica-cialo_boxprocedimientos.webp"
                  alt="Sala de procedimientos de Clínica Cialo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#1b1a18] rounded-sm flex items-center justify-center p-6 shadow-xl">
                <div className="text-center">
                  <span className="text-3xl font-[family-name:var(--font-italiana)] text-white block">
                    100%
                  </span>
                  <span className="text-xs text-[#cbcfd1] uppercase tracking-wider">
                    Compromiso
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="py-24 bg-[#faf6ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Nuestras Instalaciones
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              Conoce Nuestra Clínica
            </h2>
            <p className="text-[#6f6a5c] max-w-2xl mx-auto mb-8">
              Espacios diseñados para tu comodidad y seguridad, equipados con tecnología de última generación.
            </p>
            <Link
              href="/arquitectura"
              className="inline-flex items-center gap-2 text-[#b8935f] hover:text-[#1b1a18] font-semibold uppercase tracking-wider text-sm transition-colors border-b border-[#b8935f] hover:border-[#1b1a18] pb-1"
            >
              Conoce nuestra visión arquitectónica
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-sm aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500">
              <Image
                src="/clinica/clinica-cialo_recepcionclinica.webp"
                alt="Recepción y sala de espera de Clínica Cialo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white">
                  Recepción
                </h3>
                <p className="text-sm text-[#cbcfd1]">Ambiente exclusivo y confortable</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-sm aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500">
              <Image
                src="/clinica/clinica-cialo_boxdeatencionginecologica.webp"
                alt="Consultorio médico de Clínica Cialo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white">
                  Consultorio
                </h3>
                <p className="text-sm text-[#cbcfd1]">Evaluación personalizada</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-sm aspect-[4/3] shadow-lg hover:shadow-2xl transition-all duration-500">
              <Image
                src="/clinica/clinica-cialo_boxdrnicolaslaucirica.webp"
                alt="Sala de procedimientos de Clínica Cialo"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white">
                  Sala de Procedimientos
                </h3>
                <p className="text-sm text-[#cbcfd1]">Tecnología de última generación</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-[#1b1a18] p-10 rounded-sm">
              <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#b8935f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-4">
                Nuestra Misión
              </h3>
              <p className="text-[#cbcfd1] leading-relaxed mb-6">
                Ofrecer tratamientos de medicina estética de la más alta calidad
                que realcen la belleza natural de cada paciente, utilizando
                tecnología de vanguardia y un equipo de profesionales
                especializados.
              </p>
              <ul className="space-y-3">
                {goals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#b8935f] mt-0.5">{goal.icon}</span>
                    <span className="text-[#cbcfd1] text-sm">{goal.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-[#faf6ef] p-10 rounded-sm">
              <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-[#b8935f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
                Nuestra Visión
              </h3>
              <p className="text-[#6f6a5c] leading-relaxed mb-6">
                Consolidarnos como el centro de medicina estética de referencia
                en el sur de Chile, combinando ciencia, arte y tecnología para
                entregar resultados visibles y naturales.
              </p>
              <p className="text-[#6f6a5c] leading-relaxed">
                Nos inspira la confianza de nuestros pacientes, la innovación
                constante y el compromiso con la excelencia médica. Queremos que
                cada visita sea una experiencia de bienestar, donde la estética
                se viva con seguridad, profesionalismo y dedicación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#faf6ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Lo Que Nos Define
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
              Nuestros Valores
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-sm text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 mx-auto bg-[#b8935f]/10 rounded-full flex items-center justify-center mb-6 text-[#b8935f] group-hover:bg-[#b8935f] group-hover:text-white transition-all">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#1b1a18] mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-[#6f6a5c] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Un Solo Centro, Todas las Soluciones
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              Nuestras Especialidades
            </h2>
            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
              Contamos con profesionales especializados en cada área para
              brindarte una atención integral.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-[#faf6ef] p-6 rounded-sm hover:bg-[#b8935f]/10 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#b8935f]/10 rounded-full flex items-center justify-center text-[#b8935f] group-hover:bg-[#b8935f] group-hover:text-white transition-all flex-shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="font-medium text-[#1b1a18]">{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="py-24 bg-gradient-to-br from-[#1b1a18] to-[#2a2622] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
            Equipo Multidisciplinario
          </span>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-white mb-6">
            Conoce a Nuestros Especialistas
          </h2>
          <p className="text-[#cbcfd1] text-lg mb-10 max-w-2xl mx-auto">
            En Clínica Cialo trabajamos con un equipo de médicos, matronas,
            nutricionistas y profesionales en tricología y estética avanzada.
            Cada uno aporta su experiencia para garantizar seguridad, confianza
            y resultados naturales.
          </p>
          <Link
            href="/profesionales"
            className="inline-flex items-center gap-3 bg-[#b8935f] text-[#1b1a18] px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Ver Todo el Equipo
            <svg
              className="w-5 h-5"
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
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#faf6ef] rounded-sm p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              ¿Listo para comenzar tu transformación?
            </h2>
            <p className="text-[#6f6a5c] mb-8 max-w-xl mx-auto">
              Te acompañamos de forma cercana y confidencial, priorizando
              seguridad, confort y seguimiento continuo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/56982028473"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#b8935f] text-[#1b1a18] px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Agenda tu Evaluación
              </a>
              <Link
                href="/tratamientos"
                className="inline-flex items-center justify-center gap-2 border border-[#1b1a18] text-[#1b1a18] px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-[#1b1a18] hover:text-white transition-all duration-300"
              >
                Ver Tratamientos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
