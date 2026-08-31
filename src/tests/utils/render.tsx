import { render, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement, ReactNode } from 'react';
import ptBr from '../../../messages/pt-br.json';

type WrapperProps = {
  children: ReactNode;
  locale?: string;
  messages?: typeof ptBr;
};

function Providers({
  children,
  locale = 'pt-br',
  messages = ptBr,
}: WrapperProps) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone="America/Sao_Paulo"
    >
      {children}
    </NextIntlClientProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    locale?: string;
    messages?: typeof ptBr;
  },
) {
  const { locale, messages, ...rest } = options ?? {};
  return render(ui, {
    wrapper: ({ children }) => (
      <Providers locale={locale} messages={messages}>
        {children}
      </Providers>
    ),
    ...rest,
  });
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
