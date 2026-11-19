'use client';

import { Layers } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TechLogo } from '@/components/atoms/tech-logo';
import { SectionDivider } from '@/components/molecules/section-divider';
import {
  LANGUAGE_TECHNOLOGIES,
  TECH_GROUPS,
  TOTAL_TECHNOLOGY_COUNT,
} from '@/lib/tech-groups';

const GROUP_ICON_CLASSNAME =
  'bg-sand text-clay-deep grid size-12 flex-none place-items-center rounded-2xl';
const EYEBROW_CLASSNAME =
  'text-taupe font-mono text-[13px] uppercase tracking-[0.08em]';

export function TechStack() {
  const t = useTranslations('technologiesPage');
  const architectureItems = t.raw('architecture.items') as string[];

  return (
    <>
      <section className="mx-auto max-w-[1160px] px-4 pb-12 pt-14 sm:px-6 md:pt-20">
        <p className="text-clay-deep mb-3 font-mono text-[13px] uppercase tracking-[0.08em]">
          {t('eyebrow', { count: TOTAL_TECHNOLOGY_COUNT })}
        </p>
        <h1 className="font-display text-espresso [&_em]:text-clay max-w-[760px] text-[clamp(40px,5.4vw,68px)] font-normal leading-[1.05] tracking-[-0.02em]">
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </h1>
        <p className="font-hand text-clay-deep mt-4 text-2xl">{t('hint')}</p>
      </section>

      <SectionDivider />

      <section className="mx-auto flex max-w-[1160px] flex-col gap-5 px-4 pb-24 sm:px-6 md:pb-[104px]">
        <article className="border-line-strong bg-sand-light flex flex-wrap items-center gap-x-9 gap-y-5 rounded-3xl border border-dashed px-6 py-7 sm:px-8">
          <ul className="flex gap-3">
            {LANGUAGE_TECHNOLOGIES.map((technology) => (
              <li
                key={technology.name}
                title={technology.name}
                className="border-line bg-paper text-espresso grid size-16 place-items-center rounded-[18px] border"
              >
                <TechLogo technology={technology} className="size-8" />
                <span className="sr-only">{technology.name}</span>
              </li>
            ))}
          </ul>
          <div className="min-w-0 flex-[1_1_320px]">
            <h2 className={EYEBROW_CLASSNAME}>{t('languages.label')}</h2>
            <p className="font-display text-espresso [&_em]:text-clay mt-1.5 text-[clamp(22px,2.4vw,28px)] leading-tight">
              {t.rich('languages.heading', {
                em: (chunks) => <em>{chunks}</em>,
              })}
            </p>
          </div>
        </article>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {TECH_GROUPS.map(({ key, Icon, technologies }) => (
            <article
              key={key}
              className="border-line bg-paper hover:border-dusty flex flex-col gap-[18px] rounded-3xl border p-[26px] transition-[border-color,box-shadow] duration-200 hover:shadow-[0_18px_40px_-26px_var(--shadow-color)]"
            >
              <div className="flex items-center gap-3.5">
                <span className={GROUP_ICON_CLASSNAME}>
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-espresso text-[22px] font-semibold leading-tight">
                    {t(`groups.${key}.title`)}
                  </h2>
                  <p className="text-taupe text-sm">
                    {t(`groups.${key}.note`)}
                  </p>
                </div>
                <span className="text-taupe font-mono text-[13px]">
                  {String(technologies.length).padStart(2, '0')}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="border-line-strong border-t-[1.5px] border-dashed"
              />
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1">
                {technologies.map((technology) => (
                  <li
                    key={technology.name}
                    className="hover:bg-sand-light group flex min-h-11 items-center gap-2.5 rounded-xl px-1.5 py-1 text-[15px] transition-colors duration-200"
                  >
                    <span className="bg-sand text-espresso group-hover:text-clay grid size-9 flex-none place-items-center rounded-[10px] transition-colors duration-200">
                      <TechLogo technology={technology} />
                    </span>
                    <span className="min-w-0 leading-tight">
                      {technology.name}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article className="border-line bg-paper flex flex-wrap items-center gap-x-7 gap-y-4 rounded-3xl border px-7 py-6">
          <div className="flex items-center gap-3.5">
            <span className={GROUP_ICON_CLASSNAME}>
              <Layers size={20} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <h2 className={EYEBROW_CLASSNAME}>{t('architecture.label')}</h2>
              <p className="text-espresso mt-0.5 font-semibold">
                {t('architecture.title')}
              </p>
            </div>
          </div>
          <ul className="flex flex-[1_1_320px] flex-wrap gap-2 sm:justify-end">
            {architectureItems.map((item) => (
              <li
                key={item}
                className="border-line-strong text-body rounded-full border px-4 py-2 text-[15px]"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  );
}
