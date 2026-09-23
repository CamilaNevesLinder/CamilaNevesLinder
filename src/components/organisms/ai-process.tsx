'use client';

import { useTranslations } from 'next-intl';

const STEP_KEYS = ['plan', 'spec', 'review'] as const;

export function AiProcess() {
  const t = useTranslations('aiProcess');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
          {t('heading')}
        </h2>
        <p className="text-taupe mt-3 text-[17px] leading-relaxed">
          {t('intro')}
        </p>

        <div className="mt-10 grid gap-9 sm:grid-cols-3">
          {STEP_KEYS.map((key, index) => (
            <div key={key}>
              <p className="text-rose font-mono text-sm">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-espresso mt-2 font-serif text-[20px] font-bold">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="text-taupe mt-2 text-[15px] leading-relaxed">
                {t(`steps.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
