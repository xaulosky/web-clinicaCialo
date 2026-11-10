'use client';

import { useCartStore } from '@/lib/cart-store';
import { useEffect, useState } from 'react';

export default function CartButton() {
  const { toggleCart, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setItemCount(getItemCount());
    }
  }, [mounted, getItemCount]);

  // Suscribirse a cambios del store
  useEffect(() => {
    if (!mounted) return;
    
    const unsubscribe = useCartStore.subscribe((state) => {
      setItemCount(state.items.reduce((total, item) => total + item.quantity, 0));
    });

    return () => unsubscribe();
  }, [mounted]);

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
      aria-label="Abrir carrito"
    >
      <svg className="w-5 h-5 text-cialo-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {mounted && itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-cialo-gold text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </button>
  );
}
