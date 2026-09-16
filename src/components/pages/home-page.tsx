import { Hero } from '@/components/organisms/hero';
import { Projects } from '@/components/organisms/projects';
import { AiProcess } from '@/components/organisms/ai-process';
import { Experience } from '@/components/organisms/experience';
import { Education } from '@/components/organisms/education';

export function HomePage() {
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
