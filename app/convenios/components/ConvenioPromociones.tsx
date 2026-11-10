'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { useToast } from '@/app/components/Toast';

interface PromocionConvenio {
    id: string;
    nombre: string;
    descripcion: string;
    precioOriginal: number;
    precioOferta: number;
    descuento: number;
    imagen: string;
    categoria: string;
    duracion: string;
    incluye: string[];
    profesionales?: { id: string; nombre: string }[];
}

const promociones: PromocionConvenio[] = [
    {
        id: 'conv-sculptra',
        nombre: 'Sculptra Bioestimulador',
        descripcion: 'Bioestimulador de colágeno que restaura volumen y firmeza facial de manera gradual y natural.',
        precioOriginal: 500000,
        precioOferta: 475000,
        descuento: 5,
        imagen: '/tratamientos/sculptra.png',
        categoria: 'Premium',
        duracion: '30 min',
        incluye: ['Vial Sculptra', 'Aplicación Médica Especializada'],
        profesionales: [
            { id: 'nicolas-laucirica', nombre: 'Dr. Nicolás Laucirica' },
            { id: 'elga-viviana-pena', nombre: 'Dra. Elga Viviana Peña' },
            { id: 'mariane-kiss', nombre: 'Dra. Mariane Kiss' },
            { id: 'mauriluz-atencio', nombre: 'Dra. Mauriluz Atencio' },
        ],
    },
    {
        id: 'conv-botox-nabota',
        nombre: 'Toxina Botulínica Nabota',
        descripcion: 'Toxina botulínica de alta calidad para suavizar arrugas de frente, entrecejo y patas de gallo.',
        precioOriginal: 210000,
        precioOferta: 195300,
        descuento: 7,
        imagen: '/tratamientos/toxina.png',
        categoria: 'Premium',
        duracion: '20 min',
        incluye: ['Toxina Botulínica Nabota', 'Evaluación Médica'],
        profesionales: [
            { id: 'nicolas-laucirica', nombre: 'Dr. Nicolás Laucirica' },
            { id: 'elga-viviana-pena', nombre: 'Dra. Elga Viviana Peña' },
            { id: 'mariane-kiss', nombre: 'Dra. Mariane Kiss' },
            { id: 'mauriluz-atencio', nombre: 'Dra. Mauriluz Atencio' },
        ],
    },
    {
        id: 'conv-rinomodelacion',
        nombre: 'Rinomodelación',
        descripcion: 'Corrección de imperfecciones nasales con ácido hialurónico de alta densidad. Resultados inmediatos sin cirugía.',
        precioOriginal: 240000,
        precioOferta: 230400,
        descuento: 4,
        imagen: '/tratamientos/rinomodelacion.png',
        categoria: 'Premium',
        duracion: '45 min',
        incluye: ['Ácido Hialurónico Premium', 'Aplicación Especializada'],
        profesionales: [
            { id: 'nicolas-laucirica', nombre: 'Dr. Nicolás Laucirica' },
        ],
    },
    {
        id: 'conv-labios',
        nombre: 'Relleno de Labios',
        descripcion: 'Definición, volumen e hidratación con ácido hialurónico de reología dinámica para un resultado natural.',
        precioOriginal: 240000,
        precioOferta: 220800,
        descuento: 8,
        imagen: '/tratamientos/labios.png',
        categoria: 'Premium',
        duracion: '30 min',
        incluye: ['Ácido Hialurónico Labios', 'Aplicación Especializada'],
        profesionales: [
            { id: 'nicolas-laucirica', nombre: 'Dr. Nicolás Laucirica' },
            { id: 'elga-viviana-pena', nombre: 'Dra. Elga Viviana Peña' },
        ],
    },
    {
        id: 'conv-juvelook',
        nombre: 'Bioestimulador Juvelook',
        descripcion: 'Bioestimulador híbrido diseñado para la redensificación de la delicada área de las ojeras.',
        precioOriginal: 450000,
        precioOferta: 427500,
        descuento: 5,
        imagen: '/tratamientos/juvelook.png',
        categoria: 'Premium',
        duracion: '30 min',
        incluye: ['Juvelook', 'Aplicación Especializada'],
        profesionales: [
            { id: 'nicolas-laucirica', nombre: 'Dr. Nicolás Laucirica' },
            { id: 'elga-viviana-pena', nombre: 'Dra. Elga Viviana Peña' },
            { id: 'mariane-kiss', nombre: 'Dra. Mariane Kiss' },
            { id: 'mauriluz-atencio', nombre: 'Dra. Mauriluz Atencio' },
        ],
    },
    {
        id: 'conv-coolpeel',
        nombre: 'CoolPeel + Exosomas',
        descripcion: 'Láser CO₂ fraccionado potenciado con exosomas para regeneración rápida de la piel sin tiempo de inactividad.',
        precioOriginal: 200000,
        precioOferta: 186000,
        descuento: 7,
        imagen: '/tratamientos/coolpeel.png',
        categoria: 'Facial',
        duracion: '45 min',
        incluye: ['CoolPeel', 'Exosomas Purasome'],
        profesionales: [
            { id: 'nicolas-laucirica', nombre: 'Dr. Nicolás Laucirica' },
            { id: 'elga-viviana-pena', nombre: 'Dra. Elga Viviana Peña' },
        ],
    },
    {
        id: 'conv-manos',
        nombre: 'Rejuvenecimiento de Manos',
        descripcion: '2 jeringas de ácido hialurónico + láser CO₂ en 1 sesión. Restaura volumen y elimina manchas.',
        precioOriginal: 380000,
        precioOferta: 364800,
        descuento: 4,
        imagen: '/tratamientos/manos.png',
        categoria: 'Premium',
        duracion: '60 min',
        incluye: ['2 ml Ácido Hialurónico', 'Láser CO₂'],
    },
    {
        id: 'conv-duo-hidra',
        nombre: 'Dúo Mamá e Hija: 2 HydraFacial',
        descripcion: 'La experiencia perfecta para compartir. Dos limpiezas faciales profundas.',
        precioOriginal: 160000,
        precioOferta: 145600,
        descuento: 9,
        imagen: '/tratamientos/duo-hidra.png',
        categoria: 'Pack',
        duracion: '60 min c/u',
        incluye: ['2 Hydrafacial'],
    },
    {
        id: 'conv-glow',
        nombre: 'Hydrafacial + drenaje linfático facial',
        descripcion: 'Limpieza profunda con tecnología Vortex + drenaje linfático facial para reducir inflamación y mejorar la circulación.',
        precioOriginal: 120000,
        precioOferta: 104400,
        descuento: 13,
        imagen: '/tratamientos/glow.png',
        categoria: 'Facial',
        duracion: '120 min',
        incluye: ['HydraFacial MD', 'Drenaje Linfático Facial'],
    },
    {
        id: 'conv-laser-intimo',
        nombre: 'Láser CO2 Íntimo Femenino (3 sesiones)',
        descripcion: 'Tratamiento íntimo con láser CO2 para rejuvenecimiento funcional y estético.',
        precioOriginal: 750000,
        precioOferta: 585000,
        descuento: 22,
        imagen: '/tratamientos/laser-intimo.png',
        categoria: 'Ginecoestética',
        duracion: '3 sesiones',
        incluye: ['3 Sesiones Láser CO2 Íntimo'],
    },
    {
        id: 'conv-despigmentacion-axilas',
        nombre: 'Despigmentación de Axilas',
        descripcion: 'Aclara y unifica el tono de la piel en las axilas mediante peeling químico especializado.',
        precioOriginal: 120000,
        precioOferta: 105600,
        descuento: 12,
        imagen: '/tratamientos/axilas.png',
        categoria: 'Corporal',
        duracion: '30 min',
        incluye: ['Peeling Químico Axilas'],
    },
    {
        id: 'conv-despigmentacion-2zonas',
        nombre: 'Despigmentación 2 Zonas',
        descripcion: 'Blanqueamiento de rebaje íntimo + axilas. Unifica el tono de la piel en ambas zonas.',
        precioOriginal: 270000,
        precioOferta: 199800,
        descuento: 26,
        imagen: '/tratamientos/despigmentacion.png',
        categoria: 'Corporal',
        duracion: '60 min',
        incluye: ['Blanqueamiento Rebaje', 'Blanqueamiento Axilas'],
    },
];

