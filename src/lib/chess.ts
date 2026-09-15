const CHESS_USERNAME = 'camilinder';
const CHESS_API_BASE = 'https://api.chess.com/pub/player';
const STREAK_LOOKBACK_MONTHS = 3;
const REVALIDATE_SECONDS = 3600;

export const CHESS_PROFILE_URL = `https://www.chess.com/member/${CHESS_USERNAME}`;

export type ChessGameRecord = {
  rating: number;
  win: number;
  loss: number;
  draw: number;
};

export type ChessStats = {
  rapid: ChessGameRecord;
  blitz: ChessGameRecord;
  streakDays: number;
};

type ChessStatsResponse = {
  chess_rapid?: {
    last?: { rating: number };
    record: { win: number; loss: number; draw: number };
  };
  chess_blitz?: {
    last?: { rating: number };
    record: { win: number; loss: number; draw: number };
  };
};

type ChessArchivesResponse = { archives: string[] };
type ChessGamesResponse = { games: { end_time: number }[] };

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function toRecord(stat?: ChessStatsResponse['chess_rapid']): ChessGameRecord {
  return {
    rating: stat?.last?.rating ?? 0,
    win: stat?.record.win ?? 0,
    loss: stat?.record.loss ?? 0,
    draw: stat?.record.draw ?? 0,
  };
}

function toDateKey(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

async function fetchStreakDays(): Promise<number> {
  const archives = await fetchJson<ChessArchivesResponse>(
    `${CHESS_API_BASE}/${CHESS_USERNAME}/games/archives`,
  );
  if (!archives?.archives.length) return 0;

  const recentArchives = archives.archives.slice(-STREAK_LOOKBACK_MONTHS);
  const playedDays = new Set<string>();

  for (const url of recentArchives) {
    const month = await fetchJson<ChessGamesResponse>(url);
    for (const game of month?.games ?? []) {
      playedDays.add(toDateKey(game.end_time));
    }
  }

  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  if (!playedDays.has(cursor.toISOString().slice(0, 10))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  let streak = 0;
  while (playedDays.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  return streak;
}

export async function getChessStats(): Promise<ChessStats | null> {
  const [stats, streakDays] = await Promise.all([
    fetchJson<ChessStatsResponse>(`${CHESS_API_BASE}/${CHESS_USERNAME}/stats`),
    fetchStreakDays(),
  ]);

  if (!stats) return null;

  return {
    rapid: toRecord(stats.chess_rapid),
    blitz: toRecord(stats.chess_blitz),
    streakDays,
  };
}
