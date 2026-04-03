import type { EnabledLanguageCode } from '@i18n/config';

export type GoldenHourPageCopy = {
  languageCode: EnabledLanguageCode;
  lang: string;
  locale: string;
  dir?: 'ltr' | 'rtl';
  langPrefix?: string;
  breadcrumbHome: string;
  breadcrumbCities: string;
  pageTitle: (cityDisplayName: string) => string;
  pageDescription: (
    cityDisplayName: string,
    morningStart: string,
    morningEnd: string,
    eveningStart: string,
  ) => string;
  keywords: (cityDisplayName: string) => string;
  faqMorningQuestion: (cityName: string) => string;
  faqMorningAnswer: (cityName: string, start: string, end: string) => string;
  faqEveningQuestion: (cityName: string) => string;
  faqEveningAnswer: (cityName: string, start: string, end: string) => string;
  kicker: (cityName: string) => string;
  heading: (cityName: string) => string;
  lead: (localTime: string, nextLabel: string, countdown: string, nextTime: string) => string;
  browseCities: string;
  sunrisePage: string;
  prayerPage: string;
  nextMorningStarts: string;
  nextMorningEnds: string;
  nextEveningStarts: string;
  nextEveningEnds: string;
  nextTomorrowMorningStarts: string;
  nextMorningSupport: (start: string, end: string) => string;
  nextEveningSupport: (start: string, end: string) => string;
  nextTomorrowSupport: (start: string, end: string) => string;
  metricMorning: string;
  metricEvening: string;
  metricSunrise: string;
  metricSunset: string;
  metricDaylight: string;
  lightWindowsTitle: (cityName: string) => string;
  lightWindowsDescription: string;
  morningGoldenHour: string;
  eveningGoldenHour: string;
  startsLabel: string;
  endsLabel: string;
  durationLabel: string;
  twilightTitle: string;
  phaseLabel: string;
  dawnLabel: string;
  duskLabel: string;
  civilTwilight: string;
  nauticalTwilight: string;
  astronomicalTwilight: string;
  trendTitle: string;
  trendDescription: string;
  annualExtremesTitle: (year: number) => string;
  annualExtremesDescription: string;
  earliestSunrise: string;
  latestSunrise: string;
  earliestSunset: string;
  latestSunset: string;
  longestDay: string;
  shortestDay: string;
  dateLabel: string;
  seasonalTitle: string;
  seasonalDescription: string;
  checkpointLabel: string;
  sunriseLabel: string;
  sunsetLabel: string;
  daylightLabel: string;
  aboutTitle: (cityName: string) => string;
  aboutIntro: (cityName: string, sunrise: string, sunset: string, daylight: string) => string;
  aboutPhotography: (
    cityName: string,
    morningStart: string,
    morningEnd: string,
    eveningStart: string,
    eveningEnd: string,
  ) => string;
  aboutTwilight: (
    dawn: string,
    dusk: string,
    nauticalDawn: string,
    nauticalDusk: string,
  ) => string;
  aboutLocalClock: (cityName: string, localDate: string, localTime: string, timezone: string) => string;
  nearbyTitle: (cityName: string) => string;
  nearbyDescription: string;
  moreCitiesToCompare: string;
  browseAllCities: string;
  formatDuration: (minutes: number) => string;
  formatHours: (hours: number) => string;
  translateSeasonalLabel: (label: string) => string;
};

function createLatinDurationFormatter(
  locale: string,
  hourLabel: string,
  minuteLabel: string,
): (minutes: number) => string {
  return (minutes: number) => {
    const totalMinutes = Math.max(1, Math.round(minutes));
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const number = new Intl.NumberFormat(locale);

    if (hours && mins) {
      return `${number.format(hours)} ${hourLabel} ${number.format(mins)} ${minuteLabel}`;
    }

    if (hours) {
      return `${number.format(hours)} ${hourLabel}`;
    }

    return `${number.format(mins)} ${minuteLabel}`;
  };
}

function createChineseDurationFormatter() {
  return (minutes: number) => {
    const totalMinutes = Math.max(1, Math.round(minutes));
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hours && mins) return `${hours}小时${mins}分钟`;
    if (hours) return `${hours}小时`;
    return `${mins}分钟`;
  };
}

function createArabicDurationFormatter() {
  return (minutes: number) => {
    const totalMinutes = Math.max(1, Math.round(minutes));
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    if (hours && mins) return `${hours} س ${mins} د`;
    if (hours) return `${hours} س`;
    return `${mins} د`;
  };
}

function createHoursFormatter(locale: string, unit: string) {
  const number = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (hours: number) => `${number.format(hours)}${unit}`;
}

function createSeasonalLabelTranslator(labels: Record<string, string>) {
  return (label: string) => labels[label] ?? label;
}

const spanishDuration = createLatinDurationFormatter('es-ES', 'h', 'min');
const frenchDuration = createLatinDurationFormatter('fr-FR', 'h', 'min');
const turkishDuration = createLatinDurationFormatter('tr-TR', 'sa', 'dk');
const arabicDuration = createArabicDurationFormatter();
const chineseDuration = createChineseDurationFormatter();

