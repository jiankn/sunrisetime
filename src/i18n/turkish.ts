import { getCityAdminLabel, hasDuplicateCityName } from '@data/site';
import type { City } from '@data/site';

export const turkishLocale = 'tr-TR';

const cityNameMap: Record<string, string> = {
  'new-york': 'New York',
  'los-angeles': 'Los Angeles',
  'mexico-city': 'Meksiko',
  'cairo': 'Kahire',
  'beijing': 'Pekin',
  'vienna': 'Viyana',
  'warsaw': 'Varşova',
  'athens': 'Atina',
  'moscow': 'Moskova',
  'istanbul': 'İstanbul',
  'munich': 'Münih',
  'cologne': 'Köln',
  'mecca': 'Mekke',
  'medina': 'Medine',
  'jeddah': 'Cidde',
};

const cityAliasMap: Record<string, string[]> = {
  'new-york': ['new york'],
  'mexico-city': ['meksiko', 'meksiko sehri', 'mexico city'],
  'cairo': ['kahire'],
  'beijing': ['pekin'],
  'vienna': ['viyana'],
  'warsaw': ['varsova', 'varşova'],
  'athens': ['atina'],
  'moscow': ['moskova'],
  'istanbul': ['istanbul', 'stambul'],
  'munich': ['münih', 'munih'],
  'cologne': ['köln', 'koln'],
  'mecca': ['mekke', 'mecca'],
  'medina': ['medine', 'medina'],
  'jeddah': ['cidde', 'jeddah'],
};

const regionNameMap: Record<string, string> = {
  'north-america': 'Kuzey Amerika',
  'south-america': 'Güney Amerika',
  'europe': 'Avrupa',
  'asia': 'Asya',
  'africa': 'Afrika',
  'oceania': 'Okyanusya',
};

const prayerNameMap: Record<string, string> = {
  Fajr: 'İmsak',
  Sunrise: 'Güneş',
  Dhuhr: 'Öğle',
  Asr: 'İkindi',
  Maghrib: 'Akşam',
  Isha: 'Yatsı',
};

const moonPhaseMap: Record<string, string> = {
  'New Moon': 'Yeni Ay',
  'Waxing Crescent': 'Büyüyen Hilal',
  'First Quarter': 'İlk Dördün',
  'Waxing Gibbous': 'Büyüyen Şişkin Ay',
  'Full Moon': 'Dolunay',
  'Waning Gibbous': 'Küçülen Şişkin Ay',
  'Last Quarter': 'Son Dördün',
  'Waning Crescent': 'Küçülen Hilal',
};

