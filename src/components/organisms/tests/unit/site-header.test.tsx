import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { SiteHeader } from '@/components/organisms/site-header';

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
    'aria-current'?: 'page' | 'true';
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
  locales: ['pt-br', 'en', 'es'],
  usePathname,
}));

describe('SiteHeader', () => {
  it('links the logo to the home page and anchors the top of the page', () => {
    usePathname.mockReturnValue('/');
    const { container } = renderWithProviders(<SiteHeader />);

    expect(
      screen.getByRole('link', { name: 'Camila Neves Linder, página inicial' }),
    ).toHaveAttribute('href', '/');
    expect(container.querySelector('header')).toHaveAttribute('id', 'inicio');
  });

  it('renders the desktop nav hidden on mobile with every section', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<SiteHeader />);

    const nav = screen.getByRole('navigation', { name: 'Principal' });
    expect(nav).toHaveClass('hidden', 'md:flex');
    expect(nav).toHaveTextContent('InícioProjetosSobreTecnologiasContato');
  });

  it('marks the current section', () => {
    usePathname.mockReturnValue('/about');
    renderWithProviders(<SiteHeader />);

    const current = screen.getByRole('link', { name: 'Sobre' });
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).toHaveClass('bg-espresso');
    expect(screen.getByRole('link', { name: 'Projetos' })).not.toHaveAttribute(
      'aria-current',
    );
  });

  it('keeps the language switch and theme toggle visible on every size', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<SiteHeader />);

    expect(
      screen.getByRole('navigation', { name: 'Idioma' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Ativar modo escuro' }),
    ).toBeInTheDocument();
  });
});
