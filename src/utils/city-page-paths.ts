import { getCityBySlug } from '@data/site';

export function getCanonicalCityPagePath(
  citySlug: string | undefined,
  section: 'golden-hour' | 'prayer-times' | 'sunrise',
) {
  const city = getCityBySlug(citySlug ?? '');

  if (!city) {
    return null;
  }

  return `/${section}/${city.slug}/`;
}
