// Novedades / promociones que rotan en el hero del home (slides a pantalla
// completa). La primera slide del hero es siempre la de marca; luego rotan
// estas promos, cada una ocupando todo el hero.
//
// Cómo editar:
//   - Agrega, quita o edita objetos en `promocionesData`.
//   - `activa: false` oculta una promo sin borrarla.
//   - `tipo` define el icono/etiqueta de acento: "promo" | "nuevo" | "agenda" | "info".
//   - `imagen` es el fondo de la slide (URL o ruta local en /public). Si falta o
//     falla, se usa una imagen de respaldo de la clínica.
//   - `texto` = titular grande. `subtexto` = línea de apoyo (opcional).
//   - `href` + `cta` = botón (ruta interna o URL externa como WhatsApp).
//   - Si no hay ninguna activa, el hero muestra solo la slide de marca.

export type TipoPromocion = "promo" | "nuevo" | "agenda" | "info";

export interface Promocion {
    id: string;
    etiqueta: string;
    texto: string;
    subtexto?: string;
    tipo?: TipoPromocion;
    imagen?: string;
    href?: string;
    /** Texto del botón. Por defecto "Ver más". */
    cta?: string;
    activa?: boolean;
}

export const promocionesData: Promocion[] = [
    {
        id: "promo-limpieza-facial",
        etiqueta: "Descuento",
        texto: "Limpieza Facial a $70.000",
        subtexto: "Usa el código LIMPIEZA70 al agendar. Piel más limpia, luminosa y renovada.",
        tipo: "promo",
        imagen: "/clinica/clinica-cialo_boxdeatencionfacial.webp",
        href: "/tratamientos/limpieza-facial-manual",
        cta: "Aprovechar promo",
        activa: true,
    },
    {
        id: "promo-examen-inbody",
        etiqueta: "Nutrición",
        texto: "InBody: el mejor examen nutricional",
        subtexto: "Composición corporal completa —grasa, músculo, agua y metabolismo—: la base exacta de tu plan de nutrición.",
        tipo: "info",
        imagen: "/blog/inbody-970-medicion.png",
        href: "/tratamientos/examen-inbody",
        cta: "Conocer el examen",
        activa: true,
    },
    // Oculta (no se muestra). Para reactivarla, poner activa: true.
    {
        id: "taller-bariatrica",
        etiqueta: "Taller",
        texto: "Taller de Cirugía Bariátrica",
        subtexto: "Más allá de la cirugía. Inscríbete y entérate de la próxima fecha.",
        tipo: "agenda",
        imagen: "/promociones/taller-bariatrica.webp",
        href: "/taller-cirugia-bariatrica",
        cta: "Inscribirme",
        activa: false,
    },
];

/** Promociones visibles (en orden), filtrando las desactivadas. */
export function getPromocionesActivas(): Promocion[] {
    return promocionesData.filter((p) => p.activa !== false);
}
