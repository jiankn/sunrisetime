import { getCityAdminLabel, hasDuplicateCityName } from '@data/site';
import type { City } from '@data/site';
import { chineseCityAliasMapGenerated, chineseCityNameMapGenerated } from './chinese-city-data';

export const chineseLocale = 'zh-CN';
export const chineseLegalLastUpdated = '2026年3月24日';

const cityNameOverrides: Record<string, string> = {
  'adelaide': '阿德莱德',
  'almaty': '阿拉木图',
  'auckland': '奥克兰',
  'austin': '奥斯汀',
  'batam': '巴淡岛',
  'benxi': '本溪',
  'brussels': '布鲁塞尔',
  'calgary': '卡尔加里',
  'changde': '常德',
  'chelyabinsk': '车里雅宾斯克',
  'chiba': '千叶',
  'ciudad-juarez': '华雷斯城',
  'dnipro': '第聂伯罗',
  'dongying': '东营',
  'erbil': '埃尔比勒',
  'fushun': '抚顺',
  'gqeberha': '伊丽莎白港',
  'guatemala-city': '危地马拉城',
  'hue': '顺化',
  'jamshedpur': '詹谢普尔',
  'kathmandu': '加德满都',
  'kirkuk': '基尔库克',
  'koeln': '科隆',
  'laiwu': '莱芜',
  'nouakchott': '努瓦克肖特',
  'onitsha': '奥尼查',
  'ottawa': '渥太华',
  'pekanbaru': '北干巴鲁',
  'rabat': '拉巴特',
  'shiraz': '设拉子',
  'tangier': '丹吉尔',
  'tijuana': '蒂华纳',
  'tiruchirappalli': '蒂鲁吉拉帕利',
  'tirunelveli': '蒂鲁内尔维利',
  'tiruppur': '蒂鲁普',
  'touba': '图巴',
  'vancouver': '温哥华',
  'yekaterinburg': '叶卡捷琳堡',
  'yerevan': '埃里温',
};

const cityAliasOverrides: Record<string, string[]> = {
  'adelaide': ['阿德莱德'],
  'almaty': ['阿拉木图'],
  'auckland': ['奥克兰'],
  'austin': ['奥斯汀'],
  'brussels': ['布鲁塞尔'],
  'calgary': ['卡尔加里'],
  'dnipro': ['第聂伯罗'],
  'guatemala-city': ['危地马拉城', '危地马拉市'],
  'kathmandu': ['加德满都'],
  'koeln': ['科隆'],
  'nouakchott': ['努瓦克肖特'],
  'ottawa': ['渥太华'],
  'rabat': ['拉巴特'],
  'tangier': ['丹吉尔'],
  'tijuana': ['蒂华纳'],
  'vancouver': ['温哥华'],
  'yekaterinburg': ['叶卡捷琳堡'],
  'yerevan': ['埃里温'],
  'new-york': ['纽约市'],
  'los-angeles': ['洛城', '洛杉矶市'],
  'mexico-city': ['墨城', '墨西哥市'],
  'istanbul': ['伊城', '伊斯坦堡'],
  'cairo': ['开罗市'],
  'beijing': ['北京市'],
  'shanghai': ['上海市'],
  'london': ['伦敦市'],
  'tokyo': ['东京市'],
  'dubai': ['迪拜市'],
  'madrid': ['马德里市'],
  'bogota': ['波哥大市'],
  'buenos-aires': ['布宜诺斯艾利斯市'],
  'riyadh': ['利雅得市'],
  'jeddah': ['吉达市'],
  'makkah': ['麦加', '麦加圣城'],
  'mecca': ['麦加', '麦加圣城'],
};

const cityNameMap: Record<string, string> = {
  ...chineseCityNameMapGenerated,
  ...cityNameOverrides,
};

const admin1NameMap: Record<string, string> = {
  'Anhui': '安徽',
  'Fujian': '福建',
  'Jiangsu': '江苏',
  'Jiangxi': '江西',
  'Sindh': '信德省',
  'Telangana': '特伦甘纳邦',
  'Zhejiang': '浙江',
};

const regionNameMap: Record<string, string> = {
  'north-america': '北美洲',
  'south-america': '南美洲',
  'europe': '欧洲',
  'asia': '亚洲',
  'africa': '非洲',
  'oceania': '大洋洲',
};

