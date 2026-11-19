import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/tests/utils/render';
import { ShowcaseProjectCard } from '@/components/molecules/showcase-project-card';

describe('ShowcaseProjectCard', () => {
  it('scrolls an opened card into view when its top is above the viewport', () => {
    const scrollIntoView = vi.fn();
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
      ...document.body.getBoundingClientRect(),
      top: -40,
    });
    HTMLElement.prototype.scrollIntoView = scrollIntoView;

    renderWithProviders(
      <ShowcaseProjectCard
        projectKey="seja"
        initial="S"
        colorToken="--color-lilac"
        isOpen
        onToggle={vi.fn()}
      />,
    );

    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('shows the project image in place of the placeholder when one is given', () => {
    renderWithProviders(
      <ShowcaseProjectCard
        projectKey="oniapp"
        initial="O"
        colorToken="--color-lilac"
        image="/projects/oniapp.webp"
        isOpen
        onToggle={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('img', { name: 'Imagem do projeto Oniapp' }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/print do/i)).not.toBeInTheDocument();
  });
});
