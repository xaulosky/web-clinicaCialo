'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { formatPrice, useCartStore } from '@/lib/cart-store';
import { Order } from '@/lib/types';
import { trackPurchase } from '@/lib/fbpixel';
import { trackPurchase as trackPurchaseOwn } from '@/lib/analytics';

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartCleared = useRef(false);
  const purchaseTracked = useRef(false);

  const orderId = searchParams.get('order');
  const status = searchParams.get('status');
  const reason = searchParams.get('reason');
  const code = searchParams.get('code');

  // Log de entrada a la página de confirmación
  console.log('--- [CONFIRMACION] PAGE LOADED ---');
  console.log('[CONFIRMACION] URL Params:', { orderId, status, reason, code });

  useEffect(() => {
    const loadOrder = async () => {
      console.log('[CONFIRMACION] loadOrder() START', { orderId, status });

      if (orderId) {
        try {
          const { getOrderById } = await import('@/lib/orders-store');
          console.log('[CONFIRMACION] Fetching order by ID:', orderId);
          const orderData = await getOrderById(orderId);

          console.log('[CONFIRMACION] Order data received:', orderData);

          if (orderData) {
            // Transform API response to match Order type
            const transformedOrder: Order = {
              id: orderData.id,
              orderNumber: orderData.order_number,
              retiroCode: orderData.retiro_code,
              status: orderData.status as Order['status'],
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
                agendaUrl: item.agendaUrl,
              })),
              paymentMethod: 'webpay' as const,
              createdAt: new Date(orderData.created_at),
              updatedAt: new Date(orderData.updated_at),
            };

            console.log('[CONFIRMACION] Transformed order:', transformedOrder);
            setOrder(transformedOrder);
            // Limpiar carrito cuando el pago fue exitoso
            const isSuccess = status === 'success' || orderData.status === 'PAGADO';
            console.log('[CONFIRMACION] Payment status check:', { urlStatus: status, orderStatus: orderData.status, isSuccess });
            if (isSuccess && !cartCleared.current) {
              console.log('[CONFIRMACION] Clearing cart...');
              clearCart();
              cartCleared.current = true;
            }

            // Meta Pixel: evento de conversión Purchase (una sola vez)
            if (isSuccess && !purchaseTracked.current) {
              purchaseTracked.current = true;
              trackPurchase({
                orderId: transformedOrder.orderNumber,
                value: transformedOrder.total,
                items: transformedOrder.items.map((i) => ({
                  id: i.id,
                  name: i.name,
                  price: i.price,
                  quantity: i.quantity,
                  type: i.type,
                })),
              });
              // Analítica propia: compra confirmada (cierra el embudo)
              trackPurchaseOwn({
                orderId: transformedOrder.orderNumber,
                value: transformedOrder.total,
              });
            }
          } else {
            console.error('[CONFIRMACION] Order not found for ID:', orderId);
            setError('No se encontró la orden');
          }
        } catch (err) {
          console.error('[CONFIRMACION] Error loading order:', err);
          setError('Error al cargar la orden');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log('[CONFIRMACION] No orderId, checking status:', status);
        if (status === 'cancelled') {
          console.log('[CONFIRMACION] Transaction was cancelled by user');
          setError('La transacción fue anulada por el usuario');
        } else if (status === 'error') {
          console.error('[CONFIRMACION] Error status received, reason:', reason);
          setError(reason === 'order_not_found' ? 'No pudimos encontrar la orden asociada. Si se realizó el cargo, contacta a soporte.' : 'Ocurrió un error al procesar el pago.');
        } else {
          console.warn('[CONFIRMACION] No order specified');
          setError('No se especificó un número de orden válido. Si llegaste aquí por error, vuelve a la tienda.');
        }
      }
    };

    loadOrder();
  }, [orderId, status, clearCart, searchParams]);

  if (loading) {
    return (
      <div className="flex-grow pt-32 pb-20 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Cargando...</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex-grow pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-cialo-dark mb-4">Error</h1>
          <p className="text-gray-500 mb-8">{error || 'Ocurrió un error al procesar tu pedido'}</p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-cialo-gold text-white px-8 py-3 rounded-lg hover:bg-cialo-dark transition-colors"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    );
  }

  const isSuccess = status === 'success' || order.status === 'PAGADO';
  const productos = order.items.filter(item => item.type === 'producto');
  const tratamientos = order.items.filter(item => item.type === 'tratamiento');

  return (
    <div className="flex-grow pt-32 pb-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        {/* Status icon */}
        <div className="text-center mb-8">
          {isSuccess ? (
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-light text-cialo-dark mb-2">
            {isSuccess ? '¡Compra exitosa!' : 'Pago pendiente'}
          </h1>
          <p className="text-gray-500">
            {isSuccess
              ? 'Tu pago ha sido procesado correctamente'
              : 'Tu pago está siendo procesado'}
          </p>
        </div>

        {/* Order details card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
          {/* Header */}
          <div className="bg-cialo-dark px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-cialo-gold text-sm">Número de orden</p>
                <p className="text-white text-xl font-semibold">{order.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-cialo-gold text-sm">Total pagado</p>
                <p className="text-white text-xl font-semibold">{formatPrice(order.total)}</p>
              </div>
            </div>
          </div>

          {/* Retiro code */}
          {productos.length > 0 && order.retiroCode && (
            <div className="px-6 py-4 bg-cialo-gold/10 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cialo-gold rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tu código de retiro</p>
                  <p className="text-2xl font-bold text-cialo-gold tracking-wider">{order.retiroCode}</p>
                  <p className="text-xs text-gray-500">Presenta este código en Clínica Cialo para retirar tus productos</p>
                </div>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="px-6 py-4">
            <h3 className="font-semibold text-cialo-dark mb-4">Detalle del pedido</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${item.type === 'producto' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                      {item.type === 'producto' ? 'Producto' : 'Tratamiento'}
                    </span>
                    <span className="text-gray-800">{item.name}</span>
                    <span className="text-gray-400">×{item.quantity}</span>
                  </div>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Customer info */}
          <div className="px-6 py-4 bg-gray-50">
            <h3 className="font-semibold text-cialo-dark mb-3">Datos de contacto</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Nombre</p>
                <p className="text-gray-800">{order.customer.nombre} {order.customer.apellido}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-800">{order.customer.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Teléfono</p>
                <p className="text-gray-800">{order.customer.telefono}</p>
              </div>
              <div>
                <p className="text-gray-500">RUT</p>
                <p className="text-gray-800">{order.customer.rut}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {productos.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-cialo-dark mb-2">Retira tus productos</h3>
              <p className="text-sm text-gray-600">
                Puedes retirar tus productos en Clínica Cialo presentando tu código de retiro.
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p className="font-medium text-cialo-dark">📍 Bulnes 220, Of. 509</p>
                <p>Los Ángeles, Chile</p>
                <p className="mt-1">Lun - Vie: 8:30 - 20:00</p>
              </div>
            </div>
          )}

          {tratamientos.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-cialo-dark mb-2">Agenda tu cita</h3>
              <p className="text-sm text-gray-600">
                Te contactaremos pronto para agendar tu cita de tratamiento. También puedes escribirnos directamente.
              </p>
              <a
                href="https://wa.me/56982028473"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-green-600 hover:text-green-700"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Contactar por WhatsApp
              </a>
            </div>
          )}
        </div>

        {/* Reservo Agenda - Para agendar después del pago */}
        {isSuccess && tratamientos.filter(t => t.agendaUrl).length > 0 && (
          <div className="space-y-6 mb-8">
            <div className="bg-gradient-to-r from-cialo-gold to-[#c4b190] rounded-xl px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">¡Ahora agenda tus citas!</h3>
                  <p className="text-white/80 text-sm mt-1">
                    {tratamientos.filter(t => t.agendaUrl).length > 1
                      ? `Tienes ${tratamientos.filter(t => t.agendaUrl).length} consultas para agendar. Si no encuentras disponibilidad, te contactaremos.`
                      : 'Si no encuentras disponibilidad, no te preocupes. Te contactaremos vía WhatsApp o llamada para coordinar.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {tratamientos.filter(t => t.agendaUrl).map((tratamiento, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="bg-cialo-dark px-6 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-cialo-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-cialo-gold font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{tratamiento.name}</h4>
                    <p className="text-gray-400 text-xs">Selecciona fecha y hora disponible</p>
                  </div>
                </div>
                <div className="p-4">
                  <iframe
                    src={tratamiento.agendaUrl}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    className="rounded-lg"
                    style={{ overflow: 'hidden' }}
                  />
                </div>
              </div>
            ))}

            <p className="text-xs text-gray-400 text-center">
              Powered by Reservo
            </p>
          </div>
        )}

        {/* Email confirmation */}
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm">
            📧 Hemos enviado un email de confirmación a <strong>{order.customer.email}</strong>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/productos"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-cialo-gold text-cialo-gold rounded-lg hover:bg-cialo-gold hover:text-white transition-colors"
          >
            Seguir comprando
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-cialo-gold text-white rounded-lg hover:bg-cialo-dark transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Suspense fallback={
        <div className="flex-grow pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </div>
      }>
        <ConfirmacionContent />
      </Suspense>
      <Footer />
    </div>
  );
}
