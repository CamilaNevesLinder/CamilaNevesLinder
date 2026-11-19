import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { TechStack } from '@/components/organisms/tech-stack';

describe('TechStack', () => {
  it('shows the tool count and the page heading', () => {
    renderWithProviders(<TechStack />);

    expect(
      screen.getByText('Tecnologias · 31 ferramentas'),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'O que eu uso no dia a dia',
    );
  });

  it('renders the six groups with their technologies', () => {
    renderWithProviders(<TechStack />);

    for (const title of [
      'Front-end',
      'Mobile',
      'Back-end',
      'Estado & dados',
      'Ferramentas & Cloud',
      'Testes',
    ]) {
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    }
    expect(screen.getByText('NativeWind')).toBeInTheDocument();
    expect(screen.getByText('Testing Library')).toBeInTheDocument();
  });

  it('lists the languages and the architecture practices', () => {
    renderWithProviders(<TechStack />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Atomic Design')).toBeInTheDocument();
    expect(screen.getByText('Clean Code')).toBeInTheDocument();
  });
});
