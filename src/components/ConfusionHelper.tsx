import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { MathFormula } from './MathFormula';

export const ConfusionHelper: React.FC = () => {
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          为什么弧长除以 180，而扇形面积除以 360？
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          本质推导只要 10 秒钟，考场绝不再混淆。
        </p>
      </div>

      {/* Two Column Direct Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Arc Length */}
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
            <span>弧长公式</span>
            <span className="font-mono">分母是 180</span>
          </div>
          <div className="py-2 text-center bg-white dark:bg-slate-800 rounded-lg border border-rose-100 dark:border-rose-900/40">
            <MathFormula math="l = \frac{n}{180}\pi r" className="text-lg font-bold text-rose-600" />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>推导原理：</strong>整圆周长是 <MathFormula math="2\pi r" />。圆心角占比为 <MathFormula math="\frac{n}{360} \times 2\pi r" />。分子里的 <strong>2</strong> 与分母 360 约分，所以剩 <strong>180</strong>！
          </p>
        </div>

        {/* Sector Area */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>扇形面积公式</span>
            <span className="font-mono">分母是 360</span>
          </div>
          <div className="py-2 text-center bg-white dark:bg-slate-800 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
            <MathFormula math="S = \frac{n}{360}\pi r^2" className="text-lg font-bold text-indigo-600" />
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>推导原理：</strong>整圆面积是 <MathFormula math="\pi r^2" />。圆心角占比为 <MathFormula math="\frac{n}{360} \times \pi r^2" />。公式里<strong>没有系数 2</strong> 可约分，所以牢牢保留 <strong>360</strong>！
          </p>
        </div>
      </div>

      {/* Mnemonic & Bridge */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="font-bold text-slate-800 dark:text-slate-200">
            💡 口诀速记：“周长带2除剩百八 (180)，面积无2全留三六 (360)”
          </div>
          <div className="text-slate-500">
            三角形桥梁公式：<MathFormula math="S = \frac{1}{2} l r" />（底是弧长 l，高是半径 r）
          </div>
        </div>
      </div>

      {/* Quick 10-second Diagnostic */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          快速自我检测：
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <span>弧长公式分母是：</span>
            <div className="flex gap-1.5">
              {[180, 360].map((num) => (
                <button
                  key={num}
                  onClick={() => setQ1(num)}
                  className={`px-2.5 py-1 rounded text-xs transition ${
                    q1 === num
                      ? num === 180
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <span>扇形面积分母是：</span>
            <div className="flex gap-1.5">
              {[180, 360].map((num) => (
                <button
                  key={num}
                  onClick={() => setQ2(num)}
                  className={`px-2.5 py-1 rounded text-xs transition ${
                    q2 === num
                      ? num === 360
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
