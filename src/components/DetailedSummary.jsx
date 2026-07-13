import React from 'react';
import { Check, X, RotateCcw } from 'lucide-react';

export const DetailedSummary = ({
  answers,
  onRestart,
}) => {
  return (
    <div className="glass-card p-6 md:p-8">
      <h2 className="text-2xl font-bold font-display text-white/90 mb-2">
        Detailed Results
      </h2>
      <p className="text-spark-200/40 text-sm mb-8">
        Review each question and see the correct answers
      </p>

      <div className="space-y-6">
        {answers.map((answer, index) => (
          <div
            key={index}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
          >
            {/* Question */}
            <div className="flex items-start gap-3 mb-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-spark-500/10 border border-spark-400/15 text-spark-300 mt-0.5">
                {index + 1}
              </span>
              <p
                className="text-base font-medium text-white/80 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: answer.question }}
              />
            </div>

            {/* Answers */}
            <div className="ml-11 space-y-2">
              {/* User answer */}
              <div className={answer.isCorrect ? 'result-correct' : 'result-incorrect'}>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-spark-200/40">
                    Your answer
                  </span>
                  {answer.isCorrect ? (
                    <Check className="w-4 h-4 text-emerald-400 ml-auto" />
                  ) : (
                    <X className="w-4 h-4 text-red-400 ml-auto" />
                  )}
                </div>
                <span
                  className="text-sm text-white/70 mt-1 block"
                  dangerouslySetInnerHTML={{ __html: answer.userAnswer || '<em class="text-spark-200/30">No answer</em>' }}
                />
              </div>

              {/* Correct answer (if wrong) */}
              {!answer.isCorrect && (
                <div className="result-correct-answer">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400/60">
                    Correct answer
                  </span>
                  <span
                    className="text-sm text-emerald-300/80 mt-1 block"
                    dangerouslySetInnerHTML={{ __html: answer.correctAnswer }}
                  />
                </div>
              )}
            </div>

            {/* Divider */}
            {index < answers.length - 1 && (
              <div className="glass-divider mt-6" />
            )}
          </div>
        ))}
      </div>

      <div className="glass-divider my-8" />

      <div className="text-center">
        <button
          onClick={onRestart}
          className="btn-primary flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          Start New Quiz
        </button>
      </div>
    </div>
  );
};