import React, { useState } from 'react';
import { Calculator, Sparkles, Layers, Printer } from 'lucide-react';
import { Fraction, Operation } from '../types/fractions';
import { solveOperation } from '../utils/mathEngine';
import { FractionDisplay } from '../components/FractionDisplay';
import { VisualFractionModel } from '../components/VisualFractionModel';
import { sounds } from '../utils/soundEffects';
import { Language, Translations } from '../utils/i18n';

interface LabVisualizerViewProps {
  t: Translations;
  lang: Language;
}

export const LabVisualizerView: React.FC<LabVisualizerViewProps> = ({ t, lang }) => {
  const [f1, setF1] = useState<Fraction>({ num: 1, den: 2 });
  const [f2, setF2] = useState<Fraction>({ num: 1, den: 4 });
  const [op, setOp] = useState<Operation>('+');
  const [visualMode, setVisualMode] = useState<'circle' | 'bar'>('circle');

  const { result, steps } = solveOperation(f1, f2, op, lang);

  const presets = [
    { label: '1/2 + 1/4', f1: { num: 1, den: 2 }, f2: { num: 1, den: 4 }, op: '+' as Operation },
    { label: '2/3 − 1/6', f1: { num: 2, den: 3 }, f2: { num: 1, den: 6 }, op: '-' as Operation },
    { label: '3/4 × 2/3', f1: { num: 3, den: 4 }, f2: { num: 2, den: 3 }, op: '*' as Operation },
    { label: '1/2 ÷ 1/4', f1: { num: 1, den: 2 }, f2: { num: 1, den: 4 }, op: '/' as Operation },
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    sounds.playClick();
    setF1(p.f1);
    setF2(p.f2);
    setOp(p.op);
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

      {/* Preset Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 dark:text-slate-500 font-bold whitespace-nowrap">
          {t.quickExamples}
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleApplyPreset(p)}
            className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-slate-700 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-slate-700 whitespace-nowrap transition"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Interactive Fraction Input Workspace */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {/* Fraction 1 Input */}
          <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 w-28">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">{t.fraction1}</span>
            <input
              type="number"
              min="1"
              max="20"
              value={f1.num}
              onChange={e => setF1({ ...f1, num: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-16 text-center text-2xl font-black rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 py-1"
            />
            <div className="w-full h-1 bg-slate-700 dark:bg-slate-300 my-2 rounded-full" />
            <input
              type="number"
              min="1"
              max="20"
              value={f1.den}
              onChange={e => setF1({ ...f1, den: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-16 text-center text-2xl font-black rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 py-1"
            />
          </div>

          {/* Operation Selector */}
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-2">{t.operation}</span>
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              {(['+', '-', '*', '/'] as Operation[]).map(o => (
                <button
                  key={o}
                  onClick={() => { sounds.playClick(); setOp(o); }}
                  className={`w-10 h-10 rounded-xl text-lg font-black transition-all ${
                    op === o
                      ? 'bg-indigo-600 text-white shadow-md scale-105'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {o === '*' ? '×' : o === '/' ? '÷' : o === '-' ? '−' : '+'}
                </button>
              ))}
            </div>
          </div>

          {/* Fraction 2 Input */}
          <div className="flex flex-col items-center bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 w-28">
            <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">{t.fraction2}</span>
            <input
              type="number"
              min="1"
              max="20"
              value={f2.num}
              onChange={e => setF2({ ...f2, num: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-16 text-center text-2xl font-black rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 py-1"
            />
            <div className="w-full h-1 bg-slate-700 dark:bg-slate-300 my-2 rounded-full" />
            <input
              type="number"
              min="1"
              max="20"
              value={f2.den}
              onChange={e => setF2({ ...f2, den: Math.max(1, parseInt(e.target.value) || 1) })}
              className="w-16 text-center text-2xl font-black rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 py-1"
            />
          </div>

          <span className="text-3xl font-black text-slate-400 dark:text-slate-600">=</span>

          {/* Result Card */}
          <div className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 min-w-[120px]">
            <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 mb-1">
              {t.result}
            </span>
            <div className="py-2">
              <FractionDisplay fraction={result} size="xl" highlightColor="text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Visual Dynamic Models Row */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>{t.visualModelsTitle} ({visualMode === 'circle' ? t.circleModel : t.barModel})</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <VisualFractionModel
            fraction={f1}
            type={visualMode}
            size="lg"
            colorTheme="sky"
            label={`${t.fraction1}: ${f1.num}/${f1.den}`}
          />

          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-slate-400 mb-2">
              {op === '*' ? '×' : op === '/' ? '÷' : op === '-' ? '−' : '+'}
            </span>
            <VisualFractionModel
              fraction={f2}
              type={visualMode}
              size="lg"
              colorTheme="amber"
              label={`${t.fraction2}: ${f2.num}/${f2.den}`}
            />
          </div>

          <VisualFractionModel
            fraction={result}
            type={visualMode}
            size="lg"
            colorTheme="emerald"
            label={`${t.simplifiedResult} ${result.num}/${result.den}`}
          />
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
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-sm text-slate-800 dark:text-slate-200"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <p className="leading-relaxed">{st}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
