'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/cart-store';
import { profesionalesData } from '@/data/profesionales';
import { tratamientosData } from '@/data/tratamientos';

/** Cierre del Cyber: desde este momento la página deja de vender. */
const CYBER_DEADLINE = new Date('2026-10-11T23:59:59-03:00');

type OfertaCyber = {
    id: string;
    nombre: string;
    descripcion: string;
    precioOriginal: number;
    precioOferta: number;
    descuento: number;
    textoDescuento?: string;
    textoPrecio?: string;
    imagen: string;
    categoria: string;
    duracion: string;
    incluye: string[];
    destacado?: boolean;
    mensajeWhatsapp?: string;
    /** ids de profesionalesData; vacío = la clínica asigna profesional. */
    profesionales: string[];
    /** Oferta por porcentaje sobre packs: el cliente elige uno y paga ese pack con descuento. */
    packs?: { nombre: string; precio: number }[];
};

/** Packs de depilación vigentes, tomados de la ficha del tratamiento para no duplicar precios. */
const PACKS_DEPILACION = (tratamientosData.find((t) => t.id === 'depilacion-laser')?.planes ?? [])
    // Fuera: el "(PACK) POMULOS" no es un plan de sesiones, y "ROSTRO COMPLETO" figura a
    // $21.000 (parece un error de tipeo en los datos). Revisar antes de volver a incluirlos.
    .filter((p) => p.nombre.startsWith('PLAN') && !p.nombre.includes('ROSTRO COMPLETO'))
    .map((p) => ({ nombre: nombrePack(p.nombre), precio: p.precio }));

