'use client';

import { useTranslations } from 'next-intl';
import { SectionDivider } from '@/components/molecules/section-divider';
import { AboutIntro } from '@/components/organisms/about-intro';
import { BookGallery } from '@/components/organisms/book-gallery';
import { JiujitsuGallery } from '@/components/organisms/jiujitsu-gallery';
import { LanguageSkills } from '@/components/organisms/language-skills';

export function AboutPage() {
  const t = useTranslations('aboutPage.sections');

  return (
    <>
      <AboutIntro />
      <SectionDivider number="01" label={t('jiujitsu')} />
      <JiujitsuGallery />
      <SectionDivider number="02" label={t('books')} />
      <BookGallery />
      <SectionDivider number="03" label={t('languages')} />
      <LanguageSkills />
    </>
  );
}
