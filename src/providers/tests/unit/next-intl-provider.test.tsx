import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import { describe, expect, it } from 'vitest';
import NextIntlProvider from '@/providers/next-intl-provider';
import ptBr from '../../../../messages/pt-br.json';

function TranslatedChild() {
  const t = useTranslations('meta.home');
  return <span>{t('title')}</span>;
}

describe('NextIntlProvider', () => {
  it('renders a child that uses useTranslations with a known string', () => {
    render(
      <NextIntlProvider locale="pt-br" messages={ptBr}>
        <TranslatedChild />
      </NextIntlProvider>,
    );

    expect(
      screen.getByText('Camila Neves Linder — Full Stack Developer'),
    ).toBeInTheDocument();
  });
});