export const spanishGoldenHourCopy: GoldenHourPageCopy = {
  languageCode: 'es',
  lang: 'es',
  locale: 'es-ES',
  breadcrumbHome: 'Inicio',
  breadcrumbCities: 'Ciudades',
  pageTitle: (cityDisplayName) => `Hora dorada y hora azul en ${cityDisplayName} hoy`,
  pageDescription: (cityDisplayName, morningStart, morningEnd, eveningStart) =>
    `La hora dorada de la manana en ${cityDisplayName} va de ${morningStart} a ${morningEnd}. La franja de la tarde empieza a las ${eveningStart}.`,
  keywords: (cityDisplayName) =>
    `hora dorada ${cityDisplayName}, hora azul ${cityDisplayName}, fotografia ${cityDisplayName}`,
  faqMorningQuestion: (cityName) => `?Cuando es la hora dorada de la manana en ${cityName} hoy?`,
  faqMorningAnswer: (cityName, start, end) =>
    `La hora dorada de la manana en ${cityName} hoy va de ${start} a ${end}.`,
  faqEveningQuestion: (cityName) => `?Cuando empieza la hora dorada de la tarde en ${cityName} hoy?`,
  faqEveningAnswer: (cityName, start, end) =>
    `La hora dorada de la tarde en ${cityName} hoy va de ${start} a ${end}.`,
  kicker: (cityName) => `Ventanas de luz para fotografiar en ${cityName}`,
  heading: (cityName) => `Hora dorada y crepusculo en ${cityName}`,
  lead: (localTime, nextLabel, countdown, nextTime) =>
    `La hora local es ${localTime}. ${nextLabel} ${countdown}, a las ${nextTime}.`,
  browseCities: 'Buscar otra ciudad',
  sunrisePage: 'Ver amanecer y atardecer',
  prayerPage: 'Ver horarios de oracion',
  nextMorningStarts: 'La proxima hora dorada de la manana empieza en',
  nextMorningEnds: 'La hora dorada de la manana termina en',
  nextEveningStarts: 'La hora dorada de la tarde empieza en',
  nextEveningEnds: 'La hora dorada de la tarde termina en',
  nextTomorrowMorningStarts: 'La hora dorada de manana por la manana empieza en',
  nextMorningSupport: (start, end) => `La franja de la manana va de ${start} a ${end}.`,
  nextEveningSupport: (start, end) => `La franja de la tarde va de ${start} a ${end}.`,
  nextTomorrowSupport: (start, end) => `La primera ventana de manana va de ${start} a ${end}.`,
  metricMorning: 'Hora dorada manana',
  metricEvening: 'Hora dorada tarde',
  metricSunrise: 'Amanecer',
  metricSunset: 'Atardecer',
  metricDaylight: 'Luz del dia',
  lightWindowsTitle: (cityName) => `Ventanas de luz de hoy en ${cityName}`,
  lightWindowsDescription: 'Empieza por las franjas que realmente cambian una salida, una sesion o un plan al aire libre.',
  morningGoldenHour: 'Hora dorada de la manana',
  eveningGoldenHour: 'Hora dorada de la tarde',
  startsLabel: 'Empieza',
  endsLabel: 'Termina',
  durationLabel: 'Duracion',
  twilightTitle: 'Crepusculos',
  phaseLabel: 'Fase',
  dawnLabel: 'Inicio',
  duskLabel: 'Fin',
  civilTwilight: 'Crepusculo civil',
  nauticalTwilight: 'Crepusculo nautico',
  astronomicalTwilight: 'Crepusculo astronomico',
  trendTitle: 'Tendencia de luz y extremos del ano',
  trendDescription: 'La pagina es mas util cuando no solo responde hoy, sino tambien como se mueve la luz local a lo largo del ano.',
  annualExtremesTitle: (year) => `Extremos de luz de ${year}`,
  annualExtremesDescription: 'Estos puntos resumen los limites reales del ano para amanecer, atardecer y duracion del dia.',
  earliestSunrise: 'Amanecer mas temprano',
  latestSunrise: 'Amanecer mas tarde',
  earliestSunset: 'Atardecer mas temprano',
  latestSunset: 'Atardecer mas tarde',
  longestDay: 'Dia mas largo',
  shortestDay: 'Dia mas corto',
  dateLabel: 'Fecha',
  seasonalTitle: 'Puntos de control estacionales',
  seasonalDescription: 'Estas cuatro fechas hacen que la evolucion anual sea mas facil de leer que una lista diaria.',
  checkpointLabel: 'Referencia',
  sunriseLabel: 'Amanecer',
  sunsetLabel: 'Atardecer',
  daylightLabel: 'Luz del dia',
  aboutTitle: (cityName) => `Como leer la hora dorada en ${cityName}`,
  aboutIntro: (cityName, sunrise, sunset, daylight) =>
    `Hoy en ${cityName}, el amanecer es a las ${sunrise} y el atardecer a las ${sunset}, con ${daylight} de luz util. Esto es el marco base para decidir si la mejor ventana cae antes o despues del trabajo, de una visita o de una sesion.`,
  aboutPhotography: (cityName, morningStart, morningEnd, eveningStart, eveningEnd) =>
    `La hora dorada de la manana en ${cityName} va de ${morningStart} a ${morningEnd}. La de la tarde va de ${eveningStart} a ${eveningEnd}. Son las franjas mas utiles para retrato, paisaje urbano y video cuando buscas una luz mas suave y calida.`,
  aboutTwilight: (dawn, dusk, nauticalDawn, nauticalDusk) =>
    `El crepusculo civil abre antes del amanecer a las ${dawn} y sigue despues del atardecer hasta las ${dusk}. Si necesitas una escena mas fria o azul, las referencias nauticas de ${nauticalDawn} y ${nauticalDusk} ayudan a saber cuando la luz deja de ser realmente aprovechable.`,
  aboutLocalClock: (cityName, localDate, localTime, timezone) =>
    `Todo se muestra en la hora local de ${cityName}: ${localDate}, ${localTime}, zona ${timezone}. Eso evita errores al comparar ciudades o al preparar una salida mientras viajas.`,
  nearbyTitle: (cityName) => `Comparar con ciudades cercanas a ${cityName}`,
  nearbyDescription: 'Despues de una ciudad, la siguiente accion mas util suele ser abrir otra cercana para comparar la misma ventana de luz.',
  moreCitiesToCompare: 'Mas ciudades para comparar',
  browseAllCities: 'Ver todas las ciudades',
  formatDuration: spanishDuration,
  formatHours: createHoursFormatter('es-ES', ' h'),
  translateSeasonalLabel: createSeasonalLabelTranslator({
    'March Equinox': 'Equinoccio de marzo',
    'June Solstice': 'Solsticio de junio',
    'September Equinox': 'Equinoccio de septiembre',
    'December Solstice': 'Solsticio de diciembre',
  }),
};

