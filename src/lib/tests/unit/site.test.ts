import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

const { OG_IMAGE_URL, SITE_URL, localizedPath, localizedUrl } =
  await import('@/lib/site');

describe('OG_IMAGE_URL', () => {
  it('is absolute under SITE_URL and points at opengraph-image.png', () => {
    expect(OG_IMAGE_URL).toBe(`${SITE_URL}/opengraph-image.png`);
    expect(OG_IMAGE_URL).toMatch(/^https?:\/\//);
    expect(OG_IMAGE_URL).not.toContain('localhost');
  });
});

describe('localizedPath', () => {
  it('leaves the default locale pt-br unprefixed', () => {
    expect(localizedPath('pt-br', '/')).toBe('/');
    expect(localizedPath('pt-br', '/about')).toBe('/about');
  });

  it('prefixes en and es locales', () => {
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('en', '/about')).toBe('/en/about');
    expect(localizedPath('es', '/')).toBe('/es');
    expect(localizedPath('es', '/about')).toBe('/es/about');
  });

  it('produces no trailing slash for the root path', () => {
    expect(localizedPath('pt-br', '/')).toBe('/');
    expect(localizedPath('en', '/')).toBe('/en');
    expect(localizedPath('es', '/')).toBe('/es');
  });

  it('composes a non-root path for all three locales', () => {
    expect(localizedPath('pt-br', '/projects')).toBe('/projects');
    expect(localizedPath('en', '/projects')).toBe('/en/projects');
    expect(localizedPath('es', '/projects')).toBe('/es/projects');
  });
});

describe('localizedUrl', () => {
  it('leaves the default locale pt-br unprefixed', () => {
    expect(localizedUrl('pt-br', '/')).toBe(SITE_URL);
    expect(localizedUrl('pt-br', '/about')).toBe(`${SITE_URL}/about`);
  });

  it('prefixes en and es locales', () => {
    expect(localizedUrl('en', '/')).toBe(`${SITE_URL}/en`);
    expect(localizedUrl('en', '/about')).toBe(`${SITE_URL}/en/about`);
    expect(localizedUrl('es', '/')).toBe(`${SITE_URL}/es`);
    expect(localizedUrl('es', '/about')).toBe(`${SITE_URL}/es/about`);
  });

  it('produces no trailing slash for the root path', () => {
    expect(localizedUrl('pt-br', '/')).toBe(SITE_URL);
    expect(localizedUrl('en', '/')).not.toMatch(/\/$/);
    expect(localizedUrl('es', '/')).not.toMatch(/\/$/);
  });

  it('composes a non-root path for all three locales', () => {
    expect(localizedUrl('pt-br', '/contact')).toBe(`${SITE_URL}/contact`);
    expect(localizedUrl('en', '/contact')).toBe(`${SITE_URL}/en/contact`);
    expect(localizedUrl('es', '/contact')).toBe(`${SITE_URL}/es/contact`);
  });
});
