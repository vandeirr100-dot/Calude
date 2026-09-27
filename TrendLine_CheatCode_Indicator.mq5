//+------------------------------------------------------------------+
//|                           TrendLine_CheatCode_Indicator.mq5      |
//|  Linhas de tendência automáticas no estilo "Código de Trapaça":  |
//|   - Ponto A = pivô original (mínima/máxima absoluta do período)  |
//|   - Ponto B = segundo toque que trava o ângulo                   |
//|   - Tolerância ZERO: nenhuma vela pode ter furado a linha antes  |
//|   - Elo contínuo: o Ponto B anterior vira o novo Ponto A         |
//|   - Linhas em Raio (estendem para a direita)                     |
//|   - Filtro Top-Down: linhas de tempos gráficos maiores no gráfico|
//|   - Sinais: Bounce (toque + rejeição) e Rompimento (fechamento   |
//|     do outro lado da linha)                                      |
//+------------------------------------------------------------------+
#property copyright   "TrendLine CheatCode"
#property version     "1.00"
#property description "Linhas de tendência automáticas: Ponto A -> Ponto B, zero interseção, elo contínuo, top-down."
#property indicator_chart_window
#property indicator_buffers 3
#property indicator_plots   3

#property indicator_label1  "Bounce Compra"
#property indicator_type1   DRAW_ARROW
#property indicator_color1  clrDodgerBlue
#property indicator_width1  2

#property indicator_label2  "Bounce Venda"
#property indicator_type2   DRAW_ARROW
#property indicator_color2  clrOrangeRed
#property indicator_width2  2

#property indicator_label3  "Rompimento"
#property indicator_type3   DRAW_ARROW
#property indicator_color3  clrGold
#property indicator_width3  2

//--- ENTRADAS -------------------------------------------------------
input group "--- Configurações de Pivôs e Linhas ---"
input int             InpPivotDepth     = 5;            // Velas à direita para confirmar o Ponto B
input int             InpMinBarsAB      = 5;            // Distância mínima entre Ponto A e Ponto B (velas)
input int             InpMinTouches     = 2;            // Mínimo de toques na linha (A e B contam)
input int             InpMaxLinesSide   = 3;            // Máx. de linhas por lado em cada tempo gráfico
input bool            InpDrawSupport    = true;         // Desenhar linhas de alta (suporte)
input bool            InpDrawResistance = true;         // Desenhar linhas de baixa (resistência)
input color           InpUpLineColor    = clrGreen;     // Cor da Linha de Alta (Suporte)
input color           InpDownLineColor  = clrRed;       // Cor da Linha de Baixa (Resistência)
input int             InpLineWidth      = 2;            // Espessura das Linhas (tempo gráfico atual)
input ENUM_LINE_STYLE InpLineStyle      = STYLE_SOLID;  // Estilo das Linhas
input int             InpKeepBroken     = 6;            // Linhas rompidas mantidas no gráfico (pontilhadas)

input group "--- Filtro Top-Down (tempos gráficos) ---"
input bool            InpUseChartTF     = true;         // Linhas do tempo gráfico atual
input int             InpBarsChartTF    = 500;          // Velas analisadas no tempo gráfico atual
input bool            InpUseHTF1        = true;         // Usar tempo gráfico maior 1
input ENUM_TIMEFRAMES InpHTF1           = PERIOD_D1;    // Tempo gráfico maior 1
input int             InpBarsHTF1       = 300;          // Velas analisadas (TF maior 1)
input bool            InpUseHTF2        = true;         // Usar tempo gráfico maior 2
input ENUM_TIMEFRAMES InpHTF2           = PERIOD_W1;    // Tempo gráfico maior 2
input int             InpBarsHTF2       = 300;          // Velas analisadas (TF maior 2)
input bool            InpUseHTF3        = false;        // Usar tempo gráfico maior 3
input ENUM_TIMEFRAMES InpHTF3           = PERIOD_MN1;   // Tempo gráfico maior 3
input int             InpBarsHTF3       = 240;          // Velas analisadas (TF maior 3)
input bool            InpRefineAnchors  = true;         // Ajustar Pontos A/B à vela exata do TF atual

