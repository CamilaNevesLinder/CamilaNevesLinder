'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import {
  Code,
  Folder,
  House,
  Mail,
  Menu,
  MessageCircle,
  Settings,
  User,
  X,
} from 'lucide-react';
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/icons/social-icons';
import {
  HrefValue,
  Link,
  Locale,
  locales,
  usePathname,
} from '@/lib/navigation';
import { SOCIAL_LINKS } from '@/lib/site';

type NavLabelKey = 'home' | 'about' | 'projects' | 'technologies' | 'contact';

const NAV_ITEMS: {
  href: HrefValue;
  labelKey: NavLabelKey;
  Icon: typeof House;
}[] = [
  { href: '/', labelKey: 'home', Icon: House },
  { href: '/sobre', labelKey: 'about', Icon: User },
  { href: '/projetos', labelKey: 'projects', Icon: Folder },
  { href: '/tecnologias', labelKey: 'technologies', Icon: Code },
  { href: '/contato', labelKey: 'contact', Icon: MessageCircle },
];

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  'pt-br': 'PT-BR',
  es: 'ES',
};

const SOCIAL_LINK_CLASSNAME =
  'flex size-11 items-center justify-center rounded-md text-taupe hover:text-espresso';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function readStoredTheme(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
  } catch {}
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export function Sidebar() {
  const t = useTranslations('nav');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDark, setIsDark] = useState(readStoredTheme);
  const settingsRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => setIsOpen(false);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    if (!isSettingsOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!settingsRef.current?.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSettingsOpen]);

  function toggleDarkMode() {
    setIsDark((current) => {
      const next = !current;
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
      } catch {}
      return next;
    });
  }

  const profileLink = (
    <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
      <Image
        src="/camila.png"
        alt="Camila Neves Linder"
        width={40}
        height={40}
        className="size-10 shrink-0 rounded-full object-cover object-[center_20%]"
      />
      <span className="text-espresso font-mono text-sm uppercase tracking-wide">
        {t('shortName')}
      </span>
    </Link>
  );

  const footer = (
    <div className="border-rose/40 flex items-center gap-1 border-t pt-2">
      <a
        href={SOCIAL_LINKS.email}
        aria-label={t('social.email')}
        className={SOCIAL_LINK_CLASSNAME}
      >
        <Mail size={18} aria-hidden="true" />
      </a>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.github')}
        className={SOCIAL_LINK_CLASSNAME}
      >
        <GithubIcon size={18} aria-hidden="true" />
      </a>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.linkedin')}
        className={SOCIAL_LINK_CLASSNAME}
      >
        <LinkedinIcon size={18} aria-hidden="true" />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.instagram')}
        className={SOCIAL_LINK_CLASSNAME}
      >
        <InstagramIcon size={18} aria-hidden="true" />
      </a>

      <div className="relative ml-auto" ref={settingsRef}>
        <button
          type="button"
          onClick={() => setIsSettingsOpen((open) => !open)}
          aria-label={t('settings.label')}
          aria-expanded={isSettingsOpen}
          className={SOCIAL_LINK_CLASSNAME}
        >
          <Settings size={18} aria-hidden="true" />
        </button>

        {isSettingsOpen && (
          <div className="border-rose/40 bg-cream absolute bottom-full right-0 mb-2 w-48 rounded-lg border p-3 shadow-lg">
            <p className="text-taupe mb-2 font-mono text-xs uppercase tracking-wide">
              {t('settings.language')}
            </p>
            <div className="mb-3 flex gap-1">
              {locales.map((locale) => (
                <Link
                  key={locale}
                  href={pathname}
                  locale={locale}
                  onClick={() => setIsSettingsOpen(false)}
                  className={`flex-1 rounded-md py-1.5 text-center font-mono text-xs uppercase tracking-wide ${
                    locale === currentLocale
                      ? 'bg-rose/20 text-espresso'
                      : 'text-taupe hover:text-espresso'
                  }`}
                >
                  {LOCALE_LABELS[locale]}
                </Link>
              ))}
            </div>

            <div className="border-rose/40 flex items-center justify-between border-t pt-3">
              <span className="text-taupe font-mono text-xs uppercase tracking-wide">
                {t('settings.darkMode')}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={isDark}
                aria-label={t('settings.darkMode')}
                onClick={toggleDarkMode}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  isDark ? 'bg-rose' : 'bg-taupe/40'
                }`}
              >
                <span
                  className={`bg-espresso absolute left-0.5 top-0.5 size-5 rounded-full transition-transform ${
                    isDark ? 'translate-x-[22px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function renderNavLinks(onNavigate?: () => void) {
    return (
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, labelKey, Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 font-mono text-sm uppercase tracking-wide transition-colors ${
                isActive
                  ? 'bg-rose/20 text-espresso'
                  : 'text-taupe hover:text-espresso'
              }`}
            >
              <Icon size={18} aria-hidden="true" />
              {t(labelKey)}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <>
      <aside className="border-rose/40 bg-cream fixed inset-y-0 left-0 hidden w-60 flex-col justify-between border-r p-6 md:flex">
        <div className="flex flex-col gap-8">
          {profileLink}
          {renderNavLinks()}
        </div>
        {footer}
      </aside>

      <header className="border-rose/40 bg-cream fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b px-4 md:hidden">
        {profileLink}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label={t('menuOpen')}
          className="text-espresso flex size-11 items-center justify-center"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </header>

      {isOpen && (
        <div className="bg-cream fixed inset-0 z-50 flex flex-col gap-8 p-6 md:hidden">
          <div className="flex items-center justify-between">
            {profileLink}
            <button
              type="button"
              onClick={closeMenu}
              aria-label={t('menuClose')}
              className="text-espresso flex size-11 items-center justify-center"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
          {renderNavLinks(closeMenu)}
          {footer}
        </div>
      )}
    </>
  );
}
