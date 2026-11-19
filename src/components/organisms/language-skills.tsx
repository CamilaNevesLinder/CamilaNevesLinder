'use client';

import { useTranslations } from 'next-intl';
import { Chip } from '@/components/atoms/chip';
import { SectionHeading } from '@/components/atoms/section-heading';
import {
  ENGLISH_SKILLS,
  MAX_SKILL_RATING,
  STUDYING_LANGUAGES,
  STUDY_METHODS,
} from '@/lib/language-skills';

const LANGUAGE_BADGE_CLASSNAME =
  'bg-sand text-clay-deep grid size-12 shrink-0 place-items-center rounded-2xl font-mono text-[13px]';

export function LanguageSkills() {
  const t = useTranslations('aboutPage.languages');

  return (
    <section className="mx-auto max-w-[1160px] px-4 pb-24 sm:px-6 md:pb-[104px]">
      <div className="mb-9">
        <SectionHeading>
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </SectionHeading>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
        <article className="border-line bg-paper rounded-3xl border p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3.5">
            <span aria-hidden="true" className={LANGUAGE_BADGE_CLASSNAME}>
              EN
            </span>
            <div>
              <h3 className="text-espresso text-xl font-semibold">
                {t('english.name')}
              </h3>
              <p className="text-taupe text-[15px]">{t('english.note')}</p>
            </div>
          </div>
          <ul className="flex flex-col gap-3.5">
            {ENGLISH_SKILLS.map(({ key, rating }) => {
              const label = t(`english.skills.${key}`);
              return (
                <li key={key} className="flex items-center gap-3.5">
                  <span className="text-mocha w-[72px] text-[15px]">
                    {label}
                  </span>
                  <span
                    role="img"
                    aria-label={t('english.ratingLabel', {
                      skill: label,
                      rating,
                    })}
                    className="bg-sand h-2 flex-1 overflow-hidden rounded-full"
                  >
                    <span
                      className="bg-clay block h-full rounded-full"
                      style={{ width: `${(rating / MAX_SKILL_RATING) * 100}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
          <h4 className="text-taupe mt-7 font-mono text-[13px] uppercase tracking-[0.08em]">
            {t('english.study.label')}
          </h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {STUDY_METHODS.map((method) => (
              <Chip key={method.key}>
                {'href' in method ? (
                  <a
                    href={method.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-espresso underline-offset-4 hover:underline"
                  >
                    {t(`english.study.items.${method.key}`)}
                  </a>
                ) : (
                  t(`english.study.items.${method.key}`)
                )}
              </Chip>
            ))}
          </ul>
        </article>
        <article className="border-line-strong bg-sand-light flex flex-col gap-5 rounded-3xl border border-dashed p-6 sm:p-8">
          {STUDYING_LANGUAGES.map(({ key, code }) => (
            <div key={key} className="flex items-center gap-3.5">
              <span aria-hidden="true" className={LANGUAGE_BADGE_CLASSNAME}>
                {code}
              </span>
              <div>
                <h3 className="text-espresso text-xl font-semibold">
                  {t(`${key}.name`)}
                </h3>
                <p className="text-taupe text-[15px]">{t(`${key}.note`)}</p>
              </div>
            </div>
          ))}
          <p className="font-hand text-clay-deep mt-auto text-2xl leading-tight">
            {t('curiosity')}
          </p>
        </article>
      </div>
    </section>
  );
}
