import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LetterField } from '@/components/molecules/letter-field';

describe('LetterField', () => {
  it('links the error to the field when there is one', () => {
    render(
      <LetterField
        name="email"
        label="E-mail"
        placeholder="seu@email.com"
        type="email"
        error="Digita um e-mail válido."
      />,
    );

    const field = screen.getByLabelText('E-mail');
    expect(field).toHaveAttribute('aria-invalid', 'true');
    expect(field).toHaveAccessibleDescription('Digita um e-mail válido.');
  });

  it('renders a textarea for multiline fields with its previous value', () => {
    render(
      <LetterField
        name="message"
        label="Mensagem"
        placeholder="Detalhes"
        isMultiline
        defaultValue="Oi!"
      />,
    );

    const field = screen.getByLabelText('Mensagem');
    expect(field.tagName).toBe('TEXTAREA');
    expect(field).toHaveValue('Oi!');
    expect(field).not.toHaveAttribute('aria-describedby');
  });
});