const turkishRegionContent: Record<string, {
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}> = {
  'north-america': {
    description: 'Kuzey Amerika şehirlerinde gün doğumu, gün batımı, altın saat, ay evresi ve namaz vakitlerini tek yerden karşılaştırın.',
    intro: 'Kuzey Amerika; doğu kıyısındaki erken başlangıçları, uzun yaz akşamlarını ve kıtalar arası saat farklarını aynı gezinme akışında birleştirir.',
    audiences: ['Sabah ışığına göre plan yapan kullanıcılar', 'Birden fazla şehir ve saat dilimini kıyaslayan gezginler', 'Tahmin edilebilir akşam ışığını kovalayan fotoğrafçılar'],
    reasons: ['Kıyılar arasındaki ışık farkı günlük planı gerçekten değiştirir', 'Büyük metropoller tekrar eden yüksek niyetli aramaları toplar', 'Güçlü bir bölge hub\'ı şehir sayfalarına doğal iç link aktarır'],
  },
  'south-america': {
    description: 'Güney Amerika\'nın büyük şehirleri için gün doğumu, gün batımı, altın saat, ay ve namaz sayfalarını keşfedin.',
    intro: 'Güney Amerika şehirleri; mevsimsel ışık değişimi, yoğun nüfus ve seyahat sırasında şehir karşılaştırma ihtiyacını aynı anda üretir.',
    audiences: ['Varış, çıkış ve gezi saatlerini eşleştiren gezginler', 'Sıcak sabah ve akşam ışığını arayan içerik üreticileri', 'Aynı rota içindeki şehirleri yan yana görmek isteyen okuyucular'],
    reasons: ['Bölgesel gezinme ülkeler arası karşılaştırmayı hızlandırır', 'Büyük başkentler kalıcı giriş sayfası olarak iyi çalışır', 'Bölge hub\'ları yüzeysel içerik olmadan daha derin gezinme sağlar'],
  },
  'europe': {
    description: 'Avrupa\'nın çok aranan şehirlerinde gün doğumu, gün batımı, ay evresi, gündüz süresi ve namaz vakitlerini karşılaştırın.',
    intro: 'Avrupa kıyaslama için güçlüdür; birbirine yakın iki şehir bile farklı doğuş saatleri, alacakaranlık pencereleri ve mevsimsel gündüz uzunluğu sunabilir.',
    audiences: ['Şehir gezilerinin başlangıç ve bitiş saatlerini optimize eden yolcular', 'Enlem kaynaklı ışık farklarını kıyaslayan fotoğrafçılar', 'Birden fazla arama yerine tek bölge sayfası isteyen kullanıcılar'],
    reasons: ['Kuzey ve güney Avrupa arasındaki fark net karşılaştırma üretir', 'Birçok yüksek niyetli arama önce bölgesel başlar', 'İyi bir Avrupa hub\'ı yoğun şehir kümelerine trafik dağıtır'],
  },
  'asia': {
    description: 'Asya\'nın büyük şehirleri için gün doğumu, gün batımı, altın saat, ay evresi ve namaz vakitlerini bulun.',
    intro: 'Asya; mega şehirleri, farklı saat dilimlerini ve her gün tekrar eden planlama ihtiyacını birleştirerek güçlü bir bölgesel giriş noktası oluşturur.',
    audiences: ['Evden çıkmadan önce bir sonraki ışık penceresini kontrol eden kullanıcılar', 'Aynı rota üzerindeki durakları kıyaslayan gezginler', 'Gün doğumu ve namaz vakitlerini aynı akışta görmek isteyenler'],
    reasons: ['Asya şehir bazlı zaman aramalarında yüksek tekrar üretir', 'Mega şehir kümeleri iç gezinmeyi daha faydalı hale getirir', 'Güneş ve namaz niyeti bu bölgede doğal olarak kesişir'],
  },
  'africa': {
    description: 'Afrika\'nın büyük şehirleri için gün doğumu, gün batımı, ay ve namaz sayfalarına tek bir hub üzerinden ulaşın.',
    intro: 'Afrika sayfaları; günlük rutin, namaz, fotoğraf veya şehirler arası seyahat için hızlı saate ihtiyaç duyan kullanıcılar için özellikle faydalıdır.',
    audiences: ['Namaz, ulaşım veya açık hava işi planlayan kullanıcılar', 'Kuzey, doğu ve güney Afrika arasında seyahat eden gezginler', 'Farklı iklimlerde ışık koşullarını kıyaslayan okuyucular'],
    reasons: ['Bölgesel gezinme ilk aramada düşünülmeyen şehirleri görünür kılar', 'Bölge namaz niyetiyle güçlü biçimde örtüşür', 'Kapsamlı Afrika hub\'ı hem kullanıcı hem arama motoru için mimariyi güçlendirir'],
  },
  'oceania': {
    description: 'Okyanusya şehirlerinde gün doğumu, gün batımı, gündüz süresi ve altın saat verilerini tek yerden inceleyin.',
    intro: 'Okyanusya şehir sayısı daha sınırlı olsa da seyahat, açık hava ve çekim planlarında ışık zamanlaması açısından yüksek değere sahiptir.',
    audiences: ['Şafak ve gün batımı çekimi planlayan fotoğrafçılar', 'Avustralya doğu kıyısı ile Yeni Zelanda ışığını kıyaslayan gezginler', 'Açık hava etkinliklerini gün ışığına göre ayarlayan kullanıcılar'],
    reasons: ['Daha kompakt bir hub keşfi gürültüsüz tutar', 'Altın saat ve gündüz süresi niyeti bölgede güçlüdür', 'Bu bölge sayfaları şehir detay sayfalarına iyi giriş noktası olur'],
  },
};

