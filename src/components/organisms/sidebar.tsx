'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
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
} from 'lucide-react';
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/atoms/icons/social-icons';
import {
  HrefValue,
  Link,
  Locale,
  locales,
  usePathname,
} from '@/lib/navigation';
import { SOCIAL_LINKS } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/atoms/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/molecules/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/molecules/sheet';
import { X } from 'lucide-react';
import { Separator } from '@/components/atoms/separator';
import { Switch } from '@/components/atoms/switch';

type NavLabelKey = 'home' | 'about' | 'projects' | 'technologies' | 'contact';

const NAV_ITEMS: {
  href: HrefValue;
  labelKey: NavLabelKey;
  Icon: typeof House;
}[] = [
  { href: '/', labelKey: 'home', Icon: House },
  { href: '/about', labelKey: 'about', Icon: User },
  { href: '/projects', labelKey: 'projects', Icon: Folder },
  { href: '/technologies', labelKey: 'technologies', Icon: Code },
  { href: '/contact', labelKey: 'contact', Icon: MessageCircle },
];

const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  'pt-br': 'PT-BR',
  es: 'ES',
};

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

const NAV_LINK_CLASSNAME =
  'h-auto justify-start gap-3 px-3 py-3 font-mono text-sm uppercase tracking-wide';

export function Sidebar() {
  const t = useTranslations('nav');
  const currentLocale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDark, setIsDark] = useState(readStoredTheme);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  function toggleDarkMode(checked: boolean) {
    setIsDark(checked);
    try {
      localStorage.setItem('theme', checked ? 'dark' : 'light');
    } catch {}
  }

  const profileLink = (
    <Link
      href="/"
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3"
    >
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

  const settingsPopover = (
    <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            aria-label={t('settings.label')}
          />
        }
      >
        <Settings size={18} aria-hidden="true" />
      </PopoverTrigger>
      <PopoverContent align="end" side="top" className="w-48">
        <p className="text-taupe font-mono text-xs uppercase tracking-wide">
          {t('settings.language')}
        </p>
        <div className="flex gap-1">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={pathname}
              locale={locale}
              onClick={() => setIsSettingsOpen(false)}
              className={cn(
                buttonVariants({
                  variant: locale === currentLocale ? 'secondary' : 'ghost',
                  size: 'sm',
                }),
                'h-auto flex-1 font-mono text-xs uppercase',
              )}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-taupe font-mono text-xs uppercase tracking-wide">
            {t('settings.darkMode')}
          </span>
          <Switch
            checked={isDark}
            onCheckedChange={toggleDarkMode}
            aria-label={t('settings.darkMode')}
          />
        </div>
      </PopoverContent>
    </Popover>
  );

  const socialLinkClassName = buttonVariants({
    variant: 'ghost',
    size: 'icon',
  });

  const socialLinks = (
    <div className="border-border flex items-center gap-1 border-t pt-2">
      <a
        href={SOCIAL_LINKS.email}
        aria-label={t('social.email')}
        className={socialLinkClassName}
      >
        <Mail size={18} aria-hidden="true" />
      </a>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.github')}
        className={socialLinkClassName}
      >
        <GithubIcon size={18} aria-hidden="true" />
      </a>
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.linkedin')}
        className={socialLinkClassName}
      >
        <LinkedinIcon size={18} aria-hidden="true" />
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noreferrer"
        aria-label={t('social.instagram')}
        className={socialLinkClassName}
      >
        <InstagramIcon size={18} aria-hidden="true" />
      </a>
      {settingsPopover}
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
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                NAV_LINK_CLASSNAME,
                isActive ? 'bg-accent text-accent-foreground' : 'text-taupe',
              )}
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
      <aside className="border-border bg-background fixed inset-y-0 left-0 hidden w-60 flex-col justify-between border-r p-6 md:flex">
        <div className="flex flex-col gap-8">
          {profileLink}
          {renderNavLinks()}
        </div>
        {socialLinks}
      </aside>

      <header className="border-border bg-background fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b px-4 md:hidden">
        {profileLink}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" aria-label={t('menuOpen')} />
            }
          >
            <Menu size={22} aria-hidden="true" />
          </SheetTrigger>
          <SheetContent
            side="left"
            showCloseButton={false}
            className="bg-background flex w-full max-w-none flex-col gap-8 p-6"
          >
            <div className="flex items-center justify-between">
              {profileLink}
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t('menuClose')}
                  />
                }
              >
                <X size={22} aria-hidden="true" />
              </SheetClose>
            </div>
            {renderNavLinks(() => setIsOpen(false))}
            {socialLinks}
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
}
