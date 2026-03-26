import type { APIRoute } from 'astro';
import { allCities, regionHubs, useCaseHubs } from '@data/site';

function renderUrl(loc: string) {
  return `<url><loc>${loc}</loc></url>`;
}

const siteOrigin = 'https://sunrisetime.co';

export const GET: APIRoute = () => {
  const staticPages = [
    '/zh-cn/',
    '/zh-cn/about/',
    '/zh-cn/contact/',
    '/zh-cn/privacy/',
    '/zh-cn/terms/',
    '/zh-cn/methodology/',
    '/zh-cn/cities/',
    '/zh-cn/guides/',
    '/zh-cn/sitemap/',
  ];

  const urls = [
    ...staticPages,
    ...regionHubs.map((region) => `/zh-cn/cities/${region.slug}/`),
    ...useCaseHubs.map((hub) => `/zh-cn/guides/${hub.slug}/`),
    ...allCities.flatMap((city) => [
      `/zh-cn/sunrise/${city.slug}/`,
      `/zh-cn/prayer-times/${city.slug}/`,
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
