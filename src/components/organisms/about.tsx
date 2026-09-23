'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/atoms/separator';
import { JiujitsuGallery } from '@/components/organisms/jiujitsu-gallery';
import { BookGallery } from '@/components/organisms/book-gallery';

const ITEM_KEYS = ['jiujitsu', 'books', 'english'] as const;

export function About() {
  const t = useTranslations('about');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
          {t('heading')}
        </h2>
        <p className="text-taupe mt-3 text-[17px] leading-relaxed">
          {t('intro')}
        </p>
        <p className="text-taupe mt-3 text-[17px] leading-relaxed">
          {t('introHobbies')}
        </p>

        <p className="text-taupe mb-[18px] mt-12 font-mono text-sm uppercase tracking-wide">
          {t('outsideCode.label')}
        </p>

        {ITEM_KEYS.map((key, index) => (
          <div key={key}>
            {index > 0 && <Separator className="bg-rose/40 my-9" />}
            <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
              {t(`outsideCode.items.${key}.title`)}
            </h3>
            <p className="text-taupe mt-2 text-[17px] leading-relaxed">
              {t(`outsideCode.items.${key}.description`)}
            </p>
            {key === 'jiujitsu' && <JiujitsuGallery />}
            {key === 'books' && <BookGallery />}
          </div>
        ))}
      </div>
    </section>
  );
}
