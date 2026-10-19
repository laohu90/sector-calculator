export type Language = 'en' | 'zh';

export interface Translations {
  appTitle: string;
  tagline: string;
  share: string;
  copied: string;
  github: string;
  themeToggle: string;
  langSwitch: string;

  // Tabs
  tabStandard: string;
  tabInverse: string;
  tabConfusion: string;
  tabCone: string;
  tabExam: string;
  tabGuide: string;

  // Canvas
  canvasTitle: string;
  chordToggle: string;
  segmentToggle: string;
  dragTip: string;
  presetAngles: string;
  radiusLabel: string;
  arcLabel: string;
  chordLabel: string;
  areaLabel: string;
  semicircle: string;
  fullCircle: string;

  // Standard Calculator
  inputHeader: string;
  radiusInput: string;
  angleInput: string;
  sectorAreaTitle: string;
  arcLengthTitle: string;
  exactPi: string;
  perimeterTitle: string;
  perimeterNote: string;
  sagittaTitle: string;
  coneBaseTitle: string;
  stepsToggle: string;
  hideSteps: string;
  showSteps: string;
  formulaLabel: string;
  substLabel: string;
  resultLabel: string;

  // Step breakdown titles
  step1Title: string;
  step1Note: string;
  step2Title: string;
  step2Note: string;
  step3Title: string;
  step3Note: string;
  step4Title: string;
  step4Note: string;
  step5Title: string;
  step5Note: string;

  // Inverse Calculator
  inverseHeader: string;
  inverseSub: string;
  pairLS: string;
  pairRL: string;
  pairRS: string;
  pairNL: string;
  pairNS: string;
  pairRN: string;
  inputTip: string;
  inverseRadius: string;
  inverseAngle: string;
  invalidInput: string;

  // 180 vs 360
  confusionTitle: string;
  confusionSub: string;
  arcBoxTitle: string;
  arcBoxSub: string;
  arcDerivation1: string;
  arcDerivation2: string;
  arcDerivation3: string;
  arcKeyReason: string;
  areaBoxTitle: string;
  areaBoxSub: string;
  areaDerivation1: string;
  areaDerivation2: string;
  areaDerivation3: string;
  areaKeyReason: string;
  bridgeTitle: string;
  bridgeDesc: string;
  triangleAreaName: string;
  sectorBridgeName: string;
  mnemonicCardTitle: string;
  mnemonicArc: string;
  mnemonicArea: string;
  quizTitle: string;
  quizQ1: string;
  quizQ2: string;
  correctLabel: string;
  wrongLabel: string;

  // Cone Unfolding
  coneTitle: string;
  coneSub: string;
  slantHeight: string;
  coneBaseRadius: string;
  cone3DTitle: string;
  cone2DTitle: string;
  coneAngleResult: string;
  coneLateralArea: string;
  coneTotalArea: string;
  coneVolume: string;
  coneRule1: string;
  coneRule2: string;
  coneRule3: string;

  // Exam Practice
  examTitle: string;
  examSub: string;
  scoreLabel: string;
  retryLabel: string;
  questionNumber: string;
  hintBtn: string;
  hideHintBtn: string;
  correctAnswer: string;
  wrongAnswer: string;
  solutionLabel: string;

  // Guide
  guideTitle: string;
  guideSub: string;
  tableTarget: string;
  tableDegree: string;
  tableRadian: string;
  tableNotice: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appTitle: 'Sector & Arc Length Calculator',
    tagline: 'S = (n/360)πr² | l = (n/180)πr | Never Confuse 180 and 360',
    share: 'Share',
    copied: 'Copied',
    github: 'GitHub',
    themeToggle: 'Toggle Theme',
    langSwitch: '中文',

    // Tabs
    tabStandard: 'Sector Calculator',
    tabInverse: 'Inverse Solver',
    tabConfusion: 'Why 180 vs 360?',
    tabCone: 'Cone Unfolding',
    tabExam: 'Practice Quiz',
    tabGuide: 'Formulas & Guide',

    // Canvas
    canvasTitle: 'Interactive Geometry (Drag red point to change angle)',
    chordToggle: 'Chord',
    segmentToggle: 'Segment',
    dragTip: 'Drag the handle to adjust angle',
    presetAngles: 'Common Angles:',
    radiusLabel: 'Radius r',
    arcLabel: 'Arc l',
    chordLabel: 'Chord',
    areaLabel: 'Area S',
    semicircle: 'Semicircle',
    fullCircle: 'Full Circle',

