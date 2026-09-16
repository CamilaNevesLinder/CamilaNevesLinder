import { setRequestLocale } from 'next-intl/server';
import { AboutPage } from '@/components/pages/about-page';

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPage />;
}
