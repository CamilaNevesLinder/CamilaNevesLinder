import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Footer } from '@/components/organisms/footer';

// `Footer` imports `SOCIAL_LINKS` from `@/lib/site`, which imports
// `@/lib/navigation`. That calls next-intl's `createNavigation()` at
// module-eval time, which eagerly resolves `next/navigation` in a way this
// Vitest/jsdom setup can't handle unmocked (see
// `src/components/organisms/tests/unit/contact-form.test.tsx`, which hits
// the same chain and mocks it the same way).
vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

describe('Footer', () => {
  it('renders the copyright with the current year and role', () => {
    renderWithProviders(<Footer />);

    const year = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${year} Camila Neves Linder · Desenvolvedora Full Stack`,
      ),
    ).toBeInTheDocument();
  });

  it('renders the name and role in the second column', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Camila Neves Linder')).toBeInTheDocument();
    expect(screen.getByText('Desenvolvedora Full Stack')).toBeInTheDocument();
  });

  it('renders the social links', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/CamilaNevesLinder',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/camila-neves-linder-76a342403/',
    );
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/5548998558324',
    );
    expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
      'href',
      'mailto:camilaneveslindner@gmail.com',
    );
  });
});
