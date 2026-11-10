// Datos estructurados de las tecnologías disponibles en Clínica Cialo
// Utilizado para SEO, componentes y páginas de tecnología

export interface Tecnologia {
    id: string;
    nombre: string;
    nombreCompleto: string;
    marca: string;
    categoria: "depilacion" | "corporal" | "facial" | "capilar";
    slug: string;
    descripcionCorta: string;
    descripcionLarga: string;
    imagen?: string;
    video?: string;
    caracteristicas: {
        titulo: string;
        valor: string;
    }[];
    beneficios: string[];
    zonasAplicacion: string[];
    duracionSesion: string;
    sesionesRecomendadas: string;
    resultadosVisibles: string;
    duracionResultados: string;
    contraindicaciones: string[];
    cuidadosPost: string[];
    precio?: {
        desde: number;
        hasta?: number;
    };
    seo: {
        metaTitle: string;
        metaDescription: string;
        keywords: string[];
    };
}

export const tecnologiasData: Tecnologia[] = [
    {
        id: "soprano-titanium",
        nombre: "Soprano Titanium",
        nombreCompleto: "Soprano Titanium 3D",
        marca: "Alma Lasers",
        categoria: "depilacion",
        slug: "soprano-titanium-los-angeles",
        descripcionCorta: "Sistema de depilación láser más avanzado del mundo con tecnología 3D.",
        descripcionLarga: "El Soprano Titanium de Alma Lasers combina tres longitudes de onda (755nm Alexandrite, 810nm Diodo y 1064nm Nd:YAG) en un solo disparo, permitiendo tratar todos los tipos de piel y vello. Su sistema ICE™ de enfriamiento continuo hace el tratamiento prácticamente indoloro.",
        caracteristicas: [
            { titulo: "Tecnología", valor: "3D (3 longitudes de onda)" },
            { titulo: "Longitudes", valor: "755nm + 810nm + 1064nm" },
            { titulo: "Sistema Enfriamiento", valor: "ICE™ Continuo" },
            { titulo: "Área Cabezal", valor: "4 cm²" },
            { titulo: "Fototipos", valor: "I-VI (todas las pieles)" }
        ],
        beneficios: [
            "Tratamiento prácticamente indoloro",
            "Sesiones más rápidas",
            "Apto para piel bronceada",
            "Efectivo en vello claro y oscuro",
            "Sin tiempo de recuperación"
        ],
        zonasAplicacion: ["Rostro", "Axilas", "Brazos", "Espalda", "Pecho", "Abdomen", "Rebaje", "Bikini", "Piernas completas"],
        duracionSesion: "10-60 minutos según zona",
        sesionesRecomendadas: "6-8 sesiones",
        resultadosVisibles: "Desde la primera sesión",
        duracionResultados: "Permanente (con mantenimiento anual)",
        contraindicaciones: [
            "Embarazo",
            "Uso de isotretinoína activo",
            "Infección activa en zona",
            "Tatuajes recientes en zona"
        ],
        cuidadosPost: [
            "Evitar sol 2 semanas",
            "Usar protector solar",
            "No depilarse con cera entre sesiones"
        ],
        seo: {
            metaTitle: "Soprano Titanium Los Ángeles | Depilación Láser 3D | Clínica Cialo",
            metaDescription: "Depilación láser Soprano Titanium en Los Ángeles. Tecnología 3D con 3 longitudes de onda. Indoloro, rápido y efectivo para todos los tipos de piel.",
            keywords: ["soprano titanium", "depilación láser los ángeles", "depilación definitiva", "alma lasers", "laser 3d"]
        }
    },
    {
        id: "clatuu-alpha",
        nombre: "Clatuu Alpha",
        nombreCompleto: "Clatuu Alpha 360",
        marca: "Classys",
        categoria: "corporal",
        slug: "clatuu-alpha-los-angeles",
        descripcionCorta: "Criolipólisis avanzada con tecnología 360° para eliminación de grasa localizada.",
        descripcionLarga: "Clatuu Alpha utiliza tecnología de enfriamiento 360° para cristalizar y eliminar las células de grasa de forma no invasiva. Sus aplicadores patentados envuelven completamente el área tratada, logrando hasta un 25% de reducción de grasa en una sola sesión.",
        caracteristicas: [
            { titulo: "Tecnología", valor: "Criolipólisis 360°" },
            { titulo: "Temperatura", valor: "-9°C controlada" },
            { titulo: "Aplicadores", valor: "Duales simultáneos" },
            { titulo: "Reducción", valor: "Hasta 25% por sesión" }
        ],
        beneficios: [
            "No invasivo, sin cirugía",
            "Tratamiento dual (2 zonas a la vez)",
            "Sin tiempo de recuperación",
            "Resultados permanentes",
            "Elimina grasa resistente"
        ],
        zonasAplicacion: ["Abdomen", "Flancos", "Espalda", "Brazos", "Muslos internos/externos", "Papada", "Banana roll"],
        duracionSesion: "35-60 minutos por zona",
        sesionesRecomendadas: "1-3 sesiones por zona",
        resultadosVisibles: "3-4 semanas, óptimos a 8-12 semanas",
        duracionResultados: "Permanente (células eliminadas)",
        contraindicaciones: [
            "Crioglobulinemia",
            "Enfermedad de Raynaud",
            "Hernia en zona",
            "Embarazo"
        ],
        cuidadosPost: [
            "Masajes en zona tratada",
            "Hidratación abundante",
            "Actividad física moderada"
        ],
        seo: {
            metaTitle: "Clatuu Alpha Los Ángeles | Criolipólisis 360° | Clínica Cialo",
            metaDescription: "Clatuu Alpha en Los Ángeles. Criolipólisis 360° para eliminar grasa localizada sin cirugía. Hasta 25% de reducción por sesión.",
            keywords: ["clatuu alpha", "criolipólisis los ángeles", "eliminar grasa sin cirugía", "congelar grasa"]
        }
    },
    {
        id: "morpheus8",
        nombre: "Morpheus8",
        nombreCompleto: "Morpheus8",
        marca: "InMode",
        categoria: "facial",
        slug: "morpheus8-los-angeles",
        descripcionCorta: "Radiofrecuencia fraccionada con microagujas para rejuvenecimiento profundo.",
        descripcionLarga: "Morpheus8 combina microagujas con radiofrecuencia fraccionada para penetrar hasta 4mm en la piel, remodelando el colágeno y la grasa subdérmica. Es el tratamiento gold standard para flacidez facial y corporal.",
        caracteristicas: [
            { titulo: "Tecnología", valor: "RF + Microagujas" },
            { titulo: "Profundidad", valor: "Hasta 4mm" },
            { titulo: "Agujas", valor: "24 agujas doradas" },
            { titulo: "Energía", valor: "RF Fraccionada" }
        ],
        beneficios: [
            "Estimula colágeno profundo",
            "Mejora textura y poros",
            "Trata flacidez",
            "Reduce cicatrices de acné",
            "Mínimo downtime"
        ],
        zonasAplicacion: ["Rostro completo", "Cuello", "Escote", "Brazos", "Abdomen", "Muslos"],
        duracionSesion: "30-60 minutos",
        sesionesRecomendadas: "3-4 sesiones",
        resultadosVisibles: "2-3 semanas, óptimos a 3 meses",
        duracionResultados: "12-18 meses",
        contraindicaciones: [
            "Marcapasos",
            "Embarazo",
            "Infección activa",
            "Uso de isotretinoína"
        ],
        cuidadosPost: [
            "Evitar sol 1 semana",
            "Hidratación intensiva",
            "No maquillaje 24h"
        ],
        seo: {
            metaTitle: "Morpheus8 Los Ángeles | RF con Microagujas | Clínica Cialo",
            metaDescription: "Morpheus8 en Los Ángeles. Radiofrecuencia fraccionada con microagujas para rejuvenecimiento facial profundo. Flacidez, arrugas y cicatrices.",
            keywords: ["morpheus8", "radiofrecuencia microagujas", "rejuvenecimiento facial los ángeles", "inmode"]
        }
    },
    {
        id: "exilis-ultra-360",
        nombre: "Exilis Ultra 360",
        nombreCompleto: "Exilis Ultra 360",
        marca: "BTL",
        categoria: "corporal",
        slug: "exilis-ultra-360-los-angeles",
        descripcionCorta: "Tecnología dual RF + Ultrasonido para tensar piel y reducir grasa.",
        descripcionLarga: "Exilis Ultra 360 es el único sistema que combina radiofrecuencia monopolar y ultrasonido focalizado en un solo tratamiento. Calienta las capas profundas de la piel mientras enfría la superficie, logrando tensado cutáneo y reducción de grasa sin dolor.",
        caracteristicas: [
            { titulo: "Tecnología", valor: "RF + Ultrasonido" },
            { titulo: "Sistema", valor: "EFC (Energy Flow Control)" },
            { titulo: "Enfriamiento", valor: "Integrado" },
            { titulo: "Aplicadores", valor: "Facial y Corporal" }
        ],
        beneficios: [
            "Tensado de piel sin cirugía",
            "Reducción de grasa localizada",
            "Tratamiento facial y corporal",
            "Indoloro y cómodo",
            "Sin tiempo de recuperación"
        ],
        zonasAplicacion: ["Rostro", "Cuello", "Papada", "Brazos", "Abdomen", "Flancos", "Muslos", "Rodillas"],
        duracionSesion: "20-45 minutos",
        sesionesRecomendadas: "4-6 sesiones",
        resultadosVisibles: "Progresivos desde primera sesión",
        duracionResultados: "12-18 meses con mantenimiento",
        contraindicaciones: [
            "Marcapasos",
            "Implantes metálicos en zona",
            "Embarazo"
        ],
        cuidadosPost: [
            "Hidratación",
            "Evitar calor excesivo 24h"
        ],
        seo: {
            metaTitle: "Exilis Ultra 360 Los Ángeles | RF + Ultrasonido | Clínica Cialo",
            metaDescription: "Exilis Ultra 360 en Los Ángeles. Radiofrecuencia y ultrasonido para tensar piel y reducir grasa. Facial y corporal sin cirugía.",
            keywords: ["exilis ultra 360", "tensar piel sin cirugía", "radiofrecuencia corporal", "btl los ángeles"]
        }
    },
    {
        id: "scizer-hifu",
        nombre: "Scizer HIFU",
        nombreCompleto: "Scizer HIFU MFSU",
        marca: "Classys",
        categoria: "corporal",
        slug: "scizer-hifu-los-angeles",
        descripcionCorta: "Ultrasonido focalizado de alta intensidad para destrucción de grasa.",
        descripcionLarga: "Scizer utiliza tecnología MFSU (Macro Focused Synchronized Ultrasound) para calentar las células de grasa a 75°C, destruyéndolas permanentemente sin dañar tejidos circundantes. Es ideal para reducción de grasa profunda y definición corporal.",
        caracteristicas: [
            { titulo: "Tecnología", valor: "HIFU / MFSU" },
            { titulo: "Profundidad", valor: "6-13mm" },
            { titulo: "Temperatura", valor: "75°C en grasa" },
            { titulo: "Precisión", valor: "Focalizado" }
        ],
        beneficios: [
            "Destruye grasa profunda",
            "Sin cirugía ni anestesia",
            "Una sesión efectiva",
            "Resultados permanentes",
            "Define contornos"
        ],
        zonasAplicacion: ["Abdomen", "Flancos", "Espalda", "Muslos", "Brazos", "Papada"],
        duracionSesion: "30-60 minutos",
        sesionesRecomendadas: "1-2 sesiones por zona",
        resultadosVisibles: "4-8 semanas, óptimos 12 semanas",
        duracionResultados: "Permanente",
        contraindicaciones: [
            "Menos de 2.5cm de grasa",
            "Embarazo",
            "Marcapasos",
            "Hernia en zona"
        ],
        cuidadosPost: [
            "Masajes circulares",
            "Hidratación abundante",
            "Actividad física recomendada"
        ],
        seo: {
            metaTitle: "Scizer HIFU Los Ángeles | Ultrasonido Focalizado | Clínica Cialo",
            metaDescription: "Scizer HIFU en Los Ángeles. Ultrasonido focalizado para destruir grasa profunda sin cirugía. Resultados desde una sesión.",
            keywords: ["scizer", "hifu corporal", "eliminar grasa ultrasonido", "mfsu los ángeles"]
        }
    },
    {
        id: "hydrafacial-md",
        nombre: "HydraFacial MD",
        nombreCompleto: "HydraFacial MD",
        marca: "HydraFacial",
        categoria: "facial",
        slug: "hydrafacial-md-los-angeles",
        descripcionCorta: "Limpieza facial profunda con tecnología Vortex-Fusion patentada.",
        descripcionLarga: "HydraFacial es un tratamiento facial de 3 pasos que limpia, exfolia, extrae e hidrata la piel simultáneamente usando tecnología Vortex patentada. Combina la hidrabrasión con serums personalizados para resultados inmediatos sin downtime.",
        caracteristicas: [
            { titulo: "Tecnología", valor: "Vortex-Fusion" },
            { titulo: "Pasos", valor: "3 (Limpia + Extrae + Hidrata)" },
            { titulo: "Serums", valor: "Personalizables" },
            { titulo: "Downtime", valor: "Cero" }
        ],
        beneficios: [
            "Limpieza profunda sin dolor",
            "Hidratación instantánea",
            "Extracción indolora",
            "Piel radiante inmediata",
            "Apto para todo tipo de piel"
        ],
        zonasAplicacion: ["Rostro completo", "Cuello", "Escote"],
        duracionSesion: "30-45 minutos",
        sesionesRecomendadas: "Mensual para mantenimiento",
        resultadosVisibles: "Inmediatos",
        duracionResultados: "5-7 días de brillo, acumulativo con sesiones",
        contraindicaciones: [
            "Rosácea activa severa",
            "Herpes activo",
            "Quemaduras solares"
        ],
        cuidadosPost: [
            "Protector solar",
            "Evitar exfoliantes 48h"
        ],
        seo: {
            metaTitle: "HydraFacial MD Los Ángeles | Limpieza Facial Profunda | Clínica Cialo",
            metaDescription: "HydraFacial MD en Los Ángeles. Limpieza facial con tecnología Vortex. Hidratación profunda y resultados inmediatos sin downtime.",
            keywords: ["hydrafacial", "limpieza facial profunda", "hidrafacial los ángeles", "vortex facial"]
        }
    }
];

// Helper functions
export const getTecnologiaBySlug = (slug: string): Tecnologia | undefined => {
    return tecnologiasData.find(t => t.slug === slug);
};

export const getTecnologiaById = (id: string): Tecnologia | undefined => {
    return tecnologiasData.find(t => t.id === id);
};

export const getTecnologiasByCategoria = (categoria: Tecnologia["categoria"]): Tecnologia[] => {
    return tecnologiasData.filter(t => t.categoria === categoria);
};
