import type { APIRoute } from 'astro';
import { allCities, regionHubs, useCaseHubs } from '@data/site';

const siteOrigin = 'https://sunrisetime.co';

function toAbsoluteUrl(path: string) {
  return new URL(path, siteOrigin).toString();
}

function renderUrl(loc: string) {
  return `<url><loc>${loc}</loc></url>`;
}

export const GET: APIRoute = () => {
  const staticPages = [
    '/',
    '/about/',
    '/methodology/',
    '/cities/',
    '/guides/',
  ];

  const urls = [
    ...staticPages,
    ...regionHubs.map((region) => region.path),
    ...useCaseHubs.map((hub) => hub.path),
    ...allCities.map((city) => `/sunrise/${city.slug}/`),
  ];

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((path) => renderUrl(toAbsoluteUrl(path))),
    '</urlset>',
  ].join('');

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
