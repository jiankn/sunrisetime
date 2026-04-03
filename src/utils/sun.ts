/**
 * SunCalc Utility — 日出日落 + 黄金时段 + 暮光
 *
 * 封装 suncalc 库，提供格式化后的日出日落数据。
 * 使用 NOAA Solar Calculator 算法，精度 ±1 分钟。
 */
import SunCalc from 'suncalc';

export interface SunTimes {
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  nadir: Date;
  // Twilight
  dawn: Date;          // Civil dawn (-6°)
  dusk: Date;          // Civil dusk (-6°)
  nauticalDawn: Date;  // -12°
  nauticalDusk: Date;  // -12°
  nightEnd: Date;      // Astronomical dawn (-18°)
  night: Date;         // Astronomical dusk (-18°)
  // Golden hour
  goldenHourStart: Date;  // Evening golden hour start
  goldenHourEnd: Date;    // Morning golden hour end
  // Computed
  daylightDuration: number;  // Minutes
  daylightFormatted: string; // "12h 36m"
}

export interface GoldenHour {
  morning: { start: Date; end: Date; durationMin: number };
  evening: { start: Date; end: Date; durationMin: number };
}

export interface AnnualSunExtremes {
  year: number;
  earliestSunrise: { date: Date; time: Date };
  latestSunrise: { date: Date; time: Date };
  earliestSunset: { date: Date; time: Date };
  latestSunset: { date: Date; time: Date };
  longestDay: { date: Date; daylightDuration: number; daylightFormatted: string };
  shortestDay: { date: Date; daylightDuration: number; daylightFormatted: string };
}

export interface SeasonalSunCheckpoint {
  label: string;
  date: Date;
  sunrise: Date;
  sunset: Date;
  daylightDuration: number;
  daylightFormatted: string;
}

/**
 * Get comprehensive sun times for a location and date
 */
export function getSunTimes(date: Date, lat: number, lng: number): SunTimes {
  const times = SunCalc.getTimes(date, lat, lng);

  const daylightMs = times.sunset.getTime() - times.sunrise.getTime();
  const daylightMin = Math.round(daylightMs / 60000);
  const hours = Math.floor(daylightMin / 60);
  const mins = daylightMin % 60;

  return {
    sunrise: times.sunrise,
    sunset: times.sunset,
    solarNoon: times.solarNoon,
    nadir: times.nadir,
    dawn: times.dawn,
    dusk: times.dusk,
    nauticalDawn: times.nauticalDawn,
    nauticalDusk: times.nauticalDusk,
    nightEnd: times.nightEnd,
    night: times.night,
    goldenHourStart: times.goldenHour,
    goldenHourEnd: times.goldenHourEnd,
    daylightDuration: daylightMin,
    daylightFormatted: `${hours}h ${mins.toString().padStart(2, '0')}m`,
  };
}

/**
 * Get golden hour windows (morning + evening)
 */
export function getGoldenHour(date: Date, lat: number, lng: number): GoldenHour {
  const times = SunCalc.getTimes(date, lat, lng);

  const morningStart = times.sunrise;
  const morningEnd = times.goldenHourEnd;
  const eveningStart = times.goldenHour;
  const eveningEnd = times.sunset;

  return {
    morning: {
      start: morningStart,
      end: morningEnd,
      durationMin: Math.round((morningEnd.getTime() - morningStart.getTime()) / 60000),
    },
    evening: {
      start: eveningStart,
      end: eveningEnd,
      durationMin: Math.round((eveningEnd.getTime() - eveningStart.getTime()) / 60000),
    },
  };
}

/**
 * Get daylight duration for a range of dates (for charts)
 */
export function getDaylightSeries(
  startDate: Date,
  days: number,
  lat: number,
  lng: number
): { date: Date; hours: number }[] {
  const series: { date: Date; hours: number }[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const times = SunCalc.getTimes(d, lat, lng);
    const ms = times.sunset.getTime() - times.sunrise.getTime();
    series.push({
      date: d,
      hours: Math.round((ms / 3600000) * 100) / 100, // 2 decimal places
    });
  }
  return series;
}

