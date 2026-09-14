import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

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
