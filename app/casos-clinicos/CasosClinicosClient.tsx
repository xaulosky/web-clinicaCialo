'use client';

import { useState } from 'react';
import Link from 'next/link';

const categorias = [
    {
        id: "relleno-ojeras",
        titulo: "Relleno de Ojeras",
        subtitulo: "Ácido Hialurónico Periocular",
        href: "/relleno-ojeras-los-angeles",
        casos: [
            { src: "/resultados/relleno-ojeras/1.webp", alt: "Relleno ojeras — antes y después" },
            { src: "/resultados/relleno-ojeras/2.webp", alt: "Relleno ojeras — resultado frontal" },
            { src: "/resultados/relleno-ojeras/3.webp", alt: "Relleno ojeras — vista lateral" },
            { src: "/resultados/relleno-ojeras/4.webp", alt: "Relleno ojeras — perfil" },
            { src: "/resultados/relleno-ojeras/5.webp", alt: "Relleno ojeras — resultado femenino" },
            { src: "/resultados/relleno-ojeras/6.webp", alt: "Relleno ojeras — lateral" },
        ],
    },
    {
        id: "fosa-temporal",
        titulo: "Fosa Temporal",
        subtitulo: "Ácido Hialurónico — Rejuvenecimiento Facial",
        href: "/tratamientos/relleno-ah-pena",
        casos: [
            { src: "/resultados/fosa-temporal/1.webp", alt: "Relleno fosa temporal — antes y después" },
        ],
    },
    {
        id: "angulo-mandibular",
        titulo: "Ángulo Mandibular",
        subtitulo: "Definición con Ácido Hialurónico",
        href: "/tratamientos/relleno-ah-pena",
        casos: [
            { src: "/resultados/angulo-mandibular/1.webp", alt: "Definición ángulo mandibular — antes y después" },
        ],
    },
    {
        id: "menton",
        titulo: "Relleno de Mentón",
        subtitulo: "Ácido Hialurónico — Perfilado Facial",
        href: "/tratamientos/relleno-ah-pena",
        casos: [
            { src: "/resultados/menton/1.webp", alt: "Relleno de mentón — antes y después" },
            { src: "/resultados/menton/2.webp", alt: "Relleno de mentón — resultado lateral" },
            { src: "/resultados/menton/3.webp", alt: "Relleno de mentón — caso clínico" },
        ],
    },
    {
        id: "bichectomia",
        titulo: "Bichectomía",
        subtitulo: "Reducción de Bolas de Bichat — Perfilado Facial",
        href: "/tratamientos",
        casos: [
            { src: "/resultados/bichectomia/1.webp", alt: "Bichectomía — antes y después" },
            { src: "/resultados/bichectomia/2.webp", alt: "Bichectomía — resultado lateral" },
            { src: "/resultados/bichectomia/3.webp", alt: "Bichectomía — caso clínico" },
            { src: "/resultados/bichectomia/4.webp", alt: "Bichectomía — resultado frontal" },
            { src: "/resultados/bichectomia/5.webp", alt: "Bichectomía — resultado final" },
        ],
    },
    {
        id: "relleno-labial",
        titulo: "Relleno Labial",
        subtitulo: "Ácido Hialurónico — Voluminización y Definición",
        href: "/tratamientos/labios-ah",
        casos: [
            { src: "/resultados/relleno-labial/1.webp", alt: "Relleno labial — antes y después" },
            { src: "/resultados/relleno-labial/2.webp", alt: "Relleno labial — resultado" },
            { src: "/resultados/relleno-labial/3.webp", alt: "Relleno labial — caso clínico" },
            { src: "/resultados/relleno-labial/4.webp", alt: "Relleno labial — voluminización" },
            { src: "/resultados/relleno-labial/5.webp", alt: "Relleno labial — resultado natural" },
            { src: "/resultados/relleno-labial/6.webp", alt: "Relleno labial — definición" },
            { src: "/resultados/relleno-labial/7.webp", alt: "Relleno labial — antes y después" },
        ],
    },
    {
        id: "rinomodelacion",
        titulo: "Rinomodelación",
        subtitulo: "Remodelación Nasal con Ácido Hialurónico",
        href: "/tratamientos/rinomodelacion",
        casos: [
            { src: "/resultados/rinomodelacion/1.webp", alt: "Rinomodelación — antes y después" },
            { src: "/resultados/rinomodelacion/2.webp", alt: "Rinomodelación — resultado lateral" },
            { src: "/resultados/rinomodelacion/3.webp", alt: "Rinomodelación — caso clínico" },
            { src: "/resultados/rinomodelacion/4.webp", alt: "Rinomodelación — perfil" },
            { src: "/resultados/rinomodelacion/5.webp", alt: "Rinomodelación — resultado" },
            { src: "/resultados/rinomodelacion/6.webp", alt: "Rinomodelación — resultado final" },
        ],
    },
    {
        id: "sonrisa-gingival",
        titulo: "Sonrisa Gingival",
        subtitulo: "Corrección con Toxina Botulínica",
        href: "/tratamientos/toxina-terapeutica",
        casos: [
            { src: "/resultados/sonrisa-gingival/1.webp", alt: "Corrección sonrisa gingival con botox — antes y después" },
        ],
    },
    {
        id: "gluteos",
        titulo: "Relleno de Glúteos",
        subtitulo: "Ácido Hialurónico Corporal",
        href: "/tratamientos/ah-gluteo",
        casos: [
            { src: "/resultados/gluteos/1.webp", alt: "Relleno de glúteos con AH — antes y después" },
        ],
    },
    {
        id: "reductivos",
        titulo: "Tratamientos Reductivos",
        subtitulo: "Reducción Corporal — Tecnología Avanzada",
        href: "/tratamientos",
        casos: [
            { src: "/resultados/reductivos/1.webp", alt: "Tratamiento reductivo corporal — antes y después" },
            { src: "/resultados/reductivos/2.webp", alt: "Tratamiento reductivo corporal — resultado frontal" },
            { src: "/resultados/reductivos/3.webp", alt: "Tratamiento reductivo corporal — caso clínico" },
            { src: "/resultados/reductivos/4.webp", alt: "Tratamiento reductivo corporal — resultado final" },
        ],
    },
    {
        id: "manos",
        titulo: "Rejuvenecimiento de Manos",
        subtitulo: "Ácido Hialurónico — Restauración de Volumen",
        href: "/tratamientos/manos-ah-laser",
        casos: [
            { src: "/resultados/manos/1.webp", alt: "Rejuvenecimiento de manos con AH — antes y después" },
        ],
    },
    {
        id: "onicomicosis",
        titulo: "Onicomicosis",
        subtitulo: "Tratamiento Láser CO2",
        href: "/tratamientos/onicomicosis-laser-co2",
        casos: [
            { src: "/resultados/onicomicosis/1.webp", alt: "Tratamiento onicomicosis con láser — antes y después" },
        ],
    },
    {
        id: "borrado-tatuajes",
        titulo: "Borrado de Tatuajes",
        subtitulo: "Láser Q-Switch / Picosegundo",
        href: "/tratamientos/borrado-tatuajes",
        casos: [
            { src: "/resultados/borrado-tatuajes/1.webp", alt: "Borrado de tatuaje — seguimiento" },
            { src: "/resultados/borrado-tatuajes/2.webp", alt: "Borrado de tatuaje — antes y después" },
            { src: "/resultados/borrado-tatuajes/3.webp", alt: "Borrado de tatuaje — resultado parcial" },
            { src: "/resultados/borrado-tatuajes/4.webp", alt: "Borrado de tatuaje — progreso" },
            { src: "/resultados/borrado-tatuajes/5.webp", alt: "Borrado de tatuaje — caso clínico" },
            { src: "/resultados/borrado-tatuajes/6.webp", alt: "Borrado de tatuaje — resultado final" },
            { src: "/resultados/borrado-tatuajes/7.webp", alt: "Borrado de tatuaje — antes y después" },
            { src: "/resultados/borrado-tatuajes/8.webp", alt: "Borrado de tatuaje — caso Carla" },
        ],
    },
    {
        id: "laser-rejuvenecimiento",
        titulo: "Rejuvenecimiento con Láser",
        subtitulo: "Láser CO2 Fraccionado — Renovación Cutánea",
        href: "/tratamientos/cool-peel",
        casos: [
            { src: "/resultados/laser-rejuvenecimiento/1.webp", alt: "Rejuvenecimiento con láser — antes y después" },
            { src: "/resultados/laser-rejuvenecimiento/2.webp", alt: "Rejuvenecimiento con láser — resultado" },
            { src: "/resultados/laser-rejuvenecimiento/3.webp", alt: "Rejuvenecimiento con láser — poros" },
            { src: "/resultados/laser-rejuvenecimiento/4.webp", alt: "Rejuvenecimiento con láser — caso clínico" },
        ],
    },
    {
        id: "cicatrices",
        titulo: "Cicatrices",
        subtitulo: "Tratamiento Láser CO2 — Resurfacing",
        href: "/tratamientos/cool-peel",
        casos: [
            { src: "/resultados/cicatrices/1.webp", alt: "Cicatriz — antes y después" },
            { src: "/resultados/cicatrices/2.webp", alt: "Cicatriz — resultado tratamiento" },
            { src: "/resultados/cicatrices/3.webp", alt: "Cicatriz — caso clínico" },
            { src: "/resultados/cicatrices/4.webp", alt: "Cicatriz — resultado" },
            { src: "/resultados/cicatrices/5.webp", alt: "Cicatriz — resultado final" },
        ],
    },
    {
        id: "cicatrices-acne",
        titulo: "Cicatrices de Acné",
        subtitulo: "Láser CO2 Fraccionado — Resurfacing",
        href: "/tratamientos/cicatrices-acne-tratamiento",
        casos: [
            { src: "/resultados/cicatrices-acne/1.webp", alt: "Cicatrices de acné — antes y después" },
            { src: "/resultados/cicatrices-acne/2.webp", alt: "Cicatrices de acné — resultado" },
            { src: "/resultados/cicatrices-acne/3.webp", alt: "Cicatrices de acné — caso clínico" },
            { src: "/resultados/cicatrices-acne/4.webp", alt: "Cicatrices de acné — seguimiento" },
            { src: "/resultados/cicatrices-acne/5.webp", alt: "Cicatrices de acné — resultado lateral" },
            { src: "/resultados/cicatrices-acne/6.webp", alt: "Cicatrices de acné — caso Nancy" },
            { src: "/resultados/cicatrices-acne/7.webp", alt: "Cicatrices de acné — resultado final" },
        ],
    },
    {
        id: "melasma",
        titulo: "Melasma",
        subtitulo: "Tratamiento Despigmentante — Láser y Cosmética",
        href: "/tratamientos/melasma-tratamiento",
        casos: [
            { src: "/resultados/melasma/1.webp", alt: "Melasma — antes y después" },
            { src: "/resultados/melasma/2.webp", alt: "Melasma — resultado tratamiento" },
            { src: "/resultados/melasma/3.webp", alt: "Melasma — caso clínico" },
        ],
    },
    {
        id: "rosacea",
        titulo: "Rosácea",
        subtitulo: "Tratamiento Láser — Control de Eritema",
        href: "/tratamientos/rosacea-tratamiento",
        casos: [
            { src: "/resultados/rosacea/1.webp", alt: "Rosácea — antes y después" },
            { src: "/resultados/rosacea/2.webp", alt: "Rosácea — resultado" },
            { src: "/resultados/rosacea/3.webp", alt: "Rosácea — caso clínico" },
        ],
    },
    {
        id: "manchas",
        titulo: "Manchas en la Piel",
        subtitulo: "Tratamiento de Hiperpigmentación",
        href: "/tratamientos/melasma-tratamiento",
        casos: [
            { src: "/resultados/manchas/1.webp", alt: "Tratamiento manchas — antes y después" },
            { src: "/resultados/manchas/2.webp", alt: "Tratamiento manchas — resultado" },
            { src: "/resultados/manchas/3.webp", alt: "Tratamiento manchas — caso clínico" },
            { src: "/resultados/manchas/4.webp", alt: "Tratamiento manchas — resultado final" },
        ],
    },
    {
        id: "despigmentacion",
        titulo: "Despigmentación",
        subtitulo: "Tratamiento de Manchas — Láser y Cosmética Avanzada",
        href: "/tratamientos/melasma-tratamiento",
        casos: [
            { src: "/resultados/despigmentacion/1.webp", alt: "Despigmentación — antes y después" },
            { src: "/resultados/despigmentacion/2.webp", alt: "Despigmentación — resultado tratamiento" },
            { src: "/resultados/despigmentacion/3.webp", alt: "Despigmentación — caso clínico" },
            { src: "/resultados/despigmentacion/4.webp", alt: "Despigmentación — resultado final" },
        ],
    },
];

