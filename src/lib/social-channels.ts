import { Mail } from 'lucide-react';
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  WhatsappIcon,
} from '@/components/atoms/icons/social-icons';
import { SOCIAL_LINKS } from '@/lib/site';

export type SocialChannelKey =
  'email' | 'linkedin' | 'whatsapp' | 'github' | 'instagram';

export const SOCIAL_CHANNELS: {
  key: SocialChannelKey;
  href: string;
  handle: string;
  isExternal: boolean;
  Icon: typeof GithubIcon | typeof Mail;
}[] = [
  {
    key: 'email',
    href: SOCIAL_LINKS.email,
    handle: 'camilaneveslindner@gmail.com',
    isExternal: false,
    Icon: Mail,
  },
  {
    key: 'linkedin',
    href: SOCIAL_LINKS.linkedin,
    handle: 'in/camila-neves-linder',
    isExternal: true,
    Icon: LinkedinIcon,
  },
  {
    key: 'whatsapp',
    href: SOCIAL_LINKS.whatsapp,
    handle: '(48) 99855-8324',
    isExternal: true,
    Icon: WhatsappIcon,
  },
  {
    key: 'github',
    href: SOCIAL_LINKS.github,
    handle: 'CamilaNevesLinder',
    isExternal: true,
    Icon: GithubIcon,
  },
  {
    key: 'instagram',
    href: SOCIAL_LINKS.instagram,
    handle: '@camila.nevees',
    isExternal: true,
    Icon: InstagramIcon,
  },
];
