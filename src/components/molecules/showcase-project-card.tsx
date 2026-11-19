'use client';

import { Check, Image as ImageIcon, Plus, User } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import type { ShowcaseProjectKey } from '@/lib/showcase-projects';
import { projectColorStyle } from '@/lib/project-color-style';
import { cn } from '@/lib/utils';

const DOT_PATTERN =
  'bg-[radial-gradient(color-mix(in_srgb,var(--color-espresso)_12%,transparent)_1px,transparent_1.2px)]';

export function ShowcaseProjectCard({
  projectKey,
  initial,
  colorToken,
  image,
  isOpen,
  onToggle,
}: {
  projectKey: ShowcaseProjectKey;
  initial: string;
  colorToken: string;
  image?: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const t = useTranslations('projectsPage');
  const articleRef = useRef<HTMLElement>(null);
  const detailsId = `project-${projectKey}-details`;
  const title = t(`items.${projectKey}.title`);
  const features = t.raw(`items.${projectKey}.features`) as string[];
  const stack = t.raw(`items.${projectKey}.stack`) as string[];

  useEffect(() => {
    const article = articleRef.current;
    if (isOpen && article && article.getBoundingClientRect().top < 0) {
      article.scrollIntoView({ block: 'nearest' });
    }
  }, [isOpen]);

  return (
    <article
      id={projectKey}
      ref={articleRef}
      style={projectColorStyle(colorToken)}
      className={cn(
        'bg-paper flex scroll-mt-6 flex-col overflow-hidden rounded-3xl border transition-colors duration-200',
        isOpen ? 'border-dusty col-span-full' : 'border-line',
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={detailsId}
        onClick={onToggle}
        className="duration-250 flex w-full flex-1 items-stretch text-left transition-[transform,box-shadow] ease-out hover:-translate-y-[3px] hover:shadow-[0_18px_40px_-24px_var(--shadow-color)] motion-reduce:hover:translate-y-0"
      >
        <span className="relative grid w-[88px] flex-none place-items-center overflow-hidden bg-[color-mix(in_srgb,var(--project-color)_22%,transparent)] sm:w-28">
          <span
            aria-hidden="true"
            className={cn('bg-size-[14px_14px] absolute inset-0', DOT_PATTERN)}
          />
          <span
            aria-hidden="true"
            className="font-display text-(--project-color) relative text-[52px] italic leading-none"
          >
            {initial}
          </span>
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-2 px-5 py-5 sm:px-6 sm:py-[22px]">
          <span className="flex items-center justify-between gap-3">
            <span className="text-taupe font-mono text-xs uppercase tracking-[0.08em]">
              {t(`items.${projectKey}.kind`)}
            </span>
            <span className="text-clay-deep inline-flex items-center gap-1.5 text-sm font-medium">
              {isOpen ? t('close') : t('learnMore')}
              <Plus
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
                className={cn(
                  'transition-transform duration-200 motion-reduce:transition-none',
                  isOpen && 'rotate-45',
                )}
              />
            </span>
          </span>
          <h3 className="font-display text-espresso text-[26px] font-semibold leading-[1.15]">
            {title}
          </h3>
          <span className="text-mocha">{t(`items.${projectKey}.line`)}</span>
        </span>
      </button>

      {isOpen && (
        <div
          id={detailsId}
          className="border-line-strong mx-5 flex flex-wrap gap-8 border-t border-dashed pb-8 pt-7 sm:mx-6"
        >
          {image ? (
            <div className="relative min-h-60 flex-[1_1_280px] overflow-hidden rounded-[18px] bg-white">
              <Image
                src={image}
                alt={t('screenshotAlt', { title })}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-contain p-6"
              />
            </div>
          ) : (
            <div className="relative grid min-h-60 flex-[1_1_280px] place-items-center overflow-hidden rounded-[18px] bg-[color-mix(in_srgb,var(--project-color)_22%,transparent)]">
              <span
                aria-hidden="true"
                className={cn(
                  'bg-size-[16px_16px] absolute inset-0',
                  DOT_PATTERN,
                )}
              />
              <span className="text-mocha relative flex flex-col items-center gap-2">
                <ImageIcon size={28} strokeWidth={1.4} aria-hidden="true" />
                <span className="font-hand text-[22px]">
                  {t('screenshot', { title })}
                </span>
              </span>
            </div>
          )}
          <div className="flex min-w-0 flex-[999_1_420px] flex-col gap-[18px]">
            <div className="bg-sand-light flex items-start gap-3 rounded-[14px] px-4 py-3.5">
              <User
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
                className="text-clay-deep mt-1 shrink-0"
              />
              <p>
                <span className="text-clay-deep block font-mono text-xs uppercase tracking-[0.08em]">
                  {t('myRole')}
                </span>
                {t(`items.${projectKey}.role`)}
              </p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <span className="bg-sand text-clay-deep mt-0.5 grid size-[22px] flex-none place-items-center rounded-full">
                    <Check size={13} strokeWidth={2} aria-hidden="true" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <ul className="flex flex-wrap gap-1.5">
              {stack.map((technology) => (
                <li
                  key={technology}
                  className="border-line-strong text-mocha rounded-full border px-3 py-1 text-[13px]"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
