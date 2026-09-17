# Technologies Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/technologies` placeholder with a real page listing technologies the project owner has real proficiency in, grouped by category (Languages, Frontend & Mobile, Backend, Tools & Cloud).

**Architecture:** Same pattern as `/about` and `/projects`: a new static organism (`TechStack`) rendered by a `pages/*` wrapper, driven entirely by `next-intl` translations — no server fetch. Visual language matches `Experience`/`ProjectShowcase`: label + heading, then per-category `h3` + row of `Badge` tags, separated by `Separator`.

**Tech Stack:** Next.js 16 App Router, React 19, next-intl 4, shadcn/ui atoms (`Badge`, `Separator`), Tailwind v4, Vitest 4 + Testing Library.

**Spec:** `docs/plans/2026-09-17-technologies-page-design.md`

## Global Constraints

- No server fetch — all content is static via `next-intl`, same as `Experience`/`ProjectShowcase`.
- New translation namespace `technologiesPage` — technology/tool names are proper nouns and stay identical across all 3 locales (only category titles and the label/heading get translated), same convention as `projectsPage.items.*.stack`.
- Excluded technologies — never add these, they were explicitly confirmed out of scope: `MongoDB`, `Kotlin`, `Python`, `Shell`, `Nginx`, `Make`, and anything from the Moodle-fork stack (`Angular`, `Ionic`, `Cordova`, `PHP`, `Java`, `Objective-C`, `Gherkin`, `SCSS`, `Mustache`).
- Every task must leave `pnpm typecheck` and `pnpm test:unit` passing.

---

## Task 1: `TechStack` organism + pt-br content

**Files:**
- Create: `src/components/organisms/tech-stack.tsx`
- Create: `src/components/organisms/tests/unit/tech-stack.test.tsx`
- Modify: `messages/pt-br.json`

**Interfaces:**
- Produces: `TechStack` (named export, no props) from `@/components/organisms/tech-stack`. Task 3 consumes it.
- Consumes: `Separator` from `@/components/atoms/separator`, `Badge` from `@/components/atoms/badge` (both already exist).

- [ ] **Step 1: Write the failing test**

Create `src/components/organisms/tests/unit/tech-stack.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { TechStack } from '@/components/organisms/tech-stack';

describe('TechStack', () => {
  it('renders every category in order', () => {
    renderWithProviders(<TechStack />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles.map((t) => t.textContent)).toEqual([
      'Linguagens',
      'Frontend & Mobile',
      'Backend',
      'Ferramentas & Cloud',
    ]);
  });

  it('renders technologies within each category', () => {
    renderWithProviders(<TechStack />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.getByText('NestJS')).toBeInTheDocument();
    expect(screen.getByText('Docker')).toBeInTheDocument();
  });

  it('does not render excluded technologies', () => {
    renderWithProviders(<TechStack />);

    expect(screen.queryByText('MongoDB')).not.toBeInTheDocument();
    expect(screen.queryByText('Kotlin')).not.toBeInTheDocument();
    expect(screen.queryByText('Python')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/organisms/tests/unit/tech-stack.test.tsx
```
Expected: FAIL with a module-not-found error for `@/components/organisms/tech-stack`.

- [ ] **Step 3: Add the `technologiesPage` namespace to `messages/pt-br.json`**

Change:
```json
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "nav": {
```
To:
```json
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "technologiesPage": {
    "label": "Tecnologias",
    "heading": "O que eu uso no dia a dia",
    "categories": {
      "languages": {
        "title": "Linguagens",
        "items": ["TypeScript", "JavaScript"]
      },
      "frontendMobile": {
        "title": "Frontend & Mobile",
        "items": [
          "React",
          "Next.js",
          "React Native",
          "Expo",
          "Expo Router",
          "NativeWind",
          "Tailwind CSS",
          "Radix UI",
          "shadcn/ui",
          "Framer Motion",
          "TanStack Query",
          "Zustand",
          "Zod",
          "i18next"
        ]
      },
      "backend": {
        "title": "Backend",
        "items": ["Node.js", "NestJS", "TypeORM", "MySQL"]
      },
      "toolsCloud": {
        "title": "Ferramentas & Cloud",
        "items": ["AWS", "Docker", "GitHub Actions", "Firebase", "Vitest"]
      }
    }
  },
  "nav": {
```

