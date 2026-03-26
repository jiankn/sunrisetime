import { getCityAdminLabel, hasDuplicateCityName } from '@data/site';
import type { City } from '@data/site';

export const frenchLocale = 'fr-FR';

const cityNameMap: Record<string, string> = {
  'new-york': 'New York',
  'los-angeles': 'Los Angeles',
  'mexico-city': 'Mexico',
  'mumbai': 'Bombay',
  'cairo': 'Le Caire',
  'cape-town': 'Le Cap',
  'beijing': 'Pekin',
  'vienna': 'Vienne',
  'warsaw': 'Varsovie',
  'bogota': 'Bogota',
  'athens': 'Athenes',
  'moscow': 'Moscou',
};

const cityAliasMap: Record<string, string[]> = {
  'new-york': ['new york'],
  'los-angeles': ['los angeles'],
  'mexico-city': ['ville de mexico', 'mexico'],
  'mumbai': ['bombay'],
  'cairo': ['le caire'],
  'cape-town': ['le cap'],
  'beijing': ['pekin'],
  'vienna': ['vienne'],
  'warsaw': ['varsovie'],
  'bogota': ['bogota'],
  'athens': ['athenes'],
  'moscow': ['moscou'],
};

const regionNameMap: Record<string, string> = {
  'north-america': 'Amerique du Nord',
  'south-america': 'Amerique du Sud',
  'europe': 'Europe',
  'asia': 'Asie',
  'africa': 'Afrique',
  'oceania': 'Oceanie',
};

const prayerNameMap: Record<string, string> = {
  Fajr: 'Fajr',
  Sunrise: 'Lever du soleil',
  Dhuhr: 'Dhuhr',
  Asr: 'Asr',
  Maghrib: 'Maghrib',
  Isha: 'Isha',
};

const moonPhaseMap: Record<string, string> = {
  'New Moon': 'Nouvelle lune',
  'Waxing Crescent': 'Premier croissant',
  'First Quarter': 'Premier quartier',
  'Waxing Gibbous': 'Gibbeuse croissante',
  'Full Moon': 'Pleine lune',
  'Waning Gibbous': 'Gibbeuse decroissante',
  'Last Quarter': 'Dernier quartier',
  'Waning Crescent': 'Dernier croissant',
};

