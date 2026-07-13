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

  // Background layer shared across all views
  const Background = () => (
    <div className="quiz-bg">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
    </div>
  );

  if (state.error) {
    return (
      <>
        <Background />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="glass-card p-10 text-center max-w-md animate-scale-in">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-300 mb-6 text-lg">{state.error}</p>
            <button onClick={startQuiz} className="btn-primary flex items-center justify-center gap-2 w-full">
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  if (state.isLoading) {
    return (
      <>
        <Background />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="glass-card p-10 text-center animate-scale-in">
            <Loader2 className="w-10 h-10 animate-spin text-spark-400 mx-auto mb-4" />
            <span className="shimmer-text text-xl font-semibold font-display">
              Loading questions...
            </span>
          </div>
        </div>
      </>
    );
  }

  if (!state.quizStarted) {
    return (
      <>
        <Background />
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <EmailForm onSubmit={handleEmailSubmit} />
        </div>
      </>
    );
  }

  if (state.quizEnded) {
    return (
      <>
        <Background />
        <div className="relative z-10 min-h-screen py-10 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-slide-up">
              <QuizSummary
                score={state.score}
                totalQuestions={TOTAL_QUESTIONS}
                onRestart={restartQuiz}
              />
            </div>
            <div className="animate-slide-up stagger-2">
              <DetailedSummary
                answers={getDetailedAnswers()}
                onRestart={restartQuiz}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return null;

  return (
    <>
      <Background />
      <div className="relative z-10 min-h-screen p-4">
        <div className="max-w-4xl mx-auto pt-6">
          {/* Header Bar */}
          <div className="flex justify-between items-center mb-6 animate-fade-in">
            <Timer timeRemaining={state.timeRemaining} />
            <div className="glass-card px-4 py-2">
              <p className="text-sm font-medium text-spark-200">
                Question{' '}
                <span className="text-spark-400 font-bold text-lg">
                  {state.currentQuestionIndex + 1}
                </span>{' '}
                <span className="text-spark-200/50">of</span>{' '}
                <span className="text-spark-300 font-semibold">{TOTAL_QUESTIONS}</span>
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar-track mb-6 animate-fade-in">
            <div
              className="progress-bar-fill"
              style={{ width: `${((state.currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>

          {/* Navigation */}
          <div className="animate-slide-up">
            <QuestionNavigation
              totalQuestions={TOTAL_QUESTIONS}
              currentQuestion={state.currentQuestionIndex}
              visitedQuestions={state.visitedQuestions}
              answers={state.answers}
              onNavigate={navigateToQuestion}
            />
          </div>

          {/* Question Card */}
          <div className="animate-slide-up stagger-2">
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
      </div>
    </>
  );
}

export default App;
