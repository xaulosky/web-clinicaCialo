'use client';

// Reserva online propia (primera persona) contra el backend de api.cialo.cl.
//
// Modos:
//  - profesionalFijo (ficha del profesional / ?profesional=): profesional dado.
//    Pasos: servicio → día/hora → datos → confirmar. Si su agenda tiene UN solo
//    servicio, el paso servicio se salta (auto-selección).
//  - genérico (/agendar): pasos: servicio → [profesional] → día/hora → datos →
//    confirmar. El paso profesional se salta si un solo profesional habilitado
//    ofrece ese servicio.
//
// Fuentes de datos (todas del backend, autoridad del servidor):
//  - GET /reservo/agendables: qué agendas/profesionales tienen reserva propia
//    habilitada (box configurado). Si un profesional NO está habilitado, se cae
//    automáticamente al iframe de reservo.cl — nada queda sin agenda.
//  - GET /reservo/agenda-info?token=: servicios REALES de la agenda (nombre,
//    valor, duración) y sus profesionales. De aquí salen precios y duraciones.
//  - GET /reservo/slots: disponibilidad real (duración del servicio elegido).
//  - POST /reservo/eval-gratis | /reservo/pago/init: agendar / pagar (Webpay).
//
// Pago: la evaluación del Dr. Laucirica mantiene su franja gratuita
// (L-Ma-J-V 09/12/15) o $30.000; todo lo demás reserva con abono de $20.000
// (o el valor del servicio si es menor) que se descuenta en la clínica.
// El servidor recalcula los montos: el cliente solo los muestra.

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Profesional, profesionalesData } from '@/data/profesionales';
import { tratamientosData } from '@/data/tratamientos';
import { consultasData, type Consulta } from '@/data/consultas';
import ReservoBooking from './ReservoBooking';
import { trackLead } from '@/lib/fbpixel';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';
const ABONO = 20000;
const EVAL_PRECIO = 30000;
const FREE_DIAS = [1, 2, 4, 5];          // ISO: Lun, Mar, Jue, Vie (franja eval)
const FREE_HORAS = ['09:00', '12:00', '15:00'];
const TOKEN_NICOLAS = '80br1yU0X03NjJ7R6k95ll55U6m99N';
const WA = 'https://wa.me/56982028473';
const AGENDA_GLOBAL = 'https://agendamiento.reservo.cl/makereserva/agenda/M0xVVPC050asiS096X85s51537J9aG';

interface Slot { horaInicio: string; horaFin: string; profesionales: string[]; }
interface AgendaProf { id: string; nombre: string; cargo: string; }
interface AgendaServicio { id: string; nombre: string; duracion: string; valor: string; online: boolean; }
interface AgendaInfo { profesionales: AgendaProf[]; tratamientos: AgendaServicio[]; }
interface Agendables { agendas: Record<string, string[]>; eval_tokens: string[]; }

