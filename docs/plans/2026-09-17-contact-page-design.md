# Página /contact completa

Data: 2026-09-17
Branch: `feat/contact-section`

## Objetivo

Construir a página `/contact` (hoje placeholder "Conteúdo em breve.") com um formulário de contato real (nome/e-mail/mensagem) que envia e-mail via SMTP, usando as variáveis de ambiente já declaradas em `env.d.ts`/`.env.example` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`, `CONTACT_TO_EMAIL`) e nunca implementadas. Além do formulário, um bloco secundário com links diretos (GitHub, LinkedIn, WhatsApp, e-mail) para quem preferir não preencher o form.

## Layout

Mesmo padrão visual de `About`/`TechStack` (label mono + heading serif + conteúdo em coluna única, `max-w-[960px]`), form dentro de `Card` no mesmo estilo do `Hero`:

```
CONTATO
Vamos conversar?

<p introdução>

┌─────────────────────────────────────────┐
│  Nome                                    │
│  [___________________________]           │
│                                           │
│  E-mail                                  │
│  [___________________________]           │
│                                           │
│  Mensagem                                │
│  [___________________________]           │
│  [___________________________]           │
│                                           │
│              [Enviar mensagem]           │
│  <mensagem de sucesso/erro, aria-live>   │
└─────────────────────────────────────────┘

Prefere falar direto?
[GitHub] [LinkedIn] [WhatsApp] [E-mail]
```

Bloco de links diretos reaproveita `SOCIAL_LINKS` (`src/lib/site.ts`), com `whatsapp` novo (`https://wa.me/5548998558324`). Mesmos ícones de `social-icons.tsx` já usados na sidebar (menos Instagram, que fica só na sidebar). Botões com o mesmo `buttonVariants({ variant: 'ghost', size: 'icon' })` da sidebar.

## Componentes

```
src/components/
  atoms/
    input.tsx                          (novo, via `npx shadcn@latest add input`)
    label.tsx                          (novo, via `npx shadcn@latest add label`)
    textarea.tsx                       (novo, via `npx shadcn@latest add textarea`)
  organisms/
    contact-form.tsx                   (novo — form + estado via useActionState + bloco de links diretos)
    tests/unit/contact-form.test.tsx
  pages/
    contact-page.tsx                   (substitui o placeholder atual)
    tests/unit/contact-page.test.tsx   (atualiza o existente)
src/app/[locale]/(pages)/contact/page.tsx   (já é wrapper fino, sem mudança)
src/lib/
  mail.ts                              (novo — cria o transporte nodemailer a partir das env vars SMTP_*)
  actions/
    contact.ts                        (novo — Server Action 'use server': valida, envia via nodemailer)
    tests/unit/contact.test.ts        (novo, roda em ambiente node — mocka nodemailer)
```

Nova dependência: `nodemailer`.

`SOCIAL_LINKS` (`src/lib/site.ts`) ganha a chave `whatsapp`.

## Fluxo de envio

Server Action (`'use server'`), não API route — este Next.js trata Server Actions como o mecanismo padrão de mutação (ver `node_modules/next/dist/docs/01-app/02-guides/forms.md`). `ContactForm` é Client Component, usa `useActionState` pro estado (`idle`/`pending`/`success`/`error`) e desabilita o botão durante o envio (`pending`).

**Validação** (manual, sem zod — projeto não usa zod, evita dependência nova):

- `name`: obrigatório, mínimo 2 caracteres após `trim()`.
- `email`: obrigatório, regex simples de formato de e-mail.
- `message`: obrigatório, mínimo 10 caracteres após `trim()`.

Erros de validação retornam `fieldErrors` por campo, exibidos abaixo do input correspondente (`aria-describedby` + `aria-invalid`).

**Honeypot anti-spam** (sem dependência nova): campo extra `company`, escondido visualmente (`sr-only`, `tabIndex={-1}`, `autoComplete="off"`), fora do fluxo de tab. Se vier preenchido, a action retorna sucesso sem de fato enviar e-mail (bot cai no silêncio, não recebe erro nem confirmação de que foi bloqueado).

**Envio**: `mail.ts` cria o transporte (`nodemailer.createTransport`) com `host`/`port`/`auth` das env vars, `secure: Number(SMTP_PORT) === 465`. `contact.ts` chama `transporter.sendMail` com:

- `to`: `CONTACT_TO_EMAIL`
- `from`: `SMTP_FROM`
- `replyTo`: e-mail informado pelo visitante (permite responder direto)
- `subject`: `Novo contato via site — {name}`
- `text`/`html`: nome, e-mail e mensagem do visitante

Se `SMTP_HOST`/`SMTP_USER`/`SMTP_PASSWORD`/`CONTACT_TO_EMAIL` não estiverem configuradas (ambiente sem `.env`), `mail.ts` não lança exceção pro usuário final: loga um `console.error` server-side e a action retorna estado `error` genérico ("Não foi possível enviar sua mensagem agora, tenta de novo mais tarde ou usa um dos links abaixo").

