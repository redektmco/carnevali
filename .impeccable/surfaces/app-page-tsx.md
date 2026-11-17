---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

## Scope

Landing page geral do Grupo Carnevali (`app/page.tsx`). Modo: Persuade. Visitante de anúncio segmentado por serviço; ação = solicitar proposta técnica pelo formulário de pré-qualificação (modal + fim da página, mesma lógica).

## Constraints

Copy, ordem de seções, perguntas e regras de URL vêm do briefing da agência. Logo GC e cores do manual (#1f2b50, #c89235) são compromisso de marca. Fotos: reais, do Drive do cliente; serviços atribuídos a cada projeto aguardam validação.

## Direction contract

THESIS: O símbolo GC em chevron vira a moldura da página: obra real vista por janelas em chevron, e o formulário de pré-qualificação tratado como o objeto central da conversa, não um rodapé. Recusa o padrão do setor: foto genérica de capacete com headline centralizada e fileira de cards de ícone.

OWN-WORLD: Campo azul-marinho #1f2b50 dono do hero, dos diferenciais e da chamada final (cerca de 45% da página); dourado #c89235 só em ação, régua de 2px e chevron; concreto frio #eef0f2 e branco para leitura; fotos de canteiro sem filtro, em janelas de chevron ou retângulos retos; Hanken Grotesk pesada e compacta nos títulos, caixa-alta fina e espaçada (como "GRUPO" no logo) nas legendas; cantos retos.

STORY: Quem chega do anúncio entende que o grupo cobre a etapa dele, vê obra real (Armazém 3 do Parque Valongo: antes, durante, depois) e responde perguntas já direcionadas ao serviço do anúncio.

FIRST VIEWPORT: 1440x900. Header navy com logo negativo e botão dourado "Solicitar proposta". Hero navy: esquerda (7/12) headline branca em três linhas a ~68px, subheadline, CTA dourado + secundário em contorno; direita: foto real do içamento de treliça recortada em janela chevron apontando à esquerda, chevron dourado deslocado atrás como no símbolo, legenda do projeto. Base: linha de apoio com régua dourada. Com ?servico, aviso "Seu atendimento: <serviço>" acima dos botões.

FORM: seed: none (pinned) — "Cores: #1f2b50 e #c89235" (manual de cores do cliente) + logo GC + copy e ordem de seções fixadas no briefing. Interação-assinatura: o modal se materializa a partir do botão clicado, com etapas marcadas por chevrons; movimento orquestrado uma vez na entrada do hero (janela chevron revelada por clip-path).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Open decisions

- Serviços executados por projeto (portfólio) a validar com o cliente.
- Link da Política de Privacidade; URL do webhook do CRM; faixas de investimento e porte.
