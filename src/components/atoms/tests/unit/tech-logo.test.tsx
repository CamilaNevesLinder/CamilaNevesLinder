import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TechLogo } from '@/components/atoms/tech-logo';

describe('TechLogo', () => {
  it('masks the logo file so it follows the current text color', () => {
    const { container } = render(
      <TechLogo technology={{ name: 'React', logo: 'react' }} />,
    );

    expect(container.firstElementChild).toHaveStyle({
      '--logo-url': 'url(/tech-icons/react.svg)',
    });
    expect(container.firstElementChild).toHaveClass('bg-current');
  });

  it('falls back to a monogram when the technology has no logo', () => {
    const { container } = render(
      <TechLogo technology={{ name: 'Zustand', monogram: 'Zu' }} />,
    );

    expect(container).toHaveTextContent('Zu');
  });
});
