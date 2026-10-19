import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Calculator,
  Compass,
  AlertTriangle,
  Shapes,
  Award,
  BookOpen,
  Github,
  Sun,
  Moon,
  Share2,
  Globe,
  Sparkles,
  PieChart,
  Lightbulb,
} from 'lucide-react';
import { computeFromRadiusAndAngle } from './utils/mathUtils';
import { SectorCanvas } from './components/SectorCanvas';
import { StandardCalculator } from './components/StandardCalculator';
import { InverseCalculator } from './components/InverseCalculator';
import { ConfusionHelper } from './components/ConfusionHelper';
import { ConeUnfoldModule } from './components/ConeUnfoldModule';
import { ExamPractice } from './components/ExamPractice';
import { SeoContent } from './components/SeoContent';
import { InteractiveTutorial } from './components/InteractiveTutorial';
import { RealWorldApplications } from './components/RealWorldApplications';
import { MathFormula } from './components/MathFormula';
import { Language, translations } from './i18n/translations';

export type ActiveTab =
  | 'standard'
  | 'inverse'
  | 'confusion'
  | 'tutorial'
  | 'realworld'
  | 'cone'
  | 'exam'
  | 'guide';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('sector_calc_lang');
    return (saved === 'zh' ? 'zh' : 'en') as Language;
  });
  const [radius, setRadius] = useState<number>(6);
  const [angleDeg, setAngleDeg] = useState<number>(120);
  const [activeTab, setActiveTab] = useState<ActiveTab>('standard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const calcRef = useRef<HTMLDivElement | null>(null);

  const t = translations[lang];

  // Sync document title and lang attribute
  useEffect(() => {
    localStorage.setItem('sector_calc_lang', lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    if (lang === 'en') {
      document.title = 'Sector Area & Arc Length Calculator - Formulas, Proofs & Steps';
    } else {
      document.title = '扇形面积与弧长计算器 - 扇形公式、弧长在线计算器与圆心角计算 (中考考点解析)';
    }
  }, [lang]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'zh' : 'en'));
  };

  const calculationResult = useMemo(() => {
    return computeFromRadiusAndAngle(radius, angleDeg, lang);
  }, [radius, angleDeg, lang]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleLoadExample = (r: number, n: number) => {
    setRadius(r);
    setAngleDeg(n);
    setActiveTab('standard');
    calcRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              π
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                {t.appTitle}
              </h1>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                <MathFormula math="S = \frac{n}{360}\pi r^2 = \frac{1}{2}lr" /> · <MathFormula math="l = \frac{n}{180}\pi r" />
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition flex items-center gap-1.5 font-semibold"
              title={lang === 'en' ? 'Switch to Chinese' : '切换为英文'}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t.langSwitch}</span>
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 border border-slate-200/60 dark:border-slate-800"
              title={t.share}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{copiedLink ? t.copied : t.share}</span>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/laohu90/sector-calculator"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1 border border-slate-200/60 dark:border-slate-800"
              title="GitHub"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden md:inline">GitHub</span>
            </a>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-1.5 sm:px-2 sm:py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200/60 dark:border-slate-800"
              title={t.themeToggle}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-[57px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar text-xs">
          {[
            { id: 'standard' as ActiveTab, label: t.tabStandard, icon: Calculator },
            { id: 'inverse' as ActiveTab, label: t.tabInverse, icon: Compass },
            { id: 'confusion' as ActiveTab, label: t.tabConfusion, icon: AlertTriangle, highlight: true },
            { id: 'tutorial' as ActiveTab, label: t.tabTutorial, icon: BookOpen },
            { id: 'realworld' as ActiveTab, label: t.tabRealWorld, icon: PieChart },
            { id: 'cone' as ActiveTab, label: t.tabCone, icon: Shapes },
            { id: 'exam' as ActiveTab, label: t.tabExam, icon: Award },
            { id: 'guide' as ActiveTab, label: t.tabGuide, icon: Lightbulb },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : tab.highlight
                    ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Hero Banner (SEO & Broad Layout) */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-slate-50 to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/60 dark:border-slate-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5" />
                {t.heroBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {t.heroTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {t.heroDesc}
              </p>
            </div>

            {/* Quick Stats Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0 text-center">
              <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">3.14159 / π</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.heroStat1}</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-xs font-bold text-rose-600 dark:text-rose-400 font-mono">SVG Live</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.heroStat2}</div>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">180 vs 360</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.heroStat3}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Tab 1: Standard Calculator & Rich Sections */}
        {activeTab === 'standard' && (
          <div className="space-y-8" ref={calcRef}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Visualizer (5 columns) */}
              <div className="md:col-span-5 md:sticky md:top-28">
                <SectorCanvas
                  radius={radius}
                  angleDeg={angleDeg}
                  arcLength={calculationResult.arcLength}
                  area={calculationResult.area}
                  chordLength={calculationResult.chordLength}
                  lang={lang}
                  onAngleChange={setAngleDeg}
                  onRadiusChange={setRadius}
                />
              </div>

              {/* Inputs & Values (7 columns) */}
              <div className="md:col-span-7">
                <StandardCalculator
                  radius={radius}
                  angleDeg={angleDeg}
                  lang={lang}
                  onRadiusChange={setRadius}
                  onAngleChange={setAngleDeg}
                  result={calculationResult}
                />
              </div>
            </div>

            {/* Tutorials Section on Home View */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <InteractiveTutorial lang={lang} onLoadExample={handleLoadExample} />
            </div>

            {/* Real World Applications Section */}
            <div className="pt-2">
              <RealWorldApplications lang={lang} />
            </div>

            {/* In-depth 180 vs 360 & Formulas Guide */}
            <div className="pt-2">
              <ConfusionHelper lang={lang} />
            </div>

            {/* Complete Formulas Reference */}
            <div className="pt-2">
              <SeoContent lang={lang} />
            </div>
          </div>
        )}

        {/* Tab 2: Inverse Reverse Solver */}
        {activeTab === 'inverse' && <InverseCalculator lang={lang} />}

        {/* Tab 3: 180 vs 360 Confusion */}
        {activeTab === 'confusion' && <ConfusionHelper lang={lang} />}

        {/* Tab 4: Step-by-Step Tutorials */}
        {activeTab === 'tutorial' && (
          <InteractiveTutorial lang={lang} onLoadExample={handleLoadExample} />
        )}

        {/* Tab 5: Real-World Applications */}
        {activeTab === 'realworld' && <RealWorldApplications lang={lang} />}

        {/* Tab 6: Cone Module */}
        {activeTab === 'cone' && <ConeUnfoldModule lang={lang} />}

        {/* Tab 7: Practice */}
        {activeTab === 'exam' && <ExamPractice lang={lang} />}

        {/* Tab 8: Formulas & SEO */}
        {activeTab === 'guide' && <SeoContent lang={lang} />}
      </main>

      {/* Footer with rich SEO links */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3 text-center sm:text-left sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              {t.appTitle} · Sector Area & Arc Length Geometry Handbook
            </p>
            <p className="mt-1">
              <MathFormula math="S = \frac{n}{360}\pi r^2 = \frac{1}{2}lr" /> ｜ <MathFormula math="l = \frac{n}{180}\pi r" /> ｜ <MathFormula math="C = l + 2r" />
            </p>
          </div>
          <div className="text-slate-400 text-[11px]">
            Open-source MIT · <a href="https://github.com/laohu90/sector-calculator" target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">laohu90/sector-calculator</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
