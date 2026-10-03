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

## Outro projeto neste repositório

- [`comfyui-youtube-dubbing/`](comfyui-youtube-dubbing/) — workflow de **dublagem de vídeo
  com IA para ComfyUI**: link do YouTube (ou arquivo local) → transcrição → tradução →
  voz neural profissional sincronizada → vídeo dublado para download.
