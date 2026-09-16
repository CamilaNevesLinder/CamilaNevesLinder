import { setRequestLocale } from 'next-intl/server';
import { AboutPage } from '@/components/pages/about-page';
import { getChessStats } from '@/lib/chess';

export default async function AboutRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const chessStats = await getChessStats();

  return <AboutPage chessStats={chessStats} />;
}
