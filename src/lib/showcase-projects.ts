export type ShowcaseProjectKey =
  | 'oniapp'
  | 'oniappAdmin'
  | 'seja'
  | 'sejaAdmin'
  | 'praca22'
  | 'ritmar'
  | 'minceJoias';
export type ProjectGroup = 'mobile' | 'web' | 'api';
export type ProjectFilter = 'all' | ProjectGroup;

export const PROJECT_FILTERS: ProjectFilter[] = ['all', 'mobile', 'web', 'api'];

export const SHOWCASE_PROJECTS: {
  key: ShowcaseProjectKey;
  initial: string;
  group: ProjectGroup;
  colorToken: string;
}[] = [
  { key: 'oniapp', initial: 'O', group: 'mobile', colorToken: '--color-rose' },
  {
    key: 'oniappAdmin',
    initial: 'O',
    group: 'web',
    colorToken: '--color-clay',
  },
  { key: 'seja', initial: 'S', group: 'mobile', colorToken: '--color-lilac' },
  { key: 'sejaAdmin', initial: 'S', group: 'web', colorToken: '--color-lilac' },
  { key: 'praca22', initial: 'P', group: 'web', colorToken: '--color-ochre' },
  { key: 'ritmar', initial: 'R', group: 'api', colorToken: '--color-olive' },
  { key: 'minceJoias', initial: 'M', group: 'web', colorToken: '--color-rose' },
];

export function countProjectsIn(filter: ProjectFilter) {
  return filter === 'all'
    ? SHOWCASE_PROJECTS.length
    : SHOWCASE_PROJECTS.filter(({ group }) => group === filter).length;
}
