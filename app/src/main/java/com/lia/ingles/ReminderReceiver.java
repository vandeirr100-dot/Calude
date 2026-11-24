package com.lia.ingles;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;

import java.util.Calendar;

/** Lembrete diário de revisão (repetição espaçada). */
public class ReminderReceiver extends BroadcastReceiver {
    static final String PREFS = "lia_reminder";
    static final String CHANNEL = "lia_daily";

    @Override
    public void onReceive(Context ctx, Intent intent) {
        SharedPreferences p = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        if (!p.getBoolean("enabled", false)) return;
        String title = p.getString("title", "Hora do inglês com a Lia!");
        String text = p.getString("text", "5 minutinhos de revisão hoje?");
        NotificationManager nm = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        nm.createNotificationChannel(new NotificationChannel(CHANNEL, "Lembrete diário", NotificationManager.IMPORTANCE_DEFAULT));
        Intent open = new Intent(ctx, MainActivity.class);
        open.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        open.putExtra("from", "reminder");
        PendingIntent pi = PendingIntent.getActivity(ctx, 2, open, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        Notification n = new Notification.Builder(ctx, CHANNEL)
                .setSmallIcon(R.drawable.ic_notif)
                .setContentTitle(title)
                .setContentText(text)
                .setStyle(new Notification.BigTextStyle().bigText(text))
                .setContentIntent(pi)
                .setAutoCancel(true)
                .build();
        try { nm.notify(1001, n); } catch (SecurityException ignored) { }
    }

    static void schedule(Context ctx, boolean enabled, int hour, int minute, String title, String text) {
        SharedPreferences.Editor e = ctx.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit();
        e.putBoolean("enabled", enabled).putString("title", title).putString("text", text).apply();
        AlarmManager am = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);
        Intent i = new Intent(ctx, ReminderReceiver.class);
        PendingIntent pi = PendingIntent.getBroadcast(ctx, 1, i, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        am.cancel(pi);
        if (!enabled) return;
        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, hour);
        c.set(Calendar.MINUTE, minute);
        c.set(Calendar.SECOND, 0);
        if (c.getTimeInMillis() <= System.currentTimeMillis() + 60000) c.add(Calendar.DAY_OF_YEAR, 1);
        am.setInexactRepeating(AlarmManager.RTC_WAKEUP, c.getTimeInMillis(), AlarmManager.INTERVAL_DAY, pi);
    }
}
