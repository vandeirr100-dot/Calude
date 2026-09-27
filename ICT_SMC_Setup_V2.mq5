//+------------------------------------------------------------------+
//|                                                ICT_SMC_Setup.mq5 |
//|  Painel BIAS HTF (tempo real), Swing High/Low HTF, BMS / MSS,    |
//|  Order Blocks, IFVG, IOFED, Relative Equal Highs/Lows, SMT e     |
//|  Setup com Entrada / Stop / Alvo - sinal no momento do rompimento|
//+------------------------------------------------------------------+
#property copyright   "ICT SMC Setup"
#property version     "1.20"
#property description "Bias HTF, Swings HTF, BMS/MSS, OB, IFVG, IOFED, EQH/EQL, SMT e setup Entrada/SL/TP em tempo real"
#property indicator_chart_window
#property indicator_buffers 0
#property indicator_plots   0

#define PFX "ICTSMC_"

enum ENUM_TP_MODE
  {
   TP_MODE_RR  = 0,   // Risco:Retorno fixo
   TP_MODE_HTF = 1    // Liquidez HTF (Swing High/Low do HTF)
  };

//==================================================================== INPUTS
input group "=== Geral ==="
input ENUM_TIMEFRAMES InpHTF         = PERIOD_H1;  // Timeframe maior (Bias / Swings)
input int             InpLookback    = 300;        // Barras analisadas
input int             InpSwingLen    = 3;          // Forca do swing (barras de cada lado)
input int             InpHTFSwingLen = 2;          // Forca do swing no HTF
input int             InpExtendBars  = 25;         // Extensao a direita (barras)
input int             InpMaxEvents   = 4;          // Max. de BMS/MSS desenhados
input color           InpTextColor   = clrNONE;    // Cor dos textos (clrNONE = automatica)
input int             InpFontSize    = 8;          // Tamanho da fonte

input group "=== Tempo real ==="
input bool InpBreakOnClose = false;                // Rompimento so no fechamento da vela (false = no momento)
input int  InpRefreshMs    = 250;                  // Intervalo minimo entre atualizacoes (ms)

input group "=== Painel BIAS HTF ==="
input bool  InpShowPanel    = true;                // Mostrar painel
input bool  InpBiasLive     = false;               // Bias pela vela HTF em formacao
input int   InpPanelX       = 10;                  // Posicao X
input int   InpPanelY       = 30;                  // Posicao Y
input int   InpPanelW       = 260;                 // Largura
input int   InpPanelH       = 290;                 // Altura
input int   InpPanelCandles = 4;                   // Candles HTF no painel (o ultimo e o atual)
input color InpPanelBg      = C'236,237,241';      // Fundo do painel
input color InpBullColor    = C'76,175,80';        // Candle de alta
input color InpBearColor    = clrBlack;            // Candle de baixa

input group "=== Estrutura / Zonas ==="
input bool   InpShowStructure = true;              // Mostrar BMS / MSS
input bool   InpShowOB        = true;              // Mostrar Order Blocks
input bool   InpShowIFVG      = true;              // Mostrar IFVG
input int    InpMaxIFVG       = 2;                 // Max. de IFVG
input bool   InpShowFVG       = false;             // Mostrar FVG abertos
input bool   InpShowIOFED     = true;              // Mostrar IOFED
input bool   InpShowEQ        = true;              // Mostrar Relative Equal Highs/Lows
input double InpEQTolATR      = 0.15;              // Tolerancia topos/fundos iguais (x ATR)
input double InpFVGMinATR     = 0.10;              // Tamanho minimo do FVG (x ATR)
input color  InpSwingHTFColor = C'229,57,53';      // Linhas Swing HTF
input color  InpOBBullColor   = C'255,204,188';    // OB (zona)
input color  InpOBLineColor   = C'229,57,53';      // OB oposto (Close)
input color  InpIFVGBullColor = C'197,213,245';    // IFVG altista
input color  InpIFVGBearColor = C'255,224,178';    // IFVG baixista

input group "=== SMT ==="
input bool   InpShowSMT    = true;                 // Mostrar SMT
input string InpSMTSymbol  = "EURUSD";             // Ativo correlacionado (ex: EURUSD, DXY)
input bool   InpSMTInverse = false;                // Correlacao inversa (true para DXY)

input group "=== Setup / Trade ==="
input bool         InpShowSetup     = true;             // Mostrar setup
input bool         InpRequireBias   = true;             // Exigir alinhamento com o Bias HTF
input bool         InpCounterMSS    = true;             // Permitir setup contra o Bias apos MSS no TF atual
input double       InpEntryLevel    = 0.5;              // Nivel fib da entrada (0.5 = equilibrio)
input double       InpSLBufferATR   = 0.10;             // Folga do stop alem da zona (x ATR)
input ENUM_TP_MODE InpTPMode        = TP_MODE_RR;       // Modo do alvo
input double       InpRR            = 5.0;              // Risco:Retorno
input int          InpMaxSetupAge   = 60;               // Idade maxima do setup (barras)
input color        InpTPColor       = C'128,203,196';   // Zona do alvo
input color        InpSLColor       = C'239,154,154';   // Zona do stop
input color        InpEntryArrowCol = C'33,150,243';    // Seta de entrada
input bool         InpAlerts        = true;             // Alertas (setup formado e entrada)
input bool         InpPush          = false;            // Notificacao push no celular

//==================================================================== TIPOS / GLOBAIS
struct SSwing { int bar; double price; bool hi; };
struct SEvent { int type; int dir; int fromBar; int toBar; double price; int ob; double obTop; double obBot; double legLo; double legHi; };
struct SFvg   { int bar; double top; double bot; int dir; int invBar; int fillBar; };

