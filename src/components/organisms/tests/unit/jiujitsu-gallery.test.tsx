import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { JiujitsuGallery } from '@/components/organisms/jiujitsu-gallery';

describe('JiujitsuGallery', () => {
  it('renders the twelve polaroids with alt text and handwritten captions', () => {
    renderWithProviders(<JiujitsuGallery />);

    expect(
      screen.getByRole('region', { name: 'Jiu-jitsu' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(12);
    expect(
      screen.getByAltText('Treino na Gracie Barra Biguaçu'),
    ).toBeInTheDocument();
    expect(screen.getByText('graduação faixa verde')).toBeInTheDocument();
  });

  it('offers labelled arrows to browse the photos', () => {
    renderWithProviders(<JiujitsuGallery />);

    expect(
      screen.getByRole('button', { name: 'Foto anterior' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Próxima foto' }),
    ).toBeInTheDocument();
  });
});
