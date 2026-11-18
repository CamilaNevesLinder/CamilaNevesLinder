import { Code, Folder, House, MessageCircle, User } from 'lucide-react';
import { HrefValue } from '@/lib/navigation';

export type NavLabelKey =
  'home' | 'about' | 'projects' | 'technologies' | 'contact';

export type NavCompactLabelKey = NavLabelKey | 'technologiesCompact';

export const NAV_ITEMS: {
  href: HrefValue;
  labelKey: NavLabelKey;
  compactLabelKey: NavCompactLabelKey;
  Icon: typeof House;
}[] = [
  { href: '/', labelKey: 'home', compactLabelKey: 'home', Icon: House },
  {
    href: '/projects',
    labelKey: 'projects',
    compactLabelKey: 'projects',
    Icon: Folder,
  },
  { href: '/about', labelKey: 'about', compactLabelKey: 'about', Icon: User },
  {
    href: '/technologies',
    labelKey: 'technologies',
    compactLabelKey: 'technologiesCompact',
    Icon: Code,
  },
  {
    href: '/contact',
    labelKey: 'contact',
    compactLabelKey: 'contact',
    Icon: MessageCircle,
  },
];
