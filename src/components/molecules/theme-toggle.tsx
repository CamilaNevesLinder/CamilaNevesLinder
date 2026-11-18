'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/lib/use-theme';

export function ThemeToggle() {
  const t = useTranslations('nav.theme');
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('enableLight') : t('enableDark')}
      className="border-line text-body hover:bg-sand grid size-11 place-items-center rounded-full border transition-colors duration-200"
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <Moon size={18} strokeWidth={1.6} aria-hidden="true" />
      )}
    </button>
  );
}
