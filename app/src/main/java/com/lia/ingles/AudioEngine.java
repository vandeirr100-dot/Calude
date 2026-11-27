package com.lia.ingles;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioDeviceInfo;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioRecord;
import android.media.AudioTrack;
import android.media.MediaRecorder;
import android.media.audiofx.AcousticEchoCanceler;
import android.media.audiofx.AutomaticGainControl;
import android.media.audiofx.LoudnessEnhancer;
import android.media.audiofx.NoiseSuppressor;
import android.os.Build;
import android.util.Base64;
import android.util.Log;

import java.io.ByteArrayOutputStream;
import java.util.ArrayDeque;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Áudio de baixa latência para a conversa ao vivo:
 *  - microfone em blocos PCM 16 kHz (com cancelamento de eco quando disponível)
 *  - alto-falante em fluxo PCM (24 kHz da IA) com reforço de volume e nível para a boca do avatar
 *  - gravação com detecção de fim de fala para avaliar pronúncia pelo som
 */
public class AudioEngine {
    private static final String TAG = "LiaAudio";

    public interface Sink {
        void js(String code);
    }

    private final Context ctx;
    private final Sink sink;
    private final AudioManager am;

    public AudioEngine(Context ctx, Sink sink) {
        this.ctx = ctx;
        this.sink = sink;
        this.am = (AudioManager) ctx.getSystemService(Context.AUDIO_SERVICE);
    }

    private static String b64(byte[] b, int len) {
        return Base64.encodeToString(b, 0, len, Base64.NO_WRAP);
    }

    private static float rms16(byte[] b, int len) {
        long sum = 0;
        int n = len / 2;
        if (n == 0) return 0;
        for (int i = 0; i + 1 < len; i += 2) {
            int s = (short) ((b[i] & 0xff) | (b[i + 1] << 8));
            sum += (long) s * s;
        }
        return (float) Math.sqrt((double) sum / n);
    }

    private static float levelOf(float rms) {
        // 0..1 aproximado (fala normal ~ 0.3–0.8)
        float db = (float) (20 * Math.log10(Math.max(1, rms)));
        return Math.max(0f, Math.min(1f, (db - 38f) / 42f));
    }

    // ================= modo de áudio (viva-voz de chamada x mídia) =================
    private boolean callMode = false;

    public synchronized void setCallMode(boolean on) {
        if (on == callMode) return;
        callMode = on;
        try {
            if (on) {
                am.setMode(AudioManager.MODE_IN_COMMUNICATION);
                boolean headset = false;
                if (Build.VERSION.SDK_INT >= 31) {
                    List<AudioDeviceInfo> devs = am.getAvailableCommunicationDevices();
                    AudioDeviceInfo speaker = null;
                    for (AudioDeviceInfo d : devs) {
                        int t = d.getType();
                        if (t == AudioDeviceInfo.TYPE_WIRED_HEADSET || t == AudioDeviceInfo.TYPE_WIRED_HEADPHONES
                                || t == AudioDeviceInfo.TYPE_BLUETOOTH_SCO || t == AudioDeviceInfo.TYPE_USB_HEADSET
                                || t == AudioDeviceInfo.TYPE_BLE_HEADSET) headset = true;
                        if (t == AudioDeviceInfo.TYPE_BUILTIN_SPEAKER) speaker = d;
                    }
                    if (!headset && speaker != null) am.setCommunicationDevice(speaker);
                } else {
                    //noinspection deprecation
                    am.setSpeakerphoneOn(!am.isWiredHeadsetOn());
                }
            } else {
                if (Build.VERSION.SDK_INT >= 31) am.clearCommunicationDevice();
                else {
                    //noinspection deprecation
                    am.setSpeakerphoneOn(false);
                }
                am.setMode(AudioManager.MODE_NORMAL);
            }
        } catch (Exception e) {
            Log.w(TAG, "setCallMode", e);
        }
    }

    public boolean isCallMode() {
        return callMode;
    }

    // ================= alto-falante em fluxo =================
    private AudioTrack track;
    private LoudnessEnhancer enhancer;
    private int boostMb = 900;
    private long framesWritten = 0;
    private final ArrayDeque<long[]> marks = new ArrayDeque<>(); // {frameEnd, level*1000}
    private final Object lock = new Object();
    private final ExecutorService writer = Executors.newSingleThreadExecutor();
    private Thread monitor;
    private volatile boolean monitorRun = false;
    private volatile int monitorGen = 0;
    private volatile boolean playing = false;
    private volatile long lastPlayEnd = 0;
    private String tag = "live";
    private int lastRate = 24000;
    private boolean lastCall = false;

