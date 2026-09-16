import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { TechnologiesPage } from '@/components/pages/technologies-page';

describe('TechnologiesPage', () => {
  it('renders the coming-soon placeholder', () => {
    renderWithProviders(<TechnologiesPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Tecnologias' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Conteúdo em breve.')).toBeInTheDocument();
  });
});
