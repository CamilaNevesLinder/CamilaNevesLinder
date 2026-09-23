# Responsive Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the one real mobile breakage in the site (the `Hero` section overflowing horizontally below ~640px) and add a mobile-first scale to the section headings and a horizontal-overflow safety net so the rest of the site stays visually stable on phones and tablets.

**Architecture:** No new components, no new dependencies, no layout restructuring — this is a Tailwind class pass over existing organisms. `Hero` gets a mobile-first flex direction (`flex-col` → `sm:flex-row`) plus a responsive scale for its 68px heading, its padding, and its profile photo. The seven other content organisms that share the same `text-[32px]`/`text-[28px]`/`text-[24px]` heading pattern (`about`, `education`, `experience`, `projects`, `project-showcase`, `tech-stack`, `contact-form`) get a matching `sm:` scale so nothing looks oversized on a 375px screen. Two social-icon rows (`sidebar`, `contact-form`) get `flex-wrap` as a defensive measure. `globals.css` gets `overflow-x-hidden` on `body` as a last-resort safety net against any future fixed-width element leaking off-screen. The rest of the site (footer, galleries, shell, forms) was surveyed and is already responsive — see the audit below.

**Tech Stack:** Next.js 16 App Router, React 19, next-intl 4, Tailwind v4 (default breakpoints: `sm` 640px / `md` 768px / `lg` 1024px), Vitest 4 + Testing Library — no new dependencies.

**Spec:** No separate spec file — this is a bounded visual fix. Design was approved in chat on 2026-09-21, based on a static-analysis audit of every organism/page under `src/components/`. Audit findings:

- **Critical:** `hero.tsx` is the only component in the whole site with a fixed 68px heading, a fixed 180px photo, and a fixed 60px card padding, none of which shrink below `sm:`. On a 375px viewport this overflows the page horizontally (no `overflow-x-hidden` exists anywhere today to contain it).
- **Medium:** seven other organisms (`about`, `education`, `experience`, `projects`, `project-showcase`, `tech-stack`, `contact-form`) use fixed 24–32px headings with no breakpoint — doesn't break layout, but is disproportionately large on a phone. Two social-icon rows (`sidebar.tsx:177`, `contact-form.tsx:159`) have no `flex-wrap`, which is fine today but fragile.
- **Already fine, no task needed:** `footer.tsx` (`flex-col sm:flex-row`, already tested), `book-gallery.tsx`/`jiujitsu-gallery.tsx` (responsive `basis-*` carousel items), `ai-process.tsx` (`sm:grid-cols-3`), `sidebar.tsx`/`main-template.tsx` shell (mobile-first, `md:` switches to desktop aside), `contact-form.tsx`'s form fields (already `flex-col`, fluid width), all `next/image` usage (fluid `object-cover` containers). The project has no custom breakpoints (`@theme` only defines colors/fonts) and no `viewport` override, so Next.js's default `width=device-width, initial-scale=1` applies — nothing to change there.

## Global Constraints

- Design tokens are a closed set (`docs/design-tokens.md`): only `cream`/`blush`/`rose`/`taupe`/`espresso` colors and the 3 existing font roles (`font-display` for the hero `<h1>` only, `font-serif` for body copy, `font-mono` for UI labels). Do not introduce a new color or font — this plan only changes `text-[…]` **sizes**, never the font family or color of any element.
- Use only the Tailwind breakpoints already in the project's vocabulary: `sm:` (640px) and `md:` (768px). Do not introduce `lg:`/`xl:` — nothing in the current design needs a third breakpoint, and adding one un-tested would go beyond this plan's scope.
- Every task must leave `pnpm typecheck` and `pnpm test:unit` passing.
- Do not commit. The project owner (camila.neves@onilearning.com.br) commits manually — this applies to every task below, no exceptions.

---

## Task 1: `Hero` — fix mobile overflow

**Files:**

- Modify: `src/components/organisms/hero.tsx`
- Test: `src/components/organisms/tests/unit/hero.test.tsx`

**Interfaces:** None — this task only changes Tailwind classes on an existing component, no props or exports change.

