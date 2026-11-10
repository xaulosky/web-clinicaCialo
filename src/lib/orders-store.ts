/**
 * Orders Store - Cliente para la API PHP
 * Este archivo es para uso del lado del cliente (browser)
 */

import { ordersApi, transbankApi, Order, CreateOrderData, CartItem, CustomerInfo } from './api';

// Re-export types
export type { Order, CreateOrderData, CartItem, CustomerInfo };

/**
 * Crear nueva orden
 */
export async function createOrder(data: CreateOrderData): Promise<Order | null> {
  const result = await ordersApi.create(data);
  return result.success && result.data ? result.data : null;
}

/**
 * Obtener orden por ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const result = await ordersApi.getById(id);
  return result.success && result.data ? result.data : null;
}

/**
 * Obtener orden por número
 */
export async function getOrderByNumber(orderNumber: string): Promise<Order | null> {
  const result = await ordersApi.getByNumber(orderNumber);
  return result.success && result.data ? result.data : null;
}

/**
 * Obtener orden por código de retiro
 */
export async function getOrderByRetiroCode(code: string): Promise<Order | null> {
  const result = await ordersApi.getByRetiroCode(code);
  return result.success && result.data ? result.data : null;
}

/**
 * Obtener órdenes por email
 */
export async function getOrdersByEmail(email: string): Promise<Order[]> {
  const result = await ordersApi.getByEmail(email);
  return result.success && result.data ? result.data : [];
}

/**
 * Obtener todas las órdenes
 */
export async function getAllOrders(): Promise<Order[]> {
  const result = await ordersApi.getAll();
  return result.success && result.data ? result.data : [];
}

/**
 * Actualizar orden
 */
export async function updateOrder(id: string, data: Partial<Order>): Promise<Order | null> {
  const result = await ordersApi.update(id, data);
  return result.success && result.data ? result.data : null;
}

/**
 * Iniciar pago con Transbank
 */
export async function initTransbankPayment(orderId: string): Promise<{ token: string; url: string } | null> {
  const result = await transbankApi.init(orderId);
  return result.success && result.data ? result.data : null;
}

/**
 * Verificar estado de transacción Transbank
 */
export async function getTransbankStatus(token: string): Promise<{ status: string; response_code: number } | null> {
  const result = await transbankApi.status(token);
  return result.success && result.data ? result.data : null;
}
