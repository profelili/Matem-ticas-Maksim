import React from 'react';
import { FlaskConical, Compass, Timer, BookOpen, BarChart3, Award } from 'lucide-react';
import { Translations } from '../utils/i18n';
import { sounds } from '../utils/soundEffects';

interface MobileTabBarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  t: Translations;
  pendingMistakesCount?: number;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  currentTab,
  onTabChange,
  t,
  pendingMistakesCount = 0,
}) => {
  const tabs = [
    {
      id: 'laboratorio',
      label: t.navLab,
      shortLabel: 'Lab',
      icon: FlaskConical,
    },
    {
      id: 'aventura',
      label: t.navAdventure,
      shortLabel: 'Aventura',
      icon: Compass,
    },
    {
      id: 'contrarrelj',
      label: t.navTimeAttack,
      shortLabel: 'Reto',
      icon: Timer,
    },
    {
      id: 'errores',
      label: t.navMistakes,
      shortLabel: 'Errores',
      icon: BookOpen,
      badge: pendingMistakesCount > 0 ? pendingMistakesCount : undefined,
    },
    {
      id: 'estadisticas',
      label: t.navStats,
      shortLabel: 'Stats',
      icon: BarChart3,
    },
    {
      id: 'logros',
      label: t.navAchievements,
      shortLabel: 'Logros',
      icon: Award,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-lg px-1 py-1 safe-area-pb"
    >
      <div className="max-w-md mx-auto grid grid-cols-6 items-center">
        {tabs.map(tab => {
          const isActive = currentTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (!isActive) {
                  sounds.playClick();
                  onTabChange(tab.id);
                }
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl transition-all duration-150 min-h-[50px] touch-manipulation select-none active:scale-95 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {/* Active subtle pill background indicator */}
              {isActive && (
                <span className="absolute inset-x-1.5 top-1 bottom-1 bg-indigo-50 dark:bg-indigo-950/60 rounded-xl -z-10" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center leading-none">
                    {tab.badge > 9 ? '9+' : tab.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] tracking-tight mt-0.5 truncate max-w-full leading-tight font-medium">
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
