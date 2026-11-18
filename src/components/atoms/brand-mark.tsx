import { cn } from '@/lib/utils';

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'bg-espresso text-cream font-display grid size-10 shrink-0 place-items-center rounded-full text-xl italic',
        className,
      )}
    >
      c
    </span>
  );
}
