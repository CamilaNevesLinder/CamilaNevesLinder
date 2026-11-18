import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { PhoneMock } from '@/components/molecules/phone-mock';

describe('PhoneMock', () => {
  it('renders two tilted decorative phone frames', () => {
    const { container } = render(<PhoneMock />);

    const root = container.firstElementChild;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root?.children).toHaveLength(2);
    expect(root?.children[0]).toHaveClass('-rotate-6');
    expect(root?.children[1]).toHaveClass('rotate-5');
  });
});
