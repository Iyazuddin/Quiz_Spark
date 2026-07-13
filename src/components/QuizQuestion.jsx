import React from "react";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

export const QuizQuestion = ({
  question,
  options,
  onAnswer,
  onNext,
  onPrevious,
  onSubmit,
  currentAnswer,
  isFirst,
  isLast,
}) => {
  return (
    <div className="glass-card p-6 md:p-8">
      {/* Question */}
      <h2
        className="text-xl md:text-2xl font-bold font-display text-white/90 mb-8 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: question }}
      />

      {/* Options */}
      <div className="grid gap-3 mb-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`option-btn ${option === currentAnswer ? 'selected' : ''}`}
          >
            <span className="flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-spark-500/10 border border-spark-400/20 flex items-center justify-center text-sm font-bold text-spark-300">
                {String.fromCharCode(65 + index)}
              </span>
              <span
                className="text-base"
                dangerouslySetInnerHTML={{ __html: option }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="glass-divider mb-6" />
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="btn-secondary flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex gap-3">
          {!isLast ? (
            <button
              onClick={onNext}
              className="btn-primary flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="btn-success flex items-center gap-2"
            >
              Submit
              <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
