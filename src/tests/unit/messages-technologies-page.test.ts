import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const CATEGORY_KEYS = [
  'languages',
  'frontendMobile',
  'backend',
  'toolsCloud',
  'testing',
  'architecture',
] as const;

const TRANSLATED_CATEGORIES = ['architecture'] as const;

const EXCLUDED_TECHNOLOGIES = [
  'MongoDB',
  'Kotlin',
  'Python',
  'Shell',
  'Nginx',
  'Make',
  'Angular',
  'Ionic',
  'Cordova',
  'PHP',
  'Java',
  'Objective-C',
  'Gherkin',
  'SCSS',
  'Mustache',
] as const;

describe('technologiesPage message parity', () => {
  it('has the same category keys in the same order across all locales', () => {
    expect(Object.keys(ptBr.technologiesPage.categories)).toEqual(
      CATEGORY_KEYS,
    );
    expect(Object.keys(en.technologiesPage.categories)).toEqual(CATEGORY_KEYS);
    expect(Object.keys(es.technologiesPage.categories)).toEqual(CATEGORY_KEYS);
  });

  it('has matching items array lengths per category across all locales', () => {
    for (const key of CATEGORY_KEYS) {
      const ptItems = ptBr.technologiesPage.categories[key].items;
      const enItems = en.technologiesPage.categories[key].items;
      const esItems = es.technologiesPage.categories[key].items;

      expect(enItems).toHaveLength(ptItems.length);
      expect(esItems).toHaveLength(ptItems.length);
    }
  });

  it('keeps technology names byte-identical across locales (proper nouns are not translated)', () => {
    const untranslatedKeys = CATEGORY_KEYS.filter(
      (key) => !(TRANSLATED_CATEGORIES as readonly string[]).includes(key),
    );

    for (const key of untranslatedKeys) {
      expect(en.technologiesPage.categories[key].items).toEqual(
        ptBr.technologiesPage.categories[key].items,
      );
      expect(es.technologiesPage.categories[key].items).toEqual(
        ptBr.technologiesPage.categories[key].items,
      );
    }
  });

  it('never lists an excluded technology in any locale', () => {
    const locales = { 'pt-br': ptBr, en, es };

    for (const [localeName, messages] of Object.entries(locales)) {
      const allItems = Object.values(
        messages.technologiesPage.categories,
      ).flatMap((category) => category.items);

      for (const excluded of EXCLUDED_TECHNOLOGIES) {
        expect(
          allItems,
          `${localeName} technologiesPage should not include "${excluded}"`,
        ).not.toContain(excluded);
      }
    }
  });
});
