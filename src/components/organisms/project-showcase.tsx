'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/atoms/separator';
import { Badge } from '@/components/atoms/badge';

const PROJECT_KEYS = [
  'oniapp',
  'oniappAdmin',
  'seja',
  'sejaAdmin',
  'praca22',
  'ritmar',
  'minceJoias',
] as const;

export function ProjectShowcase() {
  const t = useTranslations('projectsPage');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[32px] font-bold">
          {t('heading')}
        </h2>

        {PROJECT_KEYS.map((key, index) => {
          const features = t.raw(`items.${key}.features`) as string[];
          const stack = t.raw(`items.${key}.stack`) as string[];

          return (
            <div key={key}>
              {index > 0 && <Separator className="bg-rose/40 my-9" />}
              <h3 className="text-espresso font-serif text-[28px] font-bold">
                {t(`items.${key}.title`)}
              </h3>
              <p className="text-rose mt-1 font-mono text-sm uppercase tracking-wide">
                {t(`items.${key}.role`)}
              </p>
              <ul className="text-taupe mt-3 list-disc space-y-1.5 pl-5 text-[17px] leading-relaxed">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <Badge
                    key={tech}
                    className="bg-rose/[0.32] text-espresso h-auto rounded-[3px] px-3 py-1 font-mono text-xs uppercase tracking-wide"
                  >
                    {tech}
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
