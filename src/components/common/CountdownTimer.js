import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = ({ duration }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const calculateNext16 = () => {
      const now = new Date();
      const next16 = new Date(now);
      next16.setHours(16, 0, 0, 0);

      if (now >= next16) {
        next16.setDate(next16.getDate() + 1);
      }

      return next16.getTime() - now.getTime();
    };

    setTimeRemaining(calculateNext16());

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

    return () => clearInterval(interval);
  }, [duration]);

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

CountdownTimer.propTypes = {
  duration: PropTypes.number.isRequired,
};

export default CountdownTimer;
