@echo off
setlocal enabledelayedexpansion
title Instalador da clonagem de voz - Dublagem IA

echo ============================================================
echo   INSTALADOR DA CLONAGEM DE VOZ (coqui-tts / XTTS-v2)
echo ============================================================
echo.
echo Este instalador vai:
echo   1. Achar o Python do seu ComfyUI
echo   2. Anotar a versao atual do PyTorch
echo   3. Instalar o coqui-tts
echo   4. Conferir se o PyTorch continua intacto (e restaurar, se preciso)
echo   5. Baixar o modelo de voz, se voce quiser
echo.
pause
echo.

rem ---------------------------------------------- achar o python ------------
set "PY="
for %%P in (
  "%~dp0python_embeded\python.exe"
  "%~dp0..\python_embeded\python.exe"
  "%~dp0..\..\python_embeded\python.exe"
  "%~dp0..\..\..\python_embeded\python.exe"
  "%~dp0..\..\..\..\python_embeded\python.exe"
  "%USERPROFILE%\Downloads\ComfyUI_windows_portable_nvidia_cu126\ComfyUI_windows_portable\python_embeded\python.exe"
) do (
  if not defined PY if exist "%%~fP" set "PY=%%~fP"
)

if not defined PY (
  echo [ERRO] Nao encontrei o Python do ComfyUI.
  echo.
  echo Copie este arquivo para dentro da pasta ComfyUI_windows_portable
  echo e execute de novo.
  echo.
  pause
  exit /b 1
)

echo [1/5] Python do ComfyUI encontrado:
echo       !PY!
echo.

rem ------------------------------------------ versao atual do torch ---------
echo [2/5] Verificando o PyTorch atual...
set "ANTES=ausente"
"!PY!" -c "import torch;print(torch.__version__+'|'+str(torch.cuda.is_available()))" > "%TEMP%\dub_torch_antes.txt" 2>nul
if exist "%TEMP%\dub_torch_antes.txt" set /p ANTES=<"%TEMP%\dub_torch_antes.txt"
echo       Antes da instalacao: !ANTES!
echo.

rem -------------------------------------------------- instalar --------------
echo [3/5] Instalando coqui-tts. Isso pode levar varios minutos...
echo.
"!PY!" -m pip install coqui-tts
if errorlevel 1 (
  echo.
  echo [ERRO] A instalacao falhou. A mensagem do erro esta logo acima.
  echo Se falar em rede ou certificado, desligue a varredura HTTPS do antivirus
  echo e rode este instalador de novo.
  echo.
  pause
  exit /b 1
)
echo.

rem ------------------------------------------- conferir o torch -------------
echo [4/5] Conferindo se o PyTorch continua intacto...
set "DEPOIS=quebrado"
"!PY!" -c "import torch;print(torch.__version__+'|'+str(torch.cuda.is_available()))" > "%TEMP%\dub_torch_depois.txt" 2>nul
if exist "%TEMP%\dub_torch_depois.txt" set /p DEPOIS=<"%TEMP%\dub_torch_depois.txt"
echo       Depois da instalacao: !DEPOIS!
echo.

if "!ANTES!"=="!DEPOIS!" (
  echo       OK - o PyTorch nao foi alterado.
  echo.
  goto modelo
)

echo ============================================================
echo   ATENCAO: o PyTorch mudou.
echo   Antes:  !ANTES!
echo   Depois: !DEPOIS!
echo.
echo   Isso pode fazer o ComfyUI parar de usar a placa de video.
echo ============================================================
echo.
set "RESP="
set /p RESP="Restaurar a versao original com CUDA agora? (s/n): "
if /i "!RESP!"=="s" (
  echo.
  echo Restaurando o PyTorch com CUDA 12.6...
  "!PY!" -m pip install --force-reinstall torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
  echo.
  "!PY!" -c "import torch;print('PyTorch agora: '+torch.__version__+' | CUDA: '+str(torch.cuda.is_available()))"
  echo.
)

:modelo
echo [5/5] Baixar agora o modelo de voz XTTS-v2 (cerca de 1.8 GB)?
echo.
echo       Baixar agora e melhor do que descobrir um erro de rede
echo       no meio de uma dublagem longa.
echo       O Coqui vai pedir que voce aceite a licenca dele - leia e responda.
echo.
set "BAIXAR="
set /p BAIXAR="Baixar o modelo agora? (s/n): "
if /i "!BAIXAR!"=="s" (
  echo.
  echo Baixando... isso demora. Nao feche esta janela.
  echo.
  set "BAIXADOR="
  for %%D in (
    "%~dp0ComfyUI\custom_nodes\comfyui-youtube-dubbing\ferramentas\baixar_modelo_xtts.py"
    "%~dp0..\ComfyUI\custom_nodes\comfyui-youtube-dubbing\ferramentas\baixar_modelo_xtts.py"
    "%USERPROFILE%\Downloads\ComfyUI_windows_portable_nvidia_cu126\ComfyUI_windows_portable\ComfyUI\custom_nodes\comfyui-youtube-dubbing\ferramentas\baixar_modelo_xtts.py"
  ) do (
    if not defined BAIXADOR if exist "%%~fD" set "BAIXADOR=%%~fD"
  )
  if defined BAIXADOR (
    "!PY!" "!BAIXADOR!"
  ) else (
    echo [AVISO] Nao achei o script de download no pacote.
    echo         Sem problema: o modelo sera baixado sozinho no primeiro uso.
  )
  echo.
)

echo ============================================================
echo   CONCLUIDO
echo ============================================================
echo.
echo Agora:
echo   1. Feche o ComfyUI por completo
echo   2. Abra de novo
echo   3. No no 4, o motor xtts_v2_clonagem ja vai funcionar
echo.
pause
