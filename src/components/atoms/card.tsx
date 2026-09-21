import * as React from 'react';
import { cn } from 'cn';

function Card({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        'group/card gap-(--card-spacing) bg-card py-(--card-spacing) text-card-foreground ring-foreground/10 has-data-[slot=card-footer]:pb-0 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl flex flex-col overflow-hidden rounded-xl text-sm ring-1 [--card-spacing:--spacing(4)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)]',
        className,
      )}
      {...props}
    />
  );
}

export { Card };
