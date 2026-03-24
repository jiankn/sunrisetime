/**
 * Prayer Times Calculator — 伊斯兰祈祷时间
 *
 * 基于太阳位置角度计算 5 次日常祈祷时间。
 * 支持多个教法学派计算标准。
 */
import SunCalc from 'suncalc';

export type CalculationMethod = 'MWL' | 'ISNA' | 'Egypt' | 'Makkah' | 'Karachi';
export type AsrJuristic = 'Standard' | 'Hanafi';

export interface PrayerTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

/**
 * Fajr/Isha angle configurations by calculation method
 */
const METHOD_PARAMS: Record<CalculationMethod, { fajrAngle: number; ishaAngle: number }> = {
  MWL:     { fajrAngle: 18,   ishaAngle: 17 },    // Muslim World League
  ISNA:    { fajrAngle: 15,   ishaAngle: 15 },    // Islamic Society of North America
  Egypt:   { fajrAngle: 19.5, ishaAngle: 17.5 },  // Egyptian General Authority
  Makkah:  { fajrAngle: 18.5, ishaAngle: 0 },     // Umm al-Qura (Isha = 90 min after Maghrib)
  Karachi: { fajrAngle: 18,   ishaAngle: 18 },    // University of Islamic Sciences
};

/**
 * Calculate the time when sun reaches a specific angle below horizon
 * @param date - target date
 * @param lat - latitude
 * @param lng - longitude
 * @param angle - degrees below horizon (positive = below)
 * @param rising - true for dawn calculation, false for dusk
 */
function getTimeForAngle(date: Date, lat: number, lng: number, angle: number, rising: boolean): Date {
  const times = SunCalc.getTimes(date, lat, lng);

  // Binary search to find when altitude = -angle
  const target = -angle * Math.PI / 180;
  let lo: number, hi: number;

  if (rising) {
    // Fajr: search from 4h before sunrise to sunrise
    hi = times.sunrise.getTime();
    lo = hi - 4 * 3600000;
  } else {
    // Isha: search from sunset to 4h after sunset
    lo = times.sunset.getTime();
    hi = lo + 4 * 3600000;
  }

  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const pos = SunCalc.getPosition(new Date(mid), lat, lng);

    if (rising) {
      // Before sunrise: altitude increases toward 0
      // We want the time when altitude crosses target (going upward)
      if (pos.altitude < target) {
        lo = mid;
      } else {
        hi = mid;
      }
    } else {
      // After sunset: altitude decreases further below 0
      // We want the time when altitude crosses target (going downward)
      if (pos.altitude > target) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
  }

  return new Date((lo + hi) / 2);
}

/**
 * Calculate Asr time using shadow length ratio
 * Standard (Shafi'i): shadow = object + shadow_at_noon
 * Hanafi: shadow = 2 * object + shadow_at_noon
 */
function getAsrTime(date: Date, lat: number, lng: number, juristic: AsrJuristic): Date {
  const times = SunCalc.getTimes(date, lat, lng);
  const noon = times.solarNoon;
  const noonPos = SunCalc.getPosition(noon, lat, lng);
  const noonAlt = noonPos.altitude;

  // Shadow factor: 1 for Standard, 2 for Hanafi
  const factor = juristic === 'Hanafi' ? 2 : 1;

  // Target altitude = atan(1 / (factor + tan(PI/2 - noonAlt)))
  const noonShadowRatio = 1 / Math.tan(noonAlt);
  const targetShadowRatio = factor + noonShadowRatio;
  const targetAlt = Math.atan(1 / targetShadowRatio);

  // Binary search after noon
  let lo = noon.getTime();
  let hi = times.sunset.getTime();

  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    const pos = SunCalc.getPosition(new Date(mid), lat, lng);

    if (pos.altitude > targetAlt) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return new Date((lo + hi) / 2);
}

/**
 * Calculate all 5 prayer times + sunrise
 */
export function getPrayerTimes(
  date: Date,
  lat: number,
  lng: number,
  method: CalculationMethod = 'MWL',
  juristic: AsrJuristic = 'Standard'
): PrayerTimes {
  const params = METHOD_PARAMS[method];
  const sunTimes = SunCalc.getTimes(date, lat, lng);

  // Fajr: when sun is fajrAngle degrees below horizon (dawn)
  const fajr = getTimeForAngle(date, lat, lng, params.fajrAngle, true);

  // Dhuhr: solar noon + a small margin (1 min)
  const dhuhr = new Date(sunTimes.solarNoon.getTime() + 60000);

  // Asr: shadow-based calculation
  const asr = getAsrTime(date, lat, lng, juristic);

  // Maghrib: sunset + 1 min margin
  const maghrib = new Date(sunTimes.sunset.getTime() + 60000);

  // Isha
  let isha: Date;
  if (method === 'Makkah') {
    // Umm al-Qura: 90 minutes after Maghrib
    isha = new Date(maghrib.getTime() + 90 * 60000);
  } else {
    isha = getTimeForAngle(date, lat, lng, params.ishaAngle, false);
  }

  return {
    fajr,
    sunrise: sunTimes.sunrise,
    dhuhr,
    asr,
    maghrib,
    isha,
  };
}

/**
 * Get the next upcoming prayer
 */
export function getNextPrayer(
  now: Date,
  lat: number,
  lng: number,
  method: CalculationMethod = 'MWL',
  juristic: AsrJuristic = 'Standard'
): { name: string; time: Date } {
  const times = getPrayerTimes(now, lat, lng, method, juristic);

  const prayers: { name: string; time: Date }[] = [
    { name: 'Fajr', time: times.fajr },
    { name: 'Dhuhr', time: times.dhuhr },
    { name: 'Asr', time: times.asr },
    { name: 'Maghrib', time: times.maghrib },
    { name: 'Isha', time: times.isha },
  ];

  for (const p of prayers) {
    if (p.time > now) return p;
  }

  // All passed, return tomorrow's Fajr
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowTimes = getPrayerTimes(tomorrow, lat, lng, method, juristic);
  return { name: 'Fajr', time: tomorrowTimes.fajr };
}
