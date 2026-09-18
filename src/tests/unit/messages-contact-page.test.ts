import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const TOP_KEYS = ['label', 'heading', 'intro', 'form', 'directContact'];
const FORM_KEYS = [
  'nameLabel',
  'namePlaceholder',
  'emailLabel',
  'emailPlaceholder',
  'messageLabel',
  'messagePlaceholder',
  'submit',
  'submitPending',
  'successMessage',
  'errorMessage',
  'errors',
];
const ERROR_KEYS = ['nameRequired', 'emailInvalid', 'messageRequired'];

describe('contactPage message parity', () => {
  it('has the same top-level keys across all locales', () => {
    expect(Object.keys(ptBr.contactPage)).toEqual(TOP_KEYS);
    expect(Object.keys(en.contactPage)).toEqual(TOP_KEYS);
    expect(Object.keys(es.contactPage)).toEqual(TOP_KEYS);
  });

  it('has the same form field keys across all locales', () => {
    expect(Object.keys(ptBr.contactPage.form)).toEqual(FORM_KEYS);
    expect(Object.keys(en.contactPage.form)).toEqual(FORM_KEYS);
    expect(Object.keys(es.contactPage.form)).toEqual(FORM_KEYS);
  });

  it('has error codes matching the server action field-error codes, in every locale', () => {
    expect(Object.keys(ptBr.contactPage.form.errors)).toEqual(ERROR_KEYS);
    expect(Object.keys(en.contactPage.form.errors)).toEqual(ERROR_KEYS);
    expect(Object.keys(es.contactPage.form.errors)).toEqual(ERROR_KEYS);
  });

  it('has a non-empty directContact.heading in every locale', () => {
    expect(ptBr.contactPage.directContact.heading).toBeTruthy();
    expect(en.contactPage.directContact.heading).toBeTruthy();
    expect(es.contactPage.directContact.heading).toBeTruthy();
  });
});
