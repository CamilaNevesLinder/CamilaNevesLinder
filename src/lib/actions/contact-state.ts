export type ContactFieldErrorCode =
  'nameRequired' | 'emailInvalid' | 'messageRequired';

export type ContactFormState = {
  status: 'idle' | 'success' | 'error';
  fieldErrors: Partial<
    Record<'name' | 'email' | 'message', ContactFieldErrorCode>
  >;
};

export const initialContactFormState: ContactFormState = {
  status: 'idle',
  fieldErrors: {},
};
