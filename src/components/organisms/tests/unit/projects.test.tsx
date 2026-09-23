import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Projects } from '@/components/organisms/projects';

describe('Projects', () => {
  it('renders the section heading', () => {
    renderWithProviders(<Projects />);

    expect(screen.getByText('Projetos selecionados')).toBeInTheDocument();
  });

  it('renders every project title', () => {
    renderWithProviders(<Projects />);

    for (const title of [
      'App multi-instituição de ensino',
      'App de comunidade e bem-estar',
      'Plataforma de gestão para academias',
      'Site institucional para escola de música',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
  });

  it('renders tech tags for the first project', () => {
    renderWithProviders(<Projects />);

    for (const tag of ['React Native', 'Expo', 'Next.js', 'NestJS']) {
      expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
    }
  });

  it('does not mention any company name', () => {
    renderWithProviders(<Projects />);

    const text = document.body.textContent ?? '';
    for (const name of ['Onilearning', 'Ritmar', 'AHX', 'Praça 22']) {
      expect(text).not.toContain(name);
    }
  });

  it('scales the project heading down on small screens', () => {
    renderWithProviders(<Projects />);

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: 'App multi-instituição de ensino',
      }),
    ).toHaveClass('text-[22px]', 'sm:text-[28px]');
  });
});
