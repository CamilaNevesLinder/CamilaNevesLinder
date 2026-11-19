import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CarouselDots } from '@/components/molecules/carousel-dots';
import { createFakeCarouselApi } from '@/tests/utils/fake-carousel-api';

const fakeApi = createFakeCarouselApi(3);

vi.mock('@/components/molecules/carousel', () => ({
  useCarousel: () => ({ api: fakeApi }),
}));

describe('CarouselDots', () => {
  it('renders one dot per slide and jumps to the clicked one', async () => {
    const user = userEvent.setup();
    render(<CarouselDots getDotLabel={(n) => `Ir para foto ${n}`} />);

    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(
      screen.getByRole('button', { name: 'Ir para foto 1' }),
    ).toHaveAttribute('aria-current', 'true');

    await user.click(screen.getByRole('button', { name: 'Ir para foto 3' }));

    expect(fakeApi.scrollTo).toHaveBeenCalledWith(2);
    expect(
      screen.getByRole('button', { name: 'Ir para foto 3' }),
    ).toHaveAttribute('aria-current', 'true');
  });
});
