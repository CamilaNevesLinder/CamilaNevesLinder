import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from '@/tests/utils/render';
import { ContactForm } from '@/components/organisms/contact-form';

const sendContactMessageMock = vi.fn();

vi.mock('@/lib/actions/contact', () => ({
  sendContactMessage: (...args: unknown[]) => sendContactMessageMock(...args),
}));

// `@/lib/site` imports `@/lib/navigation`, which calls next-intl's
// `createNavigation()` at module-eval time. That eagerly resolves
// `next/navigation` in a way this Vitest/jsdom setup can't handle
// unmocked (see `src/components/organisms/tests/unit/sidebar.test.tsx`
// and `src/lib/tests/unit/site.test.ts`, which hit the same chain and
// mock it the same way).
vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

describe('ContactForm', () => {
  it('renders the three labeled fields under the letter greeting', () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByText('Oi, Camila!')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument();
  });

  it('disables the submit button while sending, then swaps the form for the sent letter', async () => {
    const user = userEvent.setup();
    const { promise, resolve } = deferred<{
      status: 'success';
      fieldErrors: Record<string, never>;
    }>();
    sendContactMessageMock.mockReturnValueOnce(promise);
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva');
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByRole('button', { name: 'Enviando...' }),
    ).toBeDisabled();

    resolve({ status: 'success', fieldErrors: {} });

    expect(await screen.findByRole('status')).toHaveTextContent(
      'Mensagem enviada!',
    );
    expect(screen.queryByLabelText('Nome')).not.toBeInTheDocument();
  });

  it('goes back to an empty form after choosing to write another message', async () => {
    const user = userEvent.setup();
    sendContactMessageMock.mockResolvedValueOnce({
      status: 'success',
      fieldErrors: {},
    });
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva');
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));
    await user.click(
      await screen.findByRole('button', { name: 'Escrever outra' }),
    );

    expect(screen.getByLabelText('Nome')).toHaveValue('');
  });

  it('shows the field errors returned by the action and keeps what was typed', async () => {
    const user = userEvent.setup();
    sendContactMessageMock.mockResolvedValueOnce({
      status: 'error',
      fieldErrors: {
        name: 'nameRequired',
        email: 'emailInvalid',
        message: 'messageRequired',
      },
      values: { name: 'M', email: 'maria@', message: 'Oi' },
    });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByText('Digita seu nome.')).toBeInTheDocument();
    expect(screen.getByText('Digita um e-mail válido.')).toBeInTheDocument();
    expect(
      screen.getByText('Escreve uma mensagem (mínimo 10 caracteres).'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toHaveValue('maria@');
  });

  it('shows the generic error message when the action fails without field errors', async () => {
    const user = userEvent.setup();
    sendContactMessageMock.mockResolvedValueOnce({
      status: 'error',
      fieldErrors: {},
      values: { name: 'Maria', email: 'maria@example.com', message: 'Oi!' },
    });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText(
        'Não foi possível enviar sua mensagem agora. Tenta de novo mais tarde ou usa um dos outros canais.',
      ),
    ).toBeInTheDocument();
  });
});
