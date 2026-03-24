import rawCities from './cities.json';

export type City = (typeof rawCities.cities)[number];

export const allCities: City[] = [...rawCities.cities];
export const totalCities = allCities.length;
export const cityIndexLabel = `${totalCities} indexed cities`;
export const supportEmail = 'hello@sunrisetime.co';
export const supportEmailHref = `mailto:${supportEmail}`;
export const legalLastUpdated = 'March 24, 2026';

const cityMap = new Map(allCities.map((city) => [city.slug, city] as const));

function sortByPopulation(list: City[]) {
  return [...list].sort((a, b) => b.population - a.population);
}

export function getCityBySlug(slug: string) {
  return cityMap.get(slug);
}

export function getCitiesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => cityMap.get(slug))
    .filter((city): city is City => Boolean(city));
}

type RegionDefinition = {
  slug: string;
  name: string;
  description: string;
  intro: string;
  countryCodes: string[];
  featuredCitySlugs: string[];
  audiences: string[];
  reasons: string[];
};

const regionDefinitions: RegionDefinition[] = [
  {
    slug: 'north-america',
    name: 'North America',
    description: 'Browse sunrise, sunset, golden hour, moon phase, and prayer times across major North American cities.',
    intro: 'North America mixes early East Coast commutes, long summer evenings, mountain daylight shifts, and West Coast golden hour favorites in one browseable region.',
    countryCodes: ['US', 'CA', 'MX'],
    featuredCitySlugs: ['new-york', 'los-angeles', 'toronto', 'mexico-city', 'san-francisco', 'vancouver'],
    audiences: ['Commuters planning the first light of the day', 'Travelers moving across multiple time zones', 'Photographers chasing long summer evenings'],
    reasons: ['Coast-to-coast daylight differences are large enough to change travel and shoot plans', 'Major metro areas in the region drive a large share of recurring search demand', 'Regional browsing creates strong internal links for related city pages'],
  },
  {
    slug: 'south-america',
    name: 'South America',
    description: 'Explore sunrise and sunset times for South American cities with fast links for daylight, golden hour, moon, and prayer data.',
    intro: 'South American cities bring strong seasonal daylight swings, dense metro populations, and high travel utility for sunrise, sunset, and moon planning.',
    countryCodes: ['BR', 'AR', 'PE', 'CO'],
    featuredCitySlugs: ['sao-paulo', 'buenos-aires', 'lima', 'bogota'],
    audiences: ['Travel planners coordinating local arrival and departure windows', 'Outdoor creators tracking warm dawn and dusk light', 'Readers comparing multiple cities in one trip corridor'],
    reasons: ['Regional grouping makes cross-border comparisons faster than starting a fresh search each time', 'Large metros in the region work well as evergreen SEO landing pages', 'Related city browsing lifts pageviews without relying on broad generic content'],
  },
  {
    slug: 'europe',
    name: 'Europe',
    description: 'Compare sunrise, sunset, moon phase, daylight length, and prayer times across Europe\'s most searched cities.',
    intro: 'Europe is ideal for comparison browsing because nearby cities can still have noticeably different sunrise times, twilight windows, and seasonal daylight lengths.',
    countryCodes: ['UK', 'FR', 'DE', 'TR', 'ES', 'IT', 'NL', 'RU', 'PT', 'AT', 'PL', 'GR', 'SE', 'NO'],
    featuredCitySlugs: ['london', 'paris', 'berlin', 'istanbul', 'madrid', 'rome'],
    audiences: ['Weekend travelers choosing the best start and end times for city days', 'Photographers comparing latitude-driven light changes', 'Users who want one region page instead of many disconnected city searches'],
    reasons: ['Northern and southern Europe create obvious daylight contrast worth comparing', 'Many high-intent travel and photography searches are region-based, not single-city only', 'Europe pages can hand off visitors to many dense clusters of city detail pages'],
  },
  {
    slug: 'asia',
    name: 'Asia',
    description: 'Find sunrise, sunset, golden hour, moon phase, and prayer timing data for major cities across Asia.',
    intro: 'Asia combines dense megacities, diverse time zones, and high-frequency daily planning needs, which makes it one of the strongest regional hubs for repeated city searches.',
    countryCodes: ['JP', 'AE', 'SG', 'IN', 'TH', 'KR', 'CN', 'ID', 'SA', 'MY', 'PH', 'TW'],
    featuredCitySlugs: ['tokyo', 'dubai', 'singapore', 'mumbai', 'bangkok', 'shanghai'],
    audiences: ['Daily planners checking the next light window before leaving home', 'Travelers comparing multiple stopovers on one route', 'Users looking for sunrise and prayer timing in the same workflow'],
    reasons: ['Asia drives high recurring search volume for city-by-city timing questions', 'Megacity clusters make related-page navigation especially valuable', 'Use-case hubs like prayer times and golden hour fit naturally with Asian city search intent'],
  },
  {
    slug: 'africa',
    name: 'Africa',
    description: 'Browse sunrise, sunset, moon, and prayer timing pages for major African cities in one place.',
    intro: 'African city pages are useful when users need fast daily timing for routines, prayer schedules, photography, or travel across several large urban centers.',
    countryCodes: ['EG', 'NG', 'ZA', 'KE', 'MA'],
    featuredCitySlugs: ['cairo', 'lagos', 'cape-town', 'johannesburg', 'nairobi', 'casablanca'],
    audiences: ['People planning around prayer or commuting schedules', 'Travelers moving between north, east, and southern Africa', 'Readers comparing daylight and twilight conditions across climates'],
    reasons: ['Regional browsing improves discovery for cities that are less likely to be entered as a first search', 'The region overlaps strongly with prayer-time intent, which is valuable for monetizable depth', 'A dedicated Africa hub makes the site architecture more complete for users and crawlers'],
  },
  {
    slug: 'oceania',
    name: 'Oceania',
    description: 'Check sunrise, sunset, daylight length, and golden hour pages for key cities in Oceania.',
    intro: 'Oceania is a compact but high-value region for light planning because users often care about sunrise, sunset, and golden hour before outdoor travel or shoots.',
    countryCodes: ['AU', 'NZ'],
    featuredCitySlugs: ['sydney', 'melbourne', 'auckland'],
    audiences: ['Photographers timing dawn and dusk shoots', 'Travelers comparing east coast and New Zealand daylight', 'Users planning outdoor sessions around short seasonal changes'],
    reasons: ['City counts are smaller, so a focused hub keeps discovery clean instead of noisy', 'Golden hour and daylight-length searches are especially relevant in this region', 'Compact regional pages are strong handoff points into detailed city pages'],
  },
];

