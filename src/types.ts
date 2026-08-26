export interface LessonModule {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface InteractiveGraphConfig {
  title: string;
  fn: (x: number) => number;
  fnLatex: string;
  domain: [number, number];
  range: [number, number];
  keyPoints?: { x: number; y: number; label: string; color?: string }[];
  showInverse?: boolean;
  inverseFn?: (x: number) => number;
  inverseFnLatex?: string;
  showTVI?: boolean;
  tviTarget?: number;
  showTangent?: boolean;
  tangentX?: number;
}
