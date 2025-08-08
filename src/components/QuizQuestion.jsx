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
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">{question}</h2>

      <div className="grid gap-4 mb-8">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full p-4 text-left rounded-lg transition-colors duration-200 border
                      ${
                        option === currentAnswer
                          ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500"
                          : "bg-gray-50 border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-300`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200
                    ${
                      isFirst
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex gap-2">
          {!isLast ? (
            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                       hover:bg-blue-700 transition-colors duration-200"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg
                       hover:bg-green-700 transition-colors duration-200"
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
