import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { AiProcess } from '@/components/organisms/ai-process';

describe('AiProcess', () => {
  it('renders the label and heading', () => {
    renderWithProviders(<AiProcess />);

    expect(screen.getByText('IA First')).toBeInTheDocument();
    expect(
      screen.getByText('IA no fluxo de desenvolvimento'),
    ).toBeInTheDocument();
  });

  it('renders the steps in plan, spec, review order', () => {
    renderWithProviders(<AiProcess />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles.map((title) => title.textContent)).toEqual([
      'Plano',
      'Especificação',
      'Revisão',
    ]);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('scales the section heading down on small screens', () => {
    renderWithProviders(<AiProcess />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'IA no fluxo de desenvolvimento',
      }),
    ).toHaveClass('text-[26px]', 'sm:text-[32px]');
  });
});
