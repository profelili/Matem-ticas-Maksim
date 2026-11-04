import React, { useState } from 'react';
import { Star, Lock, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { DifficultyLevel, Operation, Problem, UserProfile } from '../types/fractions';
import { generateProblem } from '../utils/mathEngine';
import { sounds } from '../utils/soundEffects';
import { Language, Translations } from '../utils/i18n';
import heroGameImg from '../assets/images/fractions_game_hero_1793730820777.jpg';

interface AdventureViewProps {
  profile: UserProfile;
  onStartLevel: (levelId: number, problems: Problem[], levelName: string) => void;
  onQuickPlay: (diff: DifficultyLevel, op?: Operation) => void;
  t: Translations;
  lang: Language;
}

interface LevelConfig {
  id: number;
  tier: DifficultyLevel;
  operation: Operation | 'mixed';
  starsRequired: number;
  es: { title: string; desc: string };
  ru: { title: string; desc: string };
}

const LEVELS: LevelConfig[] = [
  { id: 1, tier: 'basico', operation: '+', starsRequired: 0, es: { title: 'El Despertar de la Tarta', desc: 'Suma fracciones con denominadores comunes.' }, ru: { title: 'Пробуждение пирога', desc: 'Складывайте дроби с одинаковыми знаменателями.' } },
  { id: 2, tier: 'basico', operation: '-', starsRequired: 2, es: { title: 'La Porción Restante', desc: 'Resta porciones con igual denominador.' }, ru: { title: 'Оставшаяся доля', desc: 'Вычитайте дроби с одинаковым знаменателем.' } },
  { id: 3, tier: 'basico', operation: '*', starsRequired: 4, es: { title: 'Multiplicando Mundos', desc: 'Descubre cómo multiplicar fracciones unitarias.' }, ru: { title: 'Умножение миров', desc: 'Умножение единичных и простых дробей.' } },
  { id: 4, tier: 'basico', operation: '/', starsRequired: 6, es: { title: 'El Enigma del Reparto', desc: 'Primeros pasos en la división de fracciones.' }, ru: { title: 'Тайна деления', desc: 'Первые шаги в делении дробей через переворот.' } },
  { id: 5, tier: 'basico', operation: 'mixed', starsRequired: 8, es: { title: 'Prueba de Iniciado', desc: 'Desafío mixto con operaciones básicas.' }, ru: { title: 'Испытание новичка', desc: 'Смешанные базовые задания на все операции.' } },

  { id: 6, tier: 'intermedio', operation: '+', starsRequired: 10, es: { title: 'El Secreto del MCM', desc: 'Encuentra el mínimo común múltiplo para sumar.' }, ru: { title: 'Секрет НОК', desc: 'Поиск наименьшего общего кратного для сложения.' } },
  { id: 7, tier: 'intermedio', operation: '-', starsRequired: 12, es: { title: 'Diferencia Desigual', desc: 'Resta fracciones con distintos denominadores.' }, ru: { title: 'Разные знаменатели', desc: 'Вычитание дробей с приведением к общему НОК.' } },
  { id: 8, tier: 'intermedio', operation: '*', starsRequired: 14, es: { title: 'El Salto del Factor', desc: 'Multiplicaciones con números hasta el 10.' }, ru: { title: 'Скачок множителя', desc: 'Умножение дробей с числами до 10.' } },
  { id: 9, tier: 'intermedio', operation: '/', starsRequired: 16, es: { title: 'La Inversión Mágica', desc: 'División de fracciones con simplificación.' }, ru: { title: 'Магия инверсии', desc: 'Деление дробей с последующим сокращением.' } },
  { id: 10, tier: 'intermedio', operation: 'mixed', starsRequired: 18, es: { title: 'Torre Intermedia', desc: 'Examen de destreza intermedia.' }, ru: { title: 'Средняя башня', desc: 'Проверка навыков среднего уровня сложности.' } },

  { id: 11, tier: 'avanzado', operation: '+', starsRequired: 22, es: { title: 'Cumbres Impias', desc: 'Suma de fracciones impropias y compuestas.' }, ru: { title: 'Неправильные дроби', desc: 'Сложение неправильных и составных дробей.' } },
  { id: 12, tier: 'avanzado', operation: '-', starsRequired: 25, es: { title: 'La Brecha Negativa', desc: 'Restas avanzadas con valores mixtos.' }, ru: { title: 'Сложное вычитание', desc: 'Продвинутое вычитание со смешанными числами.' } },
  { id: 13, tier: 'avanzado', operation: '*', starsRequired: 28, es: { title: 'Vórtice de Factores', desc: 'Multiplicaciones con simplificación cruzada.' }, ru: { title: 'Перекрестное сокращение', desc: 'Умножение с перекрестным сокращением множителей.' } },
  { id: 14, tier: 'avanzado', operation: '/', starsRequired: 31, es: { title: 'El Laberinto Recíproco', desc: 'Divisiones complejas con denominadores altos.' }, ru: { title: 'Лабиринт обратных дробей', desc: 'Сложные примеры на деление больших дробей.' } },
  { id: 15, tier: 'experto', operation: 'mixed', starsRequired: 35, es: { title: 'Templo del Gran Maestro', desc: 'El máximo desafío con todas las operaciones.' }, ru: { title: 'Храм великого магистра', desc: 'Высшее мастерство со всеми видами операций.' } },
];

export const AdventureView: React.FC<AdventureViewProps> = ({
  profile,
  onStartLevel,
  onQuickPlay,
  t,
  lang,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('basico');

  const startMission = (lvl: LevelConfig) => {
    sounds.playClick();
    const problems: Problem[] = [];
    const levelTitle = lvl[lang].title;
    for (let i = 0; i < 5; i++) {
      const op = lvl.operation === 'mixed' ? undefined : lvl.operation;
      problems.push(generateProblem(op, lvl.tier, `lvl_${lvl.id}_q_${i + 1}`, lang));
    }
    onStartLevel(lvl.id, problems, levelTitle);
  };

  const getTierLabel = (tier: DifficultyLevel) => {
    return t[tier];
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Hero Showcase Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl">
        <div className="absolute inset-0">
          <img
            src={heroGameImg}
            alt={t.heroTitle}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-40 dark:opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
        </div>

        <div className="relative z-10 p-5 sm:p-10 max-w-2xl text-white space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            {t.heroDesc}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const nextLevel = LEVELS.find(l => l.id === profile.unlockedLevel) || LEVELS[0];
                startMission(nextLevel);
              }}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg transition-transform active:scale-95 touch-manipulation min-h-[42px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t.continueLevel} {profile.unlockedLevel}</span>
            </button>

            <div className="flex items-center gap-3 sm:gap-4 text-xs font-semibold text-slate-300 bg-slate-800/80 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-slate-700">
              <span className="flex items-center gap-1.5 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <strong className="text-white text-sm tabular-nums">{profile.stars}</strong> {t.stars}
              </span>
              <span>·</span>
              <span>
                {t.levelLabel} <strong className="text-white text-sm tabular-nums">{profile.level}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Play Strip */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {t.quickTrainTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.quickTrainDesc}
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium overflow-x-auto max-w-full scrollbar-none self-start sm:self-auto">
            {(['basico', 'intermedio', 'avanzado', 'experto'] as DifficultyLevel[]).map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-lg capitalize whitespace-nowrap transition-colors min-h-[32px] touch-manipulation active:scale-95 ${
                  selectedDifficulty === diff
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t[diff]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          {[
            { op: '+' as Operation, label: `${t.add} (+)`, color: 'border-sky-200 dark:border-sky-800/60 bg-sky-50/60 dark:bg-sky-950/20 text-sky-700 dark:text-sky-300' },
            { op: '-' as Operation, label: `${t.sub} (−)`, color: 'border-amber-200 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300' },
            { op: '*' as Operation, label: `${t.mul} (×)`, color: 'border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/60 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300' },
            { op: '/' as Operation, label: `${t.div} (÷)`, color: 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300' },
          ].map(item => (
            <button
              key={item.op}
              onClick={() => onQuickPlay(selectedDifficulty, item.op)}
              className={`p-3.5 rounded-xl border text-center font-bold text-xs sm:text-sm transition-all hover:scale-[1.02] active:scale-98 shadow-xs ${item.color}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Levels Map Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.levelsMapTitle}
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums font-medium">
            {t.unlockedLevels}: {profile.unlockedLevel} / {LEVELS.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEVELS.map(lvl => {
            const isUnlocked = profile.unlockedLevel >= lvl.id;
            const isCompleted = profile.unlockedLevel > lvl.id;
            const stars = isCompleted ? 3 : isUnlocked ? 1 : 0;
            const content = lvl[lang];

            return (
              <div
                key={lvl.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/40 opacity-70'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs flex items-center justify-center tabular-nums border border-indigo-200 dark:border-indigo-800">
                      {lvl.id}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {getTierLabel(lvl.tier)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < stars
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1">
                  {content.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                  {content.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    {t.operation}: {lvl.operation === 'mixed' ? t.mixedOp : lvl.operation}
                  </span>

                  {isUnlocked ? (
                    <button
                      onClick={() => startMission(lvl)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition"
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Play className="w-3 h-3 fill-white" />}
                      <span>{isCompleted ? t.repeat : t.play}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-600 font-medium">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{t.requiresStars} {lvl.starsRequired} ★</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