SSwing   g_sw[];
SEvent   g_ev[];
SFvg     g_fv[];
datetime g_t[];
double   g_o[], g_h[], g_l[], g_c[];
int      g_n = 0, g_last = 0, g_scanEnd = 0, g_start = 0, g_id = 0, g_prevCount = 0;
double   g_atr = 0;
color    g_tc  = clrBlack;
int      g_bias = 0;
double   g_htfSH = 0, g_htfSL = 0;
int      g_htfSHbar = -1, g_htfSLbar = -1;
datetime g_alertSetup = 0, g_alertFill = 0;
int      g_setupEv = -1;                                  // evento que gera o setup ativo
bool     g_setupCounter = false;                          // setup contra o Bias HTF (confirmado por MSS)

//==================================================================== UTEIS
int      IMax(int a,int b) { return a>b?a:b; }
int      IMin(int a,int b) { return a<b?a:b; }
string   NM() { g_id++; return PFX+IntegerToString(g_id); }
string   PS(double p) { return DoubleToString(p,_Digits); }

datetime FT(int bar)
  {
   if(bar<0) bar=0;
   if(bar<g_n) return g_t[bar];
   return g_t[g_n-1]+(datetime)((bar-(g_n-1))*PeriodSeconds());
  }

string TFName(ENUM_TIMEFRAMES tf)
  {
   int m=PeriodSeconds(tf)/60;
   if(m<60)    return IntegerToString(m)+"M";
   if(m<1440)  return IntegerToString(m/60)+"H";
   if(m<10080) return IntegerToString(m/1440)+"D";
   if(m<43200) return "W";
   return "MN";
  }

color Contrast(color bg)
  {
   int c=(int)bg;
   int r=c&0xFF, g=(c>>8)&0xFF, b=(c>>16)&0xFF;
   return ((r*299+g*587+b*114)/1000>128) ? clrBlack : clrWhite;
  }

color TextColor()
  {
   if(InpTextColor!=clrNONE) return InpTextColor;
   return Contrast((color)ChartGetInteger(0,CHART_COLOR_BACKGROUND));
  }

void Notify(string msg)
  {
   if(!InpAlerts) return;
   Alert(msg);
   if(InpPush) SendNotification(msg);
  }

//--- reaproveita objetos (sem piscar a cada tick)
string Obj(ENUM_OBJECT type,datetime t=0,double p=0)
  {
   string n=NM();
   if(ObjectFind(0,n)>=0 && (ENUM_OBJECT)ObjectGetInteger(0,n,OBJPROP_TYPE)!=type) ObjectDelete(0,n);
   if(ObjectFind(0,n)<0) ObjectCreate(0,n,type,0,t,p);
   ObjectSetInteger(0,n,OBJPROP_SELECTABLE,false);
   ObjectSetInteger(0,n,OBJPROP_HIDDEN,true);
   return n;
  }

void Pt(string n,int i,datetime t,double p)
  {
   ObjectSetInteger(0,n,OBJPROP_TIME,i,t);
   ObjectSetDouble(0,n,OBJPROP_PRICE,i,p);
  }

void Seg(datetime t1,double p1,datetime t2,double p2,color c,ENUM_LINE_STYLE st=STYLE_SOLID,int w=1)
  {
   string n=Obj(OBJ_TREND,t1,p1);
   Pt(n,0,t1,p1); Pt(n,1,t2,p2);
   ObjectSetInteger(0,n,OBJPROP_COLOR,c);
   ObjectSetInteger(0,n,OBJPROP_STYLE,st);
   ObjectSetInteger(0,n,OBJPROP_WIDTH,w);
   ObjectSetInteger(0,n,OBJPROP_RAY_RIGHT,false);
   ObjectSetInteger(0,n,OBJPROP_RAY_LEFT,false);
   ObjectSetInteger(0,n,OBJPROP_BACK,false);
  }

void Rect(datetime t1,double p1,datetime t2,double p2,color c,bool fill=true,ENUM_LINE_STYLE st=STYLE_SOLID)
  {
   string n=Obj(OBJ_RECTANGLE,t1,p1);
   Pt(n,0,t1,p1); Pt(n,1,t2,p2);
   ObjectSetInteger(0,n,OBJPROP_COLOR,c);
   ObjectSetInteger(0,n,OBJPROP_FILL,fill);
   ObjectSetInteger(0,n,OBJPROP_STYLE,st);
   ObjectSetInteger(0,n,OBJPROP_WIDTH,1);
   ObjectSetInteger(0,n,OBJPROP_BACK,fill);
  }

void Txt(datetime t,double p,string s,color c,ENUM_ANCHOR_POINT a,int sz=0,string font="Arial")
  {
   string n=Obj(OBJ_TEXT,t,p);
   Pt(n,0,t,p);
   ObjectSetString(0,n,OBJPROP_TEXT,s);
   ObjectSetString(0,n,OBJPROP_FONT,font);
   ObjectSetInteger(0,n,OBJPROP_FONTSIZE,sz>0?sz:InpFontSize);
   ObjectSetInteger(0,n,OBJPROP_COLOR,c);
   ObjectSetInteger(0,n,OBJPROP_ANCHOR,a);
  }

void Tag(datetime t,double p,color c)
  {
   string n=Obj(OBJ_ARROW_RIGHT_PRICE,t,p);
   Pt(n,0,t,p);
   ObjectSetInteger(0,n,OBJPROP_COLOR,c);
   ObjectSetInteger(0,n,OBJPROP_WIDTH,2);
  }

void Arw(datetime t,double p,int code,color c,ENUM_ARROW_ANCHOR a)
  {
   string n=Obj(OBJ_ARROW,t,p);
   Pt(n,0,t,p);
   ObjectSetInteger(0,n,OBJPROP_ARROWCODE,code);
   ObjectSetInteger(0,n,OBJPROP_COLOR,c);
   ObjectSetInteger(0,n,OBJPROP_WIDTH,3);
   ObjectSetInteger(0,n,OBJPROP_ANCHOR,a);
  }

