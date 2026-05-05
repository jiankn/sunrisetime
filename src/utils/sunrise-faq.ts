export type SunriseFaqLocale = 'en' | 'es' | 'fr' | 'tr' | 'zh-cn' | 'ar';

export type SunriseFaqItem = {
  question: string;
  answer: string;
};

export type SunriseFaqSection = {
  heading: string;
  intro: string;
  items: SunriseFaqItem[];
};

type SunriseFaqInput = {
  locale: SunriseFaqLocale;
  cityName: string;
  sunrise: string;
  sunset: string;
  tomorrowSunrise: string;
  daylight: string;
  morningGoldenStart: string;
  morningGoldenEnd: string;
  eveningGoldenStart: string;
  eveningGoldenEnd: string;
  nextPrayerName: string;
  nextPrayerTime: string;
  timezoneLabel?: string;
};

function withTimezone(value: string | undefined) {
  return value ? ` (${value})` : '';
}

export function buildSunriseFaqSection(input: SunriseFaqInput): SunriseFaqSection {
  const tz = withTimezone(input.timezoneLabel);

  switch (input.locale) {
    case 'es':
      return {
        heading: `Preguntas frecuentes sobre el amanecer en ${input.cityName}`,
        intro: 'Respuestas cortas para las busquedas que suelen aparecer despues de comprobar el amanecer o el atardecer.',
        items: [
          {
            question: `A que hora amanece hoy en ${input.cityName}?`,
            answer: `El amanecer de hoy en ${input.cityName} es a las ${input.sunrise}${tz}.`,
          },
          {
            question: `A que hora atardece hoy en ${input.cityName}?`,
            answer: `El atardecer de hoy en ${input.cityName} es a las ${input.sunset}${tz}.`,
          },
          {
            question: `A que hora amanece manana en ${input.cityName}?`,
            answer: `El amanecer de manana en ${input.cityName} es a las ${input.tomorrowSunrise}${tz}.`,
          },
          {
            question: `Cuantas horas de luz tiene ${input.cityName} hoy?`,
            answer: `${input.cityName} tiene hoy ${input.daylight} de luz natural entre amanecer y atardecer.`,
          },
          {
            question: `Cuando es la hora dorada en ${input.cityName}?`,
            answer: `La hora dorada de la manana va de ${input.morningGoldenStart} a ${input.morningGoldenEnd}; la de la tarde empieza a ${input.eveningGoldenStart} y termina a ${input.eveningGoldenEnd}.`,
          },
          {
            question: `La pagina muestra horarios de oracion para ${input.cityName}?`,
            answer: `Si. Esta pagina incluye acceso a horarios de oracion; la proxima referencia mostrada es ${input.nextPrayerName} a las ${input.nextPrayerTime}.`,
          },
        ],
      };
    case 'fr':
      return {
        heading: `Questions frequentes sur le lever du soleil a ${input.cityName}`,
        intro: 'Reponses courtes aux questions qui suivent souvent la verification du lever ou du coucher du soleil.',
        items: [
          {
            question: `A quelle heure se leve le soleil aujourd hui a ${input.cityName} ?`,
            answer: `Le lever du soleil aujourd hui a ${input.cityName} est a ${input.sunrise}${tz}.`,
          },
          {
            question: `A quelle heure se couche le soleil aujourd hui a ${input.cityName} ?`,
            answer: `Le coucher du soleil aujourd hui a ${input.cityName} est a ${input.sunset}${tz}.`,
          },
          {
            question: `A quelle heure se leve le soleil demain a ${input.cityName} ?`,
            answer: `Le lever du soleil demain a ${input.cityName} est a ${input.tomorrowSunrise}${tz}.`,
          },
          {
            question: `Quelle est la duree du jour a ${input.cityName} aujourd hui ?`,
            answer: `${input.cityName} recoit aujourd hui ${input.daylight} de lumiere du jour entre le lever et le coucher du soleil.`,
          },
          {
            question: `Quand a lieu l heure doree a ${input.cityName} ?`,
            answer: `L heure doree du matin va de ${input.morningGoldenStart} a ${input.morningGoldenEnd}; celle du soir commence a ${input.eveningGoldenStart} et se termine a ${input.eveningGoldenEnd}.`,
          },
          {
            question: `La page affiche-t-elle les horaires de priere a ${input.cityName} ?`,
            answer: `Oui. La page relie les horaires de priere; le prochain repere affiche est ${input.nextPrayerName} a ${input.nextPrayerTime}.`,
          },
        ],
      };
    case 'tr':
      return {
        heading: `${input.cityName} gun dogumu hakkinda sik sorulan sorular`,
        intro: 'Gun dogumu veya gun batimi kontrolunden sonra gelen yaygin sorular icin kisa cevaplar.',
        items: [
          {
            question: `Bugun ${input.cityName} gun dogumu saat kacta?`,
            answer: `Bugun ${input.cityName} icin gun dogumu ${input.sunrise}${tz}.`,
          },
          {
            question: `Bugun ${input.cityName} gun batimi saat kacta?`,
            answer: `Bugun ${input.cityName} icin gun batimi ${input.sunset}${tz}.`,
          },
          {
            question: `Yarin ${input.cityName} gun dogumu saat kacta?`,
            answer: `Yarin ${input.cityName} icin gun dogumu ${input.tomorrowSunrise}${tz}.`,
          },
          {
            question: `Bugun ${input.cityName} gun isigi ne kadar?`,
            answer: `${input.cityName} bugun gun dogumu ile gun batimi arasinda ${input.daylight} gun isigi alir.`,
          },
          {
            question: `${input.cityName} altin saat ne zaman?`,
            answer: `Sabah altin saati ${input.morningGoldenStart} - ${input.morningGoldenEnd}; aksam altin saati ${input.eveningGoldenStart} - ${input.eveningGoldenEnd}.`,
          },
          {
            question: `${input.cityName} sayfasinda namaz vakitleri var mi?`,
            answer: `Evet. Sayfa namaz vakitlerine baglanir; gosterilen siradaki vakit ${input.nextPrayerName} ${input.nextPrayerTime}.`,
          },
        ],
      };
    case 'zh-cn':
      return {
        heading: `${input.cityName}日出日落常见问题`,
        intro: '把用户在查看日出日落后最常问的几个问题，直接整理成可抓取的简短答案。',
        items: [
          {
            question: `${input.cityName}今天几点日出？`,
            answer: `${input.cityName}今天的日出时间是 ${input.sunrise}${tz}。`,
          },
          {
            question: `${input.cityName}今天几点日落？`,
            answer: `${input.cityName}今天的日落时间是 ${input.sunset}${tz}。`,
          },
          {
            question: `${input.cityName}明天几点日出？`,
            answer: `${input.cityName}明天的日出时间是 ${input.tomorrowSunrise}${tz}。`,
          },
          {
            question: `${input.cityName}今天白天有多长？`,
            answer: `${input.cityName}今天从日出到日落约有 ${input.daylight} 的白昼时间。`,
          },
          {
            question: `${input.cityName}黄金时刻是什么时候？`,
            answer: `晨间黄金时刻约为 ${input.morningGoldenStart} - ${input.morningGoldenEnd}，傍晚黄金时刻约为 ${input.eveningGoldenStart} - ${input.eveningGoldenEnd}。`,
          },
          {
            question: `${input.cityName}页面有礼拜时间吗？`,
            answer: `有。本页提供礼拜时间入口，当前显示的下一次礼拜是 ${input.nextPrayerName} ${input.nextPrayerTime}。`,
          },
        ],
      };
    case 'ar':
      return {
        heading: `أسئلة شائعة عن الشروق في ${input.cityName}`,
        intro: 'إجابات قصيرة للأسئلة التي تأتي عادة بعد معرفة وقت الشروق أو الغروب.',
        items: [
          {
            question: `متى شروق الشمس اليوم في ${input.cityName}؟`,
            answer: `وقت الشروق اليوم في ${input.cityName} هو ${input.sunrise}${tz}.`,
          },
          {
            question: `متى غروب الشمس اليوم في ${input.cityName}؟`,
            answer: `وقت الغروب اليوم في ${input.cityName} هو ${input.sunset}${tz}.`,
          },
          {
            question: `متى شروق الشمس غدا في ${input.cityName}؟`,
            answer: `وقت الشروق غدا في ${input.cityName} هو ${input.tomorrowSunrise}${tz}.`,
          },
          {
            question: `كم طول النهار اليوم في ${input.cityName}؟`,
            answer: `طول النهار اليوم في ${input.cityName} هو ${input.daylight} بين الشروق والغروب.`,
          },
          {
            question: `متى تكون الساعة الذهبية في ${input.cityName}؟`,
            answer: `الساعة الذهبية الصباحية من ${input.morningGoldenStart} إلى ${input.morningGoldenEnd}، والمسائية من ${input.eveningGoldenStart} إلى ${input.eveningGoldenEnd}.`,
          },
          {
            question: `هل تعرض الصفحة أوقات الصلاة في ${input.cityName}؟`,
            answer: `نعم. ترتبط الصفحة بأوقات الصلاة، والوقت التالي المعروض هو ${input.nextPrayerName} عند ${input.nextPrayerTime}.`,
          },
        ],
      };
    default:
      return {
        heading: `Sunrise FAQs for ${input.cityName}`,
        intro: 'Short answers for the common follow-up questions after checking sunrise or sunset.',
        items: [
          {
            question: `What time is sunrise in ${input.cityName} today?`,
            answer: `Sunrise in ${input.cityName} today is at ${input.sunrise}${tz}.`,
          },
          {
            question: `What time is sunset in ${input.cityName} today?`,
            answer: `Sunset in ${input.cityName} today is at ${input.sunset}${tz}.`,
          },
          {
            question: `What time is sunrise in ${input.cityName} tomorrow?`,
            answer: `Tomorrow's sunrise in ${input.cityName} is at ${input.tomorrowSunrise}${tz}.`,
          },
          {
            question: `How many hours of daylight does ${input.cityName} have today?`,
            answer: `${input.cityName} has ${input.daylight} of daylight today between sunrise and sunset.`,
          },
          {
            question: `What time is golden hour in ${input.cityName}?`,
            answer: `Morning golden hour runs from ${input.morningGoldenStart} to ${input.morningGoldenEnd}; evening golden hour runs from ${input.eveningGoldenStart} to ${input.eveningGoldenEnd}.`,
          },
          {
            question: `Does this page include prayer times for ${input.cityName}?`,
            answer: `Yes. The page links into prayer times; the next prayer reference shown here is ${input.nextPrayerName} at ${input.nextPrayerTime}.`,
          },
        ],
      };
  }
}

export function buildFaqPageJsonLd(pageUrl: string, section: SunriseFaqSection) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    "mainEntity": section.items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };
}
