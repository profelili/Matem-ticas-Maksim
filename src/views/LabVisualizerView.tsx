import React, { useState } from 'react';
import { Calculator, Sparkles, Layers, Printer, Plus, Trash2, BookmarkPlus, Check } from 'lucide-react';
import { Fraction, Operation } from '../types/fractions';
import { solveMultipleFractions } from '../utils/mathEngine';
import { FractionDisplay } from '../components/FractionDisplay';
import { VisualFractionModel } from '../components/VisualFractionModel';
import { sounds } from '../utils/soundEffects';
import { Language, Translations } from '../utils/i18n';

interface LabVisualizerViewProps {
  t: Translations;
  lang: Language;
}

interface PresetItem {
  label: string;
  fractions: Fraction[];
  ops: Operation[];
}

const COLOR_THEMES: ('sky' | 'amber' | 'indigo' | 'rose' | 'emerald')[] = [
  'sky',
  'amber',
  'indigo',
  'rose',
  'emerald',
];

export const LabVisualizerView: React.FC<LabVisualizerViewProps> = ({ t, lang }) => {
  const [fractions, setFractions] = useState<Fraction[]>([
    { num: 1, den: 2 },
    { num: 1, den: 4 },
  ]);
  const [ops, setOps] = useState<Operation[]>(['+']);
  const [visualMode, setVisualMode] = useState<'circle' | 'bar'>('circle');
  const [savedFeedback, setSavedFeedback] = useState(false);

  const [customPresets, setCustomPresets] = useState<PresetItem[]>([
    {
      label: '1/2 + 1/4',
      fractions: [{ num: 1, den: 2 }, { num: 1, den: 4 }],
      ops: ['+'],
    },
    {
      label: '1/2 + 1/4 + 1/3',
      fractions: [{ num: 1, den: 2 }, { num: 1, den: 4 }, { num: 1, den: 3 }],
      ops: ['+', '+'],
    },
    {
      label: '3/4 − 1/6 + 2/3',
      fractions: [{ num: 3, den: 4 }, { num: 1, den: 6 }, { num: 2, den: 3 }],
      ops: ['-', '+'],
    },
    {
      label: '2/3 × 1/4 + 1/2',
      fractions: [{ num: 2, den: 3 }, { num: 1, den: 4 }, { num: 1, den: 2 }],
      ops: ['*', '+'],
    },
    {
      label: '1/2 ÷ 1/4',
      fractions: [{ num: 1, den: 2 }, { num: 1, den: 4 }],
      ops: ['/'],
    },
  ]);

  const { result, steps } = solveMultipleFractions(fractions, ops, lang);

  const handleApplyPreset = (p: PresetItem) => {
    sounds.playClick();
    setFractions([...p.fractions.map(f => ({ ...f }))]);
    setOps([...p.ops]);
  };

  const handleAddFraction = () => {
    if (fractions.length >= 5) return;
    sounds.playLevelUp();
    const defaultDens = [3, 4, 5, 6, 8];
    const nextDen = defaultDens[fractions.length % defaultDens.length];
    setFractions(prev => [...prev, { num: 1, den: nextDen }]);
    setOps(prev => [...prev, '+']);
  };

  const handleRemoveFraction = (index: number) => {
    if (fractions.length <= 2) return;
    sounds.playClick();
    setFractions(prev => prev.filter((_, i) => i !== index));
    setOps(prev => {
      const newOps = [...prev];
      if (index === 0) {
        newOps.shift();
      } else {
        newOps.splice(index - 1, 1);
      }
      return newOps;
    });
  };

  const handleUpdateFraction = (index: number, field: 'num' | 'den', val: number) => {
    setFractions(prev =>
      prev.map((f, i) => {
        if (i !== index) return f;
        if (field === 'num') {
          return { ...f, num: Math.max(0, Math.min(20, val)) };
        } else {
          return { ...f, den: Math.max(1, Math.min(20, val)) };
        }
      })
    );
  };

  const handleUpdateOp = (index: number, newOp: Operation) => {
    sounds.playClick();
    setOps(prev => prev.map((o, i) => (i === index ? newOp : o)));
  };

  const handleSavePreset = () => {
    sounds.playCorrect();
    const label = fractions
      .map((f, i) => {
        const opSym = i > 0 ? ` ${ops[i - 1] === '*' ? '×' : ops[i - 1] === '/' ? '÷' : ops[i - 1]} ` : '';
        return `${opSym}${f.num}/${f.den}`;
      })
      .join('');

    const newPreset: PresetItem = {
      label,
      fractions: fractions.map(f => ({ ...f })),
      ops: [...ops],
    };

    setCustomPresets(prev => [newPreset, ...prev.slice(0, 7)]);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Calculator className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>{t.labTitle}</span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {t.labDesc}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Visual Model Switch */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => { sounds.playClick(); setVisualMode('circle'); }}
              className={`px-3 py-1.5 rounded-lg transition ${
                visualMode === 'circle'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.circleModel}
            </button>
            <button
              onClick={() => { sounds.playClick(); setVisualMode('bar'); }}
              className={`px-3 py-1.5 rounded-lg transition ${
                visualMode === 'bar'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.barModel}
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-xs font-medium"
            title={t.printOrSave}
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preset Pills & Custom Save Action */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-400 dark:text-slate-500 font-bold whitespace-nowrap">
          {t.quickExamples}
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {customPresets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPreset(p)}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-slate-700 whitespace-nowrap transition"
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={handleSavePreset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/60 whitespace-nowrap transition"
            title={t.saveCustomPreset}
          >
            {savedFeedback ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">{t.customPresetSaved}</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.saveCustomPreset}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Multi-Fraction Workspace */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {fractions.map((frac, idx) => (
            <React.Fragment key={idx}>
              {/* Fraction Term Box */}
              <div className="relative flex flex-col items-center bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 min-w-[125px] shadow-xs group">
                {/* Fraction Index & Delete Button */}
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    {t.fractionN} {idx + 1}
                  </span>
                  {fractions.length > 2 && (
                    <button
                      onClick={() => handleRemoveFraction(idx)}
                      className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition p-1 -mr-1 rounded-md"
                      title={t.removeFractionBtn}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Numerator Input & Mini Steppers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateFraction(idx, 'num', frac.num - 1)}
                    className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={frac.num}
                    onChange={e => handleUpdateFraction(idx, 'num', parseInt(e.target.value) || 0)}
                    className="w-14 text-center text-2xl font-black rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 py-1"
                  />
                  <button
                    onClick={() => handleUpdateFraction(idx, 'num', frac.num + 1)}
                    className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>

                <div className="w-full h-1 bg-slate-700 dark:bg-slate-300 my-2 rounded-full" />

                {/* Denominator Input & Mini Steppers */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdateFraction(idx, 'den', frac.den - 1)}
                    className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={frac.den}
                    onChange={e => handleUpdateFraction(idx, 'den', parseInt(e.target.value) || 1)}
                    className="w-14 text-center text-2xl font-black rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 py-1"
                  />
                  <button
                    onClick={() => handleUpdateFraction(idx, 'den', frac.den + 1)}
                    className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Operator Selector Between Fractions */}
              {idx < fractions.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                    {(['+', '-', '*', '/'] as Operation[]).map(o => (
                      <button
                        key={o}
                        onClick={() => handleUpdateOp(idx, o)}
                        className={`w-9 h-9 rounded-xl text-base font-black transition-all ${
                          ops[idx] === o
                            ? 'bg-indigo-600 text-white shadow-md scale-105'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {o === '*' ? '×' : o === '/' ? '÷' : o === '-' ? '−' : '+'}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}

          {/* "+ Agregar Fracción" Button */}
          {fractions.length < 5 ? (
            <button
              onClick={handleAddFraction}
              className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-700/80 hover:border-indigo-500 dark:hover:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-100/60 dark:hover:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-xs transition min-w-[125px] min-h-[140px] group shadow-xs cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-center">{t.addFractionBtn}</span>
            </button>
          ) : (
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 max-w-[100px] text-center">
              {t.maxFractionsReached}
            </div>
          )}

          <span className="text-3xl font-black text-slate-400 dark:text-slate-600">=</span>

          {/* Final Result Card */}
          <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 min-w-[130px] shadow-sm">
            <span className="text-[10px] uppercase font-extrabold text-emerald-700 dark:text-emerald-400 mb-1">
              {t.result}
            </span>
            <div className="py-2">
              <FractionDisplay fraction={result} size="xl" highlightColor="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Dynamic Models Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>{t.visualModelsTitle} ({visualMode === 'circle' ? t.circleModel : t.barModel})</span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {fractions.map((f, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <VisualFractionModel
                  fraction={f}
                  type={visualMode}
                  size="md"
                  colorTheme={COLOR_THEMES[i % COLOR_THEMES.length]}
                  label={`${t.fractionN} ${i + 1}: ${f.num}/${f.den}`}
                />
              </div>

              {i < fractions.length - 1 && (
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 px-1">
                    {ops[i] === '*' ? '×' : ops[i] === '/' ? '÷' : ops[i] === '-' ? '−' : '+'}
                  </span>
                </div>
              )}
            </React.Fragment>
          ))}

          <span className="text-3xl font-black text-slate-400 dark:text-slate-600 px-2">=</span>

          <div className="flex flex-col items-center">
            <VisualFractionModel
              fraction={result}
              type={visualMode}
              size="md"
              colorTheme="emerald"
              label={`${t.simplifiedResult} ${result.num}/${result.den}`}
            />
          </div>
        </div>
      </div>

      {/* Detailed Step-by-Step Mathematical Explanation */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{t.stepByStepTitle}</span>
        </h2>

        <div className="space-y-3">
          {steps.map((st, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-sm text-slate-800 dark:text-slate-200"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="leading-relaxed whitespace-pre-line">{st}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
