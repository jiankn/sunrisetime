import type { APIRoute } from 'astro';
import { allCities, regionHubs, useCaseHubs } from '@data/site';

function renderUrl(loc: string) {
  return `<url><loc>${loc}</loc></url>`;
}

const siteOrigin = 'https://sunrisetime.co';

export const GET: APIRoute = () => {
  const staticPages = [
    '/tr/',
    '/tr/about/',
    '/tr/contact/',
    '/tr/privacy/',
    '/tr/terms/',
    '/tr/methodology/',
    '/tr/cities/',
    '/tr/guides/',
    '/tr/guides/api/',
    '/tr/sitemap/',
  ];

  const urls = [
    ...staticPages,
    ...regionHubs.map((region) => `/tr/cities/${region.slug}/`),
    ...useCaseHubs.map((hub) => `/tr/guides/${hub.slug}/`),
    ...allCities.flatMap((city) => [
      `/tr/sunrise/${city.slug}/`,
      `/tr/prayer-times/${city.slug}/`,
      `/tr/golden-hour/${city.slug}/`,
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


