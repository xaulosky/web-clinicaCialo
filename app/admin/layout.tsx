'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import './admin.css';

type NavItem = { href: string; label: string; icon: string; exact?: boolean };
type NavGroup = { label: string; items: NavItem[] };

const NAV: NavGroup[] = [
    {
        label: 'Gestión',
        items: [
            { href: '/admin', label: 'Dashboard', icon: 'grid', exact: true },
            { href: '/admin/pedidos', label: 'Pedidos', icon: 'bag' },
            { href: '/admin/reservas', label: 'Reservas', icon: 'calendar' },
            { href: '/admin/contactos', label: 'Contactos', icon: 'mail' },
            { href: '/admin/reportes', label: 'Reportes', icon: 'chart' },
        ],
    },
    {
        label: 'Analítica',
        items: [
            { href: '/admin/analitica', label: 'Analítica web', icon: 'pulse' },
        ],
    },
    {
        label: 'Marketing',
        items: [
            { href: '/admin/cupones', label: 'Cupones', icon: 'ticket' },
            { href: '/admin/afiliados', label: 'Afiliados', icon: 'users' },
            { href: '/admin/comisiones', label: 'Comisiones', icon: 'money' },
        ],
    },
];

const ICONS: Record<string, string> = {
    grid: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
    bag: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    pulse: 'M3 12h4l3 8 4-16 3 8h4',
    ticket: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
    users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    money: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    external: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
    logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
};

function isActive(item: NavItem, pathname: string) {
    const p = pathname.replace(/\/$/, '') || '/';
    return item.exact ? p === item.href : p === item.href || p.startsWith(item.href + '/');
}

function NavLink({ item, pathname, onNavigate }: { item: NavItem; pathname: string; onNavigate?: () => void }) {
    const active = isActive(item, pathname);
    return (
        <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] transition-colors ${active
                ? 'bg-white/[0.07] text-white'
                : 'text-[#a9a39a] hover:bg-white/[0.04] hover:text-white'
                }`}
        >
            {active && <span className="absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-cialo-gold" />}
            <svg className={`h-[18px] w-[18px] shrink-0 ${active ? 'text-cialo-gold' : 'text-[#7d776d] group-hover:text-[#cfc9bf]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={ICONS[item.icon]} />
            </svg>
            <span className="font-medium">{item.label}</span>
        </Link>
    );
}

/** Título de la página actual para la barra superior. */
function currentLabel(pathname: string): string {
    if (pathname.replace(/\/$/, '').startsWith('/admin/detalle-pedido')) return 'Detalle de pedido';
    for (const g of NAV) for (const i of g.items) if (isActive(i, pathname)) return i.label;
    return 'Panel';
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [adminName, setAdminName] = useState('Administrador');
    const [adminRole, setAdminRole] = useState('Sesión activa');
    const hasRedirected = useRef(false);

    useEffect(() => {
        if (hasRedirected.current) return;

        const token = localStorage.getItem('adminToken');
        const normalizedPath = pathname?.replace(/\/$/, '') || '';
        const isLoginPage = normalizedPath === '/admin/login';

        if (isLoginPage) {
            if (token) {
                hasRedirected.current = true;
                router.replace('/admin');
            } else {
                setIsAuthorized(true);
                setLoading(false);
            }
        } else {
            if (!token) {
                hasRedirected.current = true;
                router.replace('/admin/login');
            } else {
                setIsAuthorized(true);
                setLoading(false);
            }
        }
    }, [pathname, router]);

    // Identidad del admin desde la sesión guardada
    useEffect(() => {
        try {
            const raw = localStorage.getItem('adminSession');
            if (raw) {
                const s = JSON.parse(raw);
                if (s?.nombre) setAdminName(s.nombre);
                if (s?.rol) setAdminRole(String(s.rol).replace('_', ' '));
            }
        } catch {
            /* noop */
        }
    }, []);

    // Cerrar el drawer al cambiar de ruta
    useEffect(() => {
        setDrawerOpen(false);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminSession');
        router.push('/admin/login');
    };

    if (loading || !isAuthorized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f6f4f0]">
                <div className="text-center">
                    <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-[#b8935f] border-t-transparent"></div>
                    <p className="text-sm text-[#6f6a5c]">{loading ? 'Cargando…' : 'Redirigiendo…'}</p>
                </div>
            </div>
        );
    }

    const normalizedPath = pathname?.replace(/\/$/, '') || '';
    if (normalizedPath === '/admin/login') {
        return <>{children}</>;
    }

    const pageTitle = currentLabel(pathname);
    const fecha = new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' });
    const today = fecha.charAt(0).toUpperCase() + fecha.slice(1);

    const renderSidebar = (onNavigate?: () => void) => (
        <>
            <div className="flex h-16 items-center gap-3 px-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cialo-gold text-sm font-semibold text-[#1b1a18]">C</div>
                <div className="leading-tight">
                    <p className="text-sm font-semibold tracking-wide text-white">Clínica Cialo</p>
                    <p className="text-[11px] text-[#8f897f]">Panel de administración</p>
                </div>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto px-5 pb-6 pt-4">
                {NAV.map((group) => (
                    <div key={group.label}>
                        <p className="mb-1.5 px-3 text-[11px] font-medium uppercase tracking-[0.08em] text-[#6f6a60]">{group.label}</p>
                        <div className="space-y-0.5">
                            {group.items.map((item) => (
                                <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            <div className="border-t border-white/[0.06] p-3">
                <Link href="/" target="_blank" className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-[#a9a39a] transition-colors hover:bg-white/[0.04] hover:text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={ICONS.external} />
                    </svg>
                    Ver sitio web
                </Link>
                <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold uppercase text-white">
                        {adminName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-white">{adminName}</p>
                        <p className="truncate text-[11px] capitalize text-[#8f897f]">{adminRole}</p>
                    </div>
                    <button onClick={handleLogout} title="Cerrar sesión" aria-label="Cerrar sesión" className="rounded-md p-1.5 text-[#8f897f] transition-colors hover:bg-white/[0.06] hover:text-red-300">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={ICONS.logout} />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <div className="admin-shell flex min-h-screen">
            {/* Sidebar desktop: fija, así el menú no se pierde al bajar en tablas largas */}
            <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-[#1b1a18] md:flex">
                {renderSidebar()}
            </aside>

            {/* Drawer móvil */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setDrawerOpen(false)} />
                    <aside className="absolute inset-y-0 left-0 flex w-64 max-w-[85%] flex-col bg-[#1b1a18] shadow-2xl animate-[slideIn_0.2s_ease-out]">
                        {renderSidebar(() => setDrawerOpen(false))}
                    </aside>
                </div>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-[#e8e3da] bg-[#f6f4f0]/85 px-4 backdrop-blur md:px-8">
                    <button onClick={() => setDrawerOpen(true)} aria-label="Abrir menú" className="-ml-1 rounded-md p-1.5 text-[#6f6a5c] hover:bg-black/[0.04] hover:text-[#1b1a18] md:hidden">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <nav className="flex min-w-0 items-center gap-2 text-sm" aria-label="Ubicación">
                        <span className="hidden text-[#8f897f] sm:inline">Admin</span>
                        <span className="hidden text-[#cfc8bb] sm:inline">/</span>
                        <span className="truncate font-medium text-[#1b1a18]">{pageTitle}</span>
                    </nav>
                    <span className="ml-auto hidden text-xs text-[#8f897f] sm:inline">{today}</span>
                </header>

                <main className="admin-content flex-1 px-4 py-6 md:px-8 md:py-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>
        </div>
    );
}
