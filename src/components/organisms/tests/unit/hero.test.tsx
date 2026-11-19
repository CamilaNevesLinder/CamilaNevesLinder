import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Hero } from '@/components/organisms/hero';

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('Hero', () => {
  it('renders the greeting headline with the highlighted phrase', () => {
    renderWithProviders(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(
      'Oi, eu sou a Camila. Construo apps inteiros, do banco à tela.',
    );
    expect(screen.getByText('apps inteiros')).toHaveClass('italic');
  });

  it('renders the location pill and the description', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText('Florianópolis, SC')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Desenvolvedora full stack. React Native e Next.js na frente, NestJS e MySQL por trás.',
      ),
    ).toBeInTheDocument();
  });

  it('links the primary CTA to projects and the secondary to contact', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByRole('link', { name: 'Ver projetos' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByRole('link', { name: 'Fale comigo' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('renders the polaroid photo with its handwritten note', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('img', { name: 'Camila Neves Linder sorrindo' }),
    ).toBeInTheDocument();
    expect(screen.getByText('oi, prazer!')).toHaveClass('font-hand');
  });
});
