//+------------------------------------------------------------------+
//|                                            TradeAssistant_BR.mq5 |
//|                                  Trade Assistant MT5 - Português |
//|               Boleta Visual com Caixas de Risco / Ganho no MT5   |
//+------------------------------------------------------------------+
#property copyright   "Trade Assistant MT5 - Edição em Português"
#property link        "https://www.mql5.com"
#property version     "1.70"
#property description "Boleta com cálculo dinâmico visível nas linhas e painel: Risco, Gain e R:R (tipo 3:1)."
#property description "Gráfico inicia limpo. Criação de linhas sob demanda com arrasto 100% livre."
#property description "Envio ao desmarcar as linhas ou ao clicar em Enviar Ordem."
#property description "Após o envio, a caixa de Risco/Gain fica no gráfico e muda de cor conforme o trade anda (estilo TradingView)."

#include <Trade\Trade.mqh>
#include <Trade\PositionInfo.mqh>
#include <Trade\OrderInfo.mqh>

//--- Enums de Configuração
enum ENUM_RISK_MODE
{
   RISK_PERCENT_BALANCE,  // % do Saldo
   RISK_PERCENT_EQUITY,   // % do Patrimônio Líquido
   RISK_FIXED_MONEY       // Valor Fixo Monetário (R$ ou $)
};

enum ENUM_TRADE_DIR
{
   DIR_BUY,               // Compra
   DIR_SELL               // Venda
};

enum ENUM_RR_RATIO
{
   RR_FREE,               // Livre (Arrasto Manual)
   RR_1_1,                // 1 : 1
   RR_2_1,                // 2 : 1
   RR_3_1                 // 3 : 1
};

//--- Parâmetros de Entrada (Inputs)
input group "=== Cores das Caixas e Linhas ==="
input color          InpColorGainBox       = C'206,235,230';      // Caixa de Ganho (Verde TradingView)
input color          InpColorRiskBox       = C'252,215,218';      // Caixa de Risco (Rosa TradingView)
input color          InpColorBadgeTP       = C'8,153,129';        // Badge Objetivo/TP (Verde TradingView)
input color          InpColorBadgeEntry    = C'8,153,129';        // Badge Entrada (Verde TradingView)
input color          InpColorBadgeSL       = C'242,54,69';        // Badge Stop (Vermelho TradingView)
input color          InpColorLineTP        = C'235,70,50';        // Linha Take Profit (Vermelha)
input color          InpColorLineEntry     = C'40,180,40';        // Linha Entrada (Verde)
input color          InpColorLineSL        = C'235,70,50';        // Linha Stop Loss (Vermelha)
input int            InpBoxBarsWidth       = 30;                  // Largura da Caixa (Barras Futuras)

input group "=== Configurações de Risco ==="
input ENUM_RISK_MODE InpRiskMode           = RISK_PERCENT_BALANCE;// Modo de Risco Inicial
input double         InpRiskValue          = 1.0;                 // Risco (% do Saldo ou Moeda)
input ENUM_RR_RATIO  InpDefaultRR          = RR_3_1;              // Relação Inicial Padrão (3:1)
input double         InpFixedLot           = 0.01;                // Lote Mínimo

input group "=== Configurações de Envio e Execução ==="
input bool           InpAutoSendOnUnselect = true;                // Enviar ao Tirar a Seleção das Linhas
input ulong          InpMagicNumber        = 88823415;            // Magic Number
input ulong          InpSlippage           = 10;                  // Desvio Máximo (Slippage em pontos)
input string         InpTradeComment       = "TradeAssistant BR"; // Comentário da Ordem
input bool           InpPlaySounds         = true;                // Sons de Execução

input group "=== Acompanhamento Após o Envio (Estilo TradingView) ==="
input bool           InpTrackAfterSend     = true;                // Manter Caixas no Gráfico Após Enviar
input color          InpColorGainActive    = C'156,214,205';      // Trade no Lucro (Verde Mais Forte)
input color          InpColorRiskActive    = C'250,175,181';      // Trade no Prejuízo (Rosa Mais Forte)
input color          InpColorTrackEntry    = C'120,123,134';      // Linha de Entrada da Caixa (Cinza)
input bool           InpKeepClosedTrades   = true;                // Manter Caixa Congelada Após Fechar
input bool           InpShowInfoAlways     = false;               // Dados Sempre Visíveis (senão: clique na caixa)

//--- Nomes dos Objetos no Gráfico
#define PREFIX_GUI       "TABR_GUI_"
#define OBJ_BOX_GAIN     "TABR_BOX_GAIN"
#define OBJ_BOX_RISK     "TABR_BOX_RISK"
#define OBJ_LINE_ENT     "TABR_LINE_ENTRY"
#define OBJ_LINE_SL      "TABR_LINE_SL"
#define OBJ_LINE_TP      "TABR_LINE_TP"
#define OBJ_BADGE_TP     "TABR_BDG_TP"
#define OBJ_BADGE_ENT    "TABR_BDG_ENT"
#define OBJ_BADGE_SL     "TABR_BDG_SL"
#define OBJ_TXT_TP       "TABR_TXT_TP"
#define OBJ_TXT_ENT      "TABR_TXT_ENT"
#define OBJ_TXT_SL       "TABR_TXT_SL"
#define PREFIX_TRK       "TABR_TRK_"

//--- Acompanhamento das ordens enviadas (caixas que ficam no gráfico)
enum ENUM_TRACK_STATE
{
   TRK_PENDING,           // Ordem pendente aguardando execução
   TRK_OPEN,              // Posição aberta (caixa muda de cor com o preço)
   TRK_CLOSED             // Posição encerrada (caixa congelada)
};

struct TradeTrack
{
   ulong    order_ticket;
   ulong    pos_id;
   bool     is_buy;
   double   entry;
   double   sl;
   double   tp;
   double   cur_price;
   double   close_price;
   double   result_money;
   double   volume;
   bool     show_info;
   datetime t_start;
   datetime t_end;
   datetime t_fill;
   datetime t_close;
   int      state;
};

TradeTrack     g_tracks[];

//--- Instâncias Globais de Negociação
CTrade         m_trade;
CPositionInfo  m_position;
COrderInfo     m_order;

//--- Variáveis de Estado Interno
ENUM_TRADE_DIR g_dir                = DIR_BUY;
ENUM_RISK_MODE g_risk_mode          = RISK_PERCENT_BALANCE;
ENUM_RR_RATIO  g_rr_ratio           = RR_FREE;
double         g_risk_value         = 1.0;
double         g_calc_lot           = 0.01;

// O gráfico inicia 100% limpo sem linhas
bool           g_lines_active       = false; 
bool           g_auto_send          = true;
bool           g_panel_minimized    = false;

// Coordenadas das Linhas
double         g_entry_price        = 0.0;
double         g_sl_price           = 0.0;
double         g_tp_price           = 0.0;

// Estado para controle suave de arrasto e desmarcação
bool           g_is_dragging        = false;
bool           g_line_was_moved     = false;
bool           g_lines_were_selected = false;

// Lote digitado manualmente (não é recalculado pelo risco até clicar em Calc)
bool           g_manual_lot         = false;
double         g_lot_shown          = -1.0;
int            g_timer_ticks        = 0;

// Coordenadas e Dimensões da Boleta
int            g_panel_x            = 15;
int            g_panel_y            = 35;
int            g_panel_w            = 275;
int            g_panel_h            = 405;

//+------------------------------------------------------------------+
//| Protótipos de Funções Auxiliares                                 |
//+------------------------------------------------------------------+
void CreatePanelGUI();
void DestroyPanelGUI();
void UpdatePanelInfo();
void CreateChartVisualLines();
void DestroyChartVisualLines();
void UpdateChartVisuals(string dragging_object="");
void RecalculateRiskAndLot();
void CheckUnselectAndOrder();
void SendConfiguredOrder();
void SetMarketLevels(ENUM_TRADE_DIR dir);
void MoveToBreakeven();
void CloseHalfPositions();
void CloseAllPositions();
double NormalizePrice(double price);
double NormalizeLot(double lot);
double CalcMoney(bool is_buy, double lot, double price_open, double price_close);
int PlaceBadge(string name, string text, color bg, int x_center, int y, bool visible);
string TvLevelText(string title, double entry, double level, double money);
void DrawInfoBadges(string n_tp, string n_mid, string n_sl, int x_center, bool is_buy,
                    double entry, double sl, double tp, double lot,
                    int state, double cur_price, double pl_money, bool hide);
void DrawAllTracks();
bool ToggleTrackInfoAt(int x, int y);
bool SyncLinesFromChart();
void AddTrack(ulong order_ticket, ulong pos_id, bool is_buy, double entry, double sl, double tp,
              datetime t_start, datetime t_fill, int state, double volume);
void RebuildTracksFromTrade();
void UpdateTrackers();
void DeleteTrackObjects(const TradeTrack &t);

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
   ChartSetInteger(0, CHART_FOREGROUND, 0);

   m_trade.SetExpertMagicNumber(InpMagicNumber);
   m_trade.SetDeviationInPoints(InpSlippage);
   m_trade.SetTypeFillingBySymbol(_Symbol);

   g_risk_mode    = InpRiskMode;
   g_risk_value   = InpRiskValue;
   g_rr_ratio     = InpDefaultRR;
   g_auto_send    = InpAutoSendOnUnselect;

   g_lines_active = false;
   g_line_was_moved = false;
   g_lines_were_selected = false;

   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   int digits = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);

   double default_dist = 150 * point;
   if(default_dist < 10 * point) default_dist = 0.0015;

   g_entry_price = NormalizeDouble(ask, digits);
   g_sl_price    = NormalizeDouble(ask - default_dist, digits);
   g_tp_price    = NormalizeDouble(ask + (default_dist * 3.0), digits);

   CreatePanelGUI();
   RecalculateRiskAndLot();
   UpdatePanelInfo();

   // Recria as caixas das ordens/posições deste EA (ex.: após trocar o tempo gráfico)
   RebuildTracksFromTrade();
   UpdateTrackers();

   // Timer rápido (200 ms) para recalcular Gain/Stop/Lote enquanto as linhas são arrastadas
   ChartSetInteger(0, CHART_EVENT_MOUSE_MOVE, true);
   EventSetMillisecondTimer(200);
   ChartRedraw();

   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   EventKillTimer();
   DestroyPanelGUI();
   DestroyChartVisualLines();

   // Troca de tempo gráfico/parâmetros: caixas já fechadas ficam congeladas no gráfico,
   // as abertas/pendentes são recriadas no OnInit. Ao remover o EA, limpa tudo.
   bool keep_closed = (reason == REASON_CHARTCHANGE || reason == REASON_PARAMETERS || reason == REASON_RECOMPILE);
   if(keep_closed)
   {
      for(int i = 0; i < ArraySize(g_tracks); i++)
         if(g_tracks[i].state != TRK_CLOSED)
            DeleteTrackObjects(g_tracks[i]);
   }
   else
      ObjectsDeleteAll(0, PREFIX_TRK);

   ChartRedraw();
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
   UpdatePanelInfo();
   UpdateTrackers();
}

//+------------------------------------------------------------------+
//| Timer function                                                   |
//+------------------------------------------------------------------+
void OnTimer()
{
   // Linha sendo arrastada: recalcula tudo na hora
   if(g_lines_active && SyncLinesFromChart())
      return;
   g_is_dragging = false;

   // Demais atualizações a cada ~1 segundo
   g_timer_ticks++;
   if(g_timer_ticks % 5 != 0) return;

   UpdatePanelInfo();
   UpdateTrackers();
   if(g_lines_active && g_auto_send)
      CheckUnselectAndOrder();
   ChartRedraw();
}

