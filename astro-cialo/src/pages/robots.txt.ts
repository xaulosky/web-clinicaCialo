export function GET() {
  const lines = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /mi-cuenta/",
    "",
    "Sitemap: https://cialo.cl/sitemap.xml"
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}

