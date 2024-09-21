import React, { useEffect, useState } from 'react';

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const calculateTimeToMidnight = () => {
      const now = new Date();

      // Set the target to midnight (00:00:00) of the next day
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);

      // Time remaining in milliseconds until midnight
      return nextMidnight.getTime() - now.getTime();
    };

    // Set the initial time remaining
    setTimeRemaining(calculateTimeToMidnight());

    // Update the countdown every second
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTimeRemaining = prev - 1000;
        if (newTimeRemaining <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newTimeRemaining;
      });
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Function to format the time remaining in HH:MM:SS format
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      '0'
    );
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <span className="countdown">
      {timeRemaining !== null ? formatTime(timeRemaining) : 'Loading...'}
    </span>
  );
};

export default CountdownTimer;
