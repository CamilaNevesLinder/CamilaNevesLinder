import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl/routing', () => ({
  defineRouting: (config: unknown) => config,
}));

vi.mock('next-intl/navigation', () => ({
  createNavigation: () => ({
    Link: () => null,
    usePathname: () => '/',
  }),
}));

const { localePrefix, locales, pathnames, routing } =
  await import('@/lib/navigation');

describe('navigation routing constants', () => {
  it('exposes the three supported locales', () => {
    expect(locales).toEqual(['en', 'pt-br', 'es']);
  });

  it('uses as-needed locale prefix and pt-br as default', () => {
    expect(localePrefix).toBe('as-needed');
    expect(routing.defaultLocale).toBe('pt-br');
    expect(routing.locales).toEqual(['en', 'pt-br', 'es']);
    expect(routing.localePrefix).toBe('as-needed');
  });

  it('defines the localized section pathnames', () => {
    expect(pathnames).toEqual({
      '/': '/',
      '/sobre': { en: '/about', 'pt-br': '/sobre', es: '/sobre-mi' },
      '/projetos': { en: '/projects', 'pt-br': '/projetos', es: '/proyectos' },
      '/tecnologias': {
        en: '/technologies',
        'pt-br': '/tecnologias',
        es: '/tecnologias',
      },
      '/contato': { en: '/contact', 'pt-br': '/contato', es: '/contacto' },
    });
    expect(routing.pathnames).toEqual(pathnames);
  });
});
