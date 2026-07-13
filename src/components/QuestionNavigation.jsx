import React from 'react';
import { Check, Eye } from 'lucide-react';

export const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onNavigate,
}) => {
  return (
    <div className="glass-card p-5 mb-6">
      <h3 className="text-sm font-semibold text-spark-200/50 uppercase tracking-wider mb-4">
        Question Overview
      </h3>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isAnswered = !!answers[i];
          const isVisited = visitedQuestions.has(i);
          const isCurrent = currentQuestion === i;

          let dotClass = 'nav-dot';
          if (isCurrent) dotClass += ' current';
          if (isAnswered) dotClass += ' answered';
          else if (isVisited) dotClass += ' visited';

          return (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className={dotClass}
              title={`Question ${i + 1}`}
            >
              {isAnswered ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : isVisited ? (
                <Eye className="w-4 h-4 text-amber-400" />
              ) : (
                <span className="text-xs font-medium text-spark-200/40">
                  {i + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};