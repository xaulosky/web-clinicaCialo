"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { tratamientosData, type Tratamiento } from "@/data/tratamientos";
import { profesionalesData, getIniciales, type Profesional } from "@/data/profesionales";

const WHATSAPP_NUMBER = "56982028473";

const STEPS = ["Servicio", "Profesional", "Fecha y hora", "Tus datos", "Confirmación"] as const;

const HORARIOS = ["09:00", "09:45", "10:30", "11:15", "12:00", "15:00", "15:45", "16:30", "17:15", "18:00"];

const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

interface DiaDisponible {
    /** ISO date (yyyy-mm-dd) used as a stable key/value */
    iso: string;
    /** Localized label, e.g. "Lunes 16 de junio" */
    label: string;
    diaSemana: string;
    diaNumero: number;
    mes: string;
}

/** Genera los próximos ~10 días hábiles (lunes a sábado) a partir de mañana. */
function generarDiasHabiles(cantidad = 10): DiaDisponible[] {
    const dias: DiaDisponible[] = [];
    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);
    cursor.setDate(cursor.getDate() + 1); // empieza mañana

    while (dias.length < cantidad) {
        const dow = cursor.getDay();
        // 0 = domingo. Clínica abre lunes (1) a sábado (6).
        if (dow !== 0) {
            const year = cursor.getFullYear();
            const month = String(cursor.getMonth() + 1).padStart(2, "0");
            const day = String(cursor.getDate()).padStart(2, "0");
            dias.push({
                iso: `${year}-${month}-${day}`,
                label: `${DIAS_SEMANA[dow]} ${cursor.getDate()} de ${MESES[cursor.getMonth()]}`,
                diaSemana: DIAS_SEMANA[dow],
                diaNumero: cursor.getDate(),
                mes: MESES[cursor.getMonth()],
            });
        }
        cursor.setDate(cursor.getDate() + 1);
    }
    return dias;
}

function formatPrecio(valor: number): string {
    return "$" + valor.toLocaleString("es-CL");
}

function precioTexto(t: Tratamiento): string {
    if (t.valorDesde == null) return "Valor según evaluación";
    if (t.valorHasta != null && t.valorHasta !== t.valorDesde) {
        return `Desde ${formatPrecio(t.valorDesde)}`;
    }
    return formatPrecio(t.valorDesde);
}

function nombreProfesional(p: Profesional): string {
    return `${p.titulo} ${p.nombre} ${p.apellido}`.trim();
}

const CUALQUIERA_ID = "cualquiera";

