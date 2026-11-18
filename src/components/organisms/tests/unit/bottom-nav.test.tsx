import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { BottomNav } from '@/components/organisms/bottom-nav';

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    className,
    'aria-label': ariaLabel,
    'aria-current': ariaCurrent,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
    'aria-current'?: 'page';
  }) => (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  ),
  usePathname,
}));

describe('BottomNav', () => {
  it('renders all 5 sections with accessible names and correct hrefs', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<BottomNav />);

    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByRole('link', { name: 'Tecnologias' })).toHaveAttribute(
      'href',
      '/technologies',
    );
    expect(screen.getByRole('link', { name: 'Contato' })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('marks the active section as current page and highlights it', () => {
    usePathname.mockReturnValue('/projects');
    renderWithProviders(<BottomNav />);

    const active = screen.getByRole('link', { name: 'Projetos' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(active).toHaveClass('bg-espresso', 'text-cream');
    expect(screen.getByRole('link', { name: 'Sobre' })).not.toHaveAttribute(
      'aria-current',
    );
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveClass(
      'text-body',
    );
  });

  it('shows a compact visible label for each item', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<BottomNav />);

    expect(screen.getByRole('link', { name: 'Tecnologias' })).toHaveTextContent(
      'Stack',
    );
  });

  it('floats centered above the bottom edge and hides on md and up', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<BottomNav />);

    const nav = screen.getByRole('navigation', { name: 'Principal' });
    expect(nav).toHaveClass(
      'md:hidden',
      'fixed',
      'left-1/2',
      '-translate-x-1/2',
      'max-w-[380px]',
      'rounded-[26px]',
    );
  });

  it('lists the sections in the redesign order', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<BottomNav />);

    const names = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('aria-label'));
    expect(names).toEqual([
      'Início',
      'Projetos',
      'Sobre',
      'Tecnologias',
      'Contato',
    ]);
  });
});
