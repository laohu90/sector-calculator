/**
 * Math utilities for Sector and Arc calculations
 * Handles exact representation with Pi, fraction simplification, and numerical approximations.
 */

/** Parse input string that may contain pi, π, fractions */
export function parseMathInput(input: string | number): number {
  if (typeof input === 'number') return isNaN(input) ? 0 : input;
  if (!input) return 0;
  const cleaned = input.trim().toLowerCase().replace(/π/g, 'pi');
  
  try {
    if (cleaned.includes('pi')) {
      const parts = cleaned.split('pi');
      const coeffStr = parts[0].replace('*', '').trim();
      const coeff = coeffStr === '' || coeffStr === '+' ? 1 : coeffStr === '-' ? -1 : parseFloat(coeffStr) || 1;
      let after = 1;
      if (parts[1] && parts[1].startsWith('/')) {
        const div = parseFloat(parts[1].slice(1)) || 1;
        after = 1 / div;
      }
      return coeff * Math.PI * after;
    }
    if (cleaned.includes('/')) {
      const [num, den] = cleaned.split('/');
      const n = parseFloat(num);
      const d = parseFloat(den);
      if (!isNaN(n) && !isNaN(d) && d !== 0) return n / d;
    }
    const val = parseFloat(cleaned);
    return isNaN(val) ? 0 : val;
  } catch {
    return 0;
  }
}

export interface SectorCalculationResult {
  radius: number;
  angleDeg: number;
  angleRad: number;
  // Arc length
  arcLength: number;
  arcLengthPiExact: string;
  // Area
  area: number;
  areaPiExact: string;
  // Perimeter
  perimeter: number;
  perimeterPiExact: string;
  // Chord length
  chordLength: number;
  // Sagitta / Height
  sagitta: number;
  // Triangle area (formed by two radii and chord)
  triangleArea: number;
  // Segment area (弓形面积)
  segmentArea: number;
  // Cone properties
  coneBaseRadius: number;
  coneBaseRadiusPiExact: string;
  coneHeight: number | null;
  coneVolume: number | null;
  // Derivation steps
  steps: {
    title: string;
    formula: string;
    substitution: string;
    result: string;
    note?: string;
  }[];
}

/** Greatest Common Divisor */
export function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b > 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
}

/** Formats a fraction a/b with optional pi */
export function formatFractionWithPi(numerator: number, denominator: number, hasPi = true): string {
  if (Math.abs(numerator) < 1e-9) return '0';
  const g = gcd(numerator, denominator);
  let num = Math.round(numerator / g);
  let den = Math.round(denominator / g);

  if (den < 0) {
    num = -num;
    den = -den;
  }

  if (hasPi) {
    if (den === 1) {
      if (num === 1) return '\\pi';
      if (num === -1) return '-\\pi';
      return `${num}\\pi`;
    }
    if (num === 1) return `\\frac{\\pi}{${den}}`;
    if (num === -1) return `-\\frac{\\pi}{${den}}`;
    return `\\frac{${num}\\pi}{${den}}`;
  } else {
    if (den === 1) return `${num}`;
    return `\\frac{${num}}{${den}}`;
  }
}

/** Simplify a floating number into reasonable decimal */
export function formatNumber(val: number, decimals = 4): string {
  if (isNaN(val) || !isFinite(val)) return '0';
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(val * factor) / factor;
  return rounded.toString();
}

