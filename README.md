# LP Grupo Carnevali

Landing page geral do Grupo Carnevali com formulário de pré-qualificação em duas etapas. Next.js 16, React 19 e TypeScript, pensada para a Vercel (`lp.grupocarnevali.com.br`).

## Publicar na Vercel

1. Importe este repositório na Vercel (framework detectado: Next.js; nada a mudar no build).
2. Em **Settings → Environment Variables**, cadastre:

| Variável | Obrigatória | Para que serve |
|---|---|---|
| `CRM_WEBHOOK_URL` | sim, para receber leads | URL do webhook do CRM (Zapier, Make, n8n, RD Station, HubSpot, Pipedrive…). Sem ela, o lead só fica registrado no log da Vercel. |
| `CRM_WEBHOOK_TOKEN` | não | Enviado como `Authorization: Bearer …`, se o webhook exigir. |
| `NEXT_PUBLIC_PRIVACY_URL` | sim, antes de publicar | Link da Política de Privacidade (formulário e rodapé). |
| `NEXT_PUBLIC_SITE_URL` | não | Domínio final. Padrão: `https://lp.grupocarnevali.com.br`. |

3. Aponte o domínio `lp.grupocarnevali.com.br` para o projeto.

## URLs para os anúncios

O parâmetro `servico` pré-seleciona o serviço (a primeira pergunta some e aparece "Alterar serviço"); `tipo` pré-seleciona a segunda pergunta.

| Anúncio | URL |
|---|---|
| Obras de Engenharia | `/?servico=obras-engenharia` |
| Obras Industriais | `/?servico=obras-engenharia&tipo=industrial` |
| Obras Portuárias | `/?servico=obras-engenharia&tipo=portuaria` |
| Estruturas Metálicas | `/?servico=estruturas-metalicas` |
| Caldeiraria | `/?servico=estruturas-metalicas&tipo=caldeiraria` |
| Serralheria e Esquadrias | `/?servico=serralheria-esquadrias` |
| Fachadas de Vidro | `/?servico=serralheria-esquadrias&tipo=fachadas-vidro` |
| Reformas e Retrofit | `/?servico=reformas-retrofit` |
| Retrofit e modernização | `/?servico=reformas-retrofit&tipo=retrofit` |

Todos os valores de `tipo` estão em `lib/form-config.ts`. Acrescente as UTMs normalmente (`&utm_source=…&utm_campaign=…`): elas vão junto com o lead.

## O que chega no CRM

`POST` em JSON, com `servico`, `tipo_projeto`, `porte`, `especificacoes` (caldeiraria), `estagio`, `inicio`, `investimento`, `solicitante`, `contato` (nome, empresa, cargo, WhatsApp, e-mail), `obra` (cidade, UF), `mensagem`, `consentimento`, `campanha` (UTMs, gclid, fbclid, URL de entrada, referrer) e `anexo` (nome, tipo, tamanho e conteúdo em base64, até 4 MB).

## Conversão

Depois que a API responde com sucesso (e só então), a página envia `generate_lead` ao `dataLayer` e chama `gtag('event','generate_lead')` e `fbq('track','Lead')`, se existirem. Instale o GTM ou os pixels no `app/layout.tsx` e use esse evento como gatilho.

## Editar conteúdo

- Textos e projetos: `lib/content.ts`
- Perguntas, opções e faixas do formulário: `lib/form-config.ts`
- Cores e estilos: `app/globals.css` (variáveis no topo)
- Fotos: `public/img/` · Logo: `public/brand/`

## Rodar localmente

```sh
npm ci
npm run dev
```

## Pendências antes de publicar

- Validar com o Grupo Carnevali os serviços atribuídos a cada projeto do portfólio (`lib/content.ts`).
- Validar com o comercial as faixas de investimento e de porte.
- Link da Política de Privacidade e URL do webhook do CRM.
