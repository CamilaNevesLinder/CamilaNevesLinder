import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { PaperGrain } from '@/components/atoms/paper-grain';

describe('PaperGrain', () => {
  it('renders a decorative fixed noise overlay that ignores pointer events', () => {
    const { container } = render(<PaperGrain />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveClass('pointer-events-none', 'fixed', 'inset-0');
    expect(container.querySelector('feTurbulence')).toHaveAttribute(
      'baseFrequency',
      '0.85',
    );
  });
});
