import type { APIRoute } from 'astro';
import { getCityBySlug } from '@data/site';
import { getGoldenHour, getSunTimes, formatTime } from '@utils/sun';
import { getMoonData } from '@utils/moon';
import { getPrayerTimes } from '@utils/prayer-times';
import { apiError, buildApiMeta, jsonResponse, optionsResponse } from '@utils/api';

export const prerender = false;

const CACHE_TTL_SECONDS = 900;

function parseDateInput(value: string | null) {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export const OPTIONS: APIRoute = ({ request }) => optionsResponse(request.headers.get('Origin'));

export const GET: APIRoute = ({ url, request }) => {
  const requestOrigin = request.headers.get('Origin');
  const citySlug = url.searchParams.get('city')?.trim().toLowerCase() ?? '';
  const requestedDate = url.searchParams.get('date')?.trim() ?? '';
  const date = parseDateInput(requestedDate || null);

  if (!citySlug) {
    return apiError(400, 'missing_city', 'Missing required "city" query parameter.', {
      details: {
        parameter: 'city',
      },
      requestOrigin,
    });
  }

  if (!date) {
    return apiError(400, 'invalid_date', 'Invalid "date" query parameter. Use YYYY-MM-DD.', {
      details: {
        parameter: 'date',
        received: requestedDate,
      },
      requestOrigin,
    });
  }

  const city = getCityBySlug(citySlug);

  if (!city) {
    return apiError(404, 'unknown_city', `Unknown city slug: ${citySlug}`, {
      details: {
        city: citySlug,
      },
      requestOrigin,
    });
  }

  const sun = getSunTimes(date, city.lat, city.lng);
  const golden = getGoldenHour(date, city.lat, city.lng);
  const moon = getMoonData(date, city.lat, city.lng);
  const prayers = getPrayerTimes(date, city.lat, city.lng, 'MWL', 'Standard');
  const localDate = date.toLocaleDateString('en-CA', {
    timeZone: city.timezone,
  });

  const body = {
    meta: buildApiMeta('/api/v1/times', {
      city: citySlug,
      date: requestedDate || localDate,
    }, CACHE_TTL_SECONDS, {
      self: url.toString(),
      timezone: city.timezone,
    }),
    city: {
      slug: city.slug,
      name: city.name,
      country: city.country,
      countryName: city.countryName,
      admin1: city.admin1 ?? '',
      latitude: city.lat,
      longitude: city.lng,
      timezone: city.timezone,
    },
    links: {
      cityLookup: `${url.origin}/api/v1/cities?query=${encodeURIComponent(city.name)}`,
      sunrisePage: `${url.origin}/sunrise/${city.slug}/`,
      prayerPage: `${url.origin}/prayer-times/${city.slug}/`,
    },
    date: localDate,
    methods: {
      solar: 'SunCalc / NOAA-aligned',
      prayer: 'Muslim World League (MWL), Standard Asr',
    },
    sun: {
      sunrise: formatTime(sun.sunrise, city.timezone),
      sunriseIso: sun.sunrise.toISOString(),
      sunset: formatTime(sun.sunset, city.timezone),
      sunsetIso: sun.sunset.toISOString(),
      dawn: formatTime(sun.dawn, city.timezone),
      dawnIso: sun.dawn.toISOString(),
      dusk: formatTime(sun.dusk, city.timezone),
      duskIso: sun.dusk.toISOString(),
      solarNoon: formatTime(sun.solarNoon, city.timezone),
      solarNoonIso: sun.solarNoon.toISOString(),
      daylightMinutes: sun.daylightDuration,
      daylightFormatted: sun.daylightFormatted,
    },
    goldenHour: {
      morningStart: formatTime(golden.morning.start, city.timezone),
      morningStartIso: golden.morning.start.toISOString(),
      morningEnd: formatTime(golden.morning.end, city.timezone),
      morningEndIso: golden.morning.end.toISOString(),
      eveningStart: formatTime(golden.evening.start, city.timezone),
      eveningStartIso: golden.evening.start.toISOString(),
      eveningEnd: formatTime(golden.evening.end, city.timezone),
      eveningEndIso: golden.evening.end.toISOString(),
    },
    moon: {
      phase: moon.phaseName,
      illumination: moon.illumination,
      rise: moon.rise ? formatTime(moon.rise, city.timezone) : null,
      set: moon.set ? formatTime(moon.set, city.timezone) : null,
    },
    prayerTimes: {
      fajr: formatTime(prayers.fajr, city.timezone),
      fajrIso: prayers.fajr.toISOString(),
      sunrise: formatTime(prayers.sunrise, city.timezone),
      sunriseIso: prayers.sunrise.toISOString(),
      dhuhr: formatTime(prayers.dhuhr, city.timezone),
      dhuhrIso: prayers.dhuhr.toISOString(),
      asr: formatTime(prayers.asr, city.timezone),
      asrIso: prayers.asr.toISOString(),
      maghrib: formatTime(prayers.maghrib, city.timezone),
      maghribIso: prayers.maghrib.toISOString(),
      isha: formatTime(prayers.isha, city.timezone),
      ishaIso: prayers.isha.toISOString(),
    },
  };

  return jsonResponse(body, {
    cacheControl: `public, max-age=${CACHE_TTL_SECONDS}, s-maxage=${CACHE_TTL_SECONDS}`,
    requestOrigin,
  });
};
