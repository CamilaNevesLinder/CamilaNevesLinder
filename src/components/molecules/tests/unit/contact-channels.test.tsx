import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ContactChannels } from '@/components/molecules/contact-channels';

vi.mock('@/lib/navigation', () => ({
  routing: { locales: ['en', 'pt-br', 'es'], defaultLocale: 'pt-br' },
}));

describe('ContactChannels', () => {
  it('lists every channel with its handle and link', () => {
    renderWithProviders(<ContactChannels />);

    expect(screen.getAllByRole('link')).toHaveLength(5);
    expect(screen.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute(
      'href',
      'https://wa.me/5548998558324',
    );
    expect(screen.getByText('in/camila-neves-linder')).toBeInTheDocument();
  });

  it('opens external channels in a new tab but keeps e-mail in place', () => {
    renderWithProviders(<ContactChannels />);

    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute(
      'target',
      '_blank',
    );
    expect(screen.getByRole('link', { name: /E-mail/ })).not.toHaveAttribute(
      'target',
    );
  });
});
