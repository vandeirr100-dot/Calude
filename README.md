# Lia Inglês 🇺🇸

App Android para aprender inglês com a **Lia**, uma professora 3D que conversa com você por voz e
**vê pela câmera o que você está fazendo**, ensinando palavras e frases do seu dia a dia.

## Baixar e instalar

1. No celular, abra: **https://github.com/vandeirr100-dot/calude/releases/latest/download/LiaIngles.apk**
2. Toque no arquivo baixado → permita "instalar apps desconhecidos" se o Android pedir → **Instalar**.
3. Abra a Lia, toque em **Configurar para começar** e cole sua chave de IA.

## Chave de IA (o "cérebro")

| Opção | Onde pegar | Custo |
|---|---|---|
| Google Gemini (padrão) | https://aistudio.google.com/apikey | tem cota gratuita |
| Anthropic Claude | https://console.anthropic.com/settings/keys | pago por uso |
| OpenAI | https://platform.openai.com/api-keys | pago por uso |

A chave fica salva só no celular. O avatar, a voz e o reconhecimento de fala rodam no próprio
aparelho (grátis). Só o texto da conversa e a foto do momento vão para a IA escolhida.

## Como funciona

- **Conversa ao vivo** (Gemini Live): voz humana, resposta em ~1 s, ela ouve sua pronúncia pelo som e atualiza a tela (frase para repetir, correção, nota) enquanto fala.
- **3 professores**: Lia, Maya e Ben.
- **Trilhas**: dia a dia, explorar a casa, restaurante, viagem, entrevista, compras, conhecer pessoas, médico, direções e revisão.
- **Revisão espaçada** com cartões e lembrete diário; **meta semanal**; **resumo** no fim de cada aula.
- **Economia**: só manda foto quando a cena muda; mostra o uso de tokens; modo gráfico leve.

- **Avatar 3D próprio**, feito 100% em código (three.js): piscadas, olhar, expressões e boca sincronizada com a fala.
- **Voz**: motor de fala do Android (inglês e português). Dá para escolher a voz nas Configurações.
- **Ouvir**: reconhecimento de voz do Android, com nota de pronúncia nas frases para repetir.
- **Câmera**: a cada fala sua (ou ao tocar em "O que estou fazendo?") a Lia recebe uma foto e ensina com base nela.
- **Minhas palavras**: as palavras novas ficam salvas para revisar depois.

## Estrutura

- `app/` – projeto Android (WebView + TTS + reconhecimento de voz + câmera).
- `web/` – interface, avatar 3D e lógica (empacotado em `app/src/main/assets/www`).
- `.github/workflows/build-apk.yml` – compila o APK a cada push e publica em *Releases*.

> A chave de assinatura (`app/lia.keystore`) é pública neste repositório para que os
> builds automáticos possam atualizar o app sem desinstalar. Instale só a partir das *Releases* deste repositório.
