import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ProjectsPage } from '@/components/pages/projects-page';

describe('ProjectsPage', () => {
  it('renders the coming-soon placeholder', () => {
    renderWithProviders(<ProjectsPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Projetos' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Conteúdo em breve.')).toBeInTheDocument();
  });
});