const GRUPOS = [
    {
        id: 'todos',
        label: 'Todos',
        icon: '✦',
        ids: null as string[] | null,
    },
    {
        id: 'facial',
        label: 'Facial',
        icon: '◎',
        ids: ['relleno-ojeras','fosa-temporal','angulo-mandibular','menton','bichectomia','relleno-labial','rinomodelacion','sonrisa-gingival'],
    },
    {
        id: 'corporal',
        label: 'Corporal',
        icon: '◈',
        ids: ['gluteos','reductivos','manos','onicomicosis'],
    },
    {
        id: 'piel',
        label: 'Piel & Láser',
        icon: '◉',
        ids: ['borrado-tatuajes','laser-rejuvenecimiento','cicatrices','cicatrices-acne','melasma','rosacea','manchas','despigmentacion'],
    },
];

const totalCasos = categorias.reduce((s, c) => s + c.casos.length, 0);

export default function CasosClinicosClient() {
    const [grupoActivo, setGrupoActivo] = useState('todos');
    const [catActiva, setCatActiva] = useState<string | null>(null);

    const grupoActual = GRUPOS.find(g => g.id === grupoActivo)!;

    const catsDelGrupo = grupoActual.ids
        ? categorias.filter(c => grupoActual.ids!.includes(c.id))
        : categorias;

    const categoriasFiltradas = catActiva
        ? catsDelGrupo.filter(c => c.id === catActiva)
        : catsDelGrupo;

    const totalGrupo = catsDelGrupo.reduce((s, c) => s + c.casos.length, 0);

    const handleGrupo = (id: string) => {
        setGrupoActivo(id);
        setCatActiva(null);
    };

    return (
        <>
            {/* ── STATS ── */}
            <div className="border-b border-sand bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-sand px-5 lg:px-8">
                    {[
                        { n: totalCasos, label: 'Casos publicados' },
                        { n: categorias.length, label: 'Tratamientos' },
                        { n: '100%', label: 'Con consentimiento' },
                    ].map(s => (
                        <div key={s.label} className="flex flex-col items-center gap-0.5 py-6 px-4">
                            <span className="font-[family-name:var(--font-italiana)] text-4xl leading-none text-gold">{s.n}</span>
                            <span className="mt-1 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-olive/60">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── FILTROS ── */}
            <div className="sticky top-16 z-30 border-b border-sand bg-white/95 backdrop-blur-md">
                <div className="mx-auto max-w-7xl px-5 lg:px-8">

                    {/* Nivel 1: grupos */}
                    <div className="flex gap-0 border-b border-sand/60">
                        {GRUPOS.map(g => {
                            const count = g.ids
                                ? categorias.filter(c => g.ids!.includes(c.id)).reduce((s, c) => s + c.casos.length, 0)
                                : totalCasos;
                            const isActive = grupoActivo === g.id;
                            return (
                                <button
                                    key={g.id}
                                    onClick={() => handleGrupo(g.id)}
                                    className={`relative flex items-center gap-2 px-4 py-3.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 sm:px-6 ${
                                        isActive
                                            ? 'text-ink'
                                            : 'text-olive/50 hover:text-olive'
                                    }`}
                                >
                                    {g.label}
                                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums transition-colors ${
                                        isActive ? 'bg-gold text-white' : 'bg-sand text-olive/60'
                                    }`}>{count}</span>
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-gold" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Nivel 2: sub-categorías */}
                    <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {catsDelGrupo.length > 1 && (
                            <button
                                onClick={() => setCatActiva(null)}
                                className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    !catActiva
                                        ? 'bg-ink text-white shadow-sm'
                                        : 'bg-cream text-olive/70 hover:bg-sand hover:text-ink'
                                }`}
                            >
                                Todos ({totalGrupo})
                            </button>
                        )}
                        {catsDelGrupo.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setCatActiva(c.id)}
                                className={`shrink-0 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                                    catActiva === c.id
                                        ? 'bg-gold text-white shadow-sm'
                                        : 'bg-cream text-olive/70 hover:bg-sand hover:text-ink'
                                }`}
                            >
                                {c.titulo}
                                <span className="ml-1 opacity-60">({c.casos.length})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── GALERÍA ── */}
            <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
                <div className="space-y-16">
                    {categoriasFiltradas.map((cat, idx) => (
                        <section key={cat.id}>
                            {/* Header de sección */}
                            <div className="mb-5 flex items-end justify-between">
                                <div className="flex items-end gap-4">
                                    <span className="font-[family-name:var(--font-italiana)] text-6xl leading-none text-sand select-none">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div className="pb-1">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold">{cat.subtitulo}</p>
                                        <h2 className="font-[family-name:var(--font-italiana)] text-2xl leading-tight text-ink sm:text-3xl">{cat.titulo}</h2>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pb-1">
                                    <span className="hidden sm:inline rounded-full border border-sand bg-cream px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-olive">
                                        {cat.casos.length} caso{cat.casos.length !== 1 ? 's' : ''}
                                    </span>
                                    <Link
                                        href={cat.href}
                                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink/12 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-ink shadow-sm transition-all hover:border-gold hover:bg-gold hover:text-white"
                                    >
                                        <span className="hidden sm:inline">Ver tratamiento</span>
                                        <span className="sm:hidden">Ver más</span>
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="h-px bg-gradient-to-r from-gold/40 via-sand to-transparent mb-6" />

                            {/* Grid — primera foto destacada en desktop si hay más de 1 */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                {cat.casos.map((caso, i) => {
                                    const featured = i === 0 && cat.casos.length > 2;
                                    return (
                                        <div
                                            key={i}
                                            className={`group relative overflow-hidden rounded-2xl bg-sand shadow-sm ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gold/30 ${
                                                featured ? 'col-span-2 row-span-2' : ''
                                            }`}
                                        >
                                            {/* Badge */}
                                            <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-ink/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-gold backdrop-blur-sm">
                                                Antes · Después
                                            </span>

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-gold/80">{cat.subtitulo}</p>
                                                <p className="font-[family-name:var(--font-italiana)] text-lg leading-tight text-white">{cat.titulo}</p>
                                            </div>

                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={caso.src}
                                                alt={caso.alt}
                                                loading="lazy"
                                                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Nota legal */}
                <p className="mt-14 text-center text-xs text-olive/40">
                    Imágenes publicadas con consentimiento informado de los pacientes · Identidades protegidas · Resultados individuales pueden variar
                </p>

                {/* CTA */}
                <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-[#26231e] px-8 py-14 text-center text-white shadow-2xl sm:px-14">
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div className="h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
                    </div>
                    <span className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                        {totalCasos} casos publicados
                    </span>
                    <h3 className="relative mt-2 font-[family-name:var(--font-italiana)] text-3xl sm:text-4xl">
                        ¿Te gustaría ser nuestro<br className="hidden sm:block" /> próximo caso de éxito?
                    </h3>
                    <p className="relative mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/65">
                        Agenda una evaluación sin compromiso y descubre qué tratamiento es el ideal para ti.
                    </p>
                    <div className="relative mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/tratamientos"
                            className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-white hover:text-ink hover:shadow-none"
                        >
                            Ver tratamientos
                        </Link>
                        <a
                            href="https://wa.me/56982028473?text=Hola%2C%20quisiera%20agendar%20una%20evaluaci%C3%B3n."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-white/85 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
