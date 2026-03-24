import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sunrisetime.co',
  adapter: cloudflare(),
  integrations: [
    sitemap({
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => {
        const excludedPages = ['/404', '/privacy/', '/terms/', '/contact/', '/sitemap/'];
        return !excludedPages.some((segment) => page.includes(segment));
      },
    }),
  ],
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