void RL(int x,int y,int w,int h,color bg,color br)
  {
   string n=Obj(OBJ_RECTANGLE_LABEL);
   ObjectSetInteger(0,n,OBJPROP_CORNER,CORNER_LEFT_UPPER);
   ObjectSetInteger(0,n,OBJPROP_XDISTANCE,x);
   ObjectSetInteger(0,n,OBJPROP_YDISTANCE,y);
   ObjectSetInteger(0,n,OBJPROP_XSIZE,IMax(1,w));
   ObjectSetInteger(0,n,OBJPROP_YSIZE,IMax(1,h));
   ObjectSetInteger(0,n,OBJPROP_BGCOLOR,bg);
   ObjectSetInteger(0,n,OBJPROP_BORDER_TYPE,BORDER_FLAT);
   ObjectSetInteger(0,n,OBJPROP_COLOR,br);
   ObjectSetInteger(0,n,OBJPROP_WIDTH,1);
   ObjectSetInteger(0,n,OBJPROP_BACK,false);
  }

void LB(int x,int y,string s,color c,int sz,string font="Arial",ENUM_ANCHOR_POINT a=ANCHOR_LEFT_UPPER)
  {
   string n=Obj(OBJ_LABEL);
   ObjectSetInteger(0,n,OBJPROP_CORNER,CORNER_LEFT_UPPER);
   ObjectSetInteger(0,n,OBJPROP_XDISTANCE,x);
   ObjectSetInteger(0,n,OBJPROP_YDISTANCE,y);
   ObjectSetString(0,n,OBJPROP_TEXT,s);
   ObjectSetString(0,n,OBJPROP_FONT,font);
   ObjectSetInteger(0,n,OBJPROP_FONTSIZE,sz);
   ObjectSetInteger(0,n,OBJPROP_COLOR,c);
   ObjectSetInteger(0,n,OBJPROP_ANCHOR,a);
   ObjectSetInteger(0,n,OBJPROP_BACK,false);
  }

int PY(double p,double hi,double lo,int yT,int yB)
  {
   if(hi<=lo) return yT;
   return yT+(int)MathRound((hi-p)/(hi-lo)*(yB-yT));
  }

//==================================================================== CICLO DE VIDA
int OnInit()
  {
   IndicatorSetString(INDICATOR_SHORTNAME,"ICT SMC Setup");
   if(InpShowSMT && InpSMTSymbol!="") SymbolSelect(InpSMTSymbol,true);
   g_prevCount=0;
   return(INIT_SUCCEEDED);
  }

void OnDeinit(const int reason)
  {
   ObjectsDeleteAll(0,PFX);
   ChartRedraw();
  }

int OnCalculate(const int rates_total,const int prev_calculated,
                const datetime &time[],const double &open[],const double &high[],
                const double &low[],const double &close[],const long &tick_volume[],
                const long &volume[],const int &spread[])
  {
   if(rates_total<50) return 0;
   ArraySetAsSeries(time,false);
   ArraySetAsSeries(open,false);
   ArraySetAsSeries(high,false);
   ArraySetAsSeries(low,false);
   ArraySetAsSeries(close,false);

   //--- atualiza a cada tick (com limite de frequencia) e sempre em nova barra
   static datetime lastBar=0;
   static uint     lastRun=0;
   bool newBar=(time[rates_total-1]!=lastBar);
   uint now=GetTickCount();
   if(prev_calculated>0 && !newBar && (now-lastRun)<(uint)InpRefreshMs) return rates_total;
   lastRun=now;

   int cnt=MathMin(rates_total,InpLookback+100);
   int from=rates_total-cnt;
   ArrayResize(g_t,cnt); ArrayResize(g_o,cnt); ArrayResize(g_h,cnt); ArrayResize(g_l,cnt); ArrayResize(g_c,cnt);
   ArrayCopy(g_t,time ,0,from,cnt);
   ArrayCopy(g_o,open ,0,from,cnt);
   ArrayCopy(g_h,high ,0,from,cnt);
   ArrayCopy(g_l,low  ,0,from,cnt);
   ArrayCopy(g_c,close,0,from,cnt);
   g_n=cnt;

   if(Analyze()) lastBar=time[rates_total-1];
   return rates_total;
  }

//==================================================================== ANALISE PRINCIPAL
bool Analyze()
  {
   g_id=0;
   g_tc=TextColor();
   g_last=g_n-1;                                          // inclui a vela em formacao
   g_scanEnd=InpBreakOnClose ? g_n-2 : g_n-1;             // estrutura: ao vivo ou so fechadas
   g_start=IMax(5,g_n-InpLookback);

   double s=0; int c=0;
   for(int i=g_n-2;i>g_n-102 && i>0;i--) { s+=g_h[i]-g_l[i]; c++; }
   g_atr=(c>0)?s/c:_Point*10;
   if(g_atr<=0) g_atr=_Point*10;

   ScanStructure();
   bool ok=ComputeHTF();
   g_setupEv=SelectSetup();

   if(InpShowPanel)                  DrawPanel();
   DrawHTFSwings();
   if(InpShowStructure || InpShowOB) DrawEvents();
   if(InpShowIFVG || InpShowFVG)     DrawFVGs();
   if(InpShowEQ)                     DrawEQ();
   if(InpShowSMT)                    DrawSMT();
   if(InpShowSetup)                  DrawSetup();

   //--- remove objetos que sobraram da atualizacao anterior
   for(int i=g_id+1;i<=g_prevCount;i++) ObjectDelete(0,PFX+IntegerToString(i));
   g_prevCount=g_id;

   ChartRedraw();
   return ok;
  }

//--- adicionadores
void AddSwing(int bar,double price,bool hi)
  {
   int n=ArraySize(g_sw); ArrayResize(g_sw,n+1);
   g_sw[n].bar=bar; g_sw[n].price=price; g_sw[n].hi=hi;
  }

