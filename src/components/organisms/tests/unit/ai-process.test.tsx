import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { AiProcess } from '@/components/organisms/ai-process';

describe('AiProcess', () => {
  it('renders the heading with emphasis and the handwritten note', () => {
    renderWithProviders(<AiProcess />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'IA no processo, eu no controle',
    );
    expect(screen.getByText('↳ revisão humana em cada etapa')).toHaveClass(
      'font-hand',
    );
  });

  it('renders the steps in spec, plan, review order with hand numbers', () => {
    renderWithProviders(<AiProcess />);

    const steps = screen.getAllByRole('listitem');
    expect(steps).toHaveLength(3);
    expect(steps[0]).toHaveTextContent(
      '1.EspecificaçãoRequisitos e limites escritos antes de qualquer código.',
    );
    expect(steps[1]).toHaveTextContent('2.Plano');
    expect(steps[2]).toHaveTextContent('3.Revisão');
  });
});