    // Standard Calculator
    inputHeader: 'Input Radius and Central Angle',
    radiusInput: 'Radius r',
    angleInput: 'Central Angle n°',
    sectorAreaTitle: 'Sector Area S',
    arcLengthTitle: 'Arc Length l (denom. 180)',
    exactPi: 'Exact in π:',
    perimeterTitle: 'Perimeter (l + 2r)',
    perimeterNote: 'Includes both radii (+2r)',
    sagittaTitle: 'Sagitta h',
    coneBaseTitle: 'Cone Base Radius',
    stepsToggle: 'Step-by-step Derivation',
    hideSteps: 'Hide',
    showSteps: 'Show',
    formulaLabel: 'Formula:',
    substLabel: 'Substitute:',
    resultLabel: 'Result:',

    step1Title: '1. Arc Length l (Denominator is 180)',
    step1Note: 'Because full circumference is 2πr, dividing by 2 leaves 180!',
    step2Title: '2. Sector Area S (Denominator is 360)',
    step2Note: 'Because full area is πr², there is no factor 2, keeping 360!',
    step3Title: '3. Bridge Formula (Triangle Analogy)',
    step3Note: 'Think of a triangle: Base = arc length l, Height = radius r, Area = ½·l·r',
    step4Title: '4. Sector Perimeter (Often forgotten +2r)',
    step4Note: 'Perimeter must include both straight side radii: C = l + 2r',
    step5Title: '5. Corresponding Cone Base Radius',
    step5Note: 'Unfolded sector radius R equals cone slant height; arc length equals cone base circumference',

    // Inverse Calculator
    inverseHeader: 'Reverse Solver (Find Unknowns from Any 2 Values)',
    inverseSub: 'Choose your two known variables (supports π like 4π or decimals):',
    pairLS: 'Arc l + Area S',
    pairRL: 'Radius r + Arc l',
    pairRS: 'Radius r + Area S',
    pairNL: 'Angle n + Arc l',
    pairNS: 'Angle n + Area S',
    pairRN: 'Radius r + Angle n',
    inputTip: 'Supports expressions with π (e.g. 4π, 12π) or decimals (12.56)',
    inverseRadius: 'Solved Radius r',
    inverseAngle: 'Solved Angle n°',
    invalidInput: 'Please enter valid positive values where the central angle is between 0° and 360°.',

    // 180 vs 360
    confusionTitle: 'Why is Arc Length divided by 180 while Sector Area is divided by 360?',
    confusionSub: 'Master the mathematical origin in 10 seconds and never mix them up on tests.',
    arcBoxTitle: 'Arc Length Formula',
    arcBoxSub: 'Denominator is 180',
    arcDerivation1: '1. Full circle circumference is 2πr, spanning 360°.',
    arcDerivation2: '2. Arc per 1° is 2πr / 360 = πr / 180 (the 2 and 360 cancel).',
    arcDerivation3: '3. Arc for n° is therefore l = n · (πr / 180) = (nπr) / 180.',
    arcKeyReason: 'Key Reason: Circumference has factor 2, simplifying 2/360 into 1/180!',
    areaBoxTitle: 'Sector Area Formula',
    areaBoxSub: 'Denominator is 360',
    areaDerivation1: '1. Full circle area is πr², spanning 360°.',
    areaDerivation2: '2. Area per 1° is πr² / 360 (no factor 2 to cancel).',
    areaDerivation3: '3. Sector for n° is therefore S = n · (πr² / 360) = (nπr²) / 360.',
    areaKeyReason: 'Key Reason: Circle area is πr² without factor 2, preserving 360 intact!',
    bridgeTitle: 'Triangle Analogy: The Bridge Formula S = ½·l·r',
    bridgeDesc: 'If you slice the sector into tiny triangles, arc length becomes the base and radius becomes height.',
    triangleAreaName: 'Triangle Area = ½ · base · height',
    sectorBridgeName: 'Sector Area = ½ · l · r',
    mnemonicCardTitle: 'Mnemonic Rule for Test Day:',
    mnemonicArc: 'Circumference has 2 → divides to 180 (l = nπr / 180)',
    mnemonicArea: 'Area lacks 2 → preserves 360 (S = nπr² / 360)',
    quizTitle: 'Quick 10-Second Check:',
    quizQ1: 'The denominator of arc length formula is:',
    quizQ2: 'The denominator of sector area formula is:',
    correctLabel: 'Correct!',
    wrongLabel: 'Wrong!',