//+------------------------------------------------------------------+
//| Normaliza o lote de acordo com as regras da corretora            |
//+------------------------------------------------------------------+
double NormalizeLot(double lot)
{
   double min_lot  = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MIN);
   double max_lot  = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_MAX);
   double step_lot = SymbolInfoDouble(_Symbol, SYMBOL_VOLUME_STEP);

   if(step_lot <= 0) step_lot = 0.01;

   lot = MathFloor(lot / step_lot + 1e-8) * step_lot;

   if(lot < min_lot) lot = min_lot;
   if(lot > max_lot) lot = max_lot;

   int step_digits = 0;
   double tmp_step = step_lot;
   while(step_digits < 8 && MathAbs(tmp_step - MathRound(tmp_step)) > 1e-8)
   {
      tmp_step *= 10.0;
      step_digits++;
   }

   return NormalizeDouble(lot, step_digits);
}

//+------------------------------------------------------------------+
//| Normaliza o preço com base no tick size do ativo                 |
//+------------------------------------------------------------------+
double NormalizePrice(double price)
{
   double tick_size = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   if(tick_size <= 0) tick_size = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   int digits = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);

   return NormalizeDouble(MathRound(price / tick_size) * tick_size, digits);
}

//+------------------------------------------------------------------+
//| Valor monetário (na moeda da conta) de ir de price_open a        |
//| price_close com o lote informado. Positivo = lucro.              |
//+------------------------------------------------------------------+
double CalcMoney(bool is_buy, double lot, double price_open, double price_close)
{
   if(lot <= 0 || price_open <= 0 || price_close <= 0) return 0.0;

   double money = 0.0;
   ENUM_ORDER_TYPE type = is_buy ? ORDER_TYPE_BUY : ORDER_TYPE_SELL;
   if(OrderCalcProfit(type, _Symbol, lot, price_open, price_close, money) && money != 0.0)
      return money;

   // Plano B: pelo valor do tick (algumas corretoras de cripto/índices falham no OrderCalcProfit)
   double diff = is_buy ? (price_close - price_open) : (price_open - price_close);
   double tick_size  = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   double tick_value = (diff >= 0) ? SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE_PROFIT)
                                   : SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE_LOSS);
   if(tick_value <= 0) tick_value = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_VALUE);
   if(tick_size <= 0 || tick_value <= 0) return 0.0;

   return (diff / tick_size) * tick_value * lot;
}

//+------------------------------------------------------------------+
//| Recalcula o lote rigorosamente pelo % de risco informado         |
//| (se o lote foi digitado à mão, mantém o lote e só recalcula      |
//|  Stop/Gain em dinheiro no painel)                                |
//+------------------------------------------------------------------+
void RecalculateRiskAndLot()
{
   // Identifica direção automaticamente de acordo com o posicionamento do SL
   if(g_sl_price < g_entry_price)
      g_dir = DIR_BUY;
   else if(g_sl_price > g_entry_price)
      g_dir = DIR_SELL;

   if(g_manual_lot) return;

   double sl_distance = MathAbs(g_entry_price - g_sl_price);
   if(sl_distance <= 0)
   {
      g_calc_lot = NormalizeLot(InpFixedLot);
      return;
   }

   double capital = 0.0;
   if(g_risk_mode == RISK_PERCENT_BALANCE)
      capital = AccountInfoDouble(ACCOUNT_BALANCE);
   else if(g_risk_mode == RISK_PERCENT_EQUITY)
      capital = AccountInfoDouble(ACCOUNT_EQUITY);

   double risk_money = 0.0;
   if(g_risk_mode == RISK_FIXED_MONEY)
      risk_money = g_risk_value;
   else
      risk_money = (capital * g_risk_value) / 100.0;

   if(risk_money <= 0) risk_money = 10.0;

   double loss_per_1_lot = MathAbs(CalcMoney(g_dir == DIR_BUY, 1.0, g_entry_price, g_sl_price));
   if(loss_per_1_lot <= 0.0)
   {
      g_calc_lot = NormalizeLot(InpFixedLot);
      return;
   }

   g_calc_lot = NormalizeLot(risk_money / loss_per_1_lot);
}

//+------------------------------------------------------------------+
//| Lê a posição atual das linhas no gráfico (inclusive DURANTE o    |
//| arrasto) e recalcula Lote, Gain, Stop e R:R na hora.             |
//| Retorna true se alguma linha mudou.                              |
//+------------------------------------------------------------------+
bool SyncLinesFromChart()
{
   if(!g_lines_active) return false;
   if(ObjectFind(0, OBJ_LINE_ENT) < 0 || ObjectFind(0, OBJ_LINE_SL) < 0 || ObjectFind(0, OBJ_LINE_TP) < 0)
      return false;

   double tick = SymbolInfoDouble(_Symbol, SYMBOL_TRADE_TICK_SIZE);
   if(tick <= 0) tick = _Point;

   double ent = NormalizePrice(ObjectGetDouble(0, OBJ_LINE_ENT, OBJPROP_PRICE));
   double sl  = NormalizePrice(ObjectGetDouble(0, OBJ_LINE_SL,  OBJPROP_PRICE));
   double tp  = NormalizePrice(ObjectGetDouble(0, OBJ_LINE_TP,  OBJPROP_PRICE));

   bool ent_moved = MathAbs(ent - g_entry_price) >= tick * 0.5;
   bool sl_moved  = MathAbs(sl  - g_sl_price)    >= tick * 0.5;
   bool tp_moved  = MathAbs(tp  - g_tp_price)    >= tick * 0.5;

   if(!ent_moved && !sl_moved && !tp_moved) return false;

   string moving = "";
   if(ent_moved) { g_entry_price = ent; moving = OBJ_LINE_ENT; }
   if(sl_moved)  { g_sl_price    = sl;  moving = OBJ_LINE_SL;  }
   if(tp_moved)  { g_tp_price    = tp;  moving = OBJ_LINE_TP;  }

   if(tp_moved)
   {
      // Ajuste manual do alvo: relação passa a ser livre
      g_rr_ratio = RR_FREE;
   }
   else if(g_rr_ratio != RR_FREE)
   {
      // Relação fixa (1:1, 2:1, 3:1): o alvo acompanha a entrada/stop
      double mult = (g_rr_ratio == RR_1_1) ? 1.0 : (g_rr_ratio == RR_2_1) ? 2.0 : 3.0;
      double dist = MathAbs(g_entry_price - g_sl_price);
      if(g_sl_price < g_entry_price) g_tp_price = NormalizePrice(g_entry_price + dist * mult);
      else if(g_sl_price > g_entry_price) g_tp_price = NormalizePrice(g_entry_price - dist * mult);
   }

   g_line_was_moved = true;
   g_is_dragging    = true;
   RecalculateRiskAndLot();
   UpdateChartVisuals(moving);
   UpdatePanelInfo();
   ChartRedraw();
   return true;
}

//+------------------------------------------------------------------+
//| Cria as Linhas e Caixas Coloridas (Sob Demanda)                  |
//+------------------------------------------------------------------+
void CreateChartVisualLines()
{
   datetime t1 = TimeCurrent();
   datetime t2 = t1 + PeriodSeconds() * InpBoxBarsWidth;

   // 1. Caixa de Ganho (Verde Pastel)
   if(ObjectFind(0, OBJ_BOX_GAIN) < 0)
   {
      ObjectCreate(0, OBJ_BOX_GAIN, OBJ_RECTANGLE, 0, t1, g_entry_price, t2, g_tp_price);
      ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_COLOR, InpColorGainBox);
      ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_FILL, true);
      ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_BACK, true);
      ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_ZORDER, 0);
      ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_HIDDEN, true);
   }

   // 2. Caixa de Risco (Rosa Pastel)
   if(ObjectFind(0, OBJ_BOX_RISK) < 0)
   {
      ObjectCreate(0, OBJ_BOX_RISK, OBJ_RECTANGLE, 0, t1, g_entry_price, t2, g_sl_price);
      ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_COLOR, InpColorRiskBox);
      ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_FILL, true);
      ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_BACK, true);
      ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_ZORDER, 0);
      ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_HIDDEN, true);
   }

   // 3. Linha de Entrada (Verde Pontilhada)
   if(ObjectFind(0, OBJ_LINE_ENT) < 0)
   {
      ObjectCreate(0, OBJ_LINE_ENT, OBJ_HLINE, 0, 0, g_entry_price);
      ObjectSetInteger(0, OBJ_LINE_ENT, OBJPROP_COLOR, InpColorLineEntry);
      ObjectSetInteger(0, OBJ_LINE_ENT, OBJPROP_STYLE, STYLE_DOT);
      ObjectSetInteger(0, OBJ_LINE_ENT, OBJPROP_WIDTH, 2);
      ObjectSetInteger(0, OBJ_LINE_ENT, OBJPROP_SELECTABLE, true);
      ObjectSetInteger(0, OBJ_LINE_ENT, OBJPROP_SELECTED, true);
      ObjectSetInteger(0, OBJ_LINE_ENT, OBJPROP_BACK, false);
      ObjectSetInteger(0, OBJ_LINE_ENT, OBJPROP_ZORDER, 10);
      ObjectSetString(0, OBJ_LINE_ENT, OBJPROP_TOOLTIP, "ENTRADA: Arraste livremente!");
   }

   // 4. Linha de Stop Loss (Vermelha)
   if(ObjectFind(0, OBJ_LINE_SL) < 0)
   {
      ObjectCreate(0, OBJ_LINE_SL, OBJ_HLINE, 0, 0, g_sl_price);
      ObjectSetInteger(0, OBJ_LINE_SL, OBJPROP_COLOR, InpColorLineSL);
      ObjectSetInteger(0, OBJ_LINE_SL, OBJPROP_STYLE, STYLE_DASHDOT);
      ObjectSetInteger(0, OBJ_LINE_SL, OBJPROP_WIDTH, 2);
      ObjectSetInteger(0, OBJ_LINE_SL, OBJPROP_SELECTABLE, true);
      ObjectSetInteger(0, OBJ_LINE_SL, OBJPROP_SELECTED, true);
      ObjectSetInteger(0, OBJ_LINE_SL, OBJPROP_BACK, false);
      ObjectSetInteger(0, OBJ_LINE_SL, OBJPROP_ZORDER, 10);
      ObjectSetString(0, OBJ_LINE_SL, OBJPROP_TOOLTIP, "STOP LOSS: Arraste livremente!");
   }

   // 5. Linha de Take Profit (Vermelha)
   if(ObjectFind(0, OBJ_LINE_TP) < 0)
   {
      ObjectCreate(0, OBJ_LINE_TP, OBJ_HLINE, 0, 0, g_tp_price);
      ObjectSetInteger(0, OBJ_LINE_TP, OBJPROP_COLOR, InpColorLineTP);
      ObjectSetInteger(0, OBJ_LINE_TP, OBJPROP_STYLE, STYLE_DASHDOT);
      ObjectSetInteger(0, OBJ_LINE_TP, OBJPROP_WIDTH, 2);
      ObjectSetInteger(0, OBJ_LINE_TP, OBJPROP_SELECTABLE, true);
      ObjectSetInteger(0, OBJ_LINE_TP, OBJPROP_SELECTED, true);
      ObjectSetInteger(0, OBJ_LINE_TP, OBJPROP_BACK, false);
      ObjectSetInteger(0, OBJ_LINE_TP, OBJPROP_ZORDER, 10);
      ObjectSetString(0, OBJ_LINE_TP, OBJPROP_TOOLTIP, "TAKE PROFIT: Arraste livremente!");
   }

   // 6. Textos Informados Diretamente sobre as Linhas (Acompanham as Velas em Tempo Real)
   // Texto do TP
   if(ObjectFind(0, OBJ_TXT_TP) < 0)
   {
      ObjectCreate(0, OBJ_TXT_TP, OBJ_TEXT, 0, t1, g_tp_price);
      ObjectSetInteger(0, OBJ_TXT_TP, OBJPROP_COLOR, C'0,160,0');
      ObjectSetString(0, OBJ_TXT_TP, OBJPROP_FONT, "Segoe UI Bold");
      ObjectSetInteger(0, OBJ_TXT_TP, OBJPROP_FONTSIZE, 9);
      ObjectSetInteger(0, OBJ_TXT_TP, OBJPROP_ANCHOR, ANCHOR_LEFT_LOWER);
      ObjectSetInteger(0, OBJ_TXT_TP, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, OBJ_TXT_TP, OBJPROP_BACK, false);
      ObjectSetInteger(0, OBJ_TXT_TP, OBJPROP_ZORDER, 5);
   }

   // Texto da Entrada
   if(ObjectFind(0, OBJ_TXT_ENT) < 0)
   {
      ObjectCreate(0, OBJ_TXT_ENT, OBJ_TEXT, 0, t1, g_entry_price);
      ObjectSetInteger(0, OBJ_TXT_ENT, OBJPROP_COLOR, C'0,100,220');
      ObjectSetString(0, OBJ_TXT_ENT, OBJPROP_FONT, "Segoe UI Bold");
      ObjectSetInteger(0, OBJ_TXT_ENT, OBJPROP_FONTSIZE, 9);
      ObjectSetInteger(0, OBJ_TXT_ENT, OBJPROP_ANCHOR, ANCHOR_LEFT_LOWER);
      ObjectSetInteger(0, OBJ_TXT_ENT, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, OBJ_TXT_ENT, OBJPROP_BACK, false);
      ObjectSetInteger(0, OBJ_TXT_ENT, OBJPROP_ZORDER, 5);
   }

   // Texto do SL
   if(ObjectFind(0, OBJ_TXT_SL) < 0)
   {
      ObjectCreate(0, OBJ_TXT_SL, OBJ_TEXT, 0, t1, g_sl_price);
      ObjectSetInteger(0, OBJ_TXT_SL, OBJPROP_COLOR, C'200,30,30');
      ObjectSetString(0, OBJ_TXT_SL, OBJPROP_FONT, "Segoe UI Bold");
      ObjectSetInteger(0, OBJ_TXT_SL, OBJPROP_FONTSIZE, 9);
      ObjectSetInteger(0, OBJ_TXT_SL, OBJPROP_ANCHOR, ANCHOR_LEFT_UPPER);
      ObjectSetInteger(0, OBJ_TXT_SL, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, OBJ_TXT_SL, OBJPROP_BACK, false);
      ObjectSetInteger(0, OBJ_TXT_SL, OBJPROP_ZORDER, 5);
   }

   // 7. Badges (Objetivo / Qtde / Stop) são criados em UpdateChartVisuals -> DrawInfoBadges

   g_lines_were_selected = true;
   g_line_was_moved = false;
}

