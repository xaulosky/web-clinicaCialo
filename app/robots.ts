import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: "*", allow: "/" },
            // Rastreadores de asistentes de IA: se les permite todo y se les
            // apunta a /llms.txt, el resumen del sitio en texto plano.
            { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Bingbot"], allow: "/" },
        ],
        sitemap: "https://cialo.cl/sitemap.xml",
    };
}
