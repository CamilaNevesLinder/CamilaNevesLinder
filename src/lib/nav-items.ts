import { Code, Folder, House, MessageCircle, User } from 'lucide-react';
import { HrefValue } from '@/lib/navigation';

export type NavLabelKey =
  'home' | 'about' | 'projects' | 'technologies' | 'contact';

export const NAV_ITEMS: {
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
