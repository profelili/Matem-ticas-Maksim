import React, { useState } from 'react';
import { BookOpen, CheckCircle, RotateCcw, Filter, AlertCircle, ArrowRight } from 'lucide-react';
import { MistakeRecord, Operation } from '../types/fractions';
import { FractionDisplay } from '../components/FractionDisplay';
import { VisualFractionModel } from '../components/VisualFractionModel';
import { sounds } from '../utils/soundEffects';
import { Language, Translations } from '../utils/i18n';

interface MistakesNotebookViewProps {
  mistakes: MistakeRecord[];
  onRetryMistake: (mistake: MistakeRecord) => void;
  onMarkSolved: (mistakeId: string) => void;
  t: Translations;
  lang: Language;
}

export const MistakesNotebookView: React.FC<MistakesNotebookViewProps> = ({
  mistakes,
  onRetryMistake,
  onMarkSolved,
  t,
  lang,
}) => {
  const [selectedOp, setSelectedOp] = useState<Operation | 'all'>('all');
  const [filterSolved, setFilterSolved] = useState<'all' | 'pending' | 'solved'>('pending');
  const [expandedMistakeId, setExpandedMistakeId] = useState<string | null>(null);

  const filteredMistakes = mistakes.filter(m => {
    if (selectedOp !== 'all' && m.problem.operation !== selectedOp) return false;
    if (filterSolved === 'pending' && m.solvedAgain) return false;
    if (filterSolved === 'solved' && !m.solvedAgain) return false;
    return true;
  });

  const pendingCount = mistakes.filter(m => !m.solvedAgain).length;
  const solvedCount = mistakes.filter(m => m.solvedAgain).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <BookOpen className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>{t.mistakesTitle}</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.mistakesDesc}
          </p>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-semibold tabular-nums">
            {t.pendingCount} <strong>{pendingCount}</strong>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tabular-nums">
            {t.solvedCount} <strong>{solvedCount}</strong>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Operation Filters */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            {t.filterOp}
          </span>
          {[
            { id: 'all', label: t.all },
            { id: '+', label: `${t.add} (+)` },
            { id: '-', label: `${t.sub} (−)` },
            { id: '*', label: `${t.mul} (×)` },
            { id: '/', label: `${t.div} (÷)` },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => { sounds.playClick(); setSelectedOp(f.id as typeof selectedOp); }}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                selectedOp === f.id
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {[
            { id: 'pending', label: t.toReview },
            { id: 'solved', label: t.solved },
            { id: 'all', label: t.all },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => { sounds.playClick(); setFilterSolved(s.id as typeof filterSolved); }}
              className={`px-3 py-1 rounded-lg font-semibold transition ${
                filterSolved === s.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mistake Cards List */}
      {filteredMistakes.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <CheckCircle className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {filterSolved === 'pending'
              ? t.noMistakesPending
              : '---'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            {t.noMistakesDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map(item => {
            const isExpanded = expandedMistakeId === item.id;
            const opSign = { '+': '+', '-': '−', '*': '×', '/': '÷' }[item.problem.operation];

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  item.solvedAgain
                    ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 opacity-80'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800'
                }`}
              >
                <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Mathematical expression comparison */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-2 text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                      <FractionDisplay fraction={item.problem.f1} size="md" />
                      <span className="text-indigo-600 dark:text-indigo-400">{opSign}</span>
                      <FractionDisplay fraction={item.problem.f2} size="md" />
                      <span className="text-slate-400">=</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      {/* User's mistaken answer */}
                      <div className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-1 text-rose-700 dark:text-rose-400">
                        <span className="text-[10px] uppercase font-bold">{t.yourAnswer}</span>
                        <FractionDisplay fraction={item.userAnswer} size="sm" highlightColor="text-rose-700 dark:text-rose-400" />
                      </div>

                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />

                      {/* Correct simplified answer */}
                      <div className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <span className="text-[10px] uppercase font-bold">{t.correctAnswer}</span>
                        <FractionDisplay fraction={item.problem.correctAnswer} size="sm" highlightColor="text-emerald-700 dark:text-emerald-400" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    {item.solvedAgain ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {t.mastered}
                      </span>
                    ) : (
                      <button
                        onClick={() => onRetryMistake(item)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-xs shadow-xs transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {t.reviewNowBtn}
                      </button>
                    )}

                    <button
                      onClick={() => setExpandedMistakeId(isExpanded ? null : item.id)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition"
                    >
                      {isExpanded ? t.hideExplanation : t.viewExplanation}
                    </button>
                  </div>
                </div>

                {/* Expanded Explanation Section */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-4 text-xs sm:text-sm">
                    {item.problem.conceptExplanation && (
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>{t.errorAnalysis} </strong>
                          {item.problem.conceptExplanation}
                        </div>
                      </div>
                    )}

                    {/* Visual Comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <VisualFractionModel
                        fraction={item.problem.f1}
                        size="sm"
                        colorTheme="sky"
                        label={`${t.fraction1} (${item.problem.f1.num}/${item.problem.f1.den})`}
                      />
                      <VisualFractionModel
                        fraction={item.problem.f2}
                        size="sm"
                        colorTheme="amber"
                        label={`${t.fraction2} (${item.problem.f2.num}/${item.problem.f2.den})`}
                      />
                    </div>

                    {/* Step by Step Resolution */}
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                      <span className="font-bold text-slate-500 uppercase text-[10px]">
                        {t.correctionProcedure}
                      </span>
                      {item.problem.stepByStep.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                          <span className="font-bold text-indigo-500">•</span>
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>

                    {!item.solvedAgain && (
                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => {
                            sounds.playCorrect();
                            onMarkSolved(item.id);
                          }}
                          className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                        >
                          {t.markAsMastered}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
