import { getCityAdminLabel, hasDuplicateCityName } from '@data/site';
import type { City } from '@data/site';

export const spanishLocale = 'es-ES';

const cityNameMap: Record<string, string> = {
  'new-york': 'Nueva York',
  'los-angeles': 'Los Ángeles',
  'mexico-city': 'Ciudad de México',
  'istanbul': 'Estambul',
  'mumbai': 'Bombay',
  'cairo': 'El Cairo',
  'cape-town': 'Ciudad del Cabo',
  'beijing': 'Pekín',
  'shanghai': 'Shanghái',
  'kuala-lumpur': 'Kuala Lumpur',
  'vienna': 'Viena',
  'warsaw': 'Varsovia',
  'bogota': 'Bogotá',
  'athens': 'Atenas',
  'stockholm': 'Estocolmo',
  'moscow': 'Moscú',
  'sao-paulo': 'São Paulo',
};

const cityAliasMap: Record<string, string[]> = {
  'new-york': ['nueva york'],
  'los-angeles': ['los angeles'],
  'mexico-city': ['ciudad de mexico', 'cdmx'],
  'istanbul': ['estambul'],
  'cairo': ['el cairo'],
  'cape-town': ['ciudad del cabo'],
  'beijing': ['pekin'],
  'shanghai': ['shanghai', 'shanghái'],
  'vienna': ['viena'],
  'warsaw': ['varsovia'],
  'bogota': ['bogota', 'bogotá'],
  'athens': ['atenas'],
  'stockholm': ['estocolmo'],
  'moscow': ['moscu', 'moscú'],
};

const regionNameMap: Record<string, string> = {
  'north-america': 'América del Norte',
  'south-america': 'América del Sur',
  'europe': 'Europa',
  'asia': 'Asia',
  'africa': 'África',
  'oceania': 'Oceanía',
};

const prayerNameMap: Record<string, string> = {
  Fajr: 'Fajr',
  Sunrise: 'Amanecer',
  Dhuhr: 'Dhuhr',
  Asr: 'Asr',
  Maghrib: 'Maghrib',
  Isha: 'Isha',
};

const moonPhaseMap: Record<string, string> = {
  'New Moon': 'Luna nueva',
  'Waxing Crescent': 'Creciente',
  'First Quarter': 'Cuarto creciente',
  'Waxing Gibbous': 'Gibosa creciente',
  'Full Moon': 'Luna llena',
  'Waning Gibbous': 'Gibosa menguante',
  'Last Quarter': 'Cuarto menguante',
  'Waning Crescent': 'Menguante',
};

