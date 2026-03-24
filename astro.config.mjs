import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://sunrisetime.co',
  adapter: cloudflare(),
  vite: {
    css: {
      devSourcemap: true,
    },
  },
});
