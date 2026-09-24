'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from '@/components/atoms/icons/social-icons';
import { SOCIAL_LINKS } from '@/lib/site';

const SOCIAL_LINK_CLASSNAME =
  'text-taupe hover:text-espresso transition-colors';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-cream border-t px-6 py-10">
      <div className="mx-auto flex max-w-[960px] flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4">
          <p className="text-taupe font-mono text-xs uppercase tracking-wide">
            {t('rights', { year })}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label={tNav('social.github')}
              className={SOCIAL_LINK_CLASSNAME}
            >
              <GithubIcon size={18} aria-hidden="true" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={tNav('social.linkedin')}
              className={SOCIAL_LINK_CLASSNAME}
            >
              <LinkedinIcon size={18} aria-hidden="true" />
            </a>
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label={tNav('social.whatsapp')}
              className={SOCIAL_LINK_CLASSNAME}
            >
              <WhatsappIcon size={18} aria-hidden="true" />
            </a>
            <a
              href={SOCIAL_LINKS.email}
              aria-label={tNav('social.email')}
              className={SOCIAL_LINK_CLASSNAME}
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:text-right">
          <p className="font-display text-espresso text-xl font-bold">
            {t('name')}
          </p>
          <p className="text-taupe font-mono text-xs uppercase tracking-wide">
            {t('role')}
          </p>
        </div>
      </div>
    </footer>
  );
}
