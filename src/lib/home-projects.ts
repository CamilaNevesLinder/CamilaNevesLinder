export type HomeProjectKey =
  'learningApp' | 'wellnessApp' | 'gymPlatform' | 'musicSite';

export const HOME_PROJECTS: {
  key: HomeProjectKey;
  mock: 'phone' | 'browser';
  colorToken: string;
  stack: string[];
}[] = [
  {
    key: 'learningApp',
    mock: 'phone',
    colorToken: '--color-rose',
    stack: ['React Native', 'Expo', 'NestJS'],
  },
  {
    key: 'wellnessApp',
    mock: 'phone',
    colorToken: '--color-lilac',
    stack: ['React Native', 'Firebase', 'i18next'],
  },
  {
    key: 'gymPlatform',
    mock: 'browser',
    colorToken: '--color-olive',
    stack: ['NestJS', 'Next.js', 'CI'],
  },
  {
    key: 'musicSite',
    mock: 'browser',
    colorToken: '--color-ochre',
    stack: ['React', 'Vite', 'Tailwind'],
  },
];

export const TOTAL_PROJECT_COUNT = 7;
