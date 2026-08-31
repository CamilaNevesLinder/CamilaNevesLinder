import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './lib/navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  if (!hasLocale(routing.locales, requested)) notFound();

  return {
    locale: requested,
    timeZone: 'America/Sao_Paulo',
    messages: (await import(`../messages/${requested}.json`)).default,
  };
});