//+------------------------------------------------------------------+
//| Atualiza as posições e textos das caixas e badges                |
//| Mostra Risco, Gain e RR (tipo 3:1) em tempo real nas linhas      |
//+------------------------------------------------------------------+
void UpdateChartVisuals(string dragging_object="")
{
   if(!g_lines_active) return;

   datetime t1 = TimeCurrent();
   datetime t2 = t1 + PeriodSeconds() * InpBoxBarsWidth;
   int digits = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);

   // 1. Atualizar Caixas Coloridas
   ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_TIME, 0, t1);
   ObjectSetDouble(0, OBJ_BOX_GAIN, OBJPROP_PRICE, 0, g_entry_price);
   ObjectSetInteger(0, OBJ_BOX_GAIN, OBJPROP_TIME, 1, t2);
   ObjectSetDouble(0, OBJ_BOX_GAIN, OBJPROP_PRICE, 1, g_tp_price);

   ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_TIME, 0, t1);
   ObjectSetDouble(0, OBJ_BOX_RISK, OBJPROP_PRICE, 0, g_entry_price);
   ObjectSetInteger(0, OBJ_BOX_RISK, OBJPROP_TIME, 1, t2);
   ObjectSetDouble(0, OBJ_BOX_RISK, OBJPROP_PRICE, 1, g_sl_price);

   // 2. Atualizar Linhas (Apenas as que NÃO estão sendo arrastadas!)
   if(dragging_object != OBJ_LINE_ENT)
      ObjectSetDouble(0, OBJ_LINE_ENT, OBJPROP_PRICE, g_entry_price);
   if(dragging_object != OBJ_LINE_SL)
      ObjectSetDouble(0, OBJ_LINE_SL, OBJPROP_PRICE, g_sl_price);
   if(dragging_object != OBJ_LINE_TP)
      ObjectSetDouble(0, OBJ_LINE_TP, OBJPROP_PRICE, g_tp_price);

   // 3. Textos sobre as linhas: apenas o preço (os dados ficam nos badges estilo TradingView)
   ObjectSetInteger(0, OBJ_TXT_TP, OBJPROP_TIME, t1);
   ObjectSetDouble(0, OBJ_TXT_TP, OBJPROP_PRICE, g_tp_price);
   ObjectSetString(0, OBJ_TXT_TP, OBJPROP_TEXT, "  TP " + DoubleToString(g_tp_price, digits));

   ObjectSetInteger(0, OBJ_TXT_ENT, OBJPROP_TIME, t1);
   ObjectSetDouble(0, OBJ_TXT_ENT, OBJPROP_PRICE, g_entry_price);
   ObjectSetString(0, OBJ_TXT_ENT, OBJPROP_TEXT, "  Entrada " + DoubleToString(g_entry_price, digits));

   ObjectSetInteger(0, OBJ_TXT_SL, OBJPROP_TIME, t1);
   ObjectSetDouble(0, OBJ_TXT_SL, OBJPROP_PRICE, g_sl_price);
   ObjectSetString(0, OBJ_TXT_SL, OBJPROP_TEXT, "  SL " + DoubleToString(g_sl_price, digits));

   // 4. Badges estilo TradingView (Objetivo / Qtde + Razão / Stop) recalculados a cada ajuste
   int x1 = 0, x2 = 0, y_tmp = 0;
   ChartTimePriceToXY(0, 0, t1, g_entry_price, x1, y_tmp);
   ChartTimePriceToXY(0, 0, t2, g_entry_price, x2, y_tmp);
   int x_center = (x2 > x1) ? (x1 + x2) / 2 : x1 + 150;

   DrawInfoBadges(OBJ_BADGE_TP, OBJ_BADGE_ENT, OBJ_BADGE_SL, x_center, (g_dir == DIR_BUY),
                  g_entry_price, g_sl_price, g_tp_price, g_calc_lot, 0, 0.0, 0.0, false);
}

//+------------------------------------------------------------------+
//| Badge retangular com fundo sólido e largura automática           |
//+------------------------------------------------------------------+
int PlaceBadge(string name, string text, color bg, int x_center, int y, bool visible)
{
   if(!visible)
   {
      ObjectDelete(0, name);
      return 0;
   }

   if(ObjectFind(0, name) < 0)
   {
      ObjectCreate(0, name, OBJ_BUTTON, 0, 0, 0);
      ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
      ObjectSetInteger(0, name, OBJPROP_COLOR, clrWhite);
      ObjectSetInteger(0, name, OBJPROP_FONTSIZE, 8);
      ObjectSetString(0, name, OBJPROP_FONT, "Segoe UI Bold");
      ObjectSetInteger(0, name, OBJPROP_BACK, false);
      ObjectSetInteger(0, name, OBJPROP_ZORDER, 15);
      ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
   }

   uint tw = 0, th = 0;
   TextSetFont("Segoe UI Bold", -80);
   TextGetSize(text, tw, th);
   int bw = (int)(tw * 1.1) + 16;
   int bh = 20;

   // Mantém o badge dentro da área visível (e fora do painel)
   int win_w = (int)ChartGetInteger(0, CHART_WIDTH_IN_PIXELS);
   if(win_w <= 0) win_w = 800;
   int x = x_center - bw / 2;
   int min_x = g_panel_x + g_panel_w + 10;
   if(x + bw > win_w - 10) x = win_w - bw - 10;
   if(x < min_x) x = min_x;

   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE, bw);
   ObjectSetInteger(0, name, OBJPROP_YSIZE, bh);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR, bg);
   ObjectSetInteger(0, name, OBJPROP_BORDER_COLOR, bg);
   ObjectSetInteger(0, name, OBJPROP_STATE, false);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   return bh;
}

//+------------------------------------------------------------------+
//| Texto no formato do TradingView:                                 |
//|   "Objetivo: 0.695 (0.439%) 69 pts, Valor 104.79"                |
//+------------------------------------------------------------------+
string TvLevelText(string title, double entry, double level, double money)
{
   double dist = MathAbs(level - entry);
   double pct  = (entry > 0) ? dist / entry * 100.0 : 0.0;
   double pts  = (_Point > 0) ? dist / _Point : 0.0;
   return StringFormat("%s: %s (%.3f%%) %.0f pts, Valor %.2f",
                       title, DoubleToString(dist, _Digits), pct, pts, MathAbs(money));
}

//+------------------------------------------------------------------+
//| Desenha os 4 badges do TradingView para uma caixa:               |
//|   Objetivo (verde) no TP, Stop (vermelho) no SL e, no meio,      |
//|   L&P/Qtde + Razão risco/retorno                                 |
//|   state: 0 = prévia, 1 = pendente, 2 = aberta, 3 = fechada       |
//+------------------------------------------------------------------+
void DrawInfoBadges(string n_tp, string n_mid, string n_sl, int x_center, bool is_buy,
                    double entry, double sl, double tp, double lot,
                    int state, double cur_price, double pl_money, bool hide)
{
   string n_mid2 = n_mid + "2";
   if(hide || entry <= 0)
   {
      ObjectDelete(0, n_tp);
      ObjectDelete(0, n_mid);
      ObjectDelete(0, n_mid2);
      ObjectDelete(0, n_sl);
      return;
   }

   string curr = AccountInfoString(ACCOUNT_CURRENCY);
   int x = 0, y_tp = 0, y_sl = 0, y_mid = 0;
   int bh = 20;

   // Objetivo (TP)
   if(tp > 0 && ChartTimePriceToXY(0, 0, TimeCurrent(), tp, x, y_tp))
   {
      double gain = CalcMoney(is_buy, lot, entry, tp);
      int y = (tp > entry) ? y_tp - bh - 2 : y_tp + 2;
      PlaceBadge(n_tp, TvLevelText("Objetivo", entry, tp, gain), InpColorBadgeTP, x_center, y, true);
   }
   else ObjectDelete(0, n_tp);

   // Stop (SL)
   if(sl > 0 && ChartTimePriceToXY(0, 0, TimeCurrent(), sl, x, y_sl))
   {
      double loss = CalcMoney(is_buy, lot, entry, sl);
      int y = (sl < entry) ? y_sl + 2 : y_sl - bh - 2;
      PlaceBadge(n_sl, TvLevelText("Stop", entry, sl, loss), InpColorBadgeSL, x_center, y, true);
   }
   else ObjectDelete(0, n_sl);

   // Centro: L&P / Qtde e Razão risco/retorno
   double sl_dist = (sl > 0) ? MathAbs(entry - sl) : 0.0;
   double tp_dist = (tp > 0) ? MathAbs(entry - tp) : 0.0;
   double rr      = (sl_dist > 0) ? tp_dist / sl_dist : 0.0;
   string side    = is_buy ? "Compra" : "Venda";

   string line1;
   double mid_price = entry;
   color  mid_clr   = InpColorBadgeEntry;

   if(state == 2 || state == 3)
   {
      double diff = (cur_price > 0) ? (is_buy ? cur_price - entry : entry - cur_price) : 0.0;
      line1 = StringFormat("%s L&P: %s%s (%+.2f %s), Qtde: %s",
                           (state == 2) ? "Aberto" : "Fechado",
                           (diff >= 0) ? "+" : "-", DoubleToString(MathAbs(diff), _Digits),
                           pl_money, curr, DoubleToString(lot, 2));
      if(cur_price > 0) mid_price = cur_price;
      mid_clr = (pl_money >= 0) ? InpColorBadgeTP : InpColorBadgeSL;
   }
   else if(state == 1)
      line1 = StringFormat("%s pendente, Qtde: %s", side, DoubleToString(lot, 2));
   else
      line1 = StringFormat("%s, Qtde: %s", side, DoubleToString(lot, 2));

   string line2 = StringFormat("Razão risco/retorno: %.2f", rr);

   if(ChartTimePriceToXY(0, 0, TimeCurrent(), mid_price, x, y_mid))
   {
      PlaceBadge(n_mid,  line1, mid_clr, x_center, y_mid - bh, true);
      PlaceBadge(n_mid2, line2, mid_clr, x_center, y_mid, true);
   }
   else
   {
      ObjectDelete(0, n_mid);
      ObjectDelete(0, n_mid2);
   }
}