- [ ] **Step 1: Write the failing tests**

Append to `src/components/organisms/tests/unit/hero.test.tsx` (inside the existing `describe('Hero', () => { ... })` block, after the last `it`):

```tsx
it('stacks the text and photo on small screens and switches to a row from sm', () => {
  renderWithProviders(<Hero />);

  const heading = screen.getByText('Camila Neves Linder');
  const layoutRow = heading.closest('div')?.parentElement;
  expect(layoutRow).toHaveClass('flex-col', 'sm:flex-row');
});

it('scales the heading and tagline down on small screens', () => {
  renderWithProviders(<Hero />);

  expect(screen.getByText('Camila Neves Linder')).toHaveClass(
    'text-[40px]',
    'sm:text-[68px]',
  );
  expect(screen.getByText('desenvolvedora full stack.')).toHaveClass(
    'text-[40px]',
    'sm:text-[68px]',
  );
});

it('reduces the card padding on small screens', () => {
  renderWithProviders(<Hero />);

  const card = screen
    .getByText('Camila Neves Linder')
    .closest('[data-slot="card"]');
  expect(card).toHaveClass('p-6', 'sm:p-[60px]');
});

it('shrinks the profile photo on small screens', () => {
  renderWithProviders(<Hero />);

  const photo = screen.getByAltText('Camila Neves Linder');
  expect(photo.parentElement).toHaveClass('size-[120px]', 'sm:size-[180px]');
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test:unit src/components/organisms/tests/unit/hero.test.tsx`
Expected: 4 new FAILs — current classes are `flex` (no `flex-col`/`sm:flex-row`), `text-[68px]` (no `text-[40px]`/`sm:`), `p-[60px]` (no `p-6`/`sm:`), `size-[180px]` (no `size-[120px]`/`sm:`).

- [ ] **Step 3: Update `hero.tsx`**

In `src/components/organisms/hero.tsx`, replace:

```tsx
      <Card className="border-rose/40 bg-cream/[0.18] w-full max-w-[960px] rounded-[30px] border p-[60px] shadow-none ring-0 backdrop-blur-md">
        <div className="flex items-center justify-between gap-7">
          <div>
            <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
              Florianópolis, SC
            </p>
            <h1 className="font-display text-espresso text-[68px] font-bold leading-[0.95] tracking-tight">
              Camila Neves Linder
            </h1>
            <p className="text-rose text-[68px] font-bold italic leading-[0.95] tracking-tight">
              {t('tagline')}
            </p>
          </div>

          <div className="border-rose size-[180px] shrink-0 overflow-hidden rounded-[18px] border shadow-[0_6px_16px_color-mix(in_srgb,var(--color-espresso)_12%,transparent)]">
```

with:

```tsx
      <Card className="border-rose/40 bg-cream/[0.18] w-full max-w-[960px] rounded-[30px] border p-6 shadow-none ring-0 backdrop-blur-md sm:p-[60px]">
        <div className="flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
              Florianópolis, SC
            </p>
            <h1 className="font-display text-espresso text-[40px] font-bold leading-[0.95] tracking-tight sm:text-[68px]">
              Camila Neves Linder
            </h1>
            <p className="text-rose text-[40px] font-bold italic leading-[0.95] tracking-tight sm:text-[68px]">
              {t('tagline')}
            </p>
          </div>

          <div className="border-rose size-[120px] shrink-0 overflow-hidden rounded-[18px] border shadow-[0_6px_16px_color-mix(in_srgb,var(--color-espresso)_12%,transparent)] sm:size-[180px]">
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pnpm test:unit src/components/organisms/tests/unit/hero.test.tsx`
Expected: all PASS (including the 5 pre-existing tests, unchanged).

- [ ] **Step 5: Typecheck and full test suite**

Run: `pnpm typecheck && pnpm test:unit`
Expected: both PASS

- [ ] **Step 6: Manual check**

