import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const PROJECT_KEYS = [
  'oniapp',
  'oniappAdmin',
  'seja',
  'sejaAdmin',
  'praca22',
  'ritmar',
  'minceJoias',
] as const;

describe('projectsPage message parity', () => {
  it('has the same project keys in the same order across all locales', () => {
    expect(Object.keys(ptBr.projectsPage.items)).toEqual(PROJECT_KEYS);
    expect(Object.keys(en.projectsPage.items)).toEqual(PROJECT_KEYS);
    expect(Object.keys(es.projectsPage.items)).toEqual(PROJECT_KEYS);
  });

  it('has matching features/stack array lengths per project across all locales', () => {
    for (const key of PROJECT_KEYS) {
      const ptItem = ptBr.projectsPage.items[key];
      const enItem = en.projectsPage.items[key];
      const esItem = es.projectsPage.items[key];

      expect(enItem.features).toHaveLength(ptItem.features.length);
      expect(esItem.features).toHaveLength(ptItem.features.length);
      expect(enItem.stack).toHaveLength(ptItem.stack.length);
      expect(esItem.stack).toHaveLength(ptItem.stack.length);
    }
  });
});
