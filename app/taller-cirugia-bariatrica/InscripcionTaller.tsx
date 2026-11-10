"use client";

import { useState } from "react";
import { trackLead } from "@/lib/fbpixel";

export default function InscripcionTaller() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        situacion: "Me someteré a cirugía bariátrica",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.cialo.cl";
            const payload = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: "Inscripción Taller Cirugía Bariátrica",
                message:
                    `Situación: ${formData.situacion}\n` +
                    `Comentario: ${formData.message || "(sin comentario)"}`,
            };

            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                trackLead({
                    source: "taller_bariatrico",
                    content_name: "Taller Cirugía Bariátrica",
                });
                setStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    situacion: "Me someteré a cirugía bariátrica",
                    message: "",
                });
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Error al enviar la inscripción");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Error de conexión. Intenta nuevamente.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-[#b8935f]/40 rounded-lg p-8 text-center">
                <svg className="w-16 h-16 text-[#b8935f] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">
                    ¡Inscripción recibida!
                </h3>
                <p className="text-[#cbcfd1] mb-2">
                    Gracias por inscribirte en el taller (actividad con costo).
                </p>
                <p className="text-[#cbcfd1] mb-6">
                    Te contactaremos para enviarte más información: valor, fecha, horario y forma de pago.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className="text-[#b8935f] font-semibold hover:underline"
                >
                    Inscribir a otra persona
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Nombre completo *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all"
                        placeholder="Tu nombre"
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        Teléfono / WhatsApp *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all"
                        placeholder="+56 9 1234 5678"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all"
                    placeholder="tu@email.com"
                />
            </div>

            <div>
                <label htmlFor="situacion" className="block text-sm font-medium text-white mb-2">
                    Tu situación
                </label>
                <select
                    id="situacion"
                    name="situacion"
                    value={formData.situacion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all [&>option]:text-[#1b1a18]"
                >
                    <option>Me someteré a cirugía bariátrica</option>
                    <option>Ya me sometí a cirugía bariátrica</option>
                    <option>Estoy evaluando la cirugía</option>
                    <option>Acompaño a un familiar / cercano</option>
                </select>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    ¿Algo que quieras contarnos? (opcional)
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tu principal desafío o duda hoy..."
                ></textarea>
            </div>

            {status === "error" && (
                <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-sm text-sm">
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#b8935f] text-[#1b1a18] py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                    "Reservar mi cupo"
                )}
            </button>

            <p className="text-center text-xs text-[#cbcfd1]/70">
                💳 Taller con costo · Te contactaremos para enviarte el valor, la fecha y la forma de pago.
            </p>
        </form>
    );
}
