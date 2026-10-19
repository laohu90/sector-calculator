import React, { useRef, useState, useEffect, useCallback } from 'react';

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
  const [showChord, setShowChord] = useState(false);
  const [showSegment, setShowSegment] = useState(false);

  // SVG dimensions
  const width = 380;
  const height = 340;
  const cx = 190;
  const cy = 205;
  const visualRadius = 140;

  const angleRad = (angleDeg * Math.PI) / 180;
  const startX = cx + visualRadius;
  const startY = cy;

  const endX = cx + visualRadius * Math.cos(-angleRad);
  const endY = cy + visualRadius * Math.sin(-angleRad);

  const largeArcFlag = angleDeg > 180 ? 1 : 0;
  const sweepFlag = 0; // counter-clockwise in SVG coordinates

  const sectorPath =
    angleDeg >= 359.9
      ? `M ${cx} ${cy - visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy + visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy - visualRadius}`
      : `M ${cx} ${cy} L ${startX} ${startY} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;

  const arcOnlyPath =
    angleDeg >= 359.9
      ? `M ${cx} ${cy - visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy + visualRadius} A ${visualRadius} ${visualRadius} 0 1 0 ${cx} ${cy - visualRadius}`
      : `M ${startX} ${startY} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;

  const chordPath = `M ${startX} ${startY} L ${endX} ${endY}`;

  // Angle indicator
  const angleIndR = 36;
  const angleIndEndX = cx + angleIndR * Math.cos(-angleRad);
  const angleIndEndY = cy + angleIndR * Math.sin(-angleRad);
  const angleIndPath =
    angleDeg >= 359.9
      ? `M ${cx + angleIndR} ${cy} A ${angleIndR} ${angleIndR} 0 1 0 ${cx - angleIndR} ${cy} A ${angleIndR} ${angleIndR} 0 1 0 ${cx + angleIndR} ${cy}`
      : `M ${cx + angleIndR} ${cy} A ${angleIndR} ${angleIndR} 0 ${largeArcFlag} 0 ${angleIndEndX} ${angleIndEndY}`;

  const midAngleRad = angleRad / 2;
  const midArcX = cx + (visualRadius + 20) * Math.cos(-midAngleRad);
  const midArcY = cy + (visualRadius + 20) * Math.sin(-midAngleRad);

  const calculateAngleFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current || !onAngleChange) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = width / rect.width;
      const scaleY = height / rect.height;
      const mouseX = (clientX - rect.left) * scaleX;
      const mouseY = (clientY - rect.top) * scaleY;

      const dx = mouseX - cx;
      const dy = -(mouseY - cy);

      let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (deg < 0) deg += 360;

      const snapAngles = [30, 45, 60, 90, 120, 135, 180, 270, 360];
      for (const snap of snapAngles) {
        if (Math.abs(deg - snap) < 3) {
          deg = snap;
          break;
        }
      }

      onAngleChange(Math.max(1, Math.min(360, Math.round(deg))));
    },
    [cx, cy, onAngleChange]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!onAngleChange) return;
    setIsDragging(true);
    (e.target as Element).setPointerCapture(e.pointerId);
  };

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
    const handleUp = () => setIsDragging(false);
    window.addEventListener('pointerup', handleUp);
    return () => window.removeEventListener('pointerup', handleUp);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs select-none">
      {/* Top Bar: Clean Minimalist info and toggles */}
      <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400">
        <span className="font-medium text-slate-700 dark:text-slate-300">
          图形预览 (可拖动红色端点调角度)
        </span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">
            <input
              type="checkbox"
              checked={showChord}
              onChange={(e) => setShowChord(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-0 w-3.5 h-3.5"
            />
            <span>弦长</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer hover:text-slate-800 dark:hover:text-slate-200">
            <input
              type="checkbox"
              checked={showSegment}
              onChange={(e) => setShowSegment(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-0 w-3.5 h-3.5"
            />
            <span>弓形</span>
          </label>
        </div>
      </div>

      {/* SVG Container */}
      <div className="relative w-full aspect-[380/320] flex items-center justify-center my-1">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full touch-none"
          onPointerDown={(e) => {
            if (!isDragging) calculateAngleFromPointer(e.clientX, e.clientY);
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Reference Circle */}
          <circle
            cx={cx}
            cy={cy}
            r={visualRadius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1"
            strokeDasharray="3 3"
            className="dark:stroke-slate-800"
          />

          {/* Sector Body */}
          <path
            d={sectorPath}
            fill="#e0e7ff"
            stroke="#6366f1"
            strokeWidth="2"
            className="dark:fill-indigo-950/40 dark:stroke-indigo-500"
          />

          {/* Optional Segment Shading */}
          {showSegment && angleDeg <= 180 && (
            <path
              d={`M ${startX} ${startY} A ${visualRadius} ${visualRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`}
              fill="#10b981"
              fillOpacity="0.35"
              stroke="#059669"
              strokeWidth="1.5"
            />
          )}

          {/* Arc Line (Red Highlight) */}
          <path
            d={arcOnlyPath}
            fill="none"
            stroke="#e11d48"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Chord Line (Optional) */}
          {showChord && angleDeg < 359 && (
            <path
              d={chordPath}
              fill="none"
              stroke="#d97706"
              strokeWidth="2"
              strokeDasharray="4 3"
            />
          )}

          {/* Central Angle Arc */}
          <path
            d={angleIndPath}
            fill="#6366f1"
            fillOpacity="0.15"
            stroke="#6366f1"
            strokeWidth="1.5"
          />

          {/* Center Point O */}
          <circle cx={cx} cy={cy} r="4" fill="#334155" className="dark:fill-slate-200" />
          <text x={cx - 14} y={cy + 15} className="text-xs font-bold fill-slate-700 dark:fill-slate-300">
            O
          </text>

          {/* Point A */}
          <circle cx={startX} cy={startY} r="3" fill="#6366f1" />

          {/* Point B (Drag Handle) */}
          <g
            className="cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            <circle cx={endX} cy={endY} r="10" fill="#e11d48" fillOpacity="0.2" />
            <circle cx={endX} cy={endY} r="7" fill="#ffffff" stroke="#e11d48" strokeWidth="2.5" />
          </g>

          {/* Minimalist Labels */}
          <text
            x={cx + visualRadius * 0.45}
            y={cy + 15}
            textAnchor="middle"
            className="text-[11px] font-semibold fill-indigo-700 dark:fill-indigo-300"
          >
            r = {radius}
          </text>

          <text
            x={midArcX}
            y={midArcY}
            textAnchor="middle"
            className="text-xs font-bold fill-rose-600 dark:fill-rose-400"
          >
            l ≈ {arcLength.toFixed(2)}
          </text>

          <text
            x={cx + 28 * Math.cos(-midAngleRad)}
            y={cy + 28 * Math.sin(-midAngleRad) + 4}
            textAnchor="middle"
            className="text-[11px] font-bold fill-indigo-900 dark:fill-indigo-200"
          >
            {Math.round(angleDeg)}°
          </text>

          {showChord && angleDeg < 350 && angleDeg > 20 && (
            <text
              x={(startX + endX) / 2}
              y={(startY + endY) / 2 - 6}
              textAnchor="middle"
              className="text-[10px] font-semibold fill-amber-700 dark:fill-amber-400"
            >
              弦长 ≈ {chordLength.toFixed(2)}
            </text>
          )}
        </svg>
      </div>

      {/* Preset Angle Pills */}
      <div className="flex items-center justify-between gap-1 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
        {[
          { label: '45°', angle: 45 },
          { label: '60°', angle: 60 },
          { label: '90°', angle: 90 },
          { label: '120°', angle: 120 },
          { label: '180°', angle: 180 },
          { label: '270°', angle: 270 },
          { label: '360°', angle: 360 },
        ].map((item) => (
          <button
            key={item.angle}
            type="button"
            onClick={() => onAngleChange && onAngleChange(item.angle)}
            className={`px-2.5 py-1 rounded text-center transition ${
              Math.round(angleDeg) === item.angle
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
