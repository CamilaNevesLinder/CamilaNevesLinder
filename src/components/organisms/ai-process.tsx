'use client';

import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/atoms/section-heading';
import { AI_PROCESS_STEPS } from '@/lib/ai-process-steps';

export function AiProcess() {
  const t = useTranslations('aiProcess');

  return (
    <section className="md:pb-30 mx-auto max-w-[1160px] px-4 pb-24 sm:px-6">
      <div className="border-line bg-paper relative rounded-[28px] border bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_35px,color-mix(in_srgb,var(--color-rose)_24%,transparent)_35px,color-mix(in_srgb,var(--color-rose)_24%,transparent)_36px)] py-14 pl-[clamp(40px,7vw,96px)] pr-[clamp(24px,5vw,64px)]">
        <span
          aria-hidden="true"
          className="bg-dusty absolute inset-y-0 left-[clamp(20px,4vw,56px)] w-[1.5px] opacity-60"
        />
        <SectionHeading>
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </SectionHeading>
        <p className="font-hand text-clay-deep mb-10 mt-3 text-2xl">
          {t('note')}
        </p>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7">
          {AI_PROCESS_STEPS.map(({ key, Icon }, index) => (
            <li key={key} className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="font-hand text-dusty text-[40px] leading-none"
                >
                  {index + 1}.
                </span>
                <span className="bg-sand text-clay-deep grid size-10 place-items-center rounded-xl">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
              </div>
              <h3 className="text-espresso text-[19px] font-semibold">
                {t(`steps.${key}.title`)}
              </h3>
              <p className="text-mocha">{t(`steps.${key}.description`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
