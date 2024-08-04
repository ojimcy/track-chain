/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiBlast = ({ x, y, trigger }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (trigger) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      confettiSource={{ x, y }}
      numberOfPieces={100}
      recycle={false}
      drawShape={(ctx) => {
        ctx.beginPath();
        for (let i = 0; i < 22; i++) {
          const angle = 0.35 * i;
          const x = (0.2 + 1.5 * angle) * Math.cos(angle);
          const y = (0.2 + 1.5 * angle) * Math.sin(angle);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }}
    />
  );
};

export default ConfettiBlast;
