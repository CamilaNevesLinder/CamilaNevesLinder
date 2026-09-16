import { setRequestLocale } from 'next-intl/server';
import { TechnologiesPage } from '@/components/pages/technologies-page';

export default async function TechnologiesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TechnologiesPage />;
}
