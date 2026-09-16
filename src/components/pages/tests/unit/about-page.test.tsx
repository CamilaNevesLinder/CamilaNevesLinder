import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { AboutPage } from '@/components/pages/about-page';

describe('AboutPage', () => {
  it('renders the About section', () => {
    renderWithProviders(<AboutPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Além da tela' }),
    ).toBeInTheDocument();
  });
});
