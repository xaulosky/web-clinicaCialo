// Tipos para el sistema de carrito y órdenes

export type ItemType = 'producto' | 'tratamiento';

export interface CartItem {
  id: string;
  type: ItemType;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string; // Para productos
  categoria?: string;
  agendaUrl?: string; // URL de Reservo para agendar (consultas)
  isCyber?: boolean;  // Identificador de productos promocionales de Cyber
}

export interface CustomerInfo {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  rut: string;
  notas?: string;
}

export interface PacienteInfo {
  nombre: string;
  apellido: string;
  rut?: string;
  telefono?: string;
}

export type OrderStatus =
  | 'PENDIENTE'           // Orden creada, esperando pago
  | 'PAGADO'              // Pago confirmado
  | 'PREPARANDO'          // Productos siendo preparados
  | 'LISTO_RETIRO'        // Listo para retirar
  | 'ENTREGADO'           // Productos entregados
  | 'AGENDADO'            // Tratamiento con cita agendada
  | 'COMPLETADO'          // Tratamiento realizado
  | 'CANCELADO'           // Orden cancelada
  | 'REEMBOLSADO';        // Dinero devuelto

export interface Order {
  id: string;
  orderNumber: string;      // Número legible: CIALO-2026-0001
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'webpay' | 'transferencia' | 'efectivo';
  transactionId?: string;   // ID de Transbank
  authorizationCode?: string;
  cardNumber?: string;      // Últimos 4 dígitos
  createdAt: Date;
  updatedAt: Date;
  paidAt?: Date;
  notes?: string;
  paciente?: PacienteInfo;  // Datos de quien se atiende (si difiere del comprador)
  retiroCode?: string;      // Código para retiro en tienda
}

export interface TransbankCreateResponse {
  token: string;
  url: string;
}

export interface TransbankCommitResponse {
  vci: string;
  amount: number;
  status: string;
  buy_order: string;
  session_id: string;
  card_detail: {
    card_number: string;
  };
  accounting_date: string;
  transaction_date: string;
  authorization_code: string;
  payment_type_code: string;
  response_code: number;
  installments_number: number;
}
