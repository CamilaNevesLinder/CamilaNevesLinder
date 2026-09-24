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

    expect(screen.getByText('Camila Neves Linder')).toBeInTheDocument();
    expect(screen.getByText('Projetos selecionados')).toBeInTheDocument();
    expect(screen.getByText('IA First')).toBeInTheDocument();
    expect(screen.getByText('Experiência')).toBeInTheDocument();
    expect(screen.getByText('Formações e cursos')).toBeInTheDocument();
  });
});
