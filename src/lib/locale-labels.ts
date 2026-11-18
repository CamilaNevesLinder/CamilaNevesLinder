import type { Locale } from '@/lib/navigation';

export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  'pt-br': 'PT',
  en: 'EN',
  es: 'ES',
};

export const LOCALE_NAMES: Record<Locale, string> = {
  'pt-br': 'Português',
  en: 'English',
  es: 'Español',
};

export const LOCALE_DISPLAY_ORDER: Locale[] = ['pt-br', 'en', 'es'];
