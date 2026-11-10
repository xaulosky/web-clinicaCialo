import { create } from 'zustand';
import { authApi, User } from './api';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (data: { email: string; password: string; nombre: string; apellido: string; telefono?: string }) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    checkSession: async () => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

        if (!token) {
            set({ user: null, isAuthenticated: false, isLoading: false });
            return;
        }

        try {
            const result = await authApi.me();
            if (result.success && result.data) {
                set({ user: result.data, isAuthenticated: true, isLoading: false });
            } else {
                localStorage.removeItem('auth_token');
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        } catch {
            localStorage.removeItem('auth_token');
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    login: async (email, password) => {
        const result = await authApi.login(email, password);

        if (result.success && result.data) {
            set({ user: result.data.user, isAuthenticated: true });
            return { success: true };
        }

        return { success: false, error: result.message || 'Error al iniciar sesión' };
    },

    register: async (formData) => {
        const result = await authApi.register(formData);

        if (result.success && result.data) {
            set({ user: result.data.user, isAuthenticated: true });
            return { success: true };
        }

        return { success: false, error: result.message || 'Error al crear cuenta' };
    },

    logout: async () => {
        await authApi.logout();
        set({ user: null, isAuthenticated: false });
    },
}));

// Re-export User type from api
export type { User } from './api';
