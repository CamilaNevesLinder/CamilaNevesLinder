import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Education } from '@/components/education';

describe('Education', () => {
  it('renders the label', () => {
    renderWithProviders(<Education />);

    expect(screen.getByText('Formações e cursos')).toBeInTheDocument();
  });

  it('renders both entries with institution and status', () => {
    renderWithProviders(<Education />);

    expect(
      screen.getByText('Análise e Desenvolvimento de Sistemas'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Unisul · Graduação em andamento'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Trilhas de Front-end e Full Stack'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Alura · Formação complementar'),
    ).toBeInTheDocument();
  });
});
