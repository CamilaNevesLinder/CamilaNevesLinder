import {
  Cloud,
  Database,
  FlaskConical,
  Monitor,
  Server,
  Smartphone,
} from 'lucide-react';

export type TechGroupKey =
  'frontEnd' | 'mobile' | 'backEnd' | 'stateData' | 'toolsCloud' | 'testing';

export type Technology =
  | { name: string; logo: string }
  | {
      name: string;
      monogram: string;
    };

export const LANGUAGE_TECHNOLOGIES: Technology[] = [
  { name: 'TypeScript', logo: 'typescript' },
  { name: 'JavaScript', logo: 'javascript' },
];

export const TECH_GROUPS: {
  key: TechGroupKey;
  Icon: typeof Monitor;
  technologies: Technology[];
}[] = [
  {
    key: 'frontEnd',
    Icon: Monitor,
    technologies: [
      { name: 'React', logo: 'react' },
      { name: 'Next.js', logo: 'nextdotjs' },
      { name: 'Tailwind CSS', logo: 'tailwindcss' },
      { name: 'shadcn/ui', logo: 'shadcnui' },
      { name: 'Radix UI', logo: 'radixui' },
      { name: 'Framer Motion', logo: 'framer' },
    ],
  },
  {
    key: 'mobile',
    Icon: Smartphone,
    technologies: [
      { name: 'React Native', logo: 'react' },
      { name: 'Expo', logo: 'expo' },
      { name: 'Expo Router', logo: 'expo' },
      { name: 'NativeWind', monogram: 'Nw' },
      { name: 'i18next', logo: 'i18next' },
    ],
  },
  {
    key: 'backEnd',
    Icon: Server,
    technologies: [
      { name: 'Node.js', logo: 'nodedotjs' },
      { name: 'NestJS', logo: 'nestjs' },
      { name: 'TypeORM', logo: 'typeorm' },
      { name: 'MySQL', logo: 'mysql' },
    ],
  },
  {
    key: 'stateData',
    Icon: Database,
    technologies: [
      { name: 'TanStack Query', logo: 'reactquery' },
      { name: 'Zustand', monogram: 'Zu' },
      { name: 'Axios', logo: 'axios' },
      { name: 'React Hook Form', logo: 'reacthookform' },
      { name: 'Zod', logo: 'zod' },
    ],
  },
  {
    key: 'toolsCloud',
    Icon: Cloud,
    technologies: [
      { name: 'Git', logo: 'git' },
      { name: 'GitHub Actions', logo: 'githubactions' },
      { name: 'Docker', logo: 'docker' },
      { name: 'AWS', logo: 'amazonwebservices' },
      { name: 'Firebase', logo: 'firebase' },
      { name: 'Figma', logo: 'figma' },
    ],
  },
  {
    key: 'testing',
    Icon: FlaskConical,
    technologies: [
      { name: 'Jest', logo: 'jest' },
      { name: 'Vitest', logo: 'vitest' },
      { name: 'Testing Library', logo: 'testinglibrary' },
    ],
  },
];

export const TOTAL_TECHNOLOGY_COUNT =
  LANGUAGE_TECHNOLOGIES.length +
  TECH_GROUPS.reduce((total, group) => total + group.technologies.length, 0);
