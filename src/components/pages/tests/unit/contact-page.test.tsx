import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ContactPage } from '@/components/pages/contact-page';

const sendContactMessageMock = vi.fn();

vi.mock('@/lib/actions/contact', () => ({
  sendContactMessage: (...args: unknown[]) => sendContactMessageMock(...args),
}));

// `@/lib/site` imports `@/lib/navigation`, which calls next-intl's
// `createNavigation()` at module-eval time. That eagerly resolves
// `next/navigation` in a way this Vitest/jsdom setup can't handle
// unmocked (see `src/components/organisms/tests/unit/sidebar.test.tsx`
// and `src/lib/tests/unit/site.test.ts`, which hit the same chain and
// mock it the same way).
vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

describe('ContactPage', () => {
  it('renders the contact form', () => {
    renderWithProviders(<ContactPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Vamos conversar?' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Enviar mensagem' }),
    ).toBeInTheDocument();
  });
});
