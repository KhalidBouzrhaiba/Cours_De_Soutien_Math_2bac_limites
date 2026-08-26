import React, { useState } from 'react';
import { Copy, Check, Download, FileText, Printer } from 'lucide-react';

export const LATEX_SOURCE = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[french]{babel}
\\usepackage{amsmath,amssymb,amsfonts,amsthm}
\\usepackage{geometry}
\\geometry{top=2cm,bottom=2cm,left=1.8cm,right=1.8cm}
\\usepackage{xcolor}
\\usepackage{tcolorbox}
\\tcbuselibrary{skins,breakable}
\\usepackage{array}
\\usepackage{booktabs}
\\usepackage{fancyhdr}
\\usepackage{enumitem}
\\usepackage{tikz}
\\usepackage{pgfplots}
\\pgfplotsset{compat=1.18}

% Custom Colors
\\definecolor{mainblue}{RGB}{24, 76, 120}
\\definecolor{subblue}{RGB}{230, 242, 250}
\\definecolor{darkgreen}{RGB}{20, 110, 60}
\\definecolor{lightgreen}{RGB}{235, 247, 238}
\\definecolor{alertred}{RGB}{180, 40, 40}

% Custom Styled Boxes
\\newtcolorbox{theoreme}[1][]{
    enhanced, breakable,
    colback=subblue, colframe=mainblue,
    fonttitle=\\bfseries\\color{white},
    title=📌 Théorème \\& Définition : #1,
    arc=3mm, boxrule=1pt
}

\\newtcolorbox{propriete}[1][]{
    enhanced, breakable,
    colback=lightgreen, colframe=darkgreen,
    fonttitle=\\bfseries\\color{white},
    title=Propriété : #1,
    arc=3mm, boxrule=1pt
}

% Header / Footer
\\pagestyle{fancy}
\\fancyhf{}
\\rhead{\\textbf{2BAC BIOF} — PC / SVT / SM}
\\lhead{\\textbf{Mathématiques} : Limites \\& Continuité}
\\rfoot{Page \\thepage}

\\begin{document}

\\begin{center}
    \\begin{tcolorbox}[colback=mainblue,colframe=mainblue,center,width=\\textwidth,halign=center]
        \\color{white}
        \\LARGE \\bfseries COURS COMPLET : LIMITES ET CONTINUITÉ D'UNE FONCTION \\\\
        \\large \\vspace{1mm} Résumé Conforme au Programme du Baccalauréat Scientifique (BIOF)
    \\end{tcolorbox}
\\end{center}

\\section{LIMITES D'UNE FONCTION NUMÉRIQUE}
\\subsection{Limites Usuelles}
$$\\lim_{x \\to 0} x^n = 0 \\qquad \\lim_{x \\to +\\infty} x^n = +\\infty \\qquad \\lim_{x \\to 0^+} \\sqrt{x} = 0 \\qquad \\lim_{x \\to +\\infty} \\frac{1}{x^n} = 0$$

\\subsection{Limites Trigonométriques}
$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\qquad \\lim_{x \\to 0} \\frac{\\tan x}{x} = 1 \\qquad \\lim_{x \\to 0} \\frac{1-\\cos x}{x^2} = \\frac{1}{2}$$

\\section{CONTINUITÉ EN UN POINT ET SUR UN INTERVALLE}
\\begin{theoreme}[Continuité en un point]
$$f \\text{ continue en } x_0 \\iff \\lim_{x \\to x_0^+} f(x) = \\lim_{x \\to x_0^-} f(x) = f(x_0)$$
\\end{theoreme}

\\section{THÉORÈME DES VALEURS INTERMÉDIAIRES (TVI)}
\\begin{theoreme}[Existence et Unicité]
Si $f$ est continue et strictement monotone sur $[a, b]$ et $f(a) \\times f(b) < 0$, alors $f(x) = 0$ admet une unique solution $\\alpha \\in ]a, b[$.
\\end{theoreme}

\\section{FONCTION RÉCIPROQUE ET RACINE $n$-IÈME}
\\begin{theoreme}[Fonction Réciproque]
$(C_f)$ et $(C_{f^{-1}})$ sont symétriques par rapport à $(\\Delta) : y = x$.
$$\\forall x, y \\in \\mathbb{R}^+, \\quad y = \\sqrt[n]{x} \\iff y^n = x$$
\\end{theoreme}

\\end{document}
`;

export const LatexExporter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(LATEX_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([LATEX_SOURCE], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Limites_Et_Continuite_2BAC_BIOF.tex';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-400" />
            <h3 className="font-bold text-sm">Code Source LaTeX Prêt pour Overleaf / PDF</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-sm font-bold">
            ✕
          </button>
        </div>

        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-3">
          <span>Vous pouvez coller ce code directement dans <strong>Overleaf.com</strong> pour compiler un PDF parfait.</span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopy}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copié !' : 'Copier'}
            </button>
            <button
              onClick={handleDownload}
              className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
            >
              <Download size={14} />
              Télécharger .tex
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto font-mono text-xs text-slate-800 bg-slate-900 text-slate-200 select-all leading-relaxed">
          <pre>{LATEX_SOURCE}</pre>
        </div>
      </div>
    </div>
  );
};
