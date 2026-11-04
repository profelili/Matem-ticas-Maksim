import React from 'react';
import { Volume2, VolumeX, Moon, Sun, Bell, Flame, Globe, Sparkles } from 'lucide-react';
import { UserProfile } from '../types/fractions';
import { AVATARS } from '../utils/storage';
import { Language, Translations } from '../utils/i18n';
import { PWAInstallPrompt } from './PWAInstallPrompt';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  profile: UserProfile;
  onOpenProfile: () => void;
  onOpenReminder: () => void;
  onOpenPromo: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  lang: Language;
  onToggleLanguage: () => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  profile,
  onOpenProfile,
  onOpenReminder,
  onOpenPromo,
  soundEnabled,
  onToggleSound,
  isDarkMode,
  onToggleTheme,
  lang,
  onToggleLanguage,
  t,
}) => {
  const avatarObj = AVATARS.find(a => a.id === profile.avatar) || AVATARS[0];

  const navItems = [
    { id: 'laboratorio', label: t.navLab },
    { id: 'aventura', label: t.navAdventure },
    { id: 'contrarrelj', label: t.navTimeAttack },
    { id: 'errores', label: t.navMistakes },
    { id: 'estadisticas', label: t.navStats },
    { id: 'logros', label: t.navAchievements },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onTabChange('laboratorio')}
          className="text-base sm:text-xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400 whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 hover:opacity-90 transition-opacity active:scale-95"
        >
          <span className="text-xl sm:text-2xl">🍕</span>
          <span className="truncate max-w-[130px] sm:max-w-none">{t.appName}</span>
        </button>

        {/* Zone 2: Navigation Links for Desktop (hidden on mobile, replaced by MobileTabBar) */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold border-indigo-600 dark:border-indigo-400'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Quick Profile status */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <PWAInstallPrompt />

          {/* Language Switcher Toggle */}
          <button
            onClick={onToggleLanguage}
            aria-label={t.changeLang}
            title={t.changeLang}
            className="flex items-center gap-1 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 transition active:scale-95 min-h-[36px]"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span className="tabular-nums uppercase">{lang === 'es' ? 'RU 🇷🇺' : 'ES 🇪🇸'}</span>
          </button>

          {/* Daily Streak Indicator (Hidden on extra small screens) */}
          <div
            className="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 text-xs font-semibold tabular-nums"
            title={`${t.streakLabel}: ${profile.stats.dailyStreakDays} ${t.daysLabel}`}
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{profile.stats.dailyStreakDays}{t.daysLabel}</span>
          </div>

          {/* Daily Reminder Button (Desktop/Tablet) */}
          <button
            onClick={onOpenReminder}
            aria-label={t.dailyReminderTooltip}
            title={t.dailyReminderTooltip}
            className="hidden sm:flex p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition min-w-[36px] min-h-[36px] items-center justify-center active:scale-95"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Promo Kit / Logo Button */}
          <button
            onClick={onOpenPromo}
            aria-label={lang === 'ru' ? 'Логотип и промо-материалы' : 'Kit Logo Promocional'}
            title={lang === 'ru' ? 'Логотип и промо-материалы' : 'Kit Logo Promocional'}
            className="p-1.5 sm:p-2 rounded-xl text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition relative group min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? t.soundOn : t.soundOff}
            title={soundEnabled ? t.soundOn : t.soundOff}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={isDarkMode ? t.lightMode : t.darkMode}
            title={isDarkMode ? t.lightMode : t.darkMode}
            className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Capsule */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2 sm:pr-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition text-left border border-slate-200 dark:border-slate-700/70 active:scale-95 min-h-[36px]"
            title={t.profileTooltip}
          >
            <span className="text-xl leading-none">{avatarObj.emoji}</span>
            <div className="hidden md:flex flex-col text-xs leading-tight">
              <span className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[90px]">
                {profile.name}
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold tabular-nums">
                {t.levelLabel} {profile.level} · {profile.xp} XP
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
