import type { APIRoute } from 'astro';
import { allCities, getCitySearchRecord } from '@data/site';

export const GET: APIRoute = () => {
  const body = JSON.stringify(allCities.map((city) => getCitySearchRecord(city)));

  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};
