import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TUTORIAL_STEPS, TutorialStep } from '../data/tutorialScenario';
import { MathView } from './MathView';
import { InteractiveGraph, PRESETS } from './InteractiveGraph';
import { DichotomyVisualizer } from './DichotomyVisualizer';
import { LimitCalculator } from './LimitCalculator';
import { PracticeQuiz } from './PracticeQuiz';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookOpen,
  LineChart,
  Layers,
  Award,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  ArrowRight,
  Compass,
  GraduationCap,
  Calculator,
  Download,
  AlertCircle,
  Lightbulb,
  MessageCircle
} from 'lucide-react';

interface InteractiveTutorialProps {
  onGoToFullCourse?: () => void;
  onDownloadPdf?: () => void;
  isDownloadingPdf?: boolean;
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  onGoToFullCourse,
  onDownloadPdf,
  isDownloadingPdf = false,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([0]));

  const currentStep: TutorialStep = TUTORIAL_STEPS[currentStepIndex] || TUTORIAL_STEPS[0];
  const totalSteps = TUTORIAL_STEPS.length;
  const progressPercent = Math.round((currentStepIndex / (totalSteps - 1)) * 100);

  // Mark current step as completed
  useEffect(() => {
    setCompletedSteps((prev) => new Set([...prev, currentStepIndex]));
  }, [currentStepIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' && currentStepIndex < totalSteps - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStepIndex > 0) {
        setCurrentStepIndex((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectQuiz = (optionIdx: number) => {
    setSelectedQuizAnswers((prev) => ({
      ...prev,
      [currentStepIndex]: optionIdx,
    }));
    setShowQuizExplanations((prev) => ({
      ...prev,
      [currentStepIndex]: true,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Tutorial Navigator Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
              {currentStep.stepNumber === 0 ? <Compass size={20} /> : `${currentStep.stepNumber}/${totalSteps - 1}`}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100/60 px-2 py-0.5 rounded-md">
                  {currentStep.badge}
                </span>
                <span className="text-xs text-slate-400">Parcours Guidé 2BAC BIOF</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 line-clamp-1">
                {currentStep.title}
              </h2>
            </div>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                currentStepIndex === 0
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-2xs'
              }`}
            >
              <ChevronLeft size={16} />
              <span>Précédent</span>
            </button>

            <span className="text-xs font-medium text-slate-500 px-1 hidden sm:inline">
              {progressPercent}%
            </span>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === totalSteps - 1}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                currentStepIndex === totalSteps - 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
              }`}
            >
              <span>Suivant</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress Bar & Step Dots */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>

          {/* Interactive Step Chips */}
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5">
            {TUTORIAL_STEPS.map((step, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isCompleted = completedSteps.has(idx);
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-1.5 sm:p-2 rounded-xl text-center transition flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-bold shadow-2xs ring-2 ring-blue-400/40'
                      : isCompleted
                      ? 'bg-blue-50/70 hover:bg-blue-100/70 text-blue-800 font-medium border border-blue-200/50'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/60'
                  }`}
                  title={step.title}
                >
                  <span className="text-2xs font-semibold">
                    {idx === 0 ? 'Accueil' : `Étape ${idx}`}
                  </span>
                  <span className="text-3xs sm:text-2xs truncate max-w-full opacity-80 hidden md:block">
                    {step.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Animated Step Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="space-y-6"
        >
          {/* STEP 0: GREETING & ANIMATED OVERVIEW SLIDE */}
          {currentStep.stepNumber === 0 && (
            <div className="space-y-6">
              {/* Hero Banner with Greeting */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 max-w-3xl space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
                      <Sparkles size={14} />
                      <span>Tutoriel Interactif Guidé · 2BAC BIOF</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold">
                      <GraduationCap size={14} />
                      <span>Par <strong>Prof. Khalid Bouzrhaiba</strong></span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    Maîtrisez les <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-indigo-200">Limites &amp; la Continuité</span>
                  </h1>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    Bienvenue dans votre environnement d'enseignement interactif préparé par <strong>Prof. Khalid Bouzrhaiba</strong>. Ce guide pas-à-pas a été conçu selon le programme officiel marocain pour vous faire comprendre chaque théorème en profondeur à travers des <strong className="text-white">simulations graphiques 2D directes</strong>, des <strong className="text-white">démonstrations pas-à-pas</strong> et des <strong className="text-white">exercices interactifs instantanés</strong>.
                  </p>

                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition cursor-pointer"
                    >
                      <span>Démarrer le Parcours Interactif</span>
                      <ArrowRight size={18} />
                    </button>

                    {onGoToFullCourse && (
                      <button
                        onClick={onGoToFullCourse}
                        className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-5 py-3 rounded-xl font-semibold text-sm backdrop-blur-xs transition cursor-pointer"
                      >
                        <BookOpen size={16} />
                        <span>Consulter le Cours Complet</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Animated Curriculum Roadmap Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Layers size={18} className="text-blue-600" />
                    <span>Plan Pédagogique &amp; Objectifs du Chapitre</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">8 Étapes Interactives</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {TUTORIAL_STEPS.slice(1).map((step, idx) => {
                    return (
                      <motion.div
                        key={step.id}
                        whileHover={{ y: -3 }}
                        onClick={() => {
                          setCurrentStepIndex(step.stepNumber);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 p-4 shadow-2xs hover:shadow-xs transition cursor-pointer flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                              {step.stepNumber}
                            </span>
                            <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {step.badge}
                            </span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                            {step.title}
                          </h4>
                          <p className="text-2xs text-slate-500 line-clamp-2 leading-relaxed">
                            {step.subtitle}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-2xs text-blue-600 font-semibold">
                          <span>
                            {step.hasSpecialSimulation === 'graph'
                              ? 'Simulation 2D incluse'
                              : step.hasSpecialSimulation === 'dichotomy'
                              ? 'Simulateur Dichotomie'
                              : step.hasSpecialSimulation === 'quiz'
                              ? 'QCM & Résolveur'
                              : 'Théorie & Formules'}
                          </span>
                          <ChevronRight size={14} />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 1: LIMITES USUELLES & TRIGONOMÉTRIQUES */}
          {currentStep.stepNumber === 1 && (
            <div className="space-y-6">
              {/* Theory Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      1. Limites Trigonométriques Remarquables en 0
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Approximation locale du premier et second ordre en <MathView math="x = 0" />
                    </p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-2xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                    Formules Fondamentales
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Au voisinage de 0, les fonctions trigonométriques admettent des limites de référence essentielles. Elles permettent de lever instantanément les indéterminations de la forme <MathView math="\frac{0}{0}" /> :
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 text-center space-y-1.5 shadow-2xs">
                    <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide">Sinus</span>
                    <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                      <MathView math="\lim_{x \to 0} \frac{\sin(ax)}{ax} = 1" block={true} />
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 text-center space-y-1.5 shadow-2xs">
                    <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide">Tangente</span>
                    <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                      <MathView math="\lim_{x \to 0} \frac{\tan(ax)}{ax} = 1" block={true} />
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 text-center space-y-1.5 shadow-2xs">
                    <span className="text-2xs font-bold text-slate-500 uppercase tracking-wide">Cosinus</span>
                    <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                      <MathView math="\lim_{x \to 0} \frac{1 - \cos(x)}{x^2} = \frac{1}{2}" block={true} />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50/70 border border-blue-200/70 rounded-xl p-4 flex items-start gap-3">
                  <Lightbulb size={18} className="text-blue-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900 leading-relaxed">
                    <strong>Règle générale :</strong> Si <MathView math="\lim_{x \to x_0} u(x) = 0" /> avec <MathView math="u(x) \neq 0" />, alors <MathView math="\lim_{x \to x_0} \frac{\sin(u(x))}{u(x)} = 1" /> et <MathView math="\lim_{x \to x_0} \frac{1 - \cos(u(x))}{u(x)^2} = \frac{1}{2}" />.
                  </div>
                </div>
              </div>

              {/* Contextual 2D Simulation Embedded */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LineChart size={18} className="text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Simulation Graphique 2D Contextuelle : Démonstration Visuelle
                  </h4>
                </div>
                <InteractiveGraph initialPresetId="sinc" compact={true} />
              </div>
            </div>
          )}

          {/* STEP 2: FORMES INDÉTERMINÉES & LEVÉES */}
          {currentStep.stepNumber === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      2. Les 4 Formes Indéterminées &amp; Stratégies
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Identification et levée systématique selon le type d'expression
                    </p>
                  </div>
                  <span className="bg-red-50 text-red-700 text-2xs font-semibold px-2.5 py-1 rounded-full border border-red-100">
                    4 F.I. à Connaître
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['0 \\times \\infty', '\\frac{\\infty}{\\infty}', '\\frac{0}{0}', '+\\infty - \\infty'].map((fi, idx) => (
                    <div key={idx} className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-3 text-center shadow-2xs">
                      <span className="text-3xs font-bold text-slate-400 block mb-1">F.I. #{idx + 1}</span>
                      <div className="font-mono text-sm font-bold text-red-600">
                        <MathView math={fi} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      1. Factorisation Dominante
                    </h4>
                    <p className="text-2xs text-slate-600 leading-relaxed">
                      En <MathView math="\pm\infty" />, on met en facteur le terme le plus fort :
                    </p>
                    <div className="bg-white p-2 rounded-lg border border-slate-200 text-2xs text-center">
                      <MathView math="\sqrt{ax^2+bx+c} = |x|\sqrt{a+\frac{b}{x}+\frac{c}{x^2}}" />
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      2. Quantité Conjuguée
                    </h4>
                    <p className="text-2xs text-slate-600 leading-relaxed">
                      Quand les monômes s'annulent <MathView math="(\sqrt{A} - B)" /> :
                    </p>
                    <div className="bg-white p-2 rounded-lg border border-slate-200 text-2xs text-center">
                      <MathView math="\sqrt{A} - B = \frac{A - B^2}{\sqrt{A} + B}" />
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-3.5 space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      3. Taux d'Accroissement
                    </h4>
                    <p className="text-2xs text-slate-600 leading-relaxed">
                      Quand <MathView math="x \to x_0" /> sous forme <MathView math="\frac{0}{0}" /> :
                    </p>
                    <div className="bg-white p-2 rounded-lg border border-slate-200 text-2xs text-center">
                      <MathView math="\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = f'(x_0)" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual 2D Simulation Embedded */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LineChart size={18} className="text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Simulation Graphique : Quantité Conjuguée sur <MathView math="f(x) = \sqrt{x^2+x} - x" />
                  </h4>
                </div>
                <InteractiveGraph initialPresetId="conjugate-study" compact={true} />
              </div>
            </div>
          )}

          {/* STEP 3: CONTINUITÉ EN UN POINT & PROLONGEMENT */}
          {currentStep.stepNumber === 3 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      3. Continuité en un Point &amp; Continuité Latérale
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Condition fondamentale et prolongement des singularités éliminables
                    </p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-2xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                    Critère de Cauchy
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Théorème de Raccordement
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <MathView math="f" /> est continue en <MathView math="x_0" /> si et seulement si :
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center font-bold">
                      <MathView math="\lim_{x \to x_0^+} f(x) = \lim_{x \to x_0^-} f(x) = f(x_0)" block={true} />
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Prolongement par Continuité
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Si <MathView math="x_0 \notin D_f" /> et <MathView math="\lim_{x \to x_0} f(x) = \ell \in \mathbb{R}" />, on définit <MathView math="\widetilde{f}" /> par :
                    </p>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs text-center">
                      <MathView math="\widetilde{f}(x) = \begin{cases} f(x) & x \neq x_0 \\ \ell & x = x_0 \end{cases}" block={true} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual 2D Simulation Embedded */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LineChart size={18} className="text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Simulation Graphique : Limites Latérales &amp; Continuité
                  </h4>
                </div>
                <InteractiveGraph initialPresetId="rational-left-right" compact={true} />
              </div>
            </div>
          )}

          {/* STEP 4: CONTINUITÉ SUR UN INTERVALLE & COMPOSITION */}
          {currentStep.stepNumber === 4 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      4. Continuité sur un Intervalle &amp; Fonctions Composées
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Stabilité algébrique et théorème de composition <MathView math="g \circ f" />
                    </p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-2xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                    Opérations
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Continuité des Fonctions Usuelles
                    </h4>
                    <ul className="text-xs text-slate-700 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Toute fonction polynôme est continue sur <MathView math="\mathbb{R}" />.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>Toute fonction rationnelle est continue sur chaque intervalle de son domaine <MathView math="D_f" />.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span><MathView math="x \mapsto \sqrt{x}" /> est continue sur <MathView math="[0, +\infty[" />.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span><MathView math="\sin" /> et <MathView math="\cos" /> sont continues sur <MathView math="\mathbb{R}" />.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Théorème de la Composée
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Si <MathView math="\lim_{x \to x_0} u(x) = \ell" /> et <MathView math="v" /> est continue en <MathView math="\ell" />, alors :
                    </p>
                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-center font-bold">
                      <MathView math="\lim_{x \to x_0} v(u(x)) = v(\ell)" block={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: THÉORÈME DES VALEURS INTERMÉDIAIRES (TVI) */}
          {currentStep.stepNumber === 5 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      5. Théorème des Valeurs Intermédiaires (TVI)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Existence et unicité des solutions de l'équation <MathView math="f(x) = k" />
                    </p>
                  </div>
                  <span className="bg-purple-50 text-purple-700 text-2xs font-semibold px-2.5 py-1 rounded-full border border-purple-100">
                    Théorème Majeur
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide text-blue-700">
                      1. Existence (Cas Général)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Si <MathView math="f" /> est continue sur <MathView math="[a, b]" /> et <MathView math="f(a) \times f(b) < 0" />, alors il existe au moins un réel <MathView math="\alpha \in ]a, b[" /> tel que :
                    </p>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-bold">
                      <MathView math="f(\alpha) = 0" block={true} />
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide text-purple-700">
                      2. Unicité (Stricte Monotonie)
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Si de plus <MathView math="f" /> est <strong>strictement monotone</strong> sur <MathView math="[a, b]" />, alors la solution <MathView math="\alpha" /> est <strong>unique</strong> :
                    </p>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-bold text-purple-800">
                      <MathView math="\exists ! \alpha \in ]a, b[, \quad f(\alpha) = 0" block={true} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual 2D Simulation Embedded */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LineChart size={18} className="text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Simulation Graphique du TVI : Intersection <MathView math="f(x) = x^3 - 2x - 1" />
                  </h4>
                </div>
                <InteractiveGraph initialPresetId="tvi-demo" compact={true} />
              </div>
            </div>
          )}

          {/* STEP 6: MÉTHODE DE DICHOTOMIE INTERACTIVE */}
          {currentStep.stepNumber === 6 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-4">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      6. Algorithme &amp; Encadrement par Dichotomie
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Bisection itérative de l'intervalle avec précision <MathView math="\frac{b-a}{2^n}" />
                    </p>
                  </div>
                  <span className="bg-indigo-50 text-indigo-700 text-2xs font-semibold px-2.5 py-1 rounded-full border border-indigo-100">
                    Algorithmique
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Pour approximer la racine <MathView math="\alpha" /> de <MathView math="f(x) = 0" />, on calcule le milieu <MathView math="m = \frac{a+b}{2}" />. Si <MathView math="f(a) \times f(m) \le 0" />, <MathView math="\alpha \in [a, m]" />, sinon <MathView math="\alpha \in [m, b]" />. Testez directement l'algorithme interactif ci-dessous :
                </p>
              </div>

              {/* Dichotomy Simulator Embedded */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Simulateur Interactif de Dichotomie Pas-à-Pas
                  </h4>
                </div>
                <DichotomyVisualizer />
              </div>
            </div>
          )}

          {/* STEP 7: FONCTION RÉCIPROQUE & RACINES N-IÈMES */}
          {currentStep.stepNumber === 7 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-7 space-y-5">
                <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      7. Fonction Réciproque <MathView math="f^{-1}" /> &amp; Racines <MathView math="n" />-ièmes
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Théorème de la bijection, symétrie par rapport à <MathView math="y = x" /> et règles algébriques
                    </p>
                  </div>
                  <span className="bg-blue-50 text-blue-700 text-2xs font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                    Bijection &amp; Symétrie
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Théorème de la Bijection
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Si <MathView math="f" /> est <strong>continue</strong> et <strong>strictement monotone</strong> sur <MathView math="I" />, elle admet une fonction réciproque <MathView math="f^{-1}" /> définie sur <MathView math="J = f(I)" />.
                    </p>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-center font-bold text-xs">
                      <MathView math="\begin{aligned} &y = f(x) \iff x = f^{-1}(y) \\ &(C_{f^{-1}}) = S_{(y=x)}(C_f) \end{aligned}" block={true} />
                    </div>
                  </div>

                  <div className="bg-slate-50/70 border border-slate-200/90 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Propriétés des Racines <MathView math="n" />-ièmes
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <MathView math="\sqrt[n]{x} = x^{1/n} \quad (x \ge 0, n \in \mathbb{N}^*)" />
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <MathView math="\sqrt[n]{x \cdot y} = \sqrt[n]{x} \cdot \sqrt[n]{y}" />
                      </div>
                      <div className="bg-white p-2 rounded-lg border border-slate-200">
                        <MathView math="\sqrt[n]{\sqrt[m]{x}} = \sqrt[n \cdot m]{x} = x^{\frac{1}{nm}}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contextual 2D Simulation Embedded */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <LineChart size={18} className="text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Simulation Graphique : Symétrie Orthogonale <MathView math="f(x) = x^2" /> et <MathView math="f^{-1}(x) = \sqrt{x}" />
                  </h4>
                </div>
                <InteractiveGraph initialPresetId="reciprocal-sym" compact={true} />
              </div>
            </div>
          )}

          {/* STEP 8: BILAN & OUTILS */}
          {currentStep.stepNumber === 8 && (
            <div className="space-y-6">
              {/* Completion Banner */}
              <div className="bg-gradient-to-tr from-blue-700 via-indigo-700 to-blue-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-100">
                    <Award size={16} />
                    <span>Parcours Pédagogique Terminé !</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Félicitations pour avoir complété le tutoriel interactif !
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Vous avez exploré l'ensemble des notions clés du programme 2BAC BIOF. Passez à l'action avec les exercices d'entraînement, explorez le résolveur de limites ou téléchargez le résumé PDF complet.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
                  {onDownloadPdf && (
                    <button
                      onClick={onDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-blue-900 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition cursor-pointer"
                    >
                      <Download size={16} />
                      <span>{isDownloadingPdf ? 'Génération PDF...' : 'Télécharger Cours PDF'}</span>
                    </button>
                  )}
                  {onGoToFullCourse && (
                    <button
                      onClick={onGoToFullCourse}
                      className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/20 text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold text-xs transition cursor-pointer"
                    >
                      <BookOpen size={16} />
                      <span>Mode Cours Complet</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Full Interactive Quiz */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-blue-600" />
                  <h4 className="text-base font-bold text-slate-900">
                    QCM &amp; Exercices d'Auto-Évaluation Officiels (Type Examen National)
                  </h4>
                </div>
                <PracticeQuiz />
              </div>

              {/* Interactive Limit Solver */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calculator size={18} className="text-blue-600" />
                  <h4 className="text-base font-bold text-slate-900">
                    Résolveur Pas-à-Pas de Limites avec Détection de Formes Indéterminées
                  </h4>
                </div>
                <LimitCalculator />
              </div>
            </div>
          )}

          {/* Inline Quick Checkup Quiz for Steps 1-7 */}
          {currentStep.quiz && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                    <HelpCircle size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Question d'Application Immédiate (Test Étape {currentStep.stepNumber})
                  </h4>
                </div>
                <span className="text-2xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700">
                  Auto-Contrôle
                </span>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-slate-800">
                {currentStep.quiz.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStep.quiz.options.map((option, optIdx) => {
                  const isSelected = selectedQuizAnswers[currentStepIndex] === optIdx;
                  const isCorrect = optIdx === currentStep.quiz!.correctIndex;
                  const hasAnswered = selectedQuizAnswers[currentStepIndex] !== undefined;

                  let btnStyle = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/90';
                  if (hasAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-red-50 border-red-300 text-red-900';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectQuiz(optIdx)}
                      className={`p-3 rounded-xl text-xs text-left border transition flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {hasAnswered && isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {showQuizExplanations[currentStepIndex] && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl text-xs leading-relaxed flex items-start gap-2.5 ${
                    selectedQuizAnswers[currentStepIndex] === currentStep.quiz.correctIndex
                      ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-900'
                      : 'bg-amber-50/80 border border-amber-200 text-amber-900'
                  }`}
                >
                  <Lightbulb size={16} className="shrink-0 mt-0.5" />
                  <div>
                    <strong>
                      {selectedQuizAnswers[currentStepIndex] === currentStep.quiz.correctIndex
                        ? 'Excellente réponse ! '
                        : 'Explication : '}
                    </strong>
                    {currentStep.quiz.explanation}
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Bottom Next/Prev CTA Navigation Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                currentStepIndex === 0
                  ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 text-slate-700 bg-white hover:bg-slate-50'
              }`}
            >
              <ChevronLeft size={16} />
              <span>Étape Précédente</span>
            </button>

            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Étape {currentStepIndex + 1} sur {totalSteps}
            </span>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === totalSteps - 1}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentStepIndex === totalSteps - 1
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
              }`}
            >
              <span>{currentStepIndex === 0 ? 'Commencer' : currentStepIndex === totalSteps - 2 ? 'Voir le Bilan' : 'Étape Suivante'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
