import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Lightbulb, CheckCircle2, AlertCircle, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { Fraction, Problem } from '../types/fractions';
import { areFractionsEqual } from '../utils/mathEngine';
import { sounds } from '../utils/soundEffects';
import { FractionDisplay } from '../components/FractionDisplay';
import { VisualFractionModel } from '../components/VisualFractionModel';
import { Language, Translations } from '../utils/i18n';

interface GamePlayModalProps {
  problem: Problem;
  onAnswer: (correct: boolean, chosenFraction: Fraction) => void;
  onClose: () => void;
  comboCount?: number;
  timeRemaining?: number;
  totalTime?: number;
  questionNumber?: number;
  totalQuestions?: number;
  t: Translations;
  lang: Language;
}

export const GamePlayModal: React.FC<GamePlayModalProps> = ({
  problem,
  onAnswer,
  onClose,
  comboCount = 0,
  timeRemaining,
  totalTime,
  questionNumber,
  totalQuestions,
  t,
}) => {
  const [selectedOption, setSelectedOption] = useState<Fraction | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showVisualModel, setShowVisualModel] = useState<boolean>(false);
  const [visualType, setVisualType] = useState<'circle' | 'bar'>('circle');

  // Manual fraction input mode
  const [isManualMode, setIsManualMode] = useState<boolean>(false);
  const [customNum, setCustomNum] = useState<string>('');
  const [customDen, setCustomDen] = useState<string>('');

  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setCustomNum('');
    setCustomDen('');
    setShowVisualModel(false);
  }, [problem.id]);

  const handleSelectOption = (opt: Fraction) => {
    if (hasSubmitted) return;
    setSelectedOption(opt);
    sounds.playClick();
  };

  const handleSubmit = (chosenFraction?: Fraction) => {
    if (hasSubmitted) return;

    let finalAnswer: Fraction | null = chosenFraction || selectedOption;

    if (isManualMode && !chosenFraction) {
      const num = parseInt(customNum, 10);
      const den = parseInt(customDen, 10);
      if (isNaN(num) || isNaN(den) || den === 0) return;
      finalAnswer = { num, den };
    }

    if (!finalAnswer) return;

    const correct = areFractionsEqual(finalAnswer, problem.correctAnswer);
    setIsCorrect(correct);
    setHasSubmitted(true);
    setSelectedOption(finalAnswer);

    if (correct) {
      sounds.playCorrect();
      if (comboCount >= 2) {
        sounds.playCombo(comboCount);
      }
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#38bdf8'],
      });
    } else {
      sounds.playIncorrect();
      setShowVisualModel(true);
    }
  };

  const handleContinue = () => {
    if (selectedOption) {
      onAnswer(isCorrect, selectedOption);
    }
  };

  const opSign = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
  }[problem.operation];

  const timerPercent = totalTime && timeRemaining !== undefined ? (timeRemaining / totalTime) * 100 : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[90vh]">
        {/* Header Bar */}
        <div className="px-3.5 sm:px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2 sm:gap-3">
            {questionNumber && (
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums">
                {t.questionProgress} {questionNumber} {totalQuestions ? `/ ${totalQuestions}` : ''}
              </span>
            )}
            {comboCount > 1 && (
              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                <Sparkles className="w-3 h-3 fill-amber-500" />
                <span>{t.comboMultiplier} x{comboCount}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowVisualModel(v => !v)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition active:scale-95 touch-manipulation"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{showVisualModel ? t.hideVisual : t.showVisual}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg transition active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timer Bar if time attack */}
        {totalTime && (
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800">
            <div
              className={`h-full transition-all duration-300 ${
                timerPercent < 25 ? 'bg-red-500' : timerPercent < 50 ? 'bg-amber-500' : 'bg-indigo-500'
              }`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          {/* Main Math Expression Card */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <FractionDisplay fraction={problem.f1} size="xl" highlightColor="text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl sm:text-4xl font-black text-slate-400 dark:text-slate-500">{opSign}</span>
            <FractionDisplay fraction={problem.f2} size="xl" highlightColor="text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl sm:text-4xl font-black text-slate-400 dark:text-slate-500">=</span>
            <span className="text-2xl sm:text-4xl font-black text-indigo-500">?</span>
          </div>

          {/* Interactive Visual Models Section */}
          {showVisualModel && (
            <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  {t.visualModelsTitle}
                </span>
                <div className="flex items-center gap-1 p-0.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
                  <button
                    onClick={() => setVisualType('circle')}
                    className={`px-2 py-0.5 rounded-md font-medium transition ${
                      visualType === 'circle'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t.circleModel}
                  </button>
                  <button
                    onClick={() => setVisualType('bar')}
                    className={`px-2 py-0.5 rounded-md font-medium transition ${
                      visualType === 'bar'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t.barModel}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <VisualFractionModel
                  fraction={problem.f1}
                  type={visualType}
                  colorTheme="sky"
                  label={`${t.fraction1} (${problem.f1.num}/${problem.f1.den})`}
                />
                <VisualFractionModel
                  fraction={problem.f2}
                  type={visualType}
                  colorTheme="amber"
                  label={`${t.fraction2} (${problem.f2.num}/${problem.f2.den})`}
                />
              </div>
            </div>
          )}

          {/* Answer Options or Manual Input */}
          {!hasSubmitted ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold">{t.selectOption}</span>
                <button
                  onClick={() => setIsManualMode(!isManualMode)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  {isManualMode ? t.optionsMode : t.manualInputMode}
                </button>
              </div>

              {!isManualMode ? (
                <div className="grid grid-cols-2 gap-3">
                  {problem.options.map((opt, idx) => {
                    const isSelected = selectedOption && areFractionsEqual(selectedOption, opt);
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-center min-h-[64px] active:scale-95 touch-manipulation select-none ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/20 shadow-md scale-[1.02]'
                            : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <FractionDisplay fraction={opt} size="lg" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <div className="flex flex-col items-center w-28">
                    <input
                      type="number"
                      value={customNum}
                      onChange={e => setCustomNum(e.target.value)}
                      placeholder={t.numLabel}
                      className="w-full text-center text-xl font-bold py-1 px-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    />
                    <div className="w-full h-1 bg-slate-700 dark:bg-slate-300 my-2 rounded-full" />
                    <input
                      type="number"
                      value={customDen}
                      onChange={e => setCustomDen(e.target.value)}
                      placeholder={t.denLabel}
                      className="w-full text-center text-xl font-bold py-1 px-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={() => handleSubmit()}
                disabled={!selectedOption && (!customNum || !customDen)}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-base text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{t.confirmAnswer}</span>
              </button>
            </div>
          ) : (
            /* Post-Submission Feedback and Step-by-Step Resolution */
            <div className="space-y-4">
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-base">
                    {isCorrect ? t.feedbackCorrect : t.feedbackWrong}
                  </h4>
                  <p className="text-xs sm:text-sm mt-0.5 opacity-90">
                    {isCorrect ? t.feedbackCorrectDesc : t.feedbackWrongDesc}
                  </p>
                </div>
              </div>

              {/* Step by step explanation */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {t.stepByStepTitle}:
                </h5>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                  {problem.stepByStep.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold shrink-0">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-700 text-xs">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">{t.simplifiedResult}</span>
                  <div className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    <FractionDisplay fraction={problem.correctAnswer} size="md" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-base text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{t.continue}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
