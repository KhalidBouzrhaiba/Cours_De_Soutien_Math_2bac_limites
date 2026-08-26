import React, { useState } from 'react';
import { MathView, FormattedMathText } from './MathView';
import { Sparkles, Calculator, Check, ArrowRight, Lightbulb } from 'lucide-react';

export interface SolvedProblem {
  id: string;
  title: string;
  type: string;
  problemLatex: string;
  indeterminacy: string;
  technique: string;
  steps: {
    title: string;
    explanation: string;
    math?: string;
  }[];
  finalLimitLatex: string;
}

export const SOLVED_LIMITS: SolvedProblem[] = [
  {
    id: 'lim1',
    title: 'Limite à l\'infini avec radicaux (+∞ - ∞)',
    type: 'Quantité Conjuguée',
    problemLatex: '\\lim_{x \\to +\\infty} \\left( \\sqrt{x^2 + x} - x \\right)',
    indeterminacy: '+\\infty - \\infty',
    technique: 'Multiplication par la quantité conjuguée car les coefficients des termes en x sont égaux (1 = 1).',
    steps: [
      {
        title: 'Étape 1 : Diagnostic de la forme',
        explanation: 'En substituant +∞, on obtient $\\sqrt{+\\infty} - (+\\infty) = +\\infty - \\infty$, qui est une forme indéterminée.',
      },
      {
        title: 'Étape 2 : Multiplication par le conjugué',
        explanation: 'On applique l\'identité $(A-B)(A+B) = A^2 - B^2$ avec $A = \\sqrt{x^2+x}$ et $B = x$ :',
        math: '\\sqrt{x^2 + x} - x = \\frac{(\\sqrt{x^2+x}-x)(\\sqrt{x^2+x}+x)}{\\sqrt{x^2+x}+x} = \\frac{(x^2+x)-x^2}{\\sqrt{x^2+x}+x} = \\frac{x}{\\sqrt{x^2+x}+x}',
      },
      {
        title: 'Étape 3 : Factorisation par le terme prépondérant',
        explanation: 'Pour $x > 0$, $\\sqrt{x^2+x} = \\sqrt{x^2(1+1/x)} = x\\sqrt{1+1/x}$ :',
        math: '\\frac{x}{x\\sqrt{1+\\frac{1}{x}} + x} = \\frac{x}{x\\left(\\sqrt{1+\\frac{1}{x}} + 1\\right)} = \\frac{1}{\\sqrt{1+\\frac{1}{x}} + 1}',
      },
      {
        title: 'Étape 4 : Passage à la limite',
        explanation: 'Puisque $\\lim_{x \\to +\\infty} \\frac{1}{x} = 0$, le dénominateur tend vers $\\sqrt{1+0} + 1 = 2$.',
      },
    ],
    finalLimitLatex: '\\lim_{x \\to +\\infty} \\left(\\sqrt{x^2+x}-x\\right) = \\frac{1}{2}',
  },
  {
    id: 'lim2',
    title: 'Limite trigonométrique remarquable avec sinus',
    type: 'Taux d\'Accroissement',
    problemLatex: '\\lim_{x \\to \\frac{\\pi}{6}} \\frac{2\\sin x - 1}{6x - \\pi}',
    indeterminacy: '\\frac{0}{0}',
    technique: 'Reconnaissance du taux d\'accroissement (nombre dérivé) de la fonction sinus en $\\frac{\\pi}{6}$.',
    steps: [
      {
        title: 'Étape 1 : Diagnostic',
        explanation: 'En $x = \\pi/6$, $2\\sin(\\pi/6) - 1 = 2(1/2) - 1 = 0$ et $6(\\pi/6) - \\pi = 0$. Forme $\\frac{0}{0}$.',
      },
      {
        title: 'Étape 2 : Réécriture sous forme différentielle',
        explanation: 'On factorise par 2 au numérateur et par 6 au dénominateur :',
        math: '\\frac{2\\sin x - 1}{6x - \\pi} = \\frac{2\\left(\\sin x - \\frac{1}{2}\\right)}{6\\left(x - \\frac{\\pi}{6}\\right)} = \\frac{1}{3} \\cdot \\frac{\\sin x - \\sin\\left(\\frac{\\pi}{6}\\right)}{x - \\frac{\\pi}{6}}',
      },
      {
        title: 'Étape 3 : Application de la dérivée',
        explanation: 'Par définition du nombre dérivé de $\\sin$ en $x_0 = \\frac{\\pi}{6}$ :',
        math: '\\lim_{x \\to \\frac{\\pi}{6}} \\frac{\\sin x - \\sin(\\pi/6)}{x - \\pi/6} = \\sin\'\\left(\\frac{\\pi}{6}\\right) = \\cos\\left(\\frac{\\pi}{6}\\right) = \\frac{\\sqrt{3}}{2}',
      },
      {
        title: 'Étape 4 : Conclusion',
        explanation: 'On multiplie par le facteur $\\frac{1}{3}$ :',
        math: '\\frac{1}{3} \\times \\frac{\\sqrt{3}}{2} = \\frac{\\sqrt{3}}{6} = \\frac{1}{2\\sqrt{3}}',
      },
    ],
    finalLimitLatex: '\\lim_{x \\to \\frac{\\pi}{6}} \\frac{2\\sin x - 1}{6x - \\pi} = \\frac{1}{2\\sqrt{3}} = \\frac{\\sqrt{3}}{6}',
  },
  {
    id: 'lim3',
    title: 'Limite avec exponentielle à l\'infini',
    type: 'Terme Prépondérant',
    problemLatex: '\\lim_{x \\to +\\infty} \\left(x - 1 - e^x\\right)',
    indeterminacy: '+\\infty - \\infty',
    technique: 'Mise en facteur du terme le plus fort (croissance comparée $e^x \\gg x$).',
    steps: [
      {
        title: 'Étape 1 : Classement par ordre de prépondérance',
        explanation: 'Les termes par ordre de croissance sont : $-e^x + x - 1$.',
      },
      {
        title: 'Étape 2 : Factorisation par $e^x$',
        explanation: 'On factorise l\'expression entière par $-e^x$ :',
        math: 'x - 1 - e^x = -e^x \\left(1 - \\frac{x}{e^x} + \\frac{1}{e^x}\\right)',
      },
      {
        title: 'Étape 3 : Application des croissances comparées',
        explanation: 'Par théorème : $\\lim_{x \\to +\\infty} \\frac{e^x}{x} = +\\infty \\implies \\lim_{x \\to +\\infty} \\frac{x}{e^x} = 0$, et $\\lim_{x \\to +\\infty} \\frac{1}{e^x} = 0$.',
      },
      {
        title: 'Étape 4 : Conclusion',
        explanation: 'La parenthèse tend vers $(1 - 0 + 0) = 1$, donc $-e^x \\times 1 \\to -\\infty$.',
      },
    ],
    finalLimitLatex: '\\lim_{x \\to +\\infty} (x - 1 - e^x) = -\\infty',
  },
  {
    id: 'lim4',
    title: 'Limite latérale avec valeur absolue en point de discontinuité',
    type: 'Limites Latérales',
    problemLatex: '\\lim_{x \\to -1} \\frac{(x+1)^2}{|x^2 - 1|}',
    indeterminacy: '\\frac{0}{0}',
    technique: 'Étude séparée de la limite à gauche ($x \\to -1^-$) et à droite ($x \\to -1^+$) en levant la valeur absolue.',
    steps: [
      {
        title: 'Étape 1 : Simplification du dénominateur',
        explanation: '$|x^2 - 1| = |(x+1)(x-1)| = |x+1| \\cdot |x-1|$.',
      },
      {
        title: 'Étape 2 : Limite à droite ($x \\in ]-1, 1[$)',
        explanation: 'Pour $-1 < x < 1$, on a $x+1 > 0 \\implies |x+1| = x+1$ et $|x-1| = 1-x$ :',
        math: 'f(x) = \\frac{(x+1)^2}{(x+1)(1-x)} = \\frac{x+1}{1-x} \\implies \\lim_{x \\to -1^+} f(x) = \\frac{0}{2} = 0',
      },
      {
        title: 'Étape 3 : Limite à gauche ($x < -1$)',
        explanation: 'Pour $x < -1$, on a $x+1 < 0 \\implies |x+1| = -(x+1)$ et $|x-1| = 1-x$ :',
        math: 'f(x) = \\frac{(x+1)^2}{-(x+1)(1-x)} = -\\frac{x+1}{1-x} \\implies \\lim_{x \\to -1^-} f(x) = -0 = 0',
      },
      {
        title: 'Étape 4 : Conclusion',
        explanation: 'Les limites à gauche et à droite sont égales : $\\lim_{x \\to -1^+} f(x) = \\lim_{x \\to -1^-} f(x) = 0$.',
      },
    ],
    finalLimitLatex: '\\lim_{x \\to -1} \\frac{(x+1)^2}{|x^2 - 1|} = 0',
  },
];

