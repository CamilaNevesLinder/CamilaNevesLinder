import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { MainTemplate } from '@/components/templates/main-template';

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
  locales: ['pt-br', 'en', 'es'],
  usePathname: () => '/',
  routing: {
    locales: ['pt-br', 'en', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

function renderTemplate() {
  return renderWithProviders(
    <MainTemplate>
      <p>page content</p>
    </MainTemplate>,
  );
}

describe('MainTemplate', () => {
  it('renders the header before the page content inside main', () => {
    renderTemplate();

    const homeLink = screen.getByRole('link', {
      name: 'Camila Neves Linder, página inicial',
    });
    const content = screen.getByText('page content');
    expect(content.closest('main')).toBeInTheDocument();
    expect(
      homeLink.compareDocumentPosition(content) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('renders the footer after the page content', () => {
    renderTemplate();

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('reserves bottom space on mobile for the floating nav', () => {
    renderTemplate();

    const wrapper = screen.getByRole('main').parentElement;
    expect(wrapper).toHaveClass('pb-28', 'md:pb-0');
  });

  it('renders the floating bottom nav', () => {
    renderTemplate();

    const navs = screen.getAllByRole('navigation', { name: 'Principal' });
    expect(navs.some((nav) => nav.className.includes('fixed'))).toBe(true);
  });

  it('overlays the paper grain texture', () => {
    const { container } = renderTemplate();

    expect(container.querySelector('feTurbulence')).toBeInTheDocument();
  });
});
