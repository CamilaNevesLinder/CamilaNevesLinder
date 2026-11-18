'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function readStoredTheme(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) return stored === 'dark';
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(readStoredTheme);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  function toggleTheme() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextIsDark ? 'dark' : 'light');
    } catch {}
  }

  return { isDark, toggleTheme };
}
