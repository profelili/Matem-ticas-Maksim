// Web Push Notification & Daily Study Reminder Manager

export interface ReminderConfig {
  enabled: boolean;
  time: string; // "HH:MM" e.g. "17:00"
  lastTriggeredDate?: string;
}

const REMINDER_KEY = 'frac_daily_reminder_settings_v1';

export function getReminderConfig(): ReminderConfig {
  try {
    const raw = localStorage.getItem(REMINDER_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return {
    enabled: true,
    time: '18:00',
  };
}

export function saveReminderConfig(config: ReminderConfig) {
  try {
    localStorage.setItem(REMINDER_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save reminder config', e);
  }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }

  try {
    const perm = await Notification.requestPermission();
    return perm;
  } catch {
    return 'denied';
  }
}

export function triggerStudyNotification(title?: string, body?: string): boolean {
  const notifTitle = title || '🍕 FraccionaMente: ¡Hora del Reto Diario!';
  const notifBody = body || 'Mantén tu racha activa resolviendo 3 operaciones con fracciones hoy. ¡Tu cerebro te lo agradecerá!';

  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(notifTitle, {
        body: notifBody,
        icon: '/icon.svg',
        badge: '/icon.svg',
      });
      return true;
    } catch (e) {
      console.warn('Native notification failed, falling back to toast', e);
    }
  }

  // Fallback: Dispatched custom event for in-app toast
  const event = new CustomEvent('frac_in_app_notification', {
    detail: { title: notifTitle, body: notifBody, timestamp: Date.now() },
  });
  window.dispatchEvent(event);
  return false;
}