    public void setBoost(int mb) {
        boostMb = Math.max(0, Math.min(2000, mb));
        synchronized (lock) {
            try {
                if (enhancer != null) {
                    enhancer.setTargetGain(boostMb);
                    enhancer.setEnabled(boostMb > 0);
                }
            } catch (Exception ignored) { }
        }
    }

    public boolean isPlaying() {
        return playing || System.currentTimeMillis() - lastPlayEnd < 350;
    }

    public void playerOpen(int rate, boolean call, String tagName) {
        playerClose();
        lastRate = rate;
        lastCall = call;
        tag = tagName == null ? "live" : tagName;
        synchronized (lock) {
            try {
                int min = AudioTrack.getMinBufferSize(rate, AudioFormat.CHANNEL_OUT_MONO, AudioFormat.ENCODING_PCM_16BIT);
                int size = Math.max(min * 4, rate); // ~0,5 s
                AudioAttributes attrs = new AudioAttributes.Builder()
                        .setUsage(call ? AudioAttributes.USAGE_VOICE_COMMUNICATION : AudioAttributes.USAGE_MEDIA)
                        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                        .build();
                AudioFormat fmt = new AudioFormat.Builder()
                        .setSampleRate(rate)
                        .setEncoding(AudioFormat.ENCODING_PCM_16BIT)
                        .setChannelMask(AudioFormat.CHANNEL_OUT_MONO)
                        .build();
                track = new AudioTrack.Builder()
                        .setAudioAttributes(attrs)
                        .setAudioFormat(fmt)
                        .setBufferSizeInBytes(size)
                        .setTransferMode(AudioTrack.MODE_STREAM)
                        .build();
                try {
                    enhancer = new LoudnessEnhancer(track.getAudioSessionId());
                    enhancer.setTargetGain(boostMb);
                    enhancer.setEnabled(boostMb > 0);
                } catch (Exception e) {
                    enhancer = null;
                }
                track.play();
                framesWritten = 0;
                marks.clear();
            } catch (Exception e) {
                Log.e(TAG, "playerOpen", e);
                track = null;
            }
        }
        startMonitor();
    }

    public void playerWrite(final byte[] pcm) {
        final AudioTrack t;
        synchronized (lock) {
            t = track;
            if (t == null) return;
            int frames = pcm.length / 2;
            framesWritten += frames;
            marks.add(new long[]{framesWritten, Math.round(levelOf(rms16(pcm, pcm.length)) * 1000)});
            playing = true;
        }
        writer.execute(() -> {
            synchronized (lock) {
                if (t != track) return;
            }
            try {
                int off = 0;
                while (off < pcm.length) {
                    synchronized (lock) {
                        if (t != track) return;
                    }
                    int w = t.write(pcm, off, pcm.length - off);
                    if (w <= 0) break;
                    off += w;
                }
            } catch (Exception ignored) { }
        });
    }

    /** Interrompe a fala na hora (descarta o que ainda não tocou). */
    public void playerFlush() {
        boolean wasPlaying = playing;
        playerOpen(lastRate, lastCall, tag);
        playing = false;
        lastPlayEnd = System.currentTimeMillis();
        if (wasPlaying) emit("drained", 0);
    }

    public void playerClose() {
        monitorRun = false;
        synchronized (lock) {
            try { if (enhancer != null) enhancer.release(); } catch (Exception ignored) { }
            enhancer = null;
            if (track != null) {
                try { track.pause(); track.flush(); } catch (Exception ignored) { }
                try { track.release(); } catch (Exception ignored) { }
            }
            track = null;
            marks.clear();
            framesWritten = 0;
        }
        playing = false;
    }

    private void emit(String type, float v) {
        sink.js("window.__nativeAudio&&window.__nativeAudio('" + type + "'," + v + ",'" + tag + "')");
    }

