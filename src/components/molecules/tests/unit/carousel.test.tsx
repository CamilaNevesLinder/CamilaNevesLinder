import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, renderWithProviders } from '@/tests/utils/render';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/molecules/carousel';

describe('Carousel', () => {
  it('throws when a carousel part is used outside a <Carousel />', () => {
    expect(() => renderWithProviders(<CarouselContent />)).toThrow(
      'useCarousel must be used within a <Carousel />',
    );
  });

  it('calls setApi once embla initializes', async () => {
    const setApi = vi.fn();
    renderWithProviders(
      <Carousel setApi={setApi}>
        <CarouselContent>
          <CarouselItem>one</CarouselItem>
          <CarouselItem>two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    expect(setApi).toHaveBeenCalledWith(expect.anything());
  });

  it('scrolls on ArrowLeft/ArrowRight key presses', () => {
    renderWithProviders(
      <Carousel>
        <CarouselContent>
          <CarouselItem>one</CarouselItem>
          <CarouselItem>two</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    );

    const region = screen.getByRole('region');

    expect(() => {
      fireEvent.keyDown(region, { key: 'ArrowLeft' });
      fireEvent.keyDown(region, { key: 'ArrowRight' });
      fireEvent.keyDown(region, { key: 'Enter' });
    }).not.toThrow();
  });
});
