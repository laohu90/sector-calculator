import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, AlertCircle } from 'lucide-react';
import { solveInverseSector, KnownPairType, formatNumber, parseMathInput } from '../utils/mathUtils';
import { MathFormula } from './MathFormula';
import { SectorCanvas } from './SectorCanvas';
import { Language, translations } from '../i18n/translations';

interface InverseCalculatorProps {
  lang?: Language;
}

export const InverseCalculator: React.FC<InverseCalculatorProps> = ({ lang = 'en' }) => {
  const t = translations[lang];
  const [pairType, setPairType] = useState<KnownPairType>('l_s');
  const [raw1, setRaw1] = useState<string>('4π');
  const [raw2, setRaw2] = useState<string>('12π');

  const config = useMemo(() => {
    const isEn = lang === 'en';
    switch (pairType) {
      case 'r_l':
        return {
          title: isEn ? 'Known Radius r & Arc l' : '已知半径 r 与 弧长 l',
          label1: isEn ? 'Radius r (cm)' : '半径 r (cm)',
          label2: isEn ? 'Arc l (e.g. 4π or 12.56)' : '弧长 l (可输入含π，如 4π)',
          formula1: 'n = \\frac{180l}{\\pi r}',
          formula2: 'S = \\frac{1}{2}lr',
        };
      case 'r_s':
        return {
          title: isEn ? 'Known Radius r & Area S' : '已知半径 r 与 面积 S',
          label1: isEn ? 'Radius r (cm)' : '半径 r (cm)',
          label2: isEn ? 'Area S (e.g. 12π or 37.68)' : '面积 S (可输入含π，如 12π)',
          formula1: 'n = \\frac{360S}{\\pi r^2}',
          formula2: 'l = \\frac{2S}{r}',
        };
      case 'n_l':
        return {
          title: isEn ? 'Known Angle n & Arc l' : '已知圆心角 n 与 弧长 l',
          label1: isEn ? 'Angle n (°)' : '圆心角 n (°)',
          label2: isEn ? 'Arc l (e.g. 4π or 12.56)' : '弧长 l (可输入含π，如 4π)',
          formula1: 'r = \\frac{180l}{n\\pi}',
          formula2: 'S = \\frac{1}{2}lr',
        };
      case 'n_s':
        return {
          title: isEn ? 'Known Angle n & Area S' : '已知圆心角 n 与 面积 S',
          label1: isEn ? 'Angle n (°)' : '圆心角 n (°)',
          label2: isEn ? 'Area S (e.g. 12π or 37.68)' : '面积 S (可输入含π，如 12π)',
          formula1: 'r = \\sqrt{\\frac{360S}{n\\pi}}',
          formula2: 'l = \\frac{n\\pi r}{180}',
        };
      case 'l_s':
        return {
          title: isEn ? 'Known Arc l & Area S' : '已知弧长 l 与 面积 S',
          label1: isEn ? 'Arc l (e.g. 4π or 12.56)' : '弧长 l (可输入含π，如 4π)',
          label2: isEn ? 'Area S (e.g. 12π or 37.68)' : '面积 S (可输入含π，如 12π)',
          formula1: 'r = \\frac{2S}{l}',
          formula2: 'n = \\frac{180l}{\\pi r}',
        };
      case 'r_n':
      default:
        return {
          title: isEn ? 'Known Radius r & Angle n' : '已知半径 r 与 圆心角 n',
          label1: isEn ? 'Radius r (cm)' : '半径 r (cm)',
          label2: isEn ? 'Angle n (°)' : '圆心角 n (°)',
          formula1: 'l = \\frac{n\\pi r}{180}',
          formula2: 'S = \\frac{n\\pi r^2}{360}',
        };
    }
  }, [pairType, lang]);

  const handlePairChange = (type: KnownPairType) => {
    setPairType(type);
    switch (type) {
      case 'r_l':
        setRaw1('6');
        setRaw2('4π');
        break;
      case 'r_s':
        setRaw1('6');
        setRaw2('12π');
        break;
      case 'n_l':
        setRaw1('120');
        setRaw2('4π');
        break;
      case 'n_s':
        setRaw1('120');
        setRaw2('12π');
        break;
      case 'l_s':
        setRaw1('4π');
        setRaw2('12π');
        break;
      case 'r_n':
        setRaw1('6');
        setRaw2('120');
        break;
    }
  };

  const num1 = useMemo(() => parseMathInput(raw1), [raw1]);
  const num2 = useMemo(() => parseMathInput(raw2), [raw2]);

  const solved = useMemo(() => {
    return solveInverseSector(pairType, num1, num2, lang);
  }, [pairType, num1, num2, lang]);

  return (
    <div className="space-y-4">
      {/* Known pair selector */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
        <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-slate-200 text-xs font-bold">
          <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
          <span>{t.inverseSub}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 text-xs">
          {[
            { type: 'l_s' as KnownPairType, label: t.pairLS },
            { type: 'r_l' as KnownPairType, label: t.pairRL },
            { type: 'r_s' as KnownPairType, label: t.pairRS },
            { type: 'n_l' as KnownPairType, label: t.pairNL },
            { type: 'n_s' as KnownPairType, label: t.pairNS },
            { type: 'r_n' as KnownPairType, label: t.pairRN },
          ].map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => handlePairChange(item.type)}
              className={`py-2 px-2.5 rounded-lg border text-center transition ${
                pairType === item.type
                  ? 'bg-indigo-600 text-white border-indigo-600 font-bold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {config.label1}
            </label>
            <input
              type="text"
              value={raw1}
              onChange={(e) => setRaw1(e.target.value)}
              placeholder="e.g. 6 or 4π"
              className="w-full px-3 py-1.5 text-sm font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {raw1.includes('π') || raw1.includes('pi') ? (
              <span className="text-[10px] text-indigo-500 mt-0.5 block">≈ {num1.toFixed(3)}</span>
            ) : null}
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block mb-1">
              {config.label2}
            </label>
            <input
              type="text"
              value={raw2}
              onChange={(e) => setRaw2(e.target.value)}
              placeholder="e.g. 12π or 37.68"
              className="w-full px-3 py-1.5 text-sm font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
            {raw2.includes('π') || raw2.includes('pi') ? (
              <span className="text-[10px] text-indigo-500 mt-0.5 block">≈ {num2.toFixed(3)}</span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Results */}
      {solved ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          <div className="md:col-span-7 space-y-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-3">
                {lang === 'en' ? 'Solved Parameters:' : '反求结果：'}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                  <span className="text-slate-500 text-[11px]">{t.inverseRadius}</span>
                  <div className="text-xl font-black font-mono text-indigo-900 dark:text-indigo-200 mt-0.5">
                    {formatNumber(solved.radius, 3)} <span className="text-xs font-normal text-slate-400">cm</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-rose-50/40 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
                  <span className="text-slate-500 text-[11px]">{t.inverseAngle}</span>
                  <div className="text-xl font-black font-mono text-rose-900 dark:text-rose-200 mt-0.5">
                    {formatNumber(solved.angleDeg, 1)}°
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 text-[11px]">{t.sectorAreaTitle}</span>
                  <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                    {formatNumber(solved.area, 3)} (或 <MathFormula math={solved.areaPiExact} />)
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 text-[11px]">{t.perimeterTitle}</span>
                  <div className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                    {formatNumber(solved.perimeter, 3)} cm
                  </div>
                </div>
              </div>

              {/* Formula note */}
              <div className="mt-3 p-2.5 rounded bg-slate-50 dark:bg-slate-800/50 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <div>{lang === 'en' ? 'Step 1 Formula:' : '推导公式 1:'} <MathFormula math={config.formula1} /></div>
                <div>{lang === 'en' ? 'Step 2 Formula:' : '推导公式 2:'} <MathFormula math={config.formula2} /></div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <SectorCanvas
              radius={solved.radius}
              angleDeg={solved.angleDeg}
              arcLength={solved.arcLength}
              area={solved.area}
              chordLength={solved.chordLength}
              lang={lang}
            />
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>{t.invalidInput}</span>
        </div>
      )}
    </div>
  );
};
