import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { profesionalesData } from "@/data/profesionales";
import { tratamientosData } from "@/data/tratamientos";
import { productosData } from "@/data/productos";
import { consultasData } from "@/data/consultas";
import { categoriasData } from "@/data/categorias";

export const dynamic = "force-static";

const BASE_URL = "https://cialo.cl";

// Con barra final, igual que el canonical (trailingSlash: true): sin ella cada URL redirige.
const url = (path: string) => `${BASE_URL}${path.replace(/\/?$/, "/")}`;

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: url(""), lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: url(`/nosotros`), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: url(`/contacto`), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: url(`/tratamientos`), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: url(`/profesionales`), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: url(`/productos`), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
        { url: url(`/blog`), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: url(`/consultas`), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: url(`/convenios`), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: url(`/convenios/club-golf-7-rios`), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: url(`/convenios/bienestar-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: url(`/casos-clinicos`), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: url(`/giftcard`), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: url(`/evaluacion-tratamientos`), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: url(`/agendar`), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: url(`/academy`), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: url(`/mes-del-lipedema`), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: url(`/taller-cirugia-bariatrica`), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
        { url: url(`/trabaja-con-nosotros`), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
        { url: url(`/politica-pagos`), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: url(`/terminos`), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: url(`/privacidad`), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    // Landing pages (SEO specific)
    const landingPages: MetadataRoute.Sitemap = [
        { url: url(`/depilacion-laser-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/laser-avanzado-en-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/corporal-contorno-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/estetica-facial-en-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/cirugia-estetica-en-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/inbody-970-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/calorimetria-indirecta-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/escleroterapia-consulta-vascular-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/cirujano-vascular-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/ginecologo-los-angeles-chile`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/dermatologo-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/melasma-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/psiquiatra-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/podologo-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/urologo-los-angeles-chile`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/nutricionista-los-angeles-chile`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/matrona-los-angeles-chile`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/injerto-capilar-los-angeles-chile`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/armonizacion-orofacial-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/toxina-botulinica-tercio-superior-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/soprano-titanium-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/rinomodelacion-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/clatuu-alpha-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/morpheus8-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/exilis-ultra-360-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/scizer-hifu-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/hydrafacial-md-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/relleno-labios-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/sculptra-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/injerto-capilar-fue-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/escleroterapia-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/engrosamiento-peneano-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/laser-co2-vaginal-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/bichectomia-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/blefaroplastia-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/otoplastia-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/mentoplastia-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/liplift-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/lifting-cervical-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/lipoaspiracion-facial-cervical-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/lobuloplastia-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/rosacea-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/cicatrices-acne-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/relleno-ojeras-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/drenaje-linfatico-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/laser-vascular-varices-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/vasectomia-sin-bisturi-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/cistoscopia-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/medicacion-control-peso-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/arriendo-box-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: url(`/arriendo-pabellon-los-angeles`), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        // { url: url(`/san-valentin`), lastModified: now, changeFrequency: "daily", priority: 1.0 },
    ];

    // Categorias: solo las que tienen página (slug real de categorias.ts, sin tildes)
    const categoryPages: MetadataRoute.Sitemap = categoriasData.map(cat => ({
        url: url(`/tratamientos/categoria/${cat.slug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8
    }));

    // Profesionales dinamicos
    const professionalPages: MetadataRoute.Sitemap = profesionalesData.map(prof => ({
        url: url(`/profesionales/${prof.id}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7
    }));

    // Tratamientos dinamicos
    const treatmentPages: MetadataRoute.Sitemap = tratamientosData.map(t => ({
        url: url(`/tratamientos/${t.id}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8
    }));

    // Consultas dinamicas
    const consultationPages: MetadataRoute.Sitemap = consultasData.map(c => ({
        url: url(`/consultas/${c.id}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8
    }));

    // Productos dinamicos
    const productPages: MetadataRoute.Sitemap = productosData.map(p => ({
        url: url(`/productos/${p.slug}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7
    }));

    // Blog dinamico
    const blogDynamicPages: MetadataRoute.Sitemap = blogPosts.map(post => ({
        url: url(`/blog/${post.slug}`),
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
