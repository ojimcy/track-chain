import React, { useState, useEffect, useCallback } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaBolt, FaRocket } from 'react-icons/fa';

import './tap.css';
import dollar from '../assets/images/dollar.png';
import cal from '../assets/images/cal.png';
import reward from '../assets/images/reward.png';
import data from '../hooks/demo_data';
import { formatBalance } from '../utils/formatBalance';
import DailyRewardModal from '../components/modals/DailyRewardModal';

function Tap() {
  const { user, levels } = data;

  const [balance, setBalance] = useState(user.balance);
  const [energy, setEnergy] = useState(user.energy_limit);
  const [taps, setTaps] = useState([]);
  const [tapId, setTapId] = useState(0);
  const [rewardModal, setRewardModal] = useState(false);

  const currentLevel = levels.find((lvl) => lvl.level === user.level);

  const toggleRewardModal = useCallback(() => {
    setRewardModal((prev) => !prev);
  }, []);

  const handleTap = (event) => {
    if (energy > user.multi_tap) {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const newTapId = tapId + 1;

      setBalance((prevBalance) => prevBalance + user.multi_tap);
      setEnergy((prevEnergy) => prevEnergy - user.multi_tap);
      setTaps((prevTaps) => [...prevTaps, { id: newTapId, x, y, progress: 0 }]);
      setTapId(newTapId);

      animateTap(x, y, newTapId);
    }
  };

  const animateTap = (x, y, tapId) => {
    const animationDuration = 1000; // 1 second
    const startTime = performance.now();

    const updateAnimation = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      // Update the animation state
      setTaps((prevTaps) =>
        prevTaps.map((tap) => (tap.id === tapId ? { ...tap, progress } : tap))
      );

      if (progress < 1) {
        requestAnimationFrame(updateAnimation);
      } else {
        // Remove the tap after the animation completes
        setTaps((prevTaps) => prevTaps.filter((tap) => tap.id !== tapId));
      }
    };

    requestAnimationFrame(updateAnimation);
  };

  useEffect(() => {
    if (energy < user.energy_limit) {
      const energyRefill = setInterval(() => {
        setEnergy((prevEnergy) => Math.min(prevEnergy + 1, user.energy_limit));
      }, 1000);

      return () => clearInterval(energyRefill);
    }
  }, [energy, user.energy_limit]);

  return (
    <div className="mining-page mt-3">
      <Container>
        <div className="mining-content">
          <div className="balance d-flex align-items-center">
            <img src={dollar} alt="Dollar Icon" width={30} />
            <span className="earnings">{formatBalance(balance)}</span>
          </div>

          <div className="top-links d-flex justify-content-between">
            <Link to="#" className="top-link" onClick={toggleRewardModal}>
              <div className="link-content d-flex align-items-center">
                <img src={reward} alt="Daily Rewards" />
                <span>Daily Rewards</span>
                <span className="timer">23:07:58</span>
              </div>
            </Link>

            <Link to="/daily-combo" className="top-link">
              <div className="link-content d-flex align-items-center">
                <img src={cal} alt="Daily Combo" />
                <span>Daily Combo</span>
                <span className="timer">14:52:59</span>
              </div>
            </Link>
          </div>

          <div className="tap-area" onClick={handleTap}>
            <img src={currentLevel.icon} alt="Current Level Icon" />
            {taps.map((tap) => (
              <div
                key={tap.id}
                className="multi-tap-animation"
                style={{
                  position: 'absolute',
                  left: `${tap.x}px`,
                  top: `${tap.y}px`,
                  opacity: 1 - tap.progress,
                  transform: `scale(${1 + tap.progress * 2})`,
                  transition: 'opacity 1s, transform 1s',
                }}
              >
                +{user.multi_tap}
              </div>
            ))}
          </div>

          <div className="boost-area">
            <div className="energy d-flex flex-column align-items-center">
              <FaBolt className="lightning-icon" size={25} />
              <span className="mt-1">
                {energy}/{user.energy_limit}
              </span>
            </div>

            <div className="booster d-flex flex-column align-items-center">
              <FaRocket size={25} />
              <Link className="mt-1" to="/boost">
                <span style={{ color: '#ffffff' }}>Boost</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {rewardModal && (
        <DailyRewardModal isOpen={rewardModal} toggle={toggleRewardModal} />
      )}
    </div>
  );
}

export default Tap;
