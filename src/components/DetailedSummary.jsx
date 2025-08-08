import React from 'react';
import { Check, X } from 'lucide-react';

export const DetailedSummary = ({
  answers,
  onRestart,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Detailed Results</h2>
      <div className="space-y-6">
        {answers.map((answer, index) => (
          <div 
            key={index}
            className="border-b border-gray-200 pb-4 last:border-0"
          >
            <div className="flex items-start gap-2 mb-2">
              <span className="font-semibold text-gray-600 min-w-[2rem]">
                {index + 1}.
              </span>
              <div className="flex-1">
                <p 
                  className="text-lg font-medium mb-4"
                  dangerouslySetInnerHTML={{ __html: answer.question }}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Your answer:</span>
                    <span
                      className={`flex-1 p-3 rounded-lg ${
                        answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
                      }`}
                      dangerouslySetInnerHTML={{ __html: answer.userAnswer || 'No answer' }}
                    />
                    {answer.isCorrect ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  {!answer.isCorrect && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600">Correct answer:</span>
                      <span
                        className="flex-1 p-3 rounded-lg bg-green-50"
                        dangerouslySetInnerHTML={{ __html: answer.correctAnswer }}
                      />
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors duration-200"
        >
          Start New Quiz
        </button>
      </div>
    </div>
  );
};