export const LimitCalculator: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('lim1');

  const activeProblem = SOLVED_LIMITS.find((p) => p.id === selectedId) || SOLVED_LIMITS[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Résolveur Pédagogique
            </span>
            <span className="text-xs text-slate-500">Démonstrations pas-à-pas des limites classiques</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Calculateur de Limites & Levée d'Indétermination
          </h3>
        </div>

        {/* Problem Picker */}
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-blue-500"
        >
          {SOLVED_LIMITS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Target Expression Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
            Expression à Calculer ({activeProblem.type})
          </span>
          <div className="text-lg font-bold text-blue-950 py-1">
            <MathView math={activeProblem.problemLatex} block={false} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1.5 rounded-lg text-xs font-mono font-bold">
            F.I. : <MathView math={activeProblem.indeterminacy} />
          </div>
          <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
            {activeProblem.type}
          </div>
        </div>
      </div>

      {/* Strategy Hint */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-700">
        <Lightbulb size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold text-slate-900">Méthode employée : </strong>
          {activeProblem.technique}
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Démarche Rédactionnelle Pas-à-Pas
        </h4>

        {activeProblem.steps.map((step, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 hover:border-blue-300 transition">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xs">
                {idx + 1}
              </span>
              {step.title}
            </div>
            <FormattedMathText text={step.explanation} className="text-xs text-slate-600 pl-7" />
            {step.math && (
              <div className="bg-slate-50 rounded-lg p-2.5 overflow-x-auto text-center border border-slate-100 text-xs text-slate-800">
                <MathView math={step.math} block={true} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Final Answer Banner */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
          <Check size={18} className="text-emerald-600 shrink-0" />
          Résultat Final Validé :
        </div>
        <div className="bg-white px-4 py-1.5 rounded-lg border border-emerald-300 font-mono font-bold text-emerald-800 text-sm shadow-2xs">
          <MathView math={activeProblem.finalLimitLatex} />
        </div>
      </div>
    </div>
  );
};
