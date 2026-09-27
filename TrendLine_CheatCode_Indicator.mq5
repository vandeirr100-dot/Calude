//+------------------------------------------------------------------+
//|                           TrendLine_CheatCode_Indicator.mq5      |
//|  Linhas de tendência automáticas no estilo "Código de Trapaça":  |
//|   - Ponto A = pivô original (mínima/máxima absoluta do período)  |
//|   - Ponto B = segundo toque que trava o ângulo                   |
//|   - Tolerância ZERO: nenhuma vela pode ter furado a linha antes  |
//|   - Elo contínuo: o Ponto B anterior vira o novo Ponto A         |
//|   - Linhas em Raio (estendem para a direita)                     |
//|   - Multi Tempo Gráfico: MN, W1, D1, H4, H1, M30, M15 + atual    |
//|   - Suporte e Resistência horizontais do Mensal até o M15        |
//|   - Painel moderno para ligar/desligar cada tempo gráfico        |
//|   - Relógio regressivo para o fechamento do candle atual         |
//|   - Sinais: Bounce (toque + rejeição) e Rompimento (fechamento   |
//|     do outro lado da linha)                                      |
//+------------------------------------------------------------------+
#property copyright   "TrendLine CheatCode"
#property version     "2.00"
#property description "Linhas de tendência automáticas + Suporte/Resistência MTF (MN até M15), painel liga/desliga e relógio do candle."
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

input group "--- Linhas de Tendência por Tempo Gráfico (MTF) ---"
input string          InpDefaultLT      = "ATUAL,D1,W1";// LT ligadas ao iniciar (ATUAL,MN,W1,D1,H4,H1,M30,M15)
input int             InpBarsChartTF    = 500;          // Velas analisadas no tempo gráfico atual
input int             InpBarsMTF        = 300;          // Velas analisadas nos demais tempos gráficos
input bool            InpRefineAnchors  = true;         // Ajustar Pontos A/B à vela exata do TF atual
input bool            InpSignalsHTFOnly = true;         // Sinais só de linhas do TF atual ou maiores

input group "--- Suporte e Resistência (Mensal até M15) ---"
input string          InpDefaultSR      = "W1,D1,H4";   // S/R ligados ao iniciar (MN,W1,D1,H4,H1,M30,M15)
input int             InpSRBars         = 300;          // Velas analisadas por tempo gráfico
input int             InpSRPivot        = 3;            // Velas de cada lado para confirmar topo/fundo
input double          InpSRMerge        = 0.5;          // Agrupar níveis próximos (fração do range médio)
input int             InpSRMaxEach      = 2;            // Máx. níveis acima e abaixo do preço por TF
input int             InpSRMinTouches   = 1;            // Mínimo de toques para exibir o nível
input color           InpResColor       = C'239,83,80'; // Cor da Resistência
input color           InpSupColor       = C'38,166,154';// Cor do Suporte
input ENUM_LINE_STYLE InpSRStyle        = STYLE_DASH;   // Estilo das linhas de S/R (TFs abaixo do D1)
input int             InpSRLabelShift   = 6;            // Posição dos rótulos (velas à direita)

input group "--- Painel e Relógio ---"
input int             InpPanelX         = 12;           // Painel: distância da esquerda (px)
input int             InpPanelY         = 30;           // Painel: distância do topo (px)
input color           InpAccent         = C'0,168,255'; // Cor de destaque do painel
input bool            InpShowClock      = true;         // Relógio regressivo no gráfico
input bool            InpShowLabels     = true;         // Rótulos nos níveis de S/R
input bool            InpChartShift     = true;         // Afastar o gráfico da borda direita

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
#define MAXSLOTS  8
#define MAX_KEYS  500

//--- paleta do painel
#define C_BG      C'19,23,31'
#define C_CARD    C'27,32,43'
#define C_BORDER  C'44,51,66'
#define C_ROWALT  C'23,28,37'
#define C_OFF     C'38,44,57'
#define C_TEXT    C'230,234,240'
#define C_MUTED   C'128,138,156'
#define C_DARK    C'10,14,20'
#define C_SRON    C'255,171,64'
#define C_WARN    C'255,152,0'
#define C_DANGER  C'239,68,68'

#define PANEL_W   260
#define HDR_H     36
#define ROW_H     26

const string PNL = PREFIX + "PNL_";   // objetos do painel
const string CLK = PREFIX + "CLK_";   // relógio no gráfico

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
int      g_ratesTotal  = 0;
datetime g_srChartBar  = 0;

int             g_nSlots = 0;
ENUM_TIMEFRAMES g_slotTF[MAXSLOTS];
bool            g_slotIsChart[MAXSLOTS];
bool            g_slotSig[MAXSLOTS];
bool            g_ltOn[MAXSLOTS];
bool            g_srOn[MAXSLOTS];
int             g_slotBars[MAXSLOTS];
int             g_slotWidth[MAXSLOTS];
string          g_slotTag[MAXSLOTS];
datetime        g_slotLast[MAXSLOTS];
datetime        g_srLast[MAXSLOTS];

