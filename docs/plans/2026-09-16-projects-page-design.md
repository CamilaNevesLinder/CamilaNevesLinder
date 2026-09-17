# Página /projects completa

Data: 2026-09-16
Branch: `feat/projects-page`

## Objetivo

Construir a página `/projects` (hoje placeholder "Conteúdo em breve.") com um card por projeto trabalhado: nome em destaque, lista de características e tecnologias usadas. Conteúdo pesquisado a partir dos repositórios reais no GitHub (só leitura, nada alterado nos repos) e do texto já existente no site pra projetos sem repositório acessível.

## Escopo

7 projetos, nesta ordem:

1. **Oniapp** — portal do aluno multi-tenant white-label (Onilearning)
2. **Oniapp Admin** — painel administrativo do Oniapp
3. **Seja** — app de bem-estar (Onilearning)
4. **Seja Admin** — painel administrativo do Seja
5. **Praça 22** — site institucional da escola de música
6. **Ritmar** — plataforma de gestão para academias
7. **Mince Joias** — loja de joias online

## Fora de escopo

- Mudar o teaser de 4 projetos que já existe na home (`organisms/projects.tsx`, namespace de tradução `projects.*`) — continua como está, sem relação com esta página.
- Screenshots/imagens dos projetos — só texto por enquanto.
- Links públicos: só Praça 22 tem URL pública confirmada (`https://praca-22.vercel.app`); os demais são apps privados/código de ex-empregador sem link a divulgar.
- Ritmar e Mince Joias: sem repositório acessível (código de ex-empregador). Conteúdo baseado só no que já existe em `messages/pt-br.json` (seção Experiência), sem inventar detalhe técnico não confirmável.

## Fontes usadas (leitura via `gh`, nenhum repo modificado)

- `Onilearning-Mobile/oniapp` — README + `package.json`
- `Onilearning-Mobile/oniapp-admin` — `package.json`
- `Onilearning-Mobile/seja-app` — README + `package.json`
- `Onilearning-Mobile/seja-admin` — `package.json`
- `CamilaNevesLinder/praca22` — README (stack + descrição do projeto)
- Ritmar / Mince Joias: `messages/pt-br.json` → `experience.items.{ritmar,minceJoias}` (já escrito, sem fonte de código)

## Componentes

```
src/components/
  organisms/
    project-showcase.tsx        (novo)
    tests/unit/project-showcase.test.tsx
  pages/
    projects-page.tsx           (substitui o placeholder atual)
    tests/unit/projects-page.test.tsx  (atualiza o existente)
src/app/[locale]/(pages)/projects/page.tsx   (vira wrapper fino, igual /about)
```

`ProjectShowcase`: grid responsivo (1 coluna no mobile, 2 no desktop) de `Card` (átomo já usado no `Hero`), um por projeto:

- Nome do projeto em destaque (`h3` serif bold, mesmo peso visual do `Hero`/`Experience`)
- Lista de 3-4 bullets de características (mesmo padrão visual da lista de tópicos da `Experience`: `<ul className="list-disc ...">`)
- Badges de tecnologia (átomo `Badge`, mesmo estilo das tags do `Hero`), `flex flex-wrap gap-2`

Sem fetch de servidor — conteúdo 100% estático via `next-intl`, mesmo padrão de `Experience`/`Education`.

## Conteúdo (pt-br — fonte da verdade, EN/ES são tradução deste texto aprovado)

Namespace novo em `messages/*.json`: `projectsPage` (não reaproveita `projects.*`, que é do teaser da home).

```json
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
}
```

## Testes

- `project-showcase.test.tsx`: renderiza os 7 títulos em ordem (`getAllByRole('heading', {level: 3})`), confirma que cada card mostra pelo menos uma tecnologia e uma característica.
- `projects-page.test.tsx`: atualiza o teste existente (hoje testa o placeholder "Conteúdo em breve.") pra testar que `ProjectShowcase` renderiza dentro da página.
- Rota `projects/page.tsx` fica fora de cobertura (já excluída em `vitest.config.mts`), só thin wrapper.

## Ordem de execução

1. Escrever teste de `ProjectShowcase` (TDD) com fixture de tradução mínima.
2. Implementar `ProjectShowcase` + adicionar `projectsPage` em `messages/pt-br.json`.
3. Traduzir `projectsPage` pra `en.json` e `es.json` (tradução do conteúdo pt-br aprovado, não nova redação).
4. Atualizar `pages/projects-page.tsx` e `app/.../projects/page.tsx` (thin wrapper).
5. Atualizar `pages/tests/unit/projects-page.test.tsx`.
6. Rodar lint, typecheck, test:coverage, build.

## Risco

Baixo: conteúdo estático, sem integração externa, mesmo padrão já usado em Experience/About. Único ponto de atenção é manter os 3 idiomas sincronizados (mesmas chaves em pt-br/en/es).
