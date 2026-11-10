import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: "/", label: "Inicio" },
        { href: "/tratamientos", label: "Tratamientos" },
        { href: "/consultas", label: "Consultas" },
        { href: "/profesionales", label: "Profesionales" },
        { href: "/productos", label: "Productos" },
        { href: "/nosotros", label: "Nosotros" },
        { href: "/arriendo-pabellon-los-angeles", label: "Arriendo de Pabellón" },
        { href: "/arriendo-box-los-angeles", label: "Arriendo de Box" },
        { href: "/arquitectura", label: "Arquitectura" },
        { href: "/trabaja-con-nosotros", label: "Trabaja con Nosotros" },
        { href: "/contacto", label: "Contacto" },
    ];

    const treatments = [
        { href: "/tratamientos/categoria/facial", label: "Facial" },
        { href: "/tratamientos/categoria/corporal", label: "Corporal" },
        { href: "/tratamientos/categoria/capilar", label: "Capilar" },
        { href: "/tratamientos/categoria/ginecoestetica", label: "Ginecoestética" },
        { href: "/tratamientos/categoria/urologia", label: "Urología" },
        { href: "/tratamientos/categoria/nutricion", label: "Nutrición" },
        { href: "/tratamientos/categoria/vascular", label: "Vascular" },
    ];

    const tecnologia = [
        { href: "/soprano-titanium-los-angeles", label: "Soprano Titanium" },
        { href: "/morpheus8-los-angeles", label: "Morpheus8" },
        { href: "/clatuu-alpha-los-angeles", label: "Clatuu Alpha" },
        { href: "/hydrafacial-md-los-angeles", label: "HydraFacial MD" },
        { href: "/exilis-ultra-360-los-angeles", label: "Exilis Ultra 360" },
        { href: "/scizer-hifu-los-angeles", label: "Scizer HIFU" },
    ];

    const tratamientosDestacados = [
        { href: "/dermatologo-los-angeles", label: "Dermatólogo" },
        { href: "/psiquiatra-los-angeles", label: "Psiquiatra" },
        { href: "/podologo-los-angeles", label: "Podólogo" },
        { href: "/matrona-los-angeles-chile", label: "Matrona" },
        { href: "/depilacion-laser-los-angeles", label: "Depilación Láser" },
        { href: "/rinomodelacion-los-angeles", label: "Rinomodelación" },
        { href: "/relleno-labios-los-angeles", label: "Relleno de Labios" },
        { href: "/sculptra-los-angeles", label: "Sculptra" },
        { href: "/toxina-botulinica-tercio-superior-los-angeles", label: "Toxina Botulínica" },
        { href: "/injerto-capilar-fue-los-angeles", label: "Injerto Capilar FUE" },
    ];


    return (
        <footer className="bg-ink text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <Image
                                src="/logo-cialo.png"
                                alt="Clínica Cialo"
                                width={174}
                                height={40}
                                style={{ height: "2.5rem", width: "auto" }}
                                className="h-10 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-goldlt/80 text-sm leading-relaxed mb-6">
                            Unimos tecnología de vanguardia, equipo especializado y un trato
                            cercano para lograr resultados naturales y seguros.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/clinicacialo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold hover:-translate-y-0.5 transition-all duration-300 group"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-5 h-5 text-goldlt group-hover:text-white transition-colors"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a
                                href="https://wa.me/56982028473"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] hover:-translate-y-0.5 transition-all duration-300 group"
                                aria-label="WhatsApp"
                            >
                                <svg
                                    className="w-5 h-5 text-goldlt group-hover:text-white transition-colors"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-[family-name:var(--font-italiana)] text-white mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-gold/50">
                            Enlaces Rápidos
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-block text-goldlt text-sm hover:text-gold hover:translate-x-1 transition-all duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Treatments */}
                    <div>
                        <h4 className="text-lg font-[family-name:var(--font-italiana)] text-white mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-gold/50">
                            Tratamientos
                        </h4>
                        <ul className="space-y-3">
                            {treatments.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-block text-goldlt text-sm hover:text-gold hover:translate-x-1 transition-all duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tecnología */}
                    <div>
                        <h4 className="text-lg font-[family-name:var(--font-italiana)] text-white mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-gold/50">
                            Tecnología
                        </h4>
                        <ul className="space-y-3">
                            {tecnologia.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-block text-goldlt text-sm hover:text-gold hover:translate-x-1 transition-all duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tratamientos Destacados */}
                    <div>
                        <h4 className="text-lg font-[family-name:var(--font-italiana)] text-white mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-gold/50">
                            Destacados
                        </h4>
                        <ul className="space-y-3">
                            {tratamientosDestacados.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-block text-goldlt text-sm hover:text-gold hover:translate-x-1 transition-all duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-[family-name:var(--font-italiana)] text-white mb-6 pb-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-px after:bg-gold/50">
                            Contacto
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-gold mt-0.5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-goldlt text-sm">
                                    Bulnes 220, Of. 509 — Edificio Puerto Mayor II
                                    <br />
                                    Los Ángeles, Biobío, Chile
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-gold flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <a
                                    href="tel:+56982028473"
                                    className="text-goldlt text-sm hover:text-gold transition-colors"
                                >
                                    +56 9 8202 8473
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-gold flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href="mailto:contacto@cialo.cl"
                                    className="text-goldlt text-sm hover:text-gold transition-colors"
                                >
                                    contacto@cialo.cl
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <svg
                                    className="w-5 h-5 text-gold flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div className="text-goldlt text-xs">
                                    <span className="block">Lun-Vie: 08:30 - 20:00</span>
                                    <span className="block">Sábado: 09:00 - 15:00</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Google Maps Section */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                        <div className="lg:w-1/3">
                            <h4 className="text-lg font-[family-name:var(--font-italiana)] text-white mb-2">
                                Encuéntranos
                            </h4>
                            <p className="text-goldlt text-sm">
                                Bulnes 220, Of. 509, Edificio Puerto Mayor II
                                <br />
                                Los Ángeles, Biobío, Chile
                            </p>
                        </div>
                        <div className="lg:w-2/3 h-48 lg:h-56 rounded-sm overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.7123456789!2d-72.3550!3d-37.4700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdf123456789%3A0x123456789abcdef!2sBulnes%20220%2C%20Los%20%C3%81ngeles%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Ubicación Clínica Cialo"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            {/* Autorización SEREMI */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                    <div className="flex items-center justify-center gap-3 text-center">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gold/15 flex-shrink-0">
                            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </span>
                        <p className="text-goldlt/80 text-xs sm:text-sm">
                            Centro médico estético <span className="text-white font-medium">autorizado por la SEREMI de Salud</span> de la Región del Biobío.
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-goldlt/80 text-sm">
                            © {currentYear} Clínica Cialo — Medicina Estética Avanzada en Los Ángeles. Todos los derechos reservados.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 text-sm">
                            <Link
                                href="/privacidad"
                                className="text-goldlt hover:text-gold transition-colors"
                            >
                                Privacidad
                            </Link>
                            <Link
                                href="/terminos"
                                className="text-goldlt hover:text-gold transition-colors"
                            >
                                Términos de Uso
                            </Link>
                            <Link
                                href="/politica-pagos"
                                className="text-goldlt hover:text-gold transition-colors"
                            >
                                Política de Pagos
                            </Link>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                        <p className="text-goldlt/50 text-xs">
                            Sitio web diseñado, desarrollado y mantenido por{' '}
                            <a
                                href="https://netgenius.cl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-white transition-colors font-medium"
                            >
                                NetGenius.cl
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
