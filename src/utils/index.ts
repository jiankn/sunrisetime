/**
 * Utils Index — 统一导出所有计算工具
 */
export {
  getSunTimes,
  getGoldenHour,
  getDaylightSeries,
  formatTime,
  getSunriseDelta,
  getSunsetDelta,
} from './sun';

export type { SunTimes, GoldenHour } from './sun';

export {
  getMoonData,
  getNextMoonEvent,
} from './moon';

export type { MoonData } from './moon';

export {
  getPrayerTimes,
  getNextPrayer,
} from './prayer-times';

export type { PrayerTimes, CalculationMethod, AsrJuristic } from './prayer-times';