/** Calculate full sector properties from radius r and angle in degrees n */
export function computeFromRadiusAndAngle(r: number, n: number): SectorCalculationResult {
  // Normalize angle between 0 and 360 for standard sectors, but allow user up to 360
  const angleDeg = Math.max(0.01, Math.min(360, n));
  const radius = Math.max(0.001, r);

  const angleRad = (angleDeg * Math.PI) / 180;

  // Arc length l = (n / 180) * PI * r
  const arcLength = (angleDeg * Math.PI * radius) / 180;
  // Check if r is integer or close to it
  const isRInteger = Number.isInteger(radius);
  const isNDegInteger = Number.isInteger(angleDeg);

  let arcLengthPiExact = '';
  let areaPiExact = '';
  let perimeterPiExact = '';

  if (isRInteger && isNDegInteger) {
    const arcNum = angleDeg * radius;
    const arcDen = 180;
    arcLengthPiExact = formatFractionWithPi(arcNum, arcDen, true);

    const areaNum = angleDeg * radius * radius;
    const areaDen = 360;
    areaPiExact = formatFractionWithPi(areaNum, areaDen, true);

    perimeterPiExact = `${arcLengthPiExact} + ${2 * radius}`;
  } else {
    arcLengthPiExact = `${formatNumber(arcLength / Math.PI, 3)}\\pi`;
    areaPiExact = `${formatNumber(((angleDeg / 360) * radius * radius), 3)}\\pi`;
    perimeterPiExact = `${formatNumber(arcLength / Math.PI, 3)}\\pi + ${formatNumber(2 * radius, 2)}`;
  }

  // Area S = (n / 360) * PI * r^2 = 0.5 * l * r
  const area = (angleDeg * Math.PI * radius * radius) / 360;

  // Perimeter P = l + 2r
  const perimeter = arcLength + 2 * radius;

  // Chord length: c = 2 * r * sin(n / 2 in radians)
  const halfAngleRad = (angleDeg * Math.PI) / 360;
  const chordLength = 2 * radius * Math.sin(halfAngleRad);

  // Sagitta (弓高): h = r * (1 - cos(n / 2))
  const sagitta = radius * (1 - Math.cos(halfAngleRad));

  // Triangle area formed by chord and two radii: S_tri = 0.5 * r^2 * sin(angle)
  const triangleArea = 0.5 * radius * radius * Math.sin(angleRad);

  // Segment area: for angle <= 180: S_seg = S_sector - S_tri; for > 180: S_seg = S_sector + S_tri
  const segmentArea = angleDeg <= 180 ? Math.max(0, area - triangleArea) : area + triangleArea;

  // Cone properties: If sector forms lateral surface of cone:
  // l_sector = 2 * PI * r_cone => r_cone = l / (2 * PI) = (n / 360) * r
  const coneBaseRadius = (angleDeg / 360) * radius;
  let coneBaseRadiusPiExact = '';
  if (isRInteger && isNDegInteger) {
    coneBaseRadiusPiExact = formatFractionWithPi(angleDeg * radius, 360, false);
  } else {
    coneBaseRadiusPiExact = formatNumber(coneBaseRadius, 3);
  }

  let coneHeight: number | null = null;
  let coneVolume: number | null = null;
  if (radius > coneBaseRadius) {
    coneHeight = Math.sqrt(radius * radius - coneBaseRadius * coneBaseRadius);
    coneVolume = (1 / 3) * Math.PI * coneBaseRadius * coneBaseRadius * coneHeight;
  }

  const steps = [
    {
      title: '1. 弧长 l 计算 (注意分母为 180)',
      formula: 'l = \\frac{n}{180} \\pi r = \\frac{n}{360} \\times (2\\pi r)',
      substitution: `l = \\frac{${angleDeg}}{180} \\times \\pi \\times ${radius}`,
      result: `l = ${arcLengthPiExact} \\approx ${formatNumber(arcLength, 4)}`,
      note: '因为整圆周长是 2πr，约分后分母是 180，千万别写成 360！',
    },
    {
      title: '2. 扇形面积 S 计算 (注意分母为 360)',
      formula: 'S = \\frac{n}{360} \\pi r^2',
      substitution: `S = \\frac{${angleDeg}}{360} \\times \\pi \\times ${radius}^2 = \\frac{${angleDeg}}{360} \\times \\pi \\times ${formatNumber(radius * radius, 2)}`,
      result: `S = ${areaPiExact} \\approx ${formatNumber(area, 4)}`,
      note: '因为整圆面积是 πr²，没有系数2可以约分，分母始终是 360！',
    },
    {
      title: '3. 面积与弧长关系验算公式 (桥梁公式)',
      formula: 'S = \\frac{1}{2} l r',
      substitution: `S = \\frac{1}{2} \\times (${formatNumber(arcLength, 4)}) \\times ${radius}`,
      result: `S \\approx ${formatNumber(0.5 * arcLength * radius, 4)}`,
      note: '像三角形面积公式一样好记：底是弧长l，高是半径r，S=½底×高！',
    },
    {
      title: '4. 扇形周长计算 (易漏加两条半径)',
      formula: 'C = l + 2r',
      substitution: `C = (${formatNumber(arcLength, 4)}) + 2 \\times ${radius}`,
      result: `C \\approx ${formatNumber(perimeter, 4)}`,
      note: '中考极易漏分点：扇形周长由1条弧和2条半径围成，必须加上 2r！',
    },
    {
      title: '5. 对应圆锥展开关系 (中考压轴常用)',
      formula: 'r_{底} = \\frac{n}{360} R = \\frac{l}{2\\pi}',
      substitution: `r_{底} = \\frac{${angleDeg}}{360} \\times ${radius}`,
      result: `r_{底} = ${coneBaseRadiusPiExact} \\approx ${formatNumber(coneBaseRadius, 4)}`,
      note: '扇形的半径就是圆锥的母线R，扇形的弧长就是底面圆周长！',
    },
  ];

  return {
    radius,
    angleDeg,
    angleRad,
    arcLength,
    arcLengthPiExact,
    area,
    areaPiExact,
    perimeter,
    perimeterPiExact,
    chordLength,
    sagitta,
    triangleArea,
    segmentArea,
    coneBaseRadius,
    coneBaseRadiusPiExact,
    coneHeight,
    coneVolume,
    steps,
  };
}