    // Cone Unfolding
    coneTitle: 'Cone Lateral Surface Unfolding',
    coneSub: 'Cone slant height R becomes sector radius; base circle circumference equals sector arc.',
    slantHeight: 'Slant Height R (Sector Radius)',
    coneBaseRadius: 'Base Radius r_base',
    cone3DTitle: '3D Cone Model',
    cone2DTitle: '2D Unrolled Sector',
    coneAngleResult: 'Unrolled Angle n',
    coneLateralArea: 'Lateral Area S_lat',
    coneTotalArea: 'Total Area S_total',
    coneVolume: 'Cone Volume V',
    coneRule1: 'Slant height R equals unfolded sector radius r.',
    coneRule2: 'Unfolded angle formula: n = (r_base / R) × 360°.',
    coneRule3: 'Lateral surface area formula: S_lat = π · r_base · R.',

    // Exam Practice
    examTitle: 'Classic Exam Practice & Self-Test',
    examSub: 'Tests the 180 vs 360 distinction, perimeter trap (+2r), and cone unfolding.',
    scoreLabel: 'Score:',
    retryLabel: 'Reset Quiz',
    questionNumber: 'Question',
    hintBtn: 'Show Hint',
    hideHintBtn: 'Hide Hint',
    correctAnswer: 'Correct!',
    wrongAnswer: 'Incorrect. Solution:',
    solutionLabel: 'Standard Solution:',

