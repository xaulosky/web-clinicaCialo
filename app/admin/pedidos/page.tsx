'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/lib/types';
import { formatPrice } from '@/lib/cart-store';

export default function PedidosPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<OrderStatus | 'TODOS'>('TODOS');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { getAllOrders } = await import('@/lib/orders-store');
            const ordersData = await getAllOrders();

            const transformedOrders: Order[] = ordersData.map(o => ({
                id: o.id,
                orderNumber: o.order_number,
                retiroCode: o.retiro_code,
                status: o.status as OrderStatus,
                subtotal: o.subtotal,
                total: o.total,
                customer: {
                    nombre: o.customer_name.split(' ')[0] || '',
                    apellido: o.customer_name.split(' ').slice(1).join(' ') || '',
                    email: o.customer_email,
                    telefono: o.customer_phone,
                    rut: o.customer_rut || '',
                },
                paciente: o.paciente_nombre
                    ? {
                        nombre: o.paciente_nombre,
                        apellido: o.paciente_apellido || '',
                        rut: o.paciente_rut || '',
                        telefono: o.paciente_telefono || '',
                    }
                    : undefined,
                items: o.items.map(item => ({
                    id: item.id,
                    type: (item.type || 'producto') as 'producto' | 'tratamiento',
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                })),
                paymentMethod: 'webpay' as const,
                createdAt: new Date(o.created_at),
                updatedAt: new Date(o.updated_at),
            }));

            setOrders(transformedOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (order.retiroCode && order.retiroCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (!!order.paciente && `${order.paciente.nombre} ${order.paciente.apellido}`.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'TODOS' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'PAGADO': return 'bg-green-100 text-green-800';
            case 'PENDIENTE': return 'bg-yellow-100 text-yellow-800';
            case 'COMPLETADO': return 'bg-blue-100 text-blue-800';
            case 'AGENDADO': return 'bg-purple-100 text-purple-800';
            case 'CANCELADO': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-[#1b1a18] font-bold">Pedidos</h1>
                    <p className="text-gray-500 mt-1">Gestión completa de órdenes de compra.</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-cialo-gold hover:border-cialo-gold transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Actualizar Lista
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por cliente, email o nº orden..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-cialo-gold focus:border-cialo-gold sm:text-sm transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-200 focus:outline-none focus:ring-cialo-gold focus:border-cialo-gold sm:text-sm rounded-lg bg-gray-50"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'TODOS')}
                    >
                        <option value="TODOS">Todos los Estados</option>
                        <option value="PAGADO">Pagado</option>
                        <option value="AGENDADO">Agendado</option>
                        <option value="COMPLETADO">Completado</option>
                        <option value="PENDIENTE">Pendiente</option>
                        <option value="CANCELADO">Cancelado</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold mx-auto mb-4"></div>
                        <p className="text-gray-500">Cargando pedidos...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="p-16 text-center text-gray-500">
                        <div className="text-4xl mb-4">🔍</div>
                        <p>No se encontraron pedidos con los filtros actuales.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">ID Orden</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Fecha</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Estado</th>
                                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Monto Total</th>
                                    <th className="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-50">
                                {filteredOrders.map((order) => (
                                    <tr key={order.orderNumber} className="hover:bg-orange-50/30 transition-colors group">
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className="text-sm font-bold text-[#1b1a18] font-mono bg-gray-100 px-2 py-1 rounded">{order.orderNumber}</span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 font-bold text-xs mr-3">
                                                    {order.customer.nombre.charAt(0)}{order.customer.apellido.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-900">{order.customer.nombre} {order.customer.apellido}</div>
                                                    <div className="text-xs text-gray-500">{order.customer.email}</div>
                                                    {order.paciente && (
                                                        <div className="text-xs text-purple-600 font-medium mt-0.5">🩺 Atiende: {order.paciente.nombre} {order.paciente.apellido}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(order.status)} border border-opacity-20`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-[#1b1a18]">
                                            {formatPrice(order.total)}
                                        </td>
                                        <td className="px-8 py-5 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/detalle-pedido?id=${order.id}`}
                                                className="text-cialo-gold hover:text-[#1b1a18] transition-colors flex items-center justify-end gap-1 group-hover:translate-x-1 duration-200"
                                            >
                                                Gestionar
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
