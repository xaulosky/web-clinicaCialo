'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function MiCuentaShell({ children }: { children: React.ReactNode }) {
    console.log('🟢 MiCuentaLayout: Componente renderizando');
    
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isLoading, logout, user, checkSession } = useAuthStore();

    // Normalizar pathname removiendo trailing slash
    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const isAuthPage = normalizedPath === '/mi-cuenta/login' || normalizedPath === '/mi-cuenta/registro';

    console.log('🟢 MiCuentaLayout: pathname =', pathname);
    console.log('🟢 MiCuentaLayout: normalizedPath =', normalizedPath);
    console.log('🟢 MiCuentaLayout: isAuthPage =', isAuthPage);
    console.log('🟢 MiCuentaLayout: isLoading =', isLoading);
    console.log('🟢 MiCuentaLayout: isAuthenticated =', isAuthenticated);

    useEffect(() => {
        console.log('🟢 MiCuentaLayout: useEffect - checkSession()');
        // Check session on mount
        checkSession();
    }, [checkSession]);

    useEffect(() => {
        console.log('🟢 MiCuentaLayout: useEffect redirect - isLoading=', isLoading, 'isAuthenticated=', isAuthenticated, 'isAuthPage=', isAuthPage);
        // Redirect to login if not authenticated and not on auth pages
        if (!isLoading && !isAuthenticated && !isAuthPage) {
            console.log('🟢 MiCuentaLayout: Redirigiendo a login');
            router.push('/mi-cuenta/login');
        }
    }, [isLoading, isAuthenticated, isAuthPage, router]);

    if (isAuthPage) {
        console.log('🟢 MiCuentaLayout: Es página de auth, retornando children');
        return <>{children}</>;
    }

    if (isLoading) {
        console.log('🟢 MiCuentaLayout: isLoading=true, mostrando spinner');
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cialo-gold"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        console.log('🟢 MiCuentaLayout: No autenticado, retornando null');
        return null;
    }

    const handleLogout = async () => {
        await logout();
        router.push('/mi-cuenta/login');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />

            <main className="flex-grow pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                                <div className="mb-6 flex items-center gap-3 pb-6 border-b border-gray-100">
                                    <div className="w-12 h-12 bg-cialo-gold/10 rounded-full flex items-center justify-center text-cialo-gold font-bold text-xl">
                                        {user?.nombre?.charAt(0)}{user?.apellido?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 leading-tight">{user?.nombre}</p>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                </div>
                                <nav className="space-y-1">
                                    <Link
                                        href="/mi-cuenta"
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/mi-cuenta' ? 'bg-cialo-gold text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span>🛍️</span> Mis Pedidos
                                    </Link>
                                    <Link
                                        href="/mi-cuenta/perfil"
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/mi-cuenta/perfil' ? 'bg-cialo-gold text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span>👤</span> Mi Perfil
                                    </Link>
                                    <Link
                                        href="/mi-cuenta/afiliado"
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/mi-cuenta/afiliado' ? 'bg-cialo-gold text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <span>💰</span> Panel Afiliado
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                                    >
                                        <span>🚪</span> Cerrar Sesión
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
