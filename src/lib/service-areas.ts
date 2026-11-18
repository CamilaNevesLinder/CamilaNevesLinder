import { Monitor, Server, Smartphone } from 'lucide-react';

export type ServiceAreaKey = 'mobile' | 'frontEnd' | 'backEnd';

export const SERVICE_AREAS: {
  key: ServiceAreaKey;
  stack: string;
  Icon: typeof Smartphone;
}[] = [
  {
    key: 'mobile',
    stack: 'React Native · Expo · NativeWind',
    Icon: Smartphone,
  },
  { key: 'frontEnd', stack: 'Next.js · React · Tailwind', Icon: Monitor },
  { key: 'backEnd', stack: 'NestJS · TypeORM · MySQL', Icon: Server },
];