//+------------------------------------------------------------------+
//| Remove as linhas e caixas do gráfico                             |
//+------------------------------------------------------------------+
void DestroyChartVisualLines()
{
   ObjectDelete(0, OBJ_BOX_GAIN);
   ObjectDelete(0, OBJ_BOX_RISK);
   ObjectDelete(0, OBJ_LINE_ENT);
   ObjectDelete(0, OBJ_LINE_SL);
   ObjectDelete(0, OBJ_LINE_TP);
   ObjectDelete(0, OBJ_BADGE_TP);
   ObjectDelete(0, OBJ_BADGE_ENT);
   ObjectDelete(0, OBJ_BADGE_ENT + "2");
   ObjectDelete(0, OBJ_BADGE_SL);
   ObjectDelete(0, OBJ_TXT_TP);
   ObjectDelete(0, OBJ_TXT_ENT);
   ObjectDelete(0, OBJ_TXT_SL);
}

//+------------------------------------------------------------------+
//| ACOMPANHAMENTO APÓS O ENVIO (Caixas estilo TradingView)          |
//| A caixa fica ancorada no horário da ordem. Enquanto o trade      |
//| anda, a faixa entre a entrada e o preço atual fica mais forte:   |
//| verde quando está no lucro, rosa quando está no prejuízo.        |
//+------------------------------------------------------------------+
string TrackName(const TradeTrack &t, string part)
{
   return PREFIX_TRK + (string)t.order_ticket + "_" + part;
}

void DeleteTrackObjects(const TradeTrack &t)
{
   ObjectsDeleteAll(0, PREFIX_TRK + (string)t.order_ticket + "_");
}

//--- Cria/atualiza um retângulo preenchido; apaga se ficou sem área
void TrackRect(string name, datetime t1, double p1, datetime t2, double p2, color clr)
{
   if(t2 <= t1 || p1 <= 0 || p2 <= 0 || MathAbs(p1 - p2) < _Point * 0.5)
   {
      ObjectDelete(0, name);
      return;
   }

   if(ObjectFind(0, name) < 0)
   {
      ObjectCreate(0, name, OBJ_RECTANGLE, 0, t1, p1, t2, p2);
      ObjectSetInteger(0, name, OBJPROP_FILL, true);
      ObjectSetInteger(0, name, OBJPROP_BACK, true);
      ObjectSetInteger(0, name, OBJPROP_ZORDER, 0);
      ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
   }

   ObjectSetInteger(0, name, OBJPROP_TIME, 0, t1);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 0, p1);
   ObjectSetInteger(0, name, OBJPROP_TIME, 1, t2);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 1, p2);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
}

//--- Linha horizontal limitada à largura da caixa (linha de entrada)
void TrackSegment(string name, datetime t1, datetime t2, double price, color clr)
{
   if(ObjectFind(0, name) < 0)
   {
      ObjectCreate(0, name, OBJ_TREND, 0, t1, price, t2, price);
      ObjectSetInteger(0, name, OBJPROP_RAY_RIGHT, false);
      ObjectSetInteger(0, name, OBJPROP_RAY_LEFT, false);
      ObjectSetInteger(0, name, OBJPROP_WIDTH, 1);
      ObjectSetInteger(0, name, OBJPROP_STYLE, STYLE_SOLID);
      ObjectSetInteger(0, name, OBJPROP_BACK, true);
      ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
   }

   ObjectSetInteger(0, name, OBJPROP_TIME, 0, t1);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 0, price);
   ObjectSetInteger(0, name, OBJPROP_TIME, 1, t2);
   ObjectSetDouble(0, name, OBJPROP_PRICE, 1, price);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
}

//--- Texto de status no canto da caixa
void TrackText(string name, datetime t, double price, string text, color clr, ENUM_ANCHOR_POINT anchor)
{
   if(ObjectFind(0, name) < 0)
   {
      ObjectCreate(0, name, OBJ_TEXT, 0, t, price);
      ObjectSetString(0, name, OBJPROP_FONT, "Segoe UI Bold");
      ObjectSetInteger(0, name, OBJPROP_FONTSIZE, 8);
      ObjectSetInteger(0, name, OBJPROP_BACK, false);
      ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
      ObjectSetInteger(0, name, OBJPROP_HIDDEN, true);
   }

   ObjectSetInteger(0, name, OBJPROP_TIME, t);
   ObjectSetDouble(0, name, OBJPROP_PRICE, price);
   ObjectSetInteger(0, name, OBJPROP_ANCHOR, anchor);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
}

//--- Registra uma nova caixa para acompanhar
void AddTrack(ulong order_ticket, ulong pos_id, bool is_buy, double entry, double sl, double tp,
              datetime t_start, datetime t_fill, int state, double volume)
{
   if(!InpTrackAfterSend || order_ticket == 0) return;

   int n = ArraySize(g_tracks);
   for(int i = 0; i < n; i++)
      if(g_tracks[i].order_ticket == order_ticket) return;

   ArrayResize(g_tracks, n + 1);
   g_tracks[n].order_ticket = order_ticket;
   g_tracks[n].pos_id       = pos_id;
   g_tracks[n].is_buy       = is_buy;
   g_tracks[n].entry        = entry;
   g_tracks[n].sl           = sl;
   g_tracks[n].tp           = tp;
   g_tracks[n].cur_price    = 0.0;
   g_tracks[n].close_price  = 0.0;
   g_tracks[n].result_money = 0.0;
   g_tracks[n].volume       = volume;
   g_tracks[n].show_info    = false;
   g_tracks[n].t_end        = 0;
   g_tracks[n].t_start      = t_start;
   g_tracks[n].t_fill       = t_fill;
   g_tracks[n].t_close      = 0;
   g_tracks[n].state        = state;
}

//--- Recria as caixas das posições/ordens deste EA que já existem
void RebuildTracksFromTrade()
{
   if(!InpTrackAfterSend) return;

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(ticket == 0) continue;
      if(PositionGetString(POSITION_SYMBOL) != _Symbol) continue;
      if((ulong)PositionGetInteger(POSITION_MAGIC) != InpMagicNumber) continue;

      ulong    pos_id = (ulong)PositionGetInteger(POSITION_IDENTIFIER);
      datetime t_open = (datetime)PositionGetInteger(POSITION_TIME);
      bool     is_buy = (PositionGetInteger(POSITION_TYPE) == POSITION_TYPE_BUY);

      AddTrack(pos_id, pos_id, is_buy, PositionGetDouble(POSITION_PRICE_OPEN),
               PositionGetDouble(POSITION_SL), PositionGetDouble(POSITION_TP), t_open, t_open, TRK_OPEN,
               PositionGetDouble(POSITION_VOLUME));
   }

   for(int j = OrdersTotal() - 1; j >= 0; j--)
   {
      ulong ticket = OrderGetTicket(j);
      if(ticket == 0) continue;
      if(OrderGetString(ORDER_SYMBOL) != _Symbol) continue;
      if((ulong)OrderGetInteger(ORDER_MAGIC) != InpMagicNumber) continue;

      ENUM_ORDER_TYPE type = (ENUM_ORDER_TYPE)OrderGetInteger(ORDER_TYPE);
      bool is_buy = (type == ORDER_TYPE_BUY_LIMIT || type == ORDER_TYPE_BUY_STOP || type == ORDER_TYPE_BUY_STOP_LIMIT);

      AddTrack(ticket, 0, is_buy, OrderGetDouble(ORDER_PRICE_OPEN), OrderGetDouble(ORDER_SL),
               OrderGetDouble(ORDER_TP), (datetime)OrderGetInteger(ORDER_TIME_SETUP), 0, TRK_PENDING,
               OrderGetDouble(ORDER_VOLUME_CURRENT));
   }
}

//--- Atualiza o estado do trade. Retorna false se a caixa deve ser removida.
bool RefreshTrack(TradeTrack &t)
{
   if(t.state == TRK_CLOSED) return true;

   // 1. Ainda não sabemos a posição: a ordem está pendente, foi executada ou cancelada?
   if(t.pos_id == 0)
   {
      if(OrderSelect(t.order_ticket))
      {
         t.state = TRK_PENDING;
         if(OrderGetDouble(ORDER_PRICE_OPEN) > 0) t.entry = OrderGetDouble(ORDER_PRICE_OPEN);
         t.sl = OrderGetDouble(ORDER_SL);
         t.tp = OrderGetDouble(ORDER_TP);
         t.volume = OrderGetDouble(ORDER_VOLUME_CURRENT);
         return true;
      }

      if(!HistoryOrderSelect(t.order_ticket)) return true; // histórico ainda não sincronizou

      ENUM_ORDER_STATE st = (ENUM_ORDER_STATE)HistoryOrderGetInteger(t.order_ticket, ORDER_STATE);
      if(st == ORDER_STATE_CANCELED || st == ORDER_STATE_REJECTED || st == ORDER_STATE_EXPIRED)
         return false; // ordem pendente cancelada/expirada: some do gráfico

      if(st != ORDER_STATE_FILLED && st != ORDER_STATE_PARTIAL) return true;

      t.pos_id = (ulong)HistoryOrderGetInteger(t.order_ticket, ORDER_POSITION_ID);
      if(t.pos_id == 0) return true;
   }

   // 2. Posição aberta: acompanha preço atual, SL/TP (inclusive breakeven) e resultado
   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      if(PositionGetTicket(i) == 0) continue;
      if((ulong)PositionGetInteger(POSITION_IDENTIFIER) != t.pos_id) continue;

      if(t.state != TRK_OPEN || t.t_fill == 0)
      {
         datetime t_pos = (datetime)PositionGetInteger(POSITION_TIME);
         t.t_fill = (t_pos > t.t_start) ? t_pos : t.t_start;
      }
      t.state        = TRK_OPEN;
      t.entry        = PositionGetDouble(POSITION_PRICE_OPEN);
      t.sl           = PositionGetDouble(POSITION_SL);
      t.tp           = PositionGetDouble(POSITION_TP);
      t.cur_price    = PositionGetDouble(POSITION_PRICE_CURRENT);
      t.volume       = PositionGetDouble(POSITION_VOLUME);
      t.result_money = PositionGetDouble(POSITION_PROFIT) + PositionGetDouble(POSITION_SWAP);
      return true;
   }

   // 3. Não está mais aberta: procura o fechamento no histórico
   if(!HistorySelectByPosition(t.pos_id)) return true;

   int      deals     = HistoryDealsTotal();
   double   money     = 0.0;
   double   out_price = 0.0;
   datetime out_time  = 0;
   datetime in_time   = 0;

   for(int d = 0; d < deals; d++)
   {
      ulong deal = HistoryDealGetTicket(d);
      if(deal == 0) continue;

      ENUM_DEAL_ENTRY entry_type = (ENUM_DEAL_ENTRY)HistoryDealGetInteger(deal, DEAL_ENTRY);
      datetime        deal_time  = (datetime)HistoryDealGetInteger(deal, DEAL_TIME);

      money += HistoryDealGetDouble(deal, DEAL_PROFIT) + HistoryDealGetDouble(deal, DEAL_SWAP)
             + HistoryDealGetDouble(deal, DEAL_COMMISSION);

      if(entry_type == DEAL_ENTRY_IN && in_time == 0)
         in_time = deal_time;

      if(entry_type == DEAL_ENTRY_OUT || entry_type == DEAL_ENTRY_OUT_BY || entry_type == DEAL_ENTRY_INOUT)
      {
         if(deal_time >= out_time)
         {
            out_time  = deal_time;
            out_price = HistoryDealGetDouble(deal, DEAL_PRICE);
         }
      }
   }

   if(out_time == 0) return true; // ainda sem negócio de saída no histórico

   if(t.t_fill == 0) t.t_fill = (in_time > 0) ? in_time : t.t_start;
   t.state        = TRK_CLOSED;
   t.t_close      = out_time;
   t.close_price  = out_price;
   t.cur_price    = out_price;
   t.result_money = money;

   return InpKeepClosedTrades;
}