/**
 * Format a Date to local time string like "6:42 AM"
 */
export function formatTime(
  date: Date,
  timezone: string,
  locale = 'en-US',
  hour12?: boolean,
): string {
  try {
    return date.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: timezone,
      ...(hour12 === undefined ? {} : { hour12 }),
    });
  } catch {
    // Fallback if timezone is invalid
    return date.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: '2-digit',
      ...(hour12 === undefined ? {} : { hour12 }),
    });
  }
}

export function getLocalYear(date: Date, timezone?: string): number {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      ...(timezone ? { timeZone: timezone } : {}),
    }).formatToParts(date);
    const year = Number(parts.find((part) => part.type === 'year')?.value);

    if (Number.isFinite(year)) {
      return year;
    }
  } catch {
    // Fall through to the runtime-local year below.
  }

  return date.getFullYear();
}

function getClockMinutes(date: Date, timezone?: string): number {
  if (!timezone) {
    return date.getHours() * 60 + date.getMinutes();
  }

  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
      timeZone: timezone,
    }).formatToParts(date);

    const hours = Number(parts.find(part => part.type === 'hour')?.value ?? date.getHours());
    const minutes = Number(parts.find(part => part.type === 'minute')?.value ?? date.getMinutes());

    return hours * 60 + minutes;
  } catch {
    return date.getHours() * 60 + date.getMinutes();
  }
}

function normalizeClockDelta(diffMinutes: number): number {
  if (diffMinutes > 720) return diffMinutes - 1440;
  if (diffMinutes < -720) return diffMinutes + 1440;
  return diffMinutes;
}

function shiftDate(date: Date, daysOffset: number) {
  const shifted = new Date(date);
  shifted.setDate(shifted.getDate() + daysOffset);
  return shifted;
}

function createUtcDate(year: number, monthIndex: number, day: number) {
  return new Date(Date.UTC(year, monthIndex, day, 12, 0, 0));
}

export function getClockTimeDelta(baseDate: Date, compareDate: Date, timezone?: string): number {
  return normalizeClockDelta(
    getClockMinutes(compareDate, timezone) - getClockMinutes(baseDate, timezone),
  );
}

export function getDaylightChangeDays(date: Date, daysOffset: number, lat: number, lng: number): number {
  const compareDate = shiftDate(date, daysOffset);
  const currentTimes = getSunTimes(date, lat, lng);
  const compareTimes = getSunTimes(compareDate, lat, lng);

  return compareTimes.daylightDuration - currentTimes.daylightDuration;
}

export function getSunEventShiftDays(
  date: Date,
  daysOffset: number,
  lat: number,
  lng: number,
  timezone: string | undefined,
  event: 'sunrise' | 'sunset',
): number {
  const compareDate = shiftDate(date, daysOffset);
  const currentTimes = SunCalc.getTimes(date, lat, lng);
  const compareTimes = SunCalc.getTimes(compareDate, lat, lng);

  return getClockTimeDelta(currentTimes[event], compareTimes[event], timezone);
}

/**
 * Compare today's sunrise with yesterday's (delta in minutes)
 */
export function getSunriseDelta(date: Date, lat: number, lng: number, timezone?: string): number {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayTimes = SunCalc.getTimes(date, lat, lng);
  const yesterdayTimes = SunCalc.getTimes(yesterday, lat, lng);

  return normalizeClockDelta(
    getClockMinutes(todayTimes.sunrise, timezone) - getClockMinutes(yesterdayTimes.sunrise, timezone)
  );
}

export function getSunsetDelta(date: Date, lat: number, lng: number, timezone?: string): number {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayTimes = SunCalc.getTimes(date, lat, lng);
  const yesterdayTimes = SunCalc.getTimes(yesterday, lat, lng);

  return normalizeClockDelta(
    getClockMinutes(todayTimes.sunset, timezone) - getClockMinutes(yesterdayTimes.sunset, timezone)
  );
}

