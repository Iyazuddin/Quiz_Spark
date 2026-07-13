import React, { useState } from 'react';
import { Play, Sparkles, Zap } from 'lucide-react';

export const EmailForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return;
    }
    onSubmit(email);
  };

  return (
    <div className="glass-card p-10 md:p-14 max-w-lg w-full text-center animate-scale-in">
      {/* Logo */}
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-spark-500/15 border border-spark-400/20 mb-6 animate-bounce-subtle">
          <Zap className="w-10 h-10 spark-icon text-amber-400" style={{ filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.5))' }} />
        </div>
        <h1 className="text-5xl font-extrabold font-display gradient-text mb-3">
          Quiz Spark
        </h1>
        <p className="text-spark-200/60 text-lg">
          15 questions · 30 minutes · Unlimited knowledge
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-3 mb-10">
        {[
          { icon: '🧠', label: 'Trivia' },
          { icon: '⏱️', label: 'Timed' },
          { icon: '🏆', label: 'Score' },
        ].map((item) => (
          <div
            key={item.label}
            className="py-3 px-2 rounded-xl bg-spark-500/5 border border-spark-400/10 text-center"
          >
            <span className="text-2xl mb-1 block">{item.icon}</span>
            <span className="text-xs text-spark-200/50 font-medium uppercase tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your email to start"
            className="input-field"
            required
          />
          {error && (
            <p className="text-red-400 text-sm mt-2 animate-slide-in">{error}</p>
          )}
        </div>
        <button
          id="start-quiz-btn"
          type="submit"
          className="btn-primary flex items-center justify-center gap-3 w-full text-lg py-4"
        >
          <Sparkles className="w-5 h-5" />
          Start Quiz
          <Play className="w-5 h-5" />
        </button>
      </form>

      <p className="mt-6 text-xs text-spark-200/30">
        Questions powered by Open Trivia Database
      </p>
    </div>
  );
};