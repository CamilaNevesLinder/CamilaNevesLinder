# Design Tokens — Fontes e Cores

Fonte da verdade: `src/app/[locale]/globals.css` (`@theme` block) + `src/app/[locale]/layout.tsx` (instância das Google Fonts).

**Regra:** este conjunto é fechado. Nenhuma fonte ou cor nova deve ser adicionada ao projeto sem pedido explícito. Qualquer novo componente/página deve reutilizar só o que está listado abaixo.

## Fontes

| Token CSS        | Fonte                              | Peso           | Uso                                          |
| ---------------- | ---------------------------------- | -------------- | -------------------------------------------- |
| `--font-display` | Playfair Display                   | 700            | Só título do hero (`<h1>` com o nome)        |
| `--font-serif`   | Georgia (fallback, não é web font) | padrão do body | Corpo de texto, leitura corrida (parágrafos) |
| `--font-mono`    | JetBrains Mono                     | padrão         | UI: labels, tags de skill, links             |

Cada fonte tem um papel fixo — não trocar fonte de um elemento pra outra família sem instrução explícita, e não introduzir uma quarta família.

## Paleta de cores

| Token CSS          | Hex       | Uso                               |
| ------------------ | --------- | --------------------------------- |
| `--color-cream`    | `#fbf7f4` | Fundo (background)                |
| `--color-blush`    | `#e8d8ce` | Reservada — tom claro da paleta   |
| `--color-rose`     | `#b98f88` | Destaque, itálico, bordas, accent |
| `--color-taupe`    | `#7a6258` | Texto secundário/labels           |
| `--color-espresso` | `#3b2f2a` | Texto principal, alto contraste   |

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

Projeto usa shadcn/ui (`components.json`, estilo `base-nova`, primitivos `@base-ui/react`) pra todo componente interativo/estrutural: `Button`, `Card`, `Badge`, `Popover`, `Sheet`, `Switch`, `Separator`. Componentes ficam em `src/components/ui/` (gerados pela CLI — evitar editar à mão, prefira `npx shadcn@latest add <nome>` ou `diff`).

Os tokens semânticos do shadcn (`--background`, `--foreground`, `--primary`, `--card`, `--popover`, `--muted`, `--accent`, `--border`, `--ring` etc, em `src/app/[locale]/globals.css`) **não são cores novas** — cada um referencia um dos 5 tokens da tabela acima via `var(--color-*)`. Isso significa que qualquer componente shadcn novo (`npx shadcn add ...`) já nasce na paleta certa automaticamente, claro e escuro, sem precisar de cor extra.

Ao adicionar um componente shadcn:

- Não aceitar cor literal que a CLI eventualmente sugerir (ex: `oklch(...)`) — sempre mapear pro token semântico existente.
- Pra link estilizado como botão, usar `buttonVariants({...})` como className num `<a>`/`Link` normal — nunca `<Button render={<a/>}>`, pois isso muda o role de acessibilidade de "link" pra "button".
- `nativeButton={false}` é obrigatório em qualquer `<Button render={...}>` cujo elemento renderizado não seja um `<button>` de verdade (Base UI avisa/loga erro em dev se esquecer).
