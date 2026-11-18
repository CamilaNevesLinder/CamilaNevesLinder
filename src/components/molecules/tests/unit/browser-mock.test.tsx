import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserMock } from '@/components/molecules/browser-mock';

describe('BrowserMock', () => {
  it('renders a decorative browser window with three window dots', () => {
    const { container } = render(<BrowserMock />);

    const root = container.firstElementChild;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root?.firstElementChild?.children).toHaveLength(3);
  });
});
