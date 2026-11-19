import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { TechnologiesPage } from '@/components/pages/technologies-page';

describe('TechnologiesPage', () => {
  it('renders the tech stack showcase', () => {
    renderWithProviders(<TechnologiesPage />);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'O que eu uso no dia a dia',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Linguagens' }),
    ).toBeInTheDocument();
  });
});
