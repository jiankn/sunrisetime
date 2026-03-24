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
export function formatTime(date: Date, timezone: string): string {
  try {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: timezone,
    });
  } catch {
    // Fallback if timezone is invalid
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
}

/**
 * Compare today's sunrise with yesterday's (delta in minutes)
 */
export function getSunriseDelta(date: Date, lat: number, lng: number): number {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayTimes = SunCalc.getTimes(date, lat, lng);
  const yesterdayTimes = SunCalc.getTimes(yesterday, lat, lng);

  return Math.round(
    (todayTimes.sunrise.getTime() - yesterdayTimes.sunrise.getTime()) / 60000
  );
}

export function getSunsetDelta(date: Date, lat: number, lng: number): number {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayTimes = SunCalc.getTimes(date, lat, lng);
  const yesterdayTimes = SunCalc.getTimes(yesterday, lat, lng);

  return Math.round(
    (todayTimes.sunset.getTime() - yesterdayTimes.sunset.getTime()) / 60000
  );
}
