'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import {
  PROJECT_FILTERS,
  SHOWCASE_PROJECTS,
  countProjectsIn,
  type ProjectFilter,
  type ShowcaseProjectKey,
} from '@/lib/showcase-projects';
import { SectionDivider } from '@/components/molecules/section-divider';
import { ShowcaseProjectCard } from '@/components/molecules/showcase-project-card';
import { cn } from '@/lib/utils';

export function ProjectShowcase() {
  const t = useTranslations('projectsPage');
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [openProject, setOpenProject] = useState<ShowcaseProjectKey | null>(
    'oniapp',
  );
  const visibleProjects = SHOWCASE_PROJECTS.filter(
    ({ group }) => activeFilter === 'all' || group === activeFilter,
  );

  return (
    <>
      <section className="mx-auto max-w-[1160px] px-4 pb-12 pt-14 sm:px-6 md:pt-20">
        <p className="text-clay-deep mb-3 font-mono text-[13px] uppercase tracking-[0.08em]">
          {t('eyebrow', { count: countProjectsIn('all') })}
        </p>
        <h1 className="font-display text-espresso [&_em]:text-clay max-w-[760px] text-[clamp(40px,5.4vw,68px)] font-normal leading-[1.05] tracking-[-0.02em]">
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </h1>
        <p className="font-hand text-clay-deep mt-4 text-2xl">{t('hint')}</p>
        <div
          role="group"
          aria-label={t('filterLabel')}
          className="mt-9 flex flex-wrap gap-2"
        >
          {PROJECT_FILTERS.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-full border px-[18px] text-[15px] font-medium',
                  isActive
                    ? 'border-espresso bg-espresso text-cream'
                    : 'border-line text-body hover:bg-sand transition-colors duration-200',
                )}
              >
                {t(`filters.${filter}`)}
                <span className="font-mono text-xs opacity-70">
                  {countProjectsIn(filter)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <SectionDivider />

      <section className="mx-auto max-w-[1160px] px-4 pb-24 sm:px-6 md:pb-[104px]">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-5">
          {visibleProjects.map(({ key, initial, colorToken, image }) => (
            <ShowcaseProjectCard
              key={key}
              projectKey={key}
              initial={initial}
              colorToken={colorToken}
              image={image}
              isOpen={openProject === key}
              onToggle={() =>
                setOpenProject((current) => (current === key ? null : key))
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
