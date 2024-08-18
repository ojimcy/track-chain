import React, { useRef, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import dollar from '../../assets/images/dollar.png'

function ReactConfetti() {
  const imageRef = useRef(null);
  const [confettiWidth, setConfettiWidth] = useState(window.innerWidth);
  const [confettiHeight, setConfettiHeight] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = dollar; 
    img.onload = () => {
      imageRef.current = img;
    };

    // Animate width and height
    const interval = setInterval(() => {
      setConfettiWidth((prevWidth) => Math.max(0, prevWidth - 10)); 
      setConfettiHeight((prevHeight) => Math.min(window.innerHeight, prevHeight + 10)); 
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Confetti
      width={window.innerWidth} // Full screen width
      height={confettiHeight} // Animate height upwards
      numberOfPieces={200} // Adjust the number of confetti pieces
      recycle={false} // Confetti will rise once and disappear
      gravity={-0.3} // Negative gravity to make confetti rise
      initialVelocityY={20} // Velocity to push confetti upwards
      wind={0} // No horizontal movement initially
      drawShape={(ctx) => {
        if (imageRef.current) {
          const size = 20; 
          ctx.drawImage(imageRef.current, -size / 2, -size / 2, size, size);
        } else {
          // Fallback shape if the image is not loaded
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, 2 * Math.PI);
          ctx.fill();
        }
      }}
      confettiSource={{ x: 0, y: window.innerHeight, w: confettiWidth, h: 0 }}
    />
  );
}

export default ReactConfetti;
