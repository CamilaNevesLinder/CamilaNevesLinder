import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ContactPage } from '@/components/pages/contact-page';

describe('ContactPage', () => {
  it('renders the coming-soon placeholder', () => {
    renderWithProviders(<ContactPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Contato' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Conteúdo em breve.')).toBeInTheDocument();
  });
});
