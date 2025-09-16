// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ignaciopoletti.com',
  integrations: [
    tailwind(), 
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],
  // Configuración de compilación
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Configuración de Vite
  vite: {
    ssr: {
      noExternal: ['@studio-freight/lenis'],
    },
  },
});
