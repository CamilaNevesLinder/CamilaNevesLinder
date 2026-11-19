import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Experience } from '@/components/organisms/experience';

describe('Experience', () => {
  it('renders the heading with the emphasised part', () => {
    renderWithProviders(<Experience />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Por onde eu passei');
    expect(heading.querySelector('em')).toHaveTextContent('eu passei');
  });

  it('lists every company in the timeline with role and summary line', () => {
    renderWithProviders(<Experience />);

    const items = screen.getAllByRole('group');
    expect(items).toHaveLength(4);
    expect(
      screen.getByText('Full stack · apps educacionais e de bem-estar'),
    ).toBeInTheDocument();
    expect(screen.getByText('Mince Joias')).toBeInTheDocument();
  });

  it('shows the topics of each company', () => {
    renderWithProviders(<Experience />);

    expect(
      screen.getByText('Cobrança recorrente com Mercado Pago e Asaas'),
    ).toBeInTheDocument();
  });

  it('renders the education list', () => {
    renderWithProviders(<Experience />);

    expect(screen.getByText('Formações e cursos')).toBeInTheDocument();
  });
});
