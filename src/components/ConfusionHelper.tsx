import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { MathFormula } from './MathFormula';
import { Language, translations } from '../i18n/translations';

interface ConfusionHelperProps {
  lang?: Language;
}

export const ConfusionHelper: React.FC<ConfusionHelperProps> = ({ lang = 'en' }) => {
  const t = translations[lang];
  const [q1, setQ1] = useState<number | null>(null);
  const [q2, setQ2] = useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
      {/* Title */}
      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          {t.confusionTitle}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {t.confusionSub}
        </p>
      </div>

      {/* Two Column Direct Comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Arc Length */}
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400">
            <span>{t.arcBoxTitle}</span>
            <span className="font-mono">{t.arcBoxSub}</span>
          </div>
          <div className="py-2 text-center bg-white dark:bg-slate-800 rounded-lg border border-rose-100 dark:border-rose-900/40">
            <MathFormula math="l = \frac{n}{180}\pi r" className="text-lg font-bold text-rose-600" />
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p>{t.arcDerivation1}</p>
            <p>{t.arcDerivation2}</p>
            <p>{t.arcDerivation3}</p>
          </div>
          <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-300 pt-1 border-t border-rose-200/50">
            💡 {t.arcKeyReason}
          </div>
        </div>

        {/* Sector Area */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/20 dark:bg-indigo-950/20 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>{t.areaBoxTitle}</span>
            <span className="font-mono">{t.areaBoxSub}</span>
          </div>
          <div className="py-2 text-center bg-white dark:bg-slate-800 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
            <MathFormula math="S = \frac{n}{360}\pi r^2" className="text-lg font-bold text-indigo-600" />
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p>{t.areaDerivation1}</p>
            <p>{t.areaDerivation2}</p>
            <p>{t.areaDerivation3}</p>
          </div>
          <div className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300 pt-1 border-t border-indigo-200/50">
            💡 {t.areaKeyReason}
          </div>
        </div>
      </div>

      {/* Mnemonic & Bridge */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="space-y-0.5">
          <div className="font-bold text-slate-800 dark:text-slate-200">
            💡 {t.mnemonicCardTitle} {t.mnemonicArc} ｜ {t.mnemonicArea}
          </div>
          <div className="text-slate-500">
            {t.bridgeTitle}: <MathFormula math="S = \frac{1}{2} l r" />
          </div>
        </div>
      </div>

      {/* Quick 10-second Diagnostic */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          {t.quizTitle}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
            <span>{t.quizQ1}</span>
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
            <span>{t.quizQ2}</span>
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
