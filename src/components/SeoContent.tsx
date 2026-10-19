import React from 'react';
import { BookOpen, HelpCircle, Check, Sparkles, Hash, Table } from 'lucide-react';
import { MathFormula } from './MathFormula';

export const SeoContent: React.FC = () => {
  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 text-slate-800 dark:text-slate-200 leading-relaxed">
      {/* Main Title */}
      <header className="border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>初中数学几何专项复习与在线工具指南</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          扇形面积计算公式、弧长在线计算器与圆心角求解全攻略
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          本站为初中生、高中生、数学教师及工程设计人员提供精准的扇形面积公式推导、弧长在线计算、已知两量反求以及圆锥侧面展开图转化。
        </p>
      </header>

      {/* Section 1: 核心公式汇总表 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Hash className="w-5 h-5 text-indigo-600" />
          一、扇形全套核心计算公式汇总（角度制与弧度制）
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                <th className="p-3 border border-slate-200 dark:border-slate-700">计算目标</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700">角度制公式 (<MathFormula math="n^\circ" />)</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700">弧度制公式 (<MathFormula math="\alpha" />)</th>
                <th className="p-3 border border-slate-200 dark:border-slate-700">考点避坑提醒</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  弧长 <MathFormula math="l" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono text-rose-600 dark:text-rose-400 font-bold">
                  <MathFormula math="l = \frac{n\pi r}{180}" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono">
                  <MathFormula math="l = \alpha r" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  分母是 <strong>180</strong>（由 <MathFormula math="\frac{n}{360} \times 2\pi r" /> 约分得到）
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  扇形面积 <MathFormula math="S" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  <MathFormula math="S = \frac{n\pi r^2}{360}" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono">
                  <MathFormula math="S = \frac{1}{2}\alpha r^2" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  分母是 <strong>360</strong>（整圆面积 <MathFormula math="\pi r^2" /> 无系数2）
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  面积与弧长关系
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono text-emerald-600 dark:text-emerald-400 font-bold" colSpan={2}>
                  <MathFormula math="S = \frac{1}{2} l r" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  形似三角形面积 <MathFormula math="\frac{1}{2}\times\text{底}\times\text{高}" />，弧长为底、半径为高
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  扇形周长 <MathFormula math="C" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono" colSpan={2}>
                  <MathFormula math="C = l + 2r" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 font-medium">
                  易错点：必须加上两条直线半径 <MathFormula math="+2r" />，不能只算弧长
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  圆心角反求 <MathFormula math="n" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono" colSpan={2}>
                  <MathFormula math="n = \frac{180l}{\pi r} = \frac{360S}{\pi r^2}" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  已知弧长或面积时快速反算圆心角度数
                </td>
              </tr>
              <tr>
                <td className="p-3 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  圆锥侧面展开角
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 font-mono text-cyan-600 dark:text-cyan-400 font-bold" colSpan={2}>
                  <MathFormula math="n = \frac{r_{底}}{R} \times 360^\circ" />
                </td>
                <td className="p-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  中考口诀：“底半比母乘三百六”，<MathFormula math="R" />为母线长
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: 特殊圆心角速查表 */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-600" />
          二、常见特殊圆心角占比与速查表
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { angle: '30°', fraction: '1/12', arc: 'πr/6', area: 'πr²/12' },
            { angle: '45°', fraction: '1/8', arc: 'πr/4', area: 'πr²/8' },
            { angle: '60°', fraction: '1/6', arc: 'πr/3', area: 'πr²/6' },
            { angle: '90°', fraction: '1/4 (直角扇形)', arc: 'πr/2', area: 'πr²/4' },
            { angle: '120°', fraction: '1/3', arc: '2πr/3', area: 'πr²/3' },
            { angle: '135°', fraction: '3/8', arc: '3πr/4', area: '3πr²/8' },
            { angle: '180°', fraction: '1/2 (半圆)', arc: 'πr', area: 'πr²/2' },
            { angle: '270°', fraction: '3/4 (优弧扇形)', arc: '3πr/2', area: '3πr²/4' },
          ].map((item) => (
            <div
              key={item.angle}
              className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
            >
              <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">{item.angle}</div>
              <div className="text-slate-500 mt-0.5">占整圆：{item.fraction}</div>
              <div className="mt-1 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                弧长: {item.arc}
              </div>
              <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
                面积: {item.area}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: 常见问题 FAQ */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          三、常见问题解答 (FAQ)
        </h2>
        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              问：为什么做题时老师强调区分 180 和 360？
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              答：因为圆的周长公式是 <MathFormula math="2\pi r" />，其中的常数 2 与分母 360 发生约分变成了 180；而圆的面积公式是 <MathFormula math="\pi r^2" />，没有常数 2，分母依然是 360。这是初中生期中、期末和中考最容易丢分的粗心点！
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              问：已知弧长和面积，怎么最快求出半径？
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              答：千万不要先去求圆心角！直接利用桥梁公式 <MathFormula math="S = \frac{1}{2}lr" />，变形得到 <MathFormula math="r = \frac{2S}{l}" />，只需一步除法即可瞬间出答案，既省时间又绝不出错。
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              问：中考求阴影部分面积（弓形面积）的常用方法是什么？
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              答：通常使用“割补法”：劣弧对应的弓形面积 = 扇形面积 - 三角形面积，即 <MathFormula math="S_{弓} = S_{扇形} - S_{\triangle OAB} = \frac{n\pi r^2}{360} - \frac{1}{2}r^2\sin n" />。
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
