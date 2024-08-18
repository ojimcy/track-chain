import React, { useRef, useEffect } from 'react';
import Confetti from 'react-confetti';

import dollar from '../../assets/images/dollar.png'

function ReactConfetti() {
  const imageRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = dollar; 
    img.onload = () => {
      imageRef.current = img;
    };
  }, []);

  return (
    <Confetti
      width={window.innerWidth} // Start from full width
      height={window.innerHeight} // Set height to window height
      numberOfPieces={200} // Adjust the number of confetti pieces
      recycle={false} // Confetti will fall once and disappear
      gravity={0.3} // Adjust gravity to control falling speed
      initialVelocityY={-20} 
      wind={0} 
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
      confettiSource={{
        x: 0,
        y: window.innerHeight,
        w: window.innerWidth,
        h: 0,
      }}
    />
  );
}

export default ReactConfetti;
