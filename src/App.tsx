import React, { useState, useRef } from 'react';
import { InteractiveTutorial } from './components/InteractiveTutorial';
import { LessonContent } from './components/LessonContent';
import { InteractiveGraph } from './components/InteractiveGraph';
import { DichotomyVisualizer } from './components/DichotomyVisualizer';
import { LimitCalculator } from './components/LimitCalculator';
import { PracticeQuiz } from './components/PracticeQuiz';
import { Footer } from './components/Footer';
import instagramPlushIcon from './assets/images/furry_infinity_pi_icon_1787757199714.jpg';
import { generateAndDownloadLessonPDF } from './utils/pdfDownloader';
import {
  Sparkles,
  BookOpen,
  Download,
  LineChart,
  Layers,
  Calculator,
  Award,
  GraduationCap,
  Loader2,
  CheckCircle2,
  ChevronRight,
  Compass,
  MessageCircle
} from 'lucide-react';

type MainSection = 'tutorial' | 'cours' | 'graph' | 'dichotomy' | 'limits';

export default function App() {
  const [currentSection, setCurrentSection] = useState<MainSection>('tutorial');
  const [courseSubTab, setCourseSubTab] = useState<string>('all');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [pdfProgressText, setPdfProgressText] = useState<string>('');
  const [pdfSuccess, setPdfSuccess] = useState<boolean>(false);
  const fullLessonRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    if (isDownloadingPdf) return;
    setIsDownloadingPdf(true);
    setPdfSuccess(false);

    try {
      // Find the element containing the entire lesson
      const elementToDownload = fullLessonRef.current || document.getElementById('full-lesson-pdf-source');
      if (!elementToDownload) {
        throw new Error("Impossible de trouver le contenu de la leçon.");
      }

      await generateAndDownloadLessonPDF(
        elementToDownload,
        'Resume_Maths_2BAC_Limites_Continuite_BIOF',
        (status) => setPdfProgressText(status)
      );

      setPdfSuccess(true);
      setTimeout(() => {
        setPdfSuccess(false);
      }, 4000);
    } catch (err) {
      console.error('PDF Generation error:', err);
      try {
        window.print();
      } catch (printErr) {
        console.error('Print fallback failed:', printErr);
      }
    } finally {
      setIsDownloadingPdf(false);
      setPdfProgressText('');
    }
  };

  const primaryMenuItems: { id: MainSection; label: string; shortLabel: string; icon: React.ComponentType<{ size?: number; className?: string }>; badge?: string }[] = [
    { id: 'tutorial', label: 'Tutoriel Interactif', shortLabel: 'Tutoriel', icon: Compass, badge: 'Recommandé' },
    { id: 'cours', label: 'Cours & Résumé', shortLabel: 'Cours', icon: BookOpen },
    { id: 'graph', label: 'Traceur Graphique 2D', shortLabel: 'Traceur 2D', icon: LineChart },
    { id: 'dichotomy', label: 'Simulateur Dichotomie', shortLabel: 'Dichotomie (TVI)', icon: Sparkles },
    { id: 'limits', label: 'Résolveur de Limites', shortLabel: 'Résolveur', icon: Calculator },
  ];

  const courseChapters = [
    { id: 'all', label: 'Tous les modules', icon: BookOpen },
    { id: 'm1', label: 'I. Limites & Opérations', icon: Layers },
    { id: 'm2', label: 'II. Formes Indéterminées', icon: Calculator },
    { id: 'm3', label: 'III. Continuité en un point', icon: LineChart },
    { id: 'm5', label: 'V. Image d\'Intervalle', icon: Layers },
    { id: 'm6', label: 'VI. TVI & Dichotomie', icon: Sparkles },
    { id: 'm7', label: 'VII. Réciproque & Racines', icon: Layers },
    { id: 'quiz', label: 'Exercices & QCM', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col justify-between">
      <div>
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <img
                src={instagramPlushIcon}
                alt="Prof. Khalid Icon"
                className="w-10 h-10 rounded-xl shadow-xs shrink-0 object-cover border border-slate-200"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <h1 className="font-bold text-sm sm:text-base text-slate-900 leading-tight whitespace-nowrap">
                    Maths 2BAC BIOF
                  </h1>
                  <span className="text-2xs bg-blue-100 text-blue-800 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                    Prof. Khalid
                  </span>
                </div>
                <p className="text-xs text-slate-500 hidden sm:block truncate">
                  Tuteur Interactif · Limites, Continuité, TVI &amp; Fonction Réciproque
                </p>
              </div>
            </div>


          </div>

        {/* 5 Main Navigation Menu Tabs */}
        <div className="bg-slate-50/80 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none" aria-label="Menu Principal">
              {primaryMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    onClick={() => setCurrentSection(item.id)}
                    className={`shrink-0 text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 transition cursor-pointer relative ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-blue-600'} />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.shortLabel}</span>
                    {item.badge && !isActive && (
                      <span className="hidden md:inline-block text-3xs font-bold uppercase bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-sm ml-0.5">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Progress Notification Banner during PDF generation */}
      {isDownloadingPdf && (
        <div className="bg-blue-600 text-white text-xs py-2 px-4 text-center font-medium shadow-md sticky top-28 z-30 flex items-center justify-center gap-2">
          <Loader2 size={14} className="animate-spin" />
          <span>{pdfProgressText || 'Préparation du document PDF de la leçon complète...'}</span>
        </div>
      )}

      {pdfSuccess && (
        <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-medium shadow-md sticky top-28 z-30 flex items-center justify-center gap-2">
          <CheckCircle2 size={14} />
          <span>Le cours complet a été téléchargé avec succès au format PDF !</span>
        </div>
      )}

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">

        {/* SECTION 0: TUTORIEL INTERACTIF GUIDÉ */}
        {currentSection === 'tutorial' && (
          <InteractiveTutorial
            onGoToFullCourse={() => setCurrentSection('cours')}
            onDownloadPdf={handleDownloadPdf}
            isDownloadingPdf={isDownloadingPdf}
          />
        )}

        {/* SECTION 1: COURS */}
        {currentSection === 'cours' && (
          <div className="space-y-6">
            {/* Cours Header & Sub-Navigation */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs space-y-3.5 no-print">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
                  <BookOpen size={18} className="text-blue-600" />
                  <span>Sommaire &amp; Chapitres du Cours</span>
                </div>
                <span className="text-xs text-slate-500">
                  Sélectionnez un chapitre ou affichez le cours complet
                </span>
              </div>

              {/* Chapter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {courseChapters.map((chap) => {
                  const Icon = chap.icon;
                  const isChapActive = courseSubTab === chap.id;
                  return (
                    <button
                      key={chap.id}
                      onClick={() => setCourseSubTab(chap.id)}
                      className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition cursor-pointer ${
                        isChapActive
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      <Icon size={13} className={isChapActive ? 'text-blue-400' : 'text-slate-400'} />
                      <span>{chap.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Course Content or Quiz */}
            {courseSubTab !== 'quiz' ? (
              <LessonContent activeTab={courseSubTab} />
            ) : (
              <PracticeQuiz />
            )}
          </div>
        )}

        {/* SECTION 2: TRACEUR GRAPHIQUE 2D */}
        {currentSection === 'graph' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-400/30 mb-1">
                  <LineChart size={13} />
                  Traceur Graphique Interactif 2D
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Visualisation et Analyse des Courbes de Fonctions
                </h2>
                <p className="text-xs text-slate-300">
                  Tracez les fonctions usuelles, observez les asymptotes, et visualisez la symétrie par rapport à <span className="font-mono text-blue-200">(Δ) : y = x</span> pour les réciproques.
                </p>
              </div>
              <button
                onClick={() => setCurrentSection('tutorial')}
                className="shrink-0 text-xs font-semibold px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
              >
                <span>Retour au Tutoriel</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <InteractiveGraph />
          </div>
        )}

        {/* SECTION 3: SIMULATEUR DE DICHOTOMIE */}
        {currentSection === 'dichotomy' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-400/30 mb-1">
                  <Sparkles size={13} />
                  Algorithme de Dichotomie &amp; TVI
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Simulateur Interactif Pas-à-Pas d'Approximation de Racines
                </h2>
                <p className="text-xs text-slate-300">
                  Calculez et observez en direct le rétrécissement des intervalles d'amplitude <span className="font-mono text-emerald-200">(b - a) / 2ⁿ</span> pour encadrer <span className="font-mono text-emerald-200">α</span>.
                </p>
              </div>
              <button
                onClick={() => setCurrentSection('tutorial')}
                className="shrink-0 text-xs font-semibold px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
              >
                <span>Retour au Tutoriel</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <DichotomyVisualizer />
          </div>
        )}

        {/* SECTION 4: RÉSOLVEUR DE LIMITES */}
        {currentSection === 'limits' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-indigo-900 via-violet-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-indigo-400/30 mb-1">
                  <Calculator size={13} />
                  Résolveur Algébrique Pas-à-Pas
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Résolution &amp; Levée des Formes Indéterminées
                </h2>
                <p className="text-xs text-slate-300">
                  Entrez votre limite ou choisissez un cas d'école (quantité conjuguée, factorisation, taux d'accroissement) pour voir les étapes détaillées.
                </p>
              </div>
              <button
                onClick={() => setCurrentSection('tutorial')}
                className="shrink-0 text-xs font-semibold px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-1.5 transition self-start sm:self-auto cursor-pointer"
              >
                <span>Retour au Tutoriel</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <LimitCalculator />
          </div>
        )}

        </main>
      </div>

      {/* Professional Footer with Prof. Khalid Bouzrhaiba Contact Infos */}
      <Footer
        onNavigateSection={(sec) => {
          setCurrentSection(sec);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onDownloadPdf={handleDownloadPdf}
        isDownloadingPdf={isDownloadingPdf}
      />

      {/* Hidden Master Full Lesson for Complete PDF Export (Always contains all modules I to VII) */}
      <div
        id="full-lesson-pdf-source"
        ref={fullLessonRef}
        className="hidden"
        aria-hidden="true"
      >
        <LessonContent activeTab="all" />
      </div>
    </div>
  );
}


