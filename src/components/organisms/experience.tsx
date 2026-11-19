'use client';

import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/atoms/section-heading';
import { EducationList } from '@/components/molecules/education-list';
import { ExperienceItem } from '@/components/molecules/experience-item';
import { EXPERIENCE_ITEMS } from '@/lib/career';

export function Experience() {
  const t = useTranslations('experience');

  return (
    <section className="md:pb-30 mx-auto flex max-w-[1160px] flex-wrap gap-12 px-4 pb-24 sm:px-6">
      <div className="flex-[1_1_280px]">
        <SectionHeading>
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </SectionHeading>
        <EducationList />
      </div>
      <ol className="border-line-strong flex-[2_1_520px] border-l-[1.5px] border-dashed">
        {EXPERIENCE_ITEMS.map(({ key, isCurrent, topicKeys }) => (
          <ExperienceItem
            key={key}
            company={t(`items.${key}.company`)}
            summary={`${t(`items.${key}.role`)} · ${t(`items.${key}.line`)}`}
            topics={topicKeys.map((topicKey) =>
              t(`items.${key}.topics.${topicKey}`),
            )}
            isCurrent={isCurrent}
          />
        ))}
      </ol>
    </section>
  );
}
