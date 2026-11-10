'use client';

import { useCartStore } from '@/lib/cart-store';
import { ItemType } from '@/lib/types';
import { useToast } from './Toast';

interface AddToCartButtonProps {
  item: {
    id: string;
    name: string;
    price: number;
    image?: string;
    slug?: string;
    categoria?: string;
    agendaUrl?: string;
  };
  type: ItemType;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  label?: string;
}

export default function AddToCartButton({
  item,
  type,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  label = 'Agregar al carrito',
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      type,
      name: item.name,
      price: item.price,
      image: item.image,
      slug: item.slug,
      categoria: item.categoria,
      agendaUrl: item.agendaUrl,
    });

    // Mostrar toast en lugar de abrir el carrito automáticamente
    showToast(
      `${item.name.length > 30 ? item.name.substring(0, 30) + '...' : item.name} agregado`,
      'success',
      {
        label: 'Ver carrito',
        onClick: openCart,
      }
    );
  };

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-lg';

  const variantStyles = {
    primary: 'bg-cialo-gold text-white hover:bg-cialo-dark shadow-sm hover:shadow-md',
    secondary: 'bg-cialo-dark text-white hover:bg-cialo-gold',
    outline: 'border-2 border-cialo-gold text-cialo-gold hover:bg-cialo-gold hover:text-white',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span>{label}</span>
    </button>
  );
}

