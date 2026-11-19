import { vi } from 'vitest';

export function createFakeCarouselApi(slideCount: number) {
  const listeners = new Set<() => void>();
  let selectedIndex = 0;
  const api = {
    selectedScrollSnap: () => selectedIndex,
    scrollSnapList: () => Array.from({ length: slideCount }, (_, i) => i),
    on: (_event: string, listener: () => void) => listeners.add(listener),
    off: (_event: string, listener: () => void) => listeners.delete(listener),
    scrollTo: vi.fn((index: number) => {
      selectedIndex = index;
      listeners.forEach((listener) => listener());
    }),
  };
  return api;
}
