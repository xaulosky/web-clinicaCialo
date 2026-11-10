"use client";

import { useState } from "react";
import { trackLead } from "@/lib/fbpixel";

export default function CotizacionPabellon() {
    const [formData, setFormData] = useState({
        name: "",
        especialidad: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.cialo.cl";
            const response = await fetch(`${apiUrl}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    subject: "Cotización Arriendo de Pabellón",
                    message:
                        `Especialidad: ${formData.especialidad || "(no indicada)"}\n` +
                        `Mensaje: ${formData.message || "(sin mensaje)"}`,
                }),
            });
            const data = await response.json();

            if (data.success) {
                trackLead({ source: "arriendo_pabellon", content_name: "Arriendo Pabellón" });
                setStatus("success");
                setFormData({ name: "", especialidad: "", email: "", phone: "", message: "" });
            } else {
                setStatus("error");
                setErrorMessage(data.message || "Error al enviar la solicitud");
            }
        } catch {
            setStatus("error");
            setErrorMessage("Error de conexión. Intenta nuevamente.");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-white/10 backdrop-blur-sm border border-[#b8935f]/40 rounded-lg p-8 text-center">
                <svg className="w-14 h-14 text-[#b8935f] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-[family-name:var(--font-italiana)] text-white mb-2">¡Solicitud recibida!</h3>
                <p className="text-[#cbcfd1] mb-6">
                    Te contactaremos a la brevedad para coordinar una visita y entregarte la cotización.
                </p>
                <button onClick={() => setStatus("idle")} className="text-[#b8935f] font-semibold hover:underline">
                    Enviar otra solicitud
                </button>
            </div>
        );
    }

    const inputCls =
        "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:ring-2 focus:ring-[#b8935f] focus:border-transparent outline-none transition-all";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Nombre completo *</label>
                    <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputCls} placeholder="Dr./Dra. Nombre Apellido" />
                </div>
                <div>
                    <label htmlFor="especialidad" className="block text-sm font-medium text-white mb-2">Especialidad *</label>
                    <input type="text" id="especialidad" name="especialidad" required value={formData.especialidad} onChange={handleChange} className={inputCls} placeholder="Ej: Cirugía, Dermatología, Odontología" />
                </div>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email *</label>
                    <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputCls} placeholder="tu@email.com" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">Teléfono / WhatsApp *</label>
                    <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} className={inputCls} placeholder="+56 9 1234 5678" />
                </div>
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">¿Qué procedimientos realizas y qué necesitas? (opcional)</label>
                <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} className={`${inputCls} resize-none`} placeholder="Ej: blefaroplastias 2 veces al mes, necesito pabellón con electrobisturí y apoyo TENS..." />
            </div>

            {status === "error" && (
                <div className="bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-sm text-sm">{errorMessage}</div>
            )}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#b8935f] text-[#1b1a18] py-4 font-semibold uppercase tracking-wider hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "loading" ? "Enviando…" : "Solicitar cotización"}
            </button>
        </form>
    );
}
