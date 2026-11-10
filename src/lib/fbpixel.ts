'use client';

/**
 * Helper para eventos del Meta Pixel (Pixel Clínica CIALO: 37311405751791578).
 * El script base se inyecta en app/layout.tsx (fbq init + PageView).
 * Aquí disparamos eventos de conversión estándar de Meta.
 *
 * Todas las funciones son seguras: si fbq no existe (ej. bloqueado por
 * un ad-blocker o aún no cargó) simplemente no hacen nada.
 */

type FbqArgs = [string, string, Record<string, unknown>?];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

const isReady = (): boolean =>
  typeof window !== 'undefined' && typeof window.fbq === 'function';

/** Item del carrito en el formato mínimo que necesitamos para los eventos. */
export interface PixelItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type?: string;
}

const CURRENCY = 'CLP';

const buildContents = (items: PixelItem[]) =>
  items.map((i) => ({
    id: i.id,
    quantity: i.quantity,
    item_price: i.price,
  }));

const sumValue = (items: PixelItem[]) =>
  items.reduce((total, i) => total + i.price * i.quantity, 0);

/** AddToCart: cuando se agrega un producto/tratamiento al carrito. */
export function trackAddToCart(item: PixelItem): void {
  if (!isReady()) return;
  try {
    window.fbq!('track', 'AddToCart', {
      content_type: 'product',
      content_ids: [item.id],
      content_name: item.name,
      contents: buildContents([item]),
      value: item.price * (item.quantity || 1),
      currency: CURRENCY,
    });
  } catch {
    /* noop */
  }
}

/** InitiateCheckout: cuando el usuario llega a la página de pago. */
export function trackInitiateCheckout(items: PixelItem[], value?: number): void {
  if (!isReady() || items.length === 0) return;
  try {
    window.fbq!('track', 'InitiateCheckout', {
      content_type: 'product',
      content_ids: items.map((i) => i.id),
      contents: buildContents(items),
      num_items: items.reduce((n, i) => n + (i.quantity || 1), 0),
      value: value ?? sumValue(items),
      currency: CURRENCY,
    });
  } catch {
    /* noop */
  }
}

/** ViewContent: cuando se ve la ficha de un producto o tratamiento. */
export function trackViewContent(params: {
  id: string | number;
  name: string;
  value?: number;
  contentType?: 'product' | 'product_group';
  category?: string;
}): void {
  if (!isReady()) return;
  try {
    window.fbq!('track', 'ViewContent', {
      content_type: params.contentType ?? 'product',
      content_ids: [String(params.id)],
      content_name: params.name,
      content_category: params.category,
      value: params.value,
      currency: CURRENCY,
    });
  } catch {
    /* noop */
  }
}

/** Search: cuando el usuario realiza una búsqueda. */
export function trackSearch(searchString: string): void {
  if (!isReady() || !searchString.trim()) return;
  try {
    window.fbq!('track', 'Search', {
      search_string: searchString.trim(),
    });
  } catch {
    /* noop */
  }
}

/** Lead: acción de alta intención (clic WhatsApp, envío de formulario de contacto). */
export function trackLead(params?: {
  source?: string;
  content_name?: string;
  value?: number;
}): void {
  if (!isReady()) return;
  try {
    window.fbq!('track', 'Lead', {
      content_name: params?.content_name ?? params?.source ?? 'contacto',
      ...(params?.value != null ? { value: params.value, currency: CURRENCY } : {}),
    });
  } catch {
    /* noop */
  }
}

/** Purchase: cuando un pago Webpay se confirma como exitoso. */
export function trackPurchase(params: {
  orderId: string;
  value: number;
  items: PixelItem[];
}): void {
  if (!isReady()) return;
  try {
    window.fbq!('track', 'Purchase', {
      content_type: 'product',
      content_ids: params.items.map((i) => i.id),
      contents: buildContents(params.items),
      num_items: params.items.reduce((n, i) => n + (i.quantity || 1), 0),
      value: params.value,
      currency: CURRENCY,
      order_id: params.orderId,
    });
  } catch {
    /* noop */
  }
}
