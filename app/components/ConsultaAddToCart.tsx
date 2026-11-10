'use client';

import AddToCartButton from './AddToCartButton';

interface ConsultaAddToCartProps {
    consulta: {
        id: string;
        name: string;
        price: number;
        category: string;
        agendaUrl?: string;
    };
}

export default function ConsultaAddToCart({ consulta }: ConsultaAddToCartProps) {
    return (
        <AddToCartButton
            item={{
                id: consulta.id,
                name: consulta.name,
                price: consulta.price,
                categoria: consulta.category,
                agendaUrl: consulta.agendaUrl,
            }}
            type="tratamiento" // Usamos tratamiento como tipo genérico para servicios
            variant="primary"
            size="lg"
            fullWidth
            label="Reservar y Pagar"
        />
    );
}

