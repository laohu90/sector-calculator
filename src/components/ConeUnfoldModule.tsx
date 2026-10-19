import React, { useState } from 'react';
import { Shapes } from 'lucide-react';
import { formatNumber } from '../utils/mathUtils';
import { MathFormula } from './MathFormula';

export const ConeUnfoldModule: React.FC = () => {
  const [R, setR] = useState<number>(10);
  const [rBase, setRBase] = useState<number>(4);

  const safeRBase = Math.min(rBase, R - 0.1);
  const nDeg = (safeRBase / R) * 360;
  const arcLength = 2 * Math.PI * safeRBase;
  const latArea = Math.PI * safeRBase * R;
  const baseArea = Math.PI * safeRBase * safeRBase;
  const totalArea = latArea + baseArea;
  const height = Math.sqrt(R * R - safeRBase * safeRBase);
  const volume = (1 / 3) * Math.PI * safeRBase * safeRBase * height;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shapes className="w-4 h-4 text-cyan-600" />
          圆锥与侧面展开扇形转化专项
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          中考核心：圆锥母线 R 展开为扇形半径，底面圆周长等于扇形弧长。
        </p>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>母线长 R (展开扇形半径)</span>
            <span className="font-mono text-indigo-600 font-bold">{R} cm</span>
          </div>
          <input
            type="range"
            min="4"
            max="30"
            step="1"
            value={R}
            onChange={(e) => {
              const newR = parseFloat(e.target.value);
              setR(newR);
              if (rBase >= newR) setRBase(newR - 1);
            }}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span>底面圆半径 r底</span>
            <span className="font-mono text-cyan-600 font-bold">{safeRBase} cm</span>
          </div>
          <input
            type="range"
            min="1"
            max={Math.max(1.1, R - 0.5)}
            step="0.5"
            value={safeRBase}
            onChange={(e) => setRBase(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded appearance-none cursor-pointer accent-cyan-600"
          />
        </div>
      </div>

      {/* Diagrams Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
        {/* Left: 3D Cone */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-semibold text-slate-500 mb-1">立体圆锥</span>
          <svg viewBox="0 0 220 180" className="w-48 h-40">
            <path d="M 35 135 A 75 22 0 0 1 185 135" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 3" />
            <path d="M 110 25 L 35 135 A 75 22 0 0 0 185 135 Z" fill="#06b6d4" fillOpacity="0.2" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="110" y1="25" x2="110" y2="135" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" />
            <line x1="110" y1="135" x2="185" y2="135" stroke="#0284c7" strokeWidth="1.5" />
            <text x="60" y="75" className="text-[10px] font-bold fill-indigo-700 dark:fill-indigo-300">R = {R}</text>
            <text x="115" y="85" className="text-[10px] font-bold fill-red-600">h = {formatNumber(height, 1)}</text>
            <text x="140" y="150" className="text-[10px] font-bold fill-cyan-700 dark:fill-cyan-300">r底 = {safeRBase}</text>
          </svg>
        </div>

        {/* Right: Unfolded Sector */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-semibold text-slate-500 mb-1">侧面展开扇形</span>
          <svg viewBox="0 0 220 180" className="w-48 h-40">
            {(() => {
              const uCx = 110;
              const uCy = 125;
              const uRad = 75;
              const halfAngRad = (nDeg * Math.PI) / 360;
              const sx = uCx + uRad * Math.sin(-halfAngRad);
              const sy = uCy - uRad * Math.cos(-halfAngRad);
              const ex = uCx + uRad * Math.sin(halfAngRad);
              const ey = uCy - uRad * Math.cos(halfAngRad);
              const lgFlag = nDeg > 180 ? 1 : 0;
              const d = `M ${uCx} ${uCy} L ${sx} ${sy} A ${uRad} ${uRad} 0 ${lgFlag} 1 ${ex} ${ey} Z`;
              const arcD = `M ${sx} ${sy} A ${uRad} ${uRad} 0 ${lgFlag} 1 ${ex} ${ey}`;

              return (
                <>
                  <path d={d} fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="1.5" />
                  <path d={arcD} fill="none" stroke="#e11d48" strokeWidth="2.5" />
                  <circle cx={uCx} cy={uCy} r="3" fill="#6366f1" />
                  <text x={uCx} y={uCy - 12} textAnchor="middle" className="text-xs font-bold fill-indigo-700 dark:fill-indigo-300">
                    n = {Math.round(nDeg)}°
                  </text>
                  <text x={uCx} y={sy - 8} textAnchor="middle" className="text-[10px] font-bold fill-rose-600">
                    l = 2πr底 = {formatNumber(arcLength, 2)}
                  </text>
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Numerical Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-slate-400 text-[11px]">展开圆心角 n</span>
          <div className="text-base font-black font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
            {formatNumber(nDeg, 1)}°
          </div>
          <div className="text-[10px] text-slate-400">(r底/R) × 360°</div>
        </div>

        <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-slate-400 text-[11px]">圆锥侧面积</span>
          <div className="text-base font-black font-mono text-rose-600 dark:text-rose-400 mt-0.5">
            {formatNumber(latArea, 2)}
          </div>
          <div className="text-[10px] text-slate-400">{safeRBase * R}π cm²</div>
        </div>

        <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-slate-400 text-[11px]">全面积 (侧+底)</span>
          <div className="text-base font-black font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
            {formatNumber(totalArea, 2)}
          </div>
          <div className="text-[10px] text-slate-400">{safeRBase * R + safeRBase * safeRBase}π cm²</div>
        </div>

        <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-slate-400 text-[11px]">圆锥体积</span>
          <div className="text-base font-black font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
            {formatNumber(volume, 2)}
          </div>
          <div className="text-[10px] text-slate-400">⅓πr²h</div>
        </div>
      </div>

      {/* Mnemonic Summary */}
      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
        <div><strong>中考核心口诀：</strong>“底半比母乘三百六” (<MathFormula math="n = \frac{r_{底}}{R} \times 360^\circ" />)</div>
        <div>圆锥侧面积公式：<MathFormula math="S_{侧} = \pi \cdot r_{底} \cdot R" />（底面半径乘母线，不是半径平方）</div>
      </div>
    </div>
  );
};
