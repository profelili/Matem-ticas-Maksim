import React, { useRef, useEffect } from 'react';
import { Compass, BookOpen, FlaskConical, Timer, BarChart3, Award } from 'lucide-react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Reordered strictly according to user request:
  // Aventura; Errores; Lab; Reto; Stats; Logros
  const tabs = [
    {
      id: 'aventura',
      label: t.navAdventure,
      shortLabel: 'Aventura',
      icon: Compass,
    },
    {
      id: 'errores',
      label: t.navMistakes,
      shortLabel: 'Errores',
      icon: BookOpen,
      badge: pendingMistakesCount > 0 ? pendingMistakesCount : undefined,
    },
    {
      id: 'laboratorio',
      label: t.navLab,
      shortLabel: 'Lab',
      icon: FlaskConical,
    },
    {
      id: 'contrarrelj',
      label: t.navTimeAttack,
      shortLabel: 'Reto',
      icon: Timer,
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

  // Auto-scroll active item into visible viewport whenever tab changes
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const activeBtn = scrollContainerRef.current.querySelector<HTMLElement>(`[data-tab-id="${currentTab}"]`);
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentTab]);

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800/90 shadow-2xl safe-area-pb"
    >
      {/* Scrollable Container with smooth touch swiping and edge fade */}
      <div className="relative max-w-lg mx-auto">
        {/* Subtle scroll edge hints */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 opacity-70" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 opacity-70" />

        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto no-scrollbar scroll-smooth px-3 py-1 gap-1.5 overscroll-x-contain touch-pan-x"
        >
          {tabs.map(tab => {
            const isActive = currentTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => {
                  if (!isActive) {
                    sounds.playClick();
                    onTabChange(tab.id);
                  }
                }}
                className={`relative flex-shrink-0 min-w-[72px] sm:min-w-[80px] flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-150 min-h-[52px] touch-manipulation select-none active:scale-95 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {/* Active subtle pill background indicator */}
                {isActive && (
                  <span className="absolute inset-x-1 top-0.5 bottom-0.5 bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/50 dark:border-indigo-800/50 rounded-xl -z-10 shadow-xs" />
                )}

                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                    }`}
                  />
                  {tab.badge !== undefined && (
                    <span className="absolute -top-1 -right-2.5 px-1 min-w-[15px] h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center leading-none ring-2 ring-white dark:ring-slate-900">
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
      </div>
    </nav>
  );
};
