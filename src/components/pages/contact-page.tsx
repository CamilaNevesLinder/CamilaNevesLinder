'use client';

import { useTranslations } from 'next-intl';
import { ContactChannels } from '@/components/molecules/contact-channels';
import { ContactForm } from '@/components/organisms/contact-form';

export function ContactPage() {
  const t = useTranslations('contactPage');

  return (
    <section className="mx-auto flex max-w-[1160px] flex-wrap items-start gap-14 px-4 pb-24 pt-14 sm:px-6 md:pt-20">
      <div className="min-w-0 flex-[1_1_340px]">
        <p className="text-clay-deep mb-3 font-mono text-[13px] uppercase tracking-[0.08em]">
          {t('eyebrow')}
        </p>
        <h1 className="font-display text-espresso [&_em]:text-clay text-[clamp(40px,5.4vw,68px)] font-normal leading-[1.05] tracking-[-0.02em]">
          {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
        </h1>
        <p className="text-mocha mt-5 max-w-[420px]">{t('intro')}</p>
        <div className="mb-5 mt-10 flex items-center gap-4">
          <h2 className="text-taupe font-mono text-[13px] uppercase tracking-[0.08em]">
            {t('otherChannels')}
          </h2>
          <span
            aria-hidden="true"
            className="border-line-strong flex-1 border-t-[1.5px] border-dashed"
          />
        </div>
        <ContactChannels />
      </div>
      <div className="min-w-0 flex-[1.3_1_420px]">
        <ContactForm />
      </div>
    </section>
  );
}
