import { describe, expect, it, vi } from 'vitest';
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
});
