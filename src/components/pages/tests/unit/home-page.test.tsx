import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { HomePage } from '@/components/pages/home-page';

vi.mock('@/lib/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('HomePage', () => {
  it('renders every home section', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Oi, eu sou a Camila.',
    );
    expect(
      screen.getByRole('heading', { name: 'Coisas que eu coloquei no ar' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'IA no processo, eu no controle' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Experiência')).toBeInTheDocument();
    expect(screen.getByText('Formações e cursos')).toBeInTheDocument();
  });
});
