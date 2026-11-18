import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { EducationList } from '@/components/molecules/education-list';

describe('EducationList', () => {
  it('renders the education label and both entries with their status', () => {
    renderWithProviders(<EducationList />);

    expect(
      screen.getByRole('heading', { name: 'Formações e cursos' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(
      screen.getByText('Análise e Desenvolvimento de Sistemas'),
    ).toBeInTheDocument();
    expect(screen.getByText('Graduação em andamento')).toBeInTheDocument();
    expect(
      screen.getByText('Trilhas de Front-end e Full Stack'),
    ).toBeInTheDocument();
  });
});
