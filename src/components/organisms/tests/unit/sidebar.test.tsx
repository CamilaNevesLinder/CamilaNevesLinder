import { describe, expect, it, vi } from 'vitest';
import { screen, userEvent, renderWithProviders } from '@/tests/utils/render';
import { Sidebar } from '@/components/organisms/sidebar';

const { usePathname } = vi.hoisted(() => ({ usePathname: vi.fn() }));

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    locale,
    children,
    className,
    onClick,
  }: {
    href: string;
    locale?: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} data-locale={locale} className={className} onClick={onClick}>
      {children}
    </a>
  ),
  locales: ['en', 'pt-br', 'es'],
  usePathname,
}));

describe('Sidebar', () => {
  it('renders the short name and photo', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<Sidebar />);

    expect(screen.getAllByText('Camila Linder')).toHaveLength(2);
    expect(screen.getAllByAltText('Camila Neves Linder')).toHaveLength(2);
  });

  it('renders every nav section', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<Sidebar />);

    for (const label of [
      'Início',
      'Sobre',
      'Projetos',
      'Tecnologias',
      'Contato',
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it('highlights the active section', () => {
    usePathname.mockReturnValue('/projects');
    renderWithProviders(<Sidebar />);

    expect(screen.getByText('Projetos').closest('a')).toHaveClass('bg-accent');
    expect(screen.getByText('Sobre').closest('a')).not.toHaveClass('bg-accent');
  });

  it('renders the social links with accessible names', () => {
    usePathname.mockReturnValue('/');
    renderWithProviders(<Sidebar />);

    expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:'),
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      expect.stringContaining('github.com'),
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      expect.stringContaining('linkedin.com'),
    );
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      expect.stringContaining('instagram.com'),
    );
  });

  it('opens and closes the mobile menu', async () => {
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    expect(screen.getAllByText('Início')).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getAllByText('Início')).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Fechar menu' }));
    expect(screen.getAllByText('Início')).toHaveLength(1);
  });

  it('opens the settings popover with the language options', async () => {
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole('button', { name: 'Configurações' }));

    expect(screen.getByText('PT-BR').closest('a')).toHaveClass('bg-secondary');
    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
  });

  it('closes the mobile menu when a nav link is clicked', async () => {
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getAllByText('Sobre')).toHaveLength(2);

    await user.click(screen.getAllByText('Sobre')[1]);
    expect(screen.getAllByText('Sobre')).toHaveLength(1);
  });

  it('closes the mobile menu when the logo link is clicked', async () => {
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole('button', { name: 'Abrir menu' }));
    expect(screen.getAllByText('Camila Linder')).toHaveLength(3);

    await user.click(screen.getAllByText('Camila Linder')[2]);
    expect(screen.getAllByText('Camila Linder')).toHaveLength(2);
  });

  it('closes the settings popover when a locale is picked', async () => {
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole('button', { name: 'Configurações' }));
    expect(screen.getByText('EN')).toBeInTheDocument();

    await user.click(screen.getByText('EN'));
    expect(screen.queryByText('EN')).not.toBeInTheDocument();
  });

  it('toggles dark mode on the document element', async () => {
    document.documentElement.classList.remove('dark');
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole('button', { name: 'Configurações' }));
    const toggle = screen.getByRole('switch', { name: 'Modo escuro' });
    expect(toggle).toHaveAttribute('aria-checked', 'false');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('reads a stored dark theme on mount', async () => {
    localStorage.setItem('theme', 'dark');
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole('button', { name: 'Configurações' }));
    expect(screen.getByRole('switch', { name: 'Modo escuro' })).toHaveAttribute(
      'aria-checked',
      'true',
    );

    localStorage.removeItem('theme');
  });

  it('reads a stored light theme on mount', async () => {
    localStorage.setItem('theme', 'light');
    usePathname.mockReturnValue('/');
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole('button', { name: 'Configurações' }));
    expect(screen.getByRole('switch', { name: 'Modo escuro' })).toHaveAttribute(
      'aria-checked',
      'false',
    );

    localStorage.removeItem('theme');
  });
});
