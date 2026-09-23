# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/contact` placeholder with a real contact form (name/email/message) that sends an email via SMTP, plus a secondary block of direct links (GitHub, LinkedIn, WhatsApp, email).

**Architecture:** A Next.js Server Action (`sendContactMessage`) does validation and sends mail via `nodemailer`, using the `SMTP_*`/`CONTACT_TO_EMAIL` env vars already declared in `env.d.ts`/`.env.example` but never wired up. A new Client Component organism (`ContactForm`) drives the form with React's `useActionState`, following the same page pattern as `/about`, `/projects`, `/technologies` (a static `pages/*` wrapper around one organism). No API route, no new UI framework — form fields come from `shadcn` (`Input`, `Label`, `Textarea`), same as the rest of the design system.

**Tech Stack:** Next.js 16 App Router (Server Actions, `useActionState`), React 19, next-intl 4, shadcn/ui atoms, Tailwind v4, `nodemailer` (new dependency), Vitest 4 + Testing Library.

**Spec:** `docs/plans/2026-09-17-contact-page-design.md`

## Global Constraints

- No `zod` — this project has no `zod` dependency; validate manually (required fields + a regex for email), same approach the Next.js forms guide shows for simple cases.
- Only one new dependency: `nodemailer`. Do not add `react-hook-form`, `@types/nodemailer`, or any other package unless a step below says so.
- A file with the `'use server'` directive can only export async functions (Next.js constraint) — types and the `initialContactFormState` object live in a **separate** file (`contact-state.ts`), never in `contact.ts` itself.
- Server Actions run in the Node.js runtime by default; `nodemailer` needs `net`/`tls` and cannot run on Edge. Nothing in this project sets `runtime = 'edge'` — do not add that configuration anywhere in this work.
- Design tokens are a closed set (`docs/design-tokens.md`): only the 5 color tokens (`cream`/`blush`/`rose`/`taupe`/`espresso`) and shadcn semantic tokens (`--destructive`, `--border`, etc.) are allowed. New shadcn atoms must come from the CLI (`pnpm dlx shadcn@latest add ...`), never hand-written, and must not introduce a literal color the CLI might suggest.
- Honeypot field (`company`) must never be reachable by keyboard or announced to assistive tech (`tabIndex={-1}`, `aria-hidden="true"`, `sr-only`), and a filled honeypot always returns the same `success` state as a real send — never expose that spam was detected.
- Every task must leave `pnpm typecheck` and `pnpm test:unit` passing.
- Do not commit. The project owner (camila.neves@onilearning.com.br) commits manually — this applies to every task below, no exceptions.

---

## Task 1: Mail transport + `sendContactMessage` Server Action

**Files:**

- Modify: `package.json` (add `nodemailer`)
- Create: `src/lib/mail.ts`
- Create: `src/lib/actions/contact-state.ts`
- Create: `src/lib/actions/contact.ts`
- Create: `src/lib/actions/tests/unit/contact.test.ts`

**Interfaces:**

- Produces (consumed by Task 3): `sendContactMessage(prevState: ContactFormState, formData: FormData): Promise<ContactFormState>` from `@/lib/actions/contact`.
- Produces (consumed by Task 3): `ContactFormState` (type) and `initialContactFormState: ContactFormState` from `@/lib/actions/contact-state`, where:
  ```ts
  type ContactFieldErrorCode =
    'nameRequired' | 'emailInvalid' | 'messageRequired';
  type ContactFormState = {
    status: 'idle' | 'success' | 'error';
    fieldErrors: Partial<
      Record<'name' | 'email' | 'message', ContactFieldErrorCode>
    >;
  };
  ```
- Produces (internal to this task, not used elsewhere): `createMailTransport(): import('nodemailer').Transporter | null` from `@/lib/mail`.
- Consumes: env vars `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `CONTACT_TO_EMAIL` (already declared in `env.d.ts`, all optional/`string | undefined`).

- [ ] **Step 1: Add the `nodemailer` dependency**

```bash
pnpm add nodemailer
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/actions/tests/unit/contact.test.ts`:

```ts
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
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
pnpm vitest run src/lib/actions/tests/unit/contact.test.ts
```

Expected: FAIL with a module-not-found error for `@/lib/actions/contact`.

- [ ] **Step 4: Create `src/lib/mail.ts`**

```ts
import nodemailer from 'nodemailer';

export function createMailTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  });
}
```

- [ ] **Step 5: Create `src/lib/actions/contact-state.ts`**

```ts
export type ContactFieldErrorCode =
  'nameRequired' | 'emailInvalid' | 'messageRequired';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  fieldErrors: Partial<
    Record<'name' | 'email' | 'message', ContactFieldErrorCode>
  >;
};

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  fieldErrors: {},
};
```

- [ ] **Step 6: Create `src/lib/actions/contact.ts`**

```ts
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
```

- [ ] **Step 7: Run test to verify it passes**

```bash
pnpm vitest run src/lib/actions/tests/unit/contact.test.ts
```

Expected: PASS (6/6).

- [ ] **Step 8: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass. If typecheck complains about missing types for `nodemailer`, check whether it ships its own `.d.ts` (it does, since v6) — do not add `@types/nodemailer`, it does not exist as a separate package for current nodemailer versions.

Do not commit — the project owner commits manually.

---

## Task 2: WhatsApp support (`SOCIAL_LINKS`, icon, nav label) + new shadcn form atoms

**Files:**

- Modify: `src/lib/site.ts`
- Modify: `src/lib/tests/unit/site.test.ts`
- Modify: `src/components/atoms/icons/social-icons.tsx`
- Modify: `messages/pt-br.json`, `messages/en.json`, `messages/es.json` (`nav.social.whatsapp` only, in this task)
- Create: `src/components/atoms/input.tsx`, `src/components/atoms/label.tsx`, `src/components/atoms/textarea.tsx` (via shadcn CLI)

**Interfaces:**

- Produces (consumed by Task 3): `SOCIAL_LINKS.whatsapp: string` from `@/lib/site`.
- Produces (consumed by Task 3): `WhatsappIcon(props: IconProps)` from `@/components/atoms/icons/social-icons` (same `IconProps` shape as the existing `GithubIcon`/`LinkedinIcon` in that file).
- Produces (consumed by Task 3): `Input`, `Label`, `Textarea` React components from `@/components/atoms/input`, `@/components/atoms/label`, `@/components/atoms/textarea` (standard shadcn wrappers around native `<input>`/`<label>`/`<textarea>`, accepting all native props via `React.ComponentProps<'input' | 'label' | 'textarea'>`).
- Consumes: nothing new.

- [ ] **Step 1: Add the shadcn form atoms**

```bash
pnpm dlx shadcn@latest add input label textarea
```

Confirm the 3 files land in `src/components/atoms/` (per `components.json`'s `"ui": "@/components/atoms"` alias) and that none of them contain a literal color (e.g. `oklch(...)`) — if the CLI ever emits one, replace it with the matching semantic token (e.g. `border-border`, `bg-background`) per `docs/design-tokens.md`. Do not hand-edit anything else in these generated files.

- [ ] **Step 2: Write the failing test for `SOCIAL_LINKS.whatsapp`**

In `src/lib/tests/unit/site.test.ts`, change the destructured import:

```ts
const { OG_IMAGE_URL, SITE_URL, localizedPath, localizedUrl } =
  await import('@/lib/site');
```

to:

```ts
const { OG_IMAGE_URL, SITE_URL, SOCIAL_LINKS, localizedPath, localizedUrl } =
  await import('@/lib/site');
```

Then add, at the end of the file:

```ts
describe('SOCIAL_LINKS', () => {
  it('has a WhatsApp link in wa.me format', () => {
    expect(SOCIAL_LINKS.whatsapp).toBe('https://wa.me/5548998558324');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
pnpm vitest run src/lib/tests/unit/site.test.ts
```

Expected: FAIL — `SOCIAL_LINKS.whatsapp` is `undefined`.

- [ ] **Step 4: Add `whatsapp` to `SOCIAL_LINKS`**

In `src/lib/site.ts`, change:

```ts
export const SOCIAL_LINKS = {
  github: 'https://github.com/CamilaNevesLinder',
  linkedin: 'https://www.linkedin.com/in/camila-neves-linder-76a342403/',
  instagram: 'https://www.instagram.com/camila.nevees/',
  email: 'mailto:camilaneveslindner@gmail.com',
} as const;
```

to:

```ts
export const SOCIAL_LINKS = {
  github: 'https://github.com/CamilaNevesLinder',
  linkedin: 'https://www.linkedin.com/in/camila-neves-linder-76a342403/',
  instagram: 'https://www.instagram.com/camila.nevees/',
  whatsapp: 'https://wa.me/5548998558324',
  email: 'mailto:camilaneveslindner@gmail.com',
} as const;
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/lib/tests/unit/site.test.ts
```

Expected: PASS.

- [ ] **Step 6: Add `WhatsappIcon` to `social-icons.tsx`**

In `src/components/atoms/icons/social-icons.tsx`, add after `InstagramIcon`:

```tsx
export function WhatsappIcon(props: IconProps) {
  return (
    <BaseSvg {...props}>
      <path d="M3 21l1.65-4.95A9 9 0 1 1 8 19.5z" />
      <path d="M8.5 9.5c0 3 2 5.5 5 5.5.5 0 1.5-.2 1.5-1v-1.2c0-.3-.2-.5-.5-.6l-1.7-.5c-.3-.1-.6 0-.7.3l-.3.6c-1-.5-1.8-1.3-2.3-2.3l.6-.3c.3-.1.4-.4.3-.7l-.5-1.7c-.1-.3-.3-.5-.6-.5H8.5z" />
    </BaseSvg>
  );
}
```

This file has no dedicated test today (it's exercised indirectly through `Sidebar`'s tests) — no test file to update here; `WhatsappIcon` gets covered indirectly by Task 3's `contact-form.test.tsx`.

- [ ] **Step 7: Add `nav.social.whatsapp` to all 3 locale files**

In `messages/pt-br.json`, `messages/en.json`, `messages/es.json`, change:

```json
    "social": {
      "github": "GitHub",
      "linkedin": "LinkedIn",
      "instagram": "Instagram",
      "email": "E-mail"
    },
```

(`"E-mail"` in pt-br, `"Email"` in en, `"Correo"` in es — keep each file's existing `email` value) to:

```json
    "social": {
      "github": "GitHub",
      "linkedin": "LinkedIn",
      "instagram": "Instagram",
      "whatsapp": "WhatsApp",
      "email": "E-mail"
    },
```

(again, keep each file's own existing `email` translation — only the new `whatsapp` line is added, same value `"WhatsApp"` in all 3 locales since it's a brand name).

- [ ] **Step 8: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit — the project owner commits manually.

---

## Task 3: `ContactForm` organism + pt-br content

**Files:**

- Modify: `messages/pt-br.json`
- Create: `src/components/organisms/contact-form.tsx`
- Create: `src/components/organisms/tests/unit/contact-form.test.tsx`

**Interfaces:**

- Consumes: `sendContactMessage` + `ContactFormState` (Task 1), `SOCIAL_LINKS` + `WhatsappIcon` + `Input`/`Label`/`Textarea` (Task 2), `GithubIcon`/`LinkedinIcon` (existing, `@/components/atoms/icons/social-icons`), `Card` (`@/components/atoms/card`), `Button`/`buttonVariants` (`@/components/atoms/button`).
- Produces (consumed by Task 5): `ContactForm` (named export, no props) from `@/components/organisms/contact-form`.

- [ ] **Step 1: Write the failing test**

Create `src/components/organisms/tests/unit/contact-form.test.tsx`:

```tsx
import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders, userEvent } from '@/tests/utils/render';
import { ContactForm } from '@/components/organisms/contact-form';

const sendContactMessageMock = vi.fn();

vi.mock('@/lib/actions/contact', () => ({
  sendContactMessage: (...args: unknown[]) => sendContactMessageMock(...args),
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
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/organisms/tests/unit/contact-form.test.tsx
```

Expected: FAIL with a module-not-found error for `@/components/organisms/contact-form`.

- [ ] **Step 3: Add the `contactPage` namespace to `messages/pt-br.json`**

Find the end of `technologiesPage` (right before `"nav": {`):

```json
      "architecture": {
        "title": "Arquitetura",
        "items": [
          "Atomic Design",
          "Arquitetura Escalável",
          "SOLID",
          "Clean Code"
        ]
      }
    }
  },
  "nav": {
```

Replace with:

```json
      "architecture": {
        "title": "Arquitetura",
        "items": [
          "Atomic Design",
          "Arquitetura Escalável",
          "SOLID",
          "Clean Code"
        ]
      }
    }
  },
  "contactPage": {
    "label": "Contato",
    "heading": "Vamos conversar?",
    "intro": "Me manda uma mensagem ou usa um dos links abaixo — respondo o mais rápido que der.",
    "form": {
      "nameLabel": "Nome",
      "namePlaceholder": "Seu nome",
      "emailLabel": "E-mail",
      "emailPlaceholder": "seu@email.com",
      "messageLabel": "Mensagem",
      "messagePlaceholder": "Conta um pouco sobre o que você precisa",
      "submit": "Enviar mensagem",
      "submitPending": "Enviando...",
      "successMessage": "Mensagem enviada! Retorno em breve.",
      "errorMessage": "Não foi possível enviar sua mensagem agora. Tenta de novo mais tarde ou usa um dos links abaixo.",
      "errors": {
        "nameRequired": "Digita seu nome.",
        "emailInvalid": "Digita um e-mail válido.",
        "messageRequired": "Escreve uma mensagem (mínimo 10 caracteres)."
      }
    },
    "directContact": {
      "heading": "Prefere falar direto?"
    }
  },
  "nav": {
```

(This step only touches `messages/pt-br.json`. `en.json`/`es.json` get their own `contactPage` block in Task 4 — do not add it there yet, or Task 4's diff context won't match.)

- [ ] **Step 4: Create `src/components/organisms/contact-form.tsx`**

```tsx
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import {
  GithubIcon,
  LinkedinIcon,
  WhatsappIcon,
} from '@/components/atoms/icons/social-icons';
import { Card } from '@/components/atoms/card';
import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';
import { Textarea } from '@/components/atoms/textarea';
import { Button, buttonVariants } from '@/components/atoms/button';
import { SOCIAL_LINKS } from '@/lib/site';
import { sendContactMessage } from '@/lib/actions/contact';
import {
  initialContactFormState,
  type ContactFormState,
} from '@/lib/actions/contact-state';

const DIRECT_LINK_CLASSNAME = buttonVariants({
  variant: 'ghost',
  size: 'icon',
});

export function ContactForm() {
  const t = useTranslations('contactPage');
  const tNav = useTranslations('nav');
  const [state, formAction, pending] = useActionState<
    ContactFormState,
    FormData
  >(sendContactMessage, initialContactFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[720px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[32px] font-bold">
          {t('heading')}
        </h2>
        <p className="text-taupe mt-3 text-[17px] leading-relaxed">
          {t('intro')}
        </p>

        <Card className="border-rose/40 mt-9 rounded-[24px] border p-8 shadow-none ring-0">
          <form
            ref={formRef}
            action={formAction}
            className="flex flex-col gap-5"
            noValidate
          >
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />

            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-name">{t('form.nameLabel')}</Label>
              <Input
                id="contact-name"
                name="name"
                placeholder={t('form.namePlaceholder')}
                aria-invalid={Boolean(state.fieldErrors.name)}
                aria-describedby={
                  state.fieldErrors.name ? 'contact-name-error' : undefined
                }
              />
              {state.fieldErrors.name && (
                <p id="contact-name-error" className="text-destructive text-sm">
                  {t(`form.errors.${state.fieldErrors.name}`)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-email">{t('form.emailLabel')}</Label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                placeholder={t('form.emailPlaceholder')}
                aria-invalid={Boolean(state.fieldErrors.email)}
                aria-describedby={
                  state.fieldErrors.email ? 'contact-email-error' : undefined
                }
              />
              {state.fieldErrors.email && (
                <p
                  id="contact-email-error"
                  className="text-destructive text-sm"
                >
                  {t(`form.errors.${state.fieldErrors.email}`)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="contact-message">{t('form.messageLabel')}</Label>
              <Textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder={t('form.messagePlaceholder')}
                aria-invalid={Boolean(state.fieldErrors.message)}
                aria-describedby={
                  state.fieldErrors.message
                    ? 'contact-message-error'
                    : undefined
                }
              />
              {state.fieldErrors.message && (
                <p
                  id="contact-message-error"
                  className="text-destructive text-sm"
                >
                  {t(`form.errors.${state.fieldErrors.message}`)}
                </p>
              )}
            </div>

            <Button type="submit" disabled={pending} className="self-start">
              {pending ? t('form.submitPending') : t('form.submit')}
            </Button>

            <p aria-live="polite" className="text-sm">
              {state.status === 'success' && t('form.successMessage')}
              {state.status === 'error' &&
                Object.keys(state.fieldErrors).length === 0 &&
                t('form.errorMessage')}
            </p>
          </form>
        </Card>

        <p className="text-taupe mb-[14px] mt-12 font-mono text-sm uppercase tracking-wide">
          {t('directContact.heading')}
        </p>
        <div className="flex items-center gap-1">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.github')}
            className={DIRECT_LINK_CLASSNAME}
          >
            <GithubIcon size={18} aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.linkedin')}
            className={DIRECT_LINK_CLASSNAME}
          >
            <LinkedinIcon size={18} aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.whatsapp')}
            className={DIRECT_LINK_CLASSNAME}
          >
            <WhatsappIcon size={18} aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.email}
            aria-label={tNav('social.email')}
            className={DIRECT_LINK_CLASSNAME}
          >
            <Mail size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/components/organisms/tests/unit/contact-form.test.tsx
```

Expected: PASS (4/4).

- [ ] **Step 6: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit — the project owner commits manually.

---

## Task 4: EN/ES translations + locale-parity test

**Files:**

- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Create: `src/tests/unit/messages-contact-page.test.ts`

**Interfaces:**

- No new exports. `ContactForm` (Task 3) already reads `contactPage.*` generically via `t()`, so it works against any locale once the keys exist.

- [ ] **Step 1: Add `contactPage` to `messages/en.json`**

Find the end of `technologiesPage` (right before `"nav": {`) — same anchor as Task 3 Step 3, but in `en.json`:

```json
      "architecture": {
        "title": "Architecture",
        "items": [
          "Atomic Design",
          "Scalable Architecture",
          "SOLID",
          "Clean Code"
        ]
      }
    }
  },
  "nav": {
```

Replace with:

```json
      "architecture": {
        "title": "Architecture",
        "items": [
          "Atomic Design",
          "Scalable Architecture",
          "SOLID",
          "Clean Code"
        ]
      }
    }
  },
  "contactPage": {
    "label": "Contact",
    "heading": "Let's talk?",
    "intro": "Send me a message or use one of the links below — I'll get back to you as soon as I can.",
    "form": {
      "nameLabel": "Name",
      "namePlaceholder": "Your name",
      "emailLabel": "Email",
      "emailPlaceholder": "you@email.com",
      "messageLabel": "Message",
      "messagePlaceholder": "Tell me a bit about what you need",
      "submit": "Send message",
      "submitPending": "Sending...",
      "successMessage": "Message sent! I'll get back to you soon.",
      "errorMessage": "Couldn't send your message right now. Try again later or use one of the links below.",
      "errors": {
        "nameRequired": "Enter your name.",
        "emailInvalid": "Enter a valid email.",
        "messageRequired": "Write a message (minimum 10 characters)."
      }
    },
    "directContact": {
      "heading": "Prefer to reach out directly?"
    }
  },
  "nav": {
```

If `en.json`'s `architecture.title`/`items` wording differs slightly from the snippet above, match the anchor to whatever text is actually there (check with `grep -n -B8 '"nav": {' messages/en.json` first) — only the `"nav": {` line and the two closing `}` immediately before it are load-bearing for the insertion point.

- [ ] **Step 2: Add `contactPage` to `messages/es.json`**

Same anchor, in `es.json`:

```json
    }
  },
  "nav": {
```

Insert before it:

```json
  "contactPage": {
    "label": "Contacto",
    "heading": "¿Hablamos?",
    "intro": "Envíame un mensaje o usa uno de los enlaces de abajo — te respondo lo antes posible.",
    "form": {
      "nameLabel": "Nombre",
      "namePlaceholder": "Tu nombre",
      "emailLabel": "Correo",
      "emailPlaceholder": "tu@correo.com",
      "messageLabel": "Mensaje",
      "messagePlaceholder": "Cuéntame un poco sobre lo que necesitas",
      "submit": "Enviar mensaje",
      "submitPending": "Enviando...",
      "successMessage": "¡Mensaje enviado! Te responderé pronto.",
      "errorMessage": "No fue posible enviar tu mensaje ahora. Intenta más tarde o usa uno de los enlaces de abajo.",
      "errors": {
        "nameRequired": "Escribe tu nombre.",
        "emailInvalid": "Escribe un correo válido.",
        "messageRequired": "Escribe un mensaje (mínimo 10 caracteres)."
      }
    },
    "directContact": {
      "heading": "¿Prefieres hablar directo?"
    }
  },
```

(Verify `grep -n -B8 '"nav": {' messages/es.json` for the exact anchor first, same as Step 1.)

- [ ] **Step 3: Create the locale-parity test**

Create `src/tests/unit/messages-contact-page.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const TOP_KEYS = ['label', 'heading', 'intro', 'form', 'directContact'];
const FORM_KEYS = [
  'nameLabel',
  'namePlaceholder',
  'emailLabel',
  'emailPlaceholder',
  'messageLabel',
  'messagePlaceholder',
  'submit',
  'submitPending',
  'successMessage',
  'errorMessage',
  'errors',
];
const ERROR_KEYS = ['nameRequired', 'emailInvalid', 'messageRequired'];

describe('contactPage message parity', () => {
  it('has the same top-level keys across all locales', () => {
    expect(Object.keys(ptBr.contactPage)).toEqual(TOP_KEYS);
    expect(Object.keys(en.contactPage)).toEqual(TOP_KEYS);
    expect(Object.keys(es.contactPage)).toEqual(TOP_KEYS);
  });

  it('has the same form field keys across all locales', () => {
    expect(Object.keys(ptBr.contactPage.form)).toEqual(FORM_KEYS);
    expect(Object.keys(en.contactPage.form)).toEqual(FORM_KEYS);
    expect(Object.keys(es.contactPage.form)).toEqual(FORM_KEYS);
  });

  it('has error codes matching the server action field-error codes, in every locale', () => {
    expect(Object.keys(ptBr.contactPage.form.errors)).toEqual(ERROR_KEYS);
    expect(Object.keys(en.contactPage.form.errors)).toEqual(ERROR_KEYS);
    expect(Object.keys(es.contactPage.form.errors)).toEqual(ERROR_KEYS);
  });

  it('has a non-empty directContact.heading in every locale', () => {
    expect(ptBr.contactPage.directContact.heading).toBeTruthy();
    expect(en.contactPage.directContact.heading).toBeTruthy();
    expect(es.contactPage.directContact.heading).toBeTruthy();
  });
});
```

Run it directly to confirm it's picked up by the `unit-node` vitest project and passes:

```bash
pnpm vitest run src/tests/unit/messages-contact-page.test.ts
```

Expected: PASS (4/4). If it reports "No test files found", stop and report NEEDS_CONTEXT — do not guess at a different file location (the sibling file `messages-technologies-page.test.ts` at the same path already proves this glob works).

- [ ] **Step 4: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit.

---

## Task 5: Wire `ContactPage` to `ContactForm`

**Files:**

- Modify: `src/components/pages/contact-page.tsx`
- Modify: `src/components/pages/tests/unit/contact-page.test.tsx`

**Interfaces:**

- Consumes: `ContactForm` from `@/components/organisms/contact-form` (Task 3).

`src/app/[locale]/(pages)/contact/page.tsx` needs no change — it already just renders `<ContactPage />`.

- [ ] **Step 1: Write the failing test**

Replace `src/components/pages/tests/unit/contact-page.test.tsx` with:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ContactPage } from '@/components/pages/contact-page';

describe('ContactPage', () => {
  it('renders the contact form', () => {
    renderWithProviders(<ContactPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Vamos conversar?' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Enviar mensagem' }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/pages/tests/unit/contact-page.test.tsx
```

Expected: FAIL — the current `ContactPage` renders the "Conteúdo em breve." placeholder, not the form.

- [ ] **Step 3: Replace `src/components/pages/contact-page.tsx`**

```tsx
import { ContactForm } from '@/components/organisms/contact-form';

export function ContactPage() {
  return <ContactForm />;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/pages/tests/unit/contact-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit — the project owner commits manually.

---

## Task 6: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Run the full verification suite**

```bash
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
```

Expected: lint clean, typecheck clean, all tests passing, production build succeeds. If `pnpm test:coverage`'s global 90% threshold fails on pre-existing files unrelated to this work (e.g. untested shadcn primitives added before this feature), that is a documented pre-existing shortfall — do not attempt to fix it here. This task's own new files (`mail.ts`, `contact-state.ts`, `contact.ts`, `contact-form.tsx`, `contact-page.tsx`) should show full coverage since every branch (validation errors, honeypot, SMTP-missing, send failure, send success) is exercised by Tasks 1, 3 and 5's tests.

- [ ] **Step 2: Manual smoke check with real (or fake) SMTP credentials**

Set the SMTP env vars in `.env.local` (copy `.env.example`, fill `SMTP_USER`/`SMTP_PASSWORD` with a Gmail app password, `SMTP_FROM`/`CONTACT_TO_EMAIL` with a real address), then:

```bash
pnpm build && pnpm start
```

Open `/contact`, `/en/contact`, `/es/contacto`:

- Submit with empty fields — confirm all 3 field errors appear in the current locale.
- Submit with a valid name/email/message — confirm the button shows the pending label, then the success message, and that an email actually arrives at `CONTACT_TO_EMAIL` with the visitor's email as reply-to.
- Confirm the GitHub/LinkedIn/WhatsApp/email links below the form open the correct destinations.
- Temporarily unset `SMTP_HOST` and resubmit — confirm the generic error message appears instead of a crash or an unhandled exception in the server console.

Do not commit — the project owner commits manually.

## Self-Review Notes

- **Spec coverage:** mail transport + validation + honeypot + Server Action (Task 1), WhatsApp link/icon/nav label + new shadcn atoms (Task 2), form UI + pt-br content (Task 3), EN/ES translations + parity guard (Task 4), page wiring (Task 5), verification incl. a real send (Task 6) — every spec section maps to a task.
- **`'use server'` export constraint respected:** `contact.ts` exports only the async `sendContactMessage` function; `ContactFormState`/`initialContactFormState` live in the separate `contact-state.ts`, imported by both `contact.ts` and `contact-form.tsx`.
- **Type consistency:** `ContactFormState.fieldErrors` keys (`name`/`email`/`message`) and error codes (`nameRequired`/`emailInvalid`/`messageRequired`) defined in Task 1's `contact-state.ts` are the exact same strings used in Task 3's `contact-form.tsx` (`t(\`form.errors.${state.fieldErrors.name}\`)`) and Task 3/4's `messages/_.json` (`form.errors._`) and Task 4's parity test (`ERROR_KEYS`) — no drift between the 4 places these names appear.
- **Honeypot guardrail carried through:** stated in Global Constraints, implemented in Task 1's `sendContactMessage`, asserted in Task 1's test, and the field itself (hidden, `tabIndex={-1}`) is built in Task 3 — not just described once and forgotten.
