'use client';

import { useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/molecules/carousel';

export function useCarouselSelection(api: CarouselApi) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    const syncSelection = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setSlideCount(api.scrollSnapList().length);
    };
    syncSelection();
    api.on('select', syncSelection);
    api.on('reInit', syncSelection);
    return () => {
      api.off('select', syncSelection);
      api.off('reInit', syncSelection);
    };
  }, [api]);

  return { selectedIndex, slideCount };
}
