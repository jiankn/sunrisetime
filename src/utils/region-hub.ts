import type { City } from '@data/site';
import { formatTime, getSunTimes } from '@utils/sun';

export type RegionSunRow = {
  name: string;
  location: string;
  path: string;
  sunrise: string;
  sunset: string;
  daylight: string;
};

type RegionSunRowsOptions = {
  locale: string;
  pathPrefix?: string;
  getCityName: (city: City) => string;
  getCityLocationLabel: (city: City) => string;
  date?: Date;
};

export function buildRegionSunRows(cities: City[], options: RegionSunRowsOptions) {
  const {
    locale,
    pathPrefix = '',
    getCityName,
    getCityLocationLabel,
    date = new Date(),
  } = options;

  return cities.slice(0, 6).map((city) => {
    const sun = getSunTimes(date, city.lat, city.lng);

    return {
      name: getCityName(city),
      location: getCityLocationLabel(city),
      path: `${pathPrefix}/sunrise/${city.slug}/`,
      sunrise: formatTime(sun.sunrise, city.timezone, locale),
      sunset: formatTime(sun.sunset, city.timezone, locale),
      daylight: sun.daylightFormatted,
    };
  });
}

export function buildRegionItemListJsonLd(pageUrl: string, name: string, rows: RegionSunRow[]) {
  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#featured-cities`,
    "name": name,
    "itemListElement": rows.map((row, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": row.name,
      "url": new URL(row.path, 'https://sunrisetime.co').toString(),
    })),
  };
}
