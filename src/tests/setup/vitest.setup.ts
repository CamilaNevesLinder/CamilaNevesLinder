import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = class IntersectionObserver {
    root = null;
    rootMargin = '';
    thresholds: readonly number[] = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof globalThis.IntersectionObserver;
}

vi.mock('next/image', () => ({
  default: ({
    alt,
    src,
    width,
    height,
    className,
    style,
    priority: _priority,
    fill: _fill,
    sizes: _sizes,
    quality: _quality,
    placeholder: _placeholder,
    blurDataURL: _blurDataURL,
    loader: _loader,
    unoptimized: _unoptimized,
    onLoadingComplete: _onLoadingComplete,
    ...rest
  }: Record<string, unknown> & {
    alt?: string;
    src?: string | { src?: string };
    width?: number | string;
    height?: number | string;
    className?: string;
    style?: React.CSSProperties;
  }) => {
    const resolvedSrc =
      typeof src === 'string'
        ? src
        : ((src as { src?: string } | undefined)?.src ?? '');

    return React.createElement('img', {
      alt: alt ?? '',
      src: resolvedSrc,
      width,
      height,
      className,
      style,
      ...rest,
    });
  },
}));
