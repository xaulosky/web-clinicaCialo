'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Commission {
    id: string;
    affiliate_id: string;
    affiliate_nombre: string;
    affiliate_email: string;
    affiliate_banco: string | null;
    affiliate_numero_cuenta: string | null;
    order_id: string;
    order_number: string | null;
    coupon_code: string;
    monto_venta: number;
    monto_comision: number;
    porcentaje_comision: number;
    estado: 'pendiente' | 'aprobada' | 'pagada' | 'cancelada';
    fecha_pago: string | null;
    notas: string | null;
    created_at: string;
}

interface CommissionStats {
    total_comisiones: number;
    comisiones_pendientes: number;
    comisiones_aprobadas: number;
    comisiones_pagadas: number;
    monto_pendiente: number;
    monto_aprobado: number;
    monto_pagado: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

export default function ComisionesPage() {
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [stats, setStats] = useState<CommissionStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [selectedCommissions, setSelectedCommissions] = useState<string[]>([]);
    const [bulkAction, setBulkAction] = useState<string>('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        fetchCommissions();
        fetchStats();
    }, [filter]);

    const fetchCommissions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            let url = `${API_URL}/commissions`;
            if (filter !== 'all') {
                url += `?estado=${filter}`;
            }
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setCommissions(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/commissions/stats`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAction = async (commissionId: string, action: 'approve' | 'pay' | 'cancel') => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/commissions/${commissionId}/${action}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchCommissions();
                fetchStats();
            } else {
                alert(data.message || 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBulkPay = async () => {
        if (selectedCommissions.length === 0) {
            alert('Selecciona al menos una comisión');
            return;
        }
        if (!confirm(`¿Marcar ${selectedCommissions.length} comisiones como pagadas?`)) return;

        setProcessing(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/commissions/bulk-pay`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ commission_ids: selectedCommissions })
            });
            const data = await res.json();
            if (data.success) {
                setSelectedCommissions([]);
                fetchCommissions();
                fetchStats();
                alert(`${data.data.pagadas} comisiones marcadas como pagadas`);
            } else {
                alert(data.message || 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            setProcessing(false);
        }
    };

    const toggleSelectAll = () => {
        const approvable = commissions.filter(c => c.estado === 'aprobada');
        if (selectedCommissions.length === approvable.length) {
            setSelectedCommissions([]);
        } else {
            setSelectedCommissions(approvable.map(c => c.id));
        }
    };

    const toggleSelect = (id: string) => {
        if (selectedCommissions.includes(id)) {
            setSelectedCommissions(selectedCommissions.filter(c => c !== id));
        } else {
            setSelectedCommissions([...selectedCommissions, id]);
        }
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'pendiente': return 'bg-yellow-100 text-yellow-800';
            case 'aprobada': return 'bg-blue-100 text-blue-800';
            case 'pagada': return 'bg-green-100 text-green-800';
            case 'cancelada': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const approvableCommissions = commissions.filter(c => c.estado === 'aprobada');

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-[#1b1a18] font-bold">Comisiones</h1>
                    <p className="text-gray-500 mt-1">Gestiona los pagos a afiliados</p>
                </div>
                {selectedCommissions.length > 0 && (
                    <button
                        onClick={handleBulkPay}
                        disabled={processing}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Pagar {selectedCommissions.length} seleccionadas
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-yellow-600">${stats.monto_pendiente?.toLocaleString() || 0}</div>
                        <div className="text-sm text-gray-500">Pendientes ({stats.comisiones_pendientes || 0})</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">${stats.monto_aprobado?.toLocaleString() || 0}</div>
                        <div className="text-sm text-gray-500">Aprobadas ({stats.comisiones_aprobadas || 0})</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">${stats.monto_pagado?.toLocaleString() || 0}</div>
                        <div className="text-sm text-gray-500">Pagadas ({stats.comisiones_pagadas || 0})</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-gray-900">{stats.total_comisiones || 0}</div>
                        <div className="text-sm text-gray-500">Total Comisiones</div>
                    </div>
                </div>
            )}

            {/* Filtros */}
            <div className="flex gap-2 mb-6">
                {['all', 'pendiente', 'aprobada', 'pagada', 'cancelada'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === f 
                                ? 'bg-cialo-gold text-white' 
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        {f === 'all' ? 'Todas' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold mx-auto"></div>
                    </div>
                ) : commissions.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No hay comisiones registradas
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                {approvableCommissions.length > 0 && filter === 'aprobada' && (
                                    <th className="px-4 py-4 text-left">
                                        <input
                                            type="checkbox"
                                            checked={selectedCommissions.length === approvableCommissions.length && approvableCommissions.length > 0}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 text-cialo-gold rounded focus:ring-cialo-gold"
                                        />
                                    </th>
                                )}
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Afiliado</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Orden</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Venta</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Comisión</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {commissions.map(commission => (
                                <tr key={commission.id} className="hover:bg-gray-50">
                                    {approvableCommissions.length > 0 && filter === 'aprobada' && (
                                        <td className="px-4 py-4">
                                            {commission.estado === 'aprobada' && (
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCommissions.includes(commission.id)}
                                                    onChange={() => toggleSelect(commission.id)}
                                                    className="w-4 h-4 text-cialo-gold rounded focus:ring-cialo-gold"
                                                />
                                            )}
                                        </td>
                                    )}
                                    <td className="px-6 py-4">
                                        <Link href="/admin/afiliados" className="hover:text-cialo-gold">
                                            <div className="font-medium text-gray-900">{commission.affiliate_nombre}</div>
                                            <div className="text-sm text-gray-500">{commission.affiliate_email}</div>
                                        </Link>
                                        {commission.affiliate_banco && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                {commission.affiliate_banco} - {commission.affiliate_numero_cuenta}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/detalle-pedido?id=${commission.order_id}`} className="text-cialo-gold hover:underline font-mono text-sm">
                                            #{commission.order_number || commission.order_id.slice(0, 8)}
                                        </Link>
                                        <div className="text-xs text-gray-500 mt-1">
                                            Cupón: {commission.coupon_code}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        ${commission.monto_venta.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-green-600">${commission.monto_comision.toLocaleString()}</div>
                                        <div className="text-xs text-gray-500">{commission.porcentaje_comision}%</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(commission.estado)}`}>
                                            {commission.estado}
                                        </span>
                                        {commission.fecha_pago && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {new Date(commission.fecha_pago).toLocaleDateString()}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {commission.estado === 'pendiente' && (
                                                <>
                                                    <button
                                                        onClick={() => handleAction(commission.id, 'approve')}
                                                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                                                    >
                                                        Aprobar
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(commission.id, 'cancel')}
                                                        className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            )}
                                            {commission.estado === 'aprobada' && (
                                                <button
                                                    onClick={() => handleAction(commission.id, 'pay')}
                                                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                                >
                                                    Marcar Pagada
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