input group "--- Configurações de Sinais Visuais ---"
input bool            InpShowArrows     = true;         // Mostrar Setas no Gráfico
input color           InpBuyArrowColor  = clrDodgerBlue;// Cor da Seta de Compra (Bounce)
input color           InpSellArrowColor = clrOrangeRed; // Cor da Seta de Venda (Bounce)
input color           InpBreakColor     = clrGold;      // Cor do X de Rompimento
input int             InpArrowSize      = 2;            // Tamanho das Setas
input double          InpTouchTol       = 0.15;         // Tolerância do toque (fração do range médio das velas)
input int             InpHistoryBars    = 1000;         // Velas históricas para marcar sinais

input group "--- Configurações de Alertas ---"
input bool            InpEnableAlerts   = true;         // Ativar Alertas Sonoros/Pop-up
input bool            InpSendPush       = false;        // Enviar Notificação Push no Celular
input bool            InpSendEmail      = false;        // Enviar E-mail

//--- CONSTANTES / ESTRUTURAS ----------------------------------------
#define PREFIX    "TL_CheatCode_"
#define NSLOTS    4
#define MAX_KEYS  500

struct TLine
  {
   string   name;
   int      dir;      // +1 suporte (alta), -1 resistência (baixa)
   int      slot;     // índice do tempo gráfico
   datetime tA;
   double   pA;
   datetime tB;
   double   pB;
   int      touches;
   bool     broken;
  };

//--- BUFFERS / GLOBAIS ----------------------------------------------
double   BuyBuf[], SellBuf[], BreakBuf[];

TLine    g_lines[];
string   g_brokenObjs[];
string   g_brokenKeys[];
long     g_brkCounter  = 0;
datetime g_lastBarTime = 0;
datetime g_lastAlert   = 0;

bool            g_slotOn[NSLOTS];
ENUM_TIMEFRAMES g_slotTF[NSLOTS];
int             g_slotBars[NSLOTS];
int             g_slotWidth[NSLOTS];
string          g_slotTag[NSLOTS];
datetime        g_slotLast[NSLOTS];

//+------------------------------------------------------------------+
//| Utilidades                                                       |
//+------------------------------------------------------------------+
string TFName(ENUM_TIMEFRAMES tf)
  {
   if(tf == PERIOD_CURRENT) tf = (ENUM_TIMEFRAMES)Period();
   return StringSubstr(EnumToString(tf), 7);
  }

double PriceOf(const MqlRates &r, const int dir) { return (dir > 0 ? r.low : r.high); }

void Notify(const string msg)
  {
   if(InpEnableAlerts) Alert(msg);
   if(InpSendPush)     SendNotification(msg);
   if(InpSendEmail)    SendMail("TrendLine CheatCode", msg);
  }

void SetupSlot(const int s, const bool on, const ENUM_TIMEFRAMES tf, const int bars, const int width)
  {
   g_slotTF[s]    = (tf == PERIOD_CURRENT ? (ENUM_TIMEFRAMES)Period() : tf);
   // tempos maiores só fazem sentido se forem MAIORES que o gráfico atual
   g_slotOn[s]    = on && (s == 0 || PeriodSeconds(g_slotTF[s]) > PeriodSeconds((ENUM_TIMEFRAMES)Period()));
   g_slotBars[s]  = MathMax(bars, 50);
   g_slotWidth[s] = MathMax(width, 1);
   g_slotTag[s]   = PREFIX + TFName(g_slotTF[s]) + "_";
   g_slotLast[s]  = 0;
  }

//+------------------------------------------------------------------+
//| Chaves de linhas já rompidas (para não redesenhá-las)            |
//+------------------------------------------------------------------+
string LineKey(const int slot, const int dir, const datetime tA, const datetime tB)
  {
   return TFName(g_slotTF[slot]) + "|" + IntegerToString(dir) + "|" +
          IntegerToString((long)tA) + "|" + IntegerToString((long)tB);
  }

bool IsBrokenKey(const string key)
  {
   for(int i = 0; i < ArraySize(g_brokenKeys); i++)
      if(g_brokenKeys[i] == key) return true;
   return false;
  }

void AddBrokenKey(const string key)
  {
   int n = ArraySize(g_brokenKeys);
   ArrayResize(g_brokenKeys, n + 1);
   g_brokenKeys[n] = key;
   if(ArraySize(g_brokenKeys) > MAX_KEYS) ArrayRemove(g_brokenKeys, 0, 1);
  }