export const arabicGoldenHourCopy: GoldenHourPageCopy = {
  languageCode: 'ar',
  lang: 'ar',
  locale: 'ar',
  dir: 'rtl',
  breadcrumbHome: 'الرئيسية',
  breadcrumbCities: 'المدن',
  pageTitle: (cityDisplayName) => `الساعة الذهبية والساعة الزرقاء في ${cityDisplayName} اليوم`,
  pageDescription: (cityDisplayName, morningStart, morningEnd, eveningStart) =>
    `الساعة الذهبية الصباحية في ${cityDisplayName} تمتد من ${morningStart} إلى ${morningEnd}. وتبدأ نافذة المساء عند ${eveningStart}.`,
  keywords: (cityDisplayName) =>
    `الساعة الذهبية ${cityDisplayName}, الساعة الزرقاء ${cityDisplayName}, تصوير ${cityDisplayName}`,
  faqMorningQuestion: (cityName) => `متى تكون الساعة الذهبية الصباحية في ${cityName} اليوم؟`,
  faqMorningAnswer: (cityName, start, end) =>
    `الساعة الذهبية الصباحية في ${cityName} اليوم تمتد من ${start} إلى ${end}.`,
  faqEveningQuestion: (cityName) => `متى تبدأ الساعة الذهبية المسائية في ${cityName} اليوم؟`,
  faqEveningAnswer: (cityName, start, end) =>
    `الساعة الذهبية المسائية في ${cityName} اليوم تمتد من ${start} إلى ${end}.`,
  kicker: (cityName) => `نوافذ الضوء المناسبة للتصوير في ${cityName}`,
  heading: (cityName) => `الساعة الذهبية والشفق في ${cityName}`,
  lead: (localTime, nextLabel, countdown, nextTime) =>
    `الوقت المحلي الآن هو ${localTime}. ${nextLabel} ${countdown}، عند ${nextTime}.`,
  browseCities: 'ابحث عن مدينة أخرى',
  sunrisePage: 'عرض الشروق والغروب',
  prayerPage: 'عرض مواقيت الصلاة',
  nextMorningStarts: 'الساعة الذهبية الصباحية التالية تبدأ بعد',
  nextMorningEnds: 'الساعة الذهبية الصباحية تنتهي بعد',
  nextEveningStarts: 'الساعة الذهبية المسائية تبدأ بعد',
  nextEveningEnds: 'الساعة الذهبية المسائية تنتهي بعد',
  nextTomorrowMorningStarts: 'ساعة الغد الذهبية الصباحية تبدأ بعد',
  nextMorningSupport: (start, end) => `نافذة الصباح تمتد من ${start} إلى ${end}.`,
  nextEveningSupport: (start, end) => `نافذة المساء تمتد من ${start} إلى ${end}.`,
  nextTomorrowSupport: (start, end) => `أول نافذة غدًا تمتد من ${start} إلى ${end}.`,
  metricMorning: 'الساعة الذهبية صباحًا',
  metricEvening: 'الساعة الذهبية مساءً',
  metricSunrise: 'الشروق',
  metricSunset: 'الغروب',
  metricDaylight: 'مدة النهار',
  lightWindowsTitle: (cityName) => `نوافذ الضوء اليوم في ${cityName}`,
  lightWindowsDescription: 'ابدأ بالنوافذ التي تغيّر قرار الخروج أو التصوير فعلًا: الضوء الدافئ، الشفق، وطول النهار.',
  morningGoldenHour: 'الساعة الذهبية الصباحية',
  eveningGoldenHour: 'الساعة الذهبية المسائية',
  startsLabel: 'تبدأ',
  endsLabel: 'تنتهي',
  durationLabel: 'المدة',
  twilightTitle: 'مراحل الشفق',
  phaseLabel: 'المرحلة',
  dawnLabel: 'بداية',
  duskLabel: 'نهاية',
  civilTwilight: 'الشفق المدني',
  nauticalTwilight: 'الشفق البحري',
  astronomicalTwilight: 'الشفق الفلكي',
  trendTitle: 'اتجاه الضوء وحدوده السنوية',
  trendDescription: 'تزداد قيمة الصفحة عندما لا تكتفي بإجابة اليوم، بل توضح كيف تتحرك نوافذ الضوء محليًا عبر السنة.',
  annualExtremesTitle: (year) => `أقصى تغيرات الضوء في ${year}`,
  annualExtremesDescription: 'هذه النقاط تختصر حدود السنة الفعلية للشروق والغروب وطول النهار.',
  earliestSunrise: 'أبكر شروق',
  latestSunrise: 'أحدث شروق',
  earliestSunset: 'أبكر غروب',
  latestSunset: 'أحدث غروب',
  longestDay: 'أطول نهار',
  shortestDay: 'أقصر نهار',
  dateLabel: 'التاريخ',
  seasonalTitle: 'محطات موسمية',
  seasonalDescription: 'هذه التواريخ الأربع تجعل قراءة السنة أسهل من متابعة 365 يومًا منفصلًا.',
  checkpointLabel: 'المحطة',
  sunriseLabel: 'الشروق',
  sunsetLabel: 'الغروب',
  daylightLabel: 'النهار',
  aboutTitle: (cityName) => `كيف تقرأ الساعة الذهبية في ${cityName}`,
  aboutIntro: (cityName, sunrise, sunset, daylight) =>
    `اليوم في ${cityName} يكون الشروق عند ${sunrise} والغروب عند ${sunset}، مع ${daylight} من ضوء النهار. هذا هو الإطار الأساسي لتحديد ما إذا كانت أفضل نافذة قبل العمل أو بعده أو قبل التحرك للتصوير.`,
  aboutPhotography: (cityName, morningStart, morningEnd, eveningStart, eveningEnd) =>
    `تمتد الساعة الذهبية الصباحية في ${cityName} من ${morningStart} إلى ${morningEnd}، بينما تمتد نافذة المساء من ${eveningStart} إلى ${eveningEnd}. هذه هي الفترات الأكثر فائدة للبورتريه، والمشاهد الحضرية، والتصوير الخارجي عندما تريد ضوءًا أدفأ وأنعم.`,
  aboutTwilight: (dawn, dusk, nauticalDawn, nauticalDusk) =>
    `يبدأ الشفق المدني قبل الشروق عند ${dawn} ويستمر بعد الغروب حتى ${dusk}. وإذا كنت تريد ضوءًا أبرد أو أكثر زرقة، فإن مؤشري الشفق البحري عند ${nauticalDawn} و${nauticalDusk} يساعدانك على تقدير حدود الضوء القابل للاستخدام.`,
  aboutLocalClock: (cityName, localDate, localTime, timezone) =>
    `كل الأوقات هنا معروضة بالتوقيت المحلي في ${cityName}: ${localDate}، ${localTime}، ضمن المنطقة الزمنية ${timezone}. وهذا مهم عند المقارنة بين المدن أو عند التخطيط أثناء السفر.`,
  nearbyTitle: (cityName) => `قارن مع مدن قريبة من ${cityName}`,
  nearbyDescription: 'بعد معرفة مدينة واحدة، تكون الخطوة التالية المفيدة عادة هي فتح مدينة قريبة ومقارنة نافذة الضوء نفسها.',
  moreCitiesToCompare: 'مدن أخرى للمقارنة',
  browseAllCities: 'عرض جميع المدن',
  formatDuration: arabicDuration,
  formatHours: createHoursFormatter('ar', ' س'),
  translateSeasonalLabel: createSeasonalLabelTranslator({
    'March Equinox': 'اعتدال مارس',
    'June Solstice': 'انقلاب يونيو',
    'September Equinox': 'اعتدال سبتمبر',
    'December Solstice': 'انقلاب ديسمبر',
  }),
};

