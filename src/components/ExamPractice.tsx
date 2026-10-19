import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Question {
  id: number;
  title: Record<Language, string>;
  badge: Record<Language, string>;
  desc: Record<Language, string>;
  options: { label: Record<Language, string>; isCorrect: boolean }[];
  hint: Record<Language, string>;
  explanation: Record<Language, string>;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: {
      en: 'Arc Length and Sector Area Basics',
      zh: '【基础题】求弧长与扇形面积',
    },
    badge: {
      en: 'Essential',
      zh: '基础必拿分',
    },
    desc: {
      en: 'A sector has radius r = 6 cm and central angle n = 120°. What are its arc length l and area S?',
      zh: '已知一个扇形的半径为 6 cm，圆心角为 120°，则该扇形的弧长 l 和面积 S 分别为？',
    },
    options: [
      {
        label: { en: 'Arc l = 4π cm, Area S = 12π cm²', zh: '弧长 4π cm，面积 12π cm²' },
        isCorrect: true,
      },
      {
        label: { en: 'Arc l = 2π cm, Area S = 6π cm²', zh: '弧长 2π cm，面积 6π cm²' },
        isCorrect: false,
      },
      {
        label: { en: 'Arc l = 4π cm, Area S = 24π cm²', zh: '弧长 4π cm，面积 24π cm²' },
        isCorrect: false,
      },
      {
        label: { en: 'Arc l = 8π cm, Area S = 12π cm²', zh: '弧长 8π cm，面积 12π cm²' },
        isCorrect: false,
      },
    ],
    hint: {
      en: 'Arc length denominator is 180; Sector area denominator is 360.',
      zh: '弧长公式分母是180，面积公式分母是360。',
    },
    explanation: {
      en: 'l = (120/180)·π·6 = 4π cm; S = (120/360)·π·6² = 12π cm². You can also check via S = ½·l·r = ½·4π·6 = 12π cm²!',
      zh: '弧长 l = (120/180)·π·6 = 4π cm；面积 S = (120/360)·π·6² = 12π cm²。也可以用 S = ½·l·r = ½·4π·6 = 12π cm² 验算！',
    },
  },
  {
    id: 2,
    title: {
      en: 'Sector Perimeter Common Trap',
      zh: '【易错陷阱】扇形周长防坑题',
    },
    badge: {
      en: 'Trap Alert',
      zh: '易错陷阱',
    },
    desc: {
      en: 'A sector has central angle n = 90° and radius r = 4 cm. What is the total perimeter of this sector?',
      zh: '若一个扇形的圆心角为 90°，半径为 4 cm，则该扇形的周长是多少？',
    },
    options: [
      { label: { en: '2π cm', zh: '2π cm' }, isCorrect: false },
      { label: { en: '(2π + 4) cm', zh: '(2π + 4) cm' }, isCorrect: false },
      { label: { en: '(2π + 8) cm', zh: '(2π + 8) cm' }, isCorrect: true },
      { label: { en: '4π cm', zh: '4π cm' }, isCorrect: false },
    ],
    hint: {
      en: 'Do not forget that a sector perimeter consists of the curved arc plus TWO straight radii (+2r)!',
      zh: '绝大多数学生算出了弧长 2π 后就直接交卷，忘记扇形周长必须加上两条直边半径 (+2r)！',
    },
    explanation: {
      en: 'Arc l = (90/180)·π·4 = 2π cm. Perimeter C = l + 2r = 2π + 2(4) = (2π + 8) cm.',
      zh: '弧长 l = (90/180)·π·4 = 2π cm。扇形周长 C = l + 2r = 2π + 2×4 = (2π + 8) cm。千万别漏掉 +2r！',
    },
  },
  {
    id: 3,
    title: {
      en: 'Reverse Solving: Given Arc and Area',
      zh: '【高频反求】已知弧长与面积求半径',
    },
    badge: {
      en: 'Fast Solving',
      zh: '秒杀技巧',
    },
    desc: {
      en: 'A sector has area S = 15π cm² and arc length l = 5π cm. What is the radius r?',
      zh: '已知一个扇形的面积为 15π cm²，其弧长为 5π cm，则该扇形的半径 r 为多少？',
    },
    options: [
      { label: { en: '3 cm', zh: '3 cm' }, isCorrect: false },
      { label: { en: '6 cm', zh: '6 cm' }, isCorrect: true },
      { label: { en: '12 cm', zh: '12 cm' }, isCorrect: false },
      { label: { en: '5 cm', zh: '5 cm' }, isCorrect: false },
    ],
    hint: {
      en: 'Use bridge formula S = ½·l·r directly: r = 2S / l without finding the angle first!',
      zh: '运用桥梁公式 S = ½·l·r，无需先求圆心角即可一步求解！',
    },
    explanation: {
      en: 'From S = ½·l·r => r = 2S / l = (2 × 15π) / (5π) = 30π / 5π = 6 cm.',
      zh: '根据 S = ½·l·r，直接移项变形得 r = 2S / l = (2 × 15π) / (5π) = 30π / 5π = 6 cm。',
    },
  },
  {
    id: 4,
    title: {
      en: 'Cone Side Unfolding Angle',
      zh: '【压轴考点】圆锥侧面展开图的圆心角',
    },
    badge: {
      en: 'Exam Classic',
      zh: '中考压轴',
    },
    desc: {
      en: 'A cone has base radius r = 3 cm and slant height R = 9 cm. What is the central angle n of its unfolded sector?',
      zh: '已知圆锥的底面半径为 3 cm，母线长为 9 cm，则其侧面展开图（扇形）的圆心角 n 是多少度？',
    },
    options: [
      { label: { en: '60°', zh: '60°' }, isCorrect: false },
      { label: { en: '90°', zh: '90°' }, isCorrect: false },
      { label: { en: '120°', zh: '120°' }, isCorrect: true },
      { label: { en: '150°', zh: '150°' }, isCorrect: false },
    ],
    hint: {
      en: 'Remember the formula: n = (r_base / Slant_Height) × 360°!',
      zh: '牢记口诀：“底半比母乘三百六”！即 n = (r底 / R) × 360°。',
    },
    explanation: {
      en: 'Unfolded angle n = (r_base / R) × 360° = (3 / 9) × 360° = 120°.',
      zh: '展开圆心角 n = (r底 / 母线) × 360° = (3/9) × 360° = 120°。',
    },
  },
];

