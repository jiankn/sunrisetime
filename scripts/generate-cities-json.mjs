import fs from 'node:fs/promises';
import path from 'node:path';

const rootDir = process.cwd();
const geoDir = path.join(rootDir, '.cache', 'geonames');
const citiesPath = path.join(rootDir, 'src', 'data', 'cities.json');

const TARGET_CITY_COUNT = 500;

function slugify(value) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function normalizeCountryCode(code) {
  return code === 'UK' ? 'GB' : code;
}

function roundCoordinate(value) {
  return Math.round(value * 10000) / 10000;
}

function normalizeAdmin1Label(value) {
  const label = value?.trim() ?? '';
  if (!label || /^0+$/.test(label)) {
    return '';
  }

  return label;
}

function parseCountryInfo(text) {
  const countries = new Map();

  for (const line of text.split('\n')) {
    if (!line || line.startsWith('#')) continue;
    const columns = line.split('\t');
    const countryCode = columns[0];
    const countryName = columns[4];
    const continent = columns[8];

    countries.set(countryCode, {
      countryCode,
      countryName,
      continent,
    });
  }

  return countries;
}

function parseAdmin1(text) {
  const admin1Map = new Map();

  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    const [key, name] = line.split('\t');
    admin1Map.set(key, name);
  }

  return admin1Map;
}

