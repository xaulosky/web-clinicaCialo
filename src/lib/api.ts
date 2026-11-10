/**
 * API Client para conectar con el backend PHP
 */

// URL base de la API PHP
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.cialo.cl';

/**
 * Hacer petición a la API
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; errors?: Record<string, string> }> {
    try {
        // Token: prioriza la sesión de admin (adminToken) y cae a la de cliente (auth_token).
        // Así las páginas del admin envían el JWT de administrador a los endpoints protegidos.
        const token = typeof window !== 'undefined'
            ? (localStorage.getItem('adminToken') || localStorage.getItem('auth_token'))
            : null;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (token) {
            (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        const url = `${API_BASE_URL}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers,
        });

        // Sesión de admin vencida: en vez de mostrar datos vacíos, ir al login.
        if (
            response.status === 401 &&
            typeof window !== 'undefined' &&
            window.location.pathname.startsWith('/admin') &&
            !window.location.pathname.startsWith('/admin/login')
        ) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminSession');
            window.location.href = '/admin/login';
        }

        const text = await response.text();

        let json;
        try {
            json = JSON.parse(text);
        } catch {
            return {
                success: false,
                message: 'Error al procesar respuesta del servidor (JSON inválido)',
            };
        }

        return {
            success: json.success ?? response.ok,
            data: json.data,
            message: json.message,
            errors: json.errors,
        };
    } catch {
        return {
            success: false,
            message: 'Error de conexión con el servidor',
        };
    }
}

// ============================================
// Orders API
// ============================================

export interface CustomerInfo {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    rut?: string;
    notas?: string;
}

export interface PacienteInfo {
    nombre: string;
    apellido: string;
    rut: string;
    telefono?: string;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    type?: 'producto' | 'tratamiento' | 'consulta';
    agendaUrl?: string;
}

export interface Order {
    id: string;
    order_number: string;
    retiro_code?: string;
    status: string;
    subtotal: number;
    total: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_rut?: string;
    notas?: string;
    paciente_nombre?: string;
    paciente_apellido?: string;
    paciente_rut?: string;
    paciente_telefono?: string;
    transaction_id?: string;
    paid_at?: string;
    authorization_code?: string;
    card_number?: string;
    created_at: string;
    updated_at: string;
    items: CartItem[];
}

export interface CreateOrderData {
    customer: CustomerInfo;
    paciente?: PacienteInfo;
    notas?: string;
    items: CartItem[];
    subtotal: number;
    total: number;
    user_id?: string;
    discount?: number;
    couponCode?: string;
    // Para afiliados
    coupon_id?: string;
    affiliate_id?: string;
    comision_porcentaje?: number;
}

export const ordersApi = {
    create: async (data: CreateOrderData) => {
        return apiRequest<Order>('/orders', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getById: async (id: string) => {
        return apiRequest<Order>(`/orders/${id}`);
    },

    getByNumber: async (orderNumber: string) => {
        return apiRequest<Order>(`/orders/number/${orderNumber}`);
    },

    getByRetiroCode: async (code: string) => {
        return apiRequest<Order>(`/orders/retiro/${code}`);
    },

    getByEmail: async (email: string) => {
        return apiRequest<Order[]>(`/orders/email/${encodeURIComponent(email)}`);
    },

    getAll: async () => {
        return apiRequest<Order[]>('/orders');
    },

    update: async (id: string, data: Partial<Order>) => {
        return apiRequest<Order>(`/orders/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },
};

// ============================================
// Transbank API
// ============================================

export interface TransbankInitResponse {
    token: string;
    url: string;
}

export const transbankApi = {
    init: async (orderId: string) => {
        return apiRequest<TransbankInitResponse>('/transbank/init', {
            method: 'POST',
            body: JSON.stringify({ orderId }),
        });
    },

    status: async (token: string) => {
        return apiRequest<{ status: string; response_code: number }>(`/transbank/status/${token}`);
    },
};

// ============================================
// Reservas de hora (agendamiento con abono)
// ============================================

export type ReservaStatus =
    | 'PENDIENTE'
    | 'PAGADO'
    | 'PAGADO_SIN_CITA'
    | 'RECHAZADO'
    | 'CANCELADO'
    | 'ERROR'
    | 'ABANDONADO';

export interface ReservaHora {
    id: string;
    buy_order: string;
    status: ReservaStatus;
    /** Monto que se pidió cobrar. */
    amount: number;
    /** Monto que Transbank confirmó haber capturado. */
    amount_paid: number | null;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    servicio: string;
    /** id del profesional en reservo. */
    profesional: string | null;
    tratamiento: string | null;
    tratamiento_nombre: string | null;
    customer_name: string;
    customer_email: string | null;
    customer_phone: string | null;
    customer_rut: string | null;
    cita_id: string | null;
    authorization_code: string | null;
    card_number: string | null;
    response_code: number | null;
    intentos_cita: number;
    last_error: string | null;
    paid_at: string | null;
    resuelto_at: string | null;
    resuelto_nota: string | null;
    created_at: string;
    updated_at: string;
}

export interface ReservasResumen {
    por_estado: Record<string, { n: number; monto: number }>;
    cobrado: number;
    pagadas_sin_cita: number;
    monto_sin_cita: number;
}

