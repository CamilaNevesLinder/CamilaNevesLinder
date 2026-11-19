import type { CSSProperties } from 'react';
import type { Technology } from '@/lib/tech-groups';
import { cn } from '@/lib/utils';

type MaskStyle = CSSProperties & Record<'--logo-url', string>;

export function TechLogo({
  technology,
  className,
}: {
  technology: Technology;
  className?: string;
}) {
  if ('monogram' in technology) {
    return (
      <span
        aria-hidden="true"
        className="font-display text-base italic leading-none"
      >
        {technology.monogram}
      </span>
    );
  }

  const style: MaskStyle = {
    '--logo-url': `url(/tech-icons/${technology.logo}.svg)`,
  };

  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        'block size-5 bg-current [mask-image:var(--logo-url)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]',
        className,
      )}
    />
  );
}
