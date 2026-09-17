import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ProjectsPage } from '@/components/pages/projects-page';

describe('ProjectsPage', () => {
  it('renders the project showcase', () => {
    renderWithProviders(<ProjectsPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'O que eu já construí' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Oniapp' }),
    ).toBeInTheDocument();
  });
});
