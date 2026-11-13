import Link from "next/link";

// Bloque de contenido largo para las landings de tratamientos: cada sección es un H2
// que responde una búsqueda concreta (precio, sesiones, recuperación...), más enlaces
// a tratamientos relacionados para que Google entienda la estructura del sitio.

export interface SeccionGuia {
    titulo: string;
    parrafos: string[];
    lista?: string[];
}

export interface TratamientoRelacionado {
    titulo: string;
    href: string;
    descripcion: string;
}

interface GuiaTratamientoProps {
    etiqueta?: string;
    titulo: string;
    intro?: string;
    secciones: SeccionGuia[];
    relacionados?: TratamientoRelacionado[];
}

export default function GuiaTratamiento({
    etiqueta = "Guía completa",
    titulo,
    intro,
    secciones,
    relacionados,
}: GuiaTratamientoProps) {
    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="max-w-3xl mx-auto px-5 lg:px-8">
                <div className="mb-12">
                    <span className="text-gold-dark uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">{etiqueta}</span>
                    <p className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-ink leading-tight">{titulo}</p>
                    {intro && <p className="mt-5 text-lg text-olive leading-relaxed">{intro}</p>}
                </div>

                <div className="space-y-12">
                    {secciones.map((s) => (
                        <article key={s.titulo}>
                            <h2 className="text-2xl md:text-[1.7rem] font-[family-name:var(--font-italiana)] text-ink mb-4 leading-snug">
                                {s.titulo}
                            </h2>
                            <div className="space-y-4">
                                {s.parrafos.map((p, i) => (
                                    <p key={i} className="text-olive leading-relaxed">{p}</p>
                                ))}
                            </div>
                            {s.lista && (
                                <ul className="mt-5 space-y-2.5">
                                    {s.lista.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-olive leading-relaxed">
                                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" aria-hidden="true" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </article>
                    ))}
                </div>

                {relacionados && relacionados.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-ink/10">
                        <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-ink mb-6">Tratamientos relacionados</h2>
                        <div className="grid gap-4 sm:grid-cols-2">
                            {relacionados.map((r) => (
                                <Link
                                    key={r.href}
                                    href={r.href}
                                    className="group block rounded-2xl border border-ink/10 bg-cream p-5 transition-all hover:border-gold/50 hover:shadow-md"
                                >
                                    <span className="block font-semibold text-ink group-hover:text-gold-dark transition-colors">
                                        {r.titulo} →
                                    </span>
                                    <span className="mt-1 block text-sm text-olive leading-relaxed">{r.descripcion}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
