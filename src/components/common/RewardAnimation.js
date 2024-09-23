/* eslint-disable react/prop-types */
import React from 'react';

import image from '../../assets/images/lvl4.jpeg';
import './reward-animation.css';

const RewardAnimation = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div
      className={`reward-animation-container ${
        isVisible ? 'reward-animation-active' : ''
      }`}
    >
      <div className="reward-image-container">
        <img src={image} alt="Reward" className="reward-image" />
        {/* Stars */}
        <div className="star star-1" />
        <div className="star star-2" />
        <div className="star star-3" />
        <div className="star star-4" />
      </div>
    </div>
  );
};

export default RewardAnimation;