Run `pnpm dev`, open `http://localhost:3000` in a 375px-wide viewport (browser devtools device toolbar). Confirm: no horizontal scrollbar, name/tagline readable, photo below the text, "Ver trabalho"/"Entrar em contato" links still visible. Then check 768px and 1440px — layout should match the current desktop design (text left, photo right).

- [ ] **Step 7: Commit**

Do not commit — leave the change staged/unstaged for the project owner to review and commit.

---

## Task 2: Scale section headings down on small screens

**Files:**

- Modify: `src/components/organisms/about.tsx`
- Modify: `src/components/organisms/education.tsx`
- Modify: `src/components/organisms/experience.tsx`
- Modify: `src/components/organisms/projects.tsx`
- Modify: `src/components/organisms/project-showcase.tsx`
- Modify: `src/components/organisms/tech-stack.tsx`
- Modify: `src/components/organisms/contact-form.tsx`
- Test: `src/components/organisms/tests/unit/about.test.tsx`
- Test: `src/components/organisms/tests/unit/education.test.tsx`
- Test: `src/components/organisms/tests/unit/experience.test.tsx`
- Test: `src/components/organisms/tests/unit/projects.test.tsx`
- Test: `src/components/organisms/tests/unit/project-showcase.test.tsx`
- Test: `src/components/organisms/tests/unit/tech-stack.test.tsx`
- Test: `src/components/organisms/tests/unit/contact-form.test.tsx`

**Interfaces:** None — Tailwind class changes only, no props or exports change. Scale used everywhere: `text-[32px]` (section `h2`) → `text-[26px] sm:text-[32px]`; `text-[28px]` (item `h3`) → `text-[22px] sm:text-[28px]`; `text-[24px]` (tech-stack category `h3`) → `text-[20px] sm:text-[24px]`.

- [ ] **Step 1: Write the failing tests**

Append to `src/components/organisms/tests/unit/about.test.tsx` (inside `describe('About', ...)`):

```tsx
it('scales the section headings down on small screens', () => {
  renderWithProviders(<About />);

  expect(
    screen.getByRole('heading', { level: 2, name: 'Além da tela' }),
  ).toHaveClass('text-[26px]', 'sm:text-[32px]');
  expect(
    screen.getByRole('heading', { level: 3, name: 'Jiu-jitsu' }),
  ).toHaveClass('text-[22px]', 'sm:text-[28px]');
});
```

Append to `src/components/organisms/tests/unit/education.test.tsx` (inside `describe('Education', ...)`):

```tsx
it('scales the entry heading down on small screens', () => {
  renderWithProviders(<Education />);

  expect(
    screen.getByRole('heading', {
      level: 3,
      name: 'Análise e Desenvolvimento de Sistemas',
    }),
  ).toHaveClass('text-[22px]', 'sm:text-[28px]');
});
```

Append to `src/components/organisms/tests/unit/experience.test.tsx` (inside `describe('Experience', ...)`):

```tsx
it('scales the company heading down on small screens', () => {
  renderWithProviders(<Experience />);

  expect(
    screen.getByRole('heading', { level: 3, name: 'Onilearning' }),
  ).toHaveClass('text-[22px]', 'sm:text-[28px]');
});
```

Append to `src/components/organisms/tests/unit/projects.test.tsx` (inside `describe('Projects', ...)`):

```tsx
it('scales the project heading down on small screens', () => {
  renderWithProviders(<Projects />);

  expect(
    screen.getByRole('heading', {
      level: 3,
      name: 'App multi-instituição de ensino',
    }),
  ).toHaveClass('text-[22px]', 'sm:text-[28px]');
});
```

Append to `src/components/organisms/tests/unit/project-showcase.test.tsx` (inside `describe('ProjectShowcase', ...)`):

```tsx
it('scales the section and item headings down on small screens', () => {
  renderWithProviders(<ProjectShowcase />);

  expect(
    screen.getByRole('heading', { level: 2, name: 'O que eu já construí' }),
  ).toHaveClass('text-[26px]', 'sm:text-[32px]');
  expect(screen.getByRole('heading', { level: 3, name: 'Oniapp' })).toHaveClass(
    'text-[22px]',
    'sm:text-[28px]',
  );
});
```