/** Servicio elegido en el paso 1 (consulta del catálogo, evaluación o tratamiento-interés). */
interface Servicio {
    tipo: 'eval' | 'consulta' | 'tratamiento';
    nombre: string;
    /** token de agenda al que se reserva (consulta) — para tratamiento se usa el del profesional elegido */
    token?: string;
    valorSitio?: number | null;
    consulta?: Consulta;
}
/** Candidato del paso profesional. */
interface Candidato {
    reservoId: string | null; // null = "el primero disponible"
    token: string;            // agenda por la que se reserva
    nombre: string;
    siteProf?: Profesional;
}

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const DIAS_ABBR = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES_ABBR = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function isoDay(iso: string): number {
    const [y, m, d] = iso.split('-').map(Number);
    const wd = new Date(y, m - 1, d).getDay();
    return wd === 0 ? 7 : wd;
}
function esFranjaGratis(iso: string, hora: string): boolean {
    return FREE_DIAS.includes(isoDay(iso)) && FREE_HORAS.includes(hora.slice(0, 5));
}
function fmtCLP(n: number): string { return '$' + n.toLocaleString('es-CL'); }
function fmtFechaLegible(iso: string): string {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    return `${DIAS_ABBR[new Date(y, m - 1, d).getDay()]} ${d} ${MESES_ABBR[m - 1]}`;
}
function limpiarRut(r: string): string { return r.replace(/[.\s]/g, '').replace(/-/g, '').toUpperCase(); }
function formatearRut(r: string): string { const c = limpiarRut(r); return c.length > 1 ? `${c.slice(0, -1)}-${c.slice(-1)}` : c; }
function validarRut(r: string): boolean {
    const c = limpiarRut(r);
    if (!/^\d{7,8}[0-9K]$/.test(c)) return false;
    const cuerpo = c.slice(0, -1), dv = c.slice(-1);
    let suma = 0, mul = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) { suma += parseInt(cuerpo[i], 10) * mul; mul = mul === 7 ? 2 : mul + 1; }
    const res = 11 - (suma % 11);
    return (res === 11 ? '0' : res === 10 ? 'K' : String(res)) === dv;
}
function tokenDe(url?: string | null): string {
    const m = url?.match(/\/makereserva\/agenda\/([^/?#]+)/);
    return m ? m[1] : '';
}
/**
 * ¿El string libre `profesional` de tratamientos.ts refiere a este profesional?
 * Compara normalizado (sin tildes) el primer nombre Y el primer apellido, para
 * sobrevivir a "Maria"/"María", "Dra. Francisca González" vs nombre "Francisca
 * Andrea", y no confundir apellidos compartidos (Contreras).
 */
function profHaceTratamiento(tProfesional: string, p: { nombre: string; apellido: string }): boolean {
    const hay = norm(tProfesional);
    const n1 = norm(p.nombre).split(' ')[0];
    const a1 = norm(p.apellido).split(' ')[0];
    return !!n1 && !!a1 && hay.includes(n1) && hay.includes(a1);
}
/** normaliza para comparar nombres de servicios ("Evaluación Nutricional" ≈ "evaluacion nutricional") */
function norm(s: string): string {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim();
}
function durMinDe(hms: string): number {
    const p = hms.split(':').map((x) => parseInt(x, 10) || 0);
    const min = (p[0] || 0) * 60 + (p[1] || 0);
    return min > 0 ? min : 30;
}
function valorDe(v: string): number { return parseInt(v.replace(/\D/g, ''), 10) || 0; }
/** Consulta/evaluación = se paga completa al reservar (mismo criterio que el servidor). */
function esConsultaSvc(nombre?: string | null): boolean {
    return !!nombre && /^(consulta|evaluacion|control)\b/.test(norm(nombre));
}
function generarDias(cantidad: number) {
    const out: { iso: string; dia: string; num: number; mes: string }[] = [];
    const base = new Date(); base.setHours(0, 0, 0, 0);
    for (let i = 0, added = 0; added < cantidad && i < cantidad * 2; i++) {
        const d = new Date(base); d.setDate(base.getDate() + i);
        if (d.getDay() === 0) continue;
        out.push({ iso: toIso(d), dia: DIAS_ABBR[d.getDay()], num: d.getDate(), mes: MESES_ABBR[d.getMonth()] });
        added++;
    }
    return out;
}

const inputCls = 'w-full rounded-xl border border-sand bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-olive/40 outline-none transition-colors focus:border-gold focus:bg-white';
const labelCls = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-olive';
const chipCls = (sel: boolean) => `rounded-full px-4 py-2 text-xs font-semibold transition-all ${sel ? 'bg-gold text-white shadow-sm' : 'bg-cream text-olive hover:bg-sand hover:text-ink'}`;

const ICON = {
    money: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    confirm: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    cancel: 'M3 8l4-4m0 0l4 4m-4-4v12m10 0l4-4m-4 4l-4-4m4 4V4',
    cedula: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
};
const INSTR_COMUNES: { icon: string; texto: ReactNode }[] = [
    { icon: ICON.confirm, texto: <>Te contactaremos al menos el <strong>día previo</strong> por WhatsApp y/o llamado para confirmar tu asistencia. Si no confirmas, el cupo puede liberarse.</> },
    { icon: ICON.cedula, texto: <>Llega <strong>10 minutos antes</strong> y trae tu <strong>cédula de identidad</strong>. Bulnes 220, Of. 509, Los Ángeles.</> },
];
const CANCELACION = { icon: ICON.cancel, texto: <>Puedes <strong>cancelar o reagendar sin costo con 24 h de anticipación</strong>. Con menos de 24 h se retiene el 50%. No presentarte sin aviso = sin reembolso.</> };
// Tratamientos: se reserva con abono. Consultas: se pagan completas al reservar.
const INSTR_ABONO: { icon: string; texto: ReactNode }[] = [
    { icon: ICON.money, texto: <>Lo que pagas hoy <strong>se descuenta del valor de tu atención</strong> — no es un cargo extra.</> },
    CANCELACION,
];
const INSTR_TOTAL: { icon: string; texto: ReactNode }[] = [
    { icon: ICON.money, texto: <>Tu atención queda <strong>pagada por completo</strong> — no tienes que pagar nada más en la clínica.</> },
    CANCELACION,
];
const INSTR_GRATIS: { icon: string; texto: ReactNode }[] = [
    { icon: ICON.cancel, texto: <>Si no puedes asistir, <strong>avísanos con anticipación</strong> para reagendar. Si no avisas ni asistes, se libera tu cupo.</> },
];

const NOMBRE_PASO: Record<string, string> = { servicio: 'Servicio', profesional: 'Profesional', horario: 'Día y hora', datos: 'Tus datos', confirmar: 'Confirmar' };

export default function ReservaOnline({ profesionalFijo, consultaFija }: { profesionalFijo?: Profesional; consultaFija?: Consulta }) {
    const generico = !profesionalFijo && !consultaFija;
    const tokenFijo = profesionalFijo ? tokenDe(profesionalFijo.agendaUrl) : '';
    const tokenConsulta = consultaFija ? tokenDe(consultaFija.agendaUrl) : '';

    // ── Habilitación dinámica (qué agendas/profesionales tienen box) ──
    const [agendables, setAgendables] = useState<Agendables | null>(null);
    const [agendablesError, setAgendablesError] = useState(false);
    useEffect(() => {
        let cancel = false;
        fetch(`${API}/reservo/agendables`)
            .then((r) => r.json())
            .then((j) => { if (!cancel && j?.agendas) setAgendables(j as Agendables); else if (!cancel) setAgendablesError(true); })
            .catch(() => !cancel && setAgendablesError(true));
        return () => { cancel = true; };
    }, []);
    const evalTokens = agendables?.eval_tokens ?? [TOKEN_NICOLAS];

    // ── Cache de agenda-info por token ──
    const infoCache = useRef(new Map<string, AgendaInfo>());
    const [infoVersion, setInfoVersion] = useState(0); // fuerza re-render al cachear
    const [infoLoading, setInfoLoading] = useState(false);
    const cargarInfo = useCallback((token: string) => {
        if (!token || infoCache.current.has(token)) return;
        setInfoLoading(true);
        fetch(`${API}/reservo/agenda-info?token=${encodeURIComponent(token)}`)
            .then((r) => r.json())
            .then((j) => {
                if (j?.profesionales) infoCache.current.set(token, { profesionales: j.profesionales, tratamientos: j.tratamientos ?? [] });
            })
            .catch(() => { /* fail-soft: se reserva sin id de servicio */ })
            .finally(() => { setInfoLoading(false); setInfoVersion((v) => v + 1); });
    }, []);

    // Id en reservo de un profesional del sitio. En agendas COMPARTIDAS (varios
    // profesionales bajo el mismo token) es obligatorio declararlo en los datos:
    // sin él no se sabe a quién se reserva, así que se devuelve null y el
    // profesional cae al iframe en vez de agendar con la persona equivocada.
    const reservoIdDe = useCallback((p: Profesional): string | null => {
        const t = tokenDe(p.agendaUrl);
        const ids = (t && agendables?.agendas[t]) || [];
        if (p.reservoId) return ids.includes(p.reservoId) ? p.reservoId : null;
        return ids.length === 1 ? ids[0] : null;
    }, [agendables]);
    // mapa inverso id reservo -> profesional del sitio (para fotos/nombres)
    const sitePorReservoId = useMemo(() => {
        const map = new Map<string, Profesional>();
        if (!agendables) return map;
        for (const p of profesionalesData) {
            const id = reservoIdDe(p);
            if (id) map.set(id, p);
        }
        return map;
    }, [agendables, reservoIdDe]);

    const dias = useMemo(() => generarDias(30), []);
    // Semanas Lun–Sáb (la primera puede ser parcial si hoy es mitad de semana).
    const semanas = useMemo(() => {
        const out: (typeof dias)[] = [];
        let cur: typeof dias = [];
        for (const d of dias) {
            if (d.dia === 'Lun' && cur.length) { out.push(cur); cur = []; }
            cur.push(d);
        }
        if (cur.length) out.push(cur);
        return out;
    }, [dias]);

    // ── Estado del wizard ──
    const [pasoKey, setPasoKey] = useState('servicio');
    const [servicio, setServicio] = useState<Servicio | null>(null);
    const [interes, setInteres] = useState('');            // solo flujo evaluación
    const [candElegido, setCandElegido] = useState<Candidato | null>(null);
    const [fecha, setFecha] = useState('');
    const [slots, setSlots] = useState<Slot[]>([]);
    const [slot, setSlot] = useState<Slot | null>(null);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [slotsError, setSlotsError] = useState('');
    const [semanaIdx, setSemanaIdx] = useState(0);
    // Días con disponibilidad real (null = sin datos: cargando, o falló → todos
    // habilitados). `cargandoDias` distingue ambos casos: mientras carga, los
    // días se muestran deshabilitados para no ofrecer fechas sin horas.
    const [diasDisp, setDiasDisp] = useState<Set<string> | null>(null);
    const [cargandoDias, setCargandoDias] = useState(false);
    const autoSalto = useRef(false);
    // Popup "solo por WhatsApp" cuando la agenda no tiene NINGUNA hora online.
    const [avisoWspCerrado, setAvisoWspCerrado] = useState(false);
    const [datos, setDatos] = useState({ nombre: '', apPaterno: '', apMaterno: '', rut: '', mail: '', phone: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
    const [error, setError] = useState('');
    const [forzarPago, setForzarPago] = useState(false);
    const submitting = useRef(false);

    // Volver desde Webpay con el botón atrás restaura la página desde la caché
    // del navegador (bfcache) tal como quedó: con el botón en "Procesando…" y
    // submitting bloqueado, es decir, sin forma de reintentar ni de salir. Al
    // restaurarse se devuelve el formulario a un estado usable, con los datos
    // del paciente intactos.
    useEffect(() => {
        const alRestaurar = (e: PageTransitionEvent) => {
            if (!e.persisted) return;
            submitting.current = false;
            setStatus('idle');
            setError('Si no completaste el pago, tu hora sigue disponible: puedes intentarlo otra vez.');
        };
        window.addEventListener('pageshow', alRestaurar);
        return () => window.removeEventListener('pageshow', alRestaurar);
    }, []);

    // ── Catálogo del paso servicio ──
    // Genérico: consultas del sitio cuyo token tiene profesionales habilitados +
    // la Evaluación Estética Facial (agenda del Dr. Laucirica) + tratamientos-interés.
    const consultasDisponibles = useMemo(() => {
        if (!agendables) return [];
        return consultasData.filter((c) => {
            const t = tokenDe(c.agendaUrl);
            return t && (agendables.agendas[t]?.length ?? 0) > 0;
        });
    }, [agendables]);
    const evalDisponible = (agendables?.agendas[TOKEN_NICOLAS]?.length ?? 0) > 0;
    const tratamientosInteres = useMemo(() => {
        if (!agendables) return [];
        const habil = profesionalesData.filter((p) => reservoIdDe(p));
        const vistos = new Set<string>();
        return tratamientosData.filter((t) => {
            if (t.id === 'test-mercado-pago' || vistos.has(t.nombre)) return false;
            const ok = habil.some((p) => profHaceTratamiento(t.profesional, p));
            if (ok) vistos.add(t.nombre);
            return ok;
        });
    }, [agendables, reservoIdDe]);

    // Perfil: servicios reales de la agenda del profesional (agenda-info).
    const infoFijo = tokenFijo ? infoCache.current.get(tokenFijo) : undefined;
    const esEvalFijo = !!profesionalFijo && evalTokens.includes(tokenFijo);
    const serviciosFijo = useMemo(() => {
        void infoVersion;
        if (!infoFijo) return [];
        const online = infoFijo.tratamientos.filter((s) => s.online);
        // Agenda compartida o acotada: mostrar SOLO los servicios declarados del
        // profesional. Sin fallback al listado completo: en agendas compartidas
        // el resto de servicios reservaría en el box equivocado.
        const propios = profesionalFijo?.serviciosOnline;
        if (propios?.length) {
            const set = propios.map(norm);
            return online.filter((s) => set.includes(norm(s.nombre)));
        }
        return online;
    }, [infoFijo, infoVersion, profesionalFijo]);
    // Agendable = su agenda tiene box configurado Y sabemos su id en reservo
    // (en agendas compartidas, sin id no se puede reservar a su nombre).
    const profFijoAgendable = !profesionalFijo || !agendables || reservoIdDe(profesionalFijo) !== null;
    useEffect(() => {
        if (profesionalFijo && tokenFijo && agendables && profFijoAgendable && !esEvalFijo) cargarInfo(tokenFijo);
    }, [profesionalFijo, tokenFijo, agendables, profFijoAgendable, esEvalFijo, cargarInfo]);
    // Perfil de evaluación (Dr. Laucirica): el servicio ES la evaluación — se fija
    // solo, para que el flujo eval (franja gratis) aplique desde el primer paso.
    useEffect(() => {
        if (profesionalFijo && esEvalFijo && !servicio && agendables && profFijoAgendable) {
            setServicio({ tipo: 'eval', nombre: 'Evaluación médica', token: tokenFijo, valorSitio: null });
        }
    }, [profesionalFijo, esEvalFijo, servicio, agendables, profFijoAgendable, tokenFijo]);
    // Consulta fija (página de detalle de una consulta): el servicio es la consulta.
    useEffect(() => {
        if (consultaFija && !servicio && agendables) {
            setServicio({ tipo: 'consulta', nombre: consultaFija.nombre, token: tokenConsulta, valorSitio: consultaFija.valor, consulta: consultaFija });
        }
    }, [consultaFija, servicio, agendables, tokenConsulta]);
    // Perfil con UN solo servicio -> se selecciona solo y se salta el paso.
    const servicioUnicoFijo = !esEvalFijo && serviciosFijo.length === 1;
    useEffect(() => {
        if (profesionalFijo && servicioUnicoFijo && !servicio) {
            const s = serviciosFijo[0];
            setServicio({ tipo: 'consulta', nombre: s.nombre, token: tokenFijo, valorSitio: valorDe(s.valor) || null });
            if (pasoKey === 'servicio') setPasoKey('horario');
        }
    }, [profesionalFijo, servicioUnicoFijo, servicio, serviciosFijo, tokenFijo, pasoKey]);

    // ── Candidatos (paso profesional del genérico) ──
    const candidatos = useMemo((): Candidato[] => {
        if (!servicio || !agendables) return [];
        if (profesionalFijo) {
            const id = reservoIdDe(profesionalFijo);
            return [{ reservoId: id, token: tokenFijo, nombre: `${profesionalFijo.titulo} ${profesionalFijo.nombre} ${profesionalFijo.apellido}`.trim(), siteProf: profesionalFijo }];
        }
        if (servicio.tipo === 'eval') {
            const p = sitePorReservoId.get(agendables.agendas[TOKEN_NICOLAS]?.[0] ?? '');
            return [{ reservoId: agendables.agendas[TOKEN_NICOLAS]?.[0] ?? null, token: TOKEN_NICOLAS, nombre: p ? `${p.titulo} ${p.nombre} ${p.apellido}`.trim() : 'Dr. Nicolás Laucirica', siteProf: p }];
        }
        if (servicio.tipo === 'consulta' && servicio.token) {
            const ids = agendables.agendas[servicio.token] ?? [];
            const info = infoCache.current.get(servicio.token);
            let cands: Candidato[] = ids.map((id) => {
                const sp = sitePorReservoId.get(id);
                const nombre = sp ? `${sp.titulo} ${sp.nombre} ${sp.apellido}`.trim() : (info?.profesionales.find((p) => p.id === id)?.nombre ?? 'Profesional');
                return { reservoId: id, token: servicio.token!, nombre, siteProf: sp };
            });
            // Agenda COMPARTIDA (p.ej. la agenda general): ofrecer solo a los
            // profesionales que esta consulta declara — sin esto, un psiquiatra
            // aparecería como opción de la evaluación maxilofacial.
            const declarados = servicio.consulta?.profesionales;
            if (declarados?.length) {
                const nombres = declarados.map((p) => norm(p.nombre));
                const scoped = cands.filter((c) =>
                    norm(c.nombre).split(/[^a-z0-9]+/).filter((w) => w.length >= 4)
                        .some((w) => nombres.some((n) => n.includes(w)))
                );
                if (scoped.length) cands = scoped;
            }
            if (cands.length > 1) cands.push({ reservoId: null, token: servicio.token, nombre: 'Me da igual — la primera hora disponible' });
            return cands;
        }
        // tratamiento-interés: profesionales del sitio que lo realizan y están habilitados
        return profesionalesData
            .filter((p) => reservoIdDe(p) && tratamientosData.some((t) => t.nombre === servicio.nombre && profHaceTratamiento(t.profesional, p)))
            .map((p) => ({ reservoId: reservoIdDe(p), token: tokenDe(p.agendaUrl), nombre: `${p.titulo} ${p.nombre} ${p.apellido}`.trim(), siteProf: p }));
    }, [servicio, agendables, profesionalFijo, tokenFijo, reservoIdDe, sitePorReservoId, infoVersion]);

    const necesitaPasoProf = (generico || !!consultaFija) && candidatos.length > 1;
    const cand = candidatos.length === 1 ? candidatos[0] : candElegido;

    // ── Resolución final de la reserva ──
    const tokenReserva = cand?.token ?? servicio?.token ?? tokenFijo;
    const esFlujoEval = !!servicio
        && (servicio.tipo === 'eval' || servicio.tipo === 'tratamiento' || (esEvalFijo && !!profesionalFijo))
        && evalTokens.includes(tokenReserva);
    // servicio real de reservo (id + duración + valor) casado por nombre.
    // OJO: un chip de tratamiento-INTERÉS agenda una EVALUACIÓN/CONSULTA, nunca
    // el procedimiento real (eso definiría precio/cobro equivocados).
    const svcReservo = useMemo(() => {
        void infoVersion;
        if (!tokenReserva || !servicio) return null;
        const info = infoCache.current.get(tokenReserva);
        if (!info) return null;
        const online = info.tratamientos.filter((s) => s.online);
        if (esFlujoEval || servicio.tipo === 'tratamiento') {
            return online.find((s) => norm(s.nombre) === 'evaluacion')
                ?? online.find((s) => /evaluaci|consulta/.test(norm(s.nombre)))
                ?? null;
        }
        // La consulta puede fijar el servicio exacto de reservo (p.ej. el bloque
        // de "Ingreso" cuando la agenda ofrece varias variantes).
        const fijado = servicio.consulta?.servicioReservo;
        if (fijado) {
            const exacto = online.find((s) => norm(s.nombre) === norm(fijado));
            if (exacto) return exacto;
        }
        const objetivo = norm(servicio.nombre);
        const matches = online.filter((s) => {
            const n = norm(s.nombre);
            return n === objetivo || n.includes(objetivo) || objetivo.includes(n);
        });
        if (matches.length) {
            // Preferir la variante del profesional elegido (p.ej. "Evaluación
            // maxilofacial Dra. Novoa") por sobre la genérica — precios distintos.
            const palabras = norm(cand?.nombre ?? '').split(/[^a-z0-9]+/)
                .filter((w) => w.length >= 4 && !objetivo.includes(w));
            return matches.find((s) => palabras.some((w) => norm(s.nombre).includes(w)))
                ?? matches.find((s) => norm(s.nombre) === objetivo)
                ?? matches[0];
        }
        return online.find((s) => /evaluaci|consulta/.test(norm(s.nombre))) ?? null;
    }, [tokenReserva, servicio, esFlujoEval, infoVersion, cand]);
    useEffect(() => { if (tokenReserva && servicio) cargarInfo(tokenReserva); }, [tokenReserva, servicio, cargarInfo]);

    const durMin = svcReservo ? durMinDe(svcReservo.duracion) : 30;
    const valorServicio = svcReservo ? (valorDe(svcReservo.valor) || null) : (servicio?.valorSitio ?? null);
    // Consultas y evaluaciones se pagan COMPLETAS; los tratamientos con abono.
    // (El servidor recalcula el monto: acá sólo se muestra.)
    const pagaTotal = esConsultaSvc(svcReservo?.nombre ?? servicio?.nombre);
    const abonoMonto = valorServicio
        ? (pagaTotal ? valorServicio : Math.min(ABONO, valorServicio))
        : ABONO;

    // ── Disponibilidad real por día (contrastada con reservo) ──
    useEffect(() => {
        if (!tokenReserva || !servicio) return;
        let cancel = false;
        setDiasDisp(null);
        setCargandoDias(true);
        autoSalto.current = false;
        const prof = cand?.reservoId ? `&profesional=${encodeURIComponent(cand.reservoId)}` : '';
        const trat = svcReservo ? `&tratamiento=${encodeURIComponent(svcReservo.id)}` : '';
        fetch(`${API}/reservo/dias-disponibles?token=${encodeURIComponent(tokenReserva)}&dias=40&duracion=${durMin}${prof}${trat}`)
            .then((r) => r.json())
            .then((j) => { if (!cancel && Array.isArray(j?.disponibles)) setDiasDisp(new Set(j.disponibles as string[])); })
            .catch(() => { /* fail-open: sin datos, todos los días quedan habilitados */ })
            .finally(() => { if (!cancel) setCargandoDias(false); });
        return () => { cancel = true; };
    }, [tokenReserva, servicio, durMin, cand?.reservoId, svcReservo]);

    // Al llegar la disponibilidad: si la semana visible no tiene horas, saltar a
    // la primera semana que sí tenga (solo una vez, y solo si aún no eligió día).
    useEffect(() => {
        if (!diasDisp || autoSalto.current || fecha) return;
        autoSalto.current = true;
        const idx = semanas.findIndex((sem) => sem.some((d) => diasDisp.has(d.iso)));
        if (idx > 0) setSemanaIdx(idx);
    }, [diasDisp, semanas, fecha]);

    // ── Slots ──
    // Si la duración real llega tarde (agenda-info) y ya había un horario elegido,
    // se intenta re-seleccionar la misma hora en la grilla nueva.
    const horaElegida = useRef('');
    useEffect(() => {
        if (!fecha || !tokenReserva) return;
        let cancel = false;
        setLoadingSlots(true); setSlot(null); setSlotsError(''); setForzarPago(false);
        const prof = cand?.reservoId ? `&profesional=${encodeURIComponent(cand.reservoId)}` : '';
        const trat = svcReservo ? `&tratamiento=${encodeURIComponent(svcReservo.id)}` : '';
        fetch(`${API}/reservo/slots?token=${encodeURIComponent(tokenReserva)}&fecha=${fecha}&duracion=${durMin}${prof}${trat}`)
            .then(async (r) => { const j = await r.json().catch(() => ({})); if (!r.ok || !Array.isArray(j?.slots)) throw new Error('bad'); return j.slots as Slot[]; })
            .then((s) => {
                if (cancel) return;
                setSlots(s);
                const prev = horaElegida.current && s.find((x) => x.horaInicio === horaElegida.current);
                if (prev) setSlot(prev);
            })
            .catch(() => { if (cancel) return; setSlots([]); setSlotsError('No pudimos cargar los horarios. Intenta otra fecha o vuelve en unos minutos.'); })
            .finally(() => !cancel && setLoadingSlots(false));
        return () => { cancel = true; };
    }, [fecha, tokenReserva, durMin, cand?.reservoId, svcReservo]);

    // Gratis: (a) flujo eval en franja; (b) servicio real con valor $0 en la
    // agenda pública (p.ej. evaluación corporal) — el servidor lo re-verifica.
    const esServicioGratis = !esFlujoEval && !!svcReservo && valorDe(svcReservo.valor) === 0;
    const isFree = esFlujoEval ? (!!slot && esFranjaGratis(fecha, slot.horaInicio)) : esServicioGratis;
    const esPagado = !isFree || forzarPago;

    const set = (k: string, v: string) => { setDatos((p) => ({ ...p, [k]: v })); setError(''); };
    const elegirServicio = (s: Servicio) => { setServicio(s); setInteres(''); setCandElegido(null); setFecha(''); setSlot(null); horaElegida.current = ''; setSemanaIdx(0); setAvisoWspCerrado(false); setError(''); };
    const elegirSlot = (s: Slot) => { setSlot(s); horaElegida.current = s.horaInicio; setForzarPago(false); setError(''); };
    const elegirFecha = (iso: string) => { setFecha(iso); horaElegida.current = ''; };

    // ── Navegación (secuencia dinámica) ──
    const secuencia = useMemo(() => {
        const steps: string[] = [];
        if (!(profesionalFijo && servicioUnicoFijo) && !consultaFija) steps.push('servicio');
        if (necesitaPasoProf) steps.push('profesional');
        steps.push('horario', 'datos', 'confirmar');
        return steps;
    }, [profesionalFijo, servicioUnicoFijo, consultaFija, necesitaPasoProf]);
    const idx = Math.max(0, secuencia.indexOf(pasoKey));
    // Consulta fija: el paso "servicio" no existe — saltar al primer paso real.
    useEffect(() => {
        if (consultaFija && servicio && pasoKey === 'servicio') setPasoKey(secuencia[0]);
    }, [consultaFija, servicio, pasoKey, secuencia]);

    const validar = (): boolean => {
        if (pasoKey === 'servicio' && !servicio && (generico || esEvalFijo || serviciosFijo.length > 0)) {
            setError('Elige qué quieres agendar.'); return false;
        }
        if (pasoKey === 'profesional' && !cand) { setError('Elige un profesional.'); return false; }
        if (pasoKey === 'horario') {
            if (infoLoading && !svcReservo) { setError('Un momento — estamos cargando la agenda…'); return false; }
            // Consulta GRATUITA según el sitio: exigir el servicio real resuelto,
            // para nunca cobrar un abono por algo que es gratis.
            if (servicio?.consulta && servicio.consulta.valor === null && !svcReservo) {
                setError('No pudimos verificar esta evaluación gratuita. Reintenta en unos segundos.'); return false;
            }
            // Y lo simétrico para las de pago: sin el servicio real de reservo no
            // sabemos cuánto vale, y el servidor terminaría cobrando el abono
            // plano de $20.000 por una consulta que la pantalla anunció completa.
            // El flujo de evaluación se exceptúa: ahí el precio es fijo y ambos
            // lados usan el mismo valor de configuración.
            if (!esFlujoEval && servicio && !svcReservo) {
                setError('No pudimos verificar el valor de este servicio con la agenda. Reintenta en unos segundos.'); return false;
            }
            if (!fecha) { setError('Elige un día.'); return false; }
            if (!slot) { setError('Elige un horario disponible.'); return false; }
        }
        if (pasoKey === 'datos') {
            if (datos.nombre.trim().length < 2) { setError('Ingresa tu nombre.'); return false; }
            if (datos.apPaterno.trim().length < 2) { setError('Ingresa tu apellido paterno.'); return false; }
            if (!validarRut(datos.rut)) { setError('Ingresa un RUT válido (ej: 12.345.678-9).'); return false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.mail.trim())) { setError('Ingresa un email válido.'); return false; }
            if (datos.phone.trim().replace(/\D/g, '').length < 8) { setError('Ingresa un teléfono válido.'); return false; }
        }
        return true;
    };
    const avanzar = () => {
        if (!validar()) return;
        setError('');
        setPasoKey(secuencia[Math.min(idx + 1, secuencia.length - 1)]);
    };
    const retroceder = () => { setError(''); setPasoKey(secuencia[Math.max(idx - 1, 0)]); };

    // ── Reservar / pagar ──
    const nombreProf = cand?.nombre ?? (profesionalFijo ? `${profesionalFijo.titulo} ${profesionalFijo.nombre} ${profesionalFijo.apellido}`.trim() : '');
    const nombreServicio = esFlujoEval || servicio?.tipo === 'tratamiento'
        ? (interes ? `Evaluación — interés: ${interes}` : 'Evaluación médica')
        : (servicio?.nombre ?? `Reserva${profesionalFijo ? ` con ${profesionalFijo.titulo} ${profesionalFijo.nombre}` : ''}`);

    const payloadBase = () => ({
        token: tokenReserva,
        profesional: cand?.reservoId || slot?.profesionales?.[0] || '',
        tratamiento: svcReservo?.id ?? '',
        tratamiento_nombre: nombreServicio,
        fecha,
        horaInicio: slot?.horaInicio || '',
        horaFin: slot?.horaFin || '',
        name: datos.nombre.trim(),
        app_paterno: datos.apPaterno.trim(),
        app_materno: datos.apMaterno.trim(),
        rut: formatearRut(datos.rut),
        mail: datos.mail.trim(),
        phone: datos.phone.trim(),
        comentario: `Reserva online · ${nombreServicio}`,
    });

    const redirigirExito = (citaId: string | null) => {
        // Nada clínico ni identificante en la URL (el Meta Pixel envía la URL
        // completa a un tercero): servicio y profesional van por sessionStorage.
        try {
            sessionStorage.setItem('cialo_reserva', JSON.stringify({ tratamiento: nombreServicio, profesional: nombreProf, fecha, hora: slot?.horaInicio || '' }));
        } catch { /* noop */ }
        const q = new URLSearchParams({ status: 'success', id: citaId || '', fecha, hora: slot?.horaInicio || '' });
        window.location.href = `/confirmacion-cita?${q.toString()}`;
    };
    const post = async (path: string, body: object) => {
        const r = await fetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        const j = await r.json().catch(() => ({}));
        return { r, j };
    };
    /** El horario se perdió: devolver al calendario diciendo por qué. */
    const volverAHorario = (motivo: string) => {
        setSlot(null); horaElegida.current = '';
        setStatus('idle'); submitting.current = false;
        setPasoKey('horario'); setError(motivo);
    };
    const confirmar = async () => {
        if (submitting.current) return;
        if (!slot || !tokenReserva) {
            // Antes rebotaba al calendario en silencio y el paciente no entendía
            // por qué había perdido su hora.
            volverAHorario('Se perdió el horario seleccionado. Elígelo de nuevo, por favor.');
            return;
        }
        submitting.current = true; setStatus('loading'); setError('');
        const base = payloadBase();
        try {
            if (!esPagado) {
                const { r, j } = await post('/reservo/eval-gratis', base);
                // content_name genérico a propósito: el nombre del servicio es un
                // dato de salud y no debe llegar a Meta.
                if (j.ok) { trackLead({ source: 'reserva_online', content_name: 'reserva_online' }); redirigirExito(j.cita_id ?? null); return; }
                if (r.status === 409) {
                    // Un 409 ya no significa siempre "hay que pagar": el hueco pudo
                    // quedar tomado. Empujar a pagar en ese caso cobraba $20.000
                    // por un servicio gratuito que además ya no tenía cupo.
                    if (j.ocupado) {
                        volverAHorario('Ese horario acaba de ser tomado. Elige otro, por favor.');
                        return;
                    }
                    // Cualquier otro 409 significa "esto se paga". Se acepta
                    // también sin la bandera para no depender del orden de
                    // despliegue: contra la API antigua, que no la envía, el
                    // comportamiento sigue siendo el de siempre.
                    setForzarPago(true); setStatus('idle');
                    setError(`Este horario requiere un abono de ${fmtCLP(esFlujoEval ? EVAL_PRECIO : abonoMonto)}. Presiona “Pagar y agendar” para continuar.`);
                    submitting.current = false; return;
                }
                throw new Error(j.error || 'No pudimos agendar tu evaluación.');
            }
            await pagar({ ...base, eval: esFlujoEval });
        } catch (e) {
            setStatus('error'); setError((e as Error).message || 'Ocurrió un error. Intenta nuevamente.'); submitting.current = false;
        }
    };
    // Webpay exige un POST con el campo token_ws: navegar por GET a la url
    // deja la pasarela en blanco. Se envía un formulario, igual que el checkout.
    const irAWebpay = (url: string, token: string) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'token_ws';
        input.value = token;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
    };

    const pagar = async (body: object) => {
        const { r, j } = await post('/reservo/pago/init', body);
        if (j.url && j.token) {
            trackLead({ source: 'reserva_online', content_name: 'reserva_online', value: j.abono });
            irAWebpay(j.url, j.token); return;
        }
        if (r.status === 409 && j.free) {
            const { j: j2 } = await post('/reservo/eval-gratis', body);
            if (j2.ok) { trackLead({ source: 'reserva_online', content_name: 'reserva_online' }); redirigirExito(j2.cita_id ?? null); return; }
            throw new Error(j2.error || 'No pudimos agendar tu evaluación.');
        }
        if (r.status === 409 && j.ocupado) {
            volverAHorario('Ese horario acaba de ser tomado. Elige otro, por favor.');
            return;
        }
        if (r.status === 409 && j.no_verificado) {
            // El servidor no pudo confirmar el precio contra la agenda: se prefiere
            // no cobrar nada antes que cobrar un monto equivocado.
            setStatus('idle'); submitting.current = false;
            setError('No pudimos verificar el valor de este servicio. Espera unos segundos y vuelve a intentar.');
            return;
        }
        throw new Error(j.error || 'No pudimos iniciar el pago. Intenta con otro horario.');
    };

    // ── Fallbacks ──
    // Perfil/consulta no habilitados -> iframe de su agenda. Error de red -> iframe.
    if (profesionalFijo && agendables && !profFijoAgendable) {
        return <ReservoBooking agendaUrl={profesionalFijo.agendaUrl} title={`Agenda de ${profesionalFijo.titulo} ${profesionalFijo.nombre}`} loadDirectly />;
    }
    if (consultaFija && agendables && (agendables.agendas[tokenConsulta]?.length ?? 0) === 0) {
        return <ReservoBooking agendaUrl={consultaFija.agendaUrl} title={consultaFija.nombre} loadDirectly />;
    }
    if (agendablesError) {
        if (profesionalFijo) return <ReservoBooking agendaUrl={profesionalFijo.agendaUrl} title={`Agenda de ${profesionalFijo.titulo} ${profesionalFijo.nombre}`} loadDirectly />;
        if (consultaFija) return <ReservoBooking agendaUrl={consultaFija.agendaUrl} title={consultaFija.nombre} loadDirectly />;
        return <ReservoBooking agendaUrl={AGENDA_GLOBAL} title="Agenda Clínica CIALO" loadDirectly />;
    }
    if (!agendables) {
        return <div className="flex items-center justify-center p-12"><div className="h-7 w-7 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>;
    }
    if (generico && consultasDisponibles.length === 0 && !evalDisponible) {
        return <ReservoBooking agendaUrl={AGENDA_GLOBAL} title="Agenda Clínica CIALO" loadDirectly />;
    }

    const pagoCompleto = !!valorServicio && abonoMonto >= valorServicio;
    const instrucciones = [
        ...(!esPagado ? INSTR_GRATIS : pagoCompleto ? INSTR_TOTAL : INSTR_ABONO),
        ...INSTR_COMUNES,
    ];

    // Sin NINGUNA hora online en todo el horizonte (verificado contra reservo):
    // se ofrece agendar por WhatsApp con un aviso destacado.
    const sinHorasOnline = pasoKey === 'horario' && diasDisp !== null && diasDisp.size === 0;
    const wspAgendarUrl = `${WA}?text=${encodeURIComponent(`Hola! Quiero agendar ${servicio?.nombre ?? 'una hora'}${nombreProf ? ` con ${nombreProf}` : ''} y no encontré horas online. ¿Me pueden ayudar?`)}`;

    return (
        <div className="p-6 sm:p-8">
            {/* POPUP: esta agenda solo se coordina por WhatsApp (sin horas online) */}
            {sinHorasOnline && !avisoWspCerrado && (
                <div className="fixed inset-0 z-[95] flex items-center justify-center bg-ink/60 p-4" role="dialog" aria-modal="true" aria-label="Agenda por WhatsApp">
                    <div className="w-full max-w-sm rounded-3xl bg-white p-7 text-center shadow-2xl">
                        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                            <svg className="h-7 w-7 text-green-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </span>
                        <h3 className="mt-4 font-[family-name:var(--font-italiana)] text-2xl leading-tight text-ink">Esta agenda se coordina por WhatsApp</h3>
                        <p className="mt-2 text-sm leading-relaxed text-olive">
                            Por ahora no hay horas online disponibles{nombreProf ? <> para <strong className="text-ink">{nombreProf}</strong></> : null}. Escríbenos y te conseguimos una hora.
                        </p>
                        <a href={wspAgendarUrl} target="_blank" rel="noopener noreferrer"
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-green-700">
                            Agendar por WhatsApp
                        </a>
                        <button type="button" onClick={() => setAvisoWspCerrado(true)} className="mt-3 w-full text-xs font-semibold text-olive/60 hover:text-ink">
                            Ver el calendario igual
                        </button>
                    </div>
                </div>
            )}
            {/* Progreso */}
            <div className="mb-7">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">Paso {idx + 1} de {secuencia.length}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-olive/50">{NOMBRE_PASO[pasoKey]}</p>
                </div>
                <div className="flex gap-1.5">
                    {secuencia.map((_, i) => (<div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= idx ? 'bg-gold' : 'bg-sand'}`} />))}
                </div>
            </div>

            {/* PASO servicio — GENÉRICO: consultas + evaluación + tratamientos-interés */}
            {pasoKey === 'servicio' && generico && (
                <div>
                    <p className={labelCls}>¿Qué quieres agendar?</p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                        {evalDisponible && (
                            <button type="button" aria-pressed={servicio?.tipo === 'eval'} onClick={() => elegirServicio({ tipo: 'eval', nombre: 'Evaluación Estética Facial', token: TOKEN_NICOLAS, valorSitio: null })}
                                className={`rounded-2xl border p-4 text-left transition-all ${servicio?.tipo === 'eval' ? 'border-gold bg-gold/5' : 'border-sand bg-cream/40 hover:border-gold/40'}`}>
                                <span className="block text-sm font-semibold text-ink">Evaluación Estética Facial</span>
                                <span className="mt-0.5 block text-[11px] text-olive">Dr. Nicolás Laucirica · Medicina Estética</span>
                                <span className="mt-1.5 inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold text-green-700">Gratis en horarios seleccionados</span>
                            </button>
                        )}
                        {consultasDisponibles.map((c) => {
                            const sel = servicio?.tipo === 'consulta' && servicio.consulta?.id === c.id;
                            return (
                                <button key={c.id} type="button" aria-pressed={servicio?.tipo === 'consulta' && servicio.consulta?.id === c.id} onClick={() => elegirServicio({ tipo: 'consulta', nombre: c.nombre, token: tokenDe(c.agendaUrl), valorSitio: c.valor, consulta: c })}
                                    className={`rounded-2xl border p-4 text-left transition-all ${sel ? 'border-gold bg-gold/5' : 'border-sand bg-cream/40 hover:border-gold/40'}`}>
                                    <span className="block text-sm font-semibold text-ink">{c.nombre}</span>
                                    <span className="mt-0.5 block text-[11px] text-olive">{c.categoria} · {c.duracion}</span>
                                    <span className="mt-1.5 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold text-gold-dark">{c.valorTexto}</span>
                                </button>
                            );
                        })}
                    </div>

                    {evalDisponible && tratamientosInteres.length > 0 && (
                        <div className="mt-6">
                            <p className={labelCls}>¿Buscas un tratamiento estético? <span className="text-olive/50 normal-case tracking-normal font-normal">(se agenda una evaluación previa)</span></p>
                            <div className="flex max-h-44 flex-wrap gap-2 overflow-y-auto pr-1">
                                {tratamientosInteres.map((t) => {
                                    const sel = servicio?.tipo === 'tratamiento' && servicio.nombre === t.nombre;
                                    return (
                                        <button key={t.id} type="button" aria-pressed={sel} onClick={() => { elegirServicio({ tipo: 'tratamiento', nombre: t.nombre }); setInteres(t.nombre); }} className={chipCls(sel)}>
                                            {t.nombre}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* PASO servicio — PERFIL */}
            {pasoKey === 'servicio' && profesionalFijo && (
                esEvalFijo ? (
                    <div>
                        <p className={labelCls}>¿Qué te interesa? <span className="text-olive/50 normal-case tracking-normal font-normal">(opcional — lo definimos en tu evaluación)</span></p>
                        <div className="flex flex-wrap gap-2">
                            <button type="button" aria-pressed={!interes} onClick={() => { elegirServicio({ tipo: 'eval', nombre: 'Evaluación médica', token: tokenFijo, valorSitio: null }); setInteres(''); }} className={chipCls(!interes)}>
                                Aún no lo sé
                            </button>
                            {tratamientosData.filter((t) => profHaceTratamiento(t.profesional, profesionalFijo) && t.id !== 'test-mercado-pago').map((t) => (
                                <button key={t.id} type="button" aria-pressed={interes === t.nombre} onClick={() => { elegirServicio({ tipo: 'eval', nombre: 'Evaluación médica', token: tokenFijo, valorSitio: null }); setInteres(t.nombre); }} className={chipCls(interes === t.nombre)}>
                                    {t.nombre}
                                </button>
                            ))}
                        </div>
                        <p className="mt-5 rounded-xl bg-cream/60 px-4 py-3 text-xs leading-relaxed text-olive">
                            Agendas una <strong className="text-ink">evaluación médica</strong> con {nombreProf}. Ahí se define tu plan y el valor. La evaluación es <strong className="text-ink">gratuita</strong> en horarios seleccionados, o tiene un valor de <strong className="text-ink">{fmtCLP(EVAL_PRECIO)}</strong> que se descuenta del tratamiento.
                        </p>
                    </div>
                ) : (
                    <div>
                        <p className={labelCls}>¿Qué quieres agendar con {profesionalFijo.nombre}?</p>
                        {infoLoading && serviciosFijo.length === 0 ? (
                            <div className="flex items-center justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>
                        ) : serviciosFijo.length === 0 ? (
                            <p className="rounded-xl bg-cream/60 px-4 py-6 text-center text-xs text-olive/60">No pudimos cargar los servicios. Puedes continuar y coordinamos el detalle contigo.</p>
                        ) : (
                            <div className="grid gap-2.5 sm:grid-cols-2">
                                {serviciosFijo.map((s) => {
                                    const sel = servicio?.nombre === s.nombre;
                                    const v = valorDe(s.valor);
                                    return (
                                        <button key={s.id} type="button" aria-pressed={sel} onClick={() => elegirServicio({ tipo: 'consulta', nombre: s.nombre, token: tokenFijo, valorSitio: v || null })}
                                            className={`rounded-2xl border p-4 text-left transition-all ${sel ? 'border-gold bg-gold/5' : 'border-sand bg-cream/40 hover:border-gold/40'}`}>
                                            <span className="block text-sm font-semibold text-ink">{s.nombre}</span>
                                            <span className="mt-0.5 block text-[11px] text-olive">{durMinDe(s.duracion)} min</span>
                                            {v > 0 && <span className="mt-1.5 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[10px] font-bold text-gold-dark">{fmtCLP(v)}</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )
            )}

            {/* PASO profesional */}
            {pasoKey === 'profesional' && (
                <div>
                    <p className={labelCls}>¿Con quién quieres atenderte?</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                        {candidatos.map((c) => {
                            const sel = candElegido?.reservoId === c.reservoId && candElegido?.token === c.token;
                            return (
                                <button key={`${c.token}-${c.reservoId ?? 'any'}`} type="button" aria-pressed={sel} onClick={() => { setCandElegido(c); setFecha(''); setSlot(null); horaElegida.current = ''; setSemanaIdx(0); setAvisoWspCerrado(false); setError(''); }}
                                    className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${sel ? 'border-gold bg-gold/5' : 'border-sand bg-cream/40 hover:border-gold/40'}`}>
                                    {c.siteProf?.imagen ? (
                                        <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand">
                                            <Image src={c.siteProf.imagen} alt={c.nombre} fill sizes="56px" className="object-cover object-top" />
                                        </span>
                                    ) : (
                                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-sand text-lg text-olive" aria-hidden="true">
                                            {c.reservoId ? c.nombre.charAt(0) : '⚡'}
                                        </span>
                                    )}
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm font-semibold text-ink">{c.nombre}</span>
                                        {c.siteProf && <span className="block truncate text-xs text-olive">{c.siteProf.subtitulo.split('|')[0].trim()}</span>}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* PASO horario — vista semanal */}
            {pasoKey === 'horario' && (() => {
                const sem = semanas[Math.min(semanaIdx, semanas.length - 1)] ?? [];
                const semTieneDisp = !diasDisp || sem.some((d) => diasDisp.has(d.iso));
                const finSemana = sem.length ? sem[sem.length - 1].iso : '';
                // primer día disponible DESPUÉS de la semana visible (para el aviso)
                const proxDisp = diasDisp ? dias.find((d) => d.iso > finSemana && diasDisp.has(d.iso)) : undefined;
                const irADia = (iso: string) => {
                    const idx = semanas.findIndex((s) => s.some((d) => d.iso === iso));
                    if (idx >= 0) setSemanaIdx(idx);
                    elegirFecha(iso);
                };
                // sugerencia cuando el día elegido quedó sin horas (todo tomado)
                const proxTrasFecha = fecha && diasDisp ? dias.find((d) => d.iso > fecha && diasDisp.has(d.iso)) : undefined;
                return (
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <p className={`${labelCls} mb-0`}>Elige el día{cand?.siteProf ? ` con ${cand.siteProf.nombre}` : ''}</p>
                        {cargandoDias && <span className="text-[10px] text-olive/50 animate-pulse">buscando horas disponibles…</span>}
                    </div>
                    <div className="flex items-center gap-2">
                        <button type="button" aria-label="Semana anterior" onClick={() => setSemanaIdx((i) => Math.max(0, i - 1))} disabled={semanaIdx === 0}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand text-olive transition-colors hover:border-gold hover:text-ink disabled:opacity-30 disabled:hover:border-sand">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div className="grid flex-1 grid-cols-6 gap-1.5 sm:gap-2">
                            {sem.map((d) => {
                                // mientras carga la disponibilidad no se ofrece ningún día
                                const disp = !cargandoDias && (!diasDisp || diasDisp.has(d.iso));
                                return (
                                    <button key={d.iso} type="button" aria-pressed={fecha === d.iso} disabled={!disp} onClick={() => elegirFecha(d.iso)}
                                        className={`flex flex-col items-center rounded-xl border px-1 py-2.5 transition-all ${fecha === d.iso ? 'border-gold bg-gold/10 text-ink' : disp ? 'border-sand bg-cream/40 text-olive hover:border-gold/40' : 'cursor-not-allowed border-sand/50 bg-cream/20 text-olive/30'}`}>
                                        <span className="text-[10px] font-bold uppercase tracking-wider">{d.dia}</span>
                                        <span className="text-lg font-bold leading-none">{d.num}</span>
                                        <span className="text-[10px] uppercase">{d.mes}</span>
                                    </button>
                                );
                            })}
                            {/* rellenar la primera semana parcial para mantener la grilla */}
                            {sem.length < 6 && Array.from({ length: 6 - sem.length }).map((_, i) => <span key={i} />)}
                        </div>
                        <button type="button" aria-label="Semana siguiente" onClick={() => setSemanaIdx((i) => Math.min(semanas.length - 1, i + 1))} disabled={semanaIdx >= semanas.length - 1}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand text-olive transition-colors hover:border-gold hover:text-ink disabled:opacity-30 disabled:hover:border-sand">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>

                    {!semTieneDisp && (
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-cream/60 px-4 py-2.5">
                            <p className="text-xs text-olive">Sin horas disponibles esta semana.</p>
                            {proxDisp ? (
                                <button type="button" onClick={() => irADia(proxDisp.iso)} className="rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-ink">
                                    Próxima hora: {fmtFechaLegible(proxDisp.iso)} →
                                </button>
                            ) : (
                                <a href={WA} target="_blank" rel="noopener noreferrer" className="text-[11px] font-semibold text-gold-dark hover:underline">Consultar por WhatsApp</a>
                            )}
                        </div>
                    )}

                    <p className={`${labelCls} mt-6`}>Horarios disponibles</p>
                    {!fecha ? (
                        <p className="rounded-xl bg-cream/60 px-4 py-6 text-center text-xs text-olive/60">Selecciona un día para ver los horarios.</p>
                    ) : loadingSlots ? (
                        <div className="flex items-center justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" /></div>
                    ) : slotsError ? (
                        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-xs font-semibold text-red-600">{slotsError}</p>
                    ) : slots.length === 0 ? (
                        <div className="rounded-xl bg-cream/60 px-4 py-6 text-center text-xs text-olive/60">
                            <p>No hay horarios disponibles ese día.</p>
                            {proxTrasFecha && (
                                <button type="button" onClick={() => irADia(proxTrasFecha.iso)} className="mt-3 rounded-full bg-gold px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-ink">
                                    Ver {fmtFechaLegible(proxTrasFecha.iso)} →
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {slots.map((s, i) => {
                                const free = esFlujoEval && esFranjaGratis(fecha, s.horaInicio);
                                const sel = slot?.horaInicio === s.horaInicio;
                                return (
                                    <button key={i} type="button" aria-pressed={sel} onClick={() => elegirSlot(s)} className={`flex flex-col items-center rounded-xl border py-2.5 text-sm font-semibold transition-all ${sel ? 'border-gold bg-gold text-white shadow-sm' : 'border-sand bg-cream/40 text-ink hover:border-gold/50'}`}>
                                        {s.horaInicio}
                                        {esFlujoEval && (
                                            <span className={`mt-0.5 text-[9px] font-bold uppercase tracking-wide ${sel ? 'text-white/90' : free ? 'text-green-600' : 'text-olive/60'}`}>
                                                {free ? 'Gratis' : fmtCLP(EVAL_PRECIO)}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
                );
            })()}

            {/* PASO datos */}
            {pasoKey === 'datos' && (
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2"><label htmlFor="r-nombre" className={labelCls}>Nombre *</label><input id="r-nombre" type="text" value={datos.nombre} onChange={(e) => set('nombre', e.target.value)} className={inputCls} autoComplete="given-name" /></div>
                    <div><label htmlFor="r-appat" className={labelCls}>Apellido paterno *</label><input id="r-appat" type="text" value={datos.apPaterno} onChange={(e) => set('apPaterno', e.target.value)} className={inputCls} autoComplete="family-name" /></div>
                    <div><label htmlFor="r-apmat" className={labelCls}>Apellido materno</label><input id="r-apmat" type="text" value={datos.apMaterno} onChange={(e) => set('apMaterno', e.target.value)} className={inputCls} /></div>
                    <div><label htmlFor="r-rut" className={labelCls}>RUT *</label><input id="r-rut" type="text" value={datos.rut} onChange={(e) => set('rut', e.target.value)} placeholder="12.345.678-9" className={inputCls} /></div>
                    <div><label htmlFor="r-phone" className={labelCls}>Teléfono / WhatsApp *</label><input id="r-phone" type="tel" value={datos.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+56 9 1234 5678" className={inputCls} inputMode="tel" autoComplete="tel" /></div>
                    <div className="sm:col-span-2"><label htmlFor="r-mail" className={labelCls}>Email *</label><input id="r-mail" type="email" value={datos.mail} onChange={(e) => set('mail', e.target.value)} placeholder="tucorreo@ejemplo.cl" className={inputCls} inputMode="email" autoComplete="email" /></div>
                </div>
            )}

            {/* PASO confirmar */}
            {pasoKey === 'confirmar' && (
                <div>
                    <div className="rounded-2xl border border-sand bg-cream/40 p-5">
                        <div className="flex items-center justify-between gap-3 border-b border-sand pb-3">
                            <span className="font-[family-name:var(--font-italiana)] text-lg leading-tight text-ink">{esFlujoEval ? `Evaluación con ${nombreProf}` : servicio?.nombre}</span>
                            <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${esPagado ? 'bg-gold/15 text-gold-dark' : 'bg-green-100 text-green-700'}`}>
                                {!esPagado ? 'Gratis' : esFlujoEval || pagaTotal ? fmtCLP(abonoMonto) : `Abono ${fmtCLP(abonoMonto)}`}
                            </span>
                        </div>
                        <dl className="mt-3 space-y-1.5 text-sm">
                            {esFlujoEval && interes && (<div className="flex justify-between gap-4"><dt className="text-olive/70">Interés</dt><dd className="text-right font-medium text-ink">{interes}</dd></div>)}
                            {!esFlujoEval && nombreProf && (<div className="flex justify-between gap-4"><dt className="text-olive/70">Profesional</dt><dd className="text-right font-medium text-ink">{nombreProf}</dd></div>)}
                            <div className="flex justify-between gap-4"><dt className="text-olive/70">Día y hora</dt><dd className="text-right font-medium text-ink">{fmtFechaLegible(fecha)} · {slot?.horaInicio}</dd></div>
                            {!esFlujoEval && valorServicio && (<div className="flex justify-between gap-4"><dt className="text-olive/70">Valor del servicio</dt><dd className="text-right font-medium text-ink">{fmtCLP(valorServicio)}</dd></div>)}
                            <div className="flex justify-between gap-4"><dt className="text-olive/70">Paciente</dt><dd className="text-right font-medium text-ink">{datos.nombre} {datos.apPaterno}</dd></div>
                        </dl>
                        <p className="mt-3 text-xs leading-relaxed text-olive">
                            {!esPagado
                                ? (esFlujoEval ? 'Tu evaluación en este horario es sin costo. Confirma para agendarla.' : 'Este servicio es sin costo. Confirma para agendarlo.')
                                : esFlujoEval
                                    ? <>Pagarás un abono de <strong className="text-ink">{fmtCLP(EVAL_PRECIO)}</strong> por Webpay que <strong className="text-ink">se descuenta del valor del tratamiento</strong> si decides realizarlo.</>
                                    : pagoCompleto
                                        ? <>Pagarás el valor total de tu atención (<strong className="text-ink">{fmtCLP(abonoMonto)}</strong>) por Webpay. Sin pagos extra en la clínica.</>
                                        : <>Reservas pagando un abono de <strong className="text-ink">{fmtCLP(abonoMonto)}</strong> por Webpay{valorServicio ? <> — el resto (<strong className="text-ink">{fmtCLP(valorServicio - abonoMonto)}</strong>) se paga en la clínica</> : <>, que se descuenta del valor de tu atención</>}.</>}
                        </p>
                    </div>
                    <div className="mt-5 space-y-2.5">
                        {instrucciones.map((it, i) => (
                            <div key={i} className="flex items-start gap-3 rounded-xl bg-cream/50 px-4 py-2.5">
                                <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d={it.icon} /></svg>
                                <p className="text-xs leading-relaxed text-olive">{it.texto}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">{error}</p>}

            {/* Navegación */}
            <div className="mt-7 flex items-center justify-between gap-3">
                {idx > 0 ? (
                    <button type="button" onClick={retroceder} disabled={status === 'loading'} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-olive transition-colors hover:border-ink hover:text-ink disabled:opacity-50">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>Atrás
                    </button>
                ) : <span />}
                {pasoKey !== 'confirmar' ? (
                    <button type="button" onClick={avanzar} className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-ink">
                        Continuar<svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                    </button>
                ) : (
                    <button type="button" onClick={confirmar} disabled={status === 'loading'} className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60">
                        {status === 'loading' ? 'Procesando…' : !esPagado ? 'Confirmar evaluación' : esFlujoEval ? `Pagar ${fmtCLP(EVAL_PRECIO)} y agendar` : `Pagar ${fmtCLP(abonoMonto)} y reservar`}
                    </button>
                )}
            </div>

            <p className="mt-5 text-center text-[11px] text-olive/60">
                ¿Prefieres ayuda personal? <a href={WA} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-dark hover:underline">Agenda por WhatsApp</a>
            </p>
        </div>
    );
}
