import { defineRouting, Pathnames } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'pt-br', 'es'] as const;
export type Locale = 'en' | 'pt-br' | 'es';
export const localePrefix = 'as-needed';

export type HrefValue = '/';

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;

export const routing = defineRouting({
  locales,
  defaultLocale: 'pt-br',
  localePrefix,
  pathnames,
});

export const { Link, usePathname } = createNavigation(routing);
