import type { ShowcaseProjectKey } from '@/lib/showcase-projects';

export type HomeProjectKey =
  'learningApp' | 'wellnessApp' | 'gymPlatform' | 'musicSite';

export const HOME_PROJECTS: {
  key: HomeProjectKey;
  showcaseKey: ShowcaseProjectKey;
  mock: 'phone' | 'browser';
  colorToken: string;
  stack: string[];
}[] = [
  {
    key: 'learningApp',
    showcaseKey: 'oniapp',
    mock: 'phone',
    colorToken: '--color-rose',
    stack: ['React Native', 'Expo', 'NestJS'],
  },
  {
    key: 'wellnessApp',
    showcaseKey: 'seja',
    mock: 'phone',
    colorToken: '--color-lilac',
    stack: ['React Native', 'Firebase', 'i18next'],
  },
  {
    key: 'gymPlatform',
    showcaseKey: 'ritmar',
    mock: 'browser',
    colorToken: '--color-olive',
    stack: ['NestJS', 'Next.js', 'CI'],
  },
  {
    key: 'musicSite',
    showcaseKey: 'praca22',
    mock: 'browser',
    colorToken: '--color-ochre',
    stack: ['React', 'Vite', 'Tailwind'],
  },
];

export const TOTAL_PROJECT_COUNT = 7;
