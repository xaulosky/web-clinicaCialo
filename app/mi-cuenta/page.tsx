'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/auth-store';
import { useCartStore } from '@/lib/cart-store';
import { Order, OrderStatus } from '@/lib/types';
import { formatPrice } from '@/lib/cart-store';
import { useToast } from '@/app/components/Toast';

export default function MiCuentaPage() {
    const { user } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            fetchOrders();
        }
    }, [user?.email]);

    const fetchOrders = async () => {
        try {
            const { getOrdersByEmail } = await import('@/lib/orders-store');
            const ordersData = await getOrdersByEmail(user!.email);

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

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'PAGADO': return 'bg-green-100 text-green-700 border-green-200';
            case 'AGENDADO': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'COMPLETADO': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'CANCELADO': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-yellow-50 text-yellow-700 border-yellow-200';
        }
    };

    const addItem = useCartStore((state) => state.addItem);
    const { showToast } = useToast();

    const handleBuyAgain = (order: Order) => {
        let addedCount = 0;
        order.items.forEach(item => {
            // Solo agregar productos, no tratamientos (los tratamientos requieren agendamiento)
            if (item.type === 'producto') {
                addItem({
                    id: item.id,
                    type: 'producto',
                    name: item.name,
                    price: item.price,
                    image: item.image || '/img/productos/default.jpg',
                    slug: item.id.toString(),
                });
                addedCount++;
            }
        });

        if (addedCount > 0) {
            showToast(
                `${addedCount} producto${addedCount > 1 ? 's agregado' : ' agregado'}${addedCount > 1 ? 's' : ''} al carrito`,
                'success',
                {
                    label: 'Ver carrito',
                    onClick: () => useCartStore.getState().toggleCart(),
                }
            );
        } else {
            showToast(
                'Este pedido solo contiene tratamientos. Los tratamientos deben ser agendados nuevamente.',
                'info'
            );
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center p-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-cialo-gold"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">Mis Pedidos</h1>
                    <p className="text-gray-500 mt-1">Historial de tus compras y tratamientos</p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="p-2 text-gray-400 hover:text-cialo-gold transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
            </header>

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        🛍️
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aún no tienes pedidos</h3>
                    <p className="text-gray-500 mb-6">Explora nuestros tratamientos y productos exclusivos.</p>
                    <Link
                        href="/tratamientos"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-cialo-gold hover:bg-cialo-dark transition-colors"
                    >
                        Ver Tratamientos
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-mono font-bold text-gray-400 text-xs">
                                            #{order.orderNumber.split('-').pop()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Orden {order.orderNumber}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                        <span className="font-serif font-bold text-xl text-cialo-dark">
                                            {formatPrice(order.total)}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-6">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div className="flex -space-x-3 overflow-hidden">
                                            {order.items.slice(0, 3).map((item, idx) => (
                                                <div key={idx} className="relative h-10 w-10 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center overflow-hidden">
                                                    {item.image ? (
                                                        <img src={item.image} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <span className="text-xs">✨</span>
                                                    )}
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="relative h-10 w-10 rounded-full ring-2 ring-white bg-gray-50 flex items-center justify-center text-xs font-medium text-gray-500">
                                                    +{order.items.length - 3}
                                                </div>
                                            )}
                                            <div className="pl-4 flex items-center text-sm text-gray-600 h-10">
                                                <span>
                                                    {order.items.length} {order.items.length === 1 ? 'artículo' : 'artículos'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {order.items.some(item => item.type === 'producto') && (
                                                <button
                                                    onClick={() => handleBuyAgain(order)}
                                                    className="px-4 py-2 border border-cialo-gold text-cialo-gold hover:bg-cialo-gold hover:text-white font-medium rounded-lg text-sm transition-colors"
                                                >
                                                    Comprar de nuevo
                                                </button>
                                            )}
                                            <Link
                                                href={`/mi-cuenta/detalle-pedido?id=${order.id}`}
                                                className="px-6 py-2 bg-gray-50 text-gray-600 hover:text-cialo-gold font-medium rounded-lg text-sm transition-colors"
                                            >
                                                Ver Detalles &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
