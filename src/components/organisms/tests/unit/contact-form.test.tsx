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
  it('renders the three labeled fields', () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Mensagem')).toBeInTheDocument();
  });

  it('disables the submit button and shows the pending label while sending, then the success message', async () => {
    const user = userEvent.setup();
    const { promise, resolve } = deferred<{
      status: 'success';
      fieldErrors: Record<string, never>;
    }>();
    sendContactMessageMock.mockReturnValueOnce(promise);
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText('Nome'), 'Maria Silva');
    await user.type(screen.getByLabelText('E-mail'), 'maria@example.com');
    await user.type(
      screen.getByLabelText('Mensagem'),
      'Gostaria de saber mais sobre seus projetos.',
    );
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByRole('button', { name: 'Enviando...' }),
    ).toBeDisabled();

    resolve({ status: 'success', fieldErrors: {} });
    expect(
      await screen.findByText('Mensagem enviada! Retorno em breve.'),
    ).toBeInTheDocument();
  });

  it('shows field errors returned by the action', async () => {
    const user = userEvent.setup();
    sendContactMessageMock.mockResolvedValueOnce({
      status: 'error',
      fieldErrors: { email: 'emailInvalid' },
    });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText('Digita um e-mail válido.'),
    ).toBeInTheDocument();
  });

  it('shows the name field error returned by the action', async () => {
    const user = userEvent.setup();
    sendContactMessageMock.mockResolvedValueOnce({
      status: 'error',
      fieldErrors: { name: 'nameRequired' },
    });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(await screen.findByText('Digita seu nome.')).toBeInTheDocument();
  });

  it('shows the message field error returned by the action', async () => {
    const user = userEvent.setup();
    sendContactMessageMock.mockResolvedValueOnce({
      status: 'error',
      fieldErrors: { message: 'messageRequired' },
    });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText('Escreve uma mensagem (mínimo 10 caracteres).'),
    ).toBeInTheDocument();
  });

  it('shows the generic error message when the action fails without field errors', async () => {
    const user = userEvent.setup();
    sendContactMessageMock.mockResolvedValueOnce({
      status: 'error',
      fieldErrors: {},
    });
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }));

    expect(
      await screen.findByText(
        'Não foi possível enviar sua mensagem agora. Tenta de novo mais tarde ou usa um dos links abaixo.',
      ),
    ).toBeInTheDocument();
  });

  it('renders the direct-contact links with the expected hrefs', () => {
    renderWithProviders(<ContactForm />);

    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/CamilaNevesLinder',
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/camila-neves-linder-76a342403/',
    );
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      'https://wa.me/5548998558324',
    );
    expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute(
      'href',
      'mailto:camilaneveslindner@gmail.com',
    );
  });

  it('scales the section heading down on small screens', () => {
    renderWithProviders(<ContactForm />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Vamos conversar?' }),
    ).toHaveClass('text-[26px]', 'sm:text-[32px]');
  });

  it('lets the direct-contact icon row wrap instead of overflowing', () => {
    renderWithProviders(<ContactForm />);

    const githubLink = screen.getByRole('link', { name: 'GitHub' });
    expect(githubLink.parentElement).toHaveClass('flex-wrap');
  });
});
