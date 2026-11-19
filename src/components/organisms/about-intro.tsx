'use client';

import { BookOpen, Languages, Medal } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Chip } from '@/components/atoms/chip';

const INTRO_CHIPS = [
  { key: 'purpleBelt', Icon: Medal },
  { key: 'reader', Icon: BookOpen },
  { key: 'languages', Icon: Languages },
] as const;

export function AboutIntro() {
  const t = useTranslations('aboutPage');

  return (
    <section className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pb-24 md:pt-20">
      <div className="min-w-0 flex-[999_1_480px]">
        <p className="text-clay-deep mb-3 font-mono text-[13px] uppercase tracking-[0.08em]">
          {t('eyebrow')}
        </p>
        <h1 className="font-display text-espresso [&_em]:text-clay text-[clamp(40px,5.4vw,68px)] font-normal leading-[1.05] tracking-[-0.02em]">
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </h1>
        <p className="text-mocha mt-6 max-w-[540px] text-[19px]">
          {t('intro')}
        </p>
        <ul className="mt-7 flex flex-wrap gap-2">
          {INTRO_CHIPS.map(({ key, Icon }) => (
            <Chip key={key}>
              <Icon size={15} strokeWidth={1.6} aria-hidden="true" />
              {t(`chips.${key}`)}
            </Chip>
          ))}
        </ul>
      </div>
      <div className="flex flex-[1_1_280px] justify-center">
        <figure className="bg-paper relative -rotate-3 rounded-[4px] p-3.5 pb-14 shadow-[0_1px_0_var(--color-line),0_24px_48px_-24px_var(--shadow-color)]">
          <span
            aria-hidden="true"
            className="bg-dusty/45 absolute -top-3.5 left-1/2 h-[30px] w-[110px] -translate-x-1/2 rotate-[5deg]"
          />
          <Image
            src="/camila.png"
            alt={t('portraitAlt')}
            width={240}
            height={280}
            className="block h-[280px] w-[240px] object-cover object-[center_20%]"
          />
          <figcaption className="font-hand text-mocha absolute inset-x-0 bottom-3 text-center text-2xl">
            {t('portraitCaption')}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