    private void startMonitor() {
        monitorRun = true;
        final int gen = ++monitorGen;
        final Thread th = new Thread(() -> {
            float lastSent = -1;
            while (monitorRun && gen == monitorGen) {
                try { Thread.sleep(33); } catch (InterruptedException e) { return; }
                long head;
                float level = 0;
                boolean drainedNow = false;
                synchronized (lock) {
                    if (track == null) continue;
                    try { head = track.getPlaybackHeadPosition() & 0xffffffffL; } catch (Exception e) { continue; }
                    while (!marks.isEmpty() && marks.peek()[0] <= head) marks.poll();
                    if (!marks.isEmpty()) level = marks.peek()[1] / 1000f;
                    if (playing && head >= framesWritten) {
                        playing = false;
                        lastPlayEnd = System.currentTimeMillis();
                        drainedNow = true;
                    }
                }
                if (playing && Math.abs(level - lastSent) > 0.02f) {
                    emit("level", level);
                    lastSent = level;
                } else if (!playing && lastSent != 0) {
                    emit("level", 0);
                    lastSent = 0;
                }
                if (drainedNow) emit("drained", 0);
            }
        }, "lia-audio-monitor");
        monitor = th;
        th.start();
    }

    // ================= microfone em fluxo =================
    private volatile boolean micRun = false;
    private Thread micThread;

    public void micStart(final boolean call, final boolean halfDuplex, final int chunkMs) {
        micStop();
        micRun = true;
        micThread = new Thread(() -> {
            AudioRecord rec = null;
            AcousticEchoCanceler aec = null;
            NoiseSuppressor ns = null;
            AutomaticGainControl agc = null;
            try {
                int rate = 16000;
                int samples = rate * Math.max(20, Math.min(250, chunkMs)) / 1000;
                int min = AudioRecord.getMinBufferSize(rate, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT);
                int src = call ? MediaRecorder.AudioSource.VOICE_COMMUNICATION : MediaRecorder.AudioSource.VOICE_RECOGNITION;
                rec = new AudioRecord(src, rate, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT, Math.max(min * 2, samples * 4));
                int sid = rec.getAudioSessionId();
                if (call) {
                    try { if (AcousticEchoCanceler.isAvailable()) { aec = AcousticEchoCanceler.create(sid); if (aec != null) aec.setEnabled(true); } } catch (Exception ignored) { }
                    try { if (NoiseSuppressor.isAvailable()) { ns = NoiseSuppressor.create(sid); if (ns != null) ns.setEnabled(true); } } catch (Exception ignored) { }
                    try { if (AutomaticGainControl.isAvailable()) { agc = AutomaticGainControl.create(sid); if (agc != null) agc.setEnabled(true); } } catch (Exception ignored) { }
                }
                rec.startRecording();
                sink.js("window.__nativeMic&&window.__nativeMic('','0','start'," + (aec != null) + ")");
                byte[] buf = new byte[samples * 2];
                while (micRun) {
                    int off = 0;
                    while (off < buf.length && micRun) {
                        int r = rec.read(buf, off, buf.length - off);
                        if (r <= 0) break;
                        off += r;
                    }
                    if (!micRun) break;
                    float lvl = levelOf(rms16(buf, off));
                    if (halfDuplex && isPlaying()) {
                        java.util.Arrays.fill(buf, (byte) 0);
                        lvl = 0;
                    }
                    sink.js("window.__nativeMic&&window.__nativeMic('" + b64(buf, off) + "','" + lvl + "','data')");
                }
            } catch (SecurityException e) {
                sink.js("window.__nativeMic&&window.__nativeMic('','0','permission')");
            } catch (Exception e) {
                Log.e(TAG, "mic", e);
                sink.js("window.__nativeMic&&window.__nativeMic('','0','error')");
            } finally {
                try { if (rec != null) { rec.stop(); rec.release(); } } catch (Exception ignored) { }
                try { if (aec != null) aec.release(); } catch (Exception ignored) { }
                try { if (ns != null) ns.release(); } catch (Exception ignored) { }
                try { if (agc != null) agc.release(); } catch (Exception ignored) { }
            }
        }, "lia-mic");
        micThread.start();
    }

    public void micStop() {
        micRun = false;
        Thread t = micThread;
        micThread = null;
        if (t != null) {
            try { t.join(400); } catch (InterruptedException ignored) { }
        }
    }

    // ================= gravação para avaliar pronúncia =================
    private volatile boolean recRun = false;
    private volatile boolean recStopNow = false;

