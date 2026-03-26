import { defaultLanguage, enabledLanguages, isEnabledLanguage, localizePath } from '@i18n/config';

export const SITE_URL = 'https://sunrisetime.co';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type AlternateLink = {
  hrefLang: string;
  href: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function buildAlternateLinks(
  links: { hrefLang: string; path: string }[],
) {
  const normalizedLinks = new Map<string, string>();

  const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

  const stripLanguagePrefix = (path: string) => {
    const normalizedPath = normalizePath(path);
    if (normalizedPath === '/') {
      return normalizedPath;
    }

    const segments = normalizedPath.split('/');
    const language = segments[1];
    if (!language || !isEnabledLanguage(language) || language === defaultLanguage) {
      return normalizedPath;
    }

    const strippedPath = normalizedPath.slice(language.length + 1);
    return strippedPath || '/';
  };

  const preferredBaseLink = links.find((link) => link.hrefLang === defaultLanguage)
    ?? links.find((link) => link.hrefLang === 'x-default')
    ?? links[0];
  const basePath = stripLanguagePrefix(preferredBaseLink?.path ?? '/');

  for (const link of links) {
    normalizedLinks.set(link.hrefLang, normalizePath(link.path));
  }

  for (const language of enabledLanguages) {
    if (!normalizedLinks.has(language)) {
      normalizedLinks.set(language, localizePath(language, basePath));
    }
  }

  if (!normalizedLinks.has('x-default')) {
    normalizedLinks.set('x-default', localizePath(defaultLanguage, basePath));
  }

  const orderedLinks = [
    ...enabledLanguages.map((language) => ({
      hrefLang: language,
      path: normalizedLinks.get(language) ?? localizePath(language, basePath),
    })),
    ...links
      .filter((link) => !enabledLanguages.includes(link.hrefLang as typeof enabledLanguages[number]) && link.hrefLang !== 'x-default')
      .map((link) => ({
        hrefLang: link.hrefLang,
        path: normalizePath(link.path),
      })),
    {
      hrefLang: 'x-default',
      path: normalizedLinks.get('x-default') ?? localizePath(defaultLanguage, basePath),
    },
  ];

  return orderedLinks.map((link) => ({
    hrefLang: link.hrefLang,
    href: absoluteUrl(link.path),
  }));
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  const lastItem = items[items.length - 1];
  const pageUrl = absoluteUrl(lastItem?.path ?? '/');

  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": absoluteUrl(item.path),
    })),
  };
}
