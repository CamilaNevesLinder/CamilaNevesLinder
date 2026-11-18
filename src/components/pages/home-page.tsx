'use client';

import { useTranslations } from 'next-intl';
import { SectionDivider } from '@/components/molecules/section-divider';
import { AiProcess } from '@/components/organisms/ai-process';
import { Education } from '@/components/organisms/education';
import { Experience } from '@/components/organisms/experience';
import { Hero } from '@/components/organisms/hero';
import { Projects } from '@/components/organisms/projects';
import { ServiceAreas } from '@/components/organisms/service-areas';

export function HomePage() {
  const t = useTranslations('home.sections');

  return (
    <>
      <Hero />
      <SectionDivider number="01" label={t('serviceAreas')} />
      <ServiceAreas />
      <SectionDivider number="02" label={t('projects')} />
      <Projects />
      <SectionDivider number="03" label={t('aiProcess')} />
      <AiProcess />
      <Experience />
      <Education />
    </>
  );
}