const chineseRegionContent: Record<string, {
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}> = {
  'north-america': {
    description: '查看北美主要城市的日出时间、日落时间、黄金时刻、月相和礼拜时间。',
    intro: '如果你的行程会跨城市或跨时区，先从北美区域页比较天光变化，会比逐个搜索更省时间。',
    audiences: ['需要根据天亮时间安排出门的人', '在多个城市之间切换的旅行者', '重视晨光和晚霞窗口的摄影用户'],
    reasons: ['同一行程里常会跨城市、跨时区', '北美城市之间白昼长度差异明显', '从这里进入具体城市页会更直接'],
  },
  'south-america': {
    description: '浏览南美主要城市的日出日落时间、黄金时刻、月相与礼拜时间页面。',
    intro: '南美很多城市适合一起比较，尤其是旅行、转场和拍摄时，先看区域页会更方便。',
    audiences: ['安排行程和转场时间的旅行者', '想抓清晨或傍晚光线的内容创作者', '需要同时对比几座城市白昼变化的用户'],
    reasons: ['可以一次比较多座城市的白昼变化', '热门城市入口都集中在同一个页面里', '适合先选城市，再进入详细页面'],
  },
  'europe': {
    description: '比较欧洲热门城市的日出时间、日落时间、月相、日照时长和礼拜时间。',
    intro: '欧洲南北跨度大，白昼长度和黄金时刻差异很明显，区域页特别适合做横向比较。',
    audiences: ['安排城市游起止时间的用户', '对比南北欧光线差异的摄影用户', '想从区域入口进入城市页的搜索用户'],
    reasons: ['同一天里不同城市的天光差异很容易看出来', '适合提前安排出发、观景和拍摄时间', '可以顺着区域页快速跳到具体城市'],
  },
  'asia': {
    description: '查找亚洲主要城市的日出日落时间、黄金时刻、月相和礼拜时间。',
    intro: '亚洲城市密集、时区变化多，很多用户也会同时关心日出日落和礼拜时间，因此适合从区域页开始查。',
    audiences: ['每天出门前先查日出日落的人', '多城市行程中的中转旅客', '同一流程里既要看日出又要看礼拜时间的用户'],
    reasons: ['热门城市多，适合一次比较多个目的地', '礼拜时间和天光信息经常需要一起看', '从区域页进入城市页会更快找到目标城市'],
  },
  'africa': {
    description: '从非洲区域页统一进入主要城市的日出、日落、月相与礼拜时间页面。',
    intro: '如果你想比较礼拜安排、通勤节奏或旅行中的白昼时间，非洲区域页会是一个顺手的入口。',
    audiences: ['按礼拜或出行节奏安排时间的人', '跨北非、东非和南非路线的旅行者', '对比不同气候带光照条件的用户'],
    reasons: ['可以顺手比较不同地区的日出和日落节奏', '礼拜时间需求和城市时间查询经常会一起出现', '很多不那么热门的城市也能从这里快速找到'],
  },
  'oceania': {
    description: '查看大洋洲核心城市的日出日落、日照时长、黄金时刻和月相信息。',
    intro: '大洋洲城市不算特别多，但旅行、摄影和户外活动都很依赖白昼和黄金时刻，区域页更适合先做比较。',
    audiences: ['按清晨和傍晚安排拍摄的人', '对比澳洲东海岸和新西兰白昼差异的旅行者', '按天光窗口安排户外活动的用户'],
    reasons: ['可以先比清晨和傍晚的光线窗口', '适合安排行程里的户外活动时间', '从区域页跳到具体城市页很方便'],
  },
};

