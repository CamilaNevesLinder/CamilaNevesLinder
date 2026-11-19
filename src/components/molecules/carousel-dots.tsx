'use client';

import { useCarousel } from '@/components/molecules/carousel';
import { useCarouselSelection } from '@/lib/use-carousel-selection';
import { cn } from '@/lib/utils';

export function CarouselDots({
  getDotLabel,
}: {
  getDotLabel: (slideNumber: number) => string;
}) {
  const { api } = useCarousel();
  const { selectedIndex, slideCount } = useCarouselSelection(api);

  return (
    <div className="mt-2 flex justify-center">
      {Array.from({ length: slideCount }, (_, index) => (
        <button
          key={index}
          type="button"
          aria-label={getDotLabel(index + 1)}
          aria-current={index === selectedIndex}
          onClick={() => api?.scrollTo(index)}
          className="group grid h-11 place-items-center px-[3px]"
        >
          <span
            className={cn(
              'block h-1.5 rounded-full transition-[width] duration-300 motion-reduce:transition-none',
              index === selectedIndex
                ? 'bg-clay w-[22px]'
                : 'bg-line-strong w-1.5',
            )}
          />
        </button>
      ))}
    </div>
  );
}
