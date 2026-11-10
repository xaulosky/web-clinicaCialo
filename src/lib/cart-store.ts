'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, ItemType } from './types';
import { trackAddToCart } from './fbpixel';
import { trackAddToCart as trackAddToCartOwn } from './analytics';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, type: ItemType) => void;
  updateQuantity: (id: string, type: ItemType, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Getters
  getItemCount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        // Meta Pixel: evento de conversión AddToCart
        trackAddToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          type: item.type,
        });
        // Analítica propia
        trackAddToCartOwn({ value: item.price });

        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.type === item.type
          );

          if (existingItem) {
            // Incrementar cantidad si ya existe
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.type === item.type
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              // Ya no abrimos el carrito automáticamente, se usa Toast
            };
          }

          // Agregar nuevo item
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            // Ya no abrimos el carrito automáticamente, se usa Toast
          };
        });
      },

      removeItem: (id, type) => {
        set((state) => ({
          items: state.items.filter((i) => !(i.id === id && i.type === type)),
        }));
      },

      updateQuantity: (id, type, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id, type);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.type === type ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        // Por ahora igual al subtotal, pero aquí se pueden agregar descuentos, envío, etc.
        return get().getSubtotal();
      },
    }),
    {
      name: 'cialo-cart', // Nombre para localStorage
      partialize: (state) => ({ items: state.items }), // Solo persistir items
    }
  )
);

// Helper para formatear precios
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(price);
};
