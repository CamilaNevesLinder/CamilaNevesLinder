'use client';

import { useTranslations } from 'next-intl';
import { Badge } from '@/components/atoms/badge';
import { STUDY_BADGE_CLASSNAME } from '@/components/organisms/english-skills';

const LANGUAGE_KEYS = ['german', 'spanish'] as const;

export function OtherLanguages() {
  const t = useTranslations('about.outsideCode.items.languages');

  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {LANGUAGE_KEYS.map((key) => (
        <Badge key={key} className={STUDY_BADGE_CLASSNAME}>
          {t(`items.${key}`)}
        </Badge>
      ))}
    </div>
  );
}
