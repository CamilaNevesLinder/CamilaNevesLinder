import type { ReactNode } from 'react';

export function Chip({ children }: { children: ReactNode }) {
  return (
    <li className="border-line-strong text-mocha inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[13px]">
      {children}
    </li>
  );
}
