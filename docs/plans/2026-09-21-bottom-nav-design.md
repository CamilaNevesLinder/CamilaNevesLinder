# Barra de navegação inferior (mobile)

Data: 2026-09-21
Branch: `feat/bottom-nav`

## Objetivo

Adicionar uma barra de ícones fixa no rodapé da tela, visível só em mobile (abaixo de `md:`, mesmo corte onde a `Sidebar` hoje vira header + menu hambúrguer), com as 5 seções do site (Início, Sobre, Projetos, Tecnologias, Contato) sempre visíveis e a um toque, sem precisar abrir o menu. Convive com o header/hambúrguer atual — nada muda lá; o menu Sheet continua existindo pra idioma/tema/redes sociais.

## Layout

```
┌─────────────────────────────────────────┐
│ [foto] Camila Linder            [≡]     │  ← header atual, sem mudança
├─────────────────────────────────────────┤
│                                           │
│              conteúdo da página          │
│                                           │
├─────────────────────────────────────────┤
│   🏠      👤      📁      💻      ✉️     │  ← nova barra inferior
│ Início   Sobre  Projetos  Tec.  Contato  │  (só ícone, sem texto —
└─────────────────────────────────────────┘   labels aqui só ilustrativos)
```

5 colunas iguais (`grid grid-cols-5`), altura igual ao header (`h-14`), `border-t` + `bg-background`, fixa no rodapé (`fixed inset-x-0 bottom-0`). Cada ícone é a própria área de toque (célula inteira da grid), sem texto abaixo — mesmo padrão de "ícone com `aria-label`" já usado nos links sociais da sidebar. Item da seção atual fica com `text-espresso` (destaque), os demais `text-taupe` — sem fundo/pill, pra não brigar visualmente numa faixa estreita de 5 colunas.

## Componentes

```
src/
  lib/
    nav-items.ts                       (novo — extrai NAV_ITEMS de sidebar.tsx pra
                                         ser reaproveitado por Sidebar E BottomNav,
                                         única fonte de verdade das 5 seções)
  components/
    organisms/
      sidebar.tsx                      (modifica — importa NAV_ITEMS de @/lib/nav-items
                                         em vez de declarar localmente)
      bottom-nav.tsx                   (novo — a barra inferior)
      tests/unit/
        bottom-nav.test.tsx            (novo)
        sidebar.test.tsx               (sem mudança de comportamento, só garante que
                                         a extração de NAV_ITEMS não quebrou nada)
    templates/
      main-template.tsx                (modifica — inclui <BottomNav /> e adiciona
                                         padding inferior no wrapper de conteúdo)
      tests/unit/
        main-template.test.tsx         (modifica)
```

`nav-items.ts` exporta o mesmo shape que já existe hoje dentro de `sidebar.tsx`:

```ts
export type NavLabelKey =
  'home' | 'about' | 'projects' | 'technologies' | 'contact';

export const NAV_ITEMS: {
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

## Estilo (referência exata pro plano)

```tsx
<nav className="border-border bg-background fixed inset-x-0 bottom-0 z-40 grid h-14 grid-cols-5 border-t md:hidden">
  {NAV_ITEMS.map(({ href, labelKey, Icon }) => {
    const isActive = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        aria-label={t(labelKey)}
        className={cn(
          'flex items-center justify-center',
          isActive ? 'text-espresso' : 'text-taupe',
        )}
      >
        <Icon size={22} aria-hidden="true" />
      </Link>
    );
  })}
</nav>
```

Ícone em `size={22}` — mesmo tamanho dos ícones de ação do header atual (`Menu`/`X`), maior que os `size={18}` usados dentro do menu lateral, porque aqui é o único elemento visual da célula (sem texto ao lado).

## Comportamento

- **Breakpoint:** `md:hidden` — mesma regra que já esconde o header mobile a partir de 768px (nesse ponto a `Sidebar` de desktop assume a navegação).
- **Estado ativo:** mesma lógica já usada em `renderNavLinks` (`pathname === href`) — ícone em `text-espresso`, resto em `text-taupe`.
- **Navegação:** `Link` do `@/lib/navigation` (next-intl), igual a todo link interno do site — sem `onClick` especial, não fecha nada (diferente dos links de dentro do Sheet, que fecham o menu ao navegar).
- **z-index:** `z-40`, mesma camada do header — não conflita porque um fica no topo e o outro no rodapé.
- **Sem novo texto/i18n:** cada ícone usa `aria-label={t(labelKey)}` reaproveitando as chaves `nav.home`/`nav.about`/etc. que já existem nas 3 locales — não precisa tocar em `messages/*.json`.

## Ajuste no `MainTemplate`

Hoje: `<div className="pt-14 md:pl-60 md:pt-0">` reserva espaço pro header mobile (`pt-14`) e pro sidebar desktop (`md:pl-60`). Com a barra inferior fixa, o conteúdo (incluindo o `Footer`) precisa de um respiro embaixo pra nada ficar escondido atrás dela:

```tsx
<div className="pb-14 pt-14 md:pb-0 md:pl-60 md:pt-0">
```

## Testes

- `bottom-nav.test.tsx`: renderiza os 5 links com `aria-label`/`href` corretos; destaca o item da rota atual (`pathname` mockado, mesmo padrão de mock de `@/lib/navigation` já usado em `sidebar.test.tsx`).
- `sidebar.test.tsx`: nenhum teste novo — só rodar a suíte existente pra confirmar que a extração de `NAV_ITEMS` não regrediu nada (mesmos 5 itens, mesmo destaque de rota ativa).
- `main-template.test.tsx`: adiciona um teste checando que `<BottomNav />` está presente e que o wrapper de conteúdo carrega `pb-14`/`md:pb-0` junto das classes já testadas.

## Ordem de execução (referência pro plano)

1. Extrair `NAV_ITEMS`/`NavLabelKey` de `sidebar.tsx` pra `src/lib/nav-items.ts`; atualizar `sidebar.tsx` pra importar de lá; rodar a suíte existente pra confirmar zero regressão.
2. TDD de `bottom-nav.tsx` (organism novo), reaproveitando `NAV_ITEMS`.
3. Atualizar `main-template.tsx` (`+<BottomNav />`, `pb-14 md:pb-0`) e `main-template.test.tsx`.
4. Lint, typecheck, `test:coverage` (mínimo 90% já configurado), build.

## Risco

Baixo — reaproveita 100% do padrão visual/estrutural que já existe (`Link`, `buttonVariants`, ícones do `lucide-react`, breakpoint `md:`), nenhuma dependência nova, nenhuma mudança de conteúdo/tradução. Único ponto de atenção: a extração de `NAV_ITEMS` toca um arquivo (`sidebar.tsx`) que já tem cobertura de teste boa — a suíte existente é a rede de segurança pra garantir que a refatoração não muda comportamento.
