import React from 'react';
import { Fraction } from '../types/fractions';

interface FractionDisplayProps {
  fraction: Fraction;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  highlightColor?: string;
  showMixed?: boolean;
}

export const FractionDisplay: React.FC<FractionDisplayProps> = ({
  fraction,
  size = 'md',
  highlightColor,
  showMixed = false,
}) => {
  const isNegative = fraction.num < 0 || fraction.den < 0;
  const absNum = Math.abs(fraction.num);
  const absDen = Math.abs(fraction.den);

  const whole = showMixed && absDen > 0 ? Math.floor(absNum / absDen) : 0;
  const remNum = showMixed && absDen > 0 ? absNum % absDen : absNum;

  const sizeClasses = {
    sm: {
      text: 'text-sm font-semibold',
      line: 'border-b-[1.5px] w-5 my-0.5',
      wholeText: 'text-base font-bold mr-1',
    },
    md: {
      text: 'text-lg font-bold',
      line: 'border-b-2 w-7 my-0.5',
      wholeText: 'text-xl font-bold mr-1.5',
    },
    lg: {
      text: 'text-2xl font-extrabold',
      line: 'border-b-[2.5px] w-9 my-1',
      wholeText: 'text-3xl font-extrabold mr-2',
    },
    xl: {
      text: 'text-4xl font-black',
      line: 'border-b-4 w-14 my-1.5',
      wholeText: 'text-5xl font-black mr-3',
    },
  }[size];

  // If denominator is 1, just render as integer
  if (absDen === 1) {
    return (
      <span className={`inline-flex items-center tabular-nums ${sizeClasses.text} ${highlightColor || 'text-slate-900 dark:text-slate-100'}`}>
        {isNegative ? '−' : ''}{absNum}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center tabular-nums ${highlightColor || 'text-slate-900 dark:text-slate-100'}`}>
      {isNegative && <span className={`${sizeClasses.text} mr-1 font-bold`}>−</span>}
      {whole > 0 && <span className={sizeClasses.wholeText}>{whole}</span>}
      {remNum === 0 && whole > 0 ? null : (
        <span className="inline-flex flex-col items-center justify-center text-center leading-none">
          <span className={`${sizeClasses.text} px-0.5`}>{remNum}</span>
          <span className={`${sizeClasses.line} border-current opacity-80`} />
          <span className={`${sizeClasses.text} px-0.5`}>{absDen}</span>
        </span>
      )}
    </span>
  );
};