const chineseGuideContent: Record<string, {
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}> = {
  'golden-hour': {
    name: '黄金时刻',
    description: '查找今天最适合安排黄金时刻拍摄的城市，并快速比较暖光窗口。',
    intro: '如果你关心拍摄、散步或观景时的光线，先看黄金时刻页，再进入具体城市页会更直接。',
    primaryBullets: ['先看今天黄金时刻大致落在什么时候', '快速比较不同城市的晨光和晚霞时间', '从主题页直接进入具体城市的实时页面'],
    workflowBullets: ['先选你要去的城市', '进入城市页确认日出、日落和黄金时刻', '需要比较多个地点时再看区域页'],
  },
  'moon-phase': {
    name: '月相',
    description: '通过月相指南查看今天的月相名称、照明比例，并跳转到相关城市页面。',
    intro: '如果你关心今晚月亮的状态和夜间天光，先看月相页，再跳到具体城市页会更方便。',
    primaryBullets: ['查看今天属于哪一种月相', '顺手了解今晚的大致照明情况', '继续进入城市页看当地的日出日落和夜间时间信息'],
    workflowBullets: ['先看今天的月相名称和亮面比例', '再进入城市页查看本地时间数据', '需要比较不同地点时继续看区域页'],
  },
  'prayer-times': {
    name: '礼拜时间',
    description: '进入礼拜时间主题页，快速查看礼拜顺序、下一次礼拜和对应城市页面。',
    intro: '如果你需要按当天礼拜安排时间，这里会先帮你判断该看哪座城市，再进入完整时间表。',
    primaryBullets: ['把今天的礼拜顺序和下一次礼拜放在一起看', '同时查看与礼拜相关的日出和日落时间', '按穆斯林世界联盟（MWL）标准计算'],
    workflowBullets: ['先进入你当前所在或即将前往的城市', '确认今天的礼拜顺序和下一次礼拜', '要比较多个地点时再继续看区域页'],
  },
  'daylight-length': {
    name: '日照时长',
    description: '比较不同城市今天有多少可用日照时间，再进入日出日落页理解差异。',
    intro: '如果你想知道白天有多长，或者比较不同城市的白昼差异，这页会更适合先看。',
    primaryBullets: ['一眼看出哪座城市今天白天更长', '理解日出和日落如何共同决定日照时长', '按区域比较相近城市会更省力'],
    workflowBullets: ['先看大致比较方向', '再打开城市页确认具体时间', '需要更多对比时继续浏览区域页'],
  },
};

const prayerNameMap: Record<string, string> = {
  Fajr: '晨礼',
  Sunrise: '日出',
  Dhuhr: '晌礼',
  Asr: '晡礼',
  Maghrib: '昏礼',
  Isha: '宵礼',
};

const moonPhaseMap: Record<string, string> = {
  'New Moon': '新月',
  'Waxing Crescent': '娥眉月',
  'First Quarter': '上弦月',
  'Waxing Gibbous': '盈凸月',
  'Full Moon': '满月',
  'Waning Gibbous': '亏凸月',
  'Last Quarter': '下弦月',
  'Waning Crescent': '残月',
};

const traditionalToSimplifiedMap: Record<string, string> = {
  '奧': '奥',
  '圖': '图',
  '渓': '溪',
  '車': '车',
  '營': '营',
  '順': '顺',
  '華': '华',
  '庫': '库',
  '會': '会',
  '區': '区',
  '葉': '叶',
  '魯': '鲁',
  '蕪': '芜',
  '設': '设',
  '竜': '龙',
  '關': '关',
  '臺': '台',
  '濟': '济',
  '幾': '几',
  '廣': '广',
  '穌': '稣',
  '龜': '龟',
  '萊': '莱',
  '盧': '卢',
  '烏': '乌',
  '邁': '迈',
  '羅': '罗',
  '維': '维',
  '薩': '萨',
  '麗': '丽',
  '蘭': '兰',
  '約': '约',
  '達': '达',
  '門': '门',
  '爾': '尔',
  '內': '内',
  '來': '来',
};

function normalizeChineseWriting(value: string) {
  return Array.from(value, (char) => traditionalToSimplifiedMap[char] ?? char).join('');
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function getChineseCityName(city: Pick<City, 'slug' | 'name'>) {
  return normalizeChineseWriting(cityNameMap[city.slug] ?? city.name);
}

export function getChineseCityAliases(city: Pick<City, 'slug' | 'aliases'>) {
  const aliases = [
    ...(cityAliasOverrides[city.slug] ?? []),
    ...(chineseCityAliasMapGenerated[city.slug] ?? []),
    ...(city.aliases ?? []),
  ];
  const seen = new Set<string>();

  return aliases.filter((alias) => {
    const normalizedAlias = normalizeChineseWriting(alias);
    const key = normalizeText(normalizedAlias);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).map((alias) => normalizeChineseWriting(alias));
}

export function getChineseAdmin1Name(admin1?: string) {
  if (!admin1) return '';
  return normalizeChineseWriting(admin1NameMap[admin1] ?? admin1);
}

export function getChineseCountryName(countryCode: string) {
  const normalizedCode = countryCode === 'UK' ? 'GB' : countryCode;

  try {
    const displayNames = new Intl.DisplayNames([chineseLocale], { type: 'region' });
    return normalizeChineseWriting(displayNames.of(normalizedCode) ?? countryCode);
  } catch {
    return countryCode;
  }
}

type ChineseLabelOptions = {
  includeAdmin1?: boolean;
};

export function getChineseCityLocationLabel(
  city: Pick<City, 'name' | 'country' | 'admin1'>,
  options: ChineseLabelOptions = {},
) {
  const parts: string[] = [];
  const admin1 = getChineseAdmin1Name(getCityAdminLabel(city));
  const country = getChineseCountryName(city.country);
  const shouldIncludeAdmin1 = options.includeAdmin1 || hasDuplicateCityName(city);

  if (shouldIncludeAdmin1 && admin1 && normalizeText(admin1) !== normalizeText(city.name)) {
    parts.push(admin1);
  }

  if (country && !parts.some((part) => normalizeText(part) === normalizeText(country))) {
    parts.push(country);
  }

  return parts.join('，');
}

export function getChineseCityDisplayName(
  city: Pick<City, 'slug' | 'name' | 'country' | 'admin1'>,
  options: ChineseLabelOptions = {},
) {
  const cityName = getChineseCityName(city);
  const locationLabel = getChineseCityLocationLabel(city, options);
  return locationLabel ? `${cityName}，${locationLabel}` : cityName;
}

export function getChineseTimezoneLabel(timezone: string, date = new Date()) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: 'shortOffset',
      hour: '2-digit',
    });
    const value = formatter.formatToParts(date).find((part) => part.type === 'timeZoneName')?.value ?? '';
    if (value === 'GMT') return 'UTC+00:00';

    const match = value.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
    if (match) {
      const [, sign, hours, minutes] = match;
      return `UTC${sign}${hours.padStart(2, '0')}:${(minutes ?? '00').padStart(2, '0')}`;
    }
  } catch {
    // Fall back to the raw timezone id when Intl cannot resolve the label.
  }

  return timezone;
}

