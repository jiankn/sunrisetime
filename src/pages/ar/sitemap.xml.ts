import type { APIRoute } from 'astro';
import { allCities, regionHubs, useCaseHubs } from '@data/site';

function renderUrl(loc: string) {
  return `<url><loc>${loc}</loc></url>`;
}

const siteOrigin = 'https://sunrisetime.co';

export const GET: APIRoute = () => {
  const staticPages = [
    '/ar/',
    '/ar/about/',
    '/ar/contact/',
    '/ar/privacy/',
    '/ar/terms/',
    '/ar/methodology/',
    '/ar/cities/',
    '/ar/guides/',
    '/ar/sitemap/',
  ];

  const urls = [
    ...staticPages,
    ...regionHubs.map((region) => `/ar/cities/${region.slug}/`),
    ...useCaseHubs.map((hub) => `/ar/guides/${hub.slug}/`),
    ...allCities.flatMap((city) => [
      `/ar/sunrise/${city.slug}/`,
      `/ar/prayer-times/${city.slug}/`,
    ]),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((path) => renderUrl(new URL(path, siteOrigin).toString())),
    '</urlset>',
  ].join('');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
