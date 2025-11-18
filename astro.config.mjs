// @ts-check
import { defineConfig } from "astro/config";
import VitePWA from "@vite-pwa/astro";
import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    preact(),
    VitePWA({
      registerType: "autoUpdate", // Actualiza el SW automáticamente

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,webp,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
      manifest: {
        name: "Analgosedación",
        short_name: "Analgosedación",
        description: "Escalas y herramientas para analgosedación en pediatría.",
        start_url: "/index.astro",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#0f172a",
        orientation: "portrait",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/apple-180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
