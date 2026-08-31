'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

const TIME_ZONE = 'America/Sao_Paulo';

const NextIntlProvider = ({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={TIME_ZONE}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