export const chineseGoldenHourCopy: GoldenHourPageCopy = {
  languageCode: 'zh-cn',
  lang: 'zh-CN',
  locale: 'zh-CN',
  langPrefix: '/zh-cn',
  breadcrumbHome: '首页',
  breadcrumbCities: '城市索引',
  pageTitle: (cityDisplayName) => `${cityDisplayName}今日黄金时刻与蓝调时刻`,
  pageDescription: (cityDisplayName, morningStart, morningEnd, eveningStart) =>
    `${cityDisplayName}今天早晨黄金时刻从 ${morningStart} 到 ${morningEnd}，傍晚黄金时刻从 ${eveningStart} 开始。`,
  keywords: (cityDisplayName) =>
    `${cityDisplayName} 黄金时刻, ${cityDisplayName} 蓝调时刻, ${cityDisplayName} 摄影时间`,
  faqMorningQuestion: (cityName) => `${cityName}今天早晨黄金时刻是什么时候？`,
  faqMorningAnswer: (cityName, start, end) =>
    `${cityName}今天早晨黄金时刻从 ${start} 到 ${end}。`,
  faqEveningQuestion: (cityName) => `${cityName}今天傍晚黄金时刻是什么时候开始？`,
  faqEveningAnswer: (cityName, start, end) =>
    `${cityName}今天傍晚黄金时刻从 ${start} 到 ${end}。`,
  kicker: (cityName) => `${cityName} 摄影光线窗口`,
  heading: (cityName) => `${cityName}的黄金时刻与暮光时间`,
  lead: (localTime, nextLabel, countdown, nextTime) =>
    `当前本地时间为 ${localTime}。${nextLabel}${countdown}，时间是 ${nextTime}。`,
  browseCities: '换一座城市',
  sunrisePage: '查看日出日落',
  prayerPage: '查看礼拜时间',
  nextMorningStarts: '下一次晨间黄金时刻开始还有',
  nextMorningEnds: '晨间黄金时刻结束还有',
  nextEveningStarts: '傍晚黄金时刻开始还有',
  nextEveningEnds: '傍晚黄金时刻结束还有',
  nextTomorrowMorningStarts: '明天晨间黄金时刻开始还有',
  nextMorningSupport: (start, end) => `今天早晨的黄金时刻窗口为 ${start} 到 ${end}。`,
  nextEveningSupport: (start, end) => `今天傍晚的黄金时刻窗口为 ${start} 到 ${end}。`,
  nextTomorrowSupport: (start, end) => `明天清晨的第一段黄金时刻为 ${start} 到 ${end}。`,
  metricMorning: '晨间黄金时刻',
  metricEvening: '傍晚黄金时刻',
  metricSunrise: '日出',
  metricSunset: '日落',
  metricDaylight: '白昼时长',
  lightWindowsTitle: (cityName) => `${cityName}今天的光线窗口`,
  lightWindowsDescription: '先看真正会影响出门、拍摄和行程安排的那几段光线：黄金时刻、暮光和白昼长度。',
  morningGoldenHour: '晨间黄金时刻',
  eveningGoldenHour: '傍晚黄金时刻',
  startsLabel: '开始',
  endsLabel: '结束',
  durationLabel: '持续时长',
  twilightTitle: '暮光阶段',
  phaseLabel: '阶段',
  dawnLabel: '开始',
  duskLabel: '结束',
  civilTwilight: '民用暮光',
  nauticalTwilight: '航海暮光',
  astronomicalTwilight: '天文暮光',
  trendTitle: '近期光线趋势与年度极值',
  trendDescription: '这页不只是回答今天，还要帮助你判断这一周和这一年里光线大致怎么变化。',
  annualExtremesTitle: (year) => `${year} 年度光线极值`,
  annualExtremesDescription: '把一年里最早和最晚的日出日落，以及最长和最短的白昼窗口一次看清。',
  earliestSunrise: '最早日出',
  latestSunrise: '最晚日出',
  earliestSunset: '最早日落',
  latestSunset: '最晚日落',
  longestDay: '白昼最长的一天',
  shortestDay: '白昼最短的一天',
  dateLabel: '日期',
  seasonalTitle: '季节对照点',
  seasonalDescription: '用四个关键日期快速理解全年天光变化，比逐天翻日历更直观。',
  checkpointLabel: '节点',
  sunriseLabel: '日出',
  sunsetLabel: '日落',
  daylightLabel: '白昼',
  aboutTitle: (cityName) => `如何阅读${cityName}的黄金时刻`,
  aboutIntro: (cityName, sunrise, sunset, daylight) =>
    `今天 ${cityName} 的日出时间为 ${sunrise}，日落时间为 ${sunset}，白昼约为 ${daylight}。这组基础时间决定了你是更适合在清晨出门，还是把拍摄和观景安排在傍晚。`,
  aboutPhotography: (cityName, morningStart, morningEnd, eveningStart, eveningEnd) =>
    `${cityName}今天早晨黄金时刻从 ${morningStart} 到 ${morningEnd}，傍晚黄金时刻从 ${eveningStart} 到 ${eveningEnd}。如果你想拍人像、街景或暖色天空，这两段通常是最值得先看的窗口。`,
  aboutTwilight: (dawn, dusk, nauticalDawn, nauticalDusk) =>
    `民用暮光从 ${dawn} 开始，并在日落后持续到 ${dusk}。如果你在意更偏冷色、偏蓝色的环境光，航海暮光的 ${nauticalDawn} 和 ${nauticalDusk} 也值得一起看。`,
  aboutLocalClock: (cityName, localDate, localTime, timezone) =>
    `本页所有时间都按 ${cityName} 当地时间显示：${localDate}，${localTime}，时区为 ${timezone}。跨城市比较时，先确认本地时间能避免最常见的误判。`,
  nearbyTitle: (cityName) => `继续比较${cityName}附近的城市`,
  nearbyDescription: '查完一座城市后，最常见的下一步就是打开附近城市，对比同一天的暖光窗口。',
  moreCitiesToCompare: '更多可比较城市',
  browseAllCities: '查看全部城市',
  formatDuration: chineseDuration,
  formatHours: createHoursFormatter('zh-CN', '小时'),
  translateSeasonalLabel: createSeasonalLabelTranslator({
    'March Equinox': '春分',
    'June Solstice': '夏至',
    'September Equinox': '秋分',
    'December Solstice': '冬至',
  }),
};

