'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export function BookGallery() {
  const t = useTranslations('about.outsideCode.items.books');
  const titles = t.raw('gallery') as Record<string, string>;
  const fileNumbers = Object.keys(titles).sort();

  return (
    <Carousel className="mt-5" opts={{ align: 'start' }}>
      <CarouselContent>
        {fileNumbers.map((fileNumber) => {
          const title = titles[fileNumber];

          return (
            <CarouselItem
              key={fileNumber}
              className="basis-[42%] sm:basis-1/4 md:basis-1/5"
            >
              <div className="border-rose/30 aspect-[2/3] overflow-hidden rounded-lg border">
                <Image
                  src={`/books/book-${fileNumber}.jpg`}
                  alt={title}
                  width={333}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-taupe mt-2 text-sm leading-snug">{title}</p>
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
