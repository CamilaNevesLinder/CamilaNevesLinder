'use client';

import { ArrowRight, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="md:pt-22 mx-auto flex max-w-[1160px] flex-wrap items-center gap-14 px-4 pb-20 pt-14 sm:px-6 md:pb-24">
      <div className="min-w-0 flex-[999_1_520px]">
        <p className="border-dusty text-taupe mb-7 inline-flex items-center gap-2 rounded-full border border-dashed py-1.5 pl-2.5 pr-3.5 font-mono text-[13px]">
          <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
          {t('location')}
        </p>
        <h1 className="font-display text-espresso text-[clamp(44px,6.4vw,84px)] font-normal leading-[1.02] tracking-[-0.02em]">
          {t.rich('title', {
            highlight: (chunks) => (
              <span className="text-clay relative inline-block italic">
                {chunks}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 -left-[2%] h-4 w-[104%]"
                >
                  <path
                    d="M3 13 C 60 4, 120 16, 180 8 S 270 6, 297 11"
                    fill="none"
                    stroke="var(--color-dusty)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            ),
          })}
        </h1>
        <p className="text-mocha mt-8 max-w-[520px] text-[19px]">
          {t('description')}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="bg-espresso text-cream inline-flex min-h-12 items-center gap-2.5 rounded-full px-6 font-medium"
          >
            {t('workCta')}
            <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="border-line-strong text-espresso hover:bg-sand inline-flex min-h-12 items-center gap-2.5 rounded-full border px-6 font-medium transition-colors duration-200"
          >
            <Mail size={18} strokeWidth={1.6} aria-hidden="true" />
            {t('contactCta')}
          </Link>
        </div>
      </div>

      <div className="relative flex flex-[1_1_300px] justify-center py-6">
        <figure className="bg-paper relative rotate-3 rounded-[4px] p-3.5 pb-14 shadow-[0_1px_0_var(--color-line),0_24px_48px_-24px_var(--shadow-color)]">
          <span
            aria-hidden="true"
            className="bg-dusty/45 -rotate-4 absolute -top-3.5 left-1/2 h-[30px] w-[110px] -translate-x-1/2 border-x-2 border-dashed border-white/50"
          />
          <Image
            src="/camila.png"
            alt={t('photoAlt')}
            width={260}
            height={300}
            priority
            className="block h-[300px] w-[260px] rounded-[2px] object-cover object-[center_20%]"
          />
          <figcaption className="font-hand text-mocha absolute inset-x-0 bottom-3 text-center text-2xl">
            {t('photoNote')}
          </figcaption>
        </figure>
        <p className="bg-espresso text-cream font-hand -rotate-10 absolute bottom-0 right-[4%] grid size-[108px] place-items-center rounded-full text-center text-[21px] leading-[1.05] shadow-[0_10px_24px_-12px_var(--shadow-color)]">
          {t.rich('beltSticker', { br: () => <br /> })}
        </p>
      </div>
    </section>
  );
}
