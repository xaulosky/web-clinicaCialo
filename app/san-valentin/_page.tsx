'use client';


import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';


const ofertas = [
    {
        id: 'valentin-duo-glow',
        nombre: 'Dúo Glow: Hydrafacial + Hollywood Peel (Parejas)',
        descripcion: 'Experiencia compartida para una piel radiante. Ambos reciben limpieza profunda Hydrafacial y renovación con Láser Hollywood Peel.',
        precioOriginal: 480000, // 240k x 2 aprox
        precioOferta: 250000,
        descuento: 48,
        imagen: '/tratamientos/valentin_duo_glow.png',
        categoria: 'Parejas',
        duracion: '60 min x2',
        incluye: ['2 Hydrafacial Completos', '2 Hollywood Peel', 'Mascarillas Hidratantes', 'Evaluación Facial'],
        destacado: true,
    },
    {
        id: 'valentin-body-shaping',
        nombre: 'Modelado 360: Embody + Exilis',
        descripcion: 'Transformación corporal completa. Tonifica músculo y reafirma piel con la mejor tecnología.',
        precioOriginal: 800000,
        precioOferta: 560000,
        descuento: 30,
        imagen: '/tratamientos/valentin_body_shaping.png',
        categoria: 'Corporal',
        duracion: '8 Sesiones',
        incluye: ['8 Sesiones Embody', '8 Sesiones Exilis 360', 'Evaluación Corporal'],
    },
    {
        id: 'valentin-laser-cuerpo',
        nombre: 'Dúo Depilación Cuerpo Completo (2 Personas)',
        descripcion: 'Pack Parejas: Compra 2 planes de Cuerpo Completo y obtén 40% OFF en el segundo.',
        precioOriginal: 960000, // 480k x 2
        precioOferta: 768000, // 480k + (480k * 0.6)
        descuento: 20,
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Pack Parejas',
        duracion: '6 Sesiones c/u',
        incluye: ['2 Planes de Cuerpo Completo', '6 Sesiones por persona', 'Piernas, Brazos, Rebaje, Axilas, Bozo'],
    },
    {
        id: 'valentin-laser-full',
        nombre: 'Dúo Depilación Full Premium (2 Personas)',
        descripcion: 'La experiencia definitiva. Rostro a pies para dos personas con descuento especial.',
        precioOriginal: 1248000, // 624k x 2
        precioOferta: 998400, // 624k + (624k * 0.6)
        descuento: 20,
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Pack Parejas',
        duracion: '6 Sesiones c/u',
        incluye: ['2 Planes Full (Rostro a Pies)', '6 Sesiones por persona', 'Tecnología Soprano Titanium'],
    },
    {
        id: 'valentin-pack-ella',
        nombre: 'Pack Ella: Suavidad Total (Match Perfecto)',
        descripcion: 'La combinación ideal de zonas para ella. Olvídate de la depilación tradicional.',
        precioOriginal: 390000,
        precioOferta: 299000,
        descuento: 23,
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Para Ella',
        duracion: '6 Sesiones',
        incluye: ['Piernas Completas', 'Rebaje Completo', 'Axilas', '6 Sesiones por zona'],
    },
    {
        id: 'valentin-pack-el',
        nombre: 'Pack Él: Perfilado y Estilo (Match Perfecto)',
        descripcion: 'Define tu estilo con el pack perfecto para el rostro masculino.',
        precioOriginal: 248000,
        precioOferta: 189000,
        descuento: 24,
        imagen: '/tratamientos/valentin_laser_packets.png',
        categoria: 'Para Él',
        duracion: '6 Sesiones',
        incluye: ['Barba Completa', 'Cuello Anterior', '6 Sesiones por zona'],
    },
];

const countdown = {
    fecha: new Date('2026-02-14T23:59:59'),
};

function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
    }).format(price);
}


