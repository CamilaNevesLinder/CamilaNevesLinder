import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { screen, userEvent, renderWithProviders } from '@/tests/utils/render';
import { ThemeToggle } from '@/components/molecules/theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('starts in light mode and offers to enable dark mode', () => {
    renderWithProviders(<ThemeToggle />);

    expect(
      screen.getByRole('button', { name: 'Ativar modo escuro' }),
    ).toBeInTheDocument();
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('switches to dark mode, persists the choice and flips the label', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle />);

    await user.click(
      screen.getByRole('button', { name: 'Ativar modo escuro' }),
    );

    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(
      screen.getByRole('button', { name: 'Ativar modo claro' }),
    ).toBeInTheDocument();
  });

  it('restores the stored dark theme on mount', () => {
    localStorage.setItem('theme', 'dark');
    renderWithProviders(<ThemeToggle />);

    expect(document.documentElement).toHaveClass('dark');
    expect(
      screen.getByRole('button', { name: 'Ativar modo claro' }),
    ).toBeInTheDocument();
  });

  it('goes back to light mode on a second click', async () => {
    const user = userEvent.setup();
    localStorage.setItem('theme', 'dark');
    renderWithProviders(<ThemeToggle />);

    await user.click(screen.getByRole('button', { name: 'Ativar modo claro' }));

    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
