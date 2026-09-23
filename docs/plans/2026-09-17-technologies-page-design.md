# Página /technologies completa

Data: 2026-09-17
Branch: `feat/technologies-section`

## Objetivo

Construir a página `/technologies` (hoje placeholder "Conteúdo em breve.") listando as tecnologias com domínio real, agrupadas por categoria, com base em evidência real de uso (código do próprio site + repos reais vistos via `gh`, leitura apenas — nada alterado nos repos).

## Escopo e método de levantamento

Levantei tecnologias de 3 fontes:

1. Componentes já existentes no site (`Hero`'s `TAGS`, `Experience`, `ProjectShowcase` — stack de cada projeto).
2. Breakdown de linguagem (`gh api repos/.../languages`) de todos os repositórios pessoais (`CamilaNevesLinder/*`) e da org `Onilearning-Mobile`.
3. Confirmação direta com a usuária sobre o que manter/excluir.

**Excluído explicitamente** (com o porquê):

- `MongoDB` — usuária confirmou que não tem domínio disso (aparecia como tech do projeto Mince Joias, mas não é skill pessoal dela).
- `Kotlin` — só pasta nativa gerada automaticamente pelo Expo prebuild no repo `Bem-estar-app` (4498 bytes vs 75288 de TypeScript), não código escrito à mão.
- `Angular`, `Ionic`, `Cordova`, `PHP`, `Java`, `Objective-C`, `Gherkin`, `SCSS`, `Mustache` — vêm do repo `Onilearning-Mobile/app-moodle` (e `app-moodle-original`), que é uma cópia do código-fonte oficial open source do Moodle Mobile App, não autoria da usuária ou da equipe.
- `Nginx`, `Make` — presentes como arquivo de config em alguns repos, mas usuária pediu pra tirar.
- `Python`, `Shell` — vêm só de um repo pessoal de dotfiles sem README explicativo; usuária confirmou que não representa domínio profissional da linguagem.
- `HCL`/Terraform — só 276 bytes num repo, sem arquivo `.tf` real encontrado via busca — provável ruído de detecção do GitHub, não evidência real de uso.

## Layout

Lista vertical por categoria, mesmo padrão visual de `Experience`/`ProjectShowcase` (label mono + heading serif + blocos separados por `Separator`, sem card/grid):

```
TECNOLOGIAS
O que eu uso no dia a dia

LINGUAGENS
[TypeScript] [JavaScript]

FRONTEND & MOBILE
[React] [Next.js] [React Native] [Expo] [Expo Router] [NativeWind]
[Tailwind CSS] [Radix UI] [shadcn/ui] [Framer Motion]
[TanStack Query] [Zustand] [Zod] [i18next]

BACKEND
[Node.js] [NestJS] [TypeORM] [MySQL]

FERRAMENTAS & CLOUD
[AWS] [Docker] [GitHub Actions] [Firebase] [Vitest]
```

Cada categoria: `h3` (título da categoria) + fileira de `Badge` (mesmo estilo do `Hero`/`ProjectShowcase`, `flex flex-wrap gap-2`), sem bullets — aqui é lista de tags, não de características.

## Componentes

```
src/components/
  organisms/
    tech-stack.tsx                    (novo)
    tests/unit/tech-stack.test.tsx
  pages/
    technologies-page.tsx             (substitui o placeholder atual)
    tests/unit/technologies-page.test.tsx  (atualiza o existente)
src/app/[locale]/(pages)/technologies/page.tsx   (vira wrapper fino, igual /about e /projects)
```

Sem fetch de servidor — conteúdo 100% estático via `next-intl`, mesmo padrão de `Experience`/`ProjectShowcase`.

## Conteúdo (pt-br — fonte da verdade, EN/ES são tradução)

Namespace novo em `messages/*.json`: `technologiesPage`.

```json
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
        "React", "Next.js", "React Native", "Expo", "Expo Router",
        "NativeWind", "Tailwind CSS", "Radix UI", "shadcn/ui",
        "Framer Motion", "TanStack Query", "Zustand", "Zod", "i18next"
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
}
```

## Testes

- `tech-stack.test.tsx`: renderiza as 4 categorias em ordem (`getAllByRole('heading', {level: 3})`), confirma que cada categoria mostra pelo menos uma tecnologia e que nenhuma tecnologia excluída (`MongoDB`, `Kotlin`, `Python`) aparece na tela.
- `technologies-page.test.tsx`: atualiza o teste existente (hoje testa o placeholder) pra confirmar que `TechStack` renderiza dentro da página.
- Adiciona `technologiesPage` ao teste de paridade de idiomas já existente (`src/tests/unit/messages-projects-page.test.ts` — renomear ou criar um `messages/*.json` mais genérico, a definir no plano) pra garantir pt-br/en/es sincronizados.

## Ordem de execução (referência pro plano)

1. Teste de `TechStack` (TDD) + `technologiesPage` em `messages/pt-br.json`.
2. Traduzir `technologiesPage` pra `en.json`/`es.json`.
3. Atualizar `pages/technologies-page.tsx` e `app/.../technologies/page.tsx` (thin wrapper).
4. Atualizar `pages/tests/unit/technologies-page.test.tsx`.
5. Estender o teste de paridade de idiomas pra cobrir `technologiesPage`.
6. Rodar lint, typecheck, test:coverage, build.

## Risco

Baixo: conteúdo estático, mesmo padrão já usado em Experience/Projects. Ponto de atenção: manter os 3 idiomas sincronizados (mitigado pelo teste de paridade).
