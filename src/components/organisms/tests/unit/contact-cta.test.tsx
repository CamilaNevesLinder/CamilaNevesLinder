import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ContactCta } from '@/components/organisms/contact-cta';

vi.mock('@/lib/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('ContactCta', () => {
  it('invites the visitor to the contact page', () => {
    renderWithProviders(<ContactCta />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Tem um projeto? Vamos conversar.',
    );
    expect(
      screen.getByRole('link', { name: 'Escrever pra mim' }),
    ).toHaveAttribute('href', '/contact');
  });
});
