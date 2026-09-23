# Atomic Design Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize `src/components/` into Atomic Design layers (atoms/molecules/organisms/templates/pages) and rename internal route folders to English, with zero change to public URLs or behavior.

**Architecture:** Pure structural refactor. Files move, imports are rewritten to the new paths, `page.tsx`/`layout.tsx` become thin wrappers around new `components/pages/*` and `components/templates/main-template.tsx` components. No new business logic; existing tests move with their components and get their import paths updated (moves only — new tests are added only for the new thin wrapper components).

**Tech Stack:** Next.js 16 (App Router, `src/app/[locale]`), React 19, next-intl 4 (localized `pathnames`), shadcn/ui (`base-nova` style, `@base-ui/react`), Tailwind v4, Vitest 4 + Testing Library, TypeScript 6, pnpm.

**Spec:** `docs/plans/2026-09-16-atomic-design-refactor.md`

## Global Constraints

- No change to public URLs: `next-intl` `pathnames` per-locale values (`en`/`pt-br`/`es`) stay exactly as they are today — only the internal object key changes.
- No change to i18n/locale support scope (out of scope per spec).
- No change to component visual output, props, or behavior — only file location and import paths.
- Every task must leave `pnpm typecheck` and `pnpm test:unit` passing before moving to the next task.
- Test files move with their component into the same-level `tests/unit/` folder (spec's "colocated per level" rule).
- Never run `git commit` or `git add` at any point in this plan. Implementers only move/edit files and run checks; the controller handles all git bookkeeping outside the task loop.

---

## Task 1: Atoms layer — simple shadcn primitives + icons

**Files:**

- Create dir: `src/components/atoms/`
- Move: `src/components/ui/button.tsx` → `src/components/atoms/button.tsx`
- Move: `src/components/ui/badge.tsx` → `src/components/atoms/badge.tsx`
- Move: `src/components/ui/card.tsx` → `src/components/atoms/card.tsx`
- Move: `src/components/ui/separator.tsx` → `src/components/atoms/separator.tsx`
- Move: `src/components/ui/switch.tsx` → `src/components/atoms/switch.tsx`
- Move: `src/components/icons/social-icons.tsx` → `src/components/atoms/icons/social-icons.tsx`
- Modify: `components.json`
- Modify: `src/components/sidebar.tsx` (import lines only)
- Modify: `src/components/projects.tsx` (import lines only)
- Modify: `src/components/hero.tsx` (import lines only)
- Modify: `src/components/education.tsx` (import lines only)
- Modify: `src/components/experience.tsx` (import lines only)
- Modify: `src/components/about.tsx` (import lines only)
- Modify: `src/components/ui/carousel.tsx` (import line only — stays in `ui/` until Task 2, but its `Button` import breaks the moment `button.tsx` leaves that folder)
- Modify: `src/components/ui/sheet.tsx` (import line only — same reason)

**Interfaces:**

- Produces: `Button`/`buttonVariants` from `@/components/atoms/button`, `Badge` from `@/components/atoms/badge`, `Card` (+ subparts) from `@/components/atoms/card`, `Separator` from `@/components/atoms/separator`, `Switch` from `@/components/atoms/switch`, `GithubIcon`/`InstagramIcon`/`LinkedinIcon` from `@/components/atoms/icons/social-icons`. Task 2 (molecules) consumes `Button` from this new path.

- [ ] **Step 1: Move the files with git mv**

```bash
mkdir -p src/components/atoms/icons
git mv src/components/ui/button.tsx src/components/atoms/button.tsx
git mv src/components/ui/badge.tsx src/components/atoms/badge.tsx
git mv src/components/ui/card.tsx src/components/atoms/card.tsx
git mv src/components/ui/separator.tsx src/components/atoms/separator.tsx
git mv src/components/ui/switch.tsx src/components/atoms/switch.tsx
git mv src/components/icons/social-icons.tsx src/components/atoms/icons/social-icons.tsx
```

- [ ] **Step 2: Update `components.json` so `shadcn add` targets the new atoms folder**

Change:

```json
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
```

To:

```json
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/atoms",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
```

- [ ] **Step 3: Update imports in `src/components/sidebar.tsx`**

Change:

```tsx
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/icons/social-icons';
```

To:

```tsx
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/atoms/icons/social-icons';
```

Change:

```tsx
import { Button, buttonVariants } from '@/components/ui/button';
```

To:

```tsx
import { Button, buttonVariants } from '@/components/atoms/button';
```

Change:

```tsx
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
```

To:

```tsx
import { Separator } from '@/components/atoms/separator';
import { Switch } from '@/components/atoms/switch';
```

(Leave the `@/components/ui/popover` and `@/components/ui/sheet` imports in this file untouched — they move in Task 2.)

- [ ] **Step 4: Update imports in `src/components/projects.tsx`**

Change:

```tsx
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
```

To:

```tsx
import { Badge } from '@/components/atoms/badge';
import { Separator } from '@/components/atoms/separator';
```

- [ ] **Step 5: Update imports in `src/components/hero.tsx`**

Change:

```tsx
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
```

To:

```tsx
import { buttonVariants } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Card } from '@/components/atoms/card';
import { Separator } from '@/components/atoms/separator';
```

- [ ] **Step 6: Update imports in `src/components/education.tsx` and `src/components/experience.tsx`**

In both files, change:

```tsx
import { Separator } from '@/components/ui/separator';
```

To:

```tsx
import { Separator } from '@/components/atoms/separator';
```

- [ ] **Step 7: Update import in `src/components/about.tsx`**

Change:

```tsx
import { Separator } from '@/components/ui/separator';
```

To:

```tsx
import { Separator } from '@/components/atoms/separator';
```

- [ ] **Step 7b: Update the `Button` import in `src/components/ui/carousel.tsx` and `src/components/ui/sheet.tsx`**

These two files are not moving yet (that's Task 2) — they still live in `src/components/ui/`. But both import `Button` from `@/components/ui/button`, and Step 1 just moved `button.tsx` out of that folder, so leaving this unfixed breaks typecheck. In both files, change:

```tsx
import { Button } from '@/components/ui/button';
```

To:

```tsx
import { Button } from '@/components/atoms/button';
```

- [ ] **Step 8: Typecheck and run affected tests**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all existing tests still pass (nothing in this task changes behavior, only import paths).

Do not commit. This task ends after Step 8 passes.

---

## Task 2: Molecules layer — compound shadcn primitives

**Files:**

- Move: `src/components/ui/carousel.tsx` → `src/components/molecules/carousel.tsx`
- Move: `src/components/ui/popover.tsx` → `src/components/molecules/popover.tsx`
- Move: `src/components/ui/sheet.tsx` → `src/components/molecules/sheet.tsx`
- Move: `src/components/ui/navigation-menu.tsx` → `src/components/molecules/navigation-menu.tsx`
- Modify: `src/components/sidebar.tsx` (import lines only)
- Modify: `src/components/book-gallery.tsx` (import lines only)
- Modify: `src/components/jiujitsu-gallery.tsx` (import lines only)

**Interfaces:**

- Consumes: `Button` from `@/components/atoms/button` (Task 1).
- Produces: `Carousel`/`CarouselContent`/`CarouselItem`/`CarouselPrevious`/`CarouselNext` from `@/components/molecules/carousel`; `Popover`/`PopoverTrigger`/`PopoverContent` from `@/components/molecules/popover`; `Sheet`/`SheetTrigger`/`SheetContent`/`SheetClose` from `@/components/molecules/sheet`. Nothing in the codebase currently imports `navigation-menu` — it moves with no consumer to update.

- [ ] **Step 1: Move the files with git mv**

```bash
git mv src/components/ui/carousel.tsx src/components/molecules/carousel.tsx
git mv src/components/ui/popover.tsx src/components/molecules/popover.tsx
git mv src/components/ui/sheet.tsx src/components/molecules/sheet.tsx
git mv src/components/ui/navigation-menu.tsx src/components/molecules/navigation-menu.tsx
```

`src/components/ui/` and `src/components/icons/` should now be empty — remove them:

```bash
rmdir src/components/ui src/components/icons 2>/dev/null || true
```

Note: `carousel.tsx` and `sheet.tsx` already import `Button` from `@/components/atoms/button` — Task 1 fixed that import while they still lived in `ui/`, since `button.tsx` moved out from under them. Nothing to change there in this task; just confirm it during Step 4's typecheck.

- [ ] **Step 2: Update imports in `src/components/sidebar.tsx`**

Change:

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
```

To:

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/molecules/popover';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/molecules/sheet';
```

- [ ] **Step 3: Update the carousel import in `src/components/book-gallery.tsx` and `src/components/jiujitsu-gallery.tsx`**

In both files, change:

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
```

To:

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/molecules/carousel';
```

- [ ] **Step 4: Typecheck and run affected tests**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all existing tests still pass.

---

## Task 3: Organisms layer — page-section components

**Files:**

- Move: `src/components/hero.tsx` → `src/components/organisms/hero.tsx`
- Move: `src/components/projects.tsx` → `src/components/organisms/projects.tsx`
- Move: `src/components/ai-process.tsx` → `src/components/organisms/ai-process.tsx`
- Move: `src/components/experience.tsx` → `src/components/organisms/experience.tsx`
- Move: `src/components/education.tsx` → `src/components/organisms/education.tsx`
- Move: `src/components/about.tsx` → `src/components/organisms/about.tsx`
- Move: `src/components/book-gallery.tsx` → `src/components/organisms/book-gallery.tsx`
- Move: `src/components/jiujitsu-gallery.tsx` → `src/components/organisms/jiujitsu-gallery.tsx`
- Move: `src/components/sidebar.tsx` → `src/components/organisms/sidebar.tsx`
- Move: `src/components/tests/unit/hero.test.tsx` → `src/components/organisms/tests/unit/hero.test.tsx`
- Move: `src/components/tests/unit/projects.test.tsx` → `src/components/organisms/tests/unit/projects.test.tsx`
- Move: `src/components/tests/unit/ai-process.test.tsx` → `src/components/organisms/tests/unit/ai-process.test.tsx`
- Move: `src/components/tests/unit/experience.test.tsx` → `src/components/organisms/tests/unit/experience.test.tsx`
- Move: `src/components/tests/unit/education.test.tsx` → `src/components/organisms/tests/unit/education.test.tsx`
- Move: `src/components/tests/unit/about.test.tsx` → `src/components/organisms/tests/unit/about.test.tsx`
- Move: `src/components/tests/unit/sidebar.test.tsx` → `src/components/organisms/tests/unit/sidebar.test.tsx`
- Modify: `src/components/organisms/about.tsx` (import lines only)
- Modify: `src/app/[locale]/layout.tsx` (import line only)
- Modify: `src/app/[locale]/(pages)/(homepage)/page.tsx` (import lines only)
- Modify: `src/app/[locale]/(pages)/sobre/page.tsx` (import line only)

**Interfaces:**

- Produces: `Hero`, `Projects`, `AiProcess`, `Experience`, `Education`, `About`, `BookGallery`, `JiujitsuGallery`, `Sidebar` all from `@/components/organisms/<name>`. Task 4 (templates) consumes `Sidebar`. Task 5/6/7 (pages) consume all the others.

- [ ] **Step 1: Move component files and their tests with git mv**

```bash
mkdir -p src/components/organisms/tests/unit
git mv src/components/hero.tsx src/components/organisms/hero.tsx
git mv src/components/projects.tsx src/components/organisms/projects.tsx
git mv src/components/ai-process.tsx src/components/organisms/ai-process.tsx
git mv src/components/experience.tsx src/components/organisms/experience.tsx
git mv src/components/education.tsx src/components/organisms/education.tsx
git mv src/components/about.tsx src/components/organisms/about.tsx
git mv src/components/book-gallery.tsx src/components/organisms/book-gallery.tsx
git mv src/components/jiujitsu-gallery.tsx src/components/organisms/jiujitsu-gallery.tsx
git mv src/components/sidebar.tsx src/components/organisms/sidebar.tsx

git mv src/components/tests/unit/hero.test.tsx src/components/organisms/tests/unit/hero.test.tsx
git mv src/components/tests/unit/projects.test.tsx src/components/organisms/tests/unit/projects.test.tsx
git mv src/components/tests/unit/ai-process.test.tsx src/components/organisms/tests/unit/ai-process.test.tsx
git mv src/components/tests/unit/experience.test.tsx src/components/organisms/tests/unit/experience.test.tsx
git mv src/components/tests/unit/education.test.tsx src/components/organisms/tests/unit/education.test.tsx
git mv src/components/tests/unit/about.test.tsx src/components/organisms/tests/unit/about.test.tsx
git mv src/components/tests/unit/sidebar.test.tsx src/components/organisms/tests/unit/sidebar.test.tsx

rmdir src/components/tests/unit src/components/tests 2>/dev/null || true
```

- [ ] **Step 2: Update the cross-organism import in `src/components/organisms/about.tsx`**

Change:

```tsx
import { JiujitsuGallery } from '@/components/jiujitsu-gallery';
import { BookGallery } from '@/components/book-gallery';
```

To:

```tsx
import { JiujitsuGallery } from '@/components/organisms/jiujitsu-gallery';
import { BookGallery } from '@/components/organisms/book-gallery';
```

- [ ] **Step 3: Update the test imports (each moved test still imports its component by old path)**

In each of the 7 moved test files, update the component import to the new `organisms` path:

- `hero.test.tsx`: `from '@/components/hero'` → `from '@/components/organisms/hero'`
- `projects.test.tsx`: `from '@/components/projects'` → `from '@/components/organisms/projects'`
- `ai-process.test.tsx`: `from '@/components/ai-process'` → `from '@/components/organisms/ai-process'`
- `experience.test.tsx`: `from '@/components/experience'` → `from '@/components/organisms/experience'`
- `education.test.tsx`: `from '@/components/education'` → `from '@/components/organisms/education'`
- `about.test.tsx`: `from '@/components/about'` → `from '@/components/organisms/about'`
- `sidebar.test.tsx`: `from '@/components/sidebar'` → `from '@/components/organisms/sidebar'`

- [ ] **Step 4: Update `src/app/[locale]/layout.tsx`**

Change:

```tsx
import { Sidebar } from '@/components/sidebar';
```

To:

```tsx
import { Sidebar } from '@/components/organisms/sidebar';
```

- [ ] **Step 5: Update `src/app/[locale]/(pages)/(homepage)/page.tsx`**

Change:

```tsx
import { Hero } from '@/components/hero';
import { Projects } from '@/components/projects';
import { AiProcess } from '@/components/ai-process';
import { Experience } from '@/components/experience';
import { Education } from '@/components/education';
```

To:

```tsx
import { Hero } from '@/components/organisms/hero';
import { Projects } from '@/components/organisms/projects';
import { AiProcess } from '@/components/organisms/ai-process';
import { Experience } from '@/components/organisms/experience';
import { Education } from '@/components/organisms/education';
```

(This import set is fully replaced again in Task 5 when the page switches to rendering `HomePage` — this step just keeps the app compiling in the meantime.)

- [ ] **Step 6: Update `src/app/[locale]/(pages)/sobre/page.tsx`**

Change:

```tsx
import { About } from '@/components/about';
```

To:

```tsx
import { About } from '@/components/organisms/about';
```

- [ ] **Step 7: Typecheck and run affected tests**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all existing tests still pass.

Do not commit. This task ends after Step 7 passes.

---

## Task 4: Templates layer — extract MainTemplate

**Files:**

- Create: `src/components/templates/main-template.tsx`
- Create: `src/components/templates/tests/unit/main-template.test.tsx`
- Modify: `src/app/[locale]/layout.tsx`

**Interfaces:**

- Consumes: `Sidebar` from `@/components/organisms/sidebar` (Task 3).
- Produces: `MainTemplate` (named export, props `{ children: React.ReactNode }`) from `@/components/templates/main-template`. Task 5/6/7 do not consume this directly — only `layout.tsx` does.

- [ ] **Step 1: Write the failing test**

Create `src/components/templates/tests/unit/main-template.test.tsx`:

```tsx
import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { MainTemplate } from '@/components/templates/main-template';

vi.mock('@/lib/navigation', () => ({
  Link: ({
    href,
    children,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
  locales: ['en', 'pt-br', 'es'],
  usePathname: () => '/',
}));

describe('MainTemplate', () => {
  it('renders the sidebar and the page content', () => {
    renderWithProviders(
      <MainTemplate>
        <p>page content</p>
      </MainTemplate>,
    );

    expect(screen.getAllByText('Camila Linder')).toHaveLength(2);
    expect(screen.getByText('page content')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/templates/tests/unit/main-template.test.tsx
```

Expected: FAIL with a module-not-found error for `@/components/templates/main-template`.

- [ ] **Step 3: Create `src/components/templates/main-template.tsx`**

```tsx
import { Sidebar } from '@/components/organisms/sidebar';

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="pt-14 md:pl-60 md:pt-0">{children}</main>
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/templates/tests/unit/main-template.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Update `src/app/[locale]/layout.tsx` to use `MainTemplate`**

Change:

```tsx
import NextIntlProvider from '@/providers/next-intl-provider';
import { Sidebar } from '@/components/organisms/sidebar';
```

To:

```tsx
import NextIntlProvider from '@/providers/next-intl-provider';
import { MainTemplate } from '@/components/templates/main-template';
```

Change:

```tsx
<body>
  <NextIntlProvider locale={locale} messages={messages}>
    <Sidebar />
    <main className="pt-14 md:pl-60 md:pt-0">{children}</main>
  </NextIntlProvider>
</body>
```

To:

```tsx
<body>
  <NextIntlProvider locale={locale} messages={messages}>
    <MainTemplate>{children}</MainTemplate>
  </NextIntlProvider>
</body>
```

- [ ] **Step 6: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass (the app still renders the same DOM as before — `MainTemplate` reproduces the exact previous markup).

Do not commit. This task ends after Step 6 passes.

---

## Task 5: Pages layer — HomePage

**Files:**

- Create: `src/components/pages/home-page.tsx`
- Create: `src/components/pages/tests/unit/home-page.test.tsx`
- Modify: `src/app/[locale]/(pages)/(homepage)/page.tsx`

**Interfaces:**

- Consumes: `Hero`, `Projects`, `AiProcess`, `Experience`, `Education` from `@/components/organisms/*` (Task 3).
- Produces: `HomePage` (named export, no props) from `@/components/pages/home-page`.

- [ ] **Step 1: Write the failing test**

Create `src/components/pages/tests/unit/home-page.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { HomePage } from '@/components/pages/home-page';

describe('HomePage', () => {
  it('renders every home section', () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText('Camila Neves Linder')).toBeInTheDocument();
    expect(screen.getByText('Projetos selecionados')).toBeInTheDocument();
    expect(screen.getByText('IA First')).toBeInTheDocument();
    expect(screen.getByText('Experiência')).toBeInTheDocument();
    expect(screen.getByText('Formações e cursos')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/pages/tests/unit/home-page.test.tsx
```

Expected: FAIL with a module-not-found error for `@/components/pages/home-page`.

- [ ] **Step 3: Create `src/components/pages/home-page.tsx`**

```tsx
import { Hero } from '@/components/organisms/hero';
import { Projects } from '@/components/organisms/projects';
import { AiProcess } from '@/components/organisms/ai-process';
import { Experience } from '@/components/organisms/experience';
import { Education } from '@/components/organisms/education';

export function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <AiProcess />
      <Experience />
      <Education />
    </>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/pages/tests/unit/home-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Simplify `src/app/[locale]/(pages)/(homepage)/page.tsx` to use `HomePage`**

Replace the whole file with:

```tsx
import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/components/pages/home-page';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}
```

- [ ] **Step 6: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit. This task ends after Step 6 passes.

---

## Task 6: Pages layer — AboutPage

**Files:**

- Create: `src/components/pages/about-page.tsx`
- Create: `src/components/pages/tests/unit/about-page.test.tsx`
- Modify: `src/app/[locale]/(pages)/sobre/page.tsx`

**Interfaces:**

- Consumes: `About` from `@/components/organisms/about` (Task 3), `ChessStats` type from `@/lib/chess`.
- Produces: `AboutPage` (named export, props `{ chessStats: ChessStats | null }`) from `@/components/pages/about-page`.

- [ ] **Step 1: Write the failing test**

Create `src/components/pages/tests/unit/about-page.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { AboutPage } from '@/components/pages/about-page';
import type { ChessStats } from '@/lib/chess';

const CHESS_STATS: ChessStats = {
  rapid: { rating: 829, win: 43, loss: 60, draw: 9 },
  blitz: { rating: 833, win: 127, loss: 135, draw: 13 },
  streakDays: 2,
};

describe('AboutPage', () => {
  it('renders the About section with the given chess stats', () => {
    renderWithProviders(<AboutPage chessStats={CHESS_STATS} />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Além da tela' }),
    ).toBeInTheDocument();
    expect(screen.getByText('829')).toBeInTheDocument();
  });

  it('falls back to the unavailable message when chess stats are null', () => {
    renderWithProviders(<AboutPage chessStats={null} />);

    expect(
      screen.getByText('Stats do Chess.com indisponíveis no momento.'),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/pages/tests/unit/about-page.test.tsx
```

Expected: FAIL with a module-not-found error for `@/components/pages/about-page`.

- [ ] **Step 3: Create `src/components/pages/about-page.tsx`**

```tsx
import { About } from '@/components/organisms/about';
import type { ChessStats } from '@/lib/chess';

export function AboutPage({ chessStats }: { chessStats: ChessStats | null }) {
  return <About chessStats={chessStats} />;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/pages/tests/unit/about-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Simplify `src/app/[locale]/(pages)/sobre/page.tsx` to use `AboutPage`**

Replace the whole file with:

```tsx
import { setRequestLocale } from 'next-intl/server';
import { AboutPage } from '@/components/pages/about-page';
import { getChessStats } from '@/lib/chess';

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const chessStats = await getChessStats();

  return <AboutPage chessStats={chessStats} />;
}
```

- [ ] **Step 6: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit. This task ends after Step 6 passes.

---

## Task 7: Pages layer — placeholder pages (Projects/Technologies/Contact)

**Files:**

- Create: `src/components/pages/projects-page.tsx`
- Create: `src/components/pages/technologies-page.tsx`
- Create: `src/components/pages/contact-page.tsx`
- Create: `src/components/pages/tests/unit/projects-page.test.tsx`
- Create: `src/components/pages/tests/unit/technologies-page.test.tsx`
- Create: `src/components/pages/tests/unit/contact-page.test.tsx`
- Modify: `src/app/[locale]/(pages)/projetos/page.tsx`
- Modify: `src/app/[locale]/(pages)/tecnologias/page.tsx`
- Modify: `src/app/[locale]/(pages)/contato/page.tsx`

**Interfaces:**

- Produces: `ProjectsPage`, `TechnologiesPage`, `ContactPage` (named exports, no props) from `@/components/pages/projects-page`, `@/components/pages/technologies-page`, `@/components/pages/contact-page`.

These three pages are today static Portuguese "coming soon" placeholders with no organism to compose — moving that exact markup into a `pages/*` component keeps the wrapper pattern consistent even before real content exists. Implementing the actual page content is explicitly out of scope (see spec).

- [ ] **Step 1: Write the three failing tests**

Create `src/components/pages/tests/unit/projects-page.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ProjectsPage } from '@/components/pages/projects-page';

describe('ProjectsPage', () => {
  it('renders the coming-soon placeholder', () => {
    renderWithProviders(<ProjectsPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Projetos' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Conteúdo em breve.')).toBeInTheDocument();
  });
});
```

Create `src/components/pages/tests/unit/technologies-page.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { TechnologiesPage } from '@/components/pages/technologies-page';

describe('TechnologiesPage', () => {
  it('renders the coming-soon placeholder', () => {
    renderWithProviders(<TechnologiesPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Tecnologias' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Conteúdo em breve.')).toBeInTheDocument();
  });
});
```

Create `src/components/pages/tests/unit/contact-page.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ContactPage } from '@/components/pages/contact-page';

describe('ContactPage', () => {
  it('renders the coming-soon placeholder', () => {
    renderWithProviders(<ContactPage />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Contato' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Conteúdo em breve.')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

```bash
pnpm vitest run src/components/pages/tests/unit/projects-page.test.tsx src/components/pages/tests/unit/technologies-page.test.tsx src/components/pages/tests/unit/contact-page.test.tsx
```

Expected: all three FAIL with a module-not-found error.

- [ ] **Step 3: Create the three page components**

Create `src/components/pages/projects-page.tsx`:

```tsx
export function ProjectsPage() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-24">
      <h1 className="text-espresso font-serif text-[40px] font-bold">
        Projetos
      </h1>
      <p className="text-taupe mt-4 text-lg leading-relaxed">
        Conteúdo em breve.
      </p>
    </section>
  );
}
```

Create `src/components/pages/technologies-page.tsx`:

```tsx
export function TechnologiesPage() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-24">
      <h1 className="text-espresso font-serif text-[40px] font-bold">
        Tecnologias
      </h1>
      <p className="text-taupe mt-4 text-lg leading-relaxed">
        Conteúdo em breve.
      </p>
    </section>
  );
}
```

Create `src/components/pages/contact-page.tsx`:

```tsx
export function ContactPage() {
  return (
    <section className="mx-auto max-w-[720px] px-6 py-24">
      <h1 className="text-espresso font-serif text-[40px] font-bold">
        Contato
      </h1>
      <p className="text-taupe mt-4 text-lg leading-relaxed">
        Conteúdo em breve.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

```bash
pnpm vitest run src/components/pages/tests/unit/projects-page.test.tsx src/components/pages/tests/unit/technologies-page.test.tsx src/components/pages/tests/unit/contact-page.test.tsx
```

Expected: all three PASS.

- [ ] **Step 5: Simplify the three route files**

Replace `src/app/[locale]/(pages)/projetos/page.tsx` with:

```tsx
import { setRequestLocale } from 'next-intl/server';
import { ProjectsPage } from '@/components/pages/projects-page';

export default async function ProjetosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsPage />;
}
```

Replace `src/app/[locale]/(pages)/tecnologias/page.tsx` with:

```tsx
import { setRequestLocale } from 'next-intl/server';
import { TechnologiesPage } from '@/components/pages/technologies-page';

export default async function TecnologiasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TechnologiesPage />;
}
```

Replace `src/app/[locale]/(pages)/contato/page.tsx` with:

```tsx
import { setRequestLocale } from 'next-intl/server';
import { ContactPage } from '@/components/pages/contact-page';

export default async function ContatoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPage />;
}
```

- [ ] **Step 6: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit. This task ends after Step 6 passes.

---

## Task 8: Rename route folders to English + update navigation config

**Files:**

- Move: `src/app/[locale]/(pages)/(homepage)/` → `src/app/[locale]/(pages)/(home)/`
- Move: `src/app/[locale]/(pages)/sobre/` → `src/app/[locale]/(pages)/about/`
- Move: `src/app/[locale]/(pages)/projetos/` → `src/app/[locale]/(pages)/projects/`
- Move: `src/app/[locale]/(pages)/tecnologias/` → `src/app/[locale]/(pages)/technologies/`
- Move: `src/app/[locale]/(pages)/contato/` → `src/app/[locale]/(pages)/contact/`
- Modify: `src/lib/navigation.ts`
- Modify: `src/components/organisms/sidebar.tsx` (NAV_ITEMS hrefs only)
- Modify: `src/components/organisms/tests/unit/sidebar.test.tsx` (active-route assertion only)

**Interfaces:**

- No new exports. This task only renames route-group folders (no effect on the URL — Next.js route groups in parentheses are stripped from the path) and changes the _internal_ `next-intl` pathname keys from Portuguese to English. The per-locale URL values (`en`/`pt-br`/`es`) are untouched, so `/sobre`, `/projetos`, `/tecnologias`, `/contato` (pt-br), `/about`, `/projects`, `/technologies`, `/contact` (en), and `/sobre-mi`, `/proyectos`, `/tecnologias`, `/contacto` (es) all keep resolving exactly as before.

- [ ] **Step 1: Rename the route folders with git mv**

```bash
git mv "src/app/[locale]/(pages)/(homepage)" "src/app/[locale]/(pages)/(home)"
git mv "src/app/[locale]/(pages)/sobre" "src/app/[locale]/(pages)/about"
git mv "src/app/[locale]/(pages)/projetos" "src/app/[locale]/(pages)/projects"
git mv "src/app/[locale]/(pages)/tecnologias" "src/app/[locale]/(pages)/technologies"
git mv "src/app/[locale]/(pages)/contato" "src/app/[locale]/(pages)/contact"
```

- [ ] **Step 2: Update `src/lib/navigation.ts` — rename the internal pathname keys to English**

Replace the file's `HrefValue` type and `pathnames` object:

```ts
export type HrefValue =
  '/' | '/about' | '/projects' | '/technologies' | '/contact';

export const pathnames = {
  '/': '/',
  '/about': {
    en: '/about',
    'pt-br': '/sobre',
    es: '/sobre-mi',
  },
  '/projects': {
    en: '/projects',
    'pt-br': '/projetos',
    es: '/proyectos',
  },
  '/technologies': {
    en: '/technologies',
    'pt-br': '/tecnologias',
    es: '/tecnologias',
  },
  '/contact': {
    en: '/contact',
    'pt-br': '/contato',
    es: '/contacto',
  },
} satisfies Pathnames<typeof locales>;
```

(Only the object keys and the `HrefValue` union change — every per-locale string value stays exactly as it was.)

- [ ] **Step 3: Update `NAV_ITEMS` in `src/components/organisms/sidebar.tsx`**

Change:

```tsx
const NAV_ITEMS: {
  href: HrefValue;
  labelKey: NavLabelKey;
  Icon: typeof House;
}[] = [
  { href: '/', labelKey: 'home', Icon: House },
  { href: '/sobre', labelKey: 'about', Icon: User },
  { href: '/projetos', labelKey: 'projects', Icon: Folder },
  { href: '/tecnologias', labelKey: 'technologies', Icon: Code },
  { href: '/contato', labelKey: 'contact', Icon: MessageCircle },
];
```

To:

```tsx
const NAV_ITEMS: {
  href: HrefValue;
  labelKey: NavLabelKey;
  Icon: typeof House;
}[] = [
  { href: '/', labelKey: 'home', Icon: House },
  { href: '/about', labelKey: 'about', Icon: User },
  { href: '/projects', labelKey: 'projects', Icon: Folder },
  { href: '/technologies', labelKey: 'technologies', Icon: Code },
  { href: '/contact', labelKey: 'contact', Icon: MessageCircle },
];
```

- [ ] **Step 4: Fix the now-stale route in `src/components/organisms/tests/unit/sidebar.test.tsx`**

This test mocks `usePathname` with the _internal_ href key, which is changing from `/projetos` to `/projects`. Change:

```tsx
it('highlights the active section', () => {
  usePathname.mockReturnValue('/projetos');
  renderWithProviders(<Sidebar />);

  expect(screen.getByText('Projetos').closest('a')).toHaveClass('bg-accent');
  expect(screen.getByText('Sobre').closest('a')).not.toHaveClass('bg-accent');
});
```

To:

```tsx
it('highlights the active section', () => {
  usePathname.mockReturnValue('/projects');
  renderWithProviders(<Sidebar />);

  expect(screen.getByText('Projetos').closest('a')).toHaveClass('bg-accent');
  expect(screen.getByText('Sobre').closest('a')).not.toHaveClass('bg-accent');
});
```

(Only the mocked pathname value changes — `screen.getByText('Projetos')` still finds the same rendered Portuguese label, since `NAV_LABEL` translations are unaffected by this task.)

- [ ] **Step 5: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass, including the updated `sidebar.test.tsx`.

- [ ] **Step 6: Run the full verification suite for the whole refactor**

```bash
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
```

Expected: lint clean, typecheck clean, coverage thresholds (90% lines/functions/branches/statements) still met, production build succeeds. If `pnpm build` boots a dev server for manual smoke-testing, visit `/`, `/about`/`/sobre`/`/sobre-mi` (per locale), `/projects`/`/projetos`/`/proyectos`, `/technologies`/`/tecnologias`, `/contact`/`/contato`/`/contacto` and confirm every page still renders with no console errors and the sidebar nav still highlights the active route.

Do not commit. This is the final task — once Step 6 is clean, the whole refactor is done and sits in the working tree uncommitted for the user to review.

---

## Self-Review Notes

- **Spec coverage:** atoms (Task 1), molecules (Task 2), organisms (Task 3), templates (Task 4), pages (Task 5–7), route renaming + pathnames (Task 8), shadcn/`components.json` alias (Task 1), colocated tests (all tasks), final lint/typecheck/coverage/build gate (Task 8) — every spec section maps to a task.
- **Out-of-scope guardrails respected:** no locale/i18n removal, no URL changes (only internal `pathnames` keys), no placeholder-page content implementation (Task 7 only relocates the existing markup verbatim).
- **Type consistency:** `HrefValue` (Task 8) matches the `NAV_ITEMS` hrefs (Task 8) and the `pathnames` keys (Task 8) — all three change together in the same task to avoid a broken intermediate state.
