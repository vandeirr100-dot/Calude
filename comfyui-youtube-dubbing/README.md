# Dublagem de Vídeo com IA para ComfyUI

Workflow completo para **dublar vídeos do YouTube (ou arquivos locais) com voz neural
profissional** e baixar o resultado.

```
Link do YouTube ──┐
                  ├─► Transcrição ─► Tradução ─► Voz neural ─► Mixagem ─► MP4 dublado
Arquivo local ────┘    (Whisper)     (idioma      (sincronizada)  (preserva   + legendas
                                      escolhido)                   a música)   (download)
```

## O que ele faz

- **Entrada flexível**: cole o link do YouTube ou use um vídeo da pasta `ComfyUI/input`
  (o nó também aceita um caminho absoluto e permite recortar um trecho).
- **Transcrição com timestamps** via Whisper (`faster-whisper`, com GPU quando disponível).
- **Tradução consciente de duração**: o tradutor recebe a janela de tempo de cada fala e é
  instruído a manter o texto curto o bastante para caber nela — o que evita a dublagem
  "atropelada" típica de pipelines ingênuos. Suporta glossário e escolha de tom.
- **Voz neural profissional**: `edge-tts` (vozes Azure Neural, gratuitas e sem chave de API),
  com opção de **clonagem da voz original** (XTTS-v2), OpenAI TTS, ElevenLabs ou Piper (offline).
- **Sincronia**: cada fala é esticada/comprimida para a janela original **preservando o tom**
  (filtro `rubberband` quando disponível, `atempo` como alternativa).
- **Preserva a trilha sonora**: separação de voz/música com Demucs e *ducking* automático —
  a música e os efeitos continuam no vídeo, abaixando só quando alguém fala.
- **Saída pronta**: MP4/MKV/MOV/WebM com loudness normalizado (padrão de streaming),
  legendas SRT/VTT, áudio original opcional como segunda faixa e link de download no próprio nó.

## Instalação

1. Copie a pasta para os custom nodes do ComfyUI:

```bash
cd ComfyUI/custom_nodes
git clone <este-repositorio>
cp -r Calude/comfyui-youtube-dubbing .
```

2. Instale as dependências **no mesmo ambiente Python do ComfyUI**:

```bash
pip install -r comfyui-youtube-dubbing/requirements.txt
```

3. Instale o `ffmpeg` (obrigatório, precisa estar no `PATH`):

| Sistema | Comando |
|---|---|
| Linux | `sudo apt install ffmpeg` |
| macOS | `brew install ffmpeg` |
| Windows | `winget install Gyan.FFmpeg` |

4. Reinicie o ComfyUI. Os nós aparecem na categoria **Dublagem IA**.

### Opcionais

```bash
pip install demucs      # preservar música/efeitos de fundo
pip install coqui-tts   # clonar a voz original (XTTS-v2, ~1.8 GB no 1º uso)
pip install piper-tts   # TTS 100% offline
```

> Para o melhor ajuste de tempo sem alterar o timbre, use um `ffmpeg` compilado com
> `librubberband`. Sem ele o pipeline cai no `atempo`, que também preserva o tom, mas com
> qualidade um pouco inferior em ajustes grandes.

## Como usar

1. No ComfyUI: **Workflow → Open** e escolha
   `workflows/dublagem_youtube_pro.json`.
2. No nó **1. Fonte do Vídeo**, cole o link em `youtube_url`
   (ou mude `modo` para `arquivo_local`).
3. No nó **3. Traduzir Falas**, escolha o `idioma_destino`.
4. Clique em **Queue**. Ao terminar, o nó **6b** mostra o caminho do arquivo e o vídeo
   aparece em `ComfyUI/output/dublagem/` para download.

### Escolhendo o motor de tradução

| Motor | Chave de API | Observação |
|---|---|---|
| `google_gratis` | não | Padrão do workflow. Funciona de imediato, qualidade razoável. |
| `claude` | `ANTHROPIC_API_KEY` | **Melhor qualidade**: respeita duração, tom e glossário. |
| `openai` | `OPENAI_API_KEY` | Idem, via GPT. |
| `deepl` | `DEEPL_API_KEY` | Excelente para idiomas europeus. |
| `libretranslate` | opcional | Para instâncias self-hosted. |
| `nenhuma` | — | Só sintetiza a voz, sem traduzir (útil para refazer a narração). |

A chave pode ir no campo `api_key` do nó ou na variável de ambiente correspondente
(a variável é o caminho recomendado — não fica salva dentro do arquivo do workflow).

### Escolhendo a voz

- `voz = auto` escolhe automaticamente a melhor voz neural do idioma, preferindo as
  **Multilingual** (timbre consistente entre idiomas).
- O nó **Listar Vozes Neurais** mostra todas as vozes disponíveis para um locale
  (ex.: `pt-BR`, `en-US`).
- Para **clonar a voz original**: no nó **5a** use `metodo = demucs`, mude o motor do nó 4
  para `xtts_v2_clonagem` e conecte `voz_referencia` → `audio_referencia`
  (já conectado no workflow pronto).

