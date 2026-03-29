export const API_VERSION = 'v1';
export const API_DOCS_URL = 'https://sunrisetime.co/guides/api/';
export const API_PUBLIC_BETA_POLICY = 'anonymous-access-target-100-requests-per-ip-per-day';

const ALLOWED_BROWSER_ORIGINS = new Set([
  'https://sunrisetime.co',
  'https://www.sunrisetime.co',
  'http://localhost:4321',
]);

type JsonResponseOptions = {
  status?: number;
  cacheControl?: string;
  extraHeaders?: HeadersInit;
  requestOrigin?: string | null;
};

type ApiErrorOptions = {
  details?: Record<string, unknown>;
  cacheControl?: string;
  requestOrigin?: string | null;
};

const BASE_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
  'X-SunriseTime-Api-Version': API_VERSION,
  'X-SunriseTime-Docs': API_DOCS_URL,
  'X-SunriseTime-Api-Phase': 'public-beta',
  'X-SunriseTime-Beta-Policy': API_PUBLIC_BETA_POLICY,
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  Vary: 'Origin',
};

export function buildApiMeta(
  endpoint: string,
  query: Record<string, unknown>,
  cacheTtlSeconds: number,
  extras: Record<string, unknown> = {},
) {
  return {
    version: API_VERSION,
    endpoint,
    documentationUrl: API_DOCS_URL,
    generatedAt: new Date().toISOString(),
    cacheTtlSeconds,
    query,
    ...extras,
  };
}

function createHeaders(cacheControl: string, requestOrigin?: string | null, extraHeaders?: HeadersInit) {
  const headers = new Headers(BASE_HEADERS);
  headers.set('Cache-Control', cacheControl);

  if (requestOrigin && ALLOWED_BROWSER_ORIGINS.has(requestOrigin)) {
    headers.set('Access-Control-Allow-Origin', requestOrigin);
  }

  if (extraHeaders) {
    new Headers(extraHeaders).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  return headers;
}

export function jsonResponse(data: unknown, options: JsonResponseOptions = {}) {
  const {
    status = 200,
    cacheControl = 'public, max-age=900, s-maxage=900',
    extraHeaders,
    requestOrigin,
  } = options;

  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: createHeaders(cacheControl, requestOrigin, extraHeaders),
  });
}

export function apiError(
  status: number,
  code: string,
  message: string,
  options: ApiErrorOptions = {},
) {
  const { details, cacheControl = 'public, max-age=60, s-maxage=60', requestOrigin } = options;

  return jsonResponse({
    error: {
      code,
      message,
      documentationUrl: API_DOCS_URL,
      details: details ?? null,
    },
  }, {
    status,
    cacheControl,
    requestOrigin,
  });
}

export function optionsResponse(requestOrigin?: string | null) {
  return new Response(null, {
    status: 204,
    headers: createHeaders('public, max-age=86400, s-maxage=86400', requestOrigin),
  });
}