void AddFvg(int bar,double top,double bot,int dir)
  {
   int n=ArraySize(g_fv); ArrayResize(g_fv,n+1);
   g_fv[n].bar=bar; g_fv[n].top=top; g_fv[n].bot=bot; g_fv[n].dir=dir;
   g_fv[n].invBar=-1; g_fv[n].fillBar=-1;
  }

void AddEvent(int type,int dir,int fromBar,int toBar,double price)
  {
   SEvent e;
   e.type=type; e.dir=dir; e.fromBar=fromBar; e.toBar=toBar; e.price=price;

   int k0=fromBar;
   for(int k=fromBar;k<=toBar;k++)
     {
      if(dir==1  && g_l[k]<g_l[k0]) k0=k;
      if(dir==-1 && g_h[k]>g_h[k0]) k0=k;
     }
   int ob=-1;
   for(int k=toBar-1;k>=k0;k--)
     {
      if(dir==1  && g_c[k]<g_o[k]) { ob=k; break; }
      if(dir==-1 && g_c[k]>g_o[k]) { ob=k; break; }
     }
   if(ob<0) ob=k0;
   e.ob=ob; e.obTop=g_h[ob]; e.obBot=g_l[ob];

   double lo=g_l[ob], hi=g_h[ob];
   for(int k=ob;k<=toBar;k++) { lo=MathMin(lo,g_l[k]); hi=MathMax(hi,g_h[k]); }
   e.legLo=lo; e.legHi=hi;

   int n=ArraySize(g_ev); ArrayResize(g_ev,n+1);
   g_ev[n]=e;
  }

//--- swings, BMS/MSS e FVG/IFVG
void ScanStructure()
  {
   ArrayResize(g_sw,0); ArrayResize(g_ev,0); ArrayResize(g_fv,0);
   int L=IMax(1,InpSwingLen);
   int lhBar=-1, llBar=-1; double lhP=0, llP=0; bool lhB=true, llB=true;
   int trend=0;
   double minGap=g_atr*InpFVGMinATR;

   for(int i=g_start+L;i<=g_scanEnd;i++)
     {
      int j=i-L;
      if(j-L>=0)
        {
         bool isH=true, isL=true;
         for(int k=1;k<=L;k++)
           {
            if(g_h[j]<=g_h[j-k] || g_h[j]<g_h[j+k]) isH=false;
            if(g_l[j]>=g_l[j-k] || g_l[j]>g_l[j+k]) isL=false;
           }
         if(isH) { AddSwing(j,g_h[j],true);  lhBar=j; lhP=g_h[j]; lhB=false; }
         if(isL) { AddSwing(j,g_l[j],false); llBar=j; llP=g_l[j]; llB=false; }
        }

      int nf=ArraySize(g_fv);
      for(int f=0;f<nf;f++)
        {
         if(g_fv[f].bar>=i-1) continue;
         if(g_fv[f].dir==1)
           {
            if(g_fv[f].fillBar<0 && g_l[i]<=g_fv[f].bot) g_fv[f].fillBar=i;
            if(g_fv[f].invBar<0  && g_c[i]<g_fv[f].bot)  g_fv[f].invBar=i;
           }
         else
           {
            if(g_fv[f].fillBar<0 && g_h[i]>=g_fv[f].top) g_fv[f].fillBar=i;
            if(g_fv[f].invBar<0  && g_c[i]>g_fv[f].top)  g_fv[f].invBar=i;
           }
        }

      if(i>=2)
        {
         if(g_l[i]-g_h[i-2]>minGap) AddFvg(i-1,g_l[i],g_h[i-2],1);
         if(g_l[i-2]-g_h[i]>minGap) AddFvg(i-1,g_l[i-2],g_h[i],-1);
        }

      //--- na vela atual g_c[i] = preco atual -> rompimento detectado no momento
      if(!lhB && lhBar>=0 && g_c[i]>lhP)
        {
         lhB=true;
         AddEvent(trend==-1?1:0,1,lhBar,i,lhP);
         trend=1;
        }
      if(!llB && llBar>=0 && g_c[i]<llP)
        {
         llB=true;
         AddEvent(trend==1?1:0,-1,llBar,i,llP);
         trend=-1;
        }
     }
  }

int MapHTF(datetime t,bool hi)
  {
   if(t==0) return -1;
   int sh=iBarShift(_Symbol,_Period,t,false);
   if(sh<0) return -1;
   int b=g_n-1-sh;
   if(b<0 || b>=g_n) return -1;
   if(g_t[b]<t && b+1<g_n) b++;
   datetime te=t+PeriodSeconds(InpHTF);
   int best=b;
   for(int k=b;k<g_n && g_t[k]<te;k++)
     {
      if(hi  && g_h[k]>g_h[best]) best=k;
      if(!hi && g_l[k]<g_l[best]) best=k;
     }
   return best;
  }

bool ComputeHTF()
  {
   g_bias=0; g_htfSH=0; g_htfSL=0; g_htfSHbar=-1; g_htfSLbar=-1;
   MqlRates r[];
   ArraySetAsSeries(r,false);
   int n=CopyRates(_Symbol,InpHTF,0,300,r);
   if(n<10) return false;

   // r[n-1] = vela em formacao ; r[n-2] = ultima fechada
   int i1=InpBiasLive?n-1:n-2;
   MqlRates c1=r[i1], c0=r[i1-1];
   if(c1.close>c0.high || (c1.low<c0.low && c1.close>c0.low && c1.close>c1.open))
      g_bias=1;
   else if(c1.close<c0.low || (c1.high>c0.high && c1.close<c0.high && c1.close<c1.open))
      g_bias=-1;

   int L=IMax(1,InpHTFSwingLen);
   datetime shT=0, slT=0;
   for(int k=n-2-L;k>=L;k--)
     {
      bool isH=true, isL=true;
      for(int m=1;m<=L;m++)
        {
         if(r[k].high<=r[k-m].high || r[k].high<r[k+m].high) isH=false;
         if(r[k].low>=r[k-m].low   || r[k].low>r[k+m].low)   isL=false;
        }
      if(isH && shT==0) { shT=r[k].time; g_htfSH=r[k].high; }
      if(isL && slT==0) { slT=r[k].time; g_htfSL=r[k].low;  }
      if(shT>0 && slT>0) break;
     }
   g_htfSHbar=MapHTF(shT,true);
   g_htfSLbar=MapHTF(slT,false);
   return true;
  }