Append to `src/components/organisms/tests/unit/tech-stack.test.tsx` (inside `describe('TechStack', ...)`):

```tsx
it('scales the section and category headings down on small screens', () => {
  renderWithProviders(<TechStack />);

  expect(
    screen.getByRole('heading', {
      level: 2,
      name: 'O que eu uso no dia a dia',
    }),
  ).toHaveClass('text-[26px]', 'sm:text-[32px]');
  expect(
    screen.getByRole('heading', { level: 3, name: 'Linguagens' }),
  ).toHaveClass('text-[20px]', 'sm:text-[24px]');
});
```

Append to `src/components/organisms/tests/unit/contact-form.test.tsx` (inside `describe('ContactForm', ...)`):

```tsx
it('scales the section heading down on small screens', () => {
  renderWithProviders(<ContactForm />);

  expect(
    screen.getByRole('heading', { level: 2, name: 'Vamos conversar?' }),
  ).toHaveClass('text-[26px]', 'sm:text-[32px]');
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test:unit src/components/organisms/tests/unit/about.test.tsx src/components/organisms/tests/unit/education.test.tsx src/components/organisms/tests/unit/experience.test.tsx src/components/organisms/tests/unit/projects.test.tsx src/components/organisms/tests/unit/project-showcase.test.tsx src/components/organisms/tests/unit/tech-stack.test.tsx src/components/organisms/tests/unit/contact-form.test.tsx`
Expected: 7 new FAILs — current headings have no `sm:` variant.

- [ ] **Step 3: Update the seven organisms**

In `src/components/organisms/about.tsx`, replace:

```tsx
        <h2 className="text-espresso font-serif text-[32px] font-bold">
```

with:

```tsx
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
```

and replace:

```tsx
            <h3 className="text-espresso font-serif text-[28px] font-bold">
```

with:

```tsx
            <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
```

In `src/components/organisms/education.tsx`, replace:

```tsx
            <h3 className="text-espresso font-serif text-[28px] font-bold">
```

with:

```tsx
            <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
```

In `src/components/organisms/experience.tsx`, replace:

```tsx
            <h3 className="text-espresso font-serif text-[28px] font-bold">
```

with:

```tsx
            <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
```

In `src/components/organisms/projects.tsx`, replace:

```tsx
            <h3 className="text-espresso font-serif text-[28px] font-bold">
```

with:

```tsx
            <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
```

In `src/components/organisms/project-showcase.tsx`, replace:

```tsx
        <h2 className="text-espresso font-serif text-[32px] font-bold">
```

with:

```tsx
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
```

and replace:

```tsx
              <h3 className="text-espresso font-serif text-[28px] font-bold">
```

with:

```tsx
              <h3 className="text-espresso font-serif text-[22px] font-bold sm:text-[28px]">
```

In `src/components/organisms/tech-stack.tsx`, replace:

```tsx
        <h2 className="text-espresso font-serif text-[32px] font-bold">
```

with:

```tsx
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
```

and replace:

```tsx
              <h3 className="text-espresso font-serif text-[24px] font-bold">
```

with:

```tsx
              <h3 className="text-espresso font-serif text-[20px] font-bold sm:text-[24px]">
```

In `src/components/organisms/contact-form.tsx`, replace:

```tsx
        <h2 className="text-espresso font-serif text-[32px] font-bold">
```

with:

```tsx
        <h2 className="text-espresso font-serif text-[26px] font-bold sm:text-[32px]">
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pnpm test:unit src/components/organisms/tests/unit/about.test.tsx src/components/organisms/tests/unit/education.test.tsx src/components/organisms/tests/unit/experience.test.tsx src/components/organisms/tests/unit/projects.test.tsx src/components/organisms/tests/unit/project-showcase.test.tsx src/components/organisms/tests/unit/tech-stack.test.tsx src/components/organisms/tests/unit/contact-form.test.tsx`
Expected: all PASS (including every pre-existing test in these 7 files, unchanged).

- [ ] **Step 5: Typecheck and full test suite**

