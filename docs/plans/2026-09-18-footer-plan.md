# Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a site-wide footer (name, tagline, social icons, copyright) that renders under the page content on every route.

**Architecture:** A new server-rendered organism (`Footer`) reuses the existing `SOCIAL_LINKS` constant and social icon set already used by `Sidebar`, and pulls copy from a new `footer` i18n namespace. `MainTemplate` wires it in as a landmark sibling of `<main>` (not nested inside it, so the `<footer>` and `<main>` landmarks stay distinct for assistive tech), inside the same `md:pl-60` content column the sidebar already reserves.

**Tech Stack:** Next.js 16 App Router, React 19, next-intl 4, Tailwind v4, Vitest 4 + Testing Library — no new dependencies.

**Spec:** No separate spec file — this is a bounded change (new component following existing `Sidebar`/`SOCIAL_LINKS`/i18n patterns, no new subsystem). Design was approved in chat on 2026-09-18: footer content = name + tagline + social icons + copyright, shown on every page via `MainTemplate`.

## Global Constraints

- Design tokens are a closed set (`docs/design-tokens.md`): only `cream`/`blush`/`rose`/`taupe`/`espresso` color tokens and shadcn semantic tokens, and only the 3 existing font roles (`font-display` for the hero `<h1>` only, `font-serif` for body copy, `font-mono` for UI labels/tags). Do not introduce a new color or font.
- Reuse `SOCIAL_LINKS` from `@/lib/site` and the existing icon components from `@/components/atoms/icons/social-icons` — do not duplicate URLs or redraw icons.
- Any component importing `@/lib/site` (directly or transitively) needs `@/lib/navigation` mocked in its test — that module calls `next-intl`'s `createNavigation()` at eval time, which breaks unmocked under Vitest/jsdom (see `src/components/organisms/tests/unit/contact-form.test.tsx` and `src/components/organisms/tests/unit/sidebar.test.tsx` for the exact mock shape).
- Every task must leave `pnpm typecheck` and `pnpm test:unit` passing.
- Do not commit. The project owner (camila.neves@onilearning.com.br) commits manually — this applies to every task below, no exceptions.

---

## Task 1: `footer` i18n messages

**Files:**

- Modify: `messages/pt-br.json`
- Modify: `messages/en.json`
- Modify: `messages/es.json`
- Test: `src/tests/unit/messages-footer.test.ts`

**Interfaces:**

- Produces (consumed by Task 2): a top-level `footer` namespace in every locale file, with keys `tagline: string` and `rights: string` (the latter containing a literal `{year}` ICU placeholder).

- [ ] **Step 1: Write the failing test**

Create `src/tests/unit/messages-footer.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import ptBr from '../../../messages/pt-br.json';
import en from '../../../messages/en.json';
import es from '../../../messages/es.json';

const FOOTER_KEYS = ['tagline', 'rights'];

describe('footer message parity', () => {
  it('has the same keys across all locales', () => {
    expect(Object.keys(ptBr.footer)).toEqual(FOOTER_KEYS);
    expect(Object.keys(en.footer)).toEqual(FOOTER_KEYS);
    expect(Object.keys(es.footer)).toEqual(FOOTER_KEYS);
  });

  it('includes a {year} placeholder in the rights string for every locale', () => {
    expect(ptBr.footer.rights).toContain('{year}');
    expect(en.footer.rights).toContain('{year}');
    expect(es.footer.rights).toContain('{year}');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test:unit src/tests/unit/messages-footer.test.ts`
Expected: FAIL — `Cannot read properties of undefined (reading 'tagline')` (no `footer` key yet).

- [ ] **Step 3: Add the `footer` namespace to `messages/pt-br.json`**

Find the tail of the file:

```json
    "settings": {
      "label": "Configurações",
      "language": "Idioma",
      "darkMode": "Modo escuro"
    }
  }
}
```

Replace with:

```json
    "settings": {
      "label": "Configurações",
      "language": "Idioma",
      "darkMode": "Modo escuro"
    }
  },
  "footer": {
    "tagline": "Desenvolvedora front-end apaixonada por criar experiências simples e bem cuidadas.",
    "rights": "© {year} Camila Neves Linder. Todos os direitos reservados."
  }
}
```

- [ ] **Step 4: Add the `footer` namespace to `messages/en.json`**

Find the tail of the file:

```json
    "settings": {
      "label": "Settings",
      "language": "Language",
      "darkMode": "Dark mode"
    }
  }
}
```

Replace with:

```json
    "settings": {
      "label": "Settings",
      "language": "Language",
      "darkMode": "Dark mode"
    }
  },
  "footer": {
    "tagline": "Front-end developer who loves building simple, well-crafted experiences.",
    "rights": "© {year} Camila Neves Linder. All rights reserved."
  }
}
```

- [ ] **Step 5: Add the `footer` namespace to `messages/es.json`**

Find the tail of the file:

```json
    "settings": {
      "label": "Configuración",
      "language": "Idioma",
      "darkMode": "Modo oscuro"
    }
  }
}
```

Replace with:

```json
    "settings": {
      "label": "Configuración",
      "language": "Idioma",
      "darkMode": "Modo oscuro"
    }
  },
  "footer": {
    "tagline": "Desarrolladora front-end apasionada por crear experiencias simples y cuidadas.",
    "rights": "© {year} Camila Neves Linder. Todos los derechos reservados."
  }
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `pnpm test:unit src/tests/unit/messages-footer.test.ts`
Expected: PASS

- [ ] **Step 7: Typecheck and full test suite**

Run: `pnpm typecheck && pnpm test:unit`
Expected: both PASS

- [ ] **Step 8: Commit**

Do not commit — leave the change staged/unstaged for the project owner to review and commit.

---

## Task 2: `Footer` organism

**Files:**

- Create: `src/components/organisms/footer.tsx`
- Test: `src/components/organisms/tests/unit/footer.test.tsx`

**Interfaces:**

- Consumes: `SOCIAL_LINKS` from `@/lib/site`; `GithubIcon`, `LinkedinIcon`, `InstagramIcon` from `@/components/atoms/icons/social-icons`; `buttonVariants` from `@/components/atoms/button`; the `footer.tagline`/`footer.rights` messages and `nav.shortName`/`nav.social.*` messages from Task 1.
- Produces (consumed by Task 3): `Footer` — a prop-less component exported from `@/components/organisms/footer`.

- [ ] **Step 1: Write the failing test**

Create `src/components/organisms/tests/unit/footer.test.tsx`:

```tsx
import { describe, expect, it, vi } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { Footer } from '@/components/organisms/footer';

// `Footer` imports `SOCIAL_LINKS` from `@/lib/site`, which imports
// `@/lib/navigation` and calls next-intl's `createNavigation()` at
// module-eval time. That eagerly resolves `next/navigation` in a way
// this Vitest/jsdom setup can't handle unmocked (see
// `src/components/organisms/tests/unit/contact-form.test.tsx` and
// `src/components/organisms/tests/unit/sidebar.test.tsx`, which hit the
// same chain and mock it the same way).
vi.mock('@/lib/navigation', () => ({
  routing: {
    locales: ['en', 'pt-br', 'es'],
    defaultLocale: 'pt-br',
    localePrefix: 'as-needed',
  },
}));

