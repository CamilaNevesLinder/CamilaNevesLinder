# Design Tokens — Fontes e Cores

Fonte da verdade: `src/app/[locale]/globals.css` (`@theme` block) + `src/app/[locale]/layout.tsx` (instância das Google Fonts).

**Regra:** este conjunto é fechado. Nenhuma fonte ou cor nova deve ser adicionada ao projeto sem pedido explícito. Qualquer novo componente/página deve reutilizar só o que está listado abaixo.

## Fontes

| Token CSS | Fonte | Peso | Uso |
|---|---|---|---|
| `--font-display` | Playfair Display | 700 | Só título do hero (`<h1>` com o nome) |
| `--font-serif` | Georgia (fallback, não é web font) | padrão do body | Corpo de texto, leitura corrida (parágrafos) |
| `--font-mono` | JetBrains Mono | padrão | UI: labels, tags de skill, links |

Cada fonte tem um papel fixo — não trocar fonte de um elemento pra outra família sem instrução explícita, e não introduzir uma quarta família.

## Paleta de cores

| Token CSS | Hex | Uso |
|---|---|---|
| `--color-cream` | `#fbf7f4` | Fundo (background) |
| `--color-blush` | `#e8d8ce` | Reservada — tom claro da paleta |
| `--color-rose` | `#b98f88` | Destaque, itálico, bordas, accent |
| `--color-taupe` | `#7a6258` | Texto secundário/labels |
| `--color-espresso` | `#3b2f2a` | Texto principal, alto contraste |

Paleta suave, tons terrosos/rosados — estética minimalista e feminina. Nenhuma cor fora dessa tabela (incluindo tons de cinza puro, azul, preto puro etc.) deve entrar no projeto sem autorização.
