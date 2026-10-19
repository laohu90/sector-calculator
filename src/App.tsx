import React, { useState, useMemo, useEffect } from 'react';
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
} from 'lucide-react';
import { computeFromRadiusAndAngle } from './utils/mathUtils';
import { SectorCanvas } from './components/SectorCanvas';
import { StandardCalculator } from './components/StandardCalculator';
import { InverseCalculator } from './components/InverseCalculator';
import { ConfusionHelper } from './components/ConfusionHelper';
import { ConeUnfoldModule } from './components/ConeUnfoldModule';
import { ExamPractice } from './components/ExamPractice';
import { SeoContent } from './components/SeoContent';
import { MathFormula } from './components/MathFormula';
import { Language, translations } from './i18n/translations';

export type ActiveTab = 'standard' | 'inverse' | 'confusion' | 'cone' | 'exam' | 'guide';

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

  const t = translations[lang];

  // Sync document title and lang attribute
  useEffect(() => {
    localStorage.setItem('sector_calc_lang', lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    if (lang === 'en') {
      document.title = 'Sector & Arc Length Calculator - Formulas, Inverse Solver & Steps';
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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Clean Minimalist Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {t.appTitle}
            </h1>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded text-slate-600 dark:text-slate-300">
              <MathFormula math="S = \frac{n}{360}\pi r^2" />
              <span className="text-slate-400">|</span>
              <MathFormula math="l = \frac{n}{180}\pi r" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-750 transition flex items-center gap-1 font-medium"
              title={lang === 'en' ? 'Switch to Chinese' : '切换为英文'}
            >
              <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t.langSwitch}</span>
            </button>

            {/* Share */}
            <button
              type="button"
              onClick={handleShare}
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
              title={t.share}
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copiedLink ? t.copied : t.share}</span>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/laohu90/sector-calculator"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 sm:px-2.5 sm:py-1 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-1"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title={t.themeToggle}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Clean Navigation Bar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 flex space-x-1 overflow-x-auto py-1.5 no-scrollbar text-xs">
          {[
            { id: 'standard' as ActiveTab, label: t.tabStandard, icon: Calculator },
            { id: 'inverse' as ActiveTab, label: t.tabInverse, icon: Compass },
            { id: 'confusion' as ActiveTab, label: t.tabConfusion, icon: AlertTriangle, highlight: true },
            { id: 'cone' as ActiveTab, label: t.tabCone, icon: Shapes },
            { id: 'exam' as ActiveTab, label: t.tabExam, icon: Award },
            { id: 'guide' as ActiveTab, label: t.tabGuide, icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
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

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-5">
        {/* Tab 1: Standard Calculator */}
        {activeTab === 'standard' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Visualizer (5 columns) */}
            <div className="md:col-span-5 md:sticky md:top-16">
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
        )}

        {/* Tab 2: Inverse Reverse Solver */}
        {activeTab === 'inverse' && <InverseCalculator lang={lang} />}

        {/* Tab 3: 180 vs 360 Confusion */}
        {activeTab === 'confusion' && <ConfusionHelper lang={lang} />}

        {/* Tab 4: Cone Module */}
        {activeTab === 'cone' && <ConeUnfoldModule lang={lang} />}

        {/* Tab 5: Practice */}
        {activeTab === 'exam' && <ExamPractice lang={lang} />}

        {/* Tab 6: Formulas & SEO */}
        {activeTab === 'guide' && <SeoContent lang={lang} />}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
        <p>
          {t.appTitle} · <MathFormula math="S = \frac{n}{360}\pi r^2 = \frac{1}{2}lr" /> ｜ <MathFormula math="l = \frac{n}{180}\pi r" />
        </p>
      </footer>
    </div>
  );
}