const spanishRegionContent: Record<string, {
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}> = {
  'north-america': {
    description: 'Consulta amanecer, atardecer, hora dorada, fase lunar y horarios de oración en las principales ciudades de América del Norte.',
    intro: 'América del Norte combina madrugadas de la Costa Este, tardes largas de verano, cambios fuertes de luz en zonas montañosas y ciudades costeras con mucha intención de búsqueda.',
    audiences: ['Personas que organizan su salida según la primera luz del día', 'Viajeros que comparan varias ciudades y husos horarios', 'Fotógrafos que buscan atardeceres largos y hora dorada'],
    reasons: ['Las diferencias de luz entre costas cambian de verdad la planificación', 'Las grandes áreas metropolitanas concentran demanda recurrente y estable', 'Un hub regional sólido mejora la navegación interna hacia páginas de ciudad relacionadas'],
  },
  'south-america': {
    description: 'Explora páginas de amanecer, atardecer, hora dorada, luna y oración para las principales ciudades de América del Sur.',
    intro: 'Las ciudades sudamericanas mezclan grandes poblaciones urbanas, cambios estacionales claros en la luz y mucha utilidad para comparar destinos dentro del mismo viaje.',
    audiences: ['Viajeros que coordinan llegadas, salidas y excursiones', 'Creadores que buscan luz cálida al amanecer o al atardecer', 'Lectores que quieren comparar varias ciudades de una misma ruta'],
    reasons: ['La agrupación regional acelera comparaciones transfronterizas', 'Las grandes capitales funcionan como landing pages evergreen', 'Los hubs regionales aumentan páginas vistas sin depender de contenido genérico'],
  },
  'europe': {
    description: 'Compara amanecer, atardecer, fase lunar, duración del día y horarios de oración en ciudades europeas con alta demanda.',
    intro: 'Europa es ideal para navegar por comparación: ciudades cercanas pueden tener amaneceres, crepúsculos y duración del día bastante distintos según la latitud y la época del año.',
    audiences: ['Viajeros de fin de semana que planifican mejor sus jornadas urbanas', 'Fotógrafos que comparan los cambios de luz entre norte y sur', 'Usuarios que prefieren una página regional antes que muchas búsquedas sueltas'],
    reasons: ['El contraste entre norte y sur de Europa genera comparaciones de luz muy claras', 'Muchas búsquedas de alta intención nacen a nivel región y no solo ciudad', 'Un buen hub europeo deriva tráfico a muchos clústeres de ciudades relevantes'],
  },
  'asia': {
    description: 'Encuentra amanecer, atardecer, hora dorada, fase lunar y horarios de oración para grandes ciudades de Asia.',
    intro: 'Asia concentra megaciudades, muchas zonas horarias y hábitos diarios intensos, así que es uno de los hubs más fuertes para búsquedas repetidas de ciudad por ciudad.',
    audiences: ['Personas que revisan la siguiente ventana de luz antes de salir', 'Viajeros que comparan varias escalas en una misma ruta', 'Usuarios que necesitan amanecer y horarios de oración en el mismo flujo'],
    reasons: ['Asia genera búsquedas recurrentes muy fuertes para preguntas diarias de horario', 'Los clústeres de megaciudades hacen más valiosa la navegación entre páginas relacionadas', 'La mezcla entre intención solar y horarios de oración encaja de forma natural'],
  },
  'africa': {
    description: 'Consulta páginas de amanecer, atardecer, luna y oración para las principales ciudades de África desde un solo hub.',
    intro: 'Las páginas africanas son útiles cuando el usuario necesita horarios diarios rápidos para rutina, oración, fotografía o viajes entre grandes centros urbanos.',
    audiences: ['Personas que organizan oración, desplazamientos o trabajo al aire libre', 'Viajeros que se mueven entre norte, este y sur de África', 'Lectores que comparan condiciones de luz entre climas distintos'],
    reasons: ['La navegación regional mejora el descubrimiento de ciudades que no siempre son la primera búsqueda', 'La región conecta muy bien con intención de horarios de oración', 'Un hub africano completo fortalece la arquitectura del sitio para usuarios y buscadores'],
  },
  'oceania': {
    description: 'Consulta páginas de amanecer, atardecer, duración del día y hora dorada para ciudades clave de Oceanía.',
    intro: 'Oceanía tiene menos ciudades indexadas, pero mucho valor para planificación de luz en viajes, naturaleza y sesiones de foto al amanecer o al atardecer.',
    audiences: ['Fotógrafos que programan sesiones al amanecer y al atardecer', 'Viajeros que comparan costa este australiana y Nueva Zelanda', 'Usuarios que planifican actividades al aire libre según la luz del día'],
    reasons: ['Un hub compacto evita ruido y mejora el descubrimiento', 'La intención de hora dorada y duración del día es especialmente fuerte en la región', 'Las páginas regionales pequeñas funcionan bien como punto de entrada hacia ciudades concretas'],
  },
};

