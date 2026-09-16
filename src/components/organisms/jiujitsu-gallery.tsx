'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/molecules/carousel';

const PHOTO_COUNT = 12;
const PHOTO_INDEXES = Array.from({ length: PHOTO_COUNT }, (_, i) => i);

export function JiujitsuGallery() {
  const t = useTranslations('about.outsideCode.items.jiujitsu');
  const captions = t.raw('gallery') as Record<string, string>;

  return (
    <Carousel className="mt-5" opts={{ align: 'start' }}>
      <CarouselContent>
        {PHOTO_INDEXES.map((index) => {
          const fileNumber = String(index + 1).padStart(2, '0');
          const caption = captions[fileNumber] ?? '';

          return (
            <CarouselItem
              key={fileNumber}
              className="basis-[70%] sm:basis-1/2 md:basis-1/3"
            >
              <div className="border-rose/30 aspect-[3/4] overflow-hidden rounded-lg border">
                <Image
                  src={`/jiujitsu/jiujitsu-${fileNumber}.jpg`}
                  alt={caption}
                  width={640}
                  height={853}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-taupe mt-2 text-sm leading-snug">{caption}</p>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="mt-3 flex gap-2">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );
}