//--- Desenha a caixa. Para não misturar cores de retângulos sobrepostos no MT5,
//--- a caixa é dividida em partes que nunca se sobrepõem:
//---   [início .. execução]  -> caixas claras inteiras (Entrada->TP e Entrada->SL)
//---   [execução .. fim]     -> faixa forte Entrada->Preço atual + resto claro
void DrawTrack(TradeTrack &t)
{
   int ps = PeriodSeconds();
   if(ps <= 0) ps = 60;

   datetime t_start = t.t_start;
   datetime t_ref   = (t.state == TRK_CLOSED) ? t.t_close : TimeCurrent();
   datetime t_end   = t_start + ps * InpBoxBarsWidth;
   if(t_ref + ps * 3 > t_end) t_end = t_ref + ps * 3;

   double cur    = t.cur_price;
   bool   active = (t.state != TRK_PENDING && cur > 0 && t.entry > 0);

   datetime t_fill = t_end;
   if(active)
   {
      t_fill = t.t_fill;
      if(t_fill < t_start) t_fill = t_start;
      if(t_fill > t_end)   t_fill = t_end;
   }

   // Limita o preço atual à área entre SL e TP
   double dir = t.is_buy ? 1.0 : -1.0;
   if(active)
   {
      if(t.tp > 0 && (cur - t.tp) * dir > 0) cur = t.tp;
      if(t.sl > 0 && (t.sl - cur) * dir > 0) cur = t.sl;
   }
   bool in_profit = active && ((cur - t.entry) * dir > 0);
   bool in_loss   = active && ((cur - t.entry) * dir < 0);

   double tp_px = t.tp;   // 0 = sem TP (caixa de ganho não é desenhada)
   double sl_px = t.sl;   // 0 = sem SL (caixa de risco não é desenhada)

   // Parte da esquerda (antes da execução)
   TrackRect(TrackName(t, "GL"), t_start, t.entry, t_fill, tp_px, InpColorGainBox);
   TrackRect(TrackName(t, "RL"), t_start, t.entry, t_fill, sl_px, InpColorRiskBox);

   // Parte da direita (depois da execução): muda de cor conforme o trade anda
   if(active)
   {
      TrackRect(TrackName(t, "GD"), t_fill, t.entry, t_end, in_profit ? cur : 0, InpColorGainActive);
      TrackRect(TrackName(t, "GR"), t_fill, in_profit ? cur : t.entry, t_end, tp_px, InpColorGainBox);

      TrackRect(TrackName(t, "RD"), t_fill, t.entry, t_end, in_loss ? cur : 0, InpColorRiskActive);
      TrackRect(TrackName(t, "RR"), t_fill, in_loss ? cur : t.entry, t_end, sl_px, InpColorRiskBox);
   }
   else
   {
      ObjectDelete(0, TrackName(t, "GD"));
      ObjectDelete(0, TrackName(t, "GR"));
      ObjectDelete(0, TrackName(t, "RD"));
      ObjectDelete(0, TrackName(t, "RR"));
   }

   // Linha cinza da entrada
   TrackSegment(TrackName(t, "ENT"), t_start, t_end, t.entry, InpColorTrackEntry);

   // Status: Pendente / Aberta / Fechada com resultado e múltiplo de R
   string curr = AccountInfoString(ACCOUNT_CURRENCY);
   double risk_dist = (t.sl > 0) ? MathAbs(t.entry - t.sl) : 0.0;
   double r_mult = (active && risk_dist > 0) ? ((t.cur_price - t.entry) * dir / risk_dist) : 0.0;
   string side = t.is_buy ? "Buy" : "Sell";
   string txt;
   color  txt_clr;

   if(t.state == TRK_PENDING)
   {
      txt     = StringFormat("%s PENDENTE @ %s", side, DoubleToString(t.entry, _Digits));
      txt_clr = InpColorTrackEntry;
   }
   else
   {
      string st = (t.state == TRK_CLOSED) ? "FECHADA" : "ABERTA";
      txt     = StringFormat("%s %s  %+.2f %s  (%+.2fR)", side, st, t.result_money, curr, r_mult);
      txt_clr = (t.result_money >= 0) ? C'8,153,129' : C'242,54,69';
   }

   TrackText(TrackName(t, "TXT"), t_end, t.entry, txt, txt_clr, t.is_buy ? ANCHOR_RIGHT_UPPER : ANCHOR_RIGHT_LOWER);

   // Dados estilo TradingView (Objetivo / L&P + Qtde / Razão / Stop): aparecem ao clicar na caixa
   t.t_end = t_end;
   bool show = (InpShowInfoAlways || t.show_info);
   int x1 = 0, x2 = 0, y_tmp = 0;
   bool ok = ChartTimePriceToXY(0, 0, t_start, t.entry, x1, y_tmp) && ChartTimePriceToXY(0, 0, t_end, t.entry, x2, y_tmp);
   int x_center = (ok && x2 > x1) ? (x1 + x2) / 2 : x1 + 100;
   int badge_state = (t.state == TRK_PENDING) ? 1 : (t.state == TRK_OPEN) ? 2 : 3;
   DrawInfoBadges(TrackName(t, "B_TP"), TrackName(t, "B_MID"), TrackName(t, "B_SL"), x_center, t.is_buy,
                  t.entry, t.sl, t.tp, t.volume, badge_state, t.cur_price, t.result_money, !show);
}

//--- Redesenha sem consultar o servidor (usado em zoom/rolagem do gráfico)
void DrawAllTracks()
{
   for(int i = 0; i < ArraySize(g_tracks); i++)
      DrawTrack(g_tracks[i]);
}

//--- Clique no gráfico: se caiu dentro de uma caixa, mostra/esconde os dados dela
bool ToggleTrackInfoAt(int x, int y)
{
   int      sub = 0;
   datetime t   = 0;
   double   p   = 0.0;
   if(!ChartXYToTimePrice(0, x, y, sub, t, p) || sub != 0) return false;

   for(int i = ArraySize(g_tracks) - 1; i >= 0; i--)
   {
      double hi = g_tracks[i].entry, lo = g_tracks[i].entry;
      if(g_tracks[i].sl > 0) { hi = MathMax(hi, g_tracks[i].sl); lo = MathMin(lo, g_tracks[i].sl); }
      if(g_tracks[i].tp > 0) { hi = MathMax(hi, g_tracks[i].tp); lo = MathMin(lo, g_tracks[i].tp); }

      if(t >= g_tracks[i].t_start && t <= g_tracks[i].t_end && p >= lo && p <= hi)
      {
         g_tracks[i].show_info = !g_tracks[i].show_info;
         DrawTrack(g_tracks[i]);
         ChartRedraw();
         return true;
      }
   }
   return false;
}

//--- Atualiza todas as caixas acompanhadas
void UpdateTrackers()
{
   for(int i = ArraySize(g_tracks) - 1; i >= 0; i--)
   {
      if(!RefreshTrack(g_tracks[i]))
      {
         DeleteTrackObjects(g_tracks[i]);
         int n = ArraySize(g_tracks);
         for(int j = i; j < n - 1; j++)
            g_tracks[j] = g_tracks[j + 1];
         ArrayResize(g_tracks, n - 1);
         continue;
      }
      DrawTrack(g_tracks[i]);
   }
}

//+------------------------------------------------------------------+
//| Criação dos Controles Gráficos da Boleta (Painel Trade Assistant)|
//| Garante que o painel fique SOBRE todos os candles e objetos      |
//+------------------------------------------------------------------+
void CreateLabel(string name, int x, int y, string text, color clr, int fontsize=8, string font="Segoe UI")
{
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_LABEL, 0, 0, 0);

   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_COLOR, clr);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, fontsize);
   ObjectSetString(0, name, OBJPROP_FONT, font);
   ObjectSetInteger(0, name, OBJPROP_BACK, false);
   ObjectSetInteger(0, name, OBJPROP_ZORDER, 105);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
}

void CreateButton(string name, int x, int y, int w, int h, string text, color bg_clr, color text_clr=clrWhite, int fontsize=8)
{
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_BUTTON, 0, 0, 0);

   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE, w);
   ObjectSetInteger(0, name, OBJPROP_YSIZE, h);
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR, bg_clr);
   ObjectSetInteger(0, name, OBJPROP_COLOR, text_clr);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, fontsize);
   ObjectSetString(0, name, OBJPROP_FONT, "Segoe UI Bold");
   ObjectSetInteger(0, name, OBJPROP_BACK, false);
   ObjectSetInteger(0, name, OBJPROP_ZORDER, 105);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
}

void CreateEdit(string name, int x, int y, int w, int h, string text, color bg_clr, color text_clr=clrBlack, int fontsize=8)
{
   if(ObjectFind(0, name) < 0)
      ObjectCreate(0, name, OBJ_EDIT, 0, 0, 0);

   ObjectSetInteger(0, name, OBJPROP_XDISTANCE, x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE, y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE, w);
   ObjectSetInteger(0, name, OBJPROP_YSIZE, h);
   ObjectSetInteger(0, name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetString(0, name, OBJPROP_TEXT, text);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR, bg_clr);
   ObjectSetInteger(0, name, OBJPROP_COLOR, text_clr);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE, fontsize);
   ObjectSetString(0, name, OBJPROP_FONT, "Segoe UI Bold");
   ObjectSetInteger(0, name, OBJPROP_ALIGN, ALIGN_CENTER);
   ObjectSetInteger(0, name, OBJPROP_BACK, false);
   ObjectSetInteger(0, name, OBJPROP_ZORDER, 105);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
}