export function formatChineseDuration(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}小时${minutes.toString().padStart(2, '0')}分钟`;
}

export function getChineseRegionName(regionSlug: string, fallbackName: string) {
  return regionNameMap[regionSlug] ?? fallbackName;
}

export function getChineseRegionContent(region: {
  slug: string;
  description: string;
  intro: string;
  audiences: string[];
  reasons: string[];
}) {
  return chineseRegionContent[region.slug] ?? {
    description: region.description,
    intro: region.intro,
    audiences: region.audiences,
    reasons: region.reasons,
  };
}

export function getChineseGuideContent(hub: {
  slug: string;
  name: string;
  description: string;
  intro: string;
  primaryBullets: string[];
  workflowBullets: string[];
}) {
  return chineseGuideContent[hub.slug] ?? {
    name: hub.name,
    description: hub.description,
    intro: hub.intro,
    primaryBullets: hub.primaryBullets,
    workflowBullets: hub.workflowBullets,
  };
}

export function getChinesePrayerName(name: string) {
  return prayerNameMap[name] ?? name;
}

export function getChineseMoonPhase(name: string) {
  return moonPhaseMap[name] ?? name;
}

export const chineseNavigation = {
  home: '首页',
  search: '搜索',
  cities: '城市',
  guides: '指南',
  faq: '常见问题',
  contact: '联系',
  searchCity: '搜索城市',
  browseCities: '浏览城市',
  searchYourCity: '查找你的城市',
};

export const chineseFooter = {
  summary: '用简体中文快速查看全球城市今天的日出时间、日落时间、黄金时刻、月相和礼拜时间。',
  trustLinks: [
    { name: '关于 SunriseTime', path: '/zh-cn/about/' },
    { name: '方法说明', path: '/zh-cn/methodology/' },
    { name: '隐私政策', path: '/zh-cn/privacy/' },
    { name: '使用条款', path: '/zh-cn/terms/' },
    { name: '联系我们', path: '/zh-cn/contact/' },
    { name: '站点地图', path: '/zh-cn/sitemap/' },
  ],
  coreLinks: [
    { name: '搜索城市', path: '/zh-cn/#search' },
    { name: '城市索引', path: '/zh-cn/cities/' },
    { name: '主题指南', path: '/zh-cn/guides/' },
    { name: '常见问题', path: '/zh-cn/#faq' },
  ],
  bottomNote: '从首页搜索城市，或继续浏览城市索引、主题指南和方法说明。',
};

export const chineseHomeFaqs = [
  {
    question: '可以直接搜中文城市名吗？',
    answer: '可以。中文首页支持直接输入常见中文城市名，也兼容不少英文写法和常见别名，找到后可以直接进入对应页面。',
  },
  {
    question: '为什么有些城市后面会带州、省或地区？',
    answer: '少数城市在不同国家或地区会重名。为了避免点错页面，我们会在必要时补上州、省或地区名称帮助你区分。',
  },
  {
    question: '除了日出日落，还能看到什么？',
    answer: '城市页还会提供日照时长、黄金时刻、月相和礼拜时间入口，方便你一次把当天常用的时间信息看全。',
  },
];
