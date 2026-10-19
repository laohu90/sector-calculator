import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCw, Sparkles, Layers, Eye, EyeOff } from 'lucide-react';

interface SectorCanvasProps {
  radius: number;
  angleDeg: number;
  arcLength: number;
  area: number;
  chordLength: number;
  onAngleChange?: (angle: number) => void;
  onRadiusChange?: (radius: number) => void;
}

export const SectorCanvas: React.FC<SectorCanvasProps> = ({
  radius,
  angleDeg,
  arcLength,
  area,
  chordLength,
  onAngleChange,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showChord, setShowChord] = useState(true);
  const [showSegment, setShowSegment] = useState(false);
  const [showDimensionLabels, setShowDimensionLabels] = useState(true);

  // SVG dimensions
  const width = 420;
  const height = 400;
  const cx = 210;
  const cy = 230;

  // Visual scaling: keep the sector fitting nicely in the viewBox
  const visualRadius = 150;

  // Angle in radians (standard math: 0 is right, counterclockwise)
  // In SVG coords, y is downward, so angle goes clockwise or we negate y
  // Let's start with sector centered or standard starting at angle -n/2 to +n/2 or starting from horizontal 0.
  // Standard educational style: Base ray along positive X axis or upward.
  // Starting at horizontal right (0 deg) and sweeping counter-clockwise:
  // start point: (cx + visualRadius, cy)
  // In SVG, counter-clockwise means y decreases.
  // Let's sweep from angle 0 to angleDeg counter-clockwise:
  const angleRad = (angleDeg * Math.PI) / 180;
  const startX = cx + visualRadius;
  const startY = cy;

  const endX = cx + visualRadius * Math.cos(-angleRad);
  const endY = cy + visualRadius * Math.sin(-angleRad);

  const largeArcFlag = angleDeg > 180 ? 1 : 0;
  // Sweep flag 0 for counter-clockwise in SVG coordinates
  const sweepFlag = 0;

  // Arc path for the sector: M cx,cy L startX,startY A visualRadius,visualRadius 0 largeArcFlag,sweepFlag endX,endY Z
  const sectorPath =
    angleDeg >= 359.99
      ? `M ${cx} ${cy - visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy + visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy - visualRadius}`
      : `M ${cx} ${cy} L ${startX} ${startY} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;

  // Arc only path (for arc length highlighting)
  const arcOnlyPath =
    angleDeg >= 359.99
      ? `M ${cx} ${cy - visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy + visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy - visualRadius}`
      : `M ${startX} ${startY} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;

  // Chord path
  const chordPath = `M ${startX} ${startY} L ${endX} ${endY}`;

  // Triangle path: O -> Start -> End -> O
  const trianglePath = `M ${cx} ${cy} L ${startX} ${startY} L ${endX} ${endY} Z`;

  // Angle indicator arc (radius ~ 36)
  const angleIndicatorR = Math.min(42, visualRadius * 0.3);
  const angleIndEndX = cx + angleIndicatorR * Math.cos(-angleRad);
  const angleIndEndY = cy + angleIndicatorR * Math.sin(-angleRad);
  const angleIndPath =
    angleDeg >= 359.99
      ? `M ${cx + angleIndicatorR} ${cy} A ${angleIndicatorR} ${angleIndicatorR} 0 1 0 ${cx - angleIndicatorR} ${cy} A ${angleIndicatorR} ${angleIndicatorR} 0 1 0 ${cx + angleIndicatorR} ${cy}`
      : `M ${cx + angleIndicatorR} ${cy} A ${angleIndicatorR} ${angleIndicatorR} 0 ${largeArcFlag} 0 ${angleIndEndX} ${angleIndEndY}`;

  // Midpoint of arc for labeling arc length l
  const midAngleRad = angleRad / 2;
  const midArcX = cx + (visualRadius + 22) * Math.cos(-midAngleRad);
  const midArcY = cy + (visualRadius + 22) * Math.sin(-midAngleRad);

  // Midpoint of radius for labeling r
  const midRadiusX = cx + (visualRadius * 0.5);
  const midRadiusY = cy + 16;

  // Handle drag interaction to change angle
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!onAngleChange) return;
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const calculateAngleFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current || !onAngleChange) return;
      const rect = svgRef.current.getBoundingClientRect();
      // map client coord to SVG coord
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      const mouseX = (clientX - rect.left) * scaleX;
      const mouseY = (clientY - rect.top) * scaleY;

      const dx = mouseX - cx;
      const dy = -(mouseY - cy); // invert Y so up is positive

      let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (deg < 0) deg += 360;

      // Snap to common angles within 2 degrees
      const snapAngles = [30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270, 300, 315, 360];
      for (const snap of snapAngles) {
        if (Math.abs(deg - snap) < 2.5) {
          deg = snap;
          break;
        }
      }

      onAngleChange(Math.max(1, Math.min(360, Math.round(deg))));
    },
    [cx, cy, onAngleChange]
  );

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    calculateAngleFromPointer(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    const handleGlobalUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  return (
    <div className="flex flex-col items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm relative select-none">
      {/* Top Header & Visual Controls */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            交互式几何图形（可直接拖拽弧端点）
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setShowChord(!showChord)}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1 transition ${
              showChord
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-medium'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
            title="显示/隐藏弦长 AB"
          >
            弦长AB
          </button>
          <button
            type="button"
            onClick={() => setShowSegment(!showSegment)}
            className={`px-2.5 py-1 rounded-md border flex items-center gap-1 transition ${
              showSegment
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-medium'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
            title="高亮弓形（扇形减三角形面积）"
          >
            <Layers className="w-3.5 h-3.5" />
            弓形阴影
          </button>
          <button
            type="button"
            onClick={() => setShowDimensionLabels(!showDimensionLabels)}
            className="p-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title={showDimensionLabels ? '隐藏标注' : '显示标注'}
          >
            {showDimensionLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full aspect-[420/380] max-w-[420px] flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible touch-none cursor-crosshair"
          onPointerDown={(e) => {
            // allow clicking anywhere in canvas to set angle if near the circle
            if (!isDragging) {
              calculateAngleFromPointer(e.clientX, e.clientY);
            }
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <defs>
            {/* Sector Gradient */}
            <linearGradient id="sectorFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.12" />
            </linearGradient>

            {/* Triangle Gradient (when segment is highlighted) */}
            <linearGradient id="triangleFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.08" />
            </linearGradient>

            {/* Segment Gradient */}
            <linearGradient id="segmentFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.35" />
            </linearGradient>

            {/* Marker for arrows */}
            <marker id="arrowR" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* Reference full dashed circle for perspective */}
          <circle
            cx={cx}
            cy={cy}
            r={visualRadius}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            className="dark:stroke-slate-700"
          />

          {/* Sector body */}
          <path
            d={sectorPath}
            fill="url(#sectorFillGrad)"
            stroke="#4f46e5"
            strokeWidth="2.2"
            className="transition-colors"
          />

          {/* If segment highlight is ON, overlay triangle or segment */}
          {showSegment && angleDeg <= 180 && (
            <>
              {/* Triangle OAB */}
              <path
                d={trianglePath}
                fill="url(#triangleFillGrad)"
                stroke="#d97706"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Highlight segment area specifically */}
              <path
                d={`M ${startX} ${startY} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`}
                fill="url(#segmentFillGrad)"
                stroke="#059669"
                strokeWidth="2"
              />
            </>
          )}

          {/* Arc path highlighted with distinct color and thickness */}
          <path
            d={arcOnlyPath}
            fill="none"
            stroke="#e11d48"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Chord line (optional) */}
          {showChord && angleDeg < 359 && (
            <path
              d={chordPath}
              fill="none"
              stroke="#d97706"
              strokeWidth="2.2"
              strokeDasharray="5 4"
            />
          )}

          {/* Central angle arc */}
          <path
            d={angleIndPath}
            fill="rgba(99, 102, 241, 0.15)"
            stroke="#6366f1"
            strokeWidth="1.8"
          />

          {/* Center Point O */}
          <circle cx={cx} cy={cy} r="4.5" fill="#1e293b" className="dark:fill-slate-100" />
          <text
            x={cx - 16}
            y={cy + 16}
            className="text-xs font-bold fill-slate-800 dark:fill-slate-200"
          >
            O
          </text>

          {/* Point A (Start) */}
          <circle cx={startX} cy={startY} r="3.5" fill="#4f46e5" />
          <text
            x={startX + 8}
            y={startY + 4}
            className="text-xs font-bold fill-indigo-700 dark:fill-indigo-300"
          >
            A
          </text>

          {/* Point B (End / Drag handle) */}
          <circle cx={endX} cy={endY} r="4" fill="#e11d48" />
          <text
            x={endX + (endX >= cx ? 8 : -16)}
            y={endY + (endY >= cy ? 12 : -8)}
            className="text-xs font-bold fill-rose-600 dark:fill-rose-300"
          >
            B
          </text>

          {/* Drag Handle Ring at End Point B */}
          <g
            className="cursor-grab active:cursor-grabbing group"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <circle
              cx={endX}
              cy={endY}
              r="14"
              fill="rgba(225, 29, 72, 0.2)"
              className="animate-ping opacity-60"
            />
            <circle
              cx={endX}
              cy={endY}
              r="11"
              fill="#ffffff"
              stroke="#e11d48"
              strokeWidth="3"
              className="transition-transform group-hover:scale-125 shadow-md drop-shadow"
            />
            <circle cx={endX} cy={endY} r="4" fill="#e11d48" />
          </g>

          {/* Dimension Labels */}
          {showDimensionLabels && (
            <>
              {/* Radius r label */}
              <text
                x={midRadiusX}
                y={midRadiusY}
                textAnchor="middle"
                className="text-xs font-semibold fill-indigo-700 dark:fill-indigo-300"
              >
                r = {radius}
              </text>

              {/* Arc length l label */}
              <text
                x={midArcX}
                y={midArcY}
                textAnchor="middle"
                className="text-xs font-bold fill-rose-600 dark:fill-rose-400 drop-shadow-sm"
              >
                弧长 l ≈ {arcLength.toFixed(2)}
              </text>

              {/* Angle n° label */}
              <text
                x={cx + (angleIndicatorR + 14) * Math.cos(-midAngleRad)}
                y={cy + (angleIndicatorR + 14) * Math.sin(-midAngleRad) + 4}
                textAnchor="middle"
                className="text-xs font-extrabold fill-indigo-800 dark:fill-indigo-200"
              >
                {Math.round(angleDeg)}°
              </text>

              {/* Area label inside sector if room */}
              {angleDeg > 35 && (
                <text
                  x={cx + (visualRadius * 0.55) * Math.cos(-midAngleRad)}
                  y={cy + (visualRadius * 0.55) * Math.sin(-midAngleRad)}
                  textAnchor="middle"
                  className="text-xs font-medium fill-slate-700 dark:fill-slate-300"
                >
                  S ≈ {area.toFixed(2)}
                </text>
              )}

              {/* Chord length label if enabled */}
              {showChord && angleDeg < 350 && angleDeg > 20 && (
                <text
                  x={(startX + endX) / 2 + 10}
                  y={(startY + endY) / 2 - 8}
                  textAnchor="middle"
                  className="text-[11px] font-semibold fill-amber-700 dark:fill-amber-400"
                >
                  弦长 c ≈ {chordLength.toFixed(2)}
                </text>
              )}
            </>
          )}
        </svg>
      </div>

      {/* Quick angle snap presets */}
      <div className="w-full mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between">
          <span>经典圆心角快捷定位：</span>
          <span className="text-slate-400">比例</span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
          {[
            { label: '30°', angle: 30, frac: '1/12' },
            { label: '45°', angle: 45, frac: '1/8' },
            { label: '60°', angle: 60, frac: '1/6' },
            { label: '90°', angle: 90, frac: '1/4' },
            { label: '120°', angle: 120, frac: '1/3' },
            { label: '180°', angle: 180, frac: '半圆' },
            { label: '270°', angle: 270, frac: '3/4' },
            { label: '360°', angle: 360, frac: '整圆' },
          ].map((item) => (
            <button
              key={item.angle}
              type="button"
              onClick={() => onAngleChange && onAngleChange(item.angle)}
              className={`py-1 px-1 text-center rounded text-xs transition border flex flex-col items-center justify-center ${
                Math.round(angleDeg) === item.angle
                  ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/30'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[10px] opacity-75">{item.frac}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
