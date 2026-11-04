import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Timer, Zap, Trophy, Play, RotateCcw, AlertTriangle } from 'lucide-react';
import { DifficultyLevel, Fraction, Problem, UserProfile } from '../types/fractions';
import { generateProblem, areFractionsEqual } from '../utils/mathEngine';
import { sounds } from '../utils/soundEffects';
import { FractionDisplay } from '../components/FractionDisplay';
import { Language, Translations } from '../utils/i18n';

interface TimeAttackViewProps {
  profile: UserProfile;
  onFinishGame: (score: number, correctCount: number, totalCount: number, mistakes: Array<{ problem: Problem; answer: Fraction }>) => void;
  onOpenMistakes: () => void;
  t: Translations;
  lang: Language;
}

export const TimeAttackView: React.FC<TimeAttackViewProps> = ({
  profile,
  onFinishGame,
  onOpenMistakes,
  t,
  lang,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('intermedio');

  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [runMistakes, setRunMistakes] = useState<Array<{ problem: Problem; answer: Fraction }>>([]);
  const [gameOverStats, setGameOverStats] = useState<{
    score: number;
    correct: number;
    total: number;
    isHighScore: boolean;
  } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startChallenge = () => {
    sounds.playClick();
    setTimeLeft(selectedDuration);
    setScore(0);
    setCombo(0);
    setCorrectCount(0);
    setTotalCount(0);
    setRunMistakes([]);
    setGameOverStats(null);
    setCurrentProblem(generateProblem(undefined, selectedDifficulty, undefined, lang));
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          finishGame();
          return 0;
        }
        if (prev <= 10) {
          sounds.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const finishGame = () => {
    setIsPlaying(false);
    sounds.playLevelUp();

    const isNewHigh = score > profile.stats.highScoreTimeAttack;
    if (isNewHigh || score >= 400) {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
      });
    }

    setGameOverStats({
      score,
      correct: correctCount,
      total: totalCount,
      isHighScore: isNewHigh,
    });

    onFinishGame(score, correctCount, totalCount, runMistakes);
  };

  const handleSelectOption = (option: Fraction) => {
    if (!currentProblem || !isPlaying) return;

    const isCorrect = areFractionsEqual(option, currentProblem.correctAnswer);
    const newTotal = totalCount + 1;
    setTotalCount(newTotal);

    if (isCorrect) {
      sounds.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setCorrectCount(prev => prev + 1);

      const multiplier = newCombo >= 10 ? 3 : newCombo >= 5 ? 2 : newCombo >= 3 ? 1.5 : 1;
      const pointsEarned = Math.round(100 * multiplier);
      setScore(prev => prev + pointsEarned);

      if (newCombo % 5 === 0) {
        sounds.playCombo(newCombo);
      }
    } else {
      sounds.playIncorrect();
      setCombo(0);
      setRunMistakes(prev => [...prev, { problem: currentProblem, answer: option }]);
    }

    setCurrentProblem(generateProblem(undefined, selectedDifficulty, undefined, lang));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Lobby / Configuration Screen */}
      {!isPlaying && !gameOverStats && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-sm">
            <Timer className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.timeAttackTitle}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.timeAttackDesc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
            {/* Duration Selector */}
            <div className="space-y-2 text-left w-full sm:w-auto">
              <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                {t.durationLabel}
              </label>
              <div className="flex gap-2">
                {[
                  { sec: 60, label: t.seconds60 },
                  { sec: 120, label: t.seconds120 },
                ].map(d => (
                  <button
                    key={d.sec}
                    onClick={() => setSelectedDuration(d.sec)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${
                      selectedDuration === d.sec
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="space-y-2 text-left w-full sm:w-auto">
              <label className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                {t.difficultyLabel}
              </label>
              <div className="flex gap-2">
                {(['basico', 'intermedio', 'avanzado'] as DifficultyLevel[]).map(diff => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold capitalize border transition ${
                      selectedDifficulty === diff
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {t[diff]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Record Display */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>
              {t.currentRecord}{' '}
              <strong className="text-sm font-extrabold tabular-nums">
                {profile.stats.highScoreTimeAttack} {t.pts}
              </strong>
            </span>
          </div>

          <div>
            <button
              onClick={startChallenge}
              className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-extrabold text-base shadow-lg transition transform active:scale-95 flex items-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>{t.startTimeAttack}</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Game Screen */}
      {isPlaying && currentProblem && (
        <div className="space-y-6">
          {/* Top HUD */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm items-center text-center">
            {/* Time */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">{t.time}</span>
              <div
                className={`text-2xl sm:text-3xl font-black tabular-nums ${
                  timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-slate-900 dark:text-white'
                }`}
              >
                {timeLeft}s
              </div>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">{t.score}</span>
              <div className="text-2xl sm:text-3xl font-black tabular-nums text-indigo-600 dark:text-indigo-400">
                {score}
              </div>
            </div>

            {/* Combo */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">{t.comboStreak}</span>
              <div className="flex items-center gap-1 text-2xl sm:text-3xl font-black tabular-nums text-amber-500">
                <Zap className="w-5 h-5 fill-amber-500" />
                <span>x{combo}</span>
              </div>
            </div>
          </div>

          {/* Question Board */}
          <div className="p-4 sm:p-8 md:p-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-md text-center space-y-6 sm:space-y-8">
            <div className="flex items-center justify-center gap-2.5 sm:gap-6 md:gap-8">
              <FractionDisplay fraction={currentProblem.f1} size="xl" highlightColor="text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-400">
                {currentProblem.operation === '*' ? '×' : currentProblem.operation === '/' ? '÷' : currentProblem.operation === '-' ? '−' : '+'}
              </span>
              <FractionDisplay fraction={currentProblem.f2} size="xl" highlightColor="text-indigo-600 dark:text-indigo-400" />
              <span className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-400">=</span>
              <span className="text-2xl sm:text-4xl md:text-5xl font-black text-amber-500">?</span>
            </div>

            {/* Fast Option Buttons */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-xl mx-auto">
              {currentProblem.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  className="p-3.5 sm:p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:border-indigo-400 transition transform active:scale-95 flex items-center justify-center shadow-xs min-h-[64px] touch-manipulation select-none"
                >
                  <FractionDisplay fraction={opt} size="lg" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Summary Screen */}
      {gameOverStats && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.timeUpTitle}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.timeUpDesc}
            </p>
          </div>

          {gameOverStats.isHighScore && (
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              {t.newRecord}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block">{t.finalScore}</span>
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                {gameOverStats.score}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block">{t.correct}</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">
                {gameOverStats.correct}/{gameOverStats.total}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-400 block">{t.accuracy}</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                {gameOverStats.total > 0 ? Math.round((gameOverStats.correct / gameOverStats.total) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* Mistakes alert banner if mistakes occurred */}
          {runMistakes.length > 0 && (
            <div className="max-w-md mx-auto p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-center justify-between text-left text-xs text-amber-800 dark:text-amber-300">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>{runMistakes.length}</strong> {t.mistakesLogged}
                </span>
              </div>
              <button
                onClick={onOpenMistakes}
                className="font-bold underline whitespace-nowrap ml-2 text-indigo-600 dark:text-indigo-400"
              >
                {t.reviewNow}
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={startChallenge}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.playAgain}</span>
            </button>
            <button
              onClick={() => setGameOverStats(null)}
              className="px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-sm transition"
            >
              {t.changeOptions}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
