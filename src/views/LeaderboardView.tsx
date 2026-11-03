import React, { useState } from 'react';
import { Trophy, Flame } from 'lucide-react';
import { getLeaderboard, AVATARS } from '../utils/storage';
import { sounds } from '../utils/soundEffects';
import { Language, Translations } from '../utils/i18n';

interface LeaderboardViewProps {
  t: Translations;
  lang: Language;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ t }) => {
  const [period, setPeriod] = useState<'today' | 'week' | 'all'>('week');

  const leaders = getLeaderboard(period);

  const getAvatarEmoji = (avatarId: string) => {
    return AVATARS.find(a => a.id === avatarId)?.emoji || '🦉';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Trophy className="w-7 h-7 text-amber-500" />
            <span>{t.leaderboardTitle}</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.leaderboardDesc}
          </p>
        </div>

        {/* Period Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          {[
            { id: 'today', label: t.filterToday },
            { id: 'week', label: t.filterWeek },
            { id: 'all', label: t.filterAllTime },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => {
                sounds.playClick();
                setPeriod(p.id as typeof period);
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                period === p.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Podium for Top 3 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 items-end pt-4 pb-2">
        {/* Rank 2 */}
        {leaders[1] && (
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs order-1">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs flex items-center justify-center mb-2">
              2º
            </div>
            <span className="text-3xl mb-1">{getAvatarEmoji(leaders[1].avatar)}</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white text-center truncate max-w-full">
              {leaders[1].name}
            </span>
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {leaders[1].score} {t.pts}
            </span>
          </div>
        )}

        {/* Rank 1 */}
        {leaders[0] && (
          <div className="flex flex-col items-center p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/20 border-2 border-amber-400 dark:border-amber-600/80 shadow-md order-2 -mt-4">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mb-2 shadow-sm">
              👑 1º
            </div>
            <span className="text-4xl mb-1">{getAvatarEmoji(leaders[0].avatar)}</span>
            <span className="font-black text-sm sm:text-base text-slate-900 dark:text-white text-center truncate max-w-full">
              {leaders[0].name}
            </span>
            <span className="text-sm font-black text-amber-600 dark:text-amber-400 tabular-nums">
              {leaders[0].score} {t.pts}
            </span>
          </div>
        )}

        {/* Rank 3 */}
        {leaders[2] && (
          <div className="flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs order-3">
            <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-400 font-black text-xs flex items-center justify-center mb-2">
              3º
            </div>
            <span className="text-3xl mb-1">{getAvatarEmoji(leaders[2].avatar)}</span>
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white text-center truncate max-w-full">
              {leaders[2].name}
            </span>
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
              {leaders[2].score} {t.pts}
            </span>
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {leaders.map((entry, index) => {
            const isTop3 = index < 3;
            return (
              <div
                key={entry.id}
                className={`flex items-center justify-between p-4 transition-colors ${
                  entry.isCurrentUser
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-l-4 border-indigo-600 font-medium'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 text-center font-bold text-xs tabular-nums ${
                      isTop3 ? 'text-amber-600 dark:text-amber-400 font-black' : 'text-slate-400'
                    }`}
                  >
                    #{index + 1}
                  </span>

                  <span className="text-2xl leading-none">{getAvatarEmoji(entry.avatar)}</span>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {entry.name}
                      </span>
                      {entry.isCurrentUser && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">
                          {t.youBadge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{t.levelLabel} {entry.level}</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5 text-amber-500">
                        <Flame className="w-3 h-3 fill-amber-500" />
                        {t.streakLabel} {entry.streak}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {entry.score}{' '}
                    <span className="text-xs font-semibold text-slate-400">{t.pts}</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                    {entry.accuracy}% {t.accuracy.toLowerCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
