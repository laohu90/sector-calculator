import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { SectorCalculationResult, formatNumber } from '../utils/mathUtils';
import { MathFormula } from './MathFormula';

interface StandardCalculatorProps {
  radius: number;
  angleDeg: number;
  onRadiusChange: (val: number) => void;
  onAngleChange: (val: number) => void;
  result: SectorCalculationResult;
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({
  radius,
  angleDeg,
  onRadiusChange,
  onAngleChange,
  result,
}) => {
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
              <span>半径 r</span>
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
              <span>圆心角 n°</span>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="360"
                  step="1"
                  value={angleDeg}
                  onChange={(e) => onAngleChange(Math.max(1, Math.min(360, parseFloat(e.target.value) || 1)))}
                  className="w-20 px-2 py-0.5 text-right font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded focus:ring-1 focus:ring-indigo-500 focus:outline-none"
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

      {/* Primary Results: Clean 2-column layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Sector Area S */}
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 rounded-xl p-4 relative group">
          <div className="flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-400 font-semibold mb-1">
            <span>扇形面积 S</span>
            <button
              onClick={() => handleCopy(`${formatNumber(result.area, 4)} (${result.areaPiExact})`, 's')}
              className="text-indigo-400 hover:text-indigo-700"
              title="复制"
            >
              {copiedKey === 's' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-2xl font-black text-indigo-950 dark:text-indigo-100 font-mono">
            {formatNumber(result.area, 4)}
            <span className="text-xs font-normal text-slate-400 ml-1">cm²</span>
          </div>
          <div className="text-xs text-indigo-800 dark:text-indigo-300 mt-1 flex items-center gap-1">
            <span>含π精确值: </span>
            <MathFormula math={`S = ${result.areaPiExact}`} />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            公式: <MathFormula math="S = \frac{n}{360}\pi r^2 = \frac{1}{2}lr" />
          </div>
        </div>

        {/* Arc Length l */}
        <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/60 rounded-xl p-4 relative group">
          <div className="flex items-center justify-between text-xs text-rose-700 dark:text-rose-400 font-semibold mb-1">
            <span>弧长 l (分母180)</span>
            <button
              onClick={() => handleCopy(`${formatNumber(result.arcLength, 4)} (${result.arcLengthPiExact})`, 'l')}
              className="text-rose-400 hover:text-rose-700"
              title="复制"
            >
              {copiedKey === 'l' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
          <div className="text-2xl font-black text-rose-950 dark:text-rose-100 font-mono">
            {formatNumber(result.arcLength, 4)}
            <span className="text-xs font-normal text-slate-400 ml-1">cm</span>
          </div>
          <div className="text-xs text-rose-800 dark:text-rose-300 mt-1 flex items-center gap-1">
            <span>含π精确值: </span>
            <MathFormula math={`l = ${result.arcLengthPiExact}`} />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            公式: <MathFormula math="l = \frac{n}{180}\pi r" />
          </div>
        </div>
      </div>

      {/* Secondary Clean Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">扇形周长 (l+2r)</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.perimeter, 3)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">弦长 AB</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.chordLength, 3)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">弓形面积</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.segmentArea, 3)}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5">
          <div className="text-slate-400 text-[11px]">对应圆锥底半径</div>
          <div className="font-bold font-mono text-slate-800 dark:text-slate-200 text-sm mt-0.5">
            {formatNumber(result.coneBaseRadius, 3)}
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
          <span>推导过程与计算步骤</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            {showSteps ? '收起' : '展开'}
            {showSteps ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </span>
        </button>

        {showSteps && (
          <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
            {result.steps.map((st, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">{st.title}</div>
                <div className="text-slate-600 dark:text-slate-400 font-mono">
                  代入: <MathFormula math={st.substitution} />
                </div>
                <div className="text-indigo-600 dark:text-indigo-400 font-bold font-mono">
                  结果: <MathFormula math={st.result} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