//==================================================================== DESENHO
//--- painel BIAS: o ultimo candle e a vela HTF atual, atualizada a cada tick
void DrawPanel()
  {
   int n=IMax(2,InpPanelCandles);
   MqlRates r[];
   ArraySetAsSeries(r,false);
   if(CopyRates(_Symbol,InpHTF,0,n,r)!=n) return;
   // garante que a vela atual reflita o ultimo preco
   double bid=SymbolInfoDouble(_Symbol,SYMBOL_BID);
   if(bid>0)
     {
      r[n-1].close=bid;
      r[n-1].high=MathMax(r[n-1].high,bid);
      r[n-1].low =MathMin(r[n-1].low ,bid);
     }

   int X=InpPanelX, Y=InpPanelY, W=InpPanelW, H=InpPanelH;
   color ptc=Contrast(InpPanelBg);
   RL(X,Y,W,H,InpPanelBg,clrSilver);

   double hi=r[0].high, lo=r[0].low;
   for(int i=1;i<n;i++) { hi=MathMax(hi,r[i].high); lo=MathMin(lo,r[i].low); }
   double rng=hi-lo;
   double sw=(g_bias>=0)?g_htfSL:g_htfSH;
   bool showSw=(sw>0 && sw>lo-rng && sw<hi+rng);
   if(showSw) { hi=MathMax(hi,sw); lo=MathMin(lo,sw); }
   double pad=(hi-lo)*0.06; hi+=pad; lo-=pad;

   int areaX=X+12, areaW=(int)(W*0.58), yT=Y+10, yB=Y+H-28;
   int slot=areaW/n, bw=IMax(4,(int)(slot*0.62));

   for(int i=0;i<n;i++)
     {
      int cx=areaX+slot*i+slot/2;
      bool bull=(r[i].close>=r[i].open);
      color col=bull?InpBullColor:InpBearColor;
      int yh=PY(r[i].high,hi,lo,yT,yB), yl=PY(r[i].low,hi,lo,yT,yB);
      RL(cx-1,yh,2,yl-yh,clrDimGray,clrDimGray);
      int yo=PY(MathMax(r[i].open,r[i].close),hi,lo,yT,yB);
      int yc=PY(MathMin(r[i].open,r[i].close),hi,lo,yT,yB);
      RL(cx-bw/2,yo,bw,IMax(2,yc-yo),col,bull?clrDarkGreen:clrBlack);
     }

   // PCL / PCH = minima / maxima da vela anterior a atual
   double pc=(g_bias>=0)?r[n-2].low:r[n-2].high;
   int ypc=PY(pc,hi,lo,yT,yB);
   int x1=areaX+slot*(n-2)+slot/2, x2=X+W-45;
   for(int x=x1;x<x2;x+=6) RL(x,ypc,3,1,ptc,ptc);
   LB(x2+3,ypc,(g_bias>=0)?"PCL":"PCH",ptc,6,"Arial",ANCHOR_LEFT);

   if(showSw)
     {
      int ys=PY(sw,hi,lo,yT,yB);
      RL(X+4,ys,W-8,1,InpSwingHTFColor,InpSwingHTFColor);
      LB(X+W-8,ys+3,(g_bias>=0)?"SWING LOW":"SWING HIGH",ptc,6,"Arial",ANCHOR_RIGHT_UPPER);
     }

   int tx=X+(int)(W*0.66), ty=Y+H/2-40;
   LB(tx,ty,"BIAS "+TFName(InpHTF),ptc,11,"Arial Black");
   string bt="NEUTRO"; color bc=clrGray;
   if(g_bias==1)  { bt="ALTISTA";  bc=InpBullColor; }
   if(g_bias==-1) { bt="BAIXISTA"; bc=C'229,57,53'; }
   LB(tx,ty+22,bt,bc,10,"Arial Bold");
   if(g_setupEv>=0)
     {
      int sd=g_ev[g_setupEv].dir;
      LB(tx,ty+62,(sd==1?"Setup: COMPRA":"Setup: VENDA")+(g_setupCounter?" (MSS)":""),
         sd==1?InpBullColor:C'229,57,53',8,"Arial Bold");
     }

   // tempo restante da vela HTF
   int left=(int)(r[n-1].time+PeriodSeconds(InpHTF)-TimeCurrent());
   if(left<0) left=0;
   LB(tx,ty+42,StringFormat("%02d:%02d",left/60,left%60),ptc,8);
  }

void DrawHTFSwings()
  {
   string tf=TFName(InpHTF);
   int endB=g_last+InpExtendBars;
   double off=g_atr*0.3;
   if(g_htfSH>0)
     {
      datetime t1=(g_htfSHbar>=0)?g_t[g_htfSHbar]:g_t[g_start];
      Seg(t1,g_htfSH,FT(endB),g_htfSH,InpSwingHTFColor);
      Txt(FT(endB),g_htfSH,"SWING HIGH "+tf,g_tc,ANCHOR_RIGHT_LOWER,0,"Arial Bold");
      if(g_htfSHbar>=0) Txt(g_t[g_htfSHbar],g_htfSH+off,"High "+tf,g_tc,ANCHOR_LOWER);
     }
   if(g_htfSL>0)
     {
      datetime t1=(g_htfSLbar>=0)?g_t[g_htfSLbar]:g_t[g_start];
      Seg(t1,g_htfSL,FT(endB),g_htfSL,InpSwingHTFColor);
      Txt(FT(endB),g_htfSL,"SWING LOW "+tf,g_tc,ANCHOR_RIGHT_UPPER,0,"Arial Bold");
      if(g_htfSLbar>=0) Txt(g_t[g_htfSLbar],g_htfSL-off,"Low "+tf,g_tc,ANCHOR_UPPER);
     }
  }

