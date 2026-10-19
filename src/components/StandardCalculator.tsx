import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronUp, BookOpen, Calculator, Sparkles } from 'lucide-react';
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
  const [showAllSteps, setShowAllSteps] = useState(true);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Input Controls Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">输入半径与圆心角</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                支持高精度滑块微调与数值精准输入
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Radius Input */}
          <div className="space-y-2 bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                半径 <MathFormula math="r" />
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={radius}
                  onChange={(e) => onRadiusChange(Math.max(0.01, parseFloat(e.target.value) || 0.1))}
                  className="w-24 px-2.5 py-1 text-right font-mono font-bold text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-xs text-slate-500">cm</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="0.5"
              value={radius}
              onChange={(e) => onRadiusChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>
          </div>

          {/* Central Angle Input */}
          <div className="space-y-2 bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                圆心角 <MathFormula math="n^\circ" /> (或弧度 <MathFormula math="\alpha" />)
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="360"
                  step="1"
                  value={angleDeg}
                  onChange={(e) => onAngleChange(Math.max(0.1, Math.min(360, parseFloat(e.target.value) || 1)))}
                  className="w-24 px-2.5 py-1 text-right font-mono font-bold text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
                <span className="text-xs text-slate-500">°</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="360"
              step="1"
              value={angleDeg}
              onChange={(e) => onAngleChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0°</span>
              <span>180°(半圆)</span>
              <span>360°(整圆)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Computed Results Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sector Area */}
        <div className="bg-gradient-to-br from-indigo-50/90 to-white dark:from-indigo-950/40 dark:to-slate-900 border-2 border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-5 shadow-sm relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
              扇形面积 S
            </span>
            <button
              onClick={() => handleCopy(`${result.area.toFixed(4)} (或 ${result.areaPiExact})`, 'area')}
              className="p-1 rounded text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition"
              title="复制面积结果"
            >
              {copiedKey === 'area' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="my-2">
            <div className="text-2xl font-black text-indigo-950 dark:text-indigo-100 font-mono">
              {formatNumber(result.area, 4)}
            </div>
            <div className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mt-1 flex items-center gap-1">
              <span>精确值: </span>
              <MathFormula math={`S = ${result.areaPiExact}`} />
            </div>
          </div>

          <div className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 border-t border-indigo-100 dark:border-indigo-900/40 pt-2 mt-2">
            公式: <MathFormula math="S = \frac{n}{360}\pi r^2 = \frac{1}{2}lr" />
          </div>
        </div>

        {/* Arc Length */}
        <div className="bg-gradient-to-br from-rose-50/90 to-white dark:from-rose-950/40 dark:to-slate-900 border-2 border-rose-200 dark:border-rose-800/60 rounded-2xl p-5 shadow-sm relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
              弧长 l
            </span>
            <button
              onClick={() => handleCopy(`${result.arcLength.toFixed(4)} (或 ${result.arcLengthPiExact})`, 'arc')}
              className="p-1 rounded text-slate-400 hover:text-rose-600 dark:hover:text-rose-300 transition"
              title="复制弧长结果"
            >
              {copiedKey === 'arc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="my-2">
            <div className="text-2xl font-black text-rose-950 dark:text-rose-100 font-mono">
              {formatNumber(result.arcLength, 4)}
            </div>
            <div className="text-sm font-semibold text-rose-700 dark:text-rose-300 mt-1 flex items-center gap-1">
              <span>精确值: </span>
              <MathFormula math={`l = ${result.arcLengthPiExact}`} />
            </div>
          </div>

          <div className="text-[11px] text-rose-600/80 dark:text-rose-400/80 border-t border-rose-100 dark:border-rose-900/40 pt-2 mt-2">
            公式: <MathFormula math="l = \frac{n}{180}\pi r" /> (分母是180)
          </div>
        </div>

        {/* Sector Perimeter */}
        <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm relative group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              扇形周长 C
            </span>
            <button
              onClick={() => handleCopy(result.perimeter.toFixed(4), 'perimeter')}
              className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
              title="复制周长"
            >
              {copiedKey === 'perimeter' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="my-2">
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {formatNumber(result.perimeter, 4)}
            </div>
            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              <MathFormula math={`C = l + 2r = ${result.perimeterPiExact}`} />
            </div>
          </div>

          <div className="text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
            ⚠️ 别忘加两条半径: <MathFormula math="C = l + 2r" />
          </div>
        </div>

        {/* Chord Length & Sagitta */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">
            弦长 c 与 弓高 h
          </div>
          <div className="grid grid-cols-2 gap-2 my-1">
            <div>
              <span className="text-xs text-slate-400">弦长 AB</span>
              <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                {formatNumber(result.chordLength, 3)}
              </div>
            </div>
            <div>
              <span className="text-xs text-slate-400">弓高 h</span>
              <div className="text-lg font-bold font-mono text-slate-800 dark:text-slate-200">
                {formatNumber(result.sagitta, 3)}
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
            <MathFormula math="c = 2r\sin\frac{n}{2}, \quad h = r(1-\cos\frac{n}{2})" />
          </div>
        </div>

        {/* Triangle & Segment Area */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
            弓形面积 S弓 (割补法)
          </div>
          <div className="my-1">
            <div className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-300">
              {formatNumber(result.segmentArea, 4)}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              三角形面积 <MathFormula math={`S_{\\triangle} \\approx ${formatNumber(result.triangleArea, 3)}`} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
            中考割补: <MathFormula math="S_{弓} = S_{扇} - S_{\triangle}" />
          </div>
        </div>

        {/* Cone Lateral Relation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
            对应圆锥底面半径
          </div>
          <div className="my-1">
            <div className="text-lg font-bold font-mono text-cyan-800 dark:text-cyan-200">
              {formatNumber(result.coneBaseRadius, 4)}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              精确值: <MathFormula math={`r_{底} = ${result.coneBaseRadiusPiExact}`} />
            </div>
          </div>
          <div className="text-[11px] text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 mt-2">
            侧面展开: <MathFormula math="r_{底} = \frac{n}{360}R" />
          </div>
        </div>
      </div>

      {/* Step-by-Step Derivation Accordion */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setShowAllSteps(!showAllSteps)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition">
              详细标准解题步骤（中考答题格式规范）
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-slate-800 dark:group-hover:text-slate-200">
            <span>{showAllSteps ? '收起步骤' : '展开步骤'}</span>
            {showAllSteps ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAllSteps && (
          <div className="mt-5 space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {result.steps.map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 rounded-xl p-4 transition hover:border-indigo-300 dark:hover:border-indigo-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                    {st.title}
                  </span>
                  <button
                    onClick={() => handleCopy(`${st.formula} => ${st.substitution} => ${st.result}`, `step-${idx}`)}
                    className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1"
                  >
                    {copiedKey === `step-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>复制解题式</span>
                  </button>
                </div>

                <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800 space-y-1.5 font-mono text-sm">
                  <div className="text-slate-600 dark:text-slate-400 text-xs">
                    公式：<MathFormula math={st.formula} />
                  </div>
                  <div className="text-slate-800 dark:text-slate-200 text-sm">
                    代入：<MathFormula math={st.substitution} />
                  </div>
                  <div className="text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                    结果：<MathFormula math={st.result} />
                  </div>
                </div>

                {st.note && (
                  <p className="mt-2 text-xs text-amber-700 dark:text-amber-400 font-sans flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>{st.note}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