function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
    }).format(price);
}

interface ConvenioPromocionesProps {
    titulo?: string;
    subtitulo?: string;
}

export default function ConvenioPromociones({ 
    titulo = "Promociones Exclusivas",
    subtitulo = "Beneficios especiales para miembros del convenio"
}: ConvenioPromocionesProps) {
    const router = useRouter();
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<Record<string, string>>({});
    const [comprandoId, setComprandoId] = useState<string | null>(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('Todas');
    const addItem = useCartStore((state) => state.addItem);
    const clearCart = useCartStore((state) => state.clearCart);
    const { showToast } = useToast();

    const categorias = ['Todas', ...Array.from(new Set(promociones.map(o => o.categoria)))];

    const promocionesFiltradas = categoriaSeleccionada === 'Todas' 
        ? promociones 
        : promociones.filter(o => o.categoria === categoriaSeleccionada);

    const handleProfesionalChange = (promocionId: string, profesionalNombre: string) => {
        setProfesionalSeleccionado(prev => ({
            ...prev,
            [promocionId]: profesionalNombre
        }));
    };

    const handleComprar = (promocion: PromocionConvenio) => {
        setComprandoId(promocion.id);
        
        const profesional = profesionalSeleccionado[promocion.id];
        const nombreConProfesional = profesional 
            ? `${promocion.nombre} (Con: ${profesional})`
            : promocion.nombre;
        
        clearCart();
        addItem({
            id: promocion.id,
            type: 'tratamiento',
            name: nombreConProfesional,
            price: promocion.precioOferta,
            image: promocion.imagen,
            categoria: promocion.categoria,
        });

        showToast('Redirigiendo al checkout...', 'success');
        
        setTimeout(() => {
            router.push('/checkout/');
        }, 500);
    };

    return (
        <section id="promociones" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-block bg-[#faf6ef] px-6 py-2 rounded-full mb-6">
                        <span className="text-[#b8935f] font-bold text-[10px] uppercase tracking-[0.4em]">Ofertas Especiales</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4 tracking-wide">{titulo}</h2>
                    <p className="text-sm text-[#6f6a5c] max-w-xl mx-auto">{subtitulo}</p>
                </div>

                {/* Filtros por categoría */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categorias.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaSeleccionada(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                categoriaSeleccionada === cat
                                    ? 'bg-[#b8935f] text-[#1b1a18]'
                                    : 'bg-[#f0f0f0] text-[#6f6a5c] hover:bg-[#e0e0e0]'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {promocionesFiltradas.map((promocion) => (
                        <div
                            key={promocion.id}
                            className="bg-[#faf6ef] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100"
                        >
                            <div className="relative h-40 bg-gradient-to-br from-[#faf6ef] to-[#eee]">
                                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-20">
                                    <span className="text-[#b8935f]">✦</span>
                                </div>
                                {promocion.descuento > 0 && (
                                    <div className="absolute top-3 left-3 bg-[#b8935f] text-[#1b1a18] px-2 py-0.5 text-xs font-bold rounded-full">
                                        -{promocion.descuento}%
                                    </div>
                                )}
                                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-[#6f6a5c] rounded">
                                    {promocion.categoria}
                                </div>
                            </div>

                            <div className="p-5 flex-grow flex flex-col">
                                <h3 className="text-lg font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2 leading-tight">{promocion.nombre}</h3>
                                <p className="text-xs text-[#6f6a5c] mb-4 flex-grow leading-relaxed">{promocion.descripcion}</p>

                                <div className="mb-3">
                                    <ul className="text-[11px] text-[#6f6a5c] space-y-0.5">
                                        {promocion.incluye.map((item, i) => (
                                            <li key={i} className="flex items-center gap-1.5">
                                                <span className="text-[#b8935f] text-xs">✓</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-xl font-bold text-[#b8935f]">{formatPrice(promocion.precioOferta)}</span>
                                    {promocion.descuento > 0 && (
                                        <span className="text-xs text-[#999] line-through">{formatPrice(promocion.precioOriginal)}</span>
                                    )}
                                </div>

                                {promocion.profesionales && promocion.profesionales.length > 0 && (
                                    <div className="mb-3">
                                        <select
                                            value={profesionalSeleccionado[promocion.id] || ''}
                                            onChange={(e) => handleProfesionalChange(promocion.id, e.target.value)}
                                            className="w-full px-2 py-1.5 bg-white border border-[#b8935f]/30 rounded-sm text-xs text-[#1b1a18] focus:outline-none focus:ring-2 focus:ring-[#b8935f]"
                                        >
                                            <option value="">-- Seleccionar profesional --</option>
                                            {promocion.profesionales.map((prof) => (
                                                <option key={prof.id} value={prof.nombre}>
                                                    {prof.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <button
                                    onClick={() => handleComprar(promocion)}
                                    disabled={comprandoId === promocion.id}
                                    className="block w-full bg-[#b8935f] text-[#1b1a18] py-2.5 font-semibold uppercase text-xs tracking-wider hover:bg-[#c4b190] transition-all text-center rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {comprandoId === promocion.id ? 'Procesando...' : 'Comprar ahora'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <p className="text-[10px] text-gray-400 italic uppercase tracking-widest">
                        * Precios exclusivos para miembros del convenio. Sujeto a evaluación médica previa.
                    </p>
                </div>
            </div>
        </section>
    );
}
