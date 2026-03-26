import type { APIRoute } from 'astro';
import { allCities, regionHubs, useCaseHubs } from '@data/site';

function renderUrl(loc: string) {
  return `<url><loc>${loc}</loc></url>`;
}

const siteOrigin = 'https://sunrisetime.co';

export const GET: APIRoute = () => {
  const staticPages = [
    '/fr/',
    '/fr/about/',
    '/fr/contact/',
    '/fr/privacy/',
    '/fr/terms/',
    '/fr/methodology/',
    '/fr/cities/',
    '/fr/guides/',
    '/fr/sitemap/',
  ];

  const urls = [
    ...staticPages,
    ...regionHubs.map((region) => `/fr/cities/${region.slug}/`),
    ...useCaseHubs.map((hub) => `/fr/guides/${hub.slug}/`),
    ...allCities.flatMap((city) => [
      `/fr/sunrise/${city.slug}/`,
      `/fr/prayer-times/${city.slug}/`,
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


