import type { APIRoute } from 'astro';
import { allCities, regionHubs, useCaseHubs } from '@data/site';

function renderUrl(loc: string) {
  return `<url><loc>${loc}</loc></url>`;
}

const siteOrigin = 'https://sunrisetime.co';

export const GET: APIRoute = () => {
  const staticPages = [
    '/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/',
    '/methodology/',
    '/cities/',
    '/guides/',
    '/sitemap/',
  ];

  const urls = [
    ...staticPages,
    ...regionHubs.map((region) => region.path),
    ...useCaseHubs.map((hub) => hub.path),
    ...allCities.flatMap((city) => [
      `/sunrise/${city.slug}/`,
      `/prayer-times/${city.slug}/`,
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
