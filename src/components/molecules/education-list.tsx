'use client';

import { useTranslations } from 'next-intl';
import { EDUCATION_ITEMS } from '@/lib/career';

export function EducationList() {
  const t = useTranslations('education');

  return (
    <div className="mt-9">
      <h3 className="text-taupe font-mono text-[13px] uppercase tracking-[0.08em]">
        {t('label')}
      </h3>
      <ul className="mt-3.5 flex flex-col gap-3.5">
        {EDUCATION_ITEMS.map(({ key, Icon }) => (
          <li key={key} className="text-mocha flex items-center gap-3">
            <span className="bg-sand text-clay-deep grid size-10 shrink-0 place-items-center rounded-xl">
              <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span>
              <strong className="text-espresso block font-semibold">
                {t(`items.${key}.title`)}
              </strong>
              <span className="block text-[15px]">
                {t(`items.${key}.status`)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
