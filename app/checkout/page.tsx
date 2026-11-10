'use client';

import { useCartStore, formatPrice } from '@/lib/cart-store';
import { useAuthStore } from '@/lib/auth-store';
import { couponsApi, CouponValidation } from '@/lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { trackInitiateCheckout } from '@/lib/fbpixel';
import { trackBeginCheckout } from '@/lib/analytics';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, getTotal, clearCart, removeItem } = useCartStore();
  const { user, isAuthenticated, checkSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Estado para cupón
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponValidation | null>(null);
  const [couponError, setCouponError] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    rut: '',
    notas: '',
  });

  // Datos de quien se atiende (paciente). Por defecto, el paciente es el comprador.
  const [pacienteEsComprador, setPacienteEsComprador] = useState(true);
  const [pacienteData, setPacienteData] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    telefono: '',
  });

  const handlePacienteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPacienteData(prev => ({ ...prev, [name]: value }));
    if (errors[`paciente_${name}`]) {
      setErrors(prev => ({ ...prev, [`paciente_${name}`]: '' }));
    }
  };

  useEffect(() => {
    setMounted(true);
    checkSession(); // Verificar si hay sesión activa
  }, [checkSession]);

  // Meta Pixel: InitiateCheckout (una sola vez, cuando hay items en el carrito)
  const initiateCheckoutTracked = useRef(false);
  useEffect(() => {
    if (mounted && items.length > 0 && !initiateCheckoutTracked.current) {
      initiateCheckoutTracked.current = true;
      trackInitiateCheckout(
        items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          type: i.type,
        })),
        getTotal()
      );
      // Analítica propia: inicio de checkout
      trackBeginCheckout({ value: getTotal() });
    }
  }, [mounted, items, getTotal]);

  // Auto-llenar formulario si el usuario está logueado
  useEffect(() => {
    if (mounted && isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.nombre || prev.nombre,
        apellido: user.apellido || prev.apellido,
        email: user.email || prev.email,
        telefono: user.telefono || prev.telefono,
      }));
    }
  }, [mounted, isAuthenticated, user]);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.back();
    }
  }, [mounted, items.length, router]);

  // Calcular total con descuento
  const getDiscount = () => appliedCoupon?.descuento || 0;
  const getFinalTotal = () => Math.max(0, getTotal() - getDiscount());

  // Validar cupón
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    setCouponLoading(true);
    setCouponError('');
    
    try {
      const result = await couponsApi.validate(couponCode, getSubtotal());
      
      if (result.success && result.data?.valid) {
        setAppliedCoupon(result.data);
        setCouponError('');
      } else {
        setCouponError(result.message || 'Cupón no válido');
        setAppliedCoupon(null);
      }
    } catch {
      setCouponError('Error al validar cupón');
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  // Remover cupón
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^(\+56)?[0-9]{9}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Teléfono inválido (ej: 912345678)';
    }
    if (!formData.rut.trim()) {
      newErrors.rut = 'El RUT es requerido';
    }

    // Validar datos del paciente si hay tratamientos y el paciente no es el comprador
    const hasTratamientos = items.some(item => item.type === 'tratamiento');
    if (hasTratamientos && !pacienteEsComprador) {
      if (!pacienteData.nombre.trim()) newErrors.paciente_nombre = 'El nombre del paciente es requerido';
      if (!pacienteData.apellido.trim()) newErrors.paciente_apellido = 'El apellido del paciente es requerido';
      if (!pacienteData.rut.trim()) newErrors.paciente_rut = 'El RUT del paciente es requerido';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // 1. Crear la orden en el servidor PHP
      const { createOrder, initTransbankPayment } = await import('@/lib/orders-store');

      const finalTotal = getFinalTotal();
      const discount = getDiscount();

      console.log('--- [DEBUG] INICIO FLUJO COMPRA ---');
      console.log('1. PREPARANDO ORDEN:', { 
        customer: formData, 
        items, 
        subtotal: getSubtotal(),
        discount,
        total: finalTotal,
        coupon: appliedCoupon?.code || null
      });

      // Si hay tratamientos y el paciente no es el comprador, enviar sus datos
      const hasTratamientos = items.some(item => item.type === 'tratamiento');
      const pacientePayload = (hasTratamientos && !pacienteEsComprador)
        ? {
            nombre: pacienteData.nombre.trim(),
            apellido: pacienteData.apellido.trim(),
            rut: pacienteData.rut.trim(),
            telefono: pacienteData.telefono.trim() || undefined,
          }
        : undefined;

      const order = await createOrder({
        customer: formData,
        paciente: pacientePayload,
        notas: formData.notas || undefined,
        items: items,
        subtotal: getSubtotal(),
        total: finalTotal,
        discount: discount,
        couponCode: appliedCoupon?.code || undefined,
        // Datos para sistema de afiliados
        coupon_id: appliedCoupon?.id || undefined,
        affiliate_id: appliedCoupon?.affiliate_id || undefined,
        comision_porcentaje: appliedCoupon?.comision_porcentaje || undefined,
      });
      console.log('2. ORDEN CREADA EXITOSAMENTE:', order);

      if (!order) {
        throw new Error('Error al crear la orden (respuesta nula)');
      }

      // 2. Iniciar transacción con Transbank
      console.log('3. INICIANDO TRANSACCIÓN (Pidiendo Token a Transbank)...');
      console.log('   Payload enviado:', { orderId: order.id });

      const transbank = await initTransbankPayment(order.id);

      console.log('4. RESPUESTA TRANSBANK (Init):', transbank);

      if (!transbank) {
        throw new Error('Error al iniciar el pago (respuesta nula)');
      }

      // 3. Redirigir a Transbank
      console.log('5. REDIRIGIENDO A FORMULARIO DE PAGO:', transbank.url);
      console.log('   Token:', transbank.token);
      console.log('--- [DEBUG] FIN FASE INICIAL ---');

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = transbank.url;

      const tokenInput = document.createElement('input');
      tokenInput.type = 'hidden';
      tokenInput.name = 'token_ws';
      tokenInput.value = transbank.token;
      form.appendChild(tokenInput);

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('--- [DEBUG] ERROR EN FLUJO ---');
      console.error(error);
      setIsProcessing(false);
      alert('Ocurrió un error al procesar tu compra. Por favor intenta nuevamente.');
    }
  };

  if (!mounted || items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Cargando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  // Separar productos y tratamientos
  const productos = items.filter(item => item.type === 'producto');
  const tratamientos = items.filter(item => item.type === 'tratamiento');
  const hasCyberItems = items.some(item => item.isCyber);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-cialo-gold">Inicio</Link>
            <span>/</span>
            <Link href="/productos" className="hover:text-cialo-gold">Productos</Link>
            <span>/</span>
            <span className="text-cialo-dark">Checkout</span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-light text-cialo-dark mb-8">
            Finalizar Compra
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold text-cialo-dark mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Datos de contacto
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.nombre ? 'border-red-500' : 'border-gray-200'
                        }`}
                      placeholder="Tu nombre"
                    />
                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.apellido ? 'border-red-500' : 'border-gray-200'
                        }`}
                      placeholder="Tu apellido"
                    />
                    {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200'
                        }`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.telefono ? 'border-red-500' : 'border-gray-200'
                        }`}
                      placeholder="912345678"
                    />
                    {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">RUT *</label>
                  <input
                    type="text"
                    name="rut"
                    value={formData.rut}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.rut ? 'border-red-500' : 'border-gray-200'
                      }`}
                    placeholder="12.345.678-9"
                  />
                  {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
                  <textarea
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors resize-none"
                    placeholder="Instrucciones especiales, preferencias de horarios para que te contactemos, etc."
                  />
                </div>

                {/* Datos de quien se atiende (paciente) - solo para tratamientos */}
                {tratamientos.length > 0 && (
                  <div className="mb-6 border-t border-gray-100 pt-6">
                    <h2 className="text-xl font-semibold text-cialo-dark mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3-6.7" />
                      </svg>
                      Datos de quien se atiende
                    </h2>
                    <p className="text-sm text-gray-500 mb-4">
                      Indícanos los datos de la persona que recibirá el tratamiento.
                    </p>

                    <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg mb-4">
                      <input
                        type="checkbox"
                        checked={pacienteEsComprador}
                        onChange={(e) => {
                          setPacienteEsComprador(e.target.checked);
                          if (e.target.checked) {
                            setErrors(prev => ({
                              ...prev,
                              paciente_nombre: '',
                              paciente_apellido: '',
                              paciente_rut: '',
                            }));
                          }
                        }}
                        className="w-5 h-5 rounded border-gray-300 text-cialo-gold focus:ring-cialo-gold cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">
                        El tratamiento es para mí (uso mis mismos datos)
                      </span>
                    </label>

                    {!pacienteEsComprador && (
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del paciente *</label>
                            <input
                              type="text"
                              name="nombre"
                              value={pacienteData.nombre}
                              onChange={handlePacienteChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.paciente_nombre ? 'border-red-500' : 'border-gray-200'}`}
                              placeholder="Nombre"
                            />
                            {errors.paciente_nombre && <p className="text-red-500 text-sm mt-1">{errors.paciente_nombre}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido del paciente *</label>
                            <input
                              type="text"
                              name="apellido"
                              value={pacienteData.apellido}
                              onChange={handlePacienteChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.paciente_apellido ? 'border-red-500' : 'border-gray-200'}`}
                              placeholder="Apellido"
                            />
                            {errors.paciente_apellido && <p className="text-red-500 text-sm mt-1">{errors.paciente_apellido}</p>}
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">RUT del paciente *</label>
                            <input
                              type="text"
                              name="rut"
                              value={pacienteData.rut}
                              onChange={handlePacienteChange}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors ${errors.paciente_rut ? 'border-red-500' : 'border-gray-200'}`}
                              placeholder="12.345.678-9"
                            />
                            {errors.paciente_rut && <p className="text-red-500 text-sm mt-1">{errors.paciente_rut}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono del paciente (opcional)</label>
                            <input
                              type="tel"
                              name="telefono"
                              value={pacienteData.telefono}
                              onChange={handlePacienteChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold transition-colors"
                              placeholder="912345678"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Info de tratamientos */}
                {tratamientos.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800">📝 Información sobre tu agendamiento</h3>
                        <ul className="text-sm text-green-700 mt-2 space-y-1">
                          <li>✓ <strong>Te contactaremos vía telefónica o WhatsApp</strong> para agendar tu hora luego de confirmar el pago</li>
                          <li>✓ <strong>Cupo asegurado</strong> y precio congelado</li>
                          <li>✓ <strong>Tratamiento garantizado para iniciar en máximo 30 días</strong> desde la compra</li>
                          <li className="mt-2 pt-2 border-t border-green-200 text-xs">Si no te contactamos dentro de las primeras 24 hrs hábiles, escríbenos a nuestro WhatsApp Oficial: <strong>+56 9 8202 8473</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Método de pago */}
                <h2 className="text-xl font-semibold text-cialo-dark mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Método de pago
                </h2>

                <div className="border-2 border-cialo-gold rounded-lg p-4 bg-cialo-gold/5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 bg-white rounded flex items-center justify-center border">
                      <span className="text-xs font-bold text-blue-800">Webpay</span>
                    </div>
                    <div>
                      <p className="font-medium text-cialo-dark">Webpay Plus</p>
                      <p className="text-sm text-gray-500">Tarjeta de crédito o débito</p>
                    </div>
                  </div>
                </div>

                {/* Términos y condiciones */}
                <div className="mt-6 space-y-4">
                  {/* Información importante del proceso */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Información Importante
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Al completar tu compra, recibirás un <strong>correo de confirmación</strong> con los detalles de tu orden y los pasos a seguir.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Nuestro equipo se pondrá en <strong>contacto contigo</strong> dentro de las próximas 24-48 horas hábiles para coordinar tu cita.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Para tratamientos médicos, deberás <strong>confirmar la disponibilidad</strong> del profesional seleccionado.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Los tratamientos tienen una <strong>vigencia de 90 días</strong> desde la fecha de compra, salvo indicación contraria.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Políticas de tratamientos */}
                  {tratamientos.length > 0 && (
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h3 className="font-medium text-amber-900 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        Políticas para Tratamientos
                      </h3>
                      <ul className="space-y-2 text-sm text-amber-800">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>Las citas deben ser <strong>agendadas con al menos 48 horas de anticipación</strong>.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>Para cancelaciones, se requiere <strong>mínimo 24 horas de anticipación</strong>. De lo contrario, se considera no-show.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>Si cancelas con menos de 24 horas se reembolsa el <strong>50% de esa sesión</strong>; si no te presentas, <strong>no tiene reembolso</strong>. Con aviso a tiempo puedes reagendar sin costo.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>Los tratamientos son <strong>personales e intransferibles</strong>, salvo indicación expresa de la clínica.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-amber-500 mt-1">•</span>
                          <span>Debes llegar <strong>15 minutos antes</strong> de tu hora programada para completar la ficha médica.</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* Políticas Cyber */}
                  {hasCyberItems && (
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-start gap-3">
                        <span className="text-xl">⭐</span>
                        <div className="text-sm text-purple-900">
                          <strong className="block mb-2 uppercase text-xs tracking-wider">Términos Exclusivos Cyber CIALO</strong>
                          <ul className="space-y-1 mt-1 list-disc pl-4 text-xs marker:text-purple-400">
                            <li><strong>30 días máximo</strong> para iniciar el tratamiento desde la compra.</li>
                            <li>Agendamiento estricto a <strong>disponibilidad de profesionales</strong> (no se asegura a un profesional en específico).</li>
                            <li><strong>Transferibilidad:</strong> Única opción de transferir a terceros es antes de usar la primera sesión.</li>
                            <li>Por tratarse de campaña promocional, <strong>NO aplican devoluciones de dinero</strong>.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Checkbox de aceptación */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => {
                          setAcceptTerms(e.target.checked);
                          if (errors.terms) {
                            setErrors(prev => ({ ...prev, terms: '' }));
                          }
                        }}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-cialo-gold focus:ring-cialo-gold cursor-pointer"
                      />
                      <span className="text-sm text-gray-600">
                        He leído y acepto los{' '}
                        <Link href="/terminos" className="text-cialo-gold hover:underline font-medium" target="_blank">
                          Términos y Condiciones
                        </Link>
                        , la{' '}
                        <Link href="/politica-pagos" className="text-cialo-gold hover:underline font-medium" target="_blank">
                          Política de Pagos y Reembolsos
                        </Link>
                        {' '}y la{' '}
                        <Link href="/privacidad" className="text-cialo-gold hover:underline font-medium" target="_blank">
                          Política de Privacidad
                        </Link>
                        . Entiendo que:
                        <ul className="mt-2 space-y-1 list-disc pl-4 marker:text-gray-400">
                          <li>Recibiré un correo de confirmación tras completar el pago</li>
                          <li>El equipo de CIALO me contactará para agendar mi cita</li>
                          <li>Debo confirmar mi asistencia según las políticas establecidas</li>
                        </ul>
                      </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-sm mt-2 ml-8">{errors.terms}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full mt-8 py-4 rounded-lg font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-cialo-gold hover:bg-cialo-dark shadow-lg hover:shadow-xl'
                    }`}
                >
                  {isProcessing ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Pagar {formatPrice(getFinalTotal())}
                    </>
                  )}
                </button>


              </form>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-32">
                <h2 className="text-xl font-semibold text-cialo-dark mb-6">Resumen del pedido</h2>

                <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                  {items.map((item) => (
                    <div key={`${item.type}-${item.id}`} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <p className="font-medium text-cialo-dark text-sm line-clamp-2">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.type === 'producto' ? 'Producto' : 'Tratamiento'} × {item.quantity}
                            </p>
                            <p className="text-sm font-semibold text-cialo-gold mt-1">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id, item.type)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Eliminar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Valor de agendamiento</span>
                    <span className="text-green-600 font-medium">Incluido</span>
                  </div>

                  {/* Cupón de descuento */}
                  {!appliedCoupon ? (
                    <div className="pt-2">
                      <label className="block text-sm text-gray-500 mb-2">¿Tienes un cupón?</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="CODIGO"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-cialo-gold focus:border-cialo-gold"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={couponLoading || !couponCode.trim()}
                          className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {couponLoading ? '...' : 'Aplicar'}
                        </button>
                      </div>
                      {couponError && (
                        <p className="text-red-500 text-xs mt-1">{couponError}</p>
                      )}
                    </div>
                  ) : (
                    <div className="pt-2 bg-green-50 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium text-green-700">
                            ✓ {appliedCoupon.code}
                          </p>
                          <p className="text-xs text-green-600">{appliedCoupon.descripcion}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="text-green-700 hover:text-red-600 p-1"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between text-sm mt-2 pt-2 border-t border-green-100">
                        <span className="text-green-700">Descuento</span>
                        <span className="font-medium text-green-700">-{formatPrice(getDiscount())}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span className="text-cialo-gold">{formatPrice(getFinalTotal())}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="w-full block text-center text-sm text-gray-500 hover:text-cialo-gold mt-4 transition-colors"
                >
                  ← Seguir comprando
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
