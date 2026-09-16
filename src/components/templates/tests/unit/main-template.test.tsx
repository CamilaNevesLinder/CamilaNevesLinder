import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { MainTemplate } from '@/components/templates/main-template';

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
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
    expect(content.closest('main')).toHaveClass(
      'pt-14',
      'md:pl-60',
      'md:pt-0',
    );
  });
});
