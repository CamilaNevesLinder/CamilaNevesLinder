'use client';

import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';
import { Badge } from '@/components/atoms/badge';
import { cn } from '@/lib/utils';

const MAX_RATING = 5;

const SKILLS = [
  { key: 'reading', rating: 5 },
  { key: 'listening', rating: 5 },
  { key: 'writing', rating: 4 },
  { key: 'speaking', rating: 4 },
] as const;

const STUDY_ITEMS = [
  { key: 'marioVergara', href: 'https://www.instagram.com/mairovergara/' },
  { key: 'duolingo' },
  { key: 'foreignFilms' },
  { key: 'conversation' },
] as const;

const STUDY_BADGE_CLASSNAME =
  'bg-rose/[0.32] text-espresso h-auto rounded-lg px-3 py-1 font-mono text-xs uppercase tracking-wide';

export function EnglishSkills() {
  const t = useTranslations('about.outsideCode.items.english');

  return (
    <div className="mt-5">
      <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        {SKILLS.map(({ key, rating }) => {
          const label = t(`skills.${key}`);

          return (
            <li key={key}>
              <p className="text-espresso font-mono text-sm uppercase tracking-wide">
                {label}
              </p>
              <div
                role="img"
                aria-label={t('ratingLabel', { skill: label, rating })}
                className="mt-2 flex gap-1"
              >
                {Array.from({ length: MAX_RATING }, (_, index) => {
                  const isFilled = index < rating;
                  return (
                    <Star
                      key={index}
                      size={18}
                      aria-hidden="true"
                      data-filled={isFilled}
                      className={cn(
                        'text-rose',
                        isFilled ? 'fill-rose' : 'opacity-40',
                      )}
                    />
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-taupe mb-3 mt-8 font-mono text-sm uppercase tracking-wide">
        {t('study.label')}
      </p>
      <div className="flex flex-wrap gap-2">
        {STUDY_ITEMS.map((item) =>
          'href' in item ? (
            <Badge
              key={item.key}
              render={<a href={item.href} target="_blank" rel="noreferrer" />}
              className={cn(
                STUDY_BADGE_CLASSNAME,
                'hover:bg-rose/50 underline-offset-4 transition-colors hover:underline',
              )}
            >
              {t(`study.items.${item.key}`)}
            </Badge>
          ) : (
            <Badge key={item.key} className={STUDY_BADGE_CLASSNAME}>
              {t(`study.items.${item.key}`)}
            </Badge>
          ),
        )}
      </div>
    </div>
  );
}
