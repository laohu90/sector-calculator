import React from 'react';
import { BookOpen, HelpCircle, Hash, Table } from 'lucide-react';
import { MathFormula } from './MathFormula';
import { Language, translations } from '../i18n/translations';

interface SeoContentProps {
  lang?: Language;
}

export const SeoContent: React.FC<SeoContentProps> = ({ lang = 'en' }) => {
  const t = translations[lang];
  const isEn = lang === 'en';

  return (
    <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-6 text-slate-800 dark:text-slate-200 leading-relaxed">
      {/* Main Title */}
      <header className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>{isEn ? 'Geometry Reference & Formula Handbook' : '初中数学几何专项复习与在线工具指南'}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {isEn
            ? 'Sector Area, Arc Length & Central Angle Formulas'
            : '扇形面积计算公式、弧长在线计算器与圆心角求解全攻略'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5">
          {isEn
            ? 'A precision calculation and learning tool for students, educators, and engineers. Covers exact values with π, reverse solving, and 3D cone unfolding.'
            : '本站为初中生、高中生、数学教师及工程设计人员提供精准的扇形面积公式推导、弧长在线计算、已知两量反求以及圆锥侧面展开图转化。'}
        </p>
      </header>

      {/* Section 1: Core Formula Table */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Hash className="w-4 h-4 text-indigo-600" />
          {isEn ? '1. Complete Sector Formulas (Degrees & Radians)' : '一、扇形全套核心计算公式汇总（角度制与弧度制）'}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-slate-200 dark:border-slate-700">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold">
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">{t.tableTarget}</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">{t.tableDegree}</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">{t.tableRadian}</th>
                <th className="p-2.5 border border-slate-200 dark:border-slate-700">{t.tableNotice}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2.5 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  {isEn ? 'Arc Length l' : '弧长 l'}
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono text-rose-600 dark:text-rose-400 font-bold">
                  <MathFormula math="l = \frac{n\pi r}{180}" />
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono">
                  <MathFormula math="l = \alpha r" />
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  {isEn ? 'Denominator is 180 (cancels with 2πr)' : '分母是 180（由 2πr / 360 约分得到）'}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  {isEn ? 'Sector Area S' : '扇形面积 S'}
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                  <MathFormula math="S = \frac{n\pi r^2}{360}" />
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono">
                  <MathFormula math="S = \frac{1}{2}\alpha r^2" />
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  {isEn ? 'Denominator is 360 (no factor 2 in πr²)' : '分母是 360（整圆面积 πr² 无系数2）'}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  {isEn ? 'Bridge Formula' : '面积与弧长关系'}
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono text-emerald-600 dark:text-emerald-400 font-bold" colSpan={2}>
                  <MathFormula math="S = \frac{1}{2} l r" />
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  {isEn ? 'Triangle analogy: ½ · base(l) · height(r)' : '形似三角形面积 ½×底×高，弧长为底、半径为高'}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  {isEn ? 'Perimeter C' : '扇形周长 C'}
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono" colSpan={2}>
                  <MathFormula math="C = l + 2r" />
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 font-medium">
                  {isEn ? 'Common trap: Must add both straight radii (+2r)!' : '易错点：必须加上两条直线半径 (+2r)，不能只算弧长'}
                </td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-850">
                  {isEn ? 'Cone Unfolding' : '圆锥侧面展开角'}
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 font-mono text-cyan-600 dark:text-cyan-400 font-bold" colSpan={2}>
                  <MathFormula math="n = \frac{r_{base}}{R} \times 360^\circ" />
                </td>
                <td className="p-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                  {isEn ? 'R is slant height; r_base is cone base radius' : '中考口诀：“底半比母乘三百六”，R为母线长'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Special Angles Table */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Table className="w-4 h-4 text-indigo-600" />
          {isEn ? '2. Common Angles Quick Reference' : '二、常见特殊圆心角占比与速查表'}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            { angle: '30°', fraction: '1/12', arc: 'πr/6', area: 'πr²/12' },
            { angle: '45°', fraction: '1/8', arc: 'πr/4', area: 'πr²/8' },
            { angle: '60°', fraction: '1/6', arc: 'πr/3', area: 'πr²/6' },
            { angle: '90°', fraction: '1/4', arc: 'πr/2', area: 'πr²/4' },
            { angle: '120°', fraction: '1/3', arc: '2πr/3', area: 'πr²/3' },
            { angle: '180°', fraction: '1/2', arc: 'πr', area: 'πr²/2' },
            { angle: '270°', fraction: '3/4', arc: '3πr/2', area: '3πr²/4' },
            { angle: '360°', fraction: '1', arc: '2πr', area: 'πr²' },
          ].map((item) => (
            <div
              key={item.angle}
              className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60"
            >
              <div className="font-bold text-xs text-indigo-600 dark:text-indigo-400">{item.angle}</div>
              <div className="text-slate-400 text-[10px]">{isEn ? 'Ratio:' : '占整圆:'} {item.fraction}</div>
              <div className="mt-1 font-mono text-[10px] text-slate-700 dark:text-slate-300">
                l: {item.arc}
              </div>
              <div className="font-mono text-[10px] text-slate-700 dark:text-slate-300">
                S: {item.area}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-indigo-600" />
          {isEn ? '3. Frequently Asked Questions (FAQ)' : '三、常见问题解答 (FAQ)'}
        </h2>
        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              {isEn
                ? 'Q: Why is 180 in the arc length formula and 360 in the area formula?'
                : '问：为什么做题时老师强调区分 180 和 360？'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'A: The circumference of a circle is 2πr. When calculating arc length per degree (2πr / 360), the 2 and 360 cancel, leaving πr / 180. Area is πr² without factor 2, keeping the full 360 denominator.'
                : '答：因为圆的周长公式是 2πr，其中的常数 2 与分母 360 发生约分变成了 180；而圆的面积公式是 πr²，没有常数 2，分母依然是 360。这是初中生期中、期末和中考最容易丢分的粗心点！'}
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">
              {isEn
                ? 'Q: How to quickly find radius when given arc length and area?'
                : '问：已知弧长和面积，怎么最快求出半径？'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {isEn
                ? 'A: Use the bridge formula S = ½ · l · r. Rearranging gives r = 2S / l. This solves the radius in a single division without needing to compute the central angle.'
                : '答：千万不要先去求圆心角！直接利用桥梁公式 S = ½·l·r，变形得到 r = 2S / l，只需一步除法即可瞬间出答案，既省时间又绝不出错。'}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};
