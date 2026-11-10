'use client';

import { useEffect, useState } from 'react';
import { trackLead } from '@/lib/fbpixel';

const PROFESIONES = [
    'Médico/a',
    'Enfermero/a',
    'Matrón/a',
    'Odontólogo/a',
    'Cosmetólogo/a',
    'TENS',
    'Estudiante',
    'Otra',
];

const EXPERIENCIA = [
    { id: 'trabajo', label: 'Ya trabajo con láser' },
    { id: 'incorporar', label: 'Quiero incorporarlo a mi práctica' },
    { id: 'academico', label: 'Interés académico' },
];

const INTERESES = [
    'Láser CO₂ fraccionado',
    'Cicatrices y resurfacing',
    'Rejuvenecimiento facial',
    'Manejo de complicaciones',
    'Rentabilidad del equipo',
    'Próximos cursos y certificaciones',
];

const PASOS = ['Tus datos', 'Perfil profesional', 'Intereses'];

export default function AcademyForm() {
    const [paso, setPaso] = useState(0);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [error, setError] = useState('');
    const [utmSource, setUtmSource] = useState('academy');

    const [datos, setDatos] = useState({
        nombre: '',
        email: '',
        telefono: '',
        profesion: '',
        ciudad: '',
        centro: '',
        experiencia: '',
        intereses: [] as string[],
        comentario: '',
    });

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const utm = params.get('utm_source');
        if (utm) setUtmSource(utm);
    }, []);

    const set = (campo: string, valor: string) => {
        setDatos(prev => ({ ...prev, [campo]: valor }));
        setError('');
    };

    const toggleInteres = (interes: string) => {
        setDatos(prev => ({
            ...prev,
            intereses: prev.intereses.includes(interes)
                ? prev.intereses.filter(i => i !== interes)
                : [...prev.intereses, interes],
        }));
        setError('');
    };

    const validarPaso = (): boolean => {
        if (paso === 0) {
            if (datos.nombre.trim().length < 3) { setError('Ingresa tu nombre completo'); return false; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) { setError('Ingresa un email válido'); return false; }
            if (datos.telefono.trim().replace(/\D/g, '').length < 8) { setError('Ingresa un teléfono válido'); return false; }
        }
        if (paso === 1) {
            if (!datos.profesion) { setError('Selecciona tu profesión'); return false; }
            if (datos.ciudad.trim().length < 2) { setError('Ingresa tu ciudad'); return false; }
        }
        if (paso === 2) {
            if (!datos.experiencia) { setError('Cuéntanos tu experiencia con láser'); return false; }
        }
        return true;
    };

    const avanzar = () => {
        if (!validarPaso()) return;
        setPaso(p => Math.min(p + 1, 2));
    };

    const retroceder = () => {
        setError('');
        setPaso(p => Math.max(p - 1, 0));
    };

    const enviar = async () => {
        if (!validarPaso()) return;
        setStatus('loading');
        setError('');

        const experienciaLabel = EXPERIENCIA.find(e => e.id === datos.experiencia)?.label ?? '';
        const mensaje = [
            `Profesión: ${datos.profesion}`,
            `Ciudad: ${datos.ciudad.trim()}`,
            datos.centro.trim() ? `Centro / clínica: ${datos.centro.trim()}` : null,
            `Experiencia con láser: ${experienciaLabel}`,
            datos.intereses.length ? `Intereses: ${datos.intereses.join(', ')}` : null,
            datos.comentario.trim() ? `Comentario: ${datos.comentario.trim()}` : null,
        ].filter(Boolean).join('\n');

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';
            const response = await fetch(`${apiUrl}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: datos.nombre.trim(),
                    email: datos.email.trim(),
                    phone: datos.telefono.trim(),
                    subject: 'CIALO Academy — Masterclass Láser CO₂ (Concepción)',
                    message: mensaje,
                    utm_source: utmSource,
                }),
            });
            const data = await response.json();
            if (data.success) {
                trackLead({ source: 'cialo_academy', content_name: 'Masterclass Láser CO₂ Concepción' });
                setStatus('success');
            } else {
                setStatus('error');
                setError(data.message || 'No pudimos registrar tus datos. Intenta nuevamente.');
            }
        } catch {
            setStatus('error');
            setError('Error de conexión. Revisa tu internet e intenta nuevamente.');
        }
    };

    const inputCls =
        'w-full rounded-xl border border-sand bg-cream/50 px-4 py-3 text-sm text-ink placeholder:text-olive/40 outline-none transition-colors focus:border-gold focus:bg-white';
    const labelCls = 'mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-olive';

    /* ── SUCCESS ── */
    if (status === 'success') {
        return (
            <div className="rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-ink/5 sm:p-12">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                    <svg className="h-8 w-8 text-gold" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="font-[family-name:var(--font-italiana)] text-3xl text-ink">
                    ¡Gracias, {datos.nombre.trim().split(' ')[0]}!
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-olive">
                    Quedaste registrado/a en CIALO Academy. Te enviaremos el material de la clase
                    y te avisaremos de los próximos entrenamientos.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a
                        href="https://wa.me/56951302863?text=Hola%2C%20asist%C3%AD%20a%20la%20Masterclass%20de%20L%C3%A1ser%20CO2%20y%20quiero%20m%C3%A1s%20informaci%C3%B3n."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-ink"
                    >
                        Hablar por WhatsApp
                    </a>
                    <a
                        href="https://www.instagram.com/dr.nicolaslaucirica/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-ink transition-colors hover:border-gold hover:text-gold"
                    >
                        Seguir en Instagram
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-ink/5 sm:p-9">
            {/* Progreso */}
            <div className="mb-7">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">
                        Paso {paso + 1} de {PASOS.length}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-olive/50">
                        {PASOS[paso]}
                    </p>
                </div>
                <div className="flex gap-1.5">
                    {PASOS.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                                i <= paso ? 'bg-gold' : 'bg-sand'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* ── PASO 1: datos ── */}
            {paso === 0 && (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="ac-nombre" className={labelCls}>Nombre completo *</label>
                        <input
                            id="ac-nombre"
                            type="text"
                            value={datos.nombre}
                            onChange={e => set('nombre', e.target.value)}
                            placeholder="Ej: María Fernanda Soto"
                            className={inputCls}
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <label htmlFor="ac-email" className={labelCls}>Email *</label>
                        <input
                            id="ac-email"
                            type="email"
                            value={datos.email}
                            onChange={e => set('email', e.target.value)}
                            placeholder="tucorreo@ejemplo.cl"
                            className={inputCls}
                            autoComplete="email"
                            inputMode="email"
                        />
                    </div>
                    <div>
                        <label htmlFor="ac-fono" className={labelCls}>Teléfono / WhatsApp *</label>
                        <input
                            id="ac-fono"
                            type="tel"
                            value={datos.telefono}
                            onChange={e => set('telefono', e.target.value)}
                            placeholder="+56 9 1234 5678"
                            className={inputCls}
                            autoComplete="tel"
                            inputMode="tel"
                        />
                    </div>
                </div>
            )}

            {/* ── PASO 2: perfil ── */}
            {paso === 1 && (
                <div className="space-y-5">
                    <div>
                        <p className={labelCls}>Profesión *</p>
                        <div className="flex flex-wrap gap-2">
                            {PROFESIONES.map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => set('profesion', p)}
                                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                                        datos.profesion === p
                                            ? 'bg-gold text-white shadow-sm'
                                            : 'bg-cream text-olive hover:bg-sand hover:text-ink'
                                    }`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ac-ciudad" className={labelCls}>Ciudad *</label>
                        <input
                            id="ac-ciudad"
                            type="text"
                            value={datos.ciudad}
                            onChange={e => set('ciudad', e.target.value)}
                            placeholder="Ej: Concepción"
                            className={inputCls}
                        />
                    </div>
                    <div>
                        <label htmlFor="ac-centro" className={labelCls}>Centro / clínica donde trabajas (opcional)</label>
                        <input
                            id="ac-centro"
                            type="text"
                            value={datos.centro}
                            onChange={e => set('centro', e.target.value)}
                            placeholder="Nombre de tu centro o consulta"
                            className={inputCls}
                        />
                    </div>
                </div>
            )}

            {/* ── PASO 3: intereses ── */}
            {paso === 2 && (
                <div className="space-y-5">
                    <div>
                        <p className={labelCls}>Tu experiencia con láser *</p>
                        <div className="space-y-2">
                            {EXPERIENCIA.map(e => (
                                <button
                                    key={e.id}
                                    type="button"
                                    onClick={() => set('experiencia', e.id)}
                                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 ${
                                        datos.experiencia === e.id
                                            ? 'border-gold bg-gold/5 text-ink'
                                            : 'border-sand bg-cream/50 text-olive hover:border-gold/40'
                                    }`}
                                >
                                    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                                        datos.experiencia === e.id ? 'border-gold' : 'border-sand'
                                    }`}>
                                        {datos.experiencia === e.id && <span className="h-2 w-2 rounded-full bg-gold" />}
                                    </span>
                                    {e.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className={labelCls}>¿Qué te interesa? (opcional)</p>
                        <div className="flex flex-wrap gap-2">
                            {INTERESES.map(i => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => toggleInteres(i)}
                                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                                        datos.intereses.includes(i)
                                            ? 'bg-ink text-white shadow-sm'
                                            : 'bg-cream text-olive hover:bg-sand hover:text-ink'
                                    }`}
                                >
                                    {i}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="ac-comentario" className={labelCls}>Comentario (opcional)</label>
                        <textarea
                            id="ac-comentario"
                            value={datos.comentario}
                            onChange={e => set('comentario', e.target.value)}
                            placeholder="¿Algo más que quieras contarnos?"
                            rows={3}
                            className={`${inputCls} resize-none`}
                        />
                    </div>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600">
                    {error}
                </p>
            )}

            {/* Navegación */}
            <div className="mt-7 flex items-center justify-between gap-3">
                {paso > 0 ? (
                    <button
                        type="button"
                        onClick={retroceder}
                        className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-olive transition-colors hover:border-ink hover:text-ink"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Atrás
                    </button>
                ) : <span />}

                {paso < 2 ? (
                    <button
                        type="button"
                        onClick={avanzar}
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-ink"
                    >
                        Continuar
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={enviar}
                        disabled={status === 'loading'}
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {status === 'loading' ? 'Enviando…' : 'Completar registro'}
                        {status !== 'loading' && (
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