## Ajustes finos

| Situação | O que mudar |
|---|---|
| A dublagem soa acelerada | Nó 3: aumente `tolerancia_comprimento_pct` ou troque para o motor `claude`; nó 4: baixe `aceleracao_maxima`. |
| Falas "estouram" a janela | O relatório do nó 4 lista quais. Use `modo_sincronia = natural_com_deslocamento` se o sincronismo exato não for crítico. |
| Quero a música de fundo original | Nó 5a: `metodo = demucs`; nó 5b: ajuste `ganho_fundo_db`. |
| Quero ouvir um pouco do áudio original | Nó 5b: `ganho_original_db` de `-60` para cerca de `-25`. |
| Legenda queimada no vídeo | Nó 6b: `legendas = queimada_no_video`. |
| Áudio original como 2ª faixa | Nó 6b: ligue `manter_audio_original_como_faixa2`. |

### Modos de sincronia

- **`encaixar_no_tempo`** (padrão): cada fala começa exatamente no tempo original e é
  comprimida/esticada dentro dos limites de `aceleracao_maxima`/`desaceleracao_maxima`.
  Mantém o sincronismo com a imagem.
- **`natural_com_deslocamento`**: preserva a velocidade natural da fala e empurra as falas
  seguintes. O áudio pode ficar **mais longo que o vídeo** — nesse caso use
  `duracao_final = manter_audio_completo` no nó 6b (o último quadro é congelado).
- **`sem_ajuste`**: sintetiza sem nenhuma correção de tempo.

## Nós incluídos

| Nó | Função |
|---|---|
| 1. Fonte do Vídeo | Baixa do YouTube (`yt-dlp`) ou lê arquivo local; extrai o áudio. |
| 2. Transcrever Áudio | Whisper com timestamps, VAD e união de frases curtas. |
| 3. Traduzir Falas | Tradução com controle de duração, tom e glossário. |
| 4. Voz Neural + Sincronia | Síntese por fala e montagem na linha de tempo. |
| 5a. Separar Voz/Música | Demucs; também extrai a referência para clonagem de voz. |
| 5b. Mixar | Dublagem + fundo com *ducking* e normalização de loudness. |
| 6a. Salvar Legendas | SRT e VTT traduzidos. |
| 6b. Gerar Vídeo Dublado | Montagem final e link de download. |
| 6c. Juntar Entregáveis | Copia vídeo, legenda e áudio para uma pasta só. |
| Listar Vozes Neurais | Mostra as vozes disponíveis por idioma. |
| Inspecionar Segmentos | Confere transcrição e tradução antes de sintetizar. |

## Requisitos de rede

As etapas de **download**, **tradução** (exceto `nenhuma`) e **voz** (exceto `piper`/`xtts`)
acessam a internet. Em ambientes isolados, a combinação offline é:
Whisper local + `motor = nenhuma` ou LibreTranslate self-hosted + `piper`/`xtts_v2_clonagem`.

## Desempenho

Referência para um vídeo de 10 minutos (GPU NVIDIA, `large-v3-turbo`):
transcrição ~1 min, tradução ~1 min, voz neural ~2 min, Demucs ~2 min, montagem ~30 s.
Em CPU, prefira o modelo `small` ou `base` e `metodo = nenhuma` na separação.

O cache é agressivo: reexecutar com o mesmo vídeo e as mesmas falas reaproveita download,
transcrição e clipes de voz já gerados. Desligue com `usar_cache` quando quiser refazer.

## Uso responsável

Dublagem é uso legítimo em conteúdo próprio, licenciado ou de domínio público. Baixar e
redistribuir vídeos de terceiros pode violar direitos autorais e os termos de uso da
plataforma, e a clonagem de voz de uma pessoa real exige o consentimento dela. A
responsabilidade por esses usos é de quem executa o workflow.

## Solução de problemas

| Erro | Causa / solução |
|---|---|
| `yt-dlp nao encontrado` | `pip install -U yt-dlp` no ambiente do ComfyUI. |
| `ffmpeg nao foi encontrado` | Instale o ffmpeg e reinicie o ComfyUI. |
| yt-dlp falha em vídeo restrito | Use `cookies_do_navegador` (ex.: `chrome`) com a sessão logada. |
| `Nenhum backend de transcricao` | `pip install faster-whisper`. |
| Voz sai muda ou com falhas | Verifique a rede; `edge-tts` precisa de acesso a `speech.platform.bing.com`. |
| `demucs falhou` | `pip install -U demucs` ou use `metodo = ffmpeg_centro` / `nenhuma`. |
| Vídeo final sem imagem | Troque `modo_video` para `h264_recodificar`. |

## Regenerando o workflow

Os JSONs são gerados a partir dos próprios `INPUT_TYPES` dos nós, de modo que os widgets
nunca saem desalinhados com o código:

```bash
python workflows/build_workflow.py
```

Isso reescreve `dublagem_youtube_pro.json` (interface) e
`dublagem_youtube_pro_api.json` (formato de API, para `POST /prompt`).