void DrawEvents()
  {
   int n=ArraySize(g_ev);
   if(n==0) return;

   if(InpShowStructure)
     {
      for(int e=IMax(0,n-InpMaxEvents);e<n;e++)
        {
         SEvent ev=g_ev[e];
         Seg(g_t[ev.fromBar],ev.price,g_t[ev.toBar],ev.price,g_tc);
         int mid=(ev.fromBar+ev.toBar)/2;
         string lbl;
         if(ev.type==1) lbl="MSS";
         else           lbl="BMS ("+TFName(_Period)+")";
         Txt(g_t[mid],ev.price,lbl,g_tc,(ev.dir==1)?ANCHOR_LOWER:ANCHOR_UPPER);
        }
     }

   if(!InpShowOB) return;
   int mainDir=(g_setupEv>=0)?g_ev[g_setupEv].dir:((g_bias!=0)?g_bias:g_ev[n-1].dir);
   int eMain=-1, eOpp=-1;
   for(int e=n-1;e>=0;e--)
     {
      if(g_ev[e].dir==mainDir  && eMain<0) eMain=e;
      if(g_ev[e].dir==-mainDir && eOpp<0)  eOpp=e;
     }

   if(eMain>=0)
     {
      SEvent ev=g_ev[eMain];
      int endB=g_last+InpExtendBars;
      for(int k=ev.toBar+1;k<=g_last;k++)
        {
         if(ev.dir==1  && g_c[k]<ev.obBot) { endB=k; break; }
         if(ev.dir==-1 && g_c[k]>ev.obTop) { endB=k; break; }
        }
      Rect(g_t[ev.ob],ev.obTop,FT(endB),ev.obBot,InpOBBullColor);
      Txt(FT(endB),(ev.dir==1)?ev.obBot:ev.obTop,"OB",g_tc,(ev.dir==1)?ANCHOR_RIGHT_LOWER:ANCHOR_RIGHT_UPPER,0,"Arial Bold");
     }

   if(eOpp>=0)
     {
      SEvent ev=g_ev[eOpp];
      double p=g_c[ev.ob];
      int endB=g_last+InpExtendBars;
      for(int k=ev.toBar+1;k<=g_last;k++)
        {
         if(ev.dir==-1 && g_c[k]>ev.obTop) { endB=k; break; }
         if(ev.dir==1  && g_c[k]<ev.obBot) { endB=k; break; }
        }
      Seg(g_t[ev.ob],p,FT(endB),p,InpOBLineColor);
      string t=(ev.dir==-1)?"Bearish OB (Close)":"Bullish OB (Close)";
      Txt(FT(endB),p,t,g_tc,(ev.dir==-1)?ANCHOR_RIGHT_UPPER:ANCHOR_RIGHT_LOWER);
     }
  }

void DrawFVGs()
  {
   int n=ArraySize(g_fv);
   if(InpShowIFVG)
     {
      int drawn=0;
      for(int f=n-1;f>=0 && drawn<InpMaxIFVG;f--)
        {
         if(g_fv[f].invBar<0) continue;
         SFvg v=g_fv[f];
         if(v.bar<g_start) continue;
         int endB=IMin(v.invBar+InpExtendBars,g_last+InpExtendBars);
         color col=(v.dir==-1)?InpIFVGBullColor:InpIFVGBearColor;
         Rect(g_t[v.bar-1],v.top,FT(endB),v.bot,col,true);
         Rect(g_t[v.bar-1],v.top,FT(endB),v.bot,g_tc,false,STYLE_DOT);
         double mid=(v.top+v.bot)/2.0;
         Seg(g_t[v.bar-1],mid,FT(endB),mid,g_tc,STYLE_DASH);
         Txt(FT(endB),mid,"-IFVG",g_tc,ANCHOR_LEFT);
         drawn++;
        }
     }
   if(InpShowFVG)
     {
      int drawn=0;
      for(int f=n-1;f>=0 && drawn<5;f--)
        {
         if(g_fv[f].fillBar>=0 || g_fv[f].invBar>=0) continue;
         SFvg v=g_fv[f];
         Rect(g_t[v.bar-1],v.top,FT(g_last+InpExtendBars),v.bot,clrLightGray,true);
         Txt(FT(g_last+InpExtendBars),(v.top+v.bot)/2.0,"FVG",g_tc,ANCHOR_LEFT);
         drawn++;
        }
     }
  }

void Bracket(int b1,double p1,int b2,double p2,bool top,string txt)
  {
   double lvl=top?MathMax(p1,p2)+g_atr*0.6:MathMin(p1,p2)-g_atr*0.6;
   Seg(g_t[b1],p1,g_t[b1],lvl,g_tc);
   Seg(g_t[b1],lvl,g_t[b2],lvl,g_tc);
   Seg(g_t[b2],lvl,g_t[b2],p2,g_tc);
   Txt(g_t[(b1+b2)/2],lvl,txt,g_tc,top?ANCHOR_LOWER:ANCHOR_UPPER,InpFontSize+1,"Arial Bold");
  }