//+------------------------------------------------------------------+
//| Objetos gráficos                                                 |
//+------------------------------------------------------------------+
void CreateLine(const string name, const datetime t1, const double p1,
                const datetime t2, const double p2, const color clr,
                const int width, const ENUM_LINE_STYLE style,
                const bool ray, const string tip)
  {
   if(ObjectFind(0, name) >= 0) ObjectDelete(0, name);
   if(!ObjectCreate(0, name, OBJ_TREND, 0, t1, p1, t2, p2)) return;
   ObjectSetInteger(0, name, OBJPROP_COLOR,      clr);
   ObjectSetInteger(0, name, OBJPROP_WIDTH,      width);
   ObjectSetInteger(0, name, OBJPROP_STYLE,      style);
   ObjectSetInteger(0, name, OBJPROP_RAY_RIGHT,  ray);
   ObjectSetInteger(0, name, OBJPROP_RAY_LEFT,   false);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, name, OBJPROP_BACK,       true);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN,     true);
   ObjectSetString (0, name, OBJPROP_TOOLTIP,    tip);
  }

// Move o Ponto A/B do TF maior para a vela exata do TF atual onde ocorreu a mínima/máxima
datetime RefineTime(const ENUM_TIMEFRAMES tf, const datetime t, const int dir)
  {
   if(!InpRefineAnchors || tf == (ENUM_TIMEFRAMES)Period()) return t;
   MqlRates lr[];
   int c = CopyRates(_Symbol, PERIOD_CURRENT, t, t + PeriodSeconds(tf) - 1, lr);
   if(c <= 0) return t;
   int best = 0;
   for(int i = 1; i < c; i++)
     {
      if(dir > 0 && lr[i].low  < lr[best].low)  best = i;
      if(dir < 0 && lr[i].high > lr[best].high) best = i;
     }
   return lr[best].time;
  }

// Valor da linha no tempo t (usa o objeto desenhado; se falhar, interpola no tempo)
double LineValue(const TLine &L, const datetime t)
  {
   double v = 0.0;
   if(ObjectFind(0, L.name) >= 0)
      v = ObjectGetValueByTime(0, L.name, t, 0);
   if(v <= 0.0 && L.tB != L.tA)
      v = L.pA + (L.pB - L.pA) * (double)(t - L.tA) / (double)(L.tB - L.tA);
   return v;
  }

// Converte uma linha rompida em segmento pontilhado (fim da tendência)
void MarkBroken(const int k, const datetime tBreak, const double vBreak)
  {
   g_lines[k].broken = true;
   AddBrokenKey(LineKey(g_lines[k].slot, g_lines[k].dir, g_lines[k].tA, g_lines[k].tB));

   string nm  = PREFIX + "BRK_" + IntegerToString(g_brkCounter++);
   color  clr = (g_lines[k].dir > 0 ? InpUpLineColor : InpDownLineColor);
   CreateLine(nm, g_lines[k].tA, g_lines[k].pA, tBreak, vBreak, clr, 1, STYLE_DOT, false,
              "Linha rompida (" + TFName(g_slotTF[g_lines[k].slot]) + ")");
   ObjectDelete(0, g_lines[k].name);

   int n = ArraySize(g_brokenObjs);
   ArrayResize(g_brokenObjs, n + 1);
   g_brokenObjs[n] = nm;
   while(ArraySize(g_brokenObjs) > InpKeepBroken)
     {
      ObjectDelete(0, g_brokenObjs[0]);
      ArrayRemove(g_brokenObjs, 0, 1);
     }
  }

//+------------------------------------------------------------------+
//| Construção das linhas (casco convexo = zero interseção)          |
//+------------------------------------------------------------------+
// >0 quando o ponto p é um vértice válido entre o e q
double Turn(const MqlRates &r[], const int o, const int p, const int q, const int dir)
  {
   double yo = PriceOf(r[o], dir), yp = PriceOf(r[p], dir), yq = PriceOf(r[q], dir);
   double c  = (double)(p - o) * (yq - yo) - (yp - yo) * (double)(q - o);
   return dir * c;
  }