export const regionHubs = regionDefinitions.map((region) => {
  const cities = sortByPopulation(allCities.filter((city) => region.countryCodes.includes(city.country)));

  return {
    ...region,
    path: `/cities/${region.slug}/`,
    cities,
    cityCount: cities.length,
    featuredCities: getCitiesBySlugs(region.featuredCitySlugs),
  };
});

export function getRegionHub(slug: string) {
  return regionHubs.find((region) => region.slug === slug);
}

type UseCaseDefinition = {
  slug: string;
  name: string;
  description: string;
  intro: string;
  path: string;
  primaryBullets: string[];
  workflowBullets: string[];
  featuredCitySlugs: string[];
  relatedRegionSlugs: string[];
};

export const useCaseHubs: UseCaseDefinition[] = [
  {
    slug: 'golden-hour',
    name: 'Golden Hour',
    description: 'Find cities where today\'s golden hour is easiest to plan and compare warm-light windows before you head out.',
    intro: 'Golden hour searches are intent-rich: the user usually wants a fast answer, a city page, and then one or two more locations to compare. That is exactly the kind of flow that grows pageviews without adding friction.',
    path: '/guides/golden-hour/',
    primaryBullets: ['See when soft, warm directional light starts and ends', 'Compare multiple cities before a trip or shoot', 'Move from the guide into live city pages in one tap'],
    workflowBullets: ['Start with a city you already know', 'Open its detail page to confirm sunrise, sunset, and next light window', 'Use nearby cities and regional hubs to keep browsing instead of bouncing'],
    featuredCitySlugs: ['san-francisco', 'lisbon', 'cape-town', 'tokyo', 'sydney', 'mexico-city'],
    relatedRegionSlugs: ['north-america', 'europe', 'asia', 'oceania'],
  },
  {
    slug: 'moon-phase',
    name: 'Moon Phase',
    description: 'Use Moon Phase hubs to compare lunar illumination, phase names, and city pages where moon timing matters alongside sunrise and sunset.',
    intro: 'Moon-phase intent often sits next to sunrise or sunset intent. Users planning travel, content, or outdoor activities usually want both in the same session, which makes this a strong internal-linking surface.',
    path: '/guides/moon-phase/',
    primaryBullets: ['Check today\'s moon phase and illumination alongside the sun schedule', 'Find city pages where moonrise and moonset help with planning', 'Keep related astronomy and timing questions inside one site session'],
    workflowBullets: ['Use the guide for orientation', 'Jump into a city page for local timing', 'Browse a region hub to compare nearby sky conditions quickly'],
    featuredCitySlugs: ['london', 'dubai', 'sao-paulo', 'auckland', 'shanghai', 'casablanca'],
    relatedRegionSlugs: ['europe', 'asia', 'south-america', 'oceania'],
  },
  {
    slug: 'prayer-times',
    name: 'Prayer Times',
    description: 'Browse prayer-time-focused city pages where sunrise, sunset, and the next prayer are part of one quick planning flow.',
    intro: 'Prayer-time searches are high-frequency and habit-driven, so the right hub should remove friction, explain the calculation standard, and route users into the correct city page fast.',
    path: '/guides/prayer-times/',
    primaryBullets: ['Use one workflow for sunrise, sunset, and the next prayer', 'Land on a city page that already calculates MWL-based prayer times', 'Compare cities when you travel or move across regions'],
    workflowBullets: ['Start with the city you need right now', 'Confirm today\'s prayer sequence and next upcoming prayer', 'Keep browsing through regional hubs when your schedule changes'],
    featuredCitySlugs: ['dubai', 'cairo', 'riyadh', 'istanbul', 'casablanca', 'jakarta'],
    relatedRegionSlugs: ['asia', 'africa', 'europe'],
  },
  {
    slug: 'daylight-length',
    name: 'Daylight Length',
    description: 'Compare how much usable daylight different cities have today, then drill into the sunrise and sunset pages that explain the shift.',
    intro: 'Daylight-length pages help users compare destinations, seasons, and routines at a glance. They are also strong discovery pages because they naturally lead into multiple city clicks.',
    path: '/guides/daylight-length/',
    primaryBullets: ['See where the day is shortest or longest in your shortlist', 'Understand how sunrise and sunset changes affect the total day', 'Use region hubs to compare nearby cities efficiently'],
    workflowBullets: ['Open the guide to frame the comparison', 'Visit city pages to confirm exact sunrise and sunset times', 'Use regional browse pages to continue planning instead of restarting search'],
    featuredCitySlugs: ['stockholm', 'oslo', 'melbourne', 'vancouver', 'cape-town', 'tokyo'],
    relatedRegionSlugs: ['europe', 'north-america', 'africa', 'oceania'],
  },
];

export function getUseCaseHub(slug: string) {
  return useCaseHubs.find((hub) => hub.slug === slug);
}

export const featuredFooterCities = getCitiesBySlugs([
  'new-york',
  'london',
  'tokyo',
  'dubai',
  'sydney',
  'sao-paulo',
]);

export const footerCompanyLinks = [
  { name: 'About', path: '/about/' },
  { name: 'Methodology', path: '/methodology/' },
  { name: 'Privacy Policy', path: '/privacy/' },
  { name: 'Terms of Service', path: '/terms/' },
  { name: 'Contact', path: '/contact/' },
  { name: 'HTML Sitemap', path: '/sitemap/' },
];

export const footerCoreLinks = [
  { name: 'Search City', path: '/#search' },
  { name: 'Cities Index', path: '/cities/' },
  { name: 'Popular Cities', path: '/#cities' },
  { name: 'FAQ', path: '/#faq' },
];
