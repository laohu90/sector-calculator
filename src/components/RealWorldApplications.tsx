import React, { useState } from 'react';
import { Pizza, Droplets, Wind, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { MathFormula } from './MathFormula';
import { formatNumber } from '../utils/mathUtils';
import { Language, translations } from '../i18n/translations';

interface RealWorldApplicationsProps {
  lang?: Language;
}

export const RealWorldApplications: React.FC<RealWorldApplicationsProps> = ({ lang = 'en' }) => {
  const t = translations[lang];
  const isEn = lang === 'en';

  // State 1: Pizza
  const [pizzaDiameter, setPizzaDiameter] = useState<number>(12); // inches
  const [pizzaSlices, setPizzaSlices] = useState<number>(8);

  // State 2: Sprinkler
  const [sprinklerRadius, setSprinklerRadius] = useState<number>(15); // feet
  const [sprinklerAngle, setSprinklerAngle] = useState<number>(180); // deg

  // State 3: Wiper
  const [wiperInner, setWiperInner] = useState<number>(10); // cm
  const [wiperOuter, setWiperOuter] = useState<number>(50); // cm
  const [wiperAngle, setWiperAngle] = useState<number>(110); // deg

  // Pizza Calculations:
  const pizzaR = pizzaDiameter / 2;
  const pizzaAngle = 360 / Math.max(1, pizzaSlices);
  const pizzaSliceArea = (pizzaAngle / 360) * Math.PI * pizzaR * pizzaR;
  const pizzaCrustArc = (pizzaAngle / 180) * Math.PI * pizzaR;

  // Sprinkler Calculations:
  const sprinklerArea = (sprinklerAngle / 360) * Math.PI * sprinklerRadius * sprinklerRadius;
  const sprinklerArc = (sprinklerAngle / 180) * Math.PI * sprinklerRadius;

  // Wiper Calculations:
  const wiperArea = (wiperAngle / 360) * Math.PI * (wiperOuter * wiperOuter - wiperInner * wiperInner);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Compass className="w-4 h-4" />
          <span>{isEn ? 'Practical Everyday & Engineering Models' : '生活实用与工程模型'}</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {t.realWorldTitle}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t.realWorldSub}
        </p>
      </div>

      {/* Grid of Interactive Real World Mini-Calculators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Model 1: Pizza Slicing */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-1">
              <Pizza className="w-4 h-4" />
              <span>{t.appPizzaTitle}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              {t.appPizzaDesc}
            </p>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-0.5">
                  <span>{isEn ? 'Diameter:' : '披萨直径：'}</span>
                  <span className="font-mono font-bold">{pizzaDiameter} {isEn ? 'inches' : '英寸'}</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="20"
                  value={pizzaDiameter}
                  onChange={(e) => setPizzaDiameter(parseFloat(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-0.5">
                  <span>{isEn ? 'Number of Slices:' : '切分块数：'}</span>
                  <span className="font-mono font-bold">{pizzaSlices} {isEn ? 'slices' : '块'} ({Math.round(pizzaAngle)}°)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="16"
                  value={pizzaSlices}
                  onChange={(e) => setPizzaSlices(parseInt(e.target.value))}
                  className="w-full accent-rose-600"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">{isEn ? 'Slice Area:' : '单块披萨面积：'}</span>
              <span className="font-mono font-bold text-rose-600">{formatNumber(pizzaSliceArea, 2)} sq in</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isEn ? 'Crust Arc Length:' : '单块饼皮弧长：'}</span>
              <span className="font-mono font-bold text-rose-600">{formatNumber(pizzaCrustArc, 2)} in</span>
            </div>
          </div>
        </div>

        {/* Model 2: Lawn Sprinkler */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm mb-1">
              <Droplets className="w-4 h-4" />
              <span>{t.appSprinklerTitle}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              {t.appSprinklerDesc}
            </p>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-0.5">
                  <span>{isEn ? 'Spray Radius (Throw):' : '喷头喷洒半径：'}</span>
                  <span className="font-mono font-bold">{sprinklerRadius} {isEn ? 'ft' : '米/英尺'}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="40"
                  value={sprinklerRadius}
                  onChange={(e) => setSprinklerRadius(parseFloat(e.target.value))}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-0.5">
                  <span>{isEn ? 'Arc Angle Pattern:' : '旋转喷洒角：'}</span>
                  <span className="font-mono font-bold">{sprinklerAngle}°</span>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-1">
                  {[90, 180, 270, 360].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => setSprinklerAngle(deg)}
                      className={`py-1 text-center rounded text-[11px] font-semibold border ${
                        sprinklerAngle === deg
                          ? 'bg-cyan-600 text-white border-cyan-600'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">{isEn ? 'Watered Lawn Area:' : '有效灌溉草坪面积：'}</span>
              <span className="font-mono font-bold text-cyan-600">{formatNumber(sprinklerArea, 1)} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{isEn ? 'Watering Arc Distance:' : '外圈浇灌弧长：'}</span>
              <span className="font-mono font-bold text-cyan-600">{formatNumber(sprinklerArc, 1)} ft</span>
            </div>
          </div>
        </div>

        {/* Model 3: Car Wiper Swept Area */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
              <Wind className="w-4 h-4" />
              <span>{t.appWiperTitle}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
              {t.appWiperDesc}
            </p>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-0.5">
                  <span>{isEn ? 'Blade Outer Reach:' : '雨刷外缘半径 r2：'}</span>
                  <span className="font-mono font-bold">{wiperOuter} cm</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="70"
                  value={wiperOuter}
                  onChange={(e) => setWiperOuter(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 mb-0.5">
                  <span>{isEn ? 'Blade Sweep Angle:' : '摆动擦拭角：'}</span>
                  <span className="font-mono font-bold">{wiperAngle}°</span>
                </div>
                <input
                  type="range"
                  min="70"
                  max="150"
                  value={wiperAngle}
                  onChange={(e) => setWiperAngle(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800 space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">{isEn ? 'Wiped Glass Area:' : '有效刮净视窗面积：'}</span>
              <span className="font-mono font-bold text-indigo-600">{formatNumber(wiperArea, 1)} cm²</span>
            </div>
            <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
              <MathFormula math="S = \frac{n}{360}\pi(r_2^2 - r_1^2)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