void BuildSide(const MqlRates &r[], const int n, const int dir, const int slot, const double tol)
  {
   //--- 1) Ponto A original: mínima absoluta (alta) ou máxima absoluta (baixa)
   int a = 0;
   for(int i = 1; i < n; i++)
     {
      if(dir > 0 && r[i].low  < r[a].low)  a = i;
      if(dir < 0 && r[i].high > r[a].high) a = i;
     }

   //--- 2) Cadeia de linhas a partir de A. Cada segmento do casco convexo é a linha
   //       mais "apertada" possível sem NENHUMA vela atravessando (Regra 2), e o
   //       Ponto B de um segmento é o Ponto A do próximo (Regra 3: Elo Contínuo).
   int hull[];
   ArrayResize(hull, n - a);
   int h = 0;
   for(int i = a; i < n; i++)
     {
      while(h >= 2 && Turn(r, hull[h - 2], hull[h - 1], i, dir) <= 0.0) h--;
      hull[h++] = i;
     }

   //--- 3) Seleciona segmentos com Ponto B confirmado e distância mínima
   int lastConfirmed = n - 1 - InpPivotDepth;
   int segA[], segB[];
   ArrayResize(segA, MathMax(h, 1));
   ArrayResize(segB, MathMax(h, 1));
   int ns = 0;
   for(int k = 0; k < h - 1; k++)
     {
      int A = hull[k], B = hull[k + 1];
      if(B > lastConfirmed) break;
      if(B - A < InpMinBarsAB) continue;
      segA[ns] = A; segB[ns] = B; ns++;
     }

   //--- 4) Desenha as linhas mais recentes (as mais íngremes, que "cercam" o preço)
   int first = MathMax(0, ns - InpMaxLinesSide);
   for(int k = first; k < ns; k++)
     {
      int    A  = segA[k], B = segB[k];
      double yA = PriceOf(r[A], dir), yB = PriceOf(r[B], dir);
      double slope = (yB - yA) / (double)(B - A);

      // Regra 1: conta os toques distintos na linha
      int  touches = 0;
      bool inTouch = false;
      for(int j = A; j < n; j++)
        {
         double lv   = yA + slope * (j - A);
         bool   near = (MathAbs(PriceOf(r[j], dir) - lv) <= tol);
         if(near && !inTouch) touches++;
         inTouch = near;
        }
      if(touches < InpMinTouches) continue;

      datetime tA = RefineTime(g_slotTF[slot], r[A].time, dir);
      datetime tB = RefineTime(g_slotTF[slot], r[B].time, dir);
      if(IsBrokenKey(LineKey(slot, dir, tA, tB))) continue;

      string name = g_slotTag[slot] + (dir > 0 ? "S_" : "R_") + IntegerToString(k);
      string tip  = (dir > 0 ? "Suporte " : "Resistência ") + TFName(g_slotTF[slot]) +
                    " | Toques: " + IntegerToString(touches);
      CreateLine(name, tA, yA, tB, yB, (dir > 0 ? InpUpLineColor : InpDownLineColor),
                 g_slotWidth[slot], InpLineStyle, true, tip);

      int sz = ArraySize(g_lines);
      ArrayResize(g_lines, sz + 1);
      g_lines[sz].name    = name;
      g_lines[sz].dir     = dir;
      g_lines[sz].slot    = slot;
      g_lines[sz].tA      = tA;
      g_lines[sz].pA      = yA;
      g_lines[sz].tB      = tB;
      g_lines[sz].pB      = yB;
      g_lines[sz].touches = touches;
      g_lines[sz].broken  = false;
     }
  }

void RemoveSlotLines(const int s)
  {
   TLine tmp[];
   int   m = 0;
   ArrayResize(tmp, ArraySize(g_lines));
   for(int k = 0; k < ArraySize(g_lines); k++)
      if(g_lines[k].slot != s) tmp[m++] = g_lines[k];
   ArrayResize(g_lines, m);
   for(int k = 0; k < m; k++) g_lines[k] = tmp[k];
   ObjectsDeleteAll(0, g_slotTag[s]);
  }

bool RebuildSlot(const int s)
  {
   MqlRates r[];
   ArraySetAsSeries(r, false);                       // r[0] = vela mais antiga
   int n = CopyRates(_Symbol, g_slotTF[s], 1, g_slotBars[s], r); // só velas fechadas
   if(n < InpPivotDepth + InpMinBarsAB + 3) return false;         // dados ainda carregando

   // tolerância do toque = fração do range médio das últimas 14 velas deste TF
   double rng = 0.0;
   int    cnt = MathMin(14, n);
   for(int i = n - cnt; i < n; i++) rng += r[i].high - r[i].low;
   double tol = InpTouchTol * rng / cnt;

   RemoveSlotLines(s);
   if(InpDrawSupport)    BuildSide(r, n, +1, s, tol);
   if(InpDrawResistance) BuildSide(r, n, -1, s, tol);
   return true;
  }

