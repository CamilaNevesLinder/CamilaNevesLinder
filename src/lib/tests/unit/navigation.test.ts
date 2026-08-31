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

  it('defines only the root pathname', () => {
    expect(pathnames).toEqual({ '/': '/' });
    expect(routing.pathnames).toEqual(pathnames);
  });
});