bool g_clock  = true;
bool g_arrows = true;
bool g_labels = true;
bool g_min    = false;

//+------------------------------------------------------------------+
//| Utilidades                                                       |
//+------------------------------------------------------------------+
string TFName(ENUM_TIMEFRAMES tf)
  {
   if(tf == PERIOD_CURRENT) tf = (ENUM_TIMEFRAMES)Period();
   return StringSubstr(EnumToString(tf), 7);
  }

string TFDesc(const ENUM_TIMEFRAMES tf)
  {
   switch(tf)
     {
      case PERIOD_MN1: return "Mensal";
      case PERIOD_W1:  return "Semanal";
      case PERIOD_D1:  return "Diário";
      case PERIOD_H4:  return "4 horas";
      case PERIOD_H1:  return "1 hora";
      case PERIOD_M30: return "30 min";
      case PERIOD_M15: return "15 min";
     }
   return "";
  }

double PriceOf(const MqlRates &r, const int dir) { return (dir > 0 ? r.low : r.high); }

void Notify(const string msg)
  {
   if(InpEnableAlerts) Alert(msg);
   if(InpSendPush)     SendNotification(msg);
   if(InpSendEmail)    SendMail("TrendLine CheatCode", msg);
  }

string SRTag(const int s)  { return PREFIX + "SR_"  + TFName(g_slotTF[s]) + "_"; }
string BrkTag(const int s) { return PREFIX + "BRK_" + TFName(g_slotTF[s]) + "_"; }

//+------------------------------------------------------------------+
//| Tempos gráficos: MN, W1, D1, H4, H1, M30, M15 + o gráfico atual  |
//+------------------------------------------------------------------+
void AddSlot(const ENUM_TIMEFRAMES tf)
  {
   int s = g_nSlots++;
   g_slotTF[s]      = tf;
   g_slotIsChart[s] = (tf == (ENUM_TIMEFRAMES)Period());
   g_slotSig[s]     = !InpSignalsHTFOnly || PeriodSeconds(tf) >= PeriodSeconds(PERIOD_CURRENT);
   g_slotBars[s]    = MathMax(g_slotIsChart[s] ? InpBarsChartTF : InpBarsMTF, 50);
   g_slotTag[s]     = PREFIX + TFName(tf) + "_";
   g_slotLast[s]    = 0;
   g_srLast[s]      = 0;
  }

void BuildSlots()
  {
   const ENUM_TIMEFRAMES base[7] = {PERIOD_MN1, PERIOD_W1, PERIOD_D1, PERIOD_H4, PERIOD_H1, PERIOD_M30, PERIOD_M15};
   ENUM_TIMEFRAMES cur   = (ENUM_TIMEFRAMES)Period();
   bool            curIn = false;
   g_nSlots = 0;
   for(int i = 0; i < 7; i++)
     {
      // tempo gráfico atual fora da lista (H2, M5...) entra na posição certa
      if(!curIn && PeriodSeconds(cur) > PeriodSeconds(base[i])) { AddSlot(cur); curIn = true; }
      AddSlot(base[i]);
      if(base[i] == cur) curIn = true;
     }
   if(!curIn) AddSlot(cur);

   // linhas de tempos gráficos maiores são mais grossas (filtro top-down)
   int ci = 0;
   for(int s = 0; s < g_nSlots; s++) if(g_slotIsChart[s]) ci = s;
   for(int s = 0; s < g_nSlots; s++)
     {
      if(s < ci)       g_slotWidth[s] = MathMax(InpLineWidth, 1) + MathMin(3, ci - s);
      else if(s == ci) g_slotWidth[s] = MathMax(InpLineWidth, 1);
      else             g_slotWidth[s] = MathMax(InpLineWidth - 1, 1);
     }
  }

bool InList(const string list, const int s)
  {
   string up = list;
   StringToUpper(up);
   StringReplace(up, " ", "");
   string items[];
   int    n  = StringSplit(up, ',', items);
   string nm = TFName(g_slotTF[s]);
   for(int i = 0; i < n; i++)
      if(items[i] == nm || (items[i] == "MN" && nm == "MN1") || (items[i] == "ATUAL" && g_slotIsChart[s]))
         return true;
   return false;
  }

//+------------------------------------------------------------------+
//| Estado do painel salvo por gráfico (sobrevive à troca de TF)     |
//+------------------------------------------------------------------+
string GVKey(const string k) { return "TLCC_" + IntegerToString(ChartID()) + "_" + k; }

bool LoadFlag(const string k, const bool def)
  {
   string n = GVKey(k);
   if(GlobalVariableCheck(n)) return (GlobalVariableGet(n) != 0.0);
   return def;
  }

void SaveFlag(const string k, const bool v) { GlobalVariableSet(GVKey(k), v ? 1.0 : 0.0); }

