import './globals.css';

import { JetBrains_Mono, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import NextIntlProvider from '@/providers/next-intl-provider';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing } from '@/lib/navigation';
import { SITE_URL, localizedPath, localizedUrl } from '@/lib/site';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono-numeric',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: '700',
  display: 'swap',
  variable: '--font-playfair',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedUrl(l, '/')]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: t('home.title'),
    description: t('home.description'),
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: localizedPath(locale, '/'),
      languages: {
        ...languages,
        'x-default': localizedUrl(routing.defaultLocale, '/'),
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      translate="no"
      suppressHydrationWarning
      className={`${jetBrainsMono.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <NextIntlProvider locale={locale} messages={messages}>
          {children}
        </NextIntlProvider>
      </body>
    </html>
  );
}
