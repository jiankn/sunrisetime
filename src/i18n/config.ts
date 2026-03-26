export const defaultLanguage = 'en';

export const supportedLanguages = ['en', 'es', 'ar', 'zh-cn', 'fr', 'tr', 'id', 'pt', 'ms'] as const;
export const enabledLanguages = ['en', 'es', 'ar', 'zh-cn', 'fr', 'tr'] as const;

export type LanguageCode = (typeof supportedLanguages)[number];
export type EnabledLanguageCode = (typeof enabledLanguages)[number];
export type LanguageDirection = 'ltr' | 'rtl';

export const languageMeta: Record<LanguageCode, { label: string; nativeLabel: string; locale: string; dir: LanguageDirection }> = {
  en: { label: 'English', nativeLabel: 'English', locale: 'en-US', dir: 'ltr' },
  es: { label: 'Spanish', nativeLabel: 'Español', locale: 'es-ES', dir: 'ltr' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', locale: 'ar', dir: 'rtl' },
  'zh-cn': { label: 'Simplified Chinese', nativeLabel: '简体中文', locale: 'zh-CN', dir: 'ltr' },
  fr: { label: 'French', nativeLabel: 'Français', locale: 'fr-FR', dir: 'ltr' },
  tr: { label: 'Turkish', nativeLabel: 'Türkçe', locale: 'tr-TR', dir: 'ltr' },
  id: { label: 'Indonesian', nativeLabel: 'Bahasa Indonesia', locale: 'id-ID', dir: 'ltr' },
  pt: { label: 'Portuguese', nativeLabel: 'Português', locale: 'pt-BR', dir: 'ltr' },
  ms: { label: 'Malay', nativeLabel: 'Bahasa Melayu', locale: 'ms-MY', dir: 'ltr' },
};

export function isEnabledLanguage(value: string): value is EnabledLanguageCode {
  return enabledLanguages.includes(value as EnabledLanguageCode);
}

export function getLanguageLocale(language: EnabledLanguageCode) {
  return languageMeta[language].locale;
}

export function getLanguageDirection(language: EnabledLanguageCode) {
  return languageMeta[language].dir;
}

export function localizePath(language: EnabledLanguageCode, path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (language === defaultLanguage) {
    return normalizedPath;
  }

  if (normalizedPath === '/') {
    return `/${language}/`;
  }

  return `/${language}${normalizedPath}`;
}

export function buildLanguageSwitcherLinks(path: string, languages: EnabledLanguageCode[] = [...enabledLanguages]) {
  return languages.map((language) => ({
    code: language,
    label: languageMeta[language].nativeLabel,
    href: localizePath(language, path),
  }));
}
