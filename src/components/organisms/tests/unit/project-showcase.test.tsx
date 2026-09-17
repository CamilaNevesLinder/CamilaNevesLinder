import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ProjectShowcase } from '@/components/organisms/project-showcase';

describe('ProjectShowcase', () => {
  it('renders every project title in order', () => {
    renderWithProviders(<ProjectShowcase />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles.map((t) => t.textContent)).toEqual([
      'Oniapp',
      'Oniapp Admin',
      'Seja',
      'Seja Admin',
      'Praça 22',
      'Ritmar',
      'Mince Joias',
    ]);
  });

  it('renders features and tech stack for a project', () => {
    renderWithProviders(<ProjectShowcase />);

    expect(
      screen.getByText(
        'Integração completa com Moodle: notas, calendário, caderno de anotações e cursos direto no app',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Expo Router')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });

  it('renders my role in each project', () => {
    renderWithProviders(<ProjectShowcase />);

    expect(
      screen.getByText(
        'Full stack no Oniapp — mobile, admin web e API: nesta frente, temas adaptativos por instituição, acessibilidade e testes automatizados',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Desenvolvi sozinha, do design à publicação'),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText('Participei do desenvolvimento front-end'),
    ).toHaveLength(2);
  });
});
