'use client';

import { use, useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Order, OrderStatus } from '@/lib/types';
import { formatPrice } from '@/lib/cart-store';

function OrderDetailsContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchOrder(id);
        } else {
            setLoading(false);
        }
    }, [id]);

    const fetchOrder = async (orderId: string) => {
        try {
            const { getOrderById } = await import('@/lib/orders-store');
            const orderData = await getOrderById(orderId);

            if (orderData) {
                const transformedOrder: Order = {
                    id: orderData.id,
                    orderNumber: orderData.order_number,
                    retiroCode: orderData.retiro_code,
                    status: orderData.status as OrderStatus,
                    subtotal: orderData.subtotal,
                    total: orderData.total,
                    customer: {
                        nombre: orderData.customer_name.split(' ')[0] || '',
                        apellido: orderData.customer_name.split(' ').slice(1).join(' ') || '',
                        email: orderData.customer_email,
                        telefono: orderData.customer_phone,
                        rut: orderData.customer_rut || '',
                    },
                    notes: orderData.notas || undefined,
                    paciente: orderData.paciente_nombre
                        ? {
                            nombre: orderData.paciente_nombre,
                            apellido: orderData.paciente_apellido || '',
                            rut: orderData.paciente_rut || '',
                            telefono: orderData.paciente_telefono || '',
                        }
                        : undefined,
                    items: orderData.items.map(item => ({
                        id: item.id,
                        type: (item.type || 'producto') as 'producto' | 'tratamiento',
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        agendaUrl: item.agendaUrl,
                    })),
                    paymentMethod: 'webpay' as const,
                    createdAt: new Date(orderData.created_at),
                    updatedAt: new Date(orderData.updated_at),
                };
                setOrder(transformedOrder);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus: OrderStatus) => {
        if (!order || !id) return;
        setUpdating(true);
        try {
            const { updateOrder: updateOrderApi } = await import('@/lib/orders-store');
            const updatedData = await updateOrderApi(id, { status: newStatus } as any);

            if (updatedData) {
                const transformedOrder: Order = {
                    id: updatedData.id,
                    orderNumber: updatedData.order_number,
                    retiroCode: updatedData.retiro_code,
                    status: updatedData.status as OrderStatus,
                    subtotal: updatedData.subtotal,
                    total: updatedData.total,
                    customer: {
                        nombre: updatedData.customer_name.split(' ')[0] || '',
                        apellido: updatedData.customer_name.split(' ').slice(1).join(' ') || '',
                        email: updatedData.customer_email,
                        telefono: updatedData.customer_phone,
                        rut: updatedData.customer_rut || '',
                    },
                    notes: updatedData.notas || undefined,
                    paciente: updatedData.paciente_nombre
                        ? {
                            nombre: updatedData.paciente_nombre,
                            apellido: updatedData.paciente_apellido || '',
                            rut: updatedData.paciente_rut || '',
                            telefono: updatedData.paciente_telefono || '',
                        }
                        : undefined,
                    items: updatedData.items.map(item => ({
                        id: item.id,
                        type: (item.type || 'producto') as 'producto' | 'tratamiento',
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
                        agendaUrl: item.agendaUrl,
                    })),
                    paymentMethod: 'webpay' as const,
                    createdAt: new Date(updatedData.created_at),
                    updatedAt: new Date(updatedData.updated_at),
                };
                setOrder(transformedOrder);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-8 text-center bg-gray-50 min-h-screen">Cargando pedido...</div>;
    if (!order) return <div className="p-8 text-center bg-gray-50 min-h-screen">Pedido no encontrado</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/pedidos"
                    className="p-3 bg-white rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-cialo-gold shadow-sm border border-gray-100"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-serif font-bold text-[#1b1a18]">Orden #{order.orderNumber}</h1>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        Creada el {new Date(order.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                <div className="ml-auto">
                    <span className={`px-4 py-2 text-sm font-bold rounded-full border ${order.status === 'PAGADO' ? 'bg-green-50 text-green-700 border-green-200' :
                        order.status === 'PENDIENTE' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            order.status === 'AGENDADO' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                order.status === 'COMPLETADO' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                        {order.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Columna Principal */}
                <div className="md:col-span-2 space-y-8">
                    {/* Items */}
                    <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                            <h2 className="font-bold text-[#1b1a18] flex items-center gap-2">
                                <span className="text-xl">🛍️</span> Detalle de la Compra
                            </h2>
                            <span className="text-sm text-gray-500 font-medium">{order.items.length} items</span>
                        </div>
                        <div className="p-8">
                            <ul className="divide-y divide-gray-100">
                                {order.items.map((item, idx) => (
                                    <li key={`${item.id}-${idx}`} className="py-6 flex gap-6 first:pt-0 last:pb-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm border border-gray-100" />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300">
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <p className="font-bold text-[#1b1a18] text-lg mb-1">{item.name}</p>
                                            <p className="text-sm text-gray-500 font-medium">{item.quantity} x {formatPrice(item.price)}</p>
                                            {item.agendaUrl && (
                                                <a href={item.agendaUrl} target="_blank" className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg mt-3 inline-flex items-center gap-1 hover:bg-green-100 transition-colors">
                                                    📅 Agenda Disponible
                                                </a>
                                            )}
                                        </div>
                                        <div className="font-serif font-bold text-xl text-[#1b1a18]">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 border-t border-gray-100 pt-6 flex justify-between items-end">
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Total Pagado</p>
                                    <p className="text-xs text-gray-400">Impuestos incluidos</p>
                                </div>
                                <span className="text-3xl font-serif font-bold text-cialo-dark">{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Cliente */}
                    <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-bold text-[#1b1a18] flex items-center gap-2">
                                <span className="text-xl">👤</span> Información del Cliente
                            </h2>
                        </div>
                        <div className="p-8 grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nombre Completo</p>
                                <p className="font-medium text-[#1b1a18] text-lg">{order.customer.nombre} {order.customer.apellido}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">RUT</p>
                                <p className="font-medium text-[#1b1a18]">{order.customer.rut}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email</p>
                                <a href={`mailto:${order.customer.email}`} className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 group">
                                    {order.customer.email}
                                    <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </a>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teléfono</p>
                                <a href={`https://wa.me/${order.customer.telefono.replace('+', '')}`} target="_blank" className="text-green-600 hover:text-green-800 font-medium flex items-center gap-2 group">
                                    {order.customer.telefono}
                                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp</span>
                                </a>
                            </div>
                            {order.retiroCode && (
                                <div className="col-span-2 bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">Código de Retiro</p>
                                        <p className="text-sm text-gray-600">Solicitar al cliente para entrega</p>
                                    </div>
                                    <p className="font-mono font-bold text-3xl text-cialo-gold tracking-widest">{order.retiroCode}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Quien se atiende (Paciente) */}
                    {order.paciente && (
                        <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                            <div className="px-8 py-6 border-b border-gray-100 bg-purple-50/50">
                                <h2 className="font-bold text-[#1b1a18] flex items-center gap-2">
                                    <span className="text-xl">🩺</span> Quien se atiende
                                </h2>
                                <p className="text-xs text-gray-500 mt-1">El comprador indicó que el tratamiento es para otra persona.</p>
                            </div>
                            <div className="p-8 grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Nombre del Paciente</p>
                                    <p className="font-medium text-[#1b1a18] text-lg">{order.paciente.nombre} {order.paciente.apellido}</p>
                                </div>
                                {order.paciente.rut && (
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">RUT</p>
                                        <p className="font-medium text-[#1b1a18]">{order.paciente.rut}</p>
                                    </div>
                                )}
                                {order.paciente.telefono && (
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Teléfono</p>
                                        <a href={`https://wa.me/${order.paciente.telefono.replace('+', '')}`} target="_blank" className="text-green-600 hover:text-green-800 font-medium">
                                            {order.paciente.telefono}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Notas del cliente */}
                    {order.notes && (
                        <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                                <h2 className="font-bold text-[#1b1a18] flex items-center gap-2">
                                    <span className="text-xl">📝</span> Notas del Cliente
                                </h2>
                            </div>
                            <div className="p-8">
                                <p className="text-gray-700 whitespace-pre-line">{order.notes}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Columna Lateral (Acciones) */}
                <div className="space-y-8">
                    <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-bold text-[#1b1a18] flex items-center gap-2">
                                <span className="text-xl">⚡</span> Acciones Rápidas
                            </h2>
                        </div>
                        <div className="p-8 space-y-4">
                            <p className="text-sm text-gray-500 mb-4 font-medium">Gestionar estado del pedido:</p>

                            <button
                                onClick={() => updateStatus('AGENDADO')}
                                disabled={order.status === 'AGENDADO' || updating}
                                className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 border flex items-center justify-center gap-2 ${order.status === 'AGENDADO'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200 cursor-default ring-2 ring-purple-100'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 hover:shadow-md hover:-translate-y-0.5'
                                    }`}
                            >
                                <span className="text-lg">🗓️</span> Marcar como Agendado
                            </button>

                            <button
                                onClick={() => updateStatus('COMPLETADO')}
                                disabled={order.status === 'COMPLETADO' || updating}
                                className={`w-full py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 border flex items-center justify-center gap-2 ${order.status === 'COMPLETADO'
                                    ? 'bg-blue-50 text-blue-700 border-blue-200 cursor-default ring-2 ring-blue-100'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 hover:shadow-md hover:-translate-y-0.5'
                                    }`}
                            >
                                <span className="text-lg">✅</span> Marcar como Completado
                            </button>

                            <div className="pt-4 border-t border-gray-100 mt-4">
                                <button
                                    onClick={() => updateStatus('PAGADO')}
                                    disabled={order.status === 'PAGADO' || updating}
                                    className="w-full py-2 px-4 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                >
                                    Restaurar estado a "Pagado"
                                </button>

                                <button
                                    onClick={() => updateStatus('CANCELADO')}
                                    disabled={order.status === 'CANCELADO' || updating}
                                    className="w-full py-2 px-4 rounded-lg text-xs font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors mt-2"
                                >
                                    Cancelar y Anular Pedido
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-xl shadow-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
                            <h2 className="font-bold text-[#1b1a18] flex items-center gap-2">
                                <span className="text-xl">📄</span> Documentación
                            </h2>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 group cursor-pointer hover:border-cialo-gold/30 hover:bg-orange-50/30 transition-all">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-xl border border-gray-100 group-hover:scale-110 transition-transform">
                                    🧾
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-700 group-hover:text-cialo-dark">Comprobante #{order.orderNumber}</p>
                                    <p className="text-xs text-gray-400">Generado automáticamente</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function OrderDetailsPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center bg-gray-50 min-h-screen">Cargando pedido...</div>}>
            <OrderDetailsContent />
        </Suspense>
    );
}
