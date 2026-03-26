import { getCityAdminLabel, hasDuplicateCityName } from '@data/site';
import type { City } from '@data/site';

export const arabicLocale = 'ar';
export const arabicLegalLastUpdated = '24 مارس 2026';

const cityNameMap: Record<string, string> = {
  'new-york': 'نيويورك',
  'los-angeles': 'لوس أنجلوس',
  'mexico-city': 'مكسيكو سيتي',
  'istanbul': 'إسطنبول',
  'mumbai': 'مومباي',
  'cairo': 'القاهرة',
  'cape-town': 'كيب تاون',
  'beijing': 'بكين',
  'shanghai': 'شنغهاي',
  'kuala-lumpur': 'كوالالمبور',
  'vienna': 'فيينا',
  'warsaw': 'وارسو',
  'bogota': 'بوغوتا',
  'athens': 'أثينا',
  'stockholm': 'ستوكهولم',
  'moscow': 'موسكو',
  'sao-paulo': 'ساو باولو',
  'london': 'لندن',
  'tokyo': 'طوكيو',
  'dubai': 'دبي',
  'madrid': 'مدريد',
  'buenos-aires': 'بوينس آيرس',
  'toronto': 'تورونتو',
  'paris': 'باريس',
  'berlin': 'برلين',
  'rome': 'روما',
  'jakarta': 'جاكرتا',
  'riyadh': 'الرياض',
  'jeddah': 'جدة',
  'singapore': 'سنغافورة',
  'sydney': 'سيدني',
};

const cityAliasMap: Record<string, string[]> = {
  'new-york': ['نيويورك'],
  'los-angeles': ['لوس انجليس', 'لوس أنجلوس'],
  'mexico-city': ['مكسيكو', 'مدينة مكسيكو'],
  'istanbul': ['اسطنبول', 'إسطنبول'],
  'cairo': ['القاهرة'],
  'beijing': ['بكين'],
  'shanghai': ['شنغهاي'],
  'london': ['لندن'],
  'tokyo': ['طوكيو'],
  'dubai': ['دبي'],
  'madrid': ['مدريد'],
  'bogota': ['بوغوتا'],
  'buenos-aires': ['بوينس آيرس'],
  'riyadh': ['الرياض'],
  'jeddah': ['جدة'],
  'makkah': ['مكة', 'مكه'],
};

const regionNameMap: Record<string, string> = {
  'north-america': 'أمريكا الشمالية',
  'south-america': 'أمريكا الجنوبية',
  'europe': 'أوروبا',
  'asia': 'آسيا',
  'africa': 'أفريقيا',
  'oceania': 'أوقيانوسيا',
};

