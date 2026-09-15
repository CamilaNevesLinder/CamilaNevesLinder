import { defineRouting, Pathnames } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'pt-br', 'es'] as const;
export type Locale = 'en' | 'pt-br' | 'es';
export const localePrefix = 'as-needed';

export type HrefValue =
  '/' | '/sobre' | '/projetos' | '/tecnologias' | '/contato';

export const pathnames = {
  '/': '/',
  '/sobre': {
    en: '/about',
    'pt-br': '/sobre',
    es: '/sobre-mi',
  },
  '/projetos': {
    en: '/projects',
    'pt-br': '/projetos',
    es: '/proyectos',
  },
  '/tecnologias': {
    en: '/technologies',
    'pt-br': '/tecnologias',
    es: '/tecnologias',
  },
  '/contato': {
    en: '/contact',
    'pt-br': '/contato',
    es: '/contacto',
  },
} satisfies Pathnames<typeof locales>;

export const routing = defineRouting({
  locales,
  defaultLocale: 'pt-br',
  localePrefix,
  pathnames,
});

export const { Link, usePathname } = createNavigation(routing);
