import React from 'react';
import { Award, Lock, CheckCircle2, Sparkles, Trophy } from 'lucide-react';
import { UserProfile } from '../types/fractions';
import { INITIAL_ACHIEVEMENTS, AVATARS } from '../utils/storage';
import { Language, Translations } from '../utils/i18n';
import badgeMathMaster from '../assets/images/badge_math_master_1793730820590.jpg';

interface AchievementsViewProps {
  profile: UserProfile;
  t: Translations;
  lang: Language;
  onEquipAvatar?: (avatarId: string) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ profile, t, lang, onEquipAvatar }) => {
  const xpForNextLevel = profile.level * 200;
  const currentLevelProgress = Math.min(100, Math.round((profile.xp % 200) / 2));

  const getRankTitle = (lvl: number) => {
    if (lvl >= 15) return t.rankTitleCosmico;
    if (lvl >= 10) return t.rankTitleMaestro;
    if (lvl >= 6) return t.rankTitleSabio;
    if (lvl >= 3) return t.rankTitleExplorador;
    return t.rankTitleIniciado;
  };

  const ruAchievementTranslations: Record<string, { title: string; desc: string }> = {
    first_win: { title: 'Первое попадание', desc: 'Решите свою первую операцию с дробями.' },
    streak_5: { title: 'Огненная серия', desc: 'Дайте 5 правильных ответов подряд.' },
    streak_15: { title: 'Неудержимый ум', desc: 'Достигните серии из 15 верных ответов.' },
    mcm_master: { title: 'Мастер НОК', desc: 'Решите 10 примеров на сложение или вычитание с разными знаменателями.' },
    multiply_ace: { title: 'Ас умножения', desc: 'Выполните 10 успешных умножений дробей.' },
    division_wizard: { title: 'Маг деления', desc: 'Выполните 10 делений дробей без ошибок.' },
    speed_demon: { title: 'Скоростной спринтер', desc: 'Наберите более 500 очков в испытании на время.' },
    mistake_cleared: { title: 'Работа над ошибками', desc: 'Исправьте и освойте 3 примера из Тетради ошибок.' },
    level_5: { title: 'Исследователь дробей', desc: 'Достигните 5-го уровня игрока.' },
    level_10: { title: 'Магистр математики', desc: 'Достигните 10-го уровня игрока.' },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Level Header Banner with Mastery Insignia */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-center gap-6 sm:gap-8">
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/40 shadow-lg relative bg-slate-800">
          <img
            src={badgeMathMaster}
            alt="Mastery Badge"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5" />
            <span>{getRankTitle(profile.level)}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {t.levelLabel} {profile.level}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
            {t.levelXpHeader}
          </p>

          {/* XP Progress Bar */}
          <div className="space-y-1.5 max-w-md pt-1">
            <div className="flex justify-between text-xs font-semibold tabular-nums text-slate-300">
              <span>XP: {profile.xp}</span>
              <span>{t.nextLevel} {xpForNextLevel} XP</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-indigo-400 to-indigo-500 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${currentLevelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <span>{t.achievementsCount} ({profile.achievements.length} / {INITIAL_ACHIEVEMENTS.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_ACHIEVEMENTS.map(ach => {
            const isUnlocked = profile.achievements.includes(ach.id);
            const title = lang === 'ru' && ruAchievementTranslations[ach.id] ? ruAchievementTranslations[ach.id].title : ach.title;
            const desc = lang === 'ru' && ruAchievementTranslations[ach.id] ? ruAchievementTranslations[ach.id].desc : ach.description;

            return (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-amber-300/60 dark:border-amber-600/40 shadow-xs ring-1 ring-amber-400/20'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-3xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    {ach.icon}
                  </span>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t.unlocked}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                      <Lock className="w-3 h-3" />
                      {t.locked}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unlockable Avatars Collection */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{t.avatarsTitle}</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {AVATARS.map((av) => {
            const isEquipped = profile.avatar === av.id;
            return (
              <button
                key={av.id}
                type="button"
                onClick={() => onEquipAvatar && onEquipAvatar(av.id)}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer active:scale-95 ${
                  isEquipped
                    ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-indigo-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-3xl mb-1">{av.emoji}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {av.name}
                </div>
                {isEquipped ? (
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block mt-1">
                    ✓ {t.equipped}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 block mt-1 font-semibold">
                    {lang === 'ru' ? 'Выбрать' : 'Elegir'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
