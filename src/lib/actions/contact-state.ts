export type ContactFieldErrorCode =
  'nameRequired' | 'emailInvalid' | 'messageRequired';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  fieldErrors: Partial<
    Record<'name' | 'email' | 'message', ContactFieldErrorCode>
  >;
  values?: Record<'name' | 'email' | 'message', string>;
};

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  fieldErrors: {},
};
