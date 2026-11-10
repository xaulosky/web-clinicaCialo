'use client';

import { useEffect, useState } from 'react';

interface Affiliate {
    id: string;
    nombre: string;
    email: string;
    telefono: string | null;
    codigo_afiliado: string;
    coupon_id: string | null;
    coupon_code: string | null;
    comision_default: number;
    banco: string | null;
    tipo_cuenta: string | null;
    numero_cuenta: string | null;
    rut: string | null;
    total_ventas: number;
    total_comisiones: number;
    comisiones_pendientes: number;
    comisiones_pagadas: number;
    activo: number;
    created_at: string;
}

interface AffiliateStats {
    total_afiliados: number;
    afiliados_activos: number;
    total_ventas: number;
    total_comisiones: number;
    comisiones_pendientes: number;
}

interface Commission {
    id: string;
    order_id: string;
    monto_venta: number;
    monto_comision: number;
    porcentaje_comision: number;
    estado: 'pendiente' | 'aprobada' | 'pagada' | 'cancelada';
    fecha_pago: string | null;
    notas: string | null;
    created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

export default function AfiliadosPage() {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [stats, setStats] = useState<AffiliateStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        codigo_afiliado: '',
        comision_default: '10',
        banco: '',
        tipo_cuenta: '',
        numero_cuenta: '',
        rut: '',
        activo: true
    });
    const [saving, setSaving] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedAffiliate, setSelectedAffiliate] = useState<Affiliate | null>(null);
    const [commissions, setCommissions] = useState<Commission[]>([]);
    const [loadingCommissions, setLoadingCommissions] = useState(false);

    useEffect(() => {
        fetchAffiliates();
        fetchStats();
    }, []);

    const fetchAffiliates = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/affiliates`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setAffiliates(data.data);
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
            const res = await fetch(`${API_URL}/affiliates/stats`, {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('adminToken');
            const url = editingAffiliate 
                ? `${API_URL}/affiliates/${editingAffiliate.id}`
                : `${API_URL}/affiliates`;
            
            const res = await fetch(url, {
                method: editingAffiliate ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    comision_default: parseFloat(formData.comision_default),
                    activo: formData.activo ? 1 : 0
                })
            });

            const data = await res.json();
            if (data.success) {
                fetchAffiliates();
                fetchStats();
                closeModal();
            } else {
                alert(data.message || 'Error al guardar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este afiliado?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/affiliates/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchAffiliates();
                fetchStats();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const openModal = (affiliate?: Affiliate) => {
        if (affiliate) {
            setEditingAffiliate(affiliate);
            setFormData({
                nombre: affiliate.nombre,
                email: affiliate.email,
                telefono: affiliate.telefono || '',
                codigo_afiliado: affiliate.codigo_afiliado,
                comision_default: affiliate.comision_default.toString(),
                banco: affiliate.banco || '',
                tipo_cuenta: affiliate.tipo_cuenta || '',
                numero_cuenta: affiliate.numero_cuenta || '',
                rut: affiliate.rut || '',
                activo: affiliate.activo === 1
            });
        } else {
            setEditingAffiliate(null);
            setFormData({
                nombre: '',
                email: '',
                telefono: '',
                codigo_afiliado: '',
                comision_default: '10',
                banco: '',
                tipo_cuenta: '',
                numero_cuenta: '',
                rut: '',
                activo: true
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingAffiliate(null);
    };

    const openDetailModal = async (affiliate: Affiliate) => {
        setSelectedAffiliate(affiliate);
        setShowDetailModal(true);
        setLoadingCommissions(true);
        
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/commissions?affiliate_id=${affiliate.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setCommissions(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoadingCommissions(false);
        }
    };

    const closeDetailModal = () => {
        setShowDetailModal(false);
        setSelectedAffiliate(null);
        setCommissions([]);
    };

    const handleCommissionAction = async (commissionId: string, action: 'approve' | 'pay' | 'cancel') => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/commissions/${commissionId}/${action}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                // Recargar comisiones y datos
                if (selectedAffiliate) {
                    openDetailModal(selectedAffiliate);
                }
                fetchAffiliates();
                fetchStats();
            } else {
                alert(data.message || 'Error');
            }
        } catch (error) {
            console.error('Error:', error);
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

    const generateCode = () => {
        const prefix = formData.nombre.split(' ')[0]?.toUpperCase().slice(0, 4) || 'AFIL';
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        setFormData({...formData, codigo_afiliado: `${prefix}${random}`});
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-[#1b1a18] font-bold">Afiliados</h1>
                    <p className="text-gray-500 mt-1">Gestiona el programa de afiliados</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-6 py-3 bg-cialo-gold text-white rounded-xl font-medium hover:bg-cialo-dark transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevo Afiliado
                </button>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-5 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-gray-900">{stats.total_afiliados}</div>
                        <div className="text-sm text-gray-500">Total Afiliados</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-green-600">{stats.afiliados_activos}</div>
                        <div className="text-sm text-gray-500">Activos</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-blue-600">${stats.total_ventas?.toLocaleString() || 0}</div>
                        <div className="text-sm text-gray-500">Total Ventas</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-purple-600">${stats.total_comisiones?.toLocaleString() || 0}</div>
                        <div className="text-sm text-gray-500">Total Comisiones</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-orange-600">${stats.comisiones_pendientes?.toLocaleString() || 0}</div>
                        <div className="text-sm text-gray-500">Por Pagar</div>
                    </div>
                </div>
            )}

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold mx-auto"></div>
                    </div>
                ) : affiliates.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No hay afiliados registrados
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Afiliado</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Código</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Comisión</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Ventas</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Comisiones</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {affiliates.map(affiliate => (
                                <tr key={affiliate.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{affiliate.nombre}</div>
                                        <div className="text-sm text-gray-500">{affiliate.email}</div>
                                        {affiliate.telefono && (
                                            <div className="text-xs text-gray-400">{affiliate.telefono}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-mono font-bold text-cialo-gold">{affiliate.codigo_afiliado}</div>
                                        {affiliate.coupon_code && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                Cupón: <span className="font-mono">{affiliate.coupon_code}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {affiliate.comision_default}%
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">
                                            ${(affiliate.total_ventas || 0).toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            <div className="text-green-600">Pagadas: ${(affiliate.comisiones_pagadas || 0).toLocaleString()}</div>
                                            <div className="text-orange-600">Pendientes: ${(affiliate.comisiones_pendientes || 0).toLocaleString()}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            affiliate.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {affiliate.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openDetailModal(affiliate)}
                                                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                title="Ver detalle"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openModal(affiliate)}
                                                className="p-2 text-gray-400 hover:text-cialo-gold transition-colors"
                                                title="Editar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(affiliate.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Eliminar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingAffiliate ? 'Editar Afiliado' : 'Nuevo Afiliado'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Datos Personales */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Datos Personales</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                                        <input
                                            type="text"
                                            value={formData.nombre}
                                            onChange={e => setFormData({...formData, nombre: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({...formData, email: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                        <input
                                            type="text"
                                            value={formData.telefono}
                                            onChange={e => setFormData({...formData, telefono: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                                        <input
                                            type="text"
                                            value={formData.rut}
                                            onChange={e => setFormData({...formData, rut: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                            placeholder="12.345.678-9"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Configuración Afiliado */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Configuración Afiliado</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Código afiliado</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={formData.codigo_afiliado}
                                                onChange={e => setFormData({...formData, codigo_afiliado: e.target.value.toUpperCase()})}
                                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent font-mono"
                                                placeholder="CODIGO123"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={generateCode}
                                                className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                            >
                                                Generar
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Comisión (%)</label>
                                        <input
                                            type="number"
                                            value={formData.comision_default}
                                            onChange={e => setFormData({...formData, comision_default: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                            min="0"
                                            max="100"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Datos Bancarios */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Datos Bancarios (para pagos)</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Banco</label>
                                        <select
                                            value={formData.banco}
                                            onChange={e => setFormData({...formData, banco: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="Banco Estado">Banco Estado</option>
                                            <option value="Banco Santander">Banco Santander</option>
                                            <option value="Banco de Chile">Banco de Chile</option>
                                            <option value="BCI">BCI</option>
                                            <option value="Scotiabank">Scotiabank</option>
                                            <option value="BICE">BICE</option>
                                            <option value="Itaú">Itaú</option>
                                            <option value="Falabella">Banco Falabella</option>
                                            <option value="Security">Banco Security</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de cuenta</label>
                                        <select
                                            value={formData.tipo_cuenta}
                                            onChange={e => setFormData({...formData, tipo_cuenta: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="Cuenta Corriente">Cuenta Corriente</option>
                                            <option value="Cuenta Vista">Cuenta Vista</option>
                                            <option value="Cuenta RUT">Cuenta RUT</option>
                                            <option value="Cuenta de Ahorro">Cuenta de Ahorro</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Número de cuenta</label>
                                        <input
                                            type="text"
                                            value={formData.numero_cuenta}
                                            onChange={e => setFormData({...formData, numero_cuenta: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.activo}
                                        onChange={e => setFormData({...formData, activo: e.target.checked})}
                                        className="w-4 h-4 text-cialo-gold rounded focus:ring-cialo-gold"
                                    />
                                    <span className="text-sm text-gray-700">Afiliado activo</span>
                                </label>
                            </div>

                            {!editingAffiliate && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                                    <strong>Nota:</strong> Al crear el afiliado, se creará automáticamente un cupón con su código que otorgará un 10% de descuento a los clientes.
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-4 py-2 bg-cialo-gold text-white rounded-lg hover:bg-cialo-dark transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Guardando...' : 'Guardar'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Detalle */}
            {showDetailModal && selectedAffiliate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">{selectedAffiliate.nombre}</h2>
                                <p className="text-gray-500">{selectedAffiliate.email}</p>
                            </div>
                            <button onClick={closeDetailModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xl font-bold text-gray-900">${(selectedAffiliate.total_ventas || 0).toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Total Ventas</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xl font-bold text-purple-600">${(selectedAffiliate.total_comisiones || 0).toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Total Comisiones</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xl font-bold text-green-600">${(selectedAffiliate.comisiones_pagadas || 0).toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Pagadas</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <div className="text-xl font-bold text-orange-600">${(selectedAffiliate.comisiones_pendientes || 0).toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Pendientes</div>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-6 mb-6">
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-900 mb-3">Información</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Código:</span>
                                            <span className="font-mono font-bold text-cialo-gold">{selectedAffiliate.codigo_afiliado}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Cupón:</span>
                                            <span className="font-mono">{selectedAffiliate.coupon_code || '-'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Comisión:</span>
                                            <span>{selectedAffiliate.comision_default}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">RUT:</span>
                                            <span>{selectedAffiliate.rut || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h4 className="font-semibold text-gray-900 mb-3">Datos Bancarios</h4>
                                    {selectedAffiliate.banco ? (
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Banco:</span>
                                                <span>{selectedAffiliate.banco}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Tipo:</span>
                                                <span>{selectedAffiliate.tipo_cuenta || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">N° Cuenta:</span>
                                                <span className="font-mono">{selectedAffiliate.numero_cuenta || '-'}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-400">Sin datos bancarios</p>
                                    )}
                                </div>
                            </div>

                            {/* Commissions Table */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Historial de Comisiones</h4>
                                {loadingCommissions ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cialo-gold mx-auto"></div>
                                    </div>
                                ) : commissions.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">No hay comisiones registradas</div>
                                ) : (
                                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Orden</th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fecha</th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Venta</th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Comisión</th>
                                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                                                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {commissions.map(commission => (
                                                    <tr key={commission.id}>
                                                        <td className="px-4 py-3 font-mono text-xs">#{commission.order_id.slice(0, 8)}</td>
                                                        <td className="px-4 py-3 text-gray-600">{new Date(commission.created_at).toLocaleDateString()}</td>
                                                        <td className="px-4 py-3">${commission.monto_venta.toLocaleString()}</td>
                                                        <td className="px-4 py-3">
                                                            <span className="font-medium text-green-600">${commission.monto_comision.toLocaleString()}</span>
                                                            <span className="text-gray-400 text-xs ml-1">({commission.porcentaje_comision}%)</span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(commission.estado)}`}>
                                                                {commission.estado}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            {commission.estado === 'pendiente' && (
                                                                <div className="flex justify-end gap-1">
                                                                    <button onClick={() => handleCommissionAction(commission.id, 'approve')} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">Aprobar</button>
                                                                    <button onClick={() => handleCommissionAction(commission.id, 'cancel')} className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">Cancelar</button>
                                                                </div>
                                                            )}
                                                            {commission.estado === 'aprobada' && (
                                                                <button onClick={() => handleCommissionAction(commission.id, 'pay')} className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">Marcar Pagada</button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
