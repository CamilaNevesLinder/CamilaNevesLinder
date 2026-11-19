import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';
import { TECH_GROUPS } from '@/lib/tech-groups';

const GROUP_KEYS = TECH_GROUPS.map(({ key }) => key);

describe('technologiesPage message parity', () => {
  it('has a title and note for every tech group in every locale', () => {
    for (const messages of [ptBr, en, es]) {
      expect(Object.keys(messages.technologiesPage.groups)).toEqual(GROUP_KEYS);
    }
  });

  it('has the same number of architecture practices in every locale', () => {
    expect(en.technologiesPage.architecture.items).toHaveLength(
      ptBr.technologiesPage.architecture.items.length,
    );
    expect(es.technologiesPage.architecture.items).toHaveLength(
      ptBr.technologiesPage.architecture.items.length,
    );
  });
});
