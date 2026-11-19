import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { LanguageSkills } from '@/components/organisms/language-skills';

describe('LanguageSkills', () => {
  it('rates each English skill with an accessible bar', () => {
    renderWithProviders(<LanguageSkills />);

    expect(
      screen.getAllByRole('img').map((bar) => bar.getAttribute('aria-label')),
    ).toEqual([
      'Leitura: 5 de 5',
      'Escuta: 5 de 5',
      'Escrita: 4 de 5',
      'Fala: 4 de 5',
    ]);
  });

  it('links the English course and marks Spanish and German as studying', () => {
    renderWithProviders(<LanguageSkills />);

    expect(
      screen.getByRole('link', { name: 'Curso do Mario Vergara' }),
    ).toHaveAttribute('href', 'https://www.instagram.com/mairovergara/');
    expect(
      screen.getByRole('heading', { name: 'Espanhol' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Alemão' })).toBeInTheDocument();
    expect(screen.getAllByText('estudando')).toHaveLength(2);
  });
});
