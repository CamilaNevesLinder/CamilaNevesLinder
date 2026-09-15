import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Experience } from '@/components/experience';

describe('Experience', () => {
  it('renders the label', () => {
    renderWithProviders(<Experience />);

    expect(screen.getByText('Experiência')).toBeInTheDocument();
  });

  it('renders company name before role for every entry', () => {
    renderWithProviders(<Experience />);

    const expectedRoles: Record<string, string> = {
      Onilearning: 'Desenvolvedora Full Stack',
      Ritmar: 'Desenvolvedora Full Stack',
      'Praça 22 Escola de Música': 'Desenvolvedora Full Stack',
      'Mince Joias': 'Desenvolvedora Front-end',
    };

    const companies = screen.getAllByRole('heading', { level: 3 });
    expect(companies.map((c) => c.textContent)).toEqual(
      Object.keys(expectedRoles),
    );

    for (const company of companies) {
      const role = company.nextElementSibling;
      expect(role?.textContent).toBe(expectedRoles[company.textContent!]);
    }
  });

  it('renders no dates', () => {
    renderWithProviders(<Experience />);

    const text = document.body.textContent ?? '';
    expect(text).not.toMatch(/202[0-9]/);
  });

  it('renders three topics per entry', () => {
    renderWithProviders(<Experience />);

    expect(
      screen.getByText(/Portal do aluno multiplataforma/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Plataforma de gestão multi-tenant/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Site institucional \(React e Vite\)/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Loja de joias online/)).toBeInTheDocument();
  });
});
