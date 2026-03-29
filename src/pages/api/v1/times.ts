import type { APIRoute } from 'astro';
import { getCityBySlug } from '@data/site';
import { getGoldenHour, getSunTimes, formatTime } from '@utils/sun';
import { getMoonData } from '@utils/moon';
import { getPrayerTimes } from '@utils/prayer-times';

function parseDateInput(value: string | null) {
  if (!value) {
    return new Date();
  }

  const parsed = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export const GET: APIRoute = ({ url }) => {
  const citySlug = url.searchParams.get('city')?.trim().toLowerCase() ?? '';
  const date = parseDateInput(url.searchParams.get('date'));

  if (!citySlug) {
    return new Response(JSON.stringify({ error: 'Missing required "city" query parameter.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  if (!date) {
    return new Response(JSON.stringify({ error: 'Invalid "date" query parameter. Use YYYY-MM-DD.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
  }

  const city = getCityBySlug(citySlug);

  if (!city) {
    return new Response(JSON.stringify({ error: `Unknown city slug: ${citySlug}` }), {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
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
    date: localDate,
    methods: {
      solar: 'SunCalc / NOAA-aligned',
      prayer: 'Muslim World League (MWL), Standard Asr',
    },
    sun: {
      sunrise: formatTime(sun.sunrise, city.timezone),
      sunset: formatTime(sun.sunset, city.timezone),
      dawn: formatTime(sun.dawn, city.timezone),
      dusk: formatTime(sun.dusk, city.timezone),
      solarNoon: formatTime(sun.solarNoon, city.timezone),
      daylightMinutes: sun.daylightDuration,
      daylightFormatted: sun.daylightFormatted,
    },
    goldenHour: {
      morningStart: formatTime(golden.morning.start, city.timezone),
      morningEnd: formatTime(golden.morning.end, city.timezone),
      eveningStart: formatTime(golden.evening.start, city.timezone),
      eveningEnd: formatTime(golden.evening.end, city.timezone),
    },
    moon: {
      phase: moon.phaseName,
      illumination: moon.illumination,
      rise: moon.rise ? formatTime(moon.rise, city.timezone) : null,
      set: moon.set ? formatTime(moon.set, city.timezone) : null,
    },
    prayerTimes: {
      fajr: formatTime(prayers.fajr, city.timezone),
      sunrise: formatTime(prayers.sunrise, city.timezone),
      dhuhr: formatTime(prayers.dhuhr, city.timezone),
      asr: formatTime(prayers.asr, city.timezone),
      maghrib: formatTime(prayers.maghrib, city.timezone),
      isha: formatTime(prayers.isha, city.timezone),
    },
  };

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900',
    },
  });
};
