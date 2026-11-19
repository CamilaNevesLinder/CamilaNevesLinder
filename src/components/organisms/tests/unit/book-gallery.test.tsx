import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { BookGallery } from '@/components/organisms/book-gallery';

describe('BookGallery', () => {
  it('renders every recommended book on the shelf in file order', () => {
    renderWithProviders(<BookGallery />);

    const covers = screen.getAllByRole('img');
    expect(covers).toHaveLength(15);
    expect(covers[0]).toHaveAttribute(
      'alt',
      'Capa de Como Fazer Amigos e Influenciar Pessoas',
    );
    expect(covers[14]).toHaveAttribute('alt', 'Capa de Dom Casmurro');
    expect(
      screen.getByRole('button', { name: 'Próximo livro' }),
    ).toBeInTheDocument();
  });
});
