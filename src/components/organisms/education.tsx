'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/atoms/separator';

const ITEM_KEYS = ['ads', 'alura'] as const;

export function Education() {
  const t = useTranslations('education');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>

        {ITEM_KEYS.map((key, index) => (
          <div key={key}>
            {index > 0 && <Separator className="bg-rose/40 my-9" />}
            <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
              {t(`items.${key}.title`)}
            </h3>
            <p className="text-rose mt-1 font-mono text-sm uppercase tracking-wide">
              {t(`items.${key}.institution`)} · {t(`items.${key}.status`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
