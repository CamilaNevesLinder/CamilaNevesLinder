import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { MainTemplate } from '@/components/templates/main-template';

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    className,
    onClick,
    'aria-label': ariaLabel,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    'aria-label'?: string;
  }) => (
    <a
      href={href}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  ),
  locales: ['en', 'pt-br', 'es'],
  usePathname: () => '/',
}));

describe('MainTemplate', () => {
  it('renders the sidebar and the page content', () => {
    renderWithProviders(
      <MainTemplate>
        <p>page content</p>
      </MainTemplate>,
    );

    expect(screen.getAllByText('Camila Linder')).toHaveLength(2);
    const content = screen.getByText('page content');
    expect(content).toBeInTheDocument();
    expect(content.closest('div')).toHaveClass(
      'pb-14',
      'pt-14',
      'md:pb-0',
      'md:pl-60',
      'md:pt-0',
    );
  });

  it('renders the footer after the page content', () => {
    renderWithProviders(
      <MainTemplate>
        <p>page content</p>
      </MainTemplate>,
    );

    const year = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${year} Camila Neves Linder · Desenvolvedora Full Stack`,
      ),
    ).toBeInTheDocument();
  });

  it('renders the bottom nav', () => {
    renderWithProviders(
      <MainTemplate>
        <p>page content</p>
      </MainTemplate>,
    );

    const bottomNav = screen
      .getAllByRole('link', { name: 'Início' })
      .map((link) => link.closest('nav'))
      .find((nav) => nav?.className.includes('md:hidden'));

    expect(bottomNav).toHaveClass('fixed', 'bottom-0');
  });
});
