import React from 'react';
import { MathView } from './MathView';
import { Bookmark, CheckCircle2 } from 'lucide-react';

export const LessonContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  return (
    <div className="space-y-6 sm:space-y-8 print:space-y-6">

      {/* MODULE 1: LIMITES */}
      {(activeTab === 'all' || activeTab === 'm1') && (
        <section id="module-1" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 md:p-8 space-y-6 avoid-break">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                1
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  I. Limites d'une Fonction Numérique &amp; Opérations
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Limites de référence, trigonométrie, comparaison et tables d'opérations
                </p>
              </div>
            </div>
            <span className="shrink-0 bg-blue-50 text-blue-700 text-2xs sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              2BAC BIOF
            </span>
          </div>

          {/* 1.1 Limites Usuelles */}
          <div className="space-y-3.5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <span>1. Limites usuelles et puissances (<MathView math="n \in \mathbb{N}^*" />)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Comportement en 0 et en +inf */}
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Comportement en 0 et en <MathView math="+\infty" />
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs flex items-center justify-center min-h-[52px]">
                    <MathView math="\lim_{x \to 0} x^n = 0" block={true} />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs flex items-center justify-center min-h-[52px]">
                    <MathView math="\lim_{x \to 0^+} \sqrt{x} = 0" block={true} />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs flex items-center justify-center min-h-[52px]">
                    <MathView math="\lim_{x \to +\infty} x^n = +\infty" block={true} />
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs flex items-center justify-center min-h-[52px]">
                    <MathView math="\lim_{x \to +\infty} \sqrt{x} = +\infty" block={true} />
                  </div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs flex items-center justify-center min-h-[52px]">
                  <MathView math="\lim_{x \to +\infty} \frac{1}{\sqrt{x}} = 0" block={true} />
                </div>
              </div>

              {/* Distinction selon la parite de n */}
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">
                  Distinction selon la parité de <MathView math="n" />
                </span>
                <div className="overflow-hidden bg-white rounded-xl border border-slate-200/90 shadow-2xs">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold">
                      <tr>
                        <th className="py-2.5 px-3 text-center w-1/2">Si n est pair</th>
                        <th className="py-2.5 px-3 text-center w-1/2 border-l border-slate-200">Si n est impair</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-2 text-center"><MathView math="\lim_{x \to -\infty} x^n = +\infty" block={true} /></td>
                        <td className="py-3 px-2 text-center border-l border-slate-100"><MathView math="\lim_{x \to -\infty} x^n = -\infty" block={true} /></td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 text-center"><MathView math="\lim_{x \to 0^-} \frac{1}{x^n} = +\infty" block={true} /></td>
                        <td className="py-3 px-2 text-center border-l border-slate-100"><MathView math="\lim_{x \to 0^-} \frac{1}{x^n} = -\infty" block={true} /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 1.2 Limites Trigonometriques */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-blue-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <span>2. Limites Trigonométriques Fondamentales en 0</span>
            </h3>
            <p className="text-xs text-blue-900 leading-relaxed">
              Pour tout réel <MathView math="x" /> et tout paramètre <MathView math="a \in \mathbb{R}^*" /> :
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-blue-100 text-center shadow-2xs space-y-2">
                <span className="text-2xs font-bold text-blue-800 uppercase tracking-wide block">Sinus</span>
                <div className="space-y-1.5 pt-0.5">
                  <MathView math="\lim_{x \to 0} \frac{\sin x}{x} = 1" block={true} />
                  <div className="pt-1.5 border-t border-slate-100">
                    <MathView math="\lim_{x \to 0} \frac{\sin(ax)}{ax} = 1" block={true} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-blue-100 text-center shadow-2xs space-y-2">
                <span className="text-2xs font-bold text-blue-800 uppercase tracking-wide block">Tangente</span>
                <div className="space-y-1.5 pt-0.5">
                  <MathView math="\lim_{x \to 0} \frac{\tan x}{x} = 1" block={true} />
                  <div className="pt-1.5 border-t border-slate-100">
                    <MathView math="\lim_{x \to 0} \frac{\tan(ax)}{ax} = 1" block={true} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-blue-100 text-center shadow-2xs space-y-2">
                <span className="text-2xs font-bold text-blue-800 uppercase tracking-wide block">Cosinus</span>
                <div className="space-y-1.5 pt-0.5">
                  <MathView math="\lim_{x \to 0} \frac{1 - \cos x}{x^2} = \frac{1}{2}" block={true} />
                  <div className="pt-1.5 border-t border-slate-100">
                    <MathView math="\lim_{x \to 0} \frac{1 - \cos(ax)}{(ax)^2} = \frac{1}{2} a^2" block={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1.3 Polynomes et Fractions Rationnelles */}
          <div className="space-y-3.5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <span>3. Limites des Polynômes et Fractions Rationnelles en <MathView math="\pm\infty" /></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-2.5">
                <span className="text-xs font-bold text-slate-900 block">Règle pour les Polynômes</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  La limite d'un polynôme en <MathView math="+\infty" /> ou <MathView math="-\infty" /> est égale à la limite de son <strong>terme de plus haut degré</strong>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs">
                  <MathView math="\lim_{x \to \pm\infty} (a_n x^n + \dots + a_0) = \lim_{x \to \pm\infty} a_n x^n" block={true} />
                </div>
              </div>

              <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-2.5">
                <span className="text-xs font-bold text-slate-900 block">Règle pour les Fractions Rationnelles</span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  La limite en <MathView math="+\infty" /> ou <MathView math="-\infty" /> est égale à la limite du <strong>quotient des termes de plus haut degré</strong>.
                </p>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs">
                  <MathView math="\lim_{x \to \pm\infty} \frac{P(x)}{Q(x)} = \lim_{x \to \pm\infty} \frac{a_n x^n}{b_m x^m}" block={true} />
                </div>
              </div>
            </div>
          </div>

          {/* 1.4 Théorème des Gendarmes & Comparaison */}
          <div className="space-y-3.5">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <span>4. Théorèmes de Comparaison &amp; Théorème des Gendarmes</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
                <span className="text-xs font-bold text-slate-900 block">Théorème des Gendarmes (Encadrement) :</span>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-center">
                  <MathView math="\begin{aligned} &\begin{cases} u(x) \le f(x) \le v(x) \\ \lim u(x) = \lim v(x) = \ell \end{cases} \\ &\implies \mathbf{\lim f(x) = \ell} \end{aligned}" block={true} />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
                <span className="text-xs font-bold text-slate-900 block">Théorème de la Valeur Absolue :</span>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-center">
                  <MathView math="\begin{aligned} &\begin{cases} |f(x) - \ell| \le V(x) \\ \lim V(x) = 0 \end{cases} \\ &\implies \mathbf{\lim f(x) = \ell} \end{aligned}" block={true} />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
                <span className="text-xs font-bold text-slate-900 block">Minoration (<MathView math="+\infty" />) :</span>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-center">
                  <MathView math="\begin{aligned} &\begin{cases} f(x) \ge u(x) \\ \lim u(x) = +\infty \end{cases} \\ &\implies \mathbf{\lim f(x) = +\infty} \end{aligned}" block={true} />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/90 space-y-2 shadow-2xs">
                <span className="text-xs font-bold text-slate-900 block">Majoration (<MathView math="-\infty" />) :</span>
                <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-center">
                  <MathView math="\begin{aligned} &\begin{cases} f(x) \le v(x) \\ \lim v(x) = -\infty \end{cases} \\ &\implies \mathbf{\lim f(x) = -\infty} \end{aligned}" block={true} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODULE 2: FORMES INDETERMINEES */}
      {(activeTab === 'all' || activeTab === 'm2') && (
        <section id="module-2" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 md:p-8 space-y-6 avoid-break">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                2
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  II. Formes Indéterminées &amp; Techniques de Levée
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Facteur prépondérant, quantité conjuguée et taux d'accroissement
                </p>
              </div>
            </div>
            <span className="shrink-0 bg-blue-50 text-blue-700 text-2xs sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              Techniques Clés
            </span>
          </div>

          {/* Banner 4 F.I. */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 text-center space-y-3">
            <span className="text-2xs sm:text-xs text-slate-400 font-bold uppercase tracking-wider block">
              Les 4 Formes Indéterminées Fondamentales à Lever
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto">
              <div className="bg-slate-800/90 py-2.5 px-3 rounded-xl border border-slate-700 font-mono font-bold text-amber-300 shadow-xs">
                <MathView math="0 \times \infty" block={true} />
              </div>
              <div className="bg-slate-800/90 py-2.5 px-3 rounded-xl border border-slate-700 font-mono font-bold text-amber-300 shadow-xs">
                <MathView math="\frac{\infty}{\infty}" block={true} />
              </div>
              <div className="bg-slate-800/90 py-2.5 px-3 rounded-xl border border-slate-700 font-mono font-bold text-amber-300 shadow-xs">
                <MathView math="\frac{0}{0}" block={true} />
              </div>
              <div className="bg-slate-800/90 py-2.5 px-3 rounded-xl border border-slate-700 font-mono font-bold text-amber-300 shadow-xs">
                <MathView math="+\infty - \infty" block={true} />
              </div>
            </div>
          </div>

          {/* Les 3 Techniques en Colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xs shrink-0 font-bold">1</span>
                  <span>Terme Prépondérant</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Utilisé lorsque des termes dominent l'expression à l'infini (factorisation par la plus haute puissance).
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs mt-2">
                <MathView math="\lim_{x \to +\infty} \frac{x^2 + 1}{2x^2 - x} = \lim_{x \to +\infty} \frac{x^2(1 + \frac{1}{x^2})}{x^2(2 - \frac{1}{x})} = \frac{1}{2}" block={true} />
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xs shrink-0 font-bold">2</span>
                  <span>Quantité Conjuguée</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Indispensable pour lever <MathView math="(+\infty - \infty)" /> avec radicaux <MathView math="(\sqrt{a} - \sqrt{b})" />.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs mt-2">
                <MathView math="\sqrt{A} - B = \frac{A - B^2}{\sqrt{A} + B}" block={true} />
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xs shrink-0 font-bold">3</span>
                  <span>Taux d'Accroissement</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pour la forme <MathView math="\frac{0}{0}" /> en un point fini <MathView math="x_0" />, en reconnaissant le nombre dérivé <MathView math="f'(x_0)" />.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs mt-2">
                <MathView math="\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = f'(x_0)" block={true} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODULE 3: CONTINUITE EN UN POINT */}
      {(activeTab === 'all' || activeTab === 'm3') && (
        <section id="module-3" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 md:p-8 space-y-6 avoid-break">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                3
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  III. Continuité en un Point &amp; Prolongement par Continuité
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Définition locale, limites latérales à droite et à gauche, prolongement
                </p>
              </div>
            </div>
            <span className="shrink-0 bg-blue-50 text-blue-700 text-2xs sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              Théorème Central
            </span>
          </div>

          {/* Definition */}
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <span>1. Définition Fondamentale de la Continuité en <MathView math="x_0" /></span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Soit <MathView math="f" /> une fonction définie sur un intervalle ouvert contenant <MathView math="x_0" /> :
            </p>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-center font-bold text-slate-900 shadow-2xs">
              <MathView math="\begin{aligned} &f \text{ est continue en } x_0 \\ &\iff \lim_{x \to x_0} f(x) = f(x_0) \end{aligned}" block={true} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Continuite Laterale */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span>2. Continuité Latérale</span>
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs flex flex-col justify-center min-h-[56px]">
                  <span className="text-2xs text-slate-500 font-semibold mb-1">À droite :</span>
                  <MathView math="\lim_{x \to x_0^+} f(x) = f(x_0)" block={true} />
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs flex flex-col justify-center min-h-[56px]">
                  <span className="text-2xs text-slate-500 font-semibold mb-1">À gauche :</span>
                  <MathView math="\lim_{x \to x_0^-} f(x) = f(x_0)" block={true} />
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-slate-900 text-xs font-bold text-center shadow-2xs">
                <MathView math="\begin{aligned} &f \text{ est continue en } x_0 \\ &\iff \lim_{x \to x_0^+} f(x) = \lim_{x \to x_0^-} f(x) = f(x_0) \end{aligned}" block={true} />
              </div>
            </div>

            {/* Prolongement */}
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span>3. Prolongement par Continuité</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si <MathView math="a \notin D_f" /> et <MathView math="\lim_{x \to a} f(x) = \ell" /> (avec <MathView math="\ell \in \mathbb{R}" /> fini), alors <MathView math="\widetilde{f}" /> est définie par :
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-center shadow-2xs">
                <MathView math="\widetilde{f}(x) = \begin{cases} f(x) & \text{si } x \in D_f \\ \ell & \text{si } x = a \end{cases}" block={true} />
              </div>
              <p className="text-2xs text-slate-500 italic">
                <MathView math="\widetilde{f}" /> est continue en <MathView math="a" /> et constitue le prolongement par continuité de <MathView math="f" />.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* MODULE 4: CONTINUITE SUR UN INTERVALLE */}
      {(activeTab === 'all' || activeTab === 'm4') && (
        <section id="module-4" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 md:p-8 space-y-6 avoid-break">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                4
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  IV. Continuité sur un Intervalle &amp; Composition
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Intervalles ouverts/fermés, algèbre des fonctions continues, composée <MathView math="g \circ f" />
                </p>
              </div>
            </div>
            <span className="shrink-0 bg-blue-50 text-blue-700 text-2xs sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              Opérations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span>Règles sur les Intervalles</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <MathView math="f" /> est continue sur <MathView math="]a, b[" /> si elle est continue en tout point de cet intervalle.
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <MathView math="f" /> est continue sur <MathView math="[a, b[" /> si continue sur <MathView math="]a, b[" /> et <strong>à droite en <MathView math="a" /></strong>.
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <MathView math="f" /> est continue sur <MathView math="[a, b]" /> si continue sur <MathView math="]a, b[" />, <strong>à droite en <MathView math="a" /></strong> et <strong>à gauche en <MathView math="b" /></strong>.
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                  <span>Composition : <MathView math="g \circ f" /></span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Si <MathView math="f" /> est continue sur <MathView math="I" /> et <MathView math="g" /> continue sur <MathView math="J" /> avec <MathView math="f(I) \subset J" />, alors <MathView math="g \circ f" /> est continue sur <MathView math="I" />.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs">
                <MathView math="\begin{aligned} &\lim_{x \to x_0} u(x) = \ell \\ \implies &\lim_{x \to x_0} v(u(x)) = v(\ell) \end{aligned}" block={true} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MODULE 5: IMAGE D'UN INTERVALLE */}
      {(activeTab === 'all' || activeTab === 'm5') && (
        <section id="module-5" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 md:p-8 space-y-6 avoid-break">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                5
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  V. Image d'un Intervalle par une Fonction Continue
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Image d'un segment <MathView math="[m, M]" /> et tableau pour les fonctions strictement monotones
                </p>
              </div>
            </div>
            <span className="shrink-0 bg-blue-50 text-blue-700 text-2xs sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              Tableau Récapitulatif
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 text-xs text-slate-700 space-y-1 leading-relaxed">
            <strong className="text-slate-900">Théorème Général :</strong> L'image d'un intervalle <MathView math="I" /> par une fonction continue <MathView math="f" /> est un <strong>intervalle</strong> <MathView math="f(I)" />.  
            Pour un segment fermé <MathView math="[a, b]" />, <MathView math="f([a, b]) = [m, M]" /> où <MathView math="m = \min_{[a, b]} f(x)" /> et <MathView math="M = \max_{[a, b]} f(x)" />.
          </div>

          {/* Tableau Récapitulatif Exhaustif */}
          <div className="overflow-x-auto border border-slate-200/90 rounded-2xl shadow-2xs">
            <table className="w-full text-xs text-left min-w-[520px]">
              <thead className="bg-slate-50 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-1/4">Intervalle <MathView math="I" /></th>
                  <th className="py-3 px-4 w-3/8 text-blue-700 border-l border-slate-200">Si <MathView math="f" /> strictement croissante</th>
                  <th className="py-3 px-4 w-3/8 text-purple-700 border-l border-slate-200">Si <MathView math="f" /> strictement décroissante</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-mono">
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">[a, b]</td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="[f(a), f(b)]" /></td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="[f(b), f(a)]" /></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">[a, b[</td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="[f(a), \lim_{x \to b^-} f(x)[" /></td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to b^-} f(x), f(a)]" /></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">]a, b]</td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to a^+} f(x), f(b)]" /></td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="[f(b), \lim_{x \to a^+} f(x)[" /></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">]a, b[</td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to a^+} f(x), \lim_{x \to b^-} f(x)[" /></td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to b^-} f(x), \lim_{x \to a^+} f(x)[" /></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">[a, +∞[</td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="[f(a), \lim_{x \to +\infty} f(x)[" /></td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to +\infty} f(x), f(a)]" /></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">]-∞, b]</td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to -\infty} f(x), f(b)]" /></td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="[f(b), \lim_{x \to -\infty} f(x)[" /></td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-4 font-sans font-bold text-slate-900">ℝ = ]-∞, +∞[</td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to -\infty} f(x), \lim_{x \to +\infty} f(x)[" /></td>
                  <td className="py-2.5 px-4 border-l border-slate-100"><MathView math="]\lim_{x \to +\infty} f(x), \lim_{x \to -\infty} f(x)[" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MODULE 6: TVI & DICHOTOMIE */}
      {(activeTab === 'all' || activeTab === 'm6') && (
        <section id="module-6" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 md:p-8 space-y-6 avoid-break">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                6
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  VI. Théorème des Valeurs Intermédiaires (TVI) &amp; Dichotomie
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Existence, unicité (monotonie stricte) et algorithme d'encadrement
                </p>
              </div>
            </div>
            <span className="shrink-0 bg-blue-50 text-blue-700 text-2xs sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              Fondamental
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold text-2xs uppercase tracking-wide">
                    Existence
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    1. TVI : Cas Général
                  </h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Si <MathView math="f" /> est <strong className="text-slate-900 font-semibold">continue sur <MathView math="[a, b]" /></strong>, alors pour tout <MathView math="\beta" /> compris entre <MathView math="f(a)" /> et <MathView math="f(b)" />, il existe <strong className="text-slate-900 font-semibold">au moins un <MathView math="\alpha \in [a, b]" /></strong> tel que <MathView math="f(\alpha) = \beta" />.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs mt-2">
                <MathView math="f(a) \cdot f(b) < 0 \implies \exists\, \alpha \in ]a, b[ \quad (f(\alpha) = 0)" block={true} className="text-xs sm:text-[13px] text-slate-900 font-semibold" />
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-2xs uppercase tracking-wide">
                    Unicité
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                    2. TVI : Monotonie Stricte
                  </h3>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Si <MathView math="f" /> est <strong className="text-slate-900 font-semibold">continue ET strictement monotone sur <MathView math="[a, b]" /></strong>, alors pour tout <MathView math="\beta" /> compris entre <MathView math="f(a)" /> et <MathView math="f(b)" />, il existe <strong className="text-slate-900 font-semibold">un et un seul <MathView math="\alpha \in [a, b]" /></strong> tel que <MathView math="f(\alpha) = \beta" />.
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center shadow-2xs mt-2">
                <MathView math="f(a) \cdot f(b) < 0 \implies \exists!\, \alpha \in ]a, b[ \quad (f(\alpha) = 0)" block={true} className="text-xs sm:text-[13px] text-slate-900 font-semibold" />
              </div>
            </div>
          </div>

          {/* Dichotomie Box */}
          <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4">
            <div>
              <strong className="text-slate-900 font-bold block text-sm sm:text-base mb-1">
                Principe de l'Algorithme de Dichotomie :
              </strong>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Pour encadrer l'unique racine <MathView math="\alpha" /> de l'équation <MathView math="f(x)=0" /> sur <MathView math="[a, b]" /> (avec <MathView math="f(a) \times f(b) < 0" />) :
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="font-bold text-xs sm:text-sm text-slate-900">Cas 1 : Changement de signe à gauche</span>
                </div>
                <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 text-center">
                  <MathView math="f(a) \times f\left(\frac{a+b}{2}\right) < 0" block={true} />
                </div>
                <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 pt-1">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500">Nouvel intervalle :</span>
                    <strong className="text-slate-900 font-mono"><MathView math="\alpha \in \left[a, \; \frac{a+b}{2}\right]" /></strong>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500">Amplitude :</span>
                    <span className="font-mono text-slate-800"><MathView math="\frac{b-a}{2}" /></span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span className="font-bold text-xs sm:text-sm text-slate-900">Cas 2 : Changement de signe à droite</span>
                </div>
                <div className="bg-purple-50/50 p-2.5 rounded-lg border border-purple-100 text-center">
                  <MathView math="f(b) \times f\left(\frac{a+b}{2}\right) < 0" block={true} />
                </div>
                <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 pt-1">
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500">Nouvel intervalle :</span>
                    <strong className="text-slate-900 font-mono"><MathView math="\alpha \in \left[\frac{a+b}{2}, \; b\right]" /></strong>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="text-slate-500">Amplitude :</span>
                    <span className="font-mono text-slate-800"><MathView math="\frac{b-a}{2}" /></span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 text-center text-xs sm:text-sm text-slate-800 shadow-2xs">
              <span className="text-slate-600">Après <strong><MathView math="n" /> itérations</strong>, l'amplitude de l'encadrement vaut : </span>
              <span className="inline-block font-bold text-slate-950 font-mono ml-1.5"><MathView math="\frac{b-a}{2^n}" /></span>
            </div>
          </div>
        </section>
      )}

      {/* MODULE 7: FONCTION RECIPROQUE */}
      {(activeTab === 'all' || activeTab === 'm7') && (
        <section id="module-7" className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 md:p-8 space-y-6 avoid-break">
          {/* Header */}
          <div className="border-b border-slate-100 pb-3.5 sm:pb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                7
              </span>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 leading-snug">
                  VII. Fonctions Réciproques &amp; Racines <MathView math="n" />-ièmes
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Théorème de la bijection, symétrie <MathView math="(\Delta): y=x" />, racine <MathView math="n" />-ième et puissances rationnelles
                </p>
              </div>
            </div>
            <span className="shrink-0 bg-blue-50 text-blue-700 text-2xs sm:text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
              Bijection
            </span>
          </div>

          <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <span>1. Théorème de la Fonction Réciproque <MathView math="f^{-1}" /></span>
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Si <MathView math="f" /> est <strong className="text-slate-900">continue et strictement monotone</strong> sur <MathView math="I" />, alors <MathView math="f" /> est une bijection de <MathView math="I" /> vers <MathView math="J = f(I)" /> et admet une fonction réciproque <MathView math="f^{-1} : J \to I" /> vérifiant :
            </p>
            <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200/80 text-center text-xs sm:text-sm text-slate-900 shadow-2xs">
              <MathView math="\begin{aligned} &f^{-1}(x) = y \iff f(y) = x \\[4pt] &\forall x \in I : \quad f^{-1}(f(x)) = x \\[4pt] &\forall y \in J : \quad f(f^{-1}(y)) = y \end{aligned}" block={true} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-slate-700 shadow-2xs">
                <strong className="text-slate-900">Continuité &amp; Sens :</strong> <MathView math="f^{-1}" /> est continue sur <MathView math="J" /> et a <strong className="text-slate-900">la même monotonie</strong> que <MathView math="f" />.
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-slate-700 shadow-2xs">
                <strong className="text-slate-900">Symétrie axiale :</strong> <MathView math="(C_f)" /> et <MathView math="(C_{f^{-1}})" /> sont symétriques par rapport à la première bissectrice <MathView math="(\Delta): y = x" />.
              </div>
            </div>
          </div>

          {/* Racines n-ièmes et Puissances Rationnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span>2. La Fonction Racine <MathView math="n" />-ième (<MathView math="\sqrt[n]{x}" />)</span>
              </h3>
              <p className="text-xs text-slate-600">
                Réciproque de <MathView math="x \mapsto x^n" /> sur <MathView math="\mathbb{R}^+" /> :
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-center shadow-2xs">
                <MathView math="\forall x, y \ge 0 : \quad \sqrt[n]{x} = y \iff y^n = x" block={true} />
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Produit :</span>
                  <MathView math="\sqrt[n]{x \cdot y} = \sqrt[n]{x} \cdot \sqrt[n]{y}" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 pt-1.5 border-t border-slate-100">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Quotient :</span>
                  <MathView math="\sqrt[n]{\frac{x}{y}} = \frac{\sqrt[n]{x}}{\sqrt[n]{y}} \quad (y > 0)" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 pt-1.5 border-t border-slate-100">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Imbrication :</span>
                  <MathView math="\sqrt[n]{\sqrt[m]{x}} = \sqrt[n \cdot m]{x}" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 pt-1.5 border-t border-slate-100">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Simplif. :</span>
                  <MathView math="\sqrt[n \cdot p]{x^{m \cdot p}} = \sqrt[n]{x^m}" />
                </div>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                <span>3. Puissances Rationnelles (<MathView math="x^{p/q}" />)</span>
              </h3>
              <p className="text-xs text-slate-600">
                Pour <MathView math="x > 0" /> et <MathView math="r = \frac{p}{q} \in \mathbb{Q}" /> (<MathView math="p \in \mathbb{Z}, q \in \mathbb{N}^*" />) :
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-xs text-center shadow-2xs">
                <MathView math="x^r = x^{\frac{p}{q}} = \sqrt[q]{x^p} = \left(\sqrt[q]{x}\right)^p" block={true} />
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2.5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Produit :</span>
                  <MathView math="x^r \cdot x^{r'} = x^{r + r'}" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 pt-1.5 border-t border-slate-100">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Quotient :</span>
                  <MathView math="\frac{x^r}{x^{r'}} = x^{r - r'}" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 pt-1.5 border-t border-slate-100">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Puissance :</span>
                  <MathView math="\left(x^r\right)^{r'} = x^{r \cdot r'}" />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 pt-1.5 border-t border-slate-100">
                  <span className="w-20 text-slate-500 shrink-0 text-2xs font-bold uppercase tracking-wider">Inverse :</span>
                  <MathView math="x^{-r} = \frac{1}{x^r}" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Proverbe Footer */}
      <div className="text-center p-4 sm:p-5 bg-slate-100/80 border border-slate-200/80 rounded-2xl text-slate-600 text-xs italic leading-relaxed">
        « C'est en forgeant que l'on devient forgeron. C'est en s'entraînant régulièrement aux calculs et aux exercices que l'on devient mathématicien. »
      </div>
    </div>
  );
};


