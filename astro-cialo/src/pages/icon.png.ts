import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";

const iconUrl = new URL("../../../app/icon.png", import.meta.url);

export const GET: APIRoute = async () => {
  const icon = await readFile(iconUrl);

  return new Response(icon, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
