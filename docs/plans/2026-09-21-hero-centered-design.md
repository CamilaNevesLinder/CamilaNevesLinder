# Hero centralizada

Data: 2026-09-21
Branch: `feat/hero-centered`

## Objetivo

Trocar o layout da `Hero` de "texto à esquerda + foto à direita, lado a lado" pra um bloco único centralizado, empilhado verticalmente: localização, nome, tagline, foto, separador, descrição, tags de skill e os dois links de CTA — tudo centralizado, um abaixo do outro, em todos os tamanhos de tela. A ordem do conteúdo não muda (a foto continua depois do nome/tagline no fluxo, nunca no topo).

Esse redesign substitui o comportamento responsivo que a `Hero` ganhou no plano de responsividade anterior (`docs/plans/2026-09-21-responsividade-plan.md`, Task 1): lá o layout alternava entre coluna (mobile) e linha lado a lado (`sm:` pra cima). Agora não alterna mais — é coluna centralizada em qualquer largura, o que simplifica o componente (menos breakpoint pra gerenciar).

## Layout

```
              Florianópolis, SC

           Camila Neves Linder
          desenvolvedora full stack.

                 [ foto ]

        ─────────────────────────

   Do banco de dados à interface, arquitetura,
        API e aplicação no ar.

   [TypeScript] [JavaScript] [React] [React Native]
              [NestJS] [Next.js]

        Ver trabalho →    Entrar em contato →
```

## Estilo (referência exata pro plano)

Estado atual de `src/components/organisms/hero.tsx` (pós plano de responsividade):

```tsx
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

  <div className="border-rose size-[120px] shrink-0 overflow-hidden rounded-[18px] border shadow-[...] sm:size-[180px]">
    <Image ... />
  </div>
</div>

<Separator className="bg-rose/40 my-9" />

<p className="text-taupe text-[23px] leading-relaxed">{t('description')}</p>

<div className="mt-[26px] flex flex-wrap gap-2.5">
  {/* badges de tag */}
</div>

<div className="mt-[26px] flex flex-wrap items-center gap-[30px]">
  {/* links de CTA */}
</div>
```

Vira:

```tsx
<div className="flex flex-col items-center gap-7 text-center">
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

  <div className="border-rose size-[120px] shrink-0 overflow-hidden rounded-[18px] border shadow-[...] sm:size-[180px]">
    <Image ... />
  </div>
</div>

<Separator className="bg-rose/40 my-9" />

<p className="text-taupe text-center text-[23px] leading-relaxed">
  {t('description')}
</p>

<div className="mt-[26px] flex flex-wrap justify-center gap-2.5">
  {/* badges de tag — sem mudança interna, só o container ganha justify-center */}
</div>

<div className="mt-[26px] flex flex-wrap items-center justify-center gap-[30px]">
  {/* links de CTA — mesma coisa, só justify-center no container */}
</div>
```

Resumo das mudanças, className por className:

| Elemento                         | Antes                                                                            | Depois                                                            |
| -------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| div. wrapper (nome/tagline/foto) | `flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between` | `flex flex-col items-center gap-7 text-center`                    |
| `<p>` descrição                  | `text-taupe text-[23px] leading-relaxed`                                         | `text-taupe text-center text-[23px] leading-relaxed`              |
| div. tags                        | `mt-[26px] flex flex-wrap gap-2.5`                                               | `mt-[26px] flex flex-wrap justify-center gap-2.5`                 |
| div. CTAs                        | `mt-[26px] flex flex-wrap items-center gap-[30px]`                               | `mt-[26px] flex flex-wrap items-center justify-center gap-[30px]` |

Tamanhos de fonte, tamanho da foto, padding do `Card` — nada disso muda (fica o `text-[40px] sm:text-[68px]` etc. já validado no plano de responsividade anterior).

## Comportamento

- Mesmo em todos os breakpoints — não tem mais alternância `sm:flex-row`. A Hero é sempre um bloco centralizado empilhado, do mobile ao desktop.
- Ordem do conteúdo no DOM não muda: localização → nome → tagline → foto → separador → descrição → tags → CTAs. Só o alinhamento (esquerda → centro) e a direção (linha → coluna sempre) mudam.
- Nenhum texto/tradução muda.

## Testes

`hero.test.tsx` já tem testes de conteúdo (nome, tagline, descrição, tags, CTAs, foto) que não quebram — eles buscam por texto/role, não por layout. Precisa **atualizar** os testes de classe que o plano de responsividade anterior adicionou (eles checavam `flex-col`/`sm:flex-row` no wrapper), trocando pra:

```tsx
it('always centers the name/tagline/photo block', () => {
  renderWithProviders(<Hero />);

  const heading = screen.getByText('Camila Neves Linder');
  const layoutRow = heading.closest('div')?.parentElement;
  expect(layoutRow).toHaveClass('flex-col', 'items-center', 'text-center');
  expect(layoutRow).not.toHaveClass('sm:flex-row');
});
```

(O teste antigo de `flex-col`/`sm:flex-row` deixa de fazer sentido e é substituído por este — não fica um teste órfão junto do novo.)

## Ordem de execução (referência pro plano)

1. Atualizar `hero.tsx` com as 4 mudanças de className da tabela acima.
2. Atualizar/substituir o teste de layout em `hero.test.tsx` (troca o teste de `flex-col`/`sm:flex-row` por um de centralização).
3. Lint, typecheck, `test:unit` (suíte completa), `test:coverage`.
4. Checagem visual manual em 375px/768px/1440px — confirmar que o bloco fica centralizado e legível em todas as larguras, sem overflow.

## Risco

Baixíssimo — só reorganiza classes Tailwind num componente já existente e bem testado, sem novo componente, sem nova dependência, sem mudança de conteúdo/tradução. Único ponto de atenção real é não deixar um teste órfão checando o comportamento `sm:flex-row` antigo (coberto no passo 2 acima).
