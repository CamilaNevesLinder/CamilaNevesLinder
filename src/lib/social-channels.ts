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
  isExternal: boolean;
  Icon: typeof GithubIcon | typeof Mail;
}[] = [
  { key: 'email', href: SOCIAL_LINKS.email, isExternal: false, Icon: Mail },
  {
    key: 'linkedin',
    href: SOCIAL_LINKS.linkedin,
    isExternal: true,
    Icon: LinkedinIcon,
  },
  {
    key: 'whatsapp',
    href: SOCIAL_LINKS.whatsapp,
    isExternal: true,
    Icon: WhatsappIcon,
  },
  {
    key: 'github',
    href: SOCIAL_LINKS.github,
    isExternal: true,
    Icon: GithubIcon,
  },
  {
    key: 'instagram',
    href: SOCIAL_LINKS.instagram,
    isExternal: true,
    Icon: InstagramIcon,
  },
];
