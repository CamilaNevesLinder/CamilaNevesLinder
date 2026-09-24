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
  it('renders the name and role', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText('Camila Neves Linder')).toBeInTheDocument();
    expect(screen.getByText('desenvolvedora full stack.')).toBeInTheDocument();
  });

  it('renders the description line', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByText(
        'Do banco de dados à interface, arquitetura, API e aplicação no ar.',
      ),
    ).toBeInTheDocument();
  });

  it('renders every stack tag', () => {
    renderWithProviders(<Hero />);

    for (const tag of [
      'TypeScript',
      'JavaScript',
      'React',
      'React Native',
      'NestJS',
      'Next.js',
    ]) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it('links the work CTA to the projects page', () => {
    renderWithProviders(<Hero />);

    const cta = screen.getByRole('link', { name: 'Ver trabalho →' });
    expect(cta).toHaveAttribute('href', '/projects');
  });

  it('links the contact CTA to the contact page', () => {
    renderWithProviders(<Hero />);

    const cta = screen.getByRole('link', { name: 'Entrar em contato →' });
    expect(cta).toHaveAttribute('href', '/contact');
  });

  it('renders the location', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText('Florianópolis, SC')).toBeInTheDocument();
  });

  it('renders the profile photo with alt text', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByAltText('Camila Neves Linder')).toBeInTheDocument();
  });

  it('centers the name/tagline/photo block on mobile and keeps the desktop row from sm', () => {
    renderWithProviders(<Hero />);

    const heading = screen.getByText('Camila Neves Linder');
    const layoutRow = heading.closest('div')?.parentElement;
    expect(layoutRow).toHaveClass('flex-col', 'items-center', 'text-center');
    expect(layoutRow).toHaveClass(
      'sm:flex-row',
      'sm:justify-between',
      'sm:text-left',
    );
  });

  it('scales the heading and tagline down on small screens', () => {
    renderWithProviders(<Hero />);

    expect(screen.getByText('Camila Neves Linder')).toHaveClass(
      'text-[40px]',
      'sm:text-[68px]',
    );
    expect(screen.getByText('desenvolvedora full stack.')).toHaveClass(
      'text-[40px]',
      'sm:text-[68px]',
    );
  });

  it('reduces the card padding on small screens', () => {
    renderWithProviders(<Hero />);

    const card = screen
      .getByText('Camila Neves Linder')
      .closest('[data-slot="card"]');
    expect(card).toHaveClass('p-6', 'sm:p-[60px]');
  });

  it('shrinks the profile photo on small screens', () => {
    renderWithProviders(<Hero />);

    const photo = screen.getByAltText('Camila Neves Linder');
    expect(photo.parentElement).toHaveClass('size-[120px]', 'sm:size-[180px]');
  });
});
