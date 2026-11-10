"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CartButton from "./CartButton";
import { useAuthStore } from "@/lib/auth-store";
import { profesionalesData } from "@/data/profesionales";
import { getCategorias } from "@/data/tratamientos";
import { consultasData } from "@/data/consultas";

interface NavbarProps {
    transparent?: boolean;
}

export default function Navbar({ transparent = false }: NavbarProps) {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, isAuthenticated } = useAuthStore();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const isTransparent = transparent && !isScrolled;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Cerrar dropdown al cambiar de ruta
    useEffect(() => {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const categorias = getCategorias();
    const catIcons: Record<string, string> = {
        'Facial': "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        'Corporal': "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        'Capilar': "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        'Ginecoestética': "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
        'Urología': "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4",
        'Nutrición': "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    };
    const categoryMapping: Record<string, string> = {
        "Nutrición": "Nutricion",
        "Ginecoestética": "Ginecologico",
        "Urología": "Urologico",
    };
    const tratamientosSubmenu = categorias.map(cat => ({
        href: `/tratamientos?categoria=${categoryMapping[cat] || cat}`,
        label: cat === "Corporal" ? "Corporal & Contorno" : cat === "Facial" ? "Estética Facial" : cat,
        iconPath: catIcons[cat] || "M13 10V3L4 14h7v7l9-11h-7z",
    }));

    const profesionalesSubmenu = profesionalesData
        .filter(p => p.id !== "clinica-cialo")
        .map(p => ({ href: `/profesionales/${p.id}`, label: `${p.nombre} ${p.apellido}`, subtitle: p.titulo }));

    const consultasSubmenu = consultasData.map(consulta => ({
        href: `/consultas/${consulta.id}`,
        label: consulta.nombre,
        description: consulta.descripcion,
        iconPath: consulta.iconPath,
    }));

    const masSubmenu = [
        { href: "/nosotros", label: "Nosotros", subtitle: "Nuestra clínica e historia", iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
        { href: "/productos", label: "Productos", subtitle: "Dermocosmética profesional", iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
        { href: "/blog", label: "Blog", subtitle: "Consejos y novedades", iconPath: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
        { href: "/contacto", label: "Contacto", subtitle: "Escríbenos o visítanos", iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    ];

    // ===== Helpers de presentación (desktop) =====
    const Chevron = ({ open }: { open: boolean }) => (
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
    );

    const topColor = (active: boolean) =>
        isTransparent
            ? (active ? "text-goldlt" : "text-white/90 hover:text-white")
            : (active ? "text-gold-dark" : "text-olive hover:text-gold-dark");

    const TopLink = ({ href, label }: { href: string; label: string }) => {
        const active = isActive(href);
        return (
            <Link
                href={href}
                className={`relative text-sm font-medium px-1 py-2 transition-colors after:absolute after:left-1 after:right-1 after:-bottom-0.5 after:h-[2px] after:bg-gold after:origin-center after:transition-transform after:duration-300 ${active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"} ${topColor(active)}`}
            >
                {label}
            </Link>
        );
    };

    const MenuLink = ({ href, iconPath, title, subtitle }: { href: string; iconPath: string; title: string; subtitle?: string }) => (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sand/60 transition-colors group"
        >
            <span className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={iconPath} />
                </svg>
            </span>
            <span className="min-w-0">
                <span className="block text-sm font-medium text-ink group-hover:text-gold-dark transition-colors truncate">{title}</span>
                {subtitle && <span className="block text-xs text-olive truncate">{subtitle}</span>}
            </span>
        </Link>
    );

    interface DropdownProps { id: string; label: string; active: boolean; width?: string; children: React.ReactNode; }
    const Dropdown = ({ id, label, active, width = "w-72", children }: DropdownProps) => {
        const open = activeDropdown === id;
        return (
            <div
                className="relative"
                onMouseEnter={() => setActiveDropdown(id)}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={open}
                    onClick={() => setActiveDropdown(open ? null : id)}
                    className={`flex items-center gap-1 text-sm font-medium px-1 py-2 transition-colors ${topColor(active || open)}`}
                >
                    {label}
                    <Chevron open={open} />
                </button>
                {/* pt-3 = puente de hover (sin parpadeo entre botón y panel) */}
                <div className={`absolute top-full left-0 pt-3 transition-all duration-200 ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1 pointer-events-none"}`}>
                    <div className={`${width} bg-cream rounded-2xl shadow-[0_18px_50px_rgba(27,26,24,0.16)] border border-sand p-2`}>
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Top Bar */}
            <div className={`bg-ink text-white py-2 text-xs transition-all duration-300 ${(!transparent && !isScrolled) ? "block" : "hidden"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-goldlt" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-cream/75">Lun - Vie: 08:30 - 20:00 · Sáb: 09:00 - 15:00</span>
                        </span>
                        <span className="hidden sm:flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-goldlt" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-cream/75">Bulnes 220, Of. 509, Los Ángeles</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="mailto:contacto@cialo.cl" className="hidden sm:flex items-center gap-1.5 text-cream/75 hover:text-goldlt transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>contacto@cialo.cl</span>
                        </a>
                        <a href="https://wa.me/56982028473" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-cream/75 hover:text-goldlt transition-colors">
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>+56 9 8202 8473</span>
                        </a>
                    </div>
                </div>
            </div>

            <nav
                className={`fixed left-0 right-0 z-50 transition-all duration-500 ${isTransparent
                    ? "top-0 bg-transparent"
                    : isScrolled
                        ? "top-0 bg-cream/95 backdrop-blur-md shadow-[0_4px_24px_rgba(27,26,24,0.08)] border-b border-sand"
                        : "top-8 bg-cream/90 backdrop-blur-sm border-b border-sand/60"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0" aria-label="Clínica Cialo - Inicio">
                            <Image
                                src="/logo-cialo.png"
                                alt="Clínica Cialo"
                                width={174}
                                height={40}
                                style={{ height: "2.5rem", width: "auto" }}
                                className={`h-10 w-auto transition-all duration-300 ${isTransparent ? "brightness-0 invert" : ""}`}
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-6" ref={dropdownRef}>
                            <TopLink href="/" label="Inicio" />

                            <Dropdown id="tratamientos" label="Tratamientos" active={isActive("/tratamientos")} width="w-72">
                                <MenuLink href="/tratamientos" iconPath="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" title="Ver todos" subtitle="Explora los 50+ tratamientos" />
                                <div className="my-1.5 border-t border-sand" />
                                {tratamientosSubmenu.map(item => (
                                    <MenuLink key={item.href} href={item.href} iconPath={item.iconPath} title={item.label} />
                                ))}
                            </Dropdown>

                            <Dropdown id="profesionales" label="Profesionales" active={isActive("/profesionales")} width="w-80">
                                <MenuLink href="/profesionales" iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" title="Ver equipo completo" subtitle="Conoce a todos los especialistas" />
                                <div className="my-1.5 border-t border-sand" />
                                <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
                                    {profesionalesSubmenu.map(item => (
                                        <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sand/60 transition-colors group">
                                            <span className="w-9 h-9 rounded-full bg-sand text-olive group-hover:bg-gold/20 flex items-center justify-center text-xs font-semibold shrink-0 transition-colors">
                                                {item.label.split(" ").map(n => n[0]).slice(0, 2).join("")}
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-sm font-medium text-ink group-hover:text-gold-dark transition-colors truncate">{item.label}</span>
                                                <span className="block text-xs text-olive truncate">{item.subtitle}</span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </Dropdown>

                            <Dropdown id="consultas" label="Consultas" active={isActive("/consultas")} width="w-80">
                                <MenuLink href="/consultas" iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" title="Ver todas las consultas" subtitle="Agenda tu cita médica" />
                                <div className="my-1.5 border-t border-sand" />
                                <div className="max-h-[55vh] overflow-y-auto scrollbar-thin">
                                    {consultasSubmenu.map(item => (
                                        <MenuLink key={item.href} href={item.href} iconPath={item.iconPath} title={item.label} subtitle={item.description} />
                                    ))}
                                </div>
                            </Dropdown>

                            <Dropdown id="mas" label="Más" active={isActive("/nosotros") || isActive("/productos") || isActive("/blog") || isActive("/contacto")} width="w-72">
                                {masSubmenu.map(item => (
                                    <MenuLink key={item.href} href={item.href} iconPath={item.iconPath} title={item.label} subtitle={item.subtitle} />
                                ))}
                            </Dropdown>

                            {/* Acciones */}
                            <div className="flex items-center gap-2 pl-3 ml-1 border-l border-sand">
                                {/* Cuenta */}
                                <div className="relative" onMouseLeave={() => setActiveDropdown(null)}>
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === "user" ? null : "user")}
                                        onMouseEnter={() => setActiveDropdown("user")}
                                        aria-haspopup="true"
                                        aria-expanded={activeDropdown === "user"}
                                        className={`relative p-2 rounded-full transition-colors ${isTransparent ? "text-white hover:bg-white/10" : "text-ink hover:text-gold-dark hover:bg-sand/60"}`}
                                        aria-label="Mi cuenta"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        {isAuthenticated && <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full border border-cream"></span>}
                                    </button>
                                    <div className={`absolute top-full right-0 pt-3 transition-all duration-200 ${activeDropdown === "user" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1 pointer-events-none"}`}>
                                        <div className="w-56 bg-cream rounded-2xl shadow-[0_18px_50px_rgba(27,26,24,0.16)] border border-sand p-2">
                                            {isAuthenticated ? (
                                                <>
                                                    <div className="px-3 py-2 border-b border-sand mb-1">
                                                        <p className="text-sm font-medium text-ink truncate">{user?.nombre || 'Usuario'} {user?.apellido || ''}</p>
                                                        <p className="text-xs text-olive truncate">{user?.email}</p>
                                                    </div>
                                                    <Link href="/mi-cuenta" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-olive hover:bg-sand/60 hover:text-ink transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                                        Mis pedidos
                                                    </Link>
                                                    <Link href="/mi-cuenta/perfil" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-olive hover:bg-sand/60 hover:text-ink transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        Mi perfil
                                                    </Link>
                                                    <button onClick={() => { useAuthStore.getState().logout(); setActiveDropdown(null); }} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-sand">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                                        Cerrar sesión
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <Link href="/mi-cuenta/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-olive hover:bg-sand/60 hover:text-ink transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                                        Iniciar sesión
                                                    </Link>
                                                    <Link href="/mi-cuenta/login?register=true" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-olive hover:bg-sand/60 hover:text-ink transition-colors">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                                                        Crear cuenta
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={isTransparent ? "[&_svg]:text-white [&_a>span]:bg-white [&_a>span]:text-ink" : ""}>
                                    <CartButton />
                                </div>

                                <Link
                                    href="/consultas"
                                    className={`ml-1 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${isTransparent
                                        ? "bg-white text-ink hover:bg-gold hover:text-white shadow-sm"
                                        : "bg-gold text-white hover:bg-ink shadow-sm hover:shadow-md"
                                        }`}
                                >
                                    Agendar mi hora
                                </Link>
                            </div>
                        </div>

                        {/* Mobile actions */}
                        <div className="flex items-center gap-1 lg:hidden">
                            <div className={isTransparent ? "[&_svg]:text-white [&_a>span]:bg-white [&_a>span]:text-ink" : ""}>
                                <CartButton />
                            </div>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`p-2 transition-colors ${isTransparent ? "text-white hover:text-white/80" : "text-ink hover:text-gold-dark"}`}
                                aria-label="Abrir menú"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Drawer */}
            <div className={`lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-ink z-[70] transform transition-transform duration-500 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <Image src="/logo-cialo.png" alt="Clínica Cialo" width={139} height={32} style={{ height: "2rem", width: "auto" }} className="h-8 w-auto brightness-0 invert" />
                    <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors" aria-label="Cerrar menú">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
                    <nav className="flex-1 p-5 space-y-1">
                        <Link href="/" className="flex items-center gap-4 py-3.5 text-white/90 hover:text-goldlt transition-colors group">
                            <span className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </span>
                            <span className="text-lg font-medium">Inicio</span>
                        </Link>

                        {/* Tratamientos */}
                        <div>
                            <button onClick={() => setMobileSubmenu(mobileSubmenu === "tratamientos" ? null : "tratamientos")} aria-expanded={mobileSubmenu === "tratamientos"} className="flex items-center justify-between w-full py-3.5 text-white/90 hover:text-goldlt transition-colors group">
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    </span>
                                    <span className="text-lg font-medium">Tratamientos</span>
                                </div>
                                <svg className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenu === "tratamientos" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenu === "tratamientos" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="pl-14 pb-3 space-y-1">
                                    <Link href="/tratamientos" className="block py-1.5 text-goldlt font-medium text-sm mb-1">Ver todos →</Link>
                                    {tratamientosSubmenu.map(item => (
                                        <Link key={item.href} href={item.href} className="block py-1.5 text-white/70 hover:text-white text-sm transition-colors">{item.label}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Profesionales */}
                        <div>
                            <button onClick={() => setMobileSubmenu(mobileSubmenu === "profesionales" ? null : "profesionales")} aria-expanded={mobileSubmenu === "profesionales"} className="flex items-center justify-between w-full py-3.5 text-white/90 hover:text-goldlt transition-colors group">
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    </span>
                                    <span className="text-lg font-medium">Profesionales</span>
                                </div>
                                <svg className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenu === "profesionales" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenu === "profesionales" ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="pl-14 pb-3 space-y-1.5">
                                    <Link href="/profesionales" className="block py-1.5 text-goldlt font-medium text-sm">Ver equipo completo →</Link>
                                    {profesionalesSubmenu.map(item => (
                                        <Link key={item.href} href={item.href} className="block py-1.5 text-white/70 hover:text-white text-sm transition-colors">{item.label}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Consultas */}
                        <div>
                            <button onClick={() => setMobileSubmenu(mobileSubmenu === "consultas" ? null : "consultas")} aria-expanded={mobileSubmenu === "consultas"} className="flex items-center justify-between w-full py-3.5 text-white/90 hover:text-goldlt transition-colors group">
                                <div className="flex items-center gap-4">
                                    <span className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                                    </span>
                                    <span className="text-lg font-medium">Consultas</span>
                                </div>
                                <svg className={`w-5 h-5 transition-transform duration-300 ${mobileSubmenu === "consultas" ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${mobileSubmenu === "consultas" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                                <div className="pl-14 pb-3 space-y-1">
                                    <Link href="/consultas" className="block py-1.5 text-goldlt font-medium text-sm mb-1">Ver todas →</Link>
                                    {consultasSubmenu.map(item => (
                                        <Link key={item.href} href={item.href} className="block py-1.5 text-white/70 hover:text-white text-sm transition-colors">{item.label}</Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {masSubmenu.map(item => (
                            <Link key={item.href} href={item.href} className="flex items-center gap-4 py-3.5 text-white/90 hover:text-goldlt transition-colors group">
                                <span className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.iconPath} /></svg>
                                </span>
                                <span className="text-lg font-medium">{item.label}</span>
                            </Link>
                        ))}

                        <Link href="/mi-cuenta" className="flex items-center gap-4 py-3.5 text-white/90 hover:text-goldlt transition-colors group">
                            <span className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-gold/20 flex items-center justify-center transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </span>
                            <span className="text-lg font-medium">Mi cuenta</span>
                        </Link>
                    </nav>

                    <div className="p-5 border-t border-white/10 space-y-4">
                        <Link href="/consultas" className="flex items-center justify-center gap-3 w-full bg-gold text-white py-4 px-6 rounded-full font-semibold tracking-wide text-sm hover:bg-white hover:text-ink transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Agendar mi hora
                        </Link>
                        <div className="text-center space-y-0.5">
                            <p className="text-white/50 text-xs">+56 9 8202 8473 · contacto@cialo.cl</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
