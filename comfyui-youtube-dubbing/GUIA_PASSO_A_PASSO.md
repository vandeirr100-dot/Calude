# Guia passo a passo — Dublagem de Vídeo no ComfyUI

Do zero até o primeiro vídeo dublado.

---

## Parte 1 — Instalar o ffmpeg (faça isto primeiro)

O pipeline inteiro depende do **ffmpeg** e do **ffprobe**. Os dois vêm no mesmo
pacote, mas precisam estar no `PATH` do sistema.

> **Atenção:** `pip install imageio-ffmpeg` **não** resolve — esse pacote traz o
> `ffmpeg` mas não o `ffprobe`, que o workflow usa para medir durações.

### Windows
```powershell
winget install Gyan.FFmpeg
```
Feche e reabra o terminal. Se não tiver o `winget`, baixe de
[gyan.dev/ffmpeg/builds](https://www.gyan.dev/ffmpeg/builds/) (versão *release full*),
extraia em `C:\ffmpeg` e adicione `C:\ffmpeg\bin` ao PATH
(Iniciar → "variáveis de ambiente" → Path → Novo).

### macOS
```bash
brew install ffmpeg
```

### Linux
```bash
sudo apt install ffmpeg
```

### Conferir
```bash
ffmpeg -version
ffprobe -version
```
Os **dois** precisam responder. Se algum der "comando não encontrado", resolva
antes de continuar — sem isso nada funciona.

---

## Parte 2 — Copiar os nós para o ComfyUI

Coloque a pasta `comfyui-youtube-dubbing` dentro de `custom_nodes`:

```
ComfyUI/
└── custom_nodes/
    └── comfyui-youtube-dubbing/     ← aqui
        ├── __init__.py
        ├── nodes/
        ├── utils/
        └── workflows/
```

**A forma mais simples é descompactar o ZIP ali dentro** — não precisa de git.

**Confira a profundidade.** O `__init__.py` precisa estar em
`custom_nodes/comfyui-youtube-dubbing/__init__.py`. Descompactadores costumam
criar uma pasta a mais (`.../comfyui-youtube-dubbing/comfyui-youtube-dubbing/__init__.py`)
— assim o ComfyUI **não carrega**.

### Windows (CMD) — conferir e corrigir

Entre na pasta e liste o conteúdo:
```bat
cd /d "%USERPROFILE%\Downloads\ComfyUI_windows_portable_nvidia_cu126\ComfyUI_windows_portable\ComfyUI\custom_nodes\comfyui-youtube-dubbing"
dir /b
```
- Apareceu `__init__.py`, `nodes`, `utils`, `workflows` → **está certo**, siga para a Parte 3.
- Apareceu só `comfyui-youtube-dubbing` → sobe um nível, com o `robocopy` (já vem no Windows):
  ```bat
  robocopy comfyui-youtube-dubbing . /E /MOVE
  ```
- Pasta vazia → descompacte o ZIP aqui.

> No CMD não existem `mv`, `rm` nem a quebra de linha com `\`. Os equivalentes são
> `move`, `rmdir /s /q` e `^`. Comandos de tutorial em Linux não funcionam como estão.

### Pelo git (opcional)

Windows (CMD), uma linha por comando:
```bat
cd /d "%USERPROFILE%\Downloads\ComfyUI_windows_portable_nvidia_cu126\ComfyUI_windows_portable\ComfyUI\custom_nodes"
git clone -b claude/wonderful-lamport-emampw https://github.com/vandeirr100-dot/Calude.git temp
robocopy temp\comfyui-youtube-dubbing comfyui-youtube-dubbing /E /MOVE
rmdir /s /q temp
```

Linux/macOS:
```bash
cd ComfyUI/custom_nodes
git clone -b claude/wonderful-lamport-emampw https://github.com/vandeirr100-dot/Calude.git temp
mv temp/comfyui-youtube-dubbing .
rm -rf temp
```

---

## Parte 3 — Instalar as dependências

O detalhe que mais causa erro: as bibliotecas precisam ir **no mesmo Python que
roda o ComfyUI**, não no Python do sistema. Use o comando da sua instalação:

### ComfyUI Portable (Windows)
O Python do portable fica em `ComfyUI_windows_portable\python_embeded\python.exe`.
Chame o pip por ele — de qualquer pasta, usando o caminho completo:
```bat
"%USERPROFILE%\Downloads\ComfyUI_windows_portable_nvidia_cu126\ComfyUI_windows_portable\python_embeded\python.exe" -m pip install -r "%USERPROFILE%\Downloads\ComfyUI_windows_portable_nvidia_cu126\ComfyUI_windows_portable\ComfyUI\custom_nodes\comfyui-youtube-dubbing\requirements.txt"
```
Ajuste o começo do caminho se a sua pasta do portable estiver em outro lugar.

Usar o `python` do sistema aqui **não funciona**: o ComfyUI portable não vê o que
está instalado nele.

### Instalação manual com venv (Linux/macOS/Windows)
```bash
cd ComfyUI
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r custom_nodes/comfyui-youtube-dubbing/requirements.txt
```

### ComfyUI Desktop
Em Settings → **About** / **Server** o app mostra o caminho do Python que ele usa.
Chame o pip por esse caminho:
```bash
"<caminho-do-python>" -m pip install -r "<.../custom_nodes/comfyui-youtube-dubbing/requirements.txt>"
```

Isso instala: `yt-dlp`, `faster-whisper`, `edge-tts` e `numpy`.

### Conferir
```bash
<seu-python> -c "import yt_dlp, faster_whisper, edge_tts, numpy; print('tudo ok')"
```

---

## Parte 4 — Reiniciar e achar os nós

1. **Feche o ComfyUI por completo** e abra de novo (recarregar a página não basta —
   os nós são carregados na inicialização do servidor).
2. No terminal do ComfyUI deve aparecer:
   ```
   [Dublagem IA] 11 nos carregados (categoria 'Dublagem IA').
   ```
3. Se aparecer `[Dublagem IA] Alguns nos nao foram carregados:` seguido de um
   traceback, leia a última linha — quase sempre é uma dependência faltando.
4. Dê duplo clique no canvas e digite `Dublagem` — os 11 nós devem aparecer.

---

## Parte 5 — Abrir o workflow

Duas formas (a primeira é a mais confiável):

- **Arraste** o arquivo `workflows/dublagem_youtube_pro.json` para cima do canvas
  do ComfyUI.
- Ou menu **Workflow → Open** e selecione o arquivo.

Você verá 9 nós em três blocos coloridos: entrada (azul), tradução e voz (verde),
mixagem e saída (dourado).

---

## Parte 6 — Primeiro teste (recomendado: 1 minuto)

Antes de processar um vídeo inteiro, faça um teste curto. A primeira execução
baixa o modelo do Whisper, então vale usar o pequeno.

No nó **1. Cole o link do YouTube aqui**:
| Campo | Valor |
|---|---|
| `youtube_url` | cole o link do seu vídeo |
| `recorte_duracao_s` | `60` ← dubla só o primeiro minuto |

No nó **2. Transcrever (Whisper)**:
| Campo | Valor |
|---|---|
| `modelo` | `base` ← baixa ~150 MB em vez de ~1,5 GB |

No nó **3. ESCOLHA O IDIOMA DA DUBLAGEM**:
| Campo | Valor |
|---|---|
| `idioma_destino` | o idioma que você quer (ex.: `Ingles (EUA)`) |

Clique em **Queue** / **Run**. Acompanhe o progresso no terminal do ComfyUI.

Ao terminar, o nó **6b. VIDEO DUBLADO** mostra o caminho do arquivo, e o vídeo
está em:
```
ComfyUI/output/dublagem/
```

---

## Usando um vídeo do seu computador (sem link do YouTube)

No nó **1**, mude `modo` para `arquivo_local`. A partir daí, **não use o botão
"escolha o arquivo para enviar"**: ele envia o vídeo pelo navegador até o servidor
do ComfyUI, que recusa arquivos acima do limite de upload e devolve
`413 - Request Entity Too Large`. Qualquer vídeo de duração real passa desse limite.

Use uma destas opções:

### Opção A — caminho absoluto (mais simples)
Preencha o campo `caminho_absoluto` com o caminho completo do arquivo:
```
C:\Users\vande\Videos\meu_video.mp4
```
Esse campo tem prioridade sobre o `arquivo_local` e não envia nada pela rede.
Para copiar o caminho no Windows: clique no arquivo com **Shift + botão direito**
→ *Copiar como caminho*, e cole (remova as aspas).

### Opção B — pasta input
1. Copie o vídeo para `ComfyUI\input\` pelo Explorador de Arquivos.
2. Recarregue a página do ComfyUI (**F5**).
3. O arquivo aparece na lista do campo `arquivo_local`.

### Opção C — aumentar o limite de upload
Só se você realmente quiser usar o botão de envio. Edite o `.bat` que inicia o
ComfyUI e acrescente ao final da linha do python:
```
--max-upload-size 4096
```
(o valor é em MB). Depois reinicie o ComfyUI.

---

## Parte 7 — Rodar de verdade

Deu certo no teste? Então:

1. Nó **1**: `recorte_duracao_s` de volta para `0` (processa o vídeo todo).
2. Nó **2**: `modelo` para `large-v3-turbo` (muito mais preciso).
3. Nó **5a**: se o vídeo tem música ou efeitos que você quer manter,
   instale o Demucs e mude `metodo` para `demucs`:
   ```bash
   <seu-python> -m pip install demucs
   ```
4. Clique em **Queue**.

O cache reaproveita o download e a transcrição, então reexecutar depois de mexer
só na voz ou na mixagem é rápido.

---

## Parte 8 — Deixar a dublagem boa

### Tradução (o que mais pesa no resultado)
O padrão `google_gratis` funciona sem configurar nada, mas é o mais fraco. Com uma
chave de API, mude o `motor` do nó 3:

| `motor` | Variável de ambiente | Por que |
|---|---|---|
| `claude` | `ANTHROPIC_API_KEY` | Respeita a duração de cada fala, o tom e o glossário |
| `deepl` | `DEEPL_API_KEY` | Muito bom em idiomas europeus |
| `openai` | `OPENAI_API_KEY` | Semelhante ao Claude |

Defina a variável **antes** de abrir o ComfyUI:
```bash
export ANTHROPIC_API_KEY="sua-chave"     # Windows: setx ANTHROPIC_API_KEY "sua-chave"
```
Prefira a variável de ambiente ao campo `api_key` do nó — assim a chave não fica
salva dentro do arquivo `.json` do workflow, que você pode acabar compartilhando.

### Usar as vozes neurais do Google

As vozes do Google Cloud (famílias **Chirp 3 HD**, **Studio** e **Neural2**) estão entre
as melhores disponíveis. Precisam de uma chave de API:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/) e crie (ou escolha) um projeto.
2. Ative a API **Cloud Text-to-Speech** em *APIs e serviços → Biblioteca*.
3. Em *APIs e serviços → Credenciais*, crie uma **Chave de API** e copie.
4. Antes de abrir o ComfyUI, defina a variável de ambiente:
   ```bat
   setx GOOGLE_TTS_API_KEY "sua-chave-aqui"
   ```
   (feche e reabra o terminal depois do `setx`)
5. No nó **4**, mude `motor` para `google_tts`. Deixe `voz = auto` que ele escolhe a
   melhor voz disponível para o idioma.

Para escolher outra voz, adicione o nó **Listar Vozes Neurais**, ponha `motor = google_tts`
e o `locale` (ex.: `pt-BR`), execute, e copie o nome para `voz_personalizada` no nó 4.

> O Google cobra por caractere, com uma cota gratuita mensal (mais generosa nas vozes
> Standard que nas Neural2/Chirp). Verifique os preços atuais antes de dublar vídeos
> longos — o `edge_tts` continua sendo gratuito e sem chave.

### Voz
- `voz = auto` já escolhe uma boa voz neural do idioma.
- Para escolher outra: adicione o nó **Listar Vozes Neurais**, ponha o locale
  (`pt-BR`, `en-US`, ...), execute, e copie o nome da voz para o campo
  `voz_personalizada` do nó 4.
- Para **clonar a voz original**: nó 5a com `metodo = demucs`, e no nó 4 mude
  `motor` para `xtts_v2_clonagem`. Precisa de `pip install coqui-tts` (baixa ~1,8 GB
  na primeira vez). A conexão da voz de referência já está pronta no workflow.

### Clonar uma voz a partir de um áudio de exemplo

Permite dublar o vídeo com a **sua** voz (ou outra que você tenha o direito de usar).

**Instalação (uma vez):**
```bat
"%USERPROFILE%\Downloads\ComfyUI_windows_portable_nvidia_cu126\ComfyUI_windows_portable\python_embeded\python.exe" -m pip install coqui-tts
```
No primeiro uso o modelo XTTS-v2 (~1,8 GB) é baixado.

**Preparar a amostra:**

1. Grave 20 a 30 segundos falando normalmente, em ambiente silencioso, sem música
   ao fundo. Serve o Gravador de Voz do Windows ou o celular.
2. Abra o workflow `dublagem_com_clonagem_de_voz.json`.
3. No nó **4a. SUA VOZ**, preencha `caminho_do_audio` com o caminho do arquivo
   (aceita `.wav`, `.mp3`, `.m4a` e também vídeos — o áudio é extraído).
4. Em `salvar_como`, dê um nome (ex.: `minha_voz`) para guardar o perfil.
5. Execute.

O nó remove os silêncios, escolhe sozinho o trecho com melhor fala, normaliza e
salva em `ComfyUI\models\vozes_clonadas\`. O relatório avisa se o áudio estiver
saturado ou baixo demais.

**Reutilizar depois:** no nó 4a, mude `origem` para `voz_salva` e escolha o perfil
na lista (recarregue a página com F5 para a lista atualizar).

**O que esperar:**

| Ponto | Situação |
|---|---|
| Idiomas | pt, en, es, fr, de, it, pl, tr, ru, nl, cs, ar, zh-cn, ja, hu, ko, hi |
| Velocidade | Bem mais lento que `edge_tts` — é um modelo local, roda na sua GPU |
| Qualidade | Mantém o timbre de forma convincente, mas é menos estável que as vozes da Microsoft/Google em vídeos longos |
| Licença | O XTTS-v2 usa a Coqui Public Model License, que **restringe uso comercial** |

> Clonar a voz de outra pessoa exige o consentimento dela.

### Glossário
No nó 3, campo `glossario`, uma regra por linha:
```
cloud = nuvem
machine learning = aprendizado de máquina
```

### Problemas comuns de ritmo
| Sintoma | Ajuste |
|---|---|
| Voz soa acelerada | Nó 3: `tolerancia_comprimento_pct` de `15` para `25`; nó 4: `aceleracao_maxima` para `1.2` |
| Falas atropelam umas às outras | Nó 4: `modo_sincronia = natural_com_deslocamento` **e** nó 6b: `duracao_final = manter_audio_completo` |
| Música de fundo alta demais | Nó 5b: `ganho_fundo_db` de `-6` para `-12` |
| Quero ouvir um pouco do original | Nó 5b: `ganho_original_db` de `-60` para `-25` |
| Legenda queimada na imagem | Nó 6b: `legendas = queimada_no_video` |

O nó 4 imprime um relatório linha a linha mostrando quais falas estouraram a
janela de tempo — use-o para saber o que ajustar em vez de chutar.

---

## Parte 9 — Conferir antes de gastar tempo

O nó **Conferir falas e traducao** mostra a transcrição e a tradução lado a lado.
Se a transcrição vier ruim (nomes próprios errados, jargão técnico), preencha
`prompt_inicial` no nó 2 com esses termos — melhora bastante a grafia:

```
Kubernetes, Grafana, Prometheus, DevOps, SRE
```

---

## Erros e o que fazer

| Mensagem | Solução |
|---|---|
| `ffmpeg nao foi encontrado` | Parte 1 deste guia; reinicie o ComfyUI depois de ajustar o PATH |
| `yt-dlp nao encontrado` | `<seu-python> -m pip install -U yt-dlp` |
| `yt-dlp falhou ao baixar` | Rode `pip install -U yt-dlp` (o YouTube muda com frequência). Vídeo com restrição de idade/login: nó 1, `cookies_do_navegador = chrome` com a sessão logada |
| `CERTIFICATE_VERIFY_FAILED` / `self-signed certificate` ao baixar o modelo | Antivírus ou rede interceptando HTTPS. Desligue a "varredura HTTPS/SSL" do antivírus, baixe o modelo uma vez, religue. Alternativa: baixe pelo navegador e preencha `caminho_do_modelo` no nó 2 |
| `Nenhum backend de transcricao instalado` | `<seu-python> -m pip install faster-whisper` |
| Erro de cuDNN / CUDA na transcrição | Nó 2: `dispositivo = cpu` resolve na hora. Para manter a GPU: `python_embeded\python.exe -m pip install nvidia-cudnn-cu12` |
| `Cannot run the event loop while another loop is running` | Versao antiga dos nos. Substitua a pasta pelo ZIP atualizado (que inclui `utils/aio.py`) e reinicie o ComfyUI |
| Voz sai muda ou falha | O `edge-tts` precisa acessar `speech.platform.bing.com`. Em rede restrita, use `piper` ou `xtts_v2_clonagem` |
| `demucs falhou` | `pip install -U demucs`, ou nó 5a: `metodo = nenhuma` |
| `413 - Request Entity Too Large` | Você usou o botão de upload do nó 1. Não envie o vídeo pelo navegador — veja "Usando um vídeo do seu computador" abaixo |
| `O arquivo nao tem trilha de audio` | O vídeo baixado veio sem áudio; nó 1: `resolucao_maxima = 720` e tente de novo |
| Vídeo final sem imagem | Nó 6b: `modo_video = h264_recodificar` |
| Os nós não aparecem | Veja o terminal do ComfyUI na inicialização; confira a profundidade da pasta (Parte 2) |

---

## Onde ficam os arquivos

| O quê | Onde |
|---|---|
| Modelos do Whisper | `ComfyUI\models\faster-whisper\` |
| Cache (download, transcrição, clipes de voz) | `ComfyUI\dublagem_cache\` |
| Vídeo dublado e legendas | `ComfyUI\output\dublagem\` |

As duas primeiras são persistentes de propósito — sobrevivem a reiniciar o ComfyUI,
então o modelo não é baixado de novo e reexecutar o workflow aproveita o que já foi
feito. Pode apagar `dublagem_cache` à vontade quando quiser liberar espaço.

## Quanto tempo leva

Vídeo de 10 minutos, com GPU NVIDIA e `large-v3-turbo`:

| Etapa | Tempo |
|---|---|
| Download | 30 s – 2 min |
| Transcrição | ~1 min |
| Tradução | ~1 min |
| Voz neural | ~2 min |
| Demucs (se ligado) | ~2 min |
| Montagem final | ~30 s |

Só com CPU, use `modelo = small` ou `base` e `metodo = nenhuma`. Conte com algo
entre 3 e 5 vezes mais tempo.

---

## Uso responsável

Dublar conteúdo próprio, licenciado ou de domínio público é uso legítimo. Baixar e
republicar vídeo de terceiros pode violar direitos autorais e os termos da
plataforma, e clonar a voz de uma pessoa real exige o consentimento dela.
