import { Asterisk } from 'lucide-react';

export function SectionDivider({
  number,
  label,
}: {
  number?: string;
  label?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className="text-clay-deep mx-auto flex max-w-[1160px] items-center gap-3 px-4 pb-10 font-mono text-[13px] uppercase tracking-[0.08em] sm:gap-4 sm:px-6 md:pb-14"
    >
      {number && <span>{number}</span>}
      <span className="border-line-strong flex-1 border-t-[1.5px] border-dashed" />
      <Asterisk size={18} strokeWidth={1.6} className="text-dusty" />
      <span className="border-line-strong flex-1 border-t-[1.5px] border-dashed" />
      {label && <span>{label}</span>}
    </div>
  );
}
