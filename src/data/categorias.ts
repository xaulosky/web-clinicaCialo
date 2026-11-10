import { tratamientosData } from "./tratamientos";

export interface CategoriaInfo {
    nombre: string;
    slug: string;
    titulo: string;
    descripcion: string;
    metaDescription: string;
    keywords: string[];
    imagen: string;
    iconPath: string; // SVG path for the icon
    color: string;
}

export const categoriasData: CategoriaInfo[] = [
    {
        nombre: "Facial",
        slug: "facial",
        titulo: "Tratamientos Faciales y Skincare",
        descripcion: "Descubre nuestra gama completa de tratamientos faciales: limpieza facial profunda, toxina botulínica, ácido hialurónico, HydraFacial y más. Rejuvenece tu rostro con resultados en Clínica Cialo.",
        metaDescription: "Tratamientos faciales en Los Ángeles, Chile. Limpieza facial profunda, Botox, ácido hialurónico, Sculptra y HydraFacial. Resultados naturales con profesionales certificados.",
        keywords: [
            "limpieza facial los angeles",
            "limpieza facial profunda",
            "clinica de la piel",
            "tratamientos faciales Los Ángeles",
            "botox Chile",
            "ácido hialurónico",
            "rejuvenecimiento facial",
            "rinomodelación",
            "HydraFacial"
        ],
        imagen: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=75&w=600&auto=format&fit=crop",
        // Sparkles icon
        iconPath: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
        color: "#d4c1a0",
    },
    {
        nombre: "Corporal",
        slug: "corporal",
        titulo: "Tratamientos Corporales y Depilación Láser",
        descripcion: "Moldea y tonifica tu cuerpo con nuestros tratamientos corporales de última generación. Depilación láser definitiva, criolipólisis, radiofrecuencia y más tecnologías avanzadas en Los Ángeles.",
        metaDescription: "Depilación láser en Los Ángeles y tratamientos corporales en Clínica Cialo. Resultados definitivos con Soprano Titanium, criolipólisis Clatuu y Embody HIFEM.",
        keywords: [
            "depilacion laser los angeles",
            "depilacion laser en los angeles",
            "clinica estetica los angeles",
            "criolipolisis chile",
            "tratamientos corporales",
            "reduccion de grasa"
        ],
        imagen: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=75&w=600&auto=format&fit=crop",
        // Body/person icon
        iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
        color: "#c9a86c",
    },
    {
        nombre: "Capilar",
        slug: "capilar",
        titulo: "Tratamientos Capilares",
        descripcion: "Recupera la densidad y salud de tu cabello con nuestros tratamientos capilares especializados. Desde mesoterapia hasta injerto capilar FUE con técnica Zafiro.",
        metaDescription: "Tratamientos capilares en Los Ángeles, Chile. Injerto capilar FUE Zafiro, mesoterapia, Regenera Activa. Clínica Cialo - Especialistas en tricología.",
        keywords: ["injerto capilar Los Ángeles", "trasplante de pelo Chile", "mesoterapia capilar", "alopecia tratamiento", "Regenera Activa", "tricología"],
        imagen: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=75&w=600&auto=format&fit=crop",
        // Scissors icon (for hair)
        iconPath: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
        color: "#8b7355",
    },
    {
        nombre: "Ginecoestética",
        slug: "ginecoestetica",
        titulo: "Ginecología y Ginecoestética",
        descripcion: "Consultas de ginecología, obstetricia y tratamientos íntimos femeninos con la mayor discreción y profesionalismo. Atención experta por Ginecólogo en Los Ángeles.",
        metaDescription: "Agenda tu hora con Ginecólogo en Los Ángeles, Chile. Revisiones, obstetricia, láser CO2 vaginal y rejuvenecimiento íntimo con profesionales de Clínica Cialo.",
        keywords: [
            "ginecologo los angeles",
            "ginecologo en los angeles",
            "ginecologa los angeles",
            "ginecólogo puerto mayor los ángeles",
            "ginecoestética Los Ángeles",
            "rejuvenecimiento íntimo",
            "matrona los angeles"
        ],
        imagen: "https://images.unsplash.com/photo-1559599101-f09722fb4948?q=75&w=600&auto=format&fit=crop",
        // Heart icon
        iconPath: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        color: "#e8b4b8",
    },
    {
        nombre: "Urología",
        slug: "urologia",
        titulo: "Urología Estética y Andrología",
        descripcion: "Procedimientos estéticos masculinos realizados por Médico Urólogo en Los Ángeles. Engrosamiento peneano con ácido hialurónico (urofill), vasectomía y tratamientos andrológicos.",
        metaDescription: "Agenda tu consulta con el Urólogo en Los Ángeles. Especialistas en engrosamiento peneano con ácido hialurónico, vasectomía y estética íntima masculina en Clínica Cialo.",
        keywords: [
            "urologo los angeles",
            "urologo en los angeles",
            "engrosamiento peneano precio chile",
            "engrosamiento con ácido hialurónico en chile",
            "urofill los angeles chile",
            "vasectomía los angeles"
        ],
        imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=75&w=600&auto=format&fit=crop",
        // Shield/medical icon
        iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        color: "#5a7d9a",
    },
    {
        nombre: "Nutrición",
        slug: "nutricion",
        titulo: "Nutricionista y Bienestar",
        descripcion: "Consultas presenciales con Nutricionista Clínica en Los Ángeles. Evaluación avanzada con tecnología InBody 970, el escáner corporal más avanzado del mercado, y planes alimenticios a tu medida.",
        metaDescription: "Agenda tu consulta con Nutricionista en Los Ángeles, Chile. Evaluación completa con InBody 970 y planes alimenticios personalizados en Clínica Cialo.",
        keywords: [
            "nutricionista los angeles",
            "inbody los angeles",
            "examen inbody",
            "inbody 970",
            "nutricionista en los angeles",
            "nutriologo los angeles",
            "nutriologa los angeles",
            "consulta nutricional"
        ],
        imagen: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=75&w=600&auto=format&fit=crop",
        // Apple/nutrition icon
        iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
        color: "#7cb342",
    },
    {
        nombre: "Vascular",
        slug: "vascular",
        titulo: "Cirugía Vascular",
        descripcion: "Evaluación profesional y tratamientos mínimamente invasivos para várices, arañitas y patologías circulatorias, realizados directamente por Médico Cirujano Vascular y Endovascular certificada.",
        metaDescription: "Reserva con nuestro Cirujano Vascular en Los Ángeles. Evaluación profesional, Eco Doppler y tratamientos efectivos para várices y arañitas vasculares en Clínica Cialo.",
        keywords: [
            "cirujano vascular los angeles",
            "medico vascular los angeles",
            "tratamiento varices los angeles",
            "escleroterapia los angeles",
            "flebologia los angeles",
            "clinica vascular los angeles chile"
        ],
        imagen: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=75&w=600&auto=format&fit=crop",
        // Activity/pulse icon
        iconPath: "M4.5 12h3l3-9 3 18 3-9h3",
        color: "#9c27b0",
    },
];

export const getCategoriaBySlug = (slug: string): CategoriaInfo | undefined => {
    return categoriasData.find((c) => c.slug === slug);
};

export const getTratamientosByCategoria = (categoria: string) => {
    return tratamientosData.filter((t) => t.categoria === categoria);
};

export const getSubcategoriasByCategoria = (categoria: string): string[] => {
    const tratamientos = getTratamientosByCategoria(categoria);
    return [...new Set(tratamientos.map((t) => t.subcategoria))].sort();
};
