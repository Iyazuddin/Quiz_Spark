import React from 'react';
import { Timer as TimerIcon, AlertTriangle } from 'lucide-react';

export const Timer = ({ timeRemaining }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isWarning = timeRemaining <= 300;

  const formatTime = (value) => value.toString().padStart(2, '0');

  return (
    <div className={`timer-badge ${isWarning ? 'warning' : ''}`}>
      {isWarning ? (
        <AlertTriangle className="w-5 h-5 text-red-400" />
      ) : (
        <TimerIcon className="w-5 h-5 text-spark-400" />
      )}
      <span className="tabular-nums">
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
};