'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/lib/types';
import { formatPrice } from '@/lib/cart-store';
import { Badge, Button, Card, CardHeader, EmptyState, Icon, Initials, PageHeader, Spinner, StatCard } from './components/ui';

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { getAllOrders } = await import('@/lib/orders-store');
            const ordersData = await getAllOrders();

            // Transform API response to match Order type
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

    const statusBadge = (status: OrderStatus) => {
        const map: Record<string, { tone: 'green' | 'amber' | 'blue' | 'violet' | 'red' | 'neutral'; label: string }> = {
            PAGADO: { tone: 'green', label: 'Pagado' },
            PENDIENTE: { tone: 'amber', label: 'Pendiente' },
            COMPLETADO: { tone: 'blue', label: 'Completado' },
            AGENDADO: { tone: 'violet', label: 'Agendado' },
            CANCELADO: { tone: 'red', label: 'Cancelado' },
        };
        const s = map[status] ?? { tone: 'neutral' as const, label: status };
        return <Badge tone={s.tone}>{s.label}</Badge>;
    };

    // KPIs
    const ventasValidas = orders.filter(o => o.status === 'PAGADO' || o.status === 'AGENDADO' || o.status === 'COMPLETADO');
    const totalVentas = ventasValidas.reduce((acc, curr) => acc + curr.total, 0);

    // Ventas del mes en curso
    const now = new Date();
    const ventasMes = ventasValidas
        .filter(o => {
            const d = new Date(o.createdAt);
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        .reduce((acc, curr) => acc + curr.total, 0);

    const pedidosPendientes = orders.filter(o => o.status === 'PAGADO').length; // Pagados pero no procesados/agendados
    const agendados = orders.filter(o => o.status === 'AGENDADO').length;

    // Últimas órdenes para el resumen del dashboard
    const recentOrders = orders.slice(0, 8);

    return (
        <div>
            <PageHeader
                title="Resumen general"
                description="Ventas y pedidos de la tienda online de Clínica Cialo."
                actions={
                    <Button onClick={fetchOrders}>
                        <Icon name="refresh" /> Actualizar
                    </Button>
                }
            />

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                    label="Ventas totales"
                    value={formatPrice(totalVentas)}
                    icon="wallet"
                    tone="gold"
                    hint={<><span className="font-medium text-emerald-700">{formatPrice(ventasMes)}</span> este mes</>}
                />
                <StatCard label="Pedidos por gestionar" value={String(pedidosPendientes)} icon="bag" tone="blue" hint="Pagados, aún sin procesar" />
                <StatCard label="Agendados" value={String(agendados)} icon="calendar" tone="violet" hint="Con hora reservada" />
            </div>

            <Card>
                <CardHeader
                    title="Últimas transacciones"
                    description="Los 8 pedidos más recientes"
                    actions={
                        orders.length > 0 && (
                            <Link href="/admin/pedidos" className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-ink">
                                Ver todos <Icon name="arrowRight" className="h-3.5 w-3.5" />
                            </Link>
                        )
                    }
                />

                {loading ? (
                    <Spinner label="Cargando pedidos…" />
                ) : orders.length === 0 ? (
                    <EmptyState title="Aún no hay pedidos" description="Cuando alguien compre en la tienda online aparecerá aquí." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead>
                                <tr className="text-left uppercase">
                                    <th className="px-5 py-2.5">Orden</th>
                                    <th className="px-5 py-2.5">Cliente</th>
                                    <th className="px-5 py-2.5">Fecha</th>
                                    <th className="px-5 py-2.5">Estado</th>
                                    <th className="px-5 py-2.5 text-right">Total</th>
                                    <th className="px-5 py-2.5"><span className="sr-only">Acciones</span></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentOrders.map((order) => {
                                    const nombre = `${order.customer.nombre} ${order.customer.apellido}`.trim();
                                    return (
                                        <tr key={order.orderNumber}>
                                            <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-olive">{order.orderNumber}</td>
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-3">
                                                    <Initials name={nombre} />
                                                    <div className="min-w-0">
                                                        <div className="truncate font-medium text-ink">{nombre}</div>
                                                        <div className="truncate text-xs text-olive">{order.customer.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3 text-olive">
                                                {new Date(order.createdAt).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3">{statusBadge(order.status)}</td>
                                            <td className="whitespace-nowrap px-5 py-3 text-right font-medium text-ink">{formatPrice(order.total)}</td>
                                            <td className="whitespace-nowrap px-5 py-3 text-right">
                                                <Link
                                                    href={`/admin/detalle-pedido?id=${order.id}`}
                                                    className="inline-flex items-center gap-1 text-sm font-medium text-gold-dark hover:text-ink"
                                                >
                                                    Gestionar <Icon name="arrowRight" className="h-3.5 w-3.5" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}