void CreatePanelGUI()
{
   // Painel Principal de Fundo
   string bg_name = PREFIX_GUI + "BG";
   if(ObjectFind(0, bg_name) < 0)
      ObjectCreate(0, bg_name, OBJ_RECTANGLE_LABEL, 0, 0, 0);
   ObjectSetInteger(0, bg_name, OBJPROP_XDISTANCE, g_panel_x);
   ObjectSetInteger(0, bg_name, OBJPROP_YDISTANCE, g_panel_y);
   ObjectSetInteger(0, bg_name, OBJPROP_XSIZE, g_panel_w);
   ObjectSetInteger(0, bg_name, OBJPROP_YSIZE, g_panel_minimized ? 30 : g_panel_h);
   ObjectSetInteger(0, bg_name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, bg_name, OBJPROP_BGCOLOR, C'22,132,152');
   ObjectSetInteger(0, bg_name, OBJPROP_BORDER_COLOR, C'34,153,174');
   ObjectSetInteger(0, bg_name, OBJPROP_BORDER_TYPE, BORDER_FLAT);
   ObjectSetInteger(0, bg_name, OBJPROP_BACK, false);
   ObjectSetInteger(0, bg_name, OBJPROP_ZORDER, 100);
   ObjectSetInteger(0, bg_name, OBJPROP_SELECTABLE, false);

   // Barra de Cabeçalho
   string hdr_name = PREFIX_GUI + "HDR";
   if(ObjectFind(0, hdr_name) < 0)
      ObjectCreate(0, hdr_name, OBJ_RECTANGLE_LABEL, 0, 0, 0);
   ObjectSetInteger(0, hdr_name, OBJPROP_XDISTANCE, g_panel_x);
   ObjectSetInteger(0, hdr_name, OBJPROP_YDISTANCE, g_panel_y);
   ObjectSetInteger(0, hdr_name, OBJPROP_XSIZE, g_panel_w);
   ObjectSetInteger(0, hdr_name, OBJPROP_YSIZE, 26);
   ObjectSetInteger(0, hdr_name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, hdr_name, OBJPROP_BGCOLOR, C'41,169,194');
   ObjectSetInteger(0, hdr_name, OBJPROP_BACK, false);
   ObjectSetInteger(0, hdr_name, OBJPROP_ZORDER, 102);
   ObjectSetInteger(0, hdr_name, OBJPROP_SELECTABLE, false);

   // Título e Botão Minimizar
   CreateLabel(PREFIX_GUI + "TITLE", g_panel_x + 8, g_panel_y + 5, "Trade Assistant MT5 [BR]", clrWhite, 9, "Segoe UI Bold");
   CreateButton(PREFIX_GUI + "BTN_MIN", g_panel_x + g_panel_w - 22, g_panel_y + 3, 18, 20, g_panel_minimized ? "+" : "_", C'50,180,205', clrWhite, 9);

   if(g_panel_minimized) return;

   int cur_y = g_panel_y + 30;

   // Linha 1: Informações do Símbolo e Horário
   CreateLabel(PREFIX_GUI + "INFO_SYM", g_panel_x + 8, cur_y, _Symbol + " | Sp: 0", clrWhite, 8, "Segoe UI Bold");
   CreateLabel(PREFIX_GUI + "INFO_TIME", g_panel_x + 190, cur_y, "00:00:00", clrWhite, 8);
   cur_y += 18;

   // Linha 2: Métricas de Conta (Saldo e Lucro)
   CreateLabel(PREFIX_GUI + "INFO_BAL", g_panel_x + 8, cur_y, "Saldo: R$ 0,00", clrWhite, 8);
   CreateLabel(PREFIX_GUI + "INFO_PL", g_panel_x + 150, cur_y, "Lucro: R$ 0,00", clrYellow, 8, "Segoe UI Bold");
   cur_y += 22;

   // Linha 3: Seletor de Direção [ COMPRA ] e [ VENDA ]
   int btn_w = (g_panel_w - 18) / 2;
   CreateButton(PREFIX_GUI + "BTN_DIR_BUY", g_panel_x + 6, cur_y, btn_w, 24, "COMPRA (BUY)",
                (g_dir == DIR_BUY) ? C'34,177,76' : C'20,95,115', clrWhite, 8);
   CreateButton(PREFIX_GUI + "BTN_DIR_SELL", g_panel_x + 10 + btn_w, cur_y, btn_w, 24, "VENDA (SELL)",
                (g_dir == DIR_SELL) ? C'237,28,36' : C'20,95,115', clrWhite, 8);
   cur_y += 28;

   // Linha 4: Modo de Risco [% Saldo] [% Equity] [R$ Fixo]
   int rbtn_w = (g_panel_w - 20) / 3;
   CreateButton(PREFIX_GUI + "BTN_RISK_BAL", g_panel_x + 6, cur_y, rbtn_w, 20, "% Saldo",
                (g_risk_mode == RISK_PERCENT_BALANCE) ? C'0,162,232' : C'20,95,115', clrWhite, 7);
   CreateButton(PREFIX_GUI + "BTN_RISK_EQ", g_panel_x + 9 + rbtn_w, cur_y, rbtn_w, 20, "% Equity",
                (g_risk_mode == RISK_PERCENT_EQUITY) ? C'0,162,232' : C'20,95,115', clrWhite, 7);
   CreateButton(PREFIX_GUI + "BTN_RISK_MON", g_panel_x + 12 + (rbtn_w * 2), cur_y, rbtn_w, 20, "$ Fixo",
                (g_risk_mode == RISK_FIXED_MONEY) ? C'0,162,232' : C'20,95,115', clrWhite, 7);
   cur_y += 24;

   // Linha 5: Valor do Risco e Lote Calculado
   CreateLabel(PREFIX_GUI + "LBL_RISK_VAL", g_panel_x + 6, cur_y + 3, "Risco:", clrWhite, 8);
   CreateEdit(PREFIX_GUI + "EDT_RISK_VAL", g_panel_x + 50, cur_y, 60, 22, DoubleToString(g_risk_value, 2), clrWhite, clrBlack);

   CreateLabel(PREFIX_GUI + "LBL_CALC_LOT", g_panel_x + 118, cur_y + 3, "Lote:", clrWhite, 8);
   CreateEdit(PREFIX_GUI + "EDT_CALC_LOT", g_panel_x + 152, cur_y, 62, 22, DoubleToString(g_calc_lot, 2), clrWhite, clrBlack);
   g_lot_shown = g_calc_lot;
   CreateButton(PREFIX_GUI + "BTN_RECALC", g_panel_x + 220, cur_y, 48, 22, "Calc", C'0,162,232', clrWhite, 8);
   cur_y += 28;

   // Linha 6: Relação Risco:Retorno (RR)
   CreateLabel(PREFIX_GUI + "LBL_RR", g_panel_x + 6, cur_y + 3, "Relacao RR:", clrWhite, 8);
   int rr_w = 36;
   CreateButton(PREFIX_GUI + "BTN_RR_1_1", g_panel_x + 88, cur_y, rr_w, 20, "1:1",
                (g_rr_ratio == RR_1_1) ? C'0,162,232' : C'20,95,115', clrWhite, 7);
   CreateButton(PREFIX_GUI + "BTN_RR_2_1", g_panel_x + 128, cur_y, rr_w, 20, "2:1",
                (g_rr_ratio == RR_2_1) ? C'0,162,232' : C'20,95,115', clrWhite, 7);
   CreateButton(PREFIX_GUI + "BTN_RR_3_1", g_panel_x + 168, cur_y, rr_w, 20, "3:1",
                (g_rr_ratio == RR_3_1) ? C'0,162,232' : C'20,95,115', clrWhite, 7);
   CreateButton(PREFIX_GUI + "BTN_RR_FREE", g_panel_x + 208, cur_y, 58, 20, "Livre",
                (g_rr_ratio == RR_FREE) ? C'0,162,232' : C'20,95,115', clrWhite, 7);
   cur_y += 26;

   // Linha 8: BOTÃO PRINCIPAL: CRIAR LINHAS NO GRÁFICO (Sob Demanda)
   CreateButton(PREFIX_GUI + "BTN_TOGGLE_LINES", g_panel_x + 6, cur_y, btn_w, 26,
                g_lines_active ? "REMOVER LINHAS" : "+ CRIAR LINHAS",
                g_lines_active ? C'180,50,50' : C'0,160,160', clrWhite, 8);

   CreateButton(PREFIX_GUI + "BTN_TOGGLE_AUTOSEND", g_panel_x + 10 + btn_w, cur_y, btn_w, 26,
                g_auto_send ? "Auto-Envio [LIG.]" : "Auto-Envio [OFF]",
                g_auto_send ? C'34,177,76' : C'180,90,40', clrWhite, 8);
   cur_y += 32;

   // Linha 9: Botões de Compra / Venda a Mercado
   CreateButton(PREFIX_GUI + "BTN_MKT_BUY", g_panel_x + 6, cur_y, btn_w, 36, "COMPRAR\nMercado", C'34,177,76', clrWhite, 8);
   CreateButton(PREFIX_GUI + "BTN_MKT_SELL", g_panel_x + 10 + btn_w, cur_y, btn_w, 36, "VENDER\nMercado", C'237,28,36', clrWhite, 8);
   cur_y += 42;

   // Linha 10: Botão de ENVIAR ORDEM (Quando o usuário clica ou após soltar)
   CreateButton(PREFIX_GUI + "BTN_EXEC_LINES", g_panel_x + 6, cur_y, g_panel_w - 12, 30, "ENVIAR ORDEM DAS LINHAS", C'0,140,210', clrWhite, 9);
   cur_y += 36;

   // Linha 11: Gestão Rápida (Breakeven, Fechar 50%, Fechar Tudo)
   int mg_w = (g_panel_w - 20) / 3;
   CreateButton(PREFIX_GUI + "BTN_BE", g_panel_x + 6, cur_y, mg_w, 24, "Breakeven", C'20,95,115', clrWhite, 7);
   CreateButton(PREFIX_GUI + "BTN_CLOSE_HALF", g_panel_x + 9 + mg_w, cur_y, mg_w, 24, "Fechar 50%", C'20,95,115', clrWhite, 7);
   CreateButton(PREFIX_GUI + "BTN_CLOSE_ALL", g_panel_x + 12 + (mg_w * 2), cur_y, mg_w, 24, "Fechar Tudo", C'180,40,40', clrWhite, 7);
   cur_y += 30;

   // Linha 11: Painel de Valores Dinâmicos (Stop, Gain e Risco:Gain) - Fim do Painel (Stop, Gain e Risco:Gain 3:1)
   string box_rr_name = PREFIX_GUI + "BOX_RR";
   if(ObjectFind(0, box_rr_name) < 0)
      ObjectCreate(0, box_rr_name, OBJ_RECTANGLE_LABEL, 0, 0, 0);
   ObjectSetInteger(0, box_rr_name, OBJPROP_XDISTANCE, g_panel_x + 6);
   ObjectSetInteger(0, box_rr_name, OBJPROP_YDISTANCE, cur_y);
   ObjectSetInteger(0, box_rr_name, OBJPROP_XSIZE, g_panel_w - 12);
   ObjectSetInteger(0, box_rr_name, OBJPROP_YSIZE, 46);
   ObjectSetInteger(0, box_rr_name, OBJPROP_CORNER, CORNER_LEFT_UPPER);
   ObjectSetInteger(0, box_rr_name, OBJPROP_BGCOLOR, C'14,68,78');
   ObjectSetInteger(0, box_rr_name, OBJPROP_BORDER_COLOR, C'0,180,200');
   ObjectSetInteger(0, box_rr_name, OBJPROP_BORDER_TYPE, BORDER_FLAT);
   ObjectSetInteger(0, box_rr_name, OBJPROP_BACK, false);
   ObjectSetInteger(0, box_rr_name, OBJPROP_ZORDER, 103);
   ObjectSetInteger(0, box_rr_name, OBJPROP_SELECTABLE, false);

   CreateLabel(PREFIX_GUI + "LBL_GAIN_VAL", g_panel_x + 10, cur_y + 4, "GAIN: +R$ 0,00 (+0.0%) | 0 pts", C'160,255,160', 8, "Segoe UI Bold");
   CreateLabel(PREFIX_GUI + "LBL_STOP_VAL", g_panel_x + 10, cur_y + 18, "STOP: -R$ 0,00 (-0.0%) | 0 pts", C'255,170,170', 8, "Segoe UI Bold");
   CreateLabel(PREFIX_GUI + "LBL_RR_VAL",   g_panel_x + 10, cur_y + 31, "RISCO / GAIN: 3.0:1", clrYellow, 8, "Segoe UI Bold");
   cur_y += 52;


   // Linha de Rodapé: Status
   string st_msg = g_lines_active ? "Arraste as linhas livremente! Desmarque p/ enviar." : "Clique em [+ CRIAR LINHAS] para iniciar.";
   CreateLabel(PREFIX_GUI + "STATUS_LBL", g_panel_x + 6, cur_y, st_msg, clrYellow, 7);
}

//+------------------------------------------------------------------+
//| Destrói os Controles Gráficos da Boleta                          |
//+------------------------------------------------------------------+
void DestroyPanelGUI()
{
   ObjectsDeleteAll(0, PREFIX_GUI);
}

