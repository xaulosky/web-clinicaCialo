import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Dr. Nicolás Laucirica | Links",
    description: "Todos los enlaces del Dr. Nicolás Laucirica - Medicina Estética Facial en Los Ángeles, Chile",
    robots: "noindex",
};

const links = [
    {
        titulo: "🏥 Clínica Cialo",
        descripcion: "Mi clínica de medicina estética",
        url: "https://cialo.cl",
        destacado: true,
    },
    {
        titulo: "📅 Agendar Consulta",
        descripcion: "Reserva tu evaluación facial",
        url: "https://wa.me/56930520422?text=Hola%20Dr.%20Nicolás,%20quiero%20agendar%20una%20consulta",
        destacado: true,
    },
    {
        titulo: "👨‍⚕️ Mi Perfil Profesional",
        descripcion: "Conoce mi experiencia y formación",
        url: "https://cialo.cl/profesionales/nicolas-laucirica",
        destacado: false,
    },
    {
        titulo: "📰 Entrevista Revista Vía",
        descripcion: "Mi historia y visión",
        url: "https://revistavialosangeles.cl/2025/09/10/en-portada-13/",
        destacado: false,
    },
    {
        titulo: "💉 Tratamientos Faciales",
        descripcion: "Botox, ácido hialurónico, armonización",
        url: "https://cialo.cl/tratamientos/categoria/facial",
        destacado: false,
    },
    {
        titulo: "📍 Ubicación",
        descripcion: "Bulnes 220, Of. 509, Los Ángeles",
        url: "https://maps.app.goo.gl/DjfpthMavnmhdBf36",
        destacado: false,
    },
];

const sociales = [
    {
        nombre: "Instagram Personal",
        url: "https://www.instagram.com/dr.nicolaslaucirica",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
        ),
    },
    {
        nombre: "Instagram Clínica",
        url: "https://www.instagram.com/cialo.cl",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
        ),
    },
    {
        nombre: "TikTok",
        url: "https://www.tiktok.com/@dr.nicolaslaucirica",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
        ),
    },
    {
        nombre: "WhatsApp",
        url: "https://wa.me/56930520422",
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
    },
];

export default function DrNicolasLinksPage() {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-[#1b1a18] via-[#2a2a2a] to-[#1b1a18] overflow-x-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-20 right-20 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-10 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-lg mx-auto px-4 py-12">
                {/* Profile Header */}
                <div className="text-center mb-10">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-3 border-[#b8935f]">
                        <Image
                            src="/profesionales/thumb/clinica-cialo_Nicolas_Laucirica.webp"
                            alt="Dr. Nicolás Laucirica"
                            fill
                            className="object-cover object-top"
                        />
                    </div>
                    <h1 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-1">
                        Dr. Nicolás Laucirica
                    </h1>
                    <p className="text-[#b8935f] text-sm font-medium mb-1">
                        Director Clínico · Medicina Estética Facial
                    </p>
                    <p className="text-[#cbcfd1] text-xs">
                        Director Clínica Cialo · Los Ángeles, Chile
                    </p>
                    <p className="text-[#888] text-xs mt-2 max-w-xs mx-auto italic">
                        "La estética facial no se trata solo de belleza, sino de devolver autoestima, seguridad y confianza"
                    </p>
                </div>

                {/* Links */}
                <div className="space-y-3 mb-10">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block w-full p-4 rounded-lg text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${link.destacado
                                ? "bg-[#b8935f] text-[#1b1a18] font-semibold hover:bg-white"
                                : "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/10"
                                }`}
                        >
                            <span className="block text-base">{link.titulo}</span>
                            <span className={`block text-xs mt-0.5 ${link.destacado ? "text-[#1b1a18]/70" : "text-white/60"}`}>
                                {link.descripcion}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="flex justify-center gap-4 mb-10">
                    {sociales.map((social, index) => (
                        <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all duration-300 hover:scale-110"
                            title={social.nombre}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center">
                    <div className="text-[#888] text-xs mb-4 space-y-1">
                        <p>📍 Clínica Cialo · Bulnes 220, Of. 509, Los Ángeles</p>
                        <p>📍 Prat 199, Torre A, Of. 708, Concepción</p>
                    </div>
                    <Link
                        href="/links"
                        className="inline-flex items-center gap-1 text-[#b8935f] text-sm hover:text-white transition-colors"
                    >
                        Ver links de Clínica Cialo →
                    </Link>
                </div>

                {/* Powered by */}
                <div className="mt-12 text-center">
                    <Link href="/" className="text-[#555] text-[10px] hover:text-[#b8935f] transition-colors">
                        cialo.cl
                    </Link>
                </div>
            </div>
        </div>
    );
}
