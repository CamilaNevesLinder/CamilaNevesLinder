'use client';

import { useTranslations } from 'next-intl';
import { LanguageSwitch } from '@/components/molecules/language-switch';
import { ThemeToggle } from '@/components/molecules/theme-toggle';
import { Link, usePathname } from '@/lib/navigation';
import { NAV_ITEMS } from '@/lib/nav-items';
import { cn } from '@/lib/utils';

export function SiteHeader() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <header
      id="inicio"
      className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-4 px-4 pt-6 sm:px-6 md:pt-7"
    >
      <Link
        href="/"
        aria-label={t('homeLink')}
        className="text-espresso flex items-center gap-2.5"
      >
        <span
          aria-hidden="true"
          className="bg-espresso text-cream font-display grid size-10 place-items-center rounded-full text-xl italic"
        >
          c
        </span>
        <span aria-hidden="true" className="font-display text-xl italic">
          {t('brand')}
          <span className="text-dusty">.</span>
        </span>
      </Link>

      <nav
        aria-label={t('mainLabel')}
        className="border-line bg-paper hidden gap-1 rounded-full border p-1.5 md:flex"
      >
        {NAV_ITEMS.map(({ href, labelKey }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-200',
                isActive ? 'bg-espresso text-cream' : 'text-body hover:bg-sand',
              )}
            >
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-1.5">
        <LanguageSwitch />
        <ThemeToggle />
      </div>
    </header>
  );
}