//+------------------------------------------------------------------+
//| Sinais                                                           |
//| retorno: 0 = nada | 1 = bounce | 2 = rompimento                  |
//+------------------------------------------------------------------+
int CheckBar(const TLine &L, const int i, const datetime &t[], const double &hi[],
             const double &lo[], const double &cl[], const double tol, double &v)
  {
   if(i < 1 || L.broken) return 0;
   if(t[i] <= L.tB) return 0;                        // só depois que a linha foi travada
   v = LineValue(L, t[i]);
   double vp = LineValue(L, t[i - 1]);
   if(v <= 0.0) return 0;

   if(L.dir > 0)
     {
      if(cl[i] < v) return 2;                                       // fechou abaixo: fim da alta
      if(lo[i] <= v + tol && lo[i - 1] > vp + tol) return 1;        // chegou na linha e fechou acima
     }
   else
     {
      if(cl[i] > v) return 2;                                       // fechou acima: fim da baixa
      if(hi[i] >= v - tol && hi[i - 1] < vp - tol) return 1;        // chegou na linha e fechou abaixo
     }
   return 0;
  }

// Marca sinais históricos das linhas de um slot (sem alertas)
void ScanSlot(const int s, const int total, const datetime &t[], const double &hi[],
              const double &lo[], const double &cl[], const double tol)
  {
   int start = MathMax(1, total - 1 - InpHistoryBars);
   for(int k = 0; k < ArraySize(g_lines); k++)
     {
      if(g_lines[k].slot != s) continue;
      for(int i = start; i <= total - 2 && !g_lines[k].broken; i++)
        {
         double v = 0.0;
         int code = CheckBar(g_lines[k], i, t, hi, lo, cl, tol, v);
         if(code == 1)
           {
            if(g_lines[k].dir > 0) BuyBuf[i]  = lo[i];
            else                   SellBuf[i] = hi[i];
           }
         else if(code == 2)
           {
            BreakBuf[i] = v;
            MarkBroken(k, t[i], v);
           }
        }
     }
  }

// Avalia a vela que acabou de fechar e dispara alertas (uma vez por vela)
void EvaluateLive(const int i, const datetime &t[], const double &hi[],
                  const double &lo[], const double &cl[], const double tol)
  {
   string msg = "";
   for(int k = 0; k < ArraySize(g_lines); k++)
     {
      double v = 0.0;
      int code = CheckBar(g_lines[k], i, t, hi, lo, cl, tol, v);
      if(code == 0) continue;
      string tf = TFName(g_slotTF[g_lines[k].slot]);
      if(code == 1)
        {
         if(g_lines[k].dir > 0) { BuyBuf[i]  = lo[i]; msg += "COMPRA (bounce no suporte " + tf + ") "; }
         else                   { SellBuf[i] = hi[i]; msg += "VENDA (bounce na resistência " + tf + ") "; }
        }
      else
        {
         BreakBuf[i] = v;
         msg += (g_lines[k].dir > 0 ? "SAÍDA DE COMPRA (suporte " : "SAÍDA DE VENDA (resistência ") +
                tf + " rompido) ";
         MarkBroken(k, t[i], v);
        }
     }
   if(msg != "" && t[i] != g_lastAlert)
     {
      g_lastAlert = t[i];
      Notify(_Symbol + " " + TFName(PERIOD_CURRENT) + ": " + msg);
     }
  }

