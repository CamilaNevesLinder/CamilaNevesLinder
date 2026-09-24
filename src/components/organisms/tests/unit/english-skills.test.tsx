import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { EnglishSkills } from '@/components/organisms/english-skills';

describe('EnglishSkills', () => {
  it('rates each skill out of five stars', () => {
    renderWithProviders(<EnglishSkills />);

    expect(
      screen.getByRole('img', { name: 'Leitura: 5 de 5' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Escuta: 5 de 5' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Escrita: 4 de 5' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Fala: 4 de 5' }),
    ).toBeInTheDocument();
  });

  it('fills as many stars as the rating and leaves the rest empty', () => {
    renderWithProviders(<EnglishSkills />);

    const writing = screen.getByRole('img', { name: 'Escrita: 4 de 5' });
    expect(writing.querySelectorAll('[data-filled="true"]')).toHaveLength(4);
    expect(writing.querySelectorAll('[data-filled="false"]')).toHaveLength(1);
  });

  it('lists how I study', () => {
    renderWithProviders(<EnglishSkills />);

    expect(screen.getByText('Como estudo')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Curso do Mario Vergara' }),
    ).toHaveAttribute('href', 'https://www.instagram.com/mairovergara/');
    expect(screen.getByText('Duolingo')).toBeInTheDocument();
    expect(screen.getByText('Filmes estrangeiros')).toBeInTheDocument();
    expect(screen.getByText('Conversação')).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Duolingo' }),
    ).not.toBeInTheDocument();
  });
});
