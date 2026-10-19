import React, { useState } from 'react';
import { Shapes, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { formatNumber } from '../utils/mathUtils';
import { MathFormula } from './MathFormula';

export const ConeUnfoldModule: React.FC = () => {
  // 母线长 R (即展开后扇形的半径)
  const [R, setR] = useState<number>(10);
  // 底面半径 r_base
  const [rBase, setRBase] = useState<number>(4);

  // Constraints: rBase must be less than R to form a cone
  const safeRBase = Math.min(rBase, R - 0.1);

  // Central angle n = (r_base / R) * 360
  const nDeg = (safeRBase / R) * 360;

  // Arc length l = 2 * PI * r_base
  const arcLength = 2 * Math.PI * safeRBase;

  // Lateral area S_lat = PI * r_base * R
  const latArea = Math.PI * safeRBase * R;

  // Base area S_base = PI * r_base^2
  const baseArea = Math.PI * safeRBase * safeRBase;

  // Total area S_total = S_lat + S_base
  const totalArea = latArea + baseArea;

  // Height h = sqrt(R^2 - r_base^2)
  const height = Math.sqrt(R * R - safeRBase * safeRBase);

  // Volume V = (1/3) * PI * r_base^2 * h
  const volume = (1 / 3) * Math.PI * safeRBase * safeRBase * height;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800 mb-1.5 inline-block">
            九年级数学 / 中考压轴常考
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shapes className="w-5 h-5 text-cyan-600" />
            圆锥与侧面展开扇形转化专项
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            中考核心考点：圆锥母线 R 展开为扇形半径，底面周长化为扇形弧长，掌握“底半比母乘三百六”。
          </p>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              母线长 R (展开扇形半径 r)
            </span>
            <span className="text-sm font-mono font-bold text-indigo-600">{R} cm</span>
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
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>4 cm</span>
            <span>30 cm</span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              底面圆半径 <MathFormula math="r_{底}" />
            </span>
            <span className="text-sm font-mono font-bold text-cyan-600">{safeRBase} cm</span>
          </div>
          <input
            type="range"
            min="1"
            max={Math.max(1.1, R - 0.5)}
            step="0.5"
            value={safeRBase}
            onChange={(e) => setRBase(parseFloat(e.target.value))}
            className="w-full accent-cyan-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>1 cm</span>
            <span>小于母线 R ({R} cm)</span>
          </div>
        </div>
      </div>

      {/* Visual Cone vs Unfolded Sector Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50/70 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        {/* Left: 3D Cone Illustration SVG */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            立体圆锥模型 (立体几何)
          </span>
          <svg viewBox="0 0 240 200" className="w-56 h-48 overflow-visible">
            {/* Base ellipse */}
            <defs>
              <linearGradient id="coneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Base ellipse back dashed */}
            <path d="M 40 150 A 80 25 0 0 1 200 150" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Cone Body */}
            <path d="M 120 30 L 40 150 A 80 25 0 0 0 200 150 Z" fill="url(#coneGrad)" stroke="#0284c7" strokeWidth="2" />
            
            {/* Height line (vertical) */}
            <line x1="120" y1="30" x2="120" y2="150" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
            
            {/* Base radius line */}
            <line x1="120" y1="150" x2="200" y2="150" stroke="#0ea5e9" strokeWidth="2" />
            
            {/* Labels */}
            <text x="65" y="85" className="text-xs font-bold fill-indigo-700 dark:fill-indigo-300">母线 R = {R}</text>
            <text x="124" y="95" className="text-xs font-bold fill-red-600">高 h = {formatNumber(height, 1)}</text>
            <text x="150" y="165" className="text-xs font-bold fill-cyan-700 dark:fill-cyan-300">r底 = {safeRBase}</text>
            <circle cx="120" cy="150" r="3" fill="#0284c7" />
            <circle cx="120" cy="30" r="3" fill="#0284c7" />
          </svg>
        </div>

        {/* Right: Unfolded Sector SVG */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            侧面展开扇形 (平面几何)
          </span>
          <svg viewBox="0 0 240 200" className="w-56 h-48 overflow-visible">
            <defs>
              <linearGradient id="unfoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            {/* Unfolded sector centered */}
            {(() => {
              const uCx = 120;
              const uCy = 140;
              const uRad = 85;
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
                  <path d={d} fill="url(#unfoldGrad)" stroke="#6366f1" strokeWidth="2" />
                  <path d={arcD} fill="none" stroke="#e11d48" strokeWidth="3" />
                  <circle cx={uCx} cy={uCy} r="3" fill="#6366f1" />
                  <text x={uCx - 14} y={uCy + 14} className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">顶点</text>
                  <text x={uCx} y={uCy - 18} textAnchor="middle" className="text-xs font-bold fill-indigo-700 dark:fill-indigo-300">
                    n = {Math.round(nDeg)}°
                  </text>
                  <text x={uCx} y={sy - 12} textAnchor="middle" className="text-[11px] font-bold fill-rose-600">
                    弧长 l = 2π·r底 = {formatNumber(arcLength, 2)}
                  </text>
                </>
              );
            })()}
          </svg>
        </div>
      </div>

      {/* Mathematical Calculations Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="text-[11px] text-slate-500 font-medium">展开圆心角 n</div>
          <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono my-0.5">
            {formatNumber(nDeg, 2)}°
          </div>
          <div className="text-[10px] text-slate-400">口诀: (r底/R) × 360°</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="text-[11px] text-slate-500 font-medium">圆锥侧面积 S侧</div>
          <div className="text-lg font-black text-rose-600 dark:text-rose-400 font-mono my-0.5">
            {formatNumber(latArea, 2)}
          </div>
          <div className="text-[10px] text-slate-400">公式: π·r底·R = {formatNumber(safeRBase * R, 0)}π</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="text-[11px] text-slate-500 font-medium">圆锥全面积 S全</div>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono my-0.5">
            {formatNumber(totalArea, 2)}
          </div>
          <div className="text-[10px] text-slate-400">S侧 + S底 = {formatNumber(safeRBase * R + safeRBase * safeRBase, 0)}π</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <div className="text-[11px] text-slate-500 font-medium">圆锥容积 / 体积 V</div>
          <div className="text-lg font-black text-cyan-600 dark:text-cyan-400 font-mono my-0.5">
            {formatNumber(volume, 2)}
          </div>
          <div className="text-[10px] text-slate-400">V = ⅓π·r²·h</div>
        </div>
      </div>

      {/* Mnemonic and Exam Tips */}
      <div className="bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/60 rounded-xl p-4">
        <div className="flex items-center gap-2 text-cyan-900 dark:text-cyan-200 font-bold text-sm mb-2">
          <Sparkles className="w-4 h-4 text-cyan-600" />
          <span>中考圆锥压轴三句口诀速记</span>
        </div>
        <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 list-disc list-inside">
          <li><strong>“母线即是扇形径”：</strong>圆锥的母线 <MathFormula math="R" /> 就是侧面展开扇形的半径 <MathFormula math="r" />。</li>
          <li><strong>“底半比母乘三六”：</strong>圆心角公式即 <MathFormula math="n = \frac{r_{底}}{R} \times 360^\circ" />，做填空题直接代入，1秒出答案！</li>
          <li><strong>“侧面面积派尔阿”：</strong>圆锥侧面积公式是 <MathFormula math="S_{侧} = \pi \cdot r_{底} \cdot R" />（注意是乘底面半径与母线，非母线平方）。</li>
        </ul>
      </div>
    </div>
  );
};