export default function BookingFlow() {
    const searchParams = useSearchParams();
    const servicioParam = searchParams.get("servicio");
    const profesionalParam = searchParams.get("profesional");

    const dias = useMemo(() => generarDiasHabiles(10), []);

    const [step, setStep] = useState(0);

    // Selección
    const [servicioId, setServicioId] = useState<string | null>(() => {
        if (servicioParam && tratamientosData.some((t) => t.id === servicioParam)) {
            return servicioParam;
        }
        return null;
    });
    const [profesionalId, setProfesionalId] = useState<string | null>(() => {
        if (profesionalParam && profesionalesData.some((p) => p.id === profesionalParam)) {
            return profesionalParam;
        }
        return null;
    });
    const [diaIso, setDiaIso] = useState<string | null>(null);
    const [hora, setHora] = useState<string | null>(null);

    // Datos del paciente
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [errores, setErrores] = useState<{ nombre?: string; telefono?: string; email?: string }>({});

    // Buscador de servicios
    const [busqueda, setBusqueda] = useState("");

    const [confirmado, setConfirmado] = useState(false);

    // Foco en el encabezado del paso al avanzar/retroceder (accesibilidad)
    const stepHeadingRef = useRef<HTMLHeadingElement>(null);
    const primeraCarga = useRef(true);
    useEffect(() => {
        if (primeraCarga.current) {
            primeraCarga.current = false;
            return;
        }
        stepHeadingRef.current?.focus();
    }, [step]);

    const servicio = useMemo(
        () => tratamientosData.find((t) => t.id === servicioId) ?? null,
        [servicioId]
    );
    const profesional = useMemo(
        () => profesionalesData.find((p) => p.id === profesionalId) ?? null,
        [profesionalId]
    );
    const dia = useMemo(() => dias.find((d) => d.iso === diaIso) ?? null, [dias, diaIso]);

    const serviciosFiltrados = useMemo(() => {
        const q = busqueda.trim().toLowerCase();
        if (!q) return tratamientosData;
        return tratamientosData.filter((t) => {
            const haystack = `${t.nombre} ${t.categoria} ${t.subcategoria} ${t.tags.join(" ")}`.toLowerCase();
            return haystack.includes(q);
        });
    }, [busqueda]);

    const profesionalNombre = profesionalId === CUALQUIERA_ID
        ? "Cualquier profesional disponible"
        : profesional
            ? nombreProfesional(profesional)
            : "";

    // ---- Navegación ----
    function puedeAvanzar(): boolean {
        switch (step) {
            case 0:
                return servicioId != null;
            case 1:
                return profesionalId != null;
            case 2:
                return diaIso != null && hora != null;
            case 3:
                return validarDatos(false);
            default:
                return true;
        }
    }

    function validarDatos(setState = true): boolean {
        const next: typeof errores = {};
        if (nombre.trim().length < 3) next.nombre = "Ingresa tu nombre completo.";
        const telDigits = telefono.replace(/\D/g, "");
        if (telDigits.length < 8) next.telefono = "Ingresa un teléfono válido.";
        if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            next.email = "El correo no es válido.";
        }
        if (setState) setErrores(next);
        return Object.keys(next).length === 0;
    }

    function avanzar() {
        if (step === 3) {
            if (!validarDatos(true)) return;
        }
        if (!puedeAvanzar()) return;
        setStep((s) => Math.min(s + 1, STEPS.length - 1));
    }

    function retroceder() {
        setStep((s) => Math.max(s - 1, 0));
    }

    // ---- Confirmación ----
    function mensajeWhatsApp(): string {
        const lineas = [
            "Hola, quiero confirmar una reserva en Clínica CIALO:",
            `• Servicio: ${servicio?.nombre ?? "-"}`,
            `• Profesional: ${profesionalNombre || "-"}`,
            `• Fecha: ${dia?.label ?? "-"} a las ${hora ?? "-"}`,
            `• Nombre: ${nombre}`,
            `• Teléfono: ${telefono}`,
        ];
        if (email.trim()) lineas.push(`• Email: ${email.trim()}`);
        return lineas.join("\n");
    }

    function whatsAppUrl(): string {
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensajeWhatsApp())}`;
    }

    function pagarAbono() {
        // Simulado: aquí se integraría Webpay / pasarela de pago y la creación
        // de la reserva en Reservo.
        setConfirmado(true);
        if (typeof window !== "undefined") {
            window.alert(
                "Reserva simulada con éxito. Aquí se integraría el pago del abono (Webpay) y la creación de la cita en Reservo."
            );
        }
    }

    const progreso = ((step + 1) / STEPS.length) * 100;

    return (
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(27,26,24,0.08)] border border-ink/10 overflow-hidden">
            {/* Barra de progreso */}
            <div className="px-6 pt-6 sm:px-8 sm:pt-8">
                <div className="flex items-center justify-between mb-3" aria-live="polite">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-olive">
                        Paso {step + 1} de {STEPS.length}
                    </span>
                    <span className="text-[11px] font-semibold text-gold-dark uppercase tracking-[0.18em]">
                        {STEPS[step]}
                    </span>
                </div>
                {/* Indicadores de paso */}
                <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
                    {STEPS.map((label, i) => {
                        const completado = i < step;
                        const actual = i === step;
                        return (
                            <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                                <div
                                    className={`h-1 w-full rounded-full transition-all duration-500 ${
                                        completado
                                            ? "bg-gold"
                                            : actual
                                                ? "bg-gradient-to-r from-gold to-goldlt"
                                                : "bg-sand"
                                    }`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Resumen siempre visible (excepto en la confirmación, que ya lo muestra completo) */}
            {step < 4 && (servicio || profesionalId || diaIso) && (
                <div
                    className="mx-6 sm:mx-8 mb-1 rounded-xl bg-cream/70 border border-sand px-4 py-2.5"
                    aria-live="polite"
                    aria-label="Resumen de tu reserva"
                >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-olive">
                        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-dark">Tu reserva:</span>
                        {servicio && <span className="font-semibold text-ink">{servicio.nombre}</span>}
                        {profesionalNombre && (
                            <>
                                {servicio && <span aria-hidden="true" className="text-sand">·</span>}
                                <span className="text-ink">{profesionalNombre}</span>
                            </>
                        )}
                        {dia && (
                            <>
                                <span aria-hidden="true" className="text-sand">·</span>
                                <span className="text-ink">{dia.label}{hora ? ` ${hora} hrs` : ""}</span>
                            </>
                        )}
                    </div>
                </div>
            )}

            <div className="p-6 sm:p-8">
                {/* PASO 1: Servicio */}
                {step === 0 && (
                    <section className="animate-fade-in" aria-labelledby="bf-step-heading">
                        <h2 id="bf-step-heading" ref={stepHeadingRef} tabIndex={-1} className="font-[family-name:var(--font-italiana)] text-2xl sm:text-[28px] text-ink mb-1 outline-none">
                            ¿Qué te gustaría agendar?
                        </h2>
                        <p className="text-sm text-olive mb-5">Elige el servicio o tratamiento.</p>

                        <div className="relative mb-5">
                            <input
                                type="text"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                placeholder="Buscar tratamiento (ej: botox, depilación, facial)…"
                                aria-label="Buscar tratamiento"
                                className="w-full bg-cream/60 border border-sand rounded-xl pl-11 pr-4 py-3 text-sm text-ink placeholder:text-olive/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-colors"
                            />
                            <svg className="w-5 h-5 text-olive absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                        </div>

                        <div className="max-h-[420px] overflow-y-auto custom-scrollbar -mr-2 pr-2 space-y-2">
                            {serviciosFiltrados.length === 0 && (
                                <p className="text-sm text-olive py-6 text-center">
                                    No encontramos resultados para “{busqueda}”.
                                </p>
                            )}
                            {serviciosFiltrados.map((t) => {
                                const activo = t.id === servicioId;
                                return (
                                    <button
                                        key={t.id}
                                        type="button"
                                        onClick={() => setServicioId(t.id)}
                                        aria-pressed={activo}
                                        className={`w-full text-left rounded-xl border p-4 transition-all duration-300 ${
                                            activo
                                                ? "border-gold bg-gold/10 ring-1 ring-gold shadow-sm"
                                                : "border-sand hover:border-gold/60 hover:bg-cream hover:shadow-sm"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-dark">
                                                    {t.categoria}
                                                </span>
                                                <h3 className="font-semibold text-ink leading-snug">{t.nombre}</h3>
                                                <p className="text-xs text-olive mt-0.5">
                                                    {t.duracion} · {precioTexto(t)}
                                                </p>
                                            </div>
                                            <span
                                                className={`mt-1 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                                                    activo ? "bg-gold border-gold" : "border-sand"
                                                }`}
                                            >
                                                {activo && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* PASO 2: Profesional */}
                {step === 1 && (
                    <section className="animate-fade-in" aria-labelledby="bf-step-heading">
                        <h2 id="bf-step-heading" ref={stepHeadingRef} tabIndex={-1} className="font-[family-name:var(--font-italiana)] text-2xl sm:text-[28px] text-ink mb-1 outline-none">
                            Elige a tu profesional
                        </h2>
                        <p className="text-sm text-olive mb-5">
                            Puedes elegir un profesional específico o dejar que asignemos el primero disponible.
                        </p>

                        <button
                            type="button"
                            onClick={() => setProfesionalId(CUALQUIERA_ID)}
                            aria-pressed={profesionalId === CUALQUIERA_ID}
                            className={`w-full text-left rounded-xl border p-4 mb-3 transition-all duration-300 flex items-center gap-4 ${
                                profesionalId === CUALQUIERA_ID
                                    ? "border-gold bg-gold/10 ring-1 ring-gold shadow-sm"
                                    : "border-sand hover:border-gold/60 hover:bg-cream hover:shadow-sm"
                            }`}
                        >
                            <span className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z" />
                                </svg>
                            </span>
                            <div>
                                <h3 className="font-semibold text-ink">Cualquier profesional</h3>
                                <p className="text-xs text-olive">Te asignaremos el primero con disponibilidad.</p>
                            </div>
                        </button>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto custom-scrollbar -mr-2 pr-2">
                            {profesionalesData.map((p) => {
                                const activo = p.id === profesionalId;
                                return (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setProfesionalId(p.id)}
                                        aria-pressed={activo}
                                        className={`text-left rounded-xl border p-3 transition-all duration-300 flex items-center gap-3 ${
                                            activo
                                                ? "border-gold bg-gold/10 ring-1 ring-gold shadow-sm"
                                                : "border-sand hover:border-gold/60 hover:bg-cream hover:shadow-sm"
                                        }`}
                                    >
                                        <span className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-sand">
                                            {p.imagen ? (
                                                <Image
                                                    src={p.imagen}
                                                    alt={`${nombreProfesional(p)}, ${p.categoria}`}
                                                    fill
                                                    sizes="48px"
                                                    loading="lazy"
                                                    className="object-cover object-top"
                                                />
                                            ) : (
                                                <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-olive" aria-hidden="true">
                                                    {getIniciales(p)}
                                                </span>
                                            )}
                                        </span>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-ink text-sm leading-tight truncate">
                                                {nombreProfesional(p)}
                                            </h3>
                                            <p className="text-[11px] text-gold-dark font-medium uppercase tracking-wide truncate">
                                                {p.categoria}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                )}

                {/* PASO 3: Fecha y hora */}
                {step === 2 && (
                    <section className="animate-fade-in" aria-labelledby="bf-step-heading">
                        <h2 id="bf-step-heading" ref={stepHeadingRef} tabIndex={-1} className="font-[family-name:var(--font-italiana)] text-2xl sm:text-[28px] text-ink mb-1 outline-none">
                            Selecciona fecha y hora
                        </h2>
                        <p className="text-sm text-olive mb-5">Disponibilidad referencial de los próximos días.</p>

                        <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-olive mb-3">Día</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                            {dias.map((d) => {
                                const activo = d.iso === diaIso;
                                return (
                                    <button
                                        key={d.iso}
                                        type="button"
                                        onClick={() => {
                                            setDiaIso(d.iso);
                                            setHora(null);
                                        }}
                                        aria-pressed={activo}
                                        className={`rounded-xl border p-3 text-center transition-all duration-300 ${
                                            activo
                                                ? "border-gold bg-gold/10 ring-1 ring-gold shadow-sm"
                                                : "border-sand hover:border-gold/60 hover:bg-cream hover:shadow-sm"
                                        }`}
                                    >
                                        <span className="block text-[11px] uppercase tracking-wide text-olive">
                                            {d.diaSemana}
                                        </span>
                                        <span className="block text-xl font-[family-name:var(--font-italiana)] text-ink leading-tight">
                                            {d.diaNumero}
                                        </span>
                                        <span className="block text-[11px] text-olive">{d.mes}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {diaIso && (
                            <div className="animate-fade-in">
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-olive mb-3">Hora</h3>
                                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {HORARIOS.map((h) => {
                                        const activo = h === hora;
                                        return (
                                            <button
                                                key={h}
                                                type="button"
                                                onClick={() => setHora(h)}
                                                aria-pressed={activo}
                                                className={`rounded-lg border py-2.5 text-sm font-medium transition-all duration-300 ${
                                                    activo
                                                        ? "border-ink bg-ink text-white shadow-sm"
                                                        : "border-sand text-ink hover:border-gold/60 hover:bg-cream"
                                                }`}
                                            >
                                                {h}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* PASO 4: Datos */}
                {step === 3 && (
                    <section className="animate-fade-in" aria-labelledby="bf-step-heading">
                        <h2 id="bf-step-heading" ref={stepHeadingRef} tabIndex={-1} className="font-[family-name:var(--font-italiana)] text-2xl sm:text-[28px] text-ink mb-1 outline-none">
                            Tus datos de contacto
                        </h2>
                        <p className="text-sm text-olive mb-5">Los usaremos para confirmar tu reserva.</p>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="bf-nombre" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-olive mb-1.5">
                                    Nombre completo *
                                </label>
                                <input
                                    id="bf-nombre"
                                    type="text"
                                    autoComplete="name"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    aria-invalid={errores.nombre ? true : undefined}
                                    aria-describedby={errores.nombre ? "bf-nombre-error" : undefined}
                                    className={`w-full bg-cream/60 border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-olive/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-colors ${
                                        errores.nombre ? "border-red-400" : "border-sand"
                                    }`}
                                    placeholder="Ej: María Pérez"
                                />
                                {errores.nombre && <p id="bf-nombre-error" className="text-xs text-red-500 mt-1">{errores.nombre}</p>}
                            </div>

                            <div>
                                <label htmlFor="bf-telefono" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-olive mb-1.5">
                                    Teléfono *
                                </label>
                                <input
                                    id="bf-telefono"
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    aria-invalid={errores.telefono ? true : undefined}
                                    aria-describedby={errores.telefono ? "bf-telefono-error" : undefined}
                                    className={`w-full bg-cream/60 border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-olive/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-colors ${
                                        errores.telefono ? "border-red-400" : "border-sand"
                                    }`}
                                    placeholder="Ej: +56 9 1234 5678"
                                />
                                {errores.telefono && <p id="bf-telefono-error" className="text-xs text-red-500 mt-1">{errores.telefono}</p>}
                            </div>

                            <div>
                                <label htmlFor="bf-email" className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-olive mb-1.5">
                                    Email (opcional)
                                </label>
                                <input
                                    id="bf-email"
                                    type="email"
                                    inputMode="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={errores.email ? true : undefined}
                                    aria-describedby={errores.email ? "bf-email-error" : undefined}
                                    className={`w-full bg-cream/60 border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-olive/70 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-colors ${
                                        errores.email ? "border-red-400" : "border-sand"
                                    }`}
                                    placeholder="tucorreo@ejemplo.com"
                                />
                                {errores.email && <p id="bf-email-error" className="text-xs text-red-500 mt-1">{errores.email}</p>}
                            </div>
                        </div>
                    </section>
                )}

                {/* PASO 5: Confirmación */}
                {step === 4 && (
                    <section className="animate-fade-in" aria-labelledby="bf-step-heading">
                        <h2 id="bf-step-heading" ref={stepHeadingRef} tabIndex={-1} className="font-[family-name:var(--font-italiana)] text-2xl sm:text-[28px] text-ink mb-1 outline-none">
                            Revisa y confirma
                        </h2>
                        <p className="text-sm text-olive mb-5">Estás a un paso de asegurar tu cupo.</p>

                        <div className="rounded-2xl border border-sand bg-cream/50 divide-y divide-sand overflow-hidden mb-6">
                            <ResumenFila etiqueta="Servicio" valor={servicio?.nombre ?? "-"} extra={servicio ? `${servicio.duracion} · ${precioTexto(servicio)}` : undefined} />
                            <ResumenFila etiqueta="Profesional" valor={profesionalNombre || "-"} />
                            <ResumenFila etiqueta="Fecha" valor={dia?.label ?? "-"} extra={hora ? `a las ${hora} hrs` : undefined} />
                            <ResumenFila etiqueta="Paciente" valor={nombre || "-"} extra={[telefono, email].filter(Boolean).join(" · ") || undefined} />
                        </div>

                        {confirmado ? (
                            <div className="rounded-2xl bg-green-50 border border-green-200 p-5 text-center mb-4 animate-fade-in" role="status">
                                <div className="w-12 h-12 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-3">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-ink mb-1">¡Reserva registrada!</h3>
                                <p className="text-sm text-olive">
                                    Te contactaremos para confirmar los detalles. (Demostración: la integración de pago y
                                    agenda real se conectará a Webpay / Reservo).
                                </p>
                            </div>
                        ) : (
                            <>
                                <p className="text-xs text-olive mb-3 bg-gold/5 border border-gold/20 rounded-xl p-3 flex items-start gap-2.5">
                                    <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>
                                        Reservar no tiene costo: el abono asegura tu cupo y se descuenta del valor total de tu
                                        atención. Pago y agenda son una demostración por ahora.
                                    </span>
                                </p>
                                {/* Señales de confianza junto al CTA */}
                                <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-4 text-[11px] text-olive">
                                    <li className="inline-flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Autorización SEREMI de Salud
                                    </li>
                                    <li className="inline-flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-gold-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        Hasta 12 cuotas
                                    </li>
                                    <li className="inline-flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5 text-gold-dark" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        4.9 · +284 reseñas
                                    </li>
                                </ul>
                            </>
                        )}

                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={pagarAbono}
                                disabled={confirmado}
                                className="w-full inline-flex items-center justify-center gap-2 bg-gold text-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] rounded-full hover:bg-ink transition-colors shadow-sm hover:shadow-md disabled:opacity-50 disabled:hover:bg-gold disabled:shadow-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Pagar abono y asegurar mi cupo
                            </button>

                            <a
                                href={whatsAppUrl()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.08em] rounded-full hover:bg-[#128C7E] transition-colors shadow-sm hover:shadow-md"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Confirmar por WhatsApp
                            </a>
                        </div>
                    </section>
                )}
            </div>

            {/* Controles de navegación */}
            {step < STEPS.length - 1 && (
                <div className="flex items-center justify-between gap-3 border-t border-sand p-6 sm:px-8">
                    <button
                        type="button"
                        onClick={retroceder}
                        disabled={step === 0}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-olive px-4 py-2.5 rounded-full hover:bg-cream hover:text-ink transition-colors disabled:opacity-0 disabled:pointer-events-none"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Atrás
                    </button>

                    <button
                        type="button"
                        onClick={avanzar}
                        disabled={!puedeAvanzar()}
                        className="inline-flex items-center gap-2 bg-gold text-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.08em] rounded-full hover:bg-ink transition-colors shadow-sm hover:shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold disabled:shadow-sm"
                    >
                        Continuar
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}

            {step === STEPS.length - 1 && (
                <div className="border-t border-sand p-6 sm:px-8">
                    <button
                        type="button"
                        onClick={retroceder}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-olive px-4 py-2.5 rounded-full hover:bg-cream hover:text-ink transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Modificar datos
                    </button>
                </div>
            )}
        </div>
    );
}

function ResumenFila({ etiqueta, valor, extra }: { etiqueta: string; valor: string; extra?: string }) {
    return (
        <div className="flex items-start justify-between gap-4 px-5 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-olive pt-0.5">{etiqueta}</span>
            <div className="text-right">
                <span className="block text-sm font-semibold text-ink">{valor}</span>
                {extra && <span className="block text-xs text-olive mt-0.5">{extra}</span>}
            </div>
        </div>
    );
}
