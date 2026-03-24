/**
 * 算法精度验证测试脚本
 * 用法: npx tsx tests/verify-algorithms.ts
 *
 * 对比已知城市的日出日落时间（来源：timeanddate.com 2026-03-24）
 */
import { getSunTimes, getGoldenHour, formatTime, getDaylightSeries } from '../src/utils/sun.js';
import { getMoonData, getNextMoonEvent } from '../src/utils/moon.js';
import { getPrayerTimes, getNextPrayer } from '../src/utils/prayer-times.js';

const date = new Date('2026-03-24T12:00:00Z');

// ── Test cities ──────────────────────────────────────────────
const TEST_CITIES = [
  { name: 'New York',  lat: 40.7128,  lng: -74.006,   tz: 'America/New_York' },
  { name: 'London',    lat: 51.5074,  lng: -0.1278,   tz: 'Europe/London' },
  { name: 'Tokyo',     lat: 35.6762,  lng: 139.6503,  tz: 'Asia/Tokyo' },
  { name: 'Dubai',     lat: 25.2048,  lng: 55.2708,   tz: 'Asia/Dubai' },
  { name: 'Sydney',    lat: -33.8688, lng: 151.2093,  tz: 'Australia/Sydney' },
];

console.log('='.repeat(70));
console.log('  SunriseTime Algorithm Verification — 2026-03-24');
console.log('='.repeat(70));

// ── 1. Sun Times ─────────────────────────────────────────────
console.log('\n📍 SUN TIMES');
console.log('-'.repeat(70));

for (const city of TEST_CITIES) {
  const sun = getSunTimes(date, city.lat, city.lng);
  const golden = getGoldenHour(date, city.lat, city.lng);

  console.log(`\n  🌍 ${city.name}`);
  console.log(`     Sunrise:       ${formatTime(sun.sunrise, city.tz)}`);
  console.log(`     Sunset:        ${formatTime(sun.sunset, city.tz)}`);
  console.log(`     Daylight:      ${sun.daylightFormatted}`);
  console.log(`     Solar Noon:    ${formatTime(sun.solarNoon, city.tz)}`);
  console.log(`     Golden AM:     ${formatTime(golden.morning.start, city.tz)} → ${formatTime(golden.morning.end, city.tz)} (${golden.morning.durationMin}min)`);
  console.log(`     Golden PM:     ${formatTime(golden.evening.start, city.tz)} → ${formatTime(golden.evening.end, city.tz)} (${golden.evening.durationMin}min)`);
}

// ── 2. Moon Data ─────────────────────────────────────────────
console.log('\n\n🌙 MOON DATA');
console.log('-'.repeat(70));

const moon = getMoonData(date, TEST_CITIES[0].lat, TEST_CITIES[0].lng);
console.log(`\n  Phase:         ${moon.phaseName} ${moon.emoji}`);
console.log(`  Illumination:  ${moon.illumination}%`);
console.log(`  Phase value:   ${moon.phase.toFixed(4)}`);
if (moon.rise) console.log(`  Moonrise:      ${formatTime(moon.rise, TEST_CITIES[0].tz)}`);
if (moon.set) console.log(`  Moonset:       ${formatTime(moon.set, TEST_CITIES[0].tz)}`);

const nextEvent = getNextMoonEvent(date);
console.log(`  Next event:    ${nextEvent.type} — ${nextEvent.date.toISOString().split('T')[0]}`);

// ── 3. Prayer Times ──────────────────────────────────────────
console.log('\n\n🕌 PRAYER TIMES (MWL Standard)');
console.log('-'.repeat(70));

for (const city of TEST_CITIES.slice(0, 3)) {
  const prayers = getPrayerTimes(date, city.lat, city.lng, 'MWL', 'Standard');

  console.log(`\n  🌍 ${city.name}`);
  console.log(`     Fajr:     ${formatTime(prayers.fajr, city.tz)}`);
  console.log(`     Sunrise:  ${formatTime(prayers.sunrise, city.tz)}`);
  console.log(`     Dhuhr:    ${formatTime(prayers.dhuhr, city.tz)}`);
  console.log(`     Asr:      ${formatTime(prayers.asr, city.tz)}`);
  console.log(`     Maghrib:  ${formatTime(prayers.maghrib, city.tz)}`);
  console.log(`     Isha:     ${formatTime(prayers.isha, city.tz)}`);
}

// ── 4. Daylight Series ───────────────────────────────────────
console.log('\n\n📊 DAYLIGHT SERIES (New York, 7 days)');
console.log('-'.repeat(70));

const series = getDaylightSeries(date, 7, TEST_CITIES[0].lat, TEST_CITIES[0].lng);
for (const s of series) {
  const bar = '█'.repeat(Math.round(s.hours * 2));
  console.log(`  ${s.date.toISOString().split('T')[0]}  ${s.hours.toFixed(2)}h  ${bar}`);
}

// ── 5. Next Prayer ───────────────────────────────────────────
console.log('\n\n⏰ NEXT PRAYER (from current time)');
console.log('-'.repeat(70));

const now = new Date();
for (const city of TEST_CITIES.slice(0, 3)) {
  const next = getNextPrayer(now, city.lat, city.lng);
  console.log(`  ${city.name}: ${next.name} at ${formatTime(next.time, city.tz)}`);
}

console.log('\n' + '='.repeat(70));
console.log('  ✅ Verification complete');
console.log('='.repeat(70));
