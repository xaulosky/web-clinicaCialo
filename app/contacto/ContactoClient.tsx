"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { trackLead } from "@/lib/fbpixel";

export default function ContactoPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "Consulta General",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';
            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                // Meta Pixel: evento Lead (formulario de contacto enviado)
                trackLead({ source: 'formulario_contacto', content_name: formData.subject });
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", subject: "Consulta General", message: "" });
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Error al enviar el mensaje");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Error de conexión. Intenta nuevamente.");
        }
    };

    const contactInfo = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Dirección",
            content: "Bulnes 220, Of. 509",
            subtitle: "Los Ángeles, Chile"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Teléfono",
            content: "+56 9 8202 8473",
            subtitle: "Lun-Vie: 08:30-20:00 | Sáb: 09:00-15:00"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email",
            content: "contacto@cialo.cl",
            subtitle: "Respuesta en 24hrs"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            ),
            title: "WhatsApp",
            content: "Escríbenos directo",
            subtitle: "Respuesta inmediata",
            link: "https://wa.me/56982028473"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar transparent />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#1b1a18] to-[#2a2622]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-[#b8935f] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#b8935f] rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <nav className="flex items-center justify-center gap-2 text-sm text-[#cbcfd1] mb-8">
                        <Link href="/" className="hover:text-[#b8935f] transition-colors">Inicio</Link>
                        <span>/</span>
                        <span className="text-[#b8935f]">Contacto</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-italiana)] text-white mb-6">
                        Contáctanos
                    </h1>
                    <p className="text-lg text-[#cbcfd1] max-w-2xl mx-auto font-light">
                        Estamos aquí para responder tus consultas y ayudarte a agendar tu cita.
                        No dudes en escribirnos.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="relative -mt-10 z-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-sm shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-14 h-14 bg-[#b8935f]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#b8935f]">
                                    {info.icon}
                                </div>
                                <h3 className="font-semibold text-[#1b1a18] mb-2">{info.title}</h3>
                                {info.link ? (
                                    <a
                                        href={info.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#b8935f] font-medium hover:underline"
                                    >
                                        {info.content}
                                    </a>
                                ) : (
                                    <p className="text-[#6f6a5c] font-medium">{info.content}</p>
                                )}
                                <p className="text-sm text-[#888] mt-1">{info.subtitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content: Form + Map */}
            <section className="py-16 bg-[#faf6ef]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <div className="bg-white rounded-sm shadow-lg p-8 lg:p-10">
                            <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">
                                Envíanos un Mensaje
                            </h2>
                            <p className="text-[#6f6a5c] mb-8">
                                Completa el formulario y te responderemos a la brevedad.
                            </p>

                            {status === "success" ? (
                                <div className="bg-green-50 border border-green-200 rounded-sm p-6 text-center">
                                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-green-700 mb-2">¡Mensaje Enviado!</h3>
                                    <p className="text-green-600 mb-4">
                                        Gracias por contactarnos. Te responderemos pronto.
                                    </p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="text-[#b8935f] font-semibold hover:underline"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-[#1b1a18] mb-2">
                                                Nombre Completo *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all"
                                                placeholder="Tu nombre"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-[#1b1a18] mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all"
                                                placeholder="tu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-[#1b1a18] mb-2">
                                                Teléfono
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all"
                                                placeholder="+56 9 1234 5678"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-[#1b1a18] mb-2">
                                                Asunto
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all bg-white"
                                            >
                                                <option>Consulta General</option>
                                                <option>Agendar Cita</option>
                                                <option>Información de Tratamientos</option>
                                                <option>Precios y Promociones</option>
                                                <option>Reclamo o Sugerencia</option>
                                                <option>Otro</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-[#1b1a18] mb-2">
                                            Mensaje *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Escribe tu mensaje aquí..."
                                        ></textarea>
                                    </div>

                                    {status === "error" && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="w-full bg-[#1b1a18] text-white py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-[#1b1a18] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {status === "loading" ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Enviar Mensaje
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Map Section */}
                        <div className="flex flex-col">
                            <div className="bg-white rounded-sm shadow-lg overflow-hidden flex-1">
                                <div className="p-6 border-b border-gray-100">
                                    <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">
                                        Nuestra Ubicación
                                    </h2>
                                    <p className="text-[#6f6a5c]">
                                        Edificio Centro Médico, 5° piso, Of. 509
                                    </p>
                                </div>
                                <div className="h-80 lg:h-auto lg:flex-1">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.7123456789!2d-72.3550!3d-37.4700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966bdf123456789%3A0x123456789abcdef!2sBulnes%20220%2C%20Los%20%C3%81ngeles%2C%20B%C3%ADo%20B%C3%ADo!5e0!3m2!1ses!2scl!4v1234567890"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: "300px" }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Ubicación Clínica Cialo"
                                    ></iframe>
                                </div>
                            </div>

                            {/* Quick WhatsApp CTA */}
                            <div className="mt-6 bg-gradient-to-r from-[#25d366] to-[#128c7e] rounded-sm p-6 text-white">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg">¿Necesitas respuesta inmediata?</h3>
                                        <p className="text-white/80 text-sm">Escríbenos por WhatsApp y te atendemos al instante</p>
                                    </div>
                                    <a
                                        href="https://wa.me/56982028473"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-white text-[#25d366] px-6 py-3 rounded-sm font-semibold hover:bg-gray-100 transition-colors"
                                    >
                                        Chatear
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <Footer />
        </div>
    );
}
