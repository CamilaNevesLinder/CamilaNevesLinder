import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  LANGUAGE_TECHNOLOGIES,
  TECH_GROUPS,
  TOTAL_TECHNOLOGY_COUNT,
} from '@/lib/tech-groups';

describe('tech groups', () => {
  it('counts the 31 tools shown on the page', () => {
    expect(TOTAL_TECHNOLOGY_COUNT).toBe(31);
  });

  it('points every logo at an icon that exists in public/tech-icons', () => {
    const technologies = [
      ...LANGUAGE_TECHNOLOGIES,
      ...TECH_GROUPS.flatMap((group) => group.technologies),
    ];

    for (const technology of technologies) {
      if ('logo' in technology) {
        expect(
          existsSync(
            join(process.cwd(), 'public/tech-icons', `${technology.logo}.svg`),
          ),
          technology.name,
        ).toBe(true);
      }
    }
  });
});
