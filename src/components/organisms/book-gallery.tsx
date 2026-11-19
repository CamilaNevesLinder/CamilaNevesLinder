'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/atoms/section-heading';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/molecules/carousel';
import { CarouselControls } from '@/components/molecules/carousel-controls';

export function BookGallery() {
  const t = useTranslations('aboutPage.books');
  const tSections = useTranslations('aboutPage.sections');
  const titles = t.raw('titles') as Record<string, string>;
  const fileNumbers = Object.keys(titles).sort();

  return (
    <Carousel
      opts={{ loop: true, align: 'start' }}
      aria-label={tSections('books')}
      className="md:pb-30 mx-auto max-w-[1160px] px-4 pb-24 sm:px-6"
    >
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0 flex-[1_1_420px]">
          <SectionHeading>
            {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
          </SectionHeading>
          <p className="text-mocha mt-3.5">{t('description')}</p>
        </div>
        <CarouselControls previousLabel={t('previous')} nextLabel={t('next')} />
      </div>
      <div className="border-line bg-paper overflow-hidden rounded-t-3xl border border-b-0 px-5 pt-9 sm:px-7">
        <CarouselContent className="-ml-[22px] items-end">
          {fileNumbers.map((fileNumber) => (
            <CarouselItem key={fileNumber} className="basis-[158px] pl-[22px]">
              <figure className="duration-250 flex w-[136px] flex-col gap-2.5 transition-transform hover:-translate-y-2 motion-reduce:hover:translate-y-0">
                <Image
                  src={`/books/book-${fileNumber}.jpg`}
                  alt={t('coverAlt', { title: titles[fileNumber] })}
                  width={136}
                  height={204}
                  className="block h-[204px] w-[136px] rounded-[2px_6px_6px_2px] object-cover shadow-[inset_4px_0_0_rgba(0,0,0,0.15),0_12px_20px_-12px_var(--shadow-color)]"
                />
                <figcaption className="text-mocha h-10 overflow-hidden text-[13px] leading-[1.35]">
                  {titles[fileNumber]}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      <div
        aria-hidden="true"
        className="bg-line-strong h-4 rounded-[4px] shadow-[0_12px_20px_-14px_var(--shadow-color)]"
      />
    </Carousel>
  );
}
