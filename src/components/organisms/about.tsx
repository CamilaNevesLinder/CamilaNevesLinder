'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/atoms/separator';
import { CHESS_PROFILE_URL, type ChessStats } from '@/lib/chess';
import { JiujitsuGallery } from '@/components/organisms/jiujitsu-gallery';
import { BookGallery } from '@/components/organisms/book-gallery';

const ITEM_KEYS = ['jiujitsu', 'books', 'chess', 'english'] as const;

function ChessWidget({ stats }: { stats: ChessStats | null }) {
  const t = useTranslations('about.outsideCode.items.chess');

  if (!stats) {
    return <p className="text-taupe mt-3 text-sm italic">{t('unavailable')}</p>;
  }

  return (
    <div className="mt-4">
      <p className="text-rose font-mono text-sm uppercase tracking-wide">
        {t('streak', { days: stats.streakDays })}
      </p>
      <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
        <div>
          <p className="text-taupe font-mono text-xs uppercase tracking-wide">
            {t('rapid')}
          </p>
          <p className="text-espresso text-[17px] font-bold">
            {stats.rapid.rating}
            <span className="text-taupe ml-2 text-sm font-normal">
              {t('record', {
                wins: stats.rapid.win,
                losses: stats.rapid.loss,
                draws: stats.rapid.draw,
              })}
            </span>
          </p>
        </div>
        <div>
          <p className="text-taupe font-mono text-xs uppercase tracking-wide">
            {t('blitz')}
          </p>
          <p className="text-espresso text-[17px] font-bold">
            {stats.blitz.rating}
            <span className="text-taupe ml-2 text-sm font-normal">
              {t('record', {
                wins: stats.blitz.win,
                losses: stats.blitz.loss,
                draws: stats.blitz.draw,
              })}
            </span>
          </p>
        </div>
      </div>
      <a
        href={CHESS_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-rose mt-3 inline-block text-sm underline underline-offset-4"
      >
        {t('profileLink')}
      </a>
    </div>
  );
}

export function About({ chessStats }: { chessStats: ChessStats | null }) {
  const t = useTranslations('about');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[32px] font-bold">
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
            <h3 className="text-espresso font-serif text-[28px] font-bold">
              {t(`outsideCode.items.${key}.title`)}
            </h3>
            <p className="text-taupe mt-2 text-[17px] leading-relaxed">
              {t(`outsideCode.items.${key}.description`)}
            </p>
            {key === 'jiujitsu' && <JiujitsuGallery />}
            {key === 'books' && <BookGallery />}
            {key === 'chess' && <ChessWidget stats={chessStats} />}
          </div>
        ))}
      </div>
    </section>
  );
}