    public void recordStart(final int maxMs) {
        recordCancel();
        micStop();
        recRun = true;
        recStopNow = false;
        new Thread(() -> {
            AudioRecord rec = null;
            try {
                int rate = 16000;
                int frame = rate * 30 / 1000; // 30 ms
                int min = AudioRecord.getMinBufferSize(rate, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT);
                rec = new AudioRecord(MediaRecorder.AudioSource.VOICE_RECOGNITION, rate, AudioFormat.CHANNEL_IN_MONO,
                        AudioFormat.ENCODING_PCM_16BIT, Math.max(min * 2, frame * 8));
                rec.startRecording();
                sink.js("window.__nativeRec&&window.__nativeRec('ready','')");
                ByteArrayOutputStream all = new ByteArrayOutputStream();
                byte[] buf = new byte[frame * 2];
                long t0 = System.currentTimeMillis();
                float noise = 0;
                int noiseN = 0;
                int loud = 0;
                boolean speech = false;
                long speechStartByte = 0;
                long lastVoice = 0;
                long lastLevel = 0;
                while (recRun) {
                    int off = 0;
                    while (off < buf.length && recRun) {
                        int r = rec.read(buf, off, buf.length - off);
                        if (r <= 0) break;
                        off += r;
                    }
                    all.write(buf, 0, off);
                    float rms = rms16(buf, off);
                    long now = System.currentTimeMillis();
                    long el = now - t0;
                    if (el < 300) { noise += rms; noiseN++; continue; }
                    float floor = noiseN > 0 ? noise / noiseN : 200;
                    float thr = Math.max(450, floor * 2.6f);
                    if (now - lastLevel > 80) {
                        sink.js("window.__nativeRec&&window.__nativeRec('level','" + levelOf(rms) + "')");
                        lastLevel = now;
                    }
                    if (rms > thr) {
                        loud++;
                        if (!speech && loud >= 3) {
                            speech = true;
                            speechStartByte = Math.max(0, all.size() - (long) buf.length * 10); // ~300 ms antes
                            sink.js("window.__nativeRec&&window.__nativeRec('speech','')");
                        }
                        lastVoice = now;
                    } else {
                        loud = 0;
                    }
                    if (recStopNow) break;
                    if (!speech && el > 7000) break;
                    if (speech && now - lastVoice > 700) break;
                    if (el > maxMs) break;
                }
                rec.stop();
                if (!recRun) return; // cancelado
                recRun = false;
                if (!speech) {
                    sink.js("window.__nativeRec&&window.__nativeRec('none','')");
                    return;
                }
                byte[] pcm = all.toByteArray();
                int start = (int) Math.min(speechStartByte, pcm.length);
                start -= start % 2;
                byte[] wav = wav(pcm, start, pcm.length - start, rate);
                sink.js("window.__nativeRec&&window.__nativeRec('done','" + b64(wav, wav.length) + "')");
            } catch (SecurityException e) {
                sink.js("window.__nativeRec&&window.__nativeRec('error','permission')");
            } catch (Exception e) {
                Log.e(TAG, "record", e);
                sink.js("window.__nativeRec&&window.__nativeRec('error','" + e.getClass().getSimpleName() + "')");
            } finally {
                try { if (rec != null) rec.release(); } catch (Exception ignored) { }
                recRun = false;
            }
        }, "lia-rec").start();
    }

    /** Termina a gravação agora (envia o que já foi falado). */
    public void recordStop() {
        recStopNow = true;
    }

    public void recordCancel() {
        recRun = false;
    }

    private static byte[] wav(byte[] pcm, int off, int len, int rate) {
        byte[] out = new byte[44 + len];
        int byteRate = rate * 2;
        writeStr(out, 0, "RIFF");
        writeInt(out, 4, 36 + len);
        writeStr(out, 8, "WAVE");
        writeStr(out, 12, "fmt ");
        writeInt(out, 16, 16);
        out[20] = 1; out[21] = 0;   // PCM
        out[22] = 1; out[23] = 0;   // mono
        writeInt(out, 24, rate);
        writeInt(out, 28, byteRate);
        out[32] = 2; out[33] = 0;   // block align
        out[34] = 16; out[35] = 0;  // bits
        writeStr(out, 36, "data");
        writeInt(out, 40, len);
        System.arraycopy(pcm, off, out, 44, len);
        return out;
    }

    private static void writeStr(byte[] b, int at, String s) {
        for (int i = 0; i < s.length(); i++) b[at + i] = (byte) s.charAt(i);
    }

    private static void writeInt(byte[] b, int at, int v) {
        b[at] = (byte) v; b[at + 1] = (byte) (v >> 8); b[at + 2] = (byte) (v >> 16); b[at + 3] = (byte) (v >> 24);
    }

    public void release() {
        micStop();
        recordCancel();
        playerClose();
        setCallMode(false);
        writer.shutdownNow();
    }
}
