import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const FOOTER_KEYS = ['rights', 'name', 'role'];

describe('footer message parity', () => {
  it('has the same keys across all locales', () => {
    expect(Object.keys(ptBr.footer)).toEqual(FOOTER_KEYS);
    expect(Object.keys(en.footer)).toEqual(FOOTER_KEYS);
    expect(Object.keys(es.footer)).toEqual(FOOTER_KEYS);
  });

  it('includes a {year} placeholder in the rights string for every locale', () => {
    expect(ptBr.footer.rights).toContain('{year}');
    expect(en.footer.rights).toContain('{year}');
    expect(es.footer.rights).toContain('{year}');
  });
});
