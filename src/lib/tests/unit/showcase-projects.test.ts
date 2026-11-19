import { describe, expect, it } from 'vitest';
import { countProjectsIn } from '@/lib/showcase-projects';

describe('countProjectsIn', () => {
  it('counts every project for the all filter and each group otherwise', () => {
    expect(countProjectsIn('all')).toBe(7);
    expect(countProjectsIn('mobile')).toBe(2);
    expect(countProjectsIn('web')).toBe(4);
    expect(countProjectsIn('api')).toBe(1);
  });
});