export const frenchGoldenHourCopy: GoldenHourPageCopy = {
  languageCode: 'fr',
  lang: 'fr',
  locale: 'fr-FR',
  breadcrumbHome: 'Accueil',
  breadcrumbCities: 'Villes',
  pageTitle: (cityDisplayName) => `Heure doree et heure bleue a ${cityDisplayName} aujourd hui`,
  pageDescription: (cityDisplayName, morningStart, morningEnd, eveningStart) =>
    `L heure doree du matin a ${cityDisplayName} va de ${morningStart} a ${morningEnd}. La fenetre du soir commence a ${eveningStart}.`,
  keywords: (cityDisplayName) =>
    `heure doree ${cityDisplayName}, heure bleue ${cityDisplayName}, photo ${cityDisplayName}`,
  faqMorningQuestion: (cityName) => `Quand a lieu l heure doree du matin a ${cityName} aujourd hui ?`,
  faqMorningAnswer: (cityName, start, end) =>
    `L heure doree du matin a ${cityName} aujourd hui va de ${start} a ${end}.`,
  faqEveningQuestion: (cityName) => `Quand commence l heure doree du soir a ${cityName} aujourd hui ?`,
  faqEveningAnswer: (cityName, start, end) =>
    `L heure doree du soir a ${cityName} aujourd hui va de ${start} a ${end}.`,
  kicker: (cityName) => `Fenetres de lumiere pour photographier ${cityName}`,
  heading: (cityName) => `Heure doree et crepuscule a ${cityName}`,
  lead: (localTime, nextLabel, countdown, nextTime) =>
    `Il est ${localTime} localement. ${nextLabel} ${countdown}, a ${nextTime}.`,
  browseCities: 'Chercher une autre ville',
  sunrisePage: 'Voir lever et coucher',
  prayerPage: 'Voir les horaires de priere',
  nextMorningStarts: 'La prochaine heure doree du matin commence dans',
  nextMorningEnds: 'L heure doree du matin se termine dans',
  nextEveningStarts: 'L heure doree du soir commence dans',
  nextEveningEnds: 'L heure doree du soir se termine dans',
  nextTomorrowMorningStarts: 'L heure doree de demain matin commence dans',
  nextMorningSupport: (start, end) => `La fenetre du matin va de ${start} a ${end}.`,
  nextEveningSupport: (start, end) => `La fenetre du soir va de ${start} a ${end}.`,
  nextTomorrowSupport: (start, end) => `La premiere fenetre de demain va de ${start} a ${end}.`,
  metricMorning: 'Heure doree matin',
  metricEvening: 'Heure doree soir',
  metricSunrise: 'Lever du soleil',
  metricSunset: 'Coucher du soleil',
  metricDaylight: 'Duree du jour',
  lightWindowsTitle: (cityName) => `Fenetres de lumiere du jour a ${cityName}`,
  lightWindowsDescription: 'Commencez par les plages qui changent vraiment une sortie, une seance ou un deplacement photo.',
  morningGoldenHour: 'Heure doree du matin',
  eveningGoldenHour: 'Heure doree du soir',
  startsLabel: 'Debut',
  endsLabel: 'Fin',
  durationLabel: 'Duree',
  twilightTitle: 'Crepuscules',
  phaseLabel: 'Phase',
  dawnLabel: 'Debut',
  duskLabel: 'Fin',
  civilTwilight: 'Crepuscule civil',
  nauticalTwilight: 'Crepuscule nautique',
  astronomicalTwilight: 'Crepuscule astronomique',
  trendTitle: 'Tendance lumineuse et limites annuelles',
  trendDescription: 'La page devient plus utile quand elle ne repond pas seulement a aujourd hui, mais aussi au mouvement annuel de la lumiere locale.',
  annualExtremesTitle: (year) => `Extremes de lumiere en ${year}`,
  annualExtremesDescription: 'Ces points resument les vraies limites annuelles pour le lever, le coucher et la duree du jour.',
  earliestSunrise: 'Lever le plus tot',
  latestSunrise: 'Lever le plus tard',
  earliestSunset: 'Coucher le plus tot',
  latestSunset: 'Coucher le plus tard',
  longestDay: 'Jour le plus long',
  shortestDay: 'Jour le plus court',
  dateLabel: 'Date',
  seasonalTitle: 'Reperes saisonniers',
  seasonalDescription: 'Ces quatre dates rendent l annee plus facile a lire qu une table brute de 365 jours.',
  checkpointLabel: 'Repere',
  sunriseLabel: 'Lever',
  sunsetLabel: 'Coucher',
  daylightLabel: 'Jour',
  aboutTitle: (cityName) => `Comment lire l heure doree a ${cityName}`,
  aboutIntro: (cityName, sunrise, sunset, daylight) =>
    `Aujourd hui a ${cityName}, le soleil se leve a ${sunrise} et se couche a ${sunset}, avec ${daylight} de jour utile. C est la base la plus concrete pour savoir si la meilleure fenetre tombe avant le travail, apres une visite ou en fin de journee.`,
  aboutPhotography: (cityName, morningStart, morningEnd, eveningStart, eveningEnd) =>
    `L heure doree du matin a ${cityName} va de ${morningStart} a ${morningEnd}. Celle du soir va de ${eveningStart} a ${eveningEnd}. Ce sont les plages les plus utiles pour le portrait, la ville et la video quand on cherche une lumiere plus douce et plus chaude.`,
  aboutTwilight: (dawn, dusk, nauticalDawn, nauticalDusk) =>
    `Le crepuscule civil commence a ${dawn} avant le lever et se prolonge apres le coucher jusqu a ${dusk}. Si vous cherchez une ambiance plus froide ou plus bleue, les reperes nautiques de ${nauticalDawn} et ${nauticalDusk} sont egalement utiles.`,
  aboutLocalClock: (cityName, localDate, localTime, timezone) =>
    `Toutes les heures affichees ici suivent l heure locale de ${cityName} : ${localDate}, ${localTime}, fuseau ${timezone}. Cela evite les erreurs de comparaison quand plusieurs villes entrent dans le plan.`,
  nearbyTitle: (cityName) => `Comparer avec des villes proches de ${cityName}`,
  nearbyDescription: 'Une fois la reponse trouvee pour une ville, l action la plus utile est souvent d ouvrir une ville voisine pour comparer la meme fenetre lumineuse.',
  moreCitiesToCompare: 'Autres villes a comparer',
  browseAllCities: 'Voir toutes les villes',
  formatDuration: frenchDuration,
  formatHours: createHoursFormatter('fr-FR', ' h'),
  translateSeasonalLabel: createSeasonalLabelTranslator({
    'March Equinox': 'Equinoxe de mars',
    'June Solstice': 'Solstice de juin',
    'September Equinox': 'Equinoxe de septembre',
    'December Solstice': 'Solstice de decembre',
  }),
};

