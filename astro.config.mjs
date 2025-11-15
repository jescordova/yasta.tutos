// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import expressiveCode from "astro-expressive-code";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    expressiveCode({
      themes: ["dark-plus"],
      defaultProps: {
        wrap: true
      }
    })
  ]
});