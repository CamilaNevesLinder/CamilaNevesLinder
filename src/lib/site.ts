import { routing } from '@/lib/navigation';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.camilaneveslinder.com.br';

export const OG_IMAGE_URL = `${SITE_URL}/opengraph-image.png`;

export const SOCIAL_LINKS = {
  github: 'https://github.com/CamilaNevesLinder',
  linkedin: 'https://www.linkedin.com/in/camila-neves-linder-76a342403/',
  instagram: 'https://www.instagram.com/camila.nevees/',
  whatsapp: 'https://wa.me/5548998558324',
  email: 'mailto:camilaneveslindner@gmail.com',
} as const;

export function localizedPath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return path;
  }

  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function localizedUrl(locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  }

  return path === '/'
    ? `${SITE_URL}/${locale}`
    : `${SITE_URL}/${locale}${path}`;
}
