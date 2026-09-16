# Plano — Seção /sobre

Ideia inicial, ainda sem conteúdo final. Página `/sobre` (`src/app/[locale]/(pages)/sobre/page.tsx`), hoje só com placeholder "Conteúdo em breve.".

## Estrutura

1. **Abertura** — parágrafo curto de apresentação pessoal, além do lado profissional já coberto na home.
2. **Bloco "Fora do código"** — 3 itens, mesmo formato de Experiência/Formação (título serif + parágrafo taupe, sem ícone, separados por `Separator` fino), lista vertical:
   - **Jiu-jitsu**
   - **Livros**
   - **Inglês**

## Conteúdo — status

- **Jiu-jitsu** — confirmado: faixa roxa, treina há 4 anos, dá aula pra criança (Gracie Barra), já participou de vários campeonatos.
- **Livros** — pendente: títulos que ela quer recomendar.
- **Inglês** — pendente: currículo já diz "intermediário"; confirmar se usa só isso ou adiciona mais contexto (cursos, uso no trabalho).

## Layout

Mesmo vocabulário visual do resto do site: label mono (`SOBRE`, depois `FORA DO CÓDIGO`), heading serif, texto taupe, `Separator` (`bg-rose/40`) entre blocos. Sem grid, sem card — consistente com Experiência e Formação.

## Próximo passo

Aguardar os itens pendentes (livros, detalhe de inglês) pra escrever o texto final nos 3 idiomas (pt-br/en/es), revisar com ela, e só então implementar o componente `About`/`Sobre` + rota.
