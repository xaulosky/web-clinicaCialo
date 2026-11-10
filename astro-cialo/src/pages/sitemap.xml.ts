import manifest from "../generated/route-manifest.json";
import { blogPosts } from "@/data/blog";
import { categoriasData } from "@/data/categorias";
import { consultasData } from "@/data/consultas";
import { productosData } from "@/data/productos";
import { profesionalesData } from "@/data/profesionales";
import { tratamientosData } from "@/data/tratamientos";

const SITE_URL = "https://cialo.cl";

const ensureTrailingSlash = (route: string) => {
  if (route === "/") {
    return route;
  }

  return route.endsWith("/") ? route : `${route}/`;
};

const isPublicRoute = (route: string) => {
  const excludedPrefixes = ["/admin", "/mi-cuenta"];
  const excludedRoutes = ["/checkout", "/confirmacion", "/confirmacion-cita"];

  return (
    !excludedPrefixes.some((prefix) => route.startsWith(prefix)) &&
    !excludedRoutes.includes(route)
  );
};

export function GET() {
  const staticRoutes = manifest
    .filter((entry) => !entry.dynamic && isPublicRoute(entry.route))
    .map((entry) => ensureTrailingSlash(entry.route));

  const dynamicRoutes = [
    ...blogPosts.map((post) => `/blog/${post.slug}/`),
    ...consultasData.map((consulta) => `/consultas/${consulta.id}/`),
    ...productosData.map((producto) => `/productos/${producto.slug}/`),
    ...profesionalesData.map((profesional) => `/profesionales/${profesional.id}/`),
    ...tratamientosData.map((tratamiento) => `/tratamientos/${tratamiento.id}/`),
    ...categoriasData.map((categoria) => `/tratamientos/categoria/${categoria.slug}/`)
  ];

  const urls = [...new Set([...staticRoutes, ...dynamicRoutes])]
    .sort((left, right) => left.localeCompare(right))
    .map((route) => `${SITE_URL}${route === "/" ? "/" : route}`);

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map(
      (url) =>
        `  <url>\n    <loc>${url}</loc>\n  </url>`
    )
    .join("\n")}\n</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}

