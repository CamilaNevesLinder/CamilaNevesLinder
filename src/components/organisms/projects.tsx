'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/atoms/section-heading';
import { BrowserMock } from '@/components/molecules/browser-mock';
import { PhoneMock } from '@/components/molecules/phone-mock';
import { HOME_PROJECTS, TOTAL_PROJECT_COUNT } from '@/lib/home-projects';
import { Link } from '@/lib/navigation';
import { projectColorStyle } from '@/lib/project-color-style';

export function Projects() {
  const t = useTranslations('projects');

  return (
    <section className="md:pb-30 mx-auto max-w-[1160px] px-4 pb-24 sm:px-6">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading>
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </SectionHeading>
        <Link
          href="/projects"
          className="text-clay-deep hover:text-espresso inline-flex min-h-11 items-center gap-2 font-medium transition-colors duration-200"
        >
          {t('seeAll', { count: TOTAL_PROJECT_COUNT })}
          <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
        </Link>
      </div>

      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
        {HOME_PROJECTS.map(({ key, showcaseKey, mock, colorToken, stack }) => (
          <li key={key}>
            <Link
              href={{ pathname: '/projects', hash: showcaseKey }}
              style={projectColorStyle(colorToken)}
              className="border-line bg-paper text-body duration-250 flex h-full flex-col overflow-hidden rounded-3xl border transition-[transform,box-shadow] ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_var(--shadow-color)] motion-reduce:hover:translate-y-0"
            >
              <div className="relative flex h-[210px] items-end justify-center overflow-hidden bg-[color-mix(in_srgb,var(--project-color)_20%,transparent)]">
                <div
                  aria-hidden="true"
                  className="bg-size-[16px_16px] absolute inset-0 bg-[radial-gradient(color-mix(in_srgb,var(--color-espresso)_12%,transparent)_1px,transparent_1.2px)]"
                />
                {mock === 'phone' ? <PhoneMock /> : <BrowserMock />}
                <span className="bg-paper text-body absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-xs">
                  {t(`items.${key}.kind`)}
                </span>
              </div>
              <div className="pb-6.5 flex flex-col gap-3 px-6 pt-6">
                <h3 className="font-display text-espresso text-2xl font-semibold leading-tight">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-mocha">{t(`items.${key}.line`)}</p>
                <div className="mt-1 flex flex-wrap items-center justify-between gap-2.5">
                  <span className="flex flex-wrap gap-1.5">
                    {stack.map((technology) => (
                      <span
                        key={technology}
                        className="border-line-strong text-mocha rounded-full border px-3 py-1 text-[13px]"
                      >
                        {technology}
                      </span>
                    ))}
                  </span>
                  <span className="text-clay-deep inline-flex items-center gap-1.5 text-sm font-medium">
                    {t('learnMore')}
                    <ArrowRight
                      size={16}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
