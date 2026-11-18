import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { LanguageSwitch } from '@/components/molecules/language-switch';

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    locale,
    children,
    className,
    'aria-label': ariaLabel,
    'aria-current': ariaCurrent,
  }: {
    href: string;
    locale: string;
    children: React.ReactNode;
    className?: string;
    'aria-label'?: string;
    'aria-current'?: 'true';
  }) => (
    <a
      href={`/${locale}${href}`}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </a>
  ),
  usePathname: () => '/projects',
}));

describe('LanguageSwitch', () => {
  it('lists the three languages with short visible labels', () => {
    renderWithProviders(<LanguageSwitch />);

    const nav = screen.getByRole('navigation', { name: 'Idioma' });
    expect(nav).toHaveTextContent('PTENES');
    expect(screen.getByRole('link', { name: 'English' })).toHaveAttribute(
      'href',
      '/en/projects',
    );
    expect(screen.getByRole('link', { name: 'Español' })).toHaveAttribute(
      'href',
      '/es/projects',
    );
  });

  it('marks the current language', () => {
    renderWithProviders(<LanguageSwitch />);

    expect(screen.getByRole('link', { name: 'Português' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('link', { name: 'English' })).not.toHaveAttribute(
      'aria-current',
    );
  });
});
