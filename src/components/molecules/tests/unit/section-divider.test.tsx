import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionDivider } from '@/components/molecules/section-divider';

describe('SectionDivider', () => {
  it('renders the number and label as decoration hidden from assistive tech', () => {
    const { container } = render(
      <SectionDivider number="01" label="O que eu faço" />,
    );

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('O que eu faço')).toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelectorAll('.border-dashed')).toHaveLength(2);
  });
});
