import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { AboutPage } from '@/components/pages/about-page';

describe('AboutPage', () => {
  it('renders the intro and the three numbered sections', () => {
    renderWithProviders(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Além da tela',
    );
    expect(
      screen.getByRole('heading', { name: 'Quatro anos no tatame' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Livros que eu recomendo' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'Inglês no dia a dia, e outros a caminho',
      }),
    ).toBeInTheDocument();
  });
});
