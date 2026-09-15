import { setRequestLocale } from 'next-intl/server';
import { About } from '@/components/about';
import { getChessStats } from '@/lib/chess';

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const chessStats = await getChessStats();

  return <About chessStats={chessStats} />;
}
