import type { BlogPost } from "@/data/blog";
import { categoriasData, type CategoriaInfo } from "@/data/categorias";
import type { Tratamiento } from "@/data/tratamientos";

export const SITE_URL = "https://cialo.cl";
export const SITE_NAME = "Clínica Cialo";
export const WHATSAPP_URL = "https://wa.me/56982028473";
export const CONTACT_EMAIL = "contacto@cialo.cl";
export const CONTACT_PHONE = "+56 9 8202 8473";
export const CLINIC_ADDRESS = "Bulnes 220, Of. 509, Edificio Puerto Mayor II, Los Ángeles, Chile";

export function toAbsoluteUrl(value: string) {
  return new URL(value, SITE_URL).toString();
}

export function formatCurrency(valueFrom: number | null, valueTo?: number | null) {
  if (!valueFrom) {
    return "Evaluación previa";
  }

  const format = (value: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0
    }).format(value);

  if (valueTo) {
    return `${format(valueFrom)} - ${format(valueTo)}`;
  }

  return format(valueFrom);
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(dateString));
}

export function getCategoryByName(name: string) {
  return categoriasData.find((category) => category.nombre === name);
}

export function getCategoryHref(categoryName: string) {
  const category = getCategoryByName(categoryName);
  return category ? `/tratamientos/categoria/${category.slug}/` : "/tratamientos/";
}

export function getTreatmentHref(treatment: Tratamiento) {
  if (treatment.slug) {
    return `/${treatment.slug}/`;
  }

  return `/tratamientos/${treatment.id}/`;
}

export function getPostHref(post: BlogPost) {
  return `/blog/${post.slug}/`;
}

export function cleanDescription(description: string) {
  return description.replace(/\s*Valor Evaluaci[oó]n:.*$/i, "").trim();
}

export function truncate(text: string, maxLength = 160) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

export function sortPostsByDate(posts: BlogPost[]) {
  return [...posts].sort(
    (left, right) =>
      new Date(right.fechaPublicacion).getTime() - new Date(left.fechaPublicacion).getTime()
  );
}

export function uniqueTags(posts: BlogPost[], limit = 8) {
  return [...new Set(posts.flatMap((post) => post.tags))].slice(0, limit);
}

export function getPrimaryImageForTreatment(
  treatment: Tratamiento,
  fallbackCategory?: CategoriaInfo
) {
  return (
    treatment.imagenHero ||
    treatment.imagenExplicativa ||
    fallbackCategory?.imagen ||
    "/clinica/clinica-cialo_boxprocedimientos.webp"
  );
}
