'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/auth-store';
import { affiliatesApi, Affiliate, Commission } from '@/lib/api';
import { formatPrice } from '@/lib/cart-store';
import { useToast } from '@/app/components/Toast';

export default function AffiliateDashboardPage() {
    const { isAuthenticated } = useAuthStore();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [stats, setStats] = useState<{
        pendientes_count: number;
        pendientes_monto: number;
        aprobadas_count: number;
        aprobadas_monto: number;
        pagadas_count: number;
        pagadas_monto: number;
    } | null>(null);
    const [monthlyStats, setMonthlyStats] = useState<{
        ventas_mes: number;
        total_ventas_mes: number;
        comisiones_mes: number;
    } | null>(null);
    const [activeTab, setActiveTab] = useState<'todas' | 'pendiente' | 'aprobada' | 'pagada'>('todas');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            loadAffiliateData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const loadAffiliateData = async () => {
        try {
            setLoading(true);
            const result = await affiliatesApi.getMyProfile();
            
            if (result.success && result.data) {
                const data = result.data as Affiliate & {
                    comisiones_resumen?: typeof stats;
                    stats_mes?: typeof monthlyStats;
                };
                setAffiliate(data);
                // Los stats vienen incluidos en el perfil
                if (data.comisiones_resumen) {
                    setStats(data.comisiones_resumen);
                }
                if (data.stats_mes) {
                    setMonthlyStats(data.stats_mes);
                }
                
                // Cargar comisiones
                loadCommissions();
            } else {
                setError('No eres un afiliado registrado. Contacta con nosotros si deseas unirte al programa.');
            }
        } catch {
            setError('Error al cargar datos de afiliado');
        } finally {
            setLoading(false);
        }
    };

    const loadCommissions = async (estado?: string) => {
        try {
            const result = await affiliatesApi.getMyCommissions(estado === 'todas' ? undefined : estado);
            if (result.success && result.data) {
                setCommissions(result.data);
            }
        } catch (err) {
            console.error('Error loading commissions:', err);
        }
    };

    const handleTabChange = (tab: typeof activeTab) => {
        setActiveTab(tab);
        loadCommissions(tab);
    };

    const copyCode = () => {
        if (affiliate?.codigo_afiliado) {
            navigator.clipboard.writeText(affiliate.codigo_afiliado);
            showToast('¡Código copiado al portapapeles!', 'success');
        }
    };

    const copyLink = () => {
        if (affiliate?.codigo_afiliado) {
            const link = `${window.location.origin}?ref=${affiliate.codigo_afiliado}`;
            navigator.clipboard.writeText(link);
            showToast('¡Link de referido copiado!', 'success');
        }
    };

    const getStatusBadge = (estado: Commission['estado']) => {
        const styles = {
            pendiente: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            aprobada: 'bg-blue-100 text-blue-700 border-blue-200',
            pagada: 'bg-green-100 text-green-700 border-green-200',
            cancelada: 'bg-red-100 text-red-700 border-red-200',
        };
        const labels = {
            pendiente: 'Pendiente',
            aprobada: 'Aprobada',
            pagada: 'Pagada',
            cancelada: 'Cancelada',
        };
        return (
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[estado]}`}>
                {labels[estado]}
            </span>
        );
    };

    if (!isAuthenticated) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Acceso Restringido</h2>
                <p className="text-gray-500">Debes iniciar sesión para acceder al panel de afiliados.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No disponible</h2>
                <p className="text-gray-500 max-w-md mx-auto">{error}</p>
                <a 
                    href="mailto:contacto@cialo.cl?subject=Programa de Afiliados" 
                    className="mt-4 inline-block px-6 py-2 bg-cialo-gold text-white rounded-lg hover:bg-cialo-gold/90 transition-colors"
                >
                    Contactar para ser afiliado
                </a>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <header>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Panel de Afiliado</h1>
                <p className="text-gray-500 mt-1">Gestiona tus comisiones y comparte tu código</p>
            </header>

            {/* Código de Afiliado */}
            <div className="bg-gradient-to-r from-cialo-gold/10 to-amber-50 rounded-2xl p-6 border border-cialo-gold/20">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-sm text-gray-600 mb-1">Tu código de afiliado</p>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl font-bold text-cialo-gold tracking-wider">
                                {affiliate?.codigo_afiliado}
                            </span>
                            <button
                                onClick={copyCode}
                                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                                title="Copiar código"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Comparte este código y gana {affiliate?.comision_default}% de comisión por cada venta
                        </p>
                    </div>
                    <button
                        onClick={copyLink}
                        className="flex items-center gap-2 px-4 py-2 bg-cialo-gold text-white rounded-lg hover:bg-cialo-gold/90 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Copiar link de referido
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Comisiones Pendientes */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Pendientes</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(stats?.pendientes_monto || 0)}</p>
                    <p className="text-xs text-gray-400">{stats?.pendientes_count || 0} ventas</p>
                </div>

                {/* Comisiones Aprobadas */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Por pagar</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(stats?.aprobadas_monto || 0)}</p>
                    <p className="text-xs text-gray-400">{stats?.aprobadas_count || 0} ventas</p>
                </div>

                {/* Comisiones Pagadas */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Pagadas</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(stats?.pagadas_monto || 0)}</p>
                    <p className="text-xs text-gray-400">{stats?.pagadas_count || 0} ventas</p>
                </div>

                {/* Este Mes */}
                <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-500">Este mes</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(monthlyStats?.comisiones_mes || 0)}</p>
                    <p className="text-xs text-gray-400">{monthlyStats?.ventas_mes || 0} ventas</p>
                </div>
            </div>

            {/* Resumen Total */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Resumen General</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <p className="text-sm text-gray-500">Total en ventas generadas</p>
                        <p className="text-2xl font-bold text-gray-900">{formatPrice(affiliate?.total_ventas || 0)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total comisiones ganadas</p>
                        <p className="text-2xl font-bold text-cialo-gold">{formatPrice(affiliate?.total_comisiones || 0)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Comisiones por cobrar</p>
                        <p className="text-2xl font-bold text-blue-600">
                            {formatPrice((affiliate?.total_comisiones || 0) - (affiliate?.comisiones_pagadas || 0))}
                        </p>
                    </div>
                </div>
            </div>

            {/* Historial de Comisiones */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">Historial de Comisiones</h3>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    {(['todas', 'pendiente', 'aprobada', 'pagada'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-3 text-sm font-medium transition-colors ${
                                activeTab === tab
                                    ? 'text-cialo-gold border-b-2 border-cialo-gold'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab === 'todas' ? 'Todas' : tab.charAt(0).toUpperCase() + tab.slice(1) + 's'}
                        </button>
                    ))}
                </div>

                {/* Table */}
                {commissions.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <p className="text-gray-500">No hay comisiones para mostrar</p>
                        <p className="text-sm text-gray-400 mt-1">¡Comparte tu código para generar ventas!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orden</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venta</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">%</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Comisión</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {commissions.map((commission) => (
                                    <tr key={commission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(commission.created_at).toLocaleDateString('es-CL')}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {commission.order_number || '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {formatPrice(commission.monto_venta)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {commission.porcentaje_comision}%
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-cialo-gold">
                                            {formatPrice(commission.monto_comision)}
                                        </td>
                                        <td className="px-6 py-4">
                                            {getStatusBadge(commission.estado)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Info de Pagos */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-blue-900 mb-1">¿Cómo funcionan los pagos?</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Las comisiones se generan cuando un cliente completa una compra con tu código</li>
                            <li>• Las comisiones pasan a estado &quot;Aprobada&quot; después de verificar la compra</li>
                            <li>• Los pagos se realizan los días 15 y último de cada mes</li>
                            <li>• El monto mínimo para solicitar pago es de $10.000</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
