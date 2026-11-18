import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { BrandMark } from '@/components/atoms/brand-mark';

describe('BrandMark', () => {
  it('renders a decorative monogram that accepts a size override', () => {
    const { container } = render(<BrandMark className="size-11" />);

    const mark = container.firstElementChild;
    expect(mark).toHaveAttribute('aria-hidden', 'true');
    expect(mark).toHaveTextContent('c');
    expect(mark).toHaveClass('size-11', 'rounded-full');
  });
});
