'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Coupon {
    id: string;
    code: string;
    categoria: 'descuento' | 'personal' | 'afiliado';
    tipo: 'porcentaje' | 'monto';
    valor: number;
    descripcion: string | null;
    min_compra: number | null;
    max_usos: number | null;
    usos_actuales: number;
    fecha_inicio: string | null;
    fecha_fin: string | null;
    afiliado_id: string | null;
    afiliado_nombre: string | null;
    comision_porcentaje: number | null;
    activo: number;
    created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

export default function CuponesPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [formData, setFormData] = useState({
        code: '',
        categoria: 'descuento' as 'descuento' | 'personal' | 'afiliado',
        tipo: 'porcentaje' as 'porcentaje' | 'monto',
        valor: '',
        descripcion: '',
        min_compra: '',
        max_usos: '',
        fecha_inicio: '',
        fecha_fin: '',
        activo: true
    });
    const [saving, setSaving] = useState(false);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/coupons`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setCoupons(data.data);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('adminToken');
            const url = editingCoupon 
                ? `${API_URL}/coupons/${editingCoupon.id}`
                : `${API_URL}/coupons`;
            
            const res = await fetch(url, {
                method: editingCoupon ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    valor: parseFloat(formData.valor),
                    min_compra: formData.min_compra ? parseFloat(formData.min_compra) : null,
                    max_usos: formData.max_usos ? parseInt(formData.max_usos) : null,
                    fecha_inicio: formData.fecha_inicio || null,
                    fecha_fin: formData.fecha_fin || null,
                    activo: formData.activo ? 1 : 0
                })
            });

            const data = await res.json();
            if (data.success) {
                fetchCoupons();
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
        if (!confirm('¿Estás seguro de eliminar este cupón?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${API_URL}/coupons/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchCoupons();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const openModal = (coupon?: Coupon) => {
        if (coupon) {
            setEditingCoupon(coupon);
            setFormData({
                code: coupon.code,
                categoria: coupon.categoria,
                tipo: coupon.tipo,
                valor: coupon.valor.toString(),
                descripcion: coupon.descripcion || '',
                min_compra: coupon.min_compra?.toString() || '',
                max_usos: coupon.max_usos?.toString() || '',
                fecha_inicio: coupon.fecha_inicio?.split('T')[0] || '',
                fecha_fin: coupon.fecha_fin?.split('T')[0] || '',
                activo: coupon.activo === 1
            });
        } else {
            setEditingCoupon(null);
            setFormData({
                code: '',
                categoria: 'descuento',
                tipo: 'porcentaje',
                valor: '',
                descripcion: '',
                min_compra: '',
                max_usos: '',
                fecha_inicio: '',
                fecha_fin: '',
                activo: true
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCoupon(null);
    };

    const filteredCoupons = coupons.filter(c => {
        if (filter === 'all') return true;
        return c.categoria === filter;
    });

    const getCategoriaColor = (cat: string) => {
        switch (cat) {
            case 'descuento': return 'bg-blue-100 text-blue-800';
            case 'personal': return 'bg-purple-100 text-purple-800';
            case 'afiliado': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-[#1b1a18] font-bold">Cupones</h1>
                    <p className="text-gray-500 mt-1">Gestiona los cupones de descuento, personal y afiliados</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-6 py-3 bg-cialo-gold text-white rounded-xl font-medium hover:bg-cialo-dark transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Nuevo Cupón
                </button>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 mb-6">
                {['all', 'descuento', 'personal', 'afiliado'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === f 
                                ? 'bg-cialo-gold text-white' 
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                        }`}
                    >
                        {f === 'all' ? 'Todos' : f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-100 border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold mx-auto"></div>
                    </div>
                ) : filteredCoupons.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        No hay cupones registrados
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Código</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Categoría</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Descuento</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Usos</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Vigencia</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredCoupons.map(coupon => (
                                <tr key={coupon.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-mono font-bold text-cialo-dark">{coupon.code}</div>
                                        {coupon.descripcion && (
                                            <div className="text-xs text-gray-500 mt-1">{coupon.descripcion}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoriaColor(coupon.categoria)}`}>
                                            {coupon.categoria}
                                        </span>
                                        {coupon.afiliado_nombre && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                👤 {coupon.afiliado_nombre}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium">
                                        {coupon.tipo === 'porcentaje' ? `${coupon.valor}%` : `$${coupon.valor.toLocaleString()}`}
                                        {coupon.comision_porcentaje && (
                                            <div className="text-xs text-green-600 mt-1">
                                                Comisión: {coupon.comision_porcentaje}%
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {coupon.usos_actuales}{coupon.max_usos ? `/${coupon.max_usos}` : ''}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {coupon.fecha_inicio || coupon.fecha_fin ? (
                                            <>
                                                {coupon.fecha_inicio && <div>Desde: {new Date(coupon.fecha_inicio).toLocaleDateString()}</div>}
                                                {coupon.fecha_fin && <div>Hasta: {new Date(coupon.fecha_fin).toLocaleDateString()}</div>}
                                            </>
                                        ) : (
                                            <span className="text-gray-400">Sin límite</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            coupon.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {coupon.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => openModal(coupon)}
                                                className="p-2 text-gray-400 hover:text-cialo-gold transition-colors"
                                                title="Editar"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(coupon.id)}
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
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingCoupon ? 'Editar Cupón' : 'Nuevo Cupón'}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={e => setFormData({...formData, code: e.target.value.toUpperCase()})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        placeholder="CODIGO20"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                                    <select
                                        value={formData.categoria}
                                        onChange={e => setFormData({...formData, categoria: e.target.value as 'descuento' | 'personal' | 'afiliado'})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                    >
                                        <option value="descuento">Descuento</option>
                                        <option value="personal">Personal</option>
                                        <option value="afiliado">Afiliado</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                    <select
                                        value={formData.tipo}
                                        onChange={e => setFormData({...formData, tipo: e.target.value as 'porcentaje' | 'monto'})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                    >
                                        <option value="porcentaje">Porcentaje (%)</option>
                                        <option value="monto">Monto fijo ($)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                                    <input
                                        type="number"
                                        value={formData.valor}
                                        onChange={e => setFormData({...formData, valor: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        placeholder={formData.tipo === 'porcentaje' ? '10' : '5000'}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Compra mínima</label>
                                    <input
                                        type="number"
                                        value={formData.min_compra}
                                        onChange={e => setFormData({...formData, min_compra: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        placeholder="Opcional"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Máx. usos</label>
                                    <input
                                        type="number"
                                        value={formData.max_usos}
                                        onChange={e => setFormData({...formData, max_usos: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        placeholder="Sin límite"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_inicio}
                                        onChange={e => setFormData({...formData, fecha_inicio: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                                    <input
                                        type="date"
                                        value={formData.fecha_fin}
                                        onChange={e => setFormData({...formData, fecha_fin: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                    <input
                                        type="text"
                                        value={formData.descripcion}
                                        onChange={e => setFormData({...formData, descripcion: e.target.value})}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-transparent"
                                        placeholder="Descripción opcional"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.activo}
                                            onChange={e => setFormData({...formData, activo: e.target.checked})}
                                            className="w-4 h-4 text-cialo-gold rounded focus:ring-cialo-gold"
                                        />
                                        <span className="text-sm text-gray-700">Cupón activo</span>
                                    </label>
                                </div>
                            </div>
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
        </div>
    );
}
