'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

type Estado = 'nuevo' | 'respondido' | 'cerrado';

interface Contacto {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string | null;
    estado: Estado;
    utm_source: string | null;
    referrer: string | null;
    created_at: string;
    responded_at: string | null;
}

const ESTADO_META: Record<Estado, { label: string; badge: string; dot: string }> = {
    nuevo: { label: 'Nuevo', badge: 'bg-amber-100 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
    respondido: { label: 'Respondido', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' },
    cerrado: { label: 'Cerrado', badge: 'bg-gray-100 text-gray-600 border-gray-200', dot: 'bg-gray-400' },
};

const FILTROS: { id: 'todos' | Estado; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'nuevo', label: 'Nuevos' },
    { id: 'respondido', label: 'Respondidos' },
    { id: 'cerrado', label: 'Cerrados' },
];

function fmtFecha(iso: string): string {
    // El backend entrega 'YYYY-MM-DD HH:MM:SS'. Lo mostramos legible sin depender de zona horaria.
    const m = iso?.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/);
    if (!m) return iso ?? '';
    const [, y, mo, d, h, mi] = m;
    return `${d}/${mo}/${y} · ${h}:${mi}`;
}

function waLink(phone: string): string {
    const digits = phone.replace(/\D/g, '');
    const normalized = digits.startsWith('56') ? digits : `56${digits}`;
    return `https://wa.me/${normalized}`;
}

