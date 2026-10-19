import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { SectorCalculationResult, formatNumber } from '../utils/mathUtils';
import { MathFormula } from './MathFormula';
import { Language, translations } from '../i18n/translations';

interface StandardCalculatorProps {
  radius: number;
  angleDeg: number;
  lang?: Language;
  onRadiusChange: (val: number) => void;
  onAngleChange: (val: number) => void;
  result: SectorCalculationResult;
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({
  radius,
  angleDeg,
  lang = 'en',
  onRadiusChange,
  onAngleChange,
  result,
}) => {
  const t = translations[lang];
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Inputs Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Radius Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>{t.radiusInput}</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={radius}
                  onChange={(e) => onRadiusChange(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
                  className="w-20 px-2 py-0.5 text-right font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-slate-400">cm</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              step="0.5"
              value={radius}
              onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Angle Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>{t.angleInput}</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="360"
                  step="1"
                  value={angleDeg}
                  onChange={(e) => onAngleChange(Math.max(1, Math.min(360, parseFloat(e.target.value) || 1)))}
                  className="w-20 px-2 py-0.5 text-right font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-rose-500 focus:outline-none"
                />
                <span className="text-slate-400">°</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="360"
              step="1"
              value={angleDeg}
              onChange={(e) => onAngleChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-rose-600"
            />
          </div>
        </div>
      </div>

      {/* Primary Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Sector Area S */}
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 rounded-xl p-4 relative group">
          <div className="flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-400 font-semibold mb-1">
            <span>{t.sectorAreaTitle}</span>
            <button
              onClick={() => handleCopy(`${formatNumber(result.area, 4)} (${result.areaPiExact})`, 's')}
              className="text-indigo-400 hover:text-indigo-700"
              title="Copy"
            >
              {copiedKey === 's' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-2xl font-black text-indigo-950 dark:text-indigo-100 font-mono">
            {formatNumber(result.area, 4)}
            <span className="text-xs font-normal text-slate-400 ml-1">cm²</span>
          </div>
          <div className="text-xs text-indigo-800 dark:text-indigo-300 mt-1 flex items-center gap-1">
            <span>{t.exactPi} </span>
            <MathFormula math={`S = ${result.areaPiExact}`} />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <MathFormula math="S = \frac{n}{360}\pi r^2 = \frac{1}{2}lr" />
          </div>
        </div>

        {/* Arc Length l */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 rounded-xl p-4 relative group">
          <div className="flex items-center justify-between text-xs text-rose-700 dark:text-rose-400 font-semibold mb-1">
            <span>{t.arcLengthTitle}</span>
            <button
              onClick={() => handleCopy(`${formatNumber(result.arcLength, 4)} (${result.arcLengthPiExact})`, 'l')}
              className="text-rose-400 hover:text-rose-700"
              title="Copy"
            >
              {copiedKey === 'l' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-2xl font-black text-rose-950 dark:text-rose-100 font-mono">
            {formatNumber(result.arcLength, 4)}
            <span className="text-xs font-normal text-slate-400 ml-1">cm</span>
          </div>
          <div className="text-xs text-rose-800 dark:text-rose-300 mt-1 flex items-center gap-1">
            <span>{t.exactPi} </span>
            <MathFormula math={`l = ${result.arcLengthPiExact}`} />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            <MathFormula math="l = \frac{n}{180}\pi r" />
          </div>
        </div>
      </div>

      {/* Secondary Clean Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">{t.perimeterTitle}</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.perimeter, 3)} cm
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">{t.chordLabel} AB</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.chordLength, 3)} cm
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">{t.segmentToggle}</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.segmentArea, 3)} cm²
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">{t.coneBaseTitle}</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.coneBaseRadius, 3)} cm
          </div>
        </div>
      </div>

      {/* Collapsible Steps Drawer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowSteps(!showSteps)}
          className="w-full px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white flex items-center justify-between transition"
        >
          <span>{t.stepsToggle}</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            {showSteps ? t.hideSteps : t.showSteps}
            {showSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>

        {showSteps && (
          <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
            {result.steps.map((st, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">{st.title}</div>
                <div className="text-slate-600 dark:text-slate-400 font-mono">
                  {t.substLabel} <MathFormula math={st.substitution} />
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">
                  {t.resultLabel} <MathFormula math={st.result} />
                </div>
                {st.note && (
                  <div className="text-[11px] text-amber-600 dark:text-amber-400">
                    💡 {st.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