export const turkishGoldenHourCopy: GoldenHourPageCopy = {
  languageCode: 'tr',
  lang: 'tr',
  locale: 'tr-TR',
  breadcrumbHome: 'Ana sayfa',
  breadcrumbCities: 'Sehirler',
  pageTitle: (cityDisplayName) => `${cityDisplayName} icin bugun altin saat ve mavi saat`,
  pageDescription: (cityDisplayName, morningStart, morningEnd, eveningStart) =>
    `${cityDisplayName} icin sabah altin saat ${morningStart} ile ${morningEnd} arasinda. Aksam penceresi ${eveningStart} saatinde basliyor.`,
  keywords: (cityDisplayName) =>
    `${cityDisplayName} altin saat, ${cityDisplayName} mavi saat, ${cityDisplayName} fotograf cekimi`,
  faqMorningQuestion: (cityName) => `${cityName} icin bugun sabah altin saat ne zaman?`,
  faqMorningAnswer: (cityName, start, end) =>
    `${cityName} icin bugun sabah altin saat ${start} ile ${end} arasindadir.`,
  faqEveningQuestion: (cityName) => `${cityName} icin bugun aksam altin saat ne zaman basliyor?`,
  faqEveningAnswer: (cityName, start, end) =>
    `${cityName} icin bugun aksam altin saat ${start} ile ${end} arasindadir.`,
  kicker: (cityName) => `${cityName} icin fotograf isik pencereleri`,
  heading: (cityName) => `${cityName} icin altin saat ve alacakaranlik`,
  lead: (localTime, nextLabel, countdown, nextTime) =>
    `Yerel saat su an ${localTime}. ${nextLabel} ${countdown}, saat ${nextTime}.`,
  browseCities: 'Baska bir sehir ara',
  sunrisePage: 'Gunes dogusu ve batisi',
  prayerPage: 'Namaz vakitleri',
  nextMorningStarts: 'Bir sonraki sabah altin saat baslangicina kalan sure',
  nextMorningEnds: 'Sabah altin saatin bitmesine kalan sure',
  nextEveningStarts: 'Aksam altin saatin baslamasina kalan sure',
  nextEveningEnds: 'Aksam altin saatin bitmesine kalan sure',
  nextTomorrowMorningStarts: 'Yarin sabah altin saatin baslamasina kalan sure',
  nextMorningSupport: (start, end) => `Sabah penceresi ${start} ile ${end} arasindadir.`,
  nextEveningSupport: (start, end) => `Aksam penceresi ${start} ile ${end} arasindadir.`,
  nextTomorrowSupport: (start, end) => `Yarinin ilk penceresi ${start} ile ${end} arasindadir.`,
  metricMorning: 'Sabah altin saat',
  metricEvening: 'Aksam altin saat',
  metricSunrise: 'Gunes dogusu',
  metricSunset: 'Gunes batimi',
  metricDaylight: 'Gun isiği',
  lightWindowsTitle: (cityName) => `${cityName} icin bugunun isik pencereleri`,
  lightWindowsDescription: 'Dis cekim, yolculuk veya acik hava planini gercekten degistiren araliklarla baslayin.',
  morningGoldenHour: 'Sabah altin saat',
  eveningGoldenHour: 'Aksam altin saat',
  startsLabel: 'Baslangic',
  endsLabel: 'Bitis',
  durationLabel: 'Sure',
  twilightTitle: 'Alacakaranlik asamalari',
  phaseLabel: 'Asama',
  dawnLabel: 'Baslangic',
  duskLabel: 'Bitis',
  civilTwilight: 'Sivil alacakaranlik',
  nauticalTwilight: 'Denizcilik alacakaranligi',
  astronomicalTwilight: 'Astronomik alacakaranlik',
  trendTitle: 'Isik trendi ve yillik sinirlar',
  trendDescription: 'Sayfa sadece bugune degil, yerel isigin yil boyunca nasil hareket ettigine de cevap vermelidir.',
  annualExtremesTitle: (year) => `${year} yili isik sinirlari`,
  annualExtremesDescription: 'Bu noktalar gun dogusu, gun batimi ve gunduz suresi icin yilin gercek limitlerini ozetler.',
  earliestSunrise: 'En erken gun dogusu',
  latestSunrise: 'En gec gun dogusu',
  earliestSunset: 'En erken gun batimi',
  latestSunset: 'En gec gun batimi',
  longestDay: 'En uzun gun',
  shortestDay: 'En kisa gun',
  dateLabel: 'Tarih',
  seasonalTitle: 'Mevsimsel kontrol noktalarI',
  seasonalDescription: 'Bu dort tarih, 365 gunluk ham takvim yerine yilin ritmini daha hizli okumayi saglar.',
  checkpointLabel: 'Nokta',
  sunriseLabel: 'Dogus',
  sunsetLabel: 'Batis',
  daylightLabel: 'Gunduz',
  aboutTitle: (cityName) => `${cityName} icin altin saat nasil okunur`,
  aboutIntro: (cityName, sunrise, sunset, daylight) =>
    `Bugun ${cityName} icin gunes ${sunrise} saatinde doguyor ve ${sunset} saatinde batiyor. Toplam ${daylight} gunduz suresi, cekimi sabaha mi yoksa aksama mi koymaniz gerektigini hizlica gosterir.`,
  aboutPhotography: (cityName, morningStart, morningEnd, eveningStart, eveningEnd) =>
    `${cityName} icin sabah altin saat ${morningStart} ile ${morningEnd}, aksam altin saat ise ${eveningStart} ile ${eveningEnd} arasindadir. Portre, sehir ve dis mekan cekimleri icin en sicak ve yumusak isik genelde bu araliklarda olur.`,
  aboutTwilight: (dawn, dusk, nauticalDawn, nauticalDusk) =>
    `Sivil alacakaranlik gunes dogmadan once ${dawn} saatinde baslar ve gun batimindan sonra ${dusk} saatine kadar surer. Daha soguk ve mavi bir gorunum istiyorsaniz ${nauticalDawn} ve ${nauticalDusk} isaretleri de onemlidir.`,
  aboutLocalClock: (cityName, localDate, localTime, timezone) =>
    `Buradaki tum saatler ${cityName} yerel saatine gore verilir: ${localDate}, ${localTime}, saat dilimi ${timezone}. Birden fazla sehir karsilastirirken bu ayrinti onemlidir.`,
  nearbyTitle: (cityName) => `${cityName} yakinindaki sehirlerle karsilastir`,
  nearbyDescription: 'Bir sehirden sonra en faydali sonraki adim genelde ayni isik penceresini yakin bir sehirde acmaktir.',
  moreCitiesToCompare: 'Karsilastirilacak diger sehirler',
  browseAllCities: 'Tum sehirleri gor',
  formatDuration: turkishDuration,
  formatHours: createHoursFormatter('tr-TR', ' sa'),
  translateSeasonalLabel: createSeasonalLabelTranslator({
    'March Equinox': 'Mart ekinoksu',
    'June Solstice': 'Haziran gundonumu',
    'September Equinox': 'Eylul ekinoksu',
    'December Solstice': 'Aralik gundonumu',
  }),
};
