import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

export const Timer = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  const formatTime = (value) => value.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2 text-lg font-semibold bg-white px-4 py-2 rounded-lg shadow-sm">
      <TimerIcon className="w-5 h-5" />
      <span className={timeRemaining <= 300 ? 'text-red-500' : 'text-gray-700'}>
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
};