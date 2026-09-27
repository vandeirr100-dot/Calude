# TrendLine CheatCode — MT5

Indicador para MetaTrader 5 (`TrendLine_CheatCode_Indicator.mq5`).

## Novidades da versão 2.00

- **Painel moderno** (canto superior esquerdo, pode ser minimizado) com botões ON/OFF por tempo gráfico:
  - **LT** – linhas de tendência automáticas (Ponto A → Ponto B, zero interseção) de cada TF.
  - **S/R** – linhas horizontais de suporte e resistência de cada TF.
  - Tempos gráficos: **MN, W1, D1, H4, H1, M30, M15** + o gráfico atual (se não estiver na lista, ex.: M5, H2).
  - Rodapé: ligar/desligar todas as LT, todos os S/R, relógio, setas de sinal e rótulos.
  - O estado dos botões fica salvo por gráfico (sobrevive à troca de tempo gráfico).
- **Suporte e Resistência MTF**: topos e fundos confirmados em cada TF, agrupados em zonas; mostra os níveis mais próximos acima (R) e abaixo (S) do preço, com número de toques no rótulo. D1 ou maior = linha sólida e grossa.
- **Relógio regressivo** do candle do gráfico atual: no painel (com barra de progresso) e numa etiqueta ao lado do preço. Fica laranja nos últimos 25% e vermelho nos últimos 10% do tempo.

## Instalação

1. Copie `TrendLine_CheatCode_Indicator.mq5` para `MQL5/Indicators/` (Arquivo → Abrir pasta de dados).
2. Abra no MetaEditor e compile (F7).
3. Arraste o indicador para o gráfico.

## Entradas principais

| Grupo | Entrada | Função |
|---|---|---|
| MTF | `LT ligadas ao iniciar` | Ex.: `ATUAL,D1,W1` |
| S/R | `S/R ligados ao iniciar` | Ex.: `W1,D1,H4` |
| S/R | `Velas de cada lado` | Força do topo/fundo |
| S/R | `Máx. níveis acima e abaixo` | Quantidade de níveis por TF |
| Painel | `Posição do painel` | Em cima/embaixo, esquerda/direita (ou botão **POS** no painel) |
| Painel | `Margem horizontal / vertical` | Distância da borda escolhida |

---

# Trade Assistant BR — MT5

Boleta visual (`TradeAssistant_BR.mq5`, Expert Advisor) com caixas de Risco/Gain arrastáveis.

## Novidades da versão 1.80

- **Painel no mesmo padrão visual do painel TrendLine CheatCode**: fundo escuro, cabeçalho com barra de destaque, cartões (Saldo / Lucro do EA e Gain / Stop / R:R), botões "pílula" (aceso = cor de destaque, apagado = cinza), compra verde-água e venda vermelha, largura 260 px.
- Nova entrada `Cor de Destaque do Painel` (padrão azul `C'0,168,255'`, igual ao TrendLine).
- Arquivo salvo em UTF-8 com BOM para os acentos aparecerem corretamente no MT5.

## Novidades da versão 1.71

- **Lucro do painel** agora soma só as posições deste EA neste ativo (mesmo valor da coluna "Lucro" da plataforma). Antes somava a conta inteira.

## Novidades da versão 1.70

- **Recálculo em tempo real ao arrastar as linhas**: Lote, Gain, Stop e R:R são atualizados *durante* o arrasto (o MT5 só avisa ao soltar; agora o EA lê as linhas a cada 200 ms e no movimento do mouse).
  - Com relação fixa (1:1, 2:1, 3:1) o TP acompanha a entrada/stop; arrastar o TP muda para **Livre**.
- **Painel com valores reais do trade**: sem linhas ativas, o bloco GAIN/STOP mostra o trade aberto/pendente (lote, SL e TP da corretora + L&P), e não mais a última prévia.
- **Clique na caixa de Risco/Gain** (depois de enviada) para mostrar/esconder os dados no estilo TradingView:
  - `Objetivo: distância (%) pts, Valor` (verde) · `Aberto L&P ..., Qtde` + `Razão risco/retorno` · `Stop: distância (%) pts, Valor` (vermelho).
  - Entrada `Dados Sempre Visíveis` para deixar sempre à mostra.
- A prévia das linhas usa os mesmos badges.
- Cálculo de dinheiro com plano B pelo valor do tick (corretoras de cripto/índices); lote aceita qualquer passo de volume.
- Lote digitado à mão é respeitado até clicar em **Calc** ou mudar o risco.
- Botões COMPRAR/VENDER a mercado colocam SL/TP sempre do lado certo.

## Novidades da versão 1.60

- **Caixa de Risco/Gain continua no gráfico depois que a ordem é enviada** (igual à ferramenta de posição do TradingView):
  - Cores do TradingView: ganho `C'206,235,230'`, risco `C'252,215,218'`.
  - A caixa fica presa no horário do envio e se estende conforme as velas andam.
  - Enquanto o trade está aberto, a faixa entre a entrada e o preço atual fica **mais forte**: verde no lucro, rosa no prejuízo.
  - Ordem pendente aparece com as cores claras até ser executada; se for cancelada, a caixa some.
  - SL/TP alterados (ex.: Breakeven) são refletidos na caixa.
  - Ao fechar, a caixa fica congelada com o resultado (`FECHADA +xx.xx USD (+x.xxR)`).
- Novas entradas no grupo **Acompanhamento Após o Envio**: ligar/desligar, cores fortes de lucro/prejuízo, cor da linha de entrada e manter/remover caixas fechadas.
