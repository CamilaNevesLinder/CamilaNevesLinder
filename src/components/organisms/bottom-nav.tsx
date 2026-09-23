'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/lib/navigation';
import { NAV_ITEMS } from '@/lib/nav-items';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav className="border-border bg-background fixed inset-x-0 bottom-0 z-40 grid h-14 grid-cols-5 border-t md:hidden">
      {NAV_ITEMS.map(({ href, labelKey, Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={t(labelKey)}
            className={cn(
              'flex items-center justify-center',
              isActive ? 'text-espresso' : 'text-taupe',
            )}
          >
            <Icon size={22} aria-hidden="true" />
          </Link>
        );
      })}
    </nav>
  );
}
