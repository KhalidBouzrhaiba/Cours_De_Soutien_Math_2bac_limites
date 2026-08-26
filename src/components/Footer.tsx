import React from 'react';
import instagramPlushIcon from '../assets/images/furry_infinity_pi_icon_1787757199714.jpg';
import {
  GraduationCap,
  MessageCircle,
  Instagram,
  Mail,
  Phone,
  BookOpen,
  Sparkles,
  Award,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigateSection?: (section: 'tutorial' | 'cours' | 'graph' | 'dichotomy' | 'limits') => void;
  onDownloadPdf?: () => void;
  isDownloadingPdf?: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onDownloadPdf,
  isDownloadingPdf = false,
}) => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = '+212698595978';
  const whatsappClean = '212698595978';
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent('Bonjour Professeur Khalid, je vous contacte à propos du cours de Maths 2BAC BIOF.')}`;
  const instagramUrl = 'https://instagram.com/prof.khalid.maths';

  return (
    <footer className="mt-16 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden no-print">
      {/* Decorative gradient blur background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Professor Profile & Brand (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={instagramPlushIcon}
                alt="Prof. Khalid Avatar"
                className="w-12 h-12 rounded-2xl shadow-md border border-white/15 object-cover shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                    Prof. Khalid
                  </h3>
                  <span className="bg-blue-500/20 border border-blue-400/40 text-blue-300 text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Enseignant
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Professeur de Mathématiques · 2BAC BIOF (PC · SVT · SM)
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              Plateforme d'enseignement interactive conçue pour accompagner les élèves marocains du cycle secondaire qualifiant vers l'excellence aux examens nationaux et concours post-bac.
            </p>

            {/* Quick Badge Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-slate-300 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Programme Officiel BIOF</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-slate-300 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg">
                <CheckCircle2 size={13} className="text-blue-400" />
                <span>Simulations Dynamiques 2D</span>
              </span>
            </div>
          </div>

          {/* Column 2: Direct Contact & WhatsApp / Instagram (4 Cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <MessageCircle size={15} className="text-blue-400" />
              <span>Contact &amp; Réseaux Sociaux</span>
            </h4>

            <p className="text-xs text-slate-300">
              Pour toute question sur le cours, séances de soutien, ou encadrement personnalisé :
            </p>

            <div className="space-y-2.5">
              {/* WhatsApp Direct Action Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 transition shadow-xs hover:border-emerald-400 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-emerald-200 flex items-center gap-1.5">
                      <span>WhatsApp Direct</span>
                      <span className="text-3xs bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-normal">
                        En ligne
                      </span>
                    </div>
                    <div className="text-xs text-emerald-400/90 font-mono font-medium">
                      {whatsappNumber}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-emerald-400 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Instagram Profile Link */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 rounded-xl bg-pink-950/30 hover:bg-pink-900/40 border border-pink-500/30 text-pink-200 transition shadow-xs hover:border-pink-400 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-pink-400/40 shadow-xs shrink-0">
                    <img
                      src={instagramPlushIcon}
                      alt="Instagram Avatar"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Instagram size={14} className="text-white drop-shadow-xs" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-pink-200">
                      Instagram Officiel
                    </div>
                    <div className="text-xs text-pink-300/90 font-mono">
                      @prof.khalid.maths
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-pink-400 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Direct Gmail Contact */}
              <a
                href="mailto:khalidbouzrhaiba@gmail.com"
                className="group flex items-center justify-between p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700 text-slate-200 transition shadow-xs hover:border-blue-400 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-600/80 text-white flex items-center justify-center shadow-xs">
                    <Mail size={16} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white group-hover:text-blue-200">
                      Email Professionnel
                    </div>
                    <div className="text-2xs text-slate-400 truncate max-w-[190px]">
                      khalidbouzrhaiba@gmail.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-400 opacity-80 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 3: Quick Navigation & Tools (3 Cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <BookOpen size={15} className="text-blue-400" />
              <span>Navigation Rapide</span>
            </h4>

            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigateSection?.('tutorial')}
                  className="hover:text-white transition flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
                  <span>Tutoriel Pédagogique Pas-à-Pas</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('cours')}
                  className="hover:text-white transition flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
                  <span>Cours &amp; Fiches Théoriques</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('graph')}
                  className="hover:text-white transition flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
                  <span>Traceur de Fonctions 2D</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('dichotomy')}
                  className="hover:text-white transition flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
                  <span>Simulateur de Dichotomie</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection?.('limits')}
                  className="hover:text-white transition flex items-center gap-2 text-left cursor-pointer group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
                  <span>Résolveur de Limites</span>
                </button>
              </li>
            </ul>

            {onDownloadPdf && (
              <div className="pt-2">
                <button
                  onClick={onDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <GraduationCap size={15} />
                  <span>{isDownloadingPdf ? 'Génération du PDF...' : 'Télécharger Résumé PDF'}</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Copyright & Credits Strip */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {currentYear} <strong>Maths 2BAC BIOF</strong> · Conçu &amp; Développé pour les élèves de 2BAC</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Enseigné par <strong className="text-white">Prof. Khalid</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Maroc · 2BAC PC / SVT / SM</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