void LoadState()
  {
   for(int s = 0; s < g_nSlots; s++)
     {
      string nm = TFName(g_slotTF[s]);
      g_ltOn[s] = LoadFlag(nm + "_LT", InList(InpDefaultLT, s));
      g_srOn[s] = LoadFlag(nm + "_SR", InList(InpDefaultSR, s));
     }
   g_clock  = LoadFlag("CLOCK",  InpShowClock);
   g_arrows = LoadFlag("ARROWS", InpShowArrows);
   g_labels = LoadFlag("LABELS", InpShowLabels);
   g_min    = LoadFlag("MIN",    false);
  }

void SaveState()
  {
   for(int s = 0; s < g_nSlots; s++)
     {
      string nm = TFName(g_slotTF[s]);
      SaveFlag(nm + "_LT", g_ltOn[s]);
      SaveFlag(nm + "_SR", g_srOn[s]);
     }
   SaveFlag("CLOCK",  g_clock);
   SaveFlag("ARROWS", g_arrows);
   SaveFlag("LABELS", g_labels);
   SaveFlag("MIN",    g_min);
  }

void ApplyArrows()
  {
   for(int p = 0; p < 3; p++)
      PlotIndexSetInteger(p, PLOT_DRAW_TYPE, g_arrows ? DRAW_ARROW : DRAW_NONE);
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
   if(!InpRefineAnchors || PeriodSeconds(tf) <= PeriodSeconds(PERIOD_CURRENT)) return t;
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

   string nm  = BrkTag(g_lines[k].slot) + IntegerToString(g_brkCounter++);
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
      string tip  = (dir > 0 ? "LT Suporte " : "LT Resistência ") + TFName(g_slotTF[slot]) +
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
//| Suporte e Resistência horizontais (topos/fundos agrupados)       |
//+------------------------------------------------------------------+
void AddZone(double &zp[], int &zc[], datetime &zt[], int &nz,
             const double p, const datetime t, const double tol)
  {
   for(int z = 0; z < nz; z++)
      if(MathAbs(zp[z] - p) <= tol)
        {
         zp[z] = (zp[z] * zc[z] + p) / (zc[z] + 1);
         zc[z]++;
         if(t < zt[z]) zt[z] = t;
         return;
        }
   ArrayResize(zp, nz + 1);
   ArrayResize(zc, nz + 1);
   ArrayResize(zt, nz + 1);
   zp[nz] = p; zc[nz] = 1; zt[nz] = t;
   nz++;
  }

void DrawSRLevel(const string name, datetime t1, const double price, const color clr,
                 const int width, const ENUM_LINE_STYLE style, const string text, const string tip)
  {
   datetime t2 = iTime(_Symbol, PERIOD_CURRENT, 0);
   if(t1 >= t2) t1 = t2 - PeriodSeconds(PERIOD_CURRENT);
   CreateLine(name, t1, price, t2, price, clr, width, style, true, tip);
   if(!g_labels) return;

   string   ln = name + "_txt";
   datetime tl = t2 + (datetime)(PeriodSeconds(PERIOD_CURRENT) * InpSRLabelShift);
   if(!ObjectCreate(0, ln, OBJ_TEXT, 0, tl, price)) return;
   ObjectSetString (0, ln, OBJPROP_TEXT,       text);
   ObjectSetString (0, ln, OBJPROP_FONT,       "Segoe UI Semibold");
   ObjectSetString (0, ln, OBJPROP_TOOLTIP,    tip);
   ObjectSetInteger(0, ln, OBJPROP_FONTSIZE,   7);
   ObjectSetInteger(0, ln, OBJPROP_COLOR,      clr);
   ObjectSetInteger(0, ln, OBJPROP_ANCHOR,     ANCHOR_LEFT_LOWER);
   ObjectSetInteger(0, ln, OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, ln, OBJPROP_HIDDEN,     true);
  }

bool DrawSR(const int s)
  {
   ENUM_TIMEFRAMES tf = g_slotTF[s];
   MqlRates r[];
   ArraySetAsSeries(r, true);                        // r[0] = vela atual
   int n = CopyRates(_Symbol, tf, 0, MathMax(InpSRBars, 50), r);
   int L = MathMax(InpSRPivot, 1);
   if(n < 2 * L + 3) return false;                   // dados ainda carregando

   double rng = 0.0;
   for(int i = 0; i < n; i++) rng += r[i].high - r[i].low;
   double tol = MathMax(InpSRMerge * rng / n, _Point);

   //--- topos e fundos confirmados (L velas de cada lado), agrupados em zonas
   double   zp[];
   int      zc[];
   datetime zt[];
   int      nz = 0;
   for(int i = L + 1; i < n - L; i++)
     {
      bool ph = true, pl = true;
      for(int j = 1; j <= L && (ph || pl); j++)
        {
         if(r[i].high <= r[i - j].high || r[i].high < r[i + j].high) ph = false;
         if(r[i].low  >= r[i - j].low  || r[i].low  > r[i + j].low)  pl = false;
        }
      if(ph) AddZone(zp, zc, zt, nz, r[i].high, r[i].time, tol);
      if(pl) AddZone(zp, zc, zt, nz, r[i].low,  r[i].time, tol);
     }

   string tag = SRTag(s);
   ObjectsDeleteAll(0, tag);

   double price = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   if(price <= 0.0) price = r[0].close;

   bool   heavy = PeriodSeconds(tf) >= PeriodSeconds(PERIOD_D1);
   int    width = heavy ? 2 : 1;
   ENUM_LINE_STYLE style = heavy ? STYLE_SOLID : InpSRStyle;
   string nm    = TFName(tf);

   bool used[];
   ArrayResize(used, nz);
   if(nz > 0) ArrayInitialize(used, false);

   //--- os níveis mais próximos acima (resistência) e abaixo (suporte) do preço
   for(int side = 1; side >= -1; side -= 2)
      for(int k = 0; k < InpSRMaxEach; k++)
        {
         int    best  = -1;
         double bestD = DBL_MAX;
         for(int z = 0; z < nz; z++)
           {
            if(used[z] || zc[z] < InpSRMinTouches) continue;
            double d = (zp[z] - price) * side;
            if(d > 0.0 && d < bestD) { bestD = d; best = z; }
           }
         if(best < 0) break;
         used[best] = true;

         bool   res  = (side > 0);
         string text = (res ? "R " : "S ") + nm + (zc[best] > 1 ? " (" + IntegerToString(zc[best]) + ")" : "");
         string tip  = (res ? "Resistência " : "Suporte ") + nm + " | Toques: " + IntegerToString(zc[best]) +
                       " | " + DoubleToString(zp[best], _Digits);
         DrawSRLevel(tag + (res ? "R" : "S") + IntegerToString(k), zt[best], zp[best],
                     res ? InpResColor : InpSupColor, width, style, text, tip);
        }
   return true;
  }

// Recalcula S/R quando o TF tem vela nova, o gráfico tem vela nova ou "force"
bool UpdateSR(const bool force)
  {
   datetime cb       = iTime(_Symbol, PERIOD_CURRENT, 0);
   bool     chartNew = (cb != g_srChartBar);
   bool     any      = false;
   for(int s = 0; s < g_nSlots; s++)
     {
      if(!g_srOn[s]) continue;
      datetime tb = iTime(_Symbol, g_slotTF[s], 0);
      if(tb == 0) continue;                          // dados ainda carregando
      if(!force && !chartNew && tb == g_srLast[s]) continue;
      if(DrawSR(s)) { g_srLast[s] = tb; any = true; }
     }
   g_srChartBar = cb;
   return any;
  }

//+------------------------------------------------------------------+
//| Sinais                                                           |
//| retorno: 0 = nada | 1 = bounce | 2 = rompimento                  |
//+------------------------------------------------------------------+
int CheckBar(const TLine &L, const int i, const datetime &t[], const double &hi[],
             const double &lo[], const double &cl[], const double tol, double &v)
  {
   if(i < 1 || L.broken || !g_slotSig[L.slot]) return 0;
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
//| Núcleo do cálculo (usado pelo OnCalculate e pelos botões)        |
//+------------------------------------------------------------------+
void FullReset()
  {
   ArrayInitialize(BuyBuf,   EMPTY_VALUE);
   ArrayInitialize(SellBuf,  EMPTY_VALUE);
   ArrayInitialize(BreakBuf, EMPTY_VALUE);
   ArrayResize(g_lines,      0);
   ArrayResize(g_brokenKeys, 0);
   ArrayResize(g_brokenObjs, 0);
   ObjectsDeleteAll(0, PREFIX + "BRK_");
   for(int s = 0; s < g_nSlots; s++)
     {
      g_slotLast[s] = 0;
      ObjectsDeleteAll(0, g_slotTag[s]);
     }
  }

bool Compute(const int total, const datetime &t[], const double &hi[],
             const double &lo[], const double &cl[], const bool full)
  {
   if(full)
     {
      FullReset();
      g_lastBarTime = t[total - 1];
     }

   // tolerância no gráfico atual = fração do range médio das últimas 14 velas fechadas
   double rng = 0.0;
   for(int i = total - 15; i <= total - 2; i++) rng += hi[i] - lo[i];
   double tol = InpTouchTol * rng / 14.0;

   // 1) Nova vela: avalia a vela que fechou contra as linhas atuais (sinal + alerta)
   if(!full && t[total - 1] != g_lastBarTime)
     {
      g_lastBarTime = t[total - 1];
      EvaluateLive(total - 2, t, hi, lo, cl, tol);
     }

   // 2) Reconstrói as linhas de cada tempo gráfico ligado quando ele tem uma vela nova
   bool redraw = full;
   for(int s = 0; s < g_nSlots; s++)
     {
      if(!g_ltOn[s]) continue;
      datetime last = iTime(_Symbol, g_slotTF[s], 1);
      if(last == 0 || last == g_slotLast[s]) continue;   // sem dados ainda ou nada novo
      if(RebuildSlot(s))
        {
         g_slotLast[s] = last;
         ScanSlot(s, total, t, hi, lo, cl, tol);
         redraw = true;
        }
     }

   // 3) Suporte e resistência horizontais
   if(UpdateSR(false)) redraw = true;
   return redraw;
  }

// Recalcula tudo fora do OnCalculate (após clique no painel)
void RecalcNow()
  {
   if(g_ratesTotal < 50) return;
   MqlRates r[];
   int n = CopyRates(_Symbol, PERIOD_CURRENT, 0, g_ratesTotal, r);
   if(n != g_ratesTotal) return;                     // histórico mudou: o próximo tick recalcula
   datetime t[];
   double   hi[], lo[], cl[];
   ArrayResize(t, n); ArrayResize(hi, n); ArrayResize(lo, n); ArrayResize(cl, n);
   for(int i = 0; i < n; i++)
     {
      t[i] = r[i].time; hi[i] = r[i].high; lo[i] = r[i].low; cl[i] = r[i].close;
     }
   Compute(n, t, hi, lo, cl, true);
  }

//+------------------------------------------------------------------+
//| Relógio regressivo do candle                                     |
//+------------------------------------------------------------------+
datetime NextBarTime(const datetime t0)
  {
   if(Period() == PERIOD_MN1)
     {
      MqlDateTime d;
      TimeToStruct(t0, d);
      d.mon++;
      if(d.mon > 12) { d.mon = 1; d.year++; }
      d.day = 1; d.hour = 0; d.min = 0; d.sec = 0;
      return StructToTime(d);
     }
   return t0 + PeriodSeconds(PERIOD_CURRENT);
  }

string FormatSecs(long s)
  {
   if(s < 0) s = 0;
   int d = (int)(s / 86400), h = (int)((s % 86400) / 3600), m = (int)((s % 3600) / 60), sec = (int)(s % 60);
   if(d > 0) return StringFormat("%dd %02d:%02d:%02d", d, h, m, sec);
   if(h > 0) return StringFormat("%02d:%02d:%02d", h, m, sec);
   return StringFormat("%02d:%02d", m, sec);
  }

void UpdateClock()
  {
   datetime t0   = iTime(_Symbol, PERIOD_CURRENT, 0);
   string   txt  = "--:--";
   double   prog = 0.0;
   color    clr  = InpAccent;
   if(t0 > 0)
     {
      datetime tn    = NextBarTime(t0);
      long     total = (long)(tn - t0);
      long     rem   = (long)(tn - TimeTradeServer());
      if(rem > total) rem = total;
      if(rem >= 0 && total > 0)
        {
         txt  = FormatSecs(rem);
         prog = 1.0 - (double)rem / (double)total;
         if(rem <= total / 10)     clr = C_DANGER;
         else if(rem <= total / 4) clr = C_WARN;
        }
      else if(rem > -300)
        {
         txt = "00:00";                              // aguardando o 1º tick da nova vela
         prog = 1.0;
         clr  = C_DANGER;
        }
     }

   //--- painel
   if(ObjectFind(0, PNL + "clk_val") >= 0)
     {
      ObjectSetString (0, PNL + "clk_val", OBJPROP_TEXT,  txt);
      ObjectSetInteger(0, PNL + "clk_val", OBJPROP_COLOR, clr == InpAccent ? C_TEXT : clr);
      int w = (int)MathRound((PANEL_W - 40) * prog);
      ObjectSetInteger(0, PNL + "clk_fill", OBJPROP_XSIZE,   MathMax(w, 1));
      ObjectSetInteger(0, PNL + "clk_fill", OBJPROP_BGCOLOR, clr);
      ObjectSetInteger(0, PNL + "clk_fill", OBJPROP_COLOR,   clr);
     }
   if(ObjectFind(0, PNL + "hclock") >= 0)
     {
      ObjectSetString (0, PNL + "hclock", OBJPROP_TEXT,  txt);
      ObjectSetInteger(0, PNL + "hclock", OBJPROP_COLOR, clr == InpAccent ? C_TEXT : clr);
     }

   //--- etiqueta ao lado do preço, à direita da vela atual
   int    x = 0, y = 0;
   double bid = SymbolInfoDouble(_Symbol, SYMBOL_BID);
   bool   vis = g_clock && t0 > 0 && bid > 0.0 && ChartTimePriceToXY(0, 0, t0, bid, x, y);
   if(vis)
     {
      long cw = ChartGetInteger(0, CHART_WIDTH_IN_PIXELS, 0);
      long ch = ChartGetInteger(0, CHART_HEIGHT_IN_PIXELS, 0);
      int  bar = 1 << (int)ChartGetInteger(0, CHART_SCALE);
      x += bar / 2 + 10;
      if(x < 0 || x > cw || y < 0 || y > ch) vis = false;
     }
   if(!vis)
     {
      ObjectDelete(0, CLK + "bg");
      ObjectDelete(0, CLK + "txt");
      return;
     }
   int w = StringLen(txt) * 7 + 18, h = 18;
   PRect(CLK + "bg", x, y - h / 2, w, h, clr, clr);
   PLabel(CLK + "txt", x + w / 2, y, txt, clrWhite, 9, "Consolas", ANCHOR_CENTER);
  }

//+------------------------------------------------------------------+
//| Painel                                                           |
//+------------------------------------------------------------------+
void PRect(const string name, const int x, const int y, const int w, const int h,
           const color bg, const color border)
  {
   if(ObjectFind(0, name) < 0) ObjectCreate(0, name, OBJ_RECTANGLE_LABEL, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_CORNER,      CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE,   x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE,   y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE,       w);
   ObjectSetInteger(0, name, OBJPROP_YSIZE,       h);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR,     bg);
   ObjectSetInteger(0, name, OBJPROP_BORDER_TYPE, BORDER_FLAT);
   ObjectSetInteger(0, name, OBJPROP_COLOR,       border);
   ObjectSetInteger(0, name, OBJPROP_WIDTH,       1);
   ObjectSetInteger(0, name, OBJPROP_BACK,        false);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE,  false);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN,      true);
   ObjectSetInteger(0, name, OBJPROP_ZORDER,      0);
  }

