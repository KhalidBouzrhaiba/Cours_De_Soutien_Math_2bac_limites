import React, { useState } from 'react';
import { MathView } from './MathView';
import { Play, RotateCcw, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';

interface DichotomyStep {
  step: number;
  a: number;
  b: number;
  m: number;
  fa: number;
  fb: number;
  fm: number;
  newInterval: [number, number];
  amplitude: number;
}

export const DichotomyVisualizer: React.FC = () => {
  const [funcId, setFuncId] = useState<'f1' | 'f2' | 'f3'>('f1');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [history, setHistory] = useState<DichotomyStep[]>([]);

  const config = {
    f1: {
      name: 'f(x) = x³ + x - 1',
      latex: 'f(x) = x^3 + x - 1',
      fn: (x: number) => x * x * x + x - 1,
      initA: 0,
      initB: 1,
      rootApprox: 0.6823,
    },
    f2: {
      name: 'f(x) = x³ - 3x + 1',
      latex: 'f(x) = x^3 - 3x + 1',
      fn: (x: number) => x * x * x - 3 * x + 1,
      initA: 1,
      initB: 2,
      rootApprox: 1.532,
    },
    f3: {
      name: 'f(x) = x⁵ - 32',
      latex: 'f(x) = x^5 - 32',
      fn: (x: number) => Math.pow(x, 5) - 32,
      initA: 1,
      initB: 3,
      rootApprox: 2.0,
    },
  }[funcId];

  // Initialize
  const resetSimulation = () => {
    setCurrentStep(0);
    setHistory([]);
  };

  const handleNextStep = () => {
    let a = config.initA;
    let b = config.initB;

    if (history.length > 0) {
      const last = history[history.length - 1];
      a = last.newInterval[0];
      b = last.newInterval[1];
    }

    const m = (a + b) / 2;
    const fa = config.fn(a);
    const fb = config.fn(b);
    const fm = config.fn(m);

    let newInterval: [number, number];
    if (fa * fm <= 0) {
      newInterval = [a, m];
    } else {
      newInterval = [m, b];
    }

    const newStep: DichotomyStep = {
      step: history.length + 1,
      a,
      b,
      m,
      fa,
      fb,
      fm,
      newInterval,
      amplitude: (b - a) / 2,
    };

    setHistory([...history, newStep]);
    setCurrentStep(history.length + 1);
  };

  const activeInterval = history.length > 0 ? history[history.length - 1].newInterval : [config.initA, config.initB];
  const currentAmp = (activeInterval[1] - activeInterval[0]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Simulateur TVI & Dichotomie
            </span>
            <span className="text-xs text-slate-500">Recherche pas-à-pas de racine unique α</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Algorithme de Dichotomie : Encadrement Progressif
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={funcId}
            onChange={(e) => {
              setFuncId(e.target.value as any);
              resetSimulation();
            }}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <option value="f1">f(x) = x³ + x - 1 sur [0, 1]</option>
            <option value="f2">f(x) = x³ - 3x + 1 sur [1, 2]</option>
            <option value="f3">f(x) = x⁵ - 32 sur [1, 3]</option>
          </select>
          <button
            onClick={resetSimulation}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
            title="Réinitialiser"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Equation Banner */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Équation à résoudre</div>
          <div className="text-base font-bold text-emerald-950 flex items-center gap-2">
            <MathView math={`${config.latex} = 0`} />
            <span className="text-sm font-normal text-emerald-700">
              sur [{config.initA}, {config.initB}]
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono bg-white px-3 py-2 rounded-lg border border-emerald-200">
          <div>
            <span className="text-slate-500">Intervalle Actuel : </span>
            <strong className="text-emerald-700">[{activeInterval[0].toFixed(4)}, {activeInterval[1].toFixed(4)}]</strong>
          </div>
          <div>
            <span className="text-slate-500">Amplitude : </span>
            <strong className="text-slate-800">{currentAmp.toFixed(5)}</strong>
          </div>
        </div>

        <button
          onClick={handleNextStep}
          disabled={history.length >= 8}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 transition shadow-xs cursor-pointer"
        >
          <Play size={14} />
          Étape Suivante ({history.length}/8)
        </button>
      </div>

      {/* Visual Progress Track */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-slate-500">
          <span>a = {config.initA}</span>
          <span className="font-semibold text-emerald-700">Position théorique de α ≈ {config.rootApprox}</span>
          <span>b = {config.initB}</span>
        </div>
        <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          {/* Active Highlight Range */}
          <div
            className="absolute top-0 bottom-0 bg-emerald-500/30 border-l-2 border-r-2 border-emerald-600 transition-all duration-300"
            style={{
              left: `${((activeInterval[0] - config.initA) / (config.initB - config.initA)) * 100}%`,
              width: `${((activeInterval[1] - activeInterval[0]) / (config.initB - config.initA)) * 100}%`,
            }}
          />
          {/* Exact root indicator */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-red-500 z-10"
            style={{
              left: `${((config.rootApprox - config.initA) / (config.initB - config.initA)) * 100}%`,
            }}
            title={`Racine α ≈ ${config.rootApprox}`}
          />
        </div>
      </div>

      {/* Step History Table */}
      {history.length > 0 && (
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Étape</th>
                <th className="py-2.5 px-3">Segment [a, b]</th>
                <th className="py-2.5 px-3">Milieu m = (a+b)/2</th>
                <th className="py-2.5 px-3">Signe de f(m)</th>
                <th className="py-2.5 px-3">Nouvel Encadrement</th>
                <th className="py-2.5 px-3">Amplitude (b-a)/2ⁿ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {history.map((h) => (
                <tr key={h.step} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-sans font-bold text-slate-800">Étape {h.step}</td>
                  <td className="py-2 px-3">[{h.a.toFixed(4)}, {h.b.toFixed(4)}]</td>
                  <td className="py-2 px-3 font-bold text-blue-600">{h.m.toFixed(4)}</td>
                  <td className="py-2 px-3">
                    <span className={`px-1.5 py-0.5 rounded text-2xs font-bold ${h.fm > 0 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      f(m) = {h.fm.toFixed(3)} ({h.fm > 0 ? '> 0' : '< 0'})
                    </span>
                  </td>
                  <td className="py-2 px-3 font-bold text-emerald-700">
                    [{h.newInterval[0].toFixed(4)}, {h.newInterval[1].toFixed(4)}]
                  </td>
                  <td className="py-2 px-3 text-slate-500">{h.amplitude.toFixed(5)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
