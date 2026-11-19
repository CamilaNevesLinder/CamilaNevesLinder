'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCarousel } from '@/components/molecules/carousel';
import { useCarouselSelection } from '@/lib/use-carousel-selection';

const ARROW_CLASSNAME =
  'border-line text-body hover:bg-sand grid size-11 place-items-center rounded-full border transition-colors duration-200';

function padNumber(value: number) {
  return String(value).padStart(2, '0');
}

export function CarouselControls({
  previousLabel,
  nextLabel,
}: {
  previousLabel: string;
  nextLabel: string;
}) {
  const { api, scrollPrev, scrollNext } = useCarousel();
  const { selectedIndex, slideCount } = useCarouselSelection(api);

  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-live="polite"
        className="text-taupe min-w-[60px] font-mono text-[13px]"
      >
        {slideCount > 0 &&
          `${padNumber(selectedIndex + 1)} / ${padNumber(slideCount)}`}
      </span>
      <button
        type="button"
        aria-label={previousLabel}
        onClick={scrollPrev}
        className={ARROW_CLASSNAME}
      >
        <ArrowLeft size={18} strokeWidth={1.6} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={scrollNext}
        className={ARROW_CLASSNAME}
      >
        <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  );
}
