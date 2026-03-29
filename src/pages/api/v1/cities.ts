import type { APIRoute } from 'astro';
import { allCities, getCityLocationLabel } from '@data/site';
import { apiError, buildApiMeta, jsonResponse, optionsResponse } from '@utils/api';

export const prerender = false;

const CACHE_TTL_SECONDS = 3600;
const MAX_LIMIT = 25;
const DEFAULT_LIMIT = 10;

function normalizeSearchValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function parseLimit(rawLimit: string | null) {
  if (!rawLimit) {
    return DEFAULT_LIMIT;
  }

  const parsed = Number(rawLimit);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }

  return Math.min(parsed, MAX_LIMIT);
}

function getCitySearchScore(city: (typeof allCities)[number], query: string) {
  if (!query) {
    return 100;
  }

  const name = normalizeSearchValue(city.name);
  const slug = normalizeSearchValue(city.slug);
  const country = normalizeSearchValue(city.countryName ?? city.country);
  const admin1 = normalizeSearchValue(city.admin1 ?? '');

  if (slug === query) return 0;
  if (name === query) return 1;
  if (`${name} ${country}` === query) return 2;
  if (name.startsWith(query)) return 3;
  if (slug.startsWith(query)) return 4;
  if (country === query) return 5;
  if (admin1 && admin1 === query) return 6;
  if (name.includes(query)) return 7;
  if (slug.includes(query)) return 8;
  if (country.includes(query)) return 9;
  if (admin1 && admin1.includes(query)) return 10;

  return Number.POSITIVE_INFINITY;
}

export const OPTIONS: APIRoute = ({ request }) => optionsResponse(request.headers.get('Origin'));

export const GET: APIRoute = ({ url, request }) => {
  const requestOrigin = request.headers.get('Origin');
  const rawQuery = url.searchParams.get('query')?.trim() ?? '';
  const normalizedQuery = normalizeSearchValue(rawQuery);
  const limit = parseLimit(url.searchParams.get('limit'));

  if (limit === null) {
    return apiError(400, 'invalid_limit', `Invalid "limit" query parameter. Use an integer between 1 and ${MAX_LIMIT}.`, {
      details: {
        parameter: 'limit',
        received: url.searchParams.get('limit'),
      },
      requestOrigin,
    });
  }

  const results = [...allCities]
    .map((city) => ({
      city,
      score: getCitySearchScore(city, normalizedQuery),
    }))
    .filter((entry) => normalizedQuery ? Number.isFinite(entry.score) : true)
    .sort((left, right) => {
      if (left.score !== right.score) {
        return left.score - right.score;
      }

      if (left.city.population !== right.city.population) {
        return right.city.population - left.city.population;
      }

      return left.city.name.localeCompare(right.city.name);
    })
    .slice(0, limit)
    .map(({ city }) => ({
      slug: city.slug,
      name: city.name,
      country: city.country,
      countryName: city.countryName,
      admin1: city.admin1 ?? '',
      continent: city.continent,
      population: city.population,
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.timezone,
      locationLabel: getCityLocationLabel(city, { includeAdmin1: Boolean(city.admin1) }),
      links: {
        api: `${url.origin}/api/v1/times?city=${city.slug}`,
        sunrisePage: `${url.origin}/sunrise/${city.slug}/`,
        prayerPage: `${url.origin}/prayer-times/${city.slug}/`,
      },
    }));

  return jsonResponse({
    meta: buildApiMeta('/api/v1/cities', {
      query: rawQuery,
      limit,
    }, CACHE_TTL_SECONDS, {
      self: url.toString(),
      returned: results.length,
      totalIndexedCities: allCities.length,
    }),
    cities: results,
  }, {
    cacheControl: `public, max-age=${CACHE_TTL_SECONDS}, s-maxage=${CACHE_TTL_SECONDS}`,
    requestOrigin,
  });
};
