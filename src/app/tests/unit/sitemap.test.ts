import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

const { SITE_URL } = await import('@/lib/site');
const { default: sitemap } = await import('@/app/sitemap');

describe('sitemap', () => {
  it('returns 3 entries (root × 3 locales)', () => {
    const entries = sitemap();

    expect(entries).toHaveLength(3);
  });

  it("includes alternates.languages['x-default'] on every entry", () => {
    const entries = sitemap();

    for (const entry of entries) {
      expect(entry.alternates?.languages?.['x-default']).toEqual(
        expect.any(String),
      );
    }
  });

  it('assigns priority 1 to the root path on every locale', () => {
    const entries = sitemap();

    for (const entry of entries) {
      expect(entry.priority).toBe(1);
    }
  });

  it('uses SITE_URL for the default locale root', () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toContain(SITE_URL);
  });
});
