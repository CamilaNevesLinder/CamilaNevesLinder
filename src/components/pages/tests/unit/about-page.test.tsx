import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { AboutPage } from '@/components/pages/about-page';
import type { ChessStats } from '@/lib/chess';

const CHESS_STATS: ChessStats = {
  rapid: { rating: 829, win: 43, loss: 60, draw: 9 },
  blitz: { rating: 833, win: 127, loss: 135, draw: 13 },
  streakDays: 2,
};

describe('AboutPage', () => {
  it('renders the About section with the given chess stats', () => {
    renderWithProviders(<AboutPage chessStats={CHESS_STATS} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Além da tela' }),
    ).toBeInTheDocument();
    expect(screen.getByText('829')).toBeInTheDocument();
  });

  it('falls back to the unavailable message when chess stats are null', () => {
    renderWithProviders(<AboutPage chessStats={null} />);

    expect(
      screen.getByText('Stats do Chess.com indisponíveis no momento.'),
    ).toBeInTheDocument();
  });
});
