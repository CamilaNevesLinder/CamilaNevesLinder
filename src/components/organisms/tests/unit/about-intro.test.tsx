import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { AboutIntro } from '@/components/organisms/about-intro';

describe('AboutIntro', () => {
  it('introduces Camila with portrait and hobby chips', () => {
    renderWithProviders(<AboutIntro />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Além da tela',
    );
    expect(screen.getByAltText('Retrato da Camila')).toBeInTheDocument();
    expect(
      screen.getAllByRole('listitem').map((item) => item.textContent),
    ).toEqual(['Faixa roxa', 'Leitora', 'EN · ES · DE']);
  });
});
