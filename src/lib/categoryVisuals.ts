/**
 * Identidad visual por categoría de tratamiento.
 * Cada categoría tiene un gradiente, un color de acento y un ícono (path SVG)
 * para darle a las cards una cabecera distintiva sin necesitar fotos.
 * La paleta es sobria y armónica con el dorado/champagne de Cialo.
 */

export interface CategoryVisual {
    /** Clases tailwind para el gradiente de la cabecera */
    gradient: string;
    /** Color de acento (hex) */
    accent: string;
    /** Path(s) del ícono SVG (outline, stroke=currentColor) */
    iconPath: string;
}

const VISUALS: Record<string, CategoryVisual> = {
    Facial: {
        gradient: "from-[#e7d8c1] to-[#cdb893]",
        accent: "#b89a68",
        iconPath:
            "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    },
    Corporal: {
        gradient: "from-[#e3c9c0] to-[#c8a097]",
        accent: "#b07f74",
        iconPath:
            "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    },
    Capilar: {
        gradient: "from-[#dccbab] to-[#b89a6e]",
        accent: "#94774c",
        iconPath:
            "M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l10.062 5.808M9.384 9.137a3 3 0 105.196-3 3 3 0 00-5.196 3zm0 5.726a3 3 0 105.196 3 3 3 0 00-5.196-3z",
    },
    "Ginecoestética": {
        gradient: "from-[#e3c9d6] to-[#c79fb2]",
        accent: "#a9748d",
        iconPath:
            "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    },
    "Urología": {
        gradient: "from-[#c8d2dc] to-[#92a6b8]",
        accent: "#5f788c",
        iconPath:
            "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    },
    Vascular: {
        gradient: "from-[#c4dbcf] to-[#8eb3a3]",
        accent: "#578071",
        iconPath:
            "M3.75 12h3.25l1.75-4.5 3 9 1.75-4.5h3.75",
    },
    "Nutrición": {
        gradient: "from-[#cfdcc0] to-[#a3b88a]",
        accent: "#728757",
        iconPath:
            "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z",
    },
};

const DEFAULT_VISUAL: CategoryVisual = {
    gradient: "from-[#e7d8c1] to-[#cdb893]",
    accent: "#b89a68",
    iconPath:
        "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
};

export function getCategoryVisual(categoria: string): CategoryVisual {
    return VISUALS[categoria] || DEFAULT_VISUAL;
}
