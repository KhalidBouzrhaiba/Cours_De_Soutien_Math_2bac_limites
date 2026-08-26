import React from 'react';
import katex from 'katex';

interface MathViewProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathView: React.FC<MathViewProps> = ({ math, block = false, className = '' }) => {
  const cleanedMath = (math || '').trim();

  let html = '';
  try {
    html = katex.renderToString(cleanedMath, {
      displayMode: block,
      throwOnError: false,
      strict: false,
    });
  } catch {
    html = cleanedMath;
  }

  if (block) {
    return (
      <div
        className={`w-full text-center my-1.5 py-1 px-1 math-block-container ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-flex items-baseline align-baseline math-inline-container ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

/**
 * Renders mixed text with inline $...$ or display $$...$$ math
 */
export const FormattedMathText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const parts: React.ReactNode[] = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    if (start > lastIndex) {
      parts.push(text.substring(lastIndex, start));
    }
    const token = match[0];
    if (token.startsWith('$$') && token.endsWith('$$')) {
      const math = token.slice(2, -2).trim();
      parts.push(
        <div key={start} className="my-2 text-center py-1 max-w-full">
          <MathView math={math} block={true} />
        </div>
      );
    } else if (token.startsWith('$') && token.endsWith('$')) {
      const math = token.slice(1, -1).trim();
      parts.push(<MathView key={start} math={math} block={false} />);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <div className={`leading-relaxed break-words ${className}`}>{parts}</div>;
};
