import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '<sitemap><loc>https://sunrisetime.co/sitemap-en.xml</loc></sitemap>',
    '<sitemap><loc>https://sunrisetime.co/es/sitemap.xml</loc></sitemap>',
    '<sitemap><loc>https://sunrisetime.co/ar/sitemap.xml</loc></sitemap>',
    '<sitemap><loc>https://sunrisetime.co/zh-cn/sitemap.xml</loc></sitemap>',
    '<sitemap><loc>https://sunrisetime.co/fr/sitemap.xml</loc></sitemap>',
    '<sitemap><loc>https://sunrisetime.co/tr/sitemap.xml</loc></sitemap>',
    '</sitemapindex>',
  ].join('');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
