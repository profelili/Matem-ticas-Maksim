import React, { useState } from 'react';
import { BarChart3, TrendingUp, Award, Target, Zap, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types/fractions';
import { Language, Translations } from '../utils/i18n';

interface AnalyticsViewProps {
  profile: UserProfile;
  t: Translations;
  lang: Language;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ profile, t, lang }) => {
  const [activeTab, setActiveTab] = useState<'operaciones' | 'evolucion' | 'radar'>('operaciones');

  const { stats } = profile;
  const overallAccuracy =
    stats.totalSolved > 0 ? Math.round((stats.totalCorrect / stats.totalSolved) * 100) : 0;

  const opsData = [
    { key: '+' as const, label: t.add, op: '+', data: stats.byOperation['+'], color: '#0ea5e9' },
    { key: '-' as const, label: t.sub, op: '−', data: stats.byOperation['-'], color: '#f59e0b' },
    { key: '*' as const, label: t.mul, op: '×', data: stats.byOperation['*'], color: '#6366f1' },
    { key: '/' as const, label: t.div, op: '÷', data: stats.byOperation['/'], color: '#10b981' },
  ];

  const weakestOp = [...opsData].sort((a, b) => {
    const accA = a.data.attempted > 0 ? a.data.correct / a.data.attempted : 1;
    const accB = b.data.attempted > 0 ? b.data.correct / b.data.attempted : 1;
    return accA - accB;
  })[0];

  const radarSkills = lang === 'ru' ? [
    { name: 'Несократимые дроби', level: '85%', grade: 'Продвинутый', color: 'text-emerald-500' },
    { name: 'Поиск НОК и знаменателя', level: '80%', grade: 'Освоено', color: 'text-indigo-500' },
    { name: 'Умножение и деление', level: '90%', grade: 'Эксперт', color: 'text-purple-500' },
    { name: 'Смешанные дроби', level: '75%', grade: 'Средний', color: 'text-amber-500' },
    { name: 'Скорость устного счета', level: '70%', grade: 'Развивается', color: 'text-sky-500' },
  ] : [
    { name: 'Simplificación Irreducible', level: '85%', grade: 'Avanzado', color: 'text-emerald-500' },
    { name: 'Cálculo de MCM / Homogenización', level: '80%', grade: 'Dominado', color: 'text-indigo-500' },
    { name: 'Multiplicación y División Inversa', level: '90%', grade: 'Experto', color: 'text-purple-500' },
    { name: 'Fracciones Impropias y Mixtas', level: '75%', grade: 'Intermedio', color: 'text-amber-500' },
    { name: 'Velocidad de Respuesta Mental', level: '70%', grade: 'En desarrollo', color: 'text-sky-500' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* View Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <BarChart3 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>{t.analyticsTitle}</span>
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.analyticsDesc}
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.totalSolved}</span>
            <Target className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
            {stats.totalSolved}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
            {stats.totalCorrect} {t.correct.toLowerCase()}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.globalAccuracy}</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
            {overallAccuracy}%
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${overallAccuracy}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.bestStreak}</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tabular-nums">
            {stats.bestStreak}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">{t.streakLabel}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">{t.maxScore}</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
            {stats.highScoreTimeAttack}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">{t.points}</span>
        </div>
      </div>

      {/* Smart Personalized Advice Callout */}
      {weakestOp && weakestOp.data.attempted > 0 && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block">
                {t.smartAdviceTitle}
              </strong>
              <span className="text-slate-600 dark:text-slate-300">
                {t.smartAdviceWeakest} <strong>{weakestOp.label}</strong> (
                {Math.round((weakestOp.data.correct / weakestOp.data.attempted) * 100)}% {t.accuracy.toLowerCase()}).
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Chart Selector Tab */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold w-fit">
        <button
          onClick={() => setActiveTab('operaciones')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'operaciones'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.tabAccuracyOp}
        </button>
        <button
          onClick={() => setActiveTab('evolucion')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'evolucion'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.tabEvolution}
        </button>
        <button
          onClick={() => setActiveTab('radar')}
          className={`px-4 py-2 rounded-lg transition ${
            activeTab === 'radar'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {t.tabRadar}
        </button>
      </div>

      {/* Chart 1: Operation Accuracy Bars */}
      {activeTab === 'operaciones' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t.opBreakdownTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opsData.map(item => {
              const acc =
                item.data.attempted > 0 ? Math.round((item.data.correct / item.data.attempted) * 100) : 0;

              return (
                <div
                  key={item.key}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        className="w-8 h-8 rounded-xl font-black text-base flex items-center justify-center border border-current"
                      >
                        {item.op}
                      </span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.label}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                        {acc}%
                      </span>
                      <span className="text-[11px] text-slate-400 block tabular-nums">
                        {item.data.correct} / {item.data.attempted}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${acc}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart 2: Historical Evolution Line / Bar Chart */}
      {activeTab === 'evolucion' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              <span>{t.evolutionTitle}</span>
            </h2>
            <span className="text-xs text-slate-400 font-medium">{t.evolutionSubtitle}</span>
          </div>

          <div className="w-full h-64 sm:h-72 relative">
            <svg viewBox="0 0 700 240" className="w-full h-full overflow-visible">
              {[0, 60, 120, 180].map((y, idx) => (
                <line
                  key={idx}
                  x1="40"
                  y1={y + 20}
                  x2={680}
                  y2={y + 20}
                  stroke="currentColor"
                  className="text-slate-200 dark:text-slate-800"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              ))}

              {stats.historyScores.map((h, i) => {
                const x = 70 + i * 95;
                const maxScore = 600;
                const scoreH = (h.score / maxScore) * 160;
                const y = 200 - scoreH;

                return (
                  <g key={i} className="group cursor-pointer">
                    <rect
                      x={x - 16}
                      y={y}
                      width="32"
                      height={scoreH}
                      rx="6"
                      className="fill-indigo-500/20 hover:fill-indigo-500/40 transition-colors"
                    />

                    <circle
                      cx={x}
                      cy={y}
                      r="5"
                      className="fill-indigo-600 dark:fill-indigo-400 stroke-white dark:stroke-slate-900 stroke-2"
                    />

                    <text
                      x={x}
                      y={y - 8}
                      textAnchor="middle"
                      className="text-[11px] font-bold fill-slate-700 dark:fill-slate-300 tabular-nums"
                    >
                      {h.score}
                    </text>

                    <text
                      x={x}
                      y="225"
                      textAnchor="middle"
                      className="text-[11px] font-medium fill-slate-400"
                    >
                      {h.date}
                    </text>

                    <text
                      x={x}
                      y="238"
                      textAnchor="middle"
                      className="text-[10px] font-bold fill-emerald-600 dark:fill-emerald-400 tabular-nums"
                    >
                      {h.accuracy}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Chart 3: Skills Radar */}
      {activeTab === 'radar' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {t.radarTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <svg width="260" height="260" viewBox="0 0 260 260">
                {[40, 75, 110].map((r, i) => (
                  <circle
                    key={i}
                    cx="130"
                    cy="130"
                    r={r}
                    fill="none"
                    stroke="currentColor"
                    className="text-slate-200 dark:text-slate-800"
                    strokeWidth="1"
                  />
                ))}

                {[0, 72, 144, 216, 288].map((angle, idx) => {
                  const rad = ((angle - 90) * Math.PI) / 180;
                  const x = 130 + 110 * Math.cos(rad);
                  const y = 130 + 110 * Math.sin(rad);
                  return (
                    <line
                      key={idx}
                      x1="130"
                      y1="130"
                      x2={x}
                      y2={y}
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      strokeWidth="1"
                    />
                  );
                })}

                <polygon
                  points="130,45 210,105 185,195 75,195 50,105"
                  className="fill-indigo-500/30 stroke-indigo-600 dark:stroke-indigo-400"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="space-y-3 text-xs">
              {radarSkills.map((skill, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{skill.name}</span>
                  <div className="flex items-center gap-2 tabular-nums">
                    <span className="font-bold text-slate-900 dark:text-white">{skill.level}</span>
                    <span className={`font-semibold ${skill.color}`}>({skill.grade})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
