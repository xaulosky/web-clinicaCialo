// Piezas visuales compartidas del panel de administración.
// Las páginas nuevas (o las que se vayan rehaciendo) deberían armarse con esto
// en vez de repetir clases de Tailwind a mano.

import type { ReactNode } from 'react';

export const ICON_PATHS = {
    refresh: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    alert: 'M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
    check: 'M5 13l4 4L19 7',
    search: 'M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z',
    arrowRight: 'M9 5l7 7-7 7',
    inbox: 'M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4',
    wallet: 'M3 7a2 2 0 012-2h13a1 1 0 011 1v2M3 7v10a2 2 0 002 2h14a1 1 0 001-1v-3M3 7h16a1 1 0 011 1v3m0 0h-4a2 2 0 100 4h4m0-4v4',
    bag: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    x: 'M6 18L18 6M6 6l12 12',
} as const;

export function Icon({ name, className = 'w-4 h-4' }: { name: keyof typeof ICON_PATHS; className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d={ICON_PATHS[name]} />
        </svg>
    );
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
                <h1 className="text-ink">{title}</h1>
                {description && <p className="mt-1 text-sm text-olive">{description}</p>}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </div>
    );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const BUTTON: Record<ButtonVariant, string> = {
    primary: 'bg-ink text-white hover:bg-[#2d2b28] border border-ink',
    secondary: 'bg-white text-ink border border-[#d9d2c5] hover:border-gold hover:text-gold-dark',
    ghost: 'text-olive hover:text-ink hover:bg-black/[0.04] border border-transparent',
};

export function Button({
    children,
    variant = 'secondary',
    size = 'md',
    className = '',
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: 'sm' | 'md' }) {
    const sizing = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-3.5 text-sm';
    return (
        <button
            {...props}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${sizing} ${BUTTON[variant]} ${className}`}
        >
            {children}
        </button>
    );
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
    return <div className={`rounded-xl border border-[#e8e3da] bg-white shadow-[0_1px_2px_rgba(27,26,24,0.04)] ${className}`}>{children}</div>;
}

export function CardHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-[#efeae2] px-5 py-4">
            <div className="min-w-0">
                <h2 className="text-base text-ink">{title}</h2>
                {description && <p className="mt-0.5 text-xs text-olive">{description}</p>}
            </div>
            {actions}
        </div>
    );
}

type Tone = 'neutral' | 'gold' | 'green' | 'red' | 'amber' | 'blue' | 'violet';

const TONE_BADGE: Record<Tone, string> = {
    neutral: 'bg-[#f1eee8] text-[#5c584c] ring-[#e2ddd2]',
    gold: 'bg-[#f7efe2] text-[#8a6a3e] ring-[#ead9bd]',
    green: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    red: 'bg-red-50 text-red-700 ring-red-200',
    amber: 'bg-amber-50 text-amber-800 ring-amber-200',
    blue: 'bg-sky-50 text-sky-700 ring-sky-200',
    violet: 'bg-violet-50 text-violet-700 ring-violet-200',
};

const TONE_DOT: Record<Tone, string> = {
    neutral: 'bg-[#a39d8f]',
    gold: 'bg-gold',
    green: 'bg-emerald-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    blue: 'bg-sky-500',
    violet: 'bg-violet-500',
};

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
    return (
        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${TONE_BADGE[tone]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[tone]}`} />
            {children}
        </span>
    );
}

export function StatCard({
    label,
    value,
    hint,
    icon,
    tone = 'neutral',
    alert,
}: {
    label: string;
    value: string;
    hint?: ReactNode;
    icon?: keyof typeof ICON_PATHS;
    tone?: Tone;
    alert?: boolean;
}) {
    const iconTone: Record<Tone, string> = {
        neutral: 'bg-[#f1eee8] text-[#5c584c]',
        gold: 'bg-[#f7efe2] text-[#8a6a3e]',
        green: 'bg-emerald-50 text-emerald-700',
        red: 'bg-red-50 text-red-600',
        amber: 'bg-amber-50 text-amber-700',
        blue: 'bg-sky-50 text-sky-700',
        violet: 'bg-violet-50 text-violet-700',
    };
    return (
        <div className={`rounded-xl border bg-white p-4 shadow-[0_1px_2px_rgba(27,26,24,0.04)] ${alert ? 'border-red-200 ring-1 ring-red-100' : 'border-[#e8e3da]'}`}>
            <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-olive">{label}</p>
                {icon && (
                    <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${alert ? iconTone.red : iconTone[tone]}`}>
                        <Icon name={icon} className="h-4 w-4" />
                    </span>
                )}
            </div>
            <p className={`mt-2 text-2xl font-semibold tracking-tight ${alert ? 'text-red-700' : 'text-ink'}`}>{value}</p>
            {hint && <div className="mt-1 text-xs text-olive">{hint}</div>}
        </div>
    );
}

export function Spinner({ label }: { label?: string }) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 py-16 text-sm text-olive">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            {label}
        </div>
    );
}

export function EmptyState({ title, description, icon = 'inbox' }: { title: string; description?: string; icon?: keyof typeof ICON_PATHS }) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f1eee8] text-olive">
                <Icon name={icon} className="h-5 w-5" />
            </span>
            <p className="text-sm font-medium text-ink">{title}</p>
            {description && <p className="mt-1 max-w-sm text-sm text-olive">{description}</p>}
        </div>
    );
}

export function Initials({ name }: { name: string }) {
    const parts = name.trim().split(/\s+/);
    const ini = ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
    return (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1eee8] text-[11px] font-semibold text-[#5c584c]">
            {ini || '·'}
        </span>
    );
}
