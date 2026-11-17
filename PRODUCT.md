# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript, hospedado na Vercel, domínio previsto `lp.grupocarnevali.com.br`. Rota de servidor (`/api/lead`) repassa o lead a um webhook de CRM definido em `CRM_WEBHOOK_URL`. Escolha confirmada pela agência.

## Users

Empresas, indústrias, gestores de manutenção e facilities, construtoras e incorporadoras, administrações prediais, profissionais de engenharia e arquitetura, órgãos públicos e, em menor volume, pessoas físicas. Chegam majoritariamente por anúncio segmentado por serviço (obras de engenharia, estruturas metálicas, caldeiraria, serralheria e esquadrias, fachadas de vidro, reformas e retrofit), muitas vezes com uma demanda real em andamento e pouco tempo.

## Product Purpose

Landing page geral do Grupo Carnevali que apresenta todas as áreas de atuação e realiza uma pré-qualificação personalizada conforme a origem do anúncio. Sucesso = solicitações de proposta mais completas e direcionadas para o comercial, com serviço, tipo de projeto, porte, estágio, prazo, faixa de investimento, localização e UTMs registrados.

## Positioning

Grupo com especialidades integradas (engenharia civil e industrial, estruturas metálicas e caldeiraria, reformas e retrofit, obras portuárias, serralheria e esquadrias, fachadas e vidro), com equipes especializadas e acompanhamento técnico. Base em Santos (SP), com atuação em ambientes industriais, comerciais, estruturais e portuários.

## Operating Context

- Tráfego pago por serviço; a URL carrega `?servico=` e opcionalmente `&tipo=` para pré-selecionar o formulário.
- Todo botão de proposta abre o formulário em modal; o mesmo formulário existe no fim da página.
- Atendimento fora de Santos depende de serviço, local e porte.
- Faixas de investimento e de porte são sugestão inicial, a validar com o comercial.

## Capabilities and Constraints

- Serviços do formulário: Obras de Engenharia; Estruturas Metálicas e Caldeiraria; Serralheria, Esquadrias e Vidro; Reformas, Retrofit e Revitalizações; Outros serviços.
- Conversão registrada só após envio concluído com sucesso.
- Não exigir consentimento de marketing para enviar a solicitação.
- Não inventar prazos, números de obras, clientes, certificações, anos de mercado ou garantias.
- Política de Privacidade: link a ser fornecido pelo cliente.

## Brand Commitments

- Nome: Grupo Carnevali.
- Logo e cores oficiais: **pendentes**, a agência vai enviar. Até lá, a camada visual é provisória e deve ser fácil de trocar (tokens centralizados).
- Tom: técnico, sóbrio, objetivo. Sem promessas vagas ou jargão de marketing.

## Evidence on Hand

- Copy completa aprovada pela agência (briefing de LP).
- Fotos reais do portfólio: **pendentes** de validação. Imagens atuais são ilustrativas geradas por IA e identificadas como tal; trocar pelas reais com nome do projeto e serviço executado.
- Sem depoimentos, números ou logos de clientes confirmados: não fabricar.

## Product Principles

- Entender o projeto antes de vender: o formulário é o produto da página.
- Cada anúncio cai numa conversa já direcionada ao serviço dele.
- Mostrar campo e obra real antes de qualquer promessa.
- Pedir só o necessário, na ordem certa: projeto primeiro, dados pessoais por último.

## Accessibility & Inclusion

Contraste AA, alvos de toque de 44px, formulário e modal operáveis por teclado (foco preso no modal, Esc fecha, foco devolvido), erros anunciados em texto, respeito a `prefers-reduced-motion`. Uso frequente no celular.
