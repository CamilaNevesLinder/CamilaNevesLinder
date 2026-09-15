import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { AiProcess } from '@/components/ai-process';
import { Experience } from '@/components/experience';
import { Education } from '@/components/education';
import { setRequestLocale } from 'next-intl/server';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero />
      <Projects />
      <AiProcess />
      <Experience />
      <Education />
    </>
  );
}