//+------------------------------------------------------------------+
//| Atualiza Valores em Tempo Real no Painel                         |
//+------------------------------------------------------------------+
void UpdatePanelInfo()
{
   if(g_panel_minimized) return;

   long spread = SymbolInfoInteger(_Symbol, SYMBOL_SPREAD);
   ObjectSetString(0, PREFIX_GUI + "INFO_SYM", OBJPROP_TEXT, StringFormat("%s | Sp: %d", _Symbol, spread));

   MqlDateTime dt;
   TimeCurrent(dt);
   ObjectSetString(0, PREFIX_GUI + "INFO_TIME", OBJPROP_TEXT, StringFormat("%02d:%02d:%02d", dt.hour, dt.min, dt.sec));

   double balance = AccountInfoDouble(ACCOUNT_BALANCE);
   double profit  = AccountInfoDouble(ACCOUNT_PROFIT);
   string curr    = AccountInfoString(ACCOUNT_CURRENCY);

   ObjectSetString(0, PREFIX_GUI + "INFO_BAL", OBJPROP_TEXT, StringFormat("Saldo: %.2f %s", balance, curr));
   ObjectSetString(0, PREFIX_GUI + "INFO_PL", OBJPROP_TEXT, StringFormat("Lucro: %+.2f %s", profit, curr));
   ObjectSetInteger(0, PREFIX_GUI + "INFO_PL", OBJPROP_COLOR, (profit >= 0) ? clrLime : clrYellow);

   double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   int digits = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);

   ObjectSetString(0, PREFIX_GUI + "BTN_MKT_BUY", OBJPROP_TEXT, StringFormat("COMPRAR\n%s", DoubleToString(ask, digits)));
   ObjectSetString(0, PREFIX_GUI + "BTN_MKT_SELL", OBJPROP_TEXT, StringFormat("VENDER\n%s", DoubleToString(bid, digits)));

   // Fonte dos valores do painel:
   //  - Linhas ativas  -> prévia das linhas (recalculada a cada ajuste)
   //  - Sem linhas     -> último trade aberto/pendente deste EA (valores REAIS: lote, SL e TP da corretora)
   //  - Nenhum trade   -> última configuração das linhas
   bool   src_buy   = (g_dir == DIR_BUY);
   double src_ent   = g_entry_price;
   double src_sl    = g_sl_price;
   double src_tp    = g_tp_price;
   double src_lot   = g_calc_lot;
   string src_title = "";
   double src_pl    = 0.0;
   bool   src_trade = false;

   if(!g_lines_active)
   {
      for(int i = ArraySize(g_tracks) - 1; i >= 0; i--)
      {
         if(g_tracks[i].state == TRK_CLOSED) continue;
         src_buy   = g_tracks[i].is_buy;
         src_ent   = g_tracks[i].entry;
         src_sl    = g_tracks[i].sl;
         src_tp    = g_tracks[i].tp;
         src_lot   = g_tracks[i].volume;
         src_pl    = g_tracks[i].result_money;
         src_title = (g_tracks[i].state == TRK_OPEN) ? "ABERTO" : "PENDENTE";
         src_trade = true;
         break;
      }
   }

   double point   = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   double sl_dist = (src_sl > 0) ? MathAbs(src_ent - src_sl) : 0.0;
   double tp_dist = (src_tp > 0) ? MathAbs(src_ent - src_tp) : 0.0;
   double sl_pts  = (point > 0) ? (sl_dist / point) : 0;
   double tp_pts  = (point > 0) ? (tp_dist / point) : 0;
   double rr_val  = (sl_dist > 0) ? (tp_dist / sl_dist) : 0;

   double loss_money = (src_sl > 0) ? CalcMoney(src_buy, src_lot, src_ent, src_sl) : 0.0;
   double gain_money = (src_tp > 0) ? CalcMoney(src_buy, src_lot, src_ent, src_tp) : 0.0;

   double risk_pct = (balance > 0) ? (MathAbs(loss_money) / balance * 100.0) : 0.0;
   double gain_pct = (balance > 0) ? (MathAbs(gain_money) / balance * 100.0) : 0.0;

   // Atualizar seção de destaque no painel: Gain, Stop e Risco/Gain tipo 3:1
   ObjectSetString(0, PREFIX_GUI + "LBL_GAIN_VAL", OBJPROP_TEXT,
                   StringFormat("GAIN: +%.2f %s (+%.2f%%) | %.0f pts", MathAbs(gain_money), curr, gain_pct, tp_pts));
   ObjectSetString(0, PREFIX_GUI + "LBL_STOP_VAL", OBJPROP_TEXT,
                   StringFormat("STOP: -%.2f %s (-%.2f%%) | %.0f pts", MathAbs(loss_money), curr, risk_pct, sl_pts));
   if(src_trade)
      ObjectSetString(0, PREFIX_GUI + "LBL_RR_VAL", OBJPROP_TEXT,
                      StringFormat("%s L&P %+.2f | Lote %s | RR %.2f", src_title, src_pl, DoubleToString(src_lot, 2), rr_val));
   else
      ObjectSetString(0, PREFIX_GUI + "LBL_RR_VAL", OBJPROP_TEXT,
                      StringFormat("RISCO / GAIN: %.2f:1  (Ganho %.2fx Risco)", rr_val, rr_val));

   // Só reescreve o campo de lote quando o valor mudou (não atrapalha a digitação)
   if(MathAbs(g_calc_lot - g_lot_shown) > 1e-10)
   {
      ObjectSetString(0, PREFIX_GUI + "EDT_CALC_LOT", OBJPROP_TEXT, DoubleToString(g_calc_lot, 2));
      g_lot_shown = g_calc_lot;
   }

   if(g_lines_active && !g_is_dragging)
   {
      UpdateChartVisuals("");
   }
}

//+------------------------------------------------------------------+
//| Envio da Ordem Configurada pelas Linhas ou Botões                |
//+------------------------------------------------------------------+
void SendConfiguredOrder()
{
   double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
   double ask   = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
   double bid   = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   int digits   = (int)SymbolInfoInteger(_Symbol, SYMBOL_DIGITS);

   if(g_calc_lot <= 0) RecalculateRiskAndLot();

   double price = NormalizePrice(g_entry_price);
   double sl    = NormalizePrice(g_sl_price);
   double tp    = NormalizePrice(g_tp_price);

   if(g_dir == DIR_BUY)
   {
      if(sl >= price)
      {
         Print("Erro: Stop Loss de Compra deve ser abaixo do preco de entrada!");
         ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, "Erro: SL de Compra deve ser abaixo da entrada!");
         return;
      }
      if(tp <= price)
      {
         Print("Erro: Take Profit de Compra deve ser acima do preco de entrada!");
         ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, "Erro: TP de Compra deve ser acima da entrada!");
         return;
      }
   }
   else
   {
      if(sl <= price)
      {
         Print("Erro: Stop Loss de Venda deve ser acima do preco de entrada!");
         ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, "Erro: SL de Venda deve ser acima da entrada!");
         return;
      }
      if(tp >= price)
      {
         Print("Erro: Take Profit de Venda deve ser abaixo do preco de entrada!");
         ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, "Erro: TP de Venda deve ser abaixo da entrada!");
         return;
      }
   }

   bool res = false;
   string ord_type_name = "";

   if(g_dir == DIR_BUY)
   {
      if(MathAbs(price - ask) <= 3 * point)
      {
         ord_type_name = "Compra a Mercado";
         res = m_trade.Buy(g_calc_lot, _Symbol, ask, sl, tp, InpTradeComment);
      }
      else if(price > ask)
      {
         ord_type_name = "Buy Stop";
         res = m_trade.BuyStop(g_calc_lot, price, _Symbol, sl, tp, ORDER_TIME_GTC, 0, InpTradeComment);
      }
      else
      {
         ord_type_name = "Buy Limit";
         res = m_trade.BuyLimit(g_calc_lot, price, _Symbol, sl, tp, ORDER_TIME_GTC, 0, InpTradeComment);
      }
   }
   else
   {
      if(MathAbs(price - bid) <= 3 * point)
      {
         ord_type_name = "Venda a Mercado";
         res = m_trade.Sell(g_calc_lot, _Symbol, bid, sl, tp, InpTradeComment);
      }
      else if(price < bid)
      {
         ord_type_name = "Sell Stop";
         res = m_trade.SellStop(g_calc_lot, price, _Symbol, sl, tp, ORDER_TIME_GTC, 0, InpTradeComment);
      }
      else
      {
         ord_type_name = "Sell Limit";
         res = m_trade.SellLimit(g_calc_lot, price, _Symbol, sl, tp, ORDER_TIME_GTC, 0, InpTradeComment);
      }
   }

   if(res)
   {
      if(InpPlaySounds) PlaySound("expert.wav");
      string msg = StringFormat("Sucesso! %s: %.2f lote @ %s", ord_type_name, g_calc_lot, DoubleToString(price, digits));
      Print(msg);
      ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, msg);

      // Mantém as caixas de risco/gain no gráfico acompanhando o trade (igual TradingView)
      bool is_market = (StringFind(ord_type_name, "Mercado") >= 0);
      double fill_price = is_market ? m_trade.ResultPrice() : price;
      if(fill_price <= 0) fill_price = price;
      datetime now = TimeCurrent();
      AddTrack(m_trade.ResultOrder(), 0, (g_dir == DIR_BUY), fill_price, sl, tp,
               now, is_market ? now : 0, is_market ? TRK_OPEN : TRK_PENDING, g_calc_lot);
      UpdateTrackers();

      // Ordem enviada: limpar linhas de ajuste do gráfico
      g_lines_active = false;
      g_line_was_moved = false;
      g_lines_were_selected = false;
      DestroyChartVisualLines();
      DestroyPanelGUI();
      CreatePanelGUI();
      UpdatePanelInfo();
      ChartRedraw();
   }
   else
   {
      if(InpPlaySounds) PlaySound("timeout.wav");
      string err_msg = StringFormat("Erro ao enviar: %d (%s)", m_trade.ResultRetcode(), m_trade.ResultRetcodeDescription());
      Print(err_msg);
      ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, err_msg);
   }
}

//+------------------------------------------------------------------+
//| Prepara Entrada/SL/TP para ordem a mercado mantendo as distâncias|
//| atuais, com SL e TP sempre do lado correto da direção            |
//+------------------------------------------------------------------+
void SetMarketLevels(ENUM_TRADE_DIR dir)
{
   double sl_dist = MathAbs(g_entry_price - g_sl_price);
   double tp_dist = MathAbs(g_entry_price - g_tp_price);
   if(sl_dist <= 0) sl_dist = 150 * _Point;
   if(tp_dist <= 0) tp_dist = sl_dist * 3.0;

   g_dir = dir;
   if(dir == DIR_BUY)
   {
      g_entry_price = NormalizePrice(SymbolInfoDouble(_Symbol, SYMBOL_ASK));
      g_sl_price    = NormalizePrice(g_entry_price - sl_dist);
      g_tp_price    = NormalizePrice(g_entry_price + tp_dist);
   }
   else
   {
      g_entry_price = NormalizePrice(SymbolInfoDouble(_Symbol, SYMBOL_BID));
      g_sl_price    = NormalizePrice(g_entry_price + sl_dist);
      g_tp_price    = NormalizePrice(g_entry_price - tp_dist);
   }
}

//+------------------------------------------------------------------+
//| Verifica a transição de desmarcação após ter sido movida         |
//+------------------------------------------------------------------+
void CheckUnselectAndOrder()
{
   if(!g_lines_active || !g_auto_send) return;

   bool ent_sel = (bool)ObjectGetInteger(0, OBJ_LINE_ENT, OBJPROP_SELECTED);
   bool sl_sel  = (bool)ObjectGetInteger(0, OBJ_LINE_SL,  OBJPROP_SELECTED);
   bool tp_sel  = (bool)ObjectGetInteger(0, OBJ_LINE_TP,  OBJPROP_SELECTED);

   bool any_selected = (ent_sel || sl_sel || tp_sel);

   if(any_selected)
   {
      g_lines_were_selected = true;
   }
   else
   {
      // Se estavam selecionadas E o usuário moveu as linhas E agora tirou a seleção
      if(g_lines_were_selected && g_line_was_moved && !g_is_dragging)
      {
         Print("Linhas desmarcadas apos ajuste! Enviando ordem...");
         g_lines_were_selected = false;
         g_line_was_moved = false;
         SendConfiguredOrder();
      }
   }
}

//+------------------------------------------------------------------+
//| Move Stop Loss das posições abertas para o Breakeven             |
//+------------------------------------------------------------------+
void MoveToBreakeven()
{
   int total = PositionsTotal();
   int modified = 0;

   for(int i = total - 1; i >= 0; i--)
   {
      if(m_position.SelectByIndex(i))
      {
         if(m_position.Symbol() == _Symbol && m_position.Magic() == InpMagicNumber)
         {
            double open_price = m_position.PriceOpen();
            double sl = m_position.StopLoss();
            double tp = m_position.TakeProfit();

            if(m_position.PositionType() == POSITION_TYPE_BUY)
            {
               if(m_position.PriceCurrent() > open_price && (sl < open_price || sl == 0))
               {
                  if(m_trade.PositionModify(m_position.Ticket(), open_price, tp))
                     modified++;
               }
            }
            else if(m_position.PositionType() == POSITION_TYPE_SELL)
            {
               if(m_position.PriceCurrent() < open_price && (sl > open_price || sl == 0))
               {
                  if(m_trade.PositionModify(m_position.Ticket(), open_price, tp))
                     modified++;
               }
            }
         }
      }
   }

   ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, StringFormat("Breakeven aplicado em %d posicao(oes)", modified));
}