const turkishGuideContent: Record<string, {
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}> = {
  'golden-hour': {
    name: 'Altın Saat',
    description: 'Bugün altın saatin en kolay planlandığı şehirleri bulun ve sıcak ışık pencerelerini hızlıca karşılaştırın.',
    intro: 'Altın saat niyeti genelde hızlı cevap, bir şehir sayfası ve ardından birkaç karşılaştırma ister. Bu da iç gezinmeyi güçlendiren ideal bir akıştır.',
    primaryBullets: ['Yumuşak sıcak ışığın ne zaman başlayıp bittiğini görün', 'Seyahat veya çekim öncesi birden fazla şehri kıyaslayın', 'Genel rehberden canlı şehir sayfalarına tek akışta geçin'],
    workflowBullets: ['Önce bildiğiniz bir şehirden başlayın', 'Doğuş, batış ve ışık penceresini teyit etmek için detay sayfasını açın', 'Ardından yakın şehirler ve bölge hub\'larıyla devam edin'],
  },
  'moon-phase': {
    name: 'Ay Evresi',
    description: 'Ay evresi rehberiyle aydınlanma oranını, evre adını ve ayın güneş kadar önemli olduğu şehir sayfalarını karşılaştırın.',
    intro: 'Ay evresi aramaları çoğu zaman gün doğumu veya gün batımı ihtiyacıyla birlikte gelir. Aynı gezinme akışı iki soruya birden cevap vermelidir.',
    primaryBullets: ['Günün ay evresini ve aydınlanmasını güneş takvimiyle birlikte görün', 'Ay zamanlamasının planı değiştirdiği şehirleri bulun', 'Bağlantılı astronomi sorularını aynı oturumda tutun'],
    workflowBullets: ['Karşılaştırma çerçevesi için rehberle başlayın', 'Sonra yerel saat için bir şehir sayfası açın', 'Yakın gökyüzü koşullarını kıyaslamak için bölge hub\'larına geçin'],
  },
  'prayer-times': {
    name: 'Namaz Vakitleri',
    description: 'Gün doğumu, gün batımı ve bir sonraki vaktin aynı hızlı akışta birleştiği namaz odaklı şehir sayfalarını keşfedin.',
    intro: 'Namaz vakti aramaları yüksek frekanslıdır. Rehber sürtünmeyi azaltmalı, hesaplama yöntemini açık etmeli ve kullanıcıyı doğru şehir sayfasına hızlıca götürmelidir.',
    primaryBullets: ['Gün doğumu, gün batımı ve bir sonraki vakit için tek akış kullanın', 'Varsayılan MWL yöntemiyle hesaplanan şehir sayfalarına ulaşın', 'Seyahat ederken veya bölge değiştirirken şehirleri kıyaslayın'],
    workflowBullets: ['Şu anda ihtiyaç duyduğunuz şehirle başlayın', 'Bugünkü sıra ve bir sonraki vakti teyit edin', 'Program değiştiğinde bölge hub\'larıyla devam edin'],
  },
  'daylight-length': {
    name: 'Gündüz Süresi',
    description: 'Bugün hangi şehirde ne kadar kullanılabilir gün ışığı olduğunu karşılaştırın ve farkı açıklayan doğuş-batış sayfalarına geçin.',
    intro: 'Gündüz süresi sayfaları; destinasyon, mevsim ve rutin kıyaslamasını tek bakışta kolaylaştırır. Aynı zamanda çoklu şehir geçişi için güçlü bir keşif yüzeyidir.',
    primaryBullets: ['Listenizde günün en uzun ve en kısa olduğu yerleri görün', 'Gün doğumu ve batımının toplam süreyi nasıl değiştirdiğini anlayın', 'Yakın şehirleri bölge hub\'larıyla sürtünmesiz kıyaslayın'],
    workflowBullets: ['Önce kıyaslama çerçevesi için rehberi açın', 'Kesin saatler için şehir sayfalarına girin', 'Aramayı baştan başlatmak yerine bölgeler üzerinden devam edin'],
  },
};

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase(turkishLocale)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function getTurkishCityName(city: Pick<City, 'slug' | 'name'>) {
  return cityNameMap[city.slug] ?? city.name;
}

