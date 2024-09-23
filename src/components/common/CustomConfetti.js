import React, { useRef, useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import dollar from '../../assets/images/dollar.png';

function ReactConfetti() {
  const imageRef = useRef(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const img = new Image();
    img.src = dollar;
    img.onload = () => {
      imageRef.current = img;
    };

    // Update the window size when resized
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={300} // Increased pieces for more visual impact
      gravity={0.4} // Adjust gravity to control fall speed
      wind={0.05} // Slight wind to add some horizontal movement
      confettiSource={{
        x: 0,
        y: 0,
        w: windowSize.width,
        h: 0, // Confetti starts falling from the top
      }}
      recycle={false} // Confetti falls once
      drawShape={(ctx) => {
        if (imageRef.current) {
          const size = 15; 
          ctx.drawImage(imageRef.current, -size / 2, -size / 2, size, size);
        } else {
          // Fallback shape if the image is not loaded
          ctx.beginPath();
          ctx.arc(0, 0, 10, 0, 2 * Math.PI);
          ctx.fill();
        }
      }}
    />
  );
}

export default ReactConfetti;
