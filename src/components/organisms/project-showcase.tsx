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
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
          {t('heading')}
        </h2>

        <div className="mt-12">
          {PROJECT_KEYS.map((key, index) => {
            const features = t.raw(`items.${key}.features`) as string[];
            const stack = t.raw(`items.${key}.stack`) as string[];

            return (
              <div key={key}>
                {index > 0 && <Separator className="bg-rose/40 my-12" />}
                <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="text-espresso/85 mt-3 text-[18px] leading-relaxed">
                  {t(`items.${key}.role`)}
                </p>
                <ul className="text-taupe marker:text-rose mt-5 list-disc space-y-2 pl-5 text-[16px] leading-relaxed">
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-rose/[0.32] text-espresso h-auto rounded-lg px-3 py-1 font-mono text-xs uppercase tracking-wide"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
