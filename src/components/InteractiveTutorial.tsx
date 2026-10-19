import React, { useState } from 'react';
import { BookOpen, CheckCircle2, ArrowRight, Lightbulb, Calculator, HelpCircle } from 'lucide-react';
import { MathFormula } from './MathFormula';
import { Language, translations } from '../i18n/translations';

interface InteractiveTutorialProps {
  lang?: Language;
  onLoadExample?: (r: number, n: number) => void;
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  lang = 'en',
  onLoadExample,
}) => {
  const t = translations[lang];
  const isEn = lang === 'en';
  const [activeStep, setActiveStep] = useState<number>(1);

  const workedExamples = [
    {
      title: isEn ? 'Example 1: Find Area and Arc of a 60° Sector' : '例题 1：求 60° 扇形面积与弧长',
      r: 6,
      n: 60,
      given: isEn ? 'Radius r = 6 cm, Angle n = 60°' : '已知半径 r = 6 cm，圆心角 n = 60°',
      steps: [
        {
          desc: isEn ? 'Arc Length Formula (denom. 180):' : '代入弧长公式（分母180）：',
          math: 'l = \\frac{60}{180} \\times \\pi \\times 6 = \\frac{1}{3} \\times 6\\pi = 2\\pi \\approx 6.283\\text{ cm}',
        },
        {
          desc: isEn ? 'Sector Area Formula (denom. 360):' : '代入扇形面积公式（分母360）：',
          math: 'S = \\frac{60}{360} \\times \\pi \\times 6^2 = \\frac{1}{6} \\times 36\\pi = 6\\pi \\approx 18.850\\text{ cm}^2',
        },
        {
          desc: isEn ? 'Verification using S = ½·l·r:' : '利用三角形桥梁公式验算：',
          math: 'S = \\frac{1}{2} \\times (2\\pi) \\times 6 = 6\\pi\\text{ cm}^2',
        },
      ],
    },
    {
      title: isEn ? 'Example 2: 90° Right-Angle Sector (Quarter Circle)' : '例题 2：90° 直角扇形（四分之一圆）',
      r: 8,
      n: 90,
      given: isEn ? 'Radius r = 8 cm, Angle n = 90°' : '已知半径 r = 8 cm，圆心角 n = 90°',
      steps: [
        {
          desc: isEn ? 'Arc Length is ¼ of circumference:' : '弧长占圆周长的四分之一：',
          math: 'l = \\frac{90}{180}\\pi(8) = 4\\pi \\approx 12.566\\text{ cm}',
        },
        {
          desc: isEn ? 'Area is ¼ of circle area:' : '面积占整圆面积的四分之一：',
          math: 'S = \\frac{90}{360}\\pi(8^2) = \\frac{1}{4} \\times 64\\pi = 16\\pi \\approx 50.265\\text{ cm}^2',
        },
        {
          desc: isEn ? 'Total Sector Perimeter (Includes +2r):' : '扇形总周长（千万别漏加两条半径 2r）：',
          math: 'C = l + 2r = 4\\pi + 2(8) = 4\\pi + 16 \\approx 28.566\\text{ cm}',
        },
      ],
    },
    {
      title: isEn ? 'Example 3: Obtuse Angle 120° Sector with Chord' : '例题 3：钝角 120° 扇形与弦长',
      r: 10,
      n: 120,
      given: isEn ? 'Radius r = 10 cm, Angle n = 120°' : '已知半径 r = 10 cm，圆心角 n = 120°',
      steps: [
        {
          desc: isEn ? 'Arc Length:' : '求弧长：',
          math: 'l = \\frac{120}{180}\\pi(10) = \\frac{20}{3}\\pi \\approx 20.944\\text{ cm}',
        },
        {
          desc: isEn ? 'Sector Area:' : '求扇形面积：',
          math: 'S = \\frac{120}{360}\\pi(10^2) = \\frac{100}{3}\\pi \\approx 104.720\\text{ cm}^2',
        },
        {
          desc: isEn ? 'Chord Length c = 2r·sin(n/2):' : '求弦长 c = 2r·sin(n/2)：',
          math: 'c = 2(10)\\sin(60^\\circ) = 20 \\times \\frac{\\sqrt{3}}{2} = 10\\sqrt{3} \\approx 17.321\\text{ cm}',
        },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1.5">
          <BookOpen className="w-4 h-4" />
          <span>{isEn ? 'Step-by-Step Educational Guide' : '权威图文教程与实战题解'}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t.tutorialTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.tutorialSub}
        </p>
      </div>

      {/* 3 Step Interactive Walkthrough Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveStep(1)}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            activeStep === 1
              ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/30 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </span>
            <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
              {isEn ? 'Full Circle Base' : '整圆基准'}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
            {t.tutStep1H}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.tutStep1P}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-700 dark:text-slate-300">
            <MathFormula math="A = \pi r^2, \quad C = 2\pi r" />
          </div>
        </div>

        <div
          onClick={() => setActiveStep(2)}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            activeStep === 2
              ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center">
              2
            </span>
            <span className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-bold">
              {isEn ? 'Angle Ratio' : '圆心角占比'}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
            {t.tutStep2H}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.tutStep2P}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-700 dark:text-slate-300">
            <MathFormula math="\text{Ratio} = \frac{n}{360^\circ} = \frac{\theta}{2\pi}" />
          </div>
        </div>

        <div
          onClick={() => setActiveStep(3)}
          className={`p-4 rounded-xl border transition cursor-pointer ${
            activeStep === 3
              ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-xs'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              3
            </span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              {isEn ? 'Final Multiply' : '乘出结果'}
            </span>
          </div>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">
            {t.tutStep3H}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.tutStep3P}
          </p>
          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-700 dark:text-slate-300">
            <MathFormula math="S = \frac{n}{360}\pi r^2, \quad l = \frac{n}{180}\pi r" />
          </div>
        </div>
      </div>

      {/* Worked Examples Section */}
      <div className="space-y-4 pt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>{isEn ? 'Worked Step-by-Step Examples' : '经典例题与解题演练'}</span>
          </h3>
          <span className="text-xs text-slate-400">
            {isEn ? 'Click button to load into calculator' : '点击可直接载入几何画板'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {workedExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {ex.title}
                  </span>
                </div>
                <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
                  {ex.given}
                </div>

                <div className="space-y-2 text-xs">
                  {ex.steps.map((st, sIdx) => (
                    <div key={sIdx} className="bg-white dark:bg-slate-900 p-2 rounded border border-slate-200/60 dark:border-slate-800">
                      <div className="text-[10px] text-slate-400 mb-0.5">{st.desc}</div>
                      <div className="overflow-x-auto">
                        <MathFormula math={st.math} className="text-[11px]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {onLoadExample && (
                <button
                  type="button"
                  onClick={() => onLoadExample(ex.r, ex.n)}
                  className="mt-3 w-full py-1.5 px-3 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition flex items-center justify-center gap-1.5"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Load into Calculator' : '载入上方画板演练'}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
