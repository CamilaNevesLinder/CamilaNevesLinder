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
import { CarouselDots } from '@/components/molecules/carousel-dots';
import {
  JIUJITSU_PHOTO_NUMBERS,
  POLAROID_ROTATIONS,
} from '@/lib/about-galleries';
import { cn } from '@/lib/utils';

export function JiujitsuGallery() {
  const t = useTranslations('aboutPage.jiujitsu');
  const tSections = useTranslations('aboutPage.sections');

  return (
    <Carousel
      opts={{ loop: true, align: 'start' }}
      aria-label={tSections('jiujitsu')}
      className="md:pb-30 mx-auto max-w-[1160px] px-4 pb-24 sm:px-6"
    >
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0 flex-[1_1_420px]">
          <SectionHeading>
            {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
          </SectionHeading>
          <p className="text-mocha mt-3.5 max-w-[520px]">{t('description')}</p>
          <div
            aria-hidden="true"
            className="mt-5 flex h-3 max-w-[280px] overflow-hidden rounded-[3px]"
          >
            <span className="bg-belt-purple flex-1" />
            <span className="bg-belt-black flex w-14 justify-center gap-1.5">
              <span className="bg-paper w-1" />
              <span className="bg-paper w-1" />
            </span>
            <span className="bg-belt-purple w-[18px]" />
          </div>
        </div>
        <CarouselControls previousLabel={t('previous')} nextLabel={t('next')} />
      </div>
      <CarouselContent className="-ml-6 pb-7 pt-5">
        {JIUJITSU_PHOTO_NUMBERS.map((number, index) => (
          <CarouselItem key={number} className="basis-[256px] pl-6">
            <figure
              className={cn(
                'bg-paper duration-250 relative w-[232px] p-2.5 pb-[54px] shadow-[0_16px_30px_-18px_var(--shadow-color)] transition-transform hover:-translate-y-1.5 hover:rotate-0 motion-reduce:hover:translate-y-0',
                POLAROID_ROTATIONS[index % POLAROID_ROTATIONS.length],
              )}
            >
              <Image
                src={`/jiujitsu/jiujitsu-${number}.jpg`}
                alt={t(`photos.${number}.alt`)}
                width={212}
                height={250}
                className="block h-[250px] w-[212px] object-cover"
              />
              <figcaption className="font-hand text-mocha absolute inset-x-2.5 bottom-2.5 text-center text-[19px] leading-[1.1]">
                {t(`photos.${number}.caption`)}
              </figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots
        getDotLabel={(slideNumber) => t('goTo', { number: slideNumber })}
      />
    </Carousel>
  );
}