const spanishGuideContent: Record<string, {
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}> = {
  'golden-hour': {
    name: 'Hora dorada',
    description: 'Encuentra ciudades donde la hora dorada de hoy es más fácil de planificar y compara las franjas de luz cálida antes de salir.',
    intro: 'La intención de hora dorada suele pedir una respuesta rápida, una página de ciudad y una o dos comparaciones extra. Eso la convierte en una superficie ideal para enlazado interno útil.',
    primaryBullets: ['Consulta cuándo empieza y termina la luz cálida más aprovechable', 'Compara varias ciudades antes de un viaje o una sesión', 'Salta del tema general a páginas de ciudad con datos en vivo'],
    workflowBullets: ['Empieza por la ciudad que ya tienes en mente', 'Abre su página para confirmar amanecer, atardecer y franja de luz', 'Usa ciudades cercanas y hubs regionales para seguir comparando'],
  },
  'moon-phase': {
    name: 'Fase lunar',
    description: 'Usa la guía de fase lunar para comparar iluminación, nombre de la fase y páginas de ciudad donde la luna importa junto al amanecer y el atardecer.',
    intro: 'La intención sobre fase lunar suele ir junto a amanecer o atardecer. Quien planifica un viaje, una sesión o una salida nocturna suele necesitar ambas respuestas en la misma sesión.',
    primaryBullets: ['Revisa la fase lunar y la iluminación de hoy junto al calendario solar', 'Encuentra ciudades donde la salida y puesta de la luna cambian la planificación', 'Mantén las preguntas relacionadas dentro de un mismo flujo de navegación'],
    workflowBullets: ['Usa la guía para orientarte', 'Abre una ciudad para ver el horario local', 'Compara varias ciudades desde un hub regional'],
  },
  'prayer-times': {
    name: 'Horarios de oración',
    description: 'Explora páginas centradas en horarios de oración donde amanecer, atardecer y próxima oración forman un solo flujo rápido.',
    intro: 'La intención sobre horarios de oración es de alta frecuencia. La guía debe quitar fricción, explicar el método de cálculo y mandar al usuario a la ciudad correcta con la menor cantidad de pasos posible.',
    primaryBullets: ['Usa un mismo flujo para amanecer, atardecer y próxima oración', 'Abre páginas de ciudad con cálculo por defecto basado en MWL', 'Compara ciudades cuando viajas o cambias de región'],
    workflowBullets: ['Empieza por la ciudad que necesitas ahora', 'Confirma el orden de oraciones y la próxima oración del día', 'Usa hubs regionales cuando tu itinerario cambia'],
  },
  'daylight-length': {
    name: 'Duración del día',
    description: 'Compara cuánta luz natural útil tiene hoy cada ciudad y entra en las páginas de amanecer y atardecer para entender el cambio.',
    intro: 'Las páginas de duración del día son útiles para comparar destinos, estaciones y rutinas de un vistazo. También funcionan bien como páginas de descubrimiento porque empujan a visitar varias ciudades.',
    primaryBullets: ['Detecta dónde el día es más largo o más corto dentro de tu lista', 'Entiende cómo cambian amanecer y atardecer la luz total disponible', 'Usa hubs regionales para comparar ciudades cercanas con menos fricción'],
    workflowBullets: ['Abre la guía para encuadrar la comparación', 'Entra en páginas de ciudad para ver los horarios exactos', 'Continúa navegando por regiones en lugar de reiniciar la búsqueda'],
  },
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function getSpanishCityName(city: Pick<City, 'slug' | 'name'>) {
  return cityNameMap[city.slug] ?? city.name;
}

export function getSpanishCityAliases(city: Pick<City, 'slug' | 'name' | 'aliases'>) {
  const aliases = [...(cityAliasMap[city.slug] ?? []), ...(city.aliases ?? [])];
  const seen = new Set<string>();

  return aliases.filter((alias) => {
    const key = normalizeText(alias);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getSpanishRegionName(regionSlug: string, fallbackName: string) {
  return regionNameMap[regionSlug] ?? fallbackName;
}

type SpanishLabelOptions = {
  includeAdmin1?: boolean;
};

export function getSpanishCityLocationLabel(
  city: Pick<City, 'name' | 'country' | 'admin1'>,
  options: SpanishLabelOptions = {},
) {
  const parts: string[] = [];
  const admin1 = getCityAdminLabel(city);
  const country = getSpanishCountryName(city.country);
  const shouldIncludeAdmin1 = options.includeAdmin1 || hasDuplicateCityName(city);

  if (shouldIncludeAdmin1 && admin1 && normalizeText(admin1) !== normalizeText(city.name)) {
    parts.push(admin1);
  }

  if (country && !parts.some((part) => normalizeText(part) === normalizeText(country))) {
    parts.push(country);
  }

  return parts.join(', ');
}

export function getSpanishCityDisplayName(
  city: Pick<City, 'slug' | 'name' | 'country' | 'admin1'>,
  options: SpanishLabelOptions = {},
) {
  const cityName = getSpanishCityName(city);
  const locationLabel = getSpanishCityLocationLabel(city, options);
  return locationLabel ? `${cityName}, ${locationLabel}` : cityName;
}

export function getSpanishPrayerName(name: string) {
  return prayerNameMap[name] ?? name;
}

export function getSpanishMoonPhase(name: string) {
  return moonPhaseMap[name] ?? name;
}

export function getSpanishCountryName(countryCode: string) {
  const normalizedCode = countryCode === 'UK' ? 'GB' : countryCode;

  try {
    const displayNames = new Intl.DisplayNames([spanishLocale], { type: 'region' });
    return displayNames.of(normalizedCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}

export function getSpanishRegionContent(region: {
  slug: string;
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}) {
  return spanishRegionContent[region.slug] ?? {
    description: region.description,
    intro: region.intro,
    audiences: region.audiences,
    reasons: region.reasons,
  };
}

export function getSpanishGuideContent(hub: {
  slug: string;
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}) {
  return spanishGuideContent[hub.slug] ?? {
    name: hub.name,
    description: hub.description,
    intro: hub.intro,
    primaryBullets: hub.primaryBullets,
    workflowBullets: hub.workflowBullets,
  };
}

export const spanishNavigation = {
  home: 'Inicio',
  search: 'Buscar',
  cities: 'Ciudades',
  guides: 'Guías',
  faq: 'Preguntas frecuentes',
  contact: 'Contacto',
  searchCity: 'Buscar ciudad',
  browseCities: 'Ver ciudades',
  searchYourCity: 'Busca tu ciudad',
};

export const spanishFooter = {
  summary: 'Consulta amanecer, atardecer, hora dorada, fase lunar y horarios de oración para ciudades de todo el mundo desde una sola experiencia.',
  trustLinks: [
    { name: 'Sobre SunriseTime', path: '/es/about/' },
    { name: 'Metodología', path: '/es/methodology/' },
    { name: 'Privacidad', path: '/es/privacy/' },
    { name: 'Términos', path: '/es/terms/' },
    { name: 'Contacto', path: '/es/contact/' },
    { name: 'Mapa del sitio', path: '/es/sitemap/' },
  ],
  coreLinks: [
    { name: 'Buscar ciudad', path: '/es/#search' },
    { name: 'Índice de ciudades', path: '/es/cities/' },
    { name: 'Guías', path: '/es/guides/' },
    { name: 'Amanecer', path: '/es/#top-cities' },
    { name: 'FAQ', path: '/es/#faq' },
  ],
};

export const spanishHomeFaqs = [
  {
    question: '¿Qué tan precisos son los datos de SunriseTime?',
    answer: 'SunriseTime usa cálculos solares basados en NOAA para estimar amanecer, atardecer, crepúsculos y hora dorada con precisión práctica para planificación diaria.',
  },
  {
    question: '¿Qué incluye cada página de ciudad?',
    answer: 'Cada página muestra el amanecer, el atardecer, la duración del día, la hora local, la hora dorada, la fase lunar y un acceso rápido a los horarios de oración.',
  },
  {
    question: '¿SunriseTime funciona bien en móvil?',
    answer: 'Sí. El objetivo es que la respuesta principal aparezca rápido en pantallas pequeñas sin obligarte a navegar por varias capas.',
  },
];
