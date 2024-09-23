import React, { useRef, useEffect } from 'react';
import Confetti from 'react-confetti';

import dollar from '../../assets/images/dollar.png';

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
