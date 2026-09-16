import { About } from '@/components/organisms/about';
import type { ChessStats } from '@/lib/chess';

export function AboutPage({ chessStats }: { chessStats: ChessStats | null }) {
  return <About chessStats={chessStats} />;
}