const frenchRegionContent: Record<string, {
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}> = {
  'north-america': {
    description: 'Consultez les heures de lever du soleil, coucher du soleil, heure doree, phase lunaire et prieres pour les grandes villes d Amerique du Nord.',
    intro: 'L Amerique du Nord combine des trajets matinaux sur la cote Est, de longues soirees d ete et de forts ecarts de lumiere entre les grandes zones urbaines.',
    audiences: ['Personnes qui organisent leur depart selon la premiere lumiere', 'Voyageurs qui comparent plusieurs villes et fuseaux horaires', 'Photographes qui recherchent des fins de journee longues et predictibles'],
    reasons: ['Les ecarts de lumiere entre cotes changent vraiment la planification', 'Les grandes metropoles concentrent une demande recurrente', 'Un hub regional solide envoie facilement vers plusieurs pages de ville'],
  },
  'south-america': {
    description: 'Explorez les pages de lever du soleil, coucher du soleil, heure doree, lune et prieres pour les principales villes d Amerique du Sud.',
    intro: 'Les villes d Amerique du Sud combinent de grandes populations urbaines, des variations saisonnieres de lumiere et de vrais besoins de comparaison pendant les voyages.',
    audiences: ['Voyageurs qui coordonnent arrivees, departs et excursions', 'Createurs qui cherchent une lumiere chaude au lever ou au coucher du soleil', 'Lecteurs qui veulent comparer plusieurs villes d un meme itineraire'],
    reasons: ['Le regroupement regional accelere les comparaisons transfrontalieres', 'Les grandes capitales font de bonnes pages d entree evergreen', 'Les hubs regionaux augmentent les pages vues sans contenu generique'],
  },
  'europe': {
    description: 'Comparez le lever du soleil, le coucher du soleil, la phase lunaire, la duree du jour et les horaires de prieres dans les villes europeennes les plus recherchees.',
    intro: 'L Europe se prete bien a la comparaison: deux villes proches peuvent quand meme avoir des horaires de soleil et des crepuscules sensiblement differents.',
    audiences: ['Voyageurs de week-end qui optimisent leurs journees urbaines', 'Photographes qui comparent les variations de lumiere entre nord et sud', 'Utilisateurs qui preferent une page regionale a plusieurs recherches separees'],
    reasons: ['Le contraste entre nord et sud de l Europe cree des comparaisons de lumiere tres claires', 'Beaucoup de recherches a forte intention sont d abord regionales', 'Un bon hub europeen peut redistribuer le trafic vers de nombreux clusters de villes'],
  },
  'asia': {
    description: 'Trouvez les heures de lever du soleil, coucher du soleil, heure doree, phase lunaire et prieres pour les grandes villes d Asie.',
    intro: 'L Asie concentre des megavilles, de nombreux fuseaux horaires et des usages quotidiens frequents, ce qui en fait un hub fort pour les recherches ville par ville.',
    audiences: ['Personnes qui verifient la prochaine fenetre de lumiere avant de sortir', 'Voyageurs qui comparent plusieurs etapes sur un meme trajet', 'Utilisateurs qui veulent gerer lever du soleil et prieres dans le meme flux'],
    reasons: ['L Asie genere une forte recurrence sur les questions d horaires quotidiens', 'Les clusters de megavilles rendent la navigation interne tres utile', 'Les intentions soleil et prieres se croisent naturellement dans cette region'],
  },
  'africa': {
    description: 'Consultez les pages de lever du soleil, coucher du soleil, lune et prieres pour les grandes villes d Afrique depuis un seul hub.',
    intro: 'Les pages africaines sont utiles quand il faut un horaire rapide pour la routine, la priere, la photo ou un trajet entre grands centres urbains.',
    audiences: ['Personnes qui organisent prieres, deplacements ou travail en exterieur', 'Voyageurs qui se deplacent entre le nord, l est et le sud de l Afrique', 'Lecteurs qui comparent des conditions de lumiere entre climats differents'],
    reasons: ['La navigation regionale aide a decouvrir des villes qui ne sont pas toujours la premiere recherche', 'La region recoupe fortement l intention prieres', 'Un hub africain complet renforce l architecture du site pour les utilisateurs et les moteurs'],
  },
  'oceania': {
    description: 'Consultez les pages de lever du soleil, coucher du soleil, duree du jour et heure doree pour les villes cles d Oceanie.',
    intro: 'L Oceanie a moins de villes indexees, mais une vraie valeur pour la planification de voyages, de sorties en nature et de seances photo autour de la lumiere.',
    audiences: ['Photographes qui planifient des seances a l aube ou au crepuscule', 'Voyageurs qui comparent la cote est australienne et la Nouvelle-Zelande', 'Utilisateurs qui organisent des activites exterieures selon la lumiere disponible'],
    reasons: ['Un hub compact evite le bruit et simplifie la decouverte', 'L intention heure doree et duree du jour y est forte', 'Ces pages regionales sont de bons points d entree vers les pages de ville'],
  },
};

