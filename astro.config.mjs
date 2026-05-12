import sitemap from "@astrojs/sitemap";
import editableRegions from "@cloudcannon/editable-regions/astro-integration";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: "https://hargrovewealth.com",
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
  devToolbar: {
    enabled: false,
  },
  server: {
    port: 4321,
  },
  image: {
    domains: [],
  },
  integrations: [
    editableRegions(),
    icon({
      iconDir: path.resolve(__dirname, "src/icons"),
      svgoOptions: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupIds: false,
              },
            },
          },
        ],
      },
    }),
    sitemap({
      filter: (page) => {
        if (page.endsWith("/404") || page.endsWith("/404.html")) {
          return false;
        }
        return true;
      },
    }),
    mdx(),
  ],
  vite: {
    build: {
      minify: "esbuild",
      chunkSizeWarningLimit: 1024,
    },
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@content": path.resolve(__dirname, "src/content"),
      },
    },
  },
});
