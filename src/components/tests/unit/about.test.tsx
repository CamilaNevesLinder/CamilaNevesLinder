import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { About } from '@/components/about';
import type { ChessStats } from '@/lib/chess';

const CHESS_STATS: ChessStats = {
  rapid: { rating: 829, win: 43, loss: 60, draw: 9 },
  blitz: { rating: 833, win: 127, loss: 135, draw: 13 },
  streakDays: 2,
};

describe('About', () => {
  it('renders the heading, intro and the outside-the-code label', () => {
    renderWithProviders(<About chessStats={CHESS_STATS} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Além da tela' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Fora do código')).toBeInTheDocument();
    expect(
      screen.getByText(/Sou uma pessoa que gosta de aprender coisas novas/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No meu tempo livre, tenho alguns hobbies/),
    ).toBeInTheDocument();
  });

  it('renders all four outside-the-code items in order', () => {
    renderWithProviders(<About chessStats={CHESS_STATS} />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles.map((t) => t.textContent)).toEqual([
      'Jiu-jitsu',
      'Livros',
      'Xadrez',
      'Inglês',
    ]);
  });

  it('renders live chess stats when available', () => {
    renderWithProviders(<About chessStats={CHESS_STATS} />);

    expect(screen.getByText('2 dias seguidos jogando')).toBeInTheDocument();
    expect(screen.getByText('829')).toBeInTheDocument();
    expect(screen.getByText('43V · 60D · 9E')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Ver perfil no Chess.com' }),
    ).toHaveAttribute('href', 'https://www.chess.com/member/camilinder');
  });

  it('falls back to an unavailable message when chess stats are null', () => {
    renderWithProviders(<About chessStats={null} />);

    expect(
      screen.getByText('Stats do Chess.com indisponíveis no momento.'),
    ).toBeInTheDocument();
  });

  it('renders all 13 book covers with their titles', () => {
    renderWithProviders(<About chessStats={CHESS_STATS} />);

    expect(
      screen.getByText('Como Fazer Amigos e Influenciar Pessoas'),
    ).toBeInTheDocument();
    expect(screen.getByText('Kafka para Sobrecarregados')).toBeInTheDocument();
    expect(screen.getByText('Quarto de Despejo')).toBeInTheDocument();
    expect(
      screen.queryByText('A Elevação da Mente a Deus'),
    ).not.toBeInTheDocument();
  });

  it('renders all 12 jiu-jitsu photos with captions', () => {
    renderWithProviders(<About chessStats={CHESS_STATS} />);

    expect(
      screen.getByText(
        '13 de setembro de 2025 - faixa azul - campeonato Compnet de luta casada',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        '13 de abril de 2025 - faixa azul - campeonato Compnet, 1º lugar',
      ),
    ).toHaveLength(5);
  });
});
