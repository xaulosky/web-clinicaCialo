/**
 * Tracking first-party anónimo y respetuoso de la privacidad.
 *
 * Alimenta la tabla `events` del backend vía POST /events.
 * No usa cookies de terceros ni librerías externas: sólo localStorage /
 * sessionStorage para identificadores anónimos y rotativos.
 *
 * Todas las funciones son DEFENSIVAS:
 *  - Nunca lanzan (todo va envuelto en try/catch).
 *  - No hacen nada en entorno servidor (typeof window === 'undefined'),
 *    por lo que son seguras en SSR / export estático.
 */

// URL base de la API (misma convención que el resto del proyecto).
const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

// Claves de almacenamiento.
const ANON_KEY = 'cialo_anon';
const SESS_KEY = 'cialo_sess';
const UTM_KEY = 'cialo_utm';

/** Indica si estamos en un entorno con DOM disponible. */
function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

/** Genera un UUID, con fallback si crypto.randomUUID no está disponible. */
function generateId(): string {
  try {
    if (
      typeof crypto !== 'undefined' &&
      typeof crypto.randomUUID === 'function'
    ) {
      return crypto.randomUUID();
    }
  } catch {
    /* noop: caemos al fallback */
  }
  // Fallback simple (no criptográfico, pero suficiente como id anónimo).
  return (
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }) +
    '-' +
    Date.now().toString(36)
  );
}

/**
 * Lee (o crea) el identificador anónimo persistente en localStorage.
 * Devuelve cadena vacía si no hay window o si el storage no está disponible.
 */
export function getAnonymousId(): string {
  if (!hasWindow()) return '';
  try {
    let id = window.localStorage.getItem(ANON_KEY);
    if (!id) {
      id = generateId();
      window.localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    // Si localStorage está bloqueado (modo privado, etc.) devolvemos un id
    // efímero para no romper el envío.
    return generateId();
  }
}

/**
 * Lee (o crea) el identificador de sesión en sessionStorage.
 * Devuelve cadena vacía si no hay window o si el storage no está disponible.
 */
export function getSessionId(): string {
  if (!hasWindow()) return '';
  try {
    let id = window.sessionStorage.getItem(SESS_KEY);
    if (!id) {
      id = generateId();
      window.sessionStorage.setItem(SESS_KEY, id);
    }
    return id;
  } catch {
    return generateId();
  }
}

/** Forma del objeto de atribución guardado. */
interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
}

/**
 * En la primera carga, lee los parámetros utm_* y gclid de location.search.
 * Si hay alguno, guarda el objeto de atribución en sessionStorage.
 * Es idempotente: si ya hay atribución guardada, no la sobrescribe.
 */
export function captureAttribution(): void {
  if (!hasWindow()) return;
  try {
    // Si ya capturamos atribución en esta sesión, no hacemos nada.
    const existing = window.sessionStorage.getItem(UTM_KEY);
    if (existing) return;

    const params = new URLSearchParams(window.location.search);
    const attribution: Attribution = {};

    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');
    const utmContent = params.get('utm_content');
    const utmTerm = params.get('utm_term');
    const gclid = params.get('gclid');

    if (utmSource) attribution.utm_source = utmSource;
    if (utmMedium) attribution.utm_medium = utmMedium;
    if (utmCampaign) attribution.utm_campaign = utmCampaign;
    if (utmContent) attribution.utm_content = utmContent;
    if (utmTerm) attribution.utm_term = utmTerm;
    if (gclid) attribution.gclid = gclid;

    // Sólo guardamos si encontramos al menos un parámetro relevante.
    if (Object.keys(attribution).length > 0) {
      window.sessionStorage.setItem(UTM_KEY, JSON.stringify(attribution));
    }
  } catch {
    /* noop */
  }
}

/**
 * Devuelve la atribución guardada (o {}). Captura de forma perezosa la
 * atribución la primera vez que se invoca, para asegurarnos de tenerla
 * disponible en la primera page view.
 */
export function getAttribution(): Attribution {
  if (!hasWindow()) return {};
  try {
    captureAttribution();
    const raw = window.sessionStorage.getItem(UTM_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Attribution) : {};
  } catch {
    return {};
  }
}

/** Estructura mínima de un evento a enviar. */
interface AnalyticsEvent {
  event_name: string;
  [key: string]: unknown;
}

/**
 * Arma el payload base y lo envía al backend.
 * Usa sendBeacon cuando está disponible (sobrevive a navegaciones / cierre
 * de pestaña); si no, cae a fetch con keepalive. Nunca lanza.
 */
function send(event: AnalyticsEvent): void {
  if (!hasWindow()) return;
  try {
    const payload = {
      anonymous_id: getAnonymousId(),
      session_id: getSessionId(),
      path: window.location.pathname,
      referrer: document.referrer || undefined,
      ...getAttribution(),
      ...event,
    };

    const json = JSON.stringify(payload);
    const url = API + '/events';

    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([json], { type: 'application/json' });
      const ok = navigator.sendBeacon(url, blob);
      if (ok) return;
      // Si sendBeacon falla (cola llena), caemos a fetch.
    }

    if (typeof fetch === 'function') {
      void fetch(url, {
        method: 'POST',
        body: json,
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {
        /* noop */
      });
    }
  } catch {
    /* noop: el tracking nunca debe romper la app */
  }
}

/** Page view. Si no se pasa path, usa location.pathname. */
export function trackPageView(path?: string): void {
  if (!hasWindow()) return;
  // Aseguramos capturar la atribución en la primera page view.
  captureAttribution();
  send({
    event_name: 'page_view',
    path: path || window.location.pathname,
  });
}

/** Vista de la ficha de un tratamiento. */
export function trackViewTreatment(params: {
  id: string | number;
  category: string;
  name?: string;
  value?: number;
}): void {
  send({
    event_name: 'view_treatment',
    treatment_id: String(params.id),
    treatment_category: params.category,
    treatment_name: params.name,
    value_clp: params.value,
  });
}

/** Búsqueda realizada por el usuario. */
export function trackSearch(term: string, resultsCount?: number): void {
  send({
    event_name: 'search',
    search_term: term,
    results_count: resultsCount,
  });
}

/** Producto/tratamiento agregado al carrito. */
export function trackAddToCart(params?: { value?: number }): void {
  send({
    event_name: 'add_to_cart',
    value_clp: params?.value,
  });
}

/** Inicio del proceso de checkout. */
export function trackBeginCheckout(params?: { value?: number }): void {
  send({
    event_name: 'begin_checkout',
    value_clp: params?.value,
  });
}

/** Compra confirmada. */
export function trackPurchase(params?: {
  orderId?: string;
  value?: number;
}): void {
  send({
    event_name: 'purchase',
    order_id: params?.orderId,
    value_clp: params?.value,
  });
}

/** Acción de alta intención (lead): clic WhatsApp, envío de formulario, etc. */
export function trackLead(source?: string): void {
  send({
    event_name: 'lead',
    source,
  });
}
