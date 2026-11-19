import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Chip } from '@/components/atoms/chip';

describe('Chip', () => {
  it('renders its content as a list item', () => {
    render(
      <ul>
        <Chip>Duolingo</Chip>
      </ul>,
    );

    expect(screen.getByRole('listitem')).toHaveTextContent('Duolingo');
  });
});