    // Guide
    guideTitle: 'Comprehensive Sector Formulas & Reference Guide',
    guideSub: 'A complete handbook for students, educators, and engineers.',
    tableTarget: 'Target Parameter',
    tableDegree: 'Degree Formula (n°)',
    tableRadian: 'Radian Formula (α)',
    tableNotice: 'Common Mistakes & Tips',
  },
  zh: {
    appTitle: '扇形面积与弧长计算器',
    tagline: 'S = (n/360)πr² ｜ l = (n/180)πr ｜ 告别 180 与 360 混淆',
    share: '分享',
    copied: '已复制',
    github: 'GitHub',
    themeToggle: '切换主题',
    langSwitch: 'English',

    // Tabs
    tabStandard: '扇形计算器',
    tabInverse: '反求未知量',
    tabConfusion: '180与360速记',
    tabCone: '圆锥展开',
    tabExam: '真题自测',
    tabGuide: '公式大全',

    // Canvas
    canvasTitle: '交互式几何图形 (拖拽红色端点调节角度)',
    chordToggle: '弦长',
    segmentToggle: '弓形',
    dragTip: '拖动端点快速调节角度',
    presetAngles: '经典角度：',
    radiusLabel: '半径 r',
    arcLabel: '弧长 l',
    chordLabel: '弦长',
    areaLabel: '面积 S',
    semicircle: '半圆',
    fullCircle: '整圆',

    // Standard Calculator
    inputHeader: '输入半径与圆心角',
    radiusInput: '半径 r',
    angleInput: '圆心角 n°',
    sectorAreaTitle: '扇形面积 S',
    arcLengthTitle: '弧长 l (分母180)',
    exactPi: '含π精确值:',
    perimeterTitle: '扇形周长 (l + 2r)',
    perimeterNote: '包含两条直线半径 (+2r)',
    sagittaTitle: '弓高 h',
    coneBaseTitle: '对应圆锥底半径',
    stepsToggle: '推导过程与计算步骤',
    hideSteps: '收起',
    showSteps: '展开',
    formulaLabel: '公式:',
    substLabel: '代入:',
    resultLabel: '结果:',

    step1Title: '1. 弧长 l 计算 (注意分母为 180)',
    step1Note: '因为整圆周长是 2πr，约分后分母是 180，千万别写成 360！',
    step2Title: '2. 扇形面积 S 计算 (注意分母为 360)',
    step2Note: '因为整圆面积是 πr²，没有系数2可以约分，分母始终是 360！',
    step3Title: '3. 面积与弧长关系验算公式 (桥梁公式)',
    step3Note: '像三角形面积公式一样好记：底是弧长l，高是半径r，S=½底×高！',
    step4Title: '4. 扇形周长计算 (易漏加两条半径)',
    step4Note: '中考极易漏分点：扇形周长由1条弧和2条半径围成，必须加上 2r！',
    step5Title: '5. 对应圆锥展开关系 (中考压轴常用)',
    step5Note: '扇形的半径就是圆锥的母线R，扇形的弧长就是底面圆周长！',

    // Inverse Calculator
    inverseHeader: '双向逆推求解器 (已知任意两项求其余参数)',
    inverseSub: '选择你的已知条件 (支持输入 π 如 4π 或小数 12.56)：',
    pairLS: '弧长 l + 面积 S',
    pairRL: '半径 r + 弧长 l',
    pairRS: '半径 r + 面积 S',
    pairNL: '角度 n + 弧长 l',
    pairNS: '角度 n + 面积 S',
    pairRN: '半径 r + 角度 n',
    inputTip: '支持含 π 格式 (如 4π, 12π) 或纯小数 (如 12.56)',
    inverseRadius: '反求半径 r',
    inverseAngle: '反求圆心角 n°',
    invalidInput: '请输入大于 0 的有效正数，且保证所求圆心角在 0° 到 360° 之间。',

    // 180 vs 360
    confusionTitle: '为什么弧长除以 180，而扇形面积除以 360？',
    confusionSub: '本质推导只要 10 秒钟，考场绝不再混淆。',
    arcBoxTitle: '弧长公式',
    arcBoxSub: '分母是 180',
    arcDerivation1: '1. 整圆周长是 2πr，对应圆心角为 360°。',
    arcDerivation2: '2. 1°圆心角的弧长是 2πr / 360 = πr / 180。',
    arcDerivation3: '3. n°圆心角的弧长即为 l = (nπr) / 180。',
    arcKeyReason: '关键原因：因为圆周长公式里有乘数 2，和分母 360 约分后只剩下 180！',
    areaBoxTitle: '扇形面积公式',
    areaBoxSub: '分母是 360',
    areaDerivation1: '1. 整个圆的面积是 πr²，对应圆心角为 360°。',
    areaDerivation2: '2. 1°圆心角的扇形面积是 πr² / 360 (无系数2可约)。',
    areaDerivation3: '3. n°圆心角的面积即为 S = (nπr²) / 360。',
    areaKeyReason: '关键原因：因为圆面积是 πr²，根本没有 2，所以分母无法约分，保持 360！',
    bridgeTitle: '终极破局公式：三角形类比法 S = ½·l·r',
    bridgeDesc: '将扇形微分成若干三角形，弧长对应底，半径对应高，底乘高除以二！',
    triangleAreaName: '三角形面积 = ½ × 底 × 高',
    sectorBridgeName: '扇形面积 = ½ · l · r',
    mnemonicCardTitle: '中考名师速记口诀：',
    mnemonicArc: '“周长带2除剩百八 (180)” (l = nπr / 180)',
    mnemonicArea: '“面积无2全留三六 (360)” (S = nπr² / 360)',
    quizTitle: '快速自我检测：',
    quizQ1: '弧长公式分母是：',
    quizQ2: '扇形面积分母是：',
    correctLabel: '回答正确！',
    wrongLabel: '记混了！',

    // Cone Unfolding
    coneTitle: '圆锥与侧面展开扇形转化专项',
    coneSub: '中考核心：圆锥母线 R 展开为扇形半径，底面圆周长等于扇形弧长。',
    slantHeight: '母线长 R (展开扇形半径)',
    coneBaseRadius: '底面圆半径 r底',
    cone3DTitle: '立体圆锥',
    cone2DTitle: '侧面展开扇形',
    coneAngleResult: '展开圆心角 n',
    coneLateralArea: '圆锥侧面积',
    coneTotalArea: '全面积 (侧+底)',
    coneVolume: '圆锥体积',
    coneRule1: '“母线即是扇形径”：圆锥母线 R 就是展开扇形的半径 r。',
    coneRule2: '“底半比母乘三六”：展开角 n = (r底 / R) × 360°。',
    coneRule3: '“侧面面积派尔阿”：圆锥侧面积公式 S侧 = π · r底 · R。',

    // Exam Practice
    examTitle: '中考圆与扇形典型真题自测',
    examSub: '涵盖 180 与 360 混淆陷阱、周长漏加 2r 与圆锥展开角必考题型。',
    scoreLabel: '得分：',
    retryLabel: '重新测验',
    questionNumber: '第',
    hintBtn: '答题提示',
    hideHintBtn: '隐藏提示',
    correctAnswer: '回答正确！',
    wrongAnswer: '回答错误，解析如下：',
    solutionLabel: '标准解析：',

    // Guide
    guideTitle: '扇形全套核心计算公式汇总与知识指南',
    guideSub: '初中及高中几何复习必备手册，涵盖角度制、弧度制及圆锥侧面展开。',
    tableTarget: '计算目标',
    tableDegree: '角度制公式 (n°)',
    tableRadian: '弧度制公式 (α)',
    tableNotice: '考点避坑提醒',
  },
};