Run: `pnpm typecheck && pnpm test:unit`
Expected: both PASS

- [ ] **Step 6: Commit**

Do not commit — leave the change staged/unstaged for the project owner to review and commit.

---

## Task 3: `flex-wrap` on the social-icon rows

**Files:**

- Modify: `src/components/organisms/sidebar.tsx`
- Modify: `src/components/organisms/contact-form.tsx`
- Test: `src/components/organisms/tests/unit/sidebar.test.tsx`
- Test: `src/components/organisms/tests/unit/contact-form.test.tsx`

**Interfaces:** None — Tailwind class changes only.

- [ ] **Step 1: Write the failing tests**

Append to `src/components/organisms/tests/unit/sidebar.test.tsx` (inside `describe('Sidebar', ...)`):

```tsx
it('lets the social-icon row wrap instead of overflowing', () => {
  usePathname.mockReturnValue('/');
  renderWithProviders(<Sidebar />);

  const githubLink = screen.getAllByRole('link', { name: 'GitHub' })[0];
  expect(githubLink.parentElement).toHaveClass('flex-wrap');
});
```

Append to `src/components/organisms/tests/unit/contact-form.test.tsx` (inside `describe('ContactForm', ...)`):

```tsx
it('lets the direct-contact icon row wrap instead of overflowing', () => {
  renderWithProviders(<ContactForm />);

  const githubLink = screen.getByRole('link', { name: 'GitHub' });
  expect(githubLink.parentElement).toHaveClass('flex-wrap');
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `pnpm test:unit src/components/organisms/tests/unit/sidebar.test.tsx src/components/organisms/tests/unit/contact-form.test.tsx`
Expected: 2 new FAILs — neither row has `flex-wrap` yet.

- [ ] **Step 3: Update `sidebar.tsx` and `contact-form.tsx`**

In `src/components/organisms/sidebar.tsx`, replace:

```tsx
    <div className="border-border flex items-center gap-1 border-t pt-2">
```

with:

```tsx
    <div className="border-border flex flex-wrap items-center gap-1 border-t pt-2">
```

In `src/components/organisms/contact-form.tsx`, replace:

```tsx
        <div className="flex items-center gap-3">
```

with:

```tsx
        <div className="flex flex-wrap items-center gap-3">
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `pnpm test:unit src/components/organisms/tests/unit/sidebar.test.tsx src/components/organisms/tests/unit/contact-form.test.tsx`
Expected: all PASS.

- [ ] **Step 5: Typecheck and full test suite**

Run: `pnpm typecheck && pnpm test:unit`
Expected: both PASS

- [ ] **Step 6: Commit**

Do not commit — leave the change staged/unstaged for the project owner to review and commit.

---

## Task 4: Horizontal-overflow safety net

**Files:**

- Modify: `src/app/[locale]/globals.css`

**Interfaces:** None — global CSS only, no component/test touches this file directly today.

- [ ] **Step 1: Update `globals.css`**

In `src/app/[locale]/globals.css`, inside the `@layer base { ... }` block, replace:

```css
body {
  @apply bg-background text-foreground font-serif antialiased;
}
```

with:

```css
body {
  @apply bg-background text-foreground overflow-x-hidden font-serif antialiased;
}
```

- [ ] **Step 2: Full test suite (regression check)**

Run: `pnpm typecheck && pnpm test:unit`
Expected: both PASS — this change has no unit-testable behavior (it's a CSS containment rule, not app logic), so this step only confirms Task 1–3's work still passes after touching a shared file.

- [ ] **Step 3: Manual check**

Run `pnpm dev`. At 375px, 768px, and 1440px widths, confirm there is never a horizontal scrollbar on any of the 5 pages (`/`, `/about`, `/projects`, `/technologies`, `/contact`). This rule is a safety net, not a fix — if you see any element still visibly cut off at an edge, that's a real layout bug to flag, not something this `overflow-x-hidden` line should be relied on to hide.

- [ ] **Step 4: Commit**

Do not commit — leave the change staged/unstaged for the project owner to review and commit.
