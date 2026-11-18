'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  LOCALE_DISPLAY_ORDER,
  LOCALE_NAMES,
  LOCALE_SHORT_LABELS,
} from '@/lib/locale-labels';
import { Link, usePathname } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function LanguageSwitch() {
  const t = useTranslations('nav');
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('languageLabel')}
      className="border-line flex h-11 items-center rounded-full border px-1.5 font-mono text-[13px]"
    >
      {LOCALE_DISPLAY_ORDER.map((locale) => {
        const isCurrent = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            lang={locale}
            aria-label={LOCALE_NAMES[locale]}
            aria-current={isCurrent ? 'true' : undefined}
            className={cn(
              'grid h-8 min-w-9 place-items-center rounded-full px-2 transition-colors duration-200',
              isCurrent
                ? 'bg-sand text-espresso'
                : 'text-mocha hover:text-espresso',
            )}
          >
            {LOCALE_SHORT_LABELS[locale]}
          </Link>
        );
      })}
    </nav>
  );
}
