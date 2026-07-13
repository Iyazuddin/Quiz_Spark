import React from 'react';
import { Trophy, RefreshCw, Star } from 'lucide-react';

export const QuizSummary = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;
  const circumference = 2 * Math.PI * 65; // radius = 65
  const offset = circumference - (percentage / 100) * circumference;

  // Determine grade color
  let strokeColor = '#ef4444'; // red
  let grade = 'Keep Trying!';
  if (percentage >= 80) {
    strokeColor = '#34d399';
    grade = 'Outstanding!';
  } else if (percentage >= 60) {
    strokeColor = '#22d3ee';
    grade = 'Great Job!';
  } else if (percentage >= 40) {
    strokeColor = '#fbbf24';
    grade = 'Good Effort!';
  }

  return (
    <div className="glass-card p-8 md:p-12 text-center max-w-lg mx-auto">
      {/* Trophy icon */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 mb-6">
        <Trophy className="w-8 h-8 text-amber-400" style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.5))' }} />
      </div>

      <h2 className="text-3xl font-bold font-display gradient-text mb-2">
        Quiz Complete!
      </h2>
      <p className="text-spark-200/50 mb-8">{grade}</p>

      {/* Score Ring */}
      <div className="score-ring mb-8">
        <svg viewBox="0 0 150 150">
          <circle className="track" cx="75" cy="75" r="65" />
          <circle
            className="progress"
            cx="75"
            cy="75"
            r="65"
            stroke={strokeColor}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 8px ${strokeColor}50)` }}
          />
        </svg>
        <div className="score-value">
          <span className="text-4xl font-extrabold text-white" style={{ animationName: 'countUp', animationDuration: '0.8s', animationFillMode: 'both' }}>
            {score}
          </span>
          <span className="text-sm text-spark-200/50 font-medium">
            of {totalQuestions}
          </span>
        </div>
      </div>

      {/* Percentage */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <Star className="w-4 h-4 text-amber-400" />
        <span className="text-lg font-semibold" style={{ color: strokeColor }}>
          {percentage.toFixed(0)}% Accuracy
        </span>
        <Star className="w-4 h-4 text-amber-400" />
      </div>

      <button
        id="restart-quiz-btn"
        onClick={onRestart}
        className="btn-primary flex items-center justify-center gap-2 w-full"
      >
        <RefreshCw className="w-5 h-5" />
        Try Again
      </button>
    </div>
  );
};