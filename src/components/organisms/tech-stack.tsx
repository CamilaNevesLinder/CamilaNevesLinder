'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/atoms/separator';
import { Badge } from '@/components/atoms/badge';

const CATEGORY_KEYS = [
  'languages',
  'frontendMobile',
  'backend',
  'toolsCloud',
  'testing',
  'architecture',
] as const;

export function TechStack() {
  const t = useTranslations('technologiesPage');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
          {t('heading')}
        </h2>

        {CATEGORY_KEYS.map((key, index) => {
          const items = t.raw(`categories.${key}.items`) as string[];

          return (
            <div key={key}>
              {index > 0 && <Separator className="bg-rose/40 my-9" />}
              <h3 className="text-espresso font-serif text-[20px] font-bold sm:text-[24px]">
                {t(`categories.${key}.title`)}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge
                    key={item}
                    className="bg-rose/[0.32] text-espresso h-auto rounded-lg px-3 py-1 font-mono text-xs uppercase tracking-wide"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