const arabicRegionContent: Record<string, {
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}> = {
  'north-america': {
    description: 'تصفّح صفحات الشروق والغروب والساعة الذهبية والقمر ومواقيت الصلاة في أبرز مدن أمريكا الشمالية.',
    intro: 'تجمع أمريكا الشمالية بين فروق التوقيت الكبيرة والمدن الساحلية والداخلية وتغيّر الضوء بشكل واضح بين الشرق والغرب، لذلك تعمل جيدًا كصفحة مقارنة إقليمية.',
    audiences: ['الأشخاص الذين ينظمون خروجهم اليومي على أول ضوء', 'المسافرون الذين يقارنون بين عدة مدن ومناطق زمنية', 'المصورون الذين يطاردون أمسيات الصيف الطويلة والساعة الذهبية'],
    reasons: ['الفروق بين السواحل تغيّر فعليًا وقت الخروج والتصوير', 'المدن الكبرى في هذا الإقليم تملك طلبًا بحثيًا متكررًا', 'الربط الداخلي بين مدن مترابطة يرفع فائدة التصفح للمستخدم ومحركات البحث'],
  },
  'south-america': {
    description: 'استكشف صفحات الشروق والغروب والنهار والساعة الذهبية والقمر للمدن الرئيسية في أمريكا الجنوبية.',
    intro: 'مدن أمريكا الجنوبية مفيدة للمقارنة لأنها تجمع عواصم كبيرة ورحلات متعددة وتغيّرًا موسميًا واضحًا في طول النهار.',
    audiences: ['المسافرون الذين ينسقون بين الوصول والمغادرة والجولات', 'المنشئون الذين يبحثون عن ضوء دافئ في الفجر أو الغروب', 'القراء الذين يريدون مقارنة عدة مدن ضمن رحلة واحدة'],
    reasons: ['التجميع الإقليمي يختصر المقارنة بين مدن ودول متجاورة', 'العواصم الكبرى تعمل كصفحات هبوط دائمة وعالية النية', 'الإقليم يقود الزائر من صفحة عامة إلى عدة صفحات مدينة مرتبطة بدل الاكتفاء بنقرة واحدة'],
  },
  'europe': {
    description: 'قارن بين الشروق والغروب ومرحلة القمر وطول النهار ومواقيت الصلاة في أكثر مدن أوروبا بحثًا.',
    intro: 'أوروبا مناسبة جدًا للتصفح المقارن، لأن المدن القريبة قد تختلف بشكل ملحوظ في الشروق والشفق وطول النهار حسب خط العرض والفصل.',
    audiences: ['مسافرو عطلات المدن الذين يخططون يومهم بدقة أكبر', 'المصورون الذين يقارنون تغيّر الضوء بين الشمال والجنوب', 'المستخدمون الذين يفضلون صفحة إقليمية قبل الدخول في كل مدينة على حدة'],
    reasons: ['التباين بين شمال أوروبا وجنوبها ينتج فروق ضوء واضحة', 'كثير من نية البحث تبدأ على مستوى الإقليم وليس المدينة فقط', 'صفحة أوروبية قوية تنقل الزيارات إلى عدد كبير من صفحات المدن الكثيفة'],
  },
  'asia': {
    description: 'اعثر على الشروق والغروب والساعة الذهبية ومرحلة القمر ومواقيت الصلاة في المدن الكبرى عبر آسيا.',
    intro: 'آسيا تجمع مدنًا ضخمة ومناطق زمنية كثيرة وحاجة يومية عالية للأسئلة الزمنية، لذلك تعد من أقوى الأقاليم لبحث المدينة المتكرر.',
    audiences: ['الأشخاص الذين يراجعون نافذة الضوء التالية قبل الخروج', 'المسافرون الذين يقارنون بين عدة توقفات في رحلة واحدة', 'المستخدمون الذين يحتاجون الشروق ومواقيت الصلاة في نفس التدفق'],
    reasons: ['الأسئلة اليومية حول التوقيت تتكرر بقوة في هذا الإقليم', 'تكتلات المدن الكبرى تجعل التنقل بين الصفحات المرتبطة أكثر قيمة', 'النية المرتبطة بالشروق والصلاة تلتقي طبيعيًا داخل آسيا'],
  },
  'africa': {
    description: 'راجع صفحات الشروق والغروب والقمر والصلاة للمدن الرئيسية في أفريقيا من مركز إقليمي واحد.',
    intro: 'الصفحات الأفريقية مفيدة عندما يحتاج المستخدم إلى توقيت يومي سريع للعمل أو الصلاة أو السفر أو التصوير بين مراكز حضرية متعددة.',
    audiences: ['الأشخاص الذين ينظمون الصلاة أو التنقل أو العمل الخارجي', 'المسافرون الذين يتحركون بين شمال أفريقيا وشرقها وجنوبها', 'القراء الذين يقارنون ظروف الضوء بين مناخات مختلفة'],
    reasons: ['التصفح الإقليمي يحسن اكتشاف المدن التي لا تكون دائمًا أول عملية بحث', 'الإقليم يرتبط بقوة مع نية مواقيت الصلاة', 'اكتمال مركز أفريقيا يقوي هندسة الموقع للمستخدمين والزواحف'],
  },
  'oceania': {
    description: 'تحقق من صفحات الشروق والغروب وطول النهار والساعة الذهبية للمدن الأساسية في أوقيانوسيا.',
    intro: 'أوقيانوسيا أقل عددًا في المدن المفهرسة، لكنها عالية القيمة للتخطيط الضوئي في السفر والطبيعة والتصوير عند الفجر أو الغروب.',
    audiences: ['المصورون الذين يضبطون جلساتهم على الفجر والغروب', 'المسافرون الذين يقارنون الساحل الشرقي الأسترالي ونيوزيلندا', 'المستخدمون الذين يخططون أنشطة خارجية حسب ضوء النهار'],
    reasons: ['المركز الصغير يسهّل الاكتشاف بدون ضوضاء', 'نية الساعة الذهبية وطول النهار قوية في هذا الإقليم', 'الصفحات الإقليمية الصغيرة تنقل المستخدم بسرعة إلى المدن المناسبة'],
  },
};