export function getAnnualSunExtremes(
  year: number,
  lat: number,
  lng: number,
  timezone?: string,
): AnnualSunExtremes {
  const start = createUtcDate(year, 0, 1);
  const end = createUtcDate(year + 1, 0, 1);

  let cursor = new Date(start);
  let earliestSunrise: { date: Date; time: Date; minutes: number } | null = null;
  let latestSunrise: { date: Date; time: Date; minutes: number } | null = null;
  let earliestSunset: { date: Date; time: Date; minutes: number } | null = null;
  let latestSunset: { date: Date; time: Date; minutes: number } | null = null;
  let longestDay: { date: Date; daylightDuration: number; daylightFormatted: string } | null = null;
  let shortestDay: { date: Date; daylightDuration: number; daylightFormatted: string } | null = null;

  while (cursor < end) {
    const currentDate = new Date(cursor);
    const sun = getSunTimes(currentDate, lat, lng);
    const sunriseMinutes = getClockMinutes(sun.sunrise, timezone);
    const sunsetMinutes = getClockMinutes(sun.sunset, timezone);

    if (!earliestSunrise || sunriseMinutes < earliestSunrise.minutes) {
      earliestSunrise = { date: currentDate, time: sun.sunrise, minutes: sunriseMinutes };
    }

    if (!latestSunrise || sunriseMinutes > latestSunrise.minutes) {
      latestSunrise = { date: currentDate, time: sun.sunrise, minutes: sunriseMinutes };
    }

    if (!earliestSunset || sunsetMinutes < earliestSunset.minutes) {
      earliestSunset = { date: currentDate, time: sun.sunset, minutes: sunsetMinutes };
    }

    if (!latestSunset || sunsetMinutes > latestSunset.minutes) {
      latestSunset = { date: currentDate, time: sun.sunset, minutes: sunsetMinutes };
    }

    if (!longestDay || sun.daylightDuration > longestDay.daylightDuration) {
      longestDay = {
        date: currentDate,
        daylightDuration: sun.daylightDuration,
        daylightFormatted: sun.daylightFormatted,
      };
    }

    if (!shortestDay || sun.daylightDuration < shortestDay.daylightDuration) {
      shortestDay = {
        date: currentDate,
        daylightDuration: sun.daylightDuration,
        daylightFormatted: sun.daylightFormatted,
      };
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  if (!earliestSunrise || !latestSunrise || !earliestSunset || !latestSunset || !longestDay || !shortestDay) {
    throw new Error(`Unable to compute annual sun extremes for year ${year}.`);
  }

  return {
    year,
    earliestSunrise: { date: earliestSunrise.date, time: earliestSunrise.time },
    latestSunrise: { date: latestSunrise.date, time: latestSunrise.time },
    earliestSunset: { date: earliestSunset.date, time: earliestSunset.time },
    latestSunset: { date: latestSunset.date, time: latestSunset.time },
    longestDay,
    shortestDay,
  };
}

export function getSeasonalSunCheckpoints(year: number, lat: number, lng: number): SeasonalSunCheckpoint[] {
  const checkpoints = [
    { label: 'March Equinox', date: createUtcDate(year, 2, 20) },
    { label: 'June Solstice', date: createUtcDate(year, 5, 21) },
    { label: 'September Equinox', date: createUtcDate(year, 8, 22) },
    { label: 'December Solstice', date: createUtcDate(year, 11, 21) },
  ];

  return checkpoints.map((checkpoint) => {
    const sun = getSunTimes(checkpoint.date, lat, lng);

    return {
      label: checkpoint.label,
      date: checkpoint.date,
      sunrise: sun.sunrise,
      sunset: sun.sunset,
      daylightDuration: sun.daylightDuration,
      daylightFormatted: sun.daylightFormatted,
    };
  });
}
