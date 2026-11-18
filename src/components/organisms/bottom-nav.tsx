'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/navigation';
import { NAV_ITEMS } from '@/lib/nav-items';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav
      aria-label={t('mainLabel')}
      className="border-line bg-paper fixed bottom-[calc(18px+env(safe-area-inset-bottom))] left-1/2 z-40 flex w-[calc(100%-32px)] max-w-[380px] -translate-x-1/2 gap-0.5 rounded-[26px] border p-1.5 shadow-[0_22px_44px_-14px_var(--shadow-color),0_4px_10px_-4px_var(--shadow-color)] md:hidden"
    >
      {NAV_ITEMS.map(({ href, labelKey, compactLabelKey, Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={t(labelKey)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex min-h-[52px] flex-1 flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-medium transition-colors duration-200',
              isActive ? 'bg-espresso text-cream' : 'text-body hover:bg-sand',
            )}
          >
            <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
            <span aria-hidden="true">{t(compactLabelKey)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
