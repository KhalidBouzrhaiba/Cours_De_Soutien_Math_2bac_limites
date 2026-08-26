import React, { useRef, useEffect, useState, useMemo } from 'react';
import { MathView } from './MathView';
import { Play, RotateCcw, ZoomIn, ZoomOut, Eye, HelpCircle } from 'lucide-react';

export interface GraphPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  latex: string;
  fn: (x: number, param: number) => number | null;
  domain: [number, number];
  range: [number, number];
  defaultParam?: number;
  paramLabel?: string;
  paramMin?: number;
  paramMax?: number;
  paramStep?: number;
  showHoleAt?: { x: number; y: number };
  showAsymptoteH?: number;
  showAsymptoteV?: number[];
  showInverse?: boolean;
  inverseFn?: (x: number) => number | null;
  inverseLatex?: string;
  tviTarget?: number;
  specialPoints?: { x: number; y: number; label: string; color?: string }[];
}

export const PRESETS: GraphPreset[] = [
  {
    id: 'sinc',
    name: 'Limite Trigonométrique : sin(x)/x',
    category: 'Limites Fondamentales',
    description: 'Montre la limite remarquable lim_{x→0} sin(x)/x = 1. La fonction a un trou en x=0 mais admet 1 pour limite.',
    latex: 'f(x) = \\frac{\\sin(x)}{x}',
    fn: (x) => (Math.abs(x) < 0.0001 ? null : Math.sin(x) / x),
    domain: [-10, 10],
    range: [-0.6, 1.4],
    showHoleAt: { x: 0, y: 1 },
    specialPoints: [{ x: 0, y: 1, label: 'L = 1 en x=0', color: '#16a34a' }],
  },
  {
    id: 'cos-diff',
    name: 'Limite Trigonométrique : (1 - cos(x))/x²',
    category: 'Limites Fondamentales',
    description: 'Montre lim_{x→0} (1 - cos(x))/x² = 1/2 = 0.5.',
    latex: 'f(x) = \\frac{1 - \\cos(x)}{x^2}',
    fn: (x) => (Math.abs(x) < 0.0001 ? null : (1 - Math.cos(x)) / (x * x)),
    domain: [-8, 8],
    range: [-0.2, 0.8],
    showHoleAt: { x: 0, y: 0.5 },
    specialPoints: [{ x: 0, y: 0.5, label: 'L = 1/2 en x=0', color: '#2563eb' }],
  },
  {
    id: 'conjugate-study',
    name: 'Quantité Conjuguée : √(x² + x) - x',
    category: 'Levée d\'Indétermination',
    description: 'Indétermination (+∞ - ∞) levée par le conjugué, montrant l\'asymptote horizontale y = 0.5 en +∞.',
    latex: 'f(x) = \\sqrt{x^2 + x} - x',
    fn: (x) => (x * x + x < 0 ? null : Math.sqrt(x * x + x) - x),
    domain: [-4, 15],
    range: [-1, 2],
    showAsymptoteH: 0.5,
    specialPoints: [{ x: 10, y: 0.488, label: 'f(x) → 1/2', color: '#dc2626' }],
  },
  {
    id: 'tvi-demo',
    name: 'Théorème des Valeurs Intermédiaires (TVI)',
    category: 'Continuité & TVI',
    description: 'Fonction continue coupant l\'axe des abscisses (TVI) et intersectant une valeur intermédiaire k.',
    latex: 'f(x) = x^3 - 2x - 1',
    fn: (x) => x * x * x - 2 * x - 1,
    domain: [-2.5, 2.5],
    range: [-4, 4],
    tviTarget: 0,
    specialPoints: [
      { x: -1, y: 0, label: 'f(-1)=0', color: '#9333ea' },
      { x: 1.618, y: 0, label: 'α ≈ 1.618', color: '#dc2626' },
      { x: -0.618, y: 0, label: 'α₂ ≈ -0.618', color: '#dc2626' },
    ],
  },
  {
    id: 'reciprocal-sym',
    name: 'Fonction Réciproque & Symétrie (y = x)',
    category: 'Fonctions Réciproques',
    description: 'Symétrie orthogonale parfaite entre la courbe de f(x) = x² et sa fonction réciproque f⁻¹(x) = √x par rapport à (Δ) : y = x.',
    latex: 'f(x) = x^2 \\quad (x \\ge 0) \\quad \\& \\quad f^{-1}(x) = \\sqrt{x}',
    fn: (x) => (x < 0 ? null : x * x),
    domain: [-0.5, 4],
    range: [-0.5, 4],
    showInverse: true,
    inverseFn: (x) => (x < 0 ? null : Math.sqrt(x)),
    inverseLatex: 'f^{-1}(x) = \\sqrt{x}',
  },
  {
    id: 'cubic-root',
    name: 'Racine Cubique : ∛x',
    category: 'Racines n-ièmes',
    description: 'La fonction réciproque de x ↦ x³ sur ℝ : continue, strictement croissante.',
    latex: 'f(x) = \\sqrt[3]{x} = x^{1/3}',
    fn: (x) => (x >= 0 ? Math.cbrt(x) : -Math.cbrt(-x)),
    domain: [-8, 8],
    range: [-3, 3],
    showInverse: true,
    inverseFn: (x) => (Math.abs(x) > 2.5 ? null : x * x * x),
    inverseLatex: 'g(x) = x^3',
  },
  {
    id: 'rational-left-right',
    name: 'Limites Latérales : (x+1)² / |x² - 1|',
    category: 'Continuité en un point',
    description: 'Étude au voisinage de x = -1 : lim_{x→-1⁻} f(x) = lim_{x→-1⁺} f(x) = 0.',
    latex: 'f(x) = \\frac{(x+1)^2}{|x^2 - 1|} = \\frac{x+1}{|x-1|}',
    fn: (x) => {
      const denom = Math.abs(x * x - 1);
      if (denom < 0.001) return null;
      return (x + 1) * (x + 1) / denom;
    },
    domain: [-3, 3],
    range: [-0.5, 5],
    showAsymptoteV: [1],
    specialPoints: [{ x: -1, y: 0, label: 'lim en -1 = 0', color: '#16a34a' }],
  },
];