function nombrePack(raw: string): string {
    // "PLAN 8 SESIONES DE DEPILACIÓN POMULOS" -> "Pomulos (8 sesiones)"
    const sesiones = raw.match(/(\d+)\s+SESIONES/i)?.[1];
    const zona = raw
        .replace(/[ÒÓ]/g, 'O')
        .replace(/^PLAN\s+/i, '')
        .replace(/\d+\s+SESIONES\s*/i, '')
        .replace(/^(DE\s+)?DEPILACION\s*/i, '')
        .replace(/^DE\s+/i, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();
    // Algunos nombres en los datos vienen con el paréntesis sin cerrar.
    const cerrada = (zona.match(/\(/g)?.length ?? 0) > (zona.match(/\)/g)?.length ?? 0) ? `${zona})` : zona;
    const bonita = cerrada.charAt(0).toUpperCase() + cerrada.slice(1);
    return sesiones ? `${bonita} (${sesiones} sesiones)` : bonita;
}

/** Precio con descuento, redondeado a la centena. */
function conDescuento(precio: number, pct: number): number {
    return Math.round((precio * (100 - pct)) / 100 / 100) * 100;
}

const ofertasCyber: OfertaCyber[] = [
    {
        id: 'cyber-oct-bta-nabota',
        nombre: 'Toxina Botulínica Nabota (Tercio Superior)',
        descripcion: 'Suaviza las líneas de expresión de frente, entrecejo y patas de gallo con resultados naturales.',
        precioOriginal: 210000,
        precioOferta: 190000,
        descuento: 10,
        imagen: '/tratamientos/biostimuladores-vs-ah.png',
        categoria: 'Inyectables',
        duracion: '1 sesión',
        incluye: ['Frente, entrecejo y patas de gallo', 'Toxina Nabota', 'Control a los 15 días'],
        destacado: true,
        profesionales: ['mauriluz-atencio', 'nicolas-laucirica', 'elga-viviana-pena'],
    },
    {
        id: 'cyber-oct-toxina-vitaminas',
        nombre: 'Toxina Botulínica + Vitaminas Faciales',
        descripcion: 'Combo que relaja las arrugas de expresión y revitaliza la piel con un cóctel de vitaminas.',
        precioOriginal: 0,
        precioOferta: 269900,
        descuento: 0,
        textoDescuento: 'Combo Cyber',
        imagen: '/tratamientos/biostimuladores-vs-ah.png',
        categoria: 'Inyectables',
        duracion: '1 sesión',
        incluye: ['Toxina botulínica', 'Vitaminas faciales', 'Evaluación incluida'],
        destacado: true,
        profesionales: ['mariane-kiss'],
    },
    {
        id: 'cyber-oct-mesoterapia-vitaminas',
        nombre: 'Mesoterapia con Vitaminas',
        descripcion: 'Hidrata, ilumina y mejora la calidad de la piel con microinyecciones de vitaminas.',
        precioOriginal: 0,
        precioOferta: 109000,
        descuento: 0,
        textoDescuento: 'Precio Cyber',
        imagen: '/tratamientos/valentin_duo_glow.png',
        categoria: 'Piel',
        duracion: '1 sesión',
        incluye: ['Cóctel de vitaminas', 'Luminosidad e hidratación', 'Evaluación incluida'],
        profesionales: ['mauriluz-atencio', 'elga-viviana-pena'],
    },
    {
        id: 'cyber-oct-sculptra',
        nombre: 'Sculptra® Facial o Corporal',
        descripcion: 'Bioestimulador de colágeno que mejora firmeza y calidad de la piel de forma progresiva y natural.',
        precioOriginal: 480000,
        precioOferta: 450000,
        descuento: 6,
        imagen: '/tratamientos/biostimuladores-vs-ah.png',
        categoria: 'Bioestimuladores',
        duracion: '1 vial',
        incluye: ['Uso facial o corporal', 'Bioestimulación de colágeno', 'Evaluación incluida'],
        profesionales: ['mauriluz-atencio', 'nicolas-laucirica', 'elga-viviana-pena'],
    },
    {
        id: 'cyber-oct-juvelook',
        nombre: 'Juvelook',
        descripcion: 'Bioestimulador de nueva generación que mejora textura, poros y firmeza de la piel.',
        precioOriginal: 0,
        precioOferta: 400000,
        descuento: 0,
        textoDescuento: 'Precio Cyber',
        imagen: '/tratamientos/biostimuladores-vs-ah.png',
        categoria: 'Bioestimuladores',
        duracion: '1 sesión',
        incluye: ['Bioestimulador PLA + AH', 'Mejora de textura y poros', 'Evaluación incluida'],
        profesionales: ['nicolas-laucirica', 'elga-viviana-pena'],
    },
    {
        id: 'cyber-oct-manos-laser',
        nombre: 'Rejuvenecimiento de Manos con Láser',
        descripcion: 'Atenúa manchas y mejora la textura de la piel de las manos.',
        precioOriginal: 0,
        precioOferta: 150000,
        descuento: 0,
        textoDescuento: 'Precio Cyber',
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Piel',
        duracion: '1 sesión',
        incluye: ['Láser en dorso de manos', 'Mejora de manchas y textura', 'Evaluación incluida'],
        profesionales: ['elga-viviana-pena'],
    },
    {
        id: 'cyber-oct-tricopat',
        nombre: 'Tricopat (1 Sesión)',
        descripcion: 'Tratamiento capilar para frenar la caída y fortalecer el cabello.',
        precioOriginal: 250000,
        precioOferta: 212500,
        descuento: 15,
        imagen: '/tratamientos/valentin_duo_glow.png',
        categoria: 'Capilar',
        duracion: '1 sesión',
        incluye: ['1 sesión de Tricopat', '15% de descuento', 'Requiere evaluación pagada'],
        profesionales: ['javiera-araya'],
    },
    {
        id: 'cyber-oct-implante-capilar',
        nombre: 'Implante Capilar FUE Zafiro',
        descripcion: 'Injerto capilar con técnica FUE Zafiro. El valor depende de la cantidad de unidades foliculares: desde $1.710.000 (1.000 unidades) hasta $4.914.000, con el 10% de descuento ya aplicado.',
        precioOriginal: 0,
        precioOferta: 0,
        descuento: 10,
        textoPrecio: '$1.710.000 – $4.914.000',
        imagen: '/tratamientos/valentin_duo_glow.png',
        categoria: 'Capilar',
        duracion: 'Según evaluación',
        incluye: ['Técnica FUE Zafiro', '10% de descuento en presupuesto', 'Requiere evaluación pagada'],
        mensajeWhatsapp: 'Hola, quiero cotizar el Implante Capilar con 10% de descuento del Cyber CIALO 💆‍♂️',
        profesionales: ['javiera-araya'],
    },
    {
        id: 'cyber-oct-engrosamiento',
        nombre: 'Engrosamiento Peneano',
        descripcion: 'Mejora de grosor con ácido hialurónico, con resultados seguros y discretos. Requiere una hora previa con el urólogo. Valor normal desde $900.000; se cotiza con el 15% de descuento aplicado.',
        precioOriginal: 0,
        precioOferta: 0,
        descuento: 15,
        textoPrecio: 'Desde $765.000',
        imagen: '/tratamientos/valentin_body_shaping.png',
        categoria: 'Estética Masculina',
        duracion: 'Según evaluación',
        incluye: ['Requiere hora previa con urólogo', '15% de descuento en presupuesto', 'Procedimiento con urólogo'],
        mensajeWhatsapp: 'Hola, quiero cotizar el Engrosamiento Peneano con 15% de descuento del Cyber CIALO',
        profesionales: ['guillermo-contreras', 'frank-ulloa'],
    },
    {
        id: 'cyber-oct-emsella-10',
        nombre: 'Emsella (10 Sesiones)',
        descripcion: 'Fortalece el suelo pélvico sin cirugía: mejora la incontinencia urinaria y la función íntima, sentado y con ropa.',
        precioOriginal: 600000,
        precioOferta: 480000,
        descuento: 20,
        imagen: '/tratamientos/valentin_body_shaping.png',
        categoria: 'Suelo Pélvico',
        duracion: '10 sesiones',
        incluye: ['10 sesiones de Emsella', '20% de descuento', 'Evaluación incluida'],
        destacado: true,
        profesionales: [],
    },
    // Mismas condiciones que en el CyberDay de junio.
    {
        id: 'cyber-oct-laser-vaginal-co2-3',
        nombre: 'Láser Vaginal CO2 (3 Sesiones)',
        descripcion: 'Mejora tu salud íntima con tecnología láser CO2: tensado y rejuvenecimiento. Plan completo de 3 sesiones.',
        precioOriginal: 490000,
        precioOferta: 380000,
        descuento: 22,
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Ginecoestética',
        duracion: '3 sesiones',
        incluye: ['3 sesiones de Láser CO2', 'Tratamiento indoloro', 'Privacidad garantizada'],
        profesionales: ['maria-laura-villarroel', 'stefania-kuncar'],
    },
    {
        id: 'cyber-oct-laser-vaginal-co2-exosomas',
        nombre: 'Láser Vaginal CO2 + Exosomas',
        descripcion: 'Rejuvenecimiento íntimo avanzado que combina el poder del Láser CO2 con factores de crecimiento de los exosomas.',
        precioOriginal: 0,
        precioOferta: 480000,
        descuento: 0,
        textoDescuento: 'Precio Cyber',
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Ginecoestética',
        duracion: '2 sesiones',
        incluye: ['2 sesiones Láser CO2 vaginal', 'Aplicación de exosomas', 'Evaluación y diagnóstico'],
        profesionales: ['maria-laura-villarroel', 'stefania-kuncar'],
    },
    {
        id: 'cyber-oct-depilacion-packs',
        nombre: 'Depilación Láser: 15% en Packs',
        descripcion: 'Elige cualquier pack de depilación láser Soprano Titanium y llévalo con 15% de descuento sobre el total del pack.',
        precioOriginal: 0,
        precioOferta: 0,
        descuento: 15,
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Depilación Láser',
        duracion: '6 u 8 sesiones según zona',
        incluye: ['Todos los packs por zona', '15% sobre el total del pack', 'Láser Soprano Titanium'],
        destacado: true,
        profesionales: ['katalina-neumann', 'maria-jesus-contreras'],
        packs: PACKS_DEPILACION,
    },
];

function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
    }).format(price);
}