export default function SanValentinPage() {
    // const router = useRouter();
    // const addItem = useCartStore((state) => state.addItem);
    // const openCart = useCartStore((state) => state.openCart);
    // const [addedItems, setAddedItems] = useState<Set<string>>(new Set());



    return (
        <div className="flex flex-col min-h-screen bg-[#faf6ef]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden mt-20">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#8b2942] via-[#a03050] to-[#c44569]"></div>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-60 h-60 bg-red-400 rounded-full blur-3xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
                </div>

                {/* Hearts decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-white/10 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                fontSize: `${20 + Math.random() * 40}px`,
                            }}
                        >
                            ♥
                        </div>
                    ))}
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
                    <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
                        <span className="animate-pulse">💕</span>
                        Ofertas exclusivas hasta el 14 de Febrero
                    </span>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-[family-name:var(--font-italiana)] text-white mb-6 leading-tight">
                        San Valentín
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
                        en Clínica CIALO
                    </p>
                    <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
                        Regala bienestar, regala belleza. Descuentos especiales en tratamientos para ti, para él o para disfrutar en pareja.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <a
                            href="#ofertas"
                            className="inline-flex items-center justify-center gap-2 bg-white text-[#8b2942] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-white transition-all rounded-sm"
                        >
                            <span>💝</span> Ver Ofertas
                        </a>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20me%20interesan%20las%20ofertas%20de%20San%20Valentín"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-white hover:text-[#8b2942] transition-all rounded-sm"
                        >
                            Consultar por WhatsApp
                        </a>
                    </div>

                    {/* Countdown hint */}
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                        <span className="text-white/80 text-sm">⏰ Ofertas válidas hasta el 14 de Febrero 2026</span>
                    </div>
                </div>
            </section>

            {/* Ofertas Section */}
            <section id="ofertas" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#8b2942] uppercase tracking-widest text-xs font-semibold mb-4 block">💕 Ofertas Especiales</span>
                        <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-4">Tratamientos con Amor</h2>
                        <div className="bg-[#8b2942]/10 p-4 rounded-lg inline-block max-w-2xl mx-auto mb-4">
                            <p className="text-[#8b2942] font-semibold mb-3">
                                ¡Especial Depilación Parejas! 💝<br />
                                Compra 2 packs de cualquier zona grande o cuerpo completo y obtén <strong>40% de descuento</strong> en la segunda unidad.
                            </p>
                            <Link
                                href="/tratamientos/depilacion-laser"
                                className="inline-flex items-center gap-1 text-sm font-bold underline decoration-2 underline-offset-4 hover:text-[#b8935f] transition-colors"
                            >
                                Ver todos los precios y zonas <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                        <p className="text-[#6f6a5c] max-w-2xl mx-auto">Elige el regalo perfecto. Paga ahora y agenda cuando quieras.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ofertas.map((oferta) => (
                            <div
                                key={oferta.id}
                                className={`bg-[#faf6ef] rounded-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${oferta.destacado ? 'ring-2 ring-[#8b2942] relative' : ''}`}
                            >
                                {oferta.destacado && (
                                    <div className="absolute top-4 right-4 z-10 bg-[#8b2942] text-white px-3 py-1 text-xs font-bold uppercase rounded-full">
                                        ⭐ Más Popular
                                    </div>
                                )}

                                {/* Image */}
                                <div className="relative h-48 bg-gradient-to-br from-[#faf6ef] to-[#eee]">
                                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-30">
                                        💕
                                    </div>
                                    <div className="absolute top-4 left-4 bg-[#8b2942] text-white px-3 py-1 text-sm font-bold rounded-full">
                                        -{oferta.descuento}%
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-xs font-medium text-[#6f6a5c] rounded">
                                        {oferta.categoria}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-[family-name:var(--font-italiana)] text-[#1b1a18] mb-2">{oferta.nombre}</h3>
                                    <p className="text-sm text-[#6f6a5c] mb-4 flex-grow">{oferta.descripcion}</p>

                                    {/* Incluye */}
                                    <div className="mb-4">
                                        <p className="text-xs text-[#6f6a5c] uppercase tracking-wider mb-2">Incluye:</p>
                                        <ul className="text-xs text-[#6f6a5c] space-y-1">
                                            {oferta.incluye.map((item, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <span className="text-[#8b2942]">✓</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Precio */}
                                    <div className="flex items-end gap-3 mb-4">
                                        <span className="text-2xl font-bold text-[#8b2942]">{formatPrice(oferta.precioOferta)}</span>
                                        <span className="text-sm text-[#999] line-through">{formatPrice(oferta.precioOriginal)}</span>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-2">
                                        <a
                                            href={`https://wa.me/56982028473?text=${encodeURIComponent(`Hola, me interesa la oferta ${oferta.nombre} de San Valentín`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-[#8b2942] text-white py-3 font-semibold uppercase text-sm tracking-wider hover:bg-[#6d1f33] transition-all text-center rounded-sm"
                                        >
                                            Reservar por WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gift Card Section */}
            <section className="py-20 bg-gradient-to-br from-[#8b2942] to-[#c44569]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <span className="text-white/80 uppercase tracking-widest text-xs font-semibold mb-4 block">🎁 Regalo Perfecto</span>
                    <h2 className="text-4xl font-[family-name:var(--font-italiana)] text-white mb-6">¿No sabes qué regalar?</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Compra cualquier tratamiento como regalo. Después del pago te contactamos para agendar cuando el homenajeado(a) prefiera.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20quiero%20comprar%20un%20tratamiento%20como%20regalo%20de%20San%20Valentín"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-[#8b2942] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#b8935f] hover:text-white transition-all"
                        >
                            <span>💬</span> Consultar por Regalo
                        </a>
                    </div>
                </div>
            </section>

            {/* Términos */}
            <section className="py-12 bg-[#faf6ef]">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white p-6 rounded-sm">
                        <h3 className="font-semibold text-[#1b1a18] mb-3">📋 Términos y Condiciones</h3>
                        <ul className="text-sm text-[#6f6a5c] space-y-2">
                            <li>• Ofertas válidas hasta el 14 de Febrero de 2026 o hasta agotar stock.</li>
                            <li>• Los tratamientos comprados deben agendarse dentro de los 90 días posteriores a la compra.</li>
                            <li>• No acumulable con otras promociones.</li>
                            <li>• Pago seguro con Webpay (tarjeta de crédito o débito).</li>
                            <li>• Después del pago, nos contactaremos para coordinar la cita.</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-16 bg-[#1b1a18]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">¿Tienes dudas?</h2>
                    <p className="text-[#cbcfd1] mb-6">Escríbenos por WhatsApp y te ayudamos a elegir el tratamiento perfecto.</p>
                    <a
                        href="https://wa.me/56982028473?text=Hola,%20tengo%20dudas%20sobre%20las%20ofertas%20de%20San%20Valentín"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-[#20b858] transition-all rounded-sm"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                    </a>
                    <p className="text-[#cbcfd1]/60 text-sm mt-6">📍 Bulnes 220, Of. 509, Los Ángeles, Chile</p>
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