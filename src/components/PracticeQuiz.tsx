import React, { useState } from 'react';
import { MathView, FormattedMathText } from './MathView';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2, Award } from 'lucide-react';

interface QuizItem {
  id: number;
  question: string;
  questionMath?: string;
  solution: string;
  solutionMath?: string;
  tag: string;
}

export const QUIZ_ITEMS: QuizItem[] = [
  {
    id: 1,
    tag: 'Limites Trigonométriques',
    question: 'Calculer la limite suivante en 0 :',
    questionMath: '\\lim_{x \\to 0} \\frac{1 - \\cos(3x)}{x \\sin(2x)}',
    solution: 'On fait apparaître les formes de référence en 0 :',
    solutionMath: '\\frac{1-\\cos(3x)}{x\\sin(2x)} = \\frac{1-\\cos(3x)}{(3x)^2} \\times \\frac{9x^2}{x\\sin(2x)} = \\frac{1-\\cos(3x)}{(3x)^2} \\times \\frac{2x}{\\sin(2x)} \\times \\frac{9}{2} \\xrightarrow[x \\to 0]{} \\frac{1}{2} \\times 1 \\times \\frac{9}{2} = \\mathbf{\\frac{9}{4}}',
  },
  {
    id: 2,
    tag: 'TVI & Unicité',
    question: 'Montrer que l\'équation $x^3 + 3x - 1 = 0$ admet une unique solution dans $]0, 1[$.',
    solution: '1. Continuité : $f(x) = x^3 + 3x - 1$ est continue sur $[0, 1]$ (polynôme).\n2. Strictement croissante : $f\'(x) = 3x^2 + 3 > 0$, donc $f$ est strictement croissante.\n3. Signes contraires : $f(0) = -1 < 0$ et $f(1) = 3 > 0 \\implies f(0) \\times f(1) < 0$.\nD\'après le TVI (cas strictement monotone), il existe une unique solution $\\alpha \\in ]0, 1[$.',
  },
  {
    id: 3,
    tag: 'Fonction Réciproque',
    question: 'Soit $f(x) = x^2 - 2x$ définie sur $I = [1, +\\infty[$. Déterminer $J = f(I)$ et expliciter $f^{-1}(x)$.',
    solution: '1. $f\'(x) = 2x - 2 \\ge 0$ sur $[1, +\\infty[$, donc $f$ est strictement croissante.\n2. $f(1) = -1$ et $\\lim_{x \\to +\\infty} f(x) = +\\infty \\implies J = [-1, +\\infty[$.\n3. Pour $x \\ge -1$, $y \\ge 1$ : $x = y^2 - 2y = (y-1)^2 - 1 \\implies (y-1)^2 = x + 1 \\implies y - 1 = \\sqrt{x+1}$ (car $y \\ge 1$).',
    solutionMath: 'f^{-1}(x) = 1 + \\sqrt{x+1} \\quad \\text{sur } [-1, +\\infty[',
  },
  {
    id: 4,
    tag: 'Racines n-ièmes',
    question: 'Résoudre dans $\\mathbb{R}$ l\'équation $x^4 - 81 = 0$ et simplifier $\\sqrt[3]{54} / \\sqrt[3]{2}$.',
    solution: '$x^4 = 81 \\iff x = \\sqrt[4]{81} = 3$ ou $x = -3 \\implies S = \\{-3, 3\\}$.\nPour le quotient : $\\frac{\\sqrt[3]{54}}{\\sqrt[3]{2}} = \\sqrt[3]{\\frac{54}{2}} = \\sqrt[3]{27} = 3$.',
  },
];

export const PracticeQuiz: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggle = (id: number) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
          <Award size={18} />
        </span>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Exercices d'Auto-Évaluation & Questions Types BAC
          </h2>
          <p className="text-xs text-slate-500">Testez vos connaissances avec correction rédigée détaillée</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {QUIZ_ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div key={item.id} className="border border-slate-200 rounded-xl overflow-hidden">
              <div
                onClick={() => toggle(item.id)}
                className="p-4 bg-slate-50 hover:bg-slate-100/80 cursor-pointer flex items-center justify-between gap-3 transition"
              >
                <div className="space-y-1">
                  <span className="bg-blue-100 text-blue-800 text-2xs font-bold px-2 py-0.5 rounded-md">
                    {item.tag}
                  </span>
                  <div className="text-sm font-semibold text-slate-900">
                    <FormattedMathText text={item.question} />
                    {item.questionMath && (
                      <div className="mt-1 text-blue-900 font-bold">
                        <MathView math={item.questionMath} />
                      </div>
                    )}
                  </div>
                </div>

                <button className="text-slate-400 p-1">
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>

              {isOpen && (
                <div className="p-4 bg-white border-t border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    Solution Rédigée :
                  </div>
                  <FormattedMathText text={item.solution} className="leading-relaxed" />
                  {item.solutionMath && (
                    <div className="bg-emerald-50 text-emerald-950 p-2.5 rounded-lg border border-emerald-200 text-center font-mono font-bold mt-2">
                      <MathView math={item.solutionMath} block={true} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
