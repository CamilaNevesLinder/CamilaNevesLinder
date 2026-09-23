# Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/projects` placeholder with a real page showing one card per project worked on (name, características, technologies), sourced from real GitHub repos where accessible.

**Architecture:** Same pattern as `/about`: a new static organism (`ProjectShowcase`) rendered by a `pages/*` wrapper, driven entirely by `next-intl` translations — no server fetch. Visual language matches `Hero` (Card + Badge) and `Experience` (bullet list of topics).

**Tech Stack:** Next.js 16 App Router, React 19, next-intl 4, shadcn/ui atoms (`Card`, `Badge`), Tailwind v4, Vitest 4 + Testing Library.

**Spec:** `docs/plans/2026-09-16-projects-page-design.md`

## Global Constraints

- No server fetch — all content is static via `next-intl`, same as `Experience`/`Education`.
- Grid layout: 1 column on mobile, 2 columns on desktop (`grid-cols-1 md:grid-cols-2`).
- New translation namespace `projectsPage` — never reuse `projects.*` (that's the home teaser, out of scope, untouched).
- Content for `ritmar` and `minceJoias` items is sourced only from the existing `experience.items.{ritmar,minceJoias}` copy — no invented technical detail beyond what's already on the site.
- EN/ES translations are translations of the approved pt-br copy, not new content decisions.
- Every task must leave `pnpm typecheck` and `pnpm test:unit` passing.

---

## Task 1: `ProjectShowcase` organism + pt-br content

**Files:**

- Create: `src/components/organisms/project-showcase.tsx`
- Create: `src/components/organisms/tests/unit/project-showcase.test.tsx`
- Modify: `messages/pt-br.json`

**Interfaces:**

- Produces: `ProjectShowcase` (named export, no props) from `@/components/organisms/project-showcase`. Task 3 consumes it.
- Consumes: `Card` from `@/components/atoms/card`, `Badge` from `@/components/atoms/badge` (both already exist).

- [ ] **Step 1: Write the failing test**

Create `src/components/organisms/tests/unit/project-showcase.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ProjectShowcase } from '@/components/organisms/project-showcase';

describe('ProjectShowcase', () => {
  it('renders every project title in order', () => {
    renderWithProviders(<ProjectShowcase />);

    const titles = screen.getAllByRole('heading', { level: 3 });
    expect(titles.map((t) => t.textContent)).toEqual([
      'Oniapp',
      'Oniapp Admin',
      'Seja',
      'Seja Admin',
      'Praça 22',
      'Ritmar',
      'Mince Joias',
    ]);
  });

  it('renders features and tech stack for a project', () => {
    renderWithProviders(<ProjectShowcase />);

    expect(
      screen.getByText(
        'Integração completa com Moodle: notas, calendário, caderno de anotações e cursos direto no app',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Expo Router')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/organisms/tests/unit/project-showcase.test.tsx
```

Expected: FAIL with a module-not-found error for `@/components/organisms/project-showcase`.

- [ ] **Step 3: Add the `projectsPage` namespace to `messages/pt-br.json`**

Change:

```json
        "english": {
          "title": "Inglês",
          "description": "Entendo e leio bem; minha maior dificuldade é pronúncia, trabalho isso com o curso do Mario Vergara e o Duolingo."
        }
      }
    }
  },
  "nav": {
```

To:

```json
        "english": {
          "title": "Inglês",
          "description": "Entendo e leio bem; minha maior dificuldade é pronúncia, trabalho isso com o curso do Mario Vergara e o Duolingo."
        }
      }
    }
  },
  "projectsPage": {
    "label": "Projetos",
    "heading": "O que eu já construí",
    "items": {
      "oniapp": {
        "title": "Oniapp",
        "features": [
          "Um único código-fonte gera apps distintos por instituição de ensino, cada um com bundle ID, tema, ícone e URL do Moodle próprios",
          "Configuração em duas camadas: tema e features ativam/desativam via JSON remoto sem precisar rebuild, enquanto nome, ícone e deep link exigem build novo",
          "Integração completa com Moodle: notas, calendário, caderno de anotações e cursos direto no app",
          "Atualização automática (OTA) via EAS a cada push, em produção e ambiente de teste"
        ],
        "stack": ["React Native", "Expo", "Expo Router", "NativeWind", "TanStack Query", "Zustand", "TypeScript"]
      },
      "oniappAdmin": {
        "title": "Oniapp Admin",
        "features": [
          "Painel web onde cada instituição de ensino gerencia conteúdo e usuários do app",
          "Busca e cache de dados com TanStack Query, formulários validados com Zod e React Hook Form",
          "Interface construída com shadcn/ui e Radix UI, consistente com o resto do produto"
        ],
        "stack": ["Next.js", "TanStack Query", "Zustand", "Radix UI", "shadcn/ui", "Zod"]
      },
      "seja": {
        "title": "Seja",
        "features": [
          "App de bem-estar com posts de foto e áudio em comunidades, diário pessoal e agenda de hobbies e tarefas",
          "Login social via Google, Apple e Firebase, com autenticação por JWT e refresh token",
          "Notificações push e conteúdo localizado em múltiplos idiomas com i18next",
          "Calendário de hábitos e seletor de cor de tema construídos com bibliotecas nativas de gestos e animação"
        ],
        "stack": ["React Native", "Expo", "NativeWind", "TanStack Query", "Zustand", "Firebase Auth", "i18next"]
      },
      "sejaAdmin": {
        "title": "Seja Admin",
        "features": [
          "Painel de moderação de denúncias e gestão de usuários da comunidade",
          "Mesma base técnica do Oniapp Admin (Next.js, TanStack Query), com componentes Base UI/shadcn"
        ],
        "stack": ["Next.js", "TanStack Query", "Radix UI", "shadcn/ui", "Zod"]
      },
      "praca22": {
        "title": "Praça 22",
        "features": [
          "Site institucional construído do zero até a publicação, com seções de apresentação, professores e catálogo de instrumentos",
          "Animações com Framer Motion e componentes acessíveis com Radix UI",
          "Contato integrado com mapa incorporado e link direto pro WhatsApp"
        ],
        "stack": ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Framer Motion", "Radix UI"]
      },
      "ritmar": {
        "title": "Ritmar",
        "features": [
          "Plataforma de gestão multi-tenant para academias: cada uma com seus próprios dados e configurações isolados",
          "Cobrança de mensalidades com renovação automática de assinaturas via Mercado Pago e Asaas",
          "Testes automatizados e pipeline de integração contínua no GitHub Actions"
        ],
        "stack": ["NestJS", "Next.js", "React"]
      },
      "minceJoias": {
        "title": "Mince Joias",
        "features": [
          "Loja de joias online com catálogo, carrinho e checkout completo",
          "Painel administrativo onde a dona da loja atualiza produtos e acompanha pedidos",
          "Layout responsivo testado em diferentes tamanhos de tela"
        ],
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "nav": {
```

- [ ] **Step 4: Create `src/components/organisms/project-showcase.tsx`**

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/atoms/card';
import { Badge } from '@/components/atoms/badge';

const PROJECT_KEYS = [
  'oniapp',
  'oniappAdmin',
  'seja',
  'sejaAdmin',
  'praca22',
  'ritmar',
  'minceJoias',
] as const;

export function ProjectShowcase() {
  const t = useTranslations('projectsPage');

  return (
    <section className="bg-cream flex justify-center px-6 py-16">
      <div className="w-full max-w-[960px]">
        <p className="text-taupe mb-[18px] font-mono text-sm uppercase tracking-wide">
          {t('label')}
        </p>
        <h2 className="text-espresso font-serif text-[32px] font-bold">
          {t('heading')}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECT_KEYS.map((key) => {
            const features = t.raw(`items.${key}.features`) as string[];
            const stack = t.raw(`items.${key}.stack`) as string[];

            return (
              <Card
                key={key}
                className="border-rose/40 bg-cream/[0.18] rounded-[20px] border p-8 shadow-none ring-0"
              >
                <h3 className="text-espresso font-serif text-[24px] font-bold">
                  {t(`items.${key}.title`)}
                </h3>
                <ul className="text-taupe mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed">
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <Badge
                      key={tech}
                      className="bg-rose/[0.32] text-espresso h-auto rounded-[3px] px-3 py-1 font-mono text-xs uppercase tracking-wide"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/components/organisms/tests/unit/project-showcase.test.tsx
```

Expected: PASS (2/2).

- [ ] **Step 6: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass.

Do not commit — the project owner commits manually.

---

## Task 2: EN/ES translations

**Files:**

- Modify: `messages/en.json`
- Modify: `messages/es.json`

**Interfaces:**

- No new exports. Pure content addition — `ProjectShowcase` (Task 1) already reads `projectsPage.*` generically via `t()`/`t.raw()`, so it works against any locale once the keys exist.

This is translation of the pt-br copy added in Task 1, not new content — same shape, same 7 keys, same array lengths per item.

- [ ] **Step 1: Add `projectsPage` to `messages/en.json`**

Change:

```json
        "english": {
          "title": "English",
          "description": "I understand and read well; pronunciation is my biggest challenge, which I work on with Mario Vergara's course and Duolingo."
        }
      }
    }
  },
  "nav": {
```

To:

```json
        "english": {
          "title": "English",
          "description": "I understand and read well; pronunciation is my biggest challenge, which I work on with Mario Vergara's course and Duolingo."
        }
      }
    }
  },
  "projectsPage": {
    "label": "Projects",
    "heading": "What I've built",
    "items": {
      "oniapp": {
        "title": "Oniapp",
        "features": [
          "A single codebase generates a different app per school, each with its own bundle ID, theme, icon, and Moodle URL",
          "Two-layer configuration: theme and features toggle via a remote JSON with no rebuild needed, while name, icon, and deep links require a new build",
          "Full Moodle integration: grades, calendar, notebook, and courses right inside the app",
          "Automatic OTA updates via EAS on every push, in both production and preview"
        ],
        "stack": ["React Native", "Expo", "Expo Router", "NativeWind", "TanStack Query", "Zustand", "TypeScript"]
      },
      "oniappAdmin": {
        "title": "Oniapp Admin",
        "features": [
          "Web panel where each school manages the app's content and users",
          "Data fetching and caching with TanStack Query, forms validated with Zod and React Hook Form",
          "UI built with shadcn/ui and Radix UI, consistent with the rest of the product"
        ],
        "stack": ["Next.js", "TanStack Query", "Zustand", "Radix UI", "shadcn/ui", "Zod"]
      },
      "seja": {
        "title": "Seja",
        "features": [
          "Wellness app with photo and audio posts in communities, a personal journal, and a hobby/task schedule",
          "Social login via Google, Apple, and Firebase, with JWT authentication and refresh tokens",
          "Push notifications and localized content in multiple languages with i18next",
          "Habit calendar and theme color picker built with native gesture and animation libraries"
        ],
        "stack": ["React Native", "Expo", "NativeWind", "TanStack Query", "Zustand", "Firebase Auth", "i18next"]
      },
      "sejaAdmin": {
        "title": "Seja Admin",
        "features": [
          "Moderation panel for reports and community user management",
          "Same technical base as Oniapp Admin (Next.js, TanStack Query), with Base UI/shadcn components"
        ],
        "stack": ["Next.js", "TanStack Query", "Radix UI", "shadcn/ui", "Zod"]
      },
      "praca22": {
        "title": "Praça 22",
        "features": [
          "Institutional site built from scratch through launch, with intro, teacher, and instrument catalog sections",
          "Animations with Framer Motion and accessible components with Radix UI",
          "Contact section with an embedded map and a direct WhatsApp link"
        ],
        "stack": ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Framer Motion", "Radix UI"]
      },
      "ritmar": {
        "title": "Ritmar",
        "features": [
          "Multi-tenant management platform for gyms: each one with its own isolated data and settings",
          "Membership billing with automatic subscription renewal via Mercado Pago and Asaas",
          "Automated tests and a continuous integration pipeline on GitHub Actions"
        ],
        "stack": ["NestJS", "Next.js", "React"]
      },
      "minceJoias": {
        "title": "Mince Joias",
        "features": [
          "Online jewelry store with a full catalog, cart, and checkout",
          "Admin panel where the store owner updates products and tracks orders",
          "Responsive layout tested across different screen sizes"
        ],
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "nav": {
```

- [ ] **Step 2: Add `projectsPage` to `messages/es.json`**

Change:

```json
        "english": {
          "title": "Inglés",
          "description": "Entiendo y leo bien; mi mayor dificultad es la pronunciación, la trabajo con el curso de Mario Vergara y Duolingo."
        }
      }
    }
  },
  "nav": {
```

To:

```json
        "english": {
          "title": "Inglés",
          "description": "Entiendo y leo bien; mi mayor dificultad es la pronunciación, la trabajo con el curso de Mario Vergara y Duolingo."
        }
      }
    }
  },
  "projectsPage": {
    "label": "Proyectos",
    "heading": "Lo que ya construí",
    "items": {
      "oniapp": {
        "title": "Oniapp",
        "features": [
          "Un único código genera apps distintas por institución educativa, cada una con su propio bundle ID, tema, ícono y URL de Moodle",
          "Configuración en dos capas: tema y funciones se activan vía JSON remoto sin necesidad de rebuild, mientras que nombre, ícono y deep link exigen una nueva build",
          "Integración completa con Moodle: notas, calendario, cuaderno de apuntes y cursos dentro de la app",
          "Actualización automática (OTA) vía EAS en cada push, en producción y en entorno de pruebas"
        ],
        "stack": ["React Native", "Expo", "Expo Router", "NativeWind", "TanStack Query", "Zustand", "TypeScript"]
      },
      "oniappAdmin": {
        "title": "Oniapp Admin",
        "features": [
          "Panel web donde cada institución gestiona el contenido y los usuarios de la app",
          "Búsqueda y caché de datos con TanStack Query, formularios validados con Zod y React Hook Form",
          "Interfaz construida con shadcn/ui y Radix UI, consistente con el resto del producto"
        ],
        "stack": ["Next.js", "TanStack Query", "Zustand", "Radix UI", "shadcn/ui", "Zod"]
      },
      "seja": {
        "title": "Seja",
        "features": [
          "App de bienestar con publicaciones de foto y audio en comunidades, diario personal y agenda de hobbies y tareas",
          "Inicio de sesión social vía Google, Apple y Firebase, con autenticación JWT y refresh token",
          "Notificaciones push y contenido localizado en varios idiomas con i18next",
          "Calendario de hábitos y selector de color de tema construidos con librerías nativas de gestos y animación"
        ],
        "stack": ["React Native", "Expo", "NativeWind", "TanStack Query", "Zustand", "Firebase Auth", "i18next"]
      },
      "sejaAdmin": {
        "title": "Seja Admin",
        "features": [
          "Panel de moderación de denuncias y gestión de usuarios de la comunidad",
          "Misma base técnica que Oniapp Admin (Next.js, TanStack Query), con componentes Base UI/shadcn"
        ],
        "stack": ["Next.js", "TanStack Query", "Radix UI", "shadcn/ui", "Zod"]
      },
      "praca22": {
        "title": "Praça 22",
        "features": [
          "Sitio institucional construido desde cero hasta la publicación, con secciones de presentación, profesores y catálogo de instrumentos",
          "Animaciones con Framer Motion y componentes accesibles con Radix UI",
          "Contacto integrado con mapa incorporado y enlace directo a WhatsApp"
        ],
        "stack": ["React 19", "TypeScript", "Vite", "Tailwind CSS 4", "Framer Motion", "Radix UI"]
      },
      "ritmar": {
        "title": "Ritmar",
        "features": [
          "Plataforma de gestión multi-tenant para gimnasios: cada uno con sus propios datos y configuraciones aislados",
          "Cobro de mensualidades con renovación automática de suscripciones vía Mercado Pago y Asaas",
          "Pruebas automatizadas y pipeline de integración continua en GitHub Actions"
        ],
        "stack": ["NestJS", "Next.js", "React"]
      },
      "minceJoias": {
        "title": "Mince Joias",
        "features": [
          "Tienda de joyas online con catálogo, carrito y checkout completo",
          "Panel administrativo donde la dueña de la tienda actualiza productos y sigue los pedidos",
          "Diseño responsive probado en diferentes tamaños de pantalla"
        ],
        "stack": ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "AWS"]
      }
    }
  },
  "nav": {
```

- [ ] **Step 3: Typecheck and run the full unit suite**

```bash
pnpm typecheck
pnpm test:unit
```

Expected: no errors, all tests pass (Task 1's tests only assert pt-br content, so this step is a safety check that the JSON is still valid — no test currently exercises en/es strings).

Do not commit.

---

## Task 3: Wire `ProjectsPage` to `ProjectShowcase`

**Files:**

- Modify: `src/components/pages/projects-page.tsx`
- Modify: `src/components/pages/tests/unit/projects-page.test.tsx`

**Interfaces:**

- Consumes: `ProjectShowcase` from `@/components/organisms/project-showcase` (Task 1).

`src/app/[locale]/(pages)/projects/page.tsx` needs no change — it already just renders `<ProjectsPage />`.

- [ ] **Step 1: Write the failing test**

Replace `src/components/pages/tests/unit/projects-page.test.tsx` with:

```tsx
import { describe, expect, it } from 'vitest';
import { screen, renderWithProviders } from '@/tests/utils/render';
import { ProjectsPage } from '@/components/pages/projects-page';

describe('ProjectsPage', () => {
  it('renders the project showcase', () => {
    renderWithProviders(<ProjectsPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'O que eu já construí' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 3, name: 'Oniapp' }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/components/pages/tests/unit/projects-page.test.tsx
```

Expected: FAIL — the current `ProjectsPage` renders the "Conteúdo em breve." placeholder, not the heading "O que eu já construí".

- [ ] **Step 3: Replace `src/components/pages/projects-page.tsx`**

```tsx
import { ProjectShowcase } from '@/components/organisms/project-showcase';

export function ProjectsPage() {
  return <ProjectShowcase />;
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/components/pages/tests/unit/projects-page.test.tsx
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

Expected: lint clean (aside from the pre-existing `main-template.test.tsx` prettier warning, unrelated to this work), typecheck clean, all tests passing, production build succeeds. Coverage threshold may still show the pre-existing shortfall documented in the atomic-design refactor plan (unrelated shadcn primitives) — do not attempt to fix that here, it's out of scope.

- [ ] **Step 2: Manual smoke check**

Boot the dev server and visit `/projects` (and its `/en/projects`, `/es/proyectos` variants) to confirm all 7 cards render with correct title, bullets, and stack badges, and the grid collapses to 1 column on a narrow viewport.

Do not commit — the project owner commits manually.

## Self-Review Notes

- **Spec coverage:** all 7 projects (Task 1 pt-br content), EN/ES translation (Task 2), page wiring (Task 3), verification (Task 4) — every spec section maps to a task.
- **Out-of-scope guardrails respected:** home teaser (`projects.*`) untouched, no invented technical detail for Ritmar/Mince Joias beyond the existing Experience copy, no screenshots/images added.
- **Type consistency:** `PROJECT_KEYS` in `project-showcase.tsx` (Task 1) matches the 7 keys used in all three `messages/*.json` files (Tasks 1-2) exactly, same order.