const arabicGuideContent: Record<string, {
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}> = {
  'golden-hour': {
    name: 'الساعة الذهبية',
    description: 'اعثر على المدن التي يسهل فيها التخطيط للساعة الذهبية اليوم وقارن نوافذ الضوء الدافئ قبل الخروج.',
    intro: 'نية البحث عن الساعة الذهبية تحتاج عادة إلى جواب سريع، ثم صفحة مدينة، ثم مقارنة إضافية أو اثنتين. لهذا فهي مساحة ممتازة للربط الداخلي المفيد.',
    primaryBullets: ['اعرف متى يبدأ وينتهي الضوء الدافئ الأكثر فائدة', 'قارن عدة مدن قبل الرحلة أو جلسة التصوير', 'انتقل من الموضوع العام إلى صفحات مدينة حية في خطوة واحدة'],
    workflowBullets: ['ابدأ بمدينة تعرفها بالفعل', 'افتح صفحتها لتأكيد الشروق والغروب ونافذة الضوء', 'استخدم المدن القريبة والمراكز الإقليمية لمواصلة المقارنة'],
  },
  'moon-phase': {
    name: 'مرحلة القمر',
    description: 'استخدم دليل مرحلة القمر لمقارنة الإضاءة واسم المرحلة وصفحات المدن التي تهم فيها بيانات القمر مع الشروق والغروب.',
    intro: 'غالبًا ما تأتي نية مرحلة القمر بجانب نية الشروق أو الغروب. من يخطط لرحلة أو تصوير أو نشاط ليلي يحتاج الإجابتين في الجلسة نفسها.',
    primaryBullets: ['راجع مرحلة القمر ونسبة الإضاءة مع جدول الشمس اليومي', 'اعثر على المدن التي يؤثر فيها طلوع القمر وغروبه على التخطيط', 'أبقِ أسئلة الفلك والتوقيت المرتبطة في تدفق واحد'],
    workflowBullets: ['استخدم الدليل لفهم الموضوع أولًا', 'افتح صفحة مدينة لرؤية التوقيت المحلي', 'قارن عدة مدن من خلال مركز إقليمي'],
  },
  'prayer-times': {
    name: 'مواقيت الصلاة',
    description: 'استكشف صفحات مواقيت الصلاة حيث يجتمع الشروق والغروب والصلاة التالية في مسار سريع واحد.',
    intro: 'نية مواقيت الصلاة عالية التكرار، لذلك يجب أن يقلل الدليل الاحتكاك ويشرح معيار الحساب ويرسل المستخدم إلى المدينة الصحيحة بأقل عدد من الخطوات.',
    primaryBullets: ['استخدم تدفقًا واحدًا للشروق والغروب والصلاة التالية', 'افتح صفحات مدينة بحساب افتراضي قائم على MWL', 'قارن المدن عند السفر أو تغيير الإقليم'],
    workflowBullets: ['ابدأ بالمدينة التي تحتاجها الآن', 'أكد ترتيب الصلوات والصلاة القادمة اليوم', 'استعمل المراكز الإقليمية عندما يتغير مسارك'],
  },
  'daylight-length': {
    name: 'طول النهار',
    description: 'قارن مقدار ضوء النهار المتاح اليوم بين المدن المختلفة ثم ادخل إلى صفحات الشروق والغروب لفهم هذا التغير.',
    intro: 'صفحات طول النهار مفيدة لمقارنة الوجهات والفصول والعادات اليومية بنظرة واحدة، كما أنها صفحات اكتشاف جيدة لأنها تدفع إلى زيارة عدة مدن.',
    primaryBullets: ['اكتشف أين يكون النهار أطول أو أقصر في قائمتك', 'افهم كيف يغيّر الشروق والغروب مقدار الضوء الكلي', 'استخدم المراكز الإقليمية لمقارنة المدن القريبة بكلفة أقل'],
    workflowBullets: ['افتح الدليل أولًا لإطار المقارنة', 'ادخل إلى صفحات المدن لمعرفة الأوقات الدقيقة', 'واصل التصفح عبر الأقاليم بدل إعادة البحث من البداية'],
  },
};

const prayerNameMap: Record<string, string> = {
  Fajr: 'الفجر',
  Sunrise: 'الشروق',
  Dhuhr: 'الظهر',
  Asr: 'العصر',
  Maghrib: 'المغرب',
  Isha: 'العشاء',
};