interface ExamPracticeProps {
  lang?: Language;
}

export const ExamPractice: React.FC<ExamPracticeProps> = ({ lang = 'en' }) => {
  const t = translations[lang];
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (selectedAnswers[questionId] !== undefined) return;
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 mb-1.5 inline-block">
            {lang === 'en' ? 'Interactive Practice' : '实战演练'}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            {t.examTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t.examSub}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
            {t.scoreLabel} <strong className="text-indigo-600 dark:text-indigo-400 text-sm">{score}</strong> / {QUESTIONS.length}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
            title={t.retryLabel}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {QUESTIONS.map((q, qIndex) => {
          const userChoice = selectedAnswers[q.id];
          const hasAnswered = userChoice !== undefined;
          const isUserCorrect = hasAnswered && q.options[userChoice]?.isCorrect;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition ${
                hasAnswered
                  ? isUserCorrect
                    ? 'border-emerald-300 bg-emerald-50/20 dark:bg-emerald-950/20 dark:border-emerald-800'
                    : 'border-rose-300 bg-rose-50/20 dark:bg-rose-950/20 dark:border-rose-800'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    {lang === 'en' ? `Q${qIndex + 1}` : `第 ${qIndex + 1} 题`}
                  </span>
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    {q.badge[lang]}
                  </span>
                </div>

                {!hasAnswered && (
                  <button
                    type="button"
                    onClick={() => setShowHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                    className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHints[q.id] ? t.hideHintBtn : t.hintBtn}</span>
                  </button>
                )}
              </div>

              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
                {q.title[lang]}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 font-normal leading-relaxed">
                {q.desc[lang]}
              </p>

              {showHints[q.id] && !hasAnswered && (
                <div className="text-xs bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900 mb-3">
                  💡 <strong>Hint: </strong>{q.hint[lang]}
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                      className={`p-2.5 rounded-lg border text-left text-xs font-medium transition flex items-center justify-between ${btnStyle}`}
                    >
                      <span>
                        <strong className="mr-2">{String.fromCharCode(65 + optIdx)}.</strong>
                        {opt.label[lang]}
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
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
                  <div className="flex items-center gap-1 font-bold">
                    {isUserCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> {t.correctAnswer}
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> {t.wrongAnswer}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                    <strong>{t.solutionLabel} </strong>
                    {q.explanation[lang]}
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
