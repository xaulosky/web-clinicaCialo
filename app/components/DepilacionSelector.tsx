'use client';

import { useState } from 'react';
import { ZonaDepilacion } from '@/data/tratamientos';
import { useCartStore } from '@/lib/cart-store';

interface DepilacionSelectorProps {
    zonas: ZonaDepilacion[];
}

type TipoCompra = 'sesion' | 'pack';

export default function DepilacionSelector({ zonas }: DepilacionSelectorProps) {
    const [selectedZona, setSelectedZona] = useState<ZonaDepilacion | null>(null);
    const [tipoCompra, setTipoCompra] = useState<TipoCompra>('sesion');
    const [searchTerm, setSearchTerm] = useState('');
    const addItem = useCartStore((state) => state.addItem);

    const filteredZonas = zonas.filter(z =>
        z.zona.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPrecio = () => {
        if (!selectedZona) return 0;
        return tipoCompra === 'pack' && selectedZona.packPrecio
            ? selectedZona.packPrecio
            : selectedZona.precio;
    };

    const getAhorro = () => {
        if (!selectedZona || !selectedZona.packPrecio || !selectedZona.packSesiones) return 0;
        const precioSinPack = selectedZona.precio * selectedZona.packSesiones;
        return precioSinPack - selectedZona.packPrecio;
    };

    const handleAddToCart = () => {
        if (!selectedZona) return;

        const nombre = tipoCompra === 'pack' && selectedZona.packSesiones
            ? `Depilación Láser: ${selectedZona.zona} (Pack ${selectedZona.packSesiones} sesiones)`
            : `Depilación Láser: ${selectedZona.zona} (1 sesión)`;

        addItem({
            id: `depilacion-${selectedZona.zona.toLowerCase().replace(/\s/g, '-')}-${tipoCompra}`,
            type: 'tratamiento',
            name: nombre,
            price: getPrecio(),
            categoria: 'Corporal',
        });
    };

    // Agrupar zonas por categoría
    const zonasRostro = filteredZonas.filter(z =>
        ['Pómulos', 'Entrecejo', 'Patillas', 'Mentón', 'Bozo', 'Mejillas', 'Frente', 'Cuello Anterior', 'Orejas', 'Perfilado de Barba', 'Barba Completa', 'Rostro Completo', 'Medio Rostro'].some(
            term => z.zona.includes(term)
        ) && !z.zona.includes('Cuerpo')
    );
    const zonasCuerpo = filteredZonas.filter(z =>
        ['Tórax', 'Abdomen', 'Línea Alba', 'Areola', 'Espalda', 'Cuello Posterior', 'Brazos', 'Medio Brazo', 'Axilas', 'Manos', 'Piernas', 'Media Pierna', 'Pies', 'Glúteos', 'Rebaje', 'Interglúteo'].some(
            term => z.zona.includes(term)
        ) && !z.zona.includes('Cuerpo Completo')
    );
    const zonasFull = filteredZonas.filter(z => z.zona.includes('Cuerpo Completo'));

    return (
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-gray-100">
            <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-cialo-gray mb-2">
                Selecciona tu Zona
            </h2>
            <p className="text-sm text-gray-500 mb-6">
                Elige la zona a depilar y el tipo de compra
            </p>

            {/* Buscador */}
            <div className="relative mb-6">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Buscar zona..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cialo-gold/50 focus:border-cialo-gold"
                />
            </div>

            {/* Lista de zonas */}
            <div className="max-h-[300px] overflow-y-auto space-y-4 mb-6 custom-scrollbar pr-2">
                {/* Packs Full */}
                {zonasFull.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase text-purple-600 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                            Packs Completos
                        </h3>
                        <div className="space-y-2">
                            {zonasFull.map((z) => (
                                <button
                                    key={z.zona}
                                    onClick={() => setSelectedZona(z)}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedZona?.zona === z.zona
                                            ? 'border-cialo-gold bg-cialo-gold/5'
                                            : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-medium text-gray-800">{z.zona}</span>
                                            <span className="ml-2 text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                                                {z.tamano}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-cialo-gold">
                                            ${z.precio.toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Rostro */}
                {zonasRostro.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase text-blue-600 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                            Rostro y Cuello
                        </h3>
                        <div className="space-y-2">
                            {zonasRostro.map((z) => (
                                <button
                                    key={z.zona}
                                    onClick={() => setSelectedZona(z)}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedZona?.zona === z.zona
                                            ? 'border-cialo-gold bg-cialo-gold/5'
                                            : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-medium text-gray-800">{z.zona}</span>
                                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${z.tamano === 'Mini' ? 'bg-blue-100 text-blue-700' :
                                                    z.tamano === 'Pequeña' ? 'bg-green-100 text-green-700' :
                                                        z.tamano === 'Mediana' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-orange-100 text-orange-700'
                                                }`}>
                                                {z.tamano}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-cialo-gold">
                                            ${z.precio.toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cuerpo */}
                {zonasCuerpo.length > 0 && (
                    <div>
                        <h3 className="text-xs font-bold uppercase text-green-600 mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-600"></span>
                            Cuerpo
                        </h3>
                        <div className="space-y-2">
                            {zonasCuerpo.map((z) => (
                                <button
                                    key={z.zona}
                                    onClick={() => setSelectedZona(z)}
                                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${selectedZona?.zona === z.zona
                                            ? 'border-cialo-gold bg-cialo-gold/5'
                                            : 'border-gray-100 hover:border-gray-200'
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-medium text-gray-800">{z.zona}</span>
                                            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${z.tamano === 'Pequeña' ? 'bg-green-100 text-green-700' :
                                                    z.tamano === 'Mediana' ? 'bg-yellow-100 text-yellow-700' :
                                                        z.tamano === 'Grande' ? 'bg-orange-100 text-orange-700' :
                                                            z.tamano === 'Extra Grande' ? 'bg-red-100 text-red-700' :
                                                                'bg-purple-100 text-purple-700'
                                                }`}>
                                                {z.tamano}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-cialo-gold">
                                            ${z.precio.toLocaleString('es-CL')}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Zona seleccionada */}
            {selectedZona && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Zona seleccionada</p>
                            <p className="font-semibold text-gray-800">{selectedZona.zona}</p>
                        </div>
                        <button
                            onClick={() => setSelectedZona(null)}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Selector de tipo */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                            onClick={() => setTipoCompra('sesion')}
                            className={`p-4 rounded-lg border-2 transition-all text-center ${tipoCompra === 'sesion'
                                    ? 'border-cialo-gold bg-white'
                                    : 'border-gray-200 bg-white hover:border-gray-300'
                                }`}
                        >
                            <p className="text-xs text-gray-500 mb-1">Sesión Individual</p>
                            <p className="text-xl font-bold text-cialo-gold">
                                ${selectedZona.precio.toLocaleString('es-CL')}
                            </p>
                        </button>

                        {selectedZona.packPrecio && selectedZona.packSesiones && (
                            <button
                                onClick={() => setTipoCompra('pack')}
                                className={`p-4 rounded-lg border-2 transition-all text-center relative ${tipoCompra === 'pack'
                                        ? 'border-cialo-gold bg-white'
                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                            >
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    AHORRA ${getAhorro().toLocaleString('es-CL')}
                                </span>
                                <p className="text-xs text-gray-500 mb-1">Pack {selectedZona.packSesiones} sesiones</p>
                                <p className="text-xl font-bold text-cialo-gold">
                                    ${selectedZona.packPrecio.toLocaleString('es-CL')}
                                </p>
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Resumen y botón */}
            <div className="border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Total a pagar</span>
                    <span className="text-2xl font-bold text-cialo-gold">
                        ${getPrecio().toLocaleString('es-CL')}
                    </span>
                </div>

                <button
                    onClick={handleAddToCart}
                    disabled={!selectedZona}
                    className={`btn btn-primary btn-lg btn-full ${!selectedZona ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    {selectedZona
                        ? tipoCompra === 'pack'
                            ? `Agregar Pack ${selectedZona.packSesiones} sesiones`
                            : 'Agregar Sesión Individual'
                        : 'Selecciona una zona'
                    }
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                    Después de pagar, te contactaremos para agendar tu cita
                </p>
            </div>
        </div>
    );
}
