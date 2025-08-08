import React from 'react';
import { Check, Circle, Eye } from 'lucide-react';

export const QuestionNavigation = ({
  totalQuestions,
  currentQuestion,
  visitedQuestions,
  answers,
  onNavigate,
}) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Question Overview</h3>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`
              p-2 rounded-lg flex items-center justify-center
              ${currentQuestion === i ? 'ring-2 ring-blue-500' : ''}
              ${answers[i] ? 'bg-green-100' : 
                visitedQuestions.has(i) ? 'bg-yellow-50' : 'bg-gray-50'}
              hover:bg-blue-50 transition-colors duration-200
            `}
          >
            {answers[i] ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : visitedQuestions.has(i) ? (
              <Eye className="w-4 h-4 text-yellow-600" />
            ) : (
              <Circle className="w-4 h-4 text-gray-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};