import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { OtherLanguages } from '@/components/organisms/other-languages';

describe('OtherLanguages', () => {
  it('lists the languages I study as badges', () => {
    renderWithProviders(<OtherLanguages />);

    expect(screen.getByText('Alemão')).toBeInTheDocument();
    expect(screen.getByText('Espanhol')).toBeInTheDocument();
  });
});
