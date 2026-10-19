import React, { useState, useMemo } from 'react';
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
  Sparkles,
  ExternalLink,
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

export type ActiveTab = 'standard' | 'inverse' | 'confusion' | 'cone' | 'exam' | 'guide';

export default function App() {
  const [radius, setRadius] = useState<number>(6);
  const [angleDeg, setAngleDeg] = useState<number>(120);
  const [activeTab, setActiveTab] = useState<ActiveTab>('standard');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Toggle Dark Mode on HTML root
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const calculationResult = useMemo(() => {
    return computeFromRadiusAndAngle(radius, angleDeg);
  }, [radius, angleDeg]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Top Banner: Quick Formula Badge */}
      <header className="bg-indigo-600 text-white shadow-sm border-b border-indigo-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 text-white font-bold">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight">扇形面积与弧长计算器</span>
                <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  中考必考 Top 4
                </span>
              </div>
              <p className="text-xs text-indigo-100/90 hidden sm:block">
                扇形面积公式 <MathFormula math="S = \frac{n}{360}\pi r^2" /> · 弧长公式 <MathFormula math="l = \frac{n}{180}\pi r" /> · 告别 180 与 360 混淆
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? '已复制链接' : '分享工具'}</span>
            </button>
            <a
              href="https://github.com/laohu90/sector-calculator"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="hidden md:inline">GitHub 仓库</span>
            </a>
            <button
              type="button"
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition"
              title={darkMode ? '切换亮色模式' : '切换深色模式'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar">
            {[
              { id: 'standard' as ActiveTab, label: '标准计算 & 实时图形', icon: Calculator, badge: '核心' },
              { id: 'inverse' as ActiveTab, label: '两量反求未知量', icon: Compass, badge: '逆推' },
              { id: 'confusion' as ActiveTab, label: '180 vs 360 为什么总记混？', icon: AlertTriangle, badge: '防坑', highlight: true },
              { id: 'cone' as ActiveTab, label: '圆锥侧面展开专题', icon: Shapes, badge: '压轴' },
              { id: 'exam' as ActiveTab, label: '中考真题演练', icon: Award, badge: '提分' },
              { id: 'guide' as ActiveTab, label: '全套公式与知识库', icon: BookOpen },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : tab.highlight
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/50'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : tab.highlight
                          ? 'bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Tab 1: Standard Forward Calculator */}
        {activeTab === 'standard' && (
          <div className="space-y-6">
            {/* Quick Hero Banner explaining the formula */}
            <div className="bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white rounded-2xl p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="inline-block bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold mb-1.5">
                  初中几何中考常青树
                </span>
                <h1 className="text-xl sm:text-2xl font-black">
                  扇形面积与弧长在线计算器
                </h1>
                <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-2xl leading-relaxed">
                  拖拽几何画板中的弧端点或调节数值，实时渲染扇形、弧长、周长、弦长与割补弓形面积，自带精确含 π 表达与标准中考答题推导步骤。
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('confusion')}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl text-xs transition flex items-center gap-1 shadow-sm"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>秒懂 180 与 360 区别</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inverse')}
                  className="px-3.5 py-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold rounded-xl text-xs transition flex items-center gap-1"
                >
                  <Compass className="w-4 h-4" />
                  <span>双向逆推未知量</span>
                </button>
              </div>
            </div>

            {/* Two Column Layout: Left Canvas, Right Controls & Results */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Interactive Geometric Visualizer (5 columns) */}
              <div className="lg:col-span-5 sticky top-20">
                <SectorCanvas
                  radius={radius}
                  angleDeg={angleDeg}
                  arcLength={calculationResult.arcLength}
                  area={calculationResult.area}
                  chordLength={calculationResult.chordLength}
                  onAngleChange={setAngleDeg}
                  onRadiusChange={setRadius}
                />
              </div>

              {/* Calculator Inputs & Detailed Results (7 columns) */}
              <div className="lg:col-span-7">
                <StandardCalculator
                  radius={radius}
                  angleDeg={angleDeg}
                  onRadiusChange={setRadius}
                  onAngleChange={setAngleDeg}
                  result={calculationResult}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inverse Calculator (任意两量反求) */}
        {activeTab === 'inverse' && <InverseCalculator />}

        {/* Tab 3: 180 vs 360 Confusion Helper */}
        {activeTab === 'confusion' && <ConfusionHelper />}

        {/* Tab 4: Cone Lateral Unfold Module */}
        {activeTab === 'cone' && <ConeUnfoldModule />}

        {/* Tab 5: Middle School Exam Practice */}
        {activeTab === 'exam' && <ExamPractice />}

        {/* Tab 6: Full Guide & SEO Content */}
        {activeTab === 'guide' && <SeoContent />}

        {/* Always visible bottom SEO & educational reference card on home tab */}
        {activeTab === 'standard' && (
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <SeoContent />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            扇形面积与弧长在线计算器 · 中考初中数学圆与扇形专题工具
          </p>
          <p>
            公式：<MathFormula math="S = \frac{n}{360}\pi r^2 = \frac{1}{2}lr" /> ｜ 弧长：<MathFormula math="l = \frac{n}{180}\pi r" /> ｜ 圆心角：<MathFormula math="n = \frac{180l}{\pi r}" />
          </p>
          <p className="pt-2 text-slate-400">
            开源代码仓库：<a href="https://github.com/laohu90/sector-calculator" target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">laohu90/sector-calculator</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