void DrawEQ()
  {
   double tol=g_atr*InpEQTolATR;
   for(int side=0;side<2;side++)
     {
      bool hiSide=(side==0);
      int idx[]; int m=0;
      for(int s=ArraySize(g_sw)-1;s>=0 && m<8;s--)
         if(g_sw[s].hi==hiSide) { ArrayResize(idx,m+1); idx[m]=s; m++; }

      bool done=false;
      for(int a=0;a<m-1 && !done;a++)
         for(int b=a+1;b<m && !done;b++)
           {
            SSwing s2=g_sw[idx[a]], s1=g_sw[idx[b]];
            if(s2.bar-s1.bar<3) continue;
            if(MathAbs(s2.price-s1.price)>tol) continue;
            double ext=hiSide?MathMax(s1.price,s2.price):MathMin(s1.price,s2.price);
            bool ok=true;
            for(int k=s1.bar+1;k<s2.bar;k++)
               if((hiSide && g_h[k]>ext) || (!hiSide && g_l[k]<ext)) { ok=false; break; }
            if(!ok) continue;
            Bracket(s1.bar,s1.price,s2.bar,s2.price,hiSide,hiSide?"Relative Equal Highs":"Relative Equal Lows");
            done=true;
           }
     }
  }

double OtherPrice(datetime t,bool hi)
  {
   int sh=iBarShift(InpSMTSymbol,_Period,t,false);
   if(sh<0) return 0;
   double best=0;
   for(int k=sh-1;k<=sh+1;k++)
     {
      if(k<0) continue;
      double v=hi?iHigh(InpSMTSymbol,_Period,k):iLow(InpSMTSymbol,_Period,k);
      if(v<=0) continue;
      if(best==0) best=v;
      else best=hi?MathMax(best,v):MathMin(best,v);
     }
   return best;
  }

void DrawSMT()
  {
   if(InpSMTSymbol=="" || InpSMTSymbol==_Symbol) return;
   if(!SymbolSelect(InpSMTSymbol,true)) return;

   int l1=-1,l2=-1,h1=-1,h2=-1;
   for(int s=ArraySize(g_sw)-1;s>=0;s--)
     {
      if(!g_sw[s].hi) { if(l2<0) l2=s; else if(l1<0) l1=s; }
      else            { if(h2<0) h2=s; else if(h1<0) h1=s; }
     }

   bool bull=false, bear=false;
   if(l1>=0 && l2>=0 && g_sw[l2].price<g_sw[l1].price)
     {
      double a=OtherPrice(g_t[g_sw[l1].bar],InpSMTInverse);
      double b=OtherPrice(g_t[g_sw[l2].bar],InpSMTInverse);
      if(a>0 && b>0) bull=InpSMTInverse?(b<a):(b>a);
     }
   if(h1>=0 && h2>=0 && g_sw[h2].price>g_sw[h1].price)
     {
      double a=OtherPrice(g_t[g_sw[h1].bar],!InpSMTInverse);
      double b=OtherPrice(g_t[g_sw[h2].bar],!InpSMTInverse);
      if(a>0 && b>0) bear=InpSMTInverse?(b>a):(b<a);
     }
   if(bull && bear) { if(g_sw[l2].bar>g_sw[h2].bar) bear=false; else bull=false; }

   int s1=-1,s2=-1;
   if(bull) { s1=l1; s2=l2; }
   if(bear) { s1=h1; s2=h2; }
   if(s1<0) return;

   int b1=g_sw[s1].bar, b2=g_sw[s2].bar;
   double p1=g_sw[s1].price, p2=g_sw[s2].price;
   Seg(g_t[b1],p1,g_t[b2],p2,g_tc,STYLE_DASH);
   int mid=(b1+b2)/2;
   double pm=(p1+p2)/2.0;
   Txt(g_t[mid],pm,"SMT (HTF)",g_tc,bull?ANCHOR_LEFT_LOWER:ANCHOR_LEFT_UPPER,0,"Arial Bold");
   string note=bull?"Usando "+InpSMTSymbol+": divergencia -> projecao altista"
                   :"Usando "+InpSMTSymbol+": divergencia -> projecao baixista";
   double pn=bull?pm-g_atr*1.5:pm+g_atr*1.5;
   Txt(g_t[b1],pn,note,g_tc,bull?ANCHOR_LEFT_UPPER:ANCHOR_LEFT_LOWER,InpFontSize-1);
  }

//--- escolhe o evento do setup: sempre a estrutura MAIS RECENTE.
//    Um setup antigo deixa de valer assim que a estrutura rompe para o
//    lado oposto (nao fica "preso" na compra/venda anterior).
//    Contra o Bias HTF so e aceito se a virada foi confirmada por MSS.
int SelectSetup()
  {
   g_setupCounter=false;
   int n=ArraySize(g_ev);
   if(n==0) return -1;
   int e=n-1;
   int d=g_ev[e].dir;
   if(!InpRequireBias || d==g_bias) return e;
   if(!InpCounterMSS) return -1;
   for(int k=e;k>=0 && g_ev[k].dir==d;k--)
      if(g_ev[k].type==1) { g_setupCounter=true; return e; }
   return -1;
  }

