'use client';

import { use, useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { Order, OrderStatus } from '@/lib/types';
import { formatPrice } from '@/lib/cart-store';
import { useAuthStore } from '@/lib/auth-store';

function OrderDetailsContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { user } = useAuthStore();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

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

            if (orderData && user && orderData.customer_email.toLowerCase() === user.email.toLowerCase()) {
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
                    items: orderData.items.map(item => ({
                        id: item.id,
                        type: (item.type || 'producto') as 'producto' | 'tratamiento',
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image,
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

    if (loading) return (
        <div className="flex justify-center p-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold"></div>
        </div>
    );

    if (!order) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900">Pedido no encontrado</h2>
            <Link href="/mi-cuenta" className="text-cialo-gold hover:underline mt-4 inline-block">Volver a mis pedidos</Link>
        </div>
    );

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'PAGADO': return 'bg-green-100 text-green-700 border-green-200';
            case 'AGENDADO': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'COMPLETADO': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'CANCELADO': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/mi-cuenta"
                    className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-cialo-gold shadow-sm border border-gray-100"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-serif font-bold text-gray-900">Orden #{order.orderNumber}</h1>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Realizada el {new Date(order.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-900">
                            Resumen de compra
                        </div>
                        <div className="p-6">
                            <ul className="divide-y divide-gray-100">
                                {order.items.map((item, idx) => (
                                    <li key={`${item.id}-${idx}`} className="py-4 flex gap-4 first:pt-0 last:pb-0">
                                        <div className="h-16 w-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-gray-300">🖼️</div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                                        </div>
                                        <div className="font-bold text-gray-900">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 border-t border-gray-100 pt-4 flex justify-between items-end">
                                <span className="text-gray-500">Total Pagado</span>
                                <span className="text-2xl font-serif font-bold text-cialo-dark">{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    {order.retiroCode && (order.status === 'PAGADO' || order.status === 'PENDIENTE') && (
                        <div className="bg-gradient-to-r from-cialo-gold to-[#c4b190] rounded-2xl shadow-lg shadow-yellow-100 text-white p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <h3 className="text-lg font-bold mb-1 relative z-10">Código de Retiro</h3>
                            <p className="text-white/80 text-sm mb-4 max-w-sm relative z-10">
                                Presenta este código en recepción para retirar tus productos.
                            </p>
                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30 relative z-10">
                                <span className="font-mono text-3xl font-bold tracking-[0.2em]">{order.retiroCode}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Si tienes dudas sobre tu pedido o quieres reagendar tu hora, contáctanos.
                        </p>
                        <a
                            href="https://wa.me/56982028473"
                            target="_blank"
                            className="block w-full py-3 bg-green-50 text-green-700 font-bold text-center rounded-xl hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            Contactar Soporte
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DetallePedidoPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold"></div></div>}>
            <OrderDetailsContent />
        </Suspense>
    );
}