export function getTurkishCityAliases(city: Pick<City, 'slug' | 'aliases'>) {
  const aliases = [...(cityAliasMap[city.slug] ?? []), ...(city.aliases ?? [])];
  const seen = new Set<string>();

  return aliases.filter((alias) => {
    const key = normalizeText(alias);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getTurkishRegionName(regionSlug: string, fallbackName: string) {
  return regionNameMap[regionSlug] ?? fallbackName;
}

type TurkishLabelOptions = {
  includeAdmin1?: boolean;
};

export function getTurkishCityLocationLabel(
  city: Pick<City, 'name' | 'country' | 'admin1'>,
  options: TurkishLabelOptions = {},
) {
  const parts: string[] = [];
  const admin1 = getCityAdminLabel(city);
  const country = getTurkishCountryName(city.country);
  const shouldIncludeAdmin1 = options.includeAdmin1 || hasDuplicateCityName(city);

  if (shouldIncludeAdmin1 && admin1 && normalizeText(admin1) !== normalizeText(city.name)) {
    parts.push(admin1);
  }

  if (country && !parts.some((part) => normalizeText(part) === normalizeText(country))) {
    parts.push(country);
  }

  return parts.join(', ');
}

export function getTurkishCityDisplayName(
  city: Pick<City, 'slug' | 'name' | 'country' | 'admin1'>,
  options: TurkishLabelOptions = {},
) {
  const cityName = getTurkishCityName(city);
  const locationLabel = getTurkishCityLocationLabel(city, options);
  return locationLabel ? `${cityName}, ${locationLabel}` : cityName;
}

export function getTurkishPrayerName(name: string) {
  return prayerNameMap[name] ?? name;
}

export function getTurkishMoonPhase(name: string) {
  return moonPhaseMap[name] ?? name;
}

export function getTurkishCountryName(countryCode: string) {
  const normalizedCode = countryCode === 'UK' ? 'GB' : countryCode;

  try {
    const displayNames = new Intl.DisplayNames([turkishLocale], { type: 'region' });
    return displayNames.of(normalizedCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}

export function getTurkishRegionContent(region: {
  slug: string;
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}) {
  return turkishRegionContent[region.slug] ?? {
    description: region.description,
    intro: region.intro,
    audiences: region.audiences,
    reasons: region.reasons,
  };
}

export function getTurkishGuideContent(hub: {
  slug: string;
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}) {
  return turkishGuideContent[hub.slug] ?? {
    name: hub.name,
    description: hub.description,
    intro: hub.intro,
    primaryBullets: hub.primaryBullets,
    workflowBullets: hub.workflowBullets,
  };
}

export const turkishNavigation = {
  home: 'Ana Sayfa',
  search: 'Ara',
  cities: 'Şehirler',
  guides: 'Rehberler',
  faq: 'SSS',
  contact: 'İletişim',
  searchCity: 'Şehir ara',
  browseCities: 'Şehirleri gör',
  searchYourCity: 'Şehrini bul',
};

export const turkishFooter = {
  summary: 'Dünyadaki şehirler için gün doğumu, gün batımı, altın saat, ay evresi ve namaz vakitlerini tek arayüzden kontrol edin.',
  trustLinks: [
    { name: 'SunriseTime Hakkında', path: '/tr/about/' },
    { name: 'Metodoloji', path: '/tr/methodology/' },
    { name: 'Gizlilik', path: '/tr/privacy/' },
    { name: 'Şartlar', path: '/tr/terms/' },
    { name: 'İletişim', path: '/tr/contact/' },
    { name: 'Site Haritası', path: '/tr/sitemap/' },
  ],
  coreLinks: [
    { name: 'Şehir ara', path: '/tr/#search' },
    { name: 'Şehir dizini', path: '/tr/cities/' },
    { name: 'Rehberler', path: '/tr/guides/' },
    { name: 'Gün doğumu', path: '/tr/#top-cities' },
    { name: 'SSS', path: '/tr/#faq' },
  ],
};

export const turkishHomeFaqs = [
  {
    question: 'SunriseTime verileri ne kadar doğru?',
    answer: 'SunriseTime, gün doğumu, gün batımı, alacakaranlık ve altın saat hesaplarını günlük kullanım için yeterli doğrulukta üretmek üzere NOAA uyumlu güneş hesaplarını kullanır.',
  },
  {
    question: 'Her şehir sayfasında neler var?',
    answer: 'Her sayfa gün doğumu, gün batımı, gündüz süresi, yerel saat, altın saat, ay evresi ve namaz vakitlerine hızlı erişimi birlikte gösterir.',
  },
  {
    question: 'SunriseTime mobilde iyi çalışıyor mu?',
    answer: 'Evet. Amaç, ana cevabı küçük ekranda hızlıca göstermek ve kullanıcıyı gereksiz katmanlarla yormamaktır.',
  },
];