//+------------------------------------------------------------------+
//| Fecha 50% do volume das posições abertas                         |
//+------------------------------------------------------------------+
void CloseHalfPositions()
{
   int total = PositionsTotal();
   int closed = 0;

   for(int i = total - 1; i >= 0; i--)
   {
      if(m_position.SelectByIndex(i))
      {
         if(m_position.Symbol() == _Symbol && m_position.Magic() == InpMagicNumber)
         {
            double vol = NormalizeLot(m_position.Volume() * 0.5);
            if(vol > 0 && vol < m_position.Volume())
            {
               if(m_trade.PositionClosePartial(m_position.Ticket(), vol))
                  closed++;
            }
         }
      }
   }

   ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, StringFormat("Parcial 50%% fechada em %d posicao(oes)", closed));
}

//+------------------------------------------------------------------+
//| Fecha todas as posições abertas deste ativo                      |
//+------------------------------------------------------------------+
void CloseAllPositions()
{
   int total = PositionsTotal();
   int closed = 0;

   for(int i = total - 1; i >= 0; i--)
   {
      if(m_position.SelectByIndex(i))
      {
         if(m_position.Symbol() == _Symbol && m_position.Magic() == InpMagicNumber)
         {
            if(m_trade.PositionClose(m_position.Ticket()))
               closed++;
         }
      }
   }

   int total_orders = OrdersTotal();
   for(int j = total_orders - 1; j >= 0; j--)
   {
      if(m_order.SelectByIndex(j))
      {
         if(m_order.Symbol() == _Symbol && m_order.Magic() == InpMagicNumber)
         {
            m_trade.OrderDelete(m_order.Ticket());
         }
      }
   }

   ObjectSetString(0, PREFIX_GUI + "STATUS_LBL", OBJPROP_TEXT, StringFormat("Fechadas %d posicoes/ordens", closed));
}

//+------------------------------------------------------------------+
//| Chart Event Handler                                              |
//+------------------------------------------------------------------+
void OnChartEvent(const int id,
                  const long &lparam,
                  const double &dparam,
                  const string &sparam)
{
   // 1. ARRASTO DE LINHAS: recalcula Lote / Gain / Stop / R:R em tempo real
   //    (o MT5 só envia OBJECT_DRAG ao soltar; durante o arrasto usamos o
   //     movimento do mouse + timer de 200 ms para ler a posição das linhas)
   if(id == CHARTEVENT_MOUSE_MOVE)
   {
      if(g_lines_active) SyncLinesFromChart();
      return;
   }

   if(id == CHARTEVENT_OBJECT_DRAG)
   {
      if(sparam == OBJ_LINE_ENT || sparam == OBJ_LINE_SL || sparam == OBJ_LINE_TP)
      {
         SyncLinesFromChart();
         g_is_dragging = false;
         UpdateChartVisuals("");   // encaixa a linha no tick exato do ativo
         UpdatePanelInfo();
         ChartRedraw();
      }
      return;
   }

   // 2. Eventos de Redimensionamento / Scroll do Gráfico
   if(id == CHARTEVENT_CHART_CHANGE)
   {
      if(g_lines_active && !g_is_dragging)
         UpdateChartVisuals("");
      DrawAllTracks();
      ChartRedraw();
      return;
   }

   // 3. Clique no Gráfico / Alteração de Objeto
   if(id == CHARTEVENT_OBJECT_CHANGE || id == CHARTEVENT_OBJECT_CLICK || id == CHARTEVENT_CLICK)
   {
      g_is_dragging = false;

      if(sparam == OBJ_LINE_ENT || sparam == OBJ_LINE_SL || sparam == OBJ_LINE_TP)
      {
         SyncLinesFromChart();
         g_is_dragging = false;
      }

      // Clique em cima de uma caixa de Risco/Gain enviada: mostra/esconde os dados (igual TradingView)
      if(id == CHARTEVENT_CLICK)
         ToggleTrackInfoAt((int)lparam, (int)dparam);

      // Badges são botões: não deixa ficarem "afundados" ao clicar
      if(id == CHARTEVENT_OBJECT_CLICK && (StringFind(sparam, PREFIX_TRK) == 0 || StringFind(sparam, "TABR_BDG_") == 0))
         ObjectSetInteger(0, sparam, OBJPROP_STATE, false);

      if(g_lines_active && g_auto_send)
      {
         CheckUnselectAndOrder();
      }
   }

   // 4. Clique em Botões da Boleta
   if(id == CHARTEVENT_OBJECT_CLICK)
   {
      if(sparam == PREFIX_GUI + "BTN_MIN")
      {
         g_panel_minimized = !g_panel_minimized;
         DestroyPanelGUI();
         CreatePanelGUI();
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      if(sparam == PREFIX_GUI + "BTN_DIR_BUY")
      {
         g_dir = DIR_BUY;
         double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
         double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
         double dist = MathAbs(g_entry_price - g_sl_price);
         if(dist <= 0) dist = 150 * point;

         g_entry_price = NormalizePrice(ask);
         g_sl_price    = NormalizePrice(ask - dist);
         g_tp_price    = NormalizePrice(ask + (dist * 3.0));

         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      if(sparam == PREFIX_GUI + "BTN_DIR_SELL")
      {
         g_dir = DIR_SELL;
         double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
         double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
         double dist = MathAbs(g_entry_price - g_sl_price);
         if(dist <= 0) dist = 150 * point;

         g_entry_price = NormalizePrice(bid);
         g_sl_price    = NormalizePrice(bid + dist);
         g_tp_price    = NormalizePrice(bid - (dist * 3.0));

         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      if(sparam == PREFIX_GUI + "BTN_RISK_BAL")
      {
         g_risk_mode = RISK_PERCENT_BALANCE;
         g_manual_lot = false;
         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }
      if(sparam == PREFIX_GUI + "BTN_RISK_EQ")
      {
         g_risk_mode = RISK_PERCENT_EQUITY;
         g_manual_lot = false;
         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }
      if(sparam == PREFIX_GUI + "BTN_RISK_MON")
      {
         g_risk_mode = RISK_FIXED_MONEY;
         g_manual_lot = false;
         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      if(sparam == PREFIX_GUI + "BTN_RECALC")
      {
         string r_str = ObjectGetString(0, PREFIX_GUI + "EDT_RISK_VAL", OBJPROP_TEXT);
         g_risk_value = StringToDouble(r_str);
         if(g_risk_value <= 0) g_risk_value = 1.0;
         g_manual_lot = false;

         RecalculateRiskAndLot();
         ObjectSetString(0, PREFIX_GUI + "EDT_CALC_LOT", OBJPROP_TEXT, DoubleToString(g_calc_lot, 2));
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      if(sparam == PREFIX_GUI + "BTN_RR_1_1")
      {
         g_rr_ratio = RR_1_1;
         double dist = MathAbs(g_entry_price - g_sl_price);
         if(g_dir == DIR_BUY) g_tp_price = NormalizePrice(g_entry_price + dist * 1.0);
         else g_tp_price = NormalizePrice(g_entry_price - dist * 1.0);
         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }
      if(sparam == PREFIX_GUI + "BTN_RR_2_1")
      {
         g_rr_ratio = RR_2_1;
         double dist = MathAbs(g_entry_price - g_sl_price);
         if(g_dir == DIR_BUY) g_tp_price = NormalizePrice(g_entry_price + dist * 2.0);
         else g_tp_price = NormalizePrice(g_entry_price - dist * 2.0);
         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }
      if(sparam == PREFIX_GUI + "BTN_RR_3_1")
      {
         g_rr_ratio = RR_3_1;
         double dist = MathAbs(g_entry_price - g_sl_price);
         if(g_dir == DIR_BUY) g_tp_price = NormalizePrice(g_entry_price + dist * 3.0);
         else g_tp_price = NormalizePrice(g_entry_price - dist * 3.0);
         RecalculateRiskAndLot();
         DestroyPanelGUI();
         CreatePanelGUI();
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }
      if(sparam == PREFIX_GUI + "BTN_RR_FREE")
      {
         g_rr_ratio = RR_FREE;
         DestroyPanelGUI();
         CreatePanelGUI();
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      // BOTÃO DE CRIAR / REMOVER LINHAS NO GRÁFICO (SOB DEMANDA)
      if(sparam == PREFIX_GUI + "BTN_TOGGLE_LINES")
      {
         g_lines_active = !g_lines_active;
         if(g_lines_active)
         {
            double ask = SymbolInfoDouble(_Symbol, SYMBOL_ASK);
            double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
            double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
            double dist = 150 * point;
            if(dist < 10 * point) dist = 0.0015;

            if(g_dir == DIR_BUY)
            {
               g_entry_price = NormalizePrice(ask);
               g_sl_price    = NormalizePrice(ask - dist);
               g_tp_price    = NormalizePrice(ask + (dist * 3.0));
            }
            else
            {
               g_entry_price = NormalizePrice(bid);
               g_sl_price    = NormalizePrice(bid + dist);
               g_tp_price    = NormalizePrice(bid - (dist * 3.0));
            }

            CreateChartVisualLines();
            RecalculateRiskAndLot();
            UpdateChartVisuals("");
         }
         else
         {
            DestroyChartVisualLines();
         }

         DestroyPanelGUI();
         CreatePanelGUI();
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      // Alternar Auto-Envio ao Desmarcar
      if(sparam == PREFIX_GUI + "BTN_TOGGLE_AUTOSEND")
      {
         g_auto_send = !g_auto_send;
         DestroyPanelGUI();
         CreatePanelGUI();
         UpdatePanelInfo();
         ChartRedraw();
         return;
      }

      // Comprar a Mercado Imediato
      if(sparam == PREFIX_GUI + "BTN_MKT_BUY")
      {
         SetMarketLevels(DIR_BUY);
         RecalculateRiskAndLot();
         SendConfiguredOrder();
         return;
      }

      // Vender a Mercado Imediato
      if(sparam == PREFIX_GUI + "BTN_MKT_SELL")
      {
         SetMarketLevels(DIR_SELL);
         RecalculateRiskAndLot();
         SendConfiguredOrder();
         return;
      }

      // ENVIAR ORDEM DAS LINHAS
      if(sparam == PREFIX_GUI + "BTN_EXEC_LINES")
      {
         SendConfiguredOrder();
         return;
      }

      // Breakeven
      if(sparam == PREFIX_GUI + "BTN_BE")
      {
         MoveToBreakeven();
         return;
      }

      // Fechar 50%
      if(sparam == PREFIX_GUI + "BTN_CLOSE_HALF")
      {
         CloseHalfPositions();
         return;
      }

      // Fechar Tudo
      if(sparam == PREFIX_GUI + "BTN_CLOSE_ALL")
      {
         CloseAllPositions();
         return;
      }
   }

   // 5. Edição de Texto no Campo de Risco ou Lote
   if(id == CHARTEVENT_OBJECT_ENDEDIT)
   {
      if(sparam == PREFIX_GUI + "EDT_RISK_VAL")
      {
         g_risk_value = StringToDouble(ObjectGetString(0, PREFIX_GUI + "EDT_RISK_VAL", OBJPROP_TEXT));
         if(g_risk_value <= 0) g_risk_value = 1.0;
         g_manual_lot = false;
         RecalculateRiskAndLot();
         ObjectSetString(0, PREFIX_GUI + "EDT_CALC_LOT", OBJPROP_TEXT, DoubleToString(g_calc_lot, 2));
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
      }
      else if(sparam == PREFIX_GUI + "EDT_CALC_LOT")
      {
         g_calc_lot = NormalizeLot(StringToDouble(ObjectGetString(0, PREFIX_GUI + "EDT_CALC_LOT", OBJPROP_TEXT)));
         g_manual_lot = true;   // mantém este lote; Stop/Gain em dinheiro passam a usar ele
         if(g_lines_active) UpdateChartVisuals("");
         UpdatePanelInfo();
         ChartRedraw();
      }
   }
}
//+------------------------------------------------------------------+
