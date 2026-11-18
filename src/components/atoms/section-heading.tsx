import type { ReactNode } from 'react';

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-espresso [&_em]:text-clay text-[clamp(30px,3.6vw,46px)] font-normal leading-[1.12]">
      {children}
    </h2>
  );
}
