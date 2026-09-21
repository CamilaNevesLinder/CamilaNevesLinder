import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/molecules/sheet';

describe('Sheet', () => {
  it('renders a close button by default', async () => {
    renderWithProviders(
      <Sheet open>
        <SheetTrigger>open</SheetTrigger>
        <SheetContent>content</SheetContent>
      </Sheet>,
    );

    expect(await screen.findByText('Close')).toBeInTheDocument();
  });
});
