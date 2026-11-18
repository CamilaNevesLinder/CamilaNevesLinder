import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '@/tests/utils/render';
import { ExperienceItem } from '@/components/molecules/experience-item';

const TOPICS = ['Portal do aluno', 'Painéis em Next.js'];

describe('ExperienceItem', () => {
  it('shows the company and summary and keeps topics collapsed', () => {
    const { container } = render(
      <ExperienceItem
        company="Onilearning"
        summary="Full stack · apps educacionais"
        topics={TOPICS}
        isCurrent
      />,
    );

    expect(screen.getByText('Onilearning')).toBeInTheDocument();
    expect(
      screen.getByText('Full stack · apps educacionais'),
    ).toBeInTheDocument();
    expect(container.querySelector('details')).not.toHaveAttribute('open');
  });

  it('expands the topics when the summary is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ExperienceItem
        company="Ritmar"
        summary="Full stack · SaaS"
        topics={TOPICS}
        isCurrent={false}
      />,
    );

    await user.click(screen.getByText('Ritmar'));

    expect(container.querySelector('details')).toHaveAttribute('open');
    expect(screen.getByText('Painéis em Next.js')).toBeVisible();
  });

  it('highlights the timeline dot only for the current job', () => {
    const { container, rerender } = render(
      <ExperienceItem company="A" summary="s" topics={TOPICS} isCurrent />,
    );
    expect(container.querySelector('li > span')).toHaveClass('bg-clay');

    rerender(
      <ExperienceItem
        company="A"
        summary="s"
        topics={TOPICS}
        isCurrent={false}
      />,
    );
    expect(container.querySelector('li > span')).toHaveClass('bg-dusty');
  });
});
