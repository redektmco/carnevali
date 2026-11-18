---
name: Grupo Carnevali
description: Obra real vista pela moldura em chevron do símbolo GC, em azul-marinho e dourado.
colors:
  navy: "#1f2b50"
  navy-deep: "#161f3b"
  navy-raise: "#2a3866"
  gold: "#c89235"
  gold-hover: "#d8a54d"
  gold-ink: "#85601d"
  ink: "#141b30"
  muted: "#545d72"
  on-navy-muted: "#c3c9d9"
  concrete: "#eef0f3"
  line: "#d6dae2"
  line-strong: "#8d95a8"
  white: "#ffffff"
  error: "#b42318"
typography:
  display:
    fontFamily: '"Hanken Grotesk Variable", system-ui, sans-serif'
    fontSize: "clamp(2.35rem, 4.4vw, 4.1rem)"
    fontWeight: 720
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Hanken Grotesk Variable", system-ui, sans-serif'
    fontSize: "clamp(1.95rem, 3.2vw, 2.95rem)"
    fontWeight: 680
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: '"Hanken Grotesk Variable", system-ui, sans-serif'
    fontSize: "1.18rem"
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: '"Hanken Grotesk Variable", system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: '"Hanken Grotesk Variable", system-ui, sans-serif'
    fontSize: "0.74rem"
    fontWeight: 560
    letterSpacing: "0.22em"
  button:
    fontFamily: '"Hanken Grotesk Variable", system-ui, sans-serif'
    fontSize: "0.95rem"
    fontWeight: 650
rounded:
  fine: "2px"
  control: "3px"
  panel: "4px"
  dialog: "6px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "28px"
  xl: "40px"
  block: "56px"
  section-mobile: "72px"
  section: "112px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy-deep}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 26px"
  button-gold-hover:
    backgroundColor: "{colors.gold-hover}"
  button-navy:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "0 26px"
  button-navy-hover:
    backgroundColor: "{colors.navy-raise}"
  button-outline-light:
    backgroundColor: transparent
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "0 26px"
  option:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 14px"
  option-selected:
    backgroundColor: "#f3f5fa"
    textColor: "{colors.navy}"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
  form-panel:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.panel}"
    padding: "44px 48px"
---

# Design System: Grupo Carnevali

## Overview

**Creative North Star: "Moldura em chevron"**

O símbolo GC tem duas peças em chevron, uma dourada e uma azul, apontando para a esquerda. A página usa essa geometria como moldura. A fotografia real de canteiro aparece numa janela com a forma da peça azul, com a faixa dourada deslocada atrás, como no logo. O mesmo chevron, virado para a direita, faz o papel de seta, marcador de lista, indicador de etapa e número de passo. Não há ícones genéricos.

O azul-marinho domina o hero, os diferenciais, a chamada final e o rodapé. O concreto frio e o branco servem para leitura e comparação. O dourado fica restrito à ação principal, às réguas de 2px e aos chevrons.

**Características:**

- Fotos reais de obra, com tratamento leve de cor, contraste e nitidez (sem filtro de estilo), em janelas de chevron ou retângulos retos de cantos de 2px.
- Uma única família, Hanken Grotesk, com títulos pesados e compactos e legendas em caixa-alta espaçada (eco do "G R U P O" do logotipo).
- Réguas douradas de 2px, como a linha do logotipo.
- O formulário de pré-qualificação tratado como objeto central, em modal e no fim da página.

## Colors

Cores do manual do cliente: `navy` (#1f2b50) e `gold` (#c89235). Todo o resto deriva delas.

- **Navy:** campo dominante, texto de títulos sobre claro, botão secundário.
- **Gold:** botão primário (texto navy-deep sobre dourado, 5:1), chevrons e réguas. Sobre fundo claro, o texto dourado usa `gold-ink` (#85601d) para alcançar AA.
- **Concrete / white:** seções de leitura alternadas.
- **on-navy-muted:** texto secundário sobre azul (contraste acima de 7:1).

## Typography

Hanken Grotesk Variable, hospedada localmente via @fontsource. Display e headline com tracking negativo e `text-wrap: balance`; corpo com entrelinha 1.6; legendas em caixa-alta com 0.22em de espaçamento. Números de passo com `tabular-nums`.

## Layout

Contêiner de até 1280px, com 56px de margem lateral (32px até 1100px, 20px até 760px). Seções com 112px de respiro (96px e 72px nos breakpoints). Áreas de atuação, FAQ e chamada final usam duas colunas 5/7 com a coluna de título fixa ao rolar. O portfólio é um mosaico de 4 colunas em que as obras com foto panorâmica ocupam 2 colunas e alternam de lado a cada linha (2 colunas no tablet e no celular), seguido da faixa de caldeiraria (peça e cliente).

## Elevation & Depth

Profundidade vem da alternância de campos, não de sombras. Sombra só no painel do formulário (`0 30px 60px rgb(5 9 20 / .28)`) e no modal (`0 40px 90px rgb(5 9 20 / .45)`). O cabeçalho vira material translúcido azul com blur ao rolar; com `prefers-reduced-transparency`, fica sólido.

## Motion

- **Entrada do hero (único momento orquestrado):** a janela em chevron se abre por `clip-path` em 1.1s e a faixa dourada desliza 40px, ambas com `cubic-bezier(0.16, 1, 0.3, 1)`. A foto se acomoda de 1.08 para 1.
- **Modal:** nasce do botão que o chamou (deslocamento proporcional à posição do gatilho, escala 0.92 para 1, 420ms). No celular, sobe como folha. Fecha pelo mesmo caminho em 200ms.
- **Etapas do formulário:** entrada de 10px com opacidade, 360ms.
- `prefers-reduced-motion` reduz tudo a cortes imediatos.

## Components

- **Botões:** dourado (ação principal), azul (ação em fundo claro), contorno claro (secundária sobre azul) e fantasma. Altura mínima de 54px (44px na versão compacta) e chevron que avança 3px no hover.
- **Opções do formulário:** rádios nativos sob caixas de 50px, com marcador circular que fica dourado com anel branco quando escolhido; borda dupla azul na seleção; foco com anel dourado de 3px.
- **Serviço pré-selecionado:** caixa com rótulo "Serviço", o nome com chevron dourado e o link "Alterar serviço".
- **Etapas:** duas etapas marcadas por chevrons; a atual tem o chevron em dourado.
- **Áreas de atuação:** lista com foto 4:3, título e texto. A linha inteira abre o modal já com o serviço correspondente.
- **Obras do portfólio:** cartão com foto de capa, nome, local e serviço; selo "+N fotos" quando há mais imagens. O cartão abre o visualizador.
- **Visualizador de fotos:** `<dialog>` azul-profundo com régua dourada no topo, foto inteira (`contain`), contador dourado, setas em chevron e miniaturas; ← → navegam, Esc fecha.
- **Antes / Durante / Depois:** três fotos do mesmo projeto, com etiquetas azuis e chevron dourado.

## Do's and Don'ts

### Do:

- **Do** usar fotos reais do cliente e identificar projeto e serviço, depois de validados.
- **Do** usar o chevron do logo como único sistema de marcadores e setas.
- **Do** manter o dourado como cor de ação, não de decoração espalhada.

### Don't:

- **Don't** inventar números de obras, clientes, prazos, certificações ou garantias.
- **Don't** usar ícones genéricos, faixas coloridas laterais em cartões ou texto em gradiente.
- **Don't** apresentar renders como fotos de obra concluída.