void PLabel(const string name, const int x, const int y, const string text, const color clr,
            const int size, const string font, const ENUM_ANCHOR_POINT anchor = ANCHOR_LEFT_UPPER)
  {
   if(ObjectFind(0, name) < 0) ObjectCreate(0, name, OBJ_LABEL, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_CORNER,     CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE,  x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE,  y);
   ObjectSetInteger(0, name, OBJPROP_ANCHOR,     anchor);
   ObjectSetString (0, name, OBJPROP_TEXT,       text);
   ObjectSetString (0, name, OBJPROP_FONT,       font);
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE,   size);
   ObjectSetInteger(0, name, OBJPROP_COLOR,      clr);
   ObjectSetInteger(0, name, OBJPROP_BACK,       false);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE, false);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN,     true);
   ObjectSetInteger(0, name, OBJPROP_ZORDER,     1);
  }

void PButton(const string name, const int x, const int y, const int w, const int h, const string text)
  {
   if(ObjectFind(0, name) < 0) ObjectCreate(0, name, OBJ_BUTTON, 0, 0, 0);
   ObjectSetInteger(0, name, OBJPROP_CORNER,       CORNER_LEFT_UPPER);
   ObjectSetInteger(0, name, OBJPROP_XDISTANCE,    x);
   ObjectSetInteger(0, name, OBJPROP_YDISTANCE,    y);
   ObjectSetInteger(0, name, OBJPROP_XSIZE,        w);
   ObjectSetInteger(0, name, OBJPROP_YSIZE,        h);
   ObjectSetString (0, name, OBJPROP_TEXT,         text);
   ObjectSetString (0, name, OBJPROP_FONT,         "Segoe UI Semibold");
   ObjectSetInteger(0, name, OBJPROP_FONTSIZE,     7);
   ObjectSetInteger(0, name, OBJPROP_COLOR,        C_TEXT);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR,      C_OFF);
   ObjectSetInteger(0, name, OBJPROP_BORDER_COLOR, C_BORDER);
   ObjectSetInteger(0, name, OBJPROP_STATE,        false);
   ObjectSetInteger(0, name, OBJPROP_BACK,         false);
   ObjectSetInteger(0, name, OBJPROP_SELECTABLE,   false);
   ObjectSetInteger(0, name, OBJPROP_HIDDEN,       true);
   ObjectSetInteger(0, name, OBJPROP_ZORDER,       10);
  }

