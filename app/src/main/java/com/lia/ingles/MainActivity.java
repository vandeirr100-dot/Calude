package com.lia.ingles;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Insets;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.audiofx.LoudnessEnhancer;
import android.os.Build;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.speech.tts.Voice;
import android.util.Log;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowManager;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.webkit.WebViewAssetLoader;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Iterator;
import java.util.Locale;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {
    private static final String TAG = "Lia";
    private static final String HOST = "appassets.androidplatform.net";
    private static final int REQ_PERMS = 7;

    private WebView web;
    private TextToSpeech tts;
    private boolean ttsReady = false;
    private SpeechRecognizer recognizer;
    private final Handler main = new Handler(Looper.getMainLooper());
    private final ExecutorService pool = Executors.newCachedThreadPool();
    private PermissionRequest pendingWebPermission;
    private long lastLevelSent = 0;

    // voz: sintetiza em arquivo e toca como MÍDIA com reforço de volume (LoudnessEnhancer)
    private AudioManager audio;
    private MediaPlayer player;
    private LoudnessEnhancer enhancer;
    private int boostMb = 900;
    private String playingId = null;
    private final Map<String, SynthJob> jobs = new ConcurrentHashMap<>();

    private static class SynthJob {
        String text;
        File file;
        volatile int sampleRate = 0;
        volatile boolean direct = false;
        final List<int[]> ranges = Collections.synchronizedList(new ArrayList<>());
    }

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        // botões de volume controlam o volume de MÍDIA (é por onde a Lia fala)
        setVolumeControlStream(AudioManager.STREAM_MUSIC);
        audio = (AudioManager) getSystemService(AUDIO_SERVICE);
        getWindow().setStatusBarColor(Color.parseColor("#3d2216"));
        getWindow().setNavigationBarColor(Color.parseColor("#22130c"));

        WebView.setWebContentsDebuggingEnabled(true);
        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#2a1810"));
        web.setOverScrollMode(View.OVER_SCROLL_NEVER);
        final FrameLayout root = new FrameLayout(this);
        root.setBackgroundColor(Color.parseColor("#2a1810"));
        root.addView(web, new FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT));
        setContentView(root);
        if (Build.VERSION.SDK_INT >= 30) {
            // Android 15+ desenha atrás das barras do sistema: deixa espaço para elas
            root.setOnApplyWindowInsetsListener((v, insets) -> {
                Insets bars = insets.getInsets(WindowInsets.Type.systemBars() | WindowInsets.Type.displayCutout());
                v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
                return WindowInsets.CONSUMED;
            });
        }

        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setAllowFileAccess(false);
        s.setAllowContentAccess(false);
        s.setTextZoom(100);

        final WebViewAssetLoader loader = new WebViewAssetLoader.Builder()
                .setDomain(HOST)
                .addPathHandler("/assets/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        web.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return loader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri u = request.getUrl();
                if (HOST.equals(u.getHost())) return false;
                openExternal(u.toString());
                return true;
            }
        });

        web.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> {
                    if (hasPerm(Manifest.permission.CAMERA)) {
                        request.grant(request.getResources());
                    } else {
                        pendingWebPermission = request;
                        requestPermissions(new String[]{Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO}, REQ_PERMS);
                    }
                });
            }

            @Override
            public boolean onConsoleMessage(ConsoleMessage m) {
                Log.d(TAG, "js: " + m.message() + " @" + m.lineNumber());
                return true;
            }
        });

        web.addJavascriptInterface(new Bridge(), "Android");

        tts = new TextToSpeech(this, status -> {
            ttsReady = status == TextToSpeech.SUCCESS;
            if (ttsReady) {
                tts.setLanguage(Locale.US);
                tts.setAudioAttributes(new AudioAttributes.Builder()
                        .setUsage(AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                        .build());
                tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override public void onBeginSynthesis(String id, int sampleRateInHz, int audioFormat, int channelCount) {
                        SynthJob j = jobs.get(id);
                        if (j != null) j.sampleRate = sampleRateInHz;
                    }
                    @Override public void onStart(String id) {
                        SynthJob j = jobs.get(id);
                        if (j != null && !j.direct) return; // arquivo: o "start" vem quando começar a tocar
                        ttsEvent("start", id, 0, 0);
                    }
                    @Override public void onDone(String id) {
                        SynthJob j = jobs.get(id);
                        if (j != null && !j.direct) { main.post(() -> playJob(id)); return; }
                        jobs.remove(id);
                        ttsEvent("done", id, 0, 0);
                    }
                    @Override public void onError(String id) { handleTtsError(id); }
                    @Override public void onError(String id, int code) { handleTtsError(id); }
                    @Override public void onStop(String id, boolean interrupted) {
                        jobs.remove(id);
                        ttsEvent("stopped", id, 0, 0);
                    }
                    @Override public void onRangeStart(String id, int start, int end, int frame) {
                        SynthJob j = jobs.get(id);
                        if (j != null && !j.direct) { j.ranges.add(new int[]{start, end, frame}); return; }
                        ttsEvent("range", id, start, end);
                    }
                });
            }
        });

        if (!hasPerm(Manifest.permission.CAMERA) || !hasPerm(Manifest.permission.RECORD_AUDIO)) {
            requestPermissions(new String[]{Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO}, REQ_PERMS);
        }

        web.loadUrl("https://" + HOST + "/assets/www/index.html");
    }

    private void handleTtsError(String id) {
        SynthJob j = jobs.get(id);
        if (j != null && !j.direct) {
            // não deu para gerar arquivo: fala direto (sem reforço)
            j.direct = true;
            main.post(() -> speakDirect(id, j.text));
            return;
        }
        jobs.remove(id);
        ttsEvent("error", id, 0, 0);
    }

    private void ensureMediaAudio() {
        try {
            if (audio != null && audio.getMode() != AudioManager.MODE_NORMAL) audio.setMode(AudioManager.MODE_NORMAL);
        } catch (Exception ignored) { }
    }

    private void speakDirect(String id, String text) {
        ensureMediaAudio();
        Bundle params = new Bundle();
        params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, id);
        params.putFloat(TextToSpeech.Engine.KEY_PARAM_VOLUME, 1f);
        params.putInt(TextToSpeech.Engine.KEY_PARAM_STREAM, AudioManager.STREAM_MUSIC);
        int r = tts.speak(text, TextToSpeech.QUEUE_FLUSH, params, id);
        if (r != TextToSpeech.SUCCESS) { jobs.remove(id); ttsEvent("error", id, 0, 0); }
    }

    private void releasePlayer() {
        try { if (enhancer != null) enhancer.release(); } catch (Exception ignored) { }
        enhancer = null;
        if (player != null) {
            try { player.stop(); } catch (Exception ignored) { }
            try { player.release(); } catch (Exception ignored) { }
        }
        player = null;
    }

    private void finishJob(String id, String type) {
        if (id == null || !id.equals(playingId)) return;
        playingId = null;
        releasePlayer();
        SynthJob j = jobs.remove(id);
        if (j != null && j.file != null) { try { j.file.delete(); } catch (Exception ignored) { } }
        ttsEvent(type, id, 0, 0);
    }

    private void playJob(final String id) {
        final SynthJob j = jobs.get(id);
        if (j == null) return; // foi interrompida
        if (playingId != null) finishJob(playingId, "stopped");
        releasePlayer();
        try {
            final MediaPlayer p = new MediaPlayer();
            player = p;
            p.setAudioAttributes(new AudioAttributes.Builder()
                    .setUsage(AudioAttributes.USAGE_MEDIA)
                    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                    .build());
            p.setDataSource(j.file.getAbsolutePath());
            p.prepare();
            try {
                enhancer = new LoudnessEnhancer(p.getAudioSessionId());
                enhancer.setTargetGain(boostMb);
                enhancer.setEnabled(boostMb > 0);
            } catch (Exception e) {
                enhancer = null;
            }
            playingId = id;
            p.setOnCompletionListener(mp -> finishJob(id, "done"));
            p.setOnErrorListener((mp, what, extra) -> { finishJob(id, "error"); return true; });
            ensureMediaAudio();
            p.setVolume(1f, 1f);
            p.start();
            ttsEvent("start", id, 0, 0);
            // sincronia labial: dispara cada palavra no momento em que ela toca
            final List<int[]> rs;
            synchronized (j.ranges) { rs = new ArrayList<>(j.ranges); }
            final int dur = Math.max(1, p.getDuration());
            final int[] next = {0};
            main.post(new Runnable() {
                @Override public void run() {
                    if (player != p || !id.equals(playingId)) return;
                    int pos;
                    try { pos = p.getCurrentPosition(); } catch (Exception e) { return; }
                    while (next[0] < rs.size()) {
                        int[] r = rs.get(next[0]);
                        long t = (r[2] > 0 && j.sampleRate > 0)
                                ? (long) r[2] * 1000L / j.sampleRate
                                : (long) dur * r[0] / Math.max(1, j.text.length());
                        if (t > pos + 40) break;
                        ttsEvent("range", id, r[0], r[1]);
                        next[0]++;
                    }
                    main.postDelayed(this, 30);
                }
            });
        } catch (Exception e) {
            Log.e(TAG, "playJob", e);
            releasePlayer();
            playingId = null;
            j.direct = true;
            speakDirect(id, j.text);
        }
    }

    private boolean hasPerm(String p) {
        return checkSelfPermission(p) == PackageManager.PERMISSION_GRANTED;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (pendingWebPermission != null) {
            if (hasPerm(Manifest.permission.CAMERA)) pendingWebPermission.grant(pendingWebPermission.getResources());
            else pendingWebPermission.deny();
            pendingWebPermission = null;
        }
    }

    @SuppressWarnings("deprecation")
    @Override
    public void onBackPressed() {
        web.evaluateJavascript("(window.onNativeBack && window.onNativeBack()) ? 'yes' : 'no'", value -> {
            if (value == null || !value.contains("yes")) finish();
        });
    }

    @Override
    protected void onDestroy() {
        releasePlayer();
        try { if (tts != null) tts.shutdown(); } catch (Exception ignored) { }
        try { if (recognizer != null) recognizer.destroy(); } catch (Exception ignored) { }
        pool.shutdownNow();
        if (web != null) web.destroy();
        super.onDestroy();
    }

    // ---------- helpers de chamada ao JS ----------
    private void js(final String code) {
        main.post(() -> { if (web != null) web.evaluateJavascript(code, null); });
    }

    private static String q(String s) {
        return JSONObject.quote(s == null ? "" : s);
    }

    private void ttsEvent(String type, String id, int a, int b) {
        js("window.__nativeTts && window.__nativeTts(" + q(type) + "," + q(id) + "," + a + "," + b + ")");
    }

    private void sttEvent(String type, String data) {
        js("window.__nativeStt && window.__nativeStt(" + q(type) + "," + q(data) + ")");
    }

    private void openExternal(String url) {
        try {
            startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
        } catch (Exception e) {
            Toast.makeText(this, "Não consegui abrir o link", Toast.LENGTH_SHORT).show();
        }
    }

    private Voice pickVoice(Locale loc, String wanted) {
        try {
            Set<Voice> voices = tts.getVoices();
            if (voices == null) return null;
            if (wanted != null && !wanted.isEmpty()) {
                for (Voice v : voices) if (v.getName().equals(wanted)) return v;
            }
            // automático: prefere voz feminina local de boa qualidade no idioma
            Voice best = null;
            int bestScore = -1;
            String[] female = {"sfg", "tpf", "tpc", "female", "#female", "iob", "iog", "afh", "pt-br-x-pte", "pt-br-x-afs"};
            for (Voice v : voices) {
                Locale vl = v.getLocale();
                if (vl == null || !vl.getLanguage().equals(loc.getLanguage())) continue;
                int score = 0;
                if (vl.getCountry().equals(loc.getCountry())) score += 40;
                if (!v.isNetworkConnectionRequired()) score += 20;
                Set<String> feats = v.getFeatures();
                if (feats != null && feats.contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED)) score -= 100;
                score += v.getQuality() / 50;
                String n = v.getName().toLowerCase(Locale.ROOT);
                for (String f : female) if (n.contains(f)) { score += 15; break; }
                if (score > bestScore) { bestScore = score; best = v; }
            }
            return best;
        } catch (Exception e) {
            return null;
        }
    }

    private Intent recognizerIntent(String lang) {
        Intent i = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE, lang);
        i.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, lang);
        i.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        i.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 3);
        i.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, getPackageName());
        i.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS, 1500L);
        return i;
    }

    private final RecognitionListener listener = new RecognitionListener() {
        @Override public void onReadyForSpeech(Bundle params) { sttEvent("ready", ""); }
        @Override public void onBeginningOfSpeech() { sttEvent("begin", ""); }
        @Override public void onRmsChanged(float rmsdB) {
            long now = System.currentTimeMillis();
            if (now - lastLevelSent < 90) return;
            lastLevelSent = now;
            float lvl = Math.max(0f, Math.min(1f, (rmsdB + 2f) / 12f));
            sttEvent("level", String.valueOf(lvl));
        }
        @Override public void onBufferReceived(byte[] buffer) { }
        @Override public void onEndOfSpeech() { sttEvent("end", ""); }
        @Override public void onError(int error) {
            String code;
            switch (error) {
                case SpeechRecognizer.ERROR_NO_MATCH: code = "no_match"; break;
                case SpeechRecognizer.ERROR_SPEECH_TIMEOUT: code = "speech_timeout"; break;
                case SpeechRecognizer.ERROR_NETWORK:
                case SpeechRecognizer.ERROR_NETWORK_TIMEOUT: code = "network"; break;
                case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS: code = "permission"; break;
                case SpeechRecognizer.ERROR_RECOGNIZER_BUSY: code = "busy"; break;
                case SpeechRecognizer.ERROR_CLIENT: code = "client"; break;
                default: code = "error_" + error;
            }
            if (error == SpeechRecognizer.ERROR_RECOGNIZER_BUSY || error == SpeechRecognizer.ERROR_CLIENT) {
                try { if (recognizer != null) recognizer.destroy(); } catch (Exception ignored) { }
                recognizer = null;
            }
            sttEvent("error", code);
        }
        @Override public void onResults(Bundle results) {
            ArrayList<String> list = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            JSONArray arr = new JSONArray();
            if (list != null) for (String s : list) arr.put(s);
            if (arr.length() == 0) sttEvent("error", "no_match");
            else sttEvent("result", arr.toString());
        }
        @Override public void onPartialResults(Bundle partial) {
            ArrayList<String> list = partial.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
            if (list != null && !list.isEmpty() && list.get(0) != null && !list.get(0).isEmpty()) sttEvent("partial", list.get(0));
        }
        @Override public void onEvent(int eventType, Bundle params) { }
    };

    // ---------- ponte JavaScript ----------
    private class Bridge {
        @JavascriptInterface
        public String appVersion() {
            try {
                return getPackageManager().getPackageInfo(getPackageName(), 0).versionName;
            } catch (Exception e) {
                return "?";
            }
        }

        @JavascriptInterface
        public void openUrl(String url) {
            main.post(() -> openExternal(url));
        }

        @JavascriptInterface
        public void http(final String id, final String method, final String url, final String headersJson, final String body) {
            pool.execute(() -> {
                int code = 0;
                String text;
                HttpURLConnection c = null;
                try {
                    c = (HttpURLConnection) new URL(url).openConnection();
                    c.setRequestMethod(method);
                    c.setConnectTimeout(20000);
                    c.setReadTimeout(70000);
                    JSONObject h = new JSONObject(headersJson == null || headersJson.isEmpty() ? "{}" : headersJson);
                    Iterator<String> keys = h.keys();
                    while (keys.hasNext()) {
                        String k = keys.next();
                        c.setRequestProperty(k, h.getString(k));
                    }
                    if (body != null && !body.isEmpty()) {
                        c.setDoOutput(true);
                        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
                        c.setFixedLengthStreamingMode(bytes.length);
                        try (OutputStream os = c.getOutputStream()) { os.write(bytes); }
                    }
                    code = c.getResponseCode();
                    InputStream is = code >= 400 ? c.getErrorStream() : c.getInputStream();
                    text = readAll(is);
                } catch (Exception e) {
                    text = String.valueOf(e.getMessage());
                } finally {
                    if (c != null) c.disconnect();
                }
                js("window.__nativeHttp && window.__nativeHttp(" + q(id) + "," + code + "," + q(text) + ")");
            });
        }

        @JavascriptInterface
        public void speak(final String id, final String text, final String lang, final float rate, final String voiceName) {
            main.post(() -> {
                if (!ttsReady) { ttsEvent("error", id, 0, 0); return; }
                Locale loc = lang != null && lang.toLowerCase(Locale.ROOT).startsWith("pt") ? new Locale("pt", "BR") : Locale.US;
                Voice v = pickVoice(loc, loc.getLanguage().equals("en") ? voiceName : "");
                if (v != null) tts.setVoice(v); else tts.setLanguage(loc);
                tts.setSpeechRate(rate <= 0 ? 1f : rate);
                tts.setPitch(1.05f);
                SynthJob j = new SynthJob();
                j.text = text;
                j.file = new File(getCacheDir(), "tts_" + Integer.toHexString(id.hashCode()) + ".wav");
                jobs.put(id, j);
                Bundle params = new Bundle();
                params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, id);
                int r = tts.synthesizeToFile(text, params, j.file, id);
                if (r != TextToSpeech.SUCCESS) {
                    j.direct = true;
                    speakDirect(id, text);
                }
            });
        }

        @JavascriptInterface
        public void stopSpeak() {
            main.post(() -> {
                if (playingId != null) finishJob(playingId, "stopped");
                for (String k : new ArrayList<>(jobs.keySet())) {
                    jobs.remove(k);
                    ttsEvent("stopped", k, 0, 0);
                }
                if (ttsReady) tts.stop();
            });
        }

        @JavascriptInterface
        public void setBoost(int millibels) {
            boostMb = Math.max(0, Math.min(2000, millibels));
            main.post(() -> {
                try {
                    if (enhancer != null) { enhancer.setTargetGain(boostMb); enhancer.setEnabled(boostMb > 0); }
                } catch (Exception ignored) { }
            });
        }

        @JavascriptInterface
        public float mediaVolume() {
            try {
                int max = audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
                return max > 0 ? (float) audio.getStreamVolume(AudioManager.STREAM_MUSIC) / max : 1f;
            } catch (Exception e) {
                return 1f;
            }
        }

        @JavascriptInterface
        public void ensureAudible() {
            main.post(() -> {
                try {
                    ensureMediaAudio();
                    int max = audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
                    int cur = audio.getStreamVolume(AudioManager.STREAM_MUSIC);
                    if (cur < max * 0.6f) audio.setStreamVolume(AudioManager.STREAM_MUSIC, Math.round(max * 0.85f), AudioManager.FLAG_SHOW_UI);
                } catch (Exception ignored) { }
            });
        }

        @JavascriptInterface
        public String voices() {
            JSONArray arr = new JSONArray();
            try {
                if (ttsReady && tts.getVoices() != null) {
                    for (Voice v : tts.getVoices()) {
                        Locale l = v.getLocale();
                        if (l == null || !(l.getLanguage().equals("en") || l.getLanguage().equals("pt"))) continue;
                        Set<String> feats = v.getFeatures();
                        if (feats != null && feats.contains(TextToSpeech.Engine.KEY_FEATURE_NOT_INSTALLED)) continue;
                        JSONObject o = new JSONObject();
                        o.put("name", v.getName());
                        o.put("lang", l.getLanguage() + "-" + l.getCountry());
                        o.put("local", !v.isNetworkConnectionRequired());
                        arr.put(o);
                    }
                }
            } catch (Exception ignored) { }
            return arr.toString();
        }

        @JavascriptInterface
        public void listen(final String lang) {
            main.post(() -> {
                if (!hasPerm(Manifest.permission.RECORD_AUDIO)) {
                    requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, REQ_PERMS);
                    sttEvent("error", "permission");
                    return;
                }
                if (!SpeechRecognizer.isRecognitionAvailable(MainActivity.this)) {
                    sttEvent("error", "unavailable");
                    return;
                }
                try {
                    if (recognizer == null) {
                        recognizer = SpeechRecognizer.createSpeechRecognizer(MainActivity.this);
                        recognizer.setRecognitionListener(listener);
                    } else {
                        recognizer.cancel();
                    }
                    recognizer.startListening(recognizerIntent(lang == null || lang.isEmpty() ? "en-US" : lang));
                } catch (Exception e) {
                    Log.e(TAG, "listen", e);
                    try { if (recognizer != null) recognizer.destroy(); } catch (Exception ignored) { }
                    recognizer = null;
                    sttEvent("error", "client");
                }
            });
        }

        @JavascriptInterface
        public void stopListen() {
            main.post(() -> {
                try { if (recognizer != null) recognizer.cancel(); } catch (Exception ignored) { }
            });
        }
    }

    private static String readAll(InputStream is) throws Exception {
        if (is == null) return "";
        try (InputStream in = is; ByteArrayOutputStream bo = new ByteArrayOutputStream()) {
            byte[] buf = new byte[16384];
            int n;
            while ((n = in.read(buf)) > 0) bo.write(buf, 0, n);
            return new String(bo.toByteArray(), StandardCharsets.UTF_8);
        }
    }
}
