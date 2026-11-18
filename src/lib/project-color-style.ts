import type { CSSProperties } from 'react';

type CustomPropertyStyle = CSSProperties & Record<`--${string}`, string>;

export function projectColorStyle(colorToken: string): CustomPropertyStyle {
  return { '--project-color': `var(${colorToken})` };
}
