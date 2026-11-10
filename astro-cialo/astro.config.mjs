import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

const fromHere = (relativePath) => fileURLToPath(new URL(relativePath, import.meta.url));
const repoRoot = fromHere("../");

export default defineConfig({
  integrations: [react()],
  output: "static",
  trailingSlash: "ignore",
  publicDir: "../public",
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
    resolve: {
      dedupe: ["react", "react-dom"],
      alias: [
        {
          find: /^zustand$/,
          replacement: fromHere("./node_modules/zustand/esm/react.mjs")
        },
        {
          find: /^zustand\/react$/,
          replacement: fromHere("./node_modules/zustand/esm/react.mjs")
        },
        {
          find: /^zustand\/vanilla$/,
          replacement: fromHere("./node_modules/zustand/esm/vanilla.mjs")
        },
        {
          find: /^zustand\/middleware$/,
          replacement: fromHere("./node_modules/zustand/esm/middleware.mjs")
        },
        {
          find: "next/link",
          replacement: fromHere("./src/shims/next-link.tsx")
        },
        {
          find: "next/image",
          replacement: fromHere("./src/shims/next-image.tsx")
        },
        {
          find: "next/navigation",
          replacement: fromHere("./src/shims/next-navigation.tsx")
        },
        {
          find: "next/script",
          replacement: fromHere("./src/shims/next-script.tsx")
        },
        {
          find: "next",
          replacement: fromHere("./src/shims/next.ts")
        },
        {
          find: "@/app",
          replacement: fromHere("../app")
        },
        {
          find: "@/data",
          replacement: fromHere("../src/data")
        },
        {
          find: "@/lib",
          replacement: fromHere("../src/lib")
        }
      ]
    },
    define: {
      'process.env': '{}'
    },
    build: {
      cssCodeSplit: false
    },
    server: {
      fs: {
        allow: [repoRoot]
      }
    }
  }
});
