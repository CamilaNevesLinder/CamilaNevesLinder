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
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
  }) => (
    <a href={href} className={className} aria-label={ariaLabel}>
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

  it('highlights the active section and leaves the rest muted', () => {
    usePathname.mockReturnValue('/projects');
    renderWithProviders(<BottomNav />);

    expect(screen.getByRole('link', { name: 'Projetos' })).toHaveClass(
      'text-espresso',
    );
    expect(screen.getByRole('link', { name: 'Sobre' })).toHaveClass(
      'text-taupe',
    );
  });

  it('hides on md and up, and stays fixed to the viewport bottom', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<BottomNav />);

    const nav = screen.getByRole('link', { name: 'Início' }).closest('nav');
    expect(nav).toHaveClass('md:hidden', 'fixed', 'inset-x-0', 'bottom-0');
  });
});
