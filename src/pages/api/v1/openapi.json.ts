import type { APIRoute } from 'astro';
import { API_DOCS_URL, jsonResponse, optionsResponse } from '@utils/api';

export const prerender = false;

export const OPTIONS: APIRoute = ({ request }) => optionsResponse(request.headers.get('Origin'));

export const GET: APIRoute = ({ url, request }) => {
  const baseUrl = `${url.origin}/api/v1`;

  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'SunriseTime API',
      version: '1.0.0',
      description: 'Public beta API for city lookup, sunrise and sunset data, golden-hour windows, moon details, and prayer times.',
    },
    servers: [
      { url: baseUrl },
    ],
    externalDocs: {
      description: 'Human-readable API documentation',
      url: API_DOCS_URL,
    },
    paths: {
      '/cities': {
        get: {
          summary: 'Search supported cities',
          description: 'Returns matching city slugs and metadata so clients can resolve a city before requesting timing data.',
          parameters: [
            {
              name: 'query',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'City, slug, country, or admin region search term. Empty query returns popular cities.',
            },
            {
              name: 'limit',
              in: 'query',
              required: false,
              schema: { type: 'integer', minimum: 1, maximum: 25, default: 10 },
              description: 'Maximum number of city matches to return.',
            },
          ],
          responses: {
            '200': {
              description: 'A list of matching cities.',
            },
            '400': {
              description: 'Invalid query parameter.',
            },
          },
        },
      },
      '/times': {
        get: {
          summary: 'Fetch timing data for one city',
          description: 'Returns sun, golden hour, moon, and prayer-time data for a city slug and optional date.',
          parameters: [
            {
              name: 'city',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'City slug, for example "new-york" or "istanbul".',
            },
            {
              name: 'date',
              in: 'query',
              required: false,
              schema: { type: 'string', format: 'date' },
              description: 'Optional local date in YYYY-MM-DD format.',
            },
          ],
          responses: {
            '200': {
              description: 'Timing data for the requested city and date.',
            },
            '400': {
              description: 'Missing city or invalid date.',
            },
            '404': {
              description: 'Unknown city slug.',
            },
          },
        },
      },
    },
  };

  return jsonResponse(spec, {
    extraHeaders: {
      'Content-Type': 'application/openapi+json; charset=utf-8',
    },
    cacheControl: 'public, max-age=3600, s-maxage=3600',
    requestOrigin: request.headers.get('Origin'),
  });
};
