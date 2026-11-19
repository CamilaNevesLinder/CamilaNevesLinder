'use client';

import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SOCIAL_CHANNELS } from '@/lib/social-channels';

export function ContactChannels() {
  const t = useTranslations('nav.social');

  return (
    <ul className="flex flex-col gap-1.5">
      {SOCIAL_CHANNELS.map(({ key, href, handle, isExternal, Icon }) => (
        <li key={key}>
          <a
            href={href}
            {...(isExternal && { target: '_blank', rel: 'noreferrer' })}
            className="hover:bg-sand-light text-body flex min-h-14 items-center gap-3.5 rounded-2xl px-3 py-2 transition-[background-color,transform] duration-200 hover:translate-x-1 motion-reduce:hover:translate-x-0"
          >
            <span className="bg-sand text-clay-deep grid size-11 flex-none place-items-center rounded-[14px]">
              <Icon size={20} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="text-espresso block font-semibold">
                {t(key)}
              </span>
              <span className="text-taupe block text-sm [overflow-wrap:anywhere]">
                {handle}
              </span>
            </span>
            <ArrowUpRight
              size={18}
              strokeWidth={1.6}
              aria-hidden="true"
              className="text-clay-deep shrink-0"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
