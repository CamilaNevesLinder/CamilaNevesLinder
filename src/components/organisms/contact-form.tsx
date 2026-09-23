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
import { cn } from '@/lib/utils';

const DIRECT_LINK_CLASSNAME = cn(
  buttonVariants({ variant: 'ghost', size: 'icon-lg' }),
  'border-rose/30',
);

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
  }, [state]);

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[720px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
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
                <p
                  id="contact-name-error"
                  role="alert"
                  className="text-destructive text-sm"
                >
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
                  role="alert"
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
                  role="alert"
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
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.github')}
            className={DIRECT_LINK_CLASSNAME}
          >
            <GithubIcon size={24} className="size-6" aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.linkedin')}
            className={DIRECT_LINK_CLASSNAME}
          >
            <LinkedinIcon size={24} className="size-6" aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.whatsapp')}
            className={DIRECT_LINK_CLASSNAME}
          >
            <WhatsappIcon size={24} className="size-6" aria-hidden="true" />
          </a>
          <a href={SOCIAL_LINKS.email} className={DIRECT_LINK_CLASSNAME}>
            <Mail size={24} className="size-6" aria-hidden="true" />
            <span className="sr-only">{tNav('social.email')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
