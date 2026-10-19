import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight, Lightbulb, Zap, HelpCircle } from 'lucide-react';
import { MathFormula } from './MathFormula';

export const ConfusionHelper: React.FC = () => {
  const [testAnswer1, setTestAnswer1] = useState<number | null>(null);
  const [testAnswer2, setTestAnswer2] = useState<number | null>(null);
  const [testAnswer3, setTestAnswer3] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Title with attention banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            中考初中几何高频失分重灾区
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            为什么弧长除以 180，而扇形面积除以 360？
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            彻底弄懂数学本质，建立“几何直觉”，考场上再也不会死记硬背搞混！
          </p>
        </div>
      </div>

      {/* Side-by-side Derivation Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arc length Column */}
        <div className="rounded-xl border-2 border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300">
                弧长公式 (分母是 180)
              </span>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-mono">周长是一维长度</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-3.5 shadow-xs border border-rose-100 dark:border-rose-900/30 mb-4">
              <MathFormula math="l = \frac{n}{180}\pi r" block className="text-lg font-bold text-rose-600" />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  圆周长全长是 <MathFormula math="C = 2\pi r" />，整圆对应圆心角为 <MathFormula math="360^\circ" />。
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  圆心角为 <MathFormula math="1^\circ" /> 的弧长是全长的 <MathFormula math="\frac{1}{360}" />，即：
                  <MathFormula math="\frac{2\pi r}{360} = \frac{\pi r}{180}" />
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  所以圆心角为 <MathFormula math="n^\circ" /> 的弧长为：
                  <MathFormula math="l = n \times \frac{\pi r}{180} = \frac{n\pi r}{180}" />
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-200/60 dark:border-rose-900/40 text-xs text-rose-800 dark:text-rose-300 bg-rose-100/60 dark:bg-rose-900/40 p-2.5 rounded-lg flex items-center gap-2">
            <Zap className="w-4 h-4 text-rose-600 shrink-0" />
            <span>
              <strong>关键原因：</strong>因为圆周长公式里有乘数 <strong>2</strong>，和分母 360 约分后只剩下 <strong>180</strong>！
            </span>
          </div>
        </div>

        {/* Sector Area Column */}
        <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                扇形面积公式 (分母是 360)
              </span>
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">面积是二维平方</span>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-3.5 shadow-xs border border-indigo-100 dark:border-indigo-900/30 mb-4">
              <MathFormula math="S = \frac{n}{360}\pi r^2" block className="text-lg font-bold text-indigo-600" />
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </span>
                <p>
                  整个圆的面积是 <MathFormula math="A = \pi r^2" />，对应圆心角为 <MathFormula math="360^\circ" />。
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </span>
                <p>
                  圆心角为 <MathFormula math="1^\circ" /> 的扇形面积是整圆的 <MathFormula math="\frac{1}{360}" />，即：
                  <MathFormula math="\frac{\pi r^2}{360}" /> (没有系数2可约分！)
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </span>
                <p>
                  所以圆心角为 <MathFormula math="n^\circ" /> 的扇形面积为：
                  <MathFormula math="S = n \times \frac{\pi r^2}{360} = \frac{n\pi r^2}{360}" />
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-indigo-200/60 dark:border-indigo-900/40 text-xs text-indigo-800 dark:text-indigo-300 bg-indigo-100/60 dark:bg-indigo-900/40 p-2.5 rounded-lg flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>关键原因：</strong>因为圆面积公式是 <MathFormula math="\pi r^2" />，<strong>根本没有2</strong>，所以分母无法约分，保持 <strong>360</strong>！
            </span>
          </div>
        </div>
      </div>

      {/* Bridge Formula: The Triangle Analogy */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-200 dark:border-emerald-800/60 p-5">
        <div className="flex items-center gap-2 mb-2 text-emerald-800 dark:text-emerald-300 font-bold text-base">
          <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>终极验算与破局公式：三角形类比法 <MathFormula math="S = \frac{1}{2}lr" /></span>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          如果把扇形无限微分成许多极窄的小扇形，每一条小弧近似为底、半径为高，拉直后就是一个底为弧长 <MathFormula math="l" />、高为半径 <MathFormula math="r" /> 的三角形！
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white dark:bg-slate-800 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/40 text-center">
          <div>
            <div className="text-xs text-slate-500 mb-1">三角形面积</div>
            <MathFormula math="S_{\triangle} = \frac{1}{2} \times \text{底} \times \text{高}" />
          </div>
          <div className="flex items-center justify-center text-emerald-600 font-bold">
            <ArrowRight className="w-4 h-4" /> 对应转化 <ArrowRight className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-slate-500 mb-1">扇形面积 (弧长底，半径高)</div>
            <MathFormula math="S = \frac{1}{2} \cdot l \cdot r" className="text-emerald-600 font-bold" />
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-600 dark:text-slate-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded border border-emerald-200 dark:border-emerald-900/50">
          <strong>代入验证：</strong> 如果将 <MathFormula math="l = \frac{n\pi r}{180}" /> 代入 <MathFormula math="S = \frac{1}{2}lr" />，得到 <MathFormula math="S = \frac{1}{2} \times \frac{n\pi r}{180} \times r = \frac{n\pi r^2}{360}" />。两式完美契合！
        </div>
      </div>

      {/* Mnemonic Memorization Card */}
      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4">
        <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 mb-2">
          <Zap className="w-4 h-4 text-amber-600" />
          中考名师速记顺口溜（考前默念三遍）
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-amber-800/50 font-medium text-slate-800 dark:text-slate-200">
            <span className="text-rose-600 dark:text-rose-400 font-bold">“周长有二除以二，弧长分母剩百八 (180)”</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">求弧长 l 时，脑子里浮现 2πr，除以 2 变成 180。</p>
          </div>
          <div className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-amber-200 dark:border-amber-800/50 font-medium text-slate-800 dark:text-slate-200">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">“面积无二不可除，扇面分母坐三六 (360)”</span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">求面积 S 时，脑子里浮现 πr²，没有 2，所以牢牢留住 360。</p>
          </div>
        </div>
      </div>

      {/* Quick Interactive Diagnostic Check */}
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            防混淆即时诊断测试（30秒通关）
          </h3>
        </div>

        <div className="space-y-4 text-sm">
          {/* Question 1 */}
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">
              1. 弧长公式 <MathFormula math="l = \frac{n\pi r}{?}" /> 中的分母是？
            </p>
            <div className="flex items-center gap-3">
              {[180, 360].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTestAnswer1(val)}
                  className={`px-4 py-1.5 rounded-md border text-sm font-medium transition ${
                    testAnswer1 === val
                      ? val === 180
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  分母是 {val}
                </button>
              ))}
              {testAnswer1 !== null && (
                <span className="flex items-center gap-1 text-xs font-semibold">
                  {testAnswer1 === 180 ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> 正确！因为 2πr / 360 约分后为 180
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> 混淆了！周长带2，约分剩下180
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">
              2. 扇形面积公式 <MathFormula math="S = \frac{n\pi r^2}{?}" /> 中的分母是？
            </p>
            <div className="flex items-center gap-3">
              {[180, 360].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setTestAnswer2(val)}
                  className={`px-4 py-1.5 rounded-md border text-sm font-medium transition ${
                    testAnswer2 === val
                      ? val === 360
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  分母是 {val}
                </button>
              ))}
              {testAnswer2 !== null && (
                <span className="flex items-center gap-1 text-xs font-semibold">
                  {testAnswer2 === 360 ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> 正确！圆面积为 πr²，无系数2，分母为360
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> 混淆了！面积没有2可约分，分母是360
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">
              3. 扇形周长除了加上弧长 <MathFormula math="l" /> 之外，还必须加上什么？
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {[
                { key: 'none', label: '不用加，弧长就是周长' },
                { key: '1r', label: '加上 1 条半径 r' },
                { key: '2r', label: '加上 2 条半径 2r' },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setTestAnswer3(opt.key)}
                  className={`px-3 py-1.5 rounded-md border text-xs sm:text-sm font-medium transition ${
                    testAnswer3 === opt.key
                      ? opt.key === '2r'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              {testAnswer3 !== null && (
                <div className="w-full text-xs font-semibold mt-1">
                  {testAnswer3 === '2r' ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 shrink-0" /> 满分！周长是由 1条弧 + 2条半径组成的闭合图形 (C = l + 2r)！
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4 shrink-0" /> 警惕！很多中考题在此设陷阱，扇形周长必须包含两条直边半径 (2r)！
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
