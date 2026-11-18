import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeading } from '@/components/atoms/section-heading';

describe('SectionHeading', () => {
  it('renders a level two heading that highlights emphasized words', () => {
    render(
      <SectionHeading>
        Coisas que eu <em>coloquei no ar</em>
      </SectionHeading>,
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Coisas que eu coloquei no ar');
    expect(heading).toHaveClass('font-display', '[&_em]:text-clay');
  });
});
