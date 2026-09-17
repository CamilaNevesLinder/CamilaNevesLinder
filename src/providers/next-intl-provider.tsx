'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

const TIME_ZONE = 'America/Sao_Paulo';

type Messages = { [key: string]: Messages | string | string[] };

const NextIntlProvider = ({
  children,
  messages,
  locale,
}: {
  children: ReactNode;
  messages: Messages;
  locale: string;
}) => {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages as AbstractIntlMessages}
      timeZone={TIME_ZONE}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default NextIntlProvider;
