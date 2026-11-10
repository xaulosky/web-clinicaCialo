'use client';

import AddToCartButton from './AddToCartButton';

interface ProductAddToCartProps {
  producto: {
    id: number;
    name: string;
    price: number;
    brand: string;
    category: string;
    slug: string;
  };
}

export default function ProductAddToCart({ producto }: ProductAddToCartProps) {
  return (
    <AddToCartButton
      item={{
        id: String(producto.id),
        name: `${producto.name} - ${producto.brand}`,
        price: producto.price,
        slug: producto.slug,
        categoria: producto.category,
      }}
      type="producto"
      variant="primary"
      size="lg"
      fullWidth
    />
  );
}
