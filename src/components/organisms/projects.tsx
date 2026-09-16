'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/atoms/badge';
import { Separator } from '@/components/atoms/separator';

const PROJECT_ITEMS: {
  key: 'learningApp' | 'wellnessApp' | 'gymPlatform' | 'musicSite';
  tags: string[];
}[] = [
  { key: 'learningApp', tags: ['React Native', 'Expo', 'Next.js', 'NestJS'] },
  { key: 'wellnessApp', tags: ['React Native', 'Expo', 'NestJS', 'Next.js'] },
  { key: 'gymPlatform', tags: ['NestJS', 'Next.js', 'React'] },
  { key: 'musicSite', tags: ['React', 'Vite'] },
];

export function Projects() {
  const t = useTranslations('projects');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('heading')}
        </p>

        {PROJECT_ITEMS.map(({ key, tags }, index) => (
          <div key={key}>
            {index > 0 && <Separator className="bg-rose/40 my-9" />}
            <h3 className="text-espresso font-serif text-[28px] font-bold">
              {t(`items.${key}.title`)}
            </h3>
            <p className="text-taupe mt-3 text-[17px] leading-relaxed">
              {t(`items.${key}.description`)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-rose/[0.32] text-espresso h-auto rounded-[3px] px-4 py-2 font-mono text-[15px] uppercase tracking-wide"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