// Botão estilo "pílula": aceso com a cor de destaque, apagado em cinza
void StyleToggle(const string name, const bool on, const color onClr, const string txtOn, const string txtOff)
  {
   if(ObjectFind(0, name) < 0) return;
   ObjectSetString (0, name, OBJPROP_TEXT,         on ? txtOn : txtOff);
   ObjectSetInteger(0, name, OBJPROP_BGCOLOR,      on ? onClr : C_OFF);
   ObjectSetInteger(0, name, OBJPROP_BORDER_COLOR, on ? onClr : C_BORDER);
   ObjectSetInteger(0, name, OBJPROP_COLOR,        on ? C_DARK : C_MUTED);
   ObjectSetInteger(0, name, OBJPROP_STATE,        false);
  }

void UpdatePanel()
  {
   for(int s = 0; s < g_nSlots; s++)
     {
      string i = IntegerToString(s);
      StyleToggle(PNL + "lt_" + i, g_ltOn[s], InpAccent, "ON", "OFF");
      StyleToggle(PNL + "sr_" + i, g_srOn[s], C_SRON,    "ON", "OFF");
      if(ObjectFind(0, PNL + "dot" + i) >= 0)
        {
         color c = g_ltOn[s] ? InpAccent : (g_srOn[s] ? C_SRON : C_BORDER);
         ObjectSetInteger(0, PNL + "dot" + i, OBJPROP_BGCOLOR, c);
         ObjectSetInteger(0, PNL + "dot" + i, OBJPROP_COLOR,   c);
        }
     }
   StyleToggle(PNL + "clock",  g_clock,  InpAccent, "RELÓGIO", "RELÓGIO");
   StyleToggle(PNL + "arrows", g_arrows, InpAccent, "SETAS",   "SETAS");
   StyleToggle(PNL + "labels", g_labels, InpAccent, "RÓTULOS", "RÓTULOS");
   if(ObjectFind(0, PNL + "btn_min") >= 0)
      ObjectSetInteger(0, PNL + "btn_min", OBJPROP_STATE, false);
  }