describe('Footer', () => {
  it('renders the name, tagline, and copyright with the current year', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByText('Camila Linder')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Desenvolvedora front-end apaixonada por criar experiências simples e bem cuidadas.',
      ),
    ).toBeInTheDocument();

    const year = new Date().getFullYear();
    expect(
      screen.getByText(
        `© ${year} Camila Neves Linder. Todos os direitos reservados.`,
      ),
    ).toBeInTheDocument();
  });

  it('renders links to every social channel', () => {
    renderWithProviders(<Footer />);

    expect(screen.getByLabelText('E-mail')).toHaveAttribute(
      'href',
      'mailto:camilaneveslindner@gmail.com',
    );
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/CamilaNevesLinder',
    );
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/camila-neves-linder-76a342403/',
    );
    expect(screen.getByLabelText('Instagram')).toHaveAttribute(
      'href',
      'https://www.instagram.com/camila.nevees/',
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test:unit src/components/organisms/tests/unit/footer.test.tsx`
Expected: FAIL — `Cannot find module '@/components/organisms/footer'`.

- [ ] **Step 3: Write the minimal implementation**

Create `src/components/organisms/footer.tsx`:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { Mail } from 'lucide-react';
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from '@/components/atoms/icons/social-icons';
import { buttonVariants } from '@/components/atoms/button';
import { SOCIAL_LINKS } from '@/lib/site';

const SOCIAL_LINK_CLASSNAME = buttonVariants({
  variant: 'ghost',
  size: 'icon',
});

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-cream border-t px-6 py-10">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-3 text-center">
        <p className="text-espresso font-serif text-lg font-bold">
          {tNav('shortName')}
        </p>
        <p className="text-taupe max-w-md text-sm leading-relaxed">
          {t('tagline')}
        </p>
        <div className="flex items-center gap-1">
          <a
            href={SOCIAL_LINKS.email}
            aria-label={tNav('social.email')}
            className={SOCIAL_LINK_CLASSNAME}
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.github')}
            className={SOCIAL_LINK_CLASSNAME}
          >
            <GithubIcon size={18} aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.linkedin')}
            className={SOCIAL_LINK_CLASSNAME}
          >
            <LinkedinIcon size={18} aria-hidden="true" />
          </a>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={tNav('social.instagram')}
            className={SOCIAL_LINK_CLASSNAME}
          >
            <InstagramIcon size={18} aria-hidden="true" />
          </a>
        </div>
        <p className="text-taupe font-mono text-xs uppercase tracking-wide">
          {t('rights', { year })}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test:unit src/components/organisms/tests/unit/footer.test.tsx`
Expected: PASS

- [ ] **Step 5: Typecheck and full test suite**

Run: `pnpm typecheck && pnpm test:unit`
Expected: both PASS

- [ ] **Step 6: Commit**

Do not commit — leave the change staged/unstaged for the project owner to review and commit.

---

## Task 3: Wire `Footer` into `MainTemplate`

**Files:**

- Modify: `src/components/templates/main-template.tsx`
- Modify: `src/components/templates/tests/unit/main-template.test.tsx`

**Interfaces:**

- Consumes: `Footer` from `@/components/organisms/footer` (Task 2).

**Note:** this task also moves the `md:pl-60`/`pt-14`/`md:pt-0` classes from `<main>` to a new wrapping `<div>` that contains both `<main>` and `<footer>`. This keeps `<footer>` and `<main>` as sibling landmarks (a `<footer>` nested inside `<main>` is a known accessibility anti-pattern — `<main>` should hold only the page's primary content) while still reserving the sidebar's column width for both.

- [ ] **Step 1: Write the failing test**

Read the current `src/components/templates/tests/unit/main-template.test.tsx` — it asserts `content.closest('main')` carries the layout classes. Replace its `it` blocks with:

```tsx
describe('MainTemplate', () => {
  it('renders the sidebar and the page content', () => {
    renderWithProviders(
      <MainTemplate>
        <p>page content</p>
      </MainTemplate>,
    );

    expect(screen.getAllByText('Camila Linder')).toHaveLength(2);
    const content = screen.getByText('page content');
    expect(content).toBeInTheDocument();
    expect(content.closest('div')).toHaveClass('pt-14', 'md:pl-60', 'md:pt-0');
  });

  it('renders the footer after the page content', () => {
    renderWithProviders(
      <MainTemplate>
        <p>page content</p>
      </MainTemplate>,
    );

    expect(
      screen.getByText(
        'Desenvolvedora front-end apaixonada por criar experiências simples e bem cuidadas.',
      ),
    ).toBeInTheDocument();
  });
});
```

Keep the file's existing `vi.mock('@/lib/navigation', ...)` block as-is (it already covers what `Footer` needs — see the Global Constraints note).

- [ ] **Step 2: Run the test to verify it fails**

Run: `pnpm test:unit src/components/templates/tests/unit/main-template.test.tsx`
Expected: FAIL — first `it` fails because `<main>` still carries the classes, not the wrapping `div`; second `it` fails because the tagline text isn't rendered yet.

- [ ] **Step 3: Update `MainTemplate`**

Replace the full contents of `src/components/templates/main-template.tsx`:

```tsx
import { Sidebar } from '@/components/organisms/sidebar';
import { Footer } from '@/components/organisms/footer';

export function MainTemplate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="pt-14 md:pl-60 md:pt-0">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `pnpm test:unit src/components/templates/tests/unit/main-template.test.tsx`
Expected: PASS

- [ ] **Step 5: Typecheck and full test suite**

Run: `pnpm typecheck && pnpm test:unit`
Expected: both PASS

- [ ] **Step 6: Commit**

Do not commit — leave the change staged/unstaged for the project owner to review and commit.
