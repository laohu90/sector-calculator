import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, HelpCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { MathFormula } from './MathFormula';

interface Question {
  id: number;
  title: string;
  badge: string;
  desc: string;
  options: { label: string; isCorrect: boolean }[];
  hint: string;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: '【中考真题】求基础弧长与面积',
    badge: '基础必拿分',
    desc: '已知一个扇形的半径为 6 cm，圆心角为 120°，则该扇形的弧长 l 和面积 S 分别为？',
    options: [
      { label: '弧长 4π cm，面积 12π cm²', isCorrect: true },
      { label: '弧长 2π cm，面积 6π cm²', isCorrect: false },
      { label: '弧长 4π cm，面积 24π cm²', isCorrect: false },
      { label: '弧长 8π cm，面积 12π cm²', isCorrect: false },
    ],
    hint: '弧长公式分母是180，面积公式分母是360。',
    explanation:
      '弧长 l = (120/180)·π·6 = (2/3)·6π = 4π cm；面积 S = (120/360)·π·6² = (1/3)·36π = 12π cm²。也可以用 S = ½·l·r = ½·4π·6 = 12π cm² 速算！',
  },
  {
    id: 2,
    title: '【中考易错】扇形周长防坑题',
    badge: '易错陷阱',
    desc: '若一个扇形的圆心角为 90°，半径为 4 cm，则该扇形的周长是多少？',
    options: [
      { label: '2π cm', isCorrect: false },
      { label: '(2π + 4) cm', isCorrect: false },
      { label: '(2π + 8) cm', isCorrect: true },
      { label: '4π cm', isCorrect: false },
    ],
    hint: '绝大多数学生算出了弧长 2π 后就直接交卷，忘记扇形周长必须加上两条直边半径！',
    explanation:
      '弧长 l = (90/180)·π·4 = 2π cm。扇形周长 C = l + 2r = 2π + 2×4 = (2π + 8) cm。千万别漏掉 +2r！',
  },
  {
    id: 3,
    title: '【中考反求】已知弧长与面积求半径',
    badge: '高频反求',
    desc: '已知一个扇形的面积为 15π cm²，其弧长为 5π cm，则该扇形的半径 r 为多少？',
    options: [
      { label: '3 cm', isCorrect: false },
      { label: '6 cm', isCorrect: true },
      { label: '12 cm', isCorrect: false },
      { label: '5 cm', isCorrect: false },
    ],
    hint: '运用桥梁公式 S = ½·l·r，无需先求圆心角即可一步求解！',
    explanation:
      '根据 S = ½·l·r，直接移项变形得 r = 2S / l = (2 × 15π) / (5π) = 30π / 5π = 6 cm。',
  },
  {
    id: 4,
    title: '【中考压轴】圆锥侧面展开图的圆心角',
    badge: '中考压轴',
    desc: '已知圆锥的底面半径为 3 cm，母线长为 9 cm，则其侧面展开图（扇形）的圆心角 n 是多少度？',
    options: [
      { label: '60°', isCorrect: false },
      { label: '90°', isCorrect: false },
      { label: '120°', isCorrect: true },
      { label: '150°', isCorrect: false },
    ],
    hint: '牢记口诀：“底半比母乘三百六”！即 n = (r底 / R) × 360°。',
    explanation:
      '圆锥侧面展开图的弧长等于底面周长 2πr底 = 6π。扇形半径等于母线 9。根据 n = (r底/母线) × 360° = (3/9) × 360° = 120°。',
  },
];

export const ExamPractice: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (selectedAnswers[questionId] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowHints({});
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qid, optIdx]) => {
    const q = QUESTIONS.find((item) => item.id === parseInt(qid));
    return acc + (q && q.options[optIdx]?.isCorrect ? 1 : 0);
  }, 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-1.5 inline-block">
            实战演练
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            中考圆与扇形典型真题自测
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            涵盖“180与360混淆陷阱”、“周长漏加2r”、“S=½lr快速秒杀”与“圆锥展开角”全部必考题型。
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            得分：<strong className="text-indigo-600 dark:text-indigo-400 text-sm">{score}</strong> / {QUESTIONS.length}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            title="重新测验"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const hasAnswered = userChoice !== undefined;
          const isUserCorrect = hasAnswered && q.options[userChoice]?.isCorrect;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition ${
                hasAnswered
                  ? isUserCorrect
                    ? 'border-emerald-300 bg-emerald-50/20 dark:bg-emerald-950/20 dark:border-emerald-800'
                    : 'border-rose-300 bg-rose-50/20 dark:bg-rose-950/20 dark:border-rose-800'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    第 {qIndex + 1} 题
                  </span>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {q.badge}
                  </span>
                </div>

                {!hasAnswered && (
                  <button
                    type="button"
                    onClick={() => setShowHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHints[q.id] ? '隐藏提示' : '答题提示'}</span>
                  </button>
                )}
              </div>

              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
                {q.title}
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 font-normal">
                {q.desc}
              </p>

              {showHints[q.id] && !hasAnswered && (
                <div className="text-xs bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900 mb-3">
                  💡 <strong>考点提示：</strong>{q.hint}
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  let btnStyle =
                    'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200';

                  if (hasAnswered) {
                    if (opt.isCorrect) {
                      btnStyle =
                        'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (userChoice === optIdx) {
                      btnStyle =
                        'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-800 dark:text-rose-200 line-through';
                    } else {
                      btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={hasAnswered}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`p-3 rounded-lg border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>
                        <strong className="mr-2">{String.fromCharCode(65 + optIdx)}.</strong>
                        {opt.label}
                      </span>
                      {hasAnswered && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                      )}
                      {hasAnswered && userChoice === optIdx && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon answer */}
              {hasAnswered && (
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
                  <div className="flex items-center gap-1 font-bold">
                    {isUserCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> 回答正确！
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> 回答错误，解析如下：
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <strong>标准解析：</strong>
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