export const reservasApi = {
    getAll: async (params: { status?: string; desde?: string; hasta?: string; q?: string } = {}) => {
        const qs = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => { if (v) qs.set(k, v); });
        const suffix = qs.toString() ? `?${qs.toString()}` : '';
        return apiRequest<ReservaHora[]>(`/reservo/bookings${suffix}`);
    },

    getResumen: async (params: { desde?: string; hasta?: string } = {}) => {
        const qs = new URLSearchParams();
        Object.entries(params).forEach(([k, v]) => { if (v) qs.set(k, v); });
        const suffix = qs.toString() ? `?${qs.toString()}` : '';
        return apiRequest<ReservasResumen>(`/reservo/bookings/resumen${suffix}`);
    },

    /** Vuelve a crear en reservo.cl la cita de un cobro que quedó sin ella. */
    reintentar: async (id: string) => {
        return apiRequest<ReservaHora>(`/reservo/bookings/${id}/reintentar`, { method: 'POST' });
    },

    /** Deja constancia de que se gestionó a mano (se agendó por teléfono, se devolvió). */
    resolver: async (id: string, nota: string) => {
        return apiRequest<ReservaHora>(`/reservo/bookings/${id}/resolver`, {
            method: 'POST',
            body: JSON.stringify({ nota }),
        });
    },
};

// ============================================
// Auth API
// ============================================

export interface User {
    id: string;
    email: string;
    nombre: string;
    apellido: string;
    telefono?: string;
    created_at?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export const authApi = {
    login: async (email: string, password: string) => {
        const result = await apiRequest<AuthResponse>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (result.success && result.data?.token) {
            localStorage.setItem('auth_token', result.data.token);
        }

        return result;
    },

    register: async (data: { email: string; password: string; nombre: string; apellido: string; telefono?: string }) => {
        const result = await apiRequest<AuthResponse>('/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (result.success && result.data?.token) {
            localStorage.setItem('auth_token', result.data.token);
        }

        return result;
    },

    me: async () => {
        return apiRequest<User>('/auth/me');
    },

    logout: async () => {
        localStorage.removeItem('auth_token');
        return apiRequest('/auth/logout', { method: 'POST' });
    },

    updateProfile: async (data: Partial<User>) => {
        return apiRequest<User>('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    changePassword: async (currentPassword: string, newPassword: string) => {
        return apiRequest('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    },
};

// ============================================
// Coupons API
// ============================================

export interface CouponValidation {
    valid: boolean;
    id?: string;
    code?: string;
    categoria?: 'descuento' | 'personal' | 'afiliado';
    tipo?: 'porcentaje' | 'monto';
    valor?: number;
    descuento?: number;
    descripcion?: string;
    error?: string;
    // Datos de afiliado (si aplica)
    es_afiliado?: boolean;
    affiliate_id?: string;
    afiliado_nombre?: string;
    comision_porcentaje?: number;
}

export const couponsApi = {
    validate: async (code: string, subtotal: number) => {
        return apiRequest<CouponValidation>('/coupons/validate', {
            method: 'POST',
            body: JSON.stringify({ code, subtotal }),
        });
    },
};

// ============================================
// Affiliates API
// ============================================

export interface Affiliate {
    id: string;
    user_id?: string;
    codigo_afiliado: string;
    nombre: string;
    email: string;
    telefono?: string;
    comision_default: number;
    total_ventas: number;
    total_comisiones: number;
    comisiones_pagadas: number;
    activo: boolean;
}

export interface Commission {
    id: string;
    affiliate_id: string;
    order_id: string;
    coupon_id: string;
    monto_venta: number;
    porcentaje_comision: number;
    monto_comision: number;
    estado: 'pendiente' | 'aprobada' | 'pagada' | 'cancelada';
    fecha_pago?: string;
    order_number?: string;
    coupon_code?: string;
    created_at: string;
}

export const affiliatesApi = {
    // Para admin
    getAll: async () => {
        return apiRequest<Affiliate[]>('/affiliates');
    },

    create: async (data: Partial<Affiliate> & { descuento?: number }) => {
        return apiRequest<Affiliate>('/affiliates', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    getById: async (id: string) => {
        return apiRequest<Affiliate>(`/affiliates/${id}`);
    },

    update: async (id: string, data: Partial<Affiliate>) => {
        return apiRequest<Affiliate>(`/affiliates/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    getCommissions: async (id: string, estado?: string) => {
        const params = estado ? `?estado=${estado}` : '';
        return apiRequest<Commission[]>(`/affiliates/${id}/commissions${params}`);
    },

    getDashboard: async () => {
        return apiRequest<{
            total_afiliados: number;
            total_ventas: number;
            total_comisiones: number;
            comisiones_pendientes: number;
            top_afiliados: Affiliate[];
        }>('/affiliates/dashboard');
    },

    approveCommissions: async (commissionIds: string[]) => {
        return apiRequest('/affiliates/commissions/approve', {
            method: 'POST',
            body: JSON.stringify({ commission_ids: commissionIds }),
        });
    },

    payCommissions: async (affiliateId: string, commissionIds: string[]) => {
        return apiRequest(`/affiliates/${affiliateId}/pay`, {
            method: 'POST',
            body: JSON.stringify({ commission_ids: commissionIds }),
        });
    },

    // Para el afiliado logueado
    getMyProfile: async () => {
        return apiRequest<Affiliate>('/affiliates/me');
    },

    getMyCommissions: async (estado?: string) => {
        const params = estado ? `?estado=${estado}` : '';
        return apiRequest<Commission[]>(`/affiliates/me/commissions${params}`);
    },
};

export default apiRequest;