export default function CyberPage() {
    const router = useRouter();
    const addItem = useCartStore((state) => state.addItem);

    const [mounted, setMounted] = useState(false);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState<Record<string, string>>({});
    const [packSeleccionado, setPackSeleccionado] = useState<Record<string, number>>({});

    useEffect(() => {
        setMounted(true);
    }, []);

    const [filtro, setFiltro] = useState('Todos');
    const [ordenarDesc, setOrdenarDesc] = useState(false);
    const categorias = ['Todos', ...Array.from(new Set(ofertasCyber.map(o => o.categoria)))];
    const ofertasFiltradas = (() => {
        let lista = filtro === 'Todos' ? ofertasCyber : ofertasCyber.filter(o => o.categoria === filtro);
        if (ordenarDesc) lista = [...lista].sort((a, b) => b.descuento - a.descuento);
        return lista;
    })();

    const nombreProfesional = (p: (typeof profesionalesData)[number]) =>
        `${p.titulo ? p.titulo + ' ' : ''}${p.nombre} ${p.apellido}`;

    const getProfesionalesPorOferta = (oferta: OfertaCyber) =>
        oferta.profesionales
            .map((id) => profesionalesData.find((p) => p.id === id))
            .filter((p): p is (typeof profesionalesData)[number] => Boolean(p));

    const handleProfesionalChange = (ofertaId: string, profesionalNombre: string) => {
        setProfesionalSeleccionado(prev => ({
            ...prev,
            [ofertaId]: profesionalNombre
        }));
    };

    const handleBuy = (oferta: OfertaCyber) => {
        // Si la oferta es de un solo profesional, va con él sin preguntar.
        const unico = getProfesionalesPorOferta(oferta);
        const profesional = profesionalSeleccionado[oferta.id] || (unico.length === 1 ? nombreProfesional(unico[0]) : '');
        const nombreConProfesional = profesional 
            ? `${oferta.nombre} (Con: ${profesional})`
            : oferta.nombre;
        
        const pack = oferta.packs ? oferta.packs[packSeleccionado[oferta.id] ?? -1] : undefined;
        if (oferta.packs && !pack) return;

        addItem({
            id: pack ? `${oferta.id}-${packSeleccionado[oferta.id]}` : oferta.id,
            name: pack
                ? `Depilación Láser ${pack.nombre} (Cyber -${oferta.descuento}%)${profesional ? ` (Con: ${profesional})` : ''}`
                : nombreConProfesional,
            price: pack ? conDescuento(pack.precio, oferta.descuento) : oferta.precioOferta,
            type: 'tratamiento',
            image: oferta.imagen,
            categoria: oferta.categoria,
            isCyber: true,
        });
        router.push('/checkout');
    };

    if (!mounted) return null;

    const isExpired = new Date() >= CYBER_DEADLINE;

    if (isExpired) {
        return (
            <div className="flex flex-col min-h-screen bg-[#faf6ef]">
                <Navbar />
                <div className="max-w-2xl mx-auto px-4 py-32 text-center flex-grow flex flex-col justify-center">
                    <span className="text-4xl mb-4 block">⏳</span>
                    <h1 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-6">El Cyber CIALO ha finalizado</h1>
                    <p className="text-[#6f6a5c] mb-8 text-lg">
                        Agradecemos a todos nuestros pacientes por participar en esta increíble jornada de promociones.
                        Nuestros tratamientos volverán a su valor regular, pero siempre estamos disponibles para asesorarte e indicarte las mejores opciones.
                    </p>
                    <Link href="/" className="inline-flex mx-auto items-center justify-center gap-2 bg-[#1e1b4b] text-white px-8 py-3 font-semibold uppercase tracking-wider hover:bg-[#312e81] transition-all rounded-sm">
                        Volver al inicio
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar />

            {/* Ofertas Section */}
            <section id="ofertas" className="pt-24 pb-14 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <span className="text-blue-600 uppercase tracking-widest text-xs font-semibold mb-3 block">⚡ Cyber CIALO · Hasta el domingo 11 de octubre</span>
                        <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">Oportunidades Exclusivas</h2>
                        <p className="text-sm text-[#6f6a5c] max-w-xl mx-auto">Paga ahora en la web, congela el precio y agenda según tu disponibilidad. Precio Cyber solo con pago 100% online.</p>
                    </div>

                    {/* Filtros */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {categorias.map((cat) => (
                            <button key={cat} onClick={() => setFiltro(cat)} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all ${filtro === cat ? 'bg-[#1e1b4b] text-white border-[#1e1b4b]' : 'bg-white text-[#6f6a5c] border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}>{cat}</button>
                        ))}
                        <button onClick={() => setOrdenarDesc(!ordenarDesc)} className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border transition-all flex items-center gap-1 ${ordenarDesc ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-[#6f6a5c] border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}>
                            <span>🔥</span> + Descuento
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {ofertasFiltradas.map((oferta) => (
                            <div key={oferta.id} className={`bg-[#faf6ef] rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col border ${oferta.destacado ? 'border-blue-500 ring-1 ring-blue-500 relative' : 'border-gray-100'}`}>
                                <div className="flex items-center justify-between px-4 pt-3 pb-1">
                                    <span className="bg-[#1e1b4b] text-white px-2.5 py-0.5 text-xs font-bold rounded-full">{oferta.textoDescuento || `-${oferta.descuento}%`}</span>
                                    <span className="flex items-center gap-1.5">
                                        {oferta.destacado && (<span className="bg-blue-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-full">⭐ Top</span>)}
                                        <span className="text-[10px] font-medium text-[#6f6a5c] uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">{oferta.categoria}</span>
                                    </span>
                                </div>
                                <div className="px-4 pb-4 flex-grow flex flex-col">
                                    <h3 className="text-base font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-1">{oferta.nombre}</h3>
                                    <p className="text-[11px] text-[#6f6a5c] mb-2 flex-grow line-clamp-2">{oferta.descripcion}</p>
                                    <ul className="text-[11px] text-[#6f6a5c] space-y-0.5 mb-2">
                                        {oferta.incluye.map((item, i) => (<li key={i} className="flex items-center gap-1"><span className="text-blue-500">✓</span> {item}</li>))}
                                    </ul>
                                    
                                    {/* Selección de profesional */}
                                    {(() => {
                                        const profesionales = getProfesionalesPorOferta(oferta);
                                        if (profesionales.length === 0) return null;
                                        if (profesionales.length === 1) {
                                            return (
                                                <p className="mb-3 text-[11px] text-[#6f6a5c]">
                                                    Con <span className="font-semibold text-[#1b1a18]">{nombreProfesional(profesionales[0])}</span>
                                                </p>
                                            );
                                        }
                                        return (
                                            <div className="mb-3">
                                                <label className="text-[10px] font-medium text-[#6f6a5c] uppercase tracking-wider mb-1 block">Profesional</label>
                                                <select
                                                    value={profesionalSeleccionado[oferta.id] || ''}
                                                    onChange={(e) => handleProfesionalChange(oferta.id, e.target.value)}
                                                    className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-sm text-xs text-[#1b1a18] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="">Elige profesional (opcional)</option>
                                                    {profesionales.map((prof) => (
                                                        <option key={prof.id} value={nombreProfesional(prof)}>{nombreProfesional(prof)}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        );
                                    })()}

                                    {oferta.packs && (
                                        <div className="mb-3">
                                            <label className="text-[10px] font-medium text-[#6f6a5c] uppercase tracking-wider mb-1 block">Pack</label>
                                            <select
                                                value={packSeleccionado[oferta.id] ?? ''}
                                                onChange={(e) => setPackSeleccionado((prev) => ({ ...prev, [oferta.id]: Number(e.target.value) }))}
                                                className="w-full px-2 py-1.5 bg-white border border-gray-300 rounded-sm text-xs text-[#1b1a18] focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="" disabled>Elige tu pack</option>
                                                {oferta.packs.map((p, i) => (
                                                    <option key={p.nombre} value={i}>{p.nombre} · {formatPrice(conDescuento(p.precio, oferta.descuento))}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="flex items-end gap-2 mb-3">
                                        {oferta.packs ? (() => {
                                            const p = oferta.packs[packSeleccionado[oferta.id] ?? -1];
                                            return p
                                                ? (<><span className="text-lg font-bold text-blue-700">{formatPrice(conDescuento(p.precio, oferta.descuento))}</span><span className="text-[11px] text-[#999] line-through">{formatPrice(p.precio)}</span></>)
                                                : (<span className="text-lg font-bold text-blue-700">-{oferta.descuento}% en tu pack</span>);
                                        })() : oferta.textoPrecio ? (<span className="text-lg font-bold text-blue-700">{oferta.textoPrecio}</span>) : oferta.precioOferta > 0 ? (<><span className="text-lg font-bold text-blue-700">{formatPrice(oferta.precioOferta)}</span>{oferta.precioOriginal > 0 && (<span className="text-[11px] text-[#999] line-through">{formatPrice(oferta.precioOriginal)}</span>)}</>) : (<span className="text-lg font-bold text-blue-700">Consultar</span>)}
                                    </div>
                                    {oferta.mensajeWhatsapp ? (
                                        <a
                                            href={`https://wa.me/56982028473?text=${encodeURIComponent(oferta.mensajeWhatsapp)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-[#25D366] text-white py-2 font-semibold uppercase text-xs tracking-wider text-center rounded-sm hover:bg-[#20b858] transition-all"
                                        >
                                            Consultar por WhatsApp
                                        </a>
                                    ) : oferta.precioOferta > 0 || oferta.packs ? (
                                        <button
                                            onClick={() => handleBuy(oferta)}
                                            disabled={Boolean(oferta.packs) && packSeleccionado[oferta.id] === undefined}
                                            className="w-full bg-cialo-gray text-white py-2 font-semibold uppercase text-xs tracking-wider hover:bg-cialo-gold transition-all text-center rounded-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cialo-gray"
                                        >
                                            Comprar Ahora
                                        </button>
                                    ) : (
                                        <span className="block w-full bg-gray-200 text-gray-600 py-2 font-semibold uppercase text-xs tracking-wider text-center rounded-sm">
                                            Consultar en Clínica
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gift Card Section - Oculto post-cyber si no se puede pagar */}
            {/* <section className="py-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-white/60 uppercase tracking-widest text-xs font-semibold mb-4 block">🎁 Regala Bienestar</span>
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">El Regalo Perfecto</h2>
                    <p className="text-white/70 mb-8 max-w-2xl mx-auto md:text-lg">
                        Sorprende a alguien especial con una experiencia increíble en Clínica CIALO. Compra ahora y le enviaremos una Gift Card digital personalizada de inmediato.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20comprar%20un%20tratamiento%20como%20Gift%20Card%20Cyber%20CIALO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-blue-400 transition-all rounded-sm shadow-lg"
                        >
                            <span>💝</span> Comprar Gift Card
                        </a>
                    </div>
                </div>
            </section> */}

            {/* Términos */}
            <section className="py-12 bg-[#faf6ef]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-[#1b1a18] mb-3">📋 Términos y Condiciones Cyber CIALO</h3>
                        <ul className="text-sm text-[#6f6a5c] space-y-2">
                            <li>• Promociones válidas hasta el domingo 11 de octubre de 2026 a las 23:59, o hasta agotar cupos.</li>
                            <li>• <strong>Pago 100% online:</strong> el precio Cyber es válido solo pagando el total en esta web. No se aceptan pagos en recepción, en consulta ni después del tratamiento.</li>
                            <li>• <strong>Evaluación sin costo</strong> solo en los tratamientos que lo indican en su oferta.</li>
                            <li>• <strong>Engrosamiento peneano:</strong> requiere una hora previa con el urólogo antes del procedimiento.</li>
                            <li>• Tienes un máximo de <strong>30 días</strong> para iniciar tu tratamiento desde la compra.</li>
                            <li>• <strong>Transferibilidad:</strong> El pack puede ser transferido a otra persona antes de su inicio. Una vez realizada la primera sesión, se vuelve estrictamente personal e intransferible.</li>
                            <li>• Los tratamientos se agendarán en base a la disponibilidad de los profesionales. De no haber disponibilidad con el profesional solicitado, solo se podrá agendar con el que esté disponible.</li>
                            <li>• Una vez realizada la compra, <strong>no se realizarán devoluciones de dinero</strong>.</li>
                            <li>• No acumulable con otros descuentos, cupones ni promociones vigentes.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-[#1e1b4b]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">¿Tienes dudas o necesitas asesoría?</h2>
                    <p className="text-blue-100/70 mb-6 md:text-lg">Escríbenos, nuestro equipo te ayudará a escoger el mejor tratamiento para ti.</p>
                    <a
                        href="https://wa.me/56982028473?text=Hola,%20quisiera%20asesoría%20sobre%20los%20tratamientos%20Cyber%20CIALO"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#20b858] transition-all rounded-sm shadow-lg"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Escríbenos al WhatsApp
                    </a>
                    <p className="text-white/20 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile</p>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(10deg); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