function buildAliases(alternateNames, fallbackAsciiName, primaryName) {
  const aliases = [];
  const seen = new Set([primaryName.toLowerCase(), fallbackAsciiName.toLowerCase()]);

  const candidates = [
    fallbackAsciiName,
    ...alternateNames.split(','),
  ];

  for (const candidate of candidates) {
    const alias = candidate.trim();
    if (!alias) continue;
    if (alias.length < 2 || alias.length > 60) continue;
    if (!/^[\p{L}\p{M}\s.'-]+$/u.test(alias)) continue;

    const key = alias.toLowerCase();
    if (seen.has(key)) continue;
    if (slugify(alias) === slugify(primaryName)) continue;

    seen.add(key);
    aliases.push(alias);

    if (aliases.length >= 6) {
      break;
    }
  }

  return aliases;
}

function parseGeoNames(text, countries, admin1Map) {
  const rows = [];

  for (const line of text.split('\n')) {
    if (!line.trim()) continue;
    const columns = line.split('\t');
    const name = columns[1];
    const asciiName = columns[2] || name;
    const alternateNames = columns[3] || '';
    const lat = Number(columns[4]);
    const lng = Number(columns[5]);
    const featureClass = columns[6];
    const featureCode = columns[7];
    const countryCode = normalizeCountryCode(columns[8]);
    const admin1Code = columns[10] || '';
    const population = Number(columns[14]) || 0;
    const timezone = columns[17];

    if (featureClass !== 'P') continue;
    if (!featureCode.startsWith('PPL')) continue;
    if (!timezone || !population) continue;

    const country = countries.get(countryCode);
    const admin1 = normalizeAdmin1Label(
      admin1Code ? admin1Map.get(`${countryCode}.${admin1Code}`) ?? admin1Code : '',
    );

    rows.push({
      name,
      asciiName,
      lat,
      lng,
      featureCode,
      countryCode,
      countryName: country?.countryName ?? countryCode,
      continent: country?.continent ?? '',
      admin1,
      admin1Code,
      timezone,
      population,
      aliases: buildAliases(alternateNames, asciiName, name),
    });
  }

  rows.sort((left, right) => right.population - left.population);
  return rows;
}

function sameLocation(seedCity, row) {
  return normalizeCountryCode(seedCity.country) === row.countryCode
    && Math.abs(seedCity.lat - row.lat) < 0.35
    && Math.abs(seedCity.lng - row.lng) < 0.35;
}

function findSeedMatch(seedCity, rows) {
  const matches = rows.filter((row) => sameLocation(seedCity, row));
  if (!matches.length) return null;

  matches.sort((left, right) => {
    const leftDistance = Math.abs(seedCity.lat - left.lat) + Math.abs(seedCity.lng - left.lng);
    const rightDistance = Math.abs(seedCity.lat - right.lat) + Math.abs(seedCity.lng - right.lng);
    return leftDistance - rightDistance;
  });

  return matches[0];
}

function makeUniqueSlug(baseSlug, row, usedSlugs) {
  const adminSlug = slugify(row.admin1 || row.admin1Code || '');
  const countrySlug = row.countryCode.toLowerCase();
  const candidates = [
    baseSlug,
    adminSlug ? `${baseSlug}-${adminSlug}` : '',
    `${baseSlug}-${countrySlug}`,
    adminSlug ? `${baseSlug}-${adminSlug}-${countrySlug}` : '',
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (!usedSlugs.has(candidate)) {
      usedSlugs.add(candidate);
      return candidate;
    }
  }

  let suffix = 2;
  while (usedSlugs.has(`${baseSlug}-${countrySlug}-${suffix}`)) {
    suffix += 1;
  }

  const slug = `${baseSlug}-${countrySlug}-${suffix}`;
  usedSlugs.add(slug);
  return slug;
}

function enrichSeedCity(seedCity, matchedRow, countries) {
  const countryCode = normalizeCountryCode(seedCity.country);
  const country = countries.get(countryCode);
  const aliases = new Set(seedCity.aliases ?? []);

  for (const alias of matchedRow?.aliases ?? []) {
    aliases.add(alias);
  }

  return {
    ...seedCity,
    country: countryCode,
    countryName: country?.countryName ?? seedCity.countryName ?? countryCode,
    continent: country?.continent ?? seedCity.continent,
    admin1: normalizeAdmin1Label(matchedRow?.admin1 ?? seedCity.admin1 ?? ''),
    lat: roundCoordinate(seedCity.lat),
    lng: roundCoordinate(seedCity.lng),
    aliases: [...aliases].slice(0, 6),
  };
}

function rowToCity(row, usedSlugs) {
  return {
    name: row.name,
    slug: makeUniqueSlug(slugify(row.asciiName || row.name), row, usedSlugs),
    country: row.countryCode,
    countryName: row.countryName,
    continent: row.continent,
    admin1: row.admin1,
    lat: roundCoordinate(row.lat),
    lng: roundCoordinate(row.lng),
    timezone: row.timezone,
    population: row.population,
    aliases: row.aliases,
  };
}

async function main() {
  const [seedRaw, citiesRaw, countryRaw, admin1Raw] = await Promise.all([
    fs.readFile(citiesPath, 'utf8'),
    fs.readFile(path.join(geoDir, 'cities5000.txt'), 'utf8'),
    fs.readFile(path.join(geoDir, 'countryInfo.txt'), 'utf8'),
    fs.readFile(path.join(geoDir, 'admin1CodesASCII.txt'), 'utf8'),
  ]);

  const seed = JSON.parse(seedRaw).cities;
  const countries = parseCountryInfo(countryRaw);
  const admin1Map = parseAdmin1(admin1Raw);
  const rows = parseGeoNames(citiesRaw, countries, admin1Map);

  const usedSlugs = new Set(seed.map((city) => city.slug));
  const output = seed.map((city) => enrichSeedCity(city, findSeedMatch(city, rows), countries));

  for (const row of rows) {
    if (output.length >= TARGET_CITY_COUNT) {
      break;
    }

    const alreadyIncluded = output.some((city) => sameLocation(city, row));
    if (alreadyIncluded) continue;

    output.push(rowToCity(row, usedSlugs));
  }

  output.sort((left, right) => right.population - left.population);

  await fs.writeFile(
    citiesPath,
    `${JSON.stringify({ cities: output }, null, 2)}\n`,
    'utf8',
  );

  console.log(`Generated ${output.length} cities at ${citiesPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
