import React from 'react';
import { Fraction } from '../types/fractions';

interface VisualFractionModelProps {
  fraction: Fraction;
  type?: 'circle' | 'bar';
  size?: 'sm' | 'md' | 'lg';
  colorTheme?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
  label?: string;
  showDetails?: boolean;
}

export const VisualFractionModel: React.FC<VisualFractionModelProps> = ({
  fraction,
  type = 'circle',
  size = 'md',
  colorTheme = 'indigo',
  label,
  showDetails = true,
}) => {
  const num = Math.abs(fraction.num);
  const den = Math.max(1, Math.abs(fraction.den));

  const colors = {
    indigo: {
      fill: '#6366f1',
      empty: '#e2e8f0',
      darkEmpty: '#334155',
      stroke: '#4338ca',
      bgCard: 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-900/40',
      badge: 'text-indigo-600 dark:text-indigo-400',
    },
    emerald: {
      fill: '#10b981',
      empty: '#e2e8f0',
      darkEmpty: '#334155',
      stroke: '#047857',
      bgCard: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40',
      badge: 'text-emerald-600 dark:text-emerald-400',
    },
    amber: {
      fill: '#f59e0b',
      empty: '#e2e8f0',
      darkEmpty: '#334155',
      stroke: '#b45309',
      bgCard: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40',
      badge: 'text-amber-600 dark:text-amber-400',
    },
    rose: {
      fill: '#f43f5e',
      empty: '#e2e8f0',
      darkEmpty: '#334155',
      stroke: '#be123c',
      bgCard: 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/40',
      badge: 'text-rose-600 dark:text-rose-400',
    },
    sky: {
      fill: '#0ea5e9',
      empty: '#e2e8f0',
      darkEmpty: '#334155',
      stroke: '#0369a1',
      bgCard: 'bg-sky-50/50 dark:bg-sky-950/20 border-sky-100 dark:border-sky-900/40',
      badge: 'text-sky-600 dark:text-sky-400',
    },
  }[colorTheme];

  const dimension = {
    sm: { circle: 56, barW: 80, barH: 20 },
    md: { circle: 84, barW: 130, barH: 28 },
    lg: { circle: 110, barW: 180, barH: 36 },
  }[size];

  // If numbers are too high to render meaningful slices
  if (den > 30 || num > 50) {
    return (
      <div className={`p-3 rounded-xl border text-center text-xs text-slate-500 dark:text-slate-400 ${colors.bgCard}`}>
        {label && <div className="font-semibold mb-1">{label}</div>}
        <div>{num}/{den} (demasiadas partes para graficar)</div>
      </div>
    );
  }

  const wholeParts = Math.floor(num / den);
  const remainder = num % den;
  const totalShapes = wholeParts + (remainder > 0 ? 1 : 0);
  const totalRender = totalShapes === 0 ? 1 : Math.min(totalShapes, 4);

  return (
    <div className={`flex flex-col items-center p-3 rounded-2xl border transition-colors ${colors.bgCard}`}>
      {label && (
        <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${colors.badge}`}>
          {label}
        </span>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: totalRender }).map((_, shapeIdx) => {
          let filledCount = 0;
          if (shapeIdx < wholeParts) {
            filledCount = den;
          } else if (shapeIdx === wholeParts) {
            filledCount = remainder;
          }

          if (type === 'circle') {
            return (
              <CircleModel
                key={shapeIdx}
                filled={filledCount}
                total={den}
                size={dimension.circle}
                fillColor={colors.fill}
              />
            );
          } else {
            return (
              <BarModel
                key={shapeIdx}
                filled={filledCount}
                total={den}
                width={dimension.barW}
                height={dimension.barH}
                fillColor={colors.fill}
              />
            );
          }
        })}
      </div>

      {showDetails && (
        <div className="mt-2 text-xs font-semibold tabular-nums text-slate-600 dark:text-slate-400">
          {num} de {den} partes {wholeParts > 0 ? `(${wholeParts} entero${wholeParts > 1 ? 's' : ''} + ${remainder}/${den})` : ''}
        </div>
      )}
    </div>
  );
};

// SVG Pie/Circle renderer with exact trigonometric slice coordinates
const CircleModel: React.FC<{ filled: number; total: number; size: number; fillColor: string }> = ({
  filled,
  total,
  size,
  fillColor,
}) => {
  const radius = 40;
  const center = 50;
  const viewBoxSize = 100;

  // Single filled circle if filled == total
  if (filled >= total) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="drop-shadow-sm">
        <circle cx={center} cy={center} r={radius} fill={fillColor} />
        {/* Draw divider radial lines */}
        {total > 1 &&
          Array.from({ length: total }).map((_, i) => {
            const angle = (i * 2 * Math.PI) / total - Math.PI / 2;
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth="1.5"
                opacity="0.6"
              />
            );
          })}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} className="drop-shadow-sm">
      {/* Background empty circle */}
      <circle cx={center} cy={center} r={radius} className="fill-slate-200 dark:fill-slate-800" />

      {/* Render slices */}
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        const startAngle = (i * 2 * Math.PI) / total - Math.PI / 2;
        const endAngle = ((i + 1) * 2 * Math.PI) / total - Math.PI / 2;

        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);

        const largeArc = 2 * Math.PI / total > Math.PI ? 1 : 0;
        const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

        return (
          <path
            key={i}
            d={pathData}
            fill={isFilled ? fillColor : 'transparent'}
            stroke="white"
            strokeWidth="1.5"
            className="transition-all duration-200"
          />
        );
      })}

      {/* Border rim */}
      <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
    </svg>
  );
};

// Rectangular strip fraction model
const BarModel: React.FC<{ filled: number; total: number; width: number; height: number; fillColor: string }> = ({
  filled,
  total,
  width,
  height,
  fillColor,
}) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="flex rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 shadow-inner"
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: i < filled ? fillColor : 'transparent',
            width: `${100 / total}%`,
          }}
          className="h-full border-r border-white/60 dark:border-slate-900/60 last:border-r-0 transition-colors duration-200"
        />
      ))}
    </div>
  );
};
