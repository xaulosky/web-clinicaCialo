'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ToastContextType {
    showToast: (message: string, type?: Toast['type'], action?: Toast['action']) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: Toast['type'] = 'success', action?: Toast['action']) => {
        const id = Math.random().toString(36).substring(7);
        const newToast: Toast = { id, message, type, action };

        setToasts(prev => [...prev, newToast]);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container - Left on desktop, bottom-center on mobile (above WhatsApp button) */}
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 sm:bottom-4 sm:left-4 sm:translate-x-0 z-[100] flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
                            pointer-events-auto
                            flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg
                            animate-slide-up backdrop-blur-sm
                            ${toast.type === 'success' ? 'bg-white border border-green-100' : ''}
                            ${toast.type === 'error' ? 'bg-white border border-red-100' : ''}
                            ${toast.type === 'info' ? 'bg-white border border-blue-100' : ''}
                        `}
                        style={{
                            animation: 'slideUp 0.3s ease-out',
                        }}
                    >
                        {/* Icon */}
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                            ${toast.type === 'success' ? 'bg-green-100' : ''}
                            ${toast.type === 'error' ? 'bg-red-100' : ''}
                            ${toast.type === 'info' ? 'bg-blue-100' : ''}
                        `}>
                            {toast.type === 'success' && (
                                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                            {toast.type === 'error' && (
                                <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                            {toast.type === 'info' && (
                                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                        </div>

                        {/* Message */}
                        <p className="text-sm font-medium text-gray-800 pr-2">
                            {toast.message}
                        </p>

                        {/* Action Button */}
                        {toast.action && (
                            <button
                                onClick={() => {
                                    toast.action?.onClick();
                                    removeToast(toast.id);
                                }}
                                className="text-sm font-bold text-cialo-gold hover:text-cialo-dark transition-colors whitespace-nowrap"
                            >
                                {toast.action.label}
                            </button>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            <style jsx global>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </ToastContext.Provider>
    );
}
