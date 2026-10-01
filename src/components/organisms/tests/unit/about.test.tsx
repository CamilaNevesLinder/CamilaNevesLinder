import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { About } from '@/components/organisms/about';

describe('About', () => {
  it('renders the heading, intro and the outside-the-code label', () => {
    renderWithProviders(<About />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Além da tela' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Fora do código')).toBeInTheDocument();
    expect(
      screen.getByText(/Sou uma pessoa que gosta de aprender coisas novas/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/No meu tempo livre, tenho alguns hobbies/),
    ).toBeInTheDocument();
  });

  it('renders all four outside-the-code items in order', () => {
    renderWithProviders(<About />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles.map((t) => t.textContent)).toEqual([
      'Jiu-jitsu',
      'Livros',
      'Inglês',
      'Outras línguas',
    ]);
  });

  it('renders all 13 book covers with their titles', () => {
    renderWithProviders(<About />);

    expect(
      screen.getByText('Como Fazer Amigos e Influenciar Pessoas'),
    ).toBeInTheDocument();
    expect(screen.getByText('Kafka para Sobrecarregados')).toBeInTheDocument();
    expect(screen.getByText('Quarto de Despejo')).toBeInTheDocument();
    expect(
      screen.queryByText('A Elevação da Mente a Deus'),
    ).not.toBeInTheDocument();
  });

  it('renders all 12 jiu-jitsu photos with captions', () => {
    renderWithProviders(<About />);

    expect(
      screen.getByText(
        '13 de setembro de 2025 - faixa azul - campeonato Compnet de luta casada',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        '13 de abril de 2025 - faixa azul - campeonato Compnet, 1º lugar',
      ),
    ).toHaveLength(5);
  });

  it('scales the section headings down on small screens', () => {
    renderWithProviders(<About />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Além da tela' }),
    ).toHaveClass('text-[26px]', 'sm:text-[32px]');
    expect(
      screen.getByRole('heading', { level: 3, name: 'Jiu-jitsu' }),
    ).toHaveClass('text-[22px]', 'sm:text-[28px]');
  });
});