void BuildPanel()
  {
   ObjectsDeleteAll(0, PNL);
   int X = InpPanelX, Y = InpPanelY, W = PANEL_W;

   //--- cabeçalho
   PRect (PNL + "hdr",    X, Y, W, HDR_H, C_CARD, C_BORDER);
   PRect (PNL + "hdrAcc", X, Y, 3, HDR_H, InpAccent, InpAccent);
   PLabel(PNL + "title",  X + 14, Y + 5,  "TRENDLINE CHEATCODE", C_TEXT, 9, "Segoe UI Semibold");
   PLabel(PNL + "sub",    X + 14, Y + 20, _Symbol + "  ·  " + TFName(PERIOD_CURRENT) + "  ·  MTF + S/R",
          C_MUTED, 7, "Segoe UI");
   PButton(PNL + "btn_min", X + W - 30, Y + 8, 22, 20, g_min ? "+" : "—");

   if(g_min)
     {
      PLabel(PNL + "hclock", X + W - 38, Y + 10, "--:--", C_TEXT, 10, "Consolas", ANCHOR_RIGHT_UPPER);
      UpdatePanel();
      UpdateClock();
      return;
     }

   //--- corpo (altura ajustada no fim)
   int top = Y + HDR_H;
   PRect(PNL + "body", X, top, W, 10, C_BG, C_BORDER);
   int y = top + 10;

   //--- cartão do relógio
   PRect (PNL + "card",     X + 10, y, W - 20, 60, C_CARD, C_BORDER);
   PLabel(PNL + "clk_cap",  X + 20, y + 8, "FECHAMENTO DO CANDLE", C_MUTED, 7, "Segoe UI Semibold");
   PLabel(PNL + "clk_tf",   X + W - 20, y + 8, TFName(PERIOD_CURRENT), InpAccent, 7, "Segoe UI Semibold", ANCHOR_RIGHT_UPPER);
   PLabel(PNL + "clk_val",  X + 20, y + 20, "--:--", C_TEXT, 16, "Consolas");
   PRect (PNL + "clk_bar",  X + 20, y + 48, W - 40, 4, C_OFF, C_OFF);
   PRect (PNL + "clk_fill", X + 20, y + 48, 1, 4, InpAccent, InpAccent);
   y += 60 + 12;

   //--- cabeçalho das colunas
   int c1 = X + W - 128, c2 = X + W - 68, bw = 54;
   PLabel(PNL + "col_tf", X + 20,      y, "TEMPO GRÁFICO",     C_MUTED, 7, "Segoe UI Semibold");
   PLabel(PNL + "col_lt", c1 + bw / 2, y, "LT",                C_MUTED, 7, "Segoe UI Semibold", ANCHOR_UPPER);
   PLabel(PNL + "col_sr", c2 + bw / 2, y, "S/R",               C_MUTED, 7, "Segoe UI Semibold", ANCHOR_UPPER);
   y += 16;

   //--- uma linha por tempo gráfico
   for(int s = 0; s < g_nSlots; s++)
     {
      string i  = IntegerToString(s);
      int    ry = y + s * ROW_H;
      if(s % 2 == 0) PRect(PNL + "row" + i, X + 10, ry, W - 20, ROW_H - 2, C_ROWALT, C_ROWALT);
      PRect (PNL + "dot" + i,  X + 16, ry + 6, 3, 12, C_BORDER, C_BORDER);
      PLabel(PNL + "tf" + i,   X + 26, ry + 4, TFName(g_slotTF[s]), C_TEXT, 9, "Segoe UI Semibold");
      PLabel(PNL + "desc" + i, X + 62, ry + 7,
             g_slotIsChart[s] ? "gráfico atual" : TFDesc(g_slotTF[s]),
             g_slotIsChart[s] ? InpAccent : C_MUTED, 7, "Segoe UI");
      PButton(PNL + "lt_" + i, c1, ry + 3, bw, 18, "");
      PButton(PNL + "sr_" + i, c2, ry + 3, bw, 18, "");
     }
   y += g_nSlots * ROW_H + 6;

   //--- rodapé
   PRect(PNL + "div", X + 10, y, W - 20, 1, C_BORDER, C_BORDER);
   y += 9;
   int b2 = (W - 26) / 2;
   PButton(PNL + "all_lt", X + 10,      y, b2, 22, "LIGAR/DESLIGAR LT");
   PButton(PNL + "all_sr", X + 16 + b2, y, b2, 22, "LIGAR/DESLIGAR S/R");
   y += 28;
   int b3 = (W - 32) / 3;
   PButton(PNL + "clock",  X + 10,          y, b3, 22, "");
   PButton(PNL + "arrows", X + 16 + b3,     y, b3, 22, "");
   PButton(PNL + "labels", X + 22 + 2 * b3, y, b3, 22, "");
   y += 22 + 10;

   ObjectSetInteger(0, PNL + "body", OBJPROP_YSIZE, y - top);
   UpdatePanel();
   UpdateClock();
  }