- [ ] **Step 4: Create `src/components/organisms/tech-stack.tsx`**

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { Separator } from '@/components/atoms/separator';
import { Badge } from '@/components/atoms/badge';

const CATEGORY_KEYS = [
  'languages',
  'frontendMobile',
  'backend',
  'toolsCloud',
] as const;

export function TechStack() {
  const t = useTranslations('technologiesPage');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[32px] font-bold">
          {t('heading')}
        </h2>

        {CATEGORY_KEYS.map((key, index) => {
          const items = t.raw(`categories.${key}.items`) as string[];

          return (
            <div key={key}>
              {index > 0 && <Separator className="bg-rose/40 my-9" />}
              <h3 className="text-espresso font-serif text-[24px] font-bold">
                {t(`categories.${key}.title`)}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <Badge
                    key={item}
                    className="bg-rose/[0.32] text-espresso h-auto rounded-[3px] px-3 py-1 font-mono text-xs uppercase tracking-wide"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/components/organisms/tests/unit/tech-stack.test.tsx
```
Expected: PASS (3/3).

- [ ] **Step 6: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```
Expected: no errors, all tests pass.

Do not commit — the project owner commits manually.

---

## Task 2: EN/ES translations + locale-parity test

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Create: `src/tests/unit/messages-technologies-page.test.ts`

**Interfaces:**
- No new exports. `TechStack` (Task 1) already reads `technologiesPage.*` generically via `t()`/`t.raw()`, so it works against any locale once the keys exist.

Technology/tool names in `items` arrays are proper nouns and stay byte-identical across all 3 locales — only `label`, `heading`, and each category's `title` are translated.

- [ ] **Step 1: Add `technologiesPage` to `messages/en.json`**

Change:
```json
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "nav": {
```
To:
```json
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "technologiesPage": {
    "label": "Technologies",
    "heading": "What I use day to day",
    "categories": {
      "languages": {
        "title": "Languages",
        "items": ["TypeScript", "JavaScript"]
      },
      "frontendMobile": {
        "title": "Frontend & Mobile",
        "items": [
          "React",
          "Next.js",
          "React Native",
          "Expo",
          "Expo Router",
          "NativeWind",
          "Tailwind CSS",
          "Radix UI",
          "shadcn/ui",
          "Framer Motion",
          "TanStack Query",
          "Zustand",
          "Zod",
          "i18next"
        ]
      },
      "backend": {
        "title": "Backend",
        "items": ["Node.js", "NestJS", "TypeORM", "MySQL"]
      },
      "toolsCloud": {
        "title": "Tools & Cloud",
        "items": ["AWS", "Docker", "GitHub Actions", "Firebase", "Vitest"]
      }
    }
  },
  "nav": {
```

- [ ] **Step 2: Add `technologiesPage` to `messages/es.json`**

Change:
```json
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "nav": {
```
To:
```json
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "technologiesPage": {
    "label": "Tecnologías",
    "heading": "Lo que uso día a día",
    "categories": {
      "languages": {
        "title": "Lenguajes",
        "items": ["TypeScript", "JavaScript"]
      },
      "frontendMobile": {
        "title": "Frontend & Mobile",
        "items": [
          "React",
          "Next.js",
          "React Native",
          "Expo",
          "Expo Router",
          "NativeWind",
          "Tailwind CSS",
          "Radix UI",
          "shadcn/ui",
          "Framer Motion",
          "TanStack Query",
          "Zustand",
          "Zod",
          "i18next"
        ]
      },
      "backend": {
        "title": "Backend",
        "items": ["Node.js", "NestJS", "TypeORM", "MySQL"]
      },
      "toolsCloud": {
        "title": "Herramientas & Cloud",
        "items": ["AWS", "Docker", "GitHub Actions", "Firebase", "Vitest"]
      }
    }
  },
  "nav": {
```

- [ ] **Step 3: Create the locale-parity test**

Create `src/tests/unit/messages-technologies-page.test.ts` (sibling of the existing `src/tests/unit/messages-projects-page.test.ts`, same pattern):

```ts
import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const CATEGORY_KEYS = [
  'languages',
  'frontendMobile',
  'backend',
  'toolsCloud',
] as const;

describe('technologiesPage message parity', () => {
  it('has the same category keys in the same order across all locales', () => {
    expect(Object.keys(ptBr.technologiesPage.categories)).toEqual(
      CATEGORY_KEYS,
    );
    expect(Object.keys(en.technologiesPage.categories)).toEqual(
      CATEGORY_KEYS,
    );
    expect(Object.keys(es.technologiesPage.categories)).toEqual(
      CATEGORY_KEYS,
    );
  });

  it('has matching items array lengths per category across all locales', () => {
    for (const key of CATEGORY_KEYS) {
      const ptItems = ptBr.technologiesPage.categories[key].items;
      const enItems = en.technologiesPage.categories[key].items;
      const esItems = es.technologiesPage.categories[key].items;

      expect(enItems).toHaveLength(ptItems.length);
      expect(esItems).toHaveLength(ptItems.length);
    }
  });

  it('keeps technology names byte-identical across locales (proper nouns are not translated)', () => {
    for (const key of CATEGORY_KEYS) {
      expect(en.technologiesPage.categories[key].items).toEqual(
        ptBr.technologiesPage.categories[key].items,
      );
      expect(es.technologiesPage.categories[key].items).toEqual(
        ptBr.technologiesPage.categories[key].items,
      );
    }
  });
});
```

Run it directly to confirm it's picked up by the `unit-node` vitest project and passes:
```bash
pnpm vitest run src/tests/unit/messages-technologies-page.test.ts
```
Expected: PASS (3/3). If it reports "No test files found", stop and report NEEDS_CONTEXT — do not guess at a different file location (the sibling file `messages-projects-page.test.ts` at the same path already proves this glob works).

- [ ] **Step 4: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```
Expected: no errors, all tests pass.

Do not commit.

---

## Task 3: Wire `TechnologiesPage` to `TechStack`

**Files:**
- Modify: `src/components/pages/technologies-page.tsx`
- Modify: `src/components/pages/tests/unit/technologies-page.test.tsx`

**Interfaces:**
- Consumes: `TechStack` from `@/components/organisms/tech-stack` (Task 1).

`src/app/[locale]/(pages)/technologies/page.tsx` needs no change — it already just renders `<TechnologiesPage />`.

- [ ] **Step 1: Write the failing test**

Replace `src/components/pages/tests/unit/technologies-page.test.tsx` with:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { TechnologiesPage } from '@/components/pages/technologies-page';

describe('TechnologiesPage', () => {
  it('renders the tech stack showcase', () => {
    renderWithProviders(<TechnologiesPage />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'O que eu uso no dia a dia',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Linguagens' }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/pages/tests/unit/technologies-page.test.tsx
```
Expected: FAIL — the current `TechnologiesPage` renders the "Conteúdo em breve." placeholder, not the tech stack heading.

- [ ] **Step 3: Replace `src/components/pages/technologies-page.tsx`**

```tsx
import { TechStack } from '@/components/organisms/tech-stack';

export function TechnologiesPage() {
  return <TechStack />;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/pages/tests/unit/technologies-page.test.tsx
```
Expected: PASS.

- [ ] **Step 5: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```
Expected: no errors, all tests pass.

Do not commit.

---

## Task 4: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Run the full verification suite**

```bash
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
```
Expected: lint clean (aside from the pre-existing `main-template.test.tsx` prettier warning, unrelated to this work), typecheck clean, all tests passing, production build succeeds. The `pnpm test:coverage` 90% global threshold is a documented pre-existing shortfall (untested shadcn primitives from before this feature) — do not attempt to fix it here, it's out of scope. This task's own new files (`tech-stack.tsx`, `technologies-page.tsx`) should show full coverage since every branch is exercised by Task 1-3's tests.

- [ ] **Step 2: Manual smoke check**

Boot the production build and curl `/technologies`, `/en/technologies`, `/es/tecnologias` to confirm all 4 categories render with the correct localized title and technology badges, and that no excluded technology (`MongoDB`, `Kotlin`, `Python`, `Shell`, `Nginx`, `Make`, any Moodle-fork language) appears anywhere in the HTML.

Do not commit — the project owner commits manually.

## Self-Review Notes

- **Spec coverage:** category content (Task 1 pt-br), EN/ES translation + parity guard (Task 2), page wiring (Task 3), verification (Task 4) — every spec section maps to a task.
- **Out-of-scope guardrails respected:** excluded-technology list carried into every task's test assertions and the Global Constraints section, not just stated once and forgotten.
- **Type consistency:** `CATEGORY_KEYS` in `tech-stack.tsx` (Task 1) matches the 4 keys used in all three `messages/*.json` files (Tasks 1-2) and the parity test (Task 2) exactly, same order.
