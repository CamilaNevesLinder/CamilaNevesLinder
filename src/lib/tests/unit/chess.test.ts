import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const STATS_URL = 'https://api.chess.com/pub/player/camilinder/stats';
const ARCHIVES_URL =
  'https://api.chess.com/pub/player/camilinder/games/archives';

const STATS_RESPONSE = {
  chess_rapid: {
    last: { rating: 829 },
    record: { win: 43, loss: 60, draw: 9 },
  },
  chess_blitz: {
    last: { rating: 833 },
    record: { win: 127, loss: 135, draw: 13 },
  },
};

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, json: async () => body } as Response;
}

function endTimeFor(dateIso: string): number {
  return Math.floor(new Date(`${dateIso}T12:00:00.000Z`).getTime() / 1000);
}

describe('getChessStats', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-09-15T18:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('returns rapid/blitz records and the current streak', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === STATS_URL) return jsonResponse(STATS_RESPONSE);
      if (url === ARCHIVES_URL) {
        return jsonResponse({
          archives: [
            'https://api.chess.com/pub/player/camilinder/games/2026/09',
          ],
        });
      }
      if (url.endsWith('/games/2026/09')) {
        return jsonResponse({
          games: [
            { end_time: endTimeFor('2026-09-15') },
            { end_time: endTimeFor('2026-09-14') },
            { end_time: endTimeFor('2026-09-12') },
          ],
        });
      }
      throw new Error(`unexpected url: ${url}`);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getChessStats } = await import('@/lib/chess');
    const stats = await getChessStats();

    expect(stats).toEqual({
      rapid: { rating: 829, win: 43, loss: 60, draw: 9 },
      blitz: { rating: 833, win: 127, loss: 135, draw: 13 },
      streakDays: 2,
    });
  });

  it('returns null when the stats request fails', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === STATS_URL) return jsonResponse(null, false);
      if (url === ARCHIVES_URL) return jsonResponse({ archives: [] });
      throw new Error(`unexpected url: ${url}`);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getChessStats } = await import('@/lib/chess');
    const stats = await getChessStats();

    expect(stats).toBeNull();
  });

  it('returns a streak of 0 when there are no archives', async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url === STATS_URL) return jsonResponse(STATS_RESPONSE);
      if (url === ARCHIVES_URL) return jsonResponse({ archives: [] });
      throw new Error(`unexpected url: ${url}`);
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getChessStats } = await import('@/lib/chess');
    const stats = await getChessStats();

    expect(stats?.streakDays).toBe(0);
  });
});
