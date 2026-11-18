import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders, within } from '@/tests/utils/render';
import { Footer } from '@/components/organisms/footer';

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
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

describe('Footer', () => {
  it('renders the brand, tagline and handwritten thanks', () => {
    renderWithProviders(<Footer />);

    expect(
      screen.getByText('Camila Neves Linder').closest('a'),
    ).toHaveAttribute('href', '/');
    expect(
      screen.getByText(
        'Desenvolvedora full stack em Florianópolis. Apps, painéis e APIs, do banco à tela.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('obrigada pela visita!')).toHaveClass('font-hand');
  });

  it('lists every section under the navigation column', () => {
    renderWithProviders(<Footer />);

    const column = screen
      .getByRole('heading', { name: 'Navegação' })
      .closest('div') as HTMLElement;
    const links = within(column).getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/projects',
      '/about',
      '/technologies',
      '/contact',
    ]);
  });

  it('lists the contact channels, opening external ones in a new tab', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
      'href',
      'mailto:camilaneveslindner@gmail.com',
    );
    expect(screen.getByRole('link', { name: 'E-mail' })).not.toHaveAttribute(
      'target',
    );
    const linkedin = screen.getByRole('link', { name: 'LinkedIn' });
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/camila-neves-linder-76a342403/',
    );
    expect(linkedin).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/5548998558324',
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/CamilaNevesLinder',
    );
    expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
      'href',
      'https://www.instagram.com/camila.nevees/',
    );
  });

  it('renders the copyright with the current year and a back to top link', () => {
    renderWithProviders(<Footer />);

    const year = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${year} Camila Neves Linder · feito à mão em Floripa · v.2`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'voltar ao topo' }),
    ).toHaveAttribute('href', '#inicio');
  });
});
