import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const sendMailMock = vi.fn();
const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));

vi.mock('nodemailer', () => ({
  default: { createTransport: createTransportMock },
}));

const { sendContactMessage } = await import('@/lib/actions/contact');
const { initialContactFormState } = await import('@/lib/actions/contact-state');

const VALID_FIELDS = {
  name: 'Maria Silva',
  email: 'maria@example.com',
  message: 'Gostaria de saber mais sobre seus projetos.',
  company: '',
};

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
}

beforeEach(() => {
  vi.stubEnv('SMTP_HOST', 'smtp.gmail.com');
  vi.stubEnv('SMTP_PORT', '587');
  vi.stubEnv('SMTP_USER', 'user@gmail.com');
  vi.stubEnv('SMTP_PASSWORD', 'app-password');
  vi.stubEnv('SMTP_FROM', 'user@gmail.com');
  vi.stubEnv('CONTACT_TO_EMAIL', 'camila@example.com');
  sendMailMock.mockReset();
  createTransportMock.mockClear();
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('sendContactMessage', () => {
  it('returns field errors for an empty submission and does not send mail', async () => {
    const result = await sendContactMessage(
      initialContactFormState,
      buildFormData({ name: '', email: '', message: '', company: '' }),
    );

    expect(result).toEqual({
      status: 'error',
      fieldErrors: {
        name: 'nameRequired',
        email: 'emailInvalid',
        message: 'messageRequired',
      },
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('rejects a malformed email', async () => {
    const result = await sendContactMessage(
      initialContactFormState,
      buildFormData({ ...VALID_FIELDS, email: 'not-an-email' }),
    );

    expect(result).toEqual({
      status: 'error',
      fieldErrors: { email: 'emailInvalid' },
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('sends the email with the expected fields on valid input', async () => {
    sendMailMock.mockResolvedValueOnce(undefined);

    const result = await sendContactMessage(
      initialContactFormState,
      buildFormData(VALID_FIELDS),
    );

    expect(result).toEqual({ status: 'success', fieldErrors: {} });
    expect(createTransportMock).toHaveBeenCalledWith({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: 'user@gmail.com', pass: 'app-password' },
    });
    expect(sendMailMock).toHaveBeenCalledWith({
      to: 'camila@example.com',
      from: 'user@gmail.com',
      replyTo: 'maria@example.com',
      subject: 'Novo contato via site — Maria Silva',
      text: expect.stringContaining(
        'Gostaria de saber mais sobre seus projetos.',
      ),
    });
  });

  it('returns success without sending when the honeypot field is filled', async () => {
    const result = await sendContactMessage(
      initialContactFormState,
      buildFormData({ ...VALID_FIELDS, company: 'Acme Inc' }),
    );

    expect(result).toEqual({ status: 'success', fieldErrors: {} });
    expect(sendMailMock).not.toHaveBeenCalled();
    expect(createTransportMock).not.toHaveBeenCalled();
  });

  it('returns a generic error when SMTP env vars are missing', async () => {
    vi.stubEnv('SMTP_HOST', '');

    const result = await sendContactMessage(
      initialContactFormState,
      buildFormData(VALID_FIELDS),
    );

    expect(result).toEqual({ status: 'error', fieldErrors: {} });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('returns a generic error when sendMail rejects', async () => {
    sendMailMock.mockRejectedValueOnce(new Error('SMTP down'));

    const result = await sendContactMessage(
      initialContactFormState,
      buildFormData(VALID_FIELDS),
    );

    expect(result).toEqual({ status: 'error', fieldErrors: {} });
  });

  it('treats a completely missing field the same as an empty one', async () => {
    const formData = new FormData();
    formData.set('email', VALID_FIELDS.email);
    formData.set('message', VALID_FIELDS.message);
    formData.set('company', '');
    // 'name' is never set at all — not even to ''

    const result = await sendContactMessage(initialContactFormState, formData);

    expect(result).toEqual({
      status: 'error',
      fieldErrors: { name: 'nameRequired' },
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });

  it('treats every field as missing the same as a fully empty submission', async () => {
    // No field is set at all — not even to '' — exercising the `?? ''`
    // fallback for email, message, and the honeypot as well as name.
    const formData = new FormData();

    const result = await sendContactMessage(initialContactFormState, formData);

    expect(result).toEqual({
      status: 'error',
      fieldErrors: {
        name: 'nameRequired',
        email: 'emailInvalid',
        message: 'messageRequired',
      },
    });
    expect(sendMailMock).not.toHaveBeenCalled();
  });
});
