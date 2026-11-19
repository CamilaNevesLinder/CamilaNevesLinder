import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { CarouselControls } from '@/components/molecules/carousel-controls';
import { createFakeCarouselApi } from '@/tests/utils/fake-carousel-api';

const fakeApi = createFakeCarouselApi(12);
const scrollPrev = vi.fn();
const scrollNext = vi.fn();

vi.mock('@/components/molecules/carousel', () => ({
  useCarousel: () => ({ api: fakeApi, scrollPrev, scrollNext }),
}));

describe('CarouselControls', () => {
  it('shows the padded position and follows the selected slide', () => {
    render(
      <CarouselControls
        previousLabel="Foto anterior"
        nextLabel="Próxima foto"
      />,
    );

    expect(screen.getByText('01 / 12')).toBeInTheDocument();

    act(() => fakeApi.scrollTo(11));

    expect(screen.getByText('12 / 12')).toBeInTheDocument();
  });

  it('scrolls back and forth through the labelled arrows', async () => {
    const user = userEvent.setup();
    render(
      <CarouselControls
        previousLabel="Foto anterior"
        nextLabel="Próxima foto"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Foto anterior' }));
    await user.click(screen.getByRole('button', { name: 'Próxima foto' }));

    expect(scrollPrev).toHaveBeenCalledOnce();
    expect(scrollNext).toHaveBeenCalledOnce();
  });
});
