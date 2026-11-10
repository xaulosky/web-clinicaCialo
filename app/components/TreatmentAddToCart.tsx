'use client';

import AddToCartButton from './AddToCartButton';
import Link from 'next/link';

interface TreatmentAddToCartProps {
  tratamiento: {
    id: string;
    name: string;
    price: number;
    category: string;
  };
  hasVariablePrice?: boolean; // Si tiene precio variable (rango), no se puede vender online
  requiereEvaluacion?: boolean; // Si requiere evaluación previa
  consultaEvaluacion?: {
    nombre: string;
    url: string;
    precio: number;
  };
}

export default function TreatmentAddToCart({ 
  tratamiento, 
  hasVariablePrice = false,
  requiereEvaluacion = true,
  consultaEvaluacion
}: TreatmentAddToCartProps) {
  
  // Si el precio es variable, mostrar mensaje en lugar del botón
  if (hasVariablePrice) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-sm text-gray-600 mb-2">
          El valor de este tratamiento varía según evaluación
        </p>
        <p className="text-xs text-gray-500">
          Agenda tu cita por WhatsApp para recibir una cotización personalizada
        </p>
      </div>
    );
  }

  // Si requiere evaluación, mostrar botón de agendar consulta
  if (requiereEvaluacion && consultaEvaluacion) {
    return (
      <div className="space-y-3">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800">
                Requiere evaluación previa
              </p>
              <p className="text-xs text-amber-600 mt-1">
                Un profesional debe evaluar tu caso para determinar el plan de tratamiento adecuado.
              </p>
            </div>
          </div>
        </div>
        
        <Link
          href={consultaEvaluacion.url}
          className="flex items-center justify-center gap-2 w-full bg-cialo-gold text-white px-8 py-4 rounded-lg font-medium hover:bg-cialo-dark transition-colors shadow-sm hover:shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Agendar {consultaEvaluacion.nombre}
        </Link>
        
        <p className="text-xs text-center text-gray-500">
          Valor consulta: ${consultaEvaluacion.precio.toLocaleString('es-CL')}
        </p>
      </div>
    );
  }

  // Si NO requiere evaluación, mostrar botón de compra con beneficios
  return (
    <div className="space-y-3">
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-medium text-green-800">Compra y agenda online</span>
        </div>
        <ul className="text-xs text-green-700 space-y-1 ml-6">
          <li>✓ Hora garantizada al pagar</li>
          <li>✓ Sin esperas ni trámites</li>
        </ul>
      </div>
      
      <AddToCartButton
        item={{
          id: tratamiento.id,
          name: tratamiento.name,
          price: tratamiento.price,
          categoria: tratamiento.category,
        }}
        type="tratamiento"
        variant="primary"
        size="lg"
        fullWidth
        label="Comprar y Agendar"
      />
    </div>
  );
}
