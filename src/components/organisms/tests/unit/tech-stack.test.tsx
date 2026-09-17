import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { TechStack } from '@/components/organisms/tech-stack';

describe('TechStack', () => {
  it('renders every category in order', () => {
    renderWithProviders(<TechStack />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles.map((t) => t.textContent)).toEqual([
      'Linguagens',
      'Frontend & Mobile',
      'Backend',
      'Ferramentas & Cloud',
      'Testes',
      'Arquitetura',
    ]);
  });

  it('renders technologies within each category', () => {
    renderWithProviders(<TechStack />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('NestJS')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
    expect(screen.getByText('Vitest')).toBeInTheDocument();
    expect(screen.getByText('Testing Library')).toBeInTheDocument();
    expect(screen.getByText('Atomic Design')).toBeInTheDocument();
    expect(screen.getByText('Arquitetura Escalável')).toBeInTheDocument();
    expect(screen.getByText('SOLID')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });

  it('does not render excluded technologies', () => {
    renderWithProviders(<TechStack />);

    expect(screen.queryByText('MongoDB')).not.toBeInTheDocument();
    expect(screen.queryByText('Kotlin')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
  });
});
