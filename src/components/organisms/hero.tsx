'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Card } from '@/components/atoms/card';
import { Separator } from '@/components/atoms/separator';
import { cn } from '@/lib/utils';

const TAGS = [
  'TypeScript',
  'JavaScript',
  'React',
  'React Native',
  'NestJS',
  'Next.js',
];

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="bg-cream flex min-h-[70vh] items-center justify-center px-6 py-16">
      <Card className="border-rose/40 bg-cream/[0.18] w-full max-w-[960px] rounded-[30px] border p-6 shadow-none ring-0 backdrop-blur-md sm:p-[60px]">
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
              Florianópolis, SC
            </p>
            <h1 className="font-display text-espresso text-[40px] font-bold leading-[0.95] tracking-tight sm:text-[68px]">
              Camila Neves Linder
            </h1>
            <p className="text-rose text-[40px] font-bold italic leading-[0.95] tracking-tight sm:text-[68px]">
              {t('tagline')}
            </p>
          </div>

          <div className="border-rose size-[120px] shrink-0 overflow-hidden rounded-[18px] border shadow-[0_6px_16px_color-mix(in_srgb,var(--color-espresso)_12%,transparent)] sm:size-[180px]">
            <Image
              src="/camila.png"
              alt="Camila Neves Linder"
              width={180}
              height={180}
              priority
              className="size-full object-cover object-[center_20%]"
            />
          </div>
        </div>

        <Separator className="bg-rose/40 my-9" />

        <p className="text-taupe text-[23px] leading-relaxed">
          {t('description')}
        </p>

        <div className="mt-[26px] flex flex-wrap gap-2.5">
          {TAGS.map((tag) => (
            <Badge
              key={tag}
              className="bg-rose/[0.32] text-espresso h-auto rounded-[3px] px-4 py-2 font-mono text-[15px] uppercase tracking-wide"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-[26px] flex flex-wrap items-center gap-[30px]">
          <a
            href="#work"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-espresso h-auto p-0 font-mono text-[17px] underline-offset-[5px]',
            )}
          >
            {t('workCta')}
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: 'link' }),
              'text-espresso h-auto p-0 font-mono text-[17px] underline-offset-[5px]',
            )}
          >
            {t('contactCta')}
          </a>
        </div>
      </Card>
    </section>
  );
}
