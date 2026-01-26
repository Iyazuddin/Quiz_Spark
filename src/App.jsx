import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { QuizQuestion } from './components/QuizQuestion';
import { QuizSummary } from './components/QuizSummary';
import { EmailForm } from './components/EmailForm';
import { QuestionNavigation } from './components/QuestionNavigation';
import { DetailedSummary } from './components/DetailedSummary';
import { Timer } from './components/Timer';

const TOTAL_TIME = 30 * 60; // 30 minutes in seconds
const TOTAL_QUESTIONS = 15;

function App() {
  const [state, setState] = useState({
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isLoading: false,
    error: null,
    quizStarted: false,
    quizEnded: false,
    timeRemaining: TOTAL_TIME,
    userEmail: '',
    visitedQuestions: new Set(),
  });

  const fetchQuestions = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}&type=multiple`
      );
      const data = await response.json();
      
      // Pre-shuffle options for each question
      const questionsWithShuffledOptions = data.results.map(question => ({
        ...question,
        shuffledOptions: [...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - 0.5)
      }));
      
      setState(prev => ({
        ...prev,
        questions: questionsWithShuffledOptions,
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch questions. Please try again.',
        isLoading: false,
      }));
    }
  };

  const handleEmailSubmit = async (email) => {
    setState(prev => ({ ...prev, userEmail: email }));
    await startQuiz();
  };

  const startQuiz = async () => {
    await fetchQuestions();
    setState(prev => ({
      ...prev,
      quizStarted: true,
      timeRemaining: TOTAL_TIME,
      visitedQuestions: new Set([0]),
    }));
  };

  const handleAnswer = (answer) => {
    setState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.slice(0, prev.currentQuestionIndex),
        answer,
        ...prev.answers.slice(prev.currentQuestionIndex + 1),
      ],
      visitedQuestions: new Set([
        ...Array.from(prev.visitedQuestions),
        prev.currentQuestionIndex,
      ]),
    }));
  };

  const handleNext = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      visitedQuestions: new Set([
        ...Array.from(prev.visitedQuestions),
        prev.currentQuestionIndex + 1,
      ]),
    }));
  };

  const handlePrevious = () => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex - 1,
    }));
  };

  const handleSubmit = () => {
    const score = state.questions.reduce((total, question, index) => {
      return total + (state.answers[index] === question.correct_answer ? 1 : 0);
    }, 0);

    setState(prev => ({
      ...prev,
      score,
      quizEnded: true,
    }));
  };

  const navigateToQuestion = (index) => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: index,
      visitedQuestions: new Set([...Array.from(prev.visitedQuestions), index]),
    }));
  };

  useEffect(() => {
    if (!state.quizStarted || state.quizEnded) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          // Auto-submit when time is up
          const score = prev.questions.reduce((total, question, index) => {
            return total + (prev.answers[index] === question.correct_answer ? 1 : 0);
          }, 0);
          
          return {
            ...prev,
            timeRemaining: 0,
            quizEnded: true,
            score,
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.quizStarted, state.quizEnded]);

  const restartQuiz = () => {
    setState({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isLoading: false,
      error: null,
      quizStarted: false,
      quizEnded: false,
      timeRemaining: TOTAL_TIME,
      userEmail: '',
      visitedQuestions: new Set(),
    });
  };

  const getCurrentQuestion = () => {
    return state.questions[state.currentQuestionIndex] || null;
  };

  const getDetailedAnswers = () => {
    return state.questions.map((question, index) => ({
      question: question.question,
      userAnswer: state.answers[index] || '',
      correctAnswer: question.correct_answer,
      isCorrect: state.answers[index] === question.correct_answer,
    }));
  };

  if (state.error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{state.error}</p>
          <button
            onClick={startQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (state.isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading questions...</span>
        </div>
      </div>
    );
  }

  if (!state.quizStarted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <EmailForm onSubmit={handleEmailSubmit} />
      </div>
    );
  }

  if (state.quizEnded) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="mb-8">
          <QuizSummary
            score={state.score}
            totalQuestions={TOTAL_QUESTIONS}
            onRestart={restartQuiz}
          />
        </div>
        <DetailedSummary
          answers={getDetailedAnswers()}
          onRestart={restartQuiz}
        />
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex justify-between items-center mb-6">
          <Timer timeRemaining={state.timeRemaining} />
          <p className="text-lg font-semibold text-gray-600">
            Question {state.currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
          </p>
        </div>

        <QuestionNavigation
          totalQuestions={TOTAL_QUESTIONS}
          currentQuestion={state.currentQuestionIndex}
          visitedQuestions={state.visitedQuestions}
          answers={state.answers}
          onNavigate={navigateToQuestion}
        />

        <QuizQuestion
          question={currentQuestion.question}
          options={currentQuestion.shuffledOptions}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          currentAnswer={state.answers[state.currentQuestionIndex] || ''}
          isFirst={state.currentQuestionIndex === 0}
          isLast={state.currentQuestionIndex === TOTAL_QUESTIONS - 1}
        />
      </div>
    </div>
  );
}

export default App;
