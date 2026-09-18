'use server';

import { createMailTransport } from '@/lib/mail';
import type { ContactFormState } from '@/lib/actions/contact-state';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();
  const honeypot = String(formData.get('company') ?? '').trim();

  if (honeypot) {
    return { status: 'success', fieldErrors: {} };
  }

  const fieldErrors: ContactFormState['fieldErrors'] = {};
  if (name.length < 2) fieldErrors.name = 'nameRequired';
  if (!EMAIL_REGEX.test(email)) fieldErrors.email = 'emailInvalid';
  if (message.length < 10) fieldErrors.message = 'messageRequired';

  if (Object.keys(fieldErrors).length > 0) {
    return { status: 'error', fieldErrors };
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.SMTP_FROM;
  const transport = createMailTransport();

  if (!transport || !to || !from) {
    console.error('[contact] SMTP is not configured — message not sent');
    return { status: 'error', fieldErrors: {} };
  }

  try {
    await transport.sendMail({
      to,
      from,
      replyTo: email,
      subject: `Novo contato via site — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
    });
  } catch (error) {
    console.error('[contact] failed to send message', error);
    return { status: 'error', fieldErrors: {} };
  }

  return { status: 'success', fieldErrors: {} };
}
