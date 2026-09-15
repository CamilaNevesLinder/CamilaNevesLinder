'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';

const ITEM_KEYS = ['onilearning', 'ritmar', 'praca22', 'minceJoias'] as const;
const TOPIC_KEYS = ['topic1', 'topic2', 'topic3', 'topic4'] as const;

export function Experience() {
  const t = useTranslations('experience');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>

        {ITEM_KEYS.map((key, index) => (
          <div key={key}>
            {index > 0 && <Separator className="bg-rose/40 my-9" />}
            <h3 className="text-espresso font-serif text-[28px] font-bold">
              {t(`items.${key}.company`)}
            </h3>
            <p className="text-rose mt-1 font-mono text-sm uppercase tracking-wide">
              {t(`items.${key}.role`)}
            </p>
            <ul className="text-taupe mt-3 list-disc space-y-1.5 pl-5 text-[17px] leading-relaxed">
              {TOPIC_KEYS.map((topicKey) => (
                <li key={topicKey}>{t(`items.${key}.topics.${topicKey}`)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
