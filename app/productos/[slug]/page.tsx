import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProductAddToCart from "../../components/ProductAddToCart";
import PixelViewContent from "../../components/PixelViewContent";
import { productosData, getProductBySlug, formatPrice, Producto } from "@/data/productos";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return productosData.map((p) => ({
        slug: p.slug,
    }));
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const producto = getProductBySlug(slug);

    if (!producto) {
        return {
            title: "Producto no encontrado | Clínica Cialo",
        };
    }

    return {
        title: `${producto.name} - ${producto.brand} | Clínica Cialo`,
        description: producto.description,
        openGraph: {
            title: `${producto.name} - ${producto.brand} | Clínica Cialo`,
            description: producto.description,
            type: "website",
        },
    };
}

// Colores por marca
const brandColors: Record<string, { bg: string; text: string; light: string }> = {
    "Avene": { bg: "bg-orange-500", text: "text-orange-500", light: "bg-orange-50" },
    "Eucerin": { bg: "bg-blue-600", text: "text-blue-600", light: "bg-blue-50" },
    "Obagi": { bg: "bg-purple-600", text: "text-purple-600", light: "bg-purple-50" },
    "ISDIN": { bg: "bg-sky-500", text: "text-sky-500", light: "bg-sky-50" },
    "Glisodin": { bg: "bg-green-600", text: "text-green-600", light: "bg-green-50" },
};

// Obtener productos relacionados (misma marca)
const getProductosRelacionados = (producto: Producto, limit: number = 4): Producto[] => {
    return productosData
        .filter((p) => p.id !== producto.id && p.brand === producto.brand)
        .slice(0, limit);
};

