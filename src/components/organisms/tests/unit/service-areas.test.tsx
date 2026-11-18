import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ServiceAreas } from '@/components/organisms/service-areas';

describe('ServiceAreas', () => {
  it('renders the three areas with their stack line', () => {
    renderWithProviders(<ServiceAreas />);

    expect(
      screen.getByRole('region', { name: 'O que eu faço' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('heading', { name: 'Mobile' })).toBeInTheDocument();
    expect(
      screen.getByText('React Native · Expo · NativeWind'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Front-end' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Next.js · React · Tailwind')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Back-end' }),
    ).toBeInTheDocument();
    expect(screen.getByText('NestJS · TypeORM · MySQL')).toBeInTheDocument();
  });
});
