export const SITE_URL = 'https://sunrisetime.co';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
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
