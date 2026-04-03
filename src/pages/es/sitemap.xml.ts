import type { APIRoute } from 'astro';
import { allCities, regionHubs, useCaseHubs } from '@data/site';

function renderUrl(loc: string) {
  return `<url><loc>${loc}</loc></url>`;
}

const siteOrigin = 'https://sunrisetime.co';

export const GET: APIRoute = () => {
  const staticPages = [
    '/es/',
    '/es/about/',
    '/es/contact/',
    '/es/privacy/',
    '/es/terms/',
    '/es/methodology/',
    '/es/cities/',
    '/es/guides/',
    '/es/guides/api/',
    '/es/sitemap/',
  ];

  const urls = [
    ...staticPages,
    ...regionHubs.map((region) => `/es/cities/${region.slug}/`),
    ...useCaseHubs.map((hub) => `/es/guides/${hub.slug}/`),
    ...allCities.flatMap((city) => [
      `/es/sunrise/${city.slug}/`,
      `/es/prayer-times/${city.slug}/`,
      `/es/golden-hour/${city.slug}/`,
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