export default async function ProductoPage({ params }: PageProps) {
    const { slug } = await params;
    const producto = getProductBySlug(slug);

    if (!producto) {
        notFound();
    }

    const relacionados = getProductosRelacionados(producto, 4);
    const brandColor = brandColors[producto.brand] || { bg: "bg-cialo-gold", text: "text-cialo-gold", light: "bg-cialo-gold/10" };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <PixelViewContent
                id={producto.id}
                name={`${producto.name} - ${producto.brand}`}
                value={producto.price}
                category={producto.category}
            />
            <Navbar />

            {/* Breadcrumb */}
            <div className="bg-white border-b mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/" className="hover:text-cialo-gold transition-colors">
                            Inicio
                        </Link>
                        <span>/</span>
                        <Link href="/productos" className="hover:text-cialo-gold transition-colors">
                            Productos
                        </Link>
                        <span>/</span>
                        <span className={brandColor.text}>{producto.brand}</span>
                        <span>/</span>
                        <span className="text-cialo-gray font-medium truncate max-w-[200px]">
                            {producto.name}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Imagen / Placeholder */}
                        <div className={`${brandColor.light} rounded-sm aspect-square flex items-center justify-center`}>
                            <div className="text-center p-8">
                                <span className={`${brandColor.bg} text-white text-sm font-bold px-4 py-2 rounded-sm mb-6 inline-block`}>
                                    {producto.brand}
                                </span>
                                <h2 className="text-2xl font-[family-name:var(--font-italiana)] text-cialo-gray mt-4">
                                    {producto.name}
                                </h2>
                                <p className="text-gray-400 text-sm mt-2">{producto.category}</p>
                            </div>
                        </div>

                        {/* Información del Producto */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`${brandColor.bg} text-white text-xs font-bold px-3 py-1 rounded-sm`}>
                                        {producto.brand}
                                    </span>
                                    <span className="text-xs text-gray-400 uppercase tracking-wider">
                                        {producto.category}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-[family-name:var(--font-italiana)] text-cialo-gray mb-4">
                                    {producto.name}
                                </h1>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {producto.description}
                                </p>
                            </div>

                            {/* Precio */}
                            <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Precio</p>
                                        <p className="text-4xl font-bold text-cialo-gray">
                                            {formatPrice(producto.price)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400">Disponible en clínica</p>
                                        <p className="text-sm text-green-600 font-medium flex items-center gap-1 justify-end">
                                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                            En stock
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="space-y-4">
                                {/* Agregar al Carrito */}
                                <ProductAddToCart 
                                    producto={{
                                        id: producto.id,
                                        name: producto.name,
                                        price: producto.price,
                                        brand: producto.brand,
                                        category: producto.category,
                                        slug: producto.slug,
                                    }}
                                />
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href={`https://wa.me/56982028473?text=Hola,%20me%20interesa%20el%20producto%20${encodeURIComponent(producto.name)}%20de%20${encodeURIComponent(producto.brand)}%20(${formatPrice(producto.price)})`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        Consultar por WhatsApp
                                    </a>
                                    <Link
                                        href="/productos"
                                        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-cialo-gray hover:bg-cialo-gray hover:text-white text-cialo-gray font-semibold py-3 px-6 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </svg>
                                        Ver más productos
                                    </Link>
                                </div>
                            </div>

                            {/* Info Adicional */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-cialo-gold/10 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Garantía</p>
                                            <p className="text-sm font-semibold text-cialo-gray">100% Original</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-sm shadow-sm border border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-cialo-gold/10 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-cialo-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">Retiro</p>
                                            <p className="text-sm font-semibold text-cialo-gray">En Clínica</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información de la Marca */}
                    <div className="mt-16 bg-white p-8 rounded-sm shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                            <div className={`w-20 h-20 ${brandColor.light} rounded-full flex items-center justify-center shrink-0`}>
                                <span className={`text-2xl font-bold ${brandColor.text}`}>
                                    {producto.brand.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-[family-name:var(--font-italiana)] text-cialo-gray mb-2">
                                    Sobre {producto.brand}
                                </h3>
                                <p className="text-gray-600">
                                    {getBrandDescription(producto.brand)}
                                </p>
                            </div>
                            <Link
                                href={`/productos?marca=${encodeURIComponent(producto.brand)}`}
                                className={`${brandColor.text} hover:underline font-medium text-sm whitespace-nowrap`}
                            >
                                Ver todos los productos {producto.brand} →
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Productos Relacionados */}
                {relacionados.length > 0 && (
                    <section className="bg-white border-t py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-10">
                                <span className="text-cialo-gold uppercase tracking-widest text-xs font-semibold">
                                    Más de {producto.brand}
                                </span>
                                <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-cialo-gray mt-2">
                                    Productos Relacionados
                                </h2>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relacionados.map((p) => (
                                    <ProductCardMini key={p.id} product={p} />
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <Link
                                    href="/productos"
                                    className="inline-flex items-center gap-2 text-cialo-gold hover:text-cialo-gold/80 font-medium transition-colors"
                                >
                                    Ver todo el catálogo
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Asesoría */}
                <section className="bg-[#1b1a18] py-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl font-[family-name:var(--font-italiana)] text-white mb-4">
                            ¿Es este el producto ideal para ti?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Nuestros especialistas pueden ayudarte a elegir los productos más adecuados para tu tipo de piel y necesidades.
                        </p>
                        <a
                            href="https://wa.me/56982028473?text=Hola,%20me%20gustaría%20recibir%20asesoría%20sobre%20productos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-cialo-gold hover:bg-cialo-gold/90 text-[#1b1a18] font-semibold py-3 px-8 rounded-sm transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Solicitar Asesoría Gratuita
                        </a>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

// Descripciones de marcas
function getBrandDescription(brand: string): string {
    const descriptions: Record<string, string> = {
        "Avene": "Marca francesa especializada en dermocosmética con agua termal de Avène. Sus productos están diseñados para pieles sensibles e intolerantes, respaldados por más de 270 años de historia en el cuidado de la piel.",
        "Eucerin": "Marca alemana líder en dermocosmética científica. Desarrolla productos innovadores con ingredientes clínicamente probados como Thiamidol y Ácido Hialurónico para tratar diversas condiciones de la piel.",
        "Obagi": "Marca estadounidense premium de grado médico. Conocida por sus fórmulas de alta potencia con Retinol y Vitamina C, diseñadas para transformar la piel a nivel celular con resultados visibles.",
        "ISDIN": "Laboratorio español referente en fotoprotección y dermatología. Combina innovación científica con alta cosmética para crear productos de protección solar y cuidado facial de última generación.",
        "Glisodin": "Pioneros en nutracéuticos para la piel. Su tecnología patentada de superóxido dismutasa (SOD) proporciona protección antioxidante desde el interior, complementando los tratamientos tópicos.",
    };
    return descriptions[brand] || "Marca de dermocosmética de alta calidad disponible en Clínica Cialo.";
}

// Componente mini card para relacionados
function ProductCardMini({ product }: { product: Producto }) {
    const brandColor = brandColors[product.brand] || { bg: "bg-cialo-gold", text: "text-cialo-gold", light: "bg-cialo-gold/10" };
    
    return (
        <Link
            href={`/productos/${product.slug}`}
            className="bg-white rounded-sm border border-gray-100 p-4 hover:shadow-lg hover:border-cialo-gold/30 transition-all duration-300 flex flex-col h-full group"
        >
            <span className={`${brandColor.bg} text-white text-[10px] font-bold px-2 py-1 rounded-sm self-start mb-3`}>
                {product.brand}
            </span>
            <h3 className="text-sm font-semibold text-cialo-gray mb-2 group-hover:text-cialo-gold transition-colors line-clamp-2">
                {product.name}
            </h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2 grow">
                {product.description}
            </p>
            <p className="text-lg font-bold text-cialo-gray">
                {formatPrice(product.price)}
            </p>
        </Link>
    );
}