Se `sendMail` rejeitar (erro de SMTP em runtime), mesmo tratamento: log server-side + estado `error` genérico pro visitante, sem vazar detalhe técnico.

Em sucesso: estado `success`, mensagem de confirmação, formulário limpo.

## Conteúdo (pt-br — fonte da verdade, EN/ES são tradução)

Namespace novo em `messages/*.json`: `contactPage`.

```json
"contactPage": {
  "label": "Contato",
  "heading": "Vamos conversar?",
  "intro": "Me manda uma mensagem ou usa um dos links abaixo — respondo o mais rápido que der.",
  "form": {
    "nameLabel": "Nome",
    "namePlaceholder": "Seu nome",
    "emailLabel": "E-mail",
    "emailPlaceholder": "seu@email.com",
    "messageLabel": "Mensagem",
    "messagePlaceholder": "Conta um pouco sobre o que você precisa",
    "submit": "Enviar mensagem",
    "submitPending": "Enviando...",
    "successMessage": "Mensagem enviada! Retorno em breve.",
    "errorMessage": "Não foi possível enviar sua mensagem agora. Tenta de novo mais tarde ou usa um dos links abaixo.",
    "errors": {
      "nameRequired": "Digita seu nome.",
      "emailInvalid": "Digita um e-mail válido.",
      "messageRequired": "Escreve uma mensagem (mínimo 10 caracteres)."
    }
  },
  "directContact": {
    "heading": "Prefere falar direto?"
  }
}
```

Ícones do bloco `directContact` reaproveitam `nav.social` (`github`, `linkedin`, `email`) já existente, mais uma chave nova `nav.social.whatsapp`: `"WhatsApp"` (pt-br/en/es).

## Testes

- `contact.test.ts` (ambiente node, `src/lib/actions/tests/unit`): mocka `nodemailer.createTransport`.
  - rejeita campos vazios com `fieldErrors` corretos;
  - rejeita e-mail mal formatado;
  - chama `sendMail` com `to`/`from`/`replyTo`/`subject`/corpo esperados quando os dados são válidos;
  - retorna estado `success` sem chamar `sendMail` quando o honeypot vem preenchido;
  - retorna estado `error` genérico (sem vazar mensagem técnica) quando `sendMail` rejeita ou env vars faltam.
- `contact-form.test.tsx` (jsdom): mocka a action.
  - renderiza os três campos com `label` associado (`getByLabelText`);
  - desabilita o botão e mostra `submitPending` enquanto `pending`;
  - mostra `successMessage` e limpa o formulário após sucesso;
  - mostra `errors.*` por campo quando a action retorna `fieldErrors`;
  - renderiza os 4 links diretos (GitHub, LinkedIn, WhatsApp, e-mail) com `href` de `SOCIAL_LINKS`.
- `contact-page.test.tsx`: atualiza o teste existente (hoje testa o placeholder) pra confirmar que `ContactForm` renderiza dentro da página.
- Novo `src/tests/unit/messages-contact-page.test.ts`, mesmo padrão do `messages-technologies-page.test.ts`: paridade de chaves de `contactPage` entre pt-br/en/es (mesma estrutura, mesma quantidade de campos/erros).

## Ordem de execução (referência pro plano)

1. Adicionar `nodemailer`; `npx shadcn@latest add input label textarea`.
2. TDD de `mail.ts` + `contact.ts` (mockando nodemailer): validação, honeypot, sucesso, erro de SMTP/env ausente.
3. `contactPage` em `messages/pt-br.json`, depois traduzir pra `en.json`/`es.json`; `whatsapp` em `SOCIAL_LINKS` e em `nav.social`.
4. TDD de `contact-form.tsx` (organism), mockando a action.
5. Atualizar `contact-page.tsx` + `contact-page.test.tsx`.
6. Criar `messages-contact-page.test.ts` (paridade de idiomas).
7. Rodar lint, typecheck, `test:coverage` (cobertura mínima 90% já configurada em `vitest.config.mts`), build.

## Risco

Médio — primeira integração de backend real do site (SMTP via `nodemailer`), diferente do padrão 100% estático usado em `About`/`ProjectShowcase`/`TechStack`. Pontos de atenção:

- Credenciais SMTP reais (senha de app do Gmail) precisam estar configuradas em produção — sem elas, o form sempre cai no estado de erro genérico (comportamento esperado, não deve quebrar a build).
- Server Actions rodam em runtime Node por padrão (não Edge) — `nodemailer` depende de `net`/`tls`, não roda em Edge. Nenhuma configuração de `runtime = 'edge'` existe hoje no projeto, então não há conflito, mas vale confirmar isso no plano/implementação.
- Honeypot é mitigação leve, não substitui rate limiting — fora de escopo aqui (baixo tráfego esperado num portfólio pessoal).