/** Solve for other parameters given any 2 known values */
export type KnownPairType = 'r_n' | 'r_l' | 'r_s' | 'n_l' | 'n_s' | 'l_s';

export function solveInverseSector(
  type: KnownPairType,
  val1: number,
  val2: number
): SectorCalculationResult | null {
  if (val1 <= 0 || val2 <= 0) return null;

  let r = 0;
  let n = 0;

  switch (type) {
    case 'r_n':
      r = val1;
      n = val2;
      break;

    case 'r_l': {
      // Known r and arc length l
      r = val1;
      const l = val2;
      // l = n * PI * r / 180 => n = (180 * l) / (PI * r)
      n = (180 * l) / (Math.PI * r);
      break;
    }

    case 'r_s': {
      // Known r and area S
      r = val1;
      const s = val2;
      // S = n * PI * r^2 / 360 => n = (360 * S) / (PI * r^2)
      n = (360 * s) / (Math.PI * r * r);
      break;
    }

    case 'n_l': {
      // Known angle n and arc length l
      n = val1;
      const l = val2;
      // l = n * PI * r / 180 => r = (180 * l) / (n * PI)
      r = (180 * l) / (n * Math.PI);
      break;
    }

    case 'n_s': {
      // Known angle n and area S
      n = val1;
      const s = val2;
      // S = n * PI * r^2 / 360 => r^2 = (360 * S) / (n * PI) => r = sqrt((360*S)/(n*PI))
      const rSquared = (360 * s) / (n * Math.PI);
      if (rSquared <= 0) return null;
      r = Math.sqrt(rSquared);
      break;
    }

    case 'l_s': {
      // Known arc length l and area S
      // S = 0.5 * l * r => r = 2 * S / l
      const l = val1;
      const s = val2;
      r = (2 * s) / l;
      // Then n = (180 * l) / (PI * r)
      n = (180 * l) / (Math.PI * r);
      break;
    }
  }

  if (r <= 0 || n <= 0 || isNaN(r) || isNaN(n)) return null;

  return computeFromRadiusAndAngle(r, n);
}