//--- Setup: aparece no instante do rompimento, entrada marcada no instante do toque
void DrawSetup()
  {
   if(g_setupEv<0) return;
   SEvent ev=g_ev[g_setupEv];
   if(g_last-ev.toBar>InpMaxSetupAge) return;
   int d=ev.dir;

   double lo=ev.legLo, hi=ev.legHi;
   int k=ev.toBar+1;
   for(;k<=g_last;k++)
     {
      double en=(d==1)?hi-InpEntryLevel*(hi-lo):lo+InpEntryLevel*(hi-lo);
      if(d==1)  { if(g_l[k]<=en) break; hi=MathMax(hi,g_h[k]); }
      else      { if(g_h[k]>=en) break; lo=MathMin(lo,g_l[k]); }
     }
   double range=hi-lo;
   if(range<=0) return;

   double entry=(d==1)?hi-InpEntryLevel*range:lo+InpEntryLevel*range;
   double sl=(d==1)?MathMin(lo,ev.obBot)-g_atr*InpSLBufferATR
                   :MathMax(hi,ev.obTop)+g_atr*InpSLBufferATR;
   double risk=MathAbs(entry-sl);
   double tp=(d==1)?entry+InpRR*risk:entry-InpRR*risk;
   if(InpTPMode==TP_MODE_HTF)
     {
      if(d==1  && g_htfSH>entry)                tp=g_htfSH;
      if(d==-1 && g_htfSL>0 && g_htfSL<entry)   tp=g_htfSL;
     }
   if((d==1 && hi>=tp) || (d==-1 && lo<=tp)) return;

   int fill=(k<=g_last)?k:-1;
   int res=-1, result=0;
   if(fill>=0)
     {
      for(int j=fill;j<=g_last;j++)
        {
         if((d==1 && g_l[j]<=sl) || (d==-1 && g_h[j]>=sl)) { res=j; result=-1; break; }
         if(j>fill && ((d==1 && g_h[j]>=tp) || (d==-1 && g_l[j]<=tp))) { res=j; result=1; break; }
        }
     }

   int zs=ev.toBar;
   int ze=(res>=0)?res+3:g_last+InpExtendBars;

   Rect(g_t[zs],entry,FT(ze),tp,InpTPColor);
   Rect(g_t[zs],entry,FT(ze),sl,InpSLColor);

   double p1=(d==1)?hi:lo, p0=(d==1)?lo:hi;
   datetime fx=FT(zs+(ze-zs)/2);
   Seg(g_t[ev.ob],p1,FT(ze),p1,g_tc);
   Seg(g_t[ev.ob],entry,FT(ze),entry,g_tc);
   Seg(g_t[ev.ob],p0,FT(ze),p0,g_tc);
   Txt(fx,p1,"1",g_tc,ANCHOR_LEFT_LOWER);
   Txt(fx,entry,DoubleToString(InpEntryLevel,2),g_tc,ANCHOR_LEFT_LOWER);
   Txt(fx,p0,"0",g_tc,ANCHOR_LEFT_LOWER);

   if(InpShowIOFED)
     {
      for(int f=ArraySize(g_fv)-1;f>=0;f--)
        {
         if(g_fv[f].dir!=d) continue;
         if(g_fv[f].bar<ev.ob-2 || g_fv[f].bar>ev.toBar+2) continue;
         double lv=(d==1)?g_fv[f].bot:g_fv[f].top;
         Seg(g_t[g_fv[f].bar-1],lv,FT(g_fv[f].bar+4),lv,g_tc);
         Txt(FT(g_fv[f].bar+4),lv,"-IOFED",g_tc,ANCHOR_LEFT,InpFontSize-1);
         break;
        }
     }

   string side=((d==1)?"Comprar":"Vender")+(g_setupCounter?" (contra Bias, MSS)":"");
   if(fill>=0)
     {
      if(d==1)
        {
         Arw(g_t[fill],g_l[fill]-g_atr*0.15,233,InpEntryArrowCol,ANCHOR_TOP);
         Txt(g_t[fill],g_l[fill]-g_atr*1.0,side+" @"+PS(entry),g_tc,ANCHOR_UPPER);
        }
      else
        {
         Arw(g_t[fill],g_h[fill]+g_atr*0.15,234,InpEntryArrowCol,ANCHOR_BOTTOM);
         Txt(g_t[fill],g_h[fill]+g_atr*1.0,side+" @"+PS(entry),g_tc,ANCHOR_LOWER);
        }
     }
   else
      Txt(FT(g_last+2),entry,((d==1)?"Buy Limit @":"Sell Limit @")+PS(entry),g_tc,ANCHOR_LEFT_LOWER);

   int from=(fill>=0)?fill:zs;
   int to=(res>=0 && result==1)?res:ze-2;
   Seg(g_t[from],entry,FT(to),tp,g_tc,STYLE_DASH);

   Tag(FT(ze),tp,clrTeal);
   Tag(FT(ze),entry,InpEntryArrowCol);
   Tag(FT(ze),sl,clrCrimson);

   string note=(d==1)?"SL abaixo da zona: nas continuacoes ela ja foi mitigada"
                     :"SL acima da zona: nas continuacoes ela ja foi mitigada";
   double pn=(d==1)?sl-g_atr*0.8:sl+g_atr*0.8;
   Txt(FT(zs+(ze-zs)/2),pn,note,g_tc,(d==1)?ANCHOR_UPPER:ANCHOR_LOWER,InpFontSize-1);

   if(result==1)  Txt(FT(res),tp,"TP atingido",clrTeal,(d==1)?ANCHOR_LOWER:ANCHOR_UPPER,0,"Arial Bold");
   if(result==-1) Txt(FT(res),sl,"SL atingido",clrCrimson,(d==1)?ANCHOR_UPPER:ANCHOR_LOWER,0,"Arial Bold");

   //--- alertas no instante em que acontecem (vela atual ou a que acabou de fechar)
   datetime evT=g_t[ev.toBar];
   string hdr=_Symbol+" "+TFName(_Period)+" | ";
   if(ev.toBar>=g_n-2 && g_alertSetup!=evT)
     {
      g_alertSetup=evT;
      Notify(hdr+((d==1)?"Setup de COMPRA":"Setup de VENDA")+" | "+((d==1)?"Buy Limit ":"Sell Limit ")+PS(entry)+
             " SL "+PS(sl)+" TP "+PS(tp));
     }
   if(fill>=g_n-2 && g_alertFill!=evT)
     {
      g_alertFill=evT;
      Notify(hdr+side+" @"+PS(entry)+" | SL "+PS(sl)+" TP "+PS(tp));
     }
  }
//+------------------------------------------------------------------+