const moonPhaseMap: Record<string, string> = {
  'New Moon': 'محاق',
  'Waxing Crescent': 'هلال متزايد',
  'First Quarter': 'التربيع الأول',
  'Waxing Gibbous': 'أحدب متزايد',
  'Full Moon': 'بدر',
  'Waning Gibbous': 'أحدب متناقص',
  'Last Quarter': 'التربيع الأخير',
  'Waning Crescent': 'هلال متناقص',
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function getArabicCityName(city: Pick<City, 'slug' | 'name'>) {
  return cityNameMap[city.slug] ?? city.name;
}

export function getArabicCityAliases(city: Pick<City, 'slug' | 'aliases'>) {
  const aliases = [...(cityAliasMap[city.slug] ?? []), ...(city.aliases ?? [])];
  const seen = new Set<string>();

  return aliases.filter((alias) => {
    const key = normalizeText(alias);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getArabicCountryName(countryCode: string) {
  const normalizedCode = countryCode === 'UK' ? 'GB' : countryCode;

  try {
    const displayNames = new Intl.DisplayNames([arabicLocale], { type: 'region' });
    return displayNames.of(normalizedCode) ?? countryCode;
  } catch {
    return countryCode;
  }
}

type ArabicLabelOptions = {
  includeAdmin1?: boolean;
};

export function getArabicCityLocationLabel(
  city: Pick<City, 'name' | 'country' | 'admin1'>,
  options: ArabicLabelOptions = {},
) {
  const parts: string[] = [];
  const admin1 = getCityAdminLabel(city);
  const country = getArabicCountryName(city.country);
  const shouldIncludeAdmin1 = options.includeAdmin1 || hasDuplicateCityName(city);

  if (shouldIncludeAdmin1 && admin1 && normalizeText(admin1) !== normalizeText(city.name)) {
    parts.push(admin1);
  }

  if (country && !parts.some((part) => normalizeText(part) === normalizeText(country))) {
    parts.push(country);
  }

  return parts.join('، ');
}

export function getArabicCityDisplayName(
  city: Pick<City, 'slug' | 'name' | 'country' | 'admin1'>,
  options: ArabicLabelOptions = {},
) {
  const cityName = getArabicCityName(city);
  const locationLabel = getArabicCityLocationLabel(city, options);
  return locationLabel ? `${cityName}، ${locationLabel}` : cityName;
}

export function getArabicRegionName(regionSlug: string, fallbackName: string) {
  return regionNameMap[regionSlug] ?? fallbackName;
}

export function getArabicRegionContent(region: {
  slug: string;
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}) {
  return arabicRegionContent[region.slug] ?? {
    description: region.description,
    intro: region.intro,
    audiences: region.audiences,
    reasons: region.reasons,
  };
}

export function getArabicGuideContent(hub: {
  slug: string;
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}) {
  return arabicGuideContent[hub.slug] ?? {
    name: hub.name,
    description: hub.description,
    intro: hub.intro,
    primaryBullets: hub.primaryBullets,
    workflowBullets: hub.workflowBullets,
  };
}

export function getArabicPrayerName(name: string) {
  return prayerNameMap[name] ?? name;
}

export function getArabicMoonPhase(name: string) {
  return moonPhaseMap[name] ?? name;
}

export const arabicNavigation = {
  home: 'الرئيسية',
  search: 'ابحث',
  cities: 'المدن',
  guides: 'الأدلة',
  faq: 'الأسئلة الشائعة',
  contact: 'تواصل',
  searchCity: 'ابحث عن مدينة',
  browseCities: 'تصفح المدن',
  searchYourCity: 'ابحث عن مدينتك',
};

export const arabicFooter = {
  summary: 'اعرف وقت الشروق والغروب والساعة الذهبية ومرحلة القمر ومواقيت الصلاة من تجربة عربية مفهرسة تدعم الاتجاه من اليمين إلى اليسار.',
  trustLinks: [
    { name: 'عن SunriseTime', path: '/ar/about/' },
    { name: 'المنهجية', path: '/ar/methodology/' },
    { name: 'الخصوصية', path: '/ar/privacy/' },
    { name: 'الشروط', path: '/ar/terms/' },
    { name: 'اتصل بنا', path: '/ar/contact/' },
    { name: 'خريطة الموقع', path: '/ar/sitemap/' },
  ],
  coreLinks: [
    { name: 'ابحث عن مدينة', path: '/ar/#search' },
    { name: 'فهرس المدن', path: '/ar/cities/' },
    { name: 'الأدلة', path: '/ar/guides/' },
    { name: 'الأسئلة الشائعة', path: '/ar/#faq' },
  ],
  bottomNote: 'النسخة العربية الآن تشمل صفحات أساسية قابلة للفهرسة، ومراكز إقليمية، وأدلة استخدام، وطبقة RTL كاملة.',
};

export const arabicHomeFaqs = [
  {
    question: 'هل تدعم النسخة العربية الاتجاه من اليمين إلى اليسار؟',
    answer: 'نعم. الواجهة العربية مبنية مع دعم RTL في الهيكل الأساسي والتنقل والبحث والصفحات التفصيلية.',
  },
  {
    question: 'ماذا تتضمن النسخة العربية الحالية؟',
    answer: 'تشمل الصفحة الرئيسية، فهرس المدن، الصفحات الإقليمية، صفحات الشروق والغروب، مواقيت الصلاة، الأدلة، المنهجية، وصفحات الثقة الأساسية.',
  },
  {
    question: 'هل كل أسماء المدن مترجمة بالكامل؟',
    answer: 'ليس بعد. بعض المدن الشائعة مترجمة يدويًا، وبقية المدن تعرض بصيغتها المعروفة عالميًا إلى أن تكتمل طبقة الترجمة الموسعة.',
  },
];
