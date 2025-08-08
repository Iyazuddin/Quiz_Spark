import React from 'react';
import { Trophy, RefreshCw } from 'lucide-react';

export const QuizSummary = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
      <div className="mb-6">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      
      <div className="text-4xl font-bold mb-4 text-blue-600">
        {score} / {totalQuestions}
      </div>
      
      <p className="text-lg mb-6 text-gray-600">
        You scored {percentage.toFixed(1)}%
      </p>
      
      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 w-full py-3 px-6 
                 bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                 rounded-lg transition-colors duration-200"
      >
        <RefreshCw className="w-5 h-5" />
        Try Again
      </button>
    </div>
  );
};