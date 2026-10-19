import React, { useState, useMemo } from 'react';
import { RefreshCw, ArrowRightLeft, Sparkles, AlertCircle } from 'lucide-react';
import { solveInverseSector, KnownPairType, formatNumber } from '../utils/mathUtils';
import { MathFormula } from './MathFormula';
import { SectorCanvas } from './SectorCanvas';

export const InverseCalculator: React.FC = () => {
  const [pairType, setPairType] = useState<KnownPairType>('l_s');
  const [val1, setVal1] = useState<number>(6.28);
  const [val2, setVal2] = useState<number>(18.84);

  // Configuration for pair types
  const config = useMemo(() => {
    switch (pairType) {
      case 'r_l':
        return {
          title: '已知半径 r 与 弧长 l 求圆心角 n 与面积 S',
          label1: '半径 r (cm)',
          label2: '弧长 l (cm)',
          default1: 6,
          default2: 9.42,
          formula1: 'n = \\frac{180l}{\\pi r}',
          formula2: 'S = \\frac{1}{2}lr',
        };
      case 'r_s':
        return {
          title: '已知半径 r 与 面积 S 求圆心角 n 与弧长 l',
          label1: '半径 r (cm)',
          label2: '扇形面积 S (cm²)',
          default1: 6,
          default2: 28.27,
          formula1: 'n = \\frac{360S}{\\pi r^2}',
          formula2: 'l = \\frac{2S}{r}',
        };
      case 'n_l':
        return {
          title: '已知圆心角 n 与 弧长 l 求半径 r 与面积 S',
          label1: '圆心角 n (°)',
          label2: '弧长 l (cm)',
          default1: 90,
          default2: 9.42,
          formula1: 'r = \\frac{180l}{n\\pi}',
          formula2: 'S = \\frac{1}{2}lr',
        };
      case 'n_s':
        return {
          title: '已知圆心角 n 与 面积 S 求半径 r 与弧长 l',
          label1: '圆心角 n (°)',
          label2: '扇形面积 S (cm²)',
          default1: 120,
          default2: 37.68,
          formula1: 'r = \\sqrt{\\frac{360S}{n\\pi}}',
          formula2: 'l = \\frac{n\\pi r}{180}',
        };
      case 'l_s':
        return {
          title: '已知弧长 l 与 面积 S 求半径 r 与圆心角 n',
          label1: '弧长 l (cm)',
          label2: '扇形面积 S (cm²)',
          default1: 6.28,
          default2: 18.84,
          formula1: 'r = \\frac{2S}{l}',
          formula2: 'n = \\frac{180l}{\\pi r}',
        };
      case 'r_n':
      default:
        return {
          title: '已知半径 r 与 圆心角 n',
          label1: '半径 r (cm)',
          label2: '圆心角 n (°)',
          default1: 5,
          default2: 72,
          formula1: 'l = \\frac{n\\pi r}{180}',
          formula2: 'S = \\frac{n\\pi r^2}{360}',
        };
    }
  }, [pairType]);

  const handlePairTypeChange = (type: KnownPairType) => {
    setPairType(type);
    switch (type) {
      case 'r_l':
        setVal1(6);
        setVal2(9.42);
        break;
      case 'r_s':
        setVal1(6);
        setVal2(28.27);
        break;
      case 'n_l':
        setVal1(90);
        setVal2(9.42);
        break;
      case 'n_s':
        setVal1(120);
        setVal2(37.68);
        break;
      case 'l_s':
        setVal1(6.28);
        setVal2(18.84);
        break;
      case 'r_n':
        setVal1(5);
        setVal2(72);
        break;
    }
  };

  const solvedResult = useMemo(() => {
    return solveInverseSector(pairType, val1, val2);
  }, [pairType, val1, val2]);

  return (
    <div className="space-y-6">
      {/* Pair selection buttons */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <ArrowRightLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            双向逆推求解器（已知任意两项求其余所有参数）
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          初中数学必考题型：常给定弧长与面积求半径，或给定面积与圆心角求半径。请选择你的已知条件：
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { type: 'l_s' as KnownPairType, label: '已知 弧长l + 面积S', tag: '中考最高频' },
            { type: 'r_l' as KnownPairType, label: '已知 半径r + 弧长l', tag: '求角与面积' },
            { type: 'r_s' as KnownPairType, label: '已知 半径r + 面积S', tag: '求角与弧长' },
            { type: 'n_l' as KnownPairType, label: '已知 角度n + 弧长l', tag: '求半径' },
            { type: 'n_s' as KnownPairType, label: '已知 角度n + 面积S', tag: '开平方求r' },
            { type: 'r_n' as KnownPairType, label: '已知 半径r + 角度n', tag: '正向标准' },
          ].map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => handlePairTypeChange(item.type)}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition ${
                pairType === item.type
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm font-semibold'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
              }`}
            >
              <span className="text-xs">{item.label}</span>
              <span
                className={`text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded ${
                  pairType === item.type
                    ? 'bg-white/20 text-white'
                    : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                }`}
              >
                {item.tag}
              </span>
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
              {config.label1}
            </label>
            <input
              type="number"
              step="any"
              value={val1}
              onChange={(e) => setVal1(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-base font-mono font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
              {config.label2}
            </label>
            <input
              type="number"
              step="any"
              value={val2}
              onChange={(e) => setVal2(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 text-base font-mono font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Output result */}
      {solvedResult ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Solution details (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                反求推导与求解结果
              </h3>

              {/* Key Results */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                  <div className="text-xs text-indigo-700 dark:text-indigo-400 font-medium">反求半径 r</div>
                  <div className="text-2xl font-black text-indigo-950 dark:text-indigo-100 font-mono my-1">
                    {formatNumber(solvedResult.radius, 4)}
                  </div>
                  <div className="text-[11px] text-slate-500">单位: cm</div>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800">
                  <div className="text-xs text-rose-700 dark:text-rose-400 font-medium">反求圆心角 n°</div>
                  <div className="text-2xl font-black text-rose-950 dark:text-rose-100 font-mono my-1">
                    {formatNumber(solvedResult.angleDeg, 2)}°
                  </div>
                  <div className="text-[11px] text-slate-500">弧度: {formatNumber(solvedResult.angleRad, 3)} rad</div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                  <div className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">扇形面积 S</div>
                  <div className="text-xl font-black text-emerald-950 dark:text-emerald-100 font-mono my-1">
                    {formatNumber(solvedResult.area, 4)}
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-300">
                    <MathFormula math={`S = ${solvedResult.areaPiExact}`} />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <div className="text-xs text-amber-700 dark:text-amber-400 font-medium">扇形周长 C</div>
                  <div className="text-xl font-black text-amber-950 dark:text-amber-100 font-mono my-1">
                    {formatNumber(solvedResult.perimeter, 4)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    <MathFormula math={`C = l + 2r`} />
                  </div>
                </div>
              </div>

              {/* Deduction Steps */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  核心推导公式与中考解析方法：
                </div>
                <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                    <span className="text-indigo-600 font-bold font-sans">第一步：</span>
                    依据 <MathFormula math={config.formula1} />，代入已知值可直接解出未知数。
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                    <span className="text-indigo-600 font-bold font-sans">第二步：</span>
                    依据 <MathFormula math={config.formula2} />，代入求出其余目标未知数。
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual SVG (5 cols) */}
          <div className="lg:col-span-5">
            <SectorCanvas
              radius={solvedResult.radius}
              angleDeg={solvedResult.angleDeg}
              arcLength={solvedResult.arcLength}
              area={solvedResult.area}
              chordLength={solvedResult.chordLength}
            />
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 p-6 rounded-2xl text-center">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <h4 className="font-bold text-amber-900 dark:text-amber-200">输入数值无法构成合法扇形</h4>
          <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
            请输入大于 0 的有效正数，且保证所求圆心角在 0° 到 360° 之间。
          </p>
        </div>
      )}
    </div>
  );
};
