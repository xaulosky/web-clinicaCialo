'use client';

import { useRef, useState } from 'react';
import { trackLead } from '@/lib/fbpixel';

const EXPERIENCIA = [
    'Sin experiencia / recién egresado',
    '1 a 3 años',
    '3 a 5 años',
    '5 a 10 años',
    'Más de 10 años',
];

const MAX_MB = 4;
const ACCEPT = ['.pdf', '.doc', '.docx'];

function readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(new Error('read error'));
        r.readAsDataURL(file);
    });
}

export default function TrabajaForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');
    const [cv, setCv] = useState<File | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        telefono: '',
        titulo: '',
        especialidad: '',
        experiencia: '',
        mensaje: '',
    });

    const set = (k: string, v: string) => {
        setDatos((p) => ({ ...p, [k]: v }));
        setError('');
    };

    const onPickFile = (f: File | null) => {
        setError('');
        if (!f) { setCv(null); return; }
        const ext = '.' + (f.name.split('.').pop() || '').toLowerCase();
        if (!ACCEPT.includes(ext)) { setError('El CV debe ser PDF, DOC o DOCX.'); return; }
        if (f.size > MAX_MB * 1024 * 1024) { setError(`El CV supera los ${MAX_MB} MB.`); return; }
        setCv(f);
    };

    const validar = (): boolean => {
        if (datos.nombre.trim().length < 3) { setError('Ingresa tu nombre completo.'); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) { setError('Ingresa un email válido.'); return false; }
        if (datos.telefono.trim().replace(/\D/g, '').length < 8) { setError('Ingresa un teléfono válido.'); return false; }
        if (!datos.titulo.trim()) { setError('Indica tu título o profesión.'); return false; }
        if (!datos.especialidad.trim()) { setError('Indica tu especialidad o área.'); return false; }
        if (!cv) { setError('Adjunta tu CV (PDF, DOC o DOCX).'); return false; }
        return true;
    };

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validar()) return;
        setStatus('loading');
        setError('');
        try {
            const dataUrl = cv ? await readAsDataURL(cv) : null;
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';
            const res = await fetch(`${apiUrl}/careers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: datos.nombre.trim(),
                    email: datos.email.trim(),
                    telefono: datos.telefono.trim(),
                    titulo: datos.titulo.trim(),
                    especialidad: datos.especialidad.trim(),
                    experiencia: datos.experiencia,
                    mensaje: datos.mensaje.trim(),
                    cv: cv && dataUrl ? { filename: cv.name, mime: cv.type || 'application/octet-stream', data: dataUrl } : null,
                }),
            });
            const j = await res.json();
            if (j.success) {
                trackLead({ source: 'trabaja_con_nosotros', content_name: datos.especialidad.trim() });
                setStatus('success');
            } else {
                setStatus('error');
                setError(j.message || 'No pudimos enviar tu postulación. Intenta nuevamente.');
            }
        } catch {
            setStatus('error');
            setError('Error de conexión. Revisa tu internet e intenta nuevamente.');
        }
    };

    const inputCls =
        'w-full rounded-xl border border-sand bg-cream/40 px-4 py-3 text-sm text-ink placeholder:text-olive/40 outline-none transition-colors focus:border-gold focus:bg-white';
    const labelCls = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-olive';

    if (status === 'success') {
        return (
            <div className="rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-ink/5 sm:p-12">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                    <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink">
                    ¡Gracias por postular, {datos.nombre.trim().split(' ')[0]}!
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-olive">
                    Recibimos tu postulación y tu CV. Nuestro equipo revisará tu perfil y te contactará si calza con una búsqueda vigente.
                </p>
                <a
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-ink"
                >
                    Volver al inicio
                </a>
            </div>
        );
    }

    return (
        <form onSubmit={enviar} className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-ink/5 sm:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                    <label htmlFor="tn-nombre" className={labelCls}>Nombre completo *</label>
                    <input id="tn-nombre" type="text" value={datos.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej: María Fernanda Soto" className={inputCls} autoComplete="name" />
                </div>
                <div>
                    <label htmlFor="tn-email" className={labelCls}>Email *</label>
                    <input id="tn-email" type="email" value={datos.email} onChange={(e) => set('email', e.target.value)} placeholder="tucorreo@ejemplo.cl" className={inputCls} autoComplete="email" inputMode="email" />
                </div>
                <div>
                    <label htmlFor="tn-fono" className={labelCls}>Teléfono / WhatsApp *</label>
                    <input id="tn-fono" type="tel" value={datos.telefono} onChange={(e) => set('telefono', e.target.value)} placeholder="+56 9 1234 5678" className={inputCls} autoComplete="tel" inputMode="tel" />
                </div>
                <div>
                    <label htmlFor="tn-titulo" className={labelCls}>Título / Profesión *</label>
                    <input id="tn-titulo" type="text" value={datos.titulo} onChange={(e) => set('titulo', e.target.value)} placeholder="Ej: Médico Cirujano, Matrona, TENS" className={inputCls} />
                </div>
                <div>
                    <label htmlFor="tn-especialidad" className={labelCls}>Especialidad / Área *</label>
                    <input id="tn-especialidad" type="text" value={datos.especialidad} onChange={(e) => set('especialidad', e.target.value)} placeholder="Ej: Medicina Estética, Nutrición" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="tn-exp" className={labelCls}>Años de experiencia</label>
                    <select id="tn-exp" value={datos.experiencia} onChange={(e) => set('experiencia', e.target.value)} className={`${inputCls} appearance-none`}>
                        <option value="">Selecciona…</option>
                        {EXPERIENCIA.map((x) => <option key={x} value={x}>{x}</option>)}
                    </select>
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="tn-msg" className={labelCls}>Carta de presentación (opcional)</label>
                    <textarea id="tn-msg" value={datos.mensaje} onChange={(e) => set('mensaje', e.target.value)} rows={4} placeholder="Cuéntanos brevemente por qué quieres unirte al equipo." className={`${inputCls} resize-none`} />
                </div>

                {/* CV */}
                <div className="sm:col-span-2">
                    <label className={labelCls}>Currículum (CV) — PDF, DOC o DOCX, máx. {MAX_MB} MB *</label>
                    <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                    />
                    {!cv ? (
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-sand bg-cream/40 px-4 py-8 text-center transition-colors hover:border-gold hover:bg-gold/5"
                        >
                            <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm font-semibold text-ink">Haz clic para adjuntar tu CV</span>
                            <span className="text-xs text-olive/60">PDF, DOC o DOCX · hasta {MAX_MB} MB</span>
                        </button>
                    ) : (
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-gold/40 bg-gold/5 px-4 py-3">
                            <div className="flex min-w-0 items-center gap-3">
                                <svg className="h-6 w-6 shrink-0 text-gold-dark" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-ink">{cv.name}</p>
                                    <p className="text-xs text-olive/60">{(cv.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => { setCv(null); if (fileRef.current) fileRef.current.value = ''; }} className="shrink-0 rounded-full p-1.5 text-olive/60 transition-colors hover:bg-ink/5 hover:text-ink" aria-label="Quitar CV">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">{error}</p>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === 'loading' ? 'Enviando postulación…' : 'Enviar postulación'}
            </button>
            <p className="mt-3 text-center text-[11px] text-olive/50">
                Tus datos se usan solo para procesos de selección de Clínica CIALO. No los compartimos con terceros.
            </p>
        </form>
    );
}
