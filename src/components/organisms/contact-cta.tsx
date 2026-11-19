'use client';

import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/atoms/section-heading';
import { Link } from '@/lib/navigation';

export function ContactCta() {
  const t = useTranslations('home.contactCta');

  return (
    <section className="mx-auto max-w-[1160px] px-4 pb-[72px] sm:px-6">
      <div className="border-line bg-band relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-[32px] border p-[clamp(36px,5vw,64px)]">
        <span
          aria-hidden="true"
          className="border-dusty absolute -bottom-20 -right-[60px] size-[260px] rounded-full border-[1.5px] border-dashed"
        />
        <div className="relative flex-[1_1_360px] [&_h2]:text-[clamp(34px,4.4vw,56px)] [&_h2]:leading-[1.05]">
          <SectionHeading>
            {t.rich('heading', { em: (chunks) => <em>{chunks}</em> })}
          </SectionHeading>
          <p className="text-mocha mt-3.5">{t('description')}</p>
        </div>
        <Link
          href="/contact"
          className="bg-espresso text-cream relative inline-flex min-h-[52px] items-center gap-2.5 rounded-full px-[26px] font-medium"
        >
          <Send size={18} strokeWidth={1.6} aria-hidden="true" />
          {t('button')}
        </Link>
      </div>
    </section>
  );
}
