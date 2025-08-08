import React, { useState } from 'react';
import { Play } from 'lucide-react';

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
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Quiz Time!</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter your email to start"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-8 py-4 
                   bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                   transition-colors duration-200 text-lg font-semibold
                   w-full"
        >
          <Play className="w-5 h-5" />
          Start Quiz
        </button>
      </form>
    </div>
  );
};