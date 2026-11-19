'use client';

import { Check, Mail, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useState } from 'react';
import { LetterField } from '@/components/molecules/letter-field';
import { sendContactMessage } from '@/lib/actions/contact';
import {
  initialContactFormState,
  type ContactFormState,
} from '@/lib/actions/contact-state';

export function ContactForm() {
  const t = useTranslations('contactPage');
  const [state, formAction, isPending] = useActionState<
    ContactFormState,
    FormData
  >(sendContactMessage, initialContactFormState);
  const [dismissedState, setDismissedState] = useState<ContactFormState | null>(
    null,
  );
  const isSent = state.status === 'success' && state !== dismissedState;
  const { fieldErrors, values } = state;
  const hasGenericError =
    state.status === 'error' && Object.keys(fieldErrors).length === 0;

  return (
    <div className="relative rounded-[20px] bg-[repeating-linear-gradient(135deg,var(--color-dusty)_0_14px,var(--color-paper)_14px_24px,var(--color-clay-deep)_24px_38px,var(--color-paper)_38px_48px)] p-2.5 shadow-[0_30px_60px_-36px_var(--shadow-color)]">
      <div className="bg-paper relative rounded-xl bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_39px,color-mix(in_srgb,var(--color-rose)_24%,transparent)_39px,color-mix(in_srgb,var(--color-rose)_24%,transparent)_40px)] p-[clamp(24px,4vw,44px)]">
        <div
          aria-hidden="true"
          className="border-dusty bg-cream absolute right-4 top-4 flex h-[100px] w-[84px] rotate-6 flex-col items-center justify-center gap-0.5 border-2 border-dotted p-1.5 text-center sm:right-[22px] sm:top-[22px]"
        >
          <Mail size={22} strokeWidth={1.4} className="text-clay-deep" />
          <span className="text-taupe font-mono text-[9px] uppercase leading-tight">
            {t('form.stamp')}
          </span>
        </div>

        {isSent ? (
          <div
            role="status"
            className="flex min-h-[380px] flex-col items-start justify-center gap-3.5"
          >
            <span className="bg-sand text-clay-deep grid size-14 place-items-center rounded-full">
              <Check size={24} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <p className="font-display text-espresso text-[32px]">
              {t('sent.title')}
            </p>
            <p className="text-mocha">{t('sent.description')}</p>
            <button
              type="button"
              onClick={() => setDismissedState(state)}
              className="border-line-strong text-espresso hover:bg-sand min-h-11 rounded-full border px-[18px] text-[15px] transition-colors duration-200"
            >
              {t('sent.writeAnother')}
            </button>
          </div>
        ) : (
          <form
            action={formAction}
            noValidate
            className="flex flex-col gap-[22px]"
          >
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="sr-only"
            />
            <p className="font-hand text-clay-deep mb-1.5 mr-[100px] text-[30px] leading-[1.1]">
              {t('form.greeting')}
            </p>
            <div className="flex flex-wrap gap-[22px]">
              <LetterField
                name="name"
                label={t('form.nameLabel')}
                placeholder={t('form.namePlaceholder')}
                autoComplete="name"
                defaultValue={values?.name}
                error={fieldErrors.name && t(`form.errors.${fieldErrors.name}`)}
              />
              <LetterField
                name="email"
                type="email"
                label={t('form.emailLabel')}
                placeholder={t('form.emailPlaceholder')}
                autoComplete="email"
                defaultValue={values?.email}
                error={
                  fieldErrors.email && t(`form.errors.${fieldErrors.email}`)
                }
              />
            </div>
            <LetterField
              name="message"
              isMultiline
              label={t('form.messageLabel')}
              placeholder={t('form.messagePlaceholder')}
              defaultValue={values?.message}
              error={
                fieldErrors.message && t(`form.errors.${fieldErrors.message}`)
              }
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-hand text-mocha text-[22px]">
                {t('form.whatsappNote')}
              </span>
              <button
                type="submit"
                disabled={isPending}
                className="bg-espresso text-cream inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-[26px] font-medium disabled:opacity-60"
              >
                {isPending ? t('form.submitPending') : t('form.submit')}
                <Send size={18} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>
            <p aria-live="polite" className="text-destructive text-[15px]">
              {hasGenericError && t('form.errorMessage')}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