export const InteractiveGraph: React.FC<{
  initialPresetId?: string;
  onSelectPreset?: (preset: GraphPreset) => void;
  hidePresetSelector?: boolean;
  compact?: boolean;
}> = ({ initialPresetId = 'sinc', hidePresetSelector = false, compact = false }) => {
  const [selectedId, setSelectedId] = useState<string>(initialPresetId);
  const [activeParam, setActiveParam] = useState<number>(1);
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number } | null>(null);
  const [showTangent, setShowTangent] = useState(false);
  const [tangentX, setTangentX] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showBisector, setShowBisector] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync when initialPresetId prop changes
  useEffect(() => {
    if (initialPresetId) {
      setSelectedId(initialPresetId);
    }
  }, [initialPresetId]);

  const preset = useMemo(() => {
    return PRESETS.find((p) => p.id === selectedId) || PRESETS[0];
  }, [selectedId]);

  useEffect(() => {
    if (preset.defaultParam !== undefined) {
      setActiveParam(preset.defaultParam);
    }
    setTangentX((preset.domain[0] + preset.domain[1]) / 4);
  }, [preset]);

  // Render on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Calculate domain & range with zoom
    const xMid = (preset.domain[0] + preset.domain[1]) / 2;
    const xSpan = ((preset.domain[1] - preset.domain[0]) / 2) / zoomLevel;
    const minX = xMid - xSpan;
    const maxX = xMid + xSpan;

    const yMid = (preset.range[0] + preset.range[1]) / 2;
    const ySpan = ((preset.range[1] - preset.range[0]) / 2) / zoomLevel;
    const minY = yMid - ySpan;
    const maxY = yMid + ySpan;

    // Transform functions
    const toCanvasX = (x: number) => ((x - minX) / (maxX - minX)) * width;
    const toCanvasY = (y: number) => height - ((y - minY) / (maxY - minY)) * height;

    // Clear
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw Grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#f1f5f9';

    // Sub-grid lines
    const xStep = Math.pow(10, Math.floor(Math.log10(maxX - minX))) / 2;
    const yStep = Math.pow(10, Math.floor(Math.log10(maxY - minY))) / 2;

    const firstX = Math.floor(minX / xStep) * xStep;
    for (let x = firstX; x <= maxX; x += xStep) {
      const cx = toCanvasX(x);
      ctx.beginPath();
      ctx.moveTo(cx, 0);
      ctx.lineTo(cx, height);
      ctx.stroke();
    }

    const firstY = Math.floor(minY / yStep) * yStep;
    for (let y = firstY; y <= maxY; y += yStep) {
      const cy = toCanvasY(y);
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();
    }

    // Draw Main Axes
    const originX = toCanvasX(0);
    const originY = toCanvasY(0);

    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;

    // X Axis
    if (originY >= 0 && originY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.stroke();

      // X Axis Ticks & labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      for (let x = firstX; x <= maxX; x += xStep) {
        if (Math.abs(x) > 0.0001) {
          const cx = toCanvasX(x);
          ctx.beginPath();
          ctx.moveTo(cx, originY - 4);
          ctx.lineTo(cx, originY + 4);
          ctx.stroke();
          ctx.fillText(x.toFixed(xStep < 1 ? 1 : 0), cx, originY + 16);
        }
      }
    }

    // Y Axis
    if (originX >= 0 && originX <= width) {
      ctx.beginPath();
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();

      // Y Axis Ticks & labels
      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      for (let y = firstY; y <= maxY; y += yStep) {
        if (Math.abs(y) > 0.0001) {
          const cy = toCanvasY(y);
          ctx.beginPath();
          ctx.moveTo(originX - 4, cy);
          ctx.lineTo(originX + 4, cy);
          ctx.stroke();
          ctx.fillText(y.toFixed(yStep < 1 ? 1 : 0), originX - 6, cy + 4);
        }
      }
    }

    // Bisector (y = x)
    if (showBisector && (preset.showInverse || preset.id === 'reciprocal-sym')) {
      ctx.save();
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(toCanvasX(minX), toCanvasY(minX));
      ctx.lineTo(toCanvasX(maxX), toCanvasY(maxX));
      ctx.stroke();
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'italic 12px serif';
      ctx.fillText('(Δ) : y = x', toCanvasX(maxX) - 45, toCanvasY(maxX) + 18);
      ctx.restore();
    }

    // Horizontal Asymptote
    if (preset.showAsymptoteH !== undefined) {
      const asymY = toCanvasY(preset.showAsymptoteH);
      ctx.save();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, asymY);
      ctx.lineTo(width, asymY);
      ctx.stroke();
      ctx.fillStyle = '#b45309';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Asymptote H : y = ${preset.showAsymptoteH}`, width - 130, asymY - 6);
      ctx.restore();
    }

    // Vertical Asymptote(s)
    if (preset.showAsymptoteV) {
      preset.showAsymptoteV.forEach((asymX) => {
        const cx = toCanvasX(asymX);
        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, height);
        ctx.stroke();
        ctx.fillStyle = '#b91c1c';
        ctx.font = '11px sans-serif';
        ctx.fillText(`Asymptote V : x = ${asymX}`, cx + 6, 20);
        ctx.restore();
      });
    }

    // TVI Target Line
    if (preset.tviTarget !== undefined) {
      const tvY = toCanvasY(preset.tviTarget);
      ctx.save();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.moveTo(0, tvY);
      ctx.lineTo(width, tvY);
      ctx.stroke();
      ctx.fillStyle = '#047857';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Valeur k = ${preset.tviTarget} (TVI)`, 10, tvY - 6);
      ctx.restore();
    }

    // Draw Inverse Function (if enabled)
    if (preset.showInverse && preset.inverseFn) {
      ctx.save();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let startedInv = false;
      const numSteps = 400;
      for (let i = 0; i <= numSteps; i++) {
        const x = minX + (i / numSteps) * (maxX - minX);
        const y = preset.inverseFn(x);
        if (y !== null && !isNaN(y) && isFinite(y) && y >= minY - 5 && y <= maxY + 5) {
          const cx = toCanvasX(x);
          const cy = toCanvasY(y);
          if (!startedInv) {
            ctx.moveTo(cx, cy);
            startedInv = true;
          } else {
            ctx.lineTo(cx, cy);
          }
        } else {
          startedInv = false;
        }
      }
      ctx.stroke();
      ctx.restore();
    }

    // Draw Main Function f(x)
    ctx.save();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.8;
    ctx.beginPath();

    const steps = 600;
    let started = false;
    for (let i = 0; i <= steps; i++) {
      const x = minX + (i / steps) * (maxX - minX);
      const y = preset.fn(x, activeParam);
      if (y !== null && !isNaN(y) && isFinite(y) && y >= minY - 10 && y <= maxY + 10) {
        const cx = toCanvasX(x);
        const cy = toCanvasY(y);
        if (!started) {
          ctx.moveTo(cx, cy);
          started = true;
        } else {
          ctx.lineTo(cx, cy);
        }
      } else {
        started = false;
      }
    }
    ctx.stroke();
    ctx.restore();

    // Draw Tangent line (if enabled)
    if (showTangent) {
      const tX = tangentX;
      const tY = preset.fn(tX, activeParam);
      if (tY !== null && isFinite(tY)) {
        // Calculate numerical derivative
        const h = 0.001;
        const y1 = preset.fn(tX - h, activeParam);
        const y2 = preset.fn(tX + h, activeParam);
        if (y1 !== null && y2 !== null) {
          const slope = (y2 - y1) / (2 * h);
          const cx1 = toCanvasX(minX);
          const cy1 = toCanvasY(tY + slope * (minX - tX));
          const cx2 = toCanvasX(maxX);
          const cy2 = toCanvasY(tY + slope * (maxX - tX));

          ctx.save();
          ctx.strokeStyle = '#8b5cf6';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx1, cy1);
          ctx.lineTo(cx2, cy2);
          ctx.stroke();

          // Tangent contact point
          ctx.fillStyle = '#8b5cf6';
          ctx.beginPath();
          ctx.arc(toCanvasX(tX), toCanvasY(tY), 5, 0, 2 * Math.PI);
          ctx.fill();
          ctx.fillStyle = '#5b21b6';
          ctx.font = 'bold 11px sans-serif';
          ctx.fillText(`Tangente (pente = ${slope.toFixed(2)})`, toCanvasX(tX) + 8, toCanvasY(tY) - 8);
          ctx.restore();
        }
      }
    }

    // Draw Hole (removable discontinuity)
    if (preset.showHoleAt) {
      const hx = toCanvasX(preset.showHoleAt.x);
      const hy = toCanvasY(preset.showHoleAt.y);
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#2563eb';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Special Points
    if (preset.specialPoints) {
      preset.specialPoints.forEach((pt) => {
        const px = toCanvasX(pt.x);
        const py = toCanvasY(pt.y);
        ctx.save();
        ctx.fillStyle = pt.color || '#dc2626';
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = pt.color || '#dc2626';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(pt.label, px + 8, py - 6);
        ctx.restore();
      });
    }

    // Hover Coordinate Indicator
    if (hoverCoord) {
      const hx = toCanvasX(hoverCoord.x);
      const hy = toCanvasY(hoverCoord.y);
      ctx.save();
      ctx.strokeStyle = '#94a3b8';
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(hx, 0);
      ctx.lineTo(hx, height);
      ctx.moveTo(0, hy);
      ctx.lineTo(width, hy);
      ctx.stroke();

      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(hx, hy, 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
  }, [preset, activeParam, hoverCoord, showTangent, tangentX, zoomLevel, showBisector]);

  // Handle Canvas Mouse Move
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.x;
    const cy = e.clientY - rect.y;

    const xMid = (preset.domain[0] + preset.domain[1]) / 2;
    const xSpan = ((preset.domain[1] - preset.domain[0]) / 2) / zoomLevel;
    const minX = xMid - xSpan;
    const maxX = xMid + xSpan;

    const yMid = (preset.range[0] + preset.range[1]) / 2;
    const ySpan = ((preset.range[1] - preset.range[0]) / 2) / zoomLevel;
    const minY = yMid - ySpan;
    const maxY = yMid + ySpan;

    const mathX = minX + (cx / rect.width) * (maxX - minX);
    const mathY = maxY - (cy / rect.height) * (maxY - minY);

    const actualY = preset.fn(mathX, activeParam);
    if (actualY !== null && isFinite(actualY)) {
      setHoverCoord({ x: mathX, y: actualY });
    } else {
      setHoverCoord({ x: mathX, y: mathY });
    }
  };

  const handleMouseLeave = () => {
    setHoverCoord(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col" ref={containerRef}>
      {/* Top Header & Presets Bar */}
      <div className={`bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-3 ${compact ? 'p-3' : 'p-4'}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-2xs sm:text-xs font-semibold px-2 py-0.5 rounded-full text-white">
              Visualiseur 2D Interactif
            </span>
            <span className="text-2xs sm:text-xs text-slate-400">{preset.category}</span>
          </div>
          <h3 className={`font-bold text-white mt-1 flex items-center gap-2 ${compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
            {preset.name}
          </h3>
        </div>

        {/* Preset Selector (if not hidden) */}
        {!hidePresetSelector && (
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-xs text-slate-300 font-medium">Courbe :</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Math Formula Display & Controls */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            <MathView math={preset.latex} />
          </div>

          {preset.showInverse && preset.inverseLatex && (
            <div className="bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs flex items-center gap-2 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <MathView math={preset.inverseLatex} />
            </div>
          )}
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {preset.showInverse && (
            <button
              onClick={() => setShowBisector(!showBisector)}
              className={`text-2xs sm:text-xs px-2.5 py-1 rounded-md border font-medium transition cursor-pointer ${
                showBisector ? 'bg-blue-50 text-blue-700 border-blue-300' : 'bg-white text-slate-600 border-slate-200'
              }`}
            >
              (y = x)
            </button>
          )}

          <button
            onClick={() => setShowTangent(!showTangent)}
            className={`text-2xs sm:text-xs px-2.5 py-1 rounded-md border font-medium transition cursor-pointer ${
              showTangent ? 'bg-purple-50 text-purple-700 border-purple-300' : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            Tangente
          </button>

          <div className="flex items-center border border-slate-200 bg-white rounded-md overflow-hidden shadow-2xs">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z * 1.3, 5))}
              className="p-1 sm:p-1.5 hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z / 1.3, 0.4))}
              className="p-1 sm:p-1.5 hover:bg-slate-100 text-slate-600 border-l border-slate-200 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 sm:p-1.5 hover:bg-slate-100 text-slate-600 border-l border-slate-200 cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className={`relative w-full bg-white cursor-crosshair ${compact ? 'h-64 sm:h-72 md:h-80' : 'h-80 md:h-96'}`}>
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full block"
        />

        {/* Live Coordinate Badge */}
        {hoverCoord && (
          <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-xs font-mono px-3 py-1.5 rounded-md shadow-md backdrop-blur-xs flex items-center gap-3 pointer-events-none">
            <span>x = {hoverCoord.x.toFixed(3)}</span>
            <span className="text-blue-400">f(x) = {hoverCoord.y.toFixed(3)}</span>
          </div>
        )}
      </div>

      {/* Dynamic Sliders Bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-3 text-xs text-slate-600 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <p className="leading-relaxed">
          <strong className="text-slate-900 font-semibold">Explication : </strong>
          {preset.description}
        </p>

        {showTangent && (
          <div className="flex items-center gap-2 shrink-0 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
            <span className="font-semibold text-purple-700">Point x₀ :</span>
            <input
              type="range"
              min={preset.domain[0] + 0.5}
              max={preset.domain[1] - 0.5}
              step="0.1"
              value={tangentX}
              onChange={(e) => setTangentX(parseFloat(e.target.value))}
              className="w-24 accent-purple-600 cursor-pointer"
            />
            <span className="font-mono">{tangentX.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
