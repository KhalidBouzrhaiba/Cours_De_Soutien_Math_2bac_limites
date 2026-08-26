export interface TutorialStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  category: 'intro' | 'limits' | 'indeterminate' | 'continuity' | 'tvi' | 'dichotomy' | 'reciprocal' | 'conclusion';
  graphPresetId?: string;
  graphTitle?: string;
  graphExplanation?: string;
  hasSpecialSimulation?: 'none' | 'graph' | 'dichotomy' | 'limit-solver' | 'quiz';
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'intro',
    stepNumber: 0,
    title: 'Bienvenue dans le Guide Interactif 2BAC BIOF',
    subtitle: 'Présentation & Panorama du Chapitre : Limites & Continuité',
    badge: 'Introduction Pédagogique',
    category: 'intro',
    description: 'Une expérience d\'apprentissage interactive conçue sur mesure pour maîtriser le programme officiel de 2BAC BIOF (Sciences Math, PC & SVT). À chaque étape, découvrez les concepts mathématiques fondamentaux accompagnés de visualisations graphiques 2D dynamiques et d\'exercices d\'application immédiate.',
    hasSpecialSimulation: 'none',
  },
  {
    id: 'limits-basics',
    stepNumber: 1,
    title: 'I. Limites Usuelles & Limites Trigonométriques',
    subtitle: 'Comportement asymptotique et limites remarquables en 0',
    badge: 'Fondations',
    category: 'limits',
    description: 'Les limites de référence constituent les briques fondamentales du calcul différentiel. En 0, les quotients trigonométriques permettent d\'approximer localement les fonctions non linéaires par des fonctions affines.',
    graphPresetId: 'sinc',
    graphTitle: 'Visualisation Dynamique : lim_{x→0} sin(x)/x = 1',
    graphExplanation: 'Observez que bien que sin(0)/0 ne soit pas défini algébriquement, la courbe converge précisément vers l\'ordonnée y = 1 lorsque x s\'approche de 0 par la gauche et par la droite.',
    hasSpecialSimulation: 'graph',
    quiz: {
      question: 'Quelle est la valeur de la limite lim_{x → 0} (1 - cos(2x)) / x² ?',
      options: ['1/2', '1', '2', '4'],
      correctIndex: 2,
      explanation: 'En posant u = 2x, on a (1 - cos(2x))/x² = 4 × (1 - cos(2x))/(2x)² → 4 × (1/2) = 2.',
    },
  },
  {
    id: 'indeterminate-forms',
    stepNumber: 2,
    title: 'II. Formes Indéterminées & Méthodes de Levée',
    subtitle: 'Factorisation dominante, quantité conjuguée et nombre dérivé',
    badge: 'Techniques Clés',
    category: 'indeterminate',
    description: 'Face aux 4 formes indéterminées (0 × ∞, ∞/∞, 0/0, +∞ - ∞), le choix de la méthode algébrique est crucial : factoriser par le monôme dominant à l\'infini, multiplier par le conjugué en présence de racines carrées, ou reconnaître un taux d\'accroissement.',
    graphPresetId: 'conjugate-study',
    graphTitle: 'Levée d\'Indétermination : f(x) = √(x² + x) - x',
    graphExplanation: 'En +∞, cette expression présente la forme (+∞ - ∞). La multiplication par la quantité conjuguée permet de prouver que la courbe admet pour asymptote horizontale la droite y = 1/2.',
    hasSpecialSimulation: 'graph',
    quiz: {
      question: 'Pour lever l\'indétermination de lim_{x → +∞} (√(x² + 3x) - x), quelle technique est la plus efficace ?',
      options: ['Le théorème des gendarmes', 'La quantité conjuguée', 'La division euclidienne', 'L\'inégalité de Cauchy-Schwarz'],
      correctIndex: 1,
      explanation: 'Comme les coefficients devant x² sous la racine et x² hors racine sont égaux (1 = 1), les termes dominants s\'annulent, rendant la quantité conjuguée indispensable.',
    },
  },
  {
    id: 'continuity-point',
    stepNumber: 3,
    title: 'III. Continuité en un Point & Prolongement',
    subtitle: 'Raccordement des limites latérales et singularités éliminables',
    badge: 'Théorème Central',
    category: 'continuity',
    description: 'Une fonction f est continue en x₀ si et seulement si lim_{x→x₀} f(x) = f(x₀), ce qui équivaut à l\'égalité des limites à gauche et à droite. Si la limite existe mais que x₀ ∉ Df, on peut prolonger f par continuité.',
    graphPresetId: 'rational-left-right',
    graphTitle: 'Continuité & Limites Latérales',
    graphExplanation: 'Examinez la fonction f(x) = (x+1)² / |x² - 1| au voisinage de x = -1 : la limite à droite et la limite à gauche coïncident parfaitement en 0, permettant un prolongement par continuité.',
    hasSpecialSimulation: 'graph',
    quiz: {
      question: 'Soit f(x) = (sin x) / x pour x ≠ 0. Quelle valeur donner à f(0) pour prolonger f par continuité en 0 ?',
      options: ['0', '1', 'π', 'La fonction ne peut pas être prolongée'],
      correctIndex: 1,
      explanation: 'Puisque lim_{x → 0} (sin x)/x = 1, on pose f(0) = 1 pour rendre f continue sur ℝ.',
    },
  },
  {
    id: 'continuity-interval',
    stepNumber: 4,
    title: 'IV. Continuité sur un Intervalle & Composée',
    subtitle: 'Stabilité par opérations algébriques et composition g ∘ f',
    badge: 'Propriétés Globales',
    category: 'continuity',
    description: 'Toute fonction polynôme, rationnelle ou trigonométrique est continue sur son ensemble de définition. La composée de deux fonctions continues est également continue, ce qui permet de transférer les limites : lim v(u(x)) = v(lim u(x)).',
    hasSpecialSimulation: 'none',
    quiz: {
      question: 'Si lim_{x → 2} u(x) = π/2 et v(x) = cos(x), quelle est la limite de v(u(x)) quand x tend vers 2 ?',
      options: ['1', '0', '-1', 'Indéterminée'],
      correctIndex: 1,
      explanation: 'Par continuité de la fonction cosinus sur ℝ, lim_{x → 2} cos(u(x)) = cos(π/2) = 0.',
    },
  },
  {
    id: 'tvi-concept',
    stepNumber: 5,
    title: 'V. Théorème des Valeurs Intermédiaires (TVI)',
    subtitle: 'Existence de solutions f(x) = k et unicité par stricte monotonie',
    badge: 'Théorème d\'Existence',
    category: 'tvi',
    description: 'Si f est continue sur [a, b], elle prend toutes les valeurs comprises entre f(a) et f(b). En particulier, si f(a) × f(b) < 0, l\'équation f(x) = 0 admet au moins une solution α ∈ ]a, b[. Si de plus f est strictement monotone, cette solution est unique.',
    graphPresetId: 'tvi-demo',
    graphTitle: 'Simulation Graphique du TVI : f(x) = x³ - 2x - 1',
    graphExplanation: 'Sur l\'intervalle [1, 2], f(1) = -2 < 0 et f(2) = 3 > 0. La courbe continue coupe nécessairement l\'axe des abscisses en un point unique α ≈ 1.618.',
    hasSpecialSimulation: 'graph',
    quiz: {
      question: 'Quelles sont les deux conditions suffisantes pour garantir l\'UNICITÉ de la solution f(x) = 0 sur [a, b] ?',
      options: [
        'f est dérivable et f(a) = f(b)',
        'f est continue sur [a, b] et f(a) × f(b) < 0',
        'f est continue et STRICTEMENT monotone sur [a, b], avec f(a) × f(b) < 0',
        'f est une fonction polynôme de degré impair'
      ],
      correctIndex: 2,
      explanation: 'La continuité et le changement de signe assurent l\'existence (TVI). La stricte monotonie (strictement croissante ou décroissante) assure la bijectivité et donc l\'unicité de la solution.',
    },
  },
  {
    id: 'dichotomy-method',
    stepNumber: 6,
    title: 'VI. Méthode de Dichotomie Interactive',
    subtitle: 'Algorithme d\'encadrement et approximation numérique de racine',
    badge: 'Algorithme Pratique',
    category: 'dichotomy',
    description: 'La dichotomie permet d\'encadrer la solution α d\'une équation f(x) = 0 en divisant l\'intervalle par deux à chaque itération. À l\'étape n, l\'amplitude de l\'encadrement est (b - a) / 2ⁿ, garantissant une convergence géométrique.',
    hasSpecialSimulation: 'dichotomy',
    quiz: {
      question: 'Quelle est la précision obtenue pour encadrer une racine sur [0, 1] après 10 itérations de dichotomie ?',
      options: ['1/10 = 0.1', '1/100 = 0.01', '1/2¹⁰ ≈ 0.000977 (ordre 10⁻³)', '1/10000 = 10⁻⁴'],
      correctIndex: 2,
      explanation: 'L\'amplitude après n itérations est (b - a)/2ⁿ. Pour [0, 1] et n = 10, cela donne 1 / 1024 ≈ 9.76 × 10⁻⁴.',
    },
  },
  {
    id: 'reciprocal-roots',
    stepNumber: 7,
    title: 'VII. Fonction Réciproque & Racines n-ièmes',
    subtitle: 'Théorème de la bijection, symétrie y = x et puissances rationnelles',
    badge: 'Bijection & Puissances',
    category: 'reciprocal',
    description: 'Toute fonction continue et strictement monotone sur un intervalle I définit une bijection de I sur J = f(I). Sa réciproque f⁻¹ est continue, de même sens de variation, et sa courbe est symétrique par rapport à la droite (Δ) : y = x. La racine n-ième √[n]{x} est la réciproque de x ↦ xⁿ sur ℝ⁺.',
    graphPresetId: 'reciprocal-sym',
    graphTitle: 'Symétrie Orthogonale : f(x) = x² et f⁻¹(x) = √x',
    graphExplanation: 'La courbe bleue f(x) = x² et la courbe rouge f⁻¹(x) = √x sont exactement le reflet l\'une de l\'autre par rapport à la première bissectrice y = x (pointillée).',
    hasSpecialSimulation: 'graph',
    quiz: {
      question: 'Quelle est la simplification exacte de ∛(x⁶) pour tout réel x ≥ 0 ?',
      options: ['x', 'x²', 'x³', 'x¹⁸'],
      correctIndex: 1,
      explanation: '∛(x⁶) = (x⁶)^(1/3) = x^(6/3) = x².',
    },
  },
  {
    id: 'summary-quiz',
    stepNumber: 8,
    title: 'VIII. Bilan, QCM d\'Auto-Évaluation & Boîte à Outils',
    subtitle: 'Validation des compétences, résolveur de limites et export PDF',
    badge: 'Évaluation & Synthèse',
    category: 'conclusion',
    description: 'Félicitations ! Vous avez parcouru l\'ensemble des notions clés du chapitre Limites & Continuité 2BAC BIOF. Testez maintenant vos connaissances avec le QCM complet, explorez des fonctions personnalisées dans le résolveur pas-à-pas, ou téléchargez le résumé de cours complet en PDF.',
    hasSpecialSimulation: 'quiz',
  },
];