const frenchGuideContent: Record<string, {
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}> = {
  'golden-hour': {
    name: 'Heure doree',
    description: 'Trouvez les villes ou l heure doree d aujourd hui est la plus facile a planifier et comparez rapidement les meilleures fenetres de lumiere chaude.',
    intro: 'L intention heure doree demande generalement une reponse rapide, une page de ville, puis une ou deux comparaisons supplementaires. C est un excellent levier de navigation interne.',
    primaryBullets: ['Voyez quand commence et finit la lumiere chaude la plus utile', 'Comparez plusieurs villes avant un voyage ou une seance', 'Passez d un guide general a des pages de ville avec donnees en direct'],
    workflowBullets: ['Commencez par une ville deja connue', 'Ouvrez sa page pour confirmer lever, coucher et fenetre de lumiere', 'Continuez avec les villes proches et les hubs regionaux'],
  },
  'moon-phase': {
    name: 'Phase lunaire',
    description: 'Utilisez le guide des phases lunaires pour comparer illumination, nom de phase et pages de ville ou la lune compte autant que le soleil.',
    intro: 'Les questions de phase lunaire arrivent souvent avec des besoins de lever ou coucher du soleil. Un meme parcours doit permettre de repondre aux deux.',
    primaryBullets: ['Consultez la phase et l illumination du jour avec le calendrier solaire', 'Trouvez les villes ou les horaires de lune changent le plan', 'Gardez les questions connexes dans une meme session de navigation'],
    workflowBullets: ['Utilisez le guide pour cadrer la comparaison', 'Ouvrez ensuite une ville pour voir l horaire local', 'Comparez plusieurs villes depuis un hub regional'],
  },
  'prayer-times': {
    name: 'Horaires de priere',
    description: 'Explorez les pages orientees prieres ou lever du soleil, coucher du soleil et prochaine priere s enchainent dans un meme flux rapide.',
    intro: 'L intention horaires de priere est frequente et repetitive. Le guide doit reduire la friction, expliquer la methode de calcul et mener vite a la bonne ville.',
    primaryBullets: ['Utilisez un meme flux pour lever du soleil, coucher du soleil et prochaine priere', 'Ouvrez des pages de ville basees sur la methode MWL par defaut', 'Comparez les villes quand vous voyagez ou changez de region'],
    workflowBullets: ['Commencez par la ville utile maintenant', 'Confirmez la sequence de prieres et la prochaine priere', 'Basculez vers les hubs regionaux quand l itineraire change'],
  },
  'daylight-length': {
    name: 'Duree du jour',
    description: 'Comparez la quantite de lumiere utile aujourd hui dans chaque ville puis ouvrez les pages de lever et coucher du soleil pour comprendre la difference.',
    intro: 'Les pages de duree du jour sont utiles pour comparer destinations, saisons et routines en un coup d oeil. Elles poussent naturellement vers plusieurs clics de villes.',
    primaryBullets: ['Reperez ou la journee est la plus longue ou la plus courte', 'Comprenez comment lever et coucher du soleil changent la duree utile', 'Utilisez les hubs regionaux pour comparer des villes proches sans friction'],
    workflowBullets: ['Ouvrez le guide pour cadrer la comparaison', 'Entrez ensuite dans les pages de ville pour les horaires exacts', 'Continuez par regions au lieu de relancer une recherche'],
  },
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function getFrenchCityName(city: Pick<City, 'slug' | 'name'>) {
  return cityNameMap[city.slug] ?? city.name;
}

export function getFrenchCityAliases(city: Pick<City, 'slug' | 'name' | 'aliases'>) {
  const aliases = [...(cityAliasMap[city.slug] ?? []), ...(city.aliases ?? [])];
  const seen = new Set<string>();

  return aliases.filter((alias) => {
    const key = normalizeText(alias);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getFrenchRegionName(regionSlug: string, fallbackName: string) {
  return regionNameMap[regionSlug] ?? fallbackName;
}

type FrenchLabelOptions = {
  includeAdmin1?: boolean;
};

export function getFrenchCityLocationLabel(
  city: Pick<City, 'name' | 'country' | 'admin1'>,
  options: FrenchLabelOptions = {},
) {
  const parts: string[] = [];
  const admin1 = getCityAdminLabel(city);
  const country = getFrenchCountryName(city.country);
  const shouldIncludeAdmin1 = options.includeAdmin1 || hasDuplicateCityName(city);

  if (shouldIncludeAdmin1 && admin1 && normalizeText(admin1) !== normalizeText(city.name)) {
    parts.push(admin1);
  }

  if (country && !parts.some((part) => normalizeText(part) === normalizeText(country))) {
    parts.push(country);
  }

  return parts.join(', ');
}

export function getFrenchCityDisplayName(
  city: Pick<City, 'slug' | 'name' | 'country' | 'admin1'>,
  options: FrenchLabelOptions = {},
) {
  const cityName = getFrenchCityName(city);
  const locationLabel = getFrenchCityLocationLabel(city, options);
  return locationLabel ? `${cityName}, ${locationLabel}` : cityName;
}

export function getFrenchPrayerName(name: string) {
  return prayerNameMap[name] ?? name;
}

export function getFrenchMoonPhase(name: string) {
  return moonPhaseMap[name] ?? name;
}

export function getFrenchCountryName(countryCode: string) {
  const normalizedCode = countryCode === 'UK' ? 'GB' : countryCode;

  try {
    const displayNames = new Intl.DisplayNames([frenchLocale], { type: 'region' });
    return displayNames.of(normalizedCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}

export function getFrenchRegionContent(region: {
  slug: string;
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}) {
  return frenchRegionContent[region.slug] ?? {
    description: region.description,
    intro: region.intro,
    audiences: region.audiences,
    reasons: region.reasons,
  };
}

export function getFrenchGuideContent(hub: {
  slug: string;
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}) {
  return frenchGuideContent[hub.slug] ?? {
    name: hub.name,
    description: hub.description,
    intro: hub.intro,
    primaryBullets: hub.primaryBullets,
    workflowBullets: hub.workflowBullets,
  };
}

export const frenchNavigation = {
  home: 'Accueil',
  search: 'Recherche',
  cities: 'Villes',
  guides: 'Guides',
  faq: 'FAQ',
  contact: 'Contact',
  searchCity: 'Rechercher une ville',
  browseCities: 'Voir les villes',
  searchYourCity: 'Trouver votre ville',
};

export const frenchFooter = {
  summary: 'Consultez le lever du soleil, le coucher du soleil, l heure doree, la phase lunaire et les horaires de priere pour des villes du monde entier depuis une seule interface.',
  trustLinks: [
    { name: 'A propos de SunriseTime', path: '/fr/about/' },
    { name: 'Methodologie', path: '/fr/methodology/' },
    { name: 'Confidentialite', path: '/fr/privacy/' },
    { name: 'Conditions', path: '/fr/terms/' },
    { name: 'Contact', path: '/fr/contact/' },
    { name: 'Plan du site', path: '/fr/sitemap/' },
  ],
  coreLinks: [
    { name: 'Rechercher une ville', path: '/fr/#search' },
    { name: 'Index des villes', path: '/fr/cities/' },
    { name: 'Guides', path: '/fr/guides/' },
    { name: 'Lever du soleil', path: '/fr/#top-cities' },
    { name: 'FAQ', path: '/fr/#faq' },
  ],
};

export const frenchHomeFaqs = [
  {
    question: 'Quelle est la precision des donnees SunriseTime ?',
    answer: 'SunriseTime utilise des calculs solaires alignes sur NOAA pour estimer le lever du soleil, le coucher du soleil, les crepuscules et l heure doree avec une precision utile au quotidien.',
  },
  {
    question: 'Que contient chaque page de ville ?',
    answer: 'Chaque page affiche le lever du soleil, le coucher du soleil, la duree du jour, l heure locale, l heure doree, la phase lunaire et un acces rapide aux horaires de priere.',
  },
  {
    question: 'SunriseTime fonctionne-t-il bien sur mobile ?',
    answer: 'Oui. L objectif est de faire apparaitre la reponse principale rapidement sur petit ecran, sans imposer plusieurs couches de navigation.',
  },
];
