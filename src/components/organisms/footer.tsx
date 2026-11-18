'use client';

import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BrandMark } from '@/components/atoms/brand-mark';
import { Link } from '@/lib/navigation';
import { NAV_ITEMS } from '@/lib/nav-items';
import { SOCIAL_CHANNELS } from '@/lib/social-channels';

const FOOTER_LINK_CLASSNAME =
  'text-body hover:text-espresso inline-flex items-center gap-2.5 py-1.5 transition-colors duration-200';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-line-strong bg-paper relative border-t-[1.5px] border-dashed">
      <div className="mx-auto flex max-w-[1160px] flex-wrap gap-x-14 gap-y-10 px-4 pb-9 pt-14 sm:px-6">
        <div className="min-w-0 flex-[2_1_280px]">
          <Link
            href="/"
            className="text-espresso inline-flex items-center gap-3"
          >
            <BrandMark className="size-11" />
            <span className="font-display text-xl">{t('name')}</span>
          </Link>
          <p className="text-mocha mt-4 max-w-[340px]">{t('tagline')}</p>
          <p className="font-hand text-clay-deep mt-3 text-2xl">
            {t('thanks')}
          </p>
        </div>

        <div className="flex-[1_1_150px]">
          <h2 className="text-taupe font-mono text-[13px] uppercase tracking-[0.08em]">
            {t('navigationTitle')}
          </h2>
          <ul className="mt-3">
            {NAV_ITEMS.map(({ href, labelKey }) => (
              <li key={href}>
                <Link href={href} className={FOOTER_LINK_CLASSNAME}>
                  {tNav(labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-[1_1_200px]">
          <h2 className="text-taupe font-mono text-[13px] uppercase tracking-[0.08em]">
            {t('findMeTitle')}
          </h2>
          <ul className="mt-3">
            {SOCIAL_CHANNELS.map(({ key, href, isExternal, Icon }) => (
              <li key={key}>
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noreferrer' : undefined}
                  className={FOOTER_LINK_CLASSNAME}
                >
                  <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                  {tNav(`social.${key}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-taupe mx-auto flex max-w-[1160px] flex-wrap items-center justify-between gap-3 px-4 pb-5 pt-3 font-mono text-[13px] sm:px-6">
        <span
          aria-hidden="true"
          className="border-line mb-2 basis-full border-t"
        />
        <span>{t('rights', { year })}</span>
        <a
          href="#inicio"
          className="hover:text-espresso inline-flex min-h-11 items-center gap-1.5 transition-colors duration-200"
        >
          {t('backToTop')}
          <ArrowUp size={16} strokeWidth={1.6} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
