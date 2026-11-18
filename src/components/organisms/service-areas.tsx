'use client';

import { useTranslations } from 'next-intl';
import { SERVICE_AREAS } from '@/lib/service-areas';

export function ServiceAreas() {
  const t = useTranslations('home.serviceAreas');

  return (
    <section
      aria-label={t('label')}
      className="md:pb-30 mx-auto max-w-[1160px] px-4 pb-24 sm:px-6"
    >
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
        {SERVICE_AREAS.map(({ key, stack, Icon }) => (
          <li
            key={key}
            className="border-line bg-paper flex items-start gap-4 rounded-[20px] border p-6"
          >
            <span className="bg-sand text-clay-deep grid size-11 shrink-0 place-items-center rounded-[14px]">
              <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-espresso font-semibold">{t(key)}</h3>
              <p className="text-taupe mt-0.5 text-[15px]">{stack}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