export default function ContactosPage() {
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filtro, setFiltro] = useState<'todos' | Estado>('todos');
    const [busqueda, setBusqueda] = useState('');
    const [actualizando, setActualizando] = useState<string | null>(null);
    const [descargando, setDescargando] = useState<string | null>(null);

    const fetchContactos = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/contacts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) {
                localStorage.removeItem('adminToken');
                localStorage.removeItem('adminSession');
                window.location.href = '/admin/login';
                return;
            }
            const data = await res.json();
            if (data.success) {
                setContactos(data.data as Contacto[]);
            } else {
                setError(data.message || 'No se pudieron cargar los contactos');
            }
        } catch {
            setError('Error de conexión con la API');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContactos();
    }, [fetchContactos]);

    const cambiarEstado = async (id: string, estado: Estado) => {
        setActualizando(id);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado }),
            });
            const data = await res.json();
            if (data.success) {
                setContactos((prev) =>
                    prev.map((c) => (c.id === id ? { ...c, estado } : c))
                );
            } else {
                setError(data.message || 'No se pudo actualizar el estado');
            }
        } catch {
            setError('Error de conexión al actualizar');
        } finally {
            setActualizando(null);
        }
    };

    const descargarCv = async (id: string, nombre: string) => {
        setDescargando(id);
        setError('');
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/careers/cv/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) {
                setError(res.status === 404 ? 'Esta postulación no tiene CV adjunto.' : 'No se pudo descargar el CV.');
                return;
            }
            const blob = await res.blob();
            const cd = res.headers.get('Content-Disposition') || '';
            const m = cd.match(/filename="?([^"]+)"?/);
            const fname = m ? m[1] : `CV-${nombre.replace(/\s+/g, '_')}`;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fname;
            a.click();
            URL.revokeObjectURL(url);
        } catch {
            setError('Error de conexión al descargar el CV.');
        } finally {
            setDescargando(null);
        }
    };

    const conteos = useMemo(() => {
        const base = { todos: contactos.length, nuevo: 0, respondido: 0, cerrado: 0 };
        for (const c of contactos) base[c.estado]++;
        return base;
    }, [contactos]);

    const filtrados = useMemo(() => {
        const q = busqueda.trim().toLowerCase();
        return contactos.filter((c) => {
            if (filtro !== 'todos' && c.estado !== filtro) return false;
            if (!q) return true;
            return (
                c.name?.toLowerCase().includes(q) ||
                c.email?.toLowerCase().includes(q) ||
                c.phone?.toLowerCase().includes(q) ||
                c.subject?.toLowerCase().includes(q) ||
                c.message?.toLowerCase().includes(q)
            );
        });
    }, [contactos, filtro, busqueda]);

    const esAcademy = (c: Contacto) => (c.subject || '').toLowerCase().includes('academy');

    return (
        <div>
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl text-[#1b1a18]">Contactos</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Leads recibidos desde los formularios del sitio (contacto, cotizaciones y CIALO Academy).
                    </p>
                </div>
                <button
                    onClick={fetchContactos}
                    disabled={loading}
                    className="inline-flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-[#b8935f] hover:text-[#b8935f] disabled:opacity-50 sm:self-auto"
                >
                    <svg className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Actualizar
                </button>
            </div>

            {/* Filtros + búsqueda */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                    {FILTROS.map((f) => {
                        const activo = filtro === f.id;
                        return (
                            <button
                                key={f.id}
                                onClick={() => setFiltro(f.id)}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                                    activo
                                        ? 'bg-[#1b1a18] text-white shadow-sm'
                                        : 'bg-white text-gray-500 ring-1 ring-gray-200 hover:text-[#1b1a18]'
                                }`}
                            >
                                {f.label}
                                <span className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${activo ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>
                                    {conteos[f.id]}
                                </span>
                            </button>
                        );
                    })}
                </div>
                <div className="relative sm:w-72">
                    <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar nombre, email, teléfono…"
                        className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#b8935f]"
                    />
                </div>
            </div>

            {error && (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {error}
                </div>
            )}

            {/* Lista */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#b8935f] border-t-transparent" />
                </div>
            ) : filtrados.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">
                    <svg className="mx-auto mb-3 h-10 w-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">
                        {contactos.length === 0 ? 'Aún no hay contactos registrados.' : 'No hay contactos que coincidan con el filtro.'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtrados.map((c) => {
                        const meta = ESTADO_META[c.estado];
                        return (
                            <div
                                key={c.id}
                                className={`rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
                                    esAcademy(c) ? 'border-[#b8935f]/40 ring-1 ring-[#b8935f]/20' : 'border-gray-100'
                                }`}
                            >
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                    {/* Datos */}
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex flex-wrap items-center gap-2">
                                            <h3 className="font-semibold text-[#1b1a18]">{c.name}</h3>
                                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${meta.badge}`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                                                {meta.label}
                                            </span>
                                            {esAcademy(c) && (
                                                <span className="rounded-full bg-[#1b1a18] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#d4c1a0]">
                                                    Academy
                                                </span>
                                            )}
                                            {c.utm_source === 'trabaja-con-nosotros' && (
                                                <span className="rounded-full bg-[#8a6d3b] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                                                    Postulación
                                                </span>
                                            )}
                                            {c.utm_source && (
                                                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-500">
                                                    {c.utm_source}
                                                </span>
                                            )}
                                        </div>

                                        {c.subject && (
                                            <p className="mb-2 text-sm font-medium text-gray-700">{c.subject}</p>
                                        )}

                                        <div className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-600">
                                            <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 hover:text-[#b8935f]">
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {c.email}
                                            </a>
                                            {c.phone && (
                                                <a href={waLink(c.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-600">
                                                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                    </svg>
                                                    {c.phone}
                                                </a>
                                            )}
                                            <span className="inline-flex items-center gap-1.5 text-gray-400">
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {fmtFecha(c.created_at)}
                                            </span>
                                        </div>

                                        {c.message && (
                                            <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-700">
                                                <p className="whitespace-pre-wrap">{c.message}</p>
                                            </div>
                                        )}

                                        {c.utm_source === 'trabaja-con-nosotros' && (
                                            <button
                                                onClick={() => descargarCv(c.id, c.name)}
                                                disabled={descargando === c.id}
                                                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[#b8935f]/40 bg-[#b8935f]/10 px-4 py-2 text-xs font-semibold text-[#8a6d3b] transition-colors hover:bg-[#b8935f]/20 disabled:opacity-50"
                                            >
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                {descargando === c.id ? 'Descargando…' : 'Descargar CV'}
                                            </button>
                                        )}
                                    </div>

                                    {/* Acciones */}
                                    <div className="flex shrink-0 flex-row gap-2 lg:flex-col">
                                        {c.estado !== 'respondido' && (
                                            <button
                                                onClick={() => cambiarEstado(c.id, 'respondido')}
                                                disabled={actualizando === c.id}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 disabled:opacity-50"
                                            >
                                                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                Respondido
                                            </button>
                                        )}
                                        {c.estado !== 'cerrado' && (
                                            <button
                                                onClick={() => cambiarEstado(c.id, 'cerrado')}
                                                disabled={actualizando === c.id}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 disabled:opacity-50"
                                            >
                                                Cerrar
                                            </button>
                                        )}
                                        {c.estado !== 'nuevo' && (
                                            <button
                                                onClick={() => cambiarEstado(c.id, 'nuevo')}
                                                disabled={actualizando === c.id}
                                                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 transition-colors hover:bg-amber-100 disabled:opacity-50"
                                            >
                                                Reabrir
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
