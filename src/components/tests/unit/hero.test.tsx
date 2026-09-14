import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/hero';

describe('Hero', () => {
  it('renders the name and role', () => {
    render(<Hero />);

    expect(screen.getByText('Camila Neves Linder')).toBeInTheDocument();
    expect(screen.getByText('full stack developer.')).toBeInTheDocument();
  });

  it('renders the description line', () => {
    render(<Hero />);

    expect(
      screen.getByText(
        'Do banco de dados à interface, arquitetura, API e aplicação no ar.',
      ),
    ).toBeInTheDocument();
  });

  it('renders every stack tag', () => {
    render(<Hero />);

    for (const tag of [
      'TypeScript',
      'JavaScript',
      'React',
      'React Native',
      'NestJS',
      'Next.js',
    ]) {
      expect(screen.getByText(tag)).toBeInTheDocument();
    }
  });

  it('renders the work CTA link', () => {
    render(<Hero />);

    const cta = screen.getByRole('link', { name: 'Ver trabalho →' });
    expect(cta).toHaveAttribute('href', '#work');
  });

  it('renders the contact CTA link', () => {
    render(<Hero />);

    const cta = screen.getByRole('link', { name: 'Entrar em contato →' });
    expect(cta).toHaveAttribute('href', '#contact');
  });

  it('renders the location', () => {
    render(<Hero />);

    expect(screen.getByText('Florianópolis, SC')).toBeInTheDocument();
  });

  it('renders the profile photo with alt text', () => {
    render(<Hero />);

    expect(screen.getByAltText('Camila Neves Linder')).toBeInTheDocument();
  });
});
