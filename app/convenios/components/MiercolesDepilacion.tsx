import Link from "next/link";

// Banner del beneficio recurrente del convenio: miércoles 10% en depilación láser.
export default function MiercolesDepilacion({ className = "" }: { className?: string }) {
    return (
        <div className={`mx-auto max-w-3xl overflow-hidden rounded-2xl border border-[#b8935f]/40 bg-white ${className}`}>
            <div className="flex flex-col items-center gap-4 p-5 text-center sm:flex-row sm:text-left">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#b8935f]/15">
                    <svg className="h-6 w-6 text-[#b8935f]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </span>
                <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#b8935f]">Beneficio de los miércoles</p>
                    <p className="text-sm font-medium text-[#1b1a18] sm:text-base">
                        <strong>10% de descuento</strong> en Depilación Láser todos los miércoles.
                    </p>
                </div>
                <Link
                    href="/depilacion-laser-los-angeles"
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#1b1a18] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#b8935f] hover:text-[#1b1a18]"
                >
                    Ver depilación
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
