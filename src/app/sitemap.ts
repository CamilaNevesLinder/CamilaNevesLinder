import type { MetadataRoute } from 'next';
import { routing } from '@/lib/navigation';
import { localizedUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, localizedUrl(locale, '/')]),
  );

  return routing.locales.map((locale) => ({
    url: localizedUrl(locale, '/'),
    lastModified,
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: {
        ...languages,
        'x-default': localizedUrl(routing.defaultLocale, '/'),
      },
    },
  }));
}