void SetLT(const int s, const bool on)
  {
   g_ltOn[s]     = on;
   g_slotLast[s] = 0;
   if(!on)
     {
      RemoveSlotLines(s);
      ObjectsDeleteAll(0, BrkTag(s));
     }
  }

void SetSR(const int s, const bool on)
  {
   g_srOn[s]   = on;
   g_srLast[s] = 0;
   ObjectsDeleteAll(0, SRTag(s));
   if(on) DrawSR(s);
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
     }

   // Slots: MN, W1, D1, H4, H1, M30, M15 (+ gráfico atual se não estiver na lista)
   BuildSlots();
   LoadState();
   ApplyArrows();

   if(InpChartShift) ChartSetInteger(0, CHART_SHIFT, true);

   IndicatorSetString(INDICATOR_SHORTNAME, "TrendLine_CheatCode");
   IndicatorSetInteger(INDICATOR_DIGITS, _Digits);

   BuildPanel();
   EventSetTimer(1);
   return INIT_SUCCEEDED;
  }

void OnDeinit(const int reason)
  {
   EventKillTimer();
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
   g_ratesTotal = rates_total;

   bool full = (prev_calculated <= 0);
   if(!full)
     {
      for(int i = prev_calculated; i < rates_total; i++)
        {
         BuyBuf[i]   = EMPTY_VALUE;
         SellBuf[i]  = EMPTY_VALUE;
         BreakBuf[i] = EMPTY_VALUE;
        }
     }

   bool redraw = Compute(rates_total, time, high, low, close, full);
   UpdateClock();
   if(redraw) ChartRedraw();

   return rates_total;
  }

