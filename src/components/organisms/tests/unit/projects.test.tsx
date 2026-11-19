import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Projects } from '@/components/organisms/projects';

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    className,
    style,
  }: {
    href: string | { pathname: string; hash: string };
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <a
      href={typeof href === 'string' ? href : `${href.pathname}#${href.hash}`}
      className={className}
      style={style}
    >
      {children}
    </a>
  ),
}));

describe('Projects', () => {
  it('renders the heading with the emphasized phrase', () => {
    renderWithProviders(<Projects />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Coisas que eu coloquei no ar',
    );
    expect(screen.getByText('coloquei no ar').tagName).toBe('EM');
  });

  it('links to the full projects page with the total count', () => {
    renderWithProviders(<Projects />);

    expect(
      screen.getByRole('link', { name: 'Ver todos os 7' }),
    ).toHaveAttribute('href', '/projects');
  });

  it('renders four project cards with kind, line, stack and learn more', () => {
    renderWithProviders(<Projects />);

    const titles = screen
      .getAllByRole('heading', { level: 3 })
      .map((heading) => heading.textContent);
    expect(titles).toEqual([
      'App multi-instituição de ensino',
      'App de comunidade e bem-estar',
      'Gestão para academias',
      'Escola de música Praça 22',
    ]);
    expect(screen.getByText('App mobile + painel')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Multi-tenant com cobrança recorrente via Mercado Pago e Asaas.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Firebase')).toBeInTheDocument();
    expect(screen.getAllByText('Saber mais')).toHaveLength(4);
  });

  it('links each card to its project opened on the projects page', () => {
    renderWithProviders(<Projects />);

    expect(
      screen
        .getAllByRole('link', { name: /Saber mais/ })
        .map((link) => link.getAttribute('href')),
    ).toEqual([
      '/projects#oniapp',
      '/projects#seja',
      '/projects#ritmar',
      '/projects#praca22',
    ]);
  });

  it('tints each card with its project color token', () => {
    renderWithProviders(<Projects />);

    const card = screen
      .getByRole('heading', { name: 'App de comunidade e bem-estar' })
      .closest('a');
    expect(card).toHaveAttribute('href', '/projects#seja');
    expect(card?.style.getPropertyValue('--project-color')).toBe(
      'var(--color-lilac)',
    );
  });
});
