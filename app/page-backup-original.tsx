import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import Image from "next/image";
import { tratamientosData } from "@/data/tratamientos";
import { categoriasData } from "@/data/categorias";
import { blogPosts } from "@/data/blog";
import { profesionalesData } from "@/data/profesionales";
import HeroVideoBackground from "./components/HeroVideoBackground";
import ProfesionalCard from "./components/ProfesionalCard";

import QuickSearch from "./components/QuickSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clínica Estética Los Ángeles | Medicina Estética | Clínica Cialo",
  description: "Líderes en medicina estética en Los Ángeles. Combinamos ciencia, experiencia y tecnología para resultados naturales, seguros y clínicamente medibles.",
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  // Comprobación final del sistema de subida optimizada
  // Get 4 featured treatments
  const featuredTreatments = tratamientosData.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar transparent />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Video with Image Preloader */}
        <HeroVideoBackground
          videoId="WiiWJCVPrIw"
          fallbackImage="/clinica/clinica-cialo_recepcionclinica.webp"
          fallbackAlt="Recepción de Clínica Cialo - Medicina Estética en Los Ángeles"
        />

        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d3c8ba] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <span className="inline-block text-[#b8935f] uppercase tracking-[0.3em] text-xs font-semibold mb-6 animate-fade-in">
            Líderes de Medicina Estética en Los Ángeles
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-italiana)] text-white mb-6 animate-fade-in-up">
            Clínica Cialo
          </h1>
          <p className="text-lg md:text-xl text-[#cbcfd1] max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in">
            Combinamos ciencia, experiencia y tecnología para lograr resultados
            naturales, seguros y clínicamente medibles y confiables.
          </p>

          {/* Quick Search */}
          <div className="mb-12 animate-fade-in-up relative z-50">
            <QuickSearch />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
            <a
              href="https://wa.me/56982028473"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg uppercase tracking-wider shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Agendar Cita
            </a>
            <Link
              href="/tratamientos"
              className="inline-flex items-center justify-center gap-2 border border-[#cbcfd1] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-[#1b1a18] transition-all duration-300"
            >
              Ver Tratamientos
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>


        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-[#cbcfd1]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-24 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
                Sobre Nosotros
              </span>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">
                Ciencia, Arte y Estética
              </h2>
              <p className="text-[#6f6a5c] leading-relaxed mb-6">
                En Clínica Cialo unimos ciencia, arte y estética para ofrecer
                tratamientos personalizados que realzan tu belleza natural y
                promueven tu bienestar integral. Contamos con médicos especialistas,
                odontólogos, matronas, nutricionistas y profesionales certificados.
              </p>
              <p className="text-[#6f6a5c] leading-relaxed mb-8">
                Cada procedimiento se realiza bajo los más altos estándares de
                seguridad, con productos aprobados por la FDA y equipos de última
                generación. Autorizados por la SEREMI de Salud.
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <span className="text-4xl font-[family-name:var(--font-italiana)] text-[#b8935f]">
                    163+
                  </span>
                  <p className="text-sm text-[#6f6a5c] mt-1">
                    Reseñas 5 estrellas
                  </p>
                </div>
                <div>
                  <span className="text-4xl font-[family-name:var(--font-italiana)] text-[#b8935f]">
                    50+
                  </span>
                  <p className="text-sm text-[#6f6a5c] mt-1">
                    Tratamientos disponibles
                  </p>
                </div>
                <div>
                  <span className="text-4xl font-[family-name:var(--font-italiana)] text-[#b8935f]">
                    100%
                  </span>
                  <p className="text-sm text-[#6f6a5c] mt-1">
                    Compromiso
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/clinica/clinica-cialo_boxprocedimientos.webp"
                  alt="Sala de procedimientos de Clínica Cialo - Medicina Estética en Los Ángeles"
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
                    Satisfacción
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-24 bg-[#faf6ef]" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Nuestros Servicios
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              Tratamientos Destacados
            </h2>
            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
              Descubre nuestros procedimientos más populares, diseñados para
              brindarte resultados excepcionales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white p-6 rounded-sm border border-gray-100 hover:shadow-xl hover:border-[#b8935f]/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-[#b8935f]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#b8935f] transition-colors">
                  <svg
                    className="w-6 h-6 text-[#b8935f] group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <span className="text-[10px] text-[#b8935f] uppercase tracking-wider font-semibold">
                  {treatment.categoria}
                </span>
                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mt-2 mb-3 group-hover:text-[#b8935f] transition-colors">
                  {treatment.nombre}
                </h3>
                <p className="text-sm text-[#6f6a5c] line-clamp-2">
                  {treatment.descripcion}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tratamientos"
              className="inline-flex items-center gap-2 text-[#1b1a18] font-semibold hover:text-[#b8935f] transition-colors group"
            >
              Ver todos los tratamientos
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
      </section>


      {/* Categories */}
      <section className="py-24 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Especialidades
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
              Áreas de Tratamiento
            </h2>
          </div>

          {/* Main Categories - Large Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {categoriasData.slice(0, 3).map((category) => (
              <Link
                key={category.nombre}
                href={`/tratamientos/categoria/${category.slug}`}
                className="group relative overflow-hidden rounded-sm aspect-[4/3] flex flex-col justify-end hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={category.imagen}
                  alt={`Tratamientos ${category.nombre} - Clínica Cialo`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18] via-[#1b1a18]/60 to-transparent"></div>
                <div className="relative z-10 p-8">
                  <span className="text-[#b8935f] text-sm font-medium mb-2 block">
                    {tratamientosData.filter((t) => t.categoria === category.nombre).length} tratamientos
                  </span>
                  <h3 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-2 group-hover:text-[#b8935f] transition-colors">
                    {category.titulo}
                  </h3>
                  <p className="text-[#cbcfd1] text-sm line-clamp-2">
                    {category.descripcion}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-[#b8935f] group-hover:border-[#b8935f] transition-all">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary Categories - Compact Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoriasData.slice(3).map((category) => (
              <Link
                key={category.nombre}
                href={`/tratamientos/categoria/${category.slug}`}
                className="group relative overflow-hidden rounded-sm aspect-[3/2] flex flex-col justify-end hover:shadow-xl transition-all duration-500"
              >
                <Image
                  src={category.imagen}
                  alt={`${category.titulo} - Clínica Cialo`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b1a18] via-[#1b1a18]/50 to-transparent"></div>
                <div className="relative z-10 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 text-[#b8935f]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={category.iconPath} />
                    </svg>
                    <span className="text-[#b8935f] text-xs font-medium">
                      {tratamientosData.filter((t) => t.categoria === category.nombre).length} tratamientos
                    </span>
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-italiana)] text-white group-hover:text-[#b8935f] transition-colors">
                    {category.titulo}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Exams Section */}
      <section className="py-24 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Tecnología de Vanguardia
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-white mb-4">
              Exámenes y Diagnóstico
            </h2>
            <p className="text-[#cbcfd1] max-w-2xl mx-auto">
              Tecnología avanzada para evaluaciones precisas y planes de tratamiento personalizados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* InBody 970 */}
            <Link
              href="/inbody-970-los-angeles"
              className="group bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-[#b8935f] hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-3 group-hover:text-[#b8935f] transition-colors">
                InBody 970
              </h3>
              <p className="text-[#cbcfd1] text-sm mb-4">
                Análisis de composición corporal de grado médico. Mide masa muscular, grasa corporal, agua y más con precisión profesional.
              </p>
              <span className="inline-flex items-center text-[#b8935f] text-sm font-medium group-hover:gap-2 transition-all">
                Ver más
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Calorimetría */}
            <Link
              href="/calorimetria-indirecta-los-angeles"
              className="group bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-[#b8935f] hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-3 group-hover:text-[#b8935f] transition-colors">
                Calorimetría Indirecta
              </h3>
              <p className="text-[#cbcfd1] text-sm mb-4">
                Medición exacta de tu metabolismo basal. Descubre cuántas calorías quema tu cuerpo en reposo para un plan nutricional preciso.
              </p>
              <span className="inline-flex items-center text-[#b8935f] text-sm font-medium group-hover:gap-2 transition-all">
                Ver más
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* Escleroterapia */}
            <Link
              href="/escleroterapia-consulta-vascular-los-angeles"
              className="group bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 hover:border-[#b8935f] hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#b8935f]/20 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#b8935f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 12h3l3-9 3 18 3-9h3" />
                </svg>
              </div>
              <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-3 group-hover:text-[#b8935f] transition-colors">
                Escleroterapia
              </h3>
              <p className="text-[#cbcfd1] text-sm mb-4">
                Tratamiento de arañitas vasculares y várices. Evaluación vascular profesional con ecografía Doppler incluida.
              </p>
              <span className="inline-flex items-center text-[#b8935f] text-sm font-medium group-hover:gap-2 transition-all">
                Ver más
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Clinic Gallery Section */}
      <section className="py-24 bg-[#faf6ef]" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Nuestras Instalaciones
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              Conoce Nuestra Clínica
            </h2>
            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
              Espacios diseñados para tu comodidad y seguridad, equipados con tecnología de última generación.
            </p>
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
                src="/clinica/clinica-cialo_boxdeatencionfacial.webp"
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
                src="/clinica/clinica-cialo_pabellonclinico.webp"
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

      {/* Team Section */}
      <section className="py-24 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Nuestro Equipo
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              Profesionales Especialistas
            </h2>
            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
              Un equipo multidisciplinario comprometido con tu bienestar y resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {profesionalesData.slice(0, 4).map((profesional, index) => (
                <ProfesionalCard key={profesional.id} profesional={profesional} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/profesionales"
              className="inline-flex items-center gap-2 text-[#1b1a18] font-semibold hover:text-[#b8935f] transition-colors group"
            >
              Ver todo el equipo
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
      </section>

      {/* CTA Section */}
      <section
        id="contacto"
        className="py-24 bg-gradient-to-br from-[#1b1a18] to-[#2a2622] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
            Comienza Tu Transformación
          </span>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-white mb-6">
            Agenda Tu Evaluación
          </h2>
          <p className="text-[#cbcfd1] text-lg mb-10 max-w-2xl mx-auto">
            Cada paciente recibe una evaluación clínica detallada para indicar
            el tratamiento más adecuado a sus necesidades.
          </p>
          <a
            href="https://wa.me/56982028473"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#b8935f] text-[#1b1a18] px-10 py-5 text-sm font-bold uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-24 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold">
                Reseñas de Google
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#6f6a5c] font-medium">5.0</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              Lo Que Dicen Nuestros Pacientes
            </h2>
            <p className="text-[#6f6a5c]">
              Basado en <span className="font-semibold text-[#1b1a18]">163 reseñas</span> verificadas en Google
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Lilian Clunes",
                time: "hace 1 mes",
                review: "Me encantó atenderme en la clínica del Dr. Nicolás. Es un profesional excelente, muy detallista y siempre atento a todo lo que uno necesita. La clínica es hermosa y súper acogedora, desde que entras se nota la dedicación del equipo y la buena disposición de todos. Lo recomiendo 100%.",
              },
              {
                name: "Maira Guzmán",
                time: "hace 2 meses",
                review: "Bonita experiencia, también estaba muy genial la máquina que le dice a uno sobre su tipo de piel y temas muy específicos, además las señoritas que nos atendieron fueron muy agradables.",
              },
              {
                name: "Sofia Cea Molina",
                time: "hace 2 meses",
                review: "Excelente trabajo, utilizan productos de muy buena calidad y duradera, me realicé rinomodelación, Bichectomía y láser en la cara y todo muy recomendado.",
              },
              {
                name: "Carolina Jara Olave",
                time: "hace 2 meses",
                review: "Excelentes profesionales, la clínica está hermosa y cuentan con las mejores máquinas del área. Mi piel ha mejorado muchísimo.",
              },
              {
                name: "Sole Rios",
                time: "hace 2 meses",
                review: "Excelente atención del doctor Laucirica, me explicó con detalle los distintos procedimientos adecuados a mis necesidades. El resultado de mi primer tratamiento me dejó feliz. Gracias.",
              },
              {
                name: "Alex Neira",
                time: "hace 2 meses",
                review: "En la clínica Cialo son bastante profesionales e inclusive el doctor Nicolás sabe muy bien lo que hace. Se preocupa del bienestar de sus pacientes y aconseja usar productos para que las sesiones sean efectivas. Por mi lado la clínica Cialo tiene 5 estrellas.",
              },
            ].map((review, index) => (
              <div
                key={index}
                className="bg-[#faf6ef] p-6 rounded-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#b8935f] flex items-center justify-center text-white font-semibold text-sm">
                    {review.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1b1a18] text-sm">{review.name}</h4>
                    <p className="text-xs text-[#6f6a5c]">{review.time}</p>
                  </div>
                  <svg className="w-5 h-5 ml-auto text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#6f6a5c] leading-relaxed line-clamp-4">
                  {review.review}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://g.page/r/CfvPDmR8Y6InEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#1b1a18] font-semibold hover:text-[#b8935f] transition-colors group"
            >
              Ver todas las reseñas en Google
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
            </a>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-24 bg-white" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              Nuestro Blog
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">
              Últimos Artículos
            </h2>
            <p className="text-[#6f6a5c] max-w-2xl mx-auto">
              Consejos, novedades y todo lo que necesitas saber sobre medicina estética.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.filter(p => !p.isShort).sort((a, b) => new Date(b.fechaPublicacion).getTime() - new Date(a.fechaPublicacion).getTime()).slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.imagen}
                    alt={post.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#b8935f] text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.categoria}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#6f6a5c] mb-3">
                    <span>{new Date(post.fechaPublicacion).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" })}</span>
                    <span>•</span>
                    <span>{post.tiempoLectura} lectura</span>
                  </div>
                  <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-3 group-hover:text-[#b8935f] transition-colors line-clamp-2">
                    {post.titulo}
                  </h3>
                  <p className="text-sm text-[#6f6a5c] line-clamp-2">
                    {post.extracto}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-[#1b1a18] text-white px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:bg-[#b8935f] transition-colors"
            >
              Ver Todos los Artículos
              <svg
                className="w-4 h-4"
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
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-[#faf6ef]" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#b8935f] uppercase tracking-widest text-xs font-semibold mb-4 block">
              ¿Por qué elegirnos?
            </span>
            <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-italiana)] text-[#1b1a18]">
              Tu Bienestar, Nuestra Prioridad
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Autorizados SEREMI",
                description: "Centro médico autorizado por la SEREMI de Salud con todos los permisos vigentes."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: "Productos FDA",
                description: "Utilizamos solo productos aprobados por la FDA para garantizar tu seguridad."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Equipo Especializado",
                description: "Médicos, matronas, nutricionistas y profesionales certificados a tu servicio."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Tecnología Líder",
                description: "Equipos de última generación y tecnología líder en el mercado mundial."
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 mx-auto bg-[#b8935f]/10 rounded-full flex items-center justify-center mb-4 text-[#b8935f] group-hover:bg-[#b8935f] group-hover:text-white transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#1b1a18] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#6f6a5c]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div >
  );
}
