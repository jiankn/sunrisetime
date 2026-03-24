/**
 * Moon Utility — 月相 + 月升月落
 *
 * 封装 suncalc 库，提供月相名称、发光百分比、月升月落时间。
 */
import SunCalc from 'suncalc';

export interface MoonData {
  phase: number;           // 0-1 (0=新月, 0.5=满月)
  phaseName: string;       // "New Moon", "Waxing Crescent", etc.
  illumination: number;    // 0-100%
  emoji: string;           // 🌑🌒🌓🌔🌕🌖🌗🌘
  rise: Date | null;
  set: Date | null;
}

const PHASE_NAMES: { max: number; name: string; emoji: string }[] = [
  { max: 0.0625, name: 'New Moon',        emoji: '🌑' },
  { max: 0.1875, name: 'Waxing Crescent', emoji: '🌒' },
  { max: 0.3125, name: 'First Quarter',   emoji: '🌓' },
  { max: 0.4375, name: 'Waxing Gibbous',  emoji: '🌔' },
  { max: 0.5625, name: 'Full Moon',        emoji: '🌕' },
  { max: 0.6875, name: 'Waning Gibbous',  emoji: '🌖' },
  { max: 0.8125, name: 'Last Quarter',     emoji: '🌗' },
  { max: 0.9375, name: 'Waning Crescent',  emoji: '🌘' },
  { max: 1.0,    name: 'New Moon',         emoji: '🌑' },
];

function getPhaseInfo(phase: number): { name: string; emoji: string } {
  for (const p of PHASE_NAMES) {
    if (phase <= p.max) {
      return { name: p.name, emoji: p.emoji };
    }
  }
  return { name: 'New Moon', emoji: '🌑' };
}

/**
 * Get moon data for a location and date
 */
export function getMoonData(date: Date, lat: number, lng: number): MoonData {
  const illumination = SunCalc.getMoonIllumination(date);
  const moonTimes = SunCalc.getMoonTimes(date, lat, lng);
  const { name, emoji } = getPhaseInfo(illumination.phase);

  return {
    phase: illumination.phase,
    phaseName: name,
    illumination: Math.round(illumination.fraction * 100),
    emoji,
    rise: moonTimes.rise ?? null,
    set: moonTimes.set ?? null,
  };
}

/**
 * Get next significant moon event (next full/new moon)
 */
export function getNextMoonEvent(date: Date): { type: 'Full Moon' | 'New Moon'; date: Date } {
  const current = SunCalc.getMoonIllumination(date);
  const isWaxing = current.phase < 0.5;

  // Search forward day by day
  for (let i = 1; i <= 30; i++) {
    const d = new Date(date);
    d.setDate(d.getDate() + i);
    const illum = SunCalc.getMoonIllumination(d);

    if (isWaxing && illum.phase >= 0.5) {
      return { type: 'Full Moon', date: d };
    }
    if (!isWaxing && (illum.phase < current.phase && illum.phase < 0.05)) {
      return { type: 'New Moon', date: d };
    }
  }

  // Fallback
  const fallback = new Date(date);
  fallback.setDate(fallback.getDate() + 15);
  return { type: isWaxing ? 'Full Moon' : 'New Moon', date: fallback };
}