//+------------------------------------------------------------------+
//| Inicialização                                                    |
//+------------------------------------------------------------------+
int OnInit()
  {
   if(InpPivotDepth < 1 || InpMinBarsAB < 1 || InpMaxLinesSide < 1)
     {
      Print("Parâmetros inválidos: profundidade, distância A-B e máx. linhas devem ser >= 1.");
      return INIT_PARAMETERS_INCORRECT;
     }

   SetIndexBuffer(0, BuyBuf,   INDICATOR_DATA);
   SetIndexBuffer(1, SellBuf,  INDICATOR_DATA);
   SetIndexBuffer(2, BreakBuf, INDICATOR_DATA);

   PlotIndexSetInteger(0, PLOT_ARROW, 233);
   PlotIndexSetInteger(1, PLOT_ARROW, 234);
   PlotIndexSetInteger(2, PLOT_ARROW, 251);
   PlotIndexSetInteger(0, PLOT_ARROW_SHIFT,  12);
   PlotIndexSetInteger(1, PLOT_ARROW_SHIFT, -12);
   PlotIndexSetInteger(0, PLOT_LINE_COLOR, InpBuyArrowColor);
   PlotIndexSetInteger(1, PLOT_LINE_COLOR, InpSellArrowColor);
   PlotIndexSetInteger(2, PLOT_LINE_COLOR, InpBreakColor);

   for(int p = 0; p < 3; p++)
     {
      PlotIndexSetDouble (p, PLOT_EMPTY_VALUE, EMPTY_VALUE);
      PlotIndexSetInteger(p, PLOT_LINE_WIDTH,  InpArrowSize);
      if(!InpShowArrows) PlotIndexSetInteger(p, PLOT_DRAW_TYPE, DRAW_NONE);
     }

   // Slot 0 = gráfico atual; slots 1..3 = filtro top-down (linhas mais grossas)
   SetupSlot(0, InpUseChartTF, PERIOD_CURRENT, InpBarsChartTF, InpLineWidth);
   SetupSlot(1, InpUseHTF1,    InpHTF1,        InpBarsHTF1,    InpLineWidth + 1);
   SetupSlot(2, InpUseHTF2,    InpHTF2,        InpBarsHTF2,    InpLineWidth + 2);
   SetupSlot(3, InpUseHTF3,    InpHTF3,        InpBarsHTF3,    InpLineWidth + 3);

   IndicatorSetString(INDICATOR_SHORTNAME, "TrendLine_CheatCode");
   IndicatorSetInteger(INDICATOR_DIGITS, _Digits);
   return INIT_SUCCEEDED;
  }

void OnDeinit(const int reason)
  {
   ObjectsDeleteAll(0, PREFIX);
   ChartRedraw();
  }

//+------------------------------------------------------------------+
//| Cálculo                                                          |
//+------------------------------------------------------------------+
int OnCalculate(const int rates_total,
                const int prev_calculated,
                const datetime &time[],
                const double &open[],
                const double &high[],
                const double &low[],
                const double &close[],
                const long &tick_volume[],
                const long &volume[],
                const int &spread[])
  {
   if(rates_total < 50) return 0;

   bool full = (prev_calculated <= 0);
   if(full)
     {
      ArrayInitialize(BuyBuf,   EMPTY_VALUE);
      ArrayInitialize(SellBuf,  EMPTY_VALUE);
      ArrayInitialize(BreakBuf, EMPTY_VALUE);
      ArrayResize(g_lines, 0);
      for(int s = 0; s < NSLOTS; s++) g_slotLast[s] = 0;
      g_lastBarTime = time[rates_total - 1];
     }
   else
     {
      for(int i = prev_calculated; i < rates_total; i++)
        {
         BuyBuf[i]   = EMPTY_VALUE;
         SellBuf[i]  = EMPTY_VALUE;
         BreakBuf[i] = EMPTY_VALUE;
        }
     }

   // tolerância no gráfico atual = fração do range médio das últimas 14 velas fechadas
   double rng = 0.0;
   for(int i = rates_total - 15; i <= rates_total - 2; i++) rng += high[i] - low[i];
   double tol = InpTouchTol * rng / 14.0;

   // 1) Nova vela: avalia a vela que fechou contra as linhas atuais (sinal + alerta)
   if(!full && time[rates_total - 1] != g_lastBarTime)
     {
      g_lastBarTime = time[rates_total - 1];
      EvaluateLive(rates_total - 2, time, high, low, close, tol);
     }

   // 2) Reconstrói as linhas de cada tempo gráfico quando ele tem uma vela nova
   bool redraw = false;
   for(int s = 0; s < NSLOTS; s++)
     {
      if(!g_slotOn[s]) continue;
      datetime last = iTime(_Symbol, g_slotTF[s], 1);
      if(last == 0 || last == g_slotLast[s]) continue;   // sem dados ainda ou nada novo
      if(RebuildSlot(s))
        {
         g_slotLast[s] = last;
         ScanSlot(s, rates_total, time, high, low, close, tol);
         redraw = true;
        }
     }
   if(redraw) ChartRedraw();

   return rates_total;
  }
//+------------------------------------------------------------------+