//+------------------------------------------------------------------+
//| Timer: relógio a cada segundo (mesmo sem ticks)                  |
//+------------------------------------------------------------------+
void OnTimer()
  {
   static int ticks = 0;
   UpdateClock();
   if(++ticks >= 5)                                  // tenta de novo TFs cujos dados ainda carregavam
     {
      ticks = 0;
      UpdateSR(false);
     }
   ChartRedraw();
  }

//+------------------------------------------------------------------+
//| Cliques no painel                                                |
//+------------------------------------------------------------------+
void OnChartEvent(const int id, const long &lparam, const double &dparam, const string &sparam)
  {
   if(id == CHARTEVENT_CHART_CHANGE)
     {
      UpdateClock();
      ChartRedraw();
      return;
     }
   if(id != CHARTEVENT_OBJECT_CLICK || StringFind(sparam, PNL) != 0) return;

   string key = StringSubstr(sparam, StringLen(PNL));
   if(ObjectGetInteger(0, sparam, OBJPROP_TYPE) == OBJ_BUTTON)
      ObjectSetInteger(0, sparam, OBJPROP_STATE, false);

   if(key == "btn_min")
     {
      g_min = !g_min;
      BuildPanel();
     }
   else if(StringFind(key, "lt_") == 0)
     {
      int s = (int)StringToInteger(StringSubstr(key, 3));
      if(s < 0 || s >= g_nSlots) return;
      SetLT(s, !g_ltOn[s]);
      RecalcNow();
     }
   else if(StringFind(key, "sr_") == 0)
     {
      int s = (int)StringToInteger(StringSubstr(key, 3));
      if(s < 0 || s >= g_nSlots) return;
      SetSR(s, !g_srOn[s]);
     }
   else if(key == "all_lt")
     {
      bool any = false;
      for(int s = 0; s < g_nSlots; s++) any = any || g_ltOn[s];
      for(int s = 0; s < g_nSlots; s++) SetLT(s, !any);
      RecalcNow();
     }
   else if(key == "all_sr")
     {
      bool any = false;
      for(int s = 0; s < g_nSlots; s++) any = any || g_srOn[s];
      for(int s = 0; s < g_nSlots; s++) SetSR(s, !any);
     }
   else if(key == "clock")
     {
      g_clock = !g_clock;
     }
   else if(key == "arrows")
     {
      g_arrows = !g_arrows;
      ApplyArrows();
     }
   else if(key == "labels")
     {
      g_labels = !g_labels;
      UpdateSR(true);
     }
   else return;

   SaveState();
   UpdatePanel();
   UpdateClock();
   ChartRedraw();
  }
//+------------------------------------------------------------------+
