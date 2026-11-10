import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { profesionalesData } from "@/data/profesionales";
import { tratamientosData } from "@/data/tratamientos";
import { productosData } from "@/data/productos";
import { consultasData } from "@/data/consultas";

export const dynamic = "force-static";

const BASE_URL = "https://cialo.cl";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/tratamientos`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/profesionales`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/productos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/consultas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ];

    // Landing pages (SEO specific)
    const landingPages: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/depilacion-laser-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/laser-avanzado-en-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/corporal-contorno-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/estetica-facial-en-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/cirugia-estetica-en-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/inbody-970-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/calorimetria-indirecta-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/escleroterapia-consulta-vascular-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/cirujano-vascular-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/ginecologo-los-angeles-chile`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/dermatologo-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/melasma-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/psiquiatra-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/podologo-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/urologo-los-angeles-chile`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/nutricionista-los-angeles-chile`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/matrona-los-angeles-chile`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/injerto-capilar-los-angeles-chile`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/armonizacion-orofacial-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/toxina-botulinica-tercio-superior-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/soprano-titanium-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/rinomodelacion-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/clatuu-alpha-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/morpheus8-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/exilis-ultra-360-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/scizer-hifu-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/hydrafacial-md-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/relleno-labios-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/sculptra-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/injerto-capilar-fue-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/escleroterapia-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/engrosamiento-peneano-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/laser-co2-vaginal-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/arriendo-pabellon-los-angeles`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        // { url: `${BASE_URL}/san-valentin`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
        { url: `${BASE_URL}/dia-de-la-madre`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    ];

    // Categorias dinamicas
    const categorias = [...new Set(tratamientosData.map(t => t.categoria.toLowerCase()))];
    const categoryPages: MetadataRoute.Sitemap = categorias.map(cat => ({
        url: `${BASE_URL}/tratamientos/categoria/${cat}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8
    }));

    // Profesionales dinamicos
    const professionalPages: MetadataRoute.Sitemap = profesionalesData.map(prof => ({
        url: `${BASE_URL}/profesionales/${prof.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7
    }));

    // Tratamientos dinamicos
    const treatmentPages: MetadataRoute.Sitemap = tratamientosData.map(t => ({
        url: `${BASE_URL}/tratamientos/${t.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8
    }));

    // Consultas dinamicas
    const consultationPages: MetadataRoute.Sitemap = consultasData.map(c => ({
        url: `${BASE_URL}/consultas/${c.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8
    }));

    // Productos dinamicos
    const productPages: MetadataRoute.Sitemap = productosData.map(p => ({
        url: `${BASE_URL}/productos/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7
    }));

    // Blog dinamico
    const blogDynamicPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.6
    }));

    return [
        ...staticPages,
        ...landingPages,
        ...categoryPages,
        ...professionalPages,
        ...treatmentPages,
        ...consultationPages,
        ...productPages,
        ...blogDynamicPages,
    ];
}
