import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

const { SITE_URL } = await import('@/lib/site');
const { default: robots } = await import('@/app/robots');

describe('robots', () => {
  it('allows everything', () => {
    const result = robots();

    expect(result.rules).toEqual({
      userAgent: '*',
      allow: '/',
    });
  });

  it('uses SITE_URL for sitemap and host', () => {
    const result = robots();

    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(result.host).toBe(SITE_URL);
  });
});
