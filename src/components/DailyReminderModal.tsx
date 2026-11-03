import React, { useState } from 'react';
import { X, Bell, Clock, Send } from 'lucide-react';
import {
  getReminderConfig,
  saveReminderConfig,
  requestNotificationPermission,
  triggerStudyNotification,
  ReminderConfig,
} from '../utils/notifications';
import { sounds } from '../utils/soundEffects';
import { Language, Translations } from '../utils/i18n';

interface DailyReminderModalProps {
  onClose: () => void;
  onToast: (msg: string) => void;
  t: Translations;
  lang: Language;
}

export const DailyReminderModal: React.FC<DailyReminderModalProps> = ({
  onClose,
  onToast,
  t,
  lang,
}) => {
  const [config, setConfig] = useState<ReminderConfig>(getReminderConfig);
  const [permission, setPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  const handleRequestPermission = async () => {
    sounds.playClick();
    const perm = await requestNotificationPermission();
    setPermission(perm);
    if (perm === 'granted') {
      const successMsg = lang === 'ru' ? 'Уведомления успешно включены!' : '¡Notificaciones activadas con éxito!';
      onToast(successMsg);
      triggerStudyNotification(
        lang === 'ru' ? '🎉 Уведомления включены!' : '🎉 ¡Notificaciones activadas!',
        lang === 'ru'
          ? `Вы будете получать ежедневное напоминание в ${config.time} для практики с дробями.`
          : `Recibirás un recordatorio diario a las ${config.time} para entrenar tus fracciones.`
      );
    } else {
      onToast(lang === 'ru' ? 'Разрешение на уведомления отклонено в браузере.' : 'Permiso de notificaciones denegado en el navegador.');
    }
  };

  const handleSave = () => {
    sounds.playCorrect();
    saveReminderConfig(config);
    onToast(lang === 'ru' ? `Напоминание установлено ежедневно в ${config.time}.` : `Recordatorio programado diariamente a las ${config.time}.`);
    onClose();
  };

  const handleTestNotification = () => {
    sounds.playClick();
    const nativeTriggered = triggerStudyNotification(
      lang === 'ru' ? '🍕 Дроби: Пора на тренировку!' : '🍕 FraccionaMente: ¡Prueba de Recordatorio!',
      lang === 'ru'
        ? 'Время порешать примеры! Решите 3 задачи, чтобы не потерять серию дней.'
        : '¡Es hora de practicar fracciones! Resuelve 3 retos rápidos para mantener tu racha.'
    );
    if (nativeTriggered) {
      onToast(lang === 'ru' ? 'Системное уведомление отправлено.' : 'Notificación nativa enviada al sistema.');
    } else {
      onToast(lang === 'ru' ? 'Тестовое уведомление показано на экране.' : 'Recordatorio simulado (enviado como alerta en pantalla).');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.reminderTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.reminderDesc}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Browser Permission Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {t.browserPermission}
            </span>
            <span
              className={`font-extrabold px-2 py-0.5 rounded-full ${
                permission === 'granted'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                  : permission === 'denied'
                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
              }`}
            >
              {permission === 'granted' ? t.permGranted : permission === 'denied' ? t.permDenied : t.permDefault}
            </span>
          </div>

          {permission !== 'granted' && (
            <button
              onClick={handleRequestPermission}
              className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
            >
              {t.requestPermBtn}
            </button>
          )}
        </div>

        {/* Configuration settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {t.enableDailyReminder}
            </span>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={e => setConfig({ ...config, enabled: e.target.checked })}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              {t.reminderTimeLabel}
            </label>
            <input
              type="time"
              value={config.time}
              onChange={e => setConfig({ ...config, time: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Test Notification Button */}
        <button
          type="button"
          onClick={handleTestNotification}
          className="w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition"
        >
          <Send className="w-3.5 h-3.5 text-indigo-500" />
          <span>{t.testNotifBtn}</span>
        </button>

        {/* Save button */}
        <div className="pt-2">
          <button
            onClick={handleSave}
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
          >
            {t.saveConfig}
          </button>
        </div>
      </div>
    </div>
  );
};
