# Design Tokens — Fontes e Cores

Fonte da verdade: `src/app/[locale]/globals.css` (`@theme` block) + `src/app/[locale]/layout.tsx` (instância das Google Fonts).

**Regra:** este conjunto é fechado. Nenhuma fonte ou cor nova deve ser adicionada ao projeto sem pedido explícito. Qualquer novo componente/página deve reutilizar só o que está listado abaixo.

## Fontes

| Token CSS        | Fonte                              | Peso           | Uso                                          |
| ---------------- | ---------------------------------- | -------------- | -------------------------------------------- |
| `--font-display` | Playfair Display                   | 400/600/700, itálico | Títulos: hero, títulos de seção, nomes       |
| `--font-sans`    | Figtree                            | 400/500/600    | Corpo de texto (padrão do body) e botões     |
| `--font-mono`    | JetBrains Mono                     | padrão         | UI: eyebrows numerados, labels, tags, chips  |
| `--font-hand`    | Caveat                             | 500/600        | Só notas curtas "à mão" (ex.: "oi, prazer!") |
| `--font-serif`   | Georgia (fallback, não é web font) | —              | Legado, não usar em componente novo          |

Cada fonte tem um papel fixo — não trocar fonte de um elemento pra outra família sem instrução explícita, e não introduzir outra família. Figtree e Caveat aprovadas em 2026-11-18 no redesign v2 (`docs/redesign/`).

## Paleta de cores

| Token CSS          | Hex       | Uso                               |
| ------------------ | --------- | --------------------------------- |
| `--color-cream`    | `#fbf7f4` | Fundo (background)                |
| `--color-blush`    | `#e8d8ce` | Reservada — tom claro da paleta   |
| `--color-rose`     | `#b98f88` | Destaque, itálico, bordas, accent |
| `--color-taupe`    | `#7a6258` | Texto secundário/labels           |
| `--color-espresso` | `#3b2f2a` | Texto principal, alto contraste   |

Extensão aprovada em 2026-11-18 (redesign v2):

| Token CSS              | Claro     | Escuro    | Uso                                              |
| ---------------------- | --------- | --------- | ------------------------------------------------ |
| `--color-paper`        | `#fffdfb` | `#241b17` | Superfície de card, barra flutuante              |
| `--color-sand`         | `#f2e4dd` | `#33271f` | Fundo de ícone, hover de nav                     |
| `--color-sand-light`   | `#f7efea` | `#271e1a` | Hover de linha/lista                             |
| `--color-line`         | `#ead9d0` | `#3b2e28` | Borda padrão                                     |
| `--color-line-strong`  | `#e2cfc5` | `#4a3a33` | Borda de chip, campo, seta                       |
| `--color-body`         | `#4a3b35` | `#e6d8d0` | Texto corrido                                    |
| `--color-mocha`        | `#6b5850` | `#c9b3a7` | Texto de apoio, chips                            |
| `--color-clay`         | `#a87169` | `#dcb0a6` | Accent forte (itálico de título, ativo) — AA     |
| `--color-clay-deep`    | `#8a5f58` | `#d0a59c` | Eyebrow, links, ícones                           |
| `--color-dusty`        | `#c9a29a` | `#8a6a62` | Decoração: tracejado, sublinhado, borda aberta   |
| `--color-band`         | `#f3e7e0` | `#241b17` | Faixas de CTA                                    |
| `--color-lilac`        | `#8f7a99` | igual     | Identidade do projeto Seja                       |
| `--color-olive`        | `#8c8f74` | igual     | Identidade do projeto Ritmar                     |
| `--color-ochre`        | `#c09a6b` | igual     | Identidade do projeto Praça 22                   |

Variáveis auxiliares (não são cores de paleta): `--shadow-color` (sombras), `--grain-blend` e `--grain-opacity` (textura de papel).

Paleta suave, tons terrosos/rosados — estética minimalista e feminina. Nenhuma cor fora dessa tabela (incluindo tons de cinza puro, azul, preto puro etc.) deve entrar no projeto sem autorização.

## Paleta de cores — modo escuro

Mesma identidade de cor, papel de luminosidade invertido. Os nomes dos tokens continuam os mesmos (`bg-cream`, `text-espresso`...) — só o valor muda dentro da classe `.dark`, nenhum componente precisa saber que dark mode existe.

| Token CSS          | Hex (dark) | Uso                                                       |
| ------------------ | ---------- | --------------------------------------------------------- |
| `--color-cream`    | `#1c1512`  | Fundo (background)                                        |
| `--color-blush`    | `#2a201c`  | Superfície secundária                                     |
| `--color-rose`     | `#c9a29a`  | Destaque, itálico, bordas, accent (clareado p/ contraste) |
| `--color-taupe`    | `#c2ab9e`  | Texto secundário/labels                                   |
| `--color-espresso` | `#f5ece7`  | Texto principal, alto contraste                           |

Aprovado em 2026-09-14 junto com o toggle de modo escuro na sidebar. Mesma regra de conjunto fechado se aplica aqui.

## shadcn/ui

Projeto usa shadcn/ui (`components.json`, estilo `base-nova`, primitivos `@base-ui/react`) pra todo componente interativo/estrutural: `Button`, `Card`, `Badge`, `Popover`, `Sheet`, `Switch`, `Separator`. Componentes seguem Atomic Design: primitivos simples ficam em `src/components/atoms/` (aliased em `components.json` como `ui`), compostos (`Carousel`, `Popover`, `Sheet`, `NavigationMenu`) ficam em `src/components/molecules/` — gerados pela CLI (evitar editar à mão, prefira `npx shadcn@latest add <nome>` ou `diff`).

A CLI sempre gera componentes novos em `src/components/atoms/` (é o que o alias `ui` do `components.json` aponta). Se o componente novo for um compound component com sub-partes (trigger/content/overlay, como os já existentes em `molecules/`), mover manualmente pra `src/components/molecules/` e atualizar seus imports internos (ex: de `Button`) para `@/components/atoms/button`.

Os tokens semânticos do shadcn (`--background`, `--foreground`, `--primary`, `--card`, `--popover`, `--muted`, `--accent`, `--border`, `--ring` etc, em `src/app/[locale]/globals.css`) **não são cores novas** — cada um referencia um dos 5 tokens da tabela acima via `var(--color-*)`. Isso significa que qualquer componente shadcn novo (`npx shadcn add ...`) já nasce na paleta certa automaticamente, claro e escuro, sem precisar de cor extra.

Ao adicionar um componente shadcn:

- Não aceitar cor literal que a CLI eventualmente sugerir (ex: `oklch(...)`) — sempre mapear pro token semântico existente.
- Pra link estilizado como botão, usar `buttonVariants({...})` como className num `<a>`/`Link` normal — nunca `<Button render={<a/>}>`, pois isso muda o role de acessibilidade de "link" pra "button".
- `nativeButton={false}` é obrigatório em qualquer `<Button render={...}>` cujo elemento renderizado não seja um `<button>` de verdade (Base UI avisa/loga erro em dev se esquecer).
