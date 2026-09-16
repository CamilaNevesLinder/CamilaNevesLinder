# Refatoração: Atomic Design + nomes de página em inglês

Data: 2026-09-16
Branch: `feat/about-section`

## Objetivo

Reorganizar `src/components/` seguindo Atomic Design (atoms/molecules/organisms/templates/pages) e renomear pastas de rota internas para inglês. Sem mudança de comportamento, URL pública ou lógica de negócio — refatoração puramente estrutural.

## Fora de escopo

- Remover ou alterar suporte a múltiplos idiomas (next-intl, `[locale]`, `messages/*.json`). O site continua pt-br/en/es como hoje.
- Mudar URLs públicas. `next-intl` `pathnames` continua mapeando cada rota para `/sobre`↔`/about`↔`/sobre-mi` etc por idioma.
- Implementar páginas placeholder (`/projetos`, `/tecnologias`, `/contato`).

## Estrutura alvo

```
src/
  app/[locale]/(pages)/
    (home)/page.tsx          -> "/"          (era (homepage)/)
    about/page.tsx           -> era sobre/
    projects/page.tsx        -> era projetos/
    technologies/page.tsx    -> era tecnologias/
    contact/page.tsx         -> era contato/
  components/
    atoms/
      badge.tsx, button.tsx, card.tsx, separator.tsx, switch.tsx
      icons/social-icons.tsx
      tests/unit/*.test.tsx
    molecules/
      carousel.tsx, popover.tsx, sheet.tsx, navigation-menu.tsx
      tests/unit/*.test.tsx
    organisms/
      hero.tsx, projects.tsx, ai-process.tsx, experience.tsx,
      education.tsx, about.tsx, book-gallery.tsx, jiujitsu-gallery.tsx,
      sidebar.tsx
      tests/unit/*.test.tsx
    templates/
      main-template.tsx
      tests/unit/main-template.test.tsx
    pages/
      home-page.tsx, about-page.tsx, projects-page.tsx,
      technologies-page.tsx, contact-page.tsx
      tests/unit/*.test.tsx
```

`lib/`, `providers/`, `i18n.ts`, `proxy.ts` não mudam — não são componentes.

## Definição de cada nível

- **atoms**: componente único, sem sub-partes compostas, sem lógica de negócio. Ex: `button`, `badge`, `card`, `separator`, `switch`, ícones sociais.
- **molecules**: compound components (trigger+content+overlay), ainda sem lógica de negócio própria. Ex: `carousel` (embla), `popover`, `sheet`, `navigation-menu`.
- **organisms**: tem lógica/estado/dados próprios, compõe atoms+molecules. Ex: `sidebar` (dark mode + popover de idioma), `about` (orquestra `book-gallery` + `jiujitsu-gallery` + chess widget), `book-gallery`, `jiujitsu-gallery`, `hero`, `projects`, `ai-process`, `experience`, `education`. Nomes de componente ficam iguais aos de hoje — só o diretório muda; não há colisão com os nomes dos componentes da camada `pages` (ex: `About` em organisms vs `AboutPage` em pages).
- **templates**: esqueleto visual de layout sem conteúdo de página. `main-template.tsx` = Sidebar + slot de conteúdo, extraído de `[locale]/layout.tsx`.
- **pages**: composição final de uma rota, 1:1 com cada `page.tsx` de `app/[locale]/(pages)/*`. Recebe dados já buscados pelo server component da rota (ex: `getChessStats()`) via props e monta os organisms daquela página. Sem fetch próprio — fetch continua no `page.tsx`.

## `page.tsx` e `layout.tsx` como wrappers finos

`page.tsx` de cada rota faz só: ler `params`, chamar `setRequestLocale`, buscar dados de servidor quando aplicável (ex: about), e renderizar o componente de `components/pages/*`.

`app/[locale]/layout.tsx` faz só: configurar fontes (`next/font`), `NextIntlProvider`, `generateMetadata`/`generateStaticParams`, e renderizar `<MainTemplate>{children}</MainTemplate>`.

## shadcn/ui + CLI

`components.json` atualiza `"ui": "@/components/atoms"`. Componentes que a CLI gera em `ui/` mas que classificamos como **molecule** (`carousel`, `popover`, `sheet`, `navigation-menu`) precisam ser movidos manualmente para `components/molecules/` depois de qualquer `shadcn add` futuro — documentar isso num comentário curto no topo do `components.json` ou README de componentes.

## Renomeação de rotas

| Pasta atual | Pasta nova |
|---|---|
| `(homepage)/` | `(home)/` |
| `sobre/` | `about/` |
| `projetos/` | `projects/` |
| `tecnologias/` | `technologies/` |
| `contato/` | `contact/` |

Verificar `src/lib/navigation.ts` (config de `pathnames` do next-intl): se as chaves internas já usam os nomes acima, só confirmar; se usam nomes em português, renomear a chave junto (sem alterar os valores de URL por idioma).

## Testes

Colocados por nível: cada pasta (`atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`) tem sua própria `tests/unit/`. `vitest.config.mts` já casa por extensão de arquivo (`.test.ts`/`.test.tsx`) via glob recursivo — não precisa mudar config. `coverage.exclude` de `src/app/[locale]/**` continua válido (route files ficam finos, sem lógica a cobrir).

`book-gallery` e `jiujitsu-gallery` não têm teste hoje — não é objetivo desta refatoração criar cobertura nova, só mover o que existe. Se o threshold de 90% cair por causa da movimentação (não deveria, já que não remove código coberto), ajustar na hora.

## Ordem de execução

1. Criar estrutura de pastas vazias (`atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`) com suas `tests/unit/`.
2. Mover `components/ui/*` para `atoms/`/`molecules/` conforme tabela de níveis; atualizar `components.json`.
3. Mover componentes autorais de `components/*.tsx` para `organisms/`; atualizar imports em todo o projeto (`@/components/x` → `@/components/organisms/x`).
4. Criar `components/templates/main-template.tsx`; enxugar `[locale]/layout.tsx`.
5. Criar `components/pages/*-page.tsx` por rota; enxugar cada `page.tsx`.
6. Renomear pastas de rota (`sobre`→`about` etc.); ajustar chaves de `pathnames` em `lib/navigation.ts` se necessário.
7. Rodar `lint`, `typecheck`, `test:coverage` — confirmar build e cobertura (threshold 90%) intactos.

## Risco

Baixo risco de comportamento (nenhuma lógica muda), risco médio de volume: grande quantidade de arquivos com import path alterado. Mitigado por rodar typecheck a cada etapa em vez de só no final.